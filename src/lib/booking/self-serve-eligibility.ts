/* ================================================================
   Self-Serve Recurring Eligibility — pure rules
   ================================================================
   Deciding whether a /book client can request a recurring series
   themselves (vs. having admin create it). Conservative defaults
   per Mo's choice (≥ 2 paid completed sessions; cap 4 → 8).

   Rules (in order):
     1. Feature must be enabled in admin settings
     2. Client must be authenticated (booking_session cookie)
     3. ≥ 2 completed-and-paid sessions (refunded ones don't count)
     4. No active series already in flight

   Output is a serializable object the client and server can both
   share — the server re-computes on every confirm-series POST so a
   tampered client UI cannot bypass the gate.
   ================================================================ */

import type { Booking, RecurrenceFrequency } from './types';

/** Minimum number of paid + non-refunded completed sessions to self-serve. */
export const SELF_SERVE_MIN_PAID = 2;
/** Cap for clients with paidSessionsCount in [2..4]. */
export const SELF_SERVE_MAX_NEWER = 4;
/** Cap for clients with paidSessionsCount >= 5. */
export const SELF_SERVE_MAX_VETERAN = 8;
/** Threshold at which the cap is raised from MAX_NEWER to MAX_VETERAN. */
export const SELF_SERVE_VETERAN_THRESHOLD = 5;
/** Max calendar window the rolled series may span (days). */
export const SELF_SERVE_MAX_WINDOW_DAYS = 90;

const ACTIVE_STATUSES: ReadonlyArray<Booking['status']> = [
  'pending_approval',
  'pending-review',
  'approved',
  'confirmed',
];

export type EligibilityReason =
  | 'feature-disabled'
  | 'not-authenticated'
  | 'insufficient-history'
  | 'has-active-series';

export interface SelfServeEligibility {
  eligible: boolean;
  reason?: EligibilityReason;
  paidSessionsCount: number;
  maxSessionsAllowed: number;
  allowedFrequencies: RecurrenceFrequency[];
  maxWindowDays: number;
  hasActiveSeries: boolean;
}

export interface ComputeEligibilityArgs {
  authenticated: boolean;
  bookings: Booking[];
  settings: { selfServeRecurringEnabled?: boolean };
}

export function computeEligibility(args: ComputeEligibilityArgs): SelfServeEligibility {
  const { authenticated, bookings, settings } = args;

  const paidSessionsCount = bookings.filter(
    (b) =>
      b.status === 'completed'
      && !!b.paidAt
      && !b.refundedAmountCents,
  ).length;

  const hasActiveSeries = bookings.some(
    (b) => !!b.series?.seriesId && ACTIVE_STATUSES.includes(b.status),
  );

  // Caps and frequencies are still computed even when ineligible — useful
  // for the UI to render an explanatory tooltip ("3 more paid sessions
  // until you can book a 4-session block yourself").
  const maxSessionsAllowed = paidSessionsCount >= SELF_SERVE_VETERAN_THRESHOLD
    ? SELF_SERVE_MAX_VETERAN
    : SELF_SERVE_MAX_NEWER;

  const allowedFrequencies: RecurrenceFrequency[] = ['weekly', 'biweekly', 'every3weeks'];

  const base: Omit<SelfServeEligibility, 'eligible' | 'reason'> = {
    paidSessionsCount,
    maxSessionsAllowed,
    allowedFrequencies,
    maxWindowDays: SELF_SERVE_MAX_WINDOW_DAYS,
    hasActiveSeries,
  };

  if (!settings.selfServeRecurringEnabled) {
    return { eligible: false, reason: 'feature-disabled', ...base };
  }
  if (!authenticated) {
    return { eligible: false, reason: 'not-authenticated', ...base };
  }
  if (paidSessionsCount < SELF_SERVE_MIN_PAID) {
    return { eligible: false, reason: 'insufficient-history', ...base };
  }
  if (hasActiveSeries) {
    return { eligible: false, reason: 'has-active-series', ...base };
  }

  return { eligible: true, ...base };
}
