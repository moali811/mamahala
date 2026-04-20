import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { mergeEventOverrides } from '@/lib/event-merge';
import { events as staticEvents } from '@/data/events';
import { getServiceBySlug } from '@/data/services';
import type { SmartEvent } from '@/types';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

interface Registration {
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * GET /api/events/follow-up
 * Cron-triggered: sends follow-up emails 48h after event completion.
 * Links attendees to related 1:1 services.
 * Idempotent via KV flag.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!KV_AVAILABLE) {
    return NextResponse.json({ message: 'KV not configured, skipping' });
  }

  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const targetDate = twoDaysAgo.toISOString().split('T')[0];

    // Find events that ended 2 days ago
    const followUpEvents: SmartEvent[] = [];
    for (const event of staticEvents) {
      const overrides = await kv.get(`event:${event.slug}:overrides`) as Partial<SmartEvent> | null;
      const merged = mergeEventOverrides(event, overrides);
      if (merged.date === targetDate && !merged.dateTBD) {
        followUpEvents.push(merged);
      }
    }

    if (followUpEvents.length === 0) {
      return NextResponse.json({ message: 'No events to follow up on', sent: 0 });
    }

    let totalSent = 0;

    for (const event of followUpEvents) {
      // Check if follow-up already sent
      const alreadySent = await kv.get(`nurture:${event.slug}:followup-sent`);
      if (alreadySent) continue;

      // Get registrations
      const registrations = await kv.lrange(`event:${event.slug}:registrations`, 0, -1) as (string | Registration)[];
      if (!registrations || registrations.length === 0) continue;

      const relatedService = event.relatedServiceSlug ? getServiceBySlug(event.relatedServiceSlug) : undefined;
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamahala.ca';

      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        for (const raw of registrations) {
          const reg: Registration = typeof raw === 'string' ? JSON.parse(raw) : raw;
          try {
            const html = generateFollowUpEmail(event, reg.firstName, relatedService, siteUrl);
            await resend.emails.send({
              from: process.env.EMAIL_FROM || 'Mama Hala <events@mamahala.ca>',
              to: reg.email,
              subject: `Thank you for attending "${event.titleEn}" 💛`,
              html,
            });
            totalSent++;
          } catch (err) {
            console.error(`Follow-up failed for ${reg.email}:`, err);
          }
        }
      } catch (err) {
        console.error('Resend init error:', err);
      }

      // Mark as sent
      await kv.set(`nurture:${event.slug}:followup-sent`, true);
    }

    return NextResponse.json({
      success: true,
      eventsChecked: followUpEvents.length,
      sent: totalSent,
    });
  } catch (err) {
    console.error('Follow-up cron error:', err);
    return NextResponse.json({ error: 'Follow-up failed' }, { status: 500 });
  }
}

function generateFollowUpEmail(
  event: SmartEvent,
  firstName: string,
  relatedService: { name: string; nameAr: string; category: string; slug: string } | undefined,
  siteUrl: string,
): string {
  const title = event.titleEn;
  const bookingUrl = `${siteUrl}/en/book?utm_source=event&utm_medium=email&utm_campaign=${event.slug}-followup`;
  const serviceUrl = relatedService
    ? `${siteUrl}/en/services/${relatedService.category}/${relatedService.slug}?utm_source=event&utm_medium=email&utm_campaign=${event.slug}-followup`
    : null;

  return emailWrapper(`
    <div style="${emailStyles.card};text-align:center;">
      <h1 style="${emailStyles.heading}">Thank You, ${firstName}!</h1>
      <p style="${emailStyles.text}">
        We hope you enjoyed "${title}" and found it valuable. Your presence made the experience richer for everyone.
      </p>
      <div style="border-top:1px solid #F3EFE8;margin:20px 0;"></div>
      <h2 style="${emailStyles.subheading};text-align:left;">What You Can Do Next</h2>
      <p style="${emailStyles.text};text-align:left;">
        The strategies you learned are a great starting point. To go deeper and get guidance tailored to your specific situation, we offer individual sessions.
      </p>
      ${relatedService && serviceUrl ? `
      <p style="${emailStyles.text};text-align:left;">
        Based on what we covered, <a href="${serviceUrl}" style="color:#7A3B5E;font-weight:600;">${relatedService.name}</a> might be a great fit for you.
      </p>` : ''}
      <div style="text-align:center;margin:20px 0 8px;">
        <a href="${bookingUrl}" style="${emailStyles.button}">Book a Free 30-Min Consultation</a>
        <p style="margin:8px 0 0;font-size:12px;color:#8E8E9F;">No commitment — just a conversation about what support looks like for you.</p>
      </div>
      <div style="margin:12px 0 0;">
        <a href="${siteUrl}/en/resources/events?utm_source=event&utm_medium=email&utm_campaign=${event.slug}-followup" style="font-size:13px;color:#C8A97D;text-decoration:underline;">
          See what's coming up next →
        </a>
      </div>
    </div>
  `);
}
