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

    // Logic: The Webhook is already processing the KV update.
    // We just parse the slug to know where to send the user back to.
    try {
      const [slug] = ref.split(':');
      if (!slug) throw new Error("Invalid Ref");

      setStatus('success');
      
      // Give them 3 seconds to feel good about the purchase
      const timer = setTimeout(() => {
        router.replace(`/${locale}/programs/${slug}`);
      }, 3000);

      return () => clearTimeout(timer);
    } catch {
      setStatus('error');
    }
  }, [searchParams, router, locale]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#FAF7F2]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center max-w-md">
        {status === 'processing' && (
           <div className="animate-pulse">
             <Sparkles className="w-12 h-12 text-[#7A3B5E] mx-auto mb-4" />
             <h1 className="text-2xl font-bold">{isRTL ? 'جارٍ إعداد برنامجك...' : 'Preparing your program...'}</h1>
           </div>
        )}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-[#5A8B6F]/15 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-[#5A8B6F]" />
            </div>
            <h1 className="text-3xl font-bold mb-3">{isRTL ? 'تم بنجاح!' : 'Success!'}</h1>
            <p className="text-[#4A4A5C]">{isRTL ? 'تم تفعيل اشتراكك. سننقلك الآن...' : 'Access granted. Redirecting you to your dashboard...'}</p>
          </>
        )}
        {status === 'error' && (
           <div>
             <h1 className="text-2xl font-bold">Error</h1>
             <button onClick={() => router.push('/')} className="mt-4 px-4 py-2 bg-[#7A3B5E] text-white rounded-lg">Go Home</button>
           </div>
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
