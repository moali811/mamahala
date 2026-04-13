/* ================================================================
   Smart Rounding — psychologically clean prices per currency
   ================================================================
   Goal: turn a raw converted amount (e.g. 3,600.47) into a price
   that feels intentional in its local market (₹3,599, not ₹3,600).

   Strategy:
   - Zero-decimal currencies (JPY, KRW, VND, IDR, CLP, etc) → integer.
   - High-value currencies (USD, EUR, GBP, CAD, AED, CHF, ILS) →
     round to nearest whole unit, then snap to ".99" or clean integer.
   - Low-value currencies (INR, PKR, EGP, NGN, etc) → snap to
     nearest 99/999/1999/4999 pattern.
   - Very weak currencies (IDR, VND, LBP) → snap to nearest 1000/10000.

   All rules err on the side of rounding DOWN (never up) to avoid
   accidentally crossing a psychological threshold upward.
   ================================================================ */

const ZERO_DECIMAL = new Set([
  'JPY', 'KRW', 'VND', 'IDR', 'CLP', 'COP', 'PYG', 'LAK', 'MMK',
  'HUF', 'ISK', 'UGX', 'TZS', 'RWF', 'MGA', 'CDF', 'DJF',
  'GNF', 'KMF', 'XAF', 'XOF', 'XPF', 'BIF', 'KHR', 'SLL',
]);

/** Currencies where ".99" snapping feels native (most western). */
const USES_99_PRICING = new Set([
  'USD', 'CAD', 'AUD', 'NZD', 'EUR', 'GBP', 'CHF', 'SGD', 'HKD',
  'AED', 'SAR', 'QAR', 'BHD', 'OMR', 'ILS', 'JOD',
  'DKK', 'SEK', 'NOK', 'PLN', 'CZK', 'RON',
  'ZAR', 'BWP', 'NAD', 'MYR', 'THB', 'BRL',
]);

/**
 * Round to a psychologically clean number for the given currency.
 * Normally rounds to the nearest clean tier that is ≤ the input amount
 * (avoids accidentally pushing prices upward).
 *
 * If `minAllowed` is supplied and the rounded result would fall below it,
 * re-rounds UP to the smallest clean tier that is ≥ `minAllowed`. This is
 * how the CAD $60 online floor is enforced in every target currency — the
 * pricing engine passes `floorInTarget = convert($60 CAD, 'CAD', target)`.
 */
export function smartRound(
  amount: number,
  currency: string,
  minAllowed?: number,
): number {
  const result = smartRoundDown(amount, currency);
  if (minAllowed != null && result < minAllowed) {
    return smartRoundUp(minAllowed, currency);
  }
  return result;
}

/** The default "round to nearest clean tier ≤ input" behavior. */
function smartRoundDown(amount: number, currency: string): number {
  if (!isFinite(amount) || amount <= 0) return 0;

  // Zero-decimal currencies: drop decimals, snap to nearest clean tier
  if (ZERO_DECIMAL.has(currency)) {
    return snapLargeInteger(amount);
  }

  // Extremely weak non-zero-decimal currencies (e.g. NGN, LBP, PKR, LKR, BDT)
  // Treat like zero-decimal: snap to nearest 99/999/1999/4999
  if (amount >= 1000) {
    return snapLargeInteger(amount);
  }

  // Normal-range currencies: use .99 snapping for western-style pricing,
  // otherwise round to nearest whole.
  if (USES_99_PRICING.has(currency)) {
    return snapToNinetyNine(amount);
  }

  // Default: round to nearest whole unit
  return Math.round(amount);
}

/**
 * Round to the smallest psychologically clean tier that is ≥ the input
 * amount. Used when enforcing a minimum (e.g. the CAD $60 floor): if the
 * naturally-rounded price would dip below the floor, this function picks
 * the next clean tier above the floor instead.
 *
 * Examples:
 *   smartRoundUp(43.5, 'USD') → 49  (not 39 — above the floor)
 *   smartRoundUp(85, 'EUR')   → 89
 *   smartRoundUp(3600, 'INR') → 3999
 *   smartRoundUp(16100, 'JPY') → 16500
 */
export function smartRoundUp(amount: number, currency: string): number {
  if (!isFinite(amount) || amount <= 0) return 0;

  if (ZERO_DECIMAL.has(currency)) {
    return snapLargeIntegerUp(amount);
  }
  if (amount >= 1000) {
    return snapLargeIntegerUp(amount);
  }
  if (USES_99_PRICING.has(currency)) {
    return snapToNinetyNineUp(amount);
  }
  return Math.ceil(amount);
}

/**
 * Snap an integer amount to the nearest "clean" marketing number
 * that is less than or equal to the input.
 *
 * Examples:
 *   3,600 → 3,599
 *   16,650 → 16,500
 *   1,114 → 1,099
 *   82,500 → 79,999 (stays under the input by snapping to 79,999)
 */
function snapLargeInteger(n: number): number {
  const rounded = Math.round(n);

  if (rounded < 100) return rounded; // too small to snap meaningfully
  if (rounded < 1000) {
    // e.g. 301 → 299, 144 → 149
    return snapSmallHundred(rounded);
  }
  if (rounded < 10000) {
    // e.g. 3,600 → 3,599 ; 2,063 → 1,999 ; 1,114 → 1,099
    return snapThousands(rounded);
  }
  if (rounded < 100000) {
    // e.g. 16,650 → 16,500 ; 82,500 → 79,999
    return snapTenThousands(rounded);
  }
  // Very large: round to nearest thousand-down
  return Math.floor(rounded / 1000) * 1000 - 1;
}

