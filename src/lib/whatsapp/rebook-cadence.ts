/* ================================================================
   Rebook Cadence — selection + variant logic
   ================================================================
   The "smart" half of the smart rebook nudge. Two responsibilities:

     1. selectRebookCandidates() — given recent bookings, return the
        clients due for a nudge based on their personal cadence.
     2. pickRebookVariant() — choose which of the 4 approved Meta
        templates fits this client's situation today.

   Pure functions, no IO. Caller reads bookings + customers from KV
   and feeds them in. Easier to unit-test that way.
   ================================================================ */

import type { Booking } from '@/lib/booking/types';
import type { Customer } from '@/lib/invoicing/types';
import type { TemplateName } from './templates';

export interface ClientHistory {
  email: string;
  /** Completed bookings, oldest first. */
  completed: Booking[];
  /** Has any upcoming (non-completed) confirmed booking — gates the candidate out. */
  hasUpcoming: boolean;
}

export interface RebookCandidate {
  email: string;
  firstName: string;
  /** Days elapsed since last completed session. */
  daysSinceLast: number;
  /** Average gap between this client's sessions, in days. NaN for first-timers. */
  avgGapDays: number;
  /** Total completed sessions. */
  completedCount: number;
  /** Service slug the client most recently booked. */
  lastServiceSlug?: string;
  /** Variant Meta template chosen for this client. */
  variant: RebookVariant;
}

export type RebookVariant = Extract<
  TemplateName,
  'rebook_nudge_warm' | 'rebook_nudge_cadence' | 'rebook_nudge_long_gap' | 'rebook_nudge_seasonal'
>;

