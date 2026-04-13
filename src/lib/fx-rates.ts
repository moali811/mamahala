/* ================================================================
   FX Rates — Static Apr 2026 snapshot
   ================================================================
   Phase 1: hardcoded rates anchored to CAD. Refresh manually by
   editing this file. Phase 2 will auto-refresh via ExchangeRate-API
   with 24h KV caching and gracefully fall back to this snapshot on
   API failure.

   Rates are "1 CAD = X of target currency" — i.e. multiply a CAD
   amount by the rate to get the target currency amount.

   Source: consolidated from market averages as of April 2026.
   Rounded to keep the file readable.
   ================================================================ */

export type CurrencyCode = string;

/** Rates are "1 CAD = X". Key is target currency. */
export const FX_RATES_CAD_BASE: Record<CurrencyCode, number> = {
  CAD: 1.0,

  // Major western currencies
  USD: 0.725,
  GBP: 0.575,
  EUR: 0.675,
  CHF: 0.645,
  AUD: 0.96,
  NZD: 1.04,
  JPY: 111,

  // Nordics
  DKK: 5.04,
  SEK: 7.6,
  NOK: 7.75,
  ISK: 100,

  // Central & Eastern Europe
  PLN: 2.85,
  CZK: 16.4,
  HUF: 258,
  RON: 3.35,
  BGN: 1.32,
  HRK: 5.1,
  RSD: 79,
  BAM: 1.32,
  MKD: 41.5,
  ALL: 70,

  // Eastern Europe — former USSR
  UAH: 28.5,     // Ukraine
  BYN: 2.37,     // Belarus
  RUB: 68,       // Russia
  MDL: 12.9,     // Moldova

  // Caucasus
  GEL: 1.98,     // Georgia
  AMD: 283,      // Armenia
  AZN: 1.23,     // Azerbaijan

  // Central Asia
  KZT: 342,      // Kazakhstan
  UZS: 9150,     // Uzbekistan
  KGS: 63,       // Kyrgyzstan
  TJS: 7.9,      // Tajikistan
  MNT: 2470,     // Mongolia
  AFN: 51,       // Afghanistan

  // Iran
  IRR: 30500,    // Iran

  // Gulf
  AED: 2.65,
  SAR: 2.72,
  KWD: 0.223,
  QAR: 2.64,
  BHD: 0.273,
  OMR: 0.279,

  // Middle East / Mediterranean
  ILS: 2.58,
  TRY: 25,
  JOD: 0.515,
  LBP: 65000,
  IQD: 950,
  SYP: 9100,
  YER: 181,

  // North Africa
  EGP: 35,
  TND: 2.27,
  MAD: 7.2,
  DZD: 97,
  LYD: 3.5,
  SDG: 435,

  // Sub-Saharan Africa
  ZAR: 13.2,
  NGN: 1150,
  KES: 94,
  GHS: 11.2,
  ETB: 85,
  UGX: 2700,
  TZS: 1900,
  RWF: 965,
  XOF: 443,
  XAF: 443,
  NAD: 13.2,
  BWP: 10,
  MUR: 33,
  ZMW: 19,
  MZN: 46,

  // Asia
  CNY: 5.25,
  KRW: 980,
  TWD: 23.4,
  HKD: 5.68,
  SGD: 0.97,
  INR: 60,
  PKR: 205,
  BDT: 80,
  LKR: 220,
  NPR: 97,
  IDR: 11500,
  PHP: 41,
  VND: 18000,
  THB: 25.4,
  MYR: 3.35,
  KHR: 2950,
  LAK: 15800,
  MMK: 1520,

  // Latin America
  MXN: 13.5,
  BRL: 3.65,
  ARS: 720,
  CLP: 690,
  COP: 2850,
  PEN: 2.72,
  UYU: 28.5,
  BOB: 5.0,
  VES: 27,
  CRC: 375,
  DOP: 43,
  NIO: 26.5,
  HNL: 18,
  GTQ: 5.65,
};

/**
 * Convert an amount from one currency to another via CAD as the pivot.
 * Returns NaN if either currency is unknown.
 */
