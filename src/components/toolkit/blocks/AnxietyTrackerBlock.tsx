'use client';

import { useState, useEffect, useMemo } from 'react';
import { CheckCircle } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { AnxietyTrackerBlock } from '@/types/toolkit';
import type { ToolkitBlockContext } from '../ToolkitBlockRenderer';

/* ── localStorage helper ──────────────────────────────────────── */
function useAutoSaveMap(key: string, length: number) {
  const [values, setValues] = useState<(number | null)[]>(() => Array(length).fill(null));
  useEffect(() => {
    try {
      const s = localStorage.getItem(key);
      if (s) setValues(JSON.parse(s));
    } catch {}
  }, [key]);
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(values)); } catch {}
  }, [key, values]);
  const set = (i: number, v: number | null) => {
    setValues(prev => { const next = [...prev]; next[i] = v; return next; });
  };
  return [values, set] as const;
}

/* ── Main Component ───────────────────────────────────────────── */
export default function AnxietyTrackerBlockView({ block, ctx }: { block: AnxietyTrackerBlock; ctx: ToolkitBlockContext }) {
  const prefix = `toolkit:${ctx.toolkitSlug}:${block.id}`;
  const isRTL = ctx.isRTL;
  const color = ctx.color;
  const label = t(block.labelEn, block.labelAr, isRTL);
  const [values, setValue] = useAutoSaveMap(`${prefix}:days`, block.days.length);

  const average = useMemo(() => {
    const filled = values.filter((v): v is number => v !== null);
    if (filled.length === 0) return null;
    return Math.round((filled.reduce((a, b) => a + b, 0) / filled.length) * 10) / 10;
  }, [values]);

  return (
    <div
      className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Gradient top border */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }} />

      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-[#2D2A33] mb-5">{label}</h3>

        {/* Day columns — scrollable on small screens */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
          {block.days.map((day, i) => (
            <div key={i} className="flex flex-col items-center min-w-[52px]">
              {/* Day label */}
              <span className="text-[11px] font-semibold text-[#8E8E9F] uppercase tracking-wide mb-2">
                {day}
              </span>

              {/* Number input */}
              <input
                type="number"
                min={1}
                max={10}
                value={values[i] ?? ''}
                onChange={e => {
                  const v = e.target.value === '' ? null : Math.min(10, Math.max(1, parseInt(e.target.value) || 1));
                  setValue(i, v);
                }}
                placeholder="-"
                className="w-11 h-11 rounded-full border-2 text-center text-sm font-semibold focus:outline-none focus:ring-2 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{
                  borderColor: values[i] !== null ? color : '#F3EFE8',
                  backgroundColor: values[i] !== null ? `${color}12` : 'transparent',
                  color: values[i] !== null ? color : '#B0B0C0',
                  '--tw-ring-color': `${color}33`,
                } as React.CSSProperties}
              />
            </div>
          ))}

          {/* Average */}
          <div className="flex flex-col items-center min-w-[52px]">
            <span className="text-[11px] font-semibold uppercase tracking-wide mb-2" style={{ color }}>
              {isRTL ? 'المعدل' : 'Avg'}
            </span>
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ backgroundColor: average !== null ? color : '#E0DDD6' }}
            >
              {average !== null ? average : '-'}
            </div>
          </div>
        </div>

        {/* Scale hint */}
        <p className="text-[10px] text-[#B0B0C0] mt-3 text-center">
          {isRTL ? '١ = هادِئ جِدّاً — ١٠ = قَلَقٌ شَديد' : '1 = Very calm — 10 = Very anxious'}
        </p>

        {/* Auto-saved */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#F3EFE8]">
          <CheckCircle className="w-3 h-3 text-[#5A8B6F]" />
          <p className="text-[10px] text-[#B0B0C0]">
            {isRTL ? 'يُحْفَظُ تِلْقائيّاً' : 'Auto-saved'}
          </p>
        </div>
      </div>
    </div>
  );
}
