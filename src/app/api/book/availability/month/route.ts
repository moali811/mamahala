/* GET /api/book/availability/month?month=2026-04&duration=50 */

import { NextRequest, NextResponse } from 'next/server';
import { getMonthAvailability } from '@/lib/booking/availability';
import { fetchMonthBusySlots } from '@/lib/booking/google-calendar';
import { getEffectiveTimezone } from '@/lib/booking/provider-location';
import type { MonthAvailabilityResponse } from '@/lib/booking/types';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const month = searchParams.get('month');
  const duration = parseInt(searchParams.get('duration') ?? '50', 10);

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json(
      { error: 'month param required (YYYY-MM)' },
      { status: 400 },
    );
  }

  try {
    // Resolve the provider's "currently in" timezone for the label shown
    // on the booking page ("Dr. Hala is in X"). We anchor this to "today"
    // rather than the month's midpoint so that, when the user navigates
    // to next month, the label continues to reflect Dr. Hala's PRESENT
    // location — not a guess about where she'll be then. The per-day
    // slot computation is already travel-schedule-aware, so opening a
    // month that falls inside a trip still produces the right slots.
    const effectiveTimezone = await getEffectiveTimezone(new Date());
    const busySlotsMap = await fetchMonthBusySlots(month);
    const dates = await getMonthAvailability(month, duration, busySlotsMap);

    const response: MonthAvailabilityResponse = {
      month,
      timezone: effectiveTimezone,
      dates,
    };

    return NextResponse.json(response, {
      // Shorter cache (60s vs 120s) because the effective timezone can
      // flip when the admin edits the travel schedule or override pill.
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' },
    });
  } catch (err) {
    console.error('[Month Availability] Error:', err);
    return NextResponse.json({ error: 'Failed to fetch month availability' }, { status: 500 });
  }
}
