'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown, Send, Sparkles, Video, Users, TreePine, Palette, HeartHandshake } from 'lucide-react';
import type { SmartEvent, EventType } from '@/types';
import Badge from '@/components/ui/Badge';
import { getEventTypeLabel } from '@/data/events';

/* ── Per-type visual identity (inline styles to avoid Tailwind purge) ── */
interface TypeAccent {
  borderColor: string;
  bgColor: string;
  stripColor: string;
  scenarioBorderColor: string;
  icon: React.ReactNode;
}

const typeAccent: Record<EventType, TypeAccent> = {
  workshop:              { borderColor: 'rgba(200,169,125,0.25)', bgColor: '#FAF5ED', stripColor: '#C8A97D', scenarioBorderColor: 'rgba(200,169,125,0.4)', icon: <Palette className="w-4 h-4 text-[#C8A97D]" /> },
  webinar:               { borderColor: 'rgba(122,59,94,0.18)',   bgColor: '#F8EEF3', stripColor: '#7A3B5E', scenarioBorderColor: 'rgba(122,59,94,0.35)', icon: <Video className="w-4 h-4 text-[#7A3B5E]" /> },
  'community-gathering': { borderColor: 'rgba(59,138,110,0.18)',  bgColor: '#E8F5EE', stripColor: '#3B8A6E', scenarioBorderColor: 'rgba(59,138,110,0.4)',  icon: <Users className="w-4 h-4 text-[#3B8A6E]" /> },
  retreat:               { borderColor: 'rgba(91,143,168,0.22)',  bgColor: '#E0EEF5', stripColor: '#5B8FA8', scenarioBorderColor: 'rgba(91,143,168,0.4)',  icon: <TreePine className="w-4 h-4 text-[#5B8FA8]" /> },
  'support-group':       { borderColor: 'rgba(196,135,138,0.25)', bgColor: '#F5E8EC', stripColor: '#C4878A', scenarioBorderColor: 'rgba(196,135,138,0.4)', icon: <HeartHandshake className="w-4 h-4 text-[#C4878A]" /> },
};

/** Audience-based overrides for same-type differentiation */
const audienceOverrides: Partial<Record<string, Partial<TypeAccent>>> = {
  families: { borderColor: 'rgba(122,59,94,0.18)', bgColor: '#F8F0F5', stripColor: '#9B5E7A', scenarioBorderColor: 'rgba(122,59,94,0.3)' },
  couples:  { borderColor: 'rgba(212,131,106,0.2)', bgColor: '#FEF3EE', stripColor: '#D4836A', scenarioBorderColor: 'rgba(212,131,106,0.35)' },
  youth:    { borderColor: 'rgba(59,138,110,0.18)', bgColor: '#EFF5F0', stripColor: '#4A9B7E', scenarioBorderColor: 'rgba(59,138,110,0.3)' },
};

/** Slug-specific overrides so individual events in the same (type, audience) bucket still look distinct. */
const slugOverrides: Partial<Record<string, Partial<TypeAccent>>> = {
  'bicultural-teen-identity':        { bgColor: '#F5EFDF', stripColor: '#C8A97D', borderColor: 'rgba(200,169,125,0.25)', scenarioBorderColor: 'rgba(200,169,125,0.4)' },  // Gold
  'teen-anxiety-pressure-cooker':    { bgColor: '#E0EEF5', stripColor: '#5B8FA8', borderColor: 'rgba(91,143,168,0.22)', scenarioBorderColor: 'rgba(91,143,168,0.4)' },   // Slate blue
  'comparison-trap-social-media':    { bgColor: '#F5E8EC', stripColor: '#C4878A', borderColor: 'rgba(196,135,138,0.25)', scenarioBorderColor: 'rgba(196,135,138,0.4)' }, // Warm rose
  'family-expectations-personal-dreams': { bgColor: '#F0E8F2', stripColor: '#7A3B5E', borderColor: 'rgba(122,59,94,0.18)', scenarioBorderColor: 'rgba(122,59,94,0.35)' }, // Plum
  'when-friendship-hurts':           { bgColor: '#EFF5F0', stripColor: '#4A9B7E', borderColor: 'rgba(74,155,126,0.22)', scenarioBorderColor: 'rgba(74,155,126,0.4)' },    // Sage green
  // Past event palette (muted, archival warmth)
  'living-room-mothers-circle-feb-2025':  { bgColor: '#F5EDE4', stripColor: '#B08B6E', borderColor: 'rgba(176,139,110,0.22)', scenarioBorderColor: 'rgba(176,139,110,0.4)' },  // Warm terracotta
  'grow-with-me-plant-therapy-nov-2024':  { bgColor: '#E8F0E4', stripColor: '#6B9A5B', borderColor: 'rgba(107,154,91,0.22)', scenarioBorderColor: 'rgba(107,154,91,0.4)' },    // Leaf green
  'ramadan-mothers-reflection-mar-2025':  { bgColor: '#F0E8DC', stripColor: '#8B6B4A', borderColor: 'rgba(139,107,74,0.22)', scenarioBorderColor: 'rgba(139,107,74,0.4)' },    // Deep sand
  'rooted-garden-mindfulness-aug-2024':   { bgColor: '#EEF2E5', stripColor: '#85A063', borderColor: 'rgba(133,160,99,0.22)', scenarioBorderColor: 'rgba(133,160,99,0.4)' },    // Olive
  'grow-with-me-winter-edition-jan-2025': { bgColor: '#E8EDF2', stripColor: '#6B85A0', borderColor: 'rgba(107,133,160,0.22)', scenarioBorderColor: 'rgba(107,133,160,0.4)' },  // Winter slate
};

