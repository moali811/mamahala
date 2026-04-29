/* ================================================================
   POST /api/admin/invoices/send-reminder/[id]
   ================================================================
   Admin-triggered manual payment reminder. Accepts subject + body
   from the ReminderModal (typically the AI draft, possibly edited),
   re-attaches the invoice PDF, and records the send in
   reminderHistory so the auto-reminders cron doesn't double-fire
   the same window.

   Body: { subject: string, body: string, tone?: 'gentle'|'warm'|'firm' }
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { generateInvoicePdf } from '@/lib/invoicing/pdf-generator';
import { sendPaymentReminderEmail } from '@/lib/invoicing/email-sender';
import {
  getInvoiceRecord,
  getSettings,
  saveInvoiceRecord,
} from '@/lib/invoicing/kv-store';
import type {
  ReminderHistoryEntry,
  ReminderKind,
  ReminderTone,
} from '@/lib/invoicing/types';

export const maxDuration = 30;

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Map a manual send to the cron's window taxonomy so cron correctly
 * skips the next window that admin has already covered.
 */
function inferWindow(daysOffset: number): { kind: ReminderKind; tone: ReminderTone } {
  if (daysOffset <= 0) return { kind: 'pre-due', tone: 'gentle' };
  if (daysOffset >= 30) return { kind: 'overdue+30', tone: 'firm' };
  if (daysOffset >= 14) return { kind: 'overdue+14', tone: 'firm' };
  if (daysOffset >= 7) return { kind: 'overdue+7', tone: 'warm' };
  return { kind: 'overdue+1', tone: 'warm' };
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const { id } = await ctx.params;
    const payload = await req.json();
    const subject = typeof payload?.subject === 'string' ? payload.subject.trim() : '';
    const body = typeof payload?.body === 'string' ? payload.body.trim() : '';
    if (!subject || !body) {
      return NextResponse.json(
        { error: 'subject and body are required' },
        { status: 400 },
      );
    }

    const invoice = await getInvoiceRecord(id);
    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const settings = await getSettings();
    if (settings.dryRun) {
      return NextResponse.json(
        { error: 'Dry Run mode is on — disable it before sending real reminders' },
        { status: 400 },
      );
    }

    const now = new Date();
    const daysOffset = Math.floor(
      (now.getTime() - new Date(invoice.dueDate).getTime()) / ONE_DAY_MS,
    );
    const inferred = inferWindow(daysOffset);
    const tone: ReminderTone = (payload?.tone as ReminderTone | undefined) ?? inferred.tone;

    const pdfBuffer = await generateInvoicePdf(invoice, settings);
    const result = await sendPaymentReminderEmail(
      invoice,
      pdfBuffer,
      settings,
      { subject, bodyText: body },
    );

    const entry: ReminderHistoryEntry = {
      kind: inferred.kind,
      sentAt: now.toISOString(),
      daysOffset,
      tone,
      trigger: 'manual',
      messageId: result.messageId,
      subject,
    };

    const updated = {
      ...invoice,
      reminderHistory: [...(invoice.reminderHistory ?? []), entry],
      lastReminderSentAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
    await saveInvoiceRecord(updated);

    return NextResponse.json({ ok: true, invoice: updated, messageId: result.messageId });
  } catch (err) {
    console.error('Send-reminder error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
