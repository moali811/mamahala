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
import { getSettings, saveDraft } from '@/lib/invoicing/kv-store';
import {
  sendInvoiceFromDraft,
  InvoicePipelineValidationError,
} from '@/lib/invoicing/send-invoice-pipeline';
import type { InvoiceDraft } from '@/lib/invoicing/types';

export const maxDuration = 30;

/** Minimum lead time for a scheduled send, in minutes. */
const MIN_SCHEDULE_LEAD_MINUTES = 5;

export async function POST(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const body = (await req.json()) as {
      draft?: InvoiceDraft;
      /** Optional ISO timestamp — when present, persist the draft and let
       *  the scheduled-invoices cron send it at that time instead of now. */
      scheduledSendAt?: string;
    };
    const draft = body?.draft;
    if (!draft) {
      return NextResponse.json(
        { error: 'Missing draft' },
        { status: 400 },
      );
    }

    // ─── Scheduled-send branch ────────────────────────────────
    // When scheduledSendAt is set and in the future, we persist the draft
    // (with the timestamp) and skip the immediate pipeline. The cron at
    // /api/cron/scheduled-invoices picks it up at fire time and runs the
    // exact same sendInvoiceFromDraft() — single source of truth.
    if (body.scheduledSendAt) {
      const scheduledAt = new Date(body.scheduledSendAt);
      if (isNaN(scheduledAt.getTime())) {
        return NextResponse.json(
          { error: 'scheduledSendAt is not a valid ISO timestamp' },
          { status: 400 },
        );
      }
      const earliest = new Date(Date.now() + MIN_SCHEDULE_LEAD_MINUTES * 60_000);
      if (scheduledAt.getTime() < earliest.getTime()) {
        return NextResponse.json(
          { error: `Scheduled time must be at least ${MIN_SCHEDULE_LEAD_MINUTES} minutes from now` },
          { status: 400 },
        );
      }

      // Lightweight validation so the cron doesn't pick up a draft that
      // would just throw on send. Same shape as the pipeline's backstop.
      if (!draft.client?.name?.trim()) {
        return NextResponse.json({ error: 'Client name is required' }, { status: 400 });
      }
      if (!draft.client?.email?.includes('@')) {
        return NextResponse.json({ error: 'Valid client email is required' }, { status: 400 });
      }
      if (!draft.serviceSlug) {
        return NextResponse.json({ error: 'Service is required' }, { status: 400 });
      }

      const persistedDraft: InvoiceDraft = {
        ...draft,
        scheduledSendAt: scheduledAt.toISOString(),
        scheduledSendAttempts: 0,
        scheduledSendLastError: undefined,
        scheduledSendLastAttemptAt: undefined,
        updatedAt: new Date().toISOString(),
      };
      await saveDraft(persistedDraft);

      return NextResponse.json({
        ok: true,
        scheduled: true,
        scheduledSendAt: persistedDraft.scheduledSendAt,
        draftId: persistedDraft.draftId,
      });
    }

    // ─── Immediate send (existing flow) ───────────────────────
    const settings = await getSettings();
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
