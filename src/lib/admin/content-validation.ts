/* ================================================================
   Admin content-form validation — bilingual EN+AR requirements
   ================================================================
   Central server-side validator for `/api/admin/content` and the
   other admin content endpoints. Ensures every piece of content
   flowing into the CMS has both EN and AR versions for every
   required field — no more English-only posts landing on the site.

   The UI layer shows per-field errors and a Tashkeel coverage chip
   before submit; this is the hard gate that catches anything the
   UI misses.
   ================================================================ */

import { hasArabicText } from '@/lib/arabic/tashkeel';

export type ContentType = 'blog' | 'service' | 'faq' | 'testimonial';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

interface FieldRule {
  /** Path into the payload, dot-separated for nested. */
  path: string;
  /** Human label for error messages. */
  label: string;
  /** Whether this field is required to be non-empty. */
  required?: boolean;
  /**
   * When true, the value must contain at least one Arabic letter.
   * Used for `*Ar` fields so users can't bypass by typing English
   * characters into the Arabic box.
   */
  mustBeArabic?: boolean;
}

const BLOG_RULES: FieldRule[] = [
  { path: 'title', label: 'English title', required: true },
  { path: 'titleAr', label: 'Arabic title', required: true, mustBeArabic: true },
  { path: 'excerpt', label: 'English excerpt', required: true },
  { path: 'excerptAr', label: 'Arabic excerpt', required: true, mustBeArabic: true },
  { path: 'content', label: 'English content', required: true },
  { path: 'contentAr', label: 'Arabic content', required: true, mustBeArabic: true },
];

const SERVICE_RULES: FieldRule[] = [
  { path: 'name', label: 'English name', required: true },
  { path: 'nameAr', label: 'Arabic name', required: true, mustBeArabic: true },
  { path: 'shortDesc', label: 'English short description', required: true },
  { path: 'shortDescAr', label: 'Arabic short description', required: true, mustBeArabic: true },
  { path: 'description', label: 'English description', required: true },
  { path: 'descriptionAr', label: 'Arabic description', required: true, mustBeArabic: true },
];

const FAQ_RULES: FieldRule[] = [
  { path: 'question', label: 'English question', required: true },
  { path: 'questionAr', label: 'Arabic question', required: true, mustBeArabic: true },
  { path: 'answer', label: 'English answer', required: true },
  { path: 'answerAr', label: 'Arabic answer', required: true, mustBeArabic: true },
];

const TESTIMONIAL_RULES: FieldRule[] = [
  { path: 'name', label: 'Author name', required: true },
  { path: 'text', label: 'English quote', required: true },
  { path: 'textAr', label: 'Arabic quote', required: true, mustBeArabic: true },
];

const RULES: Record<ContentType, FieldRule[]> = {
  blog: BLOG_RULES,
  service: SERVICE_RULES,
  faq: FAQ_RULES,
  testimonial: TESTIMONIAL_RULES,
};

/** Safely walk `a.b.c` in an unknown object. */
function get(obj: unknown, path: string): unknown {
  let cur: unknown = obj;
  for (const key of path.split('.')) {
    if (cur && typeof cur === 'object' && key in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return cur;
}

function isBlank(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value !== 'string') return false;
  return value.trim().length === 0;
}

/**
 * Validate a content payload for the given `type`. Returns
 * `{ valid: true }` on success or a list of human-readable error
 * strings on failure. Unknown types pass through unchanged so any
 * future content kind isn't accidentally blocked by us.
 */
export function validateContent(
  type: string,
  payload: unknown,
): ValidationResult {
  const rules = RULES[type as ContentType];
  if (!rules) return { valid: true, errors: [] };
  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Payload is missing or malformed.'] };
  }

  const errors: string[] = [];
  for (const rule of rules) {
    const value = get(payload, rule.path);
    if (rule.required && isBlank(value)) {
      errors.push(`${rule.label} is required.`);
      continue;
    }
    if (rule.mustBeArabic && typeof value === 'string' && value.trim() && !hasArabicText(value)) {
      errors.push(`${rule.label} must contain Arabic text.`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate one bilingual FAQ pair — used by
 * `/api/admin/category-faqs` which doesn't go through the main
 * content route but has the same bilingual requirement.
 */
export function validateCategoryFaqs(
  faqs: unknown[],
): ValidationResult {
  if (!Array.isArray(faqs)) {
    return { valid: false, errors: ['FAQ list is missing or malformed.'] };
  }
  const errors: string[] = [];
  for (let i = 0; i < faqs.length; i += 1) {
    const item = faqs[i] as Record<string, unknown>;
    const number = i + 1;
    if (isBlank(item?.q)) errors.push(`FAQ #${number}: English question is required.`);
    if (isBlank(item?.qAr)) errors.push(`FAQ #${number}: Arabic question is required.`);
    else if (typeof item.qAr === 'string' && !hasArabicText(item.qAr)) {
      errors.push(`FAQ #${number}: Arabic question must contain Arabic text.`);
    }
    if (isBlank(item?.a)) errors.push(`FAQ #${number}: English answer is required.`);
    if (isBlank(item?.aAr)) errors.push(`FAQ #${number}: Arabic answer is required.`);
    else if (typeof item.aAr === 'string' && !hasArabicText(item.aAr)) {
      errors.push(`FAQ #${number}: Arabic answer must contain Arabic text.`);
    }
  }
  return { valid: errors.length === 0, errors };
}
