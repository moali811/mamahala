'use client';

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { ExposureLadderBlock } from '@/types/toolkit';
import type { ToolkitBlockContext } from '../ToolkitBlockRenderer';

function useAutoSave(key: string) {
  const [value, setValue] = useState('');
  useEffect(() => {
    try { const s = localStorage.getItem(key); if (s) setValue(s); } catch {}
  }, [key]);
  useEffect(() => {
    try { localStorage.setItem(key, value); } catch {}
  }, [key, value]);
  return [value, setValue] as const;
}

function LadderRung({
  rungNum,
  totalRungs,
  storagePrefix,
  isRTL,
  color,
}: {
  rungNum: number;
  totalRungs: number;
  storagePrefix: string;
  isRTL: boolean;
  color: string;
}) {
  const [desc, setDesc] = useAutoSave(`${storagePrefix}:desc`);
  const [anxBefore, setAnxBefore] = useAutoSave(`${storagePrefix}:anx-before`);
  const [date, setDate] = useAutoSave(`${storagePrefix}:date`);
  const [anxAfter, setAnxAfter] = useAutoSave(`${storagePrefix}:anx-after`);

  const isTop = rungNum === totalRungs;
  const isBottom = rungNum === 1;

  /* Indent increases with rung number for the stair effect */
  const indentPercent = ((rungNum - 1) / (totalRungs - 1)) * 8;

  return (
    <div
      className="relative transition-all"
      style={{ [isRTL ? 'marginRight' : 'marginLeft']: `${indentPercent}%` }}
    >
      {/* Labels for top/bottom */}
      {isTop && (
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C4878A]">
            {isRTL ? 'الأَصْعَب' : 'Hardest'}
          </span>
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#F3EFE8] p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Step number */}
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ backgroundColor: color }}
        >
          {rungNum}
        </span>

        {/* Description */}
        <input
          type="text"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          dir={isRTL ? 'rtl' : 'ltr'}
          placeholder={isRTL ? 'صِفي النَّشاط…' : 'Describe the activity...'}
          className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-[#F3EFE8] text-sm text-[#4A4A5C] focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': `${color}33` } as React.CSSProperties}
        />

        {/* Anxiety Before */}
        <div className="flex items-center gap-1.5 shrink-0">
          <label className="text-[10px] text-[#8E8E9F] whitespace-nowrap">
            {isRTL ? 'قَبْل' : 'Before'}
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={anxBefore}
            onChange={e => setAnxBefore(e.target.value)}
            placeholder="1-10"
            className="w-16 px-2 py-2 rounded-lg border border-[#F3EFE8] text-sm text-center text-[#4A4A5C] focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': `${color}33` } as React.CSSProperties}
          />
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 shrink-0">
          <label className="text-[10px] text-[#8E8E9F] whitespace-nowrap">
            {isRTL ? 'التّاريخ' : 'Date'}
          </label>
          <input
            type="text"
            value={date}
            onChange={e => setDate(e.target.value)}
            dir={isRTL ? 'rtl' : 'ltr'}
            placeholder="MM/DD"
            className="w-20 px-2 py-2 rounded-lg border border-[#F3EFE8] text-sm text-center text-[#4A4A5C] focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': `${color}33` } as React.CSSProperties}
          />
        </div>

        {/* Anxiety After */}
        <div className="flex items-center gap-1.5 shrink-0">
          <label className="text-[10px] text-[#8E8E9F] whitespace-nowrap">
            {isRTL ? 'بَعْد' : 'After'}
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={anxAfter}
            onChange={e => setAnxAfter(e.target.value)}
            placeholder="1-10"
            className="w-16 px-2 py-2 rounded-lg border border-[#F3EFE8] text-sm text-center text-[#4A4A5C] focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': `${color}33` } as React.CSSProperties}
          />
        </div>
      </div>

      {isBottom && (
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A8B6F]">
            {isRTL ? 'الأَسْهَل' : 'Easiest'}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ExposureLadderBlockView({ block, ctx }: { block: ExposureLadderBlock; ctx: ToolkitBlockContext }) {
  const isRTL = ctx.isRTL;
  const title = t(block.titleEn, block.titleAr, isRTL);
  const rungs = block.rungs || 7;

  /* Render top-down (highest rung first) */
  const rungNumbers = Array.from({ length: rungs }, (_, i) => rungs - i);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <h3 className="text-lg font-semibold text-[#2D2A33] mb-4">{title}</h3>

      <div className="space-y-2">
        {rungNumbers.map(n => (
          <LadderRung
            key={n}
            rungNum={n}
            totalRungs={rungs}
            storagePrefix={`toolkit:${ctx.toolkitSlug}:${block.id}:rung-${n}`}
            isRTL={isRTL}
            color={ctx.color}
          />
        ))}
      </div>

      {/* Auto-saved */}
      <div className="flex items-center gap-1.5 mt-3">
        <CheckCircle className="w-3 h-3 text-[#5A8B6F]" />
        <p className="text-[10px] text-[#B0B0C0]">
          {isRTL ? 'يُحْفَظُ تِلْقائيّاً' : 'Auto-saved'}
        </p>
      </div>
    </div>
  );
}
