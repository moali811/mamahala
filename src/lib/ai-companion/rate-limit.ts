/* ================================================================
   Simple KV-backed rate limiter for AI Companion chat.
   Falls open when KV is not configured (dev env).
   ================================================================ */

import { kv } from '@vercel/kv';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

async function bump(key: string, ttlSeconds: number, limit: number): Promise<RateLimitResult> {
  if (!KV_AVAILABLE) {
    return { allowed: true, remaining: limit, resetInSeconds: ttlSeconds };
  }
  try {
    const count = (await kv.incr(key)) as number;
    if (count === 1) {
      await kv.expire(key, ttlSeconds);
    }
    const ttl = (await kv.ttl(key)) as number;
    return {
      allowed: count <= limit,
      remaining: Math.max(0, limit - count),
      resetInSeconds: ttl > 0 ? ttl : ttlSeconds,
    };
  } catch {
    // If KV fails, fail open rather than block chat.
    return { allowed: true, remaining: limit, resetInSeconds: ttlSeconds };
  }
}

/** 30 requests / hour per IP */
export async function limitByIp(ip: string): Promise<RateLimitResult> {
  const hour = Math.floor(Date.now() / 3_600_000);
  return bump(`chat:rl:${ip}:${hour}`, 3600, 30);
}

/** 100 requests / day per student email */
export async function limitByEmail(email: string): Promise<RateLimitResult> {
  const day = Math.floor(Date.now() / 86_400_000);
  return bump(`chat:rl:student:${email.toLowerCase()}:${day}`, 86400, 100);
}

export function getClientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get('x-forwarded-for')?.split(',')[0].trim() ||
    h.get('x-real-ip') ||
    'anonymous'
  );
}
