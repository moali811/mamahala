/* Client Portal Magic Link Authentication
   POST: send magic link email
   GET: validate token + create session */

import { NextRequest, NextResponse } from 'next/server';
import { createMagicToken, consumeMagicToken, createBookingSession } from '@/lib/booking/booking-store';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { cookies } from 'next/headers';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';

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
  return emailWrapper(`
    <div style="${emailStyles.card};text-align:center;">
      <p style="color:#4A4A5C;margin:0 0 8px;font-size:14px;">Hi ${name || 'there'},</p>
      <p style="color:#4A4A5C;margin:0 0 20px;font-size:14px;">Click below to access your booking portal:</p>
      <a href="${magicUrl}" style="${emailStyles.button}">Open My Account</a>
      <p style="color:#8E8E9F;font-size:12px;margin:16px 0 0;">This link expires in 15 minutes and can only be used once.</p>
    </div>
  `);
}
