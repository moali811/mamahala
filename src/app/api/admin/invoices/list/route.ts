/* ================================================================
   GET /api/admin/invoices/list
   ================================================================
   Returns recent invoices from KV. Auto-computes 'overdue' status
   for 'sent' invoices past their due date.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { listInvoiceRecords } from '@/lib/invoicing/kv-store';
import type { StoredInvoice } from '@/lib/invoicing/types';

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const limit = Math.min(
      200,
      parseInt(url.searchParams.get('limit') ?? '50', 10) || 50,
    );

    const records = await listInvoiceRecords(limit);
    const now = Date.now();

    // Compute overdue dynamically for sent invoices past their due date
    const enriched = records.map((r): StoredInvoice => {
      if (r.status === 'sent') {
        const due = new Date(r.dueDate).getTime();
        if (due < now) {
          return { ...r, status: 'overdue' };
        }
      }
      return r;
    });

    return NextResponse.json({ invoices: enriched });
  } catch (err) {
    console.error('Invoice list error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
