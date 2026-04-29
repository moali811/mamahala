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
    const grant = searchParams.get('grant');
    if (!ref) {
      setStatus('error');
      return;
    }

    // Webhook is already processing the KV update for paid flows.
    // We just parse the slug to know where to send the user back to.
    let slug: string;
    try {
      slug = ref.split(':')[0];
      if (!slug) throw new Error("Invalid Ref");
    } catch {
      setStatus('error');
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    // Bridge for admin grants: when a signed grant token is present,
    // verify it server-side and write academy_email to localStorage so
    // the program page's identity-based unlock check (/api/academy/access)
    // succeeds with one click on the recipient's fresh device.
    // Stripe-paid flows omit `grant` and behave as before.
    const run = async () => {
      if (grant) {
        try {
          const res = await fetch(
            `/api/academy/verify-grant?token=${encodeURIComponent(grant)}`,
            { cache: 'no-store' },
          );
          if (res.ok) {
            const data = (await res.json()) as { email?: string };
            if (data.email) {
              try { localStorage.setItem('academy_email', data.email); } catch { /* ignore quota */ }
            }
          }
        } catch {
          // If verification fails or network is offline, fall through —
          // the program page will still render, just with a paywall the
          // recipient can clear via the email-claim form.
        }
      }
      if (cancelled) return;
      setStatus('success');
      timer = setTimeout(() => {
        router.replace(`/${locale}/programs/${slug}`);
      }, 3000);
    };
    run();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
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
