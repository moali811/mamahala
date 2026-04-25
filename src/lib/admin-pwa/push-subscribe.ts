/* Web Push subscription helper used by the admin PWA settings toggle.
 * Calls /api/admin/devices/register on success.
 *
 * iOS quirk: Notification.requestPermission() silently no-ops in plain
 * Safari — the user MUST add to Home Screen first. Settings UI must check
 * isStandalone() and surface the install hint instead of just toggling. */

import { isStandalone, supportsPush } from "./pwa";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";

function urlBase64ToArrayBuffer(base64String: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const buf = new ArrayBuffer(raw.length);
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return buf;
}

export type PushSubscribeError =
  | "unsupported"
  | "not-installed"
  | "permission-denied"
  | "no-vapid"
  | "subscribe-failed"
  | "register-failed";

export interface PushSubscribeResult {
  ok: boolean;
  error?: PushSubscribeError;
  subscription?: PushSubscription;
}

async function registerOnServer(sub: PushSubscriptionJSON, bearer: string): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/devices/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${bearer}` },
      body: JSON.stringify({
        subscription: sub,
        deviceLabel: typeof navigator !== "undefined" && /iPhone|iPad/.test(navigator.userAgent) ? "iPhone" : "Browser",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function unregisterOnServer(endpoint: string, bearer: string): Promise<void> {
  try {
    await fetch("/api/admin/devices/register", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${bearer}` },
      body: JSON.stringify({ endpoint }),
    });
  } catch { /* swallow */ }
}

export async function subscribeToPush(bearer: string): Promise<PushSubscribeResult> {
  if (!supportsPush()) return { ok: false, error: "unsupported" };
  if (!isStandalone()) return { ok: false, error: "not-installed" };
  if (!VAPID_PUBLIC_KEY) return { ok: false, error: "no-vapid" };

  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();

  if (!sub) {
    const perm = await Notification.requestPermission();
    if (perm !== "granted") return { ok: false, error: "permission-denied" };
    try {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToArrayBuffer(VAPID_PUBLIC_KEY),
      });
    } catch (err) {
      console.error("[admin-pwa push] subscribe failed:", err);
      return { ok: false, error: "subscribe-failed" };
    }
  }

  const registered = await registerOnServer(sub.toJSON(), bearer);
  if (!registered) return { ok: false, error: "register-failed", subscription: sub };
  return { ok: true, subscription: sub };
}

export async function unsubscribeFromPush(bearer: string): Promise<boolean> {
  if (!supportsPush()) return false;
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return true;
  try {
    await unregisterOnServer(sub.endpoint, bearer);
  } finally {
    await sub.unsubscribe();
  }
  return true;
}

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  if (!supportsPush()) return null;
  const reg = await navigator.serviceWorker.ready;
  return reg.pushManager.getSubscription();
}

/* Make sure a locally-known PushManager subscription is also registered on
 * the server. This heals the orphan case where the browser kept a sub from
 * an earlier session but the server never recorded it (e.g. an interrupted
 * subscribe, or a sub created before VAPID env was wired). The register
 * endpoint is idempotent — keyed by endpoint URL — so re-posting an existing
 * sub is a safe no-op for healthy installs. */
export async function ensureServerRegistered(bearer: string): Promise<PushSubscription | null> {
  const sub = await getCurrentPushSubscription();
  if (!sub) return null;
  await registerOnServer(sub.toJSON(), bearer).catch(() => false);
  return sub;
}
