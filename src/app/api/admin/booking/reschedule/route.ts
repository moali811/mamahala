/* POST /api/admin/booking/reschedule — Admin reschedule with override
   ================================================================
   Body: {
     bookingId: string,
     newStartTime: string,
     newEndTime: string,
     reason?: string,
     applyFee?: boolean,           // default: respect computed policy
     feeOverrideCents?: number,    // override the fee (e.g., 0 to waive)
     overrideReason?: string,      // required if feeOverrideCents set
     notifyClient?: boolean,        // default true
   }
   Auth: Bearer ADMIN_PASSWORD
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import {
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
import { buildRescheduleEmail, sendBookingEmail } from '@/lib/booking/emails';
import { dispatchToAllAdmins } from '@/lib/push/dispatch';
import { computeRescheduleFee } from '@/lib/booking/cancel-policy';
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
      newStartTime?: string;
      newEndTime?: string;
      reason?: string;
      feeOverrideCents?: number;
      overrideReason?: string;
      notifyClient?: boolean;
    };

    if (!body.bookingId || !body.newStartTime || !body.newEndTime) {
      return NextResponse.json(
        { error: 'bookingId, newStartTime, newEndTime required' },
        { status: 400 },
      );
    }
    if (typeof body.feeOverrideCents === 'number' && (!body.overrideReason || !body.overrideReason.trim())) {
      return NextResponse.json(
        { error: 'overrideReason required when overriding fee' },
        { status: 400 },
      );
    }

    const oldBooking = await getBooking(body.bookingId);
    if (!oldBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    if (!['confirmed', 'approved', 'pending_approval'].includes(oldBooking.status)) {
      return NextResponse.json(
        { error: `Cannot reschedule a ${oldBooking.status} booking` },
        { status: 400 },
      );
    }

    const rules = await getAvailabilityRules().catch(() => null);
    const baseline = computeRescheduleFee(oldBooking, rules ?? {});
    const originalFeeCents = baseline.feeCents;
    const overriddenFeeCents = typeof body.feeOverrideCents === 'number'
      ? Math.max(0, Math.round(body.feeOverrideCents))
      : null;
    const effectiveFeeCents = overriddenFeeCents ?? originalFeeCents;

    // Admin can override 'maxed' too — they often need to. Skip 'blocked'?
    // No — admins can also reschedule past hard cutoff (urgent rebookings).

    // ─── Validate new slot ──────────────────────────────────
    // Fetch a ±1-day window so slots near timezone boundaries (e.g. midnight
    // Dubai = 8 PM UTC the prior day) get their busy events correctly checked.
    const newStartDate = new Date(body.newStartTime);
    const newEndDate = new Date(body.newEndTime);
    const busyStart = new Date(newStartDate.getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const busyEnd = new Date(newEndDate.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const busySlots = await fetchBusySlots(busyStart, busyEnd);
    const slotCheck = await isSlotAvailable(null, body.newStartTime, body.newEndTime, busySlots);
    if (!slotCheck.available) {
      return NextResponse.json(
        { error: 'New time slot is not available', reason: slotCheck.reason },
        { status: 409 },
      );
    }

    // ─── Save new booking ────────────────────────────────────
    const newBookingId = generateBookingId();
    const now = new Date().toISOString();

    const newBooking: Booking = {
      ...oldBooking,
      bookingId: newBookingId,
      startTime: body.newStartTime,
      endTime: body.newEndTime,
      status: 'confirmed',
      rescheduledFrom: oldBooking.bookingId,
      rescheduleCount: (oldBooking.rescheduleCount ?? 0) + 1,
      confirmedAt: now,
      createdAt: now,
      updatedAt: now,
      cancelledAt: undefined,
      cancelReason: undefined,
      rescheduledTo: undefined,
      reminder24hSentAt: undefined,
      reminder1hSentAt: undefined,
      ...(effectiveFeeCents > 0 ? { rescheduleFeeAppliedCents: effectiveFeeCents } : {}),
      ...(overriddenFeeCents !== null ? {
        rescheduleFeeOverride: {
          reason: body.overrideReason!.trim(),
          overriddenBy: 'admin',
          overriddenAt: now,
          originalFeeCents,
        },
      } : {}),
    };
    await saveBooking(newBooking);

    await updateBooking(oldBooking.bookingId, {
      status: 'rescheduled',
      rescheduledTo: newBookingId,
    });

    updateCalendarEvent(
      oldBooking.bookingId,
      body.newStartTime,
      body.newEndTime,
    ).catch(err => console.error('[Admin Reschedule] GCal update failed:', err));

    const oldDate = oldBooking.startTime.slice(0, 10);
    const newDate = body.newStartTime.slice(0, 10);
    await Promise.all([
      invalidateBusyCache(oldDate).catch(err => console.error('[Admin Reschedule] Old-date cache invalidate failed:', err)),
      ...(newDate !== oldDate
        ? [invalidateBusyCache(newDate).catch(err => console.error('[Admin Reschedule] New-date cache invalidate failed:', err))]
        : []),
    ]);

    const newManageToken = await createManageToken(newBookingId);

    // ─── Audit ──────────────────────────────────────────────
    await appendAudit({
      actor: 'admin',
      actorId: 'admin',
      ip: getClientIp(request),
      action: 'booking.rescheduled',
      entityId: newBookingId,
      customerEmail: oldBooking.clientEmail,
      details: {
        outcome: baseline.outcome,
        hoursUntil: Math.round(baseline.hoursUntil * 100) / 100,
        rescheduleCount: (oldBooking.rescheduleCount ?? 0) + 1,
        originalFeeCents,
        effectiveFeeCents,
        oldBookingId: oldBooking.bookingId,
        oldStart: oldBooking.startTime,
        newStart: body.newStartTime,
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
        entityId: newBookingId,
        customerEmail: oldBooking.clientEmail,
        details: { originalFeeCents, effectiveFeeCents, kind: 'reschedule' },
        reason: body.overrideReason!.trim(),
      });
    }

    // ─── Notifications ───────────────────────────────────────
    if (body.notifyClient !== false) {
      const { subject, html, icsContent } = buildRescheduleEmail(oldBooking, newBooking, newManageToken);
      sendBookingEmail({
        to: newBooking.clientEmail,
        subject,
        html,
        icsContent,
      }).catch(err => console.error('[Admin Reschedule] Client email failed:', err));
    }

    dispatchToAllAdmins({
      title: overriddenFeeCents !== null
        ? `Reschedule (fee override${effectiveFeeCents === 0 ? ' — waived' : ''})`
        : 'Booking rescheduled by admin',
      body: `${newBooking.clientName} → ${new Date(newBooking.startTime).toLocaleString('en-CA', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}${effectiveFeeCents > 0 ? ` · fee ${(effectiveFeeCents / 100).toFixed(2)}` : ''}`,
      url: `/admin?tab=bookings&booking=${newBookingId}`,
      tag: `booking-rescheduled-${newBookingId}`,
      data: {
        kind: 'booking-rescheduled',
        bookingId: newBookingId,
        oldBookingId: oldBooking.bookingId,
        rescheduleCount: (oldBooking.rescheduleCount ?? 0) + 1,
        feeCents: effectiveFeeCents,
        override: overriddenFeeCents !== null,
      },
    }).catch(err => console.error('[Admin Reschedule] push dispatch failed:', err));

    return NextResponse.json({
      rescheduled: true,
      booking: newBooking,
      manageToken: newManageToken,
      fee: {
        originalFeeCents,
        effectiveFeeCents,
        rescheduleCount: (oldBooking.rescheduleCount ?? 0) + 1,
      },
    });
  } catch (err) {
    console.error('[Admin Reschedule] Error:', err);
    return NextResponse.json({ error: 'Failed to reschedule booking' }, { status: 500 });
  }
}
