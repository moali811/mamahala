/* ================================================================
   GET + POST /api/admin/invoices/settings
   ================================================================
   Read and update the invoice composer preferences.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import { getSettings, saveSettings } from '@/lib/invoicing/kv-store';
import type { InvoiceSettings } from '@/lib/invoicing/types';

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
