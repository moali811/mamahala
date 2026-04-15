/* GET /api/book/availability/month?month=2026-04&duration=50 */

import { NextRequest, NextResponse } from 'next/server';
import { getMonthAvailability } from '@/lib/booking/availability';
import { fetchMonthBusySlots } from '@/lib/booking/google-calendar';
import { getAvailabilityRules } from '@/lib/booking/booking-store';
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
    // Load provider timezone from KV (admin-edited). Don't hardcode Toronto.
    const rules = await getAvailabilityRules();
    const busySlotsMap = await fetchMonthBusySlots(month);
    const dates = await getMonthAvailability(month, duration, busySlotsMap);

    const response: MonthAvailabilityResponse = {
      month,
      timezone: rules.timezone,
      dates,
    };

    return NextResponse.json(response, {
      headers: { 'Cache-Control': 'public, max-age=120, s-maxage=120' },
    });
  } catch (err) {
    console.error('[Month Availability] Error:', err);
    return NextResponse.json({ error: 'Failed to fetch month availability' }, { status: 500 });
  }
}
