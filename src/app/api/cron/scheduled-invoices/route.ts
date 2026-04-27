/* Cron: /api/cron/scheduled-invoices
   Scheduled via vercel.json: daily at 09:00 UTC

   PLAN LIMITATION: Vercel Hobby caps crons at once-per-day. With this
   schedule, a draft set for "tomorrow 2pm" actually goes out at 09:00
   UTC the day-after. To get 5-minute precision (closer to the picked
   time), upgrade to Vercel Pro and change the schedule to every 5 min.
   In the meantime the admin "Run now" button in the Scheduled tab hits
   this same endpoint with the admin Bearer token, so Dr. Hala can fire
   the queue any time without waiting for the daily tick.

   Scheduled-Send Engine:
   Scans all invoice drafts; any draft whose `scheduledSendAt <= now`
   is locked (NX) and sent via the same sendInvoiceFromDraft() pipeline
   used by manual sends. On success the draft is deleted (handled inside
   the pipeline). On failure we record the attempt + error and let the
   next tick retry, up to MAX_ATTEMPTS, after which the draft is left
   in place but flagged for admin review.
*/

import { NextRequest, NextResponse } from 'next/server';
import { listDrafts, saveDraft, getDraft, getSettings } from '@/lib/invoicing/kv-store';
import {
  sendInvoiceFromDraft,
  InvoicePipelineValidationError,
} from '@/lib/invoicing/send-invoice-pipeline';
import { dispatchToAllAdmins } from '@/lib/push/dispatch';
import type { InvoiceDraft } from '@/lib/invoicing/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_ATTEMPTS = 3;
const LOCK_TTL_SECONDS = 300; // 5 minutes — matches cron interval

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function tryAcquireLock(draftId: string): Promise<boolean> {
  if (!KV_AVAILABLE) return true; // dev: just run
  try {
    const { kv } = await import('@vercel/kv');
    const result = await kv.set(`invoices:scheduled-lock:${draftId}`, '1', {
      nx: true,
      ex: LOCK_TTL_SECONDS,
    });
    return !!result;
  } catch {
    return true; // fail-open
  }
}

async function releaseLock(draftId: string): Promise<void> {
  if (!KV_AVAILABLE) return;
  try {
    const { kv } = await import('@vercel/kv');
    await kv.del(`invoices:scheduled-lock:${draftId}`);
  } catch { /* ignore */ }
}

async function findDueScheduledDrafts(): Promise<InvoiceDraft[]> {
  const drafts = await listDrafts();
  const nowIso = new Date().toISOString();
  return drafts.filter(
    d =>
      d.scheduledSendAt
      && d.scheduledSendAt <= nowIso
      && (d.scheduledSendAttempts ?? 0) < MAX_ATTEMPTS,
  );
}

interface SendOutcome {
  draftId: string;
  ok: boolean;
  invoiceId?: string;
  invoiceNumber?: string;
  error?: string;
}

async function processDraft(draft: InvoiceDraft): Promise<SendOutcome> {
  const acquired = await tryAcquireLock(draft.draftId);
  if (!acquired) {
    return { draftId: draft.draftId, ok: false, error: 'Already being processed by another worker' };
  }

  try {
    // Re-read the draft inside the lock to avoid overwriting a cancellation
    // that landed between listDrafts() and now. If the schedule was cleared
    // or the draft deleted, skip silently.
    const fresh = await getDraft(draft.draftId);
    if (!fresh) {
      return { draftId: draft.draftId, ok: false, error: 'Draft no longer exists' };
    }
    if (!fresh.scheduledSendAt || fresh.scheduledSendAt > new Date().toISOString()) {
      return { draftId: draft.draftId, ok: false, error: 'Schedule was cancelled or moved' };
    }
    const settings = await getSettings();
    // The pipeline deletes the draft on success — no extra cleanup here.
    const { invoice, emailError } = await sendInvoiceFromDraft(fresh, settings);

    if (emailError) {
      // Email send failed but the invoice was created. We treat this as a
      // success for cron purposes (no retry), but flag in the response so
      // the admin push can mention it.
      return {
        draftId: draft.draftId,
        ok: true,
        invoiceId: invoice.invoiceId,
        invoiceNumber: invoice.invoiceNumber,
        error: `email: ${emailError}`,
      };
    }
    return {
      draftId: draft.draftId,
      ok: true,
      invoiceId: invoice.invoiceId,
      invoiceNumber: invoice.invoiceNumber,
    };
  } catch (err) {
    const errorMsg = err instanceof InvoicePipelineValidationError
      ? `validation: ${err.message}`
      : err instanceof Error ? err.message : 'unknown error';

    // Re-read once more before bumping the counter so we never resurrect a
    // draft the admin just cancelled. If the draft was deleted by the
    // pipeline mid-error (rare), we have nothing to update.
    const stillExists = await getDraft(draft.draftId);
    if (stillExists && stillExists.scheduledSendAt) {
      await saveDraft({
        ...stillExists,
        scheduledSendAttempts: (stillExists.scheduledSendAttempts ?? 0) + 1,
        scheduledSendLastAttemptAt: new Date().toISOString(),
        scheduledSendLastError: errorMsg,
      });
    }

    return { draftId: draft.draftId, ok: false, error: errorMsg };
  } finally {
    await releaseLock(draft.draftId);
  }
}

export async function GET(request: NextRequest) {
  // Auth: Vercel cron sends `Bearer ${CRON_SECRET}`, OR admin Bearer token works.
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const validCron = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const validAdmin = adminPassword && authHeader === `Bearer ${adminPassword}`;
  if (!validCron && !validAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const due = await findDueScheduledDrafts();
  if (due.length === 0) {
    return NextResponse.json({ message: 'No scheduled invoices due', processed: 0 });
  }

  const outcomes: SendOutcome[] = [];
  for (const draft of due) {
    const outcome = await processDraft(draft);
    outcomes.push(outcome);
  }

  const sent = outcomes.filter(o => o.ok).length;
  const failed = outcomes.filter(o => !o.ok).length;

  // Push-notify admin so Mo / Dr. Hala see the result on their phone.
  if (sent > 0 || failed > 0) {
    dispatchToAllAdmins({
      title: failed === 0
        ? `Sent ${sent} scheduled invoice${sent === 1 ? '' : 's'}`
        : `Scheduled invoices: ${sent} sent, ${failed} failed`,
      body: outcomes
        .map(o => o.ok ? `✓ ${o.invoiceNumber ?? o.draftId}` : `✗ ${o.draftId}: ${o.error?.slice(0, 80) ?? 'failed'}`)
        .slice(0, 5)
        .join(' · '),
      url: '/admin?tab=invoices&subtab=scheduled',
      tag: 'scheduled-invoices-cron',
      data: { kind: 'scheduled-invoices-batch', sent, failed },
    }).catch(err => console.error('[Scheduled Invoices Cron] push failed:', err));
  }

  console.log(`[Scheduled Invoices Cron] Processed ${due.length}: ${sent} sent, ${failed} failed`);

  return NextResponse.json({
    message: `Processed ${due.length} due drafts`,
    processed: due.length,
    sent,
    failed,
    outcomes,
  });
}
