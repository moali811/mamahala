/* ================================================================
   POST /api/admin/booking/create-draft — Inline Step 1 hold
   ================================================================
   Creates a single booking or a recurring series in status
   'pending-review'. Runs booking intake to create the invoice
   draft. DOES NOT create GCal events, send confirmation emails,
   or notify admins.

   The admin reviews the draft inline in Step 2 of the new-booking
   modal. From there they either:
     - POST /api/admin/booking/[id]/confirm-and-send  (fires all the side effects)
     - POST /api/admin/booking/[id]/save-for-later    (extends the hold only)

   Why split this out from /api/admin/booking/create? So the email
   + GCal side effects can be deferred until after invoice review.
   The existing /create route is kept for backwards compatibility
   but the NewBookingModal stops calling it.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import {
  createBookingHold,
  createSeriesHold,
  type CreateSeriesHoldInput,
} from '@/lib/booking/admin-booking-flow';
import type { SessionMode, RecurrenceFrequency } from '@/lib/booking/types';

export const maxDuration = 30;

interface CreateDraftRequest {
  serviceSlug: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientTimezone: string;
  clientCountry?: string;
  preferredLanguage?: 'en' | 'ar';
  sessionMode?: SessionMode;
  notes?: string;

  // Single-booking fields (required when `series` is absent)
  startTime?: string;  // ISO UTC
  endTime?: string;    // ISO UTC

  // Recurring series fields (required when creating a series)
  series?: {
    frequency: RecurrenceFrequency;
    invoiceMode: 'per-session' | 'bundled';
    /**
     * Pre-resolved slot list from the planner. Each entry is a
     * concrete start/end time the admin has accepted (including any
     * alternatives they picked after a conflict).
     */
    slots: Array<{ startTime: string; endTime: string }>;
  };
}

interface CreateDraftBookingInfo {
  bookingId: string;
  draftId: string | null;
  seriesIndex?: number;
}

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as CreateDraftRequest;

    // ─── Validate shared fields ──────────────────────────────
    if (
      !body.serviceSlug
      || !body.clientName
      || !body.clientEmail
      || !body.clientTimezone
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceSlug, clientName, clientEmail, clientTimezone' },
        { status: 400 },
      );
    }
    if (!body.clientEmail.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // ─── Series path ─────────────────────────────────────────
    if (body.series) {
      if (!body.series.slots || body.series.slots.length === 0) {
        return NextResponse.json(
          { error: 'Series must include at least one slot' },
          { status: 400 },
        );
      }
      if (body.series.slots.length > 12) {
        return NextResponse.json(
          { error: 'Series cannot exceed 12 sessions' },
          { status: 400 },
        );
      }

      const seriesInput: CreateSeriesHoldInput = {
        serviceSlug: body.serviceSlug,
        clientName: body.clientName,
        clientEmail: body.clientEmail,
        clientPhone: body.clientPhone,
        clientTimezone: body.clientTimezone,
        clientCountry: body.clientCountry,
        preferredLanguage: body.preferredLanguage,
        sessionMode: body.sessionMode,
        notes: body.notes,
        slots: body.series.slots,
        frequency: body.series.frequency,
        invoiceMode: body.series.invoiceMode,
      };

      const seriesResult = await createSeriesHold(seriesInput);

      const bookings: CreateDraftBookingInfo[] = seriesResult.bookings.map(b => ({
        bookingId: b.bookingId,
        draftId: b.draftId || null,
        seriesIndex: b.seriesIndex,
      }));

      return NextResponse.json({
        ok: true,
        kind: 'series',
        seriesId: seriesResult.seriesId,
        bookings,
        primaryBookingId: seriesResult.primaryBookingId,
        primaryDraftId: seriesResult.primaryDraftId || null,
      }, { status: 201 });
    }

    // ─── Single-booking path ─────────────────────────────────
    if (!body.startTime || !body.endTime) {
      return NextResponse.json(
        { error: 'Single bookings require startTime and endTime' },
        { status: 400 },
      );
    }

    const result = await createBookingHold({
      serviceSlug: body.serviceSlug,
      startTime: body.startTime,
      endTime: body.endTime,
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      clientPhone: body.clientPhone,
      clientTimezone: body.clientTimezone,
      clientCountry: body.clientCountry,
      preferredLanguage: body.preferredLanguage,
      sessionMode: body.sessionMode,
      notes: body.notes,
    });

    const bookings: CreateDraftBookingInfo[] = [
      {
        bookingId: result.bookingId,
        draftId: result.draftId || null,
      },
    ];

    return NextResponse.json({
      ok: true,
      kind: 'single',
      bookings,
      primaryBookingId: result.bookingId,
      primaryDraftId: result.draftId || null,
      isFreeSession: result.isFreeSession,
      pendingReviewExpiresAt: result.pendingReviewExpiresAt,
    }, { status: 201 });
  } catch (err) {
    console.error('[create-draft] error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
