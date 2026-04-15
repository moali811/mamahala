/* ================================================================
   POST /api/admin/booking/[id]/save-for-later — Extend hold
   ================================================================
   Keeps a pending-review booking in place and refreshes its
   `pendingReviewExpiresAt` so the slot stays held while the admin
   decides whether to confirm later.

   Optional body:
     { holdHours?: number }   — defaults to 24 hours

   No emails, no GCal events, no status change. The admin can
   return later from the Invoices module to confirm-and-send.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { getBooking } from '@/lib/booking/booking-store';
import {
  extendBookingHold,
  DEFAULT_HOLD_HOURS,
} from '@/lib/booking/admin-booking-flow';

export const maxDuration = 10;

interface SaveForLaterBody {
  holdHours?: number;
}

export async function POST(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await ctx.params;
    const body = (await request.json().catch(() => ({}))) as SaveForLaterBody;

    const existing = await getBooking(id);
    if (!existing) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (existing.status !== 'pending-review') {
      return NextResponse.json(
        {
          error: 'Booking is not in pending-review state',
          status: existing.status,
        },
        { status: 409 },
      );
    }

    const hours = typeof body.holdHours === 'number' && body.holdHours > 0
      ? Math.min(body.holdHours, 168) // cap at 7 days
      : DEFAULT_HOLD_HOURS;

    const updated = await extendBookingHold(id, hours);
    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to extend hold' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      booking: {
        bookingId: updated.bookingId,
        status: updated.status,
        pendingReviewExpiresAt: updated.pendingReviewExpiresAt,
      },
    });
  } catch (err) {
    console.error('[save-for-later] error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
