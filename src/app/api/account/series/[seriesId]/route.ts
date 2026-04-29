/* ================================================================
   GET    /api/account/series/[seriesId] — Fetch series detail
   DELETE /api/account/series/[seriesId] — Client-facing cancel
   ================================================================
   Authenticated client can cancel future sessions in their own
   recurring series. Differences from the admin route:

     - Auth via booking_session cookie, not bearer token
     - Verifies the session email matches EVERY sibling (single
       mismatch → 403, no partial mutation)
     - Only cancels FUTURE sessions (status in active set AND
       startTime > now); completed/no-show/cancelled siblings stay
     - Refund preview is returned to the GET (client confirms before
       posting DELETE), and the DELETE response includes the actual
       refund amount the cancellation policy implies
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  getBookingSession,
  getBookingsBySeriesId,
  updateBooking,
  getAvailabilityRules,
} from '@/lib/booking/booking-store';
import { deleteCalendarEvent } from '@/lib/booking/google-calendar';
import { sendBookingEmail, buildCancellationEmail } from '@/lib/booking/emails';
import { getDraft, saveDraft } from '@/lib/invoicing/kv-store';
import { appendAudit } from '@/lib/audit/log';
import type { Booking } from '@/lib/booking/types';

const ACTIVE_STATES = new Set(['approved', 'confirmed', 'pending-review']);

interface SeriesAuthCheck {
  ok: boolean;
  email?: string;
  siblings?: Booking[];
  error?: string;
  status?: number;
}

async function authorize(seriesId: string): Promise<SeriesAuthCheck> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('booking_session')?.value;
  if (!sessionId) return { ok: false, error: 'Not signed in', status: 401 };

  const session = await getBookingSession(sessionId);
  if (!session) return { ok: false, error: 'Session expired', status: 401 };

  const siblings = await getBookingsBySeriesId(seriesId);
  if (siblings.length === 0) {
    return { ok: false, error: 'Series not found', status: 404 };
  }

  // IDOR guard: every sibling must belong to the authenticated client.
  const sessionEmail = session.email.toLowerCase();
  const mismatch = siblings.some(s => s.clientEmail.toLowerCase() !== sessionEmail);
  if (mismatch) {
    return { ok: false, error: 'Series does not belong to you', status: 403 };
  }

  return { ok: true, email: sessionEmail, siblings };
}

function isFutureCancellable(b: Booking, nowMs: number): boolean {
  if (!ACTIVE_STATES.has(b.status)) return false;
  return new Date(b.startTime).getTime() > nowMs;
}

interface RefundPreview {
  cancellableCount: number;
  /** Per-session breakdown so the UI can show "session 3: free, session 4: 50% fee". */
  perSession: Array<{
    bookingId: string;
    seriesIndex: number;
    startTime: string;
    feePercent: number;
    feeReason: 'late' | 'free';
  }>;
}

async function buildRefundPreview(siblings: Booking[]): Promise<RefundPreview> {
  const rules = await getAvailabilityRules();
  const cancellationHours = rules.cancellationPolicyHours ?? 24;
  const lateFeePct = rules.cancellationLateFeePercent ?? 0.5;
  const nowMs = Date.now();

  const perSession = siblings
    .filter(s => isFutureCancellable(s, nowMs))
    .map(s => {
      const hoursUntil = (new Date(s.startTime).getTime() - nowMs) / (1000 * 60 * 60);
      const isLate = hoursUntil < cancellationHours;
      return {
        bookingId: s.bookingId,
        seriesIndex: s.series?.seriesIndex ?? 0,
        startTime: s.startTime,
        feePercent: isLate ? lateFeePct : 0,
        feeReason: (isLate ? 'late' : 'free') as 'late' | 'free',
      };
    });

  return {
    cancellableCount: perSession.length,
    perSession,
  };
}

export async function GET(
  _request: NextRequest,
  ctx: { params: Promise<{ seriesId: string }> },
) {
  const { seriesId } = await ctx.params;
  const auth = await authorize(seriesId);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const refundPreview = await buildRefundPreview(auth.siblings!);
  return NextResponse.json({
    seriesId,
    siblings: auth.siblings!.map(s => ({
      bookingId: s.bookingId,
      seriesIndex: s.series?.seriesIndex,
      startTime: s.startTime,
      endTime: s.endTime,
      status: s.status,
      paidUpfront: s.series?.paidUpfront ?? false,
    })),
    refundPreview,
  });
}

export async function DELETE(
  request: NextRequest,
  ctx: { params: Promise<{ seriesId: string }> },
) {
  const { seriesId } = await ctx.params;
  const auth = await authorize(seriesId);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = (await request.json().catch(() => ({}))) as { notifyClient?: boolean };
  const siblings = auth.siblings!;
  const nowMs = Date.now();
  const now = new Date(nowMs).toISOString();

  const cancellable = siblings.filter(s => isFutureCancellable(s, nowMs));
  if (cancellable.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'No future sessions left to cancel.' },
      { status: 409 },
    );
  }

  const refundPreview = await buildRefundPreview(siblings);

  // Cancel future siblings in parallel.
  const cancelled: string[] = [];
  await Promise.all(
    cancellable.map(async (sib) => {
      await updateBooking(sib.bookingId, {
        status: 'cancelled',
        cancelledAt: now,
        cancelReason: 'client-series-cancel',
        updatedAt: now,
      });
      cancelled.push(sib.bookingId);

      if (sib.calendarEventId) {
        try {
          await deleteCalendarEvent(sib.bookingId);
        } catch (err) {
          console.error(`[client series cancel] GCal delete failed for ${sib.bookingId}:`, err);
        }
      }
    }),
  );

  // Void the bundled draft if any (mirrors admin behaviour).
  const anchor = siblings.find(
    s => s.series?.seriesIndex === 1 && !!s.series?.bundleInvoiceDraftId,
  );
  if (anchor?.series?.bundleInvoiceDraftId) {
    try {
      const draft = await getDraft(anchor.series.bundleInvoiceDraftId);
      if (draft) {
        await saveDraft({
          ...draft,
          lineItems: [],
          adminNote: [
            draft.adminNote ?? '',
            `\n[VOIDED: client cancelled future sessions in series ${seriesId} on ${now}]`,
          ].join(''),
          updatedAt: now,
        });
      }
    } catch (draftErr) {
      console.error('[client series cancel] Draft void failed:', draftErr);
    }
  }

  let emailSent = false;
  if (body.notifyClient !== false && cancelled.length > 0) {
    try {
      const sample = siblings.find(s => s.bookingId === cancelled[0]);
      if (sample) {
        const emailData = buildCancellationEmail({ ...sample, status: 'cancelled' });
        const label = `Your recurring series — ${cancelled.length} future session${cancelled.length === 1 ? '' : 's'}`;
        await sendBookingEmail({
          to: sample.clientEmail,
          subject: `${label} cancelled`,
          html: emailData.html,
        });
        emailSent = true;
      }
    } catch (emailErr) {
      console.error('[client series cancel] Email failed:', emailErr);
    }
  }

  appendAudit({
    actor: 'client',
    action: 'booking.cancelled',
    entityId: anchor?.bookingId ?? cancelled[0],
    customerEmail: auth.email,
    details: {
      seriesId,
      cancelledCount: cancelled.length,
      cancelled,
      refundPreview,
      origin: anchor?.series?.origin,
    },
    reason: 'client-series-cancel',
  }).catch(() => { /* best-effort */ });

  return NextResponse.json({
    ok: true,
    seriesId,
    cancelledCount: cancelled.length,
    cancelled,
    refundPreview,
    emailSent,
  });
}
