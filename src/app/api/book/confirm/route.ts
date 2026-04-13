/* ================================================================
   POST /api/book/confirm — Submit a booking request
   ================================================================
   Flow:
   1. Validate inputs + slot availability
   2. Create Booking record (status: pending_approval)
   3. Call processBookingIntake() (customer upsert + draft invoice)
   4. Generate AI prep tips
   5. Send "request received" email to client
   6. Send admin notification to Dr. Hala with approve/decline links

   Dr. Hala reviews → approves → invoice sent → client pays →
   booking becomes "confirmed" → GCal event + Meet link created.

   Free sessions (discovery calls) skip approval → immediate confirmed.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { generateBookingId, saveBooking, createManageToken } from '@/lib/booking/booking-store';
import { isSlotAvailable } from '@/lib/booking/availability';
import { fetchBusySlots } from '@/lib/booking/google-calendar';
import { createCalendarEvent } from '@/lib/booking/google-calendar';
import { buildConfirmationEmail, sendBookingEmail, notifyAdmin } from '@/lib/booking/emails';
import { generateSessionPrepTips } from '@/lib/booking/ai-session-prep';
import { processBookingIntake } from '@/lib/invoicing/booking-intake';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { services } from '@/data/services';
import { PRICING_TIERS, type PricingTierKey } from '@/config/pricing';
import type { Booking, BookingConfirmationResult, SessionMode } from '@/lib/booking/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamahala.ca';

interface ConfirmRequest {
  serviceSlug: string;
  startTime: string;
  endTime: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientTimezone: string;
  clientCountry?: string;
  preferredLanguage?: 'en' | 'ar';
  sessionMode: SessionMode;
  notes?: string;
  aiIntakeNotes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ConfirmRequest = await request.json();

    // ─── Validate required fields ────────────────────────────
    if (!body.serviceSlug || !body.startTime || !body.endTime || !body.clientName || !body.clientEmail || !body.clientTimezone) {
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

    // ─── Validate slot is still available ────────────────────
    const date = body.startTime.slice(0, 10);
    const busySlots = await fetchBusySlots(date, date);
    const slotCheck = await isSlotAvailable(date, body.startTime, body.endTime, busySlots);

    if (!slotCheck.available) {
      return NextResponse.json(
        { error: 'Time slot is no longer available', reason: slotCheck.reason },
        { status: 409 },
      );
    }

    // ─── Compute duration ────────────────────────────────────
    const durationMs = new Date(body.endTime).getTime() - new Date(body.startTime).getTime();
    const durationMinutes = Math.round(durationMs / 60_000);

    // ─── Determine if free session ───────────────────────────
    const tier = PRICING_TIERS[service.pricingTierKey as PricingTierKey];
    const isFreeSession = tier?.anchors?.CAD?.online === 0;

    // ─── Check if returning client ───────────────────────────
    const existingCustomer = await getCustomer(body.clientEmail.toLowerCase());
    const isNewClient = !existingCustomer;

    // ─── Create Booking record ───────────────────────────────
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
      // Free sessions → confirmed immediately; paid → pending Dr. Hala's review
      status: isFreeSession ? 'confirmed' : 'pending_approval',
      source: 'native',
      aiIntakeNotes: body.aiIntakeNotes,
      ...(isFreeSession ? { confirmedAt: now } : {}),
      createdAt: now,
      updatedAt: now,
    };

    // ─── Save booking ────────────────────────────────────────
    await saveBooking(booking);

    // ─── Run processBookingIntake (customer + draft invoice) ─
    // Skip invoice creation for free sessions (e.g. discovery calls)
    let draftId = '';
    if (!isFreeSession) try {
      const intakeResult = await processBookingIntake({
        source: 'native',
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
      console.error('[Booking Confirm] processBookingIntake failed:', err);
    }

    // ─── Generate manage token ───────────────────────────────
    const manageToken = await createManageToken(bookingId);

    // ─── For free sessions: create GCal event + Meet link now ─
    // Awaited so the Meet link is available before building the email
    if (isFreeSession) {
      try {
        const calResult = await createCalendarEvent(booking);
        if (calResult) {
          booking.calendarEventId = calResult.eventId;
          if (calResult.meetLink) booking.meetLink = calResult.meetLink;
          await saveBooking(booking);
        }
      } catch (err) {
        console.error('[Booking Confirm] GCal failed:', err);
      }
    }

    // ─── Generate AI prep tips (non-blocking) ────────────────
    const prepPromise = generateSessionPrepTips(
      booking.serviceSlug,
      booking.clientNotes,
      booking.clientName,
      isNewClient,
    ).then(prep => {
      booking.aiPrepTips = prep.tips.join('\n---\n');
      booking.aiConfirmationMessage = prep.personalizedMessage;
      return saveBooking(booking);
    }).catch(err => console.error('[Booking Confirm] AI prep failed:', err));

    await prepPromise;

    // Re-read updated booking
    const { getBooking } = await import('@/lib/booking/booking-store');
    const finalBooking = await getBooking(bookingId) ?? booking;

    // ─── Send email to client ────────────────────────────────
    const prepTips = finalBooking.aiPrepTips?.split('\n---\n') ?? [];
    const { subject, html, icsContent } = buildConfirmationEmail({
      booking: finalBooking,
      manageToken,
      prepTips,
      aiMessage: finalBooking.aiConfirmationMessage,
      isFreeSession,
    });

    sendBookingEmail({
      to: finalBooking.clientEmail,
      subject,
      html,
      icsContent: isFreeSession ? icsContent : undefined, // Only attach ICS for confirmed (free) sessions
    }).catch(err => console.error('[Booking Confirm] Email failed:', err));

    // ─── Notify Dr. Hala (with approve/decline links for paid sessions) ─
    notifyAdmin(
      isFreeSession ? 'new-booking' : 'pending-approval',
      finalBooking,
    ).catch(err => console.error('[Booking Confirm] Admin notification failed:', err));

    // ─── Build response ──────────────────────────────────────
    const result: BookingConfirmationResult = {
      bookingId,
      draftId,
      manageToken,
      manageUrl: `${SITE_URL}/en/book/manage?token=${manageToken}`,
      status: finalBooking.status,
      meetLink: finalBooking.meetLink,
      aiPrepTips: prepTips.length > 0 ? prepTips : undefined,
      aiConfirmationMessage: finalBooking.aiConfirmationMessage,
    };

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error('[Booking Confirm] Error:', err);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
