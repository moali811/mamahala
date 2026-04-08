'use client';
import { t, tArray } from '@/lib/academy-helpers';
import type { ComparisonBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function ComparisonBlockView({ block, ctx }: { block: ComparisonBlock; ctx: BlockContext }) {
  const title = t(block.titleEn, block.titleAr, ctx.isRTL);
  const leftLabel = t(block.left.labelEn, block.left.labelAr, ctx.isRTL);
  const rightLabel = t(block.right.labelEn, block.right.labelAr, ctx.isRTL);
  const leftPoints = tArray(block.left.pointsEn, block.left.pointsAr, ctx.isRTL);
  const rightPoints = tArray(block.right.pointsEn, block.right.pointsAr, ctx.isRTL);

  return (
    <div className="bg-white rounded-2xl border border-[#F3EFE8] p-5 sm:p-6">
      <h3 className="text-base font-bold text-[#2D2A33] mb-4 text-center">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl p-4 bg-[#FBF2F0] border border-[#F5D5D5]">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#C4636A] mb-2">{leftLabel}</p>
          <ul className="space-y-1.5">
            {leftPoints.map((p, i) => (
              <li key={i} className="text-sm text-[#4A4A5C] flex gap-2">
                <span className="text-[#C4636A]">✗</span><span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-4 bg-[#F0F7F4] border border-[#D4E7D8]">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#3B8A6E] mb-2">{rightLabel}</p>
          <ul className="space-y-1.5">
            {rightPoints.map((p, i) => (
              <li key={i} className="text-sm text-[#4A4A5C] flex gap-2">
                <span className="text-[#3B8A6E]">✓</span><span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
