'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MessageCircle, Calendar, ChevronDown,
  Sparkles, ArrowRight, ArrowLeft, CheckCircle2,
  GraduationCap, Users, User, Heart, Leaf, Clock, Globe,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { serviceCategories, getServicesByCategory } from '@/data/services';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

// Calendly scheduling URL - update this when Mama Hala's Calendly is set up
const CALENDLY_URL = 'https://calendly.com/admin-mamahala';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  GraduationCap, Users, User, Heart, Leaf,
};

export default function BookASessionPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);

  const getWhatsAppLink = (serviceName: string) => {
    const msg = encodeURIComponent(
      isRTL ? `مرحبا، أود حجز جلسة: ${serviceName}` : `Hi, I would like to book a session: ${serviceName}`
    );
    return `https://wa.me/16132222104?text=${msg}`;
  };

  // Load Calendly widget
  useEffect(() => {
    if (showCalendly && typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        // @ts-expect-error Calendly global
        if (window.Calendly) {
          // @ts-expect-error Calendly global
          window.Calendly.initInlineWidget({
            url: CALENDLY_URL,
            parentElement: document.getElementById('calendly-embed'),
            prefill: {},
            utm: {},
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showCalendly]);

  return (
    <div className="bg-[#FAF7F2]">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2B5F4E] via-[#2B5F4E] to-[#1E4A3B]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C8A97D]/30 blur-3xl" />
        </div>
        <div className="container-main relative py-24 md:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb
              locale={locale}
              light
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.nav.bookNow },
              ]}
            />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6"
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {messages.booking.pageTitle}
          </motion.h1>
          <motion.p
            className="text-lg text-white/80 max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {messages.booking.subtitle}
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-[#C8A97D] mx-auto mt-6 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </div>
      </section>

      {/* Booking Options */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">

          {/* Two booking paths */}
          <StaggerReveal className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Path 1: Calendly */}
            <StaggerChild>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-card)] p-8 flex flex-col items-center text-center cursor-pointer"
                onClick={() => setShowCalendly(true)}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#2B5F4E]/10 flex items-center justify-center mb-5">
                  <Calendar className="w-8 h-8 text-[#2B5F4E]" />
                </div>
                <h3 className="text-xl font-bold text-[#1E1E2A] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {isRTL ? 'احجز مباشرة' : 'Book Online'}
                </h3>
                <p className="text-[#8E8E9F] text-sm mb-5">
                  {isRTL
                    ? 'اختر الوقت المناسب لك واحجز جلستك مباشرة عبر التقويم'
                    : 'Choose a time that works for you and book your session instantly via Calendly'
                  }
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#2B5F4E] bg-[#2B5F4E]/5 px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5" /> {isRTL ? '30 دقيقة' : '30 min'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#2B5F4E] bg-[#2B5F4E]/5 px-3 py-1.5 rounded-full">
                    <Globe className="w-3.5 h-3.5" /> {isRTL ? 'عبر الإنترنت' : 'Online'}
                  </span>
                </div>
                <Button icon={<Calendar className="w-5 h-5" />} onClick={() => setShowCalendly(true)}>
                  {isRTL ? 'افتح التقويم' : 'Open Calendar'}
                </Button>
              </motion.div>
            </StaggerChild>

            {/* Path 2: WhatsApp */}
            <StaggerChild>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-card)] p-8 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mb-5">
                  <MessageCircle className="w-8 h-8 text-[#25D366]" />
                </div>
                <h3 className="text-xl font-bold text-[#1E1E2A] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                </h3>
                <p className="text-[#8E8E9F] text-sm mb-5">
                  {isRTL
                    ? 'تحدث معنا مباشرة للاستفسار عن الخدمات أو حجز جلسة'
                    : 'Message us directly to ask about services or book a session with personalized guidance'
                  }
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#25D366] bg-[#25D366]/5 px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {isRTL ? 'رد سريع' : 'Quick Response'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#25D366] bg-[#25D366]/5 px-3 py-1.5 rounded-full">
                    <Globe className="w-3.5 h-3.5" /> {isRTL ? 'عربي / English' : 'English / عربي'}
                  </span>
                </div>
                <Button
                  as="a"
                  href="https://wa.me/16132222104"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  icon={<MessageCircle className="w-5 h-5" />}
                  className="!border-[#25D366] !text-[#25D366] hover:!bg-[#25D366]/5"
                >
                  {isRTL ? 'ابدأ محادثة' : 'Start a Chat'}
                </Button>
              </motion.div>
            </StaggerChild>
          </StaggerReveal>

          {/* Calendly Embed Modal/Section */}
          <AnimatePresence>
            {showCalendly && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mb-16"
              >
                <div className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-card)] overflow-hidden">
                  <div className="flex items-center justify-between p-5 border-b border-[#F3EFE8]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2B5F4E]/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#2B5F4E]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1E1E2A]" style={{ fontFamily: 'var(--font-heading)' }}>
                          {isRTL ? 'اختر موعدك' : 'Choose Your Time'}
                        </h3>
                        <p className="text-xs text-[#8E8E9F]">
                          {isRTL ? 'جلسة استشارة أولية - 30 دقيقة' : 'Initial Consultation - 30 minutes'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowCalendly(false)}
                      className="text-[#8E8E9F] hover:text-[#1E1E2A] transition-colors text-sm font-medium"
                    >
                      {isRTL ? 'إغلاق' : 'Close'} ✕
                    </button>
                  </div>
                  <div
                    id="calendly-embed"
                    className="calendly-inline-widget"
                    style={{ minWidth: '320px', height: '700px' }}
                    data-url={CALENDLY_URL}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Browse By Category */}
          <ScrollReveal>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#1E1E2A] mb-8 text-center"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.booking.selectService}
            </h2>
          </ScrollReveal>

          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {serviceCategories.map((cat) => {
              const services = getServicesByCategory(cat.key);
              const isOpen = openCategory === cat.key;
              const catName = isRTL ? cat.nameAr : cat.name;
              const catSubtitle = isRTL ? cat.subtitleAr : cat.subtitle;
              const IconComponent = iconMap[cat.icon] || Users;

              return (
                <motion.div
                  key={cat.key}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-[#2B5F4E]/20 shadow-[var(--shadow-card)]' : 'border-[#F3EFE8] shadow-[var(--shadow-subtle)]'
                  }`}
                >
                  <button
                    onClick={() => setOpenCategory(isOpen ? null : cat.key)}
                    className="w-full flex items-center gap-4 p-6 md:p-7 text-start"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#2B5F4E]/10 text-[#2B5F4E] flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-[#1E1E2A]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {catName}
                      </h3>
                      <p className="text-sm text-[#8E8E9F] mt-0.5">{catSubtitle}</p>
                    </div>
                    <Badge variant="neutral" size="sm">{services.length}</Badge>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8E8E9F] flex-shrink-0 transition-transform duration-300 ${
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
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 md:px-7 md:pb-7">
                          <div className="border-t border-[#F3EFE8] pt-5">
                            <div className="grid md:grid-cols-2 gap-3">
                              {services.map((service) => {
                                const sName = isRTL ? service.nameAr : service.name;
                                const sDesc = isRTL ? service.shortDescAr : service.shortDesc;

                                return (
                                  <div
                                    key={service.slug}
                                    className="group bg-[#FAF7F2] rounded-xl p-5 border border-[#F3EFE8] hover:border-[#2B5F4E]/20 hover:bg-white hover:shadow-[var(--shadow-subtle)] transition-all duration-300"
                                  >
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-semibold text-[#1E1E2A] group-hover:text-[#2B5F4E] transition-colors text-sm">
                                        {sName}
                                      </h4>
                                      <Badge variant="sand" size="sm">${service.priceFrom}+</Badge>
                                    </div>
                                    <p className="text-xs text-[#8E8E9F] leading-relaxed mb-3 line-clamp-2">
                                      {sDesc}
                                    </p>
                                    <div className="flex items-center gap-2.5">
                                      <button
                                        onClick={() => {
                                          setShowCalendly(true);
                                          window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#2B5F4E]"
                                      >
                                        <Calendar className="w-3.5 h-3.5" />
                                        {messages.services.bookOnline}
                                      </button>
                                      <span className="text-[#F3EFE8]">|</span>
                                      <a
                                        href={getWhatsAppLink(service.name)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#8E8E9F] hover:text-[#2B5F4E]"
                                      >
                                        <MessageCircle className="w-3.5 h-3.5" />
                                        WhatsApp
                                      </a>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Quiz CTA */}
          <ScrollReveal className="mt-12 text-center">
            <p className="text-[#8E8E9F] mb-4">{messages.booking.notSure}</p>
            <Link
              href={`/${locale}/quiz`}
              className="inline-flex items-center gap-2 text-[#2B5F4E] font-semibold hover:text-[#1E4A3B] transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              {messages.booking.takeQuiz}
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
