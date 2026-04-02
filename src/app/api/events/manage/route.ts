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

    const eventStats = await Promise.all(
      [...allStaticEvents, ...parsedEvents].map(async (event: any) => {
        const slug = event.slug;
        const [regCount, waitlistCount, spots] = await Promise.all([
          kv.llen(`event:${slug}:registrations`).catch(() => 0),
          kv.llen(`event:${slug}:waitlist`).catch(() => 0),
          kv.get(`event:${slug}:spots`).catch(() => null),
        ]);

        return {
          slug,
          titleEn: event.titleEn,
          titleAr: event.titleAr || '',
          descriptionEn: event.descriptionEn || '',
          descriptionAr: event.descriptionAr || '',
          date: event.date,
          startTime: event.startTime || '',
          endTime: event.endTime || '',
          type: event.type,
          locationType: event.locationType || 'online',
          locationNameEn: event.locationNameEn || '',
          registrationType: event.registrationType,
          capacity: event.capacity,
          isFree: event.isFree ?? true,
          priceCAD: event.priceCAD || 0,
          image: event.image || '',
          registeredCount: regCount || 0,
          waitlistedCount: waitlistCount || 0,
          spotsRemaining: spots ?? event.spotsRemaining ?? null,
          registrationStatus: event.registrationStatus,
          source: parsedEvents.find((e: any) => e.slug === slug) ? 'kv' : 'static',
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
