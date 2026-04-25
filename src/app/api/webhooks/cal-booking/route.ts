/* ================================================================
   POST /api/webhooks/cal-booking
   ================================================================
   Receives Cal.com webhooks for BOOKING_CREATED and BOOKING_CANCELLED
   events. On BOOKING_CREATED, auto-creates/updates the customer record
   and generates a DRAFT invoice (not sent). Dr. Hala sees the draft
   in her History tab and can review + send it when ready.

   Auth:
   - Cal.com sends an HMAC-SHA256 signature in the X-Cal-Signature
     header, derived from the raw request body + CAL_WEBHOOK_SECRET.
   - If CAL_WEBHOOK_SECRET is not configured, we log a warning and
     accept the request (dev mode).

   Dedupe:
   - Each booking has a unique ID. We dedupe via KV key
     `webhooks:cal:seen:{bookingId}` with a 30-day TTL.

   Cal.com webhook shape (simplified):
   {
     triggerEvent: "BOOKING_CREATED" | "BOOKING_CANCELLED" | ...,
     payload: {
       uid: string,
       eventTypeId: number,
       type: string,        // event type slug (e.g. "parenting-coaching")
       title: string,
       startTime: string,
       endTime: string,
       attendees: [{ name, email, timeZone, phoneNumber? }],
       organizer: { name, email, timeZone },
       location?: string,
       description?: string,
       responses?: { [key]: { value, label } }
     }
   }
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { kv } from '@vercel/kv';
import {
  processBookingIntake,
  type BookingIntakeInput,
} from '@/lib/invoicing/booking-intake';
import { listDrafts, deleteDraft } from '@/lib/invoicing/kv-store';
import { dispatchToAllAdmins } from '@/lib/push/dispatch';

export const maxDuration = 30;

const CAL_WEBHOOK_SECRET = process.env.CAL_WEBHOOK_SECRET;

const KV_AVAILABLE = !!(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

const DEDUPE_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days

interface CalAttendee {
  name?: string;
  email?: string;
  timeZone?: string;
  phoneNumber?: string;
  locale?: string;
}

interface CalPayload {
  uid?: string;
  eventTypeId?: number;
  type?: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  attendees?: CalAttendee[];
  organizer?: {
    name?: string;
    email?: string;
    timeZone?: string;
  };
  description?: string;
  responses?: Record<string, { value?: string | number; label?: string }>;
}

interface CalWebhookBody {
  triggerEvent?: string;
  payload?: CalPayload;
}

/**
 * Verify the Cal.com HMAC-SHA256 signature header.
 * Returns true if valid (or skipped because no secret is set).
 */
function verifySignature(rawBody: string, signature: string | null): boolean {
  if (!CAL_WEBHOOK_SECRET) {
    // SECURITY: in production we refuse to skip signature verification so an
    // attacker can't forge bookings. In dev we still permit it (unsigned) so
    // local testing without a secret works.
    if (process.env.NODE_ENV === 'production') {
      console.error('[cal-booking webhook] CAL_WEBHOOK_SECRET not configured in production — refusing');
      return false;
    }
    console.warn(
      '[cal-booking webhook] CAL_WEBHOOK_SECRET is not set — signature check skipped (dev only).',
    );
    return true;
  }
  if (!signature) return false;
  try {
    const computed = crypto
      .createHmac('sha256', CAL_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');
    const sigBuf = Buffer.from(signature, 'hex');
    const compBuf = Buffer.from(computed, 'hex');
    if (sigBuf.length !== compBuf.length) return false;
    return crypto.timingSafeEqual(sigBuf, compBuf);
  } catch {
    return false;
  }
}

async function isDuplicateBooking(bookingId: string): Promise<boolean> {
  if (!KV_AVAILABLE) return false;
  try {
    const key = `webhooks:cal:seen:${bookingId}`;
    const seen = await kv.get(key);
    if (seen) return true;
    await kv.set(key, 1, { ex: DEDUPE_TTL_SECONDS });
    return false;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Read raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-cal-signature-256');

    if (!verifySignature(rawBody, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 },
      );
    }

    let body: CalWebhookBody;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const triggerEvent = body.triggerEvent;
    const payload = body.payload;

    if (!payload || !payload.uid) {
      return NextResponse.json(
        { error: 'Missing payload or booking ID' },
        { status: 400 },
      );
    }

    // Dedupe
    if (await isDuplicateBooking(payload.uid)) {
      return NextResponse.json({
        ok: true,
        duplicate: true,
        bookingId: payload.uid,
      });
    }

    // ─── BOOKING_CREATED ──────────────────────────────────
    if (triggerEvent === 'BOOKING_CREATED') {
      const attendee = payload.attendees?.[0];
      if (!attendee) {
        return NextResponse.json(
          { error: 'No attendee in payload' },
          { status: 400 },
        );
      }

      const input: BookingIntakeInput = {
        source: 'cal-com',
        bookingId: payload.uid,
        clientName: attendee.name || 'New Client',
        clientEmail: attendee.email || null,
        clientPhone: attendee.phoneNumber,
        clientTimezone: attendee.timeZone,
        eventTypeSlug: payload.type || '',
        startTime: payload.startTime || new Date().toISOString(),
        endTime: payload.endTime,
        customerNotes: payload.description,
      };

      const result = await processBookingIntake(input);

      // Fire-and-forget push notification to all subscribed admin devices.
      // Never blocks the webhook — Cal.com retries on 5xx so we must not
      // 500 just because push delivery hiccupped.
      dispatchToAllAdmins({
        title: 'New booking request',
        body: `${attendee.name || 'A client'} — ${payload.type ?? 'session'}`,
        url: `/bookings/${input.bookingId}`,
        tag: `booking-${input.bookingId}`,
        data: { kind: 'booking-created', bookingId: input.bookingId },
      }).catch((err: unknown) => console.error('[Cal Webhook] push dispatch failed:', err));

      return NextResponse.json({
        ok: true,
        action: 'created',
        ...result,
      });
    }

    // ─── BOOKING_CANCELLED ────────────────────────────────
    if (
      triggerEvent === 'BOOKING_CANCELLED' ||
      triggerEvent === 'BOOKING_REJECTED'
    ) {
      // Find any draft whose adminNote references this booking ID
      const drafts = await listDrafts();
      const matching = drafts.find((d) =>
        (d.adminNote || '').includes(`Booking ID: ${payload.uid}`),
      );

      if (matching) {
        await deleteDraft(matching.draftId);
        return NextResponse.json({
          ok: true,
          action: 'cancelled',
          deletedDraftId: matching.draftId,
        });
      }

      return NextResponse.json({
        ok: true,
        action: 'cancelled',
        note: 'No matching draft found',
      });
    }

    // Other events are acknowledged but not processed
    return NextResponse.json({
      ok: true,
      ignored: true,
      triggerEvent,
    });
  } catch (err) {
    console.error('Cal.com webhook error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
