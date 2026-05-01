/* ================================================================
   POST /api/admin/devices/test
   ================================================================
   Sends a single Web Push notification to ONE registered subscription
   so an admin can verify the push chain end-to-end without making a
   real booking. Used by the "Send test notification" buttons in both
   admin apps' Settings + the /admin/devices diagnostic page.

   Body: { endpoint: string }  — the subscription endpoint URL of the
                                  device that should receive the test.
                                  The client supplies its own endpoint
                                  via getCurrentPushSubscription().

   Auth: Bearer (same as every other /api/admin route). Only admins
   with the password can trigger tests; since there are only two
   admins (Mo + Dr. Hala), trusting the endpoint in the body is fine.

   Response: { ok, sent, statusCode? } — statusCode surfaces the
   web-push library's HTTP status from APNs/FCM so the diagnostic UI
   can show "410 — endpoint expired" type errors directly.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import webpush from 'web-push';
import { authorizeWithLimit } from '@/lib/invoicing/auth';

export const dynamic = 'force-dynamic';

const KEY = 'admin:push-subscriptions';
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@mamahala.ca';

let configured = false;
function configureOnce(): boolean {
  if (configured) return true;
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) return false;
  // web-push requires URL-safe base64 *without* padding. If the env value
  // was pasted with trailing "=" (standard base64 padding), setVapidDetails
  // throws "Vapid public key must be a URL safe Base 64 (without "=")".
  // Strip defensively so a malformed env doesn't take down the push chain.
  const pub = VAPID_PUBLIC_KEY.replace(/=+$/, '');
  const priv = VAPID_PRIVATE_KEY.replace(/=+$/, '');
  webpush.setVapidDetails(VAPID_SUBJECT, pub, priv);
  configured = true;
  return true;
}

interface StoredSubRecord {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  deviceLabel?: string;
  userAgent?: string;
  createdAt?: string;
  lastSeenAt?: string;
  lastSuccessAt?: string;
  lastError?: string;
  lastErrorAt?: string;
}

interface TestBody {
  endpoint: string;
}

export async function POST(req: NextRequest) {
  // Top-level try/catch so any unhandled throw (e.g. authorizeWithLimit's
  // upstream KV blowing up) surfaces as a structured error instead of an
  // opaque Next.js 500 with no body.
  try {
    const _auth = await authorizeWithLimit(req);
    if (!_auth.ok) {
      return NextResponse.json({ ok: false, code: 'auth-error', error: _auth.error }, { status: _auth.status });
    }
    if (!configureOnce()) {
      return NextResponse.json({ ok: false, code: 'no-vapid', error: 'VAPID keys not configured' }, { status: 503 });
    }
    if (!KV_AVAILABLE) {
      return NextResponse.json({ ok: false, code: 'no-kv', error: 'KV not available' }, { status: 503 });
    }

    let body: TestBody;
    try {
      body = (await req.json()) as TestBody;
    } catch {
      return NextResponse.json({ ok: false, code: 'bad-body', error: 'Invalid JSON' }, { status: 400 });
    }
    if (!body?.endpoint) {
      return NextResponse.json({ ok: false, code: 'no-endpoint', error: 'Missing endpoint' }, { status: 400 });
    }

    let recordJson: string | null = null;
    try {
      const stored = await kv.hget<string>(KEY, body.endpoint);
      recordJson = stored ?? null;
    } catch (err) {
      console.error('[devices/test] KV read failed:', err);
      const detail = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ ok: false, code: 'kv-error', error: 'Storage error', detail: detail.slice(0, 200) }, { status: 500 });
    }
    if (!recordJson) {
      return NextResponse.json({ ok: false, code: 'not-registered', error: 'Subscription not registered' }, { status: 404 });
    }

    let record: StoredSubRecord;
    try {
      record = typeof recordJson === 'string' ? (JSON.parse(recordJson) as StoredSubRecord) : (recordJson as StoredSubRecord);
    } catch {
      return NextResponse.json({ ok: false, code: 'malformed-record', error: 'Stored subscription is malformed' }, { status: 500 });
    }

    const payload = JSON.stringify({
      title: 'Test from Mama Hala Admin',
      body: 'If you see this, push notifications are working.',
      url: '/admin',
      tag: 'mh-test',
      data: { kind: 'test', badgeCount: 0 },
    });

    const nowIso = new Date().toISOString();

    try {
      await webpush.sendNotification({ endpoint: record.endpoint, keys: record.keys }, payload, { TTL: 60 });
      const updated: StoredSubRecord = { ...record, lastSuccessAt: nowIso, lastError: undefined, lastErrorAt: undefined };
      await kv.hset(KEY, { [record.endpoint]: JSON.stringify(updated) }).catch(() => null);
      return NextResponse.json({ ok: true, sent: 1 });
    } catch (err: unknown) {
      const statusCode = (err as { statusCode?: number }).statusCode;
      const message = err instanceof Error ? err.message : String(err);
      if (statusCode === 404 || statusCode === 410) {
        // Subscription is dead — prune and tell the caller so the UI can guide re-subscription.
        await kv.hdel(KEY, record.endpoint).catch(() => null);
        return NextResponse.json({ ok: false, code: 'expired', statusCode, error: 'Endpoint expired (pruned)', pruned: true }, { status: 410 });
      }
      const updated: StoredSubRecord = { ...record, lastError: message.slice(0, 200), lastErrorAt: nowIso };
      await kv.hset(KEY, { [record.endpoint]: JSON.stringify(updated) }).catch(() => null);
      return NextResponse.json({ ok: false, code: 'send-failed', statusCode, error: message, detail: message.slice(0, 200) }, { status: 502 });
    }
  } catch (err) {
    console.error('[devices/test] unhandled:', err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, code: 'internal', error: 'Internal error', detail: detail.slice(0, 200) }, { status: 500 });
  }
}
