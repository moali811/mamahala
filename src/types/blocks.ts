/* ================================================================
   Lesson Block System — flexible content blocks for modules.
   A module authored with `blocks: LessonBlock[]` is rendered by
   <BlockRenderer> inside a format-specific wrapper.
   ================================================================ */

import type {
  FrameworkDiagram,
  InteractiveScenario,
  DragMatchExercise,
  LikertReflection,
  ScenarioChoice,
  ModuleQuizQuestion,
} from './index';

export type ModuleFormat = 'standard' | 'story' | 'cards' | 'challenge' | 'assessment';

export type CalloutVariant = 'insight' | 'warning' | 'dr-hala' | 'culture';

/* ── Text / narrative ───────────────────────────────────────── */
export interface ParagraphBlock {
  kind: 'paragraph';
  id: string;
  textEn: string;
  textAr: string;
  tone?: 'body' | 'lead' | 'warm';
}

export interface HeadingBlock {
  kind: 'heading';
  id: string;
  level: 2 | 3;
  textEn: string;
  textAr: string;
}

export interface CalloutBlock {
  kind: 'callout';
  id: string;
  variant: CalloutVariant;
  textEn: string;
  textAr: string;
  icon?: string;
}

export interface PullQuoteBlock {
  kind: 'pullquote';
  id: string;
  textEn: string;
  textAr: string;
  attribution?: string;
}

/* ── Visual summaries ───────────────────────────────────────── */
export interface StatBlock {
  kind: 'stat';
  id: string;
  value: string;
  labelEn: string;
  labelAr: string;
  sourceEn?: string;
  sourceAr?: string;
}

export interface ComparisonSide {
  labelEn: string;
  labelAr: string;
  pointsEn: string[];
  pointsAr: string[];
}

export interface ComparisonBlock {
  kind: 'comparison';
  id: string;
  titleEn: string;
  titleAr: string;
  left: ComparisonSide;
  right: ComparisonSide;
}

export interface ChecklistBlock {
  kind: 'checklist';
  id: string;
  titleEn: string;
  titleAr: string;
  itemsEn: string[];
  itemsAr: string[];
}

export interface FrameworkBlock {
  kind: 'framework';
  id: string;
  diagram: FrameworkDiagram;
}

/* ── Interactive (wrap existing components) ─────────────────── */
export interface MicroQuizBlock {
  kind: 'micro-quiz';
  id: string;
  question: ModuleQuizQuestion;
}

export interface ScenarioBlock {
  kind: 'scenario';
  id: string;
  scenario: InteractiveScenario;
}

export interface DragMatchBlock {
  kind: 'drag-match';
  id: string;
  exercise: DragMatchExercise;
}

export interface LikertBlock {
  kind: 'likert';
  id: string;
  reflection: LikertReflection;
}

/* ── Activity prompts ───────────────────────────────────────── */
export interface ReflectionPromptBlock {
  kind: 'reflection-prompt';
  id: string;
  promptEn: string;
  promptAr: string;
  minWords?: number;
}

export interface ActivityBlock {
  kind: 'activity';
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  durationMinutes?: number;
}

/* ── Progressive disclosure ─────────────────────────────────── */
export interface RevealBlock {
  kind: 'reveal';
  id: string;
  triggerEn: string;
  triggerAr: string;
  children: LessonBlock[];
}

export interface TabBlock {
  labelEn: string;
  labelAr: string;
  children: LessonBlock[];
}

export interface TabsBlock {
  kind: 'tabs';
  id: string;
  tabs: TabBlock[];
}

/* ── Card-format specific ───────────────────────────────────── */
export interface CardBlock {
  kind: 'card';
  id: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  image?: string;
  accentColor?: string;
}

/* ── Story-format specific ──────────────────────────────────── */
export interface StoryBeatBlock {
  kind: 'story-beat';
  id: string;
  characterEn?: string;
  characterAr?: string;
  textEn: string;
  textAr: string;
  image?: string;
}

export interface StoryChoiceBlock {
  kind: 'story-choice';
  id: string;
  promptEn: string;
  promptAr: string;
  choices: ScenarioChoice[];
}

/* ── Video ──────────────────────────────────────────────────── */
export type VideoProvider = 'youtube' | 'vimeo' | 'direct';

