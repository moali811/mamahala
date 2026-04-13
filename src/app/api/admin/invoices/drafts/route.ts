/* ================================================================
   GET/POST/DELETE /api/admin/invoices/drafts
   ================================================================
   Auto-save drafts support for the Compose tab.
   - GET: list recent drafts
   - POST: save/update a draft (debounced from UI)
   - DELETE: remove a draft
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import {
  listDrafts,
  saveDraft,
  deleteDraft,
  getDraft,
} from '@/lib/invoicing/kv-store';
import type { InvoiceDraft } from '@/lib/invoicing/types';

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (id) {
    const draft = await getDraft(id);
    return NextResponse.json({ draft });
  }

  const drafts = await listDrafts();
  return NextResponse.json({ drafts });
}

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { draft?: InvoiceDraft };
    if (!body?.draft?.draftId) {
      return NextResponse.json(
        { error: 'Missing draft.draftId' },
        { status: 400 },
      );
    }
    await saveDraft(body.draft);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Save draft error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Missing id' },
        { status: 400 },
      );
    }
    await deleteDraft(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Delete draft error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
