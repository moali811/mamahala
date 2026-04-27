/* GET /api/book/policy?token=... — Cancel/reschedule fee preview
   ================================================================
   Returns the computed fee breakdown for the booking right now, so
   the manage page can show the client what they'll be charged BEFORE
   they confirm cancel. No mutations — pure read.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { validateManageToken, getBooking, getAvailabilityRules } from '@/lib/booking/booking-store';
import { computeCancelFee } from '@/lib/booking/cancel-policy';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
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

  const rules = await getAvailabilityRules().catch(() => null);
  const fee = computeCancelFee(booking, rules ?? {});

  return NextResponse.json({
    bookingId,
    status: booking.status,
    serviceName: booking.serviceName ?? booking.serviceSlug,
    startTime: booking.startTime,
    paidAmountCents: booking.paidAmountCents ?? 0,
    paidCurrency: booking.paidCurrency ?? 'CAD',
    fee: {
      outcome: fee.outcome,
      hoursUntil: Math.round(fee.hoursUntil * 100) / 100,
      feePercent: fee.feePercent,
      feeCents: fee.feeCents,
      refundCents: fee.refundCents,
      currency: fee.currency,
      freeWindowHours: fee.freeWindowHours,
      hardCutoffHours: fee.hardCutoffHours,
    },
  });
}
