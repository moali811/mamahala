/* ================================================================
   GET /api/account/booking-token?token=<t>&locale=en
   ================================================================
   Public endpoint linked from invoice + follow-up emails. Validates
   the booking-resume token, opens a 7-day booking session for the
   client (mirroring the magic-link flow), and forwards them straight
   to /<locale>/book?resume=1 — the wizard renders the
   ReturningClientBanner and skips the intake step.

   Errors render a simple HTML message page (no app shell) so the
   client can reset by clicking Try again.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { consumeBookingResumeToken } from '@/lib/booking/booking-resume-token';
import { createBookingSession } from '@/lib/booking/booking-store';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { appendAudit } from '@/lib/audit/log';
import { SITE_URL } from '@/lib/site-url';

function pickLocale(request: NextRequest): 'en' | 'ar' {
  const fromQuery = request.nextUrl.searchParams.get('locale');
  if (fromQuery === 'ar') return 'ar';
  return 'en';
}

function clientIp(request: NextRequest): string {
  const h = request.headers;
  return (
    h.get('x-forwarded-for')?.split(',')[0].trim()
    || h.get('x-real-ip')
    || 'anonymous'
  );
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const locale = pickLocale(request);

  if (!token) {
    return new NextResponse(renderError('Missing token', locale), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const result = await consumeBookingResumeToken(token);
  if (!result.ok || !result.email) {
    const message = errorMessage(result.error, locale);
    const status = result.error === 'expired' || result.error === 'already-used' ? 410 : 400;
    return new NextResponse(renderError(message, locale), {
      status,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Verify the customer record still exists. If they ran `forget-me`,
  // the token's email no longer maps to a real account.
  const customer = await getCustomer(result.email);
  if (!customer) {
    return new NextResponse(renderError(errorMessage('invalid-signature', locale), locale), {
      status: 410,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const sessionId = await createBookingSession(result.email);

  // Audit the recognition for the client's timeline.
  appendAudit({
    actor: 'system',
    action: 'customer.recognized',
    entityId: result.email,
    customerEmail: result.email,
    ip: clientIp(request),
    details: { via: 'booking-resume-token' },
  }).catch(() => { /* best-effort */ });

  const response = NextResponse.redirect(new URL(`/${locale}/book?resume=1`, SITE_URL));
  (await cookies()).set('booking_session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 604800, // 7 days
    path: '/',
  });
  return response;
}

function errorMessage(error: string | undefined, locale: 'en' | 'ar'): string {
  const en: Record<string, string> = {
    'expired': 'This link has expired. Request a new one or visit our booking page directly.',
    'already-used': 'This link has already been used. Open your account dashboard to continue.',
    'invalid-signature': 'This link is no longer valid for your account.',
    'kv-unavailable': 'Service temporarily unavailable. Please try again in a moment.',
    'invalid-format': 'This link looks malformed. Try copying it again from the email.',
  };
  const ar: Record<string, string> = {
    'expired': 'انتهت صلاحية هذا الرابط. اطلب رابطًا جديدًا أو زر صفحة الحجز مباشرةً.',
    'already-used': 'تم استخدام هذا الرابط بالفعل. افتح لوحة حسابك للمتابعة.',
    'invalid-signature': 'هذا الرابط لم يعد صالحًا لحسابك.',
    'kv-unavailable': 'الخدمة غير متاحة مؤقتًا. الرجاء المحاولة بعد قليل.',
    'invalid-format': 'هذا الرابط يبدو غير صحيح. حاول نسخه من البريد مرة أخرى.',
  };
  const fallback = locale === 'ar' ? 'تعذر فتح الرابط.' : 'Could not open this link.';
  return (locale === 'ar' ? ar : en)[error ?? ''] ?? fallback;
}

function renderError(message: string, locale: 'en' | 'ar'): string {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const cta = locale === 'ar' ? 'الذهاب إلى صفحة الحجز' : 'Go to booking page';
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${locale === 'ar' ? 'رابط غير صالح' : 'Link unavailable'}</title></head>
<body style="margin:0;padding:60px 20px;background:#FAF7F2;font-family:'Segoe UI',sans-serif;text-align:center;">
  <div style="max-width:440px;margin:0 auto;background:white;border-radius:16px;padding:32px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
    <p style="margin:0 0 20px;font-size:14px;color:#4A4A5C;line-height:1.6;">${message}</p>
    <a href="${SITE_URL}/${locale}/book" style="display:inline-block;padding:12px 24px;background:#7A3B5E;color:white;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">${cta}</a>
  </div>
</body></html>`;
}
