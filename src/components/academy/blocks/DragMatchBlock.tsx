'use client';
import DragMatchGame from '@/components/academy/interactive/DragMatchGame';
import type { DragMatchBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function DragMatchBlockView({ block, ctx }: { block: DragMatchBlock; ctx: BlockContext }) {
  return <DragMatchGame exercise={block.exercise} isRTL={ctx.isRTL} color={ctx.color} />;
}
