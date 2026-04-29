/* Cron: /api/cron/payment-reminders
   Scheduled via vercel.json: daily at 13:00 UTC

   Auto-Reminder Engine
   --------------------
   Fully automatic dunning loop. Once enabled in settings, scans all
   chase-able invoices once a day and fires:
     • pre-due  nudge — 3 days before the due date (gentle)
     • overdue+1   — first chase (warm)
     • overdue+7   — second chase (warm)
     • overdue+14  — third chase (firm)
     • overdue+30  — final chase (firm) + admin push for manual takeover

   Each invoice can only fire each window once — `reminderHistory` on
   the invoice record is the primary idempotency guard. NX locks
   prevent two concurrent crons from racing the same invoice.

   Auto-flips status `sent` → `overdue` whenever the due date has
   passed, regardless of whether a reminder fires this tick (so
   the dashboard counters stay accurate).

   Admin can hit "Run now" by POSTing the admin Bearer token to this
   endpoint — same auth pattern as scheduled-invoices.
*/

import { NextRequest, NextResponse } from 'next/server';
import {
  getInvoiceRecord,
  getSettings,
  listOpenInvoiceRecords,
  saveInvoiceRecord,
  updateInvoiceStatus,
} from '@/lib/invoicing/kv-store';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { generateInvoicePdf } from '@/lib/invoicing/pdf-generator';
import {
  generatePaymentReminder,
  type ReminderGenerationKind,
} from '@/lib/invoicing/ai-reminders';
import { sendPaymentReminderEmail } from '@/lib/invoicing/email-sender';
import {
  getDueReminderWindow,
  shouldFlipToOverdue,
} from '@/lib/invoicing/payment-reminder-windows';
import { dispatchToAllAdmins } from '@/lib/push/dispatch';
import type {
  ReminderHistoryEntry,
  ReminderKind,
  StoredInvoice,
} from '@/lib/invoicing/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const LOCK_TTL_SECONDS = 300;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function tryAcquireLock(invoiceId: string): Promise<boolean> {
  if (!KV_AVAILABLE) return true;
  try {
    const { kv } = await import('@vercel/kv');
    const result = await kv.set(`invoices:reminder-lock:${invoiceId}`, '1', {
      nx: true,
      ex: LOCK_TTL_SECONDS,
    });
    return !!result;
  } catch {
    return true;
  }
}

async function releaseLock(invoiceId: string): Promise<void> {
  if (!KV_AVAILABLE) return;
  try {
    const { kv } = await import('@vercel/kv');
    await kv.del(`invoices:reminder-lock:${invoiceId}`);
  } catch { /* ignore */ }
}

interface ReminderOutcome {
  invoiceId: string;
  invoiceNumber: string;
  ok: boolean;
  kind?: ReminderKind;
  skipped?: 'no-window' | 'synthetic-email' | 'lock' | 'cancelled';
  error?: string;
  /** True when status was flipped from sent → overdue this tick. */
  flippedToOverdue?: boolean;
  /** True when this was the terminal +30 reminder. */
  needsManualTakeover?: boolean;
}

