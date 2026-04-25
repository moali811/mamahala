/* POST /api/book/reschedule — Reschedule a booking */

import { NextRequest, NextResponse } from 'next/server';
import {
  validateManageToken,
  consumeManageToken,
  getBooking,
  saveBooking,
  updateBooking,
  createManageToken,
  generateBookingId,
} from '@/lib/booking/booking-store';
import { isSlotAvailable } from '@/lib/booking/availability';
import { fetchBusySlots } from '@/lib/booking/google-calendar';
import { updateCalendarEvent } from '@/lib/booking/google-calendar';
import { buildRescheduleEmail, sendBookingEmail, notifyAdmin } from '@/lib/booking/emails';
import { dispatchToAllAdmins } from '@/lib/push/dispatch';
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

    // Validate token (don't consume — client may retry)
    const bookingId = await validateManageToken(token);
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 },
      );
    }

    const oldBooking = await getBooking(bookingId);
    if (!oldBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (oldBooking.status !== 'confirmed') {
      return NextResponse.json(
        { error: `Cannot reschedule a ${oldBooking.status} booking` },
        { status: 400 },
      );
    }

    // Check policy
    const hoursUntil = (new Date(oldBooking.startTime).getTime() - Date.now()) / 3_600_000;
    if (hoursUntil < 2) {
      return NextResponse.json(
        { error: 'Too close to session time. Please contact us directly.' },
        { status: 403 },
      );
    }

    // Validate new slot
    const date = newStartTime.slice(0, 10);
    const busySlots = await fetchBusySlots(date, date);
    const slotCheck = await isSlotAvailable(date, newStartTime, newEndTime, busySlots);
    if (!slotCheck.available) {
      return NextResponse.json(
        { error: 'New time slot is not available', reason: slotCheck.reason },
        { status: 409 },
      );
    }

    // Create new booking
    const newBookingId = generateBookingId();
    const now = new Date().toISOString();

    const newBooking: Booking = {
      ...oldBooking,
      bookingId: newBookingId,
      startTime: newStartTime,
      endTime: newEndTime,
      status: 'confirmed',
      rescheduledFrom: oldBooking.bookingId,
      confirmedAt: now,
      createdAt: now,
      updatedAt: now,
      cancelledAt: undefined,
      cancelReason: undefined,
      rescheduledTo: undefined,
      reminder24hSentAt: undefined,
      reminder1hSentAt: undefined,
    };

    await saveBooking(newBooking);

    // Mark old booking as rescheduled
    await updateBooking(oldBooking.bookingId, {
      status: 'rescheduled',
      rescheduledTo: newBookingId,
    });

    // Update Google Calendar event
    updateCalendarEvent(
      oldBooking.bookingId,
      newStartTime,
      newEndTime,
    ).catch(err => console.error('[Reschedule] GCal update failed:', err));

    // Generate new manage token
    const newManageToken = await createManageToken(newBookingId);

    // Send reschedule email + admin notification in parallel, awaited.
    // MUST be awaited — see /api/book/confirm/route.ts for the full
    // explanation of the Vercel serverless Lambda termination race
    // that silently drops fire-and-forget email sends.
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
      // Push to admin devices — reschedules update Mo's mental model of the
      // day. Fire-and-forget; never blocks the reschedule flow.
      dispatchToAllAdmins({
        title: 'Booking rescheduled',
        body: `${newBooking.clientName} — moved to ${new Date(newBooking.startTime).toLocaleString('en-CA', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`,
        url: `/admin?tab=bookings&booking=${newBookingId}`,
        tag: `booking-rescheduled-${newBookingId}`,
        data: { kind: 'booking-rescheduled', bookingId: newBookingId, oldBookingId: oldBooking.bookingId },
      }).catch(err => console.error('[Reschedule] push dispatch failed:', err)),
    ]);

    // SECURITY: consume the OLD manage token now that the reschedule succeeded.
    // The client receives `newManageToken` above for future actions on the new
    // booking. Single-use prevents replay of the rescheduled link to manipulate
    // the (now-rescheduled) old booking.
    await consumeManageToken(token).catch(err =>
      console.error('[Reschedule] Token consume failed:', err),
    );

    return NextResponse.json({
      newBookingId,
      manageToken: newManageToken,
      manageUrl: `${SITE_URL}/en/book/manage?token=${newManageToken}`,
    });
  } catch (err) {
    console.error('[Reschedule] Error:', err);
    return NextResponse.json({ error: 'Failed to reschedule' }, { status: 500 });
  }
}
