import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

function authorize(req: NextRequest): boolean {
  return req.headers.get('authorization') === `Bearer ${ADMIN_PASSWORD}`;
}

// Map content type → KV key
const KV_KEYS: Record<string, string> = {
  blog: 'cms:blog',
  testimonial: 'cms:testimonials',
  faq: 'cms:faqs',
};

// Merge CMS items with static data
async function getMergedItems(type: string): Promise<any[]> {
  let cmsItems: any[] = [];
  let staticItems: any[] = [];

  // Get CMS items from KV
  if (KV_AVAILABLE) {
    try {
      const raw = await kv.get(KV_KEYS[type]);
      if (raw && Array.isArray(raw)) cmsItems = raw.map((i: any) => ({ ...i, source: 'cms' }));
    } catch { /* ignore */ }
  }

  // Get static items
  try {
    if (type === 'blog') {
      const { blogPosts } = await import('@/data/blog-posts');
      staticItems = blogPosts.map((p: any) => ({
        id: `static_${p.slug}`,
        slug: p.slug,
        title: p.titleEn || p.title,
        titleAr: p.titleAr || '',
        excerpt: p.excerptEn || p.excerpt || '',
        excerptAr: p.excerptAr || '',
        content: p.contentEn || p.content || '',
        contentAr: p.contentAr || '',
        category: p.category,
        date: p.publishDate || p.date,
        author: p.author || 'Dr. Hala Ali',
        readTime: p.readTime || 5,
        image: p.image || '',
        featured: p.featured || false,
        published: true,
        source: 'static',
      }));
    } else if (type === 'testimonial') {
      const { testimonials } = await import('@/data/testimonials');
      staticItems = testimonials.map((t: any) => ({
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
    } else if (type === 'faq') {
      const { generalFaqs, bookingFaqs, contactFaqs, giftFaqs } = await import('@/data/faqs');
      const allFaqs = [...generalFaqs, ...bookingFaqs, ...contactFaqs, ...giftFaqs];
      staticItems = allFaqs.map((f: any, i: number) => ({
        id: `static_faq_${i}`,
        question: f.question,
        questionAr: f.questionAr || '',
        answer: f.answer,
        answerAr: f.answerAr || '',
        tag: f.tag || 'general',
        tagAr: f.tagAr || '',
        source: 'static',
      }));
    }
  } catch { /* ignore import errors */ }

  // CMS items first, then static (dedup by slug for blog)
  const cmsSlugs = new Set(cmsItems.map((i: any) => i.slug || i.id));
  const merged = [
    ...cmsItems,
    ...staticItems.filter((s: any) => !cmsSlugs.has(s.slug || s.id)),
  ];

  return merged;
}

// GET: List content
export async function GET(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const type = req.nextUrl.searchParams.get('type');
  if (!type || !KV_KEYS[type]) {
    return NextResponse.json({ error: 'Invalid type. Use: blog, testimonial, faq' }, { status: 400 });
  }

  const items = await getMergedItems(type);
  return NextResponse.json({ items, total: items.length });
}

// POST: Create / Update / Delete
export async function POST(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { type, action, data } = body;

  if (!type || !KV_KEYS[type]) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }
  if (!action || !['create', 'update', 'delete'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action. Use: create, update, delete' }, { status: 400 });
  }

  if (!KV_AVAILABLE) {
    return NextResponse.json({ error: 'KV storage not configured' }, { status: 500 });
  }

  try {
    // Get current CMS items
    const raw = await kv.get(KV_KEYS[type]);
    let items: any[] = raw && Array.isArray(raw) ? raw : [];

    const now = new Date().toISOString();

    if (action === 'create') {
      const id = `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      items.unshift({ ...data, id, createdAt: now, updatedAt: now });
    } else if (action === 'update') {
      if (!data.id) return NextResponse.json({ error: 'Missing id for update' }, { status: 400 });
      items = items.map((item: any) => item.id === data.id ? { ...item, ...data, updatedAt: now } : item);
    } else if (action === 'delete') {
      if (!data.id) return NextResponse.json({ error: 'Missing id for delete' }, { status: 400 });
      items = items.filter((item: any) => item.id !== data.id);
    }

    // Save back to KV
    await kv.set(KV_KEYS[type], items);

    return NextResponse.json({ success: true, items, total: items.length });
  } catch (err) {
    console.error('Content API error:', err);
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}
