/* ================================================================
   Send Invoice Pipeline — shared invoice-creation helper
   ================================================================
   Extracted from /api/admin/invoices/create so both the manual
   admin "send invoice" flow AND the automated activateBooking()
   flow in admin-booking-flow.ts can run the same pipeline without
   duplicating logic.

   Pipeline steps:
     1. Recompute rate breakdown server-side (frontend value ignored)
     2. Resolve the customer, ensure effectiveInitials + seq
     3. Generate invoice number (honours override; bumps seq otherwise)
     4. Compute issue date + due date
     5. Optionally create a Stripe Checkout Session (tier 1) or
        fall back to admin-pasted Payment Link (tier 2) or
        concierge-page payment methods (tier 3)
     6. Render the PDF
     7. Send the email via Resend (skipped in dryRun mode)
     8. Persist the StoredInvoice record
     9. Touch the customer record
    10. Delete the draft if it existed

   Throws on validation or pipeline failures. Callers decide
   whether to log-and-continue (activateBooking) or return an HTTP
   error response (the create route).
   ================================================================ */

import { computeRateBreakdown } from './rate-breakdown';
import { generateInvoicePdf } from './pdf-generator';
import { sendInvoiceEmail } from './email-sender';
import {
  createInvoiceCheckoutSession,
  isStripeSessionAvailable,
} from './stripe-checkout';
import { toISO2 } from '@/config/countries';
import { generateInvoiceId, formatInvoiceNumber } from './invoice-number';
import { saveInvoiceRecord, deleteDraft } from './kv-store';
import {
  bumpInvoiceSeq,
  ensureInitialsForCustomer,
  getCustomer,
  touchCustomerFromInvoice,
  upsertCustomer,
} from './customer-store';
import type { InvoiceDraft, InvoiceSettings, StoredInvoice } from './types';

export interface SendInvoicePipelineResult {
  invoice: StoredInvoice;
  emailError: string | null;
  stripeWarning: string | null;
}

export class InvoicePipelineValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvoicePipelineValidationError';
  }
}

/**
 * Run the full invoice send pipeline against a prepared InvoiceDraft.
 *
 * The draft is mutated in-place to normalize client.country / email.
 * Caller is responsible for validating required fields (name, email,
 * serviceSlug) before invoking — this helper throws
 * InvoicePipelineValidationError if they're missing, but the intent
 * is for validation to happen at the API route boundary.
 */
