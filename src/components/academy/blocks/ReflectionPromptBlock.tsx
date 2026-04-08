'use client';
import { useState, useEffect } from 'react';
import { PenLine } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { ReflectionPromptBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function ReflectionPromptBlockView({ block, ctx }: { block: ReflectionPromptBlock; ctx: BlockContext }) {
  const storageKey = `academy:block-reflection:${ctx.programSlug}:${ctx.moduleSlug}:${block.id}`;
  const [text, setText] = useState('');

  useEffect(() => {
    try { const saved = localStorage.getItem(storageKey); if (saved) setText(saved); } catch {}
  }, [storageKey]);

  useEffect(() => {
    if (text) { try { localStorage.setItem(storageKey, text); } catch {} }
  }, [text, storageKey]);

  const prompt = t(block.promptEn, block.promptAr, ctx.isRTL);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const min = block.minWords || 0;

  return (
    <div className="bg-white rounded-2xl border border-[#F3EFE8] p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        <PenLine className="w-4 h-4" style={{ color: ctx.color }} />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F]">
          {ctx.isRTL ? 'تَأمُّل' : 'Reflection'}
        </span>
      </div>
      <p className="text-[#4A4A5C] mb-3 italic leading-relaxed">{prompt}</p>
      <textarea
        value={text}
        onChange={e => {
          setText(e.target.value);
          if (min > 0 && e.target.value.split(/\s+/).filter(Boolean).length >= min) {
            ctx.onBlockComplete?.(block.id);
          }
        }}
        rows={4}
        dir={ctx.isRTL ? 'rtl' : 'ltr'}
        placeholder={ctx.isRTL ? 'اكْتُبي هُنا…' : 'Write here…'}
        className="w-full px-4 py-3 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] focus:outline-none focus:border-[color:var(--c)] focus:ring-2 focus:ring-[color:var(--c)]/20 resize-y"
        style={{ '--c': ctx.color } as React.CSSProperties}
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-[10px] text-[#B0B0C0]">{ctx.isRTL ? 'يُحْفَظُ تِلْقائيّاً' : 'Auto-saved'}</p>
        <p className="text-[10px] text-[#B0B0C0]">
          {wordCount} {ctx.isRTL ? 'كَلِمَة' : 'words'}{min > 0 ? ` / ${min}` : ''}
        </p>
      </div>
    </div>
  );
}
