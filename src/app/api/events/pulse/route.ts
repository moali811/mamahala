import { NextResponse } from 'next/server';

const hasKV = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// GET /api/events/pulse?slugs=slug1,slug2,...
// Returns pulse counts for given event slugs
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slugsParam = searchParams.get('slugs');

  if (!slugsParam) {
    return NextResponse.json({ error: 'Missing slugs parameter' }, { status: 400 });
  }

  const slugs = slugsParam.split(',').filter(Boolean);
  const counts: Record<string, number> = {};

  if (hasKV) {
    try {
      const { kv } = await import('@vercel/kv');
      const keys = slugs.map((s) => `pulse:${s}:count`);
      const values = await kv.mget<(number | null)[]>(...keys);
      slugs.forEach((slug, i) => {
        counts[slug] = values[i] ?? 0;
      });
    } catch {
      slugs.forEach((s) => { counts[s] = 0; });
    }
  } else {
    slugs.forEach((s) => { counts[s] = 0; });
  }

  return NextResponse.json({ counts });
}

// POST /api/events/pulse
// { slug: string, action: 'resonate' } — increments count
// { slug: string, action: 'notify', email: string } — adds email for notification
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, action, email } = body;

    if (!slug || !action) {
      return NextResponse.json({ error: 'Missing slug or action' }, { status: 400 });
    }

    if (action === 'resonate') {
      let count = 1;
      if (hasKV) {
        const { kv } = await import('@vercel/kv');
        count = await kv.incr(`pulse:${slug}:count`);

        // Check threshold — notify admin at key milestones
        const thresholds = [25, 50, 100];
        if (thresholds.includes(count)) {
          const alreadyNotified = await kv.get(`pulse:${slug}:admin-notified:${count}`);
          if (!alreadyNotified) {
            await kv.set(`pulse:${slug}:admin-notified:${count}`, true);
            // Fire-and-forget admin notification
            notifyAdminThreshold(slug, count).catch(() => {});
          }
        }
      }
      return NextResponse.json({ success: true, count });
    }

    if (action === 'notify' && email) {
      if (!email.includes('@')) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
      }
      if (hasKV) {
        const { kv } = await import('@vercel/kv');
        await kv.sadd(`pulse:${slug}:emails`, email.toLowerCase().trim());
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/** Fire-and-forget admin notification when pulse hits threshold */
async function notifyAdminThreshold(slug: string, count: number) {
  try {
    const { events } = await import('@/data/events');
    const event = events.find((e) => e.slug === slug);
    if (!event) return;

    const { generatePulseThresholdEmail } = await import('@/lib/email/event-notify');
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Mama Hala <events@mamahala.ca>',
      to: process.env.ADMIN_EMAIL || 'admin@mamahala.ca',
      subject: `🔥 "${event.titleEn}" hit ${count} votes — time to schedule?`,
      html: generatePulseThresholdEmail(event, count),
    });
  } catch (err) {
    console.error('Admin threshold notification failed:', err);
  }
}
