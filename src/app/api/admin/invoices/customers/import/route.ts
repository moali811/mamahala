/* ================================================================
   POST /api/admin/invoices/customers/import
   ================================================================
   Bulk import customers from CSV. Body is { csv: string }.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { importFromCSV } from '@/lib/invoicing/customer-store';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const csv = body?.csv;
    if (typeof csv !== 'string' || !csv.trim()) {
      return NextResponse.json(
        { error: 'Missing csv string' },
        { status: 400 },
      );
    }

    const result = await importFromCSV(csv);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error('CSV import error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
