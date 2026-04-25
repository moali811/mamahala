/* ================================================================
   GET  /api/admin/booking/block-date — List all blocked dates
   POST /api/admin/booking/block-date — Block or unblock a date
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import {
  setBlockedDate,
  removeBlockedDate,
  listBlockedDates,
  getBlockedDate,
  getAvailabilityRules,
} from '@/lib/booking/booking-store';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import {
  createBusyBlockEvent,
  deleteCalendarEventById,
} from '@/lib/booking/google-calendar';
import { createSlotTime } from '@/lib/booking/availability';

// GET — list all blocked dates in KV, sorted ascending.
// Used by the admin AvailabilityEditor to populate the Blocked Dates tab.
export async function GET(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const blockedDates = await listBlockedDates();
    return NextResponse.json({ blockedDates });
  } catch (err) {
    console.error('[Admin Block Date] List error:', err);
    return NextResponse.json({ error: 'Failed to list blocked dates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  try {
    const { date, reason, allDay, action, blockedSlots } = await request.json();

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Valid date required (YYYY-MM-DD)' }, { status: 400 });
    }

    // ─── Unblock ───────────────────────────────────────────
    if (action === 'unblock') {
      // Fetch existing record first so we can clean up any GCal events
      // that were created when this block was a time-range (partial) block.
      const existing = await getBlockedDate(date);

      if (existing?.gcalEventIds?.length) {
        await Promise.all(
          existing.gcalEventIds.map(eventId =>
            deleteCalendarEventById(eventId).catch(err =>
              console.error(`[Admin Block Date] GCal delete failed for event ${eventId}:`, err),
            ),
          ),
        );
      }

      await removeBlockedDate(date);
      return NextResponse.json({ ok: true, action: 'unblocked', date });
    }

    // ─── Block (all-day or partial) ───────────────────────
    const isAllDay = allDay !== false;

    // Validate partial-block slots if provided
    if (!isAllDay) {
      if (!Array.isArray(blockedSlots) || blockedSlots.length === 0) {
        return NextResponse.json(
          { error: 'blockedSlots required when allDay is false' },
          { status: 400 },
        );
      }
      for (const slot of blockedSlots) {
        if (!/^\d{2}:\d{2}$/.test(slot.start) || !/^\d{2}:\d{2}$/.test(slot.end)) {
          return NextResponse.json(
            { error: 'Each slot must have HH:MM start and end' },
            { status: 400 },
          );
        }
        if (slot.start >= slot.end) {
          return NextResponse.json(
            { error: 'Slot end must be after start' },
            { status: 400 },
          );
        }
      }
    }

    // For partial blocks: create one GCal "Unavailable" event per slot.
    // GCal failures never block the KV write (matches rest of booking system).
    let gcalEventIds: string[] | undefined;
    if (!isAllDay && blockedSlots?.length) {
      const rules = await getAvailabilityRules();
      const timezone = rules.timezone;
      const label = (reason && String(reason).trim()) || 'Unavailable';

      const results = await Promise.all(
        (blockedSlots as { start: string; end: string }[]).map(async slot => {
          try {
            const startIso = createSlotTime(date, slot.start, timezone);
            const endIso = createSlotTime(date, slot.end, timezone);
            return await createBusyBlockEvent({ startIso, endIso, label });
          } catch (err) {
            console.error('[Admin Block Date] GCal create failed:', err);
            return null;
          }
        }),
      );
      gcalEventIds = results.filter((id): id is string => !!id);
    }

    await setBlockedDate({
      date,
      reason: reason || 'Blocked',
      allDay: isAllDay,
      blockedSlots,
      gcalEventIds,
    });

    return NextResponse.json({
      ok: true,
      action: 'blocked',
      date,
      gcalSynced: gcalEventIds?.length ?? 0,
    });
  } catch (err) {
    console.error('[Admin Block Date] Error:', err);
    return NextResponse.json({ error: 'Failed to update blocked date' }, { status: 500 });
  }
}
