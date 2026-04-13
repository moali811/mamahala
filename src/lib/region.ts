/* ================================================================
   Region + Country detection — server-only
   ================================================================
   Reads Vercel's geo header (x-vercel-ip-country) and returns BOTH:
   - `region` — used for the in-person office toggle (CAD / AED)
   - `country` — used by the global pricing engine for band lookup

   Safely falls back when the header is absent (local dev, non-Vercel)
   or headers() is called outside a request context (build time).
   ================================================================ */

import 'server-only';
import { headers } from 'next/headers';
import { COUNTRY_TO_REGION, DEFAULT_REGION, type Region } from '@/config/pricing';

export interface GeoContext {
  /** In-person region toggle value (CAD or AED). Used for office toggle. */
  region: Region;
  /** ISO-3166-alpha2 country code detected from the Vercel geo header. */
  country: string;
  /** True if the country was detected (not a fallback). */
  detected: boolean;
}

/** Default fallback — Canada, since it's the primary market. */
const FALLBACK_COUNTRY = 'CA';

/**
 * Read the Vercel geo header and return both region and country code.
 * Always returns a safe default; never throws.
 */
export async function getGeoFromHeaders(): Promise<GeoContext> {
  try {
    const h = await headers();
    const countryRaw = h.get('x-vercel-ip-country')?.toUpperCase();
    if (countryRaw && countryRaw.length === 2) {
      const region = COUNTRY_TO_REGION[countryRaw] ?? DEFAULT_REGION;
      return { region, country: countryRaw, detected: true };
    }
  } catch {
    // headers() throws outside a request context (build-time, edge cases)
  }
  return { region: DEFAULT_REGION, country: FALLBACK_COUNTRY, detected: false };
}

/**
 * Legacy helper — just the region part. Kept for backward compat with
 * any code that only needs the in-person toggle default.
 */
export async function getRegionFromHeaders(): Promise<Region> {
  const { region } = await getGeoFromHeaders();
  return region;
}
