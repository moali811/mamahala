'use client';

/* ================================================================
   TalkNowFab — persistent floating action button on marketing
   pages. One tap routes to /book?fast=1, which opens the
   SoonestAvailableCard immediately (panic / on-the-go path).

   Mobile-only by default (sm:hidden) — desktop visitors have the
   header CTA. Auto-hides on /book and /account routes where the
   wizard's own affordances take over.

   RTL-aware: in Arabic the button mirrors to the bottom-left.
   ================================================================ */

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Zap } from 'lucide-react';

interface Props {
  locale: 'en' | 'ar';
}

const COPY = {
  en: { label: 'Talk to Dr. Hala', sub: 'Soonest slot' },
  ar: { label: 'تحدّث مع د. هالة', sub: 'أقرب موعد' },
} as const;

export default function TalkNowFab({ locale }: Props) {
  const pathname = usePathname() ?? '';
  // Hide where the wizard / account flow already has its own CTAs.
  if (/\/book(\/|$)/.test(pathname)) return null;
  if (/\/account(\/|$)/.test(pathname)) return null;

  const t = COPY[locale];
  const isRTL = locale === 'ar';

  return (
    <Link
      href={`/${locale}/book?fast=1`}
      aria-label={t.label}
      className={[
        'sm:hidden fixed z-40 bottom-5',
        isRTL ? 'left-5' : 'right-5',
        'inline-flex items-center gap-2.5 rounded-full',
        'bg-[#7A3B5E] hover:bg-[#69304F] active:scale-[0.98]',
        'text-white px-4 py-3 shadow-lg shadow-[#7A3B5E]/30',
        'transition-all',
      ].join(' ')}
    >
      <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
        <Zap className="w-4 h-4" />
      </span>
      <span className="text-start leading-tight">
        <span className="block text-sm font-semibold">{t.label}</span>
        <span className="block text-[10px] opacity-90">{t.sub}</span>
      </span>
    </Link>
  );
}
