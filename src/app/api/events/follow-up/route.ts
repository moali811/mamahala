import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { mergeEventOverrides } from '@/lib/event-merge';
import { events as staticEvents } from '@/data/events';
import { getServiceBySlug } from '@/data/services';
import type { SmartEvent } from '@/types';

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
export async function GET() {
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
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mama-hala-website.vercel.app';

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

  return `<!DOCTYPE html>
<html dir="ltr" lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Segoe UI',Tahoma,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="text-align:center;padding:24px 0 16px;">
    <p style="margin:0;font-size:18px;font-weight:700;color:#7A3B5E;letter-spacing:1px;">Mama Hala Consulting</p>
    <div style="width:60px;height:2px;background:#C8A97D;margin:16px auto 0;"></div>
  </td></tr>

  <!-- Thank You Card -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#F0E8DC,#FAF5ED);border-radius:16px;overflow:hidden;">
      <tr><td style="padding:32px;text-align:center;">
        <div style="font-size:40px;margin-bottom:12px;">💛</div>
        <h1 style="margin:0;font-size:24px;color:#2D2A33;font-family:Georgia,serif;">
          Thank You, ${firstName}!
        </h1>
        <p style="margin:12px 0 0;font-size:15px;color:#4A4A5C;line-height:1.6;">
          We hope you enjoyed "${title}" and found it valuable. Your presence made the experience richer for everyone.
        </p>
      </td></tr>
    </table>
  </td></tr>

  <!-- What's Next -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;border:1px solid #F3EFE8;">
      <tr><td style="padding:24px;text-align:left;">
        <h2 style="margin:0 0 12px;font-size:18px;color:#2D2A33;font-family:Georgia,serif;">What You Can Do Next</h2>
        <p style="margin:0 0 8px;font-size:14px;color:#4A4A5C;line-height:1.6;">
          The strategies you learned are a great starting point. To go deeper and get guidance tailored to your specific situation, Dr. Hala offers individual sessions.
        </p>
        ${relatedService && serviceUrl ? `
        <p style="margin:0;font-size:14px;color:#4A4A5C;">
          Based on what we covered, <a href="${serviceUrl}" style="color:#7A3B5E;font-weight:600;text-decoration:underline;">${relatedService.name}</a> might be a great fit for you.
        </p>` : ''}
      </td></tr>
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:0 0 24px;text-align:center;">
    <a href="${bookingUrl}" target="_blank" style="display:inline-block;padding:14px 36px;background:#7A3B5E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;">
      Book a Free 30-Min Consultation
    </a>
    <p style="margin:8px 0 0;font-size:12px;color:#8E8E9F;">No commitment — just a conversation about what support looks like for you.</p>
  </td></tr>

  <!-- Upcoming events teaser -->
  <tr><td style="padding:0 0 24px;text-align:center;">
    <a href="${siteUrl}/en/resources/events?utm_source=event&utm_medium=email&utm_campaign=${event.slug}-followup" target="_blank" style="font-size:13px;color:#C8A97D;text-decoration:underline;">
      See what's coming up next →
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="text-align:center;padding:16px 0;border-top:1px solid #F3EFE8;">
    <p style="margin:0;font-size:11px;color:#B0B0B0;">Mama Hala Consulting — Guidance with Heart</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
