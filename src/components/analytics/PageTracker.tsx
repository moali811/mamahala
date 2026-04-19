'use client';

import { useEffect } from 'react';

/**
 * Lightweight page view tracker.
 * Fires once per session per page (deduped via sessionStorage).
 * Renders nothing — drop it anywhere in a page component.
 */
export default function PageTracker({
  type,
  source,
  locale,
}: {
  type: string;
  source: string;
  locale: string;
}) {
  useEffect(() => {
    // Skip tracking for admin users (Mo & Dr. Hala)
    try { if (localStorage.getItem('mh_admin_key')) return; } catch {}

    const key = `tracked:${type}:${source}`;
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(key)) return;

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, source, locale }),
    }).catch(() => {}); // Non-blocking

    try { sessionStorage.setItem(key, '1'); } catch {}
  }, [type, source, locale]);

  return null;
}
