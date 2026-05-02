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

   Dr. Hala reviews → approves → GCal event + Meet link created →
   confirmation email sent to client.

   ALL bookings (including free consultations) require Dr. Hala's approval.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { generateBookingId, saveBooking, createManageToken, getAvailabilityRules, getBookingsByCustomer, consumesFreeConsultEligibility } from '@/lib/booking/booking-store';
import { isSlotAvailable } from '@/lib/booking/availability';
import { fetchBusySlots } from '@/lib/booking/google-calendar';
import { createCalendarEvent } from '@/lib/booking/google-calendar';
import { buildConfirmationEmail, sendBookingEmail, notifyAdmin } from '@/lib/booking/emails';
import { dispatchToAllAdmins } from '@/lib/push/dispatch';
import { generateSessionPrepTips } from '@/lib/booking/ai-session-prep';
import { processBookingIntake } from '@/lib/invoicing/booking-intake';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { getEffectiveLocation } from '@/lib/booking/provider-location';
import { services } from '@/data/services';
import { PRICING_TIERS, tierOffersMode, type PricingTierKey } from '@/config/pricing';
import type { Booking, BookingConfirmationResult, SessionMode } from '@/lib/booking/types';
import { spamCheck, isValidEmail } from '@/lib/spam-guard';
import { getClientIp, limitBooking } from '@/lib/rate-limit';
import { SITE_URL } from '@/lib/site-url';

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
  /** PIPEDA-opt-in flag — when true, persist customer recognition prefs. */
  consentRememberMe?: boolean;
  /** WhatsApp Business opt-in — when true, store consent on the customer record. */
  consentWhatsapp?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ConfirmRequest & Record<string, unknown>;

    // ─── Spam & rate-limit checks ───────────────────────────
    const spam = spamCheck(body);
    if (spam.blocked) {
      return NextResponse.json({ error: 'Request blocked' }, { status: 400 });
    }
    const ip = getClientIp(request);
    const rl = await limitBooking(ip);
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    // ─── Validate required fields ────────────────────────────
    if (!body.serviceSlug || !body.startTime || !body.endTime || !body.clientName || !body.clientEmail || !body.clientTimezone) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceSlug, startTime, endTime, clientName, clientEmail, clientTimezone' },
        { status: 400 },
      );
    }

    const emailValid = isValidEmail(body.clientEmail);
    console.log('[Booking] Email validation:', { email: body.clientEmail, valid: emailValid });
    if (!emailValid) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // ─── Validate service exists ─────────────────────────────
    const service = services.find(s => s.slug === body.serviceSlug);
    if (!service) {
      return NextResponse.json({ error: `Unknown service: ${body.serviceSlug}` }, { status: 400 });
    }

    // ─── Once-per-client gate (e.g. free discovery consultation) ───
    // Server-side enforcement — the UI hides the tile for known returning
    // clients, but anyone can POST a slug. This is the only gate that
    // matters. Forgiving policy: cancellations and declines do not consume.
    if (service.oncePerClient) {
      const priorBookings = await getBookingsByCustomer(body.clientEmail);
      const consumed = priorBookings.some(
        b => b.serviceSlug === service.slug && consumesFreeConsultEligibility(b),
      );
      if (consumed) {
        const lang: 'en' | 'ar' = body.preferredLanguage === 'ar' ? 'ar' : 'en';
        return NextResponse.json(
          {
            error: 'free_consult_already_used',
            message: service.oncePerClientMessage?.[lang]
              ?? "You've already used this complimentary session. Please book a paid session instead.",
            suggestedServiceSlug: 'online-phone-consultation',
          },
          { status: 403 },
        );
      }
    }

    // ─── Validate sessionMode against pricing tier ───────────
    // Some services (experiential) are in-person only by design — pricing
    // tier encodes mode availability via null anchors. Reject mismatches
    // even if a stale form somehow submits.
    const submittedMode: SessionMode = body.sessionMode || 'online';
    if (!tierOffersMode(service.pricingTierKey as PricingTierKey, submittedMode)) {
      return NextResponse.json(
        {
          error: `${service.name} is not available ${submittedMode === 'online' ? 'online' : 'in person'}.`,
        },
        { status: 400 },
      );
    }

    // ─── Validate slot is still available (with distributed lock) ─
    const date = body.startTime.slice(0, 10);
    const lockKey = `booking:lock:${date}:${body.startTime}`;
    let lockAcquired = false;

    // Try to acquire a short-lived lock to prevent double-booking
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      try {
        const { kv } = await import('@vercel/kv');
        // NX = only set if key doesn't exist; EX = auto-expire after 30 seconds
        const result = await kv.set(lockKey, '1', { nx: true, ex: 30 });
        if (!result) {
          return NextResponse.json(
            {
              error: 'slot_unavailable',
              message: 'This time slot is being booked by another client. Please try again.',
              reason: 'lock-contention',
            },
            { status: 409 },
          );
        }
        lockAcquired = true;
      } catch {
        // If KV fails, proceed without lock (fail open)
      }
    }

    // Fetch GCal busy for both UTC days the slot might span. A slot near
    // a timezone boundary (e.g. midnight Dubai = 8 PM UTC the prior day)
    // can have its UTC start and end land on different days; fetching
    // [date-1, date+1] covers any 1-day spread without missing busy events.
    const startDateObj = new Date(body.startTime);
    const endDateObj = new Date(body.endTime);
    const busyStart = new Date(startDateObj.getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const busyEnd = new Date(endDateObj.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const busySlots = await fetchBusySlots(busyStart, busyEnd);
    const slotCheck = await isSlotAvailable(null, body.startTime, body.endTime, busySlots);

    if (!slotCheck.available) {
      // Release lock if we acquired one
      if (lockAcquired) {
        try {
          const { kv } = await import('@vercel/kv');
          await kv.del(lockKey);
        } catch {}
      }
      return NextResponse.json(
        {
          error: 'slot_unavailable',
          message: 'Time slot is no longer available',
          reason: slotCheck.reason,
        },
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

    // ─── Fetch hold settings for smart-hold timer ──────────────
    const availabilityRules = await getAvailabilityRules().catch(() => null);

    // ─── Create Booking record ───────────────────────────────
    const bookingId = generateBookingId();
    const now = new Date().toISOString();
    const effectiveLoc = await getEffectiveLocation(body.startTime);

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
      // ALL bookings require Dr. Hala's approval first
      status: 'pending_approval',
      source: 'native',
      aiIntakeNotes: body.aiIntakeNotes,
      effectiveLocationLabel: effectiveLoc.locationLabel,
      // Smart Hold: block this slot immediately and set auto-approve timer.
      holdExpiresAt: (() => {
        const rules = availabilityRules;
        const holdHours = rules?.holdDurationHours ?? 4;
        return new Date(Date.now() + holdHours * 3600_000).toISOString();
      })(),
      createdAt: now,
      updatedAt: now,
    };

    // ─── Save booking ────────────────────────────────────────
    await saveBooking(booking);

    // ─── Run processBookingIntake (customer + draft invoice) ─
    let draftId = '';
    try {
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
        preferredLanguage: booking.preferredLanguage,
      });
      draftId = intakeResult.draftId;
      booking.draftId = draftId;
      await saveBooking(booking);
    } catch (err) {
      console.error('[Booking Confirm] processBookingIntake failed:', err);
    }

    // ─── Persist remember-me preferences on the customer record ───
    // Only when the client explicitly opted in. Stores last-service +
    // preferred-mode for one-click rebook from the account portal,
    // and an audit-trail consent record. Best-effort — never block
    // the booking on customer-pref persistence.
    try {
      const { upsertCustomer } = await import('@/lib/invoicing/customer-store');
      const { appendAudit, hashIp } = await import('@/lib/audit/log');
      const consent = body.consentRememberMe === true;
      const updates: Record<string, unknown> = {
        email: booking.clientEmail,
        name: booking.clientName,
        phone: booking.clientPhone,
        lastBookedServiceSlug: booking.serviceSlug,
        preferredSessionMode: booking.sessionMode,
      };
      if (consent) {
        updates.consentRememberMe = {
          acceptedAt: new Date().toISOString(),
          ipHash: hashIp(ip),
          policyVersion: '2026-04',
        };
      }
      await upsertCustomer(updates as never, 'auto-from-invoice');
      if (consent) {
        await appendAudit({
          actor: 'client',
          actorId: booking.clientEmail,
          ip,
          action: 'customer.consent-given',
          entityId: booking.clientEmail,
          details: { feature: 'remember-me' },
        });
      }

      // ─── WhatsApp opt-in (separate consent, separate audit trail) ───
      // Independent of remember-me: the client may opt into WhatsApp
      // without opting into device-level memory, or vice versa. We
      // upsert the customer first so recordWhatsappOptIn has something
      // to merge into.
      const wa = body.consentWhatsapp === true;
      if (wa) {
        const { recordWhatsappOptIn } = await import('@/lib/whatsapp/consent');
        await recordWhatsappOptIn({
          email: booking.clientEmail,
          phone: booking.clientPhone,
          ipHash: hashIp(ip),
          policyVersion: '2026-04',
        });
        await appendAudit({
          actor: 'client',
          actorId: booking.clientEmail,
          ip,
          action: 'customer.whatsapp-opt-in',
          entityId: booking.clientEmail,
          details: { source: 'booking-form', bookingId: booking.bookingId },
        });
      }
    } catch (consentErr) {
      console.error('[Booking Confirm] consent persistence failed:', consentErr);
    }

    // ─── Generate manage token ───────────────────────────────
    const manageToken = await createManageToken(bookingId);

    // GCal event + Meet link created ONLY after Dr. Hala approves (via admin dashboard)

    // ─── Generate AI prep tips (non-blocking) ────────────────
    // Pick the tips variant that matches the client's preferred language
    // so the confirmation page + email render natively without a second
    // translation pass.
    const prepLocale: 'en' | 'ar' = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
    const prepPromise = generateSessionPrepTips(
      booking.serviceSlug,
      booking.clientNotes,
      booking.clientName,
      isNewClient,
      prepLocale,
    ).then(prep => {
      const tips = prepLocale === 'ar' ? prep.tipsAr : prep.tips;
      const message = prepLocale === 'ar' ? prep.personalizedMessageAr : prep.personalizedMessage;
      booking.aiPrepTips = tips.join('\n---\n');
      booking.aiConfirmationMessage = message;
      return saveBooking(booking);
    }).catch(err => console.error('[Booking Confirm] AI prep failed:', err));

    await prepPromise;

    // Re-read updated booking
    const { getBooking } = await import('@/lib/booking/booking-store');
    const finalBooking = await getBooking(bookingId) ?? booking;

    // ─── Send email to client ────────────────────────────────
    const prepTips = finalBooking.aiPrepTips?.split('\n---\n') ?? [];
    const { subject, html } = buildConfirmationEmail({
      booking: finalBooking,
      manageToken,
      prepTips,
      aiMessage: finalBooking.aiConfirmationMessage,
      isFreeSession: false, // Never treat as confirmed at submission — all require approval
    });

    // CRITICAL: these sends MUST be awaited, not fire-and-forget.
    //
    // Vercel's serverless runtime kills the Lambda as soon as the HTTP
    // handler returns, with only a ~millisecond grace period for in-
    // flight promises. If we fire notifyAdmin() without awaiting, its
    // internal Promise.all([send to admin@mamahala.ca, send to gmail])
    // launches two parallel Resend calls, and one of them almost always
    // gets cut off mid-flight when the Lambda dies. Observed on
    // 2026-04-15: across 24 admin notifications, only ONE recipient per
    // booking landed in Resend's delivered log — the other was silently
    // lost to the Lambda termination race. See commit for the hunt.
    //
    // Await both in parallel so the handler doesn't return until
    // Resend has confirmed acceptance for every send. Adds a few
    // hundred ms of latency but guarantees delivery. Wrapped in a
    // single Promise.all so both sends run in parallel, not serially.
    await Promise.all([
      sendBookingEmail({
        to: finalBooking.clientEmail,
        subject,
        html,
      }).catch(err => console.error('[Booking Confirm] Client email failed:', err)),
      // Notify Dr. Hala with approve/decline links — ALL bookings need approval
      notifyAdmin(
        'pending-approval',
        finalBooking,
      ).catch(err => console.error('[Booking Confirm] Admin notification failed:', err)),
      // Push notification to all subscribed admin devices (iPhone PWA).
      dispatchToAllAdmins({
        title: 'New booking request',
        body: `${finalBooking.clientName} — ${finalBooking.serviceName ?? finalBooking.serviceSlug}`,
        url: `/bookings/${bookingId}`,
        tag: `booking-${bookingId}`,
        data: { kind: 'booking-created', bookingId },
      }).catch(err => console.error('[Booking Confirm] Push dispatch failed:', err)),
    ]);

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

    const response = NextResponse.json(result, { status: 201 });
    // Drop a non-PII `last_visit` marker so the wizard renders the
    // SoftWelcomeBanner on subsequent anonymous visits. Not HttpOnly —
    // the wizard reads it client-side via document.cookie. PIPEDA-safe:
    // value is just `1`, no identifying info.
    response.cookies.set('last_visit', '1', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return response;
  } catch (err) {
    console.error('[Booking Confirm] Error:', err);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
