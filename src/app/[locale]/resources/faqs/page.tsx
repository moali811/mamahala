'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  MessageCircle,
  Calendar,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';
import { generalFaqs } from '@/data/faqs';

export default function FAQsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(0);

  // Get unique tags
  const tags = Array.from(new Set(generalFaqs.map((f) => f.tag).filter(Boolean))) as string[];
  const tagsAr = Array.from(new Set(generalFaqs.map((f) => f.tagAr).filter(Boolean))) as string[];

  const filteredFaqs = activeTag
    ? generalFaqs.filter((f) => f.tag === activeTag)
    : generalFaqs;

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC]" />
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C4878A]/[0.08] blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] rounded-full bg-[#C8A97D]/[0.12] blur-[80px]" />
        </div>
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Breadcrumb
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.resources.pageTitle, href: `/${locale}/resources` },
                { label: messages.resources.faqs },
              ]}
              locale={locale}
            />
          </motion.div>

          <motion.div
            className="mt-10 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-4"
            >
              {isRTL ? 'أسئلة شائعة' : 'Common Questions'}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.resources.faqs}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed"
            >
              {messages.resources.faqsDesc}
            </motion.p>
          </motion.div>
        </div>

        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  FAQ ACCORDION                                                   */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          {/* Tag filters — full width row */}
          <ScrollReveal className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              <motion.button
                onClick={() => { setActiveTag(null); setOpenId(null); }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  !activeTag ? 'bg-[#7A3B5E] text-white shadow-sm' : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:border-[#C8A97D]/30'
                }`}
                whileTap={{ scale: 0.97 }}
              >
                {isRTL ? 'الكلّ' : 'All'}
              </motion.button>
              {tags.map((tag, i) => (
                <motion.button
                  key={tag}
                  onClick={() => { setActiveTag(tag); setOpenId(null); }}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all capitalize ${
                    activeTag === tag ? 'bg-[#7A3B5E] text-white shadow-sm' : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:border-[#C8A97D]/30'
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {isRTL ? tagsAr[i] : tag}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQ grid — 2 columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((faq, i) => {
                const isOpen = openId === i;
                const question = isRTL ? faq.questionAr : faq.question;
                const answer = isRTL ? faq.answerAr : faq.answer;
                const tag = isRTL ? faq.tagAr : faq.tag;

                return (
                  <motion.div
                    key={faq.question}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen ? 'border-[#C8A97D]/30 shadow-md lg:col-span-2' : 'border-[#F3EFE8] hover:border-[#C4878A]/20 hover:shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 p-5 lg:p-6 text-start"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-[#7A3B5E]/10' : 'bg-[#C4878A]/8'}`}>
                        <HelpCircle className={`w-5 h-5 ${isOpen ? 'text-[#7A3B5E]' : 'text-[#C4878A]'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-semibold text-[#2D2A33] leading-snug">{question}</h3>
                        {tag && !isOpen && (
                          <span className="text-[10px] text-[#C8A97D] font-semibold uppercase tracking-[0.1em] mt-1 block">{tag}</span>
                        )}
                      </div>
                      <ChevronDown className={`w-4 h-4 text-[#8E8E9F] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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
                          <div className="px-5 pb-6 lg:px-6 lg:pb-8 pt-0">
                            <div className={`${isRTL ? 'pr-14' : 'pl-14'}`}>
                              <p className="text-[15px] text-[#4A4A5C] leading-[1.8]">{answer}</p>
                              {faq.link && (
                                <Link
                                  href={`/${locale}${faq.link.href}`}
                                  target="_blank"
                                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-[#7A3B5E] hover:text-[#5E2D48] transition-colors bg-[#7A3B5E]/5 px-3 py-1.5 rounded-full"
                                >
                                  {isRTL ? faq.link.labelAr : faq.link.labelEn}
                                  <ArrowIcon className="w-3 h-3" />
                                </Link>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={<>Still Have <span className="text-[#7A3B5E] italic">Questions?</span></>}
        headingAr={<>لا تزالُ لديكَ <span className="text-[#7A3B5E] italic">أسئلة؟</span></>}
        descEn="Your first conversation is free — 30 minutes, no pressure, just clarity."
        descAr="محادثتك الأولى مجانية — ٣٠ دقيقة بلا ضغط، فقط وضوح."
        primaryTextEn="Book a Free Consultation"
        primaryTextAr="احجز استشارة مجانية"
        secondaryTextEn="Ask a Specific Question"
        secondaryTextAr="اسأل سؤالاً محدداً"
      />
    </div>
  );
}