function getAccent(event: SmartEvent): TypeAccent {
  const base = typeAccent[event.type] || typeAccent.workshop;
  let merged = base;
  if ((event.type === 'workshop' || event.type === 'webinar') && event.audiences?.length) {
    const override = audienceOverrides[event.audiences[0]];
    if (override) merged = { ...merged, ...override };
  }
  const slugOverride = slugOverrides[event.slug];
  if (slugOverride) merged = { ...merged, ...slugOverride };
  return merged;
}

interface Props {
  event: SmartEvent;
  locale: string;
  pulseCount: number;
  onResonate: (slug: string) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const MILESTONES = [
  { threshold: 10, en: 'Growing interest', ar: 'اهتمامٌ متزايد' },
  { threshold: 25, en: 'Community momentum', ar: 'زخمٌ مجتمعيّ' },
  { threshold: 50, en: 'Dr. Hala is taking notice', ar: 'د. هالة تلاحظ' },
  { threshold: 100, en: 'This is happening', ar: 'هذا سيحدث' },
];

function getMilestone(count: number, isRTL: boolean): string | null {
  for (let i = MILESTONES.length - 1; i >= 0; i--) {
    if (count >= MILESTONES[i].threshold) return isRTL ? MILESTONES[i].ar : MILESTONES[i].en;
  }
  return null;
}

function getNextMilestone(count: number, isRTL: boolean): { remaining: number; label: string } | null {
  for (const m of MILESTONES) {
    if (count < m.threshold) {
      return { remaining: m.threshold - count, label: isRTL ? m.ar : m.en };
    }
  }
  return null;
}

export default function PulseCard({ event, locale, pulseCount, onResonate, isExpanded: externalExpanded, onToggleExpand }: Props) {
  const isRTL = locale === 'ar';
  const [hasVoted, setHasVoted] = useState(false);
  const [internalExpanded, setInternalExpanded] = useState(false);
  const expanded = onToggleExpand ? (externalExpanded ?? false) : internalExpanded;
  const toggleExpand = onToggleExpand ?? (() => setInternalExpanded(!internalExpanded));
  const [showNotify, setShowNotify] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifySent, setNotifySent] = useState(false);
  const [animatePulse, setAnimatePulse] = useState(false);

  const title = isRTL ? event.titleAr : event.titleEn;
  const scenario = isRTL ? event.scenarioAr : event.scenarioEn;
  const description = isRTL ? event.descriptionAr : event.descriptionEn;
  const outcomes = isRTL ? event.outcomesAr : event.outcomesEn;
  const audienceDesc = isRTL ? event.audienceDescAr : event.audienceDescEn;
  const feeDisplay = isRTL ? event.feeDisplayAr : event.feeDisplayEn;
  const formatDesc = isRTL ? event.formatDescAr : event.formatDescEn;
  const typeLabel = getEventTypeLabel(event.type, isRTL);
  const milestone = getMilestone(pulseCount, isRTL);
  const nextMilestone = getNextMilestone(pulseCount, isRTL);

  // Check localStorage for previous vote
  useEffect(() => {
    const voted = localStorage.getItem(`pulse:${event.slug}`);
    if (voted) setHasVoted(true);
  }, [event.slug]);

