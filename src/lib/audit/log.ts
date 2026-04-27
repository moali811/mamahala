/* ================================================================
   Audit Log — Append-only KV-backed history
   ================================================================
   KV layout:
     audit:booking:{bookingId}     LPUSH list, capped at 50
     audit:customer:{email}        LPUSH list, capped at 50
     audit:global:{YYYY-MM}        LPUSH monthly rollup, capped at 500

   Reads return entries newest-first. Writes are best-effort — the audit
   log is a secondary signal, not a transactional dependency. A KV outage
   should never block a cancel/reschedule from succeeding.
   ================================================================ */

import { createHash, randomUUID } from 'node:crypto';
import type { AuditEntry, AuditAction, AuditActor } from './types';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

/** Cap each list to 50 entries to avoid unbounded growth. */
const ENTITY_LIST_CAP = 50;
/** Monthly rollup cap — broader history retained globally. */
const GLOBAL_LIST_CAP = 500;

function bookingKey(bookingId: string): string {
  return `audit:booking:${bookingId}`;
}
function customerKey(email: string): string {
  return `audit:customer:${email.toLowerCase()}`;
}
function globalKey(at: Date): string {
  const yyyy = at.getUTCFullYear();
  const mm = String(at.getUTCMonth() + 1).padStart(2, '0');
  return `audit:global:${yyyy}-${mm}`;
}

/** SHA-256 hash of an IP address for privacy-friendly retention. */
export function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

function newEntryId(at: Date): string {
  // Sortable: timestamp prefix + random suffix.
  return `${at.getTime().toString(36)}_${randomUUID().slice(0, 8)}`;
}

export interface AppendAuditInput {
  actor: AuditActor;
  actorId?: string;
  ip?: string;
  action: AuditAction;
  entityId: string;
  /**
   * Optional secondary entity to also log under (e.g., customer email
   * when the primary entity is a bookingId). Lets a single action
   * surface in both timelines without duplicating writes downstream.
   */
  customerEmail?: string;
  details?: Record<string, unknown>;
  reason?: string;
}

/**
 * Append an audit entry. Always best-effort — failures are logged and
 * swallowed. Returns the entry that was attempted (useful for tests).
 */
export async function appendAudit(input: AppendAuditInput): Promise<AuditEntry> {
  const at = new Date();
  const entry: AuditEntry = {
    id: newEntryId(at),
    at: at.toISOString(),
    actor: input.actor,
    actorId: input.actorId,
    ipHash: input.ip ? hashIp(input.ip) : undefined,
    action: input.action,
    entityId: input.entityId,
    details: input.details,
    reason: input.reason,
  };

  if (!KV_AVAILABLE) return entry;

  try {
    const { kv } = await import('@vercel/kv');

    const writes: Promise<unknown>[] = [];

    // Per-entity log (booking timeline)
    const bKey = input.action.startsWith('booking.')
      ? bookingKey(input.entityId)
      : null;
    if (bKey) {
      writes.push(kv.lpush(bKey, entry).then(() => kv.ltrim(bKey, 0, ENTITY_LIST_CAP - 1)));
    }

    // Per-customer log (lifetime client history)
    if (input.customerEmail) {
      const cKey = customerKey(input.customerEmail);
      writes.push(kv.lpush(cKey, entry).then(() => kv.ltrim(cKey, 0, ENTITY_LIST_CAP - 1)));
    } else if (input.action.startsWith('customer.')) {
      const cKey = customerKey(input.entityId);
      writes.push(kv.lpush(cKey, entry).then(() => kv.ltrim(cKey, 0, ENTITY_LIST_CAP - 1)));
    }

    // Monthly rollup (global view)
    const gKey = globalKey(at);
    writes.push(kv.lpush(gKey, entry).then(() => kv.ltrim(gKey, 0, GLOBAL_LIST_CAP - 1)));

    await Promise.all(writes);
  } catch (err) {
    console.error('[Audit] write failed:', err);
  }

  return entry;
}

export async function listBookingAudit(bookingId: string): Promise<AuditEntry[]> {
  if (!KV_AVAILABLE) return [];
  try {
    const { kv } = await import('@vercel/kv');
    return ((await kv.lrange(bookingKey(bookingId), 0, -1)) as AuditEntry[]) || [];
  } catch (err) {
    console.error('[Audit] list booking failed:', err);
    return [];
  }
}

export async function listCustomerAudit(email: string): Promise<AuditEntry[]> {
  if (!KV_AVAILABLE) return [];
  try {
    const { kv } = await import('@vercel/kv');
    return ((await kv.lrange(customerKey(email), 0, -1)) as AuditEntry[]) || [];
  } catch (err) {
    console.error('[Audit] list customer failed:', err);
    return [];
  }
}
