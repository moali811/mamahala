'use client';

import { useState, useEffect, useCallback } from 'react';
import { CheckCircle } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { ProgressSummaryBlock } from '@/types/toolkit';
import type { ToolkitBlockContext } from '../ToolkitBlockRenderer';

/* ── localStorage helpers ─────────────────────────────────────── */
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

function useAutoSaveNumber(key: string) {
  const [value, setValue] = useState<number | null>(null);
  useEffect(() => {
    try { const s = localStorage.getItem(key); if (s) setValue(Number(s)); } catch {}
  }, [key]);
  useEffect(() => {
    if (value !== null) { try { localStorage.setItem(key, String(value)); } catch {} }
  }, [key, value]);
  return [value, setValue] as const;
}

function useAutoSaveChecklist(key: string, length: number) {
  const [checked, setChecked] = useState<boolean[]>(() => Array(length).fill(false));
  useEffect(() => {
    try {
      const s = localStorage.getItem(key);
      if (s) setChecked(JSON.parse(s));
    } catch {}
  }, [key]);
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(checked)); } catch {}
  }, [key, checked]);
  const toggle = useCallback((i: number) => {
    setChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next; });
  }, []);
  return [checked, toggle] as const;
}

/* ── Scale Selector ───────────────────────────────────────────── */
function ScaleSelector({ value, onChange, color }: { value: number | null; onChange: (n: number) => void; color: string }) {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="w-8 h-8 rounded-full text-xs font-semibold transition-all border-2"
          style={{
            backgroundColor: value === n ? color : 'transparent',
            borderColor: value === n ? color : '#F3EFE8',
            color: value === n ? '#fff' : '#4A4A5C',
          }}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────── */
export default function ProgressSummaryBlockView({ block, ctx }: { block: ProgressSummaryBlock; ctx: ToolkitBlockContext }) {
  const prefix = `toolkit:${ctx.toolkitSlug}:${block.id}`;
  const isRTL = ctx.isRTL;
  const color = ctx.color;
  const title = t(block.titleEn, block.titleAr, isRTL);

  return (
    <div
      className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Accent border */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }} />

      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-[#2D2A33] mb-5">{title}</h3>

        <div className="space-y-5">
          {block.fields.map((field, i) => (
            <ProgressField
              key={i}
              field={field}
              storagePrefix={`${prefix}:field-${i}`}
              isRTL={isRTL}
              color={color}
            />
          ))}
        </div>

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

/* ── Per-field component ──────────────────────────────────────── */
function ProgressField({
  field,
  storagePrefix,
  isRTL,
  color,
}: {
  field: ProgressSummaryBlock['fields'][number];
  storagePrefix: string;
  isRTL: boolean;
  color: string;
}) {
  const label = t(field.labelEn, field.labelAr, isRTL);
  const [text, setText] = useAutoSave(`${storagePrefix}:text`);
  const [scale, setScale] = useAutoSaveNumber(`${storagePrefix}:scale`);
  const [checked, toggle] = useAutoSaveChecklist(
    `${storagePrefix}:checklist`,
    field.options?.length ?? 0
  );

  return (
    <div>
      <label className="block text-sm font-semibold text-[#2D2A33] mb-1.5">{label}</label>

      {field.type === 'scale' && (
        <ScaleSelector value={scale} onChange={setScale} color={color} />
      )}

      {field.type === 'text' && (
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={2}
          dir={isRTL ? 'rtl' : 'ltr'}
          placeholder={isRTL ? 'اكْتُبي هُنا…' : 'Write here...'}
          className="w-full px-4 py-2.5 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] focus:outline-none focus:ring-2 resize-y"
          style={{ '--tw-ring-color': `${color}33` } as React.CSSProperties}
        />
      )}

      {field.type === 'checklist' && field.options && (
        <div className="space-y-2">
          {field.options.map((opt, oi) => (
            <label key={oi} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={checked[oi] ?? false}
                onChange={() => toggle(oi)}
                className="sr-only peer"
              />
              <span
                className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors shrink-0"
                style={{
                  borderColor: checked[oi] ? color : '#E0DDD6',
                  backgroundColor: checked[oi] ? color : 'transparent',
                }}
              >
                {checked[oi] && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-sm text-[#4A4A5C]">{t(opt.en, opt.ar, isRTL)}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
