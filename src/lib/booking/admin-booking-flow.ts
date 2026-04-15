/* ================================================================
   Admin Booking Flow — Shared create/activate helpers
   ================================================================
   The admin "+ New Booking" flow pauses between creating a booking
   and sending any emails or calendar events, so the admin can
   review the invoice in Step 2 and either "Confirm & Send" or
   "Skip & Send Later".

   This module owns the two halves of that flow:

     1. createBookingHold()      — writes a booking in status
                                    'pending-review', runs booking
                                    intake to create a draft invoice,
                                    but does NOT touch GCal or emails.
                                    The slot is held until
                                    `pendingReviewExpiresAt`.

     2. activateBooking()        — reads a held booking, creates the
                                    GCal event + Meet link, sends the
                                    client confirmation email, notifies
                                    the admin, and flips the status
                                    to 'confirmed' (free) or 'approved'
                                    (paid, awaiting payment).

     3. createSeriesHold()       — convenience wrapper that creates N
                                    bookings with a shared seriesId
                                    in a single call.

     4. extendBookingHold()      — refreshes the expiry timestamp
                                    (used by "Skip & Send Later").

   All helpers graceful-fail on KV/GCal/email errors, matching the
   pattern used elsewhere in src/lib/booking.
   ================================================================ */

import { services } from '@/data/services';
import { PRICING_TIERS, type PricingTierKey } from '@/config/pricing';
import type {
  Booking,
  SessionMode,
  RecurrenceFrequency,
  RecurrenceSeriesMeta,
} from './types';
import {
  generateBookingId,
  generateSeriesId,
  saveBooking,
  updateBooking,
  getBooking,
  getBookingsBySeriesId,
  createManageToken,
} from './booking-store';
import { getEffectiveLocation } from './provider-location';
import { createCalendarEvent } from './google-calendar';
import {
  buildConfirmationEmail,
  sendBookingEmail,
  notifyAdmin,
} from './emails';
import { processBookingIntake } from '@/lib/invoicing/booking-intake';

/** Default hold length for pending-review bookings (hours). */
export const DEFAULT_HOLD_HOURS = 24;

// ─── Types ──────────────────────────────────────────────────────

export interface CreateHoldInput {
  serviceSlug: string;
  /** ISO 8601 UTC. */
  startTime: string;
  /** ISO 8601 UTC. */
  endTime: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientTimezone: string;
  clientCountry?: string;
  preferredLanguage?: 'en' | 'ar';
  sessionMode?: SessionMode;
  notes?: string;
  /** Existing series metadata (for sibling bookings inside createSeriesHold). */
  series?: RecurrenceSeriesMeta;
}

export interface CreateHoldResult {
  bookingId: string;
  /** Empty when bundled + non-anchor (draft lives on the anchor). */
  draftId: string;
  isFreeSession: boolean;
  status: 'pending-review';
  pendingReviewExpiresAt: string;
}

export interface CreateSeriesHoldInput
  extends Omit<CreateHoldInput, 'startTime' | 'endTime' | 'series'> {
  /** Array of resolved slot times, in order (index 0 = session 1). */
  slots: Array<{ startTime: string; endTime: string }>;
  frequency: RecurrenceFrequency;
  invoiceMode: 'per-session' | 'bundled';
}

export interface CreateSeriesHoldResult {
  seriesId: string;
  bookings: Array<{
    bookingId: string;
    draftId: string;
    seriesIndex: number;
  }>;
  primaryBookingId: string;
  primaryDraftId: string;
}

export interface ActivateOptions {
  /** Default true. Set false to activate without sending the client confirmation. */
  sendClientEmail?: boolean;
  /** Default true. Set false to activate without the admin notification. */
  notifyAdminOnSuccess?: boolean;
}

// ─── Helpers ────────────────────────────────────────────────────

