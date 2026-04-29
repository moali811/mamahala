/* GET /api/account/eligibility — self-serve recurring eligibility

   Returns the eligibility envelope for the authenticated client. The
   wizard uses this to decide whether to show the "Make this recurring?"
   expander on the confirm step. */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getBookingSession, getBookingsByCustomer } from '@/lib/booking/booking-store';
import { getSettings } from '@/lib/invoicing/kv-store';
import { computeEligibility } from '@/lib/booking/self-serve-eligibility';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('booking_session')?.value;
    if (!sessionId) {
      // Anonymous — return ineligible without leaking why.
      return NextResponse.json(
        {
          eligible: false,
          reason: 'not-authenticated',
          paidSessionsCount: 0,
          maxSessionsAllowed: 0,
          allowedFrequencies: [],
          maxWindowDays: 0,
          hasActiveSeries: false,
        },
        { headers: { 'Cache-Control': 'no-store' } },
      );
    }

    const session = await getBookingSession(sessionId);
    if (!session) {
      return NextResponse.json(
        {
          eligible: false,
          reason: 'not-authenticated',
          paidSessionsCount: 0,
          maxSessionsAllowed: 0,
          allowedFrequencies: [],
          maxWindowDays: 0,
          hasActiveSeries: false,
        },
        { headers: { 'Cache-Control': 'no-store' } },
      );
    }

    const [bookings, settings] = await Promise.all([
      getBookingsByCustomer(session.email),
      getSettings(),
    ]);

    const eligibility = computeEligibility({
      authenticated: true,
      bookings,
      settings,
    });

    return NextResponse.json(eligibility, {
      // Short cache window; eligibility shifts as soon as a booking completes
      // or the admin toggles the feature. 60s is a reasonable middle ground.
      headers: { 'Cache-Control': 'private, max-age=60' },
    });
  } catch (err) {
    console.error('[/api/account/eligibility] error:', err);
    return NextResponse.json(
      { eligible: false, reason: 'feature-disabled' },
      { status: 500 },
    );
  }
}
