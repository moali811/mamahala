'use client';
import { t } from '@/lib/academy-helpers';
import type { PullQuoteBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function PullQuoteBlockView({ block, ctx }: { block: PullQuoteBlock; ctx: BlockContext }) {
  const text = t(block.textEn, block.textAr, ctx.isRTL);
  return (
    <blockquote
      className="border-l-4 pl-6 py-2 my-2 italic text-xl text-[#2D2A33] leading-relaxed"
      style={{ borderColor: ctx.color, fontFamily: 'var(--font-heading)' }}
    >
      &ldquo;{text}&rdquo;
      {block.attribution && (
        <footer className="text-xs text-[#8E8E9F] mt-2 not-italic">— {block.attribution}</footer>
      )}
    </blockquote>
  );
}