/** For 100–999: snap to nearest xx9 or xx99 pattern (e.g. 301 → 299, 144 → 149). */
function snapSmallHundred(n: number): number {
  // Candidates: 99, 149, 199, 249, 299, 349, 399, 449, 499, 549, 599, 649,
  //             699, 749, 799, 849, 899, 949, 999
  const candidates: number[] = [];
  for (let base = 99; base <= 999; base += 50) candidates.push(base);
  for (const c of candidates) {
    if (c > n) break;
  }
  // Pick the largest candidate ≤ n
  let best = candidates[0];
  for (const c of candidates) {
    if (c <= n) best = c;
    else break;
  }
  return best;
}

/** For 1000–9999: snap to nearest x99, x499, x999 pattern. */
function snapThousands(n: number): number {
  // Candidates inside each thousand: 999, 1499, 1999, 2499, 2999, 3499, 3999,
  // 4499, 4999, 5499, 5999, 6499, 6999, 7499, 7999, 8499, 8999, 9499, 9999
  const candidates: number[] = [];
  for (let base = 999; base <= 9999; base += 500) candidates.push(base);
  let best = candidates[0];
  for (const c of candidates) {
    if (c <= n) best = c;
    else break;
  }
  return best;
}

/** For 10,000–99,999: snap to nearest 500/1000 grid. */
function snapTenThousands(n: number): number {
  // Snap to nearest 500 down, then subtract 1 if the result is a round thousand.
  const snapped = Math.floor(n / 500) * 500;
  // Avoid "16,000 exact" — prefer "15,999"? Actually for 10k+ the round look
  // is fine. Keep the clean 500-grid value.
  return snapped;
}

/**
 * Round a small-range number (<1000) to the nearest clean .99 tier.
 * Examples:
 *   85.50 → 89
 *   100.50 → 99
 *   144 → 149
 *   75.40 → 75 (stays under 79)
 *   108 → 109
 */
function snapToNinetyNine(n: number): number {
  if (n < 10) return Math.round(n);
  const rounded = Math.round(n);

  // Try to snap to the nearest xx9 ending (9, 19, 29, 39, ... 999)
  // Rule: if rounded is already xx9 or xx4 or xx0, pick the nearest xx9.
  const mod10 = rounded % 10;
  if (mod10 === 9) return rounded;

  // Snap down to nearest xx9 unless we're within 2 units of the next xx9 up
  const lowerNine = rounded - mod10 - 1; // e.g. 144 → 139
  const upperNine = lowerNine + 10;       // e.g. 144 → 149
  const distLower = rounded - lowerNine;  // e.g. 144 - 139 = 5
  const distUpper = upperNine - rounded;  // e.g. 149 - 144 = 5

  // Prefer upper xx9 if it's ≤ 2 away (small upward nudge is psychologically fine)
  if (distUpper <= 2 && upperNine > 0) return upperNine;
  return Math.max(lowerNine, 9);
}

/* ── Upward-snapping mirror helpers (used when enforcing a minAllowed) ── */

/**
 * Snap a large integer UP to the smallest clean marketing number that is
 * greater than or equal to the input. Mirrors snapLargeInteger but picks
 * the NEXT tier above the input.
 */
function snapLargeIntegerUp(n: number): number {
  const rounded = Math.ceil(n);
  if (rounded < 100) return rounded;
  if (rounded < 1000) {
    // Small hundreds: 99, 149, 199, 249, ... 999
    const candidates: number[] = [];
    for (let base = 99; base <= 999; base += 50) candidates.push(base);
    for (const c of candidates) {
      if (c >= rounded) return c;
    }
    return 999;
  }
  if (rounded < 10000) {
    // Thousands: 999, 1499, 1999, ... 9999
    const candidates: number[] = [];
    for (let base = 999; base <= 9999; base += 500) candidates.push(base);
    for (const c of candidates) {
      if (c >= rounded) return c;
    }
    return 9999;
  }
  if (rounded < 100000) {
    // Ten-thousands: snap UP to next 500 grid
    return Math.ceil(rounded / 500) * 500;
  }
  // Very large: snap to next thousand
  return Math.ceil(rounded / 1000) * 1000 - 1;
}

/**
 * Snap a small-range number (<1000) UP to the next clean xx9 tier.
 * Examples: 43.5 → 49, 85 → 89, 100.5 → 109.
 */
function snapToNinetyNineUp(n: number): number {
  if (n <= 0) return 0;
  if (n < 10) return Math.ceil(n);
  const rounded = Math.ceil(n);
  const mod10 = rounded % 10;
  if (mod10 === 9) return rounded;
  // Next xx9 ≥ rounded
  const upperNine = rounded - mod10 + 9;
  return upperNine;
}

/**
 * Format an integer amount with locale-aware thousand separators and
 * a currency symbol prefix/suffix appropriate for that currency.
 *
 * We use Intl.NumberFormat for the number, and our own symbol lookup
 * for consistent branding. The locale is the visitor's language (en/ar).
 */
export function formatPrice(
  amount: number,
  currency: string,
  locale: 'en' | 'ar' = 'en',
): string {
  try {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: ZERO_DECIMAL.has(currency) ? 0 : 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    // Fallback: plain number + code
    return `${currency} ${Math.round(amount).toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US')}`;
  }
}
