/* ================================================================
   Availability Engine — Real-time slot computation
   ================================================================
   Merges Dr. Hala's weekly schedule, day overrides, blocked dates,
   Google Calendar busy slots, and existing bookings to produce
   a list of available time slots for any given day.

   Weekly schedule is stored in the provider's home-base timezone,
   but the effective tz for any individual date is resolved via
   `getEffectiveTimezone(date)` which checks Dr. Hala's travel
   schedule + manual override first. This means a booking on
   Apr 25 during a Dubai trip uses Asia/Dubai for slot computation
   even though rules.timezone is still America/Toronto.

   Slots are returned in ISO 8601 UTC for universal consumption.
   ================================================================ */

import type {
  TimeSlot,
  DayAvailability,
  AvailabilityRules,
  DaySchedule,
  CachedBusySlot,
} from './types';
import {
  getAvailabilityRules,
  getBlockedDate,
  getDayOverride,
  getHeldBookingsForDate,
} from './booking-store';
import { getEffectiveTimezone } from './provider-location';

// ─── Timezone Utilities ─────────────────────────────────────────

/**
 * Convert a date string + HH:mm time in a specific timezone to a UTC Date.
 */
function toUTC(dateStr: string, time: string, timezone: string): Date {
  // dateStr is YYYY-MM-DD, time is HH:mm
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);

  // Create a date string in the target timezone and parse to UTC
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Use a reference date in the target timezone to compute the offset
  const refDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
  const parts = formatter.formatToParts(refDate);

  const tzYear = Number(parts.find(p => p.type === 'year')?.value);
  const tzMonth = Number(parts.find(p => p.type === 'month')?.value);
  const tzDay = Number(parts.find(p => p.type === 'day')?.value);
  const tzHour = Number(parts.find(p => p.type === 'hour')?.value);
  const tzMinute = Number(parts.find(p => p.type === 'minute')?.value);

  // Calculate the offset between what we wanted and what we got
  const wanted = new Date(year, month - 1, day, hours, minutes, 0);
  const got = new Date(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, 0);
  const offsetMs = got.getTime() - wanted.getTime();

  // Apply inverse offset to get UTC
  return new Date(refDate.getTime() + offsetMs);
}

/**
 * Parse a time like "09:00" to minutes since midnight.
 */
function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Convert minutes since midnight to "HH:mm".
 */
function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Get the day-of-week for a date in a specific timezone.
 */
function getDayOfWeek(dateStr: string, timezone: string): number {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
  });
  const weekday = formatter.format(d);
  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  return dayMap[weekday] ?? 0;
}

/**
 * Create a UTC ISO string for a given date + time in provider timezone.
 */
export function createSlotTime(dateStr: string, time: string, timezone: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);

  // Build an ISO string assuming UTC, then adjust for timezone
  const naiveDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));

  // Get the offset of this timezone at this date
  const utcStr = naiveDate.toLocaleString('en-US', { timeZone: 'UTC' });
  const tzStr = naiveDate.toLocaleString('en-US', { timeZone: timezone });
  const utcDate = new Date(utcStr);
  const tzDate = new Date(tzStr);
  const offsetMs = utcDate.getTime() - tzDate.getTime();

  return new Date(naiveDate.getTime() + offsetMs).toISOString();
}

// ─── Slot Overlap Detection ─────────────────────────────────────

interface TimeRange {
  start: string;  // ISO 8601
  end: string;    // ISO 8601
}

function rangesOverlap(a: TimeRange, b: TimeRange): boolean {
  return a.start < b.end && b.start < a.end;
}

// ─── Core: Available Slots for a Day ────────────────────────────

/**
 * Compute available time slots for a specific date.
 *
 * @param date - YYYY-MM-DD in provider timezone
 * @param durationMinutes - session duration (e.g. 50)
 * @param busySlots - Google Calendar busy periods (optional, fetched externally)
 * @param rules - availability rules (optional, fetched from KV if not provided)
 */
