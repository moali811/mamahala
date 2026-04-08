'use client';
import { t } from '@/lib/academy-helpers';
import type { ParagraphBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function ParagraphBlockView({ block, ctx }: { block: ParagraphBlock; ctx: BlockContext }) {
  const text = t(block.textEn, block.textAr, ctx.isRTL);
  const isLead = block.tone === 'lead';
  const isWarm = block.tone === 'warm';
  return (
    <p
      className={`leading-relaxed whitespace-pre-line ${
        isLead ? 'text-lg text-[#2D2A33] font-medium' :
        isWarm ? 'text-[#4A4A5C] italic' :
        'text-[#4A4A5C]'
      }`}
    >
      {text}
    </p>
  );
}
