/* ================================================================
   POST /api/admin/booking/approve-and-convert
   ================================================================
   Approves a pending booking AND immediately promotes it into a
   recurring series. Used by the admin queue's "Approve & make
   recurring" action — saves Dr. Hala from approving and then
   re-creating the same booking N times via the +New Booking modal.

   Body: { bookingId, frequency, invoiceMode, totalSessions, slots?,
           existingInvoicePolicy?, reason }
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { processApproval } from '@/lib/booking/approval-flow';
import {
  convertBookingToSeries,
  type ExistingInvoicePolicy,
} from '@/lib/booking/series-converter';
import type { RecurrenceFrequency } from '@/lib/booking/types';

export const maxDuration = 60;

const ALLOWED_FREQUENCIES: RecurrenceFrequency[] = ['weekly', 'biweekly', 'every3weeks'];

interface ApproveAndConvertRequest {
  bookingId: string;
  frequency: RecurrenceFrequency;
  invoiceMode: 'per-session' | 'bundled';
  totalSessions: number;
  slots?: Array<{ startTime: string; endTime: string }>;
  existingInvoicePolicy?: ExistingInvoicePolicy;
  reason: string;
}

export async function POST(request: NextRequest) {
  const auth = await authorizeWithLimit(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let body: ApproveAndConvertRequest;
  try {
    body = (await request.json()) as ApproveAndConvertRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.bookingId) {
    return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
  }
  if (!ALLOWED_FREQUENCIES.includes(body.frequency)) {
    return NextResponse.json(
      { error: `Frequency must be one of: ${ALLOWED_FREQUENCIES.join(', ')}` },
      { status: 400 },
    );
  }
  if (body.invoiceMode !== 'per-session' && body.invoiceMode !== 'bundled') {
    return NextResponse.json(
      { error: 'invoiceMode must be "per-session" or "bundled"' },
      { status: 400 },
    );
  }
  if (
    typeof body.totalSessions !== 'number'
    || body.totalSessions < 2
    || body.totalSessions > 12
  ) {
    return NextResponse.json(
      { error: 'totalSessions must be between 2 and 12' },
      { status: 400 },
    );
  }
  if (!body.reason || body.reason.trim().length === 0) {
    return NextResponse.json(
      { error: 'reason is required for the audit trail' },
      { status: 400 },
    );
  }
  if (body.slots && body.slots.length !== body.totalSessions - 1) {
    return NextResponse.json(
      {
        error:
          `slots length must be totalSessions - 1 (got ${body.slots.length}, expected ${body.totalSessions - 1})`,
      },
      { status: 400 },
    );
  }

  // Step 1: standard approval (status flip + GCal + client email).
  const approval = await processApproval(body.bookingId);
  if (approval.error) {
    return NextResponse.json({ error: approval.error }, { status: 400 });
  }

  // Step 2: convert to series.
  try {
    const conversion = await convertBookingToSeries({
      anchorBookingId: body.bookingId,
      frequency: body.frequency,
      invoiceMode: body.invoiceMode,
      totalSessions: body.totalSessions,
      siblingSlots: body.slots,
      existingInvoicePolicy: body.existingInvoicePolicy,
      reason: body.reason,
    });

    return NextResponse.json({
      ok: true,
      anchorBookingId: conversion.anchorBookingId,
      seriesId: conversion.seriesId,
      siblingBookingIds: conversion.siblingBookingIds,
      primaryDraftId: conversion.primaryDraftId,
      invoiceAction: conversion.invoiceAction,
      meetLink: approval.meetLink,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Conversion failed';
    console.error('[approve-and-convert] conversion failed:', err);
    // Approval already happened — surface a 422 so the UI can prompt
    // the admin to retry conversion separately without re-approving.
    return NextResponse.json(
      {
        error: message,
        approved: true,
        anchorBookingId: body.bookingId,
      },
      { status: 422 },
    );
  }
}
