/* GET /api/account/session — Check client auth status */

import { NextResponse } from 'next/server';
import { getBookingSession } from '@/lib/booking/booking-store';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('booking_session')?.value;

    if (!sessionId) {
      return NextResponse.json({ authenticated: false });
    }

    const session = await getBookingSession(sessionId);
    if (!session) {
      return NextResponse.json({ authenticated: false });
    }

    const customer = await getCustomer(session.email);

    return NextResponse.json({
      authenticated: true,
      email: session.email,
      name: customer?.name ?? null,
      phone: customer?.phone ?? null,
      country: customer?.country ?? null,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
