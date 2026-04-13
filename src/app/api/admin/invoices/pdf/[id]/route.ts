/* ================================================================
   GET /api/admin/invoices/pdf/[id]
   ================================================================
   Regenerates and streams a PDF for a previously-sent invoice.
   Used by the History tab "View PDF" action.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { generateInvoicePdf } from '@/lib/invoicing/pdf-generator';
import { getInvoiceRecord, getSettings } from '@/lib/invoicing/kv-store';

export const maxDuration = 30;

export async function GET(
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

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${invoice.invoiceNumber}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('PDF regenerate error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
