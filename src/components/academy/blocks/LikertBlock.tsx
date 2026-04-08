'use client';
import LikertScale from '@/components/academy/interactive/LikertScale';
import type { LikertBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function LikertBlockView({ block, ctx }: { block: LikertBlock; ctx: BlockContext }) {
  return (
    <LikertScale
      reflection={block.reflection}
      isRTL={ctx.isRTL}
      color={ctx.color}
      storageKey={`academy:likert:${ctx.programSlug}:${ctx.moduleSlug}:${block.id}`}
    />
  );
}