async function processInvoice(
  initial: StoredInvoice,
  now: Date,
): Promise<ReminderOutcome> {
  const acquired = await tryAcquireLock(initial.invoiceId);
  if (!acquired) {
    return {
      invoiceId: initial.invoiceId,
      invoiceNumber: initial.invoiceNumber,
      ok: false,
      skipped: 'lock',
    };
  }

  try {
    // Re-read inside the lock so a payment marked between scan and now
    // doesn't trigger an unwanted chase.
    let invoice = await getInvoiceRecord(initial.invoiceId);
    if (!invoice) {
      return {
        invoiceId: initial.invoiceId,
        invoiceNumber: initial.invoiceNumber,
        ok: false,
        skipped: 'cancelled',
      };
    }

    let flippedToOverdue = false;
    if (shouldFlipToOverdue(invoice, now)) {
      const flipped = await updateInvoiceStatus(invoice.invoiceId, 'overdue');
      if (flipped) {
        invoice = flipped;
        flippedToOverdue = true;
      }
    }

    const window = getDueReminderWindow(invoice, now);
    if (!window) {
      return {
        invoiceId: invoice.invoiceId,
        invoiceNumber: invoice.invoiceNumber,
        ok: true,
        skipped: 'no-window',
        flippedToOverdue,
      };
    }

    const settings = await getSettings();
    const customer = await getCustomer(invoice.draft.client.email);
    const generationKind: ReminderGenerationKind =
      window.kind === 'pre-due' ? 'pre-due' : 'overdue';
    const locale: 'en' | 'ar' =
      invoice.draft.preferredLanguage === 'ar' ? 'ar' : 'en';

    const reminder = await generatePaymentReminder({
      invoice,
      customer,
      daysOverdue: window.daysOffset,
      tone: window.tone,
      kind: generationKind,
      locale,
    });

    const pdfBuffer = await generateInvoicePdf(invoice, settings);

    let messageId = '';
    try {
      const result = await sendPaymentReminderEmail(
        invoice,
        pdfBuffer,
        settings,
        { subject: reminder.subject, bodyText: reminder.body },
      );
      messageId = result.messageId;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      // Synthetic-email block is expected for Zoho-imported records with no email.
      // Don't spam admin push with these — log and skip silently.
      if (msg.includes('no email on file')) {
        return {
          invoiceId: invoice.invoiceId,
          invoiceNumber: invoice.invoiceNumber,
          ok: false,
          skipped: 'synthetic-email',
          flippedToOverdue,
        };
      }
      return {
        invoiceId: invoice.invoiceId,
        invoiceNumber: invoice.invoiceNumber,
        ok: false,
        error: msg,
        flippedToOverdue,
      };
    }

    const entry: ReminderHistoryEntry = {
      kind: window.kind,
      sentAt: now.toISOString(),
      daysOffset: window.daysOffset,
      tone: window.tone,
      trigger: 'cron',
      messageId,
      subject: reminder.subject,
    };

    // Re-read once more before persisting so a payment landed in this
    // narrow window doesn't get clobbered.
    const fresh = await getInvoiceRecord(invoice.invoiceId);
    const target = fresh ?? invoice;
    await saveInvoiceRecord({
      ...target,
      reminderHistory: [...(target.reminderHistory ?? []), entry],
      lastReminderSentAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });

    return {
      invoiceId: invoice.invoiceId,
      invoiceNumber: invoice.invoiceNumber,
      ok: true,
      kind: window.kind,
      flippedToOverdue,
      needsManualTakeover: window.kind === 'overdue+30',
    };
  } finally {
    await releaseLock(initial.invoiceId);
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

  const settings = await getSettings();
  if (!settings.paymentRemindersEnabled) {
    return NextResponse.json({
      message: 'Payment reminders are disabled in settings',
      processed: 0,
    });
  }
  if (settings.dryRun) {
    return NextResponse.json({
      message: 'Dry run mode is on — skipping cron run to avoid sending real emails',
      processed: 0,
    });
  }

  const now = new Date();
  const open = await listOpenInvoiceRecords();
  if (open.length === 0) {
    return NextResponse.json({ message: 'No open invoices', processed: 0 });
  }

  const outcomes: ReminderOutcome[] = [];
  for (const inv of open) {
    const outcome = await processInvoice(inv, now);
    outcomes.push(outcome);
  }

  const sent = outcomes.filter((o) => o.ok && o.kind).length;
  const failed = outcomes.filter((o) => !o.ok && !o.skipped).length;
  const flipped = outcomes.filter((o) => o.flippedToOverdue).length;
  const stuck = outcomes.filter((o) => o.needsManualTakeover);

  if (sent > 0 || failed > 0) {
    dispatchToAllAdmins({
      title: failed === 0
        ? `Sent ${sent} payment reminder${sent === 1 ? '' : 's'}`
        : `Payment reminders: ${sent} sent, ${failed} failed`,
      body: outcomes
        .filter((o) => o.kind || o.error)
        .map((o) => o.ok && o.kind
          ? `✓ ${o.invoiceNumber} (${o.kind})`
          : `✗ ${o.invoiceNumber}: ${o.error?.slice(0, 80) ?? 'failed'}`)
        .slice(0, 5)
        .join(' · '),
      url: '/admin?tab=invoices',
      tag: 'payment-reminders-cron',
      data: { kind: 'payment-reminders-batch', sent, failed, flipped },
    }).catch((err) => console.error('[Payment Reminders Cron] push failed:', err));
  }

  if (stuck.length > 0) {
    dispatchToAllAdmins({
      title: `${stuck.length} invoice${stuck.length === 1 ? '' : 's'} need manual follow-up`,
      body: stuck
        .map((o) => `${o.invoiceNumber} — 30+ days overdue, automation has handed off`)
        .slice(0, 5)
        .join(' · '),
      url: '/admin?tab=invoices&filter=stuck',
      tag: 'payment-reminders-stuck',
      data: { kind: 'payment-reminders-stuck', count: stuck.length },
    }).catch((err) => console.error('[Payment Reminders Cron] stuck push failed:', err));
  }

  console.log(
    `[Payment Reminders Cron] scanned=${open.length} sent=${sent} failed=${failed} flipped=${flipped} stuck=${stuck.length}`,
  );

  return NextResponse.json({
    message: `Processed ${open.length} open invoice${open.length === 1 ? '' : 's'}`,
    processed: open.length,
    sent,
    failed,
    flippedToOverdue: flipped,
    needsManualTakeover: stuck.length,
    outcomes,
  });
}
