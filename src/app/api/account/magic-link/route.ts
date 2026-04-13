/* Client Portal Magic Link Authentication
   POST: send magic link email
   GET: validate token + create session */

import { NextRequest, NextResponse } from 'next/server';
import { createMagicToken, consumeMagicToken, createBookingSession } from '@/lib/booking/booking-store';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { cookies } from 'next/headers';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamahala.ca';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email?.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if customer exists
    const customer = await getCustomer(normalizedEmail);
    if (!customer) {
      return NextResponse.json(
        {
          error: 'No account found with this email. Please book a session first.',
          notFound: true,
        },
        { status: 404 },
      );
    }

    // Generate token
    const token = await createMagicToken(normalizedEmail);
    const magicUrl = `${SITE_URL}/api/account/magic-link?token=${token}`;

    // Send email
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <onboarding@resend.dev>',
        to: normalizedEmail,
        subject: 'Your Account Login Link',
        html: generateMagicLinkEmail(magicUrl, customer.name),
      });
    } catch (err) {
      console.error('[Magic Link] Email failed:', err);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Check your email for the login link.' });
  } catch (err) {
    console.error('[Magic Link] Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/en/account?error=missing-token', SITE_URL));
  }

  try {
    const email = await consumeMagicToken(token);
    if (!email) {
      return NextResponse.redirect(new URL('/en/account?error=expired', SITE_URL));
    }

    // Create session
    const sessionId = await createBookingSession(email);

    // Set cookie and redirect
    const response = NextResponse.redirect(new URL('/en/account', SITE_URL));
    (await cookies()).set('booking_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 604800, // 7 days
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('[Magic Link] Validation error:', err);
    return NextResponse.redirect(new URL('/en/account?error=invalid', SITE_URL));
  }
}

function generateMagicLinkEmail(magicUrl: string, name: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Segoe UI',Tahoma,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:32px 16px;">
<tr><td align="center">
<table width="500" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;">
  <tr><td style="text-align:center;padding:24px 0 16px;">
    <p style="margin:0;font-size:18px;font-weight:700;color:#7A3B5E;">Mama Hala Consulting</p>
    <div style="width:60px;height:2px;background:#C8A97D;margin:16px auto 0;"></div>
  </td></tr>
  <tr><td style="padding:0 0 24px;">
    <div style="background:white;border-radius:12px;padding:24px;text-align:center;">
      <p style="color:#4A4A5C;margin:0 0 8px;">Hi ${name || 'there'},</p>
      <p style="color:#4A4A5C;margin:0 0 20px;">Click below to access your booking portal:</p>
      <a href="${magicUrl}" style="display:inline-block;padding:14px 36px;background:#7A3B5E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;">Open My Account</a>
      <p style="color:#8E8E9F;font-size:12px;margin:16px 0 0;">This link expires in 15 minutes and can only be used once.</p>
    </div>
  </td></tr>
  <tr><td style="text-align:center;padding:16px 0;">
    <p style="margin:0;font-size:11px;color:#B0B0B0;">Mama Hala Consulting</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}
