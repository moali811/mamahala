'use client';
import FrameworkVisualizer from '@/components/academy/academic/FrameworkVisualizer';
import type { FrameworkBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function FrameworkBlockView({ block, ctx }: { block: FrameworkBlock; ctx: BlockContext }) {
  return <FrameworkVisualizer diagram={block.diagram} isRTL={ctx.isRTL} color={ctx.color} />;
}
