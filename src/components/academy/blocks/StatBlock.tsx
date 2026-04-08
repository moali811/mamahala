'use client';
import { t } from '@/lib/academy-helpers';
import type { StatBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function StatBlockView({ block, ctx }: { block: StatBlock; ctx: BlockContext }) {
  const label = t(block.labelEn, block.labelAr, ctx.isRTL);
  const source = block.sourceEn ? t(block.sourceEn, block.sourceAr || block.sourceEn, ctx.isRTL) : null;
  return (
    <div
      className="rounded-2xl p-6 text-center"
      style={{ background: `linear-gradient(135deg, ${ctx.color}10, ${ctx.color}04)` }}
    >
      <div
        className="text-5xl font-bold mb-2"
        style={{ color: ctx.color, fontFamily: 'var(--font-heading)' }}
      >
        {block.value}
      </div>
      <div className="text-sm text-[#4A4A5C] leading-snug">{label}</div>
      {source && <div className="text-[10px] text-[#8E8E9F] mt-2">{source}</div>}
    </div>
  );
}
