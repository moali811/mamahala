'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, ChevronDown, Check, List } from 'lucide-react';
import BlockRenderer, { type BlockContext } from '@/components/academy/blocks/BlockRenderer';
import type { LessonBlock } from '@/types';
import { t } from '@/lib/academy-helpers';
import { scrollToElement, scrollToTop } from '@/lib/scroll';

interface Props {
  blocks: LessonBlock[];
  ctx: BlockContext;
}

interface Section {
  id: string;
  titleEn: string;
  titleAr: string;
  blocks: LessonBlock[];
}

/** Group a linear block list into sections, one per H2 heading (level 2). */
function groupBlocksIntoSections(blocks: LessonBlock[]): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;
  const push = () => { if (current && current.blocks.length > 0) sections.push(current); };

  blocks.forEach((block) => {
    const isH2 = block.kind === 'heading' && block.level === 2;
    if (isH2) {
      push();
      current = {
        id: block.id,
        titleEn: block.textEn,
        titleAr: block.textAr,
        blocks: [block],
      };
    } else {
      if (!current) {
        // Intro section — everything before the first heading
        current = {
          id: 'intro',
          titleEn: 'Introduction',
          titleAr: 'مُقَدِّمَة',
          blocks: [],
        };
      }
      current.blocks.push(block);
    }
  });
  push();

  // If there's only one section or no headings at all, just return a single section
  if (sections.length === 0) {
    return [{ id: 'all', titleEn: 'Lesson', titleAr: 'الدَّرْس', blocks }];
  }
  return sections;
}

