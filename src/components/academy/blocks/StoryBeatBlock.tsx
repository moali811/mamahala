'use client';
import { t } from '@/lib/academy-helpers';
import type { StoryBeatBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function StoryBeatBlockView({ block, ctx }: { block: StoryBeatBlock; ctx: BlockContext }) {
  const text = t(block.textEn, block.textAr, ctx.isRTL);
  const character = block.characterEn ? t(block.characterEn, block.characterAr || block.characterEn, ctx.isRTL) : null;

  // Split text into paragraphs and classify each as dialogue or narration
  const paragraphs = text.split('\n\n').filter(Boolean);

  return (
    <div className="max-w-xl mx-auto px-2">
      {character && (
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex-shrink-0 w-1.5 h-8 rounded-full"
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
      <div className="space-y-5">
        {paragraphs.map((para, i) => {
          const trimmed = para.trim();
          const isDialogue = /^[""\u201C]/.test(trimmed) || /^[\(]/.test(trimmed);

          if (isDialogue) {
            return (
              <div
                key={i}
                className="relative"
                style={{ paddingInlineStart: '1.25rem' }}
              >
                {/* Colored accent bar for dialogue */}
                <div
                  className="absolute top-0 bottom-0 rounded-full"
                  style={{
                    insetInlineStart: 0,
                    width: '3px',
                    background: `linear-gradient(180deg, ${ctx.color}, ${ctx.color}60)`,
                  }}
                />
                <p
                  className="text-[19px] sm:text-[21px] text-[#2D2A33] leading-[1.7] whitespace-pre-line font-medium italic"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {trimmed}
                </p>
              </div>
            );
          }

          return (
            <p
              key={i}
              className="text-[19px] sm:text-[21px] text-[#4A4A5C] leading-[1.7] whitespace-pre-line font-normal"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {trimmed}
            </p>
          );
        })}
      </div>
    </div>
  );
}
