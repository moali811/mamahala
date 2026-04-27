/* POST /api/booking/recognize — Soft client recognition
   ================================================================
   Returns ONLY whether an email matches a known customer record.
   Never returns name/phone/country — that would leak PII to anyone
   who can guess an email address. To get full prefill, the client
   must complete a magic-link round-trip (sets booking_session cookie).
   ================================================================
   Body: { email }
   Response: { recognized: boolean }
   Rate-limited per IP. Always 200 to prevent enumeration via timing.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { getCustomer } from '@/lib/invoicing/customer-store';
import { isValidEmail } from '@/lib/spam-guard';
import { getClientIp } from '@/lib/rate-limit';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const RECOGNIZE_LIMIT = 30;          // requests per window per IP
const RECOGNIZE_WINDOW_SEC = 600;    // 10 minutes

async function checkRecognizeRateLimit(ip: string): Promise<boolean> {
  if (!KV_AVAILABLE) return true; // fail-open in dev
  try {
    const { kv } = await import('@vercel/kv');
    const key = `rl:recognize:${ip}`;
    const n = await kv.incr(key);
    if (n === 1) await kv.expire(key, RECOGNIZE_WINDOW_SEC);
    return n <= RECOGNIZE_LIMIT;
  } catch {
    return true;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const allowed = await checkRecognizeRateLimit(ip);
    if (!allowed) {
      // Always 200 to prevent timing-based enumeration; just say not recognized.
      return NextResponse.json({ recognized: false });
    }

    const { email } = await request.json() as { email?: string };
    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json({ recognized: false });
    }

    const customer = await getCustomer(email.toLowerCase().trim());
    return NextResponse.json({ recognized: !!customer });
  } catch {
    return NextResponse.json({ recognized: false });
  }
}
