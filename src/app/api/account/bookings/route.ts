/* GET /api/account/bookings — Client's upcoming and past bookings */

import { NextResponse } from 'next/server';
import { getBookingSession, getBookingsByCustomer } from '@/lib/booking/booking-store';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('booking_session')?.value;

    if (!sessionId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await getBookingSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const bookings = await getBookingsByCustomer(session.email);
    const now = new Date().toISOString();

    // Split into upcoming and past
    const upcoming = bookings
      .filter(b => b.startTime > now && b.status === 'confirmed')
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    const past = bookings
      .filter(b => b.startTime <= now || b.status !== 'confirmed')
      .sort((a, b) => b.startTime.localeCompare(a.startTime))
      .slice(0, 20); // Limit past to 20

    return NextResponse.json({
      upcoming: upcoming.map(sanitizeBooking),
      past: past.map(sanitizeBooking),
    });
  } catch (err) {
    console.error('[Account Bookings] Error:', err);
    return NextResponse.json({ error: 'Failed to load bookings' }, { status: 500 });
  }
}

function sanitizeBooking(b: any) {
  return {
    bookingId: b.bookingId,
    serviceSlug: b.serviceSlug,
    serviceName: b.serviceName,
    sessionMode: b.sessionMode,
    durationMinutes: b.durationMinutes,
    startTime: b.startTime,
    endTime: b.endTime,
    status: b.status,
    clientTimezone: b.clientTimezone,
    clientNotes: b.clientNotes,
    aiPrepTips: b.aiPrepTips,
    confirmedAt: b.confirmedAt,
    cancelledAt: b.cancelledAt,
    cancelReason: b.cancelReason,
    rescheduledTo: b.rescheduledTo,
  };
}
