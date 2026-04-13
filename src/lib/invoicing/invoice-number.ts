/* ================================================================
   Invoice Number Generator — MCH-YYYYMM-{Initials}-{N}
   ================================================================
   New format (Phase 3+): `MCH-{YYYYMM}-{Initials}-{N}` where:
   - `MCH` = Mama Hala Consulting company prefix
   - `YYYYMM` = invoice issue month (e.g., "202604" for April 2026)
   - `Initials` = 2-4 letter collision-safe initials derived from
     the customer's name (computed once, persisted on Customer.effectiveInitials)
   - `N` = per-customer sequential session counter
     (stored as Customer.nextInvoiceSeq, auto-incremented on write)

   Examples:
   - MCH-202301-HA-1  (Hala Ali, first 2023 session)
   - MCH-202306-NE-12 (Norhan Eloseily, 12th session, June 2023)
   - MCH-202603-TB-47 (Talia Al Bustanji, 47th session, March 2026)

   Collision handling:
   - 2-letter initials by default
   - If two customers collide on 2-letter, BOTH upgrade to 3-letter
   - If 3-letter still collides, append a lowercase disambiguator
     ('a', 'b', 'c', …)

   Legacy compat:
   - Phase 2 invoices with the old INV-YYYYMM-NNNN format are
     untouched; `invoiceNumber` is immutable once written
   - Phase 2.5's Zoho customer import already computes
     effectiveInitials at upsert time via ensureInitialsForCustomer
   ================================================================ */

import { kv } from '@vercel/kv';
import type { Customer } from './types';

const KV_AVAILABLE = !!(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

/* ═══════════════ Initials extraction ═══════════════ */

/** Filler tokens dropped during initial computation. */
const FILLER_WORDS = new Set([
  'al',
  'el',
  'de',
  'da',
  'du',
  'la',
  'le',
  'van',
  'von',
  'bin',
  'ibn',
  'abu',
  'abd',
  'umm',
]);

/** Title prefixes stripped from the start of a name. */
const TITLE_PREFIXES =
  /^(mrs?|ms|miss|mr|dr|prof|professor|sheikh|shaikh|sayed|sir|lady|lord)\.?\s+/i;

/**
 * Strip salutation/title + normalize for initials extraction.
 * Retains unicode letters but drops punctuation and fillers.
 */
function tokenizeName(name: string): string[] {
  let out = (name || '').trim();
  if (!out) return [];

  // Strip leading title
  out = out.replace(TITLE_PREFIXES, '');

  // Strip "Mother Of X" / "Father Of X" / "Parent Of X" suffixes
  out = out.replace(/\s+(mother|father|parent)\s+of\s+.+$/i, '');

  // Strip common trailing parentheticals "(Parent of Talia)"
  out = out.replace(/\s*\([^)]*\)\s*$/g, '');

  // Normalize unicode → ASCII where possible (diacritic removal)
  try {
    out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  } catch {
    /* ignore if Normalize is unavailable */
  }

  // Split into words, drop fillers
  const words = out
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0)
    .filter((w) => !FILLER_WORDS.has(w.toLowerCase()));

  return words;
}

/**
 * Pick the first ASCII letter from a string, uppercased.
 * Returns 'X' if no ASCII letter is found (Arabic-only name, etc.).
 */
function firstLetter(word: string): string {
  for (const ch of word) {
    if (/[A-Za-z]/.test(ch)) return ch.toUpperCase();
  }
  return 'X';
}

/**
 * Pick the LAST letter of a word (useful for 3-letter initials).
 */
function lastLetter(word: string): string {
  for (let i = word.length - 1; i >= 0; i--) {
    const ch = word[i];
    if (/[A-Za-z]/.test(ch)) return ch.toUpperCase();
  }
  return 'X';
}

/**
 * Compute 2-letter initials from a customer name.
 * Examples:
 *   "Hala Ali"            → "HA"
 *   "Mrs. Sophie EL Makdah" → "SM"
 *   "Talia Al Bustanji"   → "TB"
 *   "Rayane El Ghourani"  → "RG"
 *   "Madonna"             → "MA" (single word → first + second letter)
 *   "" / "?"              → "XX" (no info)
 */
export function computeInitials(name: string): string {
  const words = tokenizeName(name);
  if (words.length === 0) return 'XX';
  if (words.length === 1) {
    const w = words[0];
    const a = firstLetter(w);
    const b = w.length >= 2 ? firstLetter(w.slice(1)) : 'X';
    return `${a}${b}`;
  }
  const first = firstLetter(words[0]);
  const last = firstLetter(words[words.length - 1]);
  return `${first}${last}`;
}

/**
 * Compute 3-letter initials for collision resolution.
 * Examples:
 *   "Hala Ali"            → "HLA"   (first word first+last + last word first)
 *   "Hadia Ahmed"         → "HAA"
 *   "Talia Al Bustanji"   → "TAB"   (Al dropped)
 *   "Rayane El Ghourani"  → "RNG"
 *   "Madonna" (single)    → "MDA"   (first + last + second)
 */
export function computeInitials3(name: string): string {
  const words = tokenizeName(name);
  if (words.length === 0) return 'XXX';
  if (words.length === 1) {
    const w = words[0];
    const a = firstLetter(w);
    const b = w.length >= 2 ? lastLetter(w) : 'X';
    const c = w.length >= 3 ? firstLetter(w.slice(1)) : 'X';
    return `${a}${b}${c}`;
  }
  const first = words[0];
  const last = words[words.length - 1];
  return `${firstLetter(first)}${lastLetter(first)}${firstLetter(last)}`;
}

