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
  icon: React.ReactNode; // hero icon
  ringFrom: string;      // interest bar gradient start
  ringTo: string;        // interest bar gradient end
}

const girlsTheme: SummerTheme = {
  primary: '#C4878A',       // warm rose
  primaryDark: '#9B5E7A',   // deep mauve
  primarySoft: '#F8EEF1',   // blush
  heroBg: 'linear-gradient(135deg, #F8EEF1 0%, #F0D9E0 45%, #E8C4D0 100%)',
  border: '#C4878A40',
  icon: <Compass className="w-full h-full" />,
  ringFrom: '#C4878A',
  ringTo: '#9B5E7A',
};

const boysTheme: SummerTheme = {
  primary: '#5A8B6F',       // deep sage
  primaryDark: '#3B6B50',   // forest
  primarySoft: '#EEF5F0',   // mint wash
  heroBg: 'linear-gradient(135deg, #EEF5F0 0%, #D5E8DC 45%, #B8D5C2 100%)',
  border: '#5A8B6F40',
  icon: <Flame className="w-full h-full" />,
  ringFrom: '#5A8B6F',
  ringTo: '#3B6B50',
};

/* ── Pulse milestones (shared with PulseCard) ──────────────────── */
const MILESTONES = [
  { threshold: 10, en: 'Growing interest', ar: 'اهتمامٌ مُتَزايِد' },
  { threshold: 25, en: 'Community momentum', ar: 'زَخْمٌ مُجْتَمَعِيّ' },
  { threshold: 50, en: 'Dr. Hala is taking notice', ar: 'د. هالَة تُلاحِظ' },
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

export default function FeaturedSummerCard({ event, locale, pulseCount, onResonate }: Props) {
  const isRTL = locale === 'ar';
  const [hasVoted, setHasVoted] = useState(false);
  const [expanded, setExpanded] = useState(false);
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
      className="relative rounded-3xl overflow-hidden bg-white flex flex-col"
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

        {/* Age badge */}
        <div
          className={`relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-4 ${
            isRTL ? 'flex-row-reverse' : ''
          }`}
          style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            color: theme.primaryDark,
            border: `1px solid ${theme.primary}30`,
          }}
        >
          <Users className="w-3 h-3" />
          {isRTL ? 'للأَعْمارِ ١٢–١٩' : 'Ages 12–19'}
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
            className="bg-white rounded-2xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border-s-4"
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

        {/* Quick-facts strip */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div
            className="rounded-xl p-3 text-center"
            style={{ backgroundColor: theme.primarySoft, border: `1px solid ${theme.primary}20` }}
          >
            <div className="text-[9px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-0.5">
              {isRTL ? 'الصّيغة' : 'Format'}
            </div>
            <div className="text-xs font-bold text-[#2D2A33]">
              {isRTL ? 'هَجين' : 'Hybrid'}
            </div>
          </div>
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

      {/* ── EXPANDABLE LEARN MORE PANEL ─────────────────────────── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            style={{ borderTop: `1px solid ${theme.primary}20` }}
          >
            <div
              className="px-6 py-6 space-y-6"
              style={{ backgroundColor: theme.primarySoft }}
            >
              {/* Long description / narrative */}
              {longDescription && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: theme.primaryDark }}>
                    {isRTL ? 'القِصَّةُ الكامِلَة' : 'The Full Story'}
                  </p>
                  <p className="text-sm text-[#4A4A5C] leading-relaxed whitespace-pre-line">
                    {longDescription}
                  </p>
                </div>
              )}

              {/* Outcomes — what you'll leave with */}
              {outcomes && outcomes.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: theme.primaryDark }}>
                    {isRTL ? 'ما سَتَخْرُجينَ بِه' : "What You'll Leave With"}
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
                </div>
              )}

              {/* Who it's for */}
              {audienceDesc && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: theme.primaryDark }}>
                    {isRTL ? 'لِمَنْ هذا البَرْنامَج' : "Who It's For"}
                  </p>
                  <p className="text-sm text-[#4A4A5C] leading-relaxed italic">
                    {audienceDesc}
                  </p>
                </div>
              )}

              {/* Format */}
              {formatDesc && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: theme.primaryDark }}>
                    {isRTL ? 'الصّيغَة' : 'Format'}
                  </p>
                  <div className="flex items-start gap-2.5 text-sm text-[#4A4A5C]">
                    <Clock
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: theme.primary }}
                    />
                    <span className="leading-relaxed">{formatDesc}</span>
                  </div>
                </div>
              )}

              {/* What to bring */}
              {whatToBring && whatToBring.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: theme.primaryDark }}>
                    {isRTL ? 'ما تُحْضِرينَهُ مَعَك' : 'What to Bring'}
                  </p>
                  <ul className="space-y-1.5">
                    {whatToBring.map((item, i) => (
                      <li key={i} className="text-sm text-[#4A4A5C] leading-relaxed">
                        · {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Facilitator */}
              {facilitator && (
                <div
                  className="rounded-xl p-4 flex items-center gap-3"
                  style={{
                    backgroundColor: 'white',
                    border: `1px solid ${theme.primary}25`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                    }}
                  >
                    {facilitatorName?.charAt(0) || 'H'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8E8E9F]">
                      {isRTL ? 'تَقودُها' : 'Led by'}
                    </p>
                    <p className="text-sm font-bold text-[#2D2A33] leading-tight">{facilitatorName}</p>
                    <p className="text-[11px] text-[#6B6580] leading-tight mt-0.5">{facilitatorTitle}</p>
                  </div>
                </div>
              )}

              {/* FAQs */}
              {event.faqs && event.faqs.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: theme.primaryDark }}>
                    {isRTL ? 'أَسْئِلَةٌ شائِعَة' : 'Common Questions'}
                  </p>
                  <div className="space-y-3">
                    {event.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="rounded-xl p-3.5"
                        style={{
                          backgroundColor: 'white',
                          border: `1px solid ${theme.primary}20`,
                        }}
                      >
                        <p className="text-xs font-bold text-[#2D2A33] mb-1.5">
                          {isRTL ? faq.questionAr : faq.questionEn}
                        </p>
                        <p className="text-xs text-[#4A4A5C] leading-relaxed">
                          {isRTL ? faq.answerAr : faq.answerEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
