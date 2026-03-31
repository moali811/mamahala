import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function GET(request: NextRequest) {
  // Auth check
  const auth = request.headers.get('authorization');
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
  }

  try {
    const [registrations, waitlist, spots] = await Promise.all([
      kv.lrange(`event:${slug}:registrations`, 0, -1),
      kv.lrange(`event:${slug}:waitlist`, 0, -1),
      kv.get(`event:${slug}:spots`),
    ]);

    // Parse JSON strings from KV
    const parsedRegistrations = (registrations || []).map((r: string | object) =>
      typeof r === 'string' ? JSON.parse(r) : r,
    );
    const parsedWaitlist = (waitlist || []).map((r: string | object) =>
      typeof r === 'string' ? JSON.parse(r) : r,
    );

    return NextResponse.json({
      slug,
      registrations: parsedRegistrations,
      waitlist: parsedWaitlist,
      spotsRemaining: spots ?? null,
      totalRegistered: parsedRegistrations.length,
      totalWaitlisted: parsedWaitlist.length,
    });
  } catch (err) {
    console.error('Fetch registrations error:', err);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}
