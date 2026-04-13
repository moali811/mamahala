/* ================================================================
   POST /api/admin/invoices/zoho-import/preview
   ================================================================
   Stage 1 of the Zoho Books invoice history import. Parses the CSV
   server-side, runs the pre-match + numbering passes WITHOUT any
   KV writes, and returns a summary for the admin to review before
   committing.

   Body: { csv: string }
   Returns: ZohoInvoiceImportPreview
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { previewZohoImport } from '@/lib/invoicing/zoho-invoice-import';

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

    const preview = await previewZohoImport(csv);
    return NextResponse.json({ ok: true, preview });
  } catch (err) {
    console.error('Zoho invoice import preview error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
