/* ================================================================
   POST /api/admin/invoices/create
   ================================================================
   The main "send invoice" endpoint:
   1. Validates the draft
   2. Recomputes the breakdown on the server (frontend value ignored)
   3. Ensures the customer record exists + has effectiveInitials
   4. Generates the invoice number in the MHC-YYYYMM-INIT-N format
   5. Generates the PDF via jspdf
   6. Sends the email via Resend (unless Dry Run mode)
   7. Persists StoredInvoice to KV with all immutable snapshots
   8. Bumps the customer's nextInvoiceSeq counter
   9. Deletes the draft if it existed
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { getSettings } from '@/lib/invoicing/kv-store';
import {
  sendInvoiceFromDraft,
  InvoicePipelineValidationError,
} from '@/lib/invoicing/send-invoice-pipeline';
import type { InvoiceDraft } from '@/lib/invoicing/types';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
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

    const settings = await getSettings();

    // Delegate everything to the shared pipeline. It handles its own
    // validation (throws InvoicePipelineValidationError on bad input)
    // plus the full breakdown → customer → number → PDF → email →
    // save → draft-delete sequence.
    const { invoice, emailError, stripeWarning } = await sendInvoiceFromDraft(
      draft,
      settings,
    );

    return NextResponse.json({
      ok: true,
      invoice,
      dryRun: settings.dryRun,
      emailError,
      stripeWarning,
    });
  } catch (err) {
    if (err instanceof InvoicePipelineValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('Invoice create error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
