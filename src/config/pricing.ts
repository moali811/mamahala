/* ================================================================
   Services Pricing — Single Source of Truth
   ================================================================
   This file owns all SERVICES (counseling sessions) pricing.
   Academy and Toolkit prices live separately in ./business.ts.

   Design:
   - Services reference a tier by key (e.g. 'standard50min').
   - Each tier declares duration + per-region/per-mode anchor prices.
   - Anchor = "Starting at" integer. No ranges. null = mode not offered.
   - Region is chosen at runtime (geo auto-detect + toggle).
   ================================================================ */

export type Region = 'CAD' | 'AED';
export type SessionMode = 'online' | 'inPerson';

export interface PricingTierDef {
  /** Internal key — services reference this string. */
  key: string;
  /** Session length in minutes. Drives the duration chip in UI. */
  durationMinutes: number;
  /**
   * Anchor prices per region × mode. `null` means "not offered in this mode".
   * Integers, no ranges, no decimals.
   */
  anchors: Record<Region, { online: number | null; inPerson: number | null }>;
}

export interface RegionMeta {
  code: Region;
  symbol: string;
  labelEn: string;
  labelAr: string;
  flag: string;
}

export const REGIONS: Record<Region, RegionMeta> = {
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    labelEn: 'Canada & USA',
    labelAr: 'كَنَدا والولايات المتحدة',
    flag: '🇨🇦',
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    labelEn: 'UAE & Gulf',
    labelAr: 'الإمارات والخليج',
    flag: '🇦🇪',
  },
};

/**
 * Tier catalog. Services reference these by key.
 * Values are "starting at" anchors (lower bound of the previous range).
 *
 * NOTE: To revise actual rates later, edit this one place. No other file
 * needs to change (the UI reads from these anchors directly).
 */
export const PRICING_TIERS = {
  /** 50-minute session — the default for most counseling services. */
  standard50min: {
    key: 'standard50min',
    durationMinutes: 50,
    anchors: {
      CAD: { online: 150, inPerson: 170 },
      AED: { online: 500, inPerson: 650 },
    },
  },
  /** 60-minute experiential / nature-based. In-person only. */
  experiential60min: {
    key: 'experiential60min',
    durationMinutes: 60,
    anchors: {
      CAD: { online: null, inPerson: 180 },
      AED: { online: null, inPerson: 550 },
    },
  },
  /**
   * University student / young adult session, discounted.
   * Data today is 50-min. If we later shift to 30-min, only this tier needs to change.
   */
  universityStudent50min: {
    key: 'universityStudent50min',
    durationMinutes: 50,
    anchors: {
      CAD: { online: 120, inPerson: 160 },
      AED: { online: 350, inPerson: 500 },
    },
  },
  /** Free 30-min discovery call — referenced by CTA copy, not rendered as a tier card. */
  discoveryCall30min: {
    key: 'discoveryCall30min',
    durationMinutes: 30,
    anchors: {
      CAD: { online: 0, inPerson: null },
      AED: { online: 0, inPerson: null },
    },
  },
  /** Returning-client 30-min consult. Used by booking page / Cal.com. */
  returningConsult30min: {
    key: 'returningConsult30min',
    durationMinutes: 30,
    anchors: {
      CAD: { online: 100, inPerson: 150 },
      AED: { online: 300, inPerson: 500 },
    },
  },
  /**
   * Flexible 45-min online/phone consultation. Used for returning clients,
   * quick check-ins, or any topic that doesn't fit a specific category.
   * Online/phone-only by design — in-person is null.
   */
  consultation45min: {
    key: 'consultation45min',
    durationMinutes: 45,
    anchors: {
      CAD: { online: 100, inPerson: null },
      AED: { online: 300, inPerson: null },
    },
  },
} as const satisfies Record<string, PricingTierDef>;

export type PricingTierKey = keyof typeof PRICING_TIERS;

export const DEFAULT_REGION: Region = 'CAD';

/** In-person region toggle — which physical office the client would visit. */
export const COUNTRY_TO_REGION: Record<string, Region> = {
  CA: 'CAD', US: 'CAD',
  AE: 'AED', SA: 'AED', KW: 'AED', BH: 'AED', QA: 'AED', OM: 'AED',
};

/* ================================================================
   GLOBAL ONLINE PRICING (AI-informed PPP bands)
   ================================================================
   Online sessions are localized per visitor country via:
     1. Band lookup (Premium / Mid / Emerging / Accessible)
     2. Multiplier applied to base anchor (CAD or AED for Gulf)
     3. FX conversion to local currency
     4. Smart rounding to psychologically clean numbers
     5. CAD floor enforcement

   Bands are AI-proposed, human-approved via admin dashboard (Phase 2).
   Phase 1 ships with a manually-set map; Phase 2 adds Claude-driven
   monthly research + approval flow.
   ================================================================ */

