import { NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quizSlug, sessionId, score, maxScore, tier, locale } = body;

    if (!quizSlug || !sessionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Track quiz completion
    await trackEvent({
      type: 'quiz_completion',
      source: quizSlug,
      locale: locale || 'en',
    });

    return NextResponse.json({ success: true, sessionId });
  } catch (error) {
    console.error('Quiz results error:', error);
    return NextResponse.json({ success: true }); // Non-blocking
  }
}
