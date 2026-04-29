'use client';

/* ================================================================
   Toolkit Detail Page
   Renders a full interactive toolkit (journal / workbook / guide)
   with section navigation, accordion days, and block content.
   ================================================================ */

import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Home,
  Sun, Moon, Eye, Heart, Shield, PenLine, Clock,
  CheckCircle, Target, Sparkles, Lock, Brain, Flame, Compass, MessageCircle,
} from 'lucide-react';

import type { Locale } from '@/types';
import type { ToolkitMeta, ToolkitSection, ToolkitBlock } from '@/types/toolkit';
import { scrollToElement } from '@/lib/scroll';
import { getToolkit } from '@/data/toolkits';
import ToolkitBlockRenderer, { type ToolkitBlockContext } from '@/components/toolkit/ToolkitBlockRenderer';
import FinalCTA from '@/components/shared/FinalCTA';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { t } from '@/lib/academy-helpers';
import { ease } from '@/lib/animations';
import { BUSINESS } from '@/config/business';
import { isVipEmail } from '@/lib/vip-emails';

/* ── Icon map ─────────────────────────────────────────────────── */
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  sun: Sun, moon: Moon, eye: Eye, heart: Heart, shield: Shield,
  'pen-line': PenLine, clock: Clock, 'check-circle': CheckCircle,
  target: Target, sparkles: Sparkles, lock: Lock, brain: Brain,
  flame: Flame, compass: Compass, 'message-circle': MessageCircle,
};

/* ── Color tokens ──────────────────────────────────────────────── */
const colors = {
  plum: '#7A3B5E',
  textDark: '#2D2A33',
  textSecondary: '#4A4A5C',
  bgLight: '#FAF7F2',
  border: '#F3EFE8',
};

/* ── Skeleton loader ───────────────────────────────────────────── */
function ToolkitSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero skeleton */}
      <div className="px-6 pt-24 pb-16 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-48 bg-[#F3EFE8] rounded" />
          <div className="h-10 w-3/4 bg-[#F3EFE8] rounded" />
          <div className="h-6 w-1/2 bg-[#F3EFE8] rounded" />
          <div className="h-24 w-full bg-[#F3EFE8] rounded-xl mt-8" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="px-6 max-w-4xl mx-auto space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-[#F3EFE8] rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Page Component ───────────────────────────────────────── */
