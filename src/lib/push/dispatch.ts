/* ================================================================
   Web Push dispatcher for the Mama Hala admin surfaces.
   ================================================================
   Used by both the legacy /admin web UI and the iOS PWA
   (`mama-hala-admin-ios`). Both apps register subscriptions via
   POST /api/admin/devices/register and store them in Vercel KV
   under the hash key `admin:push-subscriptions`, keyed by endpoint
   URL (which dedupes re-subscriptions on the same device).

   Trigger points: Cal.com webhook, manual admin booking create,
   public /book/confirm, cancel/reschedule routes, Stripe webhook,
   payment-reminder cron, scheduled-invoices cron, etc. — all are
   fire-and-forget and never block the caller.

   Per-endpoint observability: each subscription record is stamped
   with `lastSuccessAt` / `lastError` / `lastErrorAt` after every
   send attempt so the /admin/devices diagnostic page can show
   what's reaching whom and what's failing.

   A capped log of the last 200 dispatches lives at KV list
   `admin:push-log` for the same diagnostic page.
   ================================================================ */

import { kv } from '@vercel/kv';
import webpush from 'web-push';

import { countPendingApprovalBookings } from '@/lib/booking/booking-store';

const KEY = 'admin:push-subscriptions';
const LOG_KEY = 'admin:push-log';
const LOG_CAP = 200;

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@mamahala.ca';
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

let configured = false;
/** Normalize a base64 string to RFC 4648 §5 URL-safe form *without* padding,
 *  which is what web-push's setVapidDetails() requires. Mirrors the helper
 *  in test/route.ts — see there for the full context on why this defensive
 *  scrubbing exists. */
function normalizeVapidKey(key: string): string {
  return key.trim().replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function configureOnce(): boolean {
  if (configured) return true;
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) return false;
  webpush.setVapidDetails(VAPID_SUBJECT, normalizeVapidKey(VAPID_PUBLIC_KEY), normalizeVapidKey(VAPID_PRIVATE_KEY));
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
  /** Free-form data forwarded to the SW push handler.
   *  If `badgeCount` is omitted, the dispatcher computes the current
   *  pending-approval count and threads it in automatically. */
  data?: Record<string, unknown>;
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

interface PerEndpointResult {
  /** Last 24 chars of the endpoint URL — enough to identify in logs without exposing the full FCM/APNs token. */
  endpointTail: string;
  status: 'ok' | 'pruned' | 'error';
  statusCode?: number;
}

interface LogEntry {
  ts: string;
  title: string;
  sent: number;
  pruned: number;
  perEndpoint: PerEndpointResult[];
}

/** Truncate an endpoint URL to its last 24 chars for log display.
 *  Full endpoints are sensitive (push tokens) — never log in full. */
function endpointTail(endpoint: string): string {
  return endpoint.length <= 24 ? endpoint : `…${endpoint.slice(-24)}`;
}

/** Compute the badge count to thread into the notification payload.
 *  Falls back to undefined on any KV failure (badge silently no-ops,
 *  preferred over crashing the dispatch). */
async function computeBadgeCount(): Promise<number | undefined> {
  try {
    const n = await countPendingApprovalBookings();
    return Number.isFinite(n) ? n : undefined;
  } catch {
    return undefined;
  }
}

/** Append a dispatch outcome to the capped KV log. Best-effort —
 *  if KV is unavailable or write fails, dispatch still succeeds. */
async function appendLog(entry: LogEntry): Promise<void> {
  try {
    await kv.lpush(LOG_KEY, JSON.stringify(entry));
    await kv.ltrim(LOG_KEY, 0, LOG_CAP - 1);
  } catch {
    // Diagnostic-only — never block dispatch on log failure.
  }
}

/** Fan out a notification to every registered admin device.
 *  Auto-prunes endpoints that return 404/410 (subscription expired).
 *  Stamps per-endpoint lastSuccessAt/lastError so /admin/devices
 *  can surface delivery health.
 *  Returns sent + pruned counts for callers that care; most call
 *  sites are fire-and-forget. */
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

  // Inject badgeCount only if the caller didn't already set one. This
  // lets specific call sites (e.g. test endpoint sending badge=0)
  // override without us clobbering their value.
  const callerData = (payload.data ?? {}) as Record<string, unknown>;
  if (callerData.badgeCount === undefined) {
    const badge = await computeBadgeCount();
    if (badge !== undefined) callerData.badgeCount = badge;
  }
  const enrichedPayload = { ...payload, data: callerData };
  const json = JSON.stringify(enrichedPayload);

  const nowIso = new Date().toISOString();
  let sent = 0;
  let pruned = 0;
  const perEndpoint: PerEndpointResult[] = [];

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
        perEndpoint.push({ endpointTail: endpointTail(endpoint), status: 'ok' });
        // Stamp success — last writer wins is acceptable for diagnostics.
        const updated: StoredSubRecord = { ...record, lastSuccessAt: nowIso, lastError: undefined, lastErrorAt: undefined };
        await kv.hset(KEY, { [endpoint]: JSON.stringify(updated) }).catch(() => null);
      } catch (err: unknown) {
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) {
          await kv.hdel(KEY, endpoint).catch(() => null);
          pruned++;
          perEndpoint.push({ endpointTail: endpointTail(endpoint), status: 'pruned', statusCode: status });
        } else {
          console.error('[push dispatch] send failed for', endpointTail(endpoint), err);
          perEndpoint.push({ endpointTail: endpointTail(endpoint), status: 'error', statusCode: status });
          const message = err instanceof Error ? err.message : String(err);
          const updated: StoredSubRecord = { ...record, lastError: message.slice(0, 200), lastErrorAt: nowIso };
          await kv.hset(KEY, { [endpoint]: JSON.stringify(updated) }).catch(() => null);
        }
      }
    }),
  );

  await appendLog({ ts: nowIso, title: payload.title, sent, pruned, perEndpoint });

  return { sent, pruned };
}
