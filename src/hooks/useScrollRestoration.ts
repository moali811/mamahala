"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll restoration that respects forward vs back navigation.
 *
 * - On a forward navigation (push), scroll to top.
 * - On a back/forward (pop) navigation, restore the saved scrollY for that key.
 * - On unload / route change away, save the current scrollY for the current key.
 *
 * Storage key is `pathname` + `keyExtra` (caller-controlled). We read
 * `window.location.search` at effect time without subscribing via
 * useSearchParams to avoid forcing a Suspense boundary at the shell level.
 * Pages that need search-aware keys can pass `keyExtra` from their own
 * useSearchParams subscription.
 *
 * This hook is meant to be mounted ONCE at the app shell level.
 */

const STORAGE_KEY_PREFIX = "mh:scroll:";
const NAV_TYPE_KEY = "mh:scroll:nav";

function storageKey(path: string, search: string): string {
  return `${STORAGE_KEY_PREFIX}${path}::${search}`;
}

export function useScrollRestoration(opts: { keyExtra?: string } = {}) {
  const pathname = usePathname();
  const liveSearch = typeof window === "undefined" ? "" : window.location.search;
  const searchKey = `${liveSearch}${opts.keyExtra ? `::${opts.keyExtra}` : ""}`;
  const lastKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable browser's own scroll restoration so we own it consistently.
    if ("scrollRestoration" in history) {
      try { history.scrollRestoration = "manual"; } catch { /* noop */ }
    }

    // Track nav direction. We listen for popstate to know we just came back.
    const onPop = () => sessionStorage.setItem(NAV_TYPE_KEY, "pop");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = storageKey(pathname, searchKey);
    const prevKey = lastKeyRef.current;
    lastKeyRef.current = key;

    // Save the previous route's scrollY before we overwrite anything.
    if (prevKey && prevKey !== key) {
      try { sessionStorage.setItem(prevKey, String(window.scrollY)); } catch { /* noop */ }
    }

    // First mount in this session — there's no nav direction signal yet, so
    // do nothing (whatever scrollY the page boots into stays).
    if (prevKey === null) return;

    const navType = sessionStorage.getItem(NAV_TYPE_KEY);
    sessionStorage.removeItem(NAV_TYPE_KEY);

    if (navType === "pop") {
      const saved = sessionStorage.getItem(key);
      const y = saved ? Number(saved) : 0;
      // Wait one frame so the new route's content has at least started
      // mounting — restoring 0 → big-Y on an empty page just snaps to bottom.
      requestAnimationFrame(() => {
        const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        window.scrollTo({ top: Math.min(y, max), behavior: "auto" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, searchKey]);

  // Save scrollY on tab close / refresh.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPersist = () => {
      const key = storageKey(pathname, searchKey);
      try { sessionStorage.setItem(key, String(window.scrollY)); } catch { /* noop */ }
    };
    window.addEventListener("pagehide", onPersist);
    return () => window.removeEventListener("pagehide", onPersist);
  }, [pathname, searchKey]);
}
