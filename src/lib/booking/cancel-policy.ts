/* ================================================================
   Cancel Policy — fee math + compassionate-cancel detection
   ================================================================
   Pure functions, easy to unit-test. The cancel route + manage page
   both consume these helpers so the client-facing fee preview always
   matches what actually gets charged.
   ================================================================ */

import type { Booking, AvailabilityRules } from './types';

export interface CancelFeeBreakdown {
  /** Hours from now until session start (negative if past). */
  hoursUntil: number;
  /**
   * Outcome describes what cancel can / can't do RIGHT NOW:
   * - 'free': within free-cancellation window → no fee, full refund.
   * - 'fee': inside policy window but before hard cutoff → late fee applies.
   * - 'blocked': past hard cutoff → cannot self-cancel.
   * - 'past': session already happened.
   */
  outcome: 'free' | 'fee' | 'blocked' | 'past';
  /** Late-fee fraction applied (0 when free). */
  feePercent: number;
  /** Computed fee in cents (0 when paid amount unknown or free). */
  feeCents: number;
  /** What would be refunded — paidAmount - feeCents. 0 when no payment recorded. */
  refundCents: number;
  /** Currency code ('cad', 'usd', etc.) — matches the original payment. */
  currency: string;
  /** Hours threshold for free cancellation (from rules, default 24). */
  freeWindowHours: number;
  /** Hours threshold below which client must contact us (default 2). */
  hardCutoffHours: number;
}

/** Compute the fee breakdown for a hypothetical cancel right now. */
export function computeCancelFee(
  booking: Booking,
  rules: Partial<AvailabilityRules> = {},
  now: Date = new Date(),
): CancelFeeBreakdown {
  const hoursUntil = (new Date(booking.startTime).getTime() - now.getTime()) / 3_600_000;
  const freeWindowHours = rules.cancellationPolicyHours ?? 24;
  const hardCutoffHours = rules.cancellationHardCutoffHours ?? 2;
  const lateFeePercent = rules.cancellationLateFeePercent ?? 0.5;

  const paidCents = booking.paidAmountCents ?? 0;
  const currency = booking.paidCurrency?.toLowerCase() || 'cad';

  if (hoursUntil < 0) {
    return {
      hoursUntil, outcome: 'past',
      feePercent: 0, feeCents: 0, refundCents: 0,
      currency, freeWindowHours, hardCutoffHours,
    };
  }
  if (hoursUntil < hardCutoffHours) {
    return {
      hoursUntil, outcome: 'blocked',
      feePercent: 0, feeCents: 0, refundCents: 0,
      currency, freeWindowHours, hardCutoffHours,
    };
  }
  if (hoursUntil >= freeWindowHours) {
    return {
      hoursUntil, outcome: 'free',
      feePercent: 0, feeCents: 0, refundCents: paidCents,
      currency, freeWindowHours, hardCutoffHours,
    };
  }
  // Inside policy window but before hard cutoff → late fee.
  const feeCents = Math.round(paidCents * lateFeePercent);
  return {
    hoursUntil, outcome: 'fee',
    feePercent: lateFeePercent,
    feeCents,
    refundCents: Math.max(0, paidCents - feeCents),
    currency, freeWindowHours, hardCutoffHours,
  };
}

/**
 * Compassionate-cancel keywords. When a client's cancel reason includes
 * any of these, the admin override modal pre-fills "Waive (compassion)"
 * for one-click approval. Dr. Hala always confirms — never automatic.
 *
 * Curated list, EN+AR. Bias toward false-positives (suggest waiver) over
 * false-negatives (miss a real emergency) — Dr. Hala can always reject.
 */
const COMPASSIONATE_KEYWORDS_EN = [
  'death', 'died', 'passed away', 'passing', 'funeral', 'bereavement',
  'hospital', 'hospitalized', 'er ', 'emergency', 'urgent care',
  'illness', 'sick', 'flu', 'covid', 'fever', 'surgery',
  'accident', 'crash', 'injury', 'injured',
  'family crisis', 'mental health', 'crisis', 'breakdown',
  'miscarriage', 'pregnancy', 'labor',
];
const COMPASSIONATE_KEYWORDS_AR = [
  'وفاة', 'توفي', 'توفيت', 'جنازة', 'عزاء',
  'مستشفى', 'طوارئ', 'حادث', 'مرض', 'مريض', 'عملية',
  'إصابة', 'أزمة', 'انهيار', 'إجهاض', 'ولادة',
];

