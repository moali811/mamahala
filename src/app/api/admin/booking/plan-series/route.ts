/* ================================================================
   POST /api/admin/booking/plan-series — Recurring series planner
   ================================================================
   Given a first-session start time + frequency + count, returns a
   per-slot availability check so the admin UI can render a
   checklist ("session 3 conflicts with an existing booking —
   here are 3 alternatives").

   Read-only. No bookings are created and no state is mutated.
   Admin reviews the result, adjusts slots if needed, and then
   posts the final list to /api/admin/booking/create-draft.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { services } from '@/data/services';
import { PRICING_TIERS, type PricingTierKey } from '@/config/pricing';
import { planSeries } from '@/lib/booking/series-planner';
import type { RecurrenceFrequency } from '@/lib/booking/types';

export const maxDuration = 30;

interface PlanSeriesRequest {
  serviceSlug: string;
  /** ISO UTC — first session start. */
  startTime: string;
  frequency: RecurrenceFrequency;
  count: number;
  /** Optional override for duration; defaults to the tier's durationMinutes. */
  durationMinutes?: number;
}

const ALLOWED_FREQUENCIES: RecurrenceFrequency[] = ['weekly', 'biweekly', 'every3weeks'];

export async function POST(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const body = (await request.json()) as PlanSeriesRequest;

    if (!body.serviceSlug || !body.startTime || !body.frequency || !body.count) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceSlug, startTime, frequency, count' },
        { status: 400 },
      );
    }

    if (body.count < 1 || body.count > 12) {
      return NextResponse.json(
        { error: 'Count must be between 1 and 12' },
        { status: 400 },
      );
    }

    if (!ALLOWED_FREQUENCIES.includes(body.frequency)) {
      return NextResponse.json(
        { error: `Frequency must be one of: ${ALLOWED_FREQUENCIES.join(', ')}` },
        { status: 400 },
      );
    }

    const service = services.find(s => s.slug === body.serviceSlug);
    if (!service) {
      return NextResponse.json(
        { error: `Unknown service: ${body.serviceSlug}` },
        { status: 400 },
      );
    }

    const tier = PRICING_TIERS[service.pricingTierKey as PricingTierKey];
    const durationMinutes = body.durationMinutes ?? tier?.durationMinutes ?? 50;

    const slots = await planSeries({
      startTime: body.startTime,
      frequency: body.frequency,
      count: body.count,
      durationMinutes,
    });

    return NextResponse.json({
      slots,
      durationMinutes,
      frequency: body.frequency,
      count: body.count,
    });
  } catch (err) {
    console.error('[plan-series] error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
