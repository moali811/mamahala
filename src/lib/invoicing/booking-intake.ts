/* ================================================================
   Booking Intake — shared pipeline for Cal.com + native bookings
   ================================================================
   Takes normalized booking data (source-agnostic) and:
     1. Upserts a Customer record (creates if new, updates phone/address)
     2. Ensures the customer has effectiveInitials for invoice numbering
     3. Generates a DRAFT invoice (not sent) linked to the booking
     4. Stores the draft so Dr. Hala sees it in the History tab

   This pure-ish async function is called by:
     - Phase 4: /api/webhooks/cal-booking (Cal.com's webhook)
     - Phase 5: /api/book/confirm (native booking page)

   Keeping the logic here means Phase 5 can swap Cal.com out without
   touching the intake pipeline — just feed in the same shape of
   booking data.
   ================================================================ */

import type { InvoiceDraft } from './types';
import {
  upsertCustomer,
  ensureInitialsForCustomer,
  getCustomer,
} from './customer-store';
import { saveDraft, getSettings } from './kv-store';
import { generateDraftId } from './invoice-number';
import { mapCalSlugToService, type CalServiceMapResult } from './cal-service-map';
import { countryNameToISO2 } from './country-iso';
import { getEffectiveTimezone } from '@/lib/booking/provider-location';

export interface BookingIntakeInput {
  /** Source platform. `cal-com` for Cal.com webhooks, `native` for Phase 5. */
  source: 'cal-com' | 'native' | 'manual';
  /** Unique booking ID from the source system (for dedupe + cancellation lookups). */
  bookingId: string;
  /** Client name, already pre-cleaned. */
  clientName: string;
  /** Client email. If missing, a synthetic one will be generated. */
  clientEmail: string | null;
  /** Optional client phone. */
  clientPhone?: string;
  /** Optional country (ISO-2 or full name — we'll normalize). */
  clientCountry?: string;
  /** Client's IANA timezone (e.g. "America/Toronto"). Used to infer country if not set. */
  clientTimezone?: string;
  /** The event type slug from the source system (Cal.com slug, native slug, etc.). */
  eventTypeSlug: string;
  /** Booking start time (ISO timestamp). */
  startTime: string;
  /** Booking end time (ISO timestamp). Used to compute session duration. */
  endTime?: string;
  /** Any free-text notes the client provided at booking time. */
  customerNotes?: string;
  /** Client's preferred email language ('en' | 'ar'), from the booking record. */
  preferredLanguage?: 'en' | 'ar';
  /**
   * When this booking is part of a recurring series, describes how the
   * draft should be created:
   * - `per-session`: unchanged behavior, one draft per bookingId.
   * - `bundled` + `isAnchor: true`: create a single draft covering
   *   all `seriesTotal` sessions as line items. Only the anchor
   *   (seriesIndex === 1) produces a draft in this mode.
   * - `bundled` + `isAnchor: false`: skip draft creation entirely.
   *   Caller should store `bundleAnchorBookingId` on the sibling booking
   *   so it can find the draft later.
   */
  seriesContext?: {
    mode: 'per-session' | 'bundled';
    isAnchor: boolean;
    seriesTotal: number;
    seriesId: string;
  };
}

export interface BookingIntakeResult {
  customerEmail: string;
  /** Empty string when bundled + non-anchor (draft lives on the anchor). */
  draftId: string;
  serviceSlugMapping: CalServiceMapResult;
  createdNewCustomer: boolean;
  /**
   * True when this call created a bundled-series anchor draft containing
   * `seriesTotal` line items (not a single-session draft).
   */
  createdBundledDraft?: boolean;
}

/**
 * Infer ISO-2 country from a IANA timezone. Covers the top markets
 * Dr. Hala serves. Falls back to 'CA' (her home market).
 */
const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  'America/Toronto': 'CA',
  'America/Montreal': 'CA',
  'America/Vancouver': 'CA',
  'America/Edmonton': 'CA',
  'America/Halifax': 'CA',
  'America/Winnipeg': 'CA',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Los_Angeles': 'US',
  'America/Denver': 'US',
  'America/Phoenix': 'US',
  'Asia/Dubai': 'AE',
  'Asia/Muscat': 'OM',
  'Asia/Riyadh': 'SA',
  'Asia/Qatar': 'QA',
  'Asia/Kuwait': 'KW',
  'Asia/Bahrain': 'BH',
  'Asia/Amman': 'JO',
  'Asia/Beirut': 'LB',
  'Africa/Cairo': 'EG',
  'Africa/Casablanca': 'MA',
  'Africa/Tunis': 'TN',
  'Europe/London': 'GB',
  'Europe/Paris': 'FR',
  'Europe/Berlin': 'DE',
  'Europe/Madrid': 'ES',
  'Europe/Amsterdam': 'NL',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
};

