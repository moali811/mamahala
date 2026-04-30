/* ================================================================
   WhatsApp Consent — opt-in / opt-out / lookup helpers
   ================================================================
   Consent is stored on the Customer record (email-keyed) since it's
   a per-person decision, not a per-booking one. Two flags work in
   tandem:
     consentWhatsapp.acceptedAt  → opt-in record (with audit fields)
     whatsappOptOut === true      → hard global override (set by STOP)

   Send rule: ALL of these must be true for any outbound WhatsApp:
     1. customer.consentWhatsapp?.acceptedAt is set
     2. customer.whatsappOptOut !== true
     3. Phone is present (E.164)

   The webhook flips opt-out without touching opt-in, so re-enabling
   requires the client to explicitly opt in again at next booking.
   ================================================================ */

import { kv } from '@vercel/kv';
import { getCustomer, listCustomers } from '@/lib/invoicing/customer-store';
import type { Customer } from '@/lib/invoicing/types';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

const KEY_CUSTOMER = (email: string) => `customer:${email.toLowerCase()}`;
const KEY_PHONE_INDEX = (e164: string) => `whatsapp:phone:${normalizeE164(e164)}`;

function normalizeE164(raw: string): string {
  return raw.replace(/[^\d]/g, '');
}

export interface WhatsappConsentInput {
  email: string;
  /** Phone in E.164 (used to maintain the reverse-lookup index). */
  phone?: string;
  ipHash?: string;
  policyVersion?: string;
}

/**
 * Stamp opt-in on the Customer record. No-op if KV isn't configured.
 * Always full read-modify-write so we don't clobber other fields
 * (kv.set replaces the entire object).
 */
export async function recordWhatsappOptIn(input: WhatsappConsentInput): Promise<void> {
  if (!KV_AVAILABLE) return;
  const email = input.email.toLowerCase().trim();
  if (!email.includes('@')) return;

  try {
    const existing = (await kv.get<Customer>(KEY_CUSTOMER(email))) ?? null;
    if (!existing) return; // Caller is responsible for upserting the base customer first
    const updated: Customer = {
      ...existing,
      consentWhatsapp: {
        acceptedAt: new Date().toISOString(),
        ipHash: input.ipHash ?? '',
        policyVersion: input.policyVersion,
      },
      // Re-enabling: clear any prior STOP flag.
      whatsappOptOut: false,
      updatedAt: new Date().toISOString(),
    };
    await kv.set(KEY_CUSTOMER(email), updated);
    if (input.phone) await indexPhone(input.phone, email);
  } catch (err) {
    console.error('[wa consent] opt-in write failed:', err);
  }
}

/**
 * Hard opt-out (set by inbound STOP keyword webhook). Flags the
 * customer record so all future template sends are skipped, even
 * if a stale booking flag says they opted in.
 */
export async function recordWhatsappOptOut(email: string): Promise<void> {
  if (!KV_AVAILABLE) return;
  const e = email.toLowerCase().trim();
  if (!e.includes('@')) return;
  try {
    const existing = (await kv.get<Customer>(KEY_CUSTOMER(e))) ?? null;
    if (!existing) return;
    const updated: Customer = {
      ...existing,
      whatsappOptOut: true,
      whatsappOptOutAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await kv.set(KEY_CUSTOMER(e), updated);
  } catch (err) {
    console.error('[wa consent] opt-out write failed:', err);
  }
}

/**
 * Maintain the reverse index `phone:{e164} → email`. Called from
 * `recordWhatsappOptIn` and from the booking confirm route when
 * the customer record is upserted. Idempotent.
 */
export async function indexPhone(phone: string, email: string): Promise<void> {
  if (!KV_AVAILABLE) return;
  const e164 = normalizeE164(phone);
  if (!e164) return;
  try {
    await kv.set(KEY_PHONE_INDEX(e164), email.toLowerCase());
  } catch (err) {
    console.error('[wa consent] phone index write failed:', err);
  }
}

/**
 * Reverse lookup: given an inbound WhatsApp phone number, find
 * the customer email. Tries the phone index first; falls back to
 * a full customer scan (acceptable at <1000 customers).
 */
export async function findCustomerByPhone(phone: string): Promise<Customer | null> {
  if (!KV_AVAILABLE) return null;
  const e164 = normalizeE164(phone);
  if (!e164) return null;

  try {
    const indexed = (await kv.get<string>(KEY_PHONE_INDEX(e164))) ?? null;
    if (indexed) {
      const c = await getCustomer(indexed);
      if (c) return c;
    }
  } catch (err) {
    console.warn('[wa consent] phone index read failed, falling back to scan:', err);
  }

  // Fallback scan: O(N) but bounded by customer cap.
  try {
    const all = await listCustomers(1000);
    for (const c of all) {
      const candidates = [c.phone, c.mobilePhone].filter((p): p is string => !!p);
      for (const p of candidates) {
        if (normalizeE164(p) === e164) {
          await indexPhone(e164, c.email).catch(() => {});
          return c;
        }
      }
    }
  } catch (err) {
    console.error('[wa consent] customer scan failed:', err);
  }
  return null;
}

/**
 * The single rule for "is this customer reachable on WhatsApp right now?".
 * Used at every outbound send site. False if any of the conditions fail.
 */
export interface ReachabilityCheck {
  reachable: boolean;
  reason?: 'no-customer' | 'no-opt-in' | 'opted-out' | 'no-phone';
  phone?: string;
}

export async function isWhatsappReachable(email: string): Promise<ReachabilityCheck> {
  const customer = await getCustomer(email);
  if (!customer) return { reachable: false, reason: 'no-customer' };
  if (customer.whatsappOptOut) return { reachable: false, reason: 'opted-out' };
  if (!customer.consentWhatsapp?.acceptedAt) return { reachable: false, reason: 'no-opt-in' };
  const phone = customer.phone || customer.mobilePhone;
  if (!phone) return { reachable: false, reason: 'no-phone' };
  return { reachable: true, phone };
}

/* STOP-keyword detection in EN/AR/FR (Mama Hala's locales). */
const STOP_RE = /^\s*(STOP|UNSUBSCRIBE|CANCEL|END|QUIT|ARRÊT|ARRETER|إيقاف|إلغاء)\s*$/iu;

export function isStopKeyword(text: string | undefined | null): boolean {
  if (!text) return false;
  return STOP_RE.test(text);
}
