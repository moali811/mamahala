import { NextRequest, NextResponse } from 'next/server';
import { getProductPricing, saveProductPricing, type ProductPricing } from '@/lib/pricing';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function authorize(req: NextRequest): boolean {
  return req.headers.get('authorization') === `Bearer ${ADMIN_PASSWORD}`;
}

/**
 * GET /api/admin/pricing — Retrieve current pricing (admin-protected)
 */
export async function GET(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const pricing = await getProductPricing();
    return NextResponse.json(pricing);
  } catch {
    return NextResponse.json({});
  }
}

/**
 * POST /api/admin/pricing — Save new pricing (admin-protected)
 * Body: { toolkitFullAccessPrice: number, academyFullAccessPrice: number }
 */
export async function POST(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json() as ProductPricing;

    // ─── Validation ───────────────────────────────────────────
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Missing pricing data' }, { status: 400 });
    }

    const { toolkitFullAccessPrice, academyFullAccessPrice } = body;

    if (typeof toolkitFullAccessPrice !== 'number' || toolkitFullAccessPrice <= 0 || toolkitFullAccessPrice > 999) {
      return NextResponse.json({ error: 'Toolkit price must be between $1 and $999' }, { status: 400 });
    }
    if (typeof academyFullAccessPrice !== 'number' || academyFullAccessPrice <= 0 || academyFullAccessPrice > 999) {
      return NextResponse.json({ error: 'Academy price must be between $1 and $999' }, { status: 400 });
    }

    await saveProductPricing({
      toolkitFullAccessPrice: Math.round(toolkitFullAccessPrice * 100) / 100, // max 2 decimal places
      academyFullAccessPrice: Math.round(academyFullAccessPrice * 100) / 100,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Admin Pricing] Save error:', err);
    return NextResponse.json({ error: 'Failed to save pricing' }, { status: 500 });
  }
}
