/* ================================================================
   Recurring Schedules — KV CRUD + next-date computation + cron
   ================================================================
   Cadences: monthly | weekly
   - monthly: anchor = day-of-month (1-28). For Feb 29-31, clamp to 28.
   - weekly:  anchor = day-of-week (0=Sunday, 6=Saturday)

   Cron processor (called by /api/admin/invoices/recurring/process)
   - Reads all active schedules
   - For each schedule where nextRunAt <= today:
     - Clones the templateDraft
     - Generates a new invoice (via the existing create flow)
     - Updates lastRunAt + nextRunAt
     - Skips if already run today (idempotency)
   ================================================================ */

import { kv } from '@vercel/kv';
import type {
  RecurringSchedule,
  RecurringCadence,
  InvoiceDraft,
} from './types';

const KV_AVAILABLE = !!(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

const KEY_RECURRING = (id: string) => `recurring:${id}`;
const KEY_RECURRING_ALL = 'recurring:all';
const KEY_RUN_LOG = (date: string) => `recurring:run-log:${date}`;

const RECURRING_CAP = 200;

export function generateScheduleId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 10);
  return `rec_${ts}${rand}`;
}

/* ═══════════════ Next-date computation ═══════════════ */

/**
 * Compute the next run date for a schedule, given the last run (or start date).
 * Returns an ISO date string (UTC midnight).
 */
export function computeNextRun(
  cadence: RecurringCadence,
  anchor: number,
  fromDate: Date,
): string {
  const next = new Date(fromDate);
  next.setUTCHours(0, 0, 0, 0);

  if (cadence === 'weekly') {
    // anchor = day of week (0-6)
    const target = Math.max(0, Math.min(6, Math.floor(anchor)));
    const current = next.getUTCDay();
    let diff = target - current;
    if (diff <= 0) diff += 7;
    next.setUTCDate(next.getUTCDate() + diff);
  } else {
    // monthly: anchor = day of month (1-28)
    const target = Math.max(1, Math.min(28, Math.floor(anchor)));
    // Move to next month if we're past the anchor day
    if (next.getUTCDate() >= target) {
      next.setUTCMonth(next.getUTCMonth() + 1);
    }
    next.setUTCDate(target);
  }

  return next.toISOString();
}

/* ═══════════════ CRUD ═══════════════ */

