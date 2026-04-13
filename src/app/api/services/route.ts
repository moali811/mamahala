import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { kv } from '@vercel/kv';
import { services as staticServices } from '@/data/services';
import { getMinAnchorCAD, type PricingTierKey } from '@/config/pricing';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// GET: Public endpoint returning merged CMS + static services
export async function GET() {
  let cmsServices: any[] = [];

  let hiddenIds: string[] = [];

  if (KV_AVAILABLE) {
    try {
      const raw = await kv.get('cms:services');
      if (raw && Array.isArray(raw)) {
        cmsServices = raw.map((s: any) => ({ ...s, source: 'cms' }));
      }
      const rawHidden = await kv.get('cms:hidden:service');
      if (rawHidden && Array.isArray(rawHidden)) hiddenIds = rawHidden;
    } catch { /* ignore */ }
  }

  // Merge: CMS overrides static by slug, exclude hidden
  const cmsSlugs = new Set(cmsServices.map((s: any) => s.slug));
  const hiddenSet = new Set(hiddenIds);
  let merged = [
    ...cmsServices,
    ...staticServices
      .map(s => ({ ...s, id: `static_${s.slug}` }))
      .filter(s => !cmsSlugs.has(s.slug) && !hiddenSet.has(s.id)),
  ];

  // Pricing backfill: CMS services entered via the admin module don't have
  // pricingTierKey. Infer the tier from any matching static service (by slug),
  // else fall back to 'standard50min'. Then recalculate priceFrom from the
  // tier's min CAD anchor so hero badges and category cards stay consistent.
  const staticBySlug = new Map(staticServices.map(s => [s.slug, s]));
  merged = merged.map((s: any) => {
    if (s.pricingTierKey) return s; // already correct (static services)
    const tierKey: PricingTierKey =
      (staticBySlug.get(s.slug)?.pricingTierKey as PricingTierKey | undefined) ??
      'standard50min';
    return {
      ...s,
      pricingTierKey: tierKey,
      priceFrom: getMinAnchorCAD(tierKey),
      currency: 'CAD',
    };
  });

  // Apply saved order if available
  if (KV_AVAILABLE) {
    try {
      const savedOrder = await kv.get('cms:order:service');
      if (savedOrder && Array.isArray(savedOrder)) {
        const orderMap = new Map<string, number>();
        (savedOrder as string[]).forEach((id, idx) => orderMap.set(id, idx));
        merged.sort((a: any, b: any) => {
          const aIdx = orderMap.get(a.id) ?? 9999;
          const bIdx = orderMap.get(b.id) ?? 9999;
          return aIdx - bIdx;
        });
      }
    } catch { /* ignore */ }
  }

  return NextResponse.json({ services: merged }, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
