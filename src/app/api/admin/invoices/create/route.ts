/* ================================================================
   POST /api/admin/invoices/create
   ================================================================
   The main "send invoice" endpoint:
   1. Validates the draft
   2. Recomputes the breakdown on the server (frontend value ignored)
   3. Ensures the customer record exists + has effectiveInitials
   4. Generates the invoice number in the new MCH-YYYYMM-INIT-N format
   5. Generates the PDF via jspdf
   6. Sends the email via Resend (unless Dry Run mode)
   7. Persists StoredInvoice to KV with all immutable snapshots
   8. Bumps the customer's nextInvoiceSeq counter
   9. Deletes the draft if it existed
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { computeRateBreakdown } from '@/lib/invoicing/rate-breakdown';
import { generateInvoicePdf } from '@/lib/invoicing/pdf-generator';
import { sendInvoiceEmail } from '@/lib/invoicing/email-sender';
import {
  generateInvoiceId,
  formatInvoiceNumber,
} from '@/lib/invoicing/invoice-number';
import {
  getSettings,
  saveInvoiceRecord,
  deleteDraft,
} from '@/lib/invoicing/kv-store';
import {
  bumpInvoiceSeq,
  ensureInitialsForCustomer,
  getCustomer,
  touchCustomerFromInvoice,
  upsertCustomer,
} from '@/lib/invoicing/customer-store';
import type { InvoiceDraft, StoredInvoice } from '@/lib/invoicing/types';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { draft?: InvoiceDraft };
    const draft = body?.draft;
    if (!draft) {
      return NextResponse.json(
        { error: 'Missing draft' },
        { status: 400 },
      );
    }

    // Basic validation
    if (!draft.client?.name?.trim()) {
      return NextResponse.json(
        { error: 'Client name is required' },
        { status: 400 },
      );
    }
    if (!draft.client?.email?.includes('@')) {
      return NextResponse.json(
        { error: 'Valid client email is required' },
        { status: 400 },
      );
    }
    if (!draft.client?.country || draft.client.country.length !== 2) {
      return NextResponse.json(
        { error: 'Country must be a 2-letter ISO code' },
        { status: 400 },
      );
    }
    if (!draft.serviceSlug) {
      return NextResponse.json(
        { error: 'Service is required' },
        { status: 400 },
      );
    }

    const settings = await getSettings();

    // Server-side recompute — frontend breakdown is never trusted
    const breakdown = computeRateBreakdown(draft, settings);
    if (!breakdown) {
      return NextResponse.json(
        {
          error:
            'Could not compute breakdown — verify service and country.',
        },
        { status: 400 },
      );
    }

    // Normalize client email + country for consistent customer lookups
    const normalizedEmail = draft.client.email.trim().toLowerCase();
    const normalizedCountry = draft.client.country.toUpperCase();

    // ─── Customer resolution (new: required for invoice numbering) ─────
    // Fetch or auto-create the customer record so we can get their
    // effectiveInitials and nextInvoiceSeq.
    let customer = await getCustomer(normalizedEmail);
    if (!customer) {
      // Auto-create from the draft. Source is 'auto-from-invoice' even though
      // the admin is typing it manually — the customer record is derived
      // from the invoice, not imported or manually created.
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

    // Ensure the customer has effectiveInitials + nextInvoiceSeq set
    // (covers legacy customers created before Phase 3)
    customer = await ensureInitialsForCustomer(normalizedEmail);

    const now = new Date();
    const invoiceId = generateInvoiceId();

    // Resolve the effective issue date — admin can override via
    // draft.issueDate (YYYY-MM-DD). Default to `now`. The invoice-number
    // YYYYMM prefix AND the due-date calculation both key off this.
    const parseIssueDate = (raw: string | undefined): Date => {
      if (!raw) return now;
      // Accept YYYY-MM-DD (parsed as UTC midnight to avoid TZ drift)
      const m = raw.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (m) {
        return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
      }
      const d = new Date(raw);
      return isNaN(d.getTime()) ? now : d;
    };
    const issueDateObj = parseIssueDate(draft.issueDate);

    // Generate invoice number — user override wins. When overriding, we do
    // NOT bump the customer's sequence counter so their next auto-generated
    // invoice uses the expected next number.
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

    // Normalize country to uppercase in the stored snapshot
    const normalizedDraft: InvoiceDraft = {
      ...draft,
      client: {
        ...draft.client,
        email: normalizedEmail,
        country: normalizedCountry,
      },
      updatedAt: now.toISOString(),
    };

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
    };

    // Generate the PDF
    const pdf = await generateInvoicePdf(stored, settings);

    // Send the email (unless Dry Run) — capture errors so the UI can surface them
    let emailError: string | null = null;
    if (!settings.dryRun) {
      try {
        const result = await sendInvoiceEmail(stored, pdf, settings);
        stored.emailMessageId = result.messageId;
        stored.emailSentAt = now.toISOString();
      } catch (emailErr) {
        console.error('Invoice email send failed:', emailErr);
        // Keep the invoice as 'sent' so it shows up in History and can be
        // downloaded/retried. Surface the error message to the UI.
        emailError =
          emailErr instanceof Error ? emailErr.message : 'Unknown email error';
      }
    }

    // Persist to KV
    await saveInvoiceRecord(stored);

    // Auto-create / update the customer record from this invoice
    try {
      await touchCustomerFromInvoice(stored);
    } catch (custErr) {
      console.error('Customer auto-touch failed:', custErr);
    }

    // Delete the draft if it existed
    if (draft.draftId) {
      await deleteDraft(draft.draftId);
    }

    return NextResponse.json({
      ok: true,
      invoice: stored,
      dryRun: settings.dryRun,
      emailError,
    });
  } catch (err) {
    console.error('Invoice create error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
