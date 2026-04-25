/* ================================================================
   POST /api/admin/devices/register
   DELETE /api/admin/devices/register
   ================================================================
   Lets the iPhone PWA register/unregister Web Push subscriptions.

   Storage: Vercel KV hash at `admin:push-subscriptions`.
     - field = endpoint URL (dedupes re-subscriptions on same device)
     - value = JSON {endpoint, keys, deviceLabel, userAgent, createdAt, lastSeenAt}

   Auth: standard Bearer auth (same as every other /api/admin route).
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { authorizeWithLimit } from '@/lib/invoicing/auth';

const KEY = 'admin:push-subscriptions';
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

interface RegisterBody {
  subscription: {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  };
  deviceLabel?: string;
  userAgent?: string;
}

interface DeleteBody {
  endpoint: string;
}

export async function POST(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }
  if (!KV_AVAILABLE) {
    return NextResponse.json({ ok: false, kv: false }, { status: 503 });
  }

  let body: RegisterBody;
  try {
    body = (await req.json()) as RegisterBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body?.subscription?.endpoint || !body.subscription?.keys?.p256dh || !body.subscription?.keys?.auth) {
    return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const record = {
    endpoint: body.subscription.endpoint,
    keys: body.subscription.keys,
    deviceLabel: body.deviceLabel ?? 'Device',
    userAgent: body.userAgent ?? '',
    createdAt: now,
    lastSeenAt: now,
  };

  try {
    await kv.hset(KEY, { [body.subscription.endpoint]: JSON.stringify(record) });
  } catch (err) {
    console.error('[devices/register] KV write failed:', err);
    return NextResponse.json({ error: 'Storage error' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }
  if (!KV_AVAILABLE) {
    return NextResponse.json({ ok: false, kv: false }, { status: 503 });
  }

  let body: DeleteBody;
  try {
    body = (await req.json()) as DeleteBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body?.endpoint) {
    return NextResponse.json({ error: 'Missing endpoint' }, { status: 400 });
  }

  try {
    await kv.hdel(KEY, body.endpoint);
  } catch (err) {
    console.error('[devices/register] KV delete failed:', err);
    return NextResponse.json({ error: 'Storage error' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
