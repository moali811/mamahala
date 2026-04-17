'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';

export default function LocaleError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isRTL = typeof window !== 'undefined' && window.location.pathname.startsWith('/ar');
  const locale = isRTL ? 'ar' : 'en';

  const copy = isRTL
    ? { title: 'حدث خطأ', body: 'عذراً، حدث خطأ غير متوقّع. يُرجى المحاولة مرّة أخرى.', retry: 'أعد المحاولة', home: 'الصفحة الرئيسية' }
    : { title: 'Something went wrong', body: 'An unexpected error occurred. Please try again.', retry: 'Try again', home: 'Go home' };

  return (
    <div
      className="flex flex-col items-center justify-center px-6 py-20 text-center"
      style={{ minHeight: 'calc(100vh - 200px)' }}
    >
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#C8A97D] mb-4">
        {isRTL ? 'خطأ' : 'Error'}
      </span>

      <h1
        className="text-3xl sm:text-4xl font-bold text-[#7A3B5E] mb-4"
        style={{ fontFamily: isRTL ? 'var(--font-tajawal)' : 'var(--font-dm-serif)' }}
      >
        {copy.title}
      </h1>

      <p className="text-[#6B6580] max-w-md leading-relaxed mb-10">
        {copy.body}
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => unstable_retry()}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#7A3B5E] text-white hover:bg-[#5C2C47] transition-all cursor-pointer"
        >
          <RefreshCw size={15} />
          {copy.retry}
        </button>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-white text-[#7A3B5E] border border-[#E8DDD5] hover:border-[#C4878A] hover:text-[#C4878A] transition-all"
        >
          <Home size={15} />
          {copy.home}
        </Link>
      </div>
    </div>
  );
}
