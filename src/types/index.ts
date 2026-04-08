/* ================================================================
   Shared TypeScript Interfaces
   ================================================================ */

export type Locale = 'en' | 'ar';

export type ServiceCategory = 'youth' | 'families' | 'adults' | 'couples' | 'experiential';

export interface RegionalPrice {
  online: [number, number];   // [standard-min, standard-max]
  inPerson: [number, number]; // [standard-min, standard-max]
}

export interface Service {
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  shortDesc: string;
  shortDescAr: string;
  category: ServiceCategory;
  priceFrom: number;
  currency: string;
  duration: string;
  icon: string; // Lucide icon name
  image?: string; // Hero image path
  pricingCAD?: { online: [number, number]; inPerson?: [number, number] };
  pricingAED?: { online: [number, number]; inPerson?: [number, number] };
  whoIsThisFor: string[];
  whoIsThisForAr: string[];
  whatToExpect: string[];
  whatToExpectAr: string[];
  approach: string;
  approachAr: string;
  faqs: FAQ[];
}

export interface ServiceCategoryInfo {
  key: ServiceCategory;
  name: string;
  nameAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  image: string;
  color: string; // Tailwind color class
}

export interface FAQ {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  link?: { href: string; labelEn: string; labelAr: string };
  tag?: string;
  tagAr?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  textAr: string;
  role: string;
  roleAr: string;
  category: ServiceCategory | 'general';
  rating: number;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  date: string;
  category: string;
  author: string;
  readTime: number;
  image: string;
  featured?: boolean;
}

export interface Program {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  type: 'course' | 'group' | 'workshop';
  price: number;
  currency: string;
  duration: string;
  modules: string[];
  modulesAr: string[];
  status: 'coming-soon' | 'enrolling' | 'in-progress';
  image: string;
}

/* ── Mama Hala Academy ───────────────────────────────────────── */

export interface ModuleQuizQuestion {
  textEn: string;
  textAr: string;
  options: { labelEn: string; labelAr: string; correct: boolean; explanationEn?: string; explanationAr?: string }[];
  explanationEn?: string;
  explanationAr?: string;
}

export interface ModuleQuiz {
  questions: ModuleQuizQuestion[];
  passingScore: number; // percentage 0-100
}

/* ── Interactive & Academic Data Types ───────────────────────── */

export interface ResearchCitation {
  authorShort: string;           // e.g. "Gottman & Silver, 1999"
  titleEn: string;
  titleAr: string;
  journal?: string;
  year: number;
  doi?: string;
  findingEn: string;             // one-sentence key finding
  findingAr: string;
  evidenceStrength: 'strong' | 'moderate' | 'emerging';
}

export type FrameworkDiagramType = 'triangle' | 'wheel' | 'cycle' | 'spectrum' | 'iceberg' | 'quadrant' | 'flowchart';

export interface FrameworkNode {
  id: string;
  labelEn: string;
  labelAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color?: string;
  position: { x: number; y: number }; // percentage 0-100
}

export interface FrameworkConnection {
  from: string;
  to: string;
  labelEn?: string;
  labelAr?: string;
}

export interface FrameworkDiagram {
  type: FrameworkDiagramType;
  titleEn: string;
  titleAr: string;
  nodes: FrameworkNode[];
  connections?: FrameworkConnection[];
}

export interface ScenarioChoice {
  labelEn: string;
  labelAr: string;
  feedbackEn: string;
  feedbackAr: string;
  isRecommended: boolean;
  nextStep?: number;
}

export interface ScenarioStep {
  textEn: string;
  textAr: string;
  choices: ScenarioChoice[];
}

export interface InteractiveScenario {
  titleEn: string;
  titleAr: string;
  contextEn: string;
  contextAr: string;
  steps: ScenarioStep[];
}

export interface DragMatchPair {
  conceptEn: string;
  conceptAr: string;
  matchEn: string;
  matchAr: string;
}

export interface DragMatchExercise {
  titleEn: string;
  titleAr: string;
  instructionEn: string;
  instructionAr: string;
  pairs: DragMatchPair[];
}

export interface LikertInterpretation {
  min: number;
  max: number;
  labelEn: string;
  labelAr: string;
  feedbackEn: string;
  feedbackAr: string;
}