export async function getAvailableSlots(
  date: string,
  durationMinutes: number,
  busySlots?: CachedBusySlot[],
  rules?: AvailabilityRules,
): Promise<TimeSlot[]> {
  const effectiveRules = rules ?? await getAvailabilityRules();

  // Resolve the effective timezone for THIS specific day via the
  // travel-schedule / override resolver. Home-base is the fallback.
  // We pass midday UTC so the resolver lands squarely inside the
  // target local day no matter how wide the UTC offset is.
  const midday = new Date(`${date}T12:00:00Z`);
  const timezone = await getEffectiveTimezone(midday);

  const now = new Date();

  // 1. Check if date is blocked
  const blocked = await getBlockedDate(date);
  if (blocked?.allDay) {
    return []; // Entire day blocked
  }

  // 2. Check advance booking limit
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + effectiveRules.advanceBookingDays);
  if (dateObj > maxDate) {
    return []; // Too far in advance
  }

  // 3. Get the day's schedule (override > weekly)
  const override = await getDayOverride(date);
  const dayOfWeek = getDayOfWeek(date, timezone);
  const daySchedule: DaySchedule | null = override?.schedule
    ?? effectiveRules.weeklySchedule[dayOfWeek]
    ?? null;

  if (!daySchedule || daySchedule.blocks.length === 0) {
    return []; // Day off
  }

  // 4. Generate candidate slots from schedule blocks
  const { slotGranularityMinutes, bufferMinutes } = effectiveRules;
  const candidates: TimeSlot[] = [];

  for (const block of daySchedule.blocks) {
    const blockStart = parseTimeToMinutes(block.start);
    const blockEnd = parseTimeToMinutes(block.end);

    for (let slotStart = blockStart; slotStart + durationMinutes <= blockEnd; slotStart += slotGranularityMinutes) {
      const slotEnd = slotStart + durationMinutes;
      const startTime = createSlotTime(date, minutesToTime(slotStart), timezone);
      const endTime = createSlotTime(date, minutesToTime(slotEnd), timezone);

      candidates.push({
        start: startTime,
        end: endTime,
        available: true,
      });
    }
  }

  if (candidates.length === 0) return [];

  // 5. Get existing bookings that occupy this date — confirmed ones
  //    AND unexpired pending-review holds from the admin Step 2 flow.
  //    Pending-review bookings hold their slot while an admin reviews
  //    the invoice; if the hold expires, the slot is freed without
  //    mutating the record (lazy sweep).
  const existingBookings = await getHeldBookingsForDate(date);
  const bookedRanges: TimeRange[] = existingBookings.map(b => ({
    start: b.startTime,
    // Extend by buffer on both sides for gap enforcement
    end: new Date(new Date(b.endTime).getTime() + bufferMinutes * 60_000).toISOString(),
  }));

  // Also create pre-buffer ranges (buffer before each booking)
  const preBufferRanges: TimeRange[] = existingBookings.map(b => ({
    start: new Date(new Date(b.startTime).getTime() - bufferMinutes * 60_000).toISOString(),
    end: b.startTime,
  }));

  // 6. Get busy slots from Google Calendar (if not provided)
  const gcalBusy: TimeRange[] = (busySlots ?? []).map(s => ({
    start: s.start,
    end: s.end,
  }));

  // 7. Get partial blocks (if day is partially blocked)
  const partialBlocks: TimeRange[] = (blocked?.blockedSlots ?? []).map(s => ({
    start: createSlotTime(date, s.start, timezone),
    end: createSlotTime(date, s.end, timezone),
  }));

  // 8. Check max sessions per day
  const confirmedCount = existingBookings.length;
  const maxReached = confirmedCount >= effectiveRules.maxSessionsPerDay;

  // 9. Filter each candidate
  const minimumNoticeTime = new Date(
    now.getTime() + effectiveRules.minimumNoticeHours * 3600_000,
  ).toISOString();

  return candidates.map(slot => {
    // Past or too short notice
    if (slot.start < minimumNoticeTime) {
      return { ...slot, available: false, reason: 'past' as const };
    }

    // Max sessions reached
    if (maxReached) {
      return { ...slot, available: false, reason: 'max-reached' as const };
    }

    // Partially blocked
    if (partialBlocks.some(pb => rangesOverlap(slot, pb))) {
      return { ...slot, available: false, reason: 'blocked' as const };
    }

    // Google Calendar conflict
    if (gcalBusy.some(busy => rangesOverlap(slot, busy))) {
      return { ...slot, available: false, reason: 'busy' as const };
    }

    // Existing booking conflict (with buffer)
    const slotWithBuffer: TimeRange = {
      start: slot.start,
      end: new Date(new Date(slot.end).getTime() + bufferMinutes * 60_000).toISOString(),
    };
    if (bookedRanges.some(br => rangesOverlap(slotWithBuffer, br))) {
      return { ...slot, available: false, reason: 'buffer' as const };
    }
    if (preBufferRanges.some(pbr => rangesOverlap(slot, pbr))) {
      return { ...slot, available: false, reason: 'buffer' as const };
    }

    return slot;
  });
}

