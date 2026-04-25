/* ================================================================
   GET /api/admin/invoices/dashboard
   ================================================================
   Returns the rich dashboard view-model: summary cards, trend,
   currency mix, top clients, upcoming due, recent activity.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { listInvoiceRecords } from '@/lib/invoicing/kv-store';
import { buildDashboardView } from '@/lib/invoicing/dashboard-stats';

export async function GET(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
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
