'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, CheckCircle } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { JournalDayBlock } from '@/types/toolkit';
import type { ToolkitBlockContext } from '../ToolkitBlockRenderer';

/* ── localStorage helper ──────────────────────────────────────── */
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

/* ── Subcomponents ────────────────────────────────────────────── */
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
export default function JournalDayBlockView({ block, ctx }: { block: JournalDayBlock; ctx: ToolkitBlockContext }) {
  const prefix = `toolkit:${ctx.toolkitSlug}:${block.id}`;
  const isRTL = ctx.isRTL;
  const color = ctx.color;

  /* Morning fields */
  const [intention, setIntention] = useAutoSave(`${prefix}:intention`);
  const gratitudeFields = Array.from({ length: block.gratitudeCount }, (_, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAutoSave(`${prefix}:gratitude-${i}`)
  );

  /* Evening fields — rendered dynamically below */

  /* Freeform reflection */
  const [freeform, setFreeform] = useAutoSave(`${prefix}:freeform`);

  const title = t(block.titleEn, block.titleAr, isRTL);
  const intro = t(block.introEn, block.introAr, isRTL);
  const intentionLabel = t(block.intentionEn || 'Morning Intention', block.intentionAr || 'نِيَّةُ الصَّباح', isRTL);

  return (
    <div
      className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 pb-0">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: color }}
          >
            {block.dayNumber}
          </span>
          <h3 className="text-lg font-semibold text-[#2D2A33]">{title}</h3>
        </div>
        {intro && (
          <p className="text-sm text-[#4A4A5C] italic leading-relaxed mb-4">{intro}</p>
        )}
      </div>

      {/* ── Morning Section ────────────────────────────────── */}
      <div className="px-5 sm:px-6 py-5">
        <div className="flex items-center gap-2 mb-4">
          <Sun className="w-4 h-4" style={{ color }} />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F]">
            {isRTL ? 'صَباحِيّ' : 'Morning'}
          </span>
        </div>

        {/* Intention */}
        <label className="block text-sm font-medium text-[#2D2A33] mb-1.5">{intentionLabel}</label>
        <input
          type="text"
          value={intention}
          onChange={e => setIntention(e.target.value)}
          placeholder={isRTL ? 'ما نِيَّتُكِ لِهَذا اليَوم؟' : 'What is your intention for today?'}
          dir={isRTL ? 'rtl' : 'ltr'}
          className="w-full px-4 py-2.5 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] focus:outline-none focus:ring-2 mb-4"
          style={{ '--tw-ring-color': `${color}33` } as React.CSSProperties}
        />

        {/* Gratitude */}
        <label className="block text-sm font-medium text-[#2D2A33] mb-1.5">
          {isRTL ? 'أَنا مُمْتَنَّة لـ...' : "I'm grateful for..."}
        </label>
        <div className="space-y-2 mb-2">
          {gratitudeFields.map(([val, setVal], i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs font-semibold w-5 text-center" style={{ color }}>
                {i + 1}
              </span>
              <input
                type="text"
                value={val}
                onChange={e => setVal(e.target.value)}
                dir={isRTL ? 'rtl' : 'ltr'}
                placeholder={isRTL ? `شُكْر ${i + 1}` : `Gratitude ${i + 1}`}
                className="flex-1 px-3 py-2 rounded-lg border border-[#F3EFE8] text-sm text-[#4A4A5C] focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': `${color}33` } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ────────────────────────────────────────── */}
      <div className="mx-5 sm:mx-6 border-t border-[#F3EFE8]" />

      {/* ── Evening Section ────────────────────────────────── */}
      <div className="px-5 sm:px-6 py-5">
        <div className="flex items-center gap-2 mb-4">
          <Moon className="w-4 h-4" style={{ color }} />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F]">
            {isRTL ? 'مَسائِيّ' : 'Evening'}
          </span>
        </div>

        <div className="space-y-5">
          {block.eveningPrompts.map((prompt, pi) => (
            <EveningPromptField
              key={pi}
              prompt={prompt}
              storagePrefix={`${prefix}:evening-${pi}`}
              isRTL={isRTL}
              color={color}
            />
          ))}
        </div>

        {/* Freeform Reflection */}
        <label className="block text-sm font-medium text-[#2D2A33] mb-1.5 mt-5">
          {isRTL ? 'تَأَمُّلٌ حُرّ' : 'Free Reflection'}
        </label>
        <textarea
          value={freeform}
          onChange={e => setFreeform(e.target.value)}
          rows={3}
          dir={isRTL ? 'rtl' : 'ltr'}
          placeholder={isRTL ? 'اكْتُبي أَيَّ شَيءٍ يَدورُ في ذِهْنِكِ...' : 'Write anything on your mind...'}
          className="w-full px-4 py-3 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] focus:outline-none focus:ring-2 resize-y"
          style={{ '--tw-ring-color': `${color}33` } as React.CSSProperties}
        />
      </div>

      {/* ── Auto-saved indicator ───────────────────────────── */}
      <div className="px-5 sm:px-6 pb-4 flex items-center gap-1.5">
        <CheckCircle className="w-3 h-3 text-[#5A8B6F]" />
        <p className="text-[10px] text-[#B0B0C0]">
          {isRTL ? 'يُحْفَظُ تِلْقائيّاً' : 'Auto-saved'}
        </p>
      </div>
    </div>
  );
}

/* ── Evening Prompt Field (per-prompt state) ──────────────────── */
function EveningPromptField({
  prompt,
  storagePrefix,
  isRTL,
  color,
}: {
  prompt: JournalDayBlock['eveningPrompts'][number];
  storagePrefix: string;
  isRTL: boolean;
  color: string;
}) {
  const label = t(prompt.labelEn, prompt.labelAr, isRTL);
  const [text, setText] = useAutoSave(`${storagePrefix}:text`);
  const [scale, setScale] = useAutoSaveNumber(`${storagePrefix}:scale`);
  const [checked, toggle] = useAutoSaveChecklist(
    `${storagePrefix}:checklist`,
    prompt.options?.length ?? 0
  );

  return (
    <div>
      <label className="block text-sm font-medium text-[#2D2A33] mb-1.5">{label}</label>
      {prompt.type === 'text' && (
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
      {prompt.type === 'checklist' && prompt.options && (
        <div className="space-y-2">
          {prompt.options.map((opt, oi) => (
            <label key={oi} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={checked[oi] ?? false}
                onChange={() => toggle(oi)}
                className="sr-only peer"
              />
              <span
                className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors shrink-0 peer-checked:border-transparent"
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
      {prompt.type === 'scale' && (
        <ScaleSelector value={scale} onChange={setScale} color={color} />
      )}
    </div>
  );
}
