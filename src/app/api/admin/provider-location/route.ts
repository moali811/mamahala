/* ================================================================
   GET /api/admin/provider-location?date=YYYY-MM-DD
   ================================================================
   Returns the resolved effective location for a given date, used
   by the admin UI header pill and the NewBookingModal calendar to
   show Dr. Hala's current local time in the right timezone.

   Query params:
     - date (optional) — YYYY-MM-DD or ISO. Defaults to "now".
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { getEffectiveLocation } from '@/lib/booking/provider-location';

export const maxDuration = 10;

export async function GET(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const dateParam = request.nextUrl.searchParams.get('date');
    const instant = dateParam
      ? (dateParam.length === 10 ? new Date(`${dateParam}T12:00:00Z`) : new Date(dateParam))
      : new Date();

    if (Number.isNaN(instant.getTime())) {
      return NextResponse.json(
        { error: `Invalid date: ${dateParam}` },
        { status: 400 },
      );
    }

    const location = await getEffectiveLocation(instant);

    // Include a formatted local time string so the UI can show
    // "Dr. Hala is in Dubai, UAE (4:30 PM local)" without having
    // to re-implement timezone formatting.
    const localTimeFormatted = instant.toLocaleString('en-US', {
      timeZone: location.timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return NextResponse.json({
      ok: true,
      location,
      localTimeFormatted,
      queriedAt: instant.toISOString(),
    });
  } catch (err) {
    console.error('[provider-location GET] error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
