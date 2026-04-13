/* POST /api/admin/booking/update-status
   Body: { bookingId, status, notifyClient? }
   Auth: Bearer password header

   When notifyClient is true, sends the appropriate email
   to the client based on the new status. */

import { NextRequest, NextResponse } from 'next/server';
import { getBooking, updateBooking, createManageToken } from '@/lib/booking/booking-store';
import { authorize } from '@/lib/invoicing/auth';
import {
  sendBookingEmail,
  buildCancellationEmail,
  buildStatusConfirmedEmail,
  buildStatusCompletedEmail,
  buildStatusNoShowEmail,
} from '@/lib/booking/emails';
import type { BookingStatus } from '@/lib/booking/types';

const VALID_STATUSES: BookingStatus[] = [
  'pending_approval', 'approved', 'confirmed', 'completed', 'cancelled', 'declined', 'rescheduled', 'no-show',
];

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { bookingId, status, notifyClient } = await request.json();
    if (!bookingId || !status) {
      return NextResponse.json({ error: 'bookingId and status required' }, { status: 400 });
    }
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Invalid status: ${status}` }, { status: 400 });
    }

    const booking = await getBooking(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    await updateBooking(bookingId, {
      status,
      updatedAt: new Date().toISOString(),
      ...(status === 'confirmed' ? { confirmedAt: new Date().toISOString() } : {}),
      ...(status === 'cancelled' ? { cancelledAt: new Date().toISOString() } : {}),
      ...(status === 'completed' ? { completedAt: new Date().toISOString() } : {}),
    });

    // Send client notification if requested
    let emailSent = false;
    if (notifyClient && booking.clientEmail) {
      try {
        const updatedBooking = { ...booking, status: status as BookingStatus };
        let emailData: { subject: string; html: string; icsContent?: string } | null = null;

        switch (status) {
          case 'cancelled': {
            emailData = buildCancellationEmail(updatedBooking);
            break;
          }
          case 'confirmed': {
            const token = await createManageToken(bookingId);
            emailData = buildStatusConfirmedEmail(updatedBooking, token);
            break;
          }
          case 'completed': {
            emailData = buildStatusCompletedEmail(updatedBooking);
            break;
          }
          case 'no-show': {
            emailData = buildStatusNoShowEmail(updatedBooking);
            break;
          }
        }

        if (emailData) {
          await sendBookingEmail({
            to: booking.clientEmail,
            subject: emailData.subject,
            html: emailData.html,
            icsContent: emailData.icsContent,
          });
          emailSent = true;
        }
      } catch (emailErr) {
        console.error('[Update Status] Email failed:', emailErr);
        // Don't block status change — email is best-effort
      }
    }

    return NextResponse.json({ success: true, bookingId, status, emailSent });
  } catch (err) {
    console.error('[Update Status]', err);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