export interface RebookSelectionInput {
  /** All customers with WhatsApp consent + phone. */
  customers: Customer[];
  /** All bookings (any status). Caller fetches once and slices per-customer. */
  bookings: Booking[];
  /** "Now" — defaulted to current time but injectable for tests. */
  now?: Date;
  /** Cooldown: skip clients nudged in the last N days. Default 14. */
  cooldownDays?: number;
  /**
   * Multiplier applied to avgGapDays before triggering. Default 1.1
   * (10% past the usual gap). Higher = nudges later, lower = earlier.
   */
  cadenceTrigger?: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function daysBetween(a: Date | string | number, b: Date | string | number): number {
  const am = new Date(a).getTime();
  const bm = new Date(b).getTime();
  return Math.abs(am - bm) / DAY_MS;
}

function firstName(name: string | undefined): string {
  if (!name) return 'there';
  const f = name.trim().split(/\s+/)[0];
  return f || 'there';
}

/**
 * Walk the booking list and produce per-client history blocks.
 */
export function buildHistories(
  bookings: Booking[],
  customers: Customer[],
  now: Date = new Date(),
): Map<string, ClientHistory> {
  const map = new Map<string, ClientHistory>();
  const validEmails = new Set(customers.map((c) => c.email));

  for (const b of bookings) {
    const email = b.clientEmail?.toLowerCase();
    if (!email || !validEmails.has(email)) continue;
    let h = map.get(email);
    if (!h) {
      h = { email, completed: [], hasUpcoming: false };
      map.set(email, h);
    }
    if (b.status === 'completed') {
      h.completed.push(b);
    } else if (
      (b.status === 'confirmed' || b.status === 'approved' || b.status === 'pending_approval') &&
      new Date(b.startTime).getTime() > now.getTime()
    ) {
      h.hasUpcoming = true;
    }
  }

  // Sort completed sessions oldest-first per history.
  for (const h of map.values()) {
    h.completed.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }
  return map;
}

/**
 * Mean gap in days between sequential completed sessions.
 * Returns NaN when fewer than 2 sessions exist.
 */
export function avgGapDays(completed: Booking[]): number {
  if (completed.length < 2) return Number.NaN;
  let sum = 0;
  let count = 0;
  for (let i = 1; i < completed.length; i++) {
    sum += daysBetween(completed[i - 1].startTime, completed[i].startTime);
    count++;
  }
  return count === 0 ? Number.NaN : sum / count;
}

/**
 * Decide which Meta template variant to send. See plan for the
 * rules; condensed here:
 *   - daysSinceLast > 60 → long-gap
 *   - seasonal match (within ±7 days of historical month median) → seasonal
 *   - completedCount >= 3 → cadence
 *   - else → warm (first-timer / second-time)
 */
export function pickRebookVariant(args: {
  daysSinceLast: number;
  completedCount: number;
  completedDates: Date[];
  now: Date;
}): RebookVariant {
  if (args.daysSinceLast > 60) return 'rebook_nudge_long_gap';

  // Seasonal: today's month is within ±1 of the historical median month
  // for this client's bookings AND today is within ±7 days of the
  // average day-of-month they tend to book on. Keeps us from spamming
  // every month for a client who books ad-hoc.
  if (args.completedDates.length >= 3) {
    const medMonth = monthMedian(args.completedDates);
    const medDom = domMedian(args.completedDates);
    const m = args.now.getUTCMonth();
    const d = args.now.getUTCDate();
    const monthMatch = Math.abs(m - medMonth) <= 1 || (medMonth === 0 && m === 11) || (medMonth === 11 && m === 0);
    const domMatch = Math.abs(d - medDom) <= 7;
    if (monthMatch && domMatch) return 'rebook_nudge_seasonal';
  }

  if (args.completedCount >= 3) return 'rebook_nudge_cadence';
  return 'rebook_nudge_warm';
}

function monthMedian(dates: Date[]): number {
  const ms = dates.map((d) => d.getUTCMonth()).sort((a, b) => a - b);
  return ms[Math.floor(ms.length / 2)];
}
function domMedian(dates: Date[]): number {
  const ds = dates.map((d) => d.getUTCDate()).sort((a, b) => a - b);
  return ds[Math.floor(ds.length / 2)];
}

/**
 * Top-level selection. Returns candidates ready to receive a nudge.
 */
export function selectRebookCandidates(input: RebookSelectionInput): RebookCandidate[] {
  const now = input.now ?? new Date();
  const cooldownDays = input.cooldownDays ?? 14;
  const cadenceTrigger = input.cadenceTrigger ?? 1.1;

  const histories = buildHistories(input.bookings, input.customers, now);
  const customersByEmail = new Map(input.customers.map((c) => [c.email, c]));
  const out: RebookCandidate[] = [];

  for (const [email, h] of histories) {
    const customer = customersByEmail.get(email);
    if (!customer) continue;

    if (customer.whatsappOptOut) continue;
    if (!customer.consentWhatsapp?.acceptedAt) continue;
    if (!customer.phone && !customer.mobilePhone) continue;
    if (h.hasUpcoming) continue;
    if (h.completed.length === 0) continue;

    // Cooldown: skip if last nudge was within window.
    if (customer.lastRebookNudgeAt) {
      const since = daysBetween(customer.lastRebookNudgeAt, now);
      if (since < cooldownDays) continue;
    }

    const last = h.completed[h.completed.length - 1];
    const daysSinceLast = daysBetween(last.startTime, now);

    const gap = avgGapDays(h.completed);
    // Trigger condition: either we have a personal cadence and we're
    // past it (×trigger), or it's been long enough we want to reach
    // out anyway (≥21 days since their first/only session).
    const cadenceHits = Number.isFinite(gap) && daysSinceLast >= gap * cadenceTrigger;
    const firstTimerHits = !Number.isFinite(gap) && daysSinceLast >= 21;
    if (!cadenceHits && !firstTimerHits) continue;

    const variant = pickRebookVariant({
      daysSinceLast,
      completedCount: h.completed.length,
      completedDates: h.completed.map((b) => new Date(b.startTime)),
      now,
    });

    out.push({
      email,
      firstName: firstName(customer.name),
      daysSinceLast,
      avgGapDays: Number.isFinite(gap) ? gap : Number.NaN,
      completedCount: h.completed.length,
      lastServiceSlug: last.serviceSlug,
      variant,
    });
  }
  return out;
}
