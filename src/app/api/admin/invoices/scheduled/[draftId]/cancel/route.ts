/* POST /api/admin/invoices/scheduled/[draftId]/cancel
   ================================================================
   Clears scheduledSendAt on the draft, so the cron will skip it.
   The draft itself is preserved (so Dr. Hala can still edit/send later).
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { getDraft, saveDraft } from '@/lib/invoicing/kv-store';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ draftId: string }> },
) {
  const auth = await authorizeWithLimit(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { draftId } = await params;
  if (!draftId) {
    return NextResponse.json({ error: 'draftId required' }, { status: 400 });
  }

  const draft = await getDraft(draftId);
  if (!draft) {
    return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
  }
  if (!draft.scheduledSendAt) {
    return NextResponse.json({ error: 'Draft is not scheduled' }, { status: 400 });
  }

  await saveDraft({
    ...draft,
    scheduledSendAt: undefined,
    scheduledSendAttempts: undefined,
    scheduledSendLastAttemptAt: undefined,
    scheduledSendLastError: undefined,
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, draftId });
}
