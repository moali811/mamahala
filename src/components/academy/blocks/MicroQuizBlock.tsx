'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Zap } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { MicroQuizBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function MicroQuizBlockView({ block, ctx }: { block: MicroQuizBlock; ctx: BlockContext }) {
  const storageKey = `academy:microquiz:${ctx.programSlug}:${ctx.moduleSlug}:${block.id}`;
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw != null) {
        const idx = Number(raw);
        if (!Number.isNaN(idx)) {
          setSelected(idx);
          setLocked(true);
        }
      }
    } catch {}
  }, [storageKey]);

  const question = t(block.question.textEn, block.question.textAr, ctx.isRTL);

  const handleSelect = (i: number) => {
    if (locked) return;
    setSelected(i);
    setLocked(true);
    try { localStorage.setItem(storageKey, String(i)); } catch {}
    const correct = !!block.question.options[i]?.correct;
    ctx.onBlockComplete?.(block.id, { optionIndex: i, correct });
  };

  const chosenOpt = selected != null ? block.question.options[selected] : null;
  const isCorrect = !!chosenOpt?.correct;

  return (
    <div
      className="rounded-2xl border-2 border-dashed p-5 sm:p-6"
      style={{ borderColor: `${ctx.color}40`, background: `${ctx.color}05` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4" style={{ color: ctx.color }} />
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: ctx.color }}>
          {ctx.isRTL ? 'اخْتِبارٌ سَريع' : 'Quick check'}
        </span>
      </div>
      <p className="text-sm font-medium text-[#2D2A33] mb-3 leading-relaxed">{question}</p>
      <div className="space-y-2">
        {block.question.options.map((opt, i) => {
          const label = t(opt.labelEn, opt.labelAr, ctx.isRTL);
          const isSelected = selected === i;
          const showCorrect = locked && opt.correct;
          const showWrong = locked && isSelected && !opt.correct;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={locked}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-sm transition-all ${
                showCorrect ? 'border-[#3B8A6E] bg-[#F0F7F4] text-[#2D2A33]' :
                showWrong ? 'border-[#C4636A] bg-[#FBF2F0] text-[#2D2A33]' :
                isSelected ? 'border-[color:var(--c)] bg-white text-[#2D2A33]' :
                locked ? 'border-[#F3EFE8] bg-white/50 text-[#8E8E9F]' :
                'border-[#F3EFE8] bg-white text-[#4A4A5C] hover:border-[color:var(--c)]'
              }`}
              style={{ '--c': ctx.color } as React.CSSProperties}
            >
              <span className="flex items-center justify-between gap-2">
                <span>{label}</span>
                {showCorrect && <CheckCircle className="w-4 h-4 text-[#3B8A6E] flex-shrink-0" />}
                {showWrong && <XCircle className="w-4 h-4 text-[#C4636A] flex-shrink-0" />}
              </span>
            </button>
          );
        })}
      </div>
      {locked && chosenOpt && (
        <div className={`mt-3 text-xs rounded-lg px-3 py-2 ${isCorrect ? 'bg-[#F0F7F4] text-[#2D6A4F]' : 'bg-[#FBF2F0] text-[#9B3B42]'}`}>
          {chosenOpt.explanationEn
            ? t(chosenOpt.explanationEn, chosenOpt.explanationAr || chosenOpt.explanationEn, ctx.isRTL)
            : (isCorrect
                ? (ctx.isRTL ? 'إجابةٌ صَحيحَة!' : 'Correct!')
                : (ctx.isRTL ? 'لَيْسَتْ صَحيحَةً — حاوِلي التَّفْكيرَ مِن جَديد.' : 'Not quite — take another look.'))}
        </div>
      )}
    </div>
  );
}
