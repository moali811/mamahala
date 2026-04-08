'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { RevealBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';
import BlockRenderer from './BlockRenderer';

export default function RevealBlockView({ block, ctx }: { block: RevealBlock; ctx: BlockContext }) {
  const [open, setOpen] = useState(false);
  const trigger = t(block.triggerEn, block.triggerAr, ctx.isRTL);
  return (
    <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden">
      <button
        onClick={() => { setOpen(v => !v); if (!open) ctx.onBlockComplete?.(block.id); }}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-[#FAF7F2] transition-colors"
      >
        <span className="text-sm font-semibold text-[#2D2A33]">{trigger}</span>
        <ChevronDown className={`w-4 h-4 text-[#8E8E9F] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 space-y-3 border-t border-[#F3EFE8]">
          {block.children.map((child) => (
            <BlockRenderer key={child.id} block={child} ctx={ctx} />
          ))}
        </div>
      )}
    </div>
  );
}
