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
 * Build a UTC ISO string that corresponds to local midnight on the
 * given year/month/day in the given IANA timezone. Handles DST by
 * leveraging Intl.DateTimeFormat to discover the offset at that
 * specific instant (not a naïve `-8:00` assumption).
 *
 * Works for any IANA zone Node.js knows about. Falls back to a
 * literal UTC midnight if the timezone is invalid.
 */
function localMidnightToUTC(
  year: number,
  month: number, // 1-12
  day: number,
  timezone: string,
): Date {
  try {
    // Guess an initial UTC instant; the local time at this instant
    // might not be midnight. Compute the offset between what we want
    // (midnight local) and what we actually get, then shift.
    const guess = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(guess);

    const get = (t: string): number =>
      Number(parts.find(p => p.type === t)?.value ?? '0');
    const actualLocalHour = get('hour');
    const actualLocalMinute = get('minute');
    const actualLocalSecond = get('second');

    // Offset in ms between midnight-local and whatever the guess
    // landed on. Shift guess by that delta to align with midnight
    // local on the requested calendar day.
    const msSinceMidnight =
      actualLocalHour * 3600_000
      + actualLocalMinute * 60_000
      + actualLocalSecond * 1000;

    // Also check whether the guess rolled over to the previous/next
    // day locally (e.g. for Asia zones where UTC midnight = 4am local).
    const actualLocalDay = get('day');
    const dayDelta = actualLocalDay - day; // -1, 0, or 1 typically
    const dayDeltaMs = dayDelta * 86_400_000;

    return new Date(guess.getTime() - msSinceMidnight - dayDeltaMs);
  } catch {
    // Invalid timezone — fall back to naïve UTC midnight
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  }
}

/** Return Y/M/D in the given timezone for an instant. */
function localYMD(instant: Date, timezone: string): { year: number; month: number; day: number; dayOfWeek: number } {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    }).formatToParts(instant);
    const get = (t: string) =>
      parts.find(p => p.type === t)?.value ?? '';
    const weekday = get('weekday');
    const dayMap: Record<string, number> = {
      Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
    };
    return {
      year: Number(get('year')),
      month: Number(get('month')),
      day: Number(get('day')),
      dayOfWeek: dayMap[weekday] ?? instant.getUTCDay(),
    };
  } catch {
    return {
      year: instant.getUTCFullYear(),
      month: instant.getUTCMonth() + 1,
      day: instant.getUTCDate(),
      dayOfWeek: instant.getUTCDay(),
    };
  }
}

/**
 * Compute the next run date for a schedule, given the last run (or
 * start date). Returns an ISO UTC timestamp that corresponds to
 * local midnight on the target day in the schedule's timezone.
 *
 * When `timezone` is omitted, behaviour matches the legacy pre-fix
 * implementation (UTC midnight anchors) so existing schedules
 * without a timezone field keep working unchanged until their next
 * update.
 */
export function computeNextRun(
  cadence: RecurringCadence,
  anchor: number,
  fromDate: Date,
  timezone?: string,
): string {
  if (!timezone) {
    // Legacy UTC-only path (kept for backwards compatibility with
    // schedules created before the timezone field existed).
    const next = new Date(fromDate);
    next.setUTCHours(0, 0, 0, 0);
    if (cadence === 'weekly') {
      const target = Math.max(0, Math.min(6, Math.floor(anchor)));
      const current = next.getUTCDay();
      let diff = target - current;
      if (diff <= 0) diff += 7;
      next.setUTCDate(next.getUTCDate() + diff);
    } else {
      const target = Math.max(1, Math.min(28, Math.floor(anchor)));
      if (next.getUTCDate() >= target) next.setUTCMonth(next.getUTCMonth() + 1);
      next.setUTCDate(target);
    }
    return next.toISOString();
  }

  // Timezone-aware path: read the day-of-month or day-of-week FROM
  // the local date, step forward, then convert the target local
  // midnight back to a UTC ISO.
  const from = localYMD(fromDate, timezone);

  if (cadence === 'weekly') {
    const target = Math.max(0, Math.min(6, Math.floor(anchor)));
    let diff = target - from.dayOfWeek;
    if (diff <= 0) diff += 7;
    // Advance the calendar by `diff` days in local time. We go via
    // UTC-noon so the arithmetic doesn't accidentally cross a DST
    // transition mid-calculation.
    const anchorUtc = localMidnightToUTC(from.year, from.month, from.day, timezone);
    const advanced = new Date(anchorUtc.getTime() + diff * 86_400_000);
    const next = localYMD(advanced, timezone);
    return localMidnightToUTC(next.year, next.month, next.day, timezone).toISOString();
  }

  // Monthly
  const target = Math.max(1, Math.min(28, Math.floor(anchor)));
  let year = from.year;
  let month = from.month;
  if (from.day >= target) {
    month += 1;
    if (month > 12) { month = 1; year += 1; }
  }
  return localMidnightToUTC(year, month, target, timezone).toISOString();
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
  /**
   * IANA timezone the anchor is interpreted in. Defaults to
   * America/Toronto (the practice's home base) so the schedule fires
   * on the local day the admin picked, not UTC day.
   */
  timezone?: string;
}): Promise<RecurringSchedule | null> {
  if (!KV_AVAILABLE) return null;

  const now = new Date();
  const startDate = args.startDate || now.toISOString();
  const startDateObj = new Date(startDate);

  // Default to the practice's home-base timezone so schedules created
  // without an explicit tz still honour the admin's expected local day.
  const tz = args.timezone || 'America/Toronto';

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
    timezone: tz,
    nextRunAt: computeNextRun(args.cadence, args.anchor, startDateObj, tz),
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

  // "Already ran today" idempotency check. When the schedule has a
  // timezone, compare local calendar days in that zone — otherwise a
  // cron that runs at 22:00 UTC and 02:00 UTC on the same Toronto
  // day would register as two different UTC days and double-fire.
  if (schedule.lastRunAt) {
    const tz = schedule.timezone;
    if (tz) {
      try {
        const fmt = new Intl.DateTimeFormat('en-CA', {
          timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
        });
        const last = fmt.format(new Date(schedule.lastRunAt));
        const today = fmt.format(now);
        if (last === today) return false;
      } catch {
        // fall through to UTC comparison
      }
    } else {
      const last = schedule.lastRunAt.slice(0, 10);
      const today = now.toISOString().slice(0, 10);
      if (last === today) return false;
    }
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
    nextRunAt: computeNextRun(existing.cadence, existing.anchor, now, existing.timezone),
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
