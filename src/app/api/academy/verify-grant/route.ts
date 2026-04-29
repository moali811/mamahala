/* ================================================================
   GET /api/academy/verify-grant?token=X
   ================================================================
   Verifies a signed academy grant token and returns the embedded
   email on success. Called by the unlock-success bridge page
   client-side, which then writes localStorage.academy_email = X so
   the program page's identity-based unlock check succeeds with one
   click on the recipient's fresh device.

   Public endpoint (no admin auth) — the HMAC signature is the
   authorization. Per-IP rate-limit covers the brute-force surface.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { verifyGrantToken } from '@/lib/academy/grant-token';
import { limitGrantVerify, getClientIp } from '@/lib/rate-limit';

export const maxDuration = 5;

export async function GET(req: NextRequest) {
  // Light-touch rate limit so a brute-force on the HMAC signature
  // (32 base64url chars = 192 bits) is even more impractical.
  const ip = getClientIp(req);
  const rl = await limitGrantVerify(ip);
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
  }

  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const result = verifyGrantToken(token);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ email: result.email });
}
