/* ================================================================
   GET  /api/admin/booking/block-date — List all blocked dates
   POST /api/admin/booking/block-date — Block or unblock a date
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import {
  setBlockedDate,
  removeBlockedDate,
  listBlockedDates,
} from '@/lib/booking/booking-store';
import { authorize } from '@/lib/invoicing/auth';

// GET — list all blocked dates in KV, sorted ascending.
// Used by the admin AvailabilityEditor to populate the Blocked Dates tab.
export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const blockedDates = await listBlockedDates();
    return NextResponse.json({ blockedDates });
  } catch (err) {
    console.error('[Admin Block Date] List error:', err);
    return NextResponse.json({ error: 'Failed to list blocked dates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { date, reason, allDay, action, blockedSlots } = await request.json();

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Valid date required (YYYY-MM-DD)' }, { status: 400 });
    }

    if (action === 'unblock') {
      await removeBlockedDate(date);
      return NextResponse.json({ ok: true, action: 'unblocked', date });
    }

    // Default: block
    await setBlockedDate({
      date,
      reason: reason || 'Blocked',
      allDay: allDay !== false,
      blockedSlots,
    });

    return NextResponse.json({ ok: true, action: 'blocked', date });
  } catch (err) {
    console.error('[Admin Block Date] Error:', err);
    return NextResponse.json({ error: 'Failed to update blocked date' }, { status: 500 });
  }
}
