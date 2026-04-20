/* ================================================================
   Shared PDF Constants & Helpers
   ================================================================
   Used by both pdf-generator.ts (invoice) and receipt-pdf.ts.
   Centralizes brand palette, page dimensions, and drawing helpers.
   ================================================================ */

import type { jsPDF } from 'jspdf';
import { ARABIC_FONT_NAME, containsArabic } from './pdf-fonts';

// ─── Brand palette as RGB tuples ─────────────────────────────────
export const PLUM: [number, number, number] = [122, 59, 94];
export const PLUM_DEEP: [number, number, number] = [90, 45, 71];
export const PLUM_LIGHT: [number, number, number] = [196, 135, 138];
export const GOLD: [number, number, number] = [200, 169, 125];
export const GOLD_LIGHT: [number, number, number] = [228, 207, 168];
export const CREAM: [number, number, number] = [250, 247, 242];
export const DARK: [number, number, number] = [45, 42, 51];
export const TEXT: [number, number, number] = [74, 74, 92];
export const MUTED: [number, number, number] = [142, 142, 159];
export const LIGHT: [number, number, number] = [243, 239, 232];
export const WHITE: [number, number, number] = [255, 255, 255];
export const GREEN: [number, number, number] = [59, 138, 110];
export const PALE_GREEN: [number, number, number] = [220, 240, 230];

// Alternating row tint (barely visible cream)
export const ROW_TINT: [number, number, number] = [252, 250, 247];

// ─── A4 dimensions ───────────────────────────────────────────────
export const PAGE_WIDTH = 210;
export const PAGE_HEIGHT = 297;
export const MARGIN = 15;
export const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

// ─── Helpers ─────────────────────────────────────────────────────

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

export function hr(
  doc: jsPDF,
  y: number,
  color: [number, number, number] = LIGHT,
): void {
  doc.setDrawColor(...color);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
}

/** Draw a section heading with an accent bar on the left. */
export function sectionLabel(
  doc: jsPDF,
  label: string,
  y: number,
  accent: [number, number, number] = PLUM,
): number {
  doc.setFillColor(...accent);
  doc.rect(MARGIN, y - 3, 2, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...accent);
  doc.text(label.toUpperCase(), MARGIN + 4, y);
  return y + 5;
}

/** Word-wrap text to a max width in mm, returns array of lines. */
export function wrap(doc: jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text, maxWidth) as string[];
}

/**
 * Draw text that may contain Arabic (or other RTL scripts). When
 * Arabic is detected, temporarily switches to the registered
 * Tajawal font with R2L direction; otherwise leaves the current
 * font untouched. Preserves the caller's font/weight/size/color
 * state on exit. Falls back to plain rendering if Tajawal failed
 * to register (dev without TTFs).
 *
 * `weight` controls which Tajawal face is used for Arabic runs
 * ("normal" or "bold"). Pass the same weight you'd use with
 * helvetica; the helper matches it.
 */
export function drawText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  opts: {
    weight?: 'normal' | 'bold' | 'italic';
    align?: 'left' | 'center' | 'right';
    maxWidth?: number;
  } = {},
): void {
  if (!text) return;
  const align = opts.align ?? 'left';
  const weight = opts.weight ?? 'normal';

  if (!containsArabic(text)) {
    doc.text(text, x, y, opts.maxWidth ? { align, maxWidth: opts.maxWidth } : { align });
    return;
  }

  // Snapshot current font so we can restore after the Arabic run.
  const prevFont = doc.getFont();
  // Arabic uses only normal/bold — italic falls back to normal.
  const arabicWeight = weight === 'bold' ? 'bold' : 'normal';

  try {
    doc.setFont(ARABIC_FONT_NAME, arabicWeight);
  } catch {
    // Font not registered — render as-is (will mojibake but won't crash).
    doc.text(text, x, y, opts.maxWidth ? { align, maxWidth: opts.maxWidth } : { align });
    return;
  }

  doc.setR2L(true);
  doc.text(text, x, y, opts.maxWidth ? { align, maxWidth: opts.maxWidth } : { align });
  doc.setR2L(false);

  // Restore previous font.
  try {
    doc.setFont(prevFont.fontName, prevFont.fontStyle);
  } catch { /* best-effort */ }
}
