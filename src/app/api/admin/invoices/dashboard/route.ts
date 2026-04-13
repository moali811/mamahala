/* ================================================================
   GET /api/admin/invoices/dashboard
   ================================================================
   Returns the rich dashboard view-model: summary cards, trend,
   currency mix, top clients, upcoming due, recent activity.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { listInvoiceRecords } from '@/lib/invoicing/kv-store';
import { buildDashboardView } from '@/lib/invoicing/dashboard-stats';

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const records = await listInvoiceRecords(200);
    const view = buildDashboardView(records);
    return NextResponse.json({ view });
  } catch (err) {
    console.error('Dashboard error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
