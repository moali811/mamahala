/**
 * ─── Dynamic Product Pricing ─────────────────────────────────────────
 * Single source of truth for toolkit & academy prices.
 *
 * Resolution order:
 *   1. KV store (`cms:pricing`)   — admin-editable, live
 *   2. BUSINESS config defaults   — code fallback, always works
 *
 * Used by:
 *   - Checkout API routes (server-side, for Stripe price_data)
 *   - Public /api/pricing endpoint (client-side display)
 *   - Admin /api/admin/pricing endpoint (read + write)
 */
import { BUSINESS } from '@/config/business';

// ─── Types ───────────────────────────────────────────────────────────
export interface ProductPricing {
  toolkitFullAccessPrice: number;
  academyFullAccessPrice: number;
}

export interface StoredPricing extends ProductPricing {
  updatedAt: string;
}

// ─── Defaults (from business.ts — zero KV dependency) ────────────────
export const DEFAULT_PRICING: ProductPricing = {
  toolkitFullAccessPrice: BUSINESS.toolkitFullAccessPrice,
  academyFullAccessPrice: BUSINESS.academyFullAccessPrice,
};

// ─── KV key ──────────────────────────────────────────────────────────
export const KV_KEY_PRICING = 'cms:pricing';

// ─── Server-side pricing resolution ──────────────────────────────────
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

/**
 * Get current product pricing. Tries KV first, falls back to BUSINESS defaults.
 * Safe to call on every request — single fast KV GET (~1-5ms).
 */
export async function getProductPricing(): Promise<ProductPricing> {
  if (!KV_AVAILABLE) return DEFAULT_PRICING;

  try {
    const { kv } = await import('@vercel/kv');
    const stored = await kv.get<StoredPricing>(KV_KEY_PRICING);
    if (stored && stored.toolkitFullAccessPrice > 0 && stored.academyFullAccessPrice > 0) {
      return {
        toolkitFullAccessPrice: stored.toolkitFullAccessPrice,
        academyFullAccessPrice: stored.academyFullAccessPrice,
      };
    }
  } catch (err) {
    console.warn('[Pricing] KV read failed, using defaults:', err);
  }

  return DEFAULT_PRICING;
}

/**
 * Save pricing to KV. Used by admin endpoint only.
 */
export async function saveProductPricing(pricing: ProductPricing): Promise<void> {
  if (!KV_AVAILABLE) throw new Error('KV not configured');

  const { kv } = await import('@vercel/kv');
  const stored: StoredPricing = {
    ...pricing,
    updatedAt: new Date().toISOString(),
  };
  await kv.set(KV_KEY_PRICING, stored);
}
