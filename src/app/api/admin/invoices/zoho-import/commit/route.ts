/* ================================================================
   POST /api/admin/invoices/zoho-import/commit
   ================================================================
   Stage 2 of the Zoho Books invoice history import. Re-parses the
   CSV, runs the full pre-match + numbering pipeline, and writes each
   assigned invoice to KV (along with customer upserts and stat sweeps).

   Body: { csv: string }
   Returns: ZohoInvoiceImportResult

   Execution time: ~238 invoices × ~3 KV operations each ≈ 700 round-trips.
   maxDuration is bumped to 60 seconds to give the pipeline breathing room.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { commitZohoImport } from '@/lib/invoicing/zoho-invoice-import';

export const maxDuration = 60;

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

    const result = await commitZohoImport(csv);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error('Zoho invoice import commit error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