  const handleResonate = () => {
    if (hasVoted) return;
    setHasVoted(true);
    setAnimatePulse(true);
    localStorage.setItem(`pulse:${event.slug}`, '1');
    onResonate(event.slug);
    // Show notify prompt after a beat
    setTimeout(() => {
      setShowNotify(true);
      setAnimatePulse(false);
    }, 800);
  };

  const handleNotify = async () => {
    if (!notifyEmail.includes('@')) return;
    try {
      await fetch('/api/events/pulse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: event.slug, action: 'notify', email: notifyEmail }),
      });
      setNotifySent(true);
    } catch { /* silent */ }
  };

  // Progress bar — shows progress toward NEXT milestone
  const currentMilestoneIdx = MILESTONES.findLastIndex((m) => pulseCount >= m.threshold);
  const prevThreshold = currentMilestoneIdx >= 0 ? MILESTONES[currentMilestoneIdx].threshold : 0;
  const nextThreshold = currentMilestoneIdx < MILESTONES.length - 1 ? MILESTONES[currentMilestoneIdx + 1].threshold : MILESTONES[MILESTONES.length - 1].threshold;
  const progressPercent = pulseCount >= nextThreshold ? 100 : Math.min(((pulseCount - prevThreshold) / (nextThreshold - prevThreshold)) * 100, 100);

  const accent = getAccent(event);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden hover:shadow-[var(--shadow-card)] transition-shadow duration-300"
      style={{ border: `1px solid ${accent.borderColor}` }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Color strip at top */}
      <div className="h-1.5" style={{ backgroundColor: accent.stripColor }} />

      <div className="p-6 sm:p-8" style={{ backgroundColor: accent.bgColor }}>
        {/* Type icon + label header */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: accent.bgColor, border: `1px solid ${accent.borderColor}` }}
          >
            {accent.icon}
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8E8E9F]">{typeLabel}</span>
          {event.isFree && <Badge variant="success" size="sm">{isRTL ? 'مجّانيّ' : 'Free'}</Badge>}
          {event.locationType === 'online' && <Badge variant="sand" size="sm">{isRTL ? 'عبر الإنترنت' : 'Online'}</Badge>}
          {event.locationType === 'in-person' && <Badge variant="neutral" size="sm">{isRTL ? 'حضوريّ' : 'In Person'}</Badge>}
          {milestone && (
            <Badge variant="plum" size="sm">
              <Sparkles className="w-3 h-3 mr-1" />
              {milestone}
            </Badge>
          )}
        </div>

        {/* Scenario hook */}
        {scenario && (
          <div
            className={`mb-5 ${isRTL ? 'pr-4' : 'pl-4'}`}
            style={{ [isRTL ? 'borderRight' : 'borderLeft']: `3px solid ${accent.scenarioBorderColor}` }}
          >
            <p className="text-[15px] italic text-[#4A4A5C] leading-relaxed">
              &ldquo;{scenario}&rdquo;
            </p>
          </div>
        )}

        {/* Title */}
        <h3
          className="text-xl sm:text-2xl font-bold text-[#2D2A33] mb-5"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h3>

        {/* Interest bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#8E8E9F]">
              {isRTL ? 'اهتمامُ المجتمع' : 'Community interest'}
            </span>
            <span className="text-xs font-semibold text-[#7A3B5E]">
              {isRTL
                ? pulseCount === 1 ? 'شخصٌ واحدٌ يتفاعل' : pulseCount === 2 ? 'شخصان يتفاعلان' : `${pulseCount} ${pulseCount <= 10 ? 'أشخاصٍ يتفاعلون' : 'شخصًا يتفاعل'}`
                : `${pulseCount} ${pulseCount === 1 ? 'person resonates' : 'people resonate'}`}
            </span>
          </div>
          <div className="h-2 bg-[#F3EFE8] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#C4878A] to-[#7A3B5E]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Next milestone hint */}
        {nextMilestone && pulseCount > 0 && (
          <p className="text-[11px] text-[#8E8E9F] -mt-3 mb-4">
            {isRTL
              ? `${nextMilestone.remaining} صوتًا آخر للوصولِ إلى "${nextMilestone.label}"`
              : `${nextMilestone.remaining} more voice${nextMilestone.remaining !== 1 ? 's' : ''} to reach "${nextMilestone.label}"`}
          </p>
        )}

        {/* Voter position — shown after voting */}
        {hasVoted && (
          <p className="text-[11px] text-[#7A3B5E]/60 -mt-3 mb-4 font-medium">
            {isRTL ? `كنتَ الصّوتَ رقم #${pulseCount}` : `You were voice #${pulseCount}`}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            type="button"
            onClick={handleResonate}
            disabled={hasVoted}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              hasVoted
                ? 'bg-[#7A3B5E]/10 text-[#7A3B5E] cursor-default'
                : 'bg-[#7A3B5E] text-white hover:bg-[#5E2D48] active:scale-[0.97]'
            }`}
            whileTap={!hasVoted ? { scale: 0.95 } : undefined}
          >
            <motion.span
              animate={animatePulse ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Heart className={`w-4 h-4 ${hasVoted ? 'fill-[#7A3B5E]' : ''}`} />
            </motion.span>
            {hasVoted
              ? (isRTL ? 'شكرًا لتفاعلك' : 'Thanks for sharing')
              : (isRTL ? 'هذا يعنيني' : 'This Resonates')}
          </motion.button>

          <button
            type="button"
            onClick={toggleExpand}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium text-[#6B6580] hover:bg-[#F9F7F3] transition-colors"
          >
            {isRTL ? 'اعرِفْ المزيد' : 'Learn More'}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Notify Me — appears after voting */}
        <AnimatePresence>
          {showNotify && !notifySent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-[#F3EFE8]">
                <p className="text-sm text-[#6B6580] mb-3">
                  {isRTL ? 'تريدُ أن تعرفَ متى يحدثُ هذا؟ اتركْ بريدَك.' : 'Want to know when this happens? Drop your email.'}
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder={isRTL ? 'بريدُك الإلكترونيّ' : 'Your email'}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C8A97D] focus:ring-2 focus:ring-[#C8A97D]/10"
                  />
                  <button
                    type="button"
                    onClick={handleNotify}
                    disabled={!notifyEmail.includes('@')}
                    className="px-4 py-2.5 rounded-xl bg-[#C8A97D] text-white text-sm font-semibold hover:bg-[#B08D5E] transition-colors disabled:opacity-40"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {notifySent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-5 pt-5 border-t border-[#F3EFE8]"
            >
              <p className="text-sm text-[#3B8A6E] font-medium">
                {isRTL ? 'تمّ — سنُعلمُك عندما يكونُ جاهزًا.' : "Done — we'll let you know when it's ready."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expandable structured detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-[#F3EFE8] space-y-5">
                {/* Description */}
                <p className="text-sm text-[#4A4A5C] leading-relaxed">{description}</p>

                {/* Outcomes */}
                {outcomes && outcomes.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-[#C8A97D] mb-2.5">
                      {isRTL ? 'ثمرة حضورك' : 'What You\'ll Walk Away With'}
                    </h4>
                    <ul className="space-y-1.5">
                      {outcomes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#4A4A5C]">
                          <span className="text-[#3B8A6E] mt-0.5 flex-shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Info grid: Audience + Format + Fee */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {audienceDesc && (
                    <div className="bg-white/80 rounded-xl p-3.5 border border-[#F3EFE8]">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-1">{isRTL ? 'لِمَن' : 'Who It\'s For'}</p>
                      <p className="text-sm text-[#2D2A33] font-medium">{audienceDesc}</p>
                    </div>
                  )}
                  {formatDesc && (
                    <div className="bg-white/80 rounded-xl p-3.5 border border-[#F3EFE8]">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-1">{isRTL ? 'الصّيغة' : 'Format'}</p>
                      <p className="text-sm text-[#2D2A33] font-medium">{formatDesc}</p>
                    </div>
                  )}
                  {feeDisplay && (
                    <div className="bg-white/80 rounded-xl p-3.5 border border-[#F3EFE8]">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] mb-1">{isRTL ? 'الرّسوم المتوقّعة' : 'Expected Fee'}</p>
                      <p className="text-sm text-[#2D2A33] font-bold">{feeDisplay}</p>
                    </div>
                  )}
                </div>

                {/* Facilitator */}
                {event.facilitator && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7A3B5E]/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-[#7A3B5E]">
                        {(isRTL ? event.facilitator.nameAr : event.facilitator.nameEn).charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2D2A33]">
                        {isRTL ? event.facilitator.nameAr : event.facilitator.nameEn}
                      </p>
                      <p className="text-xs text-[#8E8E9F]">
                        {isRTL ? event.facilitator.titleAr : event.facilitator.titleEn}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