function getServiceOrThrow(slug: string) {
  const service = services.find(s => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}

function computeDurationMinutes(startIso: string, endIso: string): number {
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  const minutes = Math.round(ms / 60_000);
  if (minutes <= 0) throw new Error('End time must be after start time');
  return minutes;
}

function isTierFree(tierKey: string): boolean {
  const tier = PRICING_TIERS[tierKey as PricingTierKey];
  return tier?.anchors?.CAD?.online === 0;
}

function computeHoldExpiry(hours: number = DEFAULT_HOLD_HOURS): string {
  return new Date(Date.now() + hours * 3600_000).toISOString();
}

// ─── Create (Hold Only) ─────────────────────────────────────────

/**
 * Write a single booking in 'pending-review' status. No GCal event,
 * no confirmation emails. Runs processBookingIntake for paid sessions
 * so the admin can review the draft in Step 2.
 */
export async function createBookingHold(
  input: CreateHoldInput,
): Promise<CreateHoldResult> {
  const service = getServiceOrThrow(input.serviceSlug);
  const durationMinutes = computeDurationMinutes(input.startTime, input.endTime);
  const isFreeSession = isTierFree(service.pricingTierKey);

  // Snapshot the effective location at creation time so later
  // travel-schedule edits don't mutate this booking's rendering.
  const location = await getEffectiveLocation(input.startTime);

  const bookingId = generateBookingId();
  const now = new Date().toISOString();
  const holdExpiry = computeHoldExpiry();

  const booking: Booking = {
    bookingId,
    clientEmail: input.clientEmail.toLowerCase().trim(),
    clientName: input.clientName.trim(),
    clientPhone: input.clientPhone?.trim(),
    clientTimezone: input.clientTimezone,
    clientCountry: input.clientCountry ?? '',
    clientNotes: input.notes?.trim(),
    preferredLanguage: input.preferredLanguage || 'en',
    serviceSlug: input.serviceSlug,
    serviceName: service.name,
    sessionMode: input.sessionMode || 'online',
    durationMinutes,
    startTime: input.startTime,
    endTime: input.endTime,
    status: 'pending-review',
    source: 'manual',
    effectiveLocationLabel: location.locationLabel,
    pendingReviewExpiresAt: holdExpiry,
    ...(input.series ? { series: input.series } : {}),
    createdAt: now,
    updatedAt: now,
  };

  await saveBooking(booking);

  // Build seriesContext for booking-intake so bundled series produce
  // one draft on the anchor and no draft on siblings.
  const seriesContext = input.series
    ? {
        mode: input.series.invoiceMode,
        isAnchor: input.series.seriesIndex === 1,
        seriesTotal: input.series.seriesTotal,
        seriesId: input.series.seriesId,
      }
    : undefined;

  let draftId = '';
  if (!isFreeSession) {
    try {
      const intake = await processBookingIntake({
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
        seriesContext,
      });
      draftId = intake.draftId;

      // Patch the booking: save the draftId and, for bundled anchors,
      // record the draftId on the series metadata so siblings can find it.
      const bookingUpdates: Partial<Booking> = { draftId };
      if (
        intake.createdBundledDraft
        && booking.series
        && booking.series.seriesIndex === 1
      ) {
        bookingUpdates.series = {
          ...booking.series,
          bundleInvoiceDraftId: draftId,
        };
      }
      await updateBooking(bookingId, bookingUpdates);
    } catch (err) {
      console.error('[admin-booking-flow] processBookingIntake failed:', err);
    }
  }

  return {
    bookingId,
    draftId,
    isFreeSession,
    status: 'pending-review',
    pendingReviewExpiresAt: holdExpiry,
  };
}

// ─── Series Create (Hold Only) ──────────────────────────────────

/**
 * Write N bookings for a recurring series, all in 'pending-review'.
 * Assigns a single seriesId to all siblings. For 'bundled' invoice
 * mode, only the anchor (index 1) creates a draft; siblings point
 * back via `bundleAnchorBookingId`.
 *
 * Activation (GCal, emails) happens later via `activateSeriesFromAnchor`.
 */
export async function createSeriesHold(
  input: CreateSeriesHoldInput,
): Promise<CreateSeriesHoldResult> {
  if (input.slots.length === 0) {
    throw new Error('Cannot create an empty series');
  }

  const seriesId = generateSeriesId();
  const seriesTotal = input.slots.length;

  const results: CreateSeriesHoldResult['bookings'] = [];
  let anchorBookingId = '';
  let anchorDraftId = '';

  // Create siblings sequentially so the anchor is saved first and
  // subsequent siblings can point back at its bookingId.
  for (let i = 0; i < input.slots.length; i++) {
    const slot = input.slots[i];
    const seriesMeta: RecurrenceSeriesMeta = {
      seriesId,
      seriesIndex: i + 1,
      seriesTotal,
      frequency: input.frequency,
      invoiceMode: input.invoiceMode,
      ...(i > 0 && input.invoiceMode === 'bundled' && anchorBookingId
        ? { bundleAnchorBookingId: anchorBookingId }
        : {}),
    };

    const holdInput: CreateHoldInput = {
      serviceSlug: input.serviceSlug,
      startTime: slot.startTime,
      endTime: slot.endTime,
      clientName: input.clientName,
      clientEmail: input.clientEmail,
      clientPhone: input.clientPhone,
      clientTimezone: input.clientTimezone,
      clientCountry: input.clientCountry,
      preferredLanguage: input.preferredLanguage,
      sessionMode: input.sessionMode,
      notes: input.notes,
      series: seriesMeta,
    };

    const held = await createBookingHold(holdInput);

    results.push({
      bookingId: held.bookingId,
      draftId: held.draftId,
      seriesIndex: i + 1,
    });

    if (i === 0) {
      anchorBookingId = held.bookingId;
      anchorDraftId = held.draftId;
    }
  }

  return {
    seriesId,
    bookings: results,
    primaryBookingId: anchorBookingId,
    primaryDraftId: anchorDraftId,
  };
}

// ─── Activate (Send GCal + Emails) ──────────────────────────────

export interface ActivateResult {
  booking: Booking;
  calendarEventId?: string;
  meetLink?: string;
  clientEmailSent: boolean;
  manageToken?: string;
}

/**
 * Activate a held booking: create the GCal event + Meet link, send
 * the client confirmation, notify the admin, flip the status from
 * 'pending-review' → 'confirmed' (free) or 'approved' (paid).
 *
 * Guards against races by re-reading the booking and checking
 * status === 'pending-review' before acting. Returns null if the
 * booking isn't found or is in an unexpected state.
 */
export async function activateBooking(
  bookingId: string,
  options: ActivateOptions = {},
): Promise<ActivateResult | null> {
  const { sendClientEmail = true, notifyAdminOnSuccess = true } = options;

  const booking = await getBooking(bookingId);
  if (!booking) return null;

  // Guard: only activate bookings that are still in pending-review.
  // If someone else activated or cancelled it first, bail out.
  if (booking.status !== 'pending-review') {
    return null;
  }

  const service = getServiceOrThrow(booking.serviceSlug);
  const isFreeSession = isTierFree(service.pricingTierKey);
  const now = new Date().toISOString();

  // Flip status first so concurrent requests see the new state.
  // Free sessions → confirmed; paid sessions → approved (awaiting payment).
  const newStatus: Booking['status'] = isFreeSession ? 'confirmed' : 'approved';
  const statusPatch: Partial<Booking> = {
    status: newStatus,
    pendingReviewExpiresAt: undefined,
    ...(isFreeSession ? { confirmedAt: now } : { approvedAt: now, approvedBy: 'admin' }),
  };
  const updated = await updateBooking(bookingId, statusPatch);
  if (!updated) return null;

  // Create GCal event + Meet link. Errors are logged but never block.
  let calendarEventId: string | undefined;
  let meetLink: string | undefined;
  try {
    const cal = await createCalendarEvent(updated);
    if (cal) {
      calendarEventId = cal.eventId;
      meetLink = cal.meetLink;
      await updateBooking(bookingId, {
        calendarEventId,
        ...(meetLink ? { meetLink } : {}),
      });
    }
  } catch (err) {
    console.error('[admin-booking-flow] GCal failed:', err);
  }

  // Generate the manage token + send the client confirmation email
  // (optional — admin can suppress via sendClientEmail: false).
  let manageToken: string | undefined;
  let clientEmailSent = false;

  if (sendClientEmail) {
    try {
      manageToken = await createManageToken(bookingId);
      const finalBooking = (await getBooking(bookingId)) ?? updated;
      const { subject, html, icsContent } = buildConfirmationEmail({
        booking: finalBooking,
        manageToken,
        prepTips: [],
        isFreeSession,
      });
      await sendBookingEmail({
        to: finalBooking.clientEmail,
        subject,
        html,
        icsContent,
      });
      clientEmailSent = true;
    } catch (err) {
      console.error('[admin-booking-flow] Client email failed:', err);
    }
  }

  if (notifyAdminOnSuccess) {
    try {
      await notifyAdmin('new-booking', (await getBooking(bookingId)) ?? updated);
    } catch (err) {
      console.error('[admin-booking-flow] Admin notification failed:', err);
    }
  }

  const finalBooking = (await getBooking(bookingId)) ?? updated;
  return {
    booking: finalBooking,
    calendarEventId,
    meetLink,
    clientEmailSent,
    manageToken,
  };
}

/**
 * Activate every sibling in a series. For bundled series, only the
 * anchor triggers the confirmation email (which lists all sessions);
 * siblings are activated silently. For per-session series, each
 * activation sends its own email.
 */
export async function activateSeriesFromAnchor(
  anchorBookingId: string,
  options: ActivateOptions = {},
): Promise<{
  activated: Booking[];
  skipped: Array<{ bookingId: string; reason: string }>;
}> {
  const anchor = await getBooking(anchorBookingId);
  if (!anchor?.series?.seriesId) {
    // Not a series — just activate the single booking.
    const result = await activateBooking(anchorBookingId, options);
    return {
      activated: result ? [result.booking] : [],
      skipped: result ? [] : [{ bookingId: anchorBookingId, reason: 'not-pending' }],
    };
  }

  const siblings = await getBookingsBySeriesId(anchor.series.seriesId);
  const activated: Booking[] = [];
  const skipped: Array<{ bookingId: string; reason: string }> = [];

  const isBundled = anchor.series.invoiceMode === 'bundled';

  for (const sibling of siblings) {
    // Bundled series: only the anchor sends the client email.
    // Per-session: each sibling sends its own (so the client gets a
    // receipt per session). The admin notification is also limited
    // to the anchor to avoid inbox spam.
    const isAnchor = sibling.bookingId === anchorBookingId;
    const childOptions: ActivateOptions = {
      sendClientEmail: isBundled ? isAnchor : (options.sendClientEmail ?? true),
      notifyAdminOnSuccess: isAnchor && (options.notifyAdminOnSuccess ?? true),
    };

    const result = await activateBooking(sibling.bookingId, childOptions);
    if (result) {
      activated.push(result.booking);
    } else {
      skipped.push({ bookingId: sibling.bookingId, reason: 'not-pending-or-missing' });
    }
  }

  return { activated, skipped };
}

// ─── Extend Hold ────────────────────────────────────────────────

/**
 * Push a pending-review booking's expiry further into the future.
 * Used by "Skip & Send Later" so the slot stays held while the
 * admin decides what to do next.
 */
export async function extendBookingHold(
  bookingId: string,
  hours: number = DEFAULT_HOLD_HOURS,
): Promise<Booking | null> {
  const booking = await getBooking(bookingId);
  if (!booking || booking.status !== 'pending-review') return null;

  return updateBooking(bookingId, {
    pendingReviewExpiresAt: computeHoldExpiry(hours),
  });
}
