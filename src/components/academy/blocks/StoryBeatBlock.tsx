'use client';
import { t } from '@/lib/academy-helpers';
import type { StoryBeatBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function StoryBeatBlockView({ block, ctx }: { block: StoryBeatBlock; ctx: BlockContext }) {
  const text = t(block.textEn, block.textAr, ctx.isRTL);
  const character = block.characterEn ? t(block.characterEn, block.characterAr || block.characterEn, ctx.isRTL) : null;
  return (
    <div className="max-w-xl mx-auto px-2">
      {character && (
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex-shrink-0 w-1 h-8 rounded-full"
            style={{ backgroundColor: ctx.color }}
          />
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: ctx.color }}
          >
            {character}
          </p>
        </div>
      )}
      <p
        className="text-[19px] sm:text-[21px] text-[#2D2A33] leading-[1.7] whitespace-pre-line font-normal"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {text}
      </p>
    </div>
  );
}
