/* ================================================================
   Academy Localization Helpers
   Gracefully handle missing Arabic translations by falling back
   to English content instead of showing placeholder text.
   ================================================================ */

/**
 * Returns localized text, falling back to English if Arabic is a placeholder.
 */
export function t(en: string, ar: string, isRTL: boolean): string {
  if (!isRTL) return en;
  if (!ar || ar.includes('[Arabic translation needed]') || ar.includes('[Arabic translation')) return en;
  return ar;
}

/**
 * Returns localized array, falling back to English if Arabic contains placeholders.
 */
export function tArray(en: string[], ar: string[], isRTL: boolean): string[] {
  if (!isRTL) return en;
  if (!ar || ar.length === 0 || ar.some(s => s.includes('[Arabic translation'))) return en;
  return ar;
}
