import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mama-hala-website.vercel.app';

/**
 * POST /api/academy/magic-link
 * Generates a magic link token and sends it via email.
 * Body: { email: string }
 */
export async function POST(request: NextRequest) {
  if (!KV_AVAILABLE) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }

  try {
    const { email } = await request.json();
    if (!email?.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if student exists
    const student = await kv.get(`academy:student:${normalizedEmail}`);
    if (!student) {
      // Don't reveal that the email isn't enrolled — just say "check your email"
      return NextResponse.json({ success: true, message: 'If you have an account, check your email.' });
    }

    // Generate token
    const token = crypto.randomUUID();
    await kv.set(`academy:magic:${token}`, { email: normalizedEmail }, { ex: 900 }); // 15-min TTL

    const magicUrl = `${SITE_URL}/api/academy/magic-link?token=${token}`;

    // Send email
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <onboarding@resend.dev>',
        to: normalizedEmail,
        subject: 'Your Dashboard Login Link',
        html: generateMagicLinkEmail(magicUrl, (student as any).name || ''),
      });
    } catch (err) {
      console.error('Magic link email failed:', err);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Check your email for the login link.' });
  } catch (err) {
    console.error('Magic link error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/**
 * GET /api/academy/magic-link?token=xxx
 * Validates token, creates session, redirects to dashboard.
 */
export async function GET(request: NextRequest) {
  if (!KV_AVAILABLE) {
    return NextResponse.redirect(new URL('/en/dashboard?error=unavailable', SITE_URL));
  }

  const token = request.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/en/dashboard?error=missing-token', SITE_URL));
  }

  try {
    // Validate token
    const tokenData = await kv.get(`academy:magic:${token}`) as { email: string } | null;
    if (!tokenData) {
      return NextResponse.redirect(new URL('/en/dashboard?error=expired', SITE_URL));
    }

    // Consume token (one-time use)
    await kv.del(`academy:magic:${token}`);

    // Create session
    const sessionId = crypto.randomUUID();
    await kv.set(`academy:session:${sessionId}`, { email: tokenData.email, createdAt: new Date().toISOString() }, { ex: 604800 }); // 7-day TTL

    // Set cookie and redirect
    const response = NextResponse.redirect(new URL('/en/dashboard', SITE_URL));
    (await cookies()).set('academy_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 604800, // 7 days
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Magic link validation error:', err);
    return NextResponse.redirect(new URL('/en/dashboard?error=invalid', SITE_URL));
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
    <p style="margin:0;font-size:18px;font-weight:700;color:#7A3B5E;">Mama Hala Academy</p>
    <div style="width:60px;height:2px;background:#C8A97D;margin:16px auto 0;"></div>
  </td></tr>
  <tr><td style="padding:0 0 24px;">
    <div style="background:white;border-radius:12px;padding:24px;text-align:center;">
      <p style="color:#4A4A5C;margin:0 0 8px;">Hi ${name || 'there'},</p>
      <p style="color:#4A4A5C;margin:0 0 20px;">Click below to access your learning dashboard:</p>
      <a href="${magicUrl}" style="display:inline-block;padding:14px 36px;background:#7A3B5E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;">Open My Dashboard</a>
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
