/* POST /api/admin/booking/update-status
   Body: { bookingId, status }
   Auth: Bearer password header */

import { NextRequest, NextResponse } from 'next/server';
import { getBooking, updateBooking } from '@/lib/booking/booking-store';
import { authorize } from '@/lib/invoicing/auth';
import type { BookingStatus } from '@/lib/booking/types';

const VALID_STATUSES: BookingStatus[] = [
  'pending_approval', 'approved', 'confirmed', 'completed', 'cancelled', 'declined', 'rescheduled', 'no-show',
];

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { bookingId, status } = await request.json();
    if (!bookingId || !status) {
      return NextResponse.json({ error: 'bookingId and status required' }, { status: 400 });
    }
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Invalid status: ${status}` }, { status: 400 });
    }

    const booking = await getBooking(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    await updateBooking(bookingId, {
      status,
      updatedAt: new Date().toISOString(),
      ...(status === 'confirmed' ? { confirmedAt: new Date().toISOString() } : {}),
      ...(status === 'cancelled' ? { cancelledAt: new Date().toISOString() } : {}),
      ...(status === 'completed' ? { completedAt: new Date().toISOString() } : {}),
    });

    return NextResponse.json({ success: true, bookingId, status });
  } catch (err) {
    console.error('[Update Status]', err);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
