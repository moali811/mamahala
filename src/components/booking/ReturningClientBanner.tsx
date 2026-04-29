'use client';

/* ================================================================
   ReturningClientBanner — shown when the client is authenticated
   ================================================================
   The booking_session cookie is present + /api/account/session has
   resolved a real customer. Greets by first name and (when known)
   surfaces a one-click rebook CTA for their last service.
   ================================================================ */

import { motion } from 'framer-motion';
import { Sparkles, Repeat } from 'lucide-react';
import { services } from '@/data/services';

interface Props {
  firstName: string | null;
  lastBookedServiceSlug?: string | null;
  locale: 'en' | 'ar';
  onRebookLast?: (serviceSlug: string) => void;
}

const COPY = {
  en: {
    welcomeNamed: (n: string) => `Welcome back, ${n}.`,
    welcomeAnonymous: 'Welcome back.',
    body: "You're signed in — your details will be filled in for you.",
    rebookCta: (svc: string) => `Rebook ${svc}`,
  },
  ar: {
    welcomeNamed: (n: string) => `مرحبًا بعودتك يا ${n}.`,
    welcomeAnonymous: 'مرحبًا بعودتك.',
    body: 'تم تسجيل دخولك — سنملأ بياناتك تلقائيًا.',
    rebookCta: (svc: string) => `حجز ${svc} مجددًا`,
  },
} as const;

export default function ReturningClientBanner({
  firstName,
  lastBookedServiceSlug,
  locale,
  onRebookLast,
}: Props) {
  const t = COPY[locale];
  const lastService = lastBookedServiceSlug
    ? services.find(s => s.slug === lastBookedServiceSlug)
    : undefined;
  const lastServiceName = locale === 'ar' && lastService?.nameAr
    ? lastService.nameAr
    : lastService?.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl px-4 pt-3"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-[#7A3B5E]/15 bg-[#FFFAF5] px-4 py-3">
        <div className="w-8 h-8 rounded-full bg-[#7A3B5E]/10 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-[#7A3B5E]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#4A4A5C] leading-tight">
            {firstName ? t.welcomeNamed(firstName) : t.welcomeAnonymous}
          </p>
          <p className="text-xs text-[#8E8E9F] leading-tight mt-0.5">{t.body}</p>
        </div>
        {lastService && lastServiceName && onRebookLast && (
          <button
            type="button"
            onClick={() => onRebookLast(lastService.slug)}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-white border border-[#7A3B5E]/25 text-[#7A3B5E] px-3 py-1.5 text-xs font-semibold hover:bg-[#7A3B5E] hover:text-white transition-colors"
          >
            <Repeat className="w-3 h-3" />
            <span className="hidden sm:inline">{t.rebookCta(lastServiceName)}</span>
            <span className="sm:hidden">{locale === 'ar' ? 'إعادة الحجز' : 'Rebook'}</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
