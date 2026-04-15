/* ================================================================
   /api/admin/provider-travel-schedule — Travel schedule CRUD
   ================================================================
   GET    → return the full ProviderTravelSchedule
   POST   → replace the entries array wholesale (easier than per-
            entry PATCH for a small list edited in one UI form)

   Entries drive the travel-schedule resolver in
   src/lib/booking/provider-location.ts, which the availability
   engine + GCal event creator consult automatically.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/invoicing/auth';
import {
  getTravelSchedule,
  saveTravelSchedule,
  generateTravelEntryId,
  isValidTimezone,
  type ProviderTravelSchedule,
  type TravelScheduleEntry,
} from '@/lib/booking/provider-location';
import { getBookingsByDate } from '@/lib/booking/booking-store';

export const maxDuration = 15;

// ─── GET ────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const schedule = await getTravelSchedule();
    return NextResponse.json({ ok: true, schedule });
  } catch (err) {
    console.error('[provider-travel-schedule GET] error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// ─── POST (replace all entries) ─────────────────────────────────

interface PostBody {
  entries: Array<Omit<TravelScheduleEntry, 'id'> & { id?: string }>;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as PostBody;
    if (!body || !Array.isArray(body.entries)) {
      return NextResponse.json(
        { error: 'Invalid body: entries[] is required' },
        { status: 400 },
      );
    }

    // ─── Validate every entry ────────────────────────────────
    const normalized: TravelScheduleEntry[] = [];
    for (const e of body.entries) {
      if (!e.startDate || !DATE_RE.test(e.startDate)) {
        return NextResponse.json(
          { error: `Invalid startDate: ${e.startDate}` },
          { status: 400 },
        );
      }
      if (!e.endDate || !DATE_RE.test(e.endDate)) {
        return NextResponse.json(
          { error: `Invalid endDate: ${e.endDate}` },
          { status: 400 },
        );
      }
      if (e.startDate > e.endDate) {
        return NextResponse.json(
          { error: `startDate must be <= endDate (${e.startDate} > ${e.endDate})` },
          { status: 400 },
        );
      }
      if (!e.timezone || !isValidTimezone(e.timezone)) {
        return NextResponse.json(
          { error: `Invalid IANA timezone: ${e.timezone}` },
          { status: 400 },
        );
      }
      if (!e.locationLabel || !e.locationLabel.trim()) {
        return NextResponse.json(
          { error: 'locationLabel is required' },
          { status: 400 },
        );
      }

      normalized.push({
        id: e.id ?? generateTravelEntryId(),
        startDate: e.startDate,
        endDate: e.endDate,
        timezone: e.timezone,
        locationLabel: e.locationLabel.trim(),
        notes: e.notes?.trim() || undefined,
      });
    }

    // ─── Detect existing bookings in each new entry's range ──
    // We don't mutate anything — just surface a non-blocking
    // warning so the admin can review affected bookings manually.
    const warnings = await collectOverlappingBookingWarnings(normalized);

    const schedule: ProviderTravelSchedule = {
      entries: normalized,
      updatedAt: new Date().toISOString(),
    };
    await saveTravelSchedule(schedule);

    return NextResponse.json({ ok: true, schedule, warnings });
  } catch (err) {
    console.error('[provider-travel-schedule POST] error:', err);
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─── Warnings helper ────────────────────────────────────────────

async function collectOverlappingBookingWarnings(
  entries: TravelScheduleEntry[],
): Promise<Array<{ entryId: string; affectedBookings: number }>> {
  const out: Array<{ entryId: string; affectedBookings: number }> = [];

  for (const entry of entries) {
    // Enumerate dates in the range (inclusive) and count any
    // bookings on those dates. KV keys are indexed by date so
    // this is O(days × avg-bookings-per-day).
    let count = 0;
    const cursor = new Date(`${entry.startDate}T00:00:00Z`);
    const end = new Date(`${entry.endDate}T00:00:00Z`);
    // Guard against pathological ranges
    let iterations = 0;
    while (cursor.getTime() <= end.getTime() && iterations < 365) {
      const dateStr = cursor.toISOString().slice(0, 10);
      const bookings = await getBookingsByDate(dateStr);
      count += bookings.filter(
        b => b.status === 'approved' || b.status === 'confirmed' || b.status === 'pending-review',
      ).length;
      cursor.setUTCDate(cursor.getUTCDate() + 1);
      iterations++;
    }
    if (count > 0) {
      out.push({ entryId: entry.id, affectedBookings: count });
    }
  }

  return out;
}
