/* ================================================================
   Audit Log — Shared envelope for booking + customer mutations
   ================================================================
   Append-only KV-backed log used by cancel / reschedule / fee-waiver
   / remember-me / forget-me flows. Single envelope shape so the admin
   timeline can render a uniform history across actions.
   ================================================================ */

export type AuditActor = 'system' | 'client' | 'admin' | 'webhook';

export type AuditAction =
  | 'booking.cancelled'
  | 'booking.rescheduled'
  | 'booking.fee-applied'
  | 'booking.fee-waived'
  | 'booking.refunded'
  | 'booking.mode-corrected'
  | 'booking.status-changed'
  | 'customer.recognized'
  | 'customer.consent-given'
  | 'customer.consent-revoked'
  | 'customer.forgot-me'
  | 'customer.exported';

export interface AuditEntry {
  /** ULID-style id (timestamp-prefixed). */
  id: string;
  /** ISO timestamp of the event. */
  at: string;
  actor: AuditActor;
  /** Email for clients/admins, 'system' or 'webhook' otherwise. */
  actorId?: string;
  /** Hashed IP (sha256) — never the raw IP, for privacy. */
  ipHash?: string;
  action: AuditAction;
  /** The thing this entry is about — bookingId, customer email, etc. */
  entityId: string;
  /**
   * Free-form details payload — typically a `{ before, after }` diff or
   * a small object describing the action's parameters (e.g., refund cents).
   */
  details?: Record<string, unknown>;
  /** Human-readable reason captured from the actor (e.g., override reason). */
  reason?: string;
}
