'use client';

/* ================================================================
   FeaturedSummerCard — purpose-built premium card for the
   Summer 2026 Flagship Programs section.

   Features:
   - Gender-distinct color themes (girls = warm rose, boys = deep sage)
   - Scenario hook as a dramatic pull quote
   - Community interest bar (pulse voting, like PulseCard)
   - "I'm Interested" primary CTA (opens registration modal)
   - "Learn More" secondary CTA (expandable rich details panel with
     outcomes, who it's for, facilitator, what to bring, FAQs)
   - "Inquire" tertiary CTA → links to /contact page
   - Full EN/AR bilingual with RTL support
   ================================================================ */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Compass,
  Flame,
  MessageCircle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Clock,
  CalendarDays,
  MapPin,
  Users,
  Video,
  Home,
  Venus,
  Mars,
} from 'lucide-react';
import type { SmartEvent } from '@/types';
import EventRegistrationModal from './EventRegistrationModal';

interface Props {
  event: SmartEvent;
  locale: string;
  pulseCount: number;
  onResonate: (slug: string) => void;
}

/* ── Gender-distinct theme system ─────────────────────────────── */
interface SummerTheme {
  primary: string;       // main accent color
  primaryDark: string;   // darker variant for gradients
  primarySoft: string;   // soft tint for backgrounds
  heroBg: string;        // hero area background gradient
  border: string;        // card border
  icon: React.ReactNode; // hero watermark icon (large decorative)
  genderIcon: React.ReactNode; // small icon used in the age badge
  ringFrom: string;      // interest bar gradient start
  ringTo: string;        // interest bar gradient end
  ageLabelEn: string;    // gendered age label
  ageLabelAr: string;
}

const girlsTheme: SummerTheme = {
  primary: '#C4878A',       // warm rose
  primaryDark: '#9B5E7A',   // deep mauve
  primarySoft: '#F8EEF1',   // blush
  heroBg: 'linear-gradient(135deg, #F8EEF1 0%, #F0D9E0 45%, #E8C4D0 100%)',
  border: '#C4878A40',
  icon: <Compass className="w-full h-full" />,
  genderIcon: <Venus className="w-3 h-3" />,
  ringFrom: '#C4878A',
  ringTo: '#9B5E7A',
  ageLabelEn: 'Girls 12–19',
  ageLabelAr: 'فَتَيات ١٢–١٩',
};

const boysTheme: SummerTheme = {
  primary: '#5A8B6F',       // deep sage
  primaryDark: '#3B6B50',   // forest
  primarySoft: '#EEF5F0',   // mint wash
  heroBg: 'linear-gradient(135deg, #EEF5F0 0%, #D5E8DC 45%, #B8D5C2 100%)',
  border: '#5A8B6F40',
  icon: <Flame className="w-full h-full" />,
  genderIcon: <Mars className="w-3 h-3" />,
  ringFrom: '#5A8B6F',
  ringTo: '#3B6B50',
  ageLabelEn: 'Boys 12–19',
  ageLabelAr: 'فِتْيان ١٢–١٩',
};

/* ── Pulse milestones (shared with PulseCard) ──────────────────── */
const MILESTONES = [
  { threshold: 10, en: 'Growing interest', ar: 'اهتمامٌ مُتَزايِد' },
  { threshold: 25, en: 'Community momentum', ar: 'زَخْمٌ مُجْتَمَعِيّ' },
  { threshold: 50, en: 'Our team is taking notice', ar: 'فريقنا يُلاحِظ' },
  { threshold: 100, en: 'This is happening', ar: 'هذا سَيَحْدُث' },
];

function getNextMilestone(count: number, isRTL: boolean): { remaining: number; label: string } | null {
  for (const m of MILESTONES) {
    if (count < m.threshold) {
      return { remaining: m.threshold - count, label: isRTL ? m.ar : m.en };
    }
  }
  return null;
}

type LearnSection = 'story' | 'outcomes' | 'who' | 'format' | 'faqs';

