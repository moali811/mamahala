/* ================================================================
   GET /api/admin/devices
   ================================================================
   Returns the registered admin push subscriptions plus the recent
   dispatch log, for the /admin/devices diagnostic page.

   Storage:
     - subscriptions: KV hash `admin:push-subscriptions` (keyed by endpoint)
     - log: KV list `admin:push-log` (capped to 200 newest entries)

   Auth: Bearer (same as every other /api/admin route).

   Endpoint URLs are sensitive (FCM/APNs tokens) — they are returned
   only to the authenticated client; never logged server-side here.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { authorizeWithLimit } from '@/lib/invoicing/auth';

export const dynamic = 'force-dynamic';

const KEY = 'admin:push-subscriptions';
const LOG_KEY = 'admin:push-log';
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

interface DeviceRecord {
  endpoint: string;
  keys?: { p256dh: string; auth: string };
  deviceLabel?: string;
  userAgent?: string;
  createdAt?: string;
  lastSeenAt?: string;
  lastSuccessAt?: string;
  lastError?: string;
  lastErrorAt?: string;
}

interface LogEntry {
  ts: string;
  title: string;
  sent: number;
  pruned: number;
  perEndpoint: Array<{ endpointTail: string; status: string; statusCode?: number }>;
}

export async function GET(req: NextRequest) {
  const _auth = await authorizeWithLimit(req);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }
  if (!KV_AVAILABLE) {
    return NextResponse.json({ devices: [], log: [], kv: false });
  }

  let devices: DeviceRecord[] = [];
  let log: LogEntry[] = [];

  try {
    const all = (await kv.hgetall<Record<string, string>>(KEY)) ?? {};
    devices = Object.values(all)
      .map(value => {
        try {
          return typeof value === 'string' ? (JSON.parse(value) as DeviceRecord) : (value as DeviceRecord);
        } catch {
          return null;
        }
      })
      .filter((d): d is DeviceRecord => d !== null)
      .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
  } catch (err) {
    console.error('[devices GET] failed to read subscriptions:', err);
  }

  try {
    const raw = (await kv.lrange<string>(LOG_KEY, 0, 49)) ?? [];
    log = raw
      .map(entry => {
        try {
          return typeof entry === 'string' ? (JSON.parse(entry) as LogEntry) : (entry as LogEntry);
        } catch {
          return null;
        }
      })
      .filter((l): l is LogEntry => l !== null);
  } catch (err) {
    console.error('[devices GET] failed to read log:', err);
  }

  return NextResponse.json({ devices, log });
}
