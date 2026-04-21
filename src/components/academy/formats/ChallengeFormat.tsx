'use client';
/* ================================================================
   ChallengeFormat — daily/weekly practice challenges with per-day
   check-ins, streak counter, and optional notes.
   ================================================================ */

import { useState, useEffect } from 'react';
import { CheckCircle2, Flame, Calendar } from 'lucide-react';
import BlockRenderer, { type BlockContext } from '@/components/academy/blocks/BlockRenderer';
import type { LessonBlock, ChallengeStepBlock } from '@/types';
import { isChallengeStepBlock } from '@/types/blocks';
import { t } from '@/lib/academy-helpers';

interface Props {
  blocks: LessonBlock[];
  ctx: BlockContext;
}

interface CheckIn {
  completedAt: string;
  note?: string;
}

export default function ChallengeFormat({ blocks, ctx }: Props) {
  const storageKey = `academy:challenge:${ctx.programSlug}:${ctx.moduleSlug}`;
  const [checkIns, setCheckIns] = useState<Record<number, CheckIn>>({});
  const [noteDrafts, setNoteDrafts] = useState<Record<number, string>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.checkIns) setCheckIns(parsed.checkIns);
      }
    } catch {}
  }, [storageKey]);

  const persist = (ci: Record<number, CheckIn>) => {
    try { localStorage.setItem(storageKey, JSON.stringify({ checkIns: ci })); } catch {}
  };

  const toggleCheckIn = (day: number, blockId: string) => {
    const next = { ...checkIns };
    if (next[day]) {
      delete next[day];
    } else {
      next[day] = { completedAt: new Date().toISOString(), note: noteDrafts[day] };
      ctx.onBlockComplete?.(blockId);
    }
    setCheckIns(next);
    persist(next);
  };

  const steps = blocks.filter(isChallengeStepBlock);
  const contextBlocks = blocks.filter(b => !isChallengeStepBlock(b));
  const streak = Object.keys(checkIns).length;

  return (
    <div className="space-y-6">
      {/* Context blocks (intro) */}
      {contextBlocks.length > 0 && (
        <div className="space-y-4">
          {contextBlocks.map(b => <BlockRenderer key={b.id} block={b} ctx={ctx} />)}
        </div>
      )}

      {/* Streak header */}
      <div
        className="rounded-2xl p-5 flex items-center gap-4"
        style={{ background: `linear-gradient(135deg, ${ctx.color}12, ${ctx.color}04)` }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
          style={{ backgroundColor: ctx.color }}
        >
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <p className="text-2xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
            {streak} / {steps.length}
          </p>
          <p className="text-xs text-[#8E8E9F]">
            {ctx.isRTL ? 'أَيّامٌ مُكْتَمِلَة' : 'days checked in'}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-[#8E8E9F]">
          <Calendar className="w-3.5 h-3.5" />
          {ctx.isRTL ? 'تَحَدٍّ' : 'Challenge'}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map(step => {
          const s = step as ChallengeStepBlock;
          const checked = !!checkIns[s.dayLabel];
          const checkInPrompt = t(s.checkInPromptEn, s.checkInPromptAr, ctx.isRTL);
          return (
            <div
              key={s.id}
              className={`rounded-2xl border p-5 transition-all ${checked ? 'bg-[#F0F7F4] border-[#D4E7D8]' : 'bg-white border-[#F3EFE8]'}`}
            >
              <BlockRenderer block={s} ctx={ctx} />
              <div className="mt-4 pt-4 border-t border-[#F3EFE8]">
                <p className="text-xs text-[#8E8E9F] mb-2">{checkInPrompt}</p>
                {!checked && (
                  <textarea
                    value={noteDrafts[s.dayLabel] || ''}
                    onChange={e => setNoteDrafts(d => ({ ...d, [s.dayLabel]: e.target.value }))}
                    rows={2}
                    dir={ctx.isRTL ? 'rtl' : 'ltr'}
                    placeholder={ctx.isRTL ? 'مُلاحَظاتٌ (اخْتِياريّ)' : 'Notes (optional)'}
                    className="w-full px-3 py-2 rounded-lg border border-[#F3EFE8] text-xs text-[#4A4A5C] focus:outline-none resize-none mb-2"
                  />
                )}
                {checked && checkIns[s.dayLabel]?.note && (
                  <p className="text-xs text-[#4A4A5C] italic mb-2">&ldquo;{checkIns[s.dayLabel].note}&rdquo;</p>
                )}
                <button
                  onClick={() => toggleCheckIn(s.dayLabel, s.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    checked ? 'bg-[#3B8A6E] text-white' : 'bg-white border border-[color:var(--c)] text-[color:var(--c)] hover:bg-[color:var(--c)] hover:text-white'
                  }`}
                  style={{ '--c': ctx.color } as React.CSSProperties}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {checked ? (ctx.isRTL ? 'مُكْتَمِل' : 'Completed') : (ctx.isRTL ? 'سَجِّل اليَوْم' : 'Check in')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