export interface LikertReflection {
  titleEn: string;
  titleAr: string;
  statementEn: string;
  statementAr: string;
  scaleLabels: { lowEn: string; lowAr: string; highEn: string; highAr: string };
  interpretations: LikertInterpretation[];
}

export interface SelfAssessmentDimension {
  labelEn: string;
  labelAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface SelfAssessmentWheel {
  titleEn: string;
  titleAr: string;
  dimensions: SelfAssessmentDimension[];
}

export interface LearningObjective {
  textEn: string;
  textAr: string;
  // Optional — when all these blocks are completed, the objective auto-ticks.
  relatedBlockIds?: string[];
}

export interface AcademyModule {
  slug: string;
  titleEn: string;
  titleAr: string;
  durationMinutes: number;
  lesson: { contentEn: string; contentAr: string };
  drHalaNote?: { en: string; ar: string };
  keyTakeaways: { en: string[]; ar: string[] };
  reflection: { promptEn: string; promptAr: string };
  activity: { titleEn: string; titleAr: string; descriptionEn: string; descriptionAr: string };
  quiz: ModuleQuiz;
  aiFaq: { questionEn: string; questionAr: string; answerEn: string; answerAr: string }[];
  // Enhanced interactive fields (all optional for backward compatibility)
  learningObjectives?: LearningObjective[];
  researchCitations?: ResearchCitation[];
  frameworkDiagrams?: FrameworkDiagram[];
  scenarios?: InteractiveScenario[];
  dragMatchExercises?: DragMatchExercise[];
  likertReflections?: LikertReflection[];
  selfAssessment?: SelfAssessmentWheel;
  estimatedReadTimeMinutes?: number;
  skillTags?: string[];
  // Block-based content (new modular format)
  format?: ModuleFormat;
  blocks?: LessonBlock[];
}

// Re-export block system types for convenience
export type {
  LessonBlock,
  LessonBlockKind,
  ModuleFormat,
  CalloutVariant,
  ParagraphBlock,
  HeadingBlock,
  CalloutBlock,
  PullQuoteBlock,
  StatBlock,
  ComparisonBlock,
  ChecklistBlock,
  FrameworkBlock,
  MicroQuizBlock,
  ScenarioBlock,
  DragMatchBlock,
  LikertBlock,
  ReflectionPromptBlock,
  ActivityBlock,
  RevealBlock,
  TabsBlock,
  TabBlock,
  CardBlock,
  StoryBeatBlock,
  StoryChoiceBlock,
  ChallengeStepBlock,
  VideoBlock,
  VideoProvider,
  InteractiveVideoBlock,
  VideoCheckpoint,
  JourneyBlock,
  JourneyStep,
  JourneyIcon,
} from './blocks';

import type { LessonBlock, ModuleFormat } from './blocks';

export interface AcademyLevel {
  level: 1 | 2 | 3;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  isFree: boolean;
  /** CAD price per level. Used when isFree is false. Falls back to academyLevelPrice. */
  priceCAD?: number;
  modules: AcademyModule[];
}

export interface ProgramFinderQuestion {
  questionEn: string;
  questionAr: string;
  answerOptions: { labelEn: string; labelAr: string; matchScore: number }[];
}

export interface AcademyProgram {
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  longDescriptionEn: string;
  longDescriptionAr: string;
  category: ServiceCategory;
  image: string;
  color: string;
  icon: string;
  isFree: boolean;
  priceCAD?: number;
  totalModules: number;
  totalDurationHours: number;
  levels: AcademyLevel[];
  certificate: { titleEn: string; titleAr: string; signedBy: string };
  whoIsThisFor: { en: string[]; ar: string[] };
  whatYouWillLearn: { en: string[]; ar: string[] };
  // Enhanced fields
  researchFoundation?: {
    primaryFrameworkEn: string;
    primaryFrameworkAr: string;
    theoreticalBases: string[];
  };
  skillDimensions?: string[];
  recommendedFor?: ProgramFinderQuestion[];
}

/* ── Smart Events System ─────────────────────────────────────── */

export type EventType = 'workshop' | 'webinar' | 'community-gathering' | 'retreat' | 'support-group';
export type EventAudience = 'youth' | 'families' | 'adults' | 'couples' | 'community';
export type EventLocationType = 'online' | 'in-person' | 'hybrid';
export type RegistrationStatus = 'open' | 'almost-full' | 'waitlist' | 'closed';
export type RegistrationType = 'rsvp' | 'cal' | 'external' | 'none';

export interface EventSession {
  date: string;       // ISO date '2026-04-22'
  startTime: string;  // 24h '19:00'
  endTime: string;    // 24h '20:30'
}

export interface EventFacilitator {
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  image?: string;
}

export interface EventFAQ {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export interface SmartEvent {
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  longDescriptionEn?: string;
  longDescriptionAr?: string;
  scenarioEn?: string;
  scenarioAr?: string;

