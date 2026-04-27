/* POST /api/admin/booking/cancel — Admin cancel with fee override
   ================================================================
   Body: {
     bookingId: string,
     reason?: string,             // free-text — why
     feeOverrideCents?: number,   // override the auto-computed fee (e.g., 0 = waive)
     overrideReason?: string,     // required when feeOverrideCents is set
     notifyClient?: boolean,      // default true
   }
   Auth: Bearer ADMIN_PASSWORD
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { getBooking, updateBooking, getAvailabilityRules } from '@/lib/booking/booking-store';
import { deleteCalendarEvent } from '@/lib/booking/google-calendar';
import { buildCancellationEmail, sendBookingEmail } from '@/lib/booking/emails';
import { dispatchToAllAdmins } from '@/lib/push/dispatch';
import { deleteDraft } from '@/lib/invoicing/kv-store';
import { getStripeClient } from '@/lib/invoicing/stripe-checkout';
import { computeCancelFee } from '@/lib/booking/cancel-policy';
import { appendAudit } from '@/lib/audit/log';
import { getClientIp } from '@/lib/rate-limit';
import type { Booking } from '@/lib/booking/types';

export async function POST(request: NextRequest) {
  const auth = await authorizeWithLimit(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json() as {
      bookingId?: string;
      reason?: string;
      feeOverrideCents?: number;
      overrideReason?: string;
      notifyClient?: boolean;
    };

    if (!body.bookingId) {
      return NextResponse.json({ error: 'bookingId required' }, { status: 400 });
    }
    if (typeof body.feeOverrideCents === 'number' && (!body.overrideReason || !body.overrideReason.trim())) {
      return NextResponse.json(
        { error: 'overrideReason is required when overriding the fee' },
        { status: 400 },
      );
    }

    const booking = await getBooking(body.bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    if (!['confirmed', 'approved', 'pending_approval'].includes(booking.status)) {
      return NextResponse.json(
        { error: `Cannot cancel a ${booking.status} booking` },
        { status: 400 },
      );
    }

    // ─── Compute baseline fee ────────────────────────────────
    const rules = await getAvailabilityRules().catch(() => null);
    const baseline = computeCancelFee(booking, rules ?? {});

    // Admin can override even past hard cutoff (they often need to).
    const originalFeeCents = baseline.feeCents;
    const overriddenFeeCents = typeof body.feeOverrideCents === 'number'
      ? Math.max(0, Math.round(body.feeOverrideCents))
      : null;
    const effectiveFeeCents = overriddenFeeCents ?? originalFeeCents;
    const paidCents = booking.paidAmountCents ?? 0;
    const refundCents = Math.max(0, paidCents - effectiveFeeCents);

    // ─── Stripe refund (if applicable) ───────────────────────
    let stripeRefundId: string | undefined;
    let manualRefundNeeded = false;
    if (booking.stripePaymentIntentId && refundCents > 0) {
      try {
        const stripe = getStripeClient();
        if (stripe) {
          const refund = await stripe.refunds.create({
            payment_intent: booking.stripePaymentIntentId,
            amount: refundCents,
            reason: 'requested_by_customer',
            metadata: {
              bookingId: body.bookingId,
              cancelledBy: 'admin',
              feeApplied: String(effectiveFeeCents),
              override: overriddenFeeCents !== null ? '1' : '0',
              overrideReason: body.overrideReason?.slice(0, 240) || '',
            },
          });
          stripeRefundId = refund.id;
        } else {
          manualRefundNeeded = true;
        }
      } catch (err) {
        console.error('[Admin Cancel] Stripe refund failed:', err);
        manualRefundNeeded = true;
      }
    } else if (refundCents > 0) {
      manualRefundNeeded = true;
    }

    // ─── Persist ─────────────────────────────────────────────
    const cancelledAt = new Date().toISOString();
    const updates: Partial<Booking> = {
      status: 'cancelled',
      cancelledAt,
      cancelReason: body.reason?.trim() || undefined,
      cancellationFeeAppliedCents: effectiveFeeCents,
    };
    if (overriddenFeeCents !== null) {
      updates.cancellationFeeOverride = {
        reason: body.overrideReason!.trim(),
        overriddenBy: 'admin',
        overriddenAt: cancelledAt,
        originalFeeCents,
      };
    }
    if (refundCents > 0 && stripeRefundId) {
      updates.refundedAmountCents = refundCents;
      updates.refundedAt = cancelledAt;
      updates.refundId = stripeRefundId;
      updates.refundReason = overriddenFeeCents !== null ? 'admin-override' : 'late-cancel';
    }
    const updated = await updateBooking(body.bookingId, updates);

    // ─── Audit ──────────────────────────────────────────────
    await appendAudit({
      actor: 'admin',
      actorId: 'admin',
      ip: getClientIp(request),
      action: 'booking.cancelled',
      entityId: body.bookingId,
      customerEmail: booking.clientEmail,
      details: {
        outcome: baseline.outcome,
        hoursUntil: Math.round(baseline.hoursUntil * 100) / 100,
        originalFeeCents,
        effectiveFeeCents,
        refundCents,
        refundId: stripeRefundId,
        manualRefundNeeded,
        override: overriddenFeeCents !== null,
      },
      reason: body.reason?.trim() || undefined,
    });

    if (overriddenFeeCents !== null && originalFeeCents !== overriddenFeeCents) {
      await appendAudit({
        actor: 'admin',
        actorId: 'admin',
        ip: getClientIp(request),
        action: effectiveFeeCents === 0 ? 'booking.fee-waived' : 'booking.fee-applied',
        entityId: body.bookingId,
        customerEmail: booking.clientEmail,
        details: { originalFeeCents, effectiveFeeCents },
        reason: body.overrideReason!.trim(),
      });
    }

    // ─── Side effects ────────────────────────────────────────
    deleteCalendarEvent(body.bookingId).catch(err =>
      console.error('[Admin Cancel] GCal deletion failed:', err),
    );
    if (booking.draftId) {
      deleteDraft(booking.draftId).catch(err =>
        console.error('[Admin Cancel] Draft deletion failed:', err),
      );
    }

    // ─── Notifications ───────────────────────────────────────
    const cancelledBooking = updated ?? { ...booking, ...updates };
    if (body.notifyClient !== false) {
      const { subject, html, icsContent } = buildCancellationEmail(cancelledBooking);
      sendBookingEmail({
        to: booking.clientEmail,
        subject,
        html,
        icsContent,
      }).catch(err => console.error('[Admin Cancel] Client email failed:', err));
    }

    dispatchToAllAdmins({
      title: manualRefundNeeded
        ? 'Booking cancelled — manual refund needed'
        : overriddenFeeCents !== null
          ? `Booking cancelled (fee override${effectiveFeeCents === 0 ? ' — waived' : ''})`
          : 'Booking cancelled by admin',
      body: `${cancelledBooking.clientName} — ${cancelledBooking.serviceName ?? cancelledBooking.serviceSlug}${effectiveFeeCents > 0 ? ` · fee ${(effectiveFeeCents / 100).toFixed(2)}` : ''}`,
      url: `/admin?tab=bookings&booking=${cancelledBooking.bookingId}`,
      tag: `booking-cancelled-${cancelledBooking.bookingId}`,
      data: {
        kind: 'booking-cancelled',
        bookingId: cancelledBooking.bookingId,
        feeCents: effectiveFeeCents,
        refundCents,
        manualRefundNeeded,
        override: overriddenFeeCents !== null,
      },
    }).catch(err => console.error('[Admin Cancel] push dispatch failed:', err));

    return NextResponse.json({
      cancelled: true,
      booking: cancelledBooking,
      fee: {
        originalFeeCents,
        effectiveFeeCents,
        refundCents,
        currency: baseline.currency,
        manualRefundNeeded,
        stripeRefundId,
      },
    });
  } catch (err) {
    console.error('[Admin Cancel] Error:', err);
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
  }
}
