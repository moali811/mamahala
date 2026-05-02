/* GET /api/account/session — Check client auth status

   Returns auth state plus a slim profile view used by:
     - useBookingWizard hydration (prefill empty fields)
     - ReturningClientBanner (greet by first name, surface rebook CTA)
     - Self-serve eligibility (paidSessionsCount gate) */

import { NextResponse } from 'next/server';
import { getBookingSession, getBookingsByCustomer, consumesFreeConsultEligibility } from '@/lib/booking/booking-store';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { services } from '@/data/services';
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

    const [customer, bookings] = await Promise.all([
      getCustomer(session.email),
      getBookingsByCustomer(session.email),
    ]);

    // Paid + completed sessions, excluding any that were refunded.
    // Used as the eligibility gate for client self-serve recurring.
    const paidSessionsCount = bookings.filter(
      b => b.status === 'completed'
        && !!b.paidAt
        && !b.refundedAmountCents,
    ).length;

    // Free-consult-used flag — drives the SmartFrontDoor / IntakeStep tile
    // visibility for authenticated returning clients. Server gate in
    // /api/book/confirm is the actual enforcement.
    const oncePerClientSlugs = services.filter(s => s.oncePerClient).map(s => s.slug);
    const freeConsultUsed = oncePerClientSlugs.length > 0
      ? bookings.some(b => oncePerClientSlugs.includes(b.serviceSlug) && consumesFreeConsultEligibility(b))
      : false;

    const firstName = customer?.name?.split(' ')[0] ?? null;

    return NextResponse.json({
      authenticated: true,
      email: session.email,
      name: customer?.name ?? null,
      firstName,
      phone: customer?.phone ?? null,
      country: customer?.country ?? null,
      lastBookedServiceSlug: customer?.lastBookedServiceSlug ?? null,
      preferredSessionMode: customer?.preferredSessionMode ?? null,
      creditCents: customer?.creditCents ?? 0,
      paidSessionsCount,
      freeConsultUsed,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
