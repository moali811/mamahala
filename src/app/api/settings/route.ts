import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// GET: Public endpoint returning saved settings (for stats, etc.)
export async function GET() {
  if (!KV_AVAILABLE) {
    return NextResponse.json({ settings: null }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  }

  try {
    const settings = await kv.get('cms:settings');
    return NextResponse.json({ settings: settings || null }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch {
    return NextResponse.json({ settings: null }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  }
}
