/* POST /api/admin/booking/update-status
   Body: { bookingId, status, notifyClient? }
   Auth: Bearer password header

   When notifyClient is true, sends the appropriate email
   to the client based on the new status. */

import { NextRequest, NextResponse } from 'next/server';
import {
  getBooking,
  updateBooking,
  getBookingsBySeriesId,
  createManageToken,
} from '@/lib/booking/booking-store';
import { authorize } from '@/lib/invoicing/auth';
import {
  sendBookingEmail,
  buildCancellationEmail,
  buildStatusConfirmedEmail,
  buildStatusCompletedEmail,
  buildStatusNoShowEmail,
} from '@/lib/booking/emails';
import { recomputeBundleInvoice } from '@/lib/invoicing/booking-intake';
import { deleteCalendarEvent } from '@/lib/booking/google-calendar';
import type { Booking, BookingStatus } from '@/lib/booking/types';

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

    // ─── GCal cleanup for cancelled/declined/no-show ────────────
    const gcalRemovalStatuses = ['cancelled', 'declined', 'no-show'];
    if (gcalRemovalStatuses.includes(status)) {
      try { await deleteCalendarEvent(bookingId); } catch { /* best effort */ }
    }

    // ─── Series cascade: cancel-one ────────────────────────────
    // If this booking is part of a recurring series AND the new status
    // removes it from the series (cancelled / declined / no-show), we:
    //   1. Record the cancelled index on every sibling so the UI can
    //      render "2 of 8 (1 cancelled)" without re-scanning the store.
    //   2. For bundled series, recompute the anchor draft's line items
    //      so the bill reflects only the remaining sessions.
    const removesFromSeries =
      status === 'cancelled' || status === 'declined' || status === 'no-show';
    if (removesFromSeries && booking.series?.seriesId) {
      try {
        const seriesId = booking.series.seriesId;
        const cancelledIndex = booking.series.seriesIndex;
        const siblings = await getBookingsBySeriesId(seriesId);
        await Promise.all(
          siblings.map(async (sib: Booking) => {
            if (sib.bookingId === bookingId) return; // already patched above
            if (!sib.series) return;
            const existing = sib.series.seriesCancelledIndices ?? [];
            if (existing.includes(cancelledIndex)) return;
            await updateBooking(sib.bookingId, {
              series: {
                ...sib.series,
                seriesCancelledIndices: [...existing, cancelledIndex],
              },
            });
          }),
        );

        // Also patch the cancelled booking's own record so it sees the
        // same cancellation list (consistency for client-side reads).
        const selfExisting = booking.series.seriesCancelledIndices ?? [];
        if (!selfExisting.includes(cancelledIndex)) {
          await updateBooking(bookingId, {
            series: {
              ...booking.series,
              seriesCancelledIndices: [...selfExisting, cancelledIndex],
            },
          });
        }

        // Bundled series: rebuild the anchor invoice so it reflects
        // the remaining active sessions (e.g. 8 → 7 line items).
        if (booking.series.invoiceMode === 'bundled') {
          await recomputeBundleInvoice(seriesId).catch(err =>
            console.error('[Update Status] recomputeBundleInvoice failed:', err),
          );
        }
      } catch (seriesErr) {
        console.error('[Update Status] Series cascade failed:', seriesErr);
        // Don't block the cancel — main booking update already succeeded
      }
    }

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
