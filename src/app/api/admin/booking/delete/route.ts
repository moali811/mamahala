/* POST /api/admin/booking/delete
   Body: { bookingId }
   Auth: Bearer password header */

import { NextRequest, NextResponse } from 'next/server';
import { getBooking, deleteBooking } from '@/lib/booking/booking-store';
import { authorize } from '@/lib/invoicing/auth';

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { bookingId } = await request.json();
    if (!bookingId) {
      return NextResponse.json({ error: 'bookingId required' }, { status: 400 });
    }

    const booking = await getBooking(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    await deleteBooking(bookingId);
    return NextResponse.json({ success: true, bookingId });
  } catch (err) {
    console.error('[Delete Booking]', err);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
