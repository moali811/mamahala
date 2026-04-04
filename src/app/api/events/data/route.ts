import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { events as staticEvents } from '@/data/events';
import { mergeEventOverrides } from '@/lib/event-merge';
import type { SmartEvent } from '@/types';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

/**
 * GET /api/events/data
 * Public endpoint: returns all events with KV overrides applied.
 * Used by the events page to render lifecycle-aware content.
 */
export async function GET() {
  try {
    if (!KV_AVAILABLE) {
      // No KV — return static events as-is
      return NextResponse.json({ events: staticEvents });
    }

    // Get hidden slugs
    let hiddenSlugs: string[] = [];
    try {
      const raw = await kv.get('cms:hidden:events');
      if (raw && Array.isArray(raw)) hiddenSlugs = raw;
    } catch { /* ignore */ }
    const hiddenSet = new Set(hiddenSlugs);

    // Get custom KV events
    let kvCustomEvents: SmartEvent[] = [];
    try {
      const raw = await kv.lrange('admin:events', 0, -1);
      kvCustomEvents = (raw || []).map((e: string | object) =>
        typeof e === 'string' ? JSON.parse(e) : e,
      );
    } catch { /* ignore */ }

    // Get overrides for static events
    const visibleStatic = staticEvents.filter((e) => !hiddenSet.has(e.slug));
    const overrideResults = await Promise.all(
      visibleStatic.map(async (e) => {
        const ov = await kv.get(`event:${e.slug}:overrides`).catch(() => null);
        return { slug: e.slug, overrides: ov as Partial<SmartEvent> | null };
      }),
    );

    const mergedEvents = visibleStatic.map((event) => {
      const entry = overrideResults.find((o) => o.slug === event.slug);
      return mergeEventOverrides(event, entry?.overrides);
    });

    return NextResponse.json({
      events: [...mergedEvents, ...kvCustomEvents],
    });
  } catch (err) {
    console.error('Events data error:', err);
    // Fallback to static
    return NextResponse.json({ events: staticEvents });
  }
}
