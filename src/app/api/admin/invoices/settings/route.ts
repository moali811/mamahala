/* ================================================================
   GET + POST /api/admin/invoices/settings
   ================================================================
   Read and update the invoice composer preferences.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { getSettings, saveSettings } from '@/lib/invoicing/kv-store';
import type { InvoiceSettings } from '@/lib/invoicing/types';

export async function GET(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function POST(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const body = (await req.json()) as Partial<InvoiceSettings>;
    const updated = await saveSettings(body);
    return NextResponse.json({ ok: true, settings: updated });
  } catch (err) {
    console.error('Save settings error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
