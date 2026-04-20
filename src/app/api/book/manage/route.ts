/* GET /api/book/manage?token=xxx — Get booking details for manage page */

import { NextRequest, NextResponse } from 'next/server';
import { validateManageToken, getBooking, getAvailabilityRules } from '@/lib/booking/booking-store';
import type { BookingPolicy } from '@/lib/booking/types';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token parameter' }, { status: 400 });
  }

  try {
    const bookingId = await validateManageToken(token);
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Invalid or expired token. Please check your email for an updated link.' },
        { status: 401 },
      );
    }

    const booking = await getBooking(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Compute policy
    const rules = await getAvailabilityRules();
    const policy = computePolicy(booking.startTime, rules.cancellationPolicyHours);

    return NextResponse.json({
      booking: {
        bookingId: booking.bookingId,
        clientName: booking.clientName,
        clientEmail: booking.clientEmail,
        serviceSlug: booking.serviceSlug,
        serviceName: booking.serviceName,
        sessionMode: booking.sessionMode,
        durationMinutes: booking.durationMinutes,
        startTime: booking.startTime,
        endTime: booking.endTime,
        status: booking.status,
        clientTimezone: booking.clientTimezone,
        clientNotes: booking.clientNotes,
      },
      policy,
    });
  } catch (err) {
    console.error('[Manage] Error:', err);
    return NextResponse.json({ error: 'Failed to load booking' }, { status: 500 });
  }
}

function computePolicy(startTime: string, policyHours: number): BookingPolicy {
  const hoursUntil = (new Date(startTime).getTime() - Date.now()) / 3_600_000;

  if (hoursUntil < 0) {
    return {
      canCancel: false,
      canReschedule: false,
      message: 'This session has already started or passed.',
      messageAr: 'هذه الجلسة بدأت بالفعل أو انتهت.',
      feePercent: 1,
    };
  }

  if (hoursUntil > policyHours) {
    return {
      canCancel: true,
      canReschedule: true,
      message: 'Free cancellation and rescheduling available.',
      messageAr: 'الإلغاء وإعادة الجدولة مجاناً.',
      feePercent: 0,
    };
  }

  if (hoursUntil > 2) {
    return {
      canCancel: true,
      canReschedule: true,
      message: 'Late change — a 50% fee may apply per our booking policy.',
      messageAr: 'تغيير متأخر — قد يتم تطبيق رسوم بنسبة 50% وفقاً لسياسة الحجز.',
      feePercent: 0.5,
    };
  }

  return {
    canCancel: false,
    canReschedule: false,
    message: 'Too close to session time. Please contact us directly.',
    messageAr: 'وقت الجلسة قريب جداً. يرجى التواصل معنا مباشرة.',
    feePercent: 1,
  };
}