export interface CompassionateMatch {
  matched: boolean;
  /** Keywords that triggered the match (for highlighting in admin UI). */
  keywords: string[];
  /** Suggested action — 'waive' (full waiver), 'reduce' (half), or null. */
  suggestion: 'waive' | 'reduce' | null;
}

// ─── Reschedule fee math ────────────────────────────────────────

export interface RescheduleFeeBreakdown {
  hoursUntil: number;
  /**
   * - 'free': within free-reschedule window OR client has free reschedules left.
   * - 'fee': late reschedule + over the free count → fee applies.
   * - 'maxed': hit the max reschedules cap → must cancel + rebook.
   * - 'blocked': past hard cutoff (same as cancel hardCutoffHours).
   */
  outcome: 'free' | 'fee' | 'maxed' | 'blocked';
  rescheduleCount: number;
  freeCount: number;
  maxCount: number;
  feePercent: number;
  feeCents: number;
  /** Hours threshold for free reschedule (default 24). */
  windowHours: number;
  hardCutoffHours: number;
}

export function computeRescheduleFee(
  booking: Booking,
  rules: Partial<AvailabilityRules> = {},
  now: Date = new Date(),
): RescheduleFeeBreakdown {
  const hoursUntil = (new Date(booking.startTime).getTime() - now.getTime()) / 3_600_000;
  const windowHours = rules.rescheduleWindowHours ?? 24;
  const hardCutoffHours = rules.cancellationHardCutoffHours ?? 2;
  const freeCount = rules.rescheduleFreeCount ?? 2;
  const maxCount = rules.rescheduleMaxPerBooking ?? 4;
  const lateFeePercent = rules.rescheduleLateFeePercent ?? 0.25;
  const rescheduleCount = booking.rescheduleCount ?? 0;

  const paidCents = booking.paidAmountCents ?? 0;
  const baseShape = { hoursUntil, rescheduleCount, freeCount, maxCount, windowHours, hardCutoffHours };

  if (hoursUntil < hardCutoffHours) {
    return { ...baseShape, outcome: 'blocked', feePercent: 0, feeCents: 0 };
  }
  if (rescheduleCount >= maxCount) {
    return { ...baseShape, outcome: 'maxed', feePercent: 0, feeCents: 0 };
  }
  // Free if BOTH the count is under free + we're outside the late window,
  // OR the client still has free reschedules even when late (default policy
  // is generous on count, strict on lateness).
  const withinFreeCount = rescheduleCount < freeCount;
  const insideLateWindow = hoursUntil < windowHours;

  if (withinFreeCount && !insideLateWindow) {
    return { ...baseShape, outcome: 'free', feePercent: 0, feeCents: 0 };
  }
  if (withinFreeCount && insideLateWindow) {
    // Free count covers it, but late — Mo wanted "more generous" so we DO
    // honor the free count even on late reschedules. No fee.
    return { ...baseShape, outcome: 'free', feePercent: 0, feeCents: 0 };
  }
  // Past free count — apply late fee if late, else free (we don't penalize
  // exceed-count if they reschedule with plenty of notice; only the late
  // overage triggers the fee).
  if (!insideLateWindow) {
    return { ...baseShape, outcome: 'free', feePercent: 0, feeCents: 0 };
  }
  return {
    ...baseShape,
    outcome: 'fee',
    feePercent: lateFeePercent,
    feeCents: Math.round(paidCents * lateFeePercent),
  };
}

/** Detect compassionate-cancel keywords in a client's cancel reason. */
export function detectCompassionateCancel(reason?: string | null): CompassionateMatch {
  if (!reason || reason.trim().length === 0) {
    return { matched: false, keywords: [], suggestion: null };
  }
  const lc = reason.toLowerCase();
  const hits: string[] = [];
  for (const kw of COMPASSIONATE_KEYWORDS_EN) {
    if (lc.includes(kw)) hits.push(kw.trim());
  }
  for (const kw of COMPASSIONATE_KEYWORDS_AR) {
    if (reason.includes(kw)) hits.push(kw);
  }
  if (hits.length === 0) {
    return { matched: false, keywords: [], suggestion: null };
  }
  return {
    matched: true,
    keywords: Array.from(new Set(hits)),
    // Default to full waiver — Dr. Hala can downshift to reduce.
    suggestion: 'waive',
  };
}
