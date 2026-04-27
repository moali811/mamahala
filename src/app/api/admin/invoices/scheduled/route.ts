/* GET /api/admin/invoices/scheduled
   ================================================================
   Returns all drafts that have a `scheduledSendAt` set, sorted by
   the scheduled time ascending. Used by the InvoicesModule "Scheduled"
   subtab so Dr. Hala can see what's queued and edit/cancel/send-now.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { listDrafts } from '@/lib/invoicing/kv-store';

export async function GET(req: NextRequest) {
  const auth = await authorizeWithLimit(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const drafts = await listDrafts();
    const scheduled = drafts
      .filter(d => !!d.scheduledSendAt)
      .sort((a, b) => (a.scheduledSendAt ?? '').localeCompare(b.scheduledSendAt ?? ''));
    return NextResponse.json({ scheduled });
  } catch (err) {
    console.error('[admin scheduled invoices] error:', err);
    return NextResponse.json({ error: 'Failed to list scheduled invoices' }, { status: 500 });
  }
}
