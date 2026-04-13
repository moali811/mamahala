/* ================================================================
   GET/POST /api/admin/invoices/recurring/process
   ================================================================
   Vercel cron handler — runs daily at 8am UTC.
   Walks all active schedules, generates next-instance invoices.
   Idempotent: skips schedules that already ran today.

   Auth: accepts EITHER the standard admin Bearer token (manual run)
   OR Vercel's CRON_SECRET (automated run).
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import {
  listSchedules,
  isScheduleDue,
  markScheduleRun,
  saveRunLog,
  type CronRunLog,
} from '@/lib/invoicing/recurring';
import {
  generateInvoiceId,
  formatInvoiceNumber,
} from '@/lib/invoicing/invoice-number';
import { computeRateBreakdown } from '@/lib/invoicing/rate-breakdown';
import { generateInvoicePdf } from '@/lib/invoicing/pdf-generator';
import { sendInvoiceEmail } from '@/lib/invoicing/email-sender';
import {
  getSettings,
  saveInvoiceRecord,
} from '@/lib/invoicing/kv-store';
import {
  bumpInvoiceSeq,
  ensureInitialsForCustomer,
  touchCustomerFromInvoice,
} from '@/lib/invoicing/customer-store';
import type { StoredInvoice, InvoiceDraft } from '@/lib/invoicing/types';

export const maxDuration = 60;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const CRON_SECRET = process.env.CRON_SECRET;

function authorize(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  if (auth === `Bearer ${ADMIN_PASSWORD}`) return true;
  if (CRON_SECRET && auth === `Bearer ${CRON_SECRET}`) return true;
  return false;
}

async function runCron() {
  const today = new Date().toISOString().slice(0, 10);
  const log: CronRunLog = {
    date: today,
    startedAt: new Date().toISOString(),
    schedulesProcessed: 0,
    invoicesCreated: 0,
    errors: [],
  };

  const schedules = await listSchedules(200);
  const settings = await getSettings();

  for (const schedule of schedules) {
    if (!isScheduleDue(schedule)) continue;

    log.schedulesProcessed++;

    try {
      // Clone the template draft, give it a fresh draftId + timestamps
      const now = new Date();
      const draft: InvoiceDraft = {
        ...schedule.templateDraft,
        draftId: `draft_recurring_${schedule.scheduleId}_${Date.now()}`,
        recurringScheduleId: schedule.scheduleId,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };

      // Recompute breakdown (in case pricing changed)
      const breakdown = computeRateBreakdown(draft, settings);
      if (!breakdown) {
        log.errors.push({
          scheduleId: schedule.scheduleId,
          reason: 'Could not compute breakdown',
        });
        continue;
      }

      // Resolve the customer so we can use per-customer numbering
      const clientEmail = draft.client.email.trim().toLowerCase();
      const customer = await ensureInitialsForCustomer(clientEmail);
      const seqForThisInvoice = await bumpInvoiceSeq(clientEmail);

      // Create the invoice record
      const invoiceNumber = formatInvoiceNumber(
        {
          effectiveInitials: customer?.effectiveInitials || 'XX',
          nextInvoiceSeq: seqForThisInvoice,
        },
        now,
      );
      const invoiceId = generateInvoiceId();
      const issuedAt = now.toISOString();
      const due = new Date(now);
      due.setDate(due.getDate() + (draft.daysUntilDue || 7));

      const stored: StoredInvoice = {
        invoiceId,
        invoiceNumber,
        draft,
        breakdown,
        // If autoSend is true, mark as sent; else leave as draft for admin review
        status: schedule.autoSend ? 'sent' : 'draft',
        issuedAt,
        dueDate: due.toISOString(),
        paymentMethod: 'unknown',
        createdAt: issuedAt,
        updatedAt: issuedAt,
        dryRun: settings.dryRun,
        origin: 'native',
      };

      // Generate PDF
      const pdf = await generateInvoicePdf(stored, settings);

      // Auto-send if enabled and not dry-run
      if (schedule.autoSend && !settings.dryRun) {
        try {
          const result = await sendInvoiceEmail(stored, pdf, settings);
          stored.emailMessageId = result.messageId;
          stored.emailSentAt = now.toISOString();
        } catch (e) {
          log.errors.push({
            scheduleId: schedule.scheduleId,
            reason: `Email send failed: ${
              e instanceof Error ? e.message : 'unknown'
            }`,
          });
        }
      }

      await saveInvoiceRecord(stored);
      await touchCustomerFromInvoice(stored);
      await markScheduleRun(schedule.scheduleId, invoiceId);
      log.invoicesCreated++;
    } catch (err) {
      log.errors.push({
        scheduleId: schedule.scheduleId,
        reason: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  log.finishedAt = new Date().toISOString();
  await saveRunLog(log);
  return log;
}

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const log = await runCron();
    return NextResponse.json({ ok: true, log });
  } catch (err) {
    console.error('Recurring process error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Same handler — Vercel cron uses GET by default but we accept POST for manual runs
  return GET(req);
}
