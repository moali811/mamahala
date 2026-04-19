'use client';

/* ================================================================
   ArabicField / ArabicTextarea — drop-in RTL inputs with Tashkeel
   coverage feedback
   ================================================================
   Thin wrappers over native <input> and <textarea> that:
     - default to `dir="rtl"` so Arabic renders right-to-left
     - render a live coverage chip showing % of Arabic letters with
       diacritics (fatha / kasra / damma / sukun / shadda / tanween)
     - colour-code the chip: red <50%, amber <80%, green ≥80%

   Does NOT block save — policy is to nudge, not wall. The server-
   side validator in lib/admin/content-validation.ts is the hard
   gate that requires Arabic text is present (non-empty + real
   Arabic characters). Tashkeel quality is a soft indicator the
   author sees while typing.

   Use exactly like the plain HTML input / textarea:

     <ArabicField
       value={x.titleAr}
       onChange={e => setX({...x, titleAr: e.target.value})}
       className="..."
     />
   ================================================================ */

import { useMemo } from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { tashkeelStats, tashkeelLevel } from '@/lib/arabic/tashkeel';

interface CommonProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  /** Hide the coverage chip (e.g. in very compact forms). */
  hideCoverageChip?: boolean;
  /** Extra class for the wrapper div (chip placement). */
  wrapperClassName?: string;
}

interface InputProps extends CommonProps {
  type?: 'text' | 'email' | 'url';
}

export function ArabicField({
  value,
  onChange,
  placeholder,
  className,
  hideCoverageChip,
  wrapperClassName,
  type = 'text',
}: InputProps) {
  return (
    <div className={`relative ${wrapperClassName ?? ''}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        dir="rtl"
        lang="ar"
        className={className}
      />
      {!hideCoverageChip && <CoverageChip value={value} compact />}
    </div>
  );
}

export function ArabicTextarea({
  value,
  onChange,
  placeholder,
  className,
  rows,
  hideCoverageChip,
  wrapperClassName,
}: CommonProps & { rows?: number }) {
  return (
    <div className={`relative ${wrapperClassName ?? ''}`}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        dir="rtl"
        lang="ar"
        rows={rows}
        className={className}
      />
      {!hideCoverageChip && <CoverageChip value={value} />}
    </div>
  );
}

// ─── Coverage chip ──────────────────────────────────────────────

function CoverageChip({ value, compact }: { value: string; compact?: boolean }) {
  const { letters, coverage } = useMemo(() => tashkeelStats(value), [value]);
  const level = useMemo(() => tashkeelLevel(value), [value]);
  if (letters === 0) return null;

  const pct = Math.round(coverage * 100);
  const palette = level === 'good'
    ? { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
    : level === 'medium'
    ? { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }
    : { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };

  const label = level === 'good' ? 'Full Tashkeel' : level === 'medium' ? 'Partial Tashkeel' : 'Low Tashkeel';

  return (
    <div
      className={`absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[9px] font-semibold tabular-nums ${palette.bg} ${palette.text} ${palette.border}`}
      title={`${pct}% of Arabic letters carry Tashkeel marks (fatha / kasra / damma / sukun / shadda / tanween)`}
    >
      {level === 'good' ? <Check className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
      {compact ? `${pct}%` : `${label} · ${pct}%`}
    </div>
  );
}
