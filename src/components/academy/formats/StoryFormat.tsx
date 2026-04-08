'use client';
/* ================================================================
   StoryFormat — interactive short story with beat-by-beat pacing,
   choice-driven branches, and a reading-first visual design.
   Feels like turning pages in a beautiful book, not clicking through
   a form.
   ================================================================ */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RotateCcw, BookOpen } from 'lucide-react';
import BlockRenderer, { type BlockContext } from '@/components/academy/blocks/BlockRenderer';
import type { LessonBlock, StoryChoiceBlock } from '@/types';
import { t } from '@/lib/academy-helpers';

interface Props {
  blocks: LessonBlock[];
  ctx: BlockContext;
}

export default function StoryFormat({ blocks, ctx }: Props) {
  const storageKey = `academy:story:${ctx.programSlug}:${ctx.moduleSlug}`;
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<{ blockId: string; choiceIndex?: number }[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.index === 'number') setIndex(Math.min(parsed.index, blocks.length - 1));
        if (Array.isArray(parsed.history)) setHistory(parsed.history);
      }
    } catch {}
  }, [storageKey, blocks.length]);

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify({ index, history })); } catch {}
  }, [index, history, storageKey]);

  const current = blocks[index];
  const isLast = index >= blocks.length - 1;
  const progress = Math.round(((index + 1) / blocks.length) * 100);

  const advance = (choiceIndex?: number) => {
    if (current) {
      setHistory(h => [...h, { blockId: current.id, choiceIndex }]);
      ctx.onBlockComplete?.(current.id, choiceIndex);
    }
    if (!isLast) setIndex(i => i + 1);
  };

  const restart = () => {
    setIndex(0);
    setHistory([]);
  };

  if (!current) return null;

  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{ background: `linear-gradient(180deg, #FEFCF8 0%, #FAF5EC 100%)` }}
    >
      {/* Decorative corner accent */}
      <div
        className="absolute top-0 right-0 w-40 h-40 opacity-[0.04] pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${ctx.color}, transparent 70%)`,
        }}
      />

      {/* Header strip — reading chapter indicator */}
      <div className="relative flex items-center justify-between px-5 sm:px-8 py-4 border-b border-[#F0E8D8]">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${ctx.color}12` }}
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: ctx.color }} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E8E9F] leading-none">
              {ctx.isRTL ? 'قِصَّة' : 'Story'}
            </p>
            <p className="text-[10px] text-[#B0B0C0] mt-0.5">
              {ctx.isRTL ? `المَشْهَد ${index + 1} من ${blocks.length}` : `Scene ${index + 1} of ${blocks.length}`}
            </p>
          </div>
        </div>
        {index > 0 && (
          <button
            onClick={restart}
            aria-label={ctx.isRTL ? 'أعيدي' : 'Restart'}
            className="text-[#B0B0C0] hover:text-[#6B6580] transition-colors p-1.5"
            title={ctx.isRTL ? 'اِبْدَئي من جَديد' : 'Start over'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Progress bar — thin line, paper feel */}
      <div className="relative h-[2px] bg-[#F0E8D8]">
        <motion.div
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 rounded-r-full"
          style={{ backgroundColor: ctx.color }}
        />
      </div>

      {/* Beat stage */}
      <div className="relative min-h-[360px] sm:min-h-[420px] px-5 sm:px-10 py-10 sm:py-14 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {current.kind === 'story-choice' ? (
              <StoryChoice block={current} ctx={ctx} onChoose={advance} />
            ) : (
              <>
                <BlockRenderer block={current} ctx={ctx} />
                {!isLast && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => advance()}
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:shadow-lg hover:scale-[1.02]"
                      style={{ backgroundColor: ctx.color }}
                    >
                      {ctx.isRTL ? 'تابِعي' : 'Continue'}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${ctx.isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
                      />
                    </button>
                  </div>
                )}
                {isLast && (
                  <div className="flex items-center justify-center gap-2 mt-10 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: ctx.color }}>
                    <span className="h-px w-8" style={{ backgroundColor: ctx.color }} />
                    {ctx.isRTL ? 'نِهايَة' : 'End'}
                    <span className="h-px w-8" style={{ backgroundColor: ctx.color }} />
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scene dots at bottom */}
      <div className="relative flex items-center justify-center gap-1.5 pb-6">
        {blocks.map((_, i) => (
          <span
            key={i}
            className="rounded-full transition-all"
            style={{
              width: i === index ? '18px' : '5px',
              height: '5px',
              backgroundColor: i <= index ? ctx.color : '#E8DFC9',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function StoryChoice({ block, ctx, onChoose }: { block: StoryChoiceBlock; ctx: BlockContext; onChoose: (i: number) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const prompt = t(block.promptEn, block.promptAr, ctx.isRTL);

  if (selected != null) {
    const choice = block.choices[selected];
    const feedback = t(choice.feedbackEn, choice.feedbackAr, ctx.isRTL);
    const recommended = choice.isRecommended;
    return (
      <div className="max-w-xl mx-auto">
        <div
          className="rounded-2xl p-5 sm:p-6 border-l-[3px]"
          style={{
            backgroundColor: recommended ? '#F0F7F4' : '#FBF5EC',
            borderColor: recommended ? '#3B8A6E' : '#D4A84B',
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
            style={{ color: recommended ? '#3B8A6E' : '#D4A84B' }}
          >
            {recommended
              ? (ctx.isRTL ? 'اخْتِيارٌ حَكيم' : 'A wise choice')
              : (ctx.isRTL ? 'اِنْعِكاس' : 'Reflection')}
          </p>
          <p
            className="text-[17px] text-[#2D2A33] leading-[1.65] italic"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {feedback}
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => onChoose(selected)}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:shadow-lg hover:scale-[1.02]"
            style={{ backgroundColor: ctx.color }}
          >
            {ctx.isRTL ? 'تابِعي القِصّة' : 'Continue the story'}
            <ChevronRight
              className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${ctx.isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
          style={{ backgroundColor: `${ctx.color}10` }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: ctx.color }}
          />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: ctx.color }}>
            {ctx.isRTL ? 'اخْتاري' : 'Your choice'}
          </span>
        </div>
        <p
          className="text-[19px] sm:text-[22px] font-semibold text-[#2D2A33] leading-[1.5]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {prompt}
        </p>
      </div>
      <div className="space-y-2.5">
        {block.choices.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="group w-full text-left px-5 py-4 rounded-2xl border-2 border-[#F0E8D8] bg-white text-[#2D2A33] hover:border-[color:var(--c)] hover:shadow-md transition-all relative overflow-hidden"
            style={{ '--c': ctx.color } as React.CSSProperties}
          >
            <div
              className="absolute inset-y-0 left-0 w-1 transition-all opacity-0 group-hover:opacity-100"
              style={{ backgroundColor: ctx.color }}
            />
            <p className="text-[15px] leading-relaxed pr-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {t(c.labelEn, c.labelAr, ctx.isRTL)}
            </p>
            <ChevronRight
              className={`absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 text-[#B0B0C0] group-hover:text-[color:var(--c)] transition-all group-hover:translate-x-0.5 ${ctx.isRTL ? 'rotate-180 group-hover:-translate-x-0.5 right-auto left-4' : ''}`}
              style={{ '--c': ctx.color } as React.CSSProperties}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
