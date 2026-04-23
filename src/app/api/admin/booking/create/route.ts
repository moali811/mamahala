/* ================================================================
   POST /api/admin/booking/create — Manually create a booking as admin
   ================================================================
   Used by the "New Booking" button in the admin Bookings dashboard
   when Dr. Hala wants to book a client manually (walk-in, returning
   client who called directly, etc.) instead of having the client go
   through the public /en/book wizard.

   Differences vs /api/book/confirm (public flow):
   - Requires admin Bearer auth (authorize())
   - Skips slot-availability check (admin can override a blocked slot)
   - Paid sessions bypass 'pending_approval' and go straight to
     'approved' — Dr. Hala is the one creating it, so she's implicitly
     approving it. The booking still needs to be marked 'confirmed'
     after payment is received.
   - GCal event + Meet link is created IMMEDIATELY for both free and
     paid sessions (public flow only creates for free, since paid
     waits on approval).
   - Invoice draft is still created for paid sessions (Dr. Hala can
     send it whenever she wants).
   - Sends the same client confirmation + admin notification emails
     as the public flow (controllable via sendClientEmail flag).
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import {
  generateBookingId,
  saveBooking,
  createManageToken,
} from '@/lib/booking/booking-store';
import { createCalendarEvent } from '@/lib/booking/google-calendar';
import {
  buildConfirmationEmail,
  sendBookingEmail,
  notifyAdmin,
} from '@/lib/booking/emails';
import { processBookingIntake } from '@/lib/invoicing/booking-intake';
import { authorize } from '@/lib/invoicing/auth';
import { services } from '@/data/services';
import { PRICING_TIERS, type PricingTierKey } from '@/config/pricing';
import type { Booking, SessionMode } from '@/lib/booking/types';
import { SITE_URL } from '@/lib/site-url';

interface AdminCreateBookingRequest {
  serviceSlug: string;
  startTime: string;       // ISO 8601 UTC
  endTime: string;         // ISO 8601 UTC
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientTimezone: string;
  clientCountry?: string;
  preferredLanguage?: 'en' | 'ar';
  sessionMode?: SessionMode;
  notes?: string;
  /** Default true — set false to create the booking without emailing the client. */
  sendClientEmail?: boolean;
}

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: AdminCreateBookingRequest = await request.json();

    // ─── Validate required fields ────────────────────────────
    if (
      !body.serviceSlug ||
      !body.startTime ||
      !body.endTime ||
      !body.clientName ||
      !body.clientEmail ||
      !body.clientTimezone
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceSlug, startTime, endTime, clientName, clientEmail, clientTimezone' },
        { status: 400 },
      );
    }

    if (!body.clientEmail.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // ─── Validate service exists ─────────────────────────────
    const service = services.find(s => s.slug === body.serviceSlug);
    if (!service) {
      return NextResponse.json({ error: `Unknown service: ${body.serviceSlug}` }, { status: 400 });
    }

    // ─── Compute duration ────────────────────────────────────
    const durationMs = new Date(body.endTime).getTime() - new Date(body.startTime).getTime();
    const durationMinutes = Math.round(durationMs / 60_000);
    if (durationMinutes <= 0) {
      return NextResponse.json({ error: 'End time must be after start time' }, { status: 400 });
    }

    // ─── Determine if free session ───────────────────────────
    const tier = PRICING_TIERS[service.pricingTierKey as PricingTierKey];
    const isFreeSession = tier?.anchors?.CAD?.online === 0;

    // ─── Create Booking record ───────────────────────────────
    // Free sessions → confirmed immediately.
    // Paid sessions → approved (skipping pending_approval — admin is
    // creating this, so it's implicitly approved; status flips to
    // 'confirmed' when payment is received via mark-paid flow).
    const bookingId = generateBookingId();
    const now = new Date().toISOString();

    const booking: Booking = {
      bookingId,
      clientEmail: body.clientEmail.toLowerCase().trim(),
      clientName: body.clientName.trim(),
      clientPhone: body.clientPhone?.trim(),
      clientTimezone: body.clientTimezone,
      clientCountry: body.clientCountry ?? '',
      clientNotes: body.notes?.trim(),
      preferredLanguage: body.preferredLanguage || 'en',
      serviceSlug: body.serviceSlug,
      serviceName: service.name,
      sessionMode: body.sessionMode || 'online',
      durationMinutes,
      startTime: body.startTime,
      endTime: body.endTime,
      status: isFreeSession ? 'confirmed' : 'approved',
      source: 'manual',
      ...(isFreeSession ? { confirmedAt: now } : { approvedAt: now }),
      createdAt: now,
      updatedAt: now,
    };

    await saveBooking(booking);

    // ─── Run processBookingIntake for paid sessions ─────────
    // Creates customer record + draft invoice so Dr. Hala can send
    // it later from the admin Invoicing module.
    let draftId = '';
    if (!isFreeSession) {
      try {
        const intakeResult = await processBookingIntake({
          source: 'manual',
          bookingId,
          clientName: booking.clientName,
          clientEmail: booking.clientEmail,
          clientPhone: booking.clientPhone,
          clientCountry: booking.clientCountry,
          clientTimezone: booking.clientTimezone,
          eventTypeSlug: booking.serviceSlug,
          startTime: booking.startTime,
          endTime: booking.endTime,
          customerNotes: booking.clientNotes,
        });
        draftId = intakeResult.draftId;
        booking.draftId = draftId;
        await saveBooking(booking);
      } catch (err) {
        console.error('[Admin Booking Create] processBookingIntake failed:', err);
      }
    }

    // ─── Generate manage token ───────────────────────────────
    const manageToken = await createManageToken(bookingId);

    // ─── Create GCal event + Meet link immediately ──────────
    // Awaited so the Meet link is available before building the email.
    // This runs for BOTH free and paid sessions — difference from the
    // public flow, where paid sessions wait on approval. Admin is the
    // approver here, so we create the event now.
    try {
      const calResult = await createCalendarEvent(booking);
      if (calResult) {
        booking.calendarEventId = calResult.eventId;
        if (calResult.meetLink) booking.meetLink = calResult.meetLink;
        await saveBooking(booking);
      }
    } catch (err) {
      console.error('[Admin Booking Create] GCal failed:', err);
    }

    // ─── Send emails (parallel + awaited, same as public flow) ──
    const sendClientEmail = body.sendClientEmail !== false;
    const { subject, html, icsContent } = buildConfirmationEmail({
      booking,
      manageToken,
      prepTips: [],
      isFreeSession,
    });

    await Promise.all([
      // Client confirmation (optional — admin may create without notifying)
      sendClientEmail
        ? sendBookingEmail({
            to: booking.clientEmail,
            subject,
            html,
            icsContent,
          }).catch(err => console.error('[Admin Booking Create] Client email failed:', err))
        : Promise.resolve(null),
      // Admin notification — always send so everyone on the admin list
      // sees the new booking in their inbox + the dashboard polls.
      notifyAdmin('new-booking', booking).catch(err =>
        console.error('[Admin Booking Create] Admin notification failed:', err),
      ),
    ]);

    return NextResponse.json(
      {
        ok: true,
        bookingId,
        draftId,
        manageToken,
        manageUrl: `${SITE_URL}/en/book/manage?token=${manageToken}`,
        meetLink: booking.meetLink,
        status: booking.status,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('[Admin Booking Create] Error:', err);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
