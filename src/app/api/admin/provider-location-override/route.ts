/* ================================================================
   /api/admin/provider-location-override — Manual override CRUD
   ================================================================
   GET    → return the current override (null if none)
   POST   → set/replace the override
   DELETE → clear the override

   Override is Dr. Hala's "I'm actually in Dubai right now, ignore
   the travel schedule" escape hatch, pinned to the admin header.
   Takes precedence over the travel schedule in provider-location.ts
   when `active: true` and (no `expiresAt` OR expiresAt > now).
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import {
  getLocationOverride,
  saveLocationOverride,
  clearLocationOverride,
  isValidTimezone,
  type ProviderLocationOverride,
} from '@/lib/booking/provider-location';

export const maxDuration = 10;

// ─── GET ────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const override = await getLocationOverride();
    return NextResponse.json({ ok: true, override });
  } catch (err) {
    console.error('[provider-location-override GET] error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// ─── POST ───────────────────────────────────────────────────────

interface PostBody {
  timezone: string;
  locationLabel: string;
  expiresAt?: string; // ISO 8601, optional
}

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as PostBody;

    if (!body.timezone || !isValidTimezone(body.timezone)) {
      return NextResponse.json(
        { error: `Invalid IANA timezone: ${body.timezone}` },
        { status: 400 },
      );
    }
    if (!body.locationLabel || !body.locationLabel.trim()) {
      return NextResponse.json(
        { error: 'locationLabel is required' },
        { status: 400 },
      );
    }

    // Validate expiresAt if present
    if (body.expiresAt) {
      const t = Date.parse(body.expiresAt);
      if (Number.isNaN(t)) {
        return NextResponse.json(
          { error: `Invalid expiresAt: ${body.expiresAt}` },
          { status: 400 },
        );
      }
      if (t < Date.now()) {
        return NextResponse.json(
          { error: 'expiresAt must be in the future' },
          { status: 400 },
        );
      }
    }

    const override: ProviderLocationOverride = {
      active: true,
      timezone: body.timezone,
      locationLabel: body.locationLabel.trim(),
      setAt: new Date().toISOString(),
      ...(body.expiresAt ? { expiresAt: body.expiresAt } : {}),
    };

    await saveLocationOverride(override);
    return NextResponse.json({ ok: true, override });
  } catch (err) {
    console.error('[provider-location-override POST] error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─── DELETE ─────────────────────────────────────────────────────

export async function DELETE(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await clearLocationOverride();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[provider-location-override DELETE] error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
