import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
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

    // Admin/preview bypass cookie — skip tracking for internal traffic
    const cookieStore = await cookies();
    const isPreview = cookieStore.get('mh_preview')?.value === '1';

    await trackEvent({
      type: type as EventType,
      email,
      source,
      locale,
      skipTracking: isPreview,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Track API] error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
