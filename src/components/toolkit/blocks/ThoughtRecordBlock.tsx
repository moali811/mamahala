'use client';

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { ThoughtRecordBlock } from '@/types/toolkit';
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

export default function ThoughtRecordBlockView({ block, ctx }: { block: ThoughtRecordBlock; ctx: ToolkitBlockContext }) {
  const isRTL = ctx.isRTL;
  const color = ctx.color;
  const title = block.titleEn ? t(block.titleEn, block.titleAr || '', isRTL) : null;

  return (
    <div
      className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Gradient top border */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }} />

      <div className="p-5 sm:p-6">
        {title && (
          <h3 className="text-lg font-semibold text-[#2D2A33] mb-5">{title}</h3>
        )}

        <div className="space-y-4">
          {block.fields.map((field, i) => (
            <ThoughtRecordField
              key={i}
              field={field}
              storageKey={`toolkit:${ctx.toolkitSlug}:${block.id}:field-${i}`}
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

function ThoughtRecordField({
  field,
  storageKey,
  isRTL,
  color,
}: {
  field: ThoughtRecordBlock['fields'][number];
  storageKey: string;
  isRTL: boolean;
  color: string;
}) {
  const [value, setValue] = useAutoSave(storageKey);
  const label = t(field.labelEn, field.labelAr, isRTL);
  const placeholder = field.placeholder ? t(field.placeholder.en, field.placeholder.ar, isRTL) : '';

  return (
    <div className="md:flex md:items-start md:gap-4">
      <label className="block text-sm font-semibold text-[#2D2A33] mb-1.5 md:mb-0 md:w-44 md:pt-2.5 md:shrink-0">
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        rows={2}
        dir={isRTL ? 'rtl' : 'ltr'}
        placeholder={placeholder || (isRTL ? 'اكْتُبي هُنا…' : 'Write here...')}
        className="w-full flex-1 px-4 py-2.5 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] focus:outline-none focus:ring-2 resize-y"
        style={{ '--tw-ring-color': `${color}33` } as React.CSSProperties}
      />
    </div>
  );
}