export async function sendInvoiceFromDraft(
  draft: InvoiceDraft,
  settings: InvoiceSettings,
): Promise<SendInvoicePipelineResult> {
  // ─── Validation backstop ─────────────────────────────────
  if (!draft.client?.name?.trim()) {
    throw new InvoicePipelineValidationError('Client name is required');
  }
  if (!draft.client?.email?.includes('@')) {
    throw new InvoicePipelineValidationError('Valid client email is required');
  }
  if (!draft.serviceSlug) {
    throw new InvoicePipelineValidationError('Service is required');
  }
  const rawCountry = draft.client?.country ?? '';
  const normalizedISO2 = toISO2(rawCountry);
  if (!normalizedISO2 || normalizedISO2.length !== 2) {
    throw new InvoicePipelineValidationError(
      `Country "${rawCountry}" could not be resolved to an ISO-2 code`,
    );
  }
  draft.client.country = normalizedISO2;

  // ─── Server-side breakdown recompute ─────────────────────
  const breakdown = computeRateBreakdown(draft, settings);
  if (!breakdown) {
    throw new InvoicePipelineValidationError(
      'Could not compute breakdown — verify service and country.',
    );
  }

  // Normalize for downstream lookups
  const normalizedEmail = draft.client.email.trim().toLowerCase();
  const normalizedCountry = draft.client.country.toUpperCase();

  // ─── Customer resolution ─────────────────────────────────
  let customer = await getCustomer(normalizedEmail);
  if (!customer) {
    customer = await upsertCustomer(
      {
        email: normalizedEmail,
        name: draft.client.name,
        country: normalizedCountry,
        phone: draft.client.phone,
        address: draft.client.address,
        nextInvoiceSeq: 1,
      },
      'auto-from-invoice',
    );
  }
  customer = await ensureInitialsForCustomer(normalizedEmail);

  // ─── Dates + number ──────────────────────────────────────
  const now = new Date();
  const invoiceId = generateInvoiceId();

  const parseIssueDate = (raw: string | undefined): Date => {
    if (!raw) return now;
    const m = raw.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    const d = new Date(raw);
    return isNaN(d.getTime()) ? now : d;
  };
  const issueDateObj = parseIssueDate(draft.issueDate);

  const overrideRaw = draft.invoiceNumberOverride?.trim();
  let invoiceNumber: string;
  if (overrideRaw) {
    invoiceNumber = overrideRaw;
  } else {
    const seqForThisInvoice = await bumpInvoiceSeq(normalizedEmail);
    invoiceNumber = formatInvoiceNumber(
      {
        effectiveInitials: customer?.effectiveInitials || 'XX',
        nextInvoiceSeq: seqForThisInvoice,
      },
      issueDateObj,
    );
  }

  const issuedAt = issueDateObj.toISOString();
  const due = new Date(issueDateObj);
  due.setUTCDate(due.getUTCDate() + (draft.daysUntilDue || 7));
  const dueDate = due.toISOString();

  // ─── Stored invoice record ───────────────────────────────
  const normalizedDraft: InvoiceDraft = {
    ...draft,
    client: {
      ...draft.client,
      email: normalizedEmail,
      country: normalizedCountry,
    },
    updatedAt: now.toISOString(),
  };

  const paymentToken = crypto.randomUUID();

  const stored: StoredInvoice = {
    invoiceId,
    invoiceNumber,
    draft: normalizedDraft,
    breakdown,
    status: 'sent',
    issuedAt,
    dueDate,
    paymentMethod: 'unknown',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    dryRun: settings.dryRun,
    origin: 'native',
    paymentToken,
  };

  // ─── Stripe checkout session (tier 1) ────────────────────
  let stripeWarning: string | null = null;
  if (!isStripeSessionAvailable()) {
    if (normalizedDraft.stripePaymentLink) {
      stripeWarning =
        'Stripe dynamic checkout not configured — using your pasted Payment Link for card payments on this invoice.';
    } else if (settings.defaultStripePaymentLink?.trim()) {
      stripeWarning =
        'Stripe dynamic checkout not configured — using the global default Payment Link from Settings for card payments.';
    } else {
      stripeWarning =
        'Stripe dynamic checkout not configured and no Payment Link fallback set. The client can still pay via e-Transfer / wire / PayPal from the concierge page.';
    }
  } else {
    try {
      const service = (await import('@/data/services')).services.find(
        (s: { slug: string }) => s.slug === stored.draft.serviceSlug,
      );
      const checkoutUrl = await createInvoiceCheckoutSession({
        invoiceId: stored.invoiceId,
        invoiceNumber: stored.invoiceNumber,
        clientEmail: stored.draft.client.email,
        clientName: stored.draft.client.name,
        serviceName: service?.name || stored.draft.serviceSlug,
        totalCAD: breakdown.totalCAD,
        displayTotal: breakdown.formattedTotal,
        displayCurrency: breakdown.displayCurrency,
      });
      if (checkoutUrl) {
        stored.stripeCheckoutUrl = checkoutUrl;
      } else {
        stripeWarning =
          'Stripe session creation returned no URL — check server logs. Invoice sent anyway.';
      }
    } catch (stripeErr) {
      console.error('[send-invoice-pipeline] Stripe checkout failed:', stripeErr);
      stripeWarning =
        stripeErr instanceof Error
          ? `Stripe session failed: ${stripeErr.message}`
          : 'Stripe session failed with unknown error.';
    }
  }

  // ─── PDF ─────────────────────────────────────────────────
  const pdf = await generateInvoicePdf(stored, settings);

  // ─── Email (unless dryRun) ───────────────────────────────
  let emailError: string | null = null;
  if (!settings.dryRun) {
    try {
      const result = await sendInvoiceEmail(stored, pdf, settings);
      stored.emailMessageId = result.messageId;
      stored.emailSentAt = now.toISOString();
    } catch (emailErr) {
      console.error('[send-invoice-pipeline] Email failed:', emailErr);
      emailError =
        emailErr instanceof Error ? emailErr.message : 'Unknown email error';
    }
  }

  // ─── Persist + post-processing ───────────────────────────
  await saveInvoiceRecord(stored);

  try {
    await touchCustomerFromInvoice(stored);
  } catch (custErr) {
    console.error('[send-invoice-pipeline] Customer auto-touch failed:', custErr);
  }

  if (draft.draftId) {
    await deleteDraft(draft.draftId).catch(() => { /* swallow */ });
  }

  return { invoice: stored, emailError, stripeWarning };
}
