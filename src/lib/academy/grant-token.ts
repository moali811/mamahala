/* ================================================================
   Academy Grant Token
   ================================================================
   HMAC-signed token used by admin-initiated academy grants. Embedded
   in the grant email's "Open Program" link. When the recipient
   clicks, the unlock-success bridge page calls /api/academy/verify-grant
   to verify the token, then writes `localStorage.academy_email = X`
   on the recipient's device so the program page's identity-based
   unlock check (/api/academy/access?email=X&programSlug=Y) succeeds
   with one click.

   Multi-use by design: a recipient may open the same email on phone
   and laptop and expect it to work both times. Tampering protection
   comes from the HMAC signature — anyone changing the email payload
   to claim someone else's content fails verification.

   Format:
     base64url(`${normalizedEmail}|${expiresAt}`) + '.' + base64url(sig)

   Trust model is intentionally identical to the booking-resume token
   in src/lib/booking/booking-resume-token.ts, sans the KV-backed
   single-use nonce.
   ================================================================ */

import { createHmac } from 'node:crypto';

export const GRANT_TOKEN_TTL_SECONDS = 365 * 24 * 60 * 60; // 1 year — grants are permanent unlocks

function secret(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error('ADMIN_PASSWORD is not configured');
  return pw;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url').slice(0, 32);
}

export interface SignedGrantToken {
  token: string;
  expiresAt: number;
}

/**
 * Mint a multi-use HMAC-signed grant token bound to an email.
 * The token expires after 1 year (admin grants are effectively
 * permanent — a fresh grant simply re-mints).
 */
export function signGrantToken(email: string): SignedGrantToken {
  const normalized = email.toLowerCase().trim();
  if (!normalized.includes('@')) throw new Error('Invalid email for grant token');

  const expiresAt = Date.now() + GRANT_TOKEN_TTL_SECONDS * 1000;
  const payload = `${normalized}|${expiresAt}`;
  const sig = sign(payload);
  const token = `${Buffer.from(payload).toString('base64url')}.${sig}`;
  return { token, expiresAt };
}

export type VerifyError =
  | 'invalid-format'
  | 'invalid-signature'
  | 'expired';

export interface VerifyResult {
  ok: boolean;
  email?: string;
  error?: VerifyError;
}

/**
 * Verify a grant token's signature + expiry. Returns the embedded
 * email on success.
 */
export function verifyGrantToken(token: string): VerifyResult {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return { ok: false, error: 'invalid-format' };
  }
  const [encodedPayload, providedSig] = token.split('.');
  if (!encodedPayload || !providedSig) {
    return { ok: false, error: 'invalid-format' };
  }

  let payload: string;
  try {
    payload = Buffer.from(encodedPayload, 'base64url').toString();
  } catch {
    return { ok: false, error: 'invalid-format' };
  }

  const parts = payload.split('|');
  if (parts.length !== 2) return { ok: false, error: 'invalid-format' };
  const [email, expiresAtStr] = parts;
  const expiresAt = Number(expiresAtStr);
  if (!email || !email.includes('@') || !Number.isFinite(expiresAt)) {
    return { ok: false, error: 'invalid-format' };
  }

  const expectedSig = sign(payload);
  if (providedSig.length !== expectedSig.length) {
    return { ok: false, error: 'invalid-signature' };
  }
  // Constant-time compare to prevent timing leaks of the signature.
  let mismatch = 0;
  for (let i = 0; i < providedSig.length; i += 1) {
    mismatch |= providedSig.charCodeAt(i) ^ expectedSig.charCodeAt(i);
  }
  if (mismatch !== 0) return { ok: false, error: 'invalid-signature' };

  if (Date.now() > expiresAt) return { ok: false, error: 'expired' };

  return { ok: true, email };
}
