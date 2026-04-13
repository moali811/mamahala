/* GET /api/book/availability?date=YYYY-MM-DD&duration=50&tz=America/Toronto */

import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/booking/availability';
import { fetchBusySlots } from '@/lib/booking/google-calendar';
import type { AvailabilityResponse } from '@/lib/booking/types';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const date = searchParams.get('date');
  const duration = parseInt(searchParams.get('duration') ?? '50', 10);
  const clientTz = searchParams.get('tz') ?? 'America/Toronto';

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'date param required (YYYY-MM-DD)' },
      { status: 400 },
    );
  }

  if (isNaN(duration) || duration < 15 || duration > 180) {
    return NextResponse.json(
      { error: 'duration must be 15-180 minutes' },
      { status: 400 },
    );
  }

  try {
    // Fetch GCal busy slots for the day
    const busySlots = await fetchBusySlots(date, date);

    // Compute available slots
    const slots = await getAvailableSlots(date, duration, busySlots);

    const response: AvailabilityResponse = {
      date,
      timezone: 'America/Toronto',
      clientTimezone: clientTz,
      slots,
    };

    return NextResponse.json(response, {
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' },
    });
  } catch (err) {
    console.error('[Availability] Error:', err);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