export default function StandardFormat({ blocks, ctx }: Props) {
  const sections = useMemo(() => groupBlocksIntoSections(blocks), [blocks]);
  const storageKey = `academy:section:${ctx.programSlug}:${ctx.moduleSlug}`;
  const completedKey = `academy:sections-completed:${ctx.programSlug}:${ctx.moduleSlug}`;

  const [sectionIndex, setSectionIndex] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const n = Number(raw);
        if (!isNaN(n)) return Math.min(Math.max(n, 0), sections.length - 1);
      }
    } catch {}
    return 0;
  });

  const [completedSections, setCompletedSections] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const raw = localStorage.getItem(completedKey);
      if (raw) return new Set(JSON.parse(raw));
    } catch {}
    return new Set();
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const wrapperRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const stageRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { onBlockComplete } = ctx;

  // Persist section position
  useEffect(() => {
    try { localStorage.setItem(storageKey, String(sectionIndex)); } catch {}
  }, [sectionIndex, storageKey]);

  // Persist completion set
  useEffect(() => {
    try { localStorage.setItem(completedKey, JSON.stringify(Array.from(completedSections))); } catch {}
  }, [completedSections, completedKey]);

  // Click outside to close jump menu
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // Auto-mark current section's blocks as completed when scrolled into view (>40% visible)
  useEffect(() => {
    if (!onBlockComplete) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            const id = entry.target.getAttribute('data-block-id');
            if (id) onBlockComplete(id);
          }
        });
      },
      { threshold: [0, 0.4, 0.8] }
    );
    Object.values(wrapperRefs.current).forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [sectionIndex, onBlockComplete]);

  const section = sections[sectionIndex];
  const isFirst = sectionIndex === 0;
  const isLast = sectionIndex >= sections.length - 1;
  const progress = Math.round(((sectionIndex + 1) / sections.length) * 100);

  const markComplete = (sectionId: string) => {
    setCompletedSections(prev => {
      if (prev.has(sectionId)) return prev;
      const next = new Set(prev);
      next.add(sectionId);
      return next;
    });
  };

  const goNext = () => {
    markComplete(section.id);
    if (!isLast) {
      setSectionIndex(i => i + 1);
      // Scroll to top of stage so user starts the new section from the top
      if (stageRef.current) void scrollToElement(stageRef.current);
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      setSectionIndex(i => i - 1);
      if (stageRef.current) void scrollToElement(stageRef.current);
    }
  };

  const jumpTo = (idx: number) => {
    setSectionIndex(idx);
    setMenuOpen(false);
    if (stageRef.current) void scrollToElement(stageRef.current);
  };

  if (!section) return null;

  // If there's only one section (no H2s at all), fall back to a simple list — no pagination chrome.
  if (sections.length <= 1) {
    return (
      <div className="space-y-5">
        {blocks.map((block) => (
          <div
            key={block.id}
            ref={(el) => { wrapperRefs.current[block.id] = el; }}
            data-block-id={block.id}
          >
            <BlockRenderer block={block} ctx={ctx} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={stageRef} className="scroll-anchor">
      {/* Section header — sticky within view */}
      <div className="sticky top-16 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-5 backdrop-blur-md bg-[#FAF7F2]/85 border-b border-[#F0E8D8]">
        <div className="flex items-center justify-between gap-4 mb-2">
          {/* Jump-to menu button */}
          <div ref={menuRef} className="relative min-w-0 flex-1">
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="group flex items-start gap-2.5 text-left w-full min-w-0 hover:opacity-80 transition-opacity"
              aria-expanded={menuOpen}
              aria-label={ctx.isRTL ? 'القائِمَة' : 'Jump to section'}
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5" style={{ backgroundColor: `${ctx.color}15` }}>
                <List className="w-3 h-3" style={{ color: ctx.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: ctx.color }}>
                  {ctx.isRTL ? `القِسْمُ ${sectionIndex + 1} مِنْ ${sections.length}` : `Section ${sectionIndex + 1} of ${sections.length}`}
                </p>
                <p className="text-[13px] font-semibold text-[#2D2A33] truncate flex items-center gap-1.5">
                  {t(section.titleEn, section.titleAr, ctx.isRTL)}
                  <ChevronDown className={`w-3.5 h-3.5 text-[#8E8E9F] transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                </p>
              </div>
            </button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white border border-[#E8DFC9] shadow-lg overflow-hidden z-30 max-w-md"
                >
                  <div className="px-3 py-2 border-b border-[#F0E8D8] bg-[#FAF7F2]">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8E8E9F]">
                      {ctx.isRTL ? 'جَميعُ الأَقْسام' : 'All sections'}
                    </p>
                  </div>
                  <ul className="max-h-[320px] overflow-y-auto">
                    {sections.map((s, i) => {
                      const done = completedSections.has(s.id);
                      const active = i === sectionIndex;
                      return (
                        <li key={s.id}>
                          <button
                            onClick={() => jumpTo(i)}
                            className={`w-full text-left px-3 py-2.5 flex items-center gap-3 transition-colors ${active ? 'bg-[#FAF5EC]' : 'hover:bg-[#FAF7F2]'}`}
                          >
                            <span
                              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                done ? 'text-white' : active ? 'border-2' : 'border border-[#E8DFC9] text-[#B0B0C0]'
                              }`}
                              style={{
                                backgroundColor: done ? ctx.color : active ? 'transparent' : undefined,
                                borderColor: active ? ctx.color : undefined,
                                color: active && !done ? ctx.color : undefined,
                              }}
                            >
                              {done ? <Check className="w-3 h-3" /> : i + 1}
                            </span>
                            <span className={`text-[12px] truncate ${active ? 'font-semibold text-[#2D2A33]' : 'text-[#4A4A5C]'}`}>
                              {t(s.titleEn, s.titleAr, ctx.isRTL)}
                            </span>
                            {active && (
                              <span className="flex-shrink-0 text-[9px] font-semibold uppercase tracking-[0.15em] ml-auto" style={{ color: ctx.color }}>
                                {ctx.isRTL ? 'هُنا' : 'Here'}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Prev/Next arrows */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={goPrev}
              disabled={isFirst}
              aria-label={ctx.isRTL ? 'السّابِق' : 'Previous'}
              className="w-8 h-8 rounded-full border border-[#E8DFC9] bg-white flex items-center justify-center text-[#8E8E9F] hover:text-[#2D2A33] hover:border-[#C8A97D] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${ctx.isRTL ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={goNext}
              disabled={isLast}
              aria-label={ctx.isRTL ? 'التّالي' : 'Next'}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ backgroundColor: ctx.color }}
            >
              <ChevronRight className={`w-3.5 h-3.5 ${ctx.isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        {/* Progress bar with section tick marks */}
        <div className="relative h-[4px] bg-[#F0E8D8] rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ backgroundColor: ctx.color }}
          />
          {/* Section dividers */}
          {sections.length > 1 && sections.slice(0, -1).map((_, i) => (
            <span
              key={i}
              className="absolute top-0 bottom-0 w-px bg-white/80"
              style={{ left: `${((i + 1) / sections.length) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Section content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5"
        >
          {section.blocks.map((block) => (
            <div
              key={block.id}
              ref={(el) => { wrapperRefs.current[block.id] = el; }}
              data-block-id={block.id}
            >
              <BlockRenderer block={block} ctx={ctx} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footer navigation */}
      <div className="mt-10 pt-6 border-t border-[#F0E8D8]">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#8E8E9F] hover:text-[#2D2A33] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${ctx.isRTL ? 'rotate-180' : ''}`} />
            {ctx.isRTL ? 'السّابِق' : 'Previous'}
          </button>
          <p className="text-[10px] text-[#B0B0C0] font-mono">
            {sectionIndex + 1} / {sections.length}
          </p>
          <button
            onClick={() => { if (isLast) markComplete(section.id); else goNext(); }}
            disabled={isLast && completedSections.has(section.id)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-all hover:shadow-md hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ backgroundColor: ctx.color }}
          >
            {isLast
              ? (completedSections.has(section.id)
                  ? (ctx.isRTL ? 'تَمَّ' : 'Lesson Complete')
                  : (ctx.isRTL ? 'اِنْتَهَتِ القِراءَة' : 'Mark Complete'))
              : (ctx.isRTL ? 'القِسْمُ التّالي' : 'Next Section')}
            {isLast && completedSections.has(section.id) ? <Check className="w-3.5 h-3.5" /> : (
              <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${ctx.isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