/**
 * Resolve collision-safe initials for a batch of customers at once.
 *
 * Input: `{ email: name }` map for every customer that could collide
 * (including customers already in the DB + customers being imported).
 * Output: `{ email: effectiveInitials }` map guaranteed unique.
 *
 * Algorithm:
 *   1. Compute 2-letter initials for every email
 *   2. Group emails by 2-letter initials
 *   3. For any group with 2+ emails, upgrade ALL members to 3-letter
 *   4. If 3-letter still collides, append a lowercase disambiguator
 */
export function resolveBatchInitials(
  customers: Array<{ email: string; name: string }>,
): Record<string, string> {
  const result: Record<string, string> = {};
  const byTwoLetter = new Map<string, Array<{ email: string; name: string }>>();

  for (const c of customers) {
    const two = computeInitials(c.name);
    if (!byTwoLetter.has(two)) byTwoLetter.set(two, []);
    byTwoLetter.get(two)!.push(c);
  }

  for (const [twoLetter, group] of byTwoLetter.entries()) {
    if (group.length === 1) {
      // No collision — use 2-letter directly
      result[group[0].email] = twoLetter;
      continue;
    }

    // Collision — compute 3-letter for each, check for secondary collision
    const threeLetterCounts = new Map<string, number>();
    const threeLetterByEmail = new Map<string, string>();
    for (const c of group) {
      const three = computeInitials3(c.name);
      threeLetterByEmail.set(c.email, three);
      threeLetterCounts.set(three, (threeLetterCounts.get(three) || 0) + 1);
    }

    // Track how many times we've emitted each 3-letter so far, to suffix duplicates
    const emittedCount = new Map<string, number>();
    for (const c of group) {
      const three = threeLetterByEmail.get(c.email)!;
      const totalWithThisThree = threeLetterCounts.get(three) || 1;
      if (totalWithThisThree === 1) {
        result[c.email] = three;
      } else {
        // Secondary collision — append disambiguator
        const idx = emittedCount.get(three) || 0;
        // 'a', 'b', 'c', ... 'z' then fall back to numeric suffix
        const suffix =
          idx < 26
            ? String.fromCharCode('a'.charCodeAt(0) + idx)
            : `z${idx - 25}`;
        result[c.email] = `${three}${suffix}`;
        emittedCount.set(three, idx + 1);
      }
    }
  }

  return result;
}

/* ═══════════════ Invoice number generation ═══════════════ */

/**
 * Format a Date into the YYYYMM prefix used in invoice numbers.
 * Uses UTC to avoid off-by-one bugs across Vercel regions.
 */
export function formatYearMonth(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${year}${month}`;
}

/**
 * Generate the next invoice number for a specific customer.
 * Format: `MCH-{YYYYMM}-{effectiveInitials}-{nextInvoiceSeq}`
 *
 * Requires `customer.effectiveInitials` and `customer.nextInvoiceSeq`
 * to be set. Callers should call `ensureInitialsForCustomer()` from
 * customer-store.ts first to guarantee these are populated.
 *
 * Side effect: does NOT persist the bumped counter. The caller is
 * responsible for persisting the updated Customer record back to KV
 * after successfully saving the invoice.
 */
export function formatInvoiceNumber(
  customer: Pick<Customer, 'effectiveInitials' | 'nextInvoiceSeq'>,
  date: Date = new Date(),
): string {
  const ym = formatYearMonth(date);
  const initials = customer.effectiveInitials || 'XX';
  const seq = customer.nextInvoiceSeq || 1;
  return `MCH-${ym}-${initials}-${seq}`;
}

/**
 * Legacy fallback — used when the customer record is missing or
 * KV is offline. Preserves the Phase 1/2 format so nothing crashes.
 * New code should prefer `formatInvoiceNumber(customer, date)`.
 */
export async function generateLegacyInvoiceNumber(
  now: Date = new Date(),
): Promise<string> {
  const ym = formatYearMonth(now);
  let counter = 0;

  if (KV_AVAILABLE) {
    try {
      const next = await kv.incr(`invoices:counter:${ym}`);
      counter = typeof next === 'number' ? next : 0;
    } catch {
      counter = 0;
    }
  }

  if (counter === 0) {
    counter = Math.floor(Math.random() * 9000) + 1000;
  }

  const padded = String(counter).padStart(4, '0');
  return `INV-${ym}-${padded}`;
}

/**
 * DEPRECATED — kept only for backward compat with any callers still
 * on the old no-arg signature. New code should call
 * `formatInvoiceNumber(customer, date)` directly.
 *
 * When called with no customer, falls back to the legacy INV-YYYYMM-NNNN
 * format to avoid breaking anything.
 */
export async function generateInvoiceNumber(
  customerOrDate?: Customer | Date,
  maybeDate?: Date,
): Promise<string> {
  // Old signature: generateInvoiceNumber(new Date())
  if (customerOrDate instanceof Date || customerOrDate === undefined) {
    return generateLegacyInvoiceNumber(customerOrDate);
  }
  // New signature: generateInvoiceNumber(customer, date)
  return formatInvoiceNumber(customerOrDate, maybeDate);
}

/* ═══════════════ ID generators (unchanged from Phase 1) ═══════════════ */

/** Generate a random internal invoice ID. Stable, opaque. */
export function generateInvoiceId(): string {
  const rand = Math.random().toString(36).slice(2, 10);
  const ts = Date.now().toString(36);
  return `inv_${ts}${rand}`;
}

/** Generate a draft ID (also used by the Compose tab state). */
export function generateDraftId(): string {
  const rand = Math.random().toString(36).slice(2, 10);
  const ts = Date.now().toString(36);
  return `draft_${ts}${rand}`;
}
