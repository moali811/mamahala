/* GET /api/book/availability?date=YYYY-MM-DD&duration=50&tz=America/Toronto */

import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/booking/availability';
import { fetchBusySlots } from '@/lib/booking/google-calendar';
import { getAvailabilityRules } from '@/lib/booking/booking-store';
import { getEffectiveTimezone } from '@/lib/booking/provider-location';
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
    // Load the current availability rules (admin-edited from /admin).
    const rules = await getAvailabilityRules();

    // Resolve the effective timezone FOR THIS SPECIFIC DAY via the travel
    // schedule + manual override resolver. `rules.timezone` is the
    // home-base fallback; if Dr. Hala is travelling on this date (or has
    // a manual override active), the effective tz is different.
    //
    // We pass midday UTC so the resolver lands squarely inside the
    // target local day regardless of the timezone's UTC offset.
    const midday = new Date(`${date}T12:00:00Z`);
    const effectiveTimezone = await getEffectiveTimezone(midday);

    // Fetch GCal busy slots for the day
    const busySlots = await fetchBusySlots(date, date);

    // Compute available slots (uses getEffectiveTimezone internally per day)
    const slots = await getAvailableSlots(date, duration, busySlots, rules);

    const response: AvailabilityResponse = {
      date,
      // Return the EFFECTIVE timezone for this date so the booking page
      // shows "Dr. Hala is in {effective}" — matching wherever she'll
      // actually be when the session happens.
      timezone: effectiveTimezone,
      clientTimezone: clientTz,
      slots,
      inPersonEnabled: rules.inPersonEnabled ?? true,
    };

    return NextResponse.json(response, {
      // Cache-Control kept short (60s) because the effective timezone
      // can flip when the admin edits the travel schedule or override.
      headers: { 'Cache-Control': 'public, max-age=30, s-maxage=30' },
    });
  } catch (err) {
    console.error('[Availability] Error:', err);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
