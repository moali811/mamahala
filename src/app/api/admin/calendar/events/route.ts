/* GET /api/admin/calendar/events?timeMin=ISO&timeMax=ISO
   ----------------------------------------------------------------
   Returns Dr. Hala's Google Calendar events for the given range.
   Used by the admin Calendar view to overlay personal appointments
   alongside client bookings from KV.
*/

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { fetchAdminCalendarEvents } from '@/lib/booking/google-calendar';

export async function GET(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  const { searchParams } = new URL(request.url);
  const timeMin = searchParams.get('timeMin');
  const timeMax = searchParams.get('timeMax');

  if (!timeMin || !timeMax) {
    return NextResponse.json(
      { error: 'timeMin and timeMax are required (ISO 8601)' },
      { status: 400 },
    );
  }

  try {
    const events = await fetchAdminCalendarEvents(timeMin, timeMax);
    return NextResponse.json({ events });
  } catch (err) {
    console.error('[Admin Calendar Events] Error:', err);
    return NextResponse.json({ events: [] });
  }
}