export type PricingBand = 'premium' | 'mid' | 'emerging' | 'accessible';

export const BAND_MULTIPLIERS: Record<PricingBand, number> = {
  premium: 1.0,
  mid: 0.75,
  emerging: 0.55,
  accessible: 0.40,
};

/** Minimum CAD equivalent for ANY online session — protects Dr. Hala's time value. */
export const CAD_FLOOR_ONLINE = 60;

/** GCC countries that use AED as the pricing base instead of CAD. */
export const GCC_COUNTRIES: readonly string[] = ['AE', 'SA', 'KW', 'BH', 'QA', 'OM'];

/**
 * Country ISO-3166-alpha2 → Pricing band.
 * Countries not listed fall through to `accessible` as the humble default —
 * safer than showing a premium price to an unclassified market.
 *
 * AI research (Phase 2) will refine this quarterly. For now, bands are based
 * on: GDP per capita, local therapy market rates, currency strength, and
 * economic classification (World Bank / IMF).
 */
export const COUNTRY_TO_BAND: Record<string, PricingBand> = {
  // ── Premium ──────────────────────────────────────────
  // North America & Oceania
  CA: 'premium', US: 'premium', AU: 'premium', NZ: 'premium',
  // Western Europe
  GB: 'premium', IE: 'premium', DE: 'premium', FR: 'premium', NL: 'premium',
  BE: 'premium', LU: 'premium', AT: 'premium', CH: 'premium',
  // Nordics
  DK: 'premium', SE: 'premium', NO: 'premium', FI: 'premium', IS: 'premium',
  // Developed Asia-Pacific
  JP: 'premium', SG: 'premium', HK: 'premium', KR: 'premium', TW: 'premium',
  // GCC (use AED base, premium multiplier)
  AE: 'premium', SA: 'premium', KW: 'premium', QA: 'premium', BH: 'premium', OM: 'premium',

  // ── Mid-market ───────────────────────────────────────
  // Southern & Eastern Europe
  ES: 'mid', PT: 'mid', IT: 'mid', GR: 'mid', CY: 'mid', MT: 'mid',
  PL: 'mid', CZ: 'mid', SK: 'mid', HU: 'mid', SI: 'mid', HR: 'mid',
  EE: 'mid', LV: 'mid', LT: 'mid',
  // Middle East / Mediterranean
  IL: 'mid',
  // Latin America
  CL: 'mid', UY: 'mid', CR: 'mid', PA: 'mid',

  // ── Emerging ─────────────────────────────────────────
  // Eastern Europe & Balkans
  RO: 'emerging', BG: 'emerging', RS: 'emerging', BA: 'emerging', MK: 'emerging', AL: 'emerging',
  ME: 'emerging',
  // Eastern Europe (former USSR)
  UA: 'emerging', BY: 'emerging', RU: 'emerging',
  // Middle East / N. Africa
  TR: 'emerging', JO: 'emerging', LB: 'emerging', TN: 'emerging', MA: 'emerging',
  // Caucasus
  GE: 'emerging', AM: 'emerging', AZ: 'emerging',
  // Central Asia
  KZ: 'emerging', MN: 'emerging',
  // Latin America
  MX: 'emerging', BR: 'emerging', AR: 'emerging', CO: 'emerging', PE: 'emerging',
  DO: 'emerging', EC: 'emerging',
  // Asia
  TH: 'emerging', MY: 'emerging', CN: 'emerging',
  // Africa
  ZA: 'emerging', NA: 'emerging', BW: 'emerging', MU: 'emerging',

  // ── Accessible ───────────────────────────────────────
  // South Asia
  IN: 'accessible', PK: 'accessible', BD: 'accessible', LK: 'accessible', NP: 'accessible',
  AF: 'accessible',
  // Central Asia (lower income)
  UZ: 'accessible', KG: 'accessible', TJ: 'accessible',
  // Eastern Europe (lower income)
  MD: 'accessible', XK: 'accessible',
  // Southeast Asia
  ID: 'accessible', PH: 'accessible', VN: 'accessible', KH: 'accessible', LA: 'accessible', MM: 'accessible',
  // N. Africa & Middle East (lower income)
  EG: 'accessible', DZ: 'accessible', LY: 'accessible', SD: 'accessible', YE: 'accessible',
  IQ: 'accessible', SY: 'accessible', PS: 'accessible', IR: 'accessible',
  // Sub-Saharan Africa
  NG: 'accessible', KE: 'accessible', GH: 'accessible', ET: 'accessible', UG: 'accessible',
  TZ: 'accessible', RW: 'accessible', SN: 'accessible', CI: 'accessible', CM: 'accessible',
  ZW: 'accessible', ZM: 'accessible', MZ: 'accessible',
  // Latin America (lower income)
  BO: 'accessible', VE: 'accessible', NI: 'accessible', HN: 'accessible', GT: 'accessible', SV: 'accessible',
};

