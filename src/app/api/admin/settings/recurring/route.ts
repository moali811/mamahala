/* GET/POST /api/admin/settings/recurring
   ================================================================
   Reads and writes the `selfServeRecurringEnabled` flag inside the
   `invoices:settings` KV object — used by the iOS admin PWA so Mo
   can toggle whether clients see the "make this recurring" option
   on the public booking page.

   Defaults to false (off). Reuses getSettings/saveSettings, which
   are full-object read-modify-write per memory feedback_cms_kv_writes.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { getSettings, saveSettings } from '@/lib/invoicing/kv-store';

export async function GET(req: NextRequest) {
  const auth = await authorizeWithLimit(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const settings = await getSettings();
  return NextResponse.json({
    selfServeRecurringEnabled: !!settings.selfServeRecurringEnabled,
    updatedAt: settings.updatedAt,
  });
}

export async function POST(req: NextRequest) {
  const auth = await authorizeWithLimit(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  let body: { selfServeRecurringEnabled?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (typeof body.selfServeRecurringEnabled !== 'boolean') {
    return NextResponse.json({ error: 'selfServeRecurringEnabled must be a boolean' }, { status: 400 });
  }

  const updated = await saveSettings({ selfServeRecurringEnabled: body.selfServeRecurringEnabled });
  return NextResponse.json({
    selfServeRecurringEnabled: !!updated.selfServeRecurringEnabled,
    updatedAt: updated.updatedAt,
  });
}
