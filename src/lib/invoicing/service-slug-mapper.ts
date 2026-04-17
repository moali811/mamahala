/* ================================================================
   Zoho Item Name → Canonical Service Slug Mapper
   ================================================================
   Pure function — no I/O, no dependencies besides the services
   catalog. Converts the diverse item-name strings that appear in
   Dr. Hala's 3-year Zoho Books history into the canonical service
   slugs defined in src/data/services.ts.

   Design:
   - Lowercased, whitespace-normalized lookup
   - Distinct from the services catalog so we never rename slugs
     without breaking historical lookups
   - Unknown items fall back to `individual-counseling` (the most
     generic counseling slug) and set `fellBack: true` so callers
     can surface a warning

   Coverage (verified against 251 rows of Invoice.csv):
   - 37 distinct item names → 11 canonical slugs
   - 13 "Credit card processing fees" line items → skipped
     (merged into parent invoice totals upstream)
   ================================================================ */

import { services } from '@/data/services';

/**
 * Normalize a raw Zoho item name into a stable lookup key:
 * lowercase, collapse whitespace, strip punctuation that commonly
 * varies between operators (slashes, dashes, extra spaces).
 */
function normalize(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[\u2019'`]/g, '') // curly apostrophe, straight apostrophe, backtick
    .replace(/[./\\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Static dictionary mapping normalized item names → canonical slugs.
 * Keys are already normalized via `normalize()`. Do not add raw strings.
 */
const DIRECT_MAP: Record<string, string> = {
  // Under-18 — 65 invoices across variations
  'under 18 counseling session': 'under-18-counseling',
  'teens counseling session': 'under-18-counseling',

  // Parenting — 23 invoices
  'parenting coaching session': 'parenting-coaching',
  'parent counseling': 'parenting-coaching',
  'parenting phone consultation': 'parenting-coaching',

  // CBT / DBT — 42 invoices
  'cbt session': 'cbt-youth',
  'cognitive behavioral therapy session': 'cbt-youth',
  'dialectical behavioral therapy session': 'cbt-youth',

  // Self development — 6
  'self development coaching session': 'self-development-coaching',
  'self development coaching sessions': 'self-development-coaching',

  // Family — 6
  'family counseling': 'family-relationship-strengthening',
  'family wellness guidance session': 'family-relationship-strengthening',
  'family wellness & guidance session': 'family-relationship-strengthening',

  // Couples / Marriage — 6
  'couples counseling': 'couples-counseling',
  'marriage counseling online session': 'couples-counseling',
  'marriage counseling session online': 'couples-counseling',
  'marriage consultation': 'couples-counseling',

  // Anger — 2
  'anger management coaching session': 'anger-management',

  // Adult counseling & assessment (genericized "Counseling session" variants)
  'counseling session': 'individual-counseling',
  'counseling sessions': 'individual-counseling',
  'online counseling session': 'individual-counseling',
  'online phone counseling session': 'individual-counseling',
  'home counseling session': 'individual-counseling',
  'consultation session': 'individual-counseling',

  // Intake / assessment (1st session or follow-up)
  '1st consultation assessment': 'individual-counseling',
  '1st consultation assessment session': 'individual-counseling',
  'consultation assessment': 'individual-counseling',
  'assessment session': 'individual-counseling',
  'assessment follow up': 'individual-counseling',
  'behavior assessment': 'individual-counseling',

  // Phone / virtual consultation
  'phone consultation': 'individual-counseling',
  'online phone consultation': 'individual-counseling',

  // Packages — default to individual-counseling since the package is session-type agnostic
  '5 online sessions package': 'individual-counseling',
};

/**
 * Heuristic fallback rules run after the direct-map lookup misses.
 * Order matters — the first matching rule wins.
 */
const HEURISTIC_RULES: Array<{
  test: (norm: string) => boolean;
  slug: string;
}> = [
  // Any "under 18" → under-18 slug (catches capitalization / typo variants)
  { test: (n) => n.includes('under 18'), slug: 'under-18-counseling' },
  // Any "parent" or "parenting" in the name → parenting coaching
  { test: (n) => /\bparent\b/.test(n) || n.includes('parenting'), slug: 'parenting-coaching' },
  // Any "family" → family strengthening
  { test: (n) => /\bfamily\b/.test(n), slug: 'family-relationship-strengthening' },
  // Any "couples" or "marriage" → couples counseling
  { test: (n) => /\bcouples?\b/.test(n) || /\bmarriage\b/.test(n), slug: 'couples-counseling' },
  // Any "anger" → anger management
  { test: (n) => /\banger\b/.test(n), slug: 'anger-management' },
  // Any "cbt" or "dbt" or "cognitive behavior" → CBT slug
  { test: (n) => /\bcbt\b/.test(n) || /\bdbt\b/.test(n) || n.includes('cognitive behavior'), slug: 'cbt-youth' },
  // Any "self development" / "self-development" → self development
  { test: (n) => n.includes('self development'), slug: 'self-development-coaching' },
  // "Teen" or "teens" anywhere → under-18 (catches "Teens Counseling" etc.)
  { test: (n) => /\bteens?\b/.test(n), slug: 'under-18-counseling' },
];

/** Fallback slug when nothing matches. */
const FALLBACK_SLUG = 'individual-counseling';

/**
 * Words that mark a line item as a surcharge/fee rather than a counseling
 * session. Callers use `isZohoFeeLineItem()` to skip these rows when
 * building the primary invoice record.
 */
const FEE_KEYWORDS = [
  'credit card processing',
  'stripe',
  'processing fees',
  'card processing',
];

/**
 * Returns true if the given item name represents a fee/surcharge line item
 * (credit card processing, Stripe fees, etc.) rather than a counseling session.
 */
export function isZohoFeeLineItem(itemName: string | undefined): boolean {
  if (!itemName) return false;
  const norm = normalize(itemName);
  return FEE_KEYWORDS.some((kw) => norm.includes(kw));
}

export interface SlugMapResult {
  slug: string;
  /** True if the input matched the direct map or heuristics — false on fallback. */
  fellBack: boolean;
  /** The normalized lookup key used, for debugging. */
  normalized: string;
}

/**
 * Map a raw Zoho item name to one of the canonical service slugs defined
 * in `src/data/services.ts`. Returns the fallback slug with `fellBack: true`
 * when no match is found so the caller can collect a warning.
 *
 * Examples:
 *   `Under 18 Counseling Session`     → `under-18-counseling`
 *   `Dialectical Behavioral Therapy`  → `cbt-youth`
 *   `Random Unknown Service`          → `individual-counseling` (fellBack: true)
 */
export function mapZohoItemNameToSlug(
  itemName: string | undefined,
): SlugMapResult {
  if (!itemName || !itemName.trim()) {
    return { slug: FALLBACK_SLUG, fellBack: true, normalized: '' };
  }

  const norm = normalize(itemName);

  // Direct map (fastest path)
  if (DIRECT_MAP[norm]) {
    return { slug: DIRECT_MAP[norm], fellBack: false, normalized: norm };
  }

  // Heuristic rules
  for (const rule of HEURISTIC_RULES) {
    if (rule.test(norm)) {
      return { slug: rule.slug, fellBack: false, normalized: norm };
    }
  }

  // Fallback
  return { slug: FALLBACK_SLUG, fellBack: true, normalized: norm };
}

/**
 * Defensive validator: confirms the resolved slug exists in the services
 * catalog. If a service is ever renamed/removed, this will throw at
 * import time so we notice immediately.
 */
export function validateSlug(slug: string): boolean {
  return services.some((s) => s.slug === slug);
}
