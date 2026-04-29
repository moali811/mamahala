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
       sendInvoice?: boolean;                // default true (no-op on free)
     }

   Guards against races: if the booking is no longer in
   'pending-review' state (someone else activated or cancelled it),
   returns 409 Conflict.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
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
  sendInvoice?: boolean;
}

export async function POST(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
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
    //
    // Resolution order for "which draft to edit":
    //   1. Bundled anchor: series.bundleInvoiceDraftId
    //   2. Bundled non-anchor sibling: look up via the anchor
    //   3. Per-session / single booking: booking.draftId
    let draftIdToEdit: string | undefined;
    if (booking.series?.bundleInvoiceDraftId) {
      draftIdToEdit = booking.series.bundleInvoiceDraftId;
    } else if (booking.series?.bundleAnchorBookingId) {
      draftIdToEdit = await resolveBundleDraftId(booking);
    } else {
      draftIdToEdit = booking.draftId || undefined;
    }

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
    const sendInvoice = body.sendInvoice !== false;

    if (isSeries) {
      // Resolve the anchor for this series. The anchor is either the
      // current booking (if it's seriesIndex=1) or, for bundled non-
      // anchor siblings, the one we linked to via bundleAnchorBookingId.
      //
      // For per-session siblings, bundleAnchorBookingId isn't set — we
      // look the anchor up by querying the series and picking index 1.
      let anchorId: string;
      if (booking.series?.seriesIndex === 1) {
        anchorId = booking.bookingId;
      } else if (booking.series?.bundleAnchorBookingId) {
        anchorId = booking.series.bundleAnchorBookingId;
      } else {
        // Per-session sibling (index > 1, no bundle anchor) — still
        // activate the whole series so Dr. Hala gets all GCal events.
        // Fall through to activateSeriesFromAnchor which reads siblings
        // via the series index; it'll treat index 1 as the email/invoice
        // anchor regardless of which id the admin clicked.
        anchorId = booking.bookingId;
      }

      const result = await activateSeriesFromAnchor(anchorId, { sendClientEmail, sendInvoice });
      return NextResponse.json({
        ok: true,
        kind: 'series',
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
    const result = await activateBooking(booking.bookingId, { sendClientEmail, sendInvoice });
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
      invoiceNumber: result.invoiceNumber,
      invoiceId: result.invoiceId,
      invoiceEmailError: result.invoiceEmailError,
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
