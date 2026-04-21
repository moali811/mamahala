/* ================================================================
   PDF Fonts — Arabic Support
   ================================================================
   Loads Amiri (regular + bold) TTFs from public/fonts/ once per
   cold start and registers them with a jsPDF instance. Amiri is a
   classical Naskh typeface that includes the full Arabic
   Presentation Forms-B block (U+FE70-U+FEFF) at their Unicode
   codepoints — required because jsPDF's Arabic parser rewrites
   base letters into presentation forms rather than relying on
   OpenType shaping. Modern sans-serif fonts like Tajawal omit those
   codepoints (they ship only base letters + OpenType GSUB rules),
   which caused letters like ا and د to render as missing glyphs.

   jsPDF's built-in Arabic parser handles letter shaping and
   ligatures automatically; we pair it with setR2L(true) for proper
   right-to-left order.
   ================================================================ */

import fs from 'fs';
import path from 'path';
import type { jsPDF } from 'jspdf';

const FONT_FILES = {
  regular: 'fonts/Amiri-Regular.ttf',
  bold: 'fonts/Amiri-Bold.ttf',
} as const;

export const ARABIC_FONT_NAME = 'Amiri';

let regularB64: string | null = null;
let boldB64: string | null = null;
let cacheInitialized = false;

function readAsBase64(relativePath: string): string | null {
  try {
    const candidates = [
      path.join(process.cwd(), 'public', relativePath),
      path.join(process.cwd(), relativePath),
    ];
    for (const fullPath of candidates) {
      if (fs.existsSync(fullPath)) {
        return fs.readFileSync(fullPath).toString('base64');
      }
    }
    console.warn(`[pdf-fonts] Font not found: ${relativePath}`);
    return null;
  } catch (err) {
    console.warn(`[pdf-fonts] Error reading ${relativePath}:`, err);
    return null;
  }
}

function ensureCacheInitialized(): void {
  if (cacheInitialized) return;
  regularB64 = readAsBase64(FONT_FILES.regular);
  boldB64 = readAsBase64(FONT_FILES.bold);
  cacheInitialized = true;
}

/**
 * Register Tajawal regular + bold with the given jsPDF instance.
 * Safe to call once per document. If the TTFs are missing (dev
 * without the font files), the function is a no-op and Arabic
 * fallback will silently not work — the rest of the PDF still
 * renders correctly.
 */
export function registerArabicFont(doc: jsPDF): boolean {
  ensureCacheInitialized();
  if (!regularB64 || !boldB64) return false;
  try {
    doc.addFileToVFS('Amiri-Regular.ttf', regularB64);
    doc.addFont('Amiri-Regular.ttf', ARABIC_FONT_NAME, 'normal');
    doc.addFileToVFS('Amiri-Bold.ttf', boldB64);
    doc.addFont('Amiri-Bold.ttf', ARABIC_FONT_NAME, 'bold');
    return true;
  } catch (err) {
    console.warn('[pdf-fonts] Failed to register Amiri:', err);
    return false;
  }
}

/**
 * True when the string contains at least one character in the
 * Arabic Unicode blocks. Covers Arabic, Arabic Supplement, Arabic
 * Extended-A, Presentation Forms-A, and Presentation Forms-B.
 */
export function containsArabic(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}
