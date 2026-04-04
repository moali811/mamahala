import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { generateDateAnnouncementEmail } from '@/lib/email/event-notify';
import { mergeEventOverrides } from '@/lib/event-merge';
import { events as staticEvents } from '@/data/events';
import type { SmartEvent } from '@/types';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

/**
 * POST /api/events/notify-date
 * Sends date announcement emails to all "Notify Me" subscribers for an event.
 * Admin-only endpoint.
 *
 * Body: { slug: string }
 */
export async function POST(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!KV_AVAILABLE) {
    return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
  }

  try {
    const { slug } = await request.json();
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    // Check if already notified
    const alreadyNotified = await kv.get(`pulse:${slug}:date-notified`);
    if (alreadyNotified) {
      return NextResponse.json({ error: 'Date notification already sent for this event', alreadySent: true }, { status: 400 });
    }

    // Get event with overrides
    const staticEvent = staticEvents.find((e) => e.slug === slug);
    if (!staticEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    const overrides = await kv.get(`event:${slug}:overrides`) as Partial<SmartEvent> | null;
    const event = mergeEventOverrides(staticEvent, overrides);

    // Verify event has a confirmed date
    if (event.dateTBD) {
      return NextResponse.json({ error: 'Event date is still TBD — set a date first' }, { status: 400 });
    }

    // Get all notify-me emails
    const emails = await kv.smembers(`pulse:${slug}:emails`);
    if (!emails || emails.length === 0) {
      return NextResponse.json({ success: true, sent: 0, message: 'No subscribers to notify' });
    }

    // Send emails via Resend
    let sentCount = 0;
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Send to each subscriber (batch for efficiency)
      const emailPromises = (emails as string[]).map(async (email) => {
        try {
          // Send English version (could detect preference later)
          const html = generateDateAnnouncementEmail(event, 'en');
          await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Mama Hala <events@mamahala.ca>',
            to: email,
            subject: `📅 Date Confirmed: ${event.titleEn}`,
            html,
          });
          sentCount++;
        } catch (err) {
          console.error(`Failed to send to ${email}:`, err);
        }
      });

      await Promise.all(emailPromises);
    } catch (err) {
      console.error('Resend initialization error:', err);
      // Mark as notified even if email fails to prevent retry spam
    }

    // Mark as notified
    await kv.set(`pulse:${slug}:date-notified`, true);

    return NextResponse.json({
      success: true,
      sent: sentCount,
      total: emails.length,
    });
  } catch (err) {
    console.error('Notify date error:', err);
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}
