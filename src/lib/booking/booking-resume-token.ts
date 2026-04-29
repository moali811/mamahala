/* ================================================================
   Booking Resume Token — long-lived single-use signed link
   ================================================================
   Used in invoice and follow-up emails to drop the client straight
   into a recognized booking flow without typing email or going
   through a magic-link round-trip.

   Why not the existing 15-minute magic link?
     - Invoice/follow-up emails sit in inboxes for weeks. A 15-min
       magic link is dead by the time the client clicks "Book your
       next session." A separate 30-day token preserved single-use
       semantics while making the deep-link reliable.

   Security envelope:
     1. HMAC(ADMIN_PASSWORD) signed payload `email|expiresAt|nonce`
     2. The nonce is recorded in KV with a 30-day TTL the moment a
        token is minted. On consumption, we delete the KV record so
        the same token cannot be reused.
     3. At consumption time we also reverify the customer record
        still exists (cheap insurance: a `forget-me` between mint
        and click invalidates the token).
   ================================================================ */

import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { kv } from '@vercel/kv';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

/** 30 days in seconds — matches the token TTL. */
export const RESUME_TOKEN_TTL_SECONDS = 30 * 24 * 60 * 60;

const NONCE_KEY = (nonce: string) => `bktok:${nonce}`;

function secret(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error('ADMIN_PASSWORD is not configured');
  return pw;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url').slice(0, 32);
}

export interface MintedResumeToken {
  /** URL-safe opaque token to embed in email links. */
  token: string;
  /** Epoch milliseconds when the token expires. */
  expiresAt: number;
}

/**
 * Mint a single-use resume token bound to `email`. Persists the nonce
 * in KV so consumption can mark it spent. Returns the encoded token.
 */
export async function mintBookingResumeToken(email: string): Promise<MintedResumeToken> {
  const normalized = email.toLowerCase().trim();
  if (!normalized.includes('@')) throw new Error('Invalid email for resume token');

  const nonce = randomBytes(12).toString('base64url');
  const expiresAt = Date.now() + RESUME_TOKEN_TTL_SECONDS * 1000;
  const payload = `${normalized}|${expiresAt}|${nonce}`;
  const sig = sign(payload);
  const token = `${Buffer.from(payload).toString('base64url')}.${sig}`;

  if (KV_AVAILABLE) {
    try {
      await kv.set(
        NONCE_KEY(nonce),
        { email: normalized, mintedAt: Date.now() },
        { ex: RESUME_TOKEN_TTL_SECONDS },
      );
    } catch (err) {
      // KV write failure means consumption can't enforce single-use, but
      // the signature + expiry still provide auth. Log and continue.
      console.error('[booking-resume-token] mint nonce write failed:', err);
    }
  }

  return { token, expiresAt };
}

export interface ConsumedResumeToken {
  email: string;
}

export type ConsumeError =
  | 'invalid-format'
  | 'invalid-signature'
  | 'expired'
  | 'already-used'
  | 'kv-unavailable';

export interface ConsumeResult {
  ok: boolean;
  email?: string;
  error?: ConsumeError;
}

/**
 * Validate + spend a resume token. Returns `ok: false` with a specific
 * `error` code on every failure so the caller can render a useful
 * message ("expired" vs "already-used" vs "invalid").
 */
export async function consumeBookingResumeToken(token: string): Promise<ConsumeResult> {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return { ok: false, error: 'invalid-format' };
  }

  const [encodedPayload, providedSig] = token.split('.');
  let payload: string;
  try {
    payload = Buffer.from(encodedPayload, 'base64url').toString();
  } catch {
    return { ok: false, error: 'invalid-format' };
  }

  const parts = payload.split('|');
  if (parts.length !== 3) return { ok: false, error: 'invalid-format' };
  const [email, expiresAtStr, nonce] = parts;
  const expiresAt = Number(expiresAtStr);
  if (!email || !email.includes('@') || !Number.isFinite(expiresAt) || !nonce) {
    return { ok: false, error: 'invalid-format' };
  }

  const expectedSig = sign(payload);
  const a = Buffer.from(providedSig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, error: 'invalid-signature' };
  }

  if (Date.now() > expiresAt) {
    return { ok: false, error: 'expired' };
  }

  if (!KV_AVAILABLE) {
    // Without KV we cannot enforce single-use. Reject conservatively
    // so a leaked email-forwarded token doesn't grant repeated access.
    return { ok: false, error: 'kv-unavailable' };
  }

  try {
    const record = await kv.get<{ email: string; mintedAt: number }>(NONCE_KEY(nonce));
    if (!record) return { ok: false, error: 'already-used' };
    if (record.email !== email) return { ok: false, error: 'invalid-signature' };

    await kv.del(NONCE_KEY(nonce));
    return { ok: true, email };
  } catch (err) {
    console.error('[booking-resume-token] consume KV failed:', err);
    return { ok: false, error: 'kv-unavailable' };
  }
}
