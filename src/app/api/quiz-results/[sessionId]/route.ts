import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }
    // Same shape as the writer in /api/quiz-share — refuse anything that
    // isn't a 12–64 char hex/uuid id so an attacker can't probe arbitrary
    // KV keys via `/api/quiz-results/{guess}`.
    if (!/^[a-z0-9-]{12,64}$/i.test(sessionId)) {
      return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
    }

    try {
      if (!kv) throw new Error('KV not available');
      const data = await kv.get(`quiz-shared:${sessionId}`);
      if (!data) {
        return NextResponse.json({ error: 'Results not found' }, { status: 404 });
      }
      const result = typeof data === 'string' ? JSON.parse(data) : data;
      return NextResponse.json(result);
    } catch {
      return NextResponse.json({ error: 'Results not found' }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
