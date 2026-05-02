/* ================================================================
   POST /api/book/confirm-series — Client self-serve recurring booking
   ================================================================
   Flow:
     1. Require booking_session cookie (auth)
     2. Re-compute eligibility server-side; reject if not eligible
     3. Validate slots, frequency, totalSessions against caps
     4. Verify slot availability for every requested slot
     5. createSeriesHold() with invoiceMode='bundled' → N bookings in
        'pending-review' status, anchor draft holds the bundled invoice
     6. computeRateBreakdown on the anchor's bundled draft → totalCAD
     7. createSeriesPrepayCheckoutSession() — Stripe payment session
     8. Return { checkoutUrl }

   Bookings stay in 'pending-review' until the Stripe webhook fires
   on checkout.session.completed → activateSeriesFromAnchor + admin
   approval notification.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { spamCheck } from '@/lib/spam-guard';
import { getClientIp, limitBooking } from '@/lib/rate-limit';
import {
  getBookingSession,
  getBookingsByCustomer,
} from '@/lib/booking/booking-store';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { getSettings, getDraft } from '@/lib/invoicing/kv-store';
import { computeEligibility } from '@/lib/booking/self-serve-eligibility';
import { computeRateBreakdown } from '@/lib/invoicing/rate-breakdown';
import { createSeriesHold } from '@/lib/booking/admin-booking-flow';
import { createSeriesPrepayCheckoutSession } from '@/lib/invoicing/stripe-checkout-series';
import { isStripeSessionAvailable } from '@/lib/invoicing/stripe-checkout';
import { isSlotAvailable } from '@/lib/booking/availability';
import { fetchBusySlots } from '@/lib/booking/google-calendar';
import { services } from '@/data/services';
import { PRICING_TIERS, type PricingTierKey } from '@/config/pricing';
import { appendAudit } from '@/lib/audit/log';
import type { RecurrenceFrequency, SessionMode } from '@/lib/booking/types';

interface ConfirmSeriesRequest {
  serviceSlug: string;
  sessionMode?: SessionMode;
  preferredLanguage?: 'en' | 'ar';
  notes?: string;
  series: {
    frequency: RecurrenceFrequency;
    totalSessions: number;
    slots: Array<{ startTime: string; endTime: string }>;
  };
}

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ConfirmSeriesRequest & Record<string, unknown>;

    const spam = spamCheck(body);
    if (spam.blocked) return NextResponse.json({ error: 'Request blocked' }, { status: 400 });

    const ip = getClientIp(request);
    const rl = await limitBooking(ip);
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    // ─── Auth: must be a known client with active booking_session ──
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('booking_session')?.value;
    if (!sessionId) {
      return NextResponse.json({ error: 'Sign in required to book a recurring series.' }, { status: 401 });
    }
    const session = await getBookingSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: 'Session expired. Please sign in again.' }, { status: 401 });
    }

    const [customer, allBookings, settings] = await Promise.all([
      getCustomer(session.email),
      getBookingsByCustomer(session.email),
      getSettings(),
    ]);

    if (!customer) {
      return NextResponse.json({ error: 'Account not found.' }, { status: 401 });
    }

    // ─── Re-compute eligibility server-side ──────────────────────
    const eligibility = computeEligibility({
      authenticated: true,
      bookings: allBookings,
      settings,
    });
    if (!eligibility.eligible) {
      return NextResponse.json(
        { error: 'You are not eligible for self-serve recurring at this time.', reason: eligibility.reason },
        { status: 403 },
      );
    }

    // ─── Body validation ─────────────────────────────────────────
    if (!body.serviceSlug || !body.series) {
      return NextResponse.json({ error: 'Missing serviceSlug or series payload.' }, { status: 400 });
    }
    const { frequency, totalSessions, slots } = body.series;
    if (!eligibility.allowedFrequencies.includes(frequency)) {
      return NextResponse.json({ error: `Frequency "${frequency}" is not allowed for self-serve.` }, { status: 400 });
    }
    if (
      typeof totalSessions !== 'number'
      || totalSessions < 2
      || totalSessions > eligibility.maxSessionsAllowed
    ) {
      return NextResponse.json(
        { error: `totalSessions must be between 2 and ${eligibility.maxSessionsAllowed}.` },
        { status: 400 },
      );
    }
    if (!Array.isArray(slots) || slots.length !== totalSessions) {
      return NextResponse.json(
        { error: `slots length must equal totalSessions (${totalSessions}).` },
        { status: 400 },
      );
    }

    const service = services.find((s) => s.slug === body.serviceSlug);
    if (!service) {
      return NextResponse.json({ error: `Unknown service: ${body.serviceSlug}` }, { status: 400 });
    }

    const tier = PRICING_TIERS[service.pricingTierKey as PricingTierKey];
    const tierIsFree = tier?.anchors?.CAD?.online === 0;
    if (tierIsFree) {
      return NextResponse.json({ error: 'Free sessions cannot be booked as a recurring series.' }, { status: 400 });
    }

    // ─── Window cap: last slot must be within maxWindowDays ─────
    const lastSlotMs = new Date(slots[slots.length - 1].startTime).getTime();
    const firstSlotMs = new Date(slots[0].startTime).getTime();
    const spanDays = (lastSlotMs - firstSlotMs) / (1000 * 60 * 60 * 24);
    if (spanDays > eligibility.maxWindowDays) {
      return NextResponse.json(
        { error: `Series cannot span more than ${eligibility.maxWindowDays} days.` },
        { status: 400 },
      );
    }
    if (firstSlotMs < Date.now()) {
      return NextResponse.json({ error: 'First session must be in the future.' }, { status: 400 });
    }

    // ─── Verify slot availability for every requested slot ──────
    // Fetch GCal busy with a ±1-day window per slot to handle timezone
    // boundaries (e.g. midnight Dubai = 8 PM UTC the prior day). De-dupe
    // by UTC date to minimize fetches.
    const datesNeeded = new Set<string>();
    for (const s of slots) {
      const startMs = new Date(s.startTime).getTime();
      const endMs = new Date(s.endTime).getTime();
      datesNeeded.add(new Date(startMs - 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
      datesNeeded.add(new Date(startMs).toISOString().slice(0, 10));
      datesNeeded.add(new Date(endMs + 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
    }
    const busyByDate = new Map<string, Awaited<ReturnType<typeof fetchBusySlots>>>();
    for (const date of datesNeeded) {
      const busy = await fetchBusySlots(date, date).catch(() => []);
      busyByDate.set(date, busy);
    }
    for (const slot of slots) {
      const startMs = new Date(slot.startTime).getTime();
      const endMs = new Date(slot.endTime).getTime();
      // Merge busy events from the surrounding ±1 day window for this slot.
      const surroundingDates = [
        new Date(startMs - 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        new Date(startMs).toISOString().slice(0, 10),
        new Date(endMs + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      ];
      const busy = surroundingDates.flatMap((d) => busyByDate.get(d) ?? []);
      const result = await isSlotAvailable(null, slot.startTime, slot.endTime, busy);
      if (!result.available) {
        return NextResponse.json(
          { error: `Slot ${slot.startTime} is no longer available: ${result.reason ?? 'unavailable'}` },
          { status: 409 },
        );
      }
    }

    // ─── Create the held series — invoiceMode forced to 'bundled' ─
    const sessionMode: SessionMode = body.sessionMode === 'inPerson' ? 'inPerson' : 'online';
    const seriesHold = await createSeriesHold({
      serviceSlug: body.serviceSlug,
      slots,
      frequency,
      invoiceMode: 'bundled',
      clientName: customer.name,
      clientEmail: session.email,
      clientPhone: customer.phone,
      clientTimezone: 'America/Toronto', // placeholder — wizard could pass through
      clientCountry: customer.country,
      preferredLanguage: body.preferredLanguage,
      sessionMode,
      notes: body.notes,
    });

    // ─── Stamp series.origin = 'self-serve' on every sibling ────
    // createSeriesHold doesn't know about the new origin field; patch
    // each booking record so the audit trail and admin filter can see
    // self-serve series at a glance.
    {
      const { getBooking, updateBooking } = await import('@/lib/booking/booking-store');
      for (const b of seriesHold.bookings) {
        const current = await getBooking(b.bookingId);
        if (current?.series) {
          await updateBooking(b.bookingId, {
            series: { ...current.series, origin: 'self-serve' },
          });
        }
      }
    }

    // ─── Compute the bundled invoice total ───────────────────────
    if (!seriesHold.primaryDraftId) {
      return NextResponse.json({ error: 'Bundled draft was not created.' }, { status: 500 });
    }
    const draft = await getDraft(seriesHold.primaryDraftId);
    if (!draft) {
      return NextResponse.json({ error: 'Bundled draft missing.' }, { status: 500 });
    }
    const breakdown = computeRateBreakdown(draft, settings);
    if (!breakdown) {
      return NextResponse.json({ error: 'Could not compute series total.' }, { status: 500 });
    }

    // ─── Stripe must be available — bundled prepay is the only path ─
    if (!isStripeSessionAvailable()) {
      return NextResponse.json(
        { error: 'Online card payment is not configured. Please contact us to set up your series.' },
        { status: 503 },
      );
    }

    const checkoutUrl = await createSeriesPrepayCheckoutSession({
      seriesId: seriesHold.seriesId,
      anchorBookingId: seriesHold.primaryBookingId,
      totalCAD: breakdown.totalCAD,
      displayTotal: breakdown.formattedTotal,
      displayCurrency: breakdown.displayCurrency,
      totalSessions,
      serviceName: service.name,
      clientEmail: session.email,
      clientName: customer.name,
      locale: body.preferredLanguage === 'ar' ? 'ar' : 'en',
    });

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: 'Could not create payment session. Please try again.' },
        { status: 500 },
      );
    }

    appendAudit({
      actor: 'client',
      action: 'booking.series-converted',
      entityId: seriesHold.primaryBookingId,
      customerEmail: session.email,
      ip,
      details: {
        seriesId: seriesHold.seriesId,
        seriesTotal: totalSessions,
        frequency,
        invoiceMode: 'bundled',
        siblingBookingIds: seriesHold.bookings.map((b) => b.bookingId),
        origin: 'self-serve',
        totalCAD: breakdown.totalCAD,
      },
      reason: 'self-serve recurring series prepay initiated',
    }).catch(() => { /* best-effort */ });

    return NextResponse.json({
      ok: true,
      seriesId: seriesHold.seriesId,
      anchorBookingId: seriesHold.primaryBookingId,
      checkoutUrl,
      totalCAD: breakdown.totalCAD,
      totalDisplay: breakdown.formattedTotal,
    });
  } catch (err) {
    console.error('[/api/book/confirm-series] error:', err);
    const message = err instanceof Error ? err.message : 'Failed to create series';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
