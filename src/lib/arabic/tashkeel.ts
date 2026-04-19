/* ================================================================
   Arabic text helpers — Tashkeel coverage + detection
   ================================================================
   Pure utilities (no React, no DOM). Used by admin content forms to
   nudge authors toward fully-diacritized Arabic text per the house
   style — every Arabic letter should carry fatha / kasra / damma /
   sukun / shadda / tanween, so screen readers + TTS pronounce
   correctly and the text reads cleanly for a bilingual audience.

   We report coverage as a percentage rather than blocking saves,
   because (a) some content is quoted verbatim without marks and
   (b) AI-generated paste-ins already carry full Tashkeel so no
   friction is added for the common case.
   ================================================================ */

/** Arabic letter block (core consonants). */
const ARABIC_LETTER = /[\u0621-\u064A\u0671-\u06D3]/u;

/** Any Tashkeel mark (fatha, kasra, damma, sukun, shadda, tanween, …). */
const ARABIC_DIACRITIC = /[\u064B-\u0652\u0670\u06D6-\u06ED]/u;

const ARABIC_LETTER_GLOBAL = /[\u0621-\u064A\u0671-\u06D3]/gu;
const ARABIC_DIACRITIC_GLOBAL = /[\u064B-\u0652\u0670\u06D6-\u06ED]/gu;

/** True when the string contains at least one Arabic letter. */
export function hasArabicText(text: string): boolean {
  return !!text && ARABIC_LETTER.test(text);
}

/** True when the string contains at least one Tashkeel mark. */
export function hasTashkeel(text: string): boolean {
  return !!text && ARABIC_DIACRITIC.test(text);
}

export interface TashkeelStats {
  /** Arabic letters found. */
  letters: number;
  /** Tashkeel marks found. */
  diacritics: number;
  /** Ratio 0..1 — diacritics / letters. 0 if no letters. */
  coverage: number;
}

/**
 * Count Arabic letters + diacritic marks in a string and return the
 * coverage ratio. A mark that sits on a letter (e.g. `نَ`) counts as
 * one letter + one diacritic, so coverage for a fully-marked word is
 * 1.0. Shadda+harakah combinations push coverage above 1.0 briefly
 * on individual letters; we clamp at 1.0 in the return value so the
 * UI shows a clean 100% ceiling.
 */
export function tashkeelStats(text: string): TashkeelStats {
  if (!text) return { letters: 0, diacritics: 0, coverage: 0 };
  const letters = (text.match(ARABIC_LETTER_GLOBAL) ?? []).length;
  const diacritics = (text.match(ARABIC_DIACRITIC_GLOBAL) ?? []).length;
  const coverage = letters === 0 ? 0 : Math.min(1, diacritics / letters);
  return { letters, diacritics, coverage };
}

/** Shortcut for the ratio as a whole number 0..100. */
export function tashkeelCoveragePercent(text: string): number {
  return Math.round(tashkeelStats(text).coverage * 100);
}

/**
 * Label the coverage level for UI (warn at <50%, nudge at <80%,
 * green at ≥80%). Zero letters yields 'empty' so callers can skip
 * displaying the chip entirely.
 */
export type TashkeelLevel = 'empty' | 'low' | 'medium' | 'good';

export function tashkeelLevel(text: string): TashkeelLevel {
  const { letters, coverage } = tashkeelStats(text);
  if (letters === 0) return 'empty';
  if (coverage < 0.5) return 'low';
  if (coverage < 0.8) return 'medium';
  return 'good';
}
