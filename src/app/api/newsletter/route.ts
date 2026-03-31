import { NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    await trackEvent({ type: 'newsletter_signup', email, source: source || 'footer' });

    // Send notification to Mama Hala + welcome email to subscriber
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <onboarding@resend.dev>';

        // 1. Notify admin
        await resend.emails.send({
          from: fromEmail,
          to: process.env.RESEND_ADMIN_EMAIL || 'admin@mamahala.ca',
          subject: `New Newsletter Subscriber: ${email}`,
          html: `
            <div style="font-family:sans-serif;max-width:500px;padding:24px;background:#FAF7F2;border-radius:12px;">
              <h3 style="color:#7A3B5E;margin:0 0 12px;">New Newsletter Subscriber</h3>
              <p style="color:#2D2A33;font-size:16px;font-weight:600;margin:0 0 8px;">${email}</p>
              <p style="color:#8E8E9F;font-size:12px;margin:0;">${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })}</p>
            </div>
          `,
        });

        // 2. Welcome email to subscriber
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: 'Welcome to the Mama Hala Community',
          html: `
            <div style="font-family:'Segoe UI',Tahoma,sans-serif;max-width:600px;margin:0 auto;">
              <div style="background:linear-gradient(135deg,#F0E0D8,#F5E8E0,#FAF0EC);padding:40px 32px;text-align:center;border-radius:12px 12px 0 0;">
                <h1 style="color:#7A3B5E;font-size:24px;margin:0 0 8px;">Welcome to Our Community</h1>
                <p style="color:#6B6580;font-size:14px;margin:0;">You've taken a beautiful first step.</p>
              </div>
              <div style="background:#ffffff;padding:32px;border:1px solid #F3EFE8;border-top:none;border-radius:0 0 12px 12px;">
                <p style="color:#2D2A33;font-size:15px;line-height:1.7;margin:0 0 16px;">
                  Thank you for joining the Mama Hala Consulting family. You'll receive curated insights on parenting, relationships, and emotional wellbeing — written with heart and grounded in evidence.
                </p>
                <p style="color:#2D2A33;font-size:15px;line-height:1.7;margin:0 0 24px;">
                  In the meantime, here are some ways to get started:
                </p>
                <div style="margin:0 0 24px;">
                  <a href="https://mama-hala-website.vercel.app/en/resources/blog" style="display:inline-block;background:#7A3B5E;color:white;padding:12px 24px;border-radius:99px;text-decoration:none;font-size:14px;font-weight:600;">Explore Our Blog</a>
                </div>
                <p style="color:#8E8E9F;font-size:12px;margin:0;">
                  You can unsubscribe at any time. We respect your privacy.
                </p>
              </div>
            </div>
          `,
        });
      } catch (e) {
        console.error('Newsletter email error:', e);
        // Don't fail the request — subscription is still logged
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
