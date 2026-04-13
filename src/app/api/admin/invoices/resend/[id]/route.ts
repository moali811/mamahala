/* ================================================================
   POST /api/admin/invoices/resend/[id]
   ================================================================
   Re-sends an existing invoice email to the client. Regenerates
   the PDF on the fly and calls Resend again. Updates the stored
   record with the new emailMessageId.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { generateInvoicePdf } from '@/lib/invoicing/pdf-generator';
import { sendInvoiceEmail } from '@/lib/invoicing/email-sender';
import {
  getInvoiceRecord,
  getSettings,
  saveInvoiceRecord,
} from '@/lib/invoicing/kv-store';

export const maxDuration = 30;

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await ctx.params;
    const invoice = await getInvoiceRecord(id);
    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 },
      );
    }

    const settings = await getSettings();
    const pdf = await generateInvoicePdf(invoice, settings);
    const result = await sendInvoiceEmail(invoice, pdf, settings);

    const updated = {
      ...invoice,
      emailMessageId: result.messageId,
      emailSentAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await saveInvoiceRecord(updated);

    return NextResponse.json({ ok: true, invoice: updated });
  } catch (err) {
    console.error('Resend invoice error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
