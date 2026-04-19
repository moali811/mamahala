/* ================================================================
   Simple KV-backed rate limiter for public endpoints.
   Falls open when KV is not configured (dev env).
   ================================================================ */

import { kv } from '@vercel/kv';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

/**
 * Generic rate-limit check.
 * @param key   Unique key for this limit bucket (e.g. "contact:1.2.3.4")
 * @param limit Max requests in the window
 * @param windowSeconds Window size in seconds
 */
async function check(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  if (!KV_AVAILABLE) {
    return { allowed: true, remaining: limit };
  }
  try {
    const count = (await kv.incr(key)) as number;
    if (count === 1) {
      await kv.expire(key, windowSeconds);
    }
    return {
      allowed: count <= limit,
      remaining: Math.max(0, limit - count),
    };
  } catch {
    // Fail open — don't block real users if KV is down
    return { allowed: true, remaining: limit };
  }
}

/** Extract client IP from request headers */
export function getClientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get('x-forwarded-for')?.split(',')[0].trim() ||
    h.get('x-real-ip') ||
    'anonymous'
  );
}

/** Contact form: 5 submissions per hour per IP */
export function limitContact(ip: string) {
  const hour = Math.floor(Date.now() / 3_600_000);
  return check(`rl:contact:${ip}:${hour}`, 5, 3600);
}

/** Newsletter signup: 3 per hour per IP */
export function limitNewsletter(ip: string) {
  const hour = Math.floor(Date.now() / 3_600_000);
  return check(`rl:newsletter:${ip}:${hour}`, 3, 3600);
}

/** Event registration: 10 per hour per IP */
export function limitEventRegister(ip: string) {
  const hour = Math.floor(Date.now() / 3_600_000);
  return check(`rl:event-reg:${ip}:${hour}`, 10, 3600);
}

/** Gift send: 5 per hour per IP */
export function limitGift(ip: string) {
  const hour = Math.floor(Date.now() / 3_600_000);
  return check(`rl:gift:${ip}:${hour}`, 5, 3600);
}

/** Quiz share: 5 per hour per IP */
export function limitQuizShare(ip: string) {
  const hour = Math.floor(Date.now() / 3_600_000);
  return check(`rl:quiz-share:${ip}:${hour}`, 5, 3600);
}

/** Academy enroll: 5 per hour per IP */
export function limitAcademyEnroll(ip: string) {
  const hour = Math.floor(Date.now() / 3_600_000);
  return check(`rl:academy-enroll:${ip}:${hour}`, 5, 3600);
}

/** Magic link (account + academy): 5 per hour per IP */
export function limitMagicLink(ip: string) {
  const hour = Math.floor(Date.now() / 3_600_000);
  return check(`rl:magic-link:${ip}:${hour}`, 5, 3600);
}

/** Booking confirm: 5 per hour per IP */
export function limitBooking(ip: string) {
  const hour = Math.floor(Date.now() / 3_600_000);
  return check(`rl:booking:${ip}:${hour}`, 5, 3600);
}
