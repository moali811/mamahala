/* GET /api/book/ics/[bookingId]?token=xxx — Download ICS file */

import { NextRequest, NextResponse } from 'next/server';
import { validateManageToken, getBooking } from '@/lib/booking/booking-store';
import { generateBookingICS } from '@/lib/booking/ics-generator';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  const { bookingId } = await params;
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const validBookingId = await validateManageToken(token);
  if (!validBookingId || validBookingId !== bookingId) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const booking = await getBooking(bookingId);
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  const ics = generateBookingICS(booking);

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="session-${bookingId}.ics"`,
    },
  });
}
