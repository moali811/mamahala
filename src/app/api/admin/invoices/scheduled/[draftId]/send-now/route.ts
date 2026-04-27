/* POST /api/admin/invoices/scheduled/[draftId]/send-now
   ================================================================
   Fires the scheduled draft immediately via the same send pipeline.
   On success the draft is deleted by the pipeline. Useful when Dr.
   Hala wants to send before the scheduled time.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { getDraft, getSettings } from '@/lib/invoicing/kv-store';
import {
  sendInvoiceFromDraft,
  InvoicePipelineValidationError,
} from '@/lib/invoicing/send-invoice-pipeline';

export const maxDuration = 30;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ draftId: string }> },
) {
  const auth = await authorizeWithLimit(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { draftId } = await params;
  if (!draftId) {
    return NextResponse.json({ error: 'draftId required' }, { status: 400 });
  }

  const draft = await getDraft(draftId);
  if (!draft) {
    return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
  }

  try {
    const settings = await getSettings();
    // Strip the schedule fields before sending so the StoredInvoice
    // doesn't carry stale scheduling metadata.
    const draftToSend = {
      ...draft,
      scheduledSendAt: undefined,
      scheduledSendAttempts: undefined,
      scheduledSendLastAttemptAt: undefined,
      scheduledSendLastError: undefined,
    };
    const { invoice, emailError, stripeWarning } = await sendInvoiceFromDraft(
      draftToSend,
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
    console.error('[scheduled send-now] error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
