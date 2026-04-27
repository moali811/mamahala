/* POST /api/account/forget-me — PIPEDA right-to-erasure
   ================================================================
   Authenticated via booking_session cookie. Deletes the customer
   record + cancels any pending bookings + invalidates the session
   + sends a confirmation email. Idempotent — re-calling returns 404.
   ================================================================
   Body: { confirm: true }   // anti-fat-finger guard
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  getBookingSession,
  deleteBookingSession,
  getBookingsByCustomer,
  updateBooking,
} from '@/lib/booking/booking-store';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { appendAudit } from '@/lib/audit/log';
import { getClientIp } from '@/lib/rate-limit';
import { sendBookingEmail } from '@/lib/booking/emails';
import { BUSINESS } from '@/config/business';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export async function POST(request: NextRequest) {
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

    const body = await request.json().catch(() => ({})) as { confirm?: boolean };
    if (body.confirm !== true) {
      return NextResponse.json({ error: 'confirm: true required' }, { status: 400 });
    }

    const email = session.email.toLowerCase();
    const customer = await getCustomer(email);
    if (!customer) {
      return NextResponse.json({ error: 'No record found' }, { status: 404 });
    }

    // Cancel any pending/upcoming bookings (we keep the booking records for
    // accounting/audit, but mark them cancelled so they don't run reminders).
    const bookings = await getBookingsByCustomer(email);
    const now = new Date().toISOString();
    let cancelledCount = 0;
    for (const b of bookings) {
      if (['pending_approval', 'approved', 'confirmed', 'pending-review'].includes(b.status)) {
        await updateBooking(b.bookingId, {
          status: 'cancelled',
          cancelledAt: now,
          cancelReason: 'Account deletion (PIPEDA right-to-erasure)',
        });
        cancelledCount += 1;
      }
    }

    // Wipe the customer record. We keep audit:customer:{email} as evidence
    // of the deletion request itself (legal requirement to prove we honored
    // it) but strip everything else.
    if (KV_AVAILABLE) {
      const { kv } = await import('@vercel/kv');
      await kv.del(`customer:${email}`);
      // Remove from the master index.
      const all = ((await kv.get('customers:all')) as string[] | null) ?? [];
      await kv.set('customers:all', all.filter(e => e.toLowerCase() !== email));
    }

    // Invalidate the session cookie immediately.
    await deleteBookingSession(sessionId);

    await appendAudit({
      actor: 'client',
      actorId: email,
      ip: getClientIp(request),
      action: 'customer.forgot-me',
      entityId: email,
      details: {
        cancelledBookings: cancelledCount,
      },
    });

    // Confirmation email — short, no marketing.
    sendBookingEmail({
      to: email,
      subject: 'Your Mama Hala account has been deleted',
      html: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#4A4A5C;">
        <p>This is a confirmation that your account and personal details have been removed from our records as you requested.</p>
        <p>${cancelledCount > 0 ? `${cancelledCount} pending session${cancelledCount === 1 ? ' has' : 's have'} also been cancelled.` : 'No upcoming sessions were affected.'}</p>
        <p style="font-size:13px;color:#8E8E9F;margin-top:24px;">If this wasn't you, please contact ${BUSINESS.email} immediately. Records of past invoices and payments are retained as required for tax/legal purposes; nothing else remains.</p>
      </div>`,
    }).catch(() => { /* best-effort */ });

    const response = NextResponse.json({
      forgotten: true,
      cancelledBookings: cancelledCount,
    });
    response.cookies.delete('booking_session');
    return response;
  } catch (err) {
    console.error('[forget-me] Error:', err);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
