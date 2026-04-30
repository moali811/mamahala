/* ================================================================
   Gift Email — Per-Occasion Hero Illustrations (data URI map)
   ================================================================
   Map of occasion key → embedded image data URI rendered as the hero
   above the recipient name. Empty by default — Mo will generate the
   7 PNGs in Midjourney/Imagen using the shared style brief and paste
   the base64 strings here. Until then the template falls back to a
   hand-drawn botanical SVG header (see giftBotanicalHeader below).

   Style brief for the 7 illustrations (paste into Midjourney/Imagen):
     "Soft watercolor illustration with delicate botanical line art,
     warm palette of plum #7A3B5E, gold #C8A97D, peach #F0E0D8 on
     cream #FAF7F2 background. No faces, no text. Generous negative
     space. Editorial, gentle, feminine. 480×280 landscape."

   Per-occasion prompt seed (append to the brief):
     birthday      → "small lit candle and a folded note"
     support       → "a hand cupping a warm tea, steam rising"
     just-because  → "single open lily, soft light"
     wedding       → "two intertwined olive sprigs forming a wreath"
     new-parent    → "crescent moon and a small star, lullaby mood"
     self-care     → "a folded cotton robe and a sprig of lavender"
     other         → "open envelope with a single flower stem"

   Output: 480×280 PNG, optimized to under 80KB. Encode to base64
   data URI (`data:image/png;base64,...`) and paste into the
   corresponding key below.
   ================================================================ */

export type OccasionKey =
  | 'birthday'
  | 'support'
  | 'just-because'
  | 'wedding'
  | 'new-parent'
  | 'self-care'
  | 'other';

const ILLUSTRATIONS: Record<OccasionKey, string | null> = {
  'birthday': null,
  'support': null,
  'just-because': null,
  'wedding': null,
  'new-parent': null,
  'self-care': null,
  'other': null,
};

export function getGiftHeroIllustration(key: string | undefined): string | null {
  if (!key) return null;
  if (Object.prototype.hasOwnProperty.call(ILLUSTRATIONS, key)) {
    return ILLUSTRATIONS[key as OccasionKey];
  }
  return null;
}

/** Hand-drawn botanical sprig divider. Two delicate stems flanking a
 *  small diamond — fallback when no per-occasion illustration is
 *  available, and used as a divider beneath the recipient name. */
export function giftBotanicalDivider(): string {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="20" viewBox="0 0 120 20" style="display:block;margin:0 auto;" aria-hidden="true">
    <g fill="none" stroke="#C8A97D" stroke-width="0.8" stroke-linecap="round">
      <!-- left sprig -->
      <path d="M5 10 Q 25 10 45 10" />
      <path d="M18 10 Q 16 6 14 7" />
      <path d="M22 10 Q 24 6 26 7" />
      <path d="M30 10 Q 28 6 26 7" />
      <path d="M34 10 Q 36 6 38 7" />
      <!-- diamond -->
      <path d="M55 10 L 60 5 L 65 10 L 60 15 Z" fill="#C8A97D" stroke="none" opacity="0.85" />
      <!-- right sprig -->
      <path d="M75 10 Q 95 10 115 10" />
      <path d="M82 10 Q 84 6 86 7" />
      <path d="M86 10 Q 84 6 82 7" />
      <path d="M94 10 Q 92 6 90 7" />
      <path d="M98 10 Q 100 6 102 7" />
    </g>
  </svg>`;
}

/** Circular wax-seal SVG with the "MH" monogram. Sits above Dr. Hala's
 *  signature in the sign-off. Hand-coded SVG so it works in any email
 *  client; degrades to alt text where SVG is stripped. */
export function giftWaxSeal(): string {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" style="display:block;margin:0 auto;" role="img" aria-label="Mama Hala monogram seal">
    <defs>
      <radialGradient id="sealGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#9C5278" />
        <stop offset="100%" stop-color="#5A2A48" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#sealGrad)" />
    <circle cx="32" cy="32" r="27" fill="none" stroke="#C8A97D" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.7" />
    <text x="32" y="40" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" fill="#C8A97D" font-weight="700" font-style="italic">MH</text>
  </svg>`;
}
