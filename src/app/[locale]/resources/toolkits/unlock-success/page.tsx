'use client';

/* ================================================================
   Toolkit Unlock Success Handler
   Stripe redirects here after successful payment with ?slug={toolkit-slug}
   (via client_reference_id). This page writes the unlock flag to
   localStorage and redirects to the toolkit.
   ================================================================ */

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Sparkles, Check } from 'lucide-react';

function UnlockSuccessInner() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');

  useEffect(() => {
    const slug = searchParams.get('slug');
    if (!slug) {
      setStatus('error');
      return;
    }
    try {
      localStorage.setItem(`toolkit:paid:${slug}`, 'true');
      setStatus('success');
      // Redirect after a brief celebration moment
      const timer = setTimeout(() => {
        router.replace(`/${locale}/resources/toolkits/${slug}?unlocked=${slug}`);
      }, 2000);
      return () => clearTimeout(timer);
    } catch {
      setStatus('error');
    }
  }, [searchParams, router, locale]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 bg-[#FAF7F2]"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="text-center max-w-md">
        {status === 'processing' && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-[#7A3B5E]/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Sparkles className="w-8 h-8 text-[#7A3B5E]" />
            </div>
            <h1
              className="text-2xl font-bold text-[#2D2A33] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'جارٍ فتحُ أدواتِك...' : 'Unlocking your toolkit...'}
            </h1>
            <p className="text-sm text-[#4A4A5C]">
              {isRTL ? 'لحظةً فقط' : 'One moment please'}
            </p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-[#5A8B6F]/15 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-[#5A8B6F]" />
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'تمّ الفتحُ بنجاح!' : 'Unlocked!'}
            </h1>
            <p className="text-base text-[#4A4A5C] leading-relaxed">
              {isRTL
                ? 'وصولُكِ الدائمُ جاهز. جارٍ التحويلُ إلى أدواتِك...'
                : 'Your lifetime access is ready. Redirecting you now...'}
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1
              className="text-2xl font-bold text-[#2D2A33] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'حدثَ خطأ' : 'Something went wrong'}
            </h1>
            <p className="text-sm text-[#4A4A5C] mb-6">
              {isRTL
                ? 'لم نتمكّنْ من التعرُّفِ على أداتِكِ. يُرجى التواصلُ مع الدعم.'
                : "We couldn't identify your toolkit. Please contact support."}
            </p>
            <button
              onClick={() => router.replace(`/${locale}/resources/downloads`)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A3B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#5E2D48] transition-colors"
            >
              {isRTL ? 'العودة للمكتبة' : 'Back to Library'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ToolkitUnlockSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <UnlockSuccessInner />
    </Suspense>
  );
}
