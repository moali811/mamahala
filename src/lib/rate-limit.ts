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

/** Booking confirm: 15 per hour per IP. Higher than gift/contact because
 *  the booking recovery flow legitimately re-fires confirm on each
 *  swap-and-retry (Tier 1 suggested-slot tap, Tier 3 mount-time guard,
 *  inline-picker re-pick). Pair with `refundBookingLimit()` on 409 paths
 *  so a failed slot check doesn't burn budget — only successful saves
 *  (and validation failures past spamCheck) consume the limit. */
export function limitBooking(ip: string) {
  const hour = Math.floor(Date.now() / 3_600_000);
  return check(`rl:booking:${ip}:${hour}`, 15, 3600);
}

/** Refund a single booking-limit hit. Called when /api/book/confirm
 *  rejects with 409 slot_unavailable (lock contention, calendar conflict)
 *  or 403 once-per-client gate — those outcomes don't create a booking,
 *  so the legitimate "try a different slot" or "switch service" retry
 *  shouldn't be punished. Idempotent enough for our needs: kv.decr can
 *  briefly go negative under racing refunds, which still satisfies
 *  `count <= limit`. */
export async function refundBookingLimit(ip: string): Promise<void> {
  if (!KV_AVAILABLE) return;
  const hour = Math.floor(Date.now() / 3_600_000);
  try {
    await kv.decr(`rl:booking:${ip}:${hour}`);
  } catch {
    // KV down → silently skip the refund. The user will eat one limit
    // slot for an unsuccessful attempt, which is acceptable.
  }
}

/** Pay-concierge token lookup: 60 per hour per IP. Tokens are 122-bit
 *  UUIDs so brute-force is infeasible, but the limit stops a bot from
 *  hammering the endpoint for enumeration / timing attacks. Real clients
 *  only hit this a handful of times per payment session. */
export function limitPayLookup(ip: string) {
  const hour = Math.floor(Date.now() / 3_600_000);
  return check(`rl:pay-lookup:${ip}:${hour}`, 60, 3600);
}

/** Academy grant-token verify: 60 per hour per IP. HMAC sigs are 192
 *  bits so brute-force is infeasible; the limit just blocks bots from
 *  hammering the endpoint. Recipients only hit this once per device. */
export function limitGrantVerify(ip: string) {
  const hour = Math.floor(Date.now() / 3_600_000);
  return check(`rl:grant-verify:${ip}:${hour}`, 60, 3600);
}
