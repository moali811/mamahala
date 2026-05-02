/* GET /api/admin/booking/list — List all bookings for admin */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { kv } from '@vercel/kv';
import type { Booking } from '@/lib/booking/types';
import { getBookingsByCustomer, getBookingEligibilityWarnings } from '@/lib/booking/booking-store';
import { services } from '@/data/services';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export async function GET(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
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

    // Eligibility warnings (sidecar map keyed by bookingId). Only computed
    // for bookings whose service has the oncePerClient flag, to keep the
    // KV scan cost bounded. Admin UI can render a chip when present.
    const oncePerClientSlugs = services.filter(s => s.oncePerClient).map(s => s.slug);
    const candidateBookings = oncePerClientSlugs.length > 0
      ? bookings.filter(b => oncePerClientSlugs.includes(b.serviceSlug))
      : [];
    const warnings: Record<string, string[]> = {};
    if (candidateBookings.length > 0) {
      const byEmail = new Map<string, Booking[]>();
      for (const b of candidateBookings) {
        const e = b.clientEmail.toLowerCase();
        if (!byEmail.has(e)) {
          byEmail.set(e, await getBookingsByCustomer(e));
        }
        const w = getBookingEligibilityWarnings(b, byEmail.get(e)!, oncePerClientSlugs);
        if (w.length > 0) warnings[b.bookingId] = w;
      }
    }

    return NextResponse.json({ bookings, warnings });
  } catch (err) {
    console.error('[Admin Booking List] Error:', err);
    return NextResponse.json({ error: 'Failed to list bookings' }, { status: 500 });
  }
}
