/* GET /api/account/export — PIPEDA right-to-portability
   ================================================================
   Authenticated via booking_session cookie. Returns a JSON dump of
   the client's customer record + all bookings. Triggers a file
   download via Content-Disposition.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getBookingSession, getBookingsByCustomer } from '@/lib/booking/booking-store';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { appendAudit } from '@/lib/audit/log';
import { getClientIp } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('booking_session')?.value;
    if (!sessionId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const session = await getBookingSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const email = session.email.toLowerCase();
    const customer = await getCustomer(email);
    const bookings = await getBookingsByCustomer(email);

    const payload = {
      exportedAt: new Date().toISOString(),
      email,
      customer,
      bookings,
      notes: 'This is a complete copy of personal data we hold about you. Past invoices and payment receipts are retained separately for tax/legal compliance and not included here. Contact admin@mamahala.ca to request invoice copies.',
    };

    await appendAudit({
      actor: 'client',
      actorId: email,
      ip: getClientIp(request),
      action: 'customer.exported',
      entityId: email,
      details: { bookingCount: bookings.length },
    });

    const json = JSON.stringify(payload, null, 2);
    const filename = `mamahala-data-export-${email.replace('@', '-at-')}-${new Date().toISOString().slice(0, 10)}.json`;

    return new NextResponse(json, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[export] Error:', err);
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
  }
}
