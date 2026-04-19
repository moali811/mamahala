import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { validateCategoryFaqs } from '@/lib/admin/content-validation';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

function authorize(req: NextRequest): boolean {
  return req.headers.get('authorization') === `Bearer ${ADMIN_PASSWORD}`;
}

// GET: Get saved category FAQs
export async function GET(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!KV_AVAILABLE) return NextResponse.json({ faqs: null });

  try {
    const faqs = await kv.get('cms:category-faqs');
    return NextResponse.json({ faqs: faqs || null });
  } catch {
    return NextResponse.json({ faqs: null });
  }
}

// POST: Save category FAQs
export async function POST(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!KV_AVAILABLE) return NextResponse.json({ error: 'KV not configured' }, { status: 500 });

  try {
    const { category, faqs } = await req.json();

    if (typeof category !== 'string' || !category.trim()) {
      return NextResponse.json({ error: 'Missing category' }, { status: 400 });
    }

    // Bilingual enforcement — every FAQ in the list must carry both EN
    // and AR question + answer, and the AR values must contain Arabic
    // characters (not English typed into the AR field).
    const result = validateCategoryFaqs(faqs);
    if (!result.valid) {
      return NextResponse.json(
        { error: 'Bilingual validation failed', details: result.errors },
        { status: 400 },
      );
    }

    // Get existing
    const raw = await kv.get('cms:category-faqs');
    const existing: Record<string, any[]> = (raw && typeof raw === 'object') ? raw as Record<string, any[]> : {};

    // Update the specific category
    existing[category] = faqs;
    await kv.set('cms:category-faqs', existing);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Category FAQs save error:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
