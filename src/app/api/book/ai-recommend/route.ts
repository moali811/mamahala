/* POST /api/book/ai-recommend — AI-powered service recommendation */

import { NextRequest, NextResponse } from 'next/server';
import { recommendServices } from '@/lib/booking/ai-service-recommend';

export async function POST(request: NextRequest) {
  try {
    const { text, locale } = await request.json();

    if (!text || typeof text !== 'string' || text.trim().length < 3) {
      return NextResponse.json(
        { error: 'Please provide a description of what you are looking for (min 3 characters)' },
        { status: 400 },
      );
    }

    if (text.length > 2000) {
      return NextResponse.json({ error: 'Description too long (max 2000 characters)' }, { status: 400 });
    }

    const result = await recommendServices(text.trim(), locale === 'ar' ? 'ar' : 'en');

    return NextResponse.json(result);
  } catch (err) {
    console.error('[AI Recommend] Error:', err);
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
  }
}
