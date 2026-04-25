/* ================================================================
   Web Push dispatcher for the iPhone admin PWA.
   ================================================================
   Used by the iOS PWA (`mama-hala-admin-ios`). Subscriptions are
   registered via POST /api/admin/devices/register and stored in
   Vercel KV under the hash key `admin:push-subscriptions`, keyed by
   endpoint URL (which dedupes re-subscriptions on the same device).

   Trigger points:
   - Cal.com webhook (BOOKING_CREATED)
   - Manual admin booking create
   - Public /book/confirm

   This is best-effort and fire-and-forget — never blocks the caller.
   ================================================================ */

import { kv } from '@vercel/kv';
import webpush from 'web-push';

const KEY = 'admin:push-subscriptions';

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@mamahala.ca';
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

let configured = false;
function configureOnce(): boolean {
  if (configured) return true;
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) return false;
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  configured = true;
  return true;
}

export interface AdminPushPayload {
  title: string;
  body: string;
  /** Deep-link target — the SW navigates here on tap. */
  url?: string;
  /** Tag to coalesce iOS notifications. */
  tag?: string;
  /** Free-form data forwarded to the SW push handler. */
  data?: Record<string, unknown>;
}

interface StoredSubRecord {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  deviceLabel?: string;
  userAgent?: string;
  createdAt?: string;
  lastSeenAt?: string;
}

/** Fan out a notification to every registered admin device.
 *  Auto-prunes endpoints that return 404/410 (subscription expired). */
export async function dispatchToAllAdmins(payload: AdminPushPayload): Promise<{ sent: number; pruned: number }> {
  if (!configureOnce()) {
    console.warn('[push dispatch] VAPID keys missing — skipping');
    return { sent: 0, pruned: 0 };
  }
  if (!KV_AVAILABLE) {
    return { sent: 0, pruned: 0 };
  }

  let all: Record<string, string> = {};
  try {
    all = (await kv.hgetall<Record<string, string>>(KEY)) ?? {};
  } catch (err) {
    console.error('[push dispatch] failed to read subscriptions:', err);
    return { sent: 0, pruned: 0 };
  }

  let sent = 0;
  let pruned = 0;
  const json = JSON.stringify(payload);

  await Promise.all(
    Object.entries(all).map(async ([endpoint, recordJson]) => {
      let record: StoredSubRecord;
      try {
        record = typeof recordJson === 'string' ? JSON.parse(recordJson) : (recordJson as StoredSubRecord);
      } catch {
        return;
      }
      const sub = { endpoint: record.endpoint, keys: record.keys };
      try {
        await webpush.sendNotification(sub, json, { TTL: 60 * 60 });
        sent++;
      } catch (err: unknown) {
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) {
          await kv.hdel(KEY, endpoint).catch(() => null);
          pruned++;
        } else {
          console.error('[push dispatch] send failed for', endpoint, err);
        }
      }
    }),
  );

  return { sent, pruned };
}