function inferCountry(
  clientCountry: string | undefined,
  clientTimezone: string | undefined,
): string {
  if (clientCountry) {
    // Could be ISO-2 already or a full name
    if (/^[A-Z]{2}$/.test(clientCountry.trim().toUpperCase())) {
      return clientCountry.trim().toUpperCase();
    }
    const iso = countryNameToISO2(clientCountry);
    if (iso) return iso;
  }
  if (clientTimezone && TIMEZONE_TO_COUNTRY[clientTimezone]) {
    return TIMEZONE_TO_COUNTRY[clientTimezone];
  }
  return 'CA';
}

/**
 * Format a booking's start time for display in invoice subject lines.
 *
 * Uses the provider's effective timezone for that moment (i.e. wherever
 * Dr. Hala is on the session date — home-base, travel schedule, or
 * manual override). This keeps the subject anchored to the calendar
 * event the client also receives (both sides show the same wall-clock
 * time). A short timezone abbreviation (EDT / GST / …) is appended so
 * the time is never ambiguous for clients in a different zone.
 */
async function formatBookingDate(isoStart: string): Promise<string> {
  try {
    const d = new Date(isoStart);
    const tz = await getEffectiveTimezone(d);
    return d.toLocaleString('en-US', {
      timeZone: tz,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  } catch {
    return isoStart;
  }
}

/**
 * Main pipeline. Returns the persisted draft ID + customer email so
 * the caller can reference them in the webhook response.
 *
 * Failure modes:
 *   - KV unavailable → throws (webhook will return 500; Cal.com retries)
 *   - Unknown event type → draft is still created with fallback slug + warning
 *   - Missing email AND phone → uses synthetic email, admin can edit later
 */
export async function processBookingIntake(
  input: BookingIntakeInput,
): Promise<BookingIntakeResult> {
  const settings = await getSettings();

  // ─── 1. Resolve email (synthetic fallback for missing ones) ──────
  const normalizedEmail = (input.clientEmail || '').trim().toLowerCase();
  const hasRealEmail = normalizedEmail && normalizedEmail.includes('@');
  const effectiveEmail = hasRealEmail
    ? normalizedEmail
    : `booking-${input.bookingId}@no-email.mamahala.local`;

  // ─── 2. Infer country ───────────────────────────────────────────
  const country = inferCountry(input.clientCountry, input.clientTimezone);

  // ─── 3. Upsert the customer ─────────────────────────────────────
  const existing = await getCustomer(effectiveEmail);
  const createdNewCustomer = !existing;

  await upsertCustomer(
    {
      email: effectiveEmail,
      name: input.clientName.trim() || 'New Booking',
      country,
      phone: input.clientPhone,
      // Only auto-set the preferred currency on net-new customers so we
      // don't clobber an existing setting.
      ...(createdNewCustomer
        ? { preferredCurrency: country === 'CA' ? 'CAD' : undefined }
        : {}),
    },
    'auto-from-invoice',
  );

  // Ensure they have initials + sequence set for invoice numbering
  await ensureInitialsForCustomer(effectiveEmail);

  // ─── 4. Map event type to canonical service slug ────────────────
  const slugMapping = mapCalSlugToService(input.eventTypeSlug);

  // ─── 5. Bundled series, non-anchor: skip draft creation ─────────
  // The anchor (seriesIndex === 1) owns the draft for the whole series.
  // Non-anchor siblings point back to it via bundleAnchorBookingId on
  // the Booking record.
  if (
    input.seriesContext
    && input.seriesContext.mode === 'bundled'
    && !input.seriesContext.isAnchor
  ) {
    return {
      customerEmail: effectiveEmail,
      draftId: '',
      serviceSlugMapping: slugMapping,
      createdNewCustomer,
    };
  }

  // ─── 6. Build the draft invoice ─────────────────────────────────
  const now = new Date().toISOString();
  const bookingLabel = await formatBookingDate(input.startTime);
  const isBundledAnchor =
    input.seriesContext?.mode === 'bundled'
    && input.seriesContext.isAnchor === true;
  const seriesTotal = input.seriesContext?.seriesTotal ?? 1;

  const subjectText = isBundledAnchor
    ? `${seriesTotal}-session series starting ${bookingLabel}`
    : `Session booked for ${bookingLabel}`;

  const adminNoteParts: string[] = [
    `Source: ${input.source}`,
    `Booking ID: ${input.bookingId}`,
  ];
  if (isBundledAnchor && input.seriesContext) {
    adminNoteParts.push(
      `Bundled series: ${seriesTotal} sessions (series ${input.seriesContext.seriesId})`,
    );
  }
  if (!slugMapping.matched && slugMapping.original) {
    adminNoteParts.push(
      `⚠ Unknown Cal.com event type "${slugMapping.original}" — fell back to individual-counseling. Edit the service below if needed.`,
    );
  }
  if (input.customerNotes) {
    adminNoteParts.push(`Client note: ${input.customerNotes}`);
  }
  if (!hasRealEmail) {
    adminNoteParts.push(
      '⚠ Client has no email on file — cannot send invoice until you add one.',
    );
  }

  // Build line items for a bundled-anchor draft so the invoice shows
  // one row per session. Non-bundled drafts leave lineItems undefined
  // and fall back to the single-service pricing engine.
  const lineItems = isBundledAnchor
    ? Array.from({ length: seriesTotal }, (_, i) => ({
        id: `seriesitem_${i + 1}`,
        description: `${input.eventTypeSlug} — session ${i + 1} of ${seriesTotal}`,
        quantity: 1,
        // Unit price is populated by the rate-breakdown engine downstream;
        // 0 here is a sentinel meaning "use the draft's computed rate".
        unitPriceLocal: 0,
      }))
    : undefined;

  const draft: InvoiceDraft = {
    draftId: generateDraftId(),
    client: {
      name: input.clientName.trim() || 'New Booking',
      email: effectiveEmail,
      country,
      phone: input.clientPhone,
    },
    serviceSlug: slugMapping.slug,
    complexity: { preset: 'standard', percent: 0 },
    package: 'single',
    slidingScalePercent: 0,
    taxMode: settings.defaultTaxMode,
    // Canadian clients ALWAYS get e-Transfer enabled. This is a hard
    // assignment, not a default — the UI also locks the toggle. Drops
    // the redundant "Dr. Hala can arrange any of these" fallback.
    // Non-CA: never e-Transfer by default (they get Stripe/wire/PayPal
    // via the region-aware payment-instructions builder).
    allowETransfer: country === 'CA',
    daysUntilDue: settings.defaultDaysUntilDue,
    subject: subjectText,
    adminNote: adminNoteParts.join('\n'),
    ...(lineItems ? { lineItems } : {}),
    ...(input.preferredLanguage ? { preferredLanguage: input.preferredLanguage } : {}),
    createdAt: now,
    updatedAt: now,
  };

  await saveDraft(draft);

  return {
    customerEmail: effectiveEmail,
    draftId: draft.draftId,
    serviceSlugMapping: slugMapping,
    createdNewCustomer,
    createdBundledDraft: isBundledAnchor,
  };
}

/**
 * Recompute a bundled-series draft's line items after a cancellation,
 * reschedule, or status change. Reads all non-cancelled siblings from
 * KV, rebuilds `lineItems`, and patches the anchor draft. Idempotent.
 *
 * Used by the cancel-one flow and the full series-cancel flow. Safe
 * to call even if the series is `per-session` (it becomes a no-op).
 */
export async function recomputeBundleInvoice(seriesId: string): Promise<{
  updated: boolean;
  remainingSessions: number;
}> {
  const { getBookingsBySeriesId } = await import('@/lib/booking/booking-store');
  const { getDraft, saveDraft } = await import('./kv-store');

  const siblings = await getBookingsBySeriesId(seriesId);
  if (siblings.length === 0) {
    return { updated: false, remainingSessions: 0 };
  }

  // Find the anchor (seriesIndex === 1 with bundleInvoiceDraftId)
  const anchor = siblings.find(
    b => b.series?.seriesIndex === 1 && !!b.series?.bundleInvoiceDraftId,
  );
  if (!anchor || !anchor.series?.bundleInvoiceDraftId) {
    // Not a bundled series — nothing to recompute
    return { updated: false, remainingSessions: siblings.length };
  }

  const draft = await getDraft(anchor.series.bundleInvoiceDraftId);
  if (!draft) {
    return { updated: false, remainingSessions: 0 };
  }

  // Active siblings are those not in cancelled/declined/no-show
  const isActive = (b: typeof siblings[number]) =>
    b.status !== 'cancelled'
    && b.status !== 'declined'
    && b.status !== 'no-show'
    && b.status !== 'rescheduled';
  const active = siblings.filter(isActive);
  const remaining = active.length;

  const lineItems = active
    .slice()
    .sort((a, b) => (a.series?.seriesIndex ?? 0) - (b.series?.seriesIndex ?? 0))
    .map((b, idx) => ({
      id: `seriesitem_${b.series?.seriesIndex ?? idx + 1}`,
      description: `${b.serviceSlug} — session ${b.series?.seriesIndex ?? idx + 1}`,
      quantity: 1,
      unitPriceLocal: 0,
    }));

  await saveDraft({
    ...draft,
    lineItems,
    updatedAt: new Date().toISOString(),
  });

  return { updated: true, remainingSessions: remaining };
}
