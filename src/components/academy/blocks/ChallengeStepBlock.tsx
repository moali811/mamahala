'use client';
import { t } from '@/lib/academy-helpers';
import type { ChallengeStepBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function ChallengeStepBlockView({ block, ctx }: { block: ChallengeStepBlock; ctx: BlockContext }) {
  const title = t(block.titleEn, block.titleAr, ctx.isRTL);
  const instruction = t(block.instructionEn, block.instructionAr, ctx.isRTL);
  return (
    <div className="bg-white rounded-2xl border border-[#F3EFE8] p-5">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: ctx.color }}
        >
          {block.dayLabel}
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F]">
            {ctx.isRTL ? `اليَوْم ${block.dayLabel}` : `Day ${block.dayLabel}`}
          </p>
          <h3 className="text-base font-bold text-[#2D2A33] leading-tight">{title}</h3>
        </div>
      </div>
      <p className="text-sm text-[#4A4A5C] leading-relaxed whitespace-pre-line">{instruction}</p>
    </div>
  );
}
