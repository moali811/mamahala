/* ================================================================
   Toolkit Block System — interactive content blocks for toolkits
   (journals, workbooks, guides, checklists).
   Extends the shared block types from ./blocks with toolkit-specific
   interactive blocks like journal days, thought records, etc.
   ================================================================ */

import type {
  ParagraphBlock,
  HeadingBlock,
  CalloutBlock,
  PullQuoteBlock,
  ChecklistBlock,
  ComparisonBlock,
  ReflectionPromptBlock,
  RevealBlock,
  TabsBlock,
} from './blocks';

/* ── Toolkit-specific block types ─────────────────────────────── */

export interface JournalDayBlock {
  kind: 'journal-day';
  id: string;
  dayNumber: number;
  titleEn: string;
  titleAr: string;
  introEn: string;
  introAr: string;
  intentionEn: string;
  intentionAr: string;
  gratitudeCount: number; // usually 3
  eveningPrompts: {
    labelEn: string;
    labelAr: string;
    type: 'text' | 'checklist' | 'scale';
    options?: { en: string; ar: string }[];
  }[];
}

export interface ThoughtRecordBlock {
  kind: 'thought-record';
  id: string;
  titleEn?: string;
  titleAr?: string;
  fields: {
    labelEn: string;
    labelAr: string;
    placeholder?: { en: string; ar: string };
  }[];
}

export interface ExposureLadderBlock {
  kind: 'exposure-ladder';
  id: string;
  titleEn: string;
  titleAr: string;
  rungs: number; // default 7
}

export interface AnxietyTrackerBlock {
  kind: 'anxiety-tracker';
  id: string;
  labelEn: string;
  labelAr: string;
  days: string[]; // ['Mon','Tue',...] or Arabic equivalents handled in component
}

export interface LetterPromptBlock {
  kind: 'letter-prompt';
  id: string;
  titleEn: string;
  titleAr: string;
  salutationEn: string;
  salutationAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  lines: number; // suggested line count
}

export interface FillableTableBlock {
  kind: 'fillable-table';
  id: string;
  titleEn?: string;
  titleAr?: string;
  columns: { headerEn: string; headerAr: string; width?: string }[];
  rows: number;
}

export interface InfoCardPairBlock {
  kind: 'info-card-pair';
  id: string;
  cards: [
    { titleEn: string; titleAr: string; bodyEn: string; bodyAr: string; icon?: string; color?: string },
    { titleEn: string; titleAr: string; bodyEn: string; bodyAr: string; icon?: string; color?: string },
  ];
}

export interface IconGridBlock {
  kind: 'icon-grid';
  id: string;
  titleEn?: string;
  titleAr?: string;
  columns?: number; // default 3 on desktop
  items: {
    iconName: string;
    labelEn: string;
    labelAr: string;
    descEn?: string;
    descAr?: string;
  }[];
}

export interface CycleDiagramBlock {
  kind: 'cycle-diagram';
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  steps: {
    labelEn: string;
    labelAr: string;
    descEn: string;
    descAr: string;
    color: string;
  }[];
}

export interface ProgressSummaryBlock {
  kind: 'progress-summary';
  id: string;
  titleEn: string;
  titleAr: string;
  fields: {
    labelEn: string;
    labelAr: string;
    type: 'scale' | 'text' | 'checklist';
    options?: { en: string; ar: string }[];
  }[];
}

/* ── Toolkit Block Union ──────────────────────────────────────── */
export type ToolkitBlock =
  | ParagraphBlock
  | HeadingBlock
  | CalloutBlock
  | PullQuoteBlock
  | ChecklistBlock
  | ComparisonBlock
  | ReflectionPromptBlock
  | RevealBlock
  | TabsBlock
  | JournalDayBlock
  | ThoughtRecordBlock
  | ExposureLadderBlock
  | AnxietyTrackerBlock
  | LetterPromptBlock
  | FillableTableBlock
  | InfoCardPairBlock
  | IconGridBlock
  | CycleDiagramBlock
  | ProgressSummaryBlock;

/* ── Toolkit Structure ────────────────────────────────────────── */
export type ToolkitFormat = 'journal' | 'workbook' | 'guide' | 'checklist';

export interface ToolkitSection {
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn?: string;
  subtitleAr?: string;
  dateRangeEn?: string;
  dateRangeAr?: string;
  color: string;
  iconName?: string;
  blocks: ToolkitBlock[];
}

export interface ToolkitMeta {
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  author: string;
  category: 'families' | 'adults' | 'youth' | 'couples';
  format: ToolkitFormat;
  color: string;
  totalDays?: number;
  heroQuoteEn?: string;
  heroQuoteAr?: string;
  howToUse: {
    iconName: string;
    labelEn: string;
    labelAr: string;
    descEn?: string;
    descAr?: string;
  }[];
  sections: ToolkitSection[];
  /** Premium toolkit settings */
  isPremium?: boolean;
  priceCAD?: number;
  /** Section ID to keep free when premium (first section if not specified) */
  freePreviewSectionId?: string;
}
