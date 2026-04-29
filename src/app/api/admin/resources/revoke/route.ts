/* ================================================================
   POST /api/admin/resources/revoke — undo a grant
   ================================================================
   Removes the unlock KV record for a given resource + email. Used
   when a grant was made in error or a comp is being rolled back.

   Body shape:
     {
       recipientEmail: string,
       kind: 'toolkit' | 'academy',
       slug: string,
       levels?: number[]   // academy only; defaults to all paid levels
     }
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { revokeToolkitAccess, revokeAcademyAccess } from '@/lib/resources/grant';

export const maxDuration = 15;

interface RevokeBody {
  recipientEmail?: string;
  kind?: 'toolkit' | 'academy';
  slug?: string;
  levels?: number[];
}

export async function POST(request: NextRequest) {
  const auth = await authorizeWithLimit(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let body: RevokeBody;
  try {
    body = (await request.json()) as RevokeBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const recipientEmail = (body.recipientEmail || '').trim();
  if (!recipientEmail) {
    return NextResponse.json({ error: 'recipientEmail is required' }, { status: 400 });
  }
  if (!body.slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }

  if (body.kind === 'toolkit') {
    const r = await revokeToolkitAccess(body.slug, recipientEmail);
    return NextResponse.json(r, { status: r.ok ? 200 : 500 });
  }
  if (body.kind === 'academy') {
    const r = await revokeAcademyAccess(body.slug, recipientEmail, body.levels);
    return NextResponse.json(r, { status: r.ok ? 200 : 500 });
  }
  return NextResponse.json({ error: "kind must be 'toolkit' or 'academy'" }, { status: 400 });
}
