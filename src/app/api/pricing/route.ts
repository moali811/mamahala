import { NextResponse } from 'next/server';
import { getProductPricing } from '@/lib/pricing';

export const dynamic = 'force-dynamic';

/**
 * GET /api/pricing — Public endpoint returning current product prices.
 * No auth required — used by client components for display.
 */
export async function GET() {
  try {
    const pricing = await getProductPricing();
    return NextResponse.json(pricing, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch {
    // If everything fails, still return defaults so the UI never breaks
    const { DEFAULT_PRICING } = await import('@/lib/pricing');
    return NextResponse.json(DEFAULT_PRICING);
  }
}
