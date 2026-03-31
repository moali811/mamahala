import { NextResponse } from 'next/server';
import { trackEvent, type EventType } from '@/lib/analytics';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, email, source, locale } = body as {
      type: string;
      email?: string;
      source?: string;
      locale?: string;
    };

    if (!type) {
      return NextResponse.json({ error: 'Missing type' }, { status: 400 });
    }

    await trackEvent({
      type: type as EventType,
      email,
      source,
      locale,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Track API] error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
