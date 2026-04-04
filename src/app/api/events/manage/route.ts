import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

function authorize(request: NextRequest): boolean {
  const auth = request.headers.get('authorization');
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

// GET: List all KV-managed events + registrations summary
export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!KV_AVAILABLE) {
    return NextResponse.json({ events: [], message: 'KV not configured' });
  }

  try {
    // Get all custom events from KV
    const customEvents = await kv.lrange('admin:events', 0, -1) || [];
    const parsedEvents = customEvents.map((e: string | object) =>
      typeof e === 'string' ? JSON.parse(e) : e,
    );

    // Get hidden static event slugs
    let hiddenSlugs: string[] = [];
    try {
      const rawHidden = await kv.get('cms:hidden:events');
      if (rawHidden && Array.isArray(rawHidden)) hiddenSlugs = rawHidden;
    } catch { /* ignore */ }
    const hiddenSet = new Set(hiddenSlugs);

    // For each event (including static ones), get registration stats
    const { getUpcomingEvents, getPastEvents } = await import('@/data/events');
    const allStaticEvents = [...getUpcomingEvents(), ...getPastEvents()].filter(e => !hiddenSet.has(e.slug));

    // Get all overrides
    const allSlugs = [...allStaticEvents, ...parsedEvents].map((e: any) => e.slug);
    const overrideEntries = await Promise.all(
      allSlugs.map(async (slug: string) => {
        const ov = await kv.get(`event:${slug}:overrides`).catch(() => null);
        return [slug, ov] as [string, Record<string, unknown> | null];
      }),
    );
    const overridesMap = Object.fromEntries(overrideEntries.filter(([, v]) => v != null));

    const eventStats = await Promise.all(
      [...allStaticEvents, ...parsedEvents].map(async (event: any) => {
        const slug = event.slug;
        // Apply overrides for display
        const ov = overridesMap[slug];
        const merged = ov ? { ...event, ...ov } : event;
        const [regCount, waitlistCount, spots, pulseCount, pulseEmails] = await Promise.all([
          kv.llen(`event:${slug}:registrations`).catch(() => 0),
          kv.llen(`event:${slug}:waitlist`).catch(() => 0),
          kv.get(`event:${slug}:spots`).catch(() => null),
          kv.get(`pulse:${slug}:count`).catch(() => 0),
          kv.scard(`pulse:${slug}:emails`).catch(() => 0),
        ]);

        return {
          slug,
          titleEn: merged.titleEn,
          titleAr: merged.titleAr || '',
          descriptionEn: merged.descriptionEn || '',
          descriptionAr: merged.descriptionAr || '',
          date: merged.date,
          dateTBD: merged.dateTBD ?? true,
          startTime: merged.startTime || '',
          endTime: merged.endTime || '',
          type: merged.type,
          locationType: merged.locationType || 'online',
          locationNameEn: merged.locationNameEn || '',
          registrationType: merged.registrationType,
          capacity: merged.capacity,
          isFree: merged.isFree ?? true,
          priceCAD: merged.priceCAD || 0,
          image: merged.image || '',
          registeredCount: regCount || 0,
          waitlistedCount: waitlistCount || 0,
          spotsRemaining: spots ?? merged.spotsRemaining ?? null,
          registrationStatus: merged.registrationStatus,
          pulseCount: pulseCount || 0,
          pulseEmails: pulseEmails || 0,
          source: parsedEvents.find((e: any) => e.slug === slug) ? 'kv' : 'static',
          hasOverrides: !!ov,
        };
      }),
    );

    return NextResponse.json({
      events: eventStats,
      customEvents: parsedEvents,
    });
  } catch (err) {
    console.error('Admin events error:', err);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST: Create a new event in KV
export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!KV_AVAILABLE) {
    return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
  }

  try {
    const event = await request.json();

    // Validate required fields
    if (!event.slug || !event.titleEn || !event.date) {
      return NextResponse.json({ error: 'Missing required fields: slug, titleEn, date' }, { status: 400 });
    }

    // Store in KV list
    await kv.lpush('admin:events', JSON.stringify({
      ...event,
      createdAt: new Date().toISOString(),
    }));

    // Init spots counter if capacity is set
    if (event.capacity && event.spotsRemaining) {
      await kv.set(`event:${event.slug}:spots`, event.spotsRemaining);
    }

    return NextResponse.json({ success: true, slug: event.slug });
  } catch (err) {
    console.error('Create event error:', err);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

// PATCH: Update overrides for a static or custom event
export async function PATCH(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!KV_AVAILABLE) {
    return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
  }

  try {
    const { slug, overrides, pulseOverride } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    // Handle direct pulse count override
    if (pulseOverride !== undefined && typeof pulseOverride === 'number') {
      await kv.set(`pulse:${slug}:count`, pulseOverride);
    }

    // Handle spots override directly in KV (separate from event overrides)
    if (overrides?.spotsRemaining !== undefined) {
      await kv.set(`event:${slug}:spots`, overrides.spotsRemaining);
    }

    if (!overrides || typeof overrides !== 'object' || Object.keys(overrides).length === 0) {
      // Only pulse override, no event overrides
      if (pulseOverride !== undefined) {
        return NextResponse.json({ success: true, slug, pulseCount: pulseOverride });
      }
      return NextResponse.json({ error: 'Missing overrides object' }, { status: 400 });
    }

    // Don't allow overriding the slug itself
    delete overrides.slug;

    // Get existing overrides and merge
    const existing = (await kv.get(`event:${slug}:overrides`)) as Record<string, unknown> | null;
    const merged = { ...(existing || {}), ...overrides };

    await kv.set(`event:${slug}:overrides`, merged);

    return NextResponse.json({ success: true, slug, overrides: merged });
  } catch (err) {
    console.error('Patch event error:', err);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

// DELETE: Remove an event (KV events are removed, static events are hidden)
export async function DELETE(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!KV_AVAILABLE) {
    return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
  }

  const slug = request.nextUrl.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  try {
    // Check if it's a KV (custom) event
    const events = await kv.lrange('admin:events', 0, -1) || [];
    const isKVEvent = events.some((e: string | object) => {
      const parsed = typeof e === 'string' ? JSON.parse(e) : e;
      return parsed.slug === slug;
    });

    if (isKVEvent) {
      // Remove from KV list
      const filtered = events.filter((e: string | object) => {
        const parsed = typeof e === 'string' ? JSON.parse(e) : e;
        return parsed.slug !== slug;
      });
      await kv.del('admin:events');
      if (filtered.length > 0) {
        for (const e of filtered.reverse()) {
          await kv.lpush('admin:events', typeof e === 'string' ? e : JSON.stringify(e));
        }
      }
    } else {
      // Static event — add to hidden list
      const rawHidden = await kv.get('cms:hidden:events');
      const hidden: string[] = rawHidden && Array.isArray(rawHidden) ? rawHidden : [];
      if (!hidden.includes(slug)) {
        hidden.push(slug);
        await kv.set('cms:hidden:events', hidden);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete event error:', err);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
