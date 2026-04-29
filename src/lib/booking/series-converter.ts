/* ================================================================
   Series Converter — promote a one-off booking into a series
   ================================================================
   Used by /api/admin/booking/approve-and-convert. Takes an existing
   booking (typically just-approved by Dr. Hala from her queue) and
   spawns N-1 sibling bookings at the chosen frequency, stamping all
   N with shared series metadata.

   Invoice handling depends on `invoiceMode`:
     - 'bundled':   anchor's existing single-session draft is replaced
                    with one bundled draft containing N line items
                    (or void-and-reissued if the original was already
                    sent). Siblings have no draft of their own.
     - 'per-session': anchor keeps its single draft; each sibling gets
                    its own per-session draft so each can be sent
                    individually later.

   Sibling activation is deliberate: each sibling gets a Google
   Calendar event so Dr. Hala sees the full schedule, but we suppress
   per-sibling client confirmation emails (the anchor's approval
   email already announced the series to the client) and the invoice
   send pipeline (admin reviews + sends invoices manually from the
   queue).
   ================================================================ */

import {
  createBookingHold,
  activateBooking,
} from './admin-booking-flow';
import {
  getBooking,
  updateBooking,
  generateSeriesId,
} from './booking-store';
import { rollSlots } from './series-planner';
import { processBookingIntake } from '@/lib/invoicing/booking-intake';
import {
  getDraft,
  saveDraft,
  deleteDraft,
  getInvoiceRecord,
  updateInvoiceStatus,
} from '@/lib/invoicing/kv-store';
import { appendAudit } from '@/lib/audit/log';
import type {
  Booking,
  RecurrenceFrequency,
  RecurrenceSeriesMeta,
} from './types';
import type { InvoiceLineItem } from '@/lib/invoicing/types';

export type ExistingInvoicePolicy =
  | 'void-and-reissue'
  | 'expand-in-place'
  | 'keep-and-add-siblings';

export interface ConvertOptions {
  anchorBookingId: string;
  frequency: RecurrenceFrequency;
  invoiceMode: 'per-session' | 'bundled';
  /** Total sessions including the anchor (must be 2–12). */
  totalSessions: number;
  /**
   * Resolved slot list for the N-1 siblings. Index 0 = sibling at
   * seriesIndex 2. When omitted, slots are auto-rolled forward at
   * the chosen frequency from the anchor's startTime.
   */
  siblingSlots?: Array<{ startTime: string; endTime: string }>;
  /** Required for audit trail (mirrors manualPrice pattern). */
  reason: string;
  /**
   * Defaults picked by the server based on the anchor's invoice state:
   *   - draft only → 'expand-in-place'
   *   - sent       → 'void-and-reissue'
   * Caller may override; invalid combinations throw.
   */
  existingInvoicePolicy?: ExistingInvoicePolicy;
  /** Origin tag for the new RecurrenceSeriesMeta. */
  origin?: RecurrenceSeriesMeta['origin'];
}

export interface ConvertResult {
  seriesId: string;
  anchorBookingId: string;
  siblingBookingIds: string[];
  primaryDraftId: string;
  invoiceAction: 'expanded' | 'voided-reissued' | 'kept-with-siblings' | 'no-invoice';
}

/* ─── Public API ──────────────────────────────────────────────── */

