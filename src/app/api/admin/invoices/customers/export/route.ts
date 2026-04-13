/* ================================================================
   GET /api/admin/invoices/customers/export
   ================================================================
   Streams customer database as a CSV file download.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { exportToCSV } from '@/lib/invoicing/customer-store';

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const csv = await exportToCSV();
    const filename = `customers-${new Date().toISOString().slice(0, 10)}.csv`;
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('CSV export error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
