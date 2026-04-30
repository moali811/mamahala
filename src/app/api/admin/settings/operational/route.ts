/* GET/POST /api/admin/settings/operational
   ================================================================
   Reads and writes the high-impact operational toggles from the
   `invoices:settings` KV object — `dryRun` (prevents real emails on
   invoice send) and `paymentRemindersEnabled` (cron pre-due/overdue
   chases). Used by the iOS admin PWA so Mo can flip these from the
   phone without opening a laptop.

   Defaults: dryRun is true (safe), paymentRemindersEnabled is false
   (off until smoke-tested). Reuses getSettings/saveSettings, which
   are full-object read-modify-write per memory feedback_cms_kv_writes.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { getSettings, saveSettings } from '@/lib/invoicing/kv-store';

interface OperationalPayload {
  dryRun: boolean;
  paymentRemindersEnabled: boolean;
  updatedAt?: string;
}

export async function GET(req: NextRequest) {
  const auth = await authorizeWithLimit(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const settings = await getSettings();
  const out: OperationalPayload = {
    dryRun: !!settings.dryRun,
    paymentRemindersEnabled: !!settings.paymentRemindersEnabled,
    updatedAt: settings.updatedAt,
  };
  return NextResponse.json(out);
}

export async function POST(req: NextRequest) {
  const auth = await authorizeWithLimit(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  let body: { dryRun?: unknown; paymentRemindersEnabled?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const patch: { dryRun?: boolean; paymentRemindersEnabled?: boolean } = {};
  if (body.dryRun !== undefined) {
    if (typeof body.dryRun !== 'boolean') {
      return NextResponse.json({ error: 'dryRun must be a boolean' }, { status: 400 });
    }
    patch.dryRun = body.dryRun;
  }
  if (body.paymentRemindersEnabled !== undefined) {
    if (typeof body.paymentRemindersEnabled !== 'boolean') {
      return NextResponse.json({ error: 'paymentRemindersEnabled must be a boolean' }, { status: 400 });
    }
    patch.paymentRemindersEnabled = body.paymentRemindersEnabled;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'Provide at least one of: dryRun, paymentRemindersEnabled' }, { status: 400 });
  }

  const updated = await saveSettings(patch);
  const out: OperationalPayload = {
    dryRun: !!updated.dryRun,
    paymentRemindersEnabled: !!updated.paymentRemindersEnabled,
    updatedAt: updated.updatedAt,
  };
  return NextResponse.json(out);
}
