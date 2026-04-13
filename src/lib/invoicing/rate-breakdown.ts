/* ================================================================
   Rate Breakdown — the single source of truth for invoice math
   ================================================================
   Pure function used in three places:
   1. Compose UI via useMemo() — instant live updates
   2. POST /api/admin/invoices/preview — server-side verification
   3. POST /api/admin/invoices/create — server recomputes before PDF
      (frontend value is UI-only; never trusted for the real invoice)

   Floor safety: getOnlinePriceForCountry() already enforces the CAD $60
   floor at the base rate. The breakdown layer doesn't re-enforce it —
   complexity/package/sliding adjustments are intentionally allowed to
   go below $60/session when Dr. Hala applies a hardship override.
   ================================================================ */

import { services } from '@/data/services';
import { getOnlinePriceForCountry } from '@/lib/pricing-engine';
import { convert, resolveCurrency } from '@/lib/fx-rates';
import { formatPrice } from '@/lib/smart-round';
import type {
  InvoiceDraft,
  InvoiceRateBreakdown,
  InvoiceSettings,
} from './types';
import { PACKAGE_CONFIG } from './types';
import { computeManualTax } from './tax';

export function computeRateBreakdown(
  draft: InvoiceDraft,
  _settings: InvoiceSettings,
): InvoiceRateBreakdown | null {
  const service = services.find((s) => s.slug === draft.serviceSlug);
  if (!service) return null;

  const tierKey = service.pricingTierKey;
  const country = draft.client.country.toUpperCase();
  const pkg = PACKAGE_CONFIG[draft.package];
  const sessions = pkg.sessions;

  // ─── MULTI-LINE-ITEM PATH ───────────────────────────────────────
  // When the admin has added custom line items, sum them directly and
  // bypass the auto pricing-engine. Tax is still applied based on country
  // and tax mode. This supports Dr. Hala's Zoho-era "Session + CC fees"
  // style invoices.
  if (draft.lineItems && draft.lineItems.length > 0) {
    const lineCurrency =
      draft.displayCurrency || draft.manualPrice?.currency || 'CAD';
    const resolved = resolveCurrency(lineCurrency, 'CAD');
    const currency = resolved.code;

    let warning: string | undefined;
    if (resolved.fellBack) {
      warning = `Unknown currency "${resolved.original}" — defaulted to CAD.`;
    } else if (resolved.corrected) {
      warning = `Auto-corrected "${resolved.original}" to "${currency}".`;
    }

    const subtotalLocal = draft.lineItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPriceLocal,
      0,
    );
    const subCADRaw = convert(subtotalLocal, currency, 'CAD');
    const subtotalCAD = Math.round(isFinite(subCADRaw) ? subCADRaw : 0);

    // Tax (manual HST for CA only, based on primary service's country)
    const taxResult = computeManualTax(
      subtotalLocal,
      subtotalCAD,
      country,
      draft.taxMode,
    );
    const taxPct = taxResult?.percent ?? 0;
    const taxLocal = taxResult?.amountLocal ?? 0;
    const taxCAD = taxResult?.amountCAD ?? 0;

    const totalLocal = subtotalLocal + taxLocal;
    const totalCAD = subtotalCAD + taxCAD;

    // Build the formulaLine showing the item composition
    const itemSummary = draft.lineItems
      .map((item) => formatPrice(item.quantity * item.unitPriceLocal, currency))
      .join(' + ');
    const formulaParts: Array<string | null> = [
      `Multi-item: ${itemSummary}`,
      `= ${formatPrice(subtotalLocal, currency)}`,
      taxPct > 0
        ? `+ ${Math.round(taxPct * 100)}% HST = ${formatPrice(totalLocal, currency)}`
        : null,
      currency !== 'CAD' ? `(${formatPrice(totalCAD, 'CAD')})` : null,
    ];
    const lineFormulaLine = formulaParts
      .filter((p): p is string => !!p)
      .join(' ');

    // perSessionLocal is informational — the average per line item
    const perSessionLocal =
      draft.lineItems.length > 0
        ? Math.round(subtotalLocal / draft.lineItems.length)
        : 0;

    return {
      tierKey,
      serviceSlug: draft.serviceSlug,
      country,
      band: 'premium', // synthetic — multi-item doesn't use bands
      baseAmountLocal: perSessionLocal,
      baseAmountCAD: Math.round(convert(perSessionLocal, currency, 'CAD') || 0),
      displayCurrency: currency,
      floorApplied: false,
      complexityPercent: 0,
      afterComplexityLocal: perSessionLocal,
      afterComplexityCAD: Math.round(convert(perSessionLocal, currency, 'CAD') || 0),
      sessions: draft.lineItems.length,
      packageDiscountPercent: 0,
      slidingScalePercent: 0,
      perSessionLocal,
      subtotalLocal,
      subtotalCAD,
      taxMode: draft.taxMode,
      taxPercent: taxPct,
      taxAmountLocal: taxLocal,
      taxAmountCAD: taxCAD,
      totalLocal,
      totalCAD,
      formattedBase: formatPrice(perSessionLocal, currency),
      formattedTotal: formatPrice(totalLocal, currency),
      formattedTotalCAD: formatPrice(totalCAD, 'CAD'),
      formulaLine: lineFormulaLine,
      warning,
    };
  }

  // ─── MANUAL PRICE OVERRIDE PATH ─────────────────────────────────
  // When the admin enables manual override, bypass the auto pricing-engine
  // computation entirely and use the typed amount as the per-session price.
  if (draft.manualPrice?.enabled && draft.manualPrice.perSessionLocal > 0) {
    // Validate and auto-correct the currency input (fixes the UAE→AED typo bug)
    const rawCurrency =
      draft.manualPrice.currency || draft.displayCurrency || 'CAD';
    const resolved = resolveCurrency(rawCurrency, 'CAD');
    const manualCurrency = resolved.code;

    // Build a warning message if we auto-corrected or fell back
    let warning: string | undefined;
    if (resolved.fellBack) {
      warning = `Unknown currency "${resolved.original}" — defaulted to CAD. Pick from the dropdown for other currencies.`;
    } else if (resolved.corrected) {
      warning = `Auto-corrected "${resolved.original}" to "${manualCurrency}".`;
    }

    const perSession = Math.round(draft.manualPrice.perSessionLocal);
    const subtotal = perSession * sessions;
    const subCADRaw = convert(subtotal, manualCurrency, 'CAD');
    const subCAD = Math.round(isFinite(subCADRaw) ? subCADRaw : 0);

    // Tax (manual HST for CA only)
    const taxResult = computeManualTax(
      subtotal,
      subCAD,
      country,
      draft.taxMode,
    );
    const taxPct = taxResult?.percent ?? 0;
    const taxLocal = taxResult?.amountLocal ?? 0;
    const taxCAD = taxResult?.amountCAD ?? 0;

    const totalLocal = subtotal + taxLocal;
    const totalCAD = subCAD + taxCAD;

    const reasonNote = draft.manualPrice.reason
      ? ` (reason: ${draft.manualPrice.reason})`
      : '';
    const formulaParts: Array<string | null> = [
      `Manual ${formatPrice(perSession, manualCurrency)}`,
      sessions > 1 ? `× ${sessions} sessions` : null,
      `= ${formatPrice(subtotal, manualCurrency)}`,
      taxPct > 0 ? `+ ${Math.round(taxPct * 100)}% HST = ${formatPrice(totalLocal, manualCurrency)}` : null,
      manualCurrency !== 'CAD' ? `(${formatPrice(totalCAD, 'CAD')})` : null,
      reasonNote || null,
    ];
    const manualFormulaLine = formulaParts.filter((p): p is string => !!p).join(' ');

    return {
      tierKey,
      serviceSlug: draft.serviceSlug,
      country,
      band: 'premium', // synthetic — manual override doesn't use bands
      baseAmountLocal: perSession,
      baseAmountCAD: Math.round(convert(perSession, manualCurrency, 'CAD') || 0),
      displayCurrency: manualCurrency,
      floorApplied: false,
      complexityPercent: 0,
      afterComplexityLocal: perSession,
      afterComplexityCAD: Math.round(convert(perSession, manualCurrency, 'CAD') || 0),
      sessions,
      packageDiscountPercent: 0,
      slidingScalePercent: 0,
      perSessionLocal: perSession,
      subtotalLocal: subtotal,
      subtotalCAD: subCAD,
      taxMode: draft.taxMode,
      taxPercent: taxPct,
      taxAmountLocal: taxLocal,
      taxAmountCAD: taxCAD,
      totalLocal,
      totalCAD,
      formattedBase: formatPrice(perSession, manualCurrency),
      formattedTotal: formatPrice(totalLocal, manualCurrency),
      formattedTotalCAD: formatPrice(totalCAD, 'CAD'),
      formulaLine: manualFormulaLine,
      warning,
    };
  }

  // ─── AUTOMATIC PRICING ENGINE PATH (default) ────────────────────
  // Step 1: base rate from the pricing engine (localized + floor-safe)
  const base = getOnlinePriceForCountry(
    tierKey,
    country,
    draft.displayCurrency,
  );
  if (!base) return null;

  const displayCurrency = base.currency;
  const baseAmountLocal = base.amount;
  const baseAmountCADRaw = convert(baseAmountLocal, displayCurrency, 'CAD');
  const baseAmountCAD = Math.round(isFinite(baseAmountCADRaw) ? baseAmountCADRaw : 0);

  // Step 2: complexity premium
  const complexityPercent = Math.max(0, Math.min(1, draft.complexity.percent));
  const afterComplexityLocal = baseAmountLocal * (1 + complexityPercent);
  const afterComplexityCAD = baseAmountCAD * (1 + complexityPercent);

  // Step 3: package config (sessions/discount already destructured above)
  const packageDiscountPercent = pkg.discount;

  // Step 4: sliding scale (max 40%)
  const slidingScalePercent = Math.min(
    0.4,
    Math.max(0, draft.slidingScalePercent),
  );

  // Per-session amount (pre-tax)
  const perSessionLocalRaw =
    afterComplexityLocal *
    (1 - packageDiscountPercent) *
    (1 - slidingScalePercent);
  const perSessionLocal = Math.round(perSessionLocalRaw);
  const subtotalLocal = perSessionLocal * sessions;
  const subtotalCADRaw = convert(subtotalLocal, displayCurrency, 'CAD');
  const subtotalCAD = Math.round(isFinite(subtotalCADRaw) ? subtotalCADRaw : 0);

  // Step 5: tax (manual HST for CA only)
  const tax = computeManualTax(
    subtotalLocal,
    subtotalCAD,
    country,
    draft.taxMode,
  );
  const taxPercent = tax?.percent ?? 0;
  const taxAmountLocal = tax?.amountLocal ?? 0;
  const taxAmountCAD = tax?.amountCAD ?? 0;

  const totalLocal = subtotalLocal + taxAmountLocal;
  const totalCAD = subtotalCAD + taxAmountCAD;

  // Human-readable formula line
  const parts: Array<string | null> = [
    `Base ${formatPrice(baseAmountLocal, displayCurrency)}`,
    complexityPercent > 0
      ? `× ${(1 + complexityPercent).toFixed(2)} complexity`
      : null,
    sessions > 1 ? `× ${sessions} sessions` : null,
    packageDiscountPercent > 0
      ? `× ${(1 - packageDiscountPercent).toFixed(2)} package`
      : null,
    slidingScalePercent > 0
      ? `× ${(1 - slidingScalePercent).toFixed(2)} sliding`
      : null,
    `= ${formatPrice(subtotalLocal, displayCurrency)}`,
    taxPercent > 0 ? `+ ${Math.round(taxPercent * 100)}% HST` : null,
    taxPercent > 0 ? `= ${formatPrice(totalLocal, displayCurrency)}` : null,
    displayCurrency !== 'CAD'
      ? `(${formatPrice(totalCAD, 'CAD')})`
      : null,
  ];
  const formulaLine = parts.filter((p): p is string => !!p).join(' ');

  return {
    tierKey,
    serviceSlug: draft.serviceSlug,
    country,
    band: base.band,
    baseAmountLocal,
    baseAmountCAD,
    displayCurrency,
    floorApplied: base.floorApplied,
    complexityPercent,
    afterComplexityLocal: Math.round(afterComplexityLocal),
    afterComplexityCAD: Math.round(afterComplexityCAD),
    sessions,
    packageDiscountPercent,
    slidingScalePercent,
    perSessionLocal,
    subtotalLocal,
    subtotalCAD,
    taxMode: draft.taxMode,
    taxPercent,
    taxAmountLocal,
    taxAmountCAD,
    totalLocal,
    totalCAD,
    formattedBase: formatPrice(baseAmountLocal, displayCurrency),
    formattedTotal: formatPrice(totalLocal, displayCurrency),
    formattedTotalCAD: formatPrice(totalCAD, 'CAD'),
    formulaLine,
  };
}
