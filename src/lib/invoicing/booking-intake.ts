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
}

export interface BookingIntakeResult {
  customerEmail: string;
  draftId: string;
  serviceSlugMapping: CalServiceMapResult;
  createdNewCustomer: boolean;
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

function formatBookingDate(isoStart: string): string {
  try {
    const d = new Date(isoStart);
    return d.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
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

  // ─── 5. Build the draft invoice ─────────────────────────────────
  const now = new Date().toISOString();
  const bookingLabel = formatBookingDate(input.startTime);
  const subjectText = `Session booked for ${bookingLabel}`;

  const adminNoteParts: string[] = [
    `Source: ${input.source}`,
    `Booking ID: ${input.bookingId}`,
  ];
  if (!slugMapping.matched && slugMapping.original) {
    adminNoteParts.push(
      `⚠ Unknown Cal.com event type "${slugMapping.original}" — fell back to anxiety-counseling. Edit the service below if needed.`,
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
    allowETransfer: country === 'CA' ? settings.defaultAllowETransfer : false,
    daysUntilDue: settings.defaultDaysUntilDue,
    subject: subjectText,
    adminNote: adminNoteParts.join('\n'),
    createdAt: now,
    updatedAt: now,
  };

  await saveDraft(draft);

  return {
    customerEmail: effectiveEmail,
    draftId: draft.draftId,
    serviceSlugMapping: slugMapping,
    createdNewCustomer,
  };
}
