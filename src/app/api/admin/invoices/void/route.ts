/* ================================================================
   POST /api/admin/invoices/void
   ================================================================
   Marks an invoice as void. Irreversible but non-destructive —
   the record remains in KV for audit.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { updateInvoiceStatus } from '@/lib/invoicing/kv-store';

export async function POST(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const body = (await req.json()) as { invoiceId?: string };
    if (!body.invoiceId) {
      return NextResponse.json(
        { error: 'Missing invoiceId' },
        { status: 400 },
      );
    }

    const updated = await updateInvoiceStatus(body.invoiceId, 'void');
    if (!updated) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, invoice: updated });
  } catch (err) {
    console.error('Void invoice error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
