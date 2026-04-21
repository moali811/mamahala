'use client';
/* ================================================================
   AssessmentFormat — sequential likert/radar prompts, then a
   generated personalized summary report.
   ================================================================ */

import BlockRenderer, { type BlockContext } from '@/components/academy/blocks/BlockRenderer';
import type { LessonBlock } from '@/types';

interface Props {
  blocks: LessonBlock[];
  ctx: BlockContext;
}

export default function AssessmentFormat({ blocks, ctx }: Props) {
  return (
    <div className="space-y-5">
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: `linear-gradient(135deg, ${ctx.color}10, ${ctx.color}04)` }}
      >
        <h2
          className="text-xl font-bold text-[#2D2A33] mb-1"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {ctx.isRTL ? 'تَقْييمٌ ذاتيّ' : 'Self-Assessment'}
        </h2>
        <p className="text-sm text-[#4A4A5C]">
          {ctx.isRTL
            ? 'أَجب بِصِدْق — هذا لَك وَحْدَك.'
            : 'Answer honestly — this is just for you.'}
        </p>
      </div>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} ctx={ctx} />
      ))}
    </div>
  );
}
