import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { generateEventReminderEmail } from '@/lib/email/event-notify';
import { mergeEventOverrides } from '@/lib/event-merge';
import { events as staticEvents } from '@/data/events';
import type { SmartEvent } from '@/types';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

interface Registration {
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * GET /api/events/remind
 * Cron-triggered: sends reminder emails 24h before events.
 * Checks all events with dates tomorrow, sends to registered attendees.
 * Idempotent via KV flag.
 */
export async function GET() {
  if (!KV_AVAILABLE) {
    return NextResponse.json({ message: 'KV not configured, skipping' });
  }

  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Find events happening tomorrow
    const tomorrowEvents: SmartEvent[] = [];
    for (const event of staticEvents) {
      const overrides = await kv.get(`event:${event.slug}:overrides`) as Partial<SmartEvent> | null;
      const merged = mergeEventOverrides(event, overrides);
      if (merged.date === tomorrowStr && !merged.dateTBD) {
        tomorrowEvents.push(merged);
      }
    }

    if (tomorrowEvents.length === 0) {
      return NextResponse.json({ message: 'No events tomorrow', sent: 0 });
    }

    let totalSent = 0;

    for (const event of tomorrowEvents) {
      // Check if reminder already sent
      const alreadySent = await kv.get(`remind:${event.slug}:sent`);
      if (alreadySent) continue;

      // Get registrations
      const registrations = await kv.lrange(`event:${event.slug}:registrations`, 0, -1) as (string | Registration)[];
      if (!registrations || registrations.length === 0) continue;

      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        for (const raw of registrations) {
          const reg: Registration = typeof raw === 'string' ? JSON.parse(raw) : raw;
          try {
            const html = generateEventReminderEmail(event, reg.firstName, 'en');
            await resend.emails.send({
              from: process.env.EMAIL_FROM || 'Mama Hala <events@mamahala.ca>',
              to: reg.email,
              subject: `⏰ Tomorrow: ${event.titleEn}`,
              html,
            });
            totalSent++;
          } catch (err) {
            console.error(`Reminder failed for ${reg.email}:`, err);
          }
        }
      } catch (err) {
        console.error('Resend init error:', err);
      }

      // Mark as sent
      await kv.set(`remind:${event.slug}:sent`, true);
    }

    return NextResponse.json({
      success: true,
      eventsChecked: tomorrowEvents.length,
      sent: totalSent,
    });
  } catch (err) {
    console.error('Reminder cron error:', err);
    return NextResponse.json({ error: 'Reminder failed' }, { status: 500 });
  }
}
