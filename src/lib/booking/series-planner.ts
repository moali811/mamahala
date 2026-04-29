/* ================================================================
   Series Planner — pure helpers for recurring-booking math
   ================================================================
   Extracted from /api/admin/booking/plan-series so the conversion
   flow (and any future series flow) can reuse the same step-days
   logic and slot-conflict probing without round-tripping through
   the HTTP route.
   ================================================================ */

import { getAvailableSlots } from './availability';
import { fetchBusySlots } from './google-calendar';
import type { RecurrenceFrequency, TimeSlot } from './types';

export type PlanSlotStatus = 'available' | 'conflict' | 'outside-hours';

export interface PlannedSlot {
  index: number;
  startTime: string;
  endTime: string;
  status: PlanSlotStatus;
  conflictReason?: string;
  suggestedAlternatives?: Array<{ startTime: string; endTime: string }>;
}

export interface PlanSeriesArgs {
  /** ISO UTC start of session 1. */
  startTime: string;
  frequency: RecurrenceFrequency;
  /** Total sessions including the anchor. Caller is responsible for capping. */
  count: number;
  durationMinutes: number;
}

const MAX_ALTERNATIVES = 3;
const ALTERNATIVE_WINDOW_DAYS = 3;

export function frequencyToStepDays(f: RecurrenceFrequency): number {
  switch (f) {
    case 'weekly': return 7;
    case 'biweekly': return 14;
    case 'every3weeks': return 21;
  }
}

export function addDaysIso(iso: string, days: number): string {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString();
}

export function addMinutesIso(iso: string, minutes: number): string {
  return new Date(new Date(iso).getTime() + minutes * 60_000).toISOString();
}

export function ymdFromIso(iso: string): string {
  return iso.slice(0, 10);
}

/** Roll forward N session slots from the anchor at the chosen frequency. */
export function rollSlots(
  args: PlanSeriesArgs,
): Array<{ index: number; startTime: string; endTime: string }> {
  const stepDays = frequencyToStepDays(args.frequency);
  const out: Array<{ index: number; startTime: string; endTime: string }> = [];
  for (let i = 0; i < args.count; i++) {
    const startTime = addDaysIso(args.startTime, i * stepDays);
    const endTime = addMinutesIso(startTime, args.durationMinutes);
    out.push({ index: i + 1, startTime, endTime });
  }
  return out;
}

function pickClosestAvailable(
  slots: TimeSlot[],
  targetIso: string,
  limit: number,
): TimeSlot[] {
  const target = new Date(targetIso).getTime();
  return slots
    .filter(s => s.available)
    .map(s => ({ slot: s, distance: Math.abs(new Date(s.start).getTime() - target) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(x => x.slot);
}

export async function findAlternativesForSlot(
  targetIso: string,
  durationMinutes: number,
): Promise<Array<{ startTime: string; endTime: string }>> {
  const results: Array<{ startTime: string; endTime: string }> = [];
  const targetDate = ymdFromIso(targetIso);

  const offsets = [0, -1, 1, -2, 2, -3, 3].filter(
    d => Math.abs(d) <= ALTERNATIVE_WINDOW_DAYS,
  );

  for (const offset of offsets) {
    if (results.length >= MAX_ALTERNATIVES) break;

    const date = offset === 0
      ? targetDate
      : ymdFromIso(addDaysIso(`${targetDate}T00:00:00.000Z`, offset));

    const busy = await fetchBusySlots(date, date).catch(() => []);
    const slots = await getAvailableSlots(date, durationMinutes, busy);

    const closest = pickClosestAvailable(slots, targetIso, MAX_ALTERNATIVES - results.length);
    for (const s of closest) {
      results.push({ startTime: s.start, endTime: s.end });
      if (results.length >= MAX_ALTERNATIVES) break;
    }
  }

  return results;
}

function reasonToMessage(reason: TimeSlot['reason']): string {
  switch (reason) {
    case 'busy': return 'Conflicts with an existing Google Calendar event';
    case 'buffer': return 'Too close to another booking (buffer overlap)';
    case 'max-reached': return 'Max sessions for this day already reached';
    case 'blocked': return 'This date/time has been blocked';
    case 'past': return 'Too close to now (minimum-notice rule)';
    case 'outside-hours': return "Outside Dr. Hala's working hours";
    default: return 'Unavailable';
  }
}

/**
 * Plan a series end-to-end: roll forward, check each slot against the
 * availability engine, suggest alternatives for any that conflict.
 *
 * `withAlternatives: false` skips the (expensive) alternative search —
 * useful for the convert flow which only needs a yes/no on each slot
 * before it asks the admin to resolve conflicts manually.
 */
export async function planSeries(
  args: PlanSeriesArgs,
  options: { withAlternatives?: boolean } = {},
): Promise<PlannedSlot[]> {
  const { withAlternatives = true } = options;
  const candidates = rollSlots(args);

  const uniqueDates = Array.from(new Set(candidates.map(c => ymdFromIso(c.startTime))));
  const busyCache = new Map<string, Awaited<ReturnType<typeof fetchBusySlots>>>();
  for (const date of uniqueDates) {
    const busy = await fetchBusySlots(date, date).catch(() => []);
    busyCache.set(date, busy);
  }

  const planSlots: PlannedSlot[] = [];

  for (const cand of candidates) {
    const date = ymdFromIso(cand.startTime);
    const busy = busyCache.get(date) ?? [];
    const daySlots = await getAvailableSlots(date, args.durationMinutes, busy);

    const match = daySlots.find(s => s.start === cand.startTime);

    let status: PlanSlotStatus;
    let conflictReason: string | undefined;

    if (!match) {
      status = 'outside-hours';
      conflictReason = "Outside Dr. Hala's working hours for this day";
    } else if (match.available) {
      status = 'available';
    } else {
      status = match.reason === 'busy' || match.reason === 'buffer'
        ? 'conflict'
        : 'outside-hours';
      conflictReason = reasonToMessage(match.reason);
    }

    const slot: PlannedSlot = {
      index: cand.index,
      startTime: cand.startTime,
      endTime: cand.endTime,
      status,
      conflictReason,
    };

    if (status !== 'available' && withAlternatives) {
      slot.suggestedAlternatives = await findAlternativesForSlot(
        cand.startTime,
        args.durationMinutes,
      );
    }

    planSlots.push(slot);
  }

  return planSlots;
}
