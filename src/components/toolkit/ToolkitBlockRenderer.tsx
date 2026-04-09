'use client';

/* ================================================================
   ToolkitBlockRenderer — switchboard for toolkit block types.
   Shared block types (paragraph, heading, callout, etc.) are
   delegated to the academy BlockRenderer. Toolkit-specific blocks
   are rendered by their own dedicated components.
   ================================================================ */

import type { ToolkitBlock } from '@/types/toolkit';
import type { LessonBlock, Locale } from '@/types';
import AcademyBlockRenderer, { type BlockContext } from '@/components/academy/blocks/BlockRenderer';

/* ── Toolkit-specific block components ─────────────────────────── */
import JournalDayBlockView from './blocks/JournalDayBlock';
import ThoughtRecordBlockView from './blocks/ThoughtRecordBlock';
import ExposureLadderBlockView from './blocks/ExposureLadderBlock';
import AnxietyTrackerBlockView from './blocks/AnxietyTrackerBlock';
import LetterPromptBlockView from './blocks/LetterPromptBlock';
import FillableTableBlockView from './blocks/FillableTableBlock';
import InfoCardPairBlockView from './blocks/InfoCardPairBlock';
import IconGridBlockView from './blocks/IconGridBlock';
import CycleDiagramBlockView from './blocks/CycleDiagramBlock';
import ProgressSummaryBlockView from './blocks/ProgressSummaryBlock';

/* ── Context types ─────────────────────────────────────────────── */
export interface ToolkitBlockContext {
  locale: string;
  isRTL: boolean;
  color: string;
  toolkitSlug: string;
}

interface Props {
  block: ToolkitBlock;
  ctx: ToolkitBlockContext;
}

/* ── Shared block kinds that the academy renderer handles ───────── */
const SHARED_BLOCK_KINDS = new Set([
  'paragraph',
  'heading',
  'callout',
  'pullquote',
  'checklist',
  'reflection-prompt',
  'reveal',
  'tabs',
]);

/* ── Build academy BlockContext from ToolkitBlockContext ──────── */
function toAcademyCtx(ctx: ToolkitBlockContext): BlockContext {
  return {
    locale: ctx.locale as Locale,
    isRTL: ctx.isRTL,
    color: ctx.color,
    programSlug: ctx.toolkitSlug,
    moduleSlug: 'toolkit',
  };
}

/* ── Main Renderer ─────────────────────────────────────────────── */
export default function ToolkitBlockRenderer({ block, ctx }: Props) {
  /* Shared blocks — delegate to the academy BlockRenderer */
  if (SHARED_BLOCK_KINDS.has(block.kind)) {
    return (
      <AcademyBlockRenderer
        block={block as LessonBlock}
        ctx={toAcademyCtx(ctx)}
      />
    );
  }

  /* Toolkit-specific blocks */
  switch (block.kind) {
    case 'journal-day':
      return <JournalDayBlockView block={block} ctx={ctx} />;
    case 'thought-record':
      return <ThoughtRecordBlockView block={block} ctx={ctx} />;
    case 'exposure-ladder':
      return <ExposureLadderBlockView block={block} ctx={ctx} />;
    case 'anxiety-tracker':
      return <AnxietyTrackerBlockView block={block} ctx={ctx} />;
    case 'letter-prompt':
      return <LetterPromptBlockView block={block} ctx={ctx} />;
    case 'fillable-table':
      return <FillableTableBlockView block={block} ctx={ctx} />;
    case 'info-card-pair':
      return <InfoCardPairBlockView block={block} ctx={ctx} />;
    case 'icon-grid':
      return <IconGridBlockView block={block} ctx={ctx} />;
    case 'cycle-diagram':
      return <CycleDiagramBlockView block={block} ctx={ctx} />;
    case 'progress-summary':
      return <ProgressSummaryBlockView block={block} ctx={ctx} />;
    default:
      return null;
  }
}
