'use client';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { t, tArray } from '@/lib/academy-helpers';
import type { ChecklistBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function ChecklistBlockView({ block, ctx }: { block: ChecklistBlock; ctx: BlockContext }) {
  const title = t(block.titleEn, block.titleAr, ctx.isRTL);
  const items = tArray(block.itemsEn, block.itemsAr, ctx.isRTL);
  const storageKey = `academy:block-checklist:${ctx.programSlug}:${ctx.moduleSlug}:${block.id}`;
  const [checked, setChecked] = useState<boolean[]>(() => new Array(items.length).fill(false));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
    if (next.every(Boolean)) ctx.onBlockComplete?.(block.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#F3EFE8] p-5 sm:p-6">
      <h3 className="text-sm font-semibold text-[#2D2A33] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex items-start gap-3 w-full text-left group"
            >
              <span
                className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  checked[i] ? 'border-transparent' : 'border-[#D6D1C8] group-hover:border-[color:var(--c)]'
                }`}
                style={{ '--c': ctx.color, backgroundColor: checked[i] ? ctx.color : 'transparent' } as React.CSSProperties}
              >
                {checked[i] && <Check className="w-3.5 h-3.5 text-white" />}
              </span>
              <span className={`text-sm leading-snug transition-colors ${checked[i] ? 'text-[#8E8E9F] line-through' : 'text-[#4A4A5C]'}`}>
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
