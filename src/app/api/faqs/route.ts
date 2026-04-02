import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { kv } from '@vercel/kv';
import { generalFaqs, bookingFaqs, contactFaqs, giftFaqs } from '@/data/faqs';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// GET: Public endpoint returning merged CMS + static FAQs
export async function GET() {
  let cmsFaqs: any[] = [];
  let hiddenIds: string[] = [];

  if (KV_AVAILABLE) {
    try {
      const raw = await kv.get('cms:faqs');
      if (raw && Array.isArray(raw)) {
        cmsFaqs = raw.map((f: any) => ({ ...f, source: 'cms' }));
      }
      const rawHidden = await kv.get('cms:hidden:faq');
      if (rawHidden && Array.isArray(rawHidden)) hiddenIds = rawHidden;
    } catch { /* ignore */ }
  }

  const allStaticFaqs = [...generalFaqs, ...bookingFaqs, ...contactFaqs, ...giftFaqs];
  const staticItems = allStaticFaqs.map((f: any, i: number) => ({
    id: `static_faq_${i}`,
    question: f.question,
    questionAr: f.questionAr || '',
    answer: f.answer,
    answerAr: f.answerAr || '',
    tag: f.tag || 'General',
    tagAr: f.tagAr || '',
    source: 'static',
  }));

  const cmsIds = new Set(cmsFaqs.map((f: any) => f.id));
  const hiddenSet = new Set(hiddenIds);
  let merged = [
    ...cmsFaqs,
    ...staticItems.filter((f: any) => !cmsIds.has(f.id) && !hiddenSet.has(f.id)),
  ];

  // Apply saved order if available
  if (KV_AVAILABLE) {
    try {
      const savedOrder = await kv.get('cms:order:faq');
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

  return NextResponse.json({ faqs: merged }, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
