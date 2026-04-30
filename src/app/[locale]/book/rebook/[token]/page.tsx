/* ================================================================
   /[locale]/book/rebook/[token] — One-tap rebook landing
   ================================================================
   Server component. Spends the rebook token, creates a booking
   session for the recognized client, sets the `booking_session`
   cookie, and redirects into the existing booking wizard with
   the previous service pre-selected.

   The booking wizard already auto-fills name/email/phone/country
   from `/api/account/session` when the cookie is present, so the
   user lands on the date/time step with everything except the
   slot already chosen — that's the "one tap" UX.

   On token failure (expired / already-used / invalid) we fall
   back to a friendly message + plain "Book a session" CTA, which
   takes the client through the normal flow.
   ================================================================ */

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { spendRebookToken } from '@/lib/whatsapp/rebook-token';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { createBookingSession } from '@/lib/booking/booking-store';
import { SITE_URL } from '@/lib/site-url';

interface Props {
  params: Promise<{ locale: string; token: string }>;
}

export const dynamic = 'force-dynamic';

export default async function RebookLandingPage({ params }: Props) {
  const { locale, token } = await params;
  const isAr = locale === 'ar';

  const consumed = await spendRebookToken(token);

  // Token was successfully spent — set up the session and bounce.
  if (consumed.ok && consumed.email) {
    const customer = await getCustomer(consumed.email);
    if (customer) {
      const sessionId = await createBookingSession(consumed.email);
      const jar = await cookies();
      jar.set('booking_session', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1h is plenty for a rebook session
        path: '/',
      });

      const dest = new URL(`${SITE_URL}/${locale}/book`);
      if (consumed.lastServiceSlug) dest.searchParams.set('service', consumed.lastServiceSlug);
      dest.searchParams.set('rebook', '1');
      redirect(dest.toString());
    }
  }

  // Failure path — render a friendly explanation. Layout matches the
  // `/book/manage` token-failure shape (cream background, centered card).
  const reason = consumed.error ?? 'unknown';
  const reasonCopy: Record<string, { en: string; ar: string }> = {
    'invalid-format': {
      en: 'This rebook link looks malformed.',
      ar: 'هذا الرابط غير صالح.',
    },
    'invalid-signature': {
      en: 'This rebook link could not be verified.',
      ar: 'تعذر التحقق من هذا الرابط.',
    },
    expired: {
      en: 'This rebook link expired. You can still book a session below.',
      ar: 'انتهت صلاحية هذا الرابط. يمكنك الحجز من الأسفل.',
    },
    'already-used': {
      en: 'This rebook link has already been used. Need another? Just book below.',
      ar: 'تم استخدام هذا الرابط. للحجز مرة أخرى، اضغط أدناه.',
    },
    'kv-unavailable': {
      en: 'Something went wrong on our side. Please try the regular booking flow.',
      ar: 'حدث خطأ. يرجى المحاولة عبر صفحة الحجز العادية.',
    },
    unknown: {
      en: 'We couldn\'t process this rebook link. Please book below.',
      ar: 'تعذر معالجة الرابط. يرجى الحجز من الأسفل.',
    },
  };

  const copy = reasonCopy[reason] ?? reasonCopy.unknown;
  const heading = isAr ? 'إعادة الحجز' : 'Rebook';
  const cta = isAr ? 'احجز جلسة' : 'Book a session';

  return (
    <main
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#F0ECE8] shadow-[0_8px_32px_rgba(122,59,94,0.08)] p-8 text-center">
        <h1 className="text-xl font-semibold text-[#7A3B5E] mb-3">{heading}</h1>
        <p className="text-sm text-[#4A4A5C] leading-relaxed mb-6">
          {isAr ? copy.ar : copy.en}
        </p>
        <Link
          href={`/${locale}/book`}
          className="inline-block px-6 py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] transition"
        >
          {cta}
        </Link>
      </div>
    </main>
  );
}
