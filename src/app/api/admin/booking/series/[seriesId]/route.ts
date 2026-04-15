/* ================================================================
   DELETE /api/admin/booking/series/[seriesId] — Cancel whole series
   ================================================================
   Cancels every sibling in a recurring series in one call.
   For bundled series, voids the anchor draft invoice too.

   Optional body (via DELETE with body):
     { notifyClient?: boolean }  // send a single cancellation email

   Side effects per sibling:
     - status flipped to 'cancelled', cancelledAt set
     - GCal event deleted (best-effort)
     - For bundled series: recomputeBundleInvoice() → 0 items → void

   Guards:
     - Only bookings in active states (approved/confirmed/pending-review)
       are cancelled. Already-cancelled/declined siblings are skipped.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import {
  getBookingsBySeriesId,
  updateBooking,
} from '@/lib/booking/booking-store';
import { deleteCalendarEvent } from '@/lib/booking/google-calendar';
import {
  sendBookingEmail,
  buildCancellationEmail,
} from '@/lib/booking/emails';
import { getDraft, saveDraft } from '@/lib/invoicing/kv-store';
import type { Booking } from '@/lib/booking/types';

export const maxDuration = 30;

interface DeleteBody {
  notifyClient?: boolean;
}

const ACTIVE_STATES = new Set(['approved', 'confirmed', 'pending-review']);

export async function DELETE(
  request: NextRequest,
  ctx: { params: Promise<{ seriesId: string }> },
) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { seriesId } = await ctx.params;
    const body = (await request.json().catch(() => ({}))) as DeleteBody;

    const siblings = await getBookingsBySeriesId(seriesId);
    if (siblings.length === 0) {
      return NextResponse.json(
        { error: 'Series not found or empty' },
        { status: 404 },
      );
    }

    const now = new Date().toISOString();
    const cancelled: string[] = [];
    const skipped: string[] = [];

    // 1. Cancel every active sibling in parallel (status flip + GCal delete)
    await Promise.all(
      siblings.map(async (sib: Booking) => {
        if (!ACTIVE_STATES.has(sib.status)) {
          skipped.push(sib.bookingId);
          return;
        }
        await updateBooking(sib.bookingId, {
          status: 'cancelled',
          cancelledAt: now,
          cancelReason: 'series-cancel',
          updatedAt: now,
        });
        cancelled.push(sib.bookingId);

        // Delete GCal event (best-effort)
        if (sib.calendarEventId) {
          try {
            await deleteCalendarEvent(sib.bookingId);
          } catch (err) {
            console.error(`[series cancel] GCal delete failed for ${sib.bookingId}:`, err);
          }
        }
      }),
    );

    // 2. Void the bundled draft invoice if any. We don't call
    //    recomputeBundleInvoice() here because it assumes the draft
    //    still reflects an active series; for a full cancel we just
    //    blank out the line items and mark the draft as a stub.
    const anchor = siblings.find(
      s => s.series?.seriesIndex === 1 && !!s.series?.bundleInvoiceDraftId,
    );
    if (anchor?.series?.bundleInvoiceDraftId) {
      try {
        const draft = await getDraft(anchor.series.bundleInvoiceDraftId);
        if (draft) {
          await saveDraft({
            ...draft,
            lineItems: [],
            adminNote: [
              draft.adminNote ?? '',
              `\n[VOIDED: series ${seriesId} cancelled on ${now}]`,
            ].join(''),
            updatedAt: now,
          });
        }
      } catch (draftErr) {
        console.error('[series cancel] Draft void failed:', draftErr);
      }
    }

    // 3. Optional: send one cancellation email to the client (not
    //    one per sibling — we deliberately avoid inbox spam).
    let emailSent = false;
    if (body.notifyClient && cancelled.length > 0) {
      try {
        // Use the anchor (or the first cancelled sibling) as the
        // email subject. The cancellation email template describes a
        // single session; we augment the subject to note the series.
        const anchorBooking = siblings.find(s => s.bookingId === cancelled[0]);
        if (anchorBooking) {
          const emailData = buildCancellationEmail({ ...anchorBooking, status: 'cancelled' });
          const seriesLabel = `Your recurring series of ${cancelled.length} session${cancelled.length === 1 ? '' : 's'}`;
          await sendBookingEmail({
            to: anchorBooking.clientEmail,
            subject: `${seriesLabel} has been cancelled`,
            html: emailData.html,
          });
          emailSent = true;
        }
      } catch (emailErr) {
        console.error('[series cancel] Email failed:', emailErr);
      }
    }

    return NextResponse.json({
      ok: true,
      seriesId,
      cancelledCount: cancelled.length,
      skippedCount: skipped.length,
      cancelled,
      skipped,
      emailSent,
    });
  } catch (err) {
    console.error('[series cancel] error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
