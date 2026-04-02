import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

function authorize(req: NextRequest): boolean {
  return req.headers.get('authorization') === `Bearer ${ADMIN_PASSWORD}`;
}

// GET: Retrieve saved settings
export async function GET(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!KV_AVAILABLE) {
    return NextResponse.json({ settings: null });
  }

  try {
    const settings = await kv.get('cms:settings');
    return NextResponse.json({ settings: settings || null });
  } catch {
    return NextResponse.json({ settings: null });
  }
}

// POST: Save settings
export async function POST(req: NextRequest) {
  if (!authorize(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!KV_AVAILABLE) {
    return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
  }

  try {
    const { settings } = await req.json();
    await kv.set('cms:settings', settings);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Settings save error:', err);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
