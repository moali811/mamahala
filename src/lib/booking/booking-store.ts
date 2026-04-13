/* ================================================================
   Booking Store — Vercel KV persistence for bookings
   ================================================================
   CRUD operations for Booking records, plus index management for
   efficient lookups by date, customer, and upcoming list.
   ================================================================ */

import { kv } from '@vercel/kv';
import type {
  Booking,
  BookingStatus,
  AvailabilityRules,
  BlockedDate,
  DayOverride,
  DEFAULT_AVAILABILITY_RULES,
} from './types';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// ─── Key Helpers ────────────────────────────────────────────────

const KEY = {
  booking: (id: string) => `booking:${id}`,
  upcoming: 'bookings:upcoming',
  byCustomer: (email: string) => `bookings:by-customer:${email.toLowerCase()}`,
  byDate: (date: string) => `bookings:by-date:${date}`,
  rules: 'availability:rules',
  blocked: (date: string) => `availability:blocked:${date}`,
  override: (date: string) => `availability:overrides:${date}`,
  gcalEventMap: (bookingId: string) => `gcal:event-map:${bookingId}`,
  busyCache: (date: string) => `gcal:busy-cache:${date}`,
  manageToken: (token: string) => `booking:manage:${token}`,
  magicToken: (token: string) => `booking:magic:${token}`,
  session: (sessionId: string) => `booking:session:${sessionId}`,
} as const;

// ─── ID Generation ──────────────────────────────────────────────

