'use client';

/* ================================================================
   BlockRenderer — central switchboard for every LessonBlock kind.
   Each block type has a small component; they share a common API
   and coordinate through onBlockComplete + useBlockState().
   ================================================================ */

import type { LessonBlock, Locale } from '@/types';
import ParagraphBlockView from './ParagraphBlock';
import HeadingBlockView from './HeadingBlock';
import CalloutBlockView from './CalloutBlock';
import PullQuoteBlockView from './PullQuoteBlock';
import StatBlockView from './StatBlock';
import ComparisonBlockView from './ComparisonBlock';
import ChecklistBlockView from './ChecklistBlock';
import FrameworkBlockView from './FrameworkBlock';
import MicroQuizBlockView from './MicroQuizBlock';
import ScenarioBlockView from './ScenarioBlock';
import DragMatchBlockView from './DragMatchBlock';
import LikertBlockView from './LikertBlock';
import ReflectionPromptBlockView from './ReflectionPromptBlock';
import ActivityBlockView from './ActivityBlock';
import RevealBlockView from './RevealBlock';
import TabsBlockView from './TabsBlock';
import CardBlockView from './CardBlock';
import StoryBeatBlockView from './StoryBeatBlock';
import ChallengeStepBlockView from './ChallengeStepBlock';
import VideoBlockView from './VideoBlock';
import InteractiveVideoBlockView from './InteractiveVideoBlock';
import JourneyBlockView from './JourneyBlock';

export interface BlockContext {
  locale: Locale;
  isRTL: boolean;
  color: string;
  programSlug: string;
  moduleSlug: string;
  onBlockComplete?: (blockId: string, value?: unknown) => void;
}

interface Props {
  block: LessonBlock;
  ctx: BlockContext;
}

export default function BlockRenderer({ block, ctx }: Props) {
  switch (block.kind) {
    case 'paragraph': return <ParagraphBlockView block={block} ctx={ctx} />;
    case 'heading': return <HeadingBlockView block={block} ctx={ctx} />;
    case 'callout': return <CalloutBlockView block={block} ctx={ctx} />;
    case 'pullquote': return <PullQuoteBlockView block={block} ctx={ctx} />;
    case 'stat': return <StatBlockView block={block} ctx={ctx} />;
    case 'comparison': return <ComparisonBlockView block={block} ctx={ctx} />;
    case 'checklist': return <ChecklistBlockView block={block} ctx={ctx} />;
    case 'framework': return <FrameworkBlockView block={block} ctx={ctx} />;
    case 'micro-quiz': return <MicroQuizBlockView block={block} ctx={ctx} />;
    case 'scenario': return <ScenarioBlockView block={block} ctx={ctx} />;
    case 'drag-match': return <DragMatchBlockView block={block} ctx={ctx} />;
    case 'likert': return <LikertBlockView block={block} ctx={ctx} />;
    case 'reflection-prompt': return <ReflectionPromptBlockView block={block} ctx={ctx} />;
    case 'activity': return <ActivityBlockView block={block} ctx={ctx} />;
    case 'reveal': return <RevealBlockView block={block} ctx={ctx} />;
    case 'tabs': return <TabsBlockView block={block} ctx={ctx} />;
    case 'card': return <CardBlockView block={block} ctx={ctx} />;
    case 'story-beat': return <StoryBeatBlockView block={block} ctx={ctx} />;
    // story-choice is handled inside StoryFormat (needs branching logic)
    case 'story-choice': return null;
    // challenge-step is handled inside ChallengeFormat (needs per-day tracker)
    case 'challenge-step': return <ChallengeStepBlockView block={block} ctx={ctx} />;
    case 'video': return <VideoBlockView block={block} ctx={ctx} />;
    case 'interactive-video': return <InteractiveVideoBlockView block={block} ctx={ctx} />;
    case 'journey': return <JourneyBlockView block={block} ctx={ctx} />;
    default: return null;
  }
}
