/* ================================================================
   GET /api/admin/invoices/reports
   ================================================================
   Aggregates all KV invoices into buckets for the Reports tab.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { listInvoiceRecords } from '@/lib/invoicing/kv-store';
import { aggregateInvoices } from '@/lib/invoicing/reports';

export async function GET(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const records = await listInvoiceRecords(200);
    const report = aggregateInvoices(records);
    return NextResponse.json({ report });
  } catch (err) {
    console.error('Reports error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
