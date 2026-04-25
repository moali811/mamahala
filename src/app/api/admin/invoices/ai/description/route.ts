/* ================================================================
   POST /api/admin/invoices/ai/description
   ================================================================
   Generates an AI-suggested invoice line-item description.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { generateInvoiceDescription } from '@/lib/invoicing/ai-descriptions';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const body = await req.json();
    if (!body.serviceSlug) {
      return NextResponse.json(
        { error: 'Missing serviceSlug' },
        { status: 400 },
      );
    }

    const result = await generateInvoiceDescription({
      serviceSlug: body.serviceSlug,
      clientName: body.clientName,
      clientCountry: body.clientCountry,
      complexityPercent: body.complexityPercent,
      sessions: body.sessions,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error('AI description error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
