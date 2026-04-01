'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Calendar, X, Sparkles, ArrowRight, ArrowLeft,
  CheckCircle2, Heart, Clock, Users, User, Leaf,
  GraduationCap, Shield, Flame, Brain, BookOpen, Target, TrendingUp,
  Gem, Wind, Zap, Compass, ShieldCheck, CloudLightning, Flower2,
  HeartHandshake, Baby, Smile,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { serviceCategories, getServicesByCategory } from '@/data/services';
import type { ServiceCategory } from '@/types';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';

import { BUSINESS } from '@/config/business';
const CAL_BASE_URL = BUSINESS.calBaseUrl;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Users, User, Heart, Leaf, GraduationCap, Shield, Baby, Compass,
  Brain, ShieldCheck, Flame, HeartHandshake, BookOpen, CloudLightning,
  Flower2, Wind, Zap, Target, TrendingUp, Gem, Smile,
};

function BookASessionInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const serviceParam = searchParams.get('service');

  const [userPath, setUserPath] = useState<'idle' | 'new' | 'returning'>('idle');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('youth');
  const [calSlug, setCalSlug] = useState<string | null>(null);
  const [selectedServiceName, setSelectedServiceName] = useState<string>('');

  const calEmbedRef = useRef<HTMLDivElement | null>(null);
  const serviceSelectorRef = useRef<HTMLDivElement | null>(null);
  const autoOpened = useRef(false);

  // Track booking page visit once on load
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'booking_visit',
        source: 'book_a_session_page',
        locale,
      }),
    }).catch(() => {
      // Tracking failure is non-blocking
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-open Cal.com embed if a service slug is passed in URL
  useEffect(() => {
    if (serviceParam && !autoOpened.current) {
      autoOpened.current = true;
      setTimeout(() => {
        setCalSlug(serviceParam);
        setTimeout(() => {
          calEmbedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }, 300);
    }
  }, [serviceParam]);

  const openCalEmbed = useCallback((slug: string, name?: string) => {
    setCalSlug(slug);
    if (name) setSelectedServiceName(name);
    setTimeout(() => {
      calEmbedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const closeCalEmbed = useCallback(() => {
    setCalSlug(null);
    setSelectedServiceName('');
  }, []);

  const handleNewClient = () => {
    setUserPath('new');
    openCalEmbed('initial-consultation', isRTL ? 'استشارة مجّانيّة' : 'Free Consultation');
  };

  const handleReturningClient = () => {
    setUserPath('returning');
    setTimeout(() => {
      serviceSelectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const filteredCategories = serviceCategories.filter(c => c.key !== 'experiential');
  const services = getServicesByCategory(selectedCategory);

  return (
    <div className="bg-[#FAF7F2]">
      <Script src="https://cal.com/embed/embed.js" strategy="lazyOnload" />

      {/* ─── Section 1: Minimal Hero ─── */}
      <section className="relative bg-gradient-to-b from-[#FAF0EC] to-[#FAF7F2]">
        <div className="container-main pt-24 pb-20 md:pt-28 md:pb-24 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb
              locale={locale}
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.nav.bookNow },
              ]}
            />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#2D2A33] mt-6 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {messages.booking.pageTitle}
          </motion.h1>
          <motion.p
            className="text-lg text-[#4A4A5C] max-w-xl mx-auto mt-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
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
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ─── Section 2: The Fork ─── */}
      <section className="py-16 lg:py-20">
        <div className="container-main max-w-4xl mx-auto">

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card A: New Client */}
            <ScrollReveal direction="up" delay={0.1}>
              <button
                onClick={handleNewClient}
                className={`w-full h-full flex flex-col text-start bg-white rounded-2xl border p-8 md:p-10 transition-all duration-300 group ${isRTL ? 'text-right' : ''} ${
                  userPath === 'new'
                    ? 'border-[#C8A97D] ring-2 ring-[#C8A97D]/20 shadow-[0_12px_40px_rgba(0,0,0,0.08)]'
                    : 'border-[#F3EFE8] hover:border-[#C8A97D]/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#C8A97D]/10 flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6 text-[#C8A97D]" />
                </div>
                <h3
                  className="text-xl font-bold text-[#2D2A33] mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {messages.booking.newClient}
                </h3>
                <p className="text-sm text-[#6B6580] leading-relaxed mb-5 flex-grow">
                  {messages.booking.newClientDesc}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="sage" size="sm" className="!bg-[#25D366]/10 !text-[#25D366]">
                    <Clock className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    {isRTL ? 'مجّانيّة · 30 دقيقة' : 'Free · 30 min'}
                  </Badge>
                  <span className={`text-sm font-semibold text-[#C8A97D] transition-transform inline-flex items-center gap-1 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                    {messages.booking.bookFreeConsultation}
                    <ArrowIcon className="w-4 h-4" />
                  </span>
                </div>
              </button>
            </ScrollReveal>

            {/* Card B: Returning Client */}
            <ScrollReveal direction="up" delay={0.2}>
              <button
                onClick={handleReturningClient}
                className={`w-full h-full flex flex-col text-start bg-white rounded-2xl border p-8 md:p-10 transition-all duration-300 group ${isRTL ? 'text-right' : ''} ${
                  userPath === 'returning'
                    ? 'border-[#7A3B5E] ring-2 ring-[#7A3B5E]/20 shadow-[0_12px_40px_rgba(0,0,0,0.08)]'
                    : 'border-[#F3EFE8] hover:border-[#7A3B5E]/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#7A3B5E]/10 flex items-center justify-center mb-5">
                  <Heart className="w-6 h-6 text-[#7A3B5E]" />
                </div>
                <h3
                  className="text-xl font-bold text-[#2D2A33] mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {messages.booking.returningClient}
                </h3>
                <p className="text-sm text-[#6B6580] leading-relaxed mb-5 flex-grow">
                  {messages.booking.returningClientDesc}
                </p>
                <div className={`flex items-center ${isRTL ? 'justify-start' : 'justify-end'}`}>
                  <span className={`text-sm font-semibold text-[#7A3B5E] transition-transform inline-flex items-center gap-1 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                    {messages.booking.chooseService}
                    <ArrowIcon className="w-4 h-4" />
                  </span>
                </div>
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Service Selector (returning clients) ─── */}
      <div ref={serviceSelectorRef} />
      <AnimatePresence>
        {userPath === 'returning' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pb-16 lg:pb-20"
          >
            <div className="container-main max-w-4xl mx-auto">
              <h2
                className="text-2xl font-bold text-[#2D2A33] text-center mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {messages.booking.whoNeedsSupport}
              </h2>

              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {filteredCategories.map((cat) => {
                  const catName = isRTL ? cat.nameAr : cat.name;
                  const CatIcon = iconMap[cat.icon] || Users;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key as ServiceCategory)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === cat.key
                          ? 'bg-[#7A3B5E] text-white shadow-md'
                          : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:border-[#C8A97D]/30'
                      }`}
                    >
                      <CatIcon className="w-4 h-4" />
                      {catName}
                    </button>
                  );
                })}
              </div>

              {/* Service List */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  {services.map((service) => {
                    const sName = isRTL ? service.nameAr : service.name;
                    const sShort = isRTL ? service.shortDescAr : service.shortDesc;
                    const SvcIcon = iconMap[service.icon] || Sparkles;

                    return (
                      <button
                        key={service.slug}
                        onClick={() => openCalEmbed(service.slug, sName)}
                        className={`w-full flex items-center gap-4 p-5 bg-white rounded-xl border border-[#F3EFE8] hover:border-[#C8A97D]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-200 text-start group ${isRTL ? 'text-right' : ''}`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center flex-shrink-0">
                          <SvcIcon className="w-5 h-5 text-[#7A3B5E]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#2D2A33] text-[15px]">{sName}</p>
                          <p className="text-sm text-[#8E8E9F] truncate">{sShort}</p>
                        </div>
                        <div className="text-end flex-shrink-0 hidden sm:block">
                          {service.priceFrom === 0 ? (
                            <Badge variant="sage" size="sm" className="!bg-[#25D366]/10 !text-[#25D366]">
                              {isRTL ? 'مجّانيّة' : 'Free'}
                            </Badge>
                          ) : (
                            <>
                              <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider">{isRTL ? 'يبدأ من' : 'From'}</p>
                              <p className="text-sm font-bold text-[#2D2A33]">${service.priceFrom}</p>
                            </>
                          )}
                          <p className="text-[10px] text-[#8E8E9F] mt-0.5">{service.duration}</p>
                        </div>
                        <ArrowIcon className="w-4 h-4 text-[#C8A97D] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Experiential link */}
              <p className="text-center text-sm text-[#8E8E9F] mt-6">
                {isRTL ? 'تبحثُ عن العلاجِ التجريبيّ؟' : 'Looking for experiential therapy?'}{' '}
                <Link
                  href={`/${locale}/services/experiential`}
                  className="text-[#7A3B5E] font-medium hover:underline"
                >
                  {isRTL ? 'اطّلِعْ هنا' : 'View here'}
                </Link>
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── Section 4: Cal.com Embed ─── */}
      <div ref={calEmbedRef} />
      <AnimatePresence>
        {calSlug && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pb-16 lg:pb-20"
          >
            <div className="container-main max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className={`flex items-center justify-between p-5 border-b border-[#F3EFE8]`}>
                  <div className={`flex items-center gap-3 ${isRTL ? 'text-right' : ''}`}>
                    <div className="w-10 h-10 rounded-xl bg-[#C4878A]/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#7A3B5E]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {selectedServiceName || (isRTL ? 'اختَرْ موعدَك' : 'Choose Your Time')}
                      </h3>
                      <p className="text-xs text-[#8E8E9F]">
                        {messages.booking.confirmWithin24h}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeCalEmbed}
                    className="w-8 h-8 rounded-full bg-[#F3EFE8] hover:bg-[#E8E0D4] flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-[#4A4A5C]" />
                  </button>
                </div>
                <div className="relative" style={{ minHeight: '680px' }}>
                  <iframe
                    key={calSlug}
                    src={`${CAL_BASE_URL}/${calSlug}?embed=true&theme=light&layout=month_view`}
                    className="w-full border-0"
                    style={{ height: '680px', minWidth: '320px' }}
                    allow="payment"
                  />
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── WhatsApp + Policy Footer Band ─── */}
      <section className="py-10 border-t border-[#F3EFE8] bg-[#FAF7F2]">
        <div className="container-main max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'text-right' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#2D2A33]">{messages.booking.preferToChat}</p>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#25D366] font-medium hover:underline"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[#8E8E9F]">
            <span>{isRTL ? 'الاستشارة الأولى مجّانيّة' : 'Free first consultation'}</span>
            <span className="text-[#D4D4D4]">·</span>
            <span>{isRTL ? 'إشعار إلغاء 24 ساعة' : '24h cancellation notice'}</span>
            <span className="text-[#D4D4D4]">·</span>
            <Link
              href={`/${locale}/booking-policy`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#7A3B5E] font-semibold hover:underline"
            >
              {isRTL ? 'سياسة الحجز الكاملة' : 'View Booking Policy'}
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookASessionPage() {
  return (
    <Suspense>
      <BookASessionInner />
    </Suspense>
  );
}
