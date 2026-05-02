/* GET /api/book/soonest — First available slot, walking forward
   ================================================================
   Powers the panic / on-the-go fast lane. The client doesn't pick a
   day or time — we compute the next slot the system can offer and
   hand it back. The booking wizard then jumps straight to confirm.

   Query params:
     service?  service slug (default: online-phone-consultation)
     tz?       client IANA timezone (display only — slot is provider tz)
     within?   horizon in days, max 30 (default: 14)
     from?     ISO 8601 timestamp — walk forward from this date instead
               of today. Used by step-5 slot-conflict recovery to find
               the next opening AT OR AFTER the user's originally chosen
               time, not "soonest from now" which could go backwards.

   Response:
     {
       service: { slug, name, nameAr, durationMinutes, sessionMode },
       slot:    { startTime, endTime, durationMinutes, locationLabel },
       horizonDays
     }

   Or, if nothing within horizon:
     { noSlotAvailable: true, horizonDays }

   Reuses the same slot-computation primitives as /api/book/availability,
   so respects: travel schedule, Dr. Hala's day-off rules, GCal busy
   cache, pending-review holds, smart-hold pending_approval blocks,
   buffer between sessions, max sessions per day, minimum-notice hours.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/booking/availability';
import { fetchBusySlots } from '@/lib/booking/google-calendar';
import { getAvailabilityRules } from '@/lib/booking/booking-store';
import { getEffectiveLocation } from '@/lib/booking/provider-location';
import { services } from '@/data/services';
import { PRICING_TIERS, type PricingTierKey } from '@/config/pricing';

const DEFAULT_SERVICE_SLUG = 'online-phone-consultation';
const DEFAULT_HORIZON_DAYS = 14;
const MAX_HORIZON_DAYS = 30;

function addDaysIso(base: Date, days: number): string {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const slug = searchParams.get('service') || DEFAULT_SERVICE_SLUG;
  const horizonRaw = parseInt(searchParams.get('within') ?? `${DEFAULT_HORIZON_DAYS}`, 10);
  const horizonDays = Math.min(
    isNaN(horizonRaw) ? DEFAULT_HORIZON_DAYS : Math.max(1, horizonRaw),
    MAX_HORIZON_DAYS,
  );

  const service = services.find(s => s.slug === slug);
  if (!service) {
    return NextResponse.json({ error: `Unknown service: ${slug}` }, { status: 400 });
  }

  const tier = PRICING_TIERS[service.pricingTierKey as PricingTierKey];
  const durationMinutes = tier?.durationMinutes ?? 50;

  // Optional `from` — recovery flow asks for "next slot at-or-after my
  // original time" so the suggested slot doesn't go BACKWARDS in time.
  // Reject anything more than 30 days out (matches the horizon ceiling)
  // and silently fall back to "now" if the value can't be parsed.
  const fromRaw = searchParams.get('from');
  let baseDate = new Date();
  if (fromRaw) {
    const parsed = new Date(fromRaw);
    const thirtyDaysOut = Date.now() + MAX_HORIZON_DAYS * 24 * 60 * 60 * 1000;
    if (!isNaN(parsed.getTime()) && parsed.getTime() <= thirtyDaysOut) {
      baseDate = parsed > new Date() ? parsed : new Date();
    }
  }

  try {
    const rules = await getAvailabilityRules();

    // Walk forward day-by-day from baseDate. Stop at the first available
    // slot, or after exhausting the horizon. When `from` was provided,
    // skip slots whose start time is strictly before `from` on that first
    // day (we want at-or-after, not earlier-the-same-day).
    const fromMs = fromRaw ? baseDate.getTime() : 0;
    for (let i = 0; i < horizonDays; i++) {
      const date = addDaysIso(baseDate, i);
      const busySlots = await fetchBusySlots(date, date);
      const slots = await getAvailableSlots(date, durationMinutes, busySlots, rules);
      const firstAvailable = slots.find(s => s.available && (i > 0 || new Date(s.start).getTime() >= fromMs));
      if (firstAvailable) {
        const midday = new Date(`${date}T12:00:00Z`);
        const effectiveLoc = await getEffectiveLocation(midday);
        return NextResponse.json(
          {
            service: {
              slug: service.slug,
              name: service.name,
              nameAr: service.nameAr,
              durationMinutes,
              sessionMode: 'online' as const,
            },
            slot: {
              startTime: firstAvailable.start,
              endTime: firstAvailable.end,
              durationMinutes,
              locationLabel: effectiveLoc.locationLabel,
            },
            horizonDays,
          },
          { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' } },
        );
      }
    }

    return NextResponse.json(
      { noSlotAvailable: true, horizonDays },
      { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' } },
    );
  } catch (err) {
    console.error('[Soonest] Error:', err);
    return NextResponse.json({ error: 'Failed to find soonest slot' }, { status: 500 });
  }
}
