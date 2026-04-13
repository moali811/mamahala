/* GET /api/admin/booking/list — List all bookings for admin */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { kv } from '@vercel/kv';
import type { Booking } from '@/lib/booking/types';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!KV_AVAILABLE) {
    return NextResponse.json({ bookings: [] });
  }

  try {
    // Get all booking IDs from the upcoming list + scan for others
    const upcomingIds = await kv.get<string[]>('bookings:upcoming') ?? [];

    // Also scan for any bookings that might not be in the upcoming list
    // (cancelled, declined, completed, etc.)
    const allKeys = await kv.keys('booking:bk_*');
    const bookingIds = new Set<string>();

    // Add upcoming
    for (const id of upcomingIds) bookingIds.add(id);

    // Add from key scan
    for (const key of allKeys) {
      const id = key.replace('booking:', '');
      if (id.startsWith('bk_')) bookingIds.add(id);
    }

    // Fetch all bookings
    const bookings: Booking[] = [];
    for (const id of bookingIds) {
      const booking = await kv.get<Booking>(`booking:${id}`);
      if (booking) bookings.push(booking);
    }

    // Sort by creation date (newest first)
    bookings.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));

    return NextResponse.json({ bookings });
  } catch (err) {
    console.error('[Admin Booking List] Error:', err);
    return NextResponse.json({ error: 'Failed to list bookings' }, { status: 500 });
  }
}
