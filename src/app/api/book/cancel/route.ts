/* POST /api/book/cancel — Cancel a booking */

import { NextRequest, NextResponse } from 'next/server';
import { validateManageToken, getBooking, updateBooking } from '@/lib/booking/booking-store';
import { deleteCalendarEvent } from '@/lib/booking/google-calendar';
import { buildCancellationEmail, sendBookingEmail, notifyAdmin } from '@/lib/booking/emails';
import { deleteDraft } from '@/lib/invoicing/kv-store';

export async function POST(request: NextRequest) {
  try {
    const { token, reason } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const bookingId = await validateManageToken(token);
    if (!bookingId) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const booking = await getBooking(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (!['confirmed', 'approved', 'pending_approval'].includes(booking.status)) {
      return NextResponse.json(
        { error: `Cannot cancel a ${booking.status} booking` },
        { status: 400 },
      );
    }

    // Check policy
    const hoursUntil = (new Date(booking.startTime).getTime() - Date.now()) / 3_600_000;
    if (hoursUntil < 2) {
      return NextResponse.json(
        { error: 'Too close to session time. Please contact us directly.' },
        { status: 403 },
      );
    }

    // Mark as cancelled
    const updated = await updateBooking(bookingId, {
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
      cancelReason: reason?.trim() || undefined,
    });

    // Delete Google Calendar event
    deleteCalendarEvent(bookingId).catch(err =>
      console.error('[Cancel] GCal deletion failed:', err),
    );

    // Delete the draft invoice (if exists)
    if (booking.draftId) {
      deleteDraft(booking.draftId).catch(err =>
        console.error('[Cancel] Draft deletion failed:', err),
      );
    }

    // Send cancellation email + admin notification in parallel, awaited.
    // MUST be awaited — see /api/book/confirm/route.ts for the full
    // explanation of the Vercel serverless Lambda termination race
    // that silently drops fire-and-forget email sends.
    const cancelledBooking = updated ?? { ...booking, status: 'cancelled' as const, cancelReason: reason };
    const { subject, html, icsContent } = buildCancellationEmail(cancelledBooking);
    await Promise.all([
      sendBookingEmail({
        to: booking.clientEmail,
        subject,
        html,
        icsContent,
      }).catch(err => console.error('[Cancel] Email failed:', err)),
      notifyAdmin('cancellation', cancelledBooking).catch(err =>
        console.error('[Cancel] Admin notification failed:', err),
      ),
    ]);

    return NextResponse.json({ cancelled: true, message: 'Booking has been cancelled.' });
  } catch (err) {
    console.error('[Cancel] Error:', err);
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
  }
}