/**
 * Country ISO-3166-alpha2 → ISO-4217 currency code.
 * Falls back to USD for unlisted countries (universal default).
 */
export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  // North America
  CA: 'CAD', US: 'USD', MX: 'MXN',
  // Europe — Eurozone
  DE: 'EUR', FR: 'EUR', NL: 'EUR', BE: 'EUR', LU: 'EUR', AT: 'EUR', IE: 'EUR',
  ES: 'EUR', PT: 'EUR', IT: 'EUR', GR: 'EUR', CY: 'EUR', MT: 'EUR',
  SK: 'EUR', SI: 'EUR', EE: 'EUR', LV: 'EUR', LT: 'EUR', FI: 'EUR', HR: 'EUR',
  // Europe — non-Euro
  GB: 'GBP', CH: 'CHF',
  DK: 'DKK', SE: 'SEK', NO: 'NOK', IS: 'ISK',
  PL: 'PLN', CZ: 'CZK', HU: 'HUF', RO: 'RON', BG: 'BGN',
  RS: 'RSD', BA: 'BAM', MK: 'MKD', AL: 'ALL',
  // Eastern Europe (former USSR)
  UA: 'UAH', BY: 'BYN', RU: 'RUB', MD: 'MDL',
  // Europe — euro-using non-EU
  XK: 'EUR', ME: 'EUR',
  // Caucasus
  GE: 'GEL', AM: 'AMD', AZ: 'AZN',
  // Central Asia
  KZ: 'KZT', UZ: 'UZS', KG: 'KGS', TJ: 'TJS', MN: 'MNT', AF: 'AFN',
  // Middle East / N. Africa
  AE: 'AED', SA: 'SAR', KW: 'KWD', QA: 'QAR', BH: 'BHD', OM: 'OMR',
  IL: 'ILS', JO: 'JOD', LB: 'LBP', TR: 'TRY',
  EG: 'EGP', TN: 'TND', MA: 'MAD', DZ: 'DZD', LY: 'LYD', SD: 'SDG',
  IQ: 'IQD', SY: 'SYP', YE: 'YER', PS: 'ILS', IR: 'IRR',
  // Sub-Saharan Africa
  ZA: 'ZAR', NG: 'NGN', KE: 'KES', GH: 'GHS', ET: 'ETB', UG: 'UGX',
  TZ: 'TZS', RW: 'RWF', SN: 'XOF', CI: 'XOF', CM: 'XAF',
  NA: 'NAD', BW: 'BWP', MU: 'MUR', ZW: 'USD', ZM: 'ZMW', MZ: 'MZN',
  // Asia
  JP: 'JPY', CN: 'CNY', KR: 'KRW', TW: 'TWD', HK: 'HKD', SG: 'SGD',
  IN: 'INR', PK: 'PKR', BD: 'BDT', LK: 'LKR', NP: 'NPR',
  ID: 'IDR', PH: 'PHP', VN: 'VND', TH: 'THB', MY: 'MYR',
  KH: 'KHR', LA: 'LAK', MM: 'MMK',
  // Oceania
  AU: 'AUD', NZ: 'NZD',
  // Latin America
  BR: 'BRL', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN',
  UY: 'UYU', BO: 'BOB', VE: 'VES', EC: 'USD', CR: 'CRC', PA: 'USD',
  DO: 'DOP', NI: 'NIO', HN: 'HNL', GT: 'GTQ', SV: 'USD',
};

/**
 * Return the anchor integer for one tier/region/mode, or null if unavailable.
 */
export function getAnchor(
  tierKey: PricingTierKey,
  region: Region,
  mode: SessionMode,
): number | null {
  return PRICING_TIERS[tierKey].anchors[region][mode];
}

/**
 * Lowest available CAD anchor for a tier — used by the hero badge and
 * `service.priceFrom` invariant checks.
 */
export function getMinAnchorCAD(tierKey: PricingTierKey): number {
  const { online, inPerson } = PRICING_TIERS[tierKey].anchors.CAD;
  const candidates: number[] = [];
  if (online !== null && online > 0) candidates.push(online);
  if (inPerson !== null && inPerson > 0) candidates.push(inPerson);
  return candidates.length ? Math.min(...candidates) : 0;
}

/** Look up a country's pricing band. Unclassified → 'accessible' (humble default). */
export function getBandForCountry(country: string): PricingBand {
  return COUNTRY_TO_BAND[country.toUpperCase()] ?? 'accessible';
}

/** Look up a country's local currency. Unclassified → 'USD' (universal default). */
export function getCurrencyForCountry(country: string): string {
  return COUNTRY_TO_CURRENCY[country.toUpperCase()] ?? 'USD';
}

/** True if a country uses the AED anchor base (Gulf). */
export function isGccCountry(country: string): boolean {
  return GCC_COUNTRIES.includes(country.toUpperCase());
}
