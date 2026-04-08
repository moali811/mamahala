'use client';
/* ================================================================
   CardsFormat — horizontal swipeable deck, mobile-first.
   Micro-quiz blocks interleave between cards as gates.
   ================================================================ */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import BlockRenderer, { type BlockContext } from '@/components/academy/blocks/BlockRenderer';
import type { LessonBlock } from '@/types';

interface Props {
  blocks: LessonBlock[];
  ctx: BlockContext;
}

export default function CardsFormat({ blocks, ctx }: Props) {
  const storageKey = `academy:cards:${ctx.programSlug}:${ctx.moduleSlug}`;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) { const v = Number(raw); if (!Number.isNaN(v)) setIndex(Math.min(v, blocks.length - 1)); }
    } catch {}
  }, [storageKey, blocks.length]);

  useEffect(() => {
    try { localStorage.setItem(storageKey, String(index)); } catch {}
  }, [index, storageKey]);

  const go = (delta: number) => {
    const next = Math.max(0, Math.min(blocks.length - 1, index + delta));
    if (next !== index) {
      setDirection(delta > 0 ? 1 : -1);
      const currentBlock = blocks[index];
      if (currentBlock) ctx.onBlockComplete?.(currentBlock.id);
      setIndex(next);
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 80;
    // In RTL, directions are flipped
    const swipeLeft = ctx.isRTL ? 1 : -1;
    if (info.offset.x < -threshold) go(ctx.isRTL ? -swipeLeft : 1);
    else if (info.offset.x > threshold) go(ctx.isRTL ? swipeLeft : -1);
  };

  const current = blocks[index];
  if (!current) return null;

  const variants = {
    enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: -dir * 80, opacity: 0 }),
  };

  return (
    <div>
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 mb-4" dir="ltr">
        {blocks.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            aria-label={`Card ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6' : 'w-1.5'}`}
            style={{ backgroundColor: i === index ? ctx.color : '#E8E3D9' }}
          />
        ))}
      </div>

      {/* Card stage */}
      <div ref={containerRef} className="relative overflow-hidden rounded-3xl" style={{ minHeight: 400 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            <BlockRenderer block={current} ctx={ctx} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between gap-4 mt-4" dir="ltr">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous"
          className="w-10 h-10 rounded-full border border-[#F3EFE8] bg-white flex items-center justify-center text-[#4A4A5C] hover:text-[#2D2A33] hover:border-[color:var(--c)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          style={{ '--c': ctx.color } as React.CSSProperties}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs text-[#8E8E9F]">
          {index + 1} / {blocks.length}
        </span>
        <button
          onClick={() => go(1)}
          disabled={index === blocks.length - 1}
          aria-label="Next"
          className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          style={{ backgroundColor: ctx.color }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* View saved collection link */}
      <div className="mt-3 flex justify-center">
        <a
          href={`/${ctx.locale}/dashboard/saved-cards`}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#8E8E9F] hover:text-[color:var(--c)] transition-colors"
          style={{ '--c': ctx.color } as React.CSSProperties}
        >
          <Bookmark className="w-3 h-3" />
          {ctx.isRTL ? 'بِطاقاتي المَحْفوظَة' : 'My saved cards'}
        </a>
      </div>
    </div>
  );
}
