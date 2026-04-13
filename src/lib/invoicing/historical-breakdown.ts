/* ================================================================
   Historical Breakdown Fabricator
   ================================================================
   Pure function that synthesizes an `InvoiceRateBreakdown` from raw
   Zoho Books CSV data. Used by the Zoho invoice importer so historical
   records can populate the Dashboard, Reports, AI Insights, and History
   tabs using the same shape as live invoices.

   Design principles:
   - No I/O, no KV access, no side effects
   - Never recomputes historical numbers — preserves Zoho's totals,
     tax, and exchange rates verbatim
   - Currency comes from `Currency Code`, not from my country→currency
     mapping (Zoho is the source of truth for historical rates)
   - Country is inferred from currency for the reports bucket only;
     if Billing Country is present in the row, it wins
   - All synthetic fields (band, tierKey, complexity, package discount)
     default to neutral values that reflect the historical reality
     (all Dr. Hala's past markets were premium, no complexity premium
     was charged, no package discounts were applied)
   ================================================================ */

import type { InvoiceRateBreakdown, TaxMode } from './types';
import { formatPrice } from '@/lib/smart-round';
import { countryNameToISO2 } from './country-iso';

/**
 * Maps a currency code to the ISO-2 country code where Dr. Hala's
 * invoices for that currency were typically issued. Used ONLY when
 * the CSV row has no explicit Billing Country.
 */
const CURRENCY_TO_COUNTRY: Record<string, string> = {
  CAD: 'CA',
  AED: 'AE',
  SAR: 'SA',
  USD: 'US',
  GBP: 'GB',
  EUR: 'FR',
  KWD: 'KW',
  QAR: 'QA',
  BHD: 'BH',
  OMR: 'OM',
  JOD: 'JO',
  EGP: 'EG',
};

/**
 * Raw row type — matches what `parseCSV()` returns from the Zoho
 * Invoice.csv (all keys lowercased). We don't bind to CSV column
 * names at the type level so we stay flexible across Zoho export
 * versions.
 */
export type ZohoInvoiceRow = Record<string, string>;

/**
 * Parse a numeric field from a Zoho CSV row. Handles:
 * - Empty strings → fallback
 * - Trailing currency symbols (e.g., "113.00")
 * - Comma thousand separators ("1,200.00")
 */
function parseNum(raw: string | undefined, fallback = 0): number {
  if (!raw || !raw.trim()) return fallback;
  const cleaned = raw.replace(/,/g, '').trim();
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Infer the ISO-2 country code for a historical invoice. Priority:
 * 1. Billing Country column (if populated and resolvable)
 * 2. Currency code → country mapping (CAD → CA, AED → AE, …)
 * 3. Fallback to 'CA' (Dr. Hala's home market)
 */
export function inferCountryFromRow(
  row: ZohoInvoiceRow,
  currency: string,
): string {
  const billingCountry = row['billing country'] || '';
  if (billingCountry) {
    const iso = countryNameToISO2(billingCountry);
    if (iso) return iso;
  }
  return CURRENCY_TO_COUNTRY[currency.toUpperCase()] || 'CA';
}

/**
 * Fabricate an `InvoiceRateBreakdown` from a Zoho CSV row (the primary
 * row when the invoice spans multiple line items).
 *
 * Historical invoices preserve:
 * - `totalLocal`, `subtotalLocal`, `taxAmountLocal` verbatim from Zoho
 * - `totalCAD` = Total × Exchange Rate (Zoho's rate, not my static table)
 * - `displayCurrency` from the Currency Code column
 * - `taxPercent` from `Item Tax1 %` (0.13 for HST, 0.05 for GST, 0 otherwise)
 *
 * And fabricates:
 * - `tierKey: 'standard50min'` (most invoices are 50-min sessions)
 * - `band: 'premium'` (Dr. Hala's historical markets are all premium)
 * - `complexityPercent: 0`, `packageDiscountPercent: 0`, `slidingScalePercent: 0`
 * - `formulaLine: "Historical: SubTotal + tax% = Total"`
 */
export function buildHistoricalBreakdown(
  row: ZohoInvoiceRow,
  serviceSlug: string,
): InvoiceRateBreakdown {
  const currency = (row['currency code'] || 'CAD').toUpperCase();
  const subtotalLocal = parseNum(row['subtotal']);
  const totalLocal = parseNum(row['total']);
  const taxAmountLocal = Math.max(0, totalLocal - subtotalLocal);
  // Zoho's `Item Tax1 %` column comes as "13.00" or "5.00", not 0.13/0.05
  const taxPercentRaw = parseNum(row['item tax1 %']);
  const taxPercent = taxPercentRaw > 1 ? taxPercentRaw / 100 : taxPercentRaw;
  const quantity = parseNum(row['quantity'], 1);
  const itemPrice = parseNum(row['item price'], subtotalLocal);
  // Exchange rate: Zoho reports "1 {currency} = X CAD" for non-CAD invoices
  // and "1.00" for CAD. Defensive default is 1.
  const exchangeRate = parseNum(row['exchange rate'], 1);

  const totalCAD = Math.round(totalLocal * exchangeRate);
  const subtotalCAD = Math.round(subtotalLocal * exchangeRate);
  const taxAmountCAD = Math.round(taxAmountLocal * exchangeRate);
  const baseAmountCAD = Math.round(itemPrice * exchangeRate);

  const country = inferCountryFromRow(row, currency);
  const taxMode: TaxMode = taxPercent > 0 ? 'manual-hst' : 'none';
  const sessions = Math.max(1, Math.round(quantity));

  const formulaLine = [
    'Historical:',
    formatPrice(subtotalLocal, currency),
    taxPercent > 0 ? `+ ${Math.round(taxPercent * 100)}% tax` : null,
    '=',
    formatPrice(totalLocal, currency),
    currency !== 'CAD' ? `(${formatPrice(totalCAD, 'CAD')})` : null,
  ]
    .filter((p): p is string => !!p)
    .join(' ');

  return {
    tierKey: 'standard50min',
    serviceSlug,
    country,
    band: 'premium',
    baseAmountLocal: itemPrice,
    baseAmountCAD,
    displayCurrency: currency,
    floorApplied: false,
    complexityPercent: 0,
    afterComplexityLocal: itemPrice,
    afterComplexityCAD: baseAmountCAD,
    sessions,
    packageDiscountPercent: 0,
    slidingScalePercent: 0,
    perSessionLocal: itemPrice,
    subtotalLocal,
    subtotalCAD,
    taxMode,
    taxPercent,
    taxAmountLocal,
    taxAmountCAD,
    totalLocal,
    totalCAD,
    formattedBase: formatPrice(itemPrice, currency),
    formattedTotal: formatPrice(totalLocal, currency),
    formattedTotalCAD: formatPrice(totalCAD, 'CAD'),
    formulaLine,
  };
}
