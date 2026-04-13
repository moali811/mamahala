/* ================================================================
   Pricing Engine — the smart layer
   ================================================================
   Takes a tier key + visitor country (+ optional currency override)
   and returns a fully-resolved online price localized for that
   visitor: band-adjusted, currency-converted, smart-rounded,
   floor-enforced, and formatted.

   Used by the service detail page to render the "Online (Global)" row.
   In-person rows use getAnchor() from config/pricing.ts instead.
   ================================================================ */

import {
  PRICING_TIERS,
  BAND_MULTIPLIERS,
  CAD_FLOOR_ONLINE,
  getBandForCountry,
  getCurrencyForCountry,
  isGccCountry,
  type PricingTierKey,
  type PricingBand,
  type Region,
} from '@/config/pricing';
import { convert, FX_RATES_CAD_BASE } from './fx-rates';
import { smartRound, formatPrice } from './smart-round';

export interface LocalizedOnlinePrice {
  tierKey: PricingTierKey;
  /** Country code used for the band lookup (e.g. 'IN', 'US', 'AE'). */
  country: string;
  /** Pricing band the country falls into. */
  band: PricingBand;
  /** Base anchor used for the calculation: 'CAD' for most, 'AED' for Gulf. */
  baseAnchor: Region;
  /** The currency code the price is displayed in (e.g. 'INR', 'EUR'). */
  currency: string;
  /** Smart-rounded amount in `currency`. */
  amount: number;
  /** Preformatted display string — e.g. "₹3,599", "€99", "CA$150". */
  formatted: string;
  /** If the floor was applied (floor > band-computed amount). */
  floorApplied: boolean;
}

/**
 * Resolve an online session price for a visitor in `country`, optionally
 * displayed in `displayCurrency` (override for currency-only dropdown).
 *
 * Returns null if the tier has no online price.
 */
export function getOnlinePriceForCountry(
  tierKey: PricingTierKey,
  country: string,
  displayCurrency?: string,
): LocalizedOnlinePrice | null {
  const tier = PRICING_TIERS[tierKey];
  const band = getBandForCountry(country);
  const multiplier = BAND_MULTIPLIERS[band];

  // Pick the base anchor: AED for Gulf countries, CAD for everyone else.
  const baseAnchor: Region = isGccCountry(country) ? 'AED' : 'CAD';
  const baseAmount = tier.anchors[baseAnchor].online;
  if (baseAmount == null || baseAmount <= 0) return null;

  // Step 1: apply the band multiplier in the base currency
  const adjustedInBase = baseAmount * multiplier;

  // Step 2: enforce the CAD floor, in CAD terms regardless of base anchor
  const adjustedInCAD =
    baseAnchor === 'CAD' ? adjustedInBase : convert(adjustedInBase, 'AED', 'CAD');
  const flooredCAD = Math.max(adjustedInCAD, CAD_FLOOR_ONLINE);
  const floorApplied = flooredCAD > adjustedInCAD;

  // Step 3: pick display currency — override if supplied and valid, else country's local
  const localCurrency = getCurrencyForCountry(country);
  const targetCurrency =
    displayCurrency && FX_RATES_CAD_BASE[displayCurrency] != null
      ? displayCurrency
      : localCurrency;

  // Step 4: convert floored CAD → target currency
  const rawAmount = convert(flooredCAD, 'CAD', targetCurrency);
  if (!isFinite(rawAmount)) return null;

  // Step 5: round. If the target currency matches the base anchor currency AND
  // the floor didn't change anything, preserve the EXACT authored anchor so
  // Canadian visitors see "CA$ 150" and UAE visitors see "AED 500" — not the
  // .99-snapped version. Smart-round only kicks in for converted foreign currencies.
  //
  // Floor safety: pass `floorInTarget` as the minAllowed param. If the natural
  // downward-rounding would dip below the CAD $60 floor equivalent in the target
  // currency, smartRound snaps UP to the next clean tier above the floor instead.
  // This fixes the $39 KZ bug (USD 43.50 → was 39, now → 49).
  const isNativeDisplay = targetCurrency === baseAnchor && !floorApplied;
  const floorInTarget = convert(CAD_FLOOR_ONLINE, 'CAD', targetCurrency);
  const amount = isNativeDisplay
    ? Math.round(adjustedInBase)
    : smartRound(rawAmount, targetCurrency, isFinite(floorInTarget) ? floorInTarget : undefined);

  return {
    tierKey,
    country: country.toUpperCase(),
    band,
    baseAnchor,
    currency: targetCurrency,
    amount,
    formatted: formatPrice(amount, targetCurrency, 'en'),
    floorApplied,
  };
}

/**
 * Locale-aware wrapper for when we know the visitor's UI locale (en/ar).
 */
export function getOnlinePriceForVisitor(
  tierKey: PricingTierKey,
  country: string,
  locale: 'en' | 'ar',
  displayCurrency?: string,
): LocalizedOnlinePrice | null {
  const base = getOnlinePriceForCountry(tierKey, country, displayCurrency);
  if (!base) return base;
  return {
    ...base,
    formatted: formatPrice(base.amount, base.currency, locale),
  };
}

/**
 * Dev-only sample: compute prices for a list of countries.
 * Handy for the verification workflow and sanity checks.
 */
export function samplePricesForCountries(
  tierKey: PricingTierKey,
  countries: string[],
): LocalizedOnlinePrice[] {
  return countries
    .map((c) => getOnlinePriceForCountry(tierKey, c))
    .filter((p): p is LocalizedOnlinePrice => p !== null);
}
