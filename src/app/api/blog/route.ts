import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { kv } from '@vercel/kv';
import { blogPosts } from '@/data/blog-posts';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// GET: Public endpoint returning merged CMS + static blog posts
export async function GET() {
  let cmsPosts: any[] = [];
  let hiddenIds: string[] = [];

  if (KV_AVAILABLE) {
    try {
      const raw = await kv.get('cms:blog');
      if (raw && Array.isArray(raw)) {
        cmsPosts = raw.map((p: any) => ({ ...p, source: 'cms' }));
      }
      const rawHidden = await kv.get('cms:hidden:blog');
      if (rawHidden && Array.isArray(rawHidden)) hiddenIds = rawHidden;
    } catch { /* ignore */ }
  }

  // Build static posts in the CMS format
  const staticPosts = blogPosts.map((p: any) => {
    const contentEn = Array.isArray(p.contentEn) ? p.contentEn.join('\n\n') : (p.contentEn || '');
    const contentAr = Array.isArray(p.contentAr) ? p.contentAr.join('\n\n') : (p.contentAr || '');
    return {
      id: `static_${p.slug}`,
      slug: p.slug,
      title: p.titleEn || p.title,
      titleAr: p.titleAr || '',
      excerpt: Array.isArray(p.excerptEn) ? p.excerptEn.join(' ') : (p.excerptEn || p.excerpt || ''),
      excerptAr: Array.isArray(p.excerptAr) ? p.excerptAr.join(' ') : (p.excerptAr || ''),
      content: contentEn,
      contentAr: contentAr,
      category: p.category,
      date: p.publishDate || p.date,
      author: p.author || 'Dr. Hala Ali',
      readTime: p.readTime || 5,
      image: p.coverImage || p.image || '',
      featured: p.featured || false,
      published: true,
      source: 'static',
    };
  });

  // Merge: CMS overrides static by slug, exclude hidden
  const cmsSlugs = new Set(cmsPosts.map((p: any) => p.slug));
  const hiddenSet = new Set(hiddenIds);
  const merged = [
    ...cmsPosts,
    ...staticPosts.filter((p: any) => !cmsSlugs.has(p.slug) && !hiddenSet.has(p.id)),
  ];

  return NextResponse.json({ posts: merged }, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