  type: EventType;
  audiences: EventAudience[];
  relatedServiceSlug?: string;

  // Scheduling
  date: string;         // ISO date '2026-04-15' (use future date for TBD)
  startTime: string;    // 24h '19:00'
  endTime: string;      // 24h '20:30'
  timezone: string;     // IANA 'America/Toronto'
  dateTBD?: boolean;    // true = date not confirmed yet, show "TBD"
  sessions?: EventSession[]; // Multi-session events

  // Location
  locationType: EventLocationType;
  locationNameEn: string;
  locationNameAr: string;
  locationAddress?: string;

  // Pricing
  isFree: boolean;
  priceCAD?: number;
  earlyBirdPriceCAD?: number;
  earlyBirdDeadline?: string; // ISO date
  priceNoteEn?: string;
  priceNoteAr?: string;

  // Registration
  capacity?: number;
  spotsRemaining?: number;
  registrationStatus: RegistrationStatus;
  registrationUrl?: string;
  registrationType: RegistrationType;
  calEventSlug?: string;
  externalRegistrationUrl?: string;
  registrationFields?: { phone?: boolean; notes?: boolean };
  confirmationMessageEn?: string;
  confirmationMessageAr?: string;

  // Display
  image?: string;
  gradient?: string;
  featured?: boolean;

  // Detail content
  facilitator?: EventFacilitator;
  whatToBringEn?: string[];
  whatToBringAr?: string[];
  faqs?: EventFAQ[];

  // Learning outcomes
  outcomesEn?: string[];
  outcomesAr?: string[];

  // Target audience description
  audienceDescEn?: string;
  audienceDescAr?: string;

  // Fee/pricing display
  feeDisplayEn?: string;
  feeDisplayAr?: string;

  // Duration & format description
  formatDescEn?: string;
  formatDescAr?: string;

  // Past events
  galleryImages?: string[];
  highlightEn?: string;
  highlightAr?: string;
  /** If this past event originated from a community pulse vote, record how many voices asked for it. */
  pulseOriginVotes?: number;

  // Series grouping
  seriesId?: string;
  tags?: string[];

  // Content freshness
  dateAdded?: string; // ISO date — shows "New" badge for 14 days
}

/* ── Event Lifecycle ────────────────────────────────────────── */

export type EventLifecycleState =
  | 'concept'           // dateTBD, low pulse — idea stage
  | 'gauging'           // dateTBD, pulse >= threshold — gaining traction
  | 'scheduled'         // date confirmed, registration not yet open
  | 'registration-open' // date set, registration open, plenty of spots
  | 'almost-full'       // spots remaining <= 20% of capacity
  | 'sold-out'          // spots remaining = 0 or waitlist
  | 'live'              // happening right now
  | 'completed'         // past event, < 30 days ago
  | 'archived';         // past event, >= 30 days ago

export interface EventLifecycle {
  state: EventLifecycleState;
  section: 'upcoming' | 'pulse' | 'past';
  urgency: 'none' | 'low' | 'medium' | 'high';
  badgeLabelEn?: string;
  badgeLabelAr?: string;
}

export interface Download {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  type: 'worksheet' | 'guide' | 'ebook' | 'checklist';
  price: number;
  currency: string;
  category: ServiceCategory | 'general';
  downloadUrl: string;
  image: string;
  isFree: boolean;
}

export interface VisitorProfile {
  lastService?: string;
  lastCategory?: ServiceCategory;
  lastVisit?: string;
  visitCount: number;
  preferredContact?: 'cal' | 'whatsapp';
  quizResults?: string[];
  viewedServices: string[];
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: string;
  items?: { label: string; href: string }[];
}
