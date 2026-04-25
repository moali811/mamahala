/* ================================================================
   POST /api/admin/invoices/preview
   ================================================================
   Pure compute — returns the rate breakdown for a draft + settings.
   No KV writes, no Stripe, no PDF generation, no email.
   Used by the Compose tab for server-verified live previews.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { computeRateBreakdown } from '@/lib/invoicing/rate-breakdown';
import { getSettings } from '@/lib/invoicing/kv-store';
import type { InvoiceDraft } from '@/lib/invoicing/types';

export async function POST(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const body = (await req.json()) as { draft?: InvoiceDraft };
    const draft = body?.draft;
    if (!draft) {
      return NextResponse.json(
        { error: 'Missing draft' },
        { status: 400 },
      );
    }

    const settings = await getSettings();
    const breakdown = computeRateBreakdown(draft, settings);
    if (!breakdown) {
      return NextResponse.json(
        {
          error:
            'Could not compute breakdown — check service slug and country code.',
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ breakdown });
  } catch (err) {
    console.error('Invoice preview error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