export default function FeaturedSummerCard({ event, locale, pulseCount, onResonate }: Props) {
  const isRTL = locale === 'ar';
  const [hasVoted, setHasVoted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<LearnSection>('outcomes');
  const [showModal, setShowModal] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);

  // Detect gender theme from tags
  const isGirls = event.tags?.includes('girls') ?? false;
  const theme = isGirls ? girlsTheme : boysTheme;

  const title = isRTL ? event.titleAr : event.titleEn;
  const scenario = isRTL ? event.scenarioAr : event.scenarioEn;
  const description = isRTL ? event.descriptionAr : event.descriptionEn;
  const longDescription = isRTL ? event.longDescriptionAr : event.longDescriptionEn;
  const outcomes = isRTL ? event.outcomesAr : event.outcomesEn;
  const whatToBring = isRTL ? event.whatToBringAr : event.whatToBringEn;
  const audienceDesc = isRTL ? event.audienceDescAr : event.audienceDescEn;
  const formatDesc = isRTL ? event.formatDescAr : event.formatDescEn;
  const facilitator = event.facilitator;
  const facilitatorName = isRTL ? facilitator?.nameAr : facilitator?.nameEn;
  const facilitatorTitle = isRTL ? facilitator?.titleAr : facilitator?.titleEn;

  // Check localStorage for previous vote
  useEffect(() => {
    const voted = localStorage.getItem(`pulse:${event.slug}`);
    if (voted) setHasVoted(true);
  }, [event.slug]);

  // Auto-expand Learn More if user navigated via #slug anchor (e.g. from "Picked for You")
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash === `#${event.slug}`) {
      setExpanded(true);
    }
  }, [event.slug]);

  const handleResonate = () => {
    if (hasVoted) return;
    setHasVoted(true);
    setAnimateHeart(true);
    localStorage.setItem(`pulse:${event.slug}`, '1');
    onResonate(event.slug);
    setTimeout(() => setAnimateHeart(false), 800);
  };

  // Progress bar — shows progress toward NEXT milestone
  const currentMilestoneIdx = MILESTONES.findLastIndex((m) => pulseCount >= m.threshold);
  const prevThreshold = currentMilestoneIdx >= 0 ? MILESTONES[currentMilestoneIdx].threshold : 0;
  const nextThreshold =
    currentMilestoneIdx < MILESTONES.length - 1
      ? MILESTONES[currentMilestoneIdx + 1].threshold
      : MILESTONES[MILESTONES.length - 1].threshold;
  const progressPercent =
    pulseCount >= nextThreshold
      ? 100
      : Math.min(((pulseCount - prevThreshold) / (nextThreshold - prevThreshold)) * 100, 100);

  const nextMilestone = getNextMilestone(pulseCount, isRTL);

  // Hook headline — creative label above the scenario, differs by program
  const hookLabel = isGirls
    ? isRTL
      ? 'هَمْسٌ لا يَسْمَعُهُ أَحَد'
      : "A Whisper Nobody Hears"
    : isRTL
      ? 'خَريطَةٌ لا أَحَدَ أَعْطاها لَه'
      : "A Map Nobody Gave Him";

  return (
    <motion.div
      id={event.slug}
      className="relative rounded-3xl overflow-hidden bg-white flex flex-col scroll-mt-24"
      style={{
        border: `2px solid ${theme.border}`,
        boxShadow: `0 12px 48px ${theme.primary}18, 0 4px 16px rgba(0,0,0,0.04)`,
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── FEATURED RIBBON (top-right) ─────────────────────────── */}
      <div
        className={`absolute top-5 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md ${
          isRTL ? 'left-5' : 'right-5'
        }`}
        style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
        }}
      >
        <Sparkles className="w-2.5 h-2.5" />
        {isRTL ? 'مُمَيَّز' : 'Featured'}
      </div>

      {/* ── HERO VISUAL AREA (with theme gradient + large decorative icon) ── */}
      <div
        className="relative px-6 pt-8 pb-14 overflow-hidden"
        style={{ background: theme.heroBg }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, ${theme.primaryDark} 0.8px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Gendered age badge */}
        <div
          className={`relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-4 ${
            isRTL ? 'flex-row-reverse' : ''
          }`}
          style={{
            backgroundColor: 'rgba(255,255,255,0.75)',
            color: theme.primaryDark,
            border: `1px solid ${theme.primary}30`,
          }}
        >
          {theme.genderIcon}
          {isRTL ? theme.ageLabelAr : theme.ageLabelEn}
        </div>

        {/* Large decorative icon floating on the right */}
        <div
          className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} w-20 h-20 opacity-[0.18]`}
          style={{ color: theme.primaryDark }}
          aria-hidden="true"
        >
          {theme.icon}
        </div>

        {/* Hook label */}
        <p
          className="relative text-[11px] font-bold uppercase tracking-[0.2em] mb-2"
          style={{ color: theme.primaryDark }}
        >
          {hookLabel}
        </p>

        {/* Title */}
        <h3
          className="relative text-2xl sm:text-[26px] font-bold leading-tight text-[#2D2A33] mb-1"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h3>
      </div>

      {/* ── SCENARIO PULL QUOTE (overlaps hero bottom) ─────────────── */}
      {scenario && (
        <div className="px-6 -mt-8 relative z-10">
          <blockquote
            className="bg-white rounded-2xl p-5 shadow-[var(--shadow-card)] border-s-4"
            style={{ borderColor: theme.primary }}
          >
            <p className="text-sm text-[#4A4A5C] leading-relaxed italic">
              &ldquo;{scenario}&rdquo;
            </p>
          </blockquote>
        </div>
      )}

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <div className="px-6 pt-5 pb-6 flex-1 flex flex-col">
        {/* Description */}
        <p className="text-sm text-[#4A4A5C] leading-relaxed mb-5">{description}</p>

        {/* Dual-format chips — clearly shows both Online + In-Person */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: 'white',
              color: theme.primaryDark,
              border: `1.5px solid ${theme.primary}40`,
            }}
          >
            <Video className="w-3 h-3" />
            {isRTL ? 'عَبْرَ الإنْتَرْنِت' : 'Online'}
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E9F]"
            style={{ color: `${theme.primary}80` }}
          >
            +
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: 'white',
              color: theme.primaryDark,
              border: `1.5px solid ${theme.primary}40`,
            }}
          >
            <Home className="w-3 h-3" />
            {isRTL ? 'حُضورِيّ' : 'In-Person'}
          </span>
        </div>

        {/* Quick-facts strip — Length + Invest */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div
            className="rounded-xl p-3 text-center"
            style={{ backgroundColor: theme.primarySoft, border: `1px solid ${theme.primary}20` }}
          >
            <div className="text-[9px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-0.5">
              {isRTL ? 'المُدَّة' : 'Length'}
            </div>
            <div className="text-xs font-bold text-[#2D2A33]">
              {isRTL ? '٤ أَسابيع' : '4 weeks'}
            </div>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{ backgroundColor: theme.primarySoft, border: `1px solid ${theme.primary}20` }}
          >
            <div className="text-[9px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-0.5">
              {isRTL ? 'الاسْتِثْمار' : 'Invest'}
            </div>
            <div className="text-xs font-bold text-[#2D2A33]">$149 CAD</div>
          </div>
        </div>

        {/* Community interest bar */}
        <div
          className="rounded-xl p-4 mb-5"
          style={{
            backgroundColor: theme.primarySoft,
            border: `1px solid ${theme.primary}20`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: theme.primaryDark }}>
              {isRTL ? 'اهْتِمامُ المُجْتَمَع' : 'Community interest'}
            </span>
            <span className="text-[11px] font-semibold text-[#4A4A5C]">
              {isRTL
                ? pulseCount === 0
                  ? 'كوني الأولى'
                  : pulseCount === 1
                    ? 'صَوْتٌ واحِد'
                    : `${pulseCount} أَصْواتٌ تَهْتَمّ`
                : pulseCount === 0
                  ? 'Be the first'
                  : pulseCount === 1
                    ? '1 person resonates'
                    : `${pulseCount} people resonate`}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${theme.primary}15` }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${theme.ringFrom}, ${theme.ringTo})`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          {nextMilestone && pulseCount > 0 && (
            <p className="text-[10px] text-[#8E8E9F] mt-2">
              {isRTL
                ? `${nextMilestone.remaining} صَوْتٌ لِلوُصولِ إلى "${nextMilestone.label}"`
                : `${nextMilestone.remaining} more ${
                    nextMilestone.remaining === 1 ? 'voice' : 'voices'
                  } to reach "${nextMilestone.label}"`}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 mb-2">
          {/* Primary: I'm Interested (opens registration modal) */}
          <button
            type="button"
            onClick={() => {
              handleResonate();
              setShowModal(true);
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-md transition-all hover:shadow-lg hover:opacity-95"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
            }}
          >
            <motion.span
              animate={animateHeart ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Heart className={`w-4 h-4 ${hasVoted ? 'fill-white' : ''}`} />
            </motion.span>
            {isRTL ? 'أَنا مُهْتَمّ' : "I'm Interested"}
          </button>

          {/* Secondary row: Learn More + Inquire */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors"
              style={{
                backgroundColor: 'white',
                color: theme.primaryDark,
                border: `1.5px solid ${theme.primary}40`,
              }}
              aria-expanded={expanded}
            >
              <BookOpen className="w-3.5 h-3.5" />
              {expanded
                ? (isRTL ? 'أَقَلّ' : 'Show Less')
                : (isRTL ? 'اِعْرِفي أَكْثَر' : 'Learn More')}
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <Link
              href={`/${locale}/contact?subject=${encodeURIComponent(title)}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors hover:bg-[#FAF7F2]"
              style={{
                backgroundColor: 'white',
                color: theme.primaryDark,
                border: `1.5px solid ${theme.primary}40`,
              }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              {isRTL ? 'اِسْتِفْسار' : 'Inquire'}
            </Link>
          </div>
        </div>
      </div>

      {/* ── LEARN MORE PANEL — tabbed accordion (one section at a time) ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            style={{ borderTop: `1px solid ${theme.primary}20` }}
          >
            <div className="px-6 py-5" style={{ backgroundColor: theme.primarySoft }}>
              {/* Section tabs — compact pill row */}
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                {([
                  { key: 'outcomes', en: 'What You Get', ar: 'ثَمَرَةُ حُضورِك' },
                  { key: 'story', en: 'The Story', ar: 'القِصَّة' },
                  { key: 'who', en: "Who It's For", ar: 'لِمَن' },
                  { key: 'format', en: 'Format', ar: 'الصّيغَة' },
                  { key: 'faqs', en: 'FAQs', ar: 'أَسْئِلَة' },
                ] as const).map((tab) => {
                  const isActive = activeSection === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveSection(tab.key)}
                      className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                      style={
                        isActive
                          ? {
                              background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                              color: 'white',
                              boxShadow: `0 2px 8px ${theme.primary}30`,
                            }
                          : {
                              backgroundColor: 'white',
                              color: theme.primaryDark,
                              border: `1px solid ${theme.primary}25`,
                            }
                      }
                    >
                      {isRTL ? tab.ar : tab.en}
                    </button>
                  );
                })}
              </div>

              {/* Active section content */}
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'white',
                  border: `1px solid ${theme.primary}25`,
                  minHeight: '120px',
                }}
              >
                {/* OUTCOMES — default/primary section ("ثَمَرَةُ حُضورِك") */}
                {activeSection === 'outcomes' && outcomes && outcomes.length > 0 && (
                  <>
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
                      style={{ color: theme.primaryDark }}
                    >
                      {isRTL ? 'ثَمَرَةُ حُضورِك' : "What You'll Leave With"}
                    </p>
                    <ul className="space-y-2">
                      {outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#2D2A33]">
                          <CheckCircle2
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: theme.primary }}
                          />
                          <span className="leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* STORY — short excerpt only (first 2 sentences) */}
                {activeSection === 'story' && (() => {
                  // Trim longDescription to first 2 sentences for a tight excerpt;
                  // fall back to plain description if no longDescription exists.
                  const source = longDescription || description;
                  const sentences = source.match(/[^.!?]+[.!?]+/g) || [source];
                  const excerpt = sentences.slice(0, 2).join(' ').trim();
                  return (
                    <>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
                        style={{ color: theme.primaryDark }}
                      >
                        {isRTL ? 'القِصَّة' : 'The Story'}
                      </p>
                      <p className="text-sm text-[#4A4A5C] leading-relaxed">{excerpt}</p>
                    </>
                  );
                })()}

                {/* WHO IT'S FOR — includes facilitator card */}
                {activeSection === 'who' && (
                  <div className="space-y-4">
                    {audienceDesc && (
                      <div>
                        <p
                          className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
                          style={{ color: theme.primaryDark }}
                        >
                          {isRTL ? 'لِمَنْ هذا البَرْنامَج' : "Who It's For"}
                        </p>
                        <p className="text-sm text-[#4A4A5C] leading-relaxed italic">{audienceDesc}</p>
                      </div>
                    )}
                    {facilitator && (
                      <div
                        className={`pt-3 border-t flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                        style={{ borderColor: `${theme.primary}20` }}
                      >
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                          }}
                        >
                          {facilitatorName?.charAt(0) || 'H'}
                        </div>
                        <div className={`min-w-0 ${isRTL ? 'text-right' : ''}`}>
                          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8E8E9F]">
                            {isRTL ? 'تَقودُها' : 'Led by'}
                          </p>
                          <p className="text-sm font-bold text-[#2D2A33] leading-tight">
                            {facilitatorName}
                          </p>
                          <p className="text-[11px] text-[#6B6580] leading-tight mt-0.5">
                            {isRTL ? 'مستشارة أسرية معتمدة' : 'Certified Family Counselor'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* FORMAT — concise icon-based bullets */}
                {activeSection === 'format' && (
                  <div className="space-y-4">
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
                        style={{ color: theme.primaryDark }}
                      >
                        {isRTL ? 'كَيْفَ يَسيرُ البَرْنامَج' : 'How It Runs'}
                      </p>
                      <ul className="space-y-2">
                        <li className={`flex items-center gap-2.5 text-sm text-[#2D2A33] ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                          <Video className="w-4 h-4 flex-shrink-0" style={{ color: theme.primary }} />
                          <span>{isRTL ? '٣ جَلَساتٍ عَبْرَ الإنْتَرْنِت · ٩٠ دَقيقَة' : '3 online sessions · 90 min each'}</span>
                        </li>
                        <li className={`flex items-center gap-2.5 text-sm text-[#2D2A33] ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                          <Home className="w-4 h-4 flex-shrink-0" style={{ color: theme.primary }} />
                          <span>{isRTL ? 'يَوْمٌ كامِلٌ حُضورِيّ في أوتاوا' : '1 full-day retreat in Ottawa'}</span>
                        </li>
                        <li className={`flex items-center gap-2.5 text-sm text-[#2D2A33] ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                          <Users className="w-4 h-4 flex-shrink-0" style={{ color: theme.primary }} />
                          <span>{isRTL ? 'دائِرَةٌ صَغيرَة · ١٠ كَحَدٍّ أَقْصى' : 'Small circle · max 10'}</span>
                        </li>
                        <li className={`flex items-center gap-2.5 text-sm text-[#2D2A33] ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                          <Clock className="w-4 h-4 flex-shrink-0" style={{ color: theme.primary }} />
                          <span>{isRTL ? 'وُصولٌ دائِمٌ لِلتَّسْجيلات' : 'Lifetime access to recordings'}</span>
                        </li>
                      </ul>
                    </div>
                    {whatToBring && whatToBring.length > 0 && (
                      <div
                        className="pt-3 border-t"
                        style={{ borderColor: `${theme.primary}20` }}
                      >
                        <p
                          className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
                          style={{ color: theme.primaryDark }}
                        >
                          {isRTL ? 'ما تُحْضِرينَهُ مَعَك' : 'What to Bring'}
                        </p>
                        <ul className="space-y-1">
                          {whatToBring.map((item, i) => (
                            <li key={i} className="text-xs text-[#4A4A5C] leading-relaxed">
                              · {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* FAQs */}
                {activeSection === 'faqs' && event.faqs && event.faqs.length > 0 && (
                  <>
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
                      style={{ color: theme.primaryDark }}
                    >
                      {isRTL ? 'أَسْئِلَةٌ شائِعَة' : 'Common Questions'}
                    </p>
                    <div className="space-y-3">
                      {event.faqs.map((faq, i) => (
                        <div key={i}>
                          <p className="text-xs font-bold text-[#2D2A33] mb-1">
                            {isRTL ? faq.questionAr : faq.questionEn}
                          </p>
                          <p className="text-xs text-[#4A4A5C] leading-relaxed">
                            {isRTL ? faq.answerAr : faq.answerEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration modal */}
      {event.registrationType === 'rsvp' && (
        <EventRegistrationModal
          event={event}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          locale={locale}
        />
      )}
    </motion.div>
  );
}
