/* POST /api/book/reschedule — Client-initiated reschedule with policy
   ================================================================
   Flow:
     1. Validate manage token + booking status
     2. Compute reschedule fee/count via computeRescheduleFee()
     3. Reject if outcome is 'blocked' or 'maxed'
     4. If outcome === 'fee' AND we have a Stripe PaymentIntent → issue
        partial refund (fee retained from the original payment).
        For non-Stripe, flag manualRefundNeeded.
     5. Validate new slot availability
     6. Save new booking; mark old as 'rescheduled'; bump count.
     7. Append audit log; send notifications.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import {
  validateManageToken,
  consumeManageToken,
  getBooking,
  saveBooking,
  updateBooking,
  createManageToken,
  generateBookingId,
  getAvailabilityRules,
  invalidateBusyCache,
} from '@/lib/booking/booking-store';
import { isSlotAvailable } from '@/lib/booking/availability';
import { fetchBusySlots, updateCalendarEvent } from '@/lib/booking/google-calendar';
import { buildRescheduleEmail, sendBookingEmail, notifyAdmin } from '@/lib/booking/emails';
import { dispatchToAllAdmins } from '@/lib/push/dispatch';
import { computeRescheduleFee } from '@/lib/booking/cancel-policy';
import { appendAudit } from '@/lib/audit/log';
import { getClientIp } from '@/lib/rate-limit';
import type { Booking } from '@/lib/booking/types';
import { SITE_URL } from '@/lib/site-url';

export async function POST(request: NextRequest) {
  try {
    const { token, newStartTime, newEndTime } = await request.json();

    if (!token || !newStartTime || !newEndTime) {
      return NextResponse.json(
        { error: 'Missing required fields: token, newStartTime, newEndTime' },
        { status: 400 },
      );
    }

    const bookingId = await validateManageToken(token);
    if (!bookingId) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const oldBooking = await getBooking(bookingId);
    if (!oldBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (!['confirmed', 'approved'].includes(oldBooking.status)) {
      return NextResponse.json(
        { error: `Cannot reschedule a ${oldBooking.status} booking` },
        { status: 400 },
      );
    }

    // ─── Policy check ────────────────────────────────────────
    const rules = await getAvailabilityRules().catch(() => null);
    const fee = computeRescheduleFee(oldBooking, rules ?? {});

    if (fee.outcome === 'blocked') {
      return NextResponse.json(
        {
          error: 'Too close to session time. Please contact us directly to reschedule.',
          hoursUntil: fee.hoursUntil,
          hardCutoffHours: fee.hardCutoffHours,
        },
        { status: 403 },
      );
    }
    if (fee.outcome === 'maxed') {
      return NextResponse.json(
        {
          error: `You have reached the maximum of ${fee.maxCount} reschedules for this booking. Please contact us if you need further changes.`,
          rescheduleCount: fee.rescheduleCount,
          maxCount: fee.maxCount,
        },
        { status: 403 },
      );
    }

    // ─── Validate new slot ──────────────────────────────────
    // Fetch a ±1-day window so slots near timezone boundaries (e.g. midnight
    // Dubai = 8 PM UTC the prior day) get their busy events correctly checked.
    const newStartDate = new Date(newStartTime);
    const newEndDate = new Date(newEndTime);
    const busyStart = new Date(newStartDate.getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const busyEnd = new Date(newEndDate.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const busySlots = await fetchBusySlots(busyStart, busyEnd);
    const slotCheck = await isSlotAvailable(null, newStartTime, newEndTime, busySlots);
    if (!slotCheck.available) {
      return NextResponse.json(
        { error: 'New time slot is not available', reason: slotCheck.reason },
        { status: 409 },
      );
    }

    // ─── Late-reschedule fee handling ───────────────────────
    // Policy decision: when a late-reschedule fee applies, we DON'T issue
    // a Stripe refund. The original payment stays on the booking; the fee
    // just reduces the credit carried forward to the new session. Audit
    // entry below records the fee-applied amount. To switch to "refund the
    // over-fee back now," issue stripe.refunds.create against
    // oldBooking.stripePaymentIntentId for (paidAmountCents - feeCents).
    const refundCents = 0;
    const refundId: string | undefined = undefined;
    const manualRefundNeeded = false;
    // Reserved for future Stripe partial refund of the over-fee amount.

    // ─── Save new booking ────────────────────────────────────
    const newBookingId = generateBookingId();
    const now = new Date().toISOString();

    const newBooking: Booking = {
      ...oldBooking,
      bookingId: newBookingId,
      startTime: newStartTime,
      endTime: newEndTime,
      status: 'confirmed',
      rescheduledFrom: oldBooking.bookingId,
      rescheduleCount: fee.rescheduleCount + 1,
      confirmedAt: now,
      createdAt: now,
      updatedAt: now,
      cancelledAt: undefined,
      cancelReason: undefined,
      rescheduledTo: undefined,
      reminder24hSentAt: undefined,
      reminder1hSentAt: undefined,
      // Fee tracking — inherits the late-reschedule fee if applied.
      ...(fee.feeCents > 0 ? { rescheduleFeeAppliedCents: fee.feeCents } : {}),
    };
    await saveBooking(newBooking);

    // Mark old booking as rescheduled
    await updateBooking(oldBooking.bookingId, {
      status: 'rescheduled',
      rescheduledTo: newBookingId,
    });

    // Update Google Calendar event (preserves Meet link & attendees) + invalidate
    // freeBusy cache for both old and new dates so the slot frees up immediately
    // instead of waiting on the 10-min cache TTL.
    updateCalendarEvent(
      oldBooking.bookingId,
      newStartTime,
      newEndTime,
    ).catch(err => console.error('[Reschedule] GCal update failed:', err));

    const oldDate = oldBooking.startTime.slice(0, 10);
    const newDate = newStartTime.slice(0, 10);
    await Promise.all([
      invalidateBusyCache(oldDate).catch(err => console.error('[Reschedule] Old-date cache invalidate failed:', err)),
      ...(newDate !== oldDate
        ? [invalidateBusyCache(newDate).catch(err => console.error('[Reschedule] New-date cache invalidate failed:', err))]
        : []),
    ]);

    // ─── Audit ──────────────────────────────────────────────
    await appendAudit({
      actor: 'client',
      actorId: oldBooking.clientEmail,
      ip: getClientIp(request),
      action: 'booking.rescheduled',
      entityId: newBookingId,
      customerEmail: oldBooking.clientEmail,
      details: {
        outcome: fee.outcome,
        hoursUntil: Math.round(fee.hoursUntil * 100) / 100,
        rescheduleCount: fee.rescheduleCount + 1,
        feeCents: fee.feeCents,
        feePercent: fee.feePercent,
        oldBookingId: oldBooking.bookingId,
        oldStart: oldBooking.startTime,
        newStart: newStartTime,
      },
    });

    // Generate new manage token
    const newManageToken = await createManageToken(newBookingId);

    // ─── Notifications ───────────────────────────────────────
    const { subject, html, icsContent } = buildRescheduleEmail(oldBooking, newBooking, newManageToken);
    await Promise.all([
      sendBookingEmail({
        to: newBooking.clientEmail,
        subject,
        html,
        icsContent,
      }).catch(err => console.error('[Reschedule] Email failed:', err)),
      notifyAdmin('reschedule', newBooking, { oldBooking }).catch(err =>
        console.error('[Reschedule] Admin notification failed:', err),
      ),
      dispatchToAllAdmins({
        title: fee.outcome === 'fee' ? 'Booking rescheduled (late fee)' : 'Booking rescheduled',
        body: `${newBooking.clientName} — moved to ${new Date(newBooking.startTime).toLocaleString('en-CA', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}${fee.feeCents > 0 ? ` · fee ${(fee.feeCents / 100).toFixed(2)}` : ''}`,
        url: `/admin?tab=bookings&booking=${newBookingId}`,
        tag: `booking-rescheduled-${newBookingId}`,
        data: {
          kind: 'booking-rescheduled',
          bookingId: newBookingId,
          oldBookingId: oldBooking.bookingId,
          rescheduleCount: fee.rescheduleCount + 1,
          feeCents: fee.feeCents,
        },
      }).catch(err => console.error('[Reschedule] push dispatch failed:', err)),
    ]);

    await consumeManageToken(token).catch(err =>
      console.error('[Reschedule] Token consume failed:', err),
    );

    return NextResponse.json({
      newBookingId,
      manageToken: newManageToken,
      manageUrl: `${SITE_URL}/en/book/manage?token=${newManageToken}`,
      fee: {
        outcome: fee.outcome,
        feeCents: fee.feeCents,
        rescheduleCount: fee.rescheduleCount + 1,
        maxCount: fee.maxCount,
        manualRefundNeeded,
        refundCents,
        refundId,
      },
    });
  } catch (err) {
    console.error('[Reschedule] Error:', err);
    return NextResponse.json({ error: 'Failed to reschedule' }, { status: 500 });
  }
}
