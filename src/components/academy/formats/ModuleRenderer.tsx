'use client';
/* ================================================================
   ModuleRenderer — picks the right format wrapper based on
   module.format, and hands off to BlockRenderer for individual
   block rendering.
   ================================================================ */

import type { AcademyModule, ModuleFormat } from '@/types';
import type { BlockContext } from '@/components/academy/blocks/BlockRenderer';
import StandardFormat from './StandardFormat';
import StoryFormat from './StoryFormat';
import CardsFormat from './CardsFormat';
import ChallengeFormat from './ChallengeFormat';
import AssessmentFormat from './AssessmentFormat';

interface Props {
  module: AcademyModule;
  ctx: BlockContext;
}

export default function ModuleRenderer({ module: mod, ctx }: Props) {
  const blocks = mod.blocks ?? [];
  const format: ModuleFormat = mod.format ?? 'standard';

  switch (format) {
    case 'story': return <StoryFormat blocks={blocks} ctx={ctx} />;
    case 'cards': return <CardsFormat blocks={blocks} ctx={ctx} />;
    case 'challenge': return <ChallengeFormat blocks={blocks} ctx={ctx} />;
    case 'assessment': return <AssessmentFormat blocks={blocks} ctx={ctx} />;
    case 'standard':
    default: return <StandardFormat blocks={blocks} ctx={ctx} />;
  }
}
