/* ================================================================
   Manual tax helper — Canadian HST 13% (Ontario)
   ================================================================
   Invoked from `rate-breakdown.ts` and the PDF renderer.
   Phase 1 only supports Canadian HST; Phase 2 may add US/EU rules.
   ================================================================ */

import type { TaxMode } from './types';

export interface ManualTaxResult {
  amountLocal: number;
  amountCAD: number;
  percent: number;
  label: string;
}

/**
 * Compute the manual tax to add to a subtotal.
 * Returns `null` when no tax applies (non-CA client, or `taxMode === 'none'`).
 */
export function computeManualTax(
  subtotalLocal: number,
  subtotalCAD: number,
  country: string,
  taxMode: TaxMode,
): ManualTaxResult | null {
  if (taxMode !== 'manual-hst') return null;
  if (country.toUpperCase() !== 'CA') return null;

  const percent = 0.13;
  return {
    amountLocal: Math.round(subtotalLocal * percent),
    amountCAD: Math.round(subtotalCAD * percent),
    percent,
    label: 'HST 13% (Ontario)',
  };
}
