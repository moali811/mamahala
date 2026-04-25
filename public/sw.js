/* Service Worker for the Mama Hala Admin PWA.
 *
 * IMPORTANT — scope: this SW is registered with `{ scope: '/admin' }`. The
 * Service-Worker-Allowed: /admin header (set in next.config.ts) lets us host
 * the SW at the root /sw.js while still scoping it to /admin only. The fetch
 * handler ALSO defensively checks the URL prefix so marketing pages (/en/*,
 * /ar/*, etc.) are never intercepted even if scope misbehaves.
 *
 * Strategies:
 *   - /admin HTML shell: network-first → cache fallback
 *   - /_next/static: cache-first (immutable hashed)
 *   - /admin-pwa-icons/*: cache-first
 *   - GET /api/admin/{booking,invoices,stats}/*: network-first (cache fallback
 *     only when offline). SWR was hiding fresh post-mutation data behind the
 *     cached response — admin data must reflect the result of the last action.
 *   - All POST/PATCH/DELETE: network-only; offline → synthetic 503
 *   - GET /api/admin/invoices/pdf/[id]: network-only with last-5 LRU cache
 *
 * Push:
 *   - On `push`: showNotification with deep-link URL (always under /admin)
 *   - On `notificationclick`: focus existing window or open /admin
 *   - On `pushsubscriptionchange`: re-subscribe + tell client to re-register
 */

const CACHE_VERSION = "admin-v2";
const SHELL_CACHE = `admin-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `admin-runtime-${CACHE_VERSION}`;
const PDF_CACHE = `admin-pdf-${CACHE_VERSION}`;
const PDF_CACHE_LIMIT = 5;

const SHELL_URLS = [
  "/admin",
  "/admin/events",
];

// ---------- install / activate ----------

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await Promise.allSettled(SHELL_URLS.map((u) => cache.add(u).catch(() => null)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((k) => ![SHELL_CACHE, RUNTIME_CACHE, PDF_CACHE].includes(k))
      // Only delete OUR own old caches; never touch other apps' caches.
      .filter((k) => k.startsWith("admin-"))
      .map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// ---------- fetch ----------

function isAdminScope(url) {
  return url.pathname.startsWith("/admin") || url.pathname.startsWith("/api/admin/");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // DEFENSIVE: only intercept admin-related URLs. Anything else (marketing
  // pages, public APIs) passes through to the network with no SW behavior.
  if (!isAdminScope(url)) return;

  // Cross-origin requests from /admin (rare) — let network handle.
  if (url.origin !== self.location.origin) return;

  if (req.method !== "GET") {
    event.respondWith(handleNonGet(req));
    return;
  }

  // App shell HTML
  if (req.mode === "navigate" || req.destination === "document") {
    event.respondWith(networkFirstHtml(req));
    return;
  }

  // Static assets — cache-first
  if (url.pathname.startsWith("/_next/static/") ||
      url.pathname.startsWith("/admin-pwa-icons/") ||
      url.pathname === "/admin/manifest.webmanifest") {
    event.respondWith(cacheFirst(req));
    return;
  }

  // Admin list endpoints — network-first so post-mutation refetches always
  // see the latest server state. Cache is only used as offline fallback.
  if (url.pathname === "/api/admin/booking/list" ||
      url.pathname === "/api/admin/invoices/list" ||
      url.pathname === "/api/admin/stats" ||
      url.pathname === "/api/admin/invoices/dashboard") {
    event.respondWith(networkFirstApi(req));
    return;
  }

  // Invoice PDFs — network-only with LRU for offline share
  if (url.pathname.startsWith("/api/admin/invoices/pdf/")) {
    event.respondWith(networkThenCachePdf(req));
    return;
  }

  // Default: network with cache fallback
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});

async function handleNonGet(req) {
  try {
    return await fetch(req);
  } catch {
    return new Response(
      JSON.stringify({ error: "offline", message: "Connect to the internet to perform this action." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
}

async function networkFirstHtml(req) {
  try {
    const res = await fetch(req);
    if (res.ok) {
      const cache = await caches.open(SHELL_CACHE);
      cache.put(req, res.clone()).catch(() => null);
    }
    return res;
  } catch {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    // Fall back to /admin (the home shell) so the app at least opens.
    const adminHome = await caches.match("/admin");
    return adminHome ?? new Response("Offline", { status: 503 });
  }
}

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(req, res.clone()).catch(() => null);
    }
    return res;
  } catch {
    return cached ?? new Response("", { status: 504 });
  }
}

async function networkFirstApi(req) {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone()).catch(() => null);
    return res;
  } catch {
    const cached = await cache.match(req);
    return cached ?? new Response(
      JSON.stringify({ error: "offline" }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }
}

async function networkThenCachePdf(req) {
  try {
    const res = await fetch(req);
    if (res.ok) {
      const cache = await caches.open(PDF_CACHE);
      cache.put(req, res.clone()).catch(() => null);
      const keys = await cache.keys();
      if (keys.length > PDF_CACHE_LIMIT) {
        await cache.delete(keys[0]);
      }
    }
    return res;
  } catch {
    const cached = await caches.match(req);
    return cached ?? new Response("PDF unavailable offline", { status: 503 });
  }
}

// ---------- push ----------

self.addEventListener("push", (event) => {
  if (!event.data) return;
  let payload;
  try { payload = event.data.json(); }
  catch { payload = { title: "Mama Hala Admin", body: event.data.text() }; }

  const { title = "Mama Hala Admin", body = "", url, tag = "mh-admin", data = {} } = payload;
  // SAFETY: payload `url` may originate from server but ensure deep-link stays
  // inside /admin (defense vs malformed/malicious payloads opening other paths).
  const safeUrl = (typeof url === "string" && url.startsWith("/admin")) ? url
    : (typeof url === "string" && url.startsWith("/bookings")) ? `/admin?tab=bookings&deep=${encodeURIComponent(url)}`
    : "/admin";

  event.waitUntil((async () => {
    await self.registration.showNotification(title, {
      body,
      icon: "/admin-pwa-icons/icon-192.png",
      badge: "/admin-pwa-icons/icon-192.png",
      tag,
      data: { url: safeUrl, ...data },
      requireInteraction: false,
      silent: false,
    });

    // iOS 16.4+ app-icon badge
    if ("setAppBadge" in self.navigator) {
      try {
        const current = (data && typeof data.badgeCount === "number") ? data.badgeCount : undefined;
        if (typeof current === "number") {
          await self.navigator.setAppBadge(current);
        }
      } catch { /* no-op */ }
    }
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data?.url || "/admin";

  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of all) {
      if (client.url.includes("/admin")) {
        client.focus();
        client.postMessage({ kind: "navigate", url: target });
        return;
      }
    }
    await self.clients.openWindow(target);
  })());
});

self.addEventListener("pushsubscriptionchange", (event) => {
  event.waitUntil((async () => {
    try {
      const newSub = await self.registration.pushManager.subscribe(event.oldSubscription?.options);
      const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of all) {
        client.postMessage({ kind: "push-resubscribe", subscription: newSub.toJSON() });
      }
    } catch (err) {
      console.error("[admin-sw] pushsubscriptionchange failed:", err);
    }
  })());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
