/* ================================================================
   PDF Assets Loader
   ================================================================
   Reads Mama Hala's logo files from the public folder once per
   cold start and caches them as base64 data URLs so jsPDF's
   `addImage()` can embed them without re-reading from disk on
   every invoice render.

   Works in:
   - Node (local dev): reads from process.cwd() + 'public/...'
   - Vercel serverless: files in /public are bundled with the
     function (Next.js marks them as static assets and includes
     them in the serverless function snapshot)
   ================================================================ */

import fs from 'fs';
import path from 'path';

/**
 * PNG file paths relative to `public/`. We keep two sizes so we
 * don't over-bloat the PDF when only a small header icon is needed.
 */
const LOGO_MAIN = 'images/logo-256.png'; // small, crisp, for the header
const LOGO_LARGE = 'images/logo-square.png'; // larger, for the watermark

// Module-level cache (survives across invocations in warm Lambdas)
let mainLogoB64: string | null = null;
let largeLogoB64: string | null = null;
let cacheInitialized = false;

/**
 * Read a file from the `public/` directory and return it as a
 * base64 data URL. Returns null if the file is missing (dev-mode
 * fallback — the PDF still renders without the logo).
 */
function readAsBase64(relativePath: string): string | null {
  try {
    // Try a few likely roots depending on where the code runs:
    //   1. process.cwd() + public/...      (local dev, most common)
    //   2. __dirname + ../../../public/... (bundled fallback)
    const candidates = [
      path.join(process.cwd(), 'public', relativePath),
      path.join(process.cwd(), relativePath),
    ];

    for (const fullPath of candidates) {
      if (fs.existsSync(fullPath)) {
        const buffer = fs.readFileSync(fullPath);
        return `data:image/png;base64,${buffer.toString('base64')}`;
      }
    }

    console.warn(`[pdf-assets] Logo not found: ${relativePath}`);
    return null;
  } catch (err) {
    console.warn(`[pdf-assets] Error reading ${relativePath}:`, err);
    return null;
  }
}

function ensureCacheInitialized(): void {
  if (cacheInitialized) return;
  mainLogoB64 = readAsBase64(LOGO_MAIN);
  largeLogoB64 = readAsBase64(LOGO_LARGE);
  cacheInitialized = true;
}

/** Returns the main header logo as a base64 data URL, or null if unavailable. */
export function getMainLogoDataUrl(): string | null {
  ensureCacheInitialized();
  return mainLogoB64;
}

/** Returns the large logo used for the watermark, or null. */
export function getWatermarkLogoDataUrl(): string | null {
  ensureCacheInitialized();
  return largeLogoB64;
}
