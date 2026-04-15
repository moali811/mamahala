/* ================================================================
   POST /api/admin/booking/[id]/confirm-and-send — Finalize a held booking
   ================================================================
   Flips a 'pending-review' booking (or series, if the id belongs to
   an anchor) to confirmed/approved. Creates GCal events, sends the
   client confirmation email, and notifies the admin.

   Optional body:
     {
       draftEdits?: Partial<InvoiceDraft>;  // last-minute draft tweaks
       sendClientEmail?: boolean;            // default true
     }

   Guards against races: if the booking is no longer in
   'pending-review' state (someone else activated or cancelled it),
   returns 409 Conflict.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { getBooking } from '@/lib/booking/booking-store';
import {
  activateBooking,
  activateSeriesFromAnchor,
} from '@/lib/booking/admin-booking-flow';
import { saveDraft, getDraft } from '@/lib/invoicing/kv-store';
import type { InvoiceDraft } from '@/lib/invoicing/types';

export const maxDuration = 30;

interface ConfirmAndSendBody {
  /** Optional last-minute invoice draft updates (merged via PATCH semantics). */
  draftEdits?: Partial<InvoiceDraft>;
  sendClientEmail?: boolean;
}

export async function POST(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await ctx.params;
    const body = (await request.json().catch(() => ({}))) as ConfirmAndSendBody;

    const booking = await getBooking(id);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Race-guard: only act on pending-review bookings.
    if (booking.status !== 'pending-review') {
      return NextResponse.json(
        {
          error: 'Booking is no longer pending review',
          status: booking.status,
        },
        { status: 409 },
      );
    }

    // ─── Apply any last-minute draft edits ──────────────────
    // The Step 2 InvoiceReviewSheet saves edits through its own
    // PATCH path, but for any that haven't been flushed yet, we
    // persist them here before activating.
    const draftIdToEdit = booking.series?.bundleInvoiceDraftId
      || booking.draftId
      || booking.series?.bundleAnchorBookingId
        ? await resolveBundleDraftId(booking)
        : booking.draftId;

    if (body.draftEdits && draftIdToEdit) {
      const existing = await getDraft(draftIdToEdit);
      if (existing) {
        await saveDraft({
          ...existing,
          ...body.draftEdits,
          updatedAt: new Date().toISOString(),
        });
      }
    }

    // ─── Activate: GCal + emails + status flip ──────────────
    const isSeries = !!booking.series?.seriesId;
    const sendClientEmail = body.sendClientEmail !== false;

    if (isSeries) {
      // Only activate from the anchor. If the id isn't the anchor,
      // look it up via the series metadata.
      const anchorId = booking.series?.seriesIndex === 1
        ? booking.bookingId
        : (booking.series?.bundleAnchorBookingId ?? null);

      if (!anchorId) {
        // Per-session series — there's no single anchor. Activate
        // the requested booking on its own. Siblings will need
        // their own confirm-and-send call.
        const result = await activateBooking(booking.bookingId, { sendClientEmail });
        if (!result) {
          return NextResponse.json(
            { error: 'Activation failed — booking may have been modified concurrently' },
            { status: 409 },
          );
        }
        return NextResponse.json({
          ok: true,
          kind: 'series-instance',
          booking: result.booking,
          calendarEventId: result.calendarEventId,
          meetLink: result.meetLink,
          clientEmailSent: result.clientEmailSent,
        });
      }

      const result = await activateSeriesFromAnchor(anchorId, { sendClientEmail });
      return NextResponse.json({
        ok: true,
        kind: 'series-bundle',
        activated: result.activated.length,
        skipped: result.skipped.length,
        bookings: result.activated.map(b => ({
          bookingId: b.bookingId,
          status: b.status,
          calendarEventId: b.calendarEventId,
          meetLink: b.meetLink,
        })),
        skippedDetails: result.skipped,
      });
    }

    // Single-booking path
    const result = await activateBooking(booking.bookingId, { sendClientEmail });
    if (!result) {
      return NextResponse.json(
        { error: 'Activation failed — booking may have been modified concurrently' },
        { status: 409 },
      );
    }

    return NextResponse.json({
      ok: true,
      kind: 'single',
      booking: result.booking,
      calendarEventId: result.calendarEventId,
      meetLink: result.meetLink,
      clientEmailSent: result.clientEmailSent,
      manageToken: result.manageToken,
    });
  } catch (err) {
    console.error('[confirm-and-send] error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Resolve the bundle draft ID for a non-anchor sibling by reading
 * the anchor booking record.
 */
async function resolveBundleDraftId(
  booking: Awaited<ReturnType<typeof getBooking>>,
): Promise<string | undefined> {
  if (!booking?.series?.bundleAnchorBookingId) return undefined;
  const anchor = await getBooking(booking.series.bundleAnchorBookingId);
  return anchor?.series?.bundleInvoiceDraftId;
}