export function convert(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
): number {
  if (from === to) return amount;
  const fromRate = FX_RATES_CAD_BASE[from];
  const toRate = FX_RATES_CAD_BASE[to];
  if (fromRate == null || toRate == null) return NaN;
  // amount_in_CAD = amount / fromRate; then * toRate
  return (amount / fromRate) * toRate;
}

/** List of all supported currencies. Used by the currency dropdown. */
export const SUPPORTED_CURRENCIES: CurrencyCode[] = Object.keys(FX_RATES_CAD_BASE);

/** Last updated (manual refresh). Phase 2 will surface the KV cache timestamp. */
export const FX_RATES_LAST_UPDATED = '2026-04-11';

/**
 * Common currency typos / informal names → ISO-4217 codes.
 * Applied by `autoCorrectCurrency()` before validation.
 */
const CURRENCY_CORRECTIONS: Record<string, string> = {
  // United Arab Emirates
  UAE: 'AED',
  DIRHAM: 'AED',
  // Saudi Arabia
  KSA: 'SAR',
  SAUDI: 'SAR',
  RIYAL: 'SAR',
  // United Kingdom
  UK: 'GBP',
  BRITAIN: 'GBP',
  POUND: 'GBP',
  POUNDS: 'GBP',
  STERLING: 'GBP',
  // United States
  USA: 'USD',
  US: 'USD',
  DOLLAR: 'USD',
  DOLLARS: 'USD',
  // Europe
  EU: 'EUR',
  EURO: 'EUR',
  EUROS: 'EUR',
  // Australia
  AUS: 'AUD',
  AUSTRALIA: 'AUD',
  // India
  INDIA: 'INR',
  RUPEE: 'INR',
  RUPEES: 'INR',
  // Japan
  JAPAN: 'JPY',
  YEN: 'JPY',
  // Canada
  CA: 'CAD',
  CANADA: 'CAD',
  // Egypt
  EGYPT: 'EGP',
  // Other gulf states
  KUWAIT: 'KWD',
  QATAR: 'QAR',
  BAHRAIN: 'BHD',
  OMAN: 'OMR',
};

/**
 * Check whether a currency code is present in our FX table.
 * Case-insensitive.
 */
export function isValidCurrency(code: string | undefined): boolean {
  if (!code) return false;
  return code.toUpperCase() in FX_RATES_CAD_BASE;
}

/**
 * Try to auto-correct common currency typos to the proper ISO-4217 code.
 * Returns `{ corrected: string, wasCorrection: boolean }`.
 *
 * Examples:
 *   'UAE'    → { corrected: 'AED', wasCorrection: true }
 *   'USA'    → { corrected: 'USD', wasCorrection: true }
 *   'CAD'    → { corrected: 'CAD', wasCorrection: false }
 *   'xyz'    → { corrected: 'xyz', wasCorrection: false } (caller validates)
 */
export function autoCorrectCurrency(raw: string | undefined): {
  corrected: string;
  wasCorrection: boolean;
} {
  if (!raw) return { corrected: '', wasCorrection: false };
  const upper = raw.trim().toUpperCase();
  if (upper in FX_RATES_CAD_BASE) {
    return { corrected: upper, wasCorrection: false };
  }
  const correction = CURRENCY_CORRECTIONS[upper];
  if (correction && correction in FX_RATES_CAD_BASE) {
    return { corrected: correction, wasCorrection: true };
  }
  return { corrected: upper, wasCorrection: false };
}

/**
 * Resolve a user-entered currency to a safe, validated ISO-4217 code.
 * - Auto-corrects common typos first
 * - Falls back to the default if still invalid
 * - Returns the final code plus metadata for UI warnings
 */
export function resolveCurrency(
  raw: string | undefined,
  fallback: string = 'CAD',
): { code: string; corrected: boolean; fellBack: boolean; original: string } {
  const original = (raw || '').trim();
  if (!original) {
    return { code: fallback, corrected: false, fellBack: false, original: '' };
  }
  const { corrected, wasCorrection } = autoCorrectCurrency(original);
  if (isValidCurrency(corrected)) {
    return { code: corrected, corrected: wasCorrection, fellBack: false, original };
  }
  return { code: fallback, corrected: false, fellBack: true, original };
}
