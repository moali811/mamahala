'use client';
import ScenarioBrancher from '@/components/academy/interactive/ScenarioBrancher';
import type { ScenarioBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function ScenarioBlockView({ block, ctx }: { block: ScenarioBlock; ctx: BlockContext }) {
  return <ScenarioBrancher scenario={block.scenario} isRTL={ctx.isRTL} color={ctx.color} />;
}
