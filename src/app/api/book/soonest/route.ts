/* GET /api/book/soonest — First available slot, walking forward
   ================================================================
   Powers the panic / on-the-go fast lane. The client doesn't pick a
   day or time — we compute the next slot the system can offer and
   hand it back. The booking wizard then jumps straight to confirm.

   Query params:
     service?  service slug (default: online-phone-consultation)
     tz?       client IANA timezone (display only — slot is provider tz)
     within?   horizon in days, max 30 (default: 14)

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

  try {
    const rules = await getAvailabilityRules();
    const today = new Date();

    // Walk forward day-by-day. Stop at the first available slot, or after
    // exhausting the horizon. Each day pulls its own GCal busy + held
    // bookings via getAvailableSlots — costs N × KV reads for N days, but
    // typical cases land within 1-3 days so amortised cost is small. The
    // 60s edge cache below absorbs repeat hits while a client thinks.
    for (let i = 0; i < horizonDays; i++) {
      const date = addDaysIso(today, i);
      const busySlots = await fetchBusySlots(date, date);
      const slots = await getAvailableSlots(date, durationMinutes, busySlots, rules);
      const firstAvailable = slots.find(s => s.available);
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
