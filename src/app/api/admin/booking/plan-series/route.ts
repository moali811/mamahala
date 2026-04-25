/* ================================================================
   POST /api/admin/booking/plan-series — Recurring series planner
   ================================================================
   Given a first-session start time + frequency + count, returns a
   per-slot availability check so the admin UI can render a
   checklist ("session 3 conflicts with an existing booking —
   here are 3 alternatives").

   Read-only. No bookings are created and no state is mutated.
   Admin reviews the result, adjusts slots if needed, and then
   posts the final list to /api/admin/booking/create-draft.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { services } from '@/data/services';
import { PRICING_TIERS, type PricingTierKey } from '@/config/pricing';
import { getAvailableSlots } from '@/lib/booking/availability';
import { fetchBusySlots } from '@/lib/booking/google-calendar';
import type { TimeSlot } from '@/lib/booking/types';

export const maxDuration = 30;

type PlanSlotStatus = 'available' | 'conflict' | 'outside-hours';

interface PlanSlot {
  index: number;
  startTime: string;
  endTime: string;
  status: PlanSlotStatus;
  conflictReason?: string;
  suggestedAlternatives?: Array<{ startTime: string; endTime: string }>;
}

interface PlanSeriesRequest {
  serviceSlug: string;
  /** ISO UTC — first session start. */
  startTime: string;
  frequency: 'weekly' | 'biweekly';
  count: number;
  /** Optional override for duration; defaults to the tier's durationMinutes. */
  durationMinutes?: number;
}

/** Max suggested alternatives per conflicting slot. */
const MAX_ALTERNATIVES = 3;
/** Search window (± days) for alternatives when a slot conflicts. */
const ALTERNATIVE_WINDOW_DAYS = 3;

function addDaysIso(iso: string, days: number): string {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString();
}

function addMinutesIso(iso: string, minutes: number): string {
  return new Date(new Date(iso).getTime() + minutes * 60_000).toISOString();
}

function ymdFromIso(iso: string): string {
  return iso.slice(0, 10);
}

/**
 * Find available slots near a target time on the same day.
 * Returns up to `limit` slots closest to `targetIso` in absolute
 * time distance. Used to suggest alternatives when a requested
 * slot conflicts.
 */
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

async function findAlternativesForSlot(
  targetIso: string,
  durationMinutes: number,
): Promise<Array<{ startTime: string; endTime: string }>> {
  const results: Array<{ startTime: string; endTime: string }> = [];
  const targetDate = ymdFromIso(targetIso);

  // Search same-day first, then radiating outward by ±1, ±2, ±3 days.
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

export async function POST(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const body = (await request.json()) as PlanSeriesRequest;

    // ─── Validate ─────────────────────────────────────────────
    if (!body.serviceSlug || !body.startTime || !body.frequency || !body.count) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceSlug, startTime, frequency, count' },
        { status: 400 },
      );
    }

    if (body.count < 1 || body.count > 12) {
      return NextResponse.json(
        { error: 'Count must be between 1 and 12' },
        { status: 400 },
      );
    }

    if (body.frequency !== 'weekly' && body.frequency !== 'biweekly') {
      return NextResponse.json(
        { error: 'Frequency must be "weekly" or "biweekly"' },
        { status: 400 },
      );
    }

    const service = services.find(s => s.slug === body.serviceSlug);
    if (!service) {
      return NextResponse.json(
        { error: `Unknown service: ${body.serviceSlug}` },
        { status: 400 },
      );
    }

    // Resolve duration: caller override > tier default > 50 min
    const tier = PRICING_TIERS[service.pricingTierKey as PricingTierKey];
    const durationMinutes = body.durationMinutes ?? tier?.durationMinutes ?? 50;

    // ─── Generate candidate slots ──────────────────────────────
    const stepDays = body.frequency === 'weekly' ? 7 : 14;
    const candidates: Array<{ index: number; startTime: string; endTime: string }> = [];
    for (let i = 0; i < body.count; i++) {
      const startTime = addDaysIso(body.startTime, i * stepDays);
      const endTime = addMinutesIso(startTime, durationMinutes);
      candidates.push({ index: i + 1, startTime, endTime });
    }

    // ─── Check each candidate against the availability engine ──
    // We pre-fetch GCal busy data per unique date to minimize calls.
    const uniqueDates = Array.from(new Set(candidates.map(c => ymdFromIso(c.startTime))));
    const busyCache = new Map<string, Awaited<ReturnType<typeof fetchBusySlots>>>();
    for (const date of uniqueDates) {
      const busy = await fetchBusySlots(date, date).catch(() => []);
      busyCache.set(date, busy);
    }

    const planSlots: PlanSlot[] = [];

    for (const cand of candidates) {
      const date = ymdFromIso(cand.startTime);
      const busy = busyCache.get(date) ?? [];
      const daySlots = await getAvailableSlots(date, durationMinutes, busy);

      // Find the slot in the day's generated slots that matches this candidate.
      // Compare start time strings so we don't rely on Date round-tripping.
      const match = daySlots.find(
        s => s.start === cand.startTime,
      );

      let status: PlanSlotStatus;
      let conflictReason: string | undefined;

      if (!match) {
        // Candidate isn't in the generated slot list at all — probably a
        // time that sits outside the weekly schedule or between granularity
        // steps (e.g., 09:07 when granularity is 15min).
        status = 'outside-hours';
        conflictReason = 'Outside Dr. Hala\'s working hours for this day';
      } else if (match.available) {
        status = 'available';
      } else {
        status = match.reason === 'busy' || match.reason === 'buffer'
          ? 'conflict'
          : 'outside-hours';
        conflictReason = reasonToMessage(match.reason);
      }

      const slot: PlanSlot = {
        index: cand.index,
        startTime: cand.startTime,
        endTime: cand.endTime,
        status,
        conflictReason,
      };

      // Offer alternatives for conflict + outside-hours — but not for
      // available slots (no need).
      if (status !== 'available') {
        slot.suggestedAlternatives = await findAlternativesForSlot(
          cand.startTime,
          durationMinutes,
        );
      }

      planSlots.push(slot);
    }

    return NextResponse.json({
      slots: planSlots,
      durationMinutes,
      frequency: body.frequency,
      count: body.count,
    });
  } catch (err) {
    console.error('[plan-series] error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function reasonToMessage(reason: TimeSlot['reason']): string {
  switch (reason) {
    case 'busy': return 'Conflicts with an existing Google Calendar event';
    case 'buffer': return 'Too close to another booking (buffer overlap)';
    case 'max-reached': return 'Max sessions for this day already reached';
    case 'blocked': return 'This date/time has been blocked';
    case 'past': return 'Too close to now (minimum-notice rule)';
    case 'outside-hours': return 'Outside Dr. Hala\'s working hours';
    default: return 'Unavailable';
  }
}
