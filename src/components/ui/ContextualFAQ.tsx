'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import ScrollReveal from '@/components/motion/ScrollReveal';
import type { FAQ } from '@/types';

interface ContextualFAQProps {
  faqs: FAQ[];
  locale: string;
  title?: string;
  className?: string;
  maxItems?: number;
}

export default function ContextualFAQ({
  faqs,
  locale,
  title,
  className = '',
  maxItems = 4,
}: ContextualFAQProps) {
  const isRTL = locale === 'ar';
  const [openId, setOpenId] = useState<number | null>(null);
  const items = faqs.slice(0, maxItems);

  if (items.length === 0) return null;

  const defaultTitle = isRTL ? 'أسئلةٌ شائعة' : 'Common Questions';

  return (
    <section className={`py-16 ${className}`}>
      <div className="container-main max-w-3xl">
        <ScrollReveal className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#C8A97D]/10 mb-3">
            <HelpCircle className="w-5 h-5 text-[#C8A97D]" />
          </div>
          <h3
            className="text-xl sm:text-2xl font-bold text-[#2D2A33]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title || defaultTitle}
          </h3>
        </ScrollReveal>

        <div className="space-y-2.5">
          {items.map((faq, i) => {
            const isOpen = openId === i;
            const question = isRTL ? faq.questionAr : faq.question;
            const answer = isRTL ? faq.answerAr : faq.answer;

            return (
              <div
                key={i}
                className={`bg-white rounded-xl border transition-all duration-300 ${
                  isOpen ? 'border-[#C8A97D]/20 shadow-sm' : 'border-[#F3EFE8]'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-5 text-start"
                >
                  <span className="text-sm font-semibold text-[#2D2A33] leading-snug">
                    {question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8E8E9F] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="text-sm text-[#6B6580] leading-relaxed">
                          {answer}
                        </p>
                        {faq.link && (
                          <Link
                            href={`/${locale}${faq.link.href}`}
                            target="_blank"
                            className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#7A3B5E] hover:text-[#5E2D48] transition-colors"
                          >
                            {isRTL ? faq.link.labelAr : faq.link.labelEn}
                            {isRTL ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