// ─── Month Overview ─────────────────────────────────────────────

/**
 * For a given month, return which days have available slots.
 * Used by the calendar grid to show green dots on available days.
 */
export async function getMonthAvailability(
  month: string,        // YYYY-MM
  durationMinutes: number,
  busySlotsMap?: Map<string, CachedBusySlot[]>,
): Promise<DayAvailability[]> {
  const rules = await getAvailabilityRules();
  const [year, monthNum] = month.split('-').map(Number);
  const daysInMonth = new Date(year, monthNum, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const results: DayAvailability[] = [];

  // Process days in parallel (batches of 7 to avoid overwhelming KV)
  for (let batchStart = 1; batchStart <= daysInMonth; batchStart += 7) {
    const batchEnd = Math.min(batchStart + 6, daysInMonth);
    const batch = [];

    for (let d = batchStart; d <= batchEnd; d++) {
      const dateStr = `${year}-${String(monthNum).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dateObj = new Date(year, monthNum - 1, d);

      // Skip past dates
      if (dateObj < today) {
        results.push({
          date: dateStr,
          hasSlots: false,
          slotCount: 0,
          isBlocked: false,
        });
        continue;
      }

      batch.push(
        (async () => {
          const busySlots = busySlotsMap?.get(dateStr);
          const slots = await getAvailableSlots(dateStr, durationMinutes, busySlots, rules);
          const available = slots.filter(s => s.available);
          const blocked = await getBlockedDate(dateStr);

          return {
            date: dateStr,
            hasSlots: available.length > 0,
            slotCount: available.length,
            isBlocked: blocked?.allDay ?? false,
            blockReason: blocked?.reason,
          } satisfies DayAvailability;
        })(),
      );
    }

    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
  }

  // Sort by date
  return results.sort((a, b) => a.date.localeCompare(b.date));
}

// ─── Slot Validation ────────────────────────────────────────────

/**
 * Verify that a specific time slot is still available at confirmation time.
 * This is the critical check that prevents double-bookings.
 */
export async function isSlotAvailable(
  date: string,
  startTime: string,
  endTime: string,
  busySlots?: CachedBusySlot[],
): Promise<{ available: boolean; reason?: string }> {
  const durationMs = new Date(endTime).getTime() - new Date(startTime).getTime();
  const durationMinutes = Math.round(durationMs / 60_000);

  const slots = await getAvailableSlots(date, durationMinutes, busySlots);

  // Find a slot that matches the requested time
  const matchingSlot = slots.find(
    s => s.start === startTime && s.end === endTime,
  );

  if (!matchingSlot) {
    // Slot not in candidate list — check if it's a valid time
    return { available: false, reason: 'Requested time is not within available hours' };
  }

  if (!matchingSlot.available) {
    const reasons: Record<string, string> = {
      busy: 'This time conflicts with an existing calendar event',
      buffer: 'This time is too close to another booking',
      'max-reached': 'Maximum sessions for this day has been reached',
      blocked: 'This date/time has been blocked',
      past: 'This time has already passed or is too close to now',
      'outside-hours': 'This time is outside available hours',
    };
    return {
      available: false,
      reason: reasons[matchingSlot.reason ?? ''] ?? 'Time slot is not available',
    };
  }

  return { available: true };
}