export async function convertBookingToSeries(
  opts: ConvertOptions,
): Promise<ConvertResult> {
  const {
    anchorBookingId,
    frequency,
    invoiceMode,
    totalSessions,
    reason,
    origin = 'admin-approval-convert',
  } = opts;

  if (totalSessions < 2 || totalSessions > 12) {
    throw new Error('Series size must be between 2 and 12 sessions');
  }
  if (!reason || reason.trim().length === 0) {
    throw new Error('A reason is required to convert a booking into a series');
  }

  const anchor = await getBooking(anchorBookingId);
  if (!anchor) throw new Error(`Anchor booking ${anchorBookingId} not found`);
  if (anchor.series) {
    throw new Error('Booking is already part of a series');
  }

  const seriesId = generateSeriesId();

  // Resolve sibling slots (explicit > auto-rolled).
  const siblingSlots = opts.siblingSlots
    ?? rollSlots({
      startTime: anchor.startTime,
      frequency,
      count: totalSessions,
      durationMinutes: anchor.durationMinutes,
    })
      .slice(1) // drop anchor itself
      .map(s => ({ startTime: s.startTime, endTime: s.endTime }));

  if (siblingSlots.length !== totalSessions - 1) {
    throw new Error(
      `Expected ${totalSessions - 1} sibling slots, got ${siblingSlots.length}`,
    );
  }

  // ─── Handle the anchor's existing invoice (bundled only) ──────
  let primaryDraftId = anchor.draftId ?? '';
  let invoiceAction: ConvertResult['invoiceAction'] = anchor.draftId ? 'kept-with-siblings' : 'no-invoice';

  if (invoiceMode === 'bundled') {
    const result = await reshapeAnchorInvoiceForBundle({
      anchor,
      seriesTotal: totalSessions,
      seriesId,
      requestedPolicy: opts.existingInvoicePolicy,
    });
    primaryDraftId = result.draftId;
    invoiceAction = result.action;
  }

  // ─── Patch anchor with series metadata ────────────────────────
  const anchorMeta: RecurrenceSeriesMeta = {
    seriesId,
    seriesIndex: 1,
    seriesTotal: totalSessions,
    frequency,
    invoiceMode,
    origin,
    convertedFromBookingId: anchorBookingId,
    ...(invoiceMode === 'bundled' && primaryDraftId
      ? { bundleInvoiceDraftId: primaryDraftId }
      : {}),
  };
  await updateBooking(anchorBookingId, {
    series: anchorMeta,
    ...(primaryDraftId !== anchor.draftId ? { draftId: primaryDraftId } : {}),
  });

  // ─── Create siblings as held bookings, then activate ──────────
  const siblingBookingIds: string[] = [];
  for (let i = 0; i < siblingSlots.length; i++) {
    const slot = siblingSlots[i];
    const seriesIndex = i + 2; // 2..N (anchor is 1)

    const siblingMeta: RecurrenceSeriesMeta = {
      seriesId,
      seriesIndex,
      seriesTotal: totalSessions,
      frequency,
      invoiceMode,
      origin,
      ...(invoiceMode === 'bundled'
        ? { bundleAnchorBookingId: anchorBookingId }
        : {}),
    };

    const held = await createBookingHold({
      serviceSlug: anchor.serviceSlug,
      startTime: slot.startTime,
      endTime: slot.endTime,
      clientName: anchor.clientName,
      clientEmail: anchor.clientEmail,
      clientPhone: anchor.clientPhone,
      clientTimezone: anchor.clientTimezone,
      clientCountry: anchor.clientCountry,
      preferredLanguage: anchor.preferredLanguage,
      sessionMode: anchor.sessionMode,
      notes: anchor.clientNotes,
      series: siblingMeta,
    });

    // Promote sibling to 'approved' immediately + create GCal.
    // Per-sibling client emails / invoice sends are suppressed:
    // the anchor's approval email already covers the client,
    // and Dr. Hala sends invoices from the queue when ready.
    await activateBooking(held.bookingId, {
      sendClientEmail: false,
      notifyAdminOnSuccess: false,
      sendInvoice: false,
    });

    siblingBookingIds.push(held.bookingId);
  }

  // ─── Audit ─────────────────────────────────────────────────────
  await appendAudit({
    actor: 'admin',
    action: 'booking.series-converted',
    entityId: anchorBookingId,
    customerEmail: anchor.clientEmail,
    details: {
      seriesId,
      seriesTotal: totalSessions,
      frequency,
      invoiceMode,
      siblingBookingIds,
      invoiceAction,
      origin,
    },
    reason,
  });

  return {
    seriesId,
    anchorBookingId,
    siblingBookingIds,
    primaryDraftId,
    invoiceAction,
  };
}

/* ─── Bundled-mode invoice reshaping ──────────────────────────── */

interface ReshapeArgs {
  anchor: Booking;
  seriesTotal: number;
  seriesId: string;
  requestedPolicy?: ExistingInvoicePolicy;
}

interface ReshapeResult {
  draftId: string;
  action: ConvertResult['invoiceAction'];
}

