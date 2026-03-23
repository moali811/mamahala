'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  MessageCircle,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Accordion from '@/components/ui/Accordion';
import { generalFaqs } from '@/data/faqs';

export default function FAQsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  const accordionItems = generalFaqs.map((faq, index) => ({
    id: String(index),
    title: isRTL ? faq.questionAr : faq.question,
    content: <p>{isRTL ? faq.answerAr : faq.answer}</p>,
    icon: (
      <div className="w-9 h-9 rounded-full bg-[#2B5F4E]/10 flex items-center justify-center flex-shrink-0">
        <HelpCircle className="w-4 h-4 text-[#2B5F4E]" />
      </div>
    ),
  }));

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B5F4E] via-[#2B5F4E] to-[#1E4A3B]" />
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-[400px] h-[400px] rounded-full bg-white/[0.04] blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] rounded-full bg-[#C8A97D]/[0.08] blur-[80px]" />
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
              light
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
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.resources.faqs}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg lg:text-xl text-white/75 max-w-2xl leading-relaxed"
            >
              {messages.resources.faqsDesc}
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 55 1440 60V60H0Z"
              fill="#FAF7F2"
            />
          </svg>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  FAQ ACCORDION                                                   */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-[#FAF7F2]">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <Accordion
                items={accordionItems}
                defaultOpen="0"
                allowMultiple
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  STILL HAVE QUESTIONS CTA                                        */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B5F4E] via-[#234F40] to-[#1A3D30]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C8A97D]/[0.08] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.1, duration: 0.5, ease }}
            >
              <Sparkles className="w-4 h-4 text-[#C8A97D]" />
              <span className="text-sm text-white/80 font-medium">
                {isRTL ? 'نحن هنا للمساعدة' : "We're Here to Help"}
              </span>
            </motion.div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'لا تزال لديك أسئلة؟' : 'Still Have Questions?'}
            </h2>
            <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl mx-auto">
              {isRTL
                ? 'لا تتردد في التواصل معنا. نحن هنا لمساعدتك في كل خطوة.'
                : "Don't hesitate to reach out. We're here to support you every step of the way."}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button
                as="a"
                href={`/${locale}/contact`}
                variant="secondary"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
                className="!bg-white !text-[#2B5F4E] hover:!bg-[#F3EFE8]"
              >
                {messages.contact.pageTitle}
              </Button>
              <Button
                as="a"
                href={`/${locale}/book-a-session`}
                variant="outline"
                size="lg"
                icon={<Calendar className="w-5 h-5" />}
                className="!border-white/30 !text-white hover:!bg-white/10"
              >
                {messages.cta.bookNow}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
