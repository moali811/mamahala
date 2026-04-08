'use client';
/* ================================================================
   JourneyBlock — an inline, one-scene-at-a-time interactive
   narrative experience with progress bar, scene icon, pause-points,
   and Previous/Continue navigation. Designed to feel like turning
   pages in an illustrated short story.
   ================================================================ */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, CloudRain, Frown, Smile, Sparkles,
  Star, Sun, Moon, Wind, Flame, Leaf, BookOpen,
  ChevronRight, Pause, ArrowLeft,
} from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { JourneyBlock, JourneyIcon } from '@/types';
import type { BlockContext } from './BlockRenderer';

const ICON_MAP: Record<JourneyIcon, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  'heart': Heart,
  'cloud-rain': CloudRain,
  'frown': Frown,
  'smile': Smile,
  'sparkle': Sparkles,
  'star': Star,
  'sun': Sun,
  'moon': Moon,
  'wind': Wind,
  'flame': Flame,
  'leaf': Leaf,
  'book': BookOpen,
};

export default function JourneyBlockView({ block, ctx }: { block: JourneyBlock; ctx: BlockContext }) {
  const storageKey = `academy:journey:${ctx.programSlug}:${ctx.moduleSlug}:${block.id}`;
  const [index, setIndex] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.index === 'number') return Math.min(Math.max(parsed.index, 0), block.steps.length - 1);
      }
    } catch {}
    return 0;
  });
  const [revealed, setRevealed] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.revealed === 'boolean') return parsed.revealed;
      }
    } catch {}
    return false;
  });

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify({ index, revealed })); } catch {}
  }, [index, revealed, storageKey]);

  const step = block.steps[index];
  if (!step) return null;

  const isLast = index >= block.steps.length - 1;
  const hasReveal = !!(step.revealTextEn && step.revealTextAr);
  const isPausePoint = hasReveal && step.isPausePoint === true;
  // Non-pause-point scenes with reveal text show the reveal inline by default
  const showReveal = hasReveal && (revealed || !step.isPausePoint);
  const progress = Math.round(((index + 1) / block.steps.length) * 100);
  const accent = step.accentColor || ctx.color || '#7A3B5E';

  const handleNext = () => {
    if (isPausePoint && !revealed) {
      setRevealed(true);
      return;
    }
    if (!isLast) {
      setIndex(i => i + 1);
      setRevealed(false);
    }
  };

  const handlePrev = () => {
    if (index === 0) return;
    setIndex(i => i - 1);
    setRevealed(false);
  };

  const Icon = step.icon ? ICON_MAP[step.icon] : null;
  const title = t(step.titleEn, step.titleAr, ctx.isRTL);
  const narrative = t(step.narrativeEn, step.narrativeAr, ctx.isRTL);
  const timeLabel = step.timeLabelEn ? t(step.timeLabelEn, step.timeLabelAr || step.timeLabelEn, ctx.isRTL) : null;
  const revealLabel = hasReveal ? t(step.revealLabelEn || 'Reveal', step.revealLabelAr || 'كَشْف', ctx.isRTL) : null;
  const revealText = hasReveal ? t(step.revealTextEn!, step.revealTextAr!, ctx.isRTL) : null;

  const continueLabel = isPausePoint && !revealed
    ? (ctx.isRTL ? 'تَوَقُّف' : 'Pause Here')
    : (isLast ? (ctx.isRTL ? 'إنْهاء' : 'Finish') : (ctx.isRTL ? 'تابِعي' : 'Continue'));

  // Reveal tone colors
  const revealBg = step.revealTone === 'warning' ? '#FBF5EC'
    : step.revealTone === 'warmth' ? '#F7F0F2'
    : '#F0F7F4'; // insight (default)
  const revealBorder = step.revealTone === 'warning' ? '#D4A84B'
    : step.revealTone === 'warmth' ? '#C4878A'
    : '#3B8A6E';

  return (
    <div
      className="relative rounded-3xl overflow-hidden border border-[#F0E8D8]"
      style={{ background: 'linear-gradient(180deg, #FEFCF8 0%, #FAF5EC 100%)' }}
    >
      {/* Header */}
      <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-3">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3
              className="text-[19px] sm:text-[22px] font-bold text-[#2D2A33] leading-tight"
              style={{ fontFamily: 'var(--font-heading)', color: accent }}
            >
              {t(block.titleEn, block.titleAr, ctx.isRTL)}
            </h3>
            {block.subtitleEn && (
              <p className="text-[11px] text-[#8E8E9F] italic mt-0.5">
                {t(block.subtitleEn, block.subtitleAr || block.subtitleEn, ctx.isRTL)}
              </p>
            )}
          </div>
          {block.durationLabelEn && (
            <div className={ctx.isRTL ? 'text-left' : 'text-right'}>
              <p className="text-[13px] font-semibold text-[#2D2A33]" style={{ color: accent }}>
                {`${index + 1}/${block.steps.length}`}
              </p>
              <p className="text-[9px] text-[#8E8E9F] tracking-wider mt-0.5">
                {t(block.durationLabelEn, block.durationLabelAr || block.durationLabelEn, ctx.isRTL)}
              </p>
            </div>
          )}
        </div>
        {/* Progress bar */}
        <div className="relative h-[3px] bg-[#F0E8D8] rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accent} 0%, #D4A84B 60%, #E8C97D 100%)`,
            }}
          />
        </div>
      </div>

      {/* Scene stage */}
      <div className="relative px-5 sm:px-10 py-8 sm:py-10 min-h-[320px] sm:min-h-[360px]">
        <div key={`${step.id}-${revealed ? 'r' : 'n'}`} className="relative">
            {/* Icon card */}
            {Icon && (
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div
                    className="w-[72px] h-[72px] rounded-2xl bg-white flex items-center justify-center shadow-sm border border-[#F0E8D8]"
                  >
                    <Icon className="w-7 h-7" style={{ color: accent }} />
                  </div>
                  <Sparkles
                    className={`absolute w-5 h-5 opacity-30 ${ctx.isRTL ? '-left-6 -top-2' : '-right-6 -top-2'}`}
                    style={{ color: accent }}
                  />
                </div>
              </div>
            )}

            {/* Time label + title */}
            <div className="text-center mb-6">
              <p
                className={`font-semibold text-[#2D2A33] leading-tight ${timeLabel ? 'text-[19px] sm:text-[22px]' : 'text-[22px] sm:text-[26px]'}`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {timeLabel ? (
                  <>
                    {timeLabel} <span className="text-[#B0B0C0] font-normal">—</span> {title}
                  </>
                ) : (
                  title
                )}
              </p>
            </div>

            {/* Narrative card */}
            <div className="max-w-xl mx-auto rounded-2xl bg-white/70 border border-[#F0E8D8] p-5 sm:p-6">
              <p
                className="text-[15px] sm:text-[16px] text-[#2D2A33] leading-[1.75]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {narrative}
              </p>

              {/* Reveal (shown inline for non-pause-points, after click for pause-points) */}
              {showReveal && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`mt-5 pt-5 border-t border-[#F0E8D8]`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-3.5 h-3.5" fill={revealBorder} style={{ color: revealBorder }} />
                    <p
                      className="text-[11px] font-bold uppercase tracking-[0.15em]"
                      style={{ color: revealBorder }}
                    >
                      {revealLabel}
                    </p>
                  </div>
                  <div
                    className="rounded-lg px-4 py-3"
                    style={{ backgroundColor: revealBg, borderLeft: `3px solid ${revealBorder}` }}
                  >
                    <p className="text-[14px] sm:text-[15px] text-[#2D2A33] leading-[1.7] italic">
                      {revealText}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Pause hint (before reveal is triggered, pause points only) */}
              {isPausePoint && !revealed && (
                <div className="mt-5 pt-4 border-t border-dashed border-[#E8DFC9] text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: `${accent}10` }}>
                    <Pause className="w-3 h-3" style={{ color: accent }} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent }}>
                      {ctx.isRTL ? 'نُقْطَةُ تَوَقُّف' : 'Pause Point'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8E8E9F] italic mt-2">
                    {ctx.isRTL ? 'بِرَأْيِكِ، ماذا يَشْعُرون؟' : 'What do you think they\'re feeling?'}
                  </p>
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-t border-[#F0E8D8]">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#8E8E9F] hover:text-[#2D2A33] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className={`w-3.5 h-3.5 ${ctx.isRTL ? 'rotate-180' : ''}`} />
          {ctx.isRTL ? 'السّابِق' : 'Previous'}
        </button>
        <span className="text-[10px] text-[#B0B0C0] font-mono">
          {index + 1} / {block.steps.length}
        </span>
        <button
          onClick={handleNext}
          disabled={isLast && !(isPausePoint && !revealed)}
          className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-all hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ backgroundColor: accent }}
        >
          {continueLabel}
          <ChevronRight
            className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${ctx.isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
          />
        </button>
      </div>
    </div>
  );
}
