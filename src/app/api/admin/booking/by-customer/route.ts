/* ================================================================
   GET /api/admin/booking/by-customer?email=foo@bar.com
   ================================================================
   Returns every booking associated with one customer, using the
   efficient per-email index already maintained by booking-store
   (no full-list scan required). Used by the admin Clients module
   to populate the per-customer Bookings tab.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { getBookingsByCustomer } from '@/lib/booking/booking-store';

export async function GET(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Missing or invalid email' }, { status: 400 });
  }

  try {
    const bookings = await getBookingsByCustomer(email.trim().toLowerCase());
    // Sort newest start first so the UI doesn't have to re-sort
    bookings.sort((a, b) => (b.startTime ?? '').localeCompare(a.startTime ?? ''));
    return NextResponse.json({ bookings });
  } catch (err) {
    console.error('[by-customer] error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