async function reshapeAnchorInvoiceForBundle(args: ReshapeArgs): Promise<ReshapeResult> {
  const { anchor, seriesTotal, seriesId, requestedPolicy } = args;

  const hasDraft = !!anchor.draftId;
  const hasSentInvoice = !!anchor.invoiceId;

  if (requestedPolicy === 'keep-and-add-siblings') {
    throw new Error(
      'keep-and-add-siblings is only valid for invoiceMode="per-session"',
    );
  }

  // Sent-invoice path: only void-and-reissue makes sense.
  if (hasSentInvoice) {
    if (requestedPolicy === 'expand-in-place') {
      throw new Error(
        'Cannot expand-in-place: the original invoice has already been sent. Use void-and-reissue.',
      );
    }
    const existing = await getInvoiceRecord(anchor.invoiceId!);
    if (existing && existing.status === 'paid') {
      throw new Error(
        'Cannot convert: the original invoice has already been paid. Refund it first if you need to restructure.',
      );
    }
    if (existing) {
      await updateInvoiceStatus(anchor.invoiceId!, 'void');
    }
    const newDraftId = await regenerateBundledDraft(anchor, seriesTotal, seriesId);
    return { draftId: newDraftId, action: 'voided-reissued' };
  }

  // Draft path: expand-in-place by default, or void-and-reissue if asked.
  if (hasDraft) {
    if (requestedPolicy === 'void-and-reissue') {
      await deleteDraft(anchor.draftId!);
      const newDraftId = await regenerateBundledDraft(anchor, seriesTotal, seriesId);
      return { draftId: newDraftId, action: 'voided-reissued' };
    }
    const updatedDraftId = await expandDraftInPlace(anchor, seriesTotal);
    return { draftId: updatedDraftId, action: 'expanded' };
  }

  // No existing invoice (e.g., free tier). Generate a fresh bundled draft.
  const newDraftId = await regenerateBundledDraft(anchor, seriesTotal, seriesId);
  return { draftId: newDraftId, action: 'voided-reissued' };
}

/**
 * Mutate the existing draft in place — replace lineItems with a
 * series-aware list and refresh the subject. Cheapest option when the
 * invoice has not been sent.
 */
async function expandDraftInPlace(anchor: Booking, seriesTotal: number): Promise<string> {
  const draft = await getDraft(anchor.draftId!);
  if (!draft) {
    // Draft missing despite booking pointer — fall through to regenerate.
    return regenerateBundledDraft(anchor, seriesTotal, anchor.series?.seriesId ?? '');
  }

  const lineItems: InvoiceLineItem[] = Array.from({ length: seriesTotal }, (_, i) => ({
    id: `seriesitem_${i + 1}`,
    description: `${anchor.serviceSlug} — session ${i + 1} of ${seriesTotal}`,
    quantity: 1,
    unitPriceLocal: 0,
  }));

  const subjectText = `${seriesTotal}-session series starting ${formatStart(anchor.startTime, anchor.clientTimezone)}`;

  await saveDraft({
    ...draft,
    lineItems,
    subject: subjectText,
    updatedAt: new Date().toISOString(),
  });

  return draft.draftId;
}

/**
 * Generate a brand-new bundled draft via the existing intake pipeline
 * so it picks up customer info, currency inference, and tax mode the
 * same way as create-time bookings.
 */
async function regenerateBundledDraft(
  anchor: Booking,
  seriesTotal: number,
  seriesId: string,
): Promise<string> {
  const intake = await processBookingIntake({
    source: 'manual',
    bookingId: anchor.bookingId,
    clientName: anchor.clientName,
    clientEmail: anchor.clientEmail,
    clientPhone: anchor.clientPhone,
    clientCountry: anchor.clientCountry,
    clientTimezone: anchor.clientTimezone,
    eventTypeSlug: anchor.serviceSlug,
    startTime: anchor.startTime,
    endTime: anchor.endTime,
    customerNotes: anchor.clientNotes,
    preferredLanguage: anchor.preferredLanguage,
    seriesContext: {
      mode: 'bundled',
      isAnchor: true,
      seriesTotal,
      seriesId,
    },
  });
  return intake.draftId;
}

function formatStart(startIso: string, timezone: string): string {
  try {
    return new Date(startIso).toLocaleString('en-US', {
      timeZone: timezone,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return startIso;
  }
}
