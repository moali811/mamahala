/* ================================================================
   WhatsApp Rebook Token — single-use, 14-day TTL
   ================================================================
   Embedded in the rebook nudge URL (https://mamahala.ca/book/rebook/
   {token}). Lets the client land on a recognized one-tap rebook page
   without re-entering email or going through a magic-link round trip.

   Mirrors the `booking-resume-token` envelope (HMAC-signed payload
   + KV-backed nonce for single-use enforcement). Separate keyspace
   so rebook tokens can't be replayed against generic booking-resume.
   ================================================================ */

import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { kv } from '@vercel/kv';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

/** 14 days in seconds — matches the rebook nudge cooldown. */
export const REBOOK_TOKEN_TTL_SECONDS = 14 * 24 * 60 * 60;

const NONCE_KEY = (nonce: string) => `wa-rebook:${nonce}`;

function secret(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error('ADMIN_PASSWORD is not configured');
  return pw;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url').slice(0, 32);
}

export interface MintedRebookToken {
  token: string;
  expiresAt: number;
}

export interface RebookTokenContext {
  email: string;
  /** Service slug used at last booking — pre-fills the rebook page. */
  lastServiceSlug?: string;
  /** Average days between sessions for this client — informs slot suggestions. */
  avgGapDays?: number;
}

export async function mintRebookToken(ctx: RebookTokenContext): Promise<MintedRebookToken> {
  const normalized = ctx.email.toLowerCase().trim();
  if (!normalized.includes('@')) throw new Error('Invalid email for rebook token');

  const nonce = randomBytes(12).toString('base64url');
  const expiresAt = Date.now() + REBOOK_TOKEN_TTL_SECONDS * 1000;
  const payload = `${normalized}|${expiresAt}|${nonce}`;
  const sig = sign(payload);
  const token = `${Buffer.from(payload).toString('base64url')}.${sig}`;

  if (KV_AVAILABLE) {
    try {
      await kv.set(
        NONCE_KEY(nonce),
        {
          email: normalized,
          mintedAt: Date.now(),
          lastServiceSlug: ctx.lastServiceSlug,
          avgGapDays: ctx.avgGapDays,
        },
        { ex: REBOOK_TOKEN_TTL_SECONDS },
      );
    } catch (err) {
      console.error('[wa-rebook-token] mint nonce write failed:', err);
    }
  }

  return { token, expiresAt };
}

export type RebookConsumeError =
  | 'invalid-format'
  | 'invalid-signature'
  | 'expired'
  | 'already-used'
  | 'kv-unavailable';

export interface RebookConsumeResult {
  ok: boolean;
  email?: string;
  lastServiceSlug?: string;
  avgGapDays?: number;
  error?: RebookConsumeError;
}

/**
 * Validate the token but DO NOT spend it yet. Use this on the
 * rebook landing page so the client can change their mind without
 * burning the token. Call `spendRebookToken` only after they
 * confirm a slot.
 */
export async function previewRebookToken(token: string): Promise<RebookConsumeResult> {
  const parsed = parseAndVerify(token);
  if (!parsed.ok) return parsed;
  if (!KV_AVAILABLE) return { ok: false, error: 'kv-unavailable' };

  try {
    const record = await kv.get<{
      email: string;
      mintedAt: number;
      lastServiceSlug?: string;
      avgGapDays?: number;
    }>(NONCE_KEY(parsed.nonce!));
    if (!record) return { ok: false, error: 'already-used' };
    if (record.email !== parsed.email) return { ok: false, error: 'invalid-signature' };
    return {
      ok: true,
      email: record.email,
      lastServiceSlug: record.lastServiceSlug,
      avgGapDays: record.avgGapDays,
    };
  } catch (err) {
    console.error('[wa-rebook-token] preview KV failed:', err);
    return { ok: false, error: 'kv-unavailable' };
  }
}

/**
 * Atomically spend the token. Returns `already-used` on second call.
 * Should fire as the rebook landing page confirms a slot.
 */
export async function spendRebookToken(token: string): Promise<RebookConsumeResult> {
  const preview = await previewRebookToken(token);
  if (!preview.ok) return preview;

  // KV_AVAILABLE is implied by preview returning ok.
  const parsed = parseAndVerify(token);
  if (!parsed.ok) return parsed;

  try {
    // GETDEL is atomic on Upstash — read-and-delete in one round trip.
    const record = await kv.getdel<{
      email: string;
      lastServiceSlug?: string;
      avgGapDays?: number;
    }>(NONCE_KEY(parsed.nonce!));
    if (!record) return { ok: false, error: 'already-used' };
    return {
      ok: true,
      email: record.email,
      lastServiceSlug: record.lastServiceSlug,
      avgGapDays: record.avgGapDays,
    };
  } catch (err) {
    console.error('[wa-rebook-token] spend KV failed:', err);
    return { ok: false, error: 'kv-unavailable' };
  }
}

interface ParsedToken extends RebookConsumeResult {
  nonce?: string;
}

function parseAndVerify(token: string): ParsedToken {
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
  return { ok: true, email, nonce };
}
