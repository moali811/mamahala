/* ================================================================
   Admin action token — CSRF protection for one-click email links
   ================================================================
   Dr. Hala's booking-notification emails include "Approve" and
   "Decline" links that navigate a browser GET to
   /api/admin/booking/approve?id=<id>&token=<t> (and /decline).

   Without a token, an attacker who knows or guesses a pending booking
   id could trick Dr. Hala into clicking a crafted link and approve a
   session without her review. The status check ("already approved")
   is a partial mitigation but doesn't cover the first approval.

   The token is derived deterministically via HMAC(ADMIN_PASSWORD,
   `<bookingId>:<action>`) so:
     - no schema migration is needed (works for existing bookings)
     - the server is stateless (no KV write/read per click)
     - only someone with ADMIN_PASSWORD (server) can generate a valid
       token, so an attacker cannot forge one

   If ADMIN_PASSWORD leaks, an attacker already has full admin access
   anyway; this token does not weaken the overall security posture.
   ================================================================ */

import { createHmac, timingSafeEqual } from 'node:crypto';

export type AdminAction = 'approve' | 'decline';

function secret(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) {
    throw new Error('ADMIN_PASSWORD is not configured');
  }
  return pw;
}

export function computeAdminActionToken(bookingId: string, action: AdminAction): string {
  return createHmac('sha256', secret())
    .update(`${bookingId}:${action}`)
    .digest('hex')
    .slice(0, 24);
}

export function verifyAdminActionToken(
  bookingId: string,
  action: AdminAction,
  provided: string | null | undefined,
): boolean {
  if (!provided) return false;
  const expected = computeAdminActionToken(bookingId, action);
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
