'use client';

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { LetterPromptBlock } from '@/types/toolkit';
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

/* ── Main Component ───────────────────────────────────────────── */
export default function LetterPromptBlockView({ block, ctx }: { block: LetterPromptBlock; ctx: ToolkitBlockContext }) {
  const prefix = `toolkit:${ctx.toolkitSlug}:${block.id}`;
  const isRTL = ctx.isRTL;
  const color = ctx.color;
  const title = t(block.titleEn, block.titleAr, isRTL);
  const salutation = t(block.salutationEn, block.salutationAr, isRTL);
  const description = block.descriptionEn
    ? t(block.descriptionEn, block.descriptionAr || '', isRTL)
    : null;
  const [body, setBody] = useAutoSave(`${prefix}:body`);

  return (
    <div
      className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Warm accent top */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }} />

      <div className="p-5 sm:p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-[#2D2A33] mb-2">{title}</h3>

        {/* Optional description */}
        {description && (
          <p className="text-sm text-[#8E8E9F] italic leading-relaxed mb-4">{description}</p>
        )}

        {/* Salutation — non-editable */}
        <p className="text-sm font-medium text-[#2D2A33] mb-1" style={{ color }}>
          {salutation}
        </p>

        {/* Letter writing area — styled like writing paper */}
        <div className="relative">
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={block.lines || 8}
            dir={isRTL ? 'rtl' : 'ltr'}
            placeholder={isRTL ? 'اكْتُبي رِسالَتَكِ هُنا...' : 'Write your letter here...'}
            className="w-full px-4 py-3 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] leading-[2] focus:outline-none focus:ring-2 resize-y"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #F3EFE8 31px, #F3EFE8 32px)',
              backgroundPositionY: '11px',
              '--tw-ring-color': `${color}33`,
            } as React.CSSProperties}
          />
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