export interface VideoBlock {
  kind: 'video';
  id: string;
  provider: VideoProvider;
  src: string;              // YouTube/Vimeo ID, or full URL for 'direct'
  titleEn: string;
  titleAr: string;
  captionEn?: string;
  captionAr?: string;
  durationSeconds?: number;
  poster?: string;
}

/* ── Interactive Video (video with timestamp checkpoints) ──── */
export interface VideoCheckpoint {
  atSeconds: number;
  labelEn: string;
  labelAr: string;
  question: ModuleQuizQuestion;  // inline quiz to answer before continuing
}

export interface InteractiveVideoBlock {
  kind: 'interactive-video';
  id: string;
  provider: VideoProvider;        // 'direct' recommended for programmatic pause; 'youtube' shows chapters
  src: string;
  titleEn: string;
  titleAr: string;
  instructorEn?: string;          // e.g. "Dr. Hala Ali"
  instructorAr?: string;
  summaryEn?: string;
  summaryAr?: string;
  durationSeconds?: number;
  poster?: string;
  checkpoints: VideoCheckpoint[];
}

/* ── Challenge-format specific ──────────────────────────────── */
export interface ChallengeStepBlock {
  kind: 'challenge-step';
  id: string;
  dayLabel: number;
  titleEn: string;
  titleAr: string;
  instructionEn: string;
  instructionAr: string;
  checkInPromptEn: string;
  checkInPromptAr: string;
}

/* ── Journey block (inline interactive narrative sequence) ─── */
export type JourneyIcon =
  | 'heart' | 'cloud-rain' | 'frown' | 'smile' | 'sparkle'
  | 'star' | 'sun' | 'moon' | 'wind' | 'flame' | 'leaf' | 'book';

export interface JourneyStep {
  id: string;
  icon?: JourneyIcon;
  timeLabelEn?: string;   // e.g. "7:15 AM"
  timeLabelAr?: string;
  titleEn: string;
  titleAr: string;
  narrativeEn: string;
  narrativeAr: string;
  /** If present, this step is a pause-point: after Continue, the reveal body is shown before moving on. */
  revealLabelEn?: string;
  revealLabelAr?: string;
  revealTextEn?: string;
  revealTextAr?: string;
  revealTone?: 'insight' | 'warmth' | 'warning';
  /** Hex accent color for this step (defaults to plum). */
  accentColor?: string;
  /** Mark as the intro/welcome step (no time label, no pause-point). */
  isIntro?: boolean;
  /** Mark as the closing/outro step. */
  isOutro?: boolean;
  /** If true AND the step has a reveal, the reveal is HIDDEN until user clicks "Pause Here". Otherwise reveal shows inline. */
  isPausePoint?: boolean;
}

export interface JourneyBlock {
  kind: 'journey';
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn?: string;
  subtitleAr?: string;
  durationLabelEn?: string;   // e.g. "~3 min total"
  durationLabelAr?: string;
  steps: JourneyStep[];
}

/* ── Union ─────────────────────────────────────────────────── */
export type LessonBlock =
  | ParagraphBlock
  | HeadingBlock
  | CalloutBlock
  | PullQuoteBlock
  | StatBlock
  | ComparisonBlock
  | ChecklistBlock
  | FrameworkBlock
  | MicroQuizBlock
  | ScenarioBlock
  | DragMatchBlock
  | LikertBlock
  | ReflectionPromptBlock
  | ActivityBlock
  | RevealBlock
  | TabsBlock
  | CardBlock
  | StoryBeatBlock
  | StoryChoiceBlock
  | ChallengeStepBlock
  | VideoBlock
  | InteractiveVideoBlock
  | JourneyBlock;

export type LessonBlockKind = LessonBlock['kind'];

/* ── Type guards ───────────────────────────────────────────── */
export function isHeadingBlock(b: LessonBlock): b is HeadingBlock {
  return b.kind === 'heading';
}
export function isMicroQuizBlock(b: LessonBlock): b is MicroQuizBlock {
  return b.kind === 'micro-quiz';
}
export function isCardBlock(b: LessonBlock): b is CardBlock {
  return b.kind === 'card';
}
export function isStoryBeatBlock(b: LessonBlock): b is StoryBeatBlock {
  return b.kind === 'story-beat';
}
export function isStoryChoiceBlock(b: LessonBlock): b is StoryChoiceBlock {
  return b.kind === 'story-choice';
}
export function isChallengeStepBlock(b: LessonBlock): b is ChallengeStepBlock {
  return b.kind === 'challenge-step';
}
