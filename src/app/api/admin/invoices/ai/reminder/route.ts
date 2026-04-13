/* ================================================================
   POST /api/admin/invoices/ai/reminder
   ================================================================
   Generates an AI-drafted payment reminder email for an overdue
   invoice. Returns { subject, body } for the admin to review and
   edit before sending.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { generatePaymentReminder } from '@/lib/invoicing/ai-reminders';
import { getInvoiceRecord } from '@/lib/invoicing/kv-store';
import { getCustomer } from '@/lib/invoicing/customer-store';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.invoiceId) {
      return NextResponse.json(
        { error: 'Missing invoiceId' },
        { status: 400 },
      );
    }

    const invoice = await getInvoiceRecord(body.invoiceId);
    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 },
      );
    }

    const daysOverdue = Math.max(
      0,
      Math.floor(
        (Date.now() - Date.parse(invoice.dueDate)) / (1000 * 60 * 60 * 24),
      ),
    );

    const customer = await getCustomer(invoice.draft.client.email);

    const result = await generatePaymentReminder({
      invoice,
      customer,
      daysOverdue,
      tone: body.tone,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error('AI reminder error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
