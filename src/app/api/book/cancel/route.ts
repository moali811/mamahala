/* POST /api/book/cancel — Cancel a booking with policy enforcement
   ================================================================
   Flow:
     1. Validate manage token + booking status
     2. Compute fee breakdown via computeCancelFee()
     3. Reject if outcome === 'blocked' (past hard cutoff)
     4. If outcome === 'fee' and we have a Stripe PaymentIntent → issue
        partial refund via Stripe (full - fee). Otherwise queue manual
        refund email to admin.
     5. Mark booking cancelled, persist refund/fee fields.
     6. Append audit log entry.
     7. Send client + admin emails + push notification.
     8. Consume manage token (single-use security).
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { validateManageToken, consumeManageToken, getBooking, updateBooking, getAvailabilityRules } from '@/lib/booking/booking-store';
import { deleteCalendarEvent } from '@/lib/booking/google-calendar';
import { buildCancellationEmail, sendBookingEmail, notifyAdmin } from '@/lib/booking/emails';
import { dispatchToAllAdmins } from '@/lib/push/dispatch';
import { deleteDraft } from '@/lib/invoicing/kv-store';
import { getStripeClient } from '@/lib/invoicing/stripe-checkout';
import { computeCancelFee, detectCompassionateCancel } from '@/lib/booking/cancel-policy';
import { appendAudit } from '@/lib/audit/log';
import { getClientIp } from '@/lib/rate-limit';
import type { Booking } from '@/lib/booking/types';

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

    // ─── Policy check ────────────────────────────────────────
    const rules = await getAvailabilityRules().catch(() => null);
    const fee = computeCancelFee(booking, rules ?? {});

    if (fee.outcome === 'past') {
      return NextResponse.json(
        { error: 'This session has already happened.' },
        { status: 400 },
      );
    }
    if (fee.outcome === 'blocked') {
      return NextResponse.json(
        {
          error: 'Too close to session time. Please contact us directly to cancel.',
          hoursUntil: fee.hoursUntil,
          hardCutoffHours: fee.hardCutoffHours,
        },
        { status: 403 },
      );
    }

    // ─── Stripe refund (if applicable) ───────────────────────
    let refundCents = 0;
    let refundId: string | undefined;
    let manualRefundNeeded = false;

    if (booking.stripePaymentIntentId && fee.refundCents > 0) {
      try {
        const stripe = getStripeClient();
        if (stripe) {
          const refund = await stripe.refunds.create({
            payment_intent: booking.stripePaymentIntentId,
            amount: fee.refundCents,
            reason: 'requested_by_customer',
            metadata: {
              bookingId,
              cancelReason: reason?.trim()?.slice(0, 240) || '',
              feeApplied: String(fee.feeCents),
            },
          });
          refundId = refund.id;
          refundCents = fee.refundCents;
        }
      } catch (refundErr) {
        console.error('[Cancel] Stripe refund failed:', refundErr);
        manualRefundNeeded = true;
      }
    } else if (fee.refundCents > 0 && !booking.stripePaymentIntentId) {
      // Non-Stripe payment (e-Transfer / wire / PayPal) — admin issues manually.
      manualRefundNeeded = true;
    }

    // ─── Persist cancellation + refund refs ──────────────────
    const compassion = detectCompassionateCancel(reason);
    const cancelledAt = new Date().toISOString();
    const updates: Partial<Booking> = {
      status: 'cancelled',
      cancelledAt,
      cancelReason: reason?.trim() || undefined,
      cancellationFeeAppliedCents: fee.feeCents,
    };
    if (refundCents > 0) {
      updates.refundedAmountCents = refundCents;
      updates.refundedAt = cancelledAt;
      updates.refundId = refundId;
      updates.refundReason = 'late-cancel';
    }
    const updated = await updateBooking(bookingId, updates);

    // ─── Audit ──────────────────────────────────────────────
    await appendAudit({
      actor: 'client',
      actorId: booking.clientEmail,
      ip: getClientIp(request),
      action: 'booking.cancelled',
      entityId: bookingId,
      customerEmail: booking.clientEmail,
      details: {
        outcome: fee.outcome,
        hoursUntil: Math.round(fee.hoursUntil * 100) / 100,
        feeCents: fee.feeCents,
        feePercent: fee.feePercent,
        refundCents,
        refundId,
        manualRefundNeeded,
        compassion: compassion.matched ? compassion : undefined,
      },
      reason: reason?.trim() || undefined,
    });

    // ─── Side effects ────────────────────────────────────────
    deleteCalendarEvent(bookingId).catch(err =>
      console.error('[Cancel] GCal deletion failed:', err),
    );
    if (booking.draftId) {
      deleteDraft(booking.draftId).catch(err =>
        console.error('[Cancel] Draft deletion failed:', err),
      );
    }

    // ─── Notifications ───────────────────────────────────────
    const cancelledBooking = updated ?? { ...booking, ...updates };
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
      dispatchToAllAdmins({
        title: manualRefundNeeded
          ? 'Booking cancelled — manual refund needed'
          : compassion.matched
            ? 'Booking cancelled (compassion match)'
            : 'Booking cancelled',
        body: `${cancelledBooking.clientName} — ${cancelledBooking.serviceName ?? cancelledBooking.serviceSlug}${fee.feeCents > 0 ? ` · fee ${(fee.feeCents / 100).toFixed(2)}` : ''}`,
        url: `/admin?tab=bookings&booking=${cancelledBooking.bookingId}`,
        tag: `booking-cancelled-${cancelledBooking.bookingId}`,
        data: {
          kind: 'booking-cancelled',
          bookingId: cancelledBooking.bookingId,
          reason: cancelledBooking.cancelReason,
          feeCents: fee.feeCents,
          refundCents,
          manualRefundNeeded,
          compassion: compassion.matched,
        },
      }).catch(err => console.error('[Cancel] push dispatch failed:', err)),
    ]);

    await consumeManageToken(token).catch(err =>
      console.error('[Cancel] Token consume failed:', err),
    );

    return NextResponse.json({
      cancelled: true,
      message: fee.outcome === 'fee'
        ? `Booking cancelled. A late-cancel fee of ${(fee.feeCents / 100).toFixed(2)} ${fee.currency.toUpperCase()} applies; ${(refundCents / 100).toFixed(2)} ${fee.currency.toUpperCase()} will be refunded.`
        : 'Booking has been cancelled.',
      fee: {
        outcome: fee.outcome,
        feeCents: fee.feeCents,
        refundCents,
        currency: fee.currency,
        manualRefundNeeded,
      },
    });
  } catch (err) {
    console.error('[Cancel] Error:', err);
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
  }
}
