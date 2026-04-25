/* ================================================================
   POST /api/admin/invoices/delete
   ================================================================
   Permanently deletes an invoice record from KV. Admin-only, no undo.
   Removes the record, all index entries, and payment token mapping.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { deleteInvoiceRecord } from '@/lib/invoicing/kv-store';

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

    const deleted = await deleteInvoiceRecord(body.invoiceId);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Delete invoice error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
