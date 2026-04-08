'use client';
import { Activity, Clock } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { ActivityBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function ActivityBlockView({ block, ctx }: { block: ActivityBlock; ctx: BlockContext }) {
  const title = t(block.titleEn, block.titleAr, ctx.isRTL);
  const desc = t(block.descriptionEn, block.descriptionAr, ctx.isRTL);
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{ background: `linear-gradient(135deg, #D4836A10, #D4836A04)`, border: '1px solid #D4836A20' }}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#D4836A]" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4836A]">
            {ctx.isRTL ? 'نَشاطٌ عَمَليّ' : 'Try this'}
          </span>
        </div>
        {block.durationMinutes && (
          <span className="inline-flex items-center gap-1 text-[10px] text-[#8E8E9F]">
            <Clock className="w-3 h-3" />{block.durationMinutes} min
          </span>
        )}
      </div>
      <h3 className="font-bold text-[#2D2A33] mb-1.5">{title}</h3>
      <p className="text-sm text-[#4A4A5C] leading-relaxed whitespace-pre-line">{desc}</p>
    </div>
  );
}