export function generateBookingId(): string {
  return `bk_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
}

// ─── Booking CRUD ───────────────────────────────────────────────

export async function getBooking(bookingId: string): Promise<Booking | null> {
  if (!KV_AVAILABLE) return null;
  return kv.get<Booking>(KEY.booking(bookingId));
}

export async function saveBooking(booking: Booking): Promise<void> {
  if (!KV_AVAILABLE) throw new Error('KV not available');

  const dateStr = booking.startTime.slice(0, 10); // YYYY-MM-DD

  await Promise.all([
    kv.set(KEY.booking(booking.bookingId), booking),
    addToIndex(KEY.byDate(dateStr), booking.bookingId),
    addToIndex(KEY.byCustomer(booking.clientEmail), booking.bookingId),
    booking.status === 'confirmed'
      ? addToSortedIndex(KEY.upcoming, booking.bookingId, booking.startTime)
      : Promise.resolve(),
  ]);
}

export async function updateBooking(
  bookingId: string,
  updates: Partial<Booking>,
): Promise<Booking | null> {
  if (!KV_AVAILABLE) return null;

  const existing = await getBooking(bookingId);
  if (!existing) return null;

  const updated: Booking = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await kv.set(KEY.booking(bookingId), updated);

  // If status changed away from confirmed, remove from upcoming
  if (updates.status && updates.status !== 'confirmed') {
    await removeFromIndex(KEY.upcoming, bookingId);
  }

  return updated;
}

export async function deleteBooking(bookingId: string): Promise<boolean> {
  if (!KV_AVAILABLE) return false;

  const booking = await getBooking(bookingId);
  if (!booking) return false;

  const dateStr = booking.startTime.slice(0, 10);

  await Promise.all([
    kv.del(KEY.booking(bookingId)),
    removeFromIndex(KEY.byDate(dateStr), bookingId),
    removeFromIndex(KEY.byCustomer(booking.clientEmail), bookingId),
    removeFromIndex(KEY.upcoming, bookingId),
  ]);

  return true;
}

// ─── Booking Queries ────────────────────────────────────────────

export async function getBookingsByDate(date: string): Promise<Booking[]> {
  if (!KV_AVAILABLE) return [];
  const ids = await kv.get<string[]>(KEY.byDate(date)) ?? [];
  if (ids.length === 0) return [];

  const bookings = await Promise.all(ids.map(id => getBooking(id)));
  return bookings.filter((b): b is Booking => b !== null);
}

export async function getBookingsByCustomer(email: string): Promise<Booking[]> {
  if (!KV_AVAILABLE) return [];
  const ids = await kv.get<string[]>(KEY.byCustomer(email.toLowerCase())) ?? [];
  if (ids.length === 0) return [];

  const bookings = await Promise.all(ids.map(id => getBooking(id)));
  return bookings.filter((b): b is Booking => b !== null);
}

export async function getUpcomingBookings(limit = 50): Promise<Booking[]> {
  if (!KV_AVAILABLE) return [];
  const ids = await kv.get<string[]>(KEY.upcoming) ?? [];
  if (ids.length === 0) return [];

  const now = new Date().toISOString();
  const bookings = await Promise.all(ids.slice(0, limit).map(id => getBooking(id)));
  return bookings
    .filter((b): b is Booking => b !== null && b.status === 'confirmed' && b.startTime > now)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export async function getConfirmedBookingsForDate(date: string): Promise<Booking[]> {
  const all = await getBookingsByDate(date);
  return all.filter(b => b.status === 'confirmed');
}

/**
 * Count confirmed bookings for a specific date.
 * Used by availability engine to enforce maxSessionsPerDay.
 */
export async function countConfirmedForDate(date: string): Promise<number> {
  const bookings = await getConfirmedBookingsForDate(date);
  return bookings.length;
}

// ─── Booking Lookup by Draft ID ─────────────────────────────────

export async function findBookingByDraftId(draftId: string): Promise<Booking | null> {
  if (!KV_AVAILABLE) return null;
  // Scan upcoming bookings (most likely place for a draft-linked booking)
  const upcoming = await getUpcomingBookings(200);
  return upcoming.find(b => b.draftId === draftId) ?? null;
}

// ─── Availability Rules ─────────────────────────────────────────

export async function getAvailabilityRules(): Promise<AvailabilityRules> {
  if (!KV_AVAILABLE) {
    const { DEFAULT_AVAILABILITY_RULES } = await import('./types');
    return DEFAULT_AVAILABILITY_RULES;
  }
  const rules = await kv.get<AvailabilityRules>(KEY.rules);
  if (!rules) {
    const { DEFAULT_AVAILABILITY_RULES } = await import('./types');
    return DEFAULT_AVAILABILITY_RULES;
  }
  return rules;
}

export async function saveAvailabilityRules(rules: AvailabilityRules): Promise<void> {
  if (!KV_AVAILABLE) throw new Error('KV not available');
  await kv.set(KEY.rules, { ...rules, updatedAt: new Date().toISOString() });
}

// ─── Blocked Dates ──────────────────────────────────────────────

export async function getBlockedDate(date: string): Promise<BlockedDate | null> {
  if (!KV_AVAILABLE) return null;
  return kv.get<BlockedDate>(KEY.blocked(date));
}

export async function setBlockedDate(blocked: BlockedDate): Promise<void> {
  if (!KV_AVAILABLE) throw new Error('KV not available');
  await kv.set(KEY.blocked(blocked.date), blocked);
}

export async function removeBlockedDate(date: string): Promise<void> {
  if (!KV_AVAILABLE) return;
  await kv.del(KEY.blocked(date));
}

// ─── Day Overrides ──────────────────────────────────────────────

export async function getDayOverride(date: string): Promise<DayOverride | null> {
  if (!KV_AVAILABLE) return null;
  return kv.get<DayOverride>(KEY.override(date));
}

export async function setDayOverride(override: DayOverride): Promise<void> {
  if (!KV_AVAILABLE) throw new Error('KV not available');
  await kv.set(KEY.override(override.date), override);
}

// ─── Google Calendar Event Map ──────────────────────────────────

export async function setCalendarEventId(
  bookingId: string,
  calendarEventId: string,
): Promise<void> {
  if (!KV_AVAILABLE) return;
  await kv.set(KEY.gcalEventMap(bookingId), { calendarEventId });
}

export async function getCalendarEventId(bookingId: string): Promise<string | null> {
  if (!KV_AVAILABLE) return null;
  const data = await kv.get<{ calendarEventId: string }>(KEY.gcalEventMap(bookingId));
  return data?.calendarEventId ?? null;
}

// ─── Busy Slot Cache ────────────────────────────────────────────

import type { CachedBusySlot } from './types';

export async function getCachedBusySlots(date: string): Promise<CachedBusySlot[] | null> {
  if (!KV_AVAILABLE) return null;
  return kv.get<CachedBusySlot[]>(KEY.busyCache(date));
}

export async function setCachedBusySlots(
  date: string,
  slots: CachedBusySlot[],
): Promise<void> {
  if (!KV_AVAILABLE) return;
  await kv.set(KEY.busyCache(date), slots, { ex: 600 }); // 10-min TTL
}

// ─── Manage Tokens ──────────────────────────────────────────────

import type { ManageTokenPayload, MagicLinkPayload, BookingSessionPayload } from './types';

export async function createManageToken(bookingId: string): Promise<string> {
  if (!KV_AVAILABLE) throw new Error('KV not available');
  const token = crypto.randomUUID();
  await kv.set(KEY.manageToken(token), { bookingId } satisfies ManageTokenPayload, {
    ex: 259200, // 72 hours
  });
  return token;
}

export async function validateManageToken(token: string): Promise<string | null> {
  if (!KV_AVAILABLE) return null;
  const data = await kv.get<ManageTokenPayload>(KEY.manageToken(token));
  return data?.bookingId ?? null;
}

export async function consumeManageToken(token: string): Promise<string | null> {
  if (!KV_AVAILABLE) return null;
  const data = await kv.get<ManageTokenPayload>(KEY.manageToken(token));
  if (!data) return null;
  await kv.del(KEY.manageToken(token));
  return data.bookingId;
}

// ─── Magic Link Tokens (Client Portal Auth) ─────────────────────

export async function createMagicToken(email: string): Promise<string> {
  if (!KV_AVAILABLE) throw new Error('KV not available');
  const token = crypto.randomUUID();
  await kv.set(KEY.magicToken(token), { email: email.toLowerCase() } satisfies MagicLinkPayload, {
    ex: 900, // 15 minutes
  });
  return token;
}

export async function consumeMagicToken(token: string): Promise<string | null> {
  if (!KV_AVAILABLE) return null;
  const data = await kv.get<MagicLinkPayload>(KEY.magicToken(token));
  if (!data) return null;
  await kv.del(KEY.magicToken(token));
  return data.email;
}

// ─── Client Sessions ────────────────────────────────────────────

export async function createBookingSession(email: string): Promise<string> {
  if (!KV_AVAILABLE) throw new Error('KV not available');
  const sessionId = crypto.randomUUID();
  await kv.set(
    KEY.session(sessionId),
    { email: email.toLowerCase(), createdAt: new Date().toISOString() } satisfies BookingSessionPayload,
    { ex: 604800 }, // 7 days
  );
  return sessionId;
}

export async function getBookingSession(
  sessionId: string,
): Promise<BookingSessionPayload | null> {
  if (!KV_AVAILABLE) return null;
  return kv.get<BookingSessionPayload>(KEY.session(sessionId));
}

export async function deleteBookingSession(sessionId: string): Promise<void> {
  if (!KV_AVAILABLE) return;
  await kv.del(KEY.session(sessionId));
}

// ─── Index Helpers ──────────────────────────────────────────────

async function addToIndex(key: string, value: string): Promise<void> {
  const existing = await kv.get<string[]>(key) ?? [];
  if (!existing.includes(value)) {
    existing.push(value);
    await kv.set(key, existing);
  }
}

async function removeFromIndex(key: string, value: string): Promise<void> {
  const existing = await kv.get<string[]>(key) ?? [];
  const updated = existing.filter(v => v !== value);
  if (updated.length !== existing.length) {
    await kv.set(key, updated);
  }
}

async function addToSortedIndex(
  key: string,
  bookingId: string,
  sortValue: string,
): Promise<void> {
  const existing = await kv.get<string[]>(key) ?? [];
  if (!existing.includes(bookingId)) {
    existing.push(bookingId);
    // Sort by fetching bookings to get startTime — but for efficiency,
    // just append and let read-time sort handle it
    await kv.set(key, existing);
  }
}
