'use client';

import { ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';
import { getBookingUrl } from '@/config/business';
import type { Locale } from '@/types';

interface FinalCTAProps {
  locale: string;
  fillColorAbove?: string;
  headingEn: React.ReactNode;
  headingAr: React.ReactNode;
  descEn?: string;
  descAr?: string;
  primaryTextEn?: string;
  primaryTextAr?: string;
  primaryHref?: string;
  secondaryTextEn?: string;
  secondaryTextAr?: string;
  secondaryHref?: string;
}

export default function FinalCTA({
  locale,
  fillColorAbove = '#FAF7F2',
  headingEn,
  headingAr,
  descEn,
  descAr,
  primaryTextEn = "I'm Ready",
  primaryTextAr = 'أنا مستعدّ',
  primaryHref,
  secondaryTextEn = 'I Have Questions',
  secondaryTextAr = 'لديّ أسئلة',
  secondaryHref,
}: FinalCTAProps) {
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const defaultDescEn = "Your first conversation is free — 30 minutes, no pressure, no commitment.";
  const defaultDescAr = 'محادثتُك الأولى مجّانيّة — ٣٠ دقيقة، بلا ضغط، بلا التزام.';

  return (
    <section className="py-24 lg:py-32 gradient-cta-dark relative overflow-hidden">
      <div className="container-main relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2D2A33] leading-tight text-balance"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {isRTL ? headingAr : headingEn}
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-[#4A4A5C] leading-relaxed max-w-xl mx-auto">
            {isRTL ? (descAr || defaultDescAr) : (descEn || defaultDescEn)}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button
              as="a"
              href={primaryHref || getBookingUrl(locale)}
              size="lg"
              icon={<ArrowIcon className="w-5 h-5" />}
            >
              {isRTL ? primaryTextAr : primaryTextEn}
            </Button>
            <Button
              as="a"
              href={secondaryHref || `/${locale}/contact`}
              variant="outline"
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              {isRTL ? secondaryTextAr : secondaryTextEn}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
