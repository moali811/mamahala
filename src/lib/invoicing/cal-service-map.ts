/* ================================================================
   Cal.com Event Type → Canonical Service Slug Mapper
   ================================================================
   Dr. Hala's Cal.com event types map to the 21 canonical service
   slugs in src/data/services.ts. This file is the single source of
   truth for that mapping.

   When Dr. Hala creates a new Cal.com event type, add its slug here
   so incoming bookings auto-match to the right service category
   (and thus the right pricing tier, invoice template, etc.).

   Unknown Cal.com slugs fall back to `individual-counseling` with a
   warning appended to the draft's admin note.
   ================================================================ */

/**
 * Map a Cal.com event type slug to a canonical service slug.
 * Keys are lowercased for case-insensitive matching.
 */
const CAL_SLUG_TO_SERVICE: Record<string, string> = {
  // Intake / consultation
  'initial-consultation': 'individual-counseling',
  'free-consultation': 'individual-counseling',
  'discovery-call': 'individual-counseling',
  '30min': 'individual-counseling',
  '60min': 'individual-counseling',

  // Youth (under-18)
  'under-18-counseling': 'under-18-counseling',
  'teen-counseling': 'under-18-counseling',
  'teen-session': 'under-18-counseling',
  'social-confidence': 'social-confidence-friendship',
  'bullying-support': 'bullying-support',
  'supporting-children': 'supporting-children-through-change',
  'big-emotions': 'managing-big-emotions',

  // Parenting / family
  'parenting-coaching': 'parenting-coaching',
  'parenting-session': 'parenting-coaching',
  'family-counseling': 'family-relationship-strengthening',
  'family-session': 'family-relationship-strengthening',
  'tackling-tantrums': 'tackling-child-tantrums',
  'parental-stress': 'parental-stress-wellbeing',

  // CBT / DBT
  'cbt-session': 'cbt-youth',
  'dbt-session': 'cbt-youth',
  'cognitive-behavioral-therapy': 'cbt-youth',
  'dialectical-behavioral-therapy': 'cbt-youth',

  // Adult / individual
  'individual-counseling': 'individual-counseling',
  'self-development': 'self-development-coaching',
  'life-coaching': 'life-coaching',
  'lifestyle-coaching': 'lifestyle-coaching',
  'anger-management': 'anger-management',
  'adhd-coaching': 'adhd-executive-function-coaching',
  'adhd-executive-function': 'adhd-executive-function-coaching',

  // Couples
  'couples-counseling': 'couples-counseling',
  'couples-session': 'couples-counseling',
  'pre-marital-education': 'pre-marital-education',
  'pre-marital': 'pre-marital-education',
  'marriage-counseling': 'couples-counseling',

  // Experiential
  'horticultural-therapy': 'horticultural-plant-therapy',
  'plant-therapy': 'horticultural-plant-therapy',
  'walk-and-talk': 'walk-and-talk',

  // Teen-specific
  'teen-behavioral-coaching': 'teen-behavioral-coaching',
  'teen-behavior': 'teen-behavioral-coaching',

  // University
  'university-student': 'university-student-session',
  'young-adult': 'university-student-session',
};

const FALLBACK_SLUG = 'individual-counseling';

export interface CalServiceMapResult {
  slug: string;
  /** True if the input was in the dictionary. False = used fallback. */
  matched: boolean;
  /** The original Cal.com slug (lowercased) for the admin note. */
  original: string;
}

/**
 * Map a Cal.com event type slug (e.g. "parenting-coaching" or the
 * full Cal.com event name) to a canonical service slug. Case- and
 * hyphen/underscore-insensitive.
 */
export function mapCalSlugToService(rawSlug: string | undefined): CalServiceMapResult {
  if (!rawSlug) {
    return { slug: FALLBACK_SLUG, matched: false, original: '' };
  }

  // Normalize: lowercase, replace underscores with hyphens, trim whitespace
  const normalized = rawSlug
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/\s+/g, '-');

  if (CAL_SLUG_TO_SERVICE[normalized]) {
    return {
      slug: CAL_SLUG_TO_SERVICE[normalized],
      matched: true,
      original: normalized,
    };
  }

  return { slug: FALLBACK_SLUG, matched: false, original: normalized };
}