export async function createSchedule(args: {
  customerEmail: string;
  templateDraft: InvoiceDraft;
  cadence: RecurringCadence;
  anchor: number;
  startDate?: string;
  endDate?: string;
  autoSend?: boolean;
}): Promise<RecurringSchedule | null> {
  if (!KV_AVAILABLE) return null;

  const now = new Date();
  const startDate = args.startDate || now.toISOString();
  const startDateObj = new Date(startDate);

  const schedule: RecurringSchedule = {
    scheduleId: generateScheduleId(),
    customerEmail: args.customerEmail.toLowerCase(),
    templateDraft: args.templateDraft,
    cadence: args.cadence,
    anchor: args.anchor,
    startDate,
    endDate: args.endDate,
    active: true,
    autoSend: args.autoSend ?? false,
    nextRunAt: computeNextRun(args.cadence, args.anchor, startDateObj),
    totalRuns: 0,
    spawnedInvoiceIds: [],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  try {
    await kv.set(KEY_RECURRING(schedule.scheduleId), schedule);

    const all =
      ((await kv.get(KEY_RECURRING_ALL)) as string[] | null) ?? [];
    const next = [schedule.scheduleId, ...all].slice(0, RECURRING_CAP);
    await kv.set(KEY_RECURRING_ALL, next);

    return schedule;
  } catch {
    return null;
  }
}

export async function getSchedule(
  scheduleId: string,
): Promise<RecurringSchedule | null> {
  if (!KV_AVAILABLE) return null;
  try {
    return ((await kv.get(KEY_RECURRING(scheduleId))) as RecurringSchedule) ?? null;
  } catch {
    return null;
  }
}

export async function listSchedules(
  limit = 100,
): Promise<RecurringSchedule[]> {
  if (!KV_AVAILABLE) return [];
  try {
    const ids =
      ((await kv.get(KEY_RECURRING_ALL)) as string[] | null) ?? [];
    const sliced = ids.slice(0, limit);
    if (sliced.length === 0) return [];
    const keys = sliced.map((id) => KEY_RECURRING(id));
    const records = (await kv.mget(...keys)) as (RecurringSchedule | null)[];
    return records.filter((r): r is RecurringSchedule => !!r);
  } catch {
    return [];
  }
}

export async function updateSchedule(
  scheduleId: string,
  patch: Partial<RecurringSchedule>,
): Promise<RecurringSchedule | null> {
  if (!KV_AVAILABLE) return null;
  const existing = await getSchedule(scheduleId);
  if (!existing) return null;

  const updated: RecurringSchedule = {
    ...existing,
    ...patch,
    scheduleId: existing.scheduleId, // never change ID
    updatedAt: new Date().toISOString(),
  };

  try {
    await kv.set(KEY_RECURRING(scheduleId), updated);
    return updated;
  } catch {
    return existing;
  }
}

export async function deleteSchedule(scheduleId: string): Promise<boolean> {
  if (!KV_AVAILABLE) return false;
  try {
    await kv.del(KEY_RECURRING(scheduleId));
    const all = ((await kv.get(KEY_RECURRING_ALL)) as string[] | null) ?? [];
    await kv.set(
      KEY_RECURRING_ALL,
      all.filter((x) => x !== scheduleId),
    );
    return true;
  } catch {
    return false;
  }
}

/* ═══════════════ Cron processor ═══════════════ */

export interface CronRunLog {
  date: string; // YYYY-MM-DD
  startedAt: string;
  finishedAt?: string;
  schedulesProcessed: number;
  invoicesCreated: number;
  errors: { scheduleId: string; reason: string }[];
}

/**
 * Check if a schedule is due to run now.
 * Returns true if nextRunAt is on or before today's UTC midnight.
 */
export function isScheduleDue(
  schedule: RecurringSchedule,
  now: Date = new Date(),
): boolean {
  if (!schedule.active) return false;
  // Skip if already ran today
  if (schedule.lastRunAt) {
    const last = schedule.lastRunAt.slice(0, 10);
    const today = now.toISOString().slice(0, 10);
    if (last === today) return false;
  }
  // End-date check
  if (schedule.endDate && new Date(schedule.endDate) < now) {
    return false;
  }
  return new Date(schedule.nextRunAt) <= now;
}

/**
 * Mark a schedule as having run today, advance nextRunAt, and append the
 * spawned invoice ID. Used by the cron processor.
 */
export async function markScheduleRun(
  scheduleId: string,
  spawnedInvoiceId: string,
): Promise<RecurringSchedule | null> {
  const existing = await getSchedule(scheduleId);
  if (!existing) return null;

  const now = new Date();
  const updated: RecurringSchedule = {
    ...existing,
    lastRunAt: now.toISOString(),
    nextRunAt: computeNextRun(existing.cadence, existing.anchor, now),
    totalRuns: existing.totalRuns + 1,
    spawnedInvoiceIds: [...existing.spawnedInvoiceIds, spawnedInvoiceId].slice(
      -50,
    ),
    updatedAt: now.toISOString(),
  };

  if (KV_AVAILABLE) {
    try {
      await kv.set(KEY_RECURRING(scheduleId), updated);
    } catch {
      /* swallow */
    }
  }
  return updated;
}

export async function saveRunLog(log: CronRunLog): Promise<void> {
  if (!KV_AVAILABLE) return;
  try {
    await kv.set(KEY_RUN_LOG(log.date), log);
  } catch {
    /* swallow */
  }
}
