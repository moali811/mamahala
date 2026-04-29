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

    // Upcoming includes any active state with a future startTime so series
    // siblings (which sit in 'approved' or 'pending-review' until completion)
    // surface in the ManageSeriesPanel alongside one-off confirmed bookings.
    const upcomingActive = new Set(['confirmed', 'approved', 'pending-review', 'pending_approval']);
    const upcoming = bookings
      .filter(b => b.startTime > now && upcomingActive.has(b.status))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    const past = bookings
      .filter(b => b.startTime <= now || !upcomingActive.has(b.status))
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
    // Series metadata — needed by ManageSeriesPanel to group siblings.
    // Internal-only fields like bundleInvoiceDraftId stay out.
    series: b.series
      ? {
          seriesId: b.series.seriesId,
          seriesIndex: b.series.seriesIndex,
          seriesTotal: b.series.seriesTotal,
          frequency: b.series.frequency,
          invoiceMode: b.series.invoiceMode,
          paidUpfront: b.series.paidUpfront ?? false,
          origin: b.series.origin,
        }
      : undefined,
  };
}
