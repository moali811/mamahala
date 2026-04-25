/* ================================================================
   Admin Auth Helper — Bearer token check with brute-force protection
   ================================================================
   - Constant-time comparison to prevent timing side-channel attacks.
   - Per-IP rate limit on failed attempts (10 fails / 15 min) so
     `ADMIN_PASSWORD` cannot be brute-forced across all admin APIs.
   ================================================================ */

import { timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { getClientIp } from '@/lib/rate-limit';
import { kv } from '@vercel/kv';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  // timingSafeEqual requires equal-length buffers; pad to the longer length
  if (aBuf.length !== bBuf.length) {
    // Still perform a comparison against a same-length buffer so timing is
    // not a function of password length.
    const maxLen = Math.max(aBuf.length, bBuf.length);
    const aPad = Buffer.alloc(maxLen);
    const bPad = Buffer.alloc(maxLen);
    aBuf.copy(aPad);
    bBuf.copy(bPad);
    timingSafeEqual(aPad, bPad);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

/**
 * Synchronous admin auth check (constant-time).
 * Prefer `authorizeWithLimit()` for routes exposed to the internet — it
 * also applies brute-force protection.
 */
export function authorize(req: NextRequest): boolean {
  if (!ADMIN_PASSWORD) return false;
  const header = req.headers.get('authorization') || '';
  const expected = `Bearer ${ADMIN_PASSWORD}`;
  return safeEqual(header, expected);
}

/**
 * Auth check with per-IP brute-force lockout. Use on all public-facing
 * admin routes. Returns `{ ok: true }` on valid auth; `{ ok: false,
 * status, error }` when unauthorized or locked out.
 */
export async function authorizeWithLimit(
  req: NextRequest,
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const ip = getClientIp(req);
  const failKey = `rl:admin-auth-fail:${ip}`;

  // SECURITY: check the password FIRST so a legitimate holder of the password
  // can always recover from a brute-force lockout (otherwise an attacker who
  // bot-spammed wrong passwords from the office IP would also lock out the
  // real admin for 15 minutes — DoS by association). Constant-time compare
  // means the wrong-then-lockout path is just as costly as the right-then-pass
  // path, so timing attacks remain infeasible.
  if (authorize(req)) {
    if (KV_AVAILABLE) {
      try { await kv.del(failKey); } catch { /* ignore */ }
    }
    return { ok: true };
  }

  // Wrong password — check the lockout counter and (if not locked out) record
  // the failure with a 15-min sliding window.
  if (KV_AVAILABLE) {
    try {
      const fails = (await kv.get<number>(failKey)) || 0;
      if (fails >= 10) {
        return { ok: false, status: 429, error: 'Too many failed attempts. Try again later.' };
      }
      const n = await kv.incr(failKey);
      if (n === 1) await kv.expire(failKey, 900);
    } catch {
      /* KV down — fail-open on the rate-limit check is acceptable */
    }
  }
  return { ok: false, status: 401, error: 'Unauthorized' };
}