export default function ToolkitDetailPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const slug = params?.slug as string;
  const isRTL = locale === 'ar';

  const [toolkit, setToolkit] = useState<ToolkitMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [dynamicPricing, setDynamicPricing] = useState({
    toolkitFullAccessPrice: BUSINESS.toolkitFullAccessPrice,
    academyFullAccessPrice: BUSINESS.academyFullAccessPrice,
  });
  /**
   * Ref to the <main> that holds the active section content.
   * Used by changeSection() to scroll the user to the start of the new
   * section's content (just below the sticky progress/tabs bar) instead
   * of scrolling all the way back to the top of the page.
   */
  const contentRef = useRef<HTMLElement>(null);

  /* ── Load toolkit data ───────────────────────────────────────── */
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    getToolkit(slug).then((data) => {
      if (!cancelled) {
        setToolkit(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [slug]);

  /* ── Fetch dynamic pricing ─────────────────────────────────────── */
  useEffect(() => {
    fetch('/api/pricing')
      .then(r => r.json())
      .then(data => {
        if (data.toolkitFullAccessPrice != null || data.academyFullAccessPrice != null) {
          setDynamicPricing(prev => ({
            toolkitFullAccessPrice: data.toolkitFullAccessPrice ?? prev.toolkitFullAccessPrice,
            academyFullAccessPrice: data.academyFullAccessPrice ?? prev.academyFullAccessPrice,
          }));
        }
      })
      .catch(() => { /* use BUSINESS defaults */ });
  }, []);

  /* ── Check unlock status for premium toolkits ──────────────────── */
  useEffect(() => {
    if (!slug) return;
    // VIP bypass: if any stored email is a VIP, auto-unlock everything
    const toolkitEmail = localStorage.getItem('mh_toolkit_email');
    const academyEmail = localStorage.getItem('academy_email');
    if (isVipEmail(toolkitEmail) || isVipEmail(academyEmail)) {
      localStorage.setItem(`toolkit:paid:${slug}`, 'true');
      setIsUnlocked(true);
      return;
    }
    const unlocked = localStorage.getItem(`toolkit:paid:${slug}`) === 'true';
    setIsUnlocked(unlocked);
    // Handle unlock param from Stripe redirect
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('unlocked') === slug) {
      localStorage.setItem(`toolkit:paid:${slug}`, 'true');
      setIsUnlocked(true);
    }
  }, [slug]);

  /* ── Helpers ─────────────────────────────────────────────────── */
  const toggleDay = useCallback((dayId: string) => {
    setExpandedDay((prev) => (prev === dayId ? null : dayId));
  }, []);

  /**
   * Switch to a different section AND scroll the user to the top of
   * the new section's content. Previously this jumped back to y=0 which
   * landed on the "How to Use This Toolkit" hero instead of the new
   * section. Now we scrollIntoView on the content ref, and the
   * scroll-mt-28 utility on <main> accounts for the sticky progress bar.
   */
  const changeSection = useCallback((nextIndex: number) => {
    setActiveSection(nextIndex);
    setExpandedDay(null);
    // Wait one frame so the new section DOM mounts before we scroll to it.
    requestAnimationFrame(() => {
      if (contentRef.current) void scrollToElement(contentRef.current);
    });
  }, []);

  if (loading) return <ToolkitSkeleton />;
  if (!toolkit) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl text-[#4A4A5C]">
            {isRTL ? 'لم يتم العثور على المجموعة' : 'Toolkit not found'}
          </p>
          <Link
            href={`/${locale}/resources`}
            className="text-[#7A3B5E] underline hover:opacity-80 transition"
          >
            {isRTL ? 'العودة للموارد' : 'Back to Resources'}
          </Link>
        </div>
      </div>
    );
  }

  const section = toolkit.sections[activeSection];
  const blockCtx: ToolkitBlockContext = {
    locale,
    isRTL,
    color: toolkit.color || colors.plum,
    toolkitSlug: toolkit.slug,
  };

  const ArrowBack = isRTL ? ChevronRight : ChevronLeft;

  /* ── Classify blocks ─────────────────────────────────────────── */
  const isDayBlock = (b: ToolkitBlock) => b.kind === 'journal-day';
  const introBlocks = section ? section.blocks.filter((b) => !isDayBlock(b)) : [];
  const dayBlocks = section ? section.blocks.filter(isDayBlock) : [];

  /* ── Compute progress ────────────────────────────────────────── */
  const totalSections = toolkit.sections.length;
  const progressPercent = totalSections > 0 ? ((activeSection + 1) / totalSections) * 100 : 0;

  /* ── Premium lock logic ──────────────────────────────────────── */
  const isPremium = toolkit.isPremium ?? false;
  const freePreviewId = toolkit.freePreviewSectionId || toolkit.sections[0]?.id;
  const isSectionLocked = (sec: ToolkitSection) =>
    isPremium && !isUnlocked && sec.id !== freePreviewId;
  const currentSectionLocked = section ? isSectionLocked(section) : false;

  return (
    <div className="min-h-screen bg-[#FAF7F2]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* ── Hero Section — full-width warm background ─────────────── */}
      <header
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${toolkit.color}08 0%, #FAF7F2 100%)` }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-20 pointer-events-none opacity-[0.06]"
          style={{
            [isRTL ? 'left' : 'right']: '-4rem',
            width: '300px', height: '300px', borderRadius: '50%',
            background: `radial-gradient(circle, ${toolkit.color}, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-0 pointer-events-none opacity-[0.04]"
          style={{
            [isRTL ? 'right' : 'left']: '10%',
            width: '200px', height: '200px', borderRadius: '50%',
            background: `radial-gradient(circle, ${toolkit.color}, transparent 70%)`,
          }}
        />

        <div className="max-w-5xl mx-auto px-6 pt-6 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#4A4A5C] mb-8">
            <Link href={`/${locale}`} className="hover:text-[#7A3B5E] transition flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              {isRTL ? 'الرئيسيّة' : 'Home'}
            </Link>
            <span className="opacity-40">/</span>
            <Link href={`/${locale}/resources/downloads`} className="hover:text-[#7A3B5E] transition">
              {isRTL ? 'الأدوات' : 'Toolkits'}
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-[#2D2A33] font-medium truncate max-w-[200px]">
              {t(toolkit.titleEn, toolkit.titleAr, isRTL)}
            </span>
          </nav>

          <ScrollReveal>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ backgroundColor: `${toolkit.color}15`, color: toolkit.color }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              {t(
                toolkit.format === 'journal' ? 'Interactive Journal' :
                toolkit.format === 'workbook' ? 'Workbook' :
                toolkit.format === 'guide' ? 'Guide' : 'Checklist',
                toolkit.format === 'journal' ? 'يوميّات تفاعليّة' :
                toolkit.format === 'workbook' ? 'دفتر عمل' :
                toolkit.format === 'guide' ? 'دليل' : 'قائمة',
                isRTL,
              )}
              {toolkit.totalDays && (
                <span className="opacity-60">
                  &middot; {toolkit.totalDays} {isRTL ? 'يوم' : 'days'}
                </span>
              )}
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2A33] leading-tight mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t(toolkit.titleEn, toolkit.titleAr, isRTL)}
            </h1>
            <p className="text-base sm:text-lg text-[#4A4A5C] max-w-2xl leading-relaxed">
              {t(toolkit.subtitleEn, toolkit.subtitleAr, isRTL)}
            </p>
            {toolkit.heroQuoteEn && (
              <blockquote
                className="mt-5 rounded-xl px-5 py-4 italic text-[#4A4A5C] max-w-xl border-s-3"
                style={{ borderColor: toolkit.color, backgroundColor: `${toolkit.color}06` }}
              >
                &ldquo;{t(toolkit.heroQuoteEn, toolkit.heroQuoteAr || '', isRTL)}&rdquo;
              </blockquote>
            )}
          </ScrollReveal>
        </div>
      </header>

      {/* ── How to Use — Ritual Timeline ─────────────────────────── */}
      {toolkit.howToUse.length > 0 && (
        <section className="px-6 py-10 max-w-3xl mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="text-center mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: toolkit.color }}>
                {isRTL ? 'طَقْسُكِ اليَوْمِيّ' : 'Your Daily Ritual'}
              </p>
              <h2
                className="text-xl sm:text-2xl font-bold text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'كيفيّة الاستخدام' : 'How to Use This Toolkit'}
              </h2>
              <div className="w-10 h-[2px] mx-auto mt-3" style={{ backgroundColor: toolkit.color }} />
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Connecting dashed line */}
            <div
              className="absolute top-6 bottom-6 hidden sm:block"
              style={{
                [isRTL ? 'right' : 'left']: '1.5rem',
                width: '2px',
                backgroundImage: `repeating-linear-gradient(to bottom, ${toolkit.color}30 0px, ${toolkit.color}30 6px, transparent 6px, transparent 14px)`,
              }}
            />

            <div className="space-y-4">
              {toolkit.howToUse.map((item, i) => {
                const Icon = iconMap[item.iconName.toLowerCase()] || Heart;
                const isLast = i === toolkit.howToUse.length - 1;

                return (
                  <motion.div
                    key={i}
                    className={`relative flex items-start gap-5 rounded-2xl p-5 sm:p-6 transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                    style={{
                      backgroundColor: i % 2 === 0 ? `${toolkit.color}06` : 'transparent',
                    }}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease }}
                  >
                    {/* Numbered icon circle */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                        style={{
                          borderColor: toolkit.color,
                          backgroundColor: 'white',
                          boxShadow: `0 2px 8px ${toolkit.color}15`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: toolkit.color }} />
                      </div>
                      {/* Step number badge */}
                      <span
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ backgroundColor: toolkit.color }}
                      >
                        {i + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pt-1 min-w-0">
                      <p className="font-semibold text-[#2D2A33] text-[15px] leading-snug">
                        {t(item.labelEn, item.labelAr, isRTL)}
                      </p>
                      {item.descEn && (
                        <p className="text-sm text-[#4A4A5C] mt-1.5 leading-relaxed">
                          {t(item.descEn, item.descAr || '', isRTL)}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Progress Bar ────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#F3EFE8]">
        <div className="max-w-5xl mx-auto px-6 py-3">
          {/* Progress track */}
          <div className="h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: toolkit.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease }}
            />
          </div>
          {/* Section tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
            {toolkit.sections.map((sec, i) => {
              const isActive = i === activeSection;
              const locked = isSectionLocked(sec);
              return (
                <button
                  key={sec.id}
                  onClick={() => changeSection(i)}
                  className={`
                    whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200 flex-shrink-0 inline-flex items-center gap-1.5
                    ${isActive
                      ? 'text-white shadow-sm'
                      : 'text-[#4A4A5C] hover:bg-[#F3EFE8]'
                    }
                  `}
                  style={isActive ? { backgroundColor: sec.color || toolkit.color } : undefined}
                >
                  {locked && <Lock className="w-3 h-3" />}
                  {t(sec.titleEn, sec.titleAr, isRTL)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Active Section Content ──────────────────────────────── */}
      {section && (
        <main
          ref={contentRef}
          className="px-6 py-10 max-w-4xl mx-auto scroll-anchor"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease }}
            >
              {/* Section header */}
              <div className="mb-8">
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#2D2A33]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {t(section.titleEn, section.titleAr, isRTL)}
                </h2>
                {section.subtitleEn && (
                  <p className="mt-2 text-[#4A4A5C] leading-relaxed">
                    {t(section.subtitleEn, section.subtitleAr || '', isRTL)}
                  </p>
                )}
                {section.dateRangeEn && (
                  <p className="mt-1 text-sm text-[#4A4A5C] opacity-70">
                    {t(section.dateRangeEn, section.dateRangeAr || '', isRTL)}
                  </p>
                )}
              </div>

              {/* Premium lock overlay for locked sections */}
              {currentSectionLocked && (
                <div className="relative mb-8">
                  {/* Blurred preview of first block */}
                  {introBlocks[0] && (
                    <div className="relative">
                      <div className="pointer-events-none select-none blur-sm opacity-50">
                        <ToolkitBlockRenderer block={introBlocks[0]} ctx={blockCtx} />
                      </div>
                      {/* Gradient fade to white */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(180deg, transparent 0%, #FAF7F2 70%)`,
                        }}
                      />
                    </div>
                  )}

                  {/* Unlock card — positioned over blurred content */}
                  <div className="relative mt-6">
                    <div
                      className="bg-white rounded-2xl border-2 p-8 sm:p-10 text-center shadow-xl max-w-xl mx-auto"
                      style={{ borderColor: `${toolkit.color}30` }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${toolkit.color}15` }}
                      >
                        <Lock className="w-7 h-7" style={{ color: toolkit.color }} />
                      </div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
                        style={{ color: toolkit.color }}
                      >
                        {isRTL ? 'قِسْمٌ مُمَيَّز' : 'Premium Section'}
                      </p>
                      <h3
                        className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-3"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? 'أكمِلْ رحلتَك' : 'Continue Your Journey'}
                      </h3>
                      <p className="text-[#4A4A5C] leading-relaxed mb-6 max-w-md mx-auto">
                        {isRTL
                          ? `لقد أكملتَ المعاينةَ المجّانيّة. افتحْ باقيَ الأقسام واستمتِعْ بالتجربةِ التفاعليّة الكاملة.`
                          : `You've finished the free preview. Unlock the rest of this interactive journey — every section, every exercise, forever yours.`}
                      </p>
                      {/* Features list */}
                      <div className="flex flex-col gap-2 mb-6 max-w-sm mx-auto text-start">
                        {[
                          isRTL ? 'وصولٌ دائم لجميعِ الأقسام' : 'Lifetime access to all sections',
                          isRTL ? 'تمارينٌ تفاعليّة وأدواتٌ حقيقيّة' : 'Interactive exercises & real tools',
                          isRTL ? 'تقدُّمُكَ يُحفَظ تلقائيًّا' : 'Your progress saves automatically',
                        ].map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-[#4A4A5C]">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: toolkit.color }} />
                            {feat}
                          </div>
                        ))}
                      </div>
                      {/* Price + CTA */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B08D57] to-[#7A3B5E]">
                          {isRTL ? '🚀 سِعْرُ الإطْلاق' : '🚀 Launch Price'}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span
                            className="text-4xl font-bold"
                            style={{ color: toolkit.color, fontFamily: 'var(--font-heading)' }}
                          >
                            ${dynamicPricing.toolkitFullAccessPrice}
                          </span>
                          <span className="text-sm text-[#8E8E9F]">CAD</span>
                        </div>
                        <p className="text-xs text-[#8E8E9F] mb-3">
                          {isRTL ? 'دفعةٌ واحدة · بدون اشتراك' : 'One-time payment · no subscription'}
                        </p>
                        <button
                          disabled={checkoutLoading}
                          onClick={async () => {
                            setCheckoutError(null);
                            setCheckoutLoading(true);
                            try {
                              const res = await fetch('/api/toolkit/checkout', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  toolkitSlug: toolkit.slug,
                                  toolkitTitle: isRTL ? toolkit.titleAr : toolkit.titleEn,
                                  email: localStorage.getItem('mh_toolkit_email') || '',
                                  locale,
                                }),
                              });
                              const data = await res.json().catch(() => ({}));
                              if (res.ok && data.url) {
                                window.location.href = data.url;
                                return;
                              }
                              setCheckoutError(
                                isRTL
                                  ? 'الدفع غير متاح حالياً. حاول مرة أخرى بعد قليل أو راسلنا على admin@mamahala.ca.'
                                  : 'Payment is unavailable right now. Please try again in a moment or email admin@mamahala.ca.'
                              );
                            } catch {
                              setCheckoutError(
                                isRTL
                                  ? 'تعذّر الاتصال. تحقّق من الإنترنت وحاول مرة أخرى.'
                                  : 'Connection failed. Check your network and try again.'
                              );
                            } finally {
                              setCheckoutLoading(false);
                            }
                          }}
                          className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-6 py-3 text-white text-sm font-semibold rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                          style={{
                            background: `linear-gradient(135deg, ${toolkit.color}, ${toolkit.color}CC)`,
                          }}
                        >
                          <Sparkles className="w-4 h-4" />
                          {checkoutLoading
                            ? (isRTL ? 'جارٍ التحويل…' : 'Redirecting…')
                            : (isRTL ? 'افتحِ الوصولَ الكامل' : 'Unlock Full Access')}
                        </button>
                        {checkoutError && (
                          <p className="mt-3 text-xs text-[#C4878A] max-w-xs mx-auto" role="alert">
                            {checkoutError}
                          </p>
                        )}
                        {/* Redeem access for VIPs */}
                        <button
                          onClick={() => {
                            const email = window.prompt(
                              isRTL ? 'أدخِلِ البريدَ الإلكترونيّ للاسترداد:' : 'Enter your access email:'
                            );
                            if (!email) return;
                            if (isVipEmail(email)) {
                              localStorage.setItem('mh_toolkit_email', email.trim());
                              localStorage.setItem(`toolkit:paid:${toolkit.slug}`, 'true');
                              setIsUnlocked(true);
                            } else {
                              window.alert(
                                isRTL
                                  ? 'هذا البريدُ ليس مؤهَّلًا للوصولِ المجّانيّ. يُرجى استخدامُ الدفعِ أعلاه.'
                                  : "This email doesn't qualify for complimentary access. Please use the payment option above."
                              );
                            }
                          }}
                          className="text-xs text-[#8E8E9F] hover:text-[#4A4A5C] underline transition-colors mt-3"
                        >
                          {isRTL ? 'لديكِ وصولٌ مُسبق؟ استرداد' : 'Have access? Redeem'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Intro / non-day blocks — hidden when locked */}
              {!currentSectionLocked && introBlocks.length > 0 && (
                <div className="space-y-6 mb-8">
                  {introBlocks.map((block) => (
                    <ScrollReveal key={block.id}>
                      <ToolkitBlockRenderer block={block} ctx={blockCtx} />
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {/* Day blocks as accordions — hidden when locked */}
              {!currentSectionLocked && dayBlocks.length > 0 && (
                <div className="space-y-3">
                  {dayBlocks.map((block) => {
                    if (block.kind !== 'journal-day') return null;
                    const isOpen = expandedDay === block.id;
                    return (
                      <div
                        key={block.id}
                        className="bg-white rounded-xl border border-[#F3EFE8] shadow-sm overflow-hidden"
                      >
                        {/* Accordion trigger */}
                        <button
                          onClick={() => toggleDay(block.id)}
                          className="w-full flex items-center justify-between px-5 py-4 text-start hover:bg-[#FAF7F2]/50 transition"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                              style={{ backgroundColor: section.color || toolkit.color }}
                            >
                              {block.dayNumber}
                            </span>
                            <div>
                              <span className="font-semibold text-[#2D2A33] text-sm">
                                {t(block.titleEn, block.titleAr, isRTL)}
                              </span>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-[#4A4A5C]" />
                          </motion.div>
                        </button>

                        {/* Accordion content */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pt-2 border-t border-[#F3EFE8]">
                                <ToolkitBlockRenderer block={block} ctx={blockCtx} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Section navigation */}
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#F3EFE8]">
                <button
                  onClick={() => {
                    if (activeSection > 0) changeSection(activeSection - 1);
                  }}
                  disabled={activeSection === 0}
                  className="flex items-center gap-2 text-sm font-medium text-[#4A4A5C] hover:text-[#2D2A33] disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ArrowBack className="w-4 h-4" />
                  {isRTL ? 'القسم السابق' : 'Previous Section'}
                </button>
                <span className="text-xs text-[#4A4A5C] opacity-60">
                  {activeSection + 1} / {totalSections}
                </span>
                <button
                  onClick={() => {
                    if (activeSection < totalSections - 1) changeSection(activeSection + 1);
                  }}
                  disabled={activeSection >= totalSections - 1}
                  className="flex items-center gap-2 text-sm font-medium text-[#4A4A5C] hover:text-[#2D2A33] disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  {isRTL ? 'القسم التالي' : 'Next Section'}
                  {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      )}

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={<>Ready to Begin Your <span style={{ color: toolkit.color }}>Journey</span>?</>}
        headingAr={<>مستعدّ لبدء <span style={{ color: toolkit.color }}>رحلتك</span>؟</>}
        descEn="Start with a free 30-minute consultation to see how we can support you."
        descAr="ابدأ باستشارة مجّانيّة لمدّة ٣٠ دقيقة لتتعرّف على كيفيّة دعمنا لك."
        primaryTextEn="Book a Session"
        primaryTextAr="احجز جلسة"
        secondaryTextEn="Learn More"
        secondaryTextAr="اعرف المزيد"
        secondaryHref={`/${locale}/resources`}
      />
    </div>
  );
}
