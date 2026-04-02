import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { kv } from '@vercel/kv';
import { testimonials as staticTestimonials } from '@/data/testimonials';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// GET: Public endpoint returning merged CMS + static testimonials
export async function GET() {
  let cmsTestimonials: any[] = [];
  let hiddenIds: string[] = [];

  if (KV_AVAILABLE) {
    try {
      const raw = await kv.get('cms:testimonials');
      if (raw && Array.isArray(raw)) {
        cmsTestimonials = raw.map((t: any) => ({ ...t, source: 'cms' }));
      }
      const rawHidden = await kv.get('cms:hidden:testimonial');
      if (rawHidden && Array.isArray(rawHidden)) hiddenIds = rawHidden;
    } catch { /* ignore */ }
  }

  const staticItems = staticTestimonials.map((t: any) => ({
    id: `static_${t.id}`,
    name: t.name,
    text: t.text,
    textAr: t.textAr || '',
    role: t.role,
    roleAr: t.roleAr || '',
    category: t.category,
    rating: t.rating,
    featured: t.featured || false,
    source: 'static',
  }));

  const cmsIds = new Set(cmsTestimonials.map((t: any) => t.id));
  const hiddenSet = new Set(hiddenIds);
  const merged = [
    ...cmsTestimonials,
    ...staticItems.filter((t: any) => !cmsIds.has(t.id) && !hiddenSet.has(t.id)),
  ];

  return NextResponse.json({ testimonials: merged }, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
