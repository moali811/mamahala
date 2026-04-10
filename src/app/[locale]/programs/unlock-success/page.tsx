'use client';

/* ================================================================
   Academy Program Unlock Success Handler
   Stripe redirects here after successful payment with
   ?ref={slug}:level-{N}:{email} (via client_reference_id).
   Parses the ref, writes the unlock flag to localStorage,
   and redirects to the program page.
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
    const ref = searchParams.get('ref');
    if (!ref) {
      setStatus('error');
      return;
    }
    try {
      // ref format: "{slug}:level-{N}:{email}" OR "{slug}:bundle:{email}"
      const parts = ref.split(':');
      if (parts.length < 2) {
        setStatus('error');
        return;
      }
      const slug = parts[0];
      const tier = parts[1]; // "level-2", "level-3", or "bundle"

      if (tier === 'bundle') {
        // Bundle unlocks both Growth (2) and Mastery (3)
        localStorage.setItem(`academy:paid:${slug}:level-2`, 'true');
        localStorage.setItem(`academy:paid:${slug}:level-3`, 'true');
      } else {
        const levelMatch = tier.match(/^level-(\d+)$/);
        if (!levelMatch) {
          setStatus('error');
          return;
        }
        const levelNum = levelMatch[1];
        localStorage.setItem(`academy:paid:${slug}:level-${levelNum}`, 'true');
      }

      setStatus('success');
      // Redirect after a brief celebration moment
      const timer = setTimeout(() => {
        router.replace(`/${locale}/programs/${slug}?paid=${tier}`);
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
              {isRTL ? 'جارٍ فتحُ برنامجِك...' : 'Unlocking your program...'}
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
                ? 'وصولُكِ الدائمُ جاهز. جارٍ التحويلُ إلى برنامجِك...'
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
                ? 'لم نتمكّنْ من التعرُّفِ على برنامجِكِ. يُرجى التواصلُ مع الدعم.'
                : "We couldn't identify your program. Please contact support."}
            </p>
            <button
              onClick={() => router.replace(`/${locale}/resources/programs`)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A3B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#5E2D48] transition-colors"
            >
              {isRTL ? 'العودة للبرامج' : 'Back to Programs'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProgramUnlockSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <UnlockSuccessInner />
    </Suspense>
  );
}
