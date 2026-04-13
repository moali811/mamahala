/* ================================================================
   POST /api/admin/invoices/ai/dashboard-commentary
   ================================================================
   Generates a 120-word Claude commentary on the current dashboard.
   Cached 24 hours in KV. Pass { force: true } in the body to
   regenerate.

   Body: { force?: boolean }
   Returns: { ok: true, summary, generatedAt, fromCache }
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import {
  generateDashboardCommentary,
  clearDashboardCommentaryCache,
} from '@/lib/invoicing/ai-dashboard-insights';
import { buildDashboardView } from '@/lib/invoicing/dashboard-stats';
import { listInvoiceRecords } from '@/lib/invoicing/kv-store';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const force = !!body?.force;

    if (force) {
      await clearDashboardCommentaryCache();
    }

    const invoices = await listInvoiceRecords(1000);
    const view = buildDashboardView(invoices);

    const result = await generateDashboardCommentary(view, { force });

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error('Dashboard commentary error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
