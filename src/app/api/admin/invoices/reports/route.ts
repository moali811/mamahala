/* ================================================================
   GET /api/admin/invoices/reports
   ================================================================
   Aggregates all KV invoices into buckets for the Reports tab.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { listInvoiceRecords } from '@/lib/invoicing/kv-store';
import { aggregateInvoices } from '@/lib/invoicing/reports';

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
