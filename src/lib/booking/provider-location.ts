/* ================================================================
   Provider Location — Travel schedule + manual override resolver
   ================================================================
   Dr. Hala shuttles between Toronto and Dubai. Instead of forcing
   an admin to re-enter her timezone every flight, we maintain a
   travel schedule (date ranges) and optionally an explicit manual
   override. For any moment in time, one function
   `getEffectiveLocation(dateUtc)` resolves WHERE she is + WHICH
   timezone to use for:
     - availability slot computation
     - Google Calendar event creation
     - invoice PDF headers
     - email rendering

   Resolution order (first match wins):
     1. Active, unexpired ProviderLocationOverride
     2. Matching TravelScheduleEntry (date compared in entry's tz)
     3. Home base (AvailabilityRules.timezone)

   Everything is additive. We never mutate availability:rules.timezone
   from travel — it stays as the home-base fallback so the change is
   migration-free.
   ================================================================ */

import { kv } from '@vercel/kv';
import { getAvailabilityRules } from './booking-store';
import { BUSINESS } from '@/config/business';

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// ─── Storage Keys ───────────────────────────────────────────────

const KEY = {
  travelSchedule: 'provider:travel-schedule',
  locationOverride: 'provider:location-override',
} as const;

// ─── Types ──────────────────────────────────────────────────────

export interface TravelScheduleEntry {
  /** Unique id (`trip_{uuid}`), stable across updates. */
  id: string;
  /**
   * Inclusive start date, formatted as YYYY-MM-DD and interpreted
   * in this entry's own `timezone` (NOT UTC). The trip starts at
   * 00:00 local on this day.
   */
  startDate: string;
  /**
   * Inclusive end date (YYYY-MM-DD), also in the entry's timezone.
   * The trip lasts through 23:59:59 local on this day.
   */
  endDate: string;
  /** IANA timezone, validated against Intl.supportedValuesOf('timeZone'). */
  timezone: string;
  /** Human-readable label for UI, email, PDF headers (e.g. "Dubai, UAE"). */
  locationLabel: string;
  /** Optional admin notes. */
  notes?: string;
}

export interface ProviderTravelSchedule {
  entries: TravelScheduleEntry[];
  updatedAt: string;
}

export interface ProviderLocationOverride {
  active: boolean;
  timezone: string;
  locationLabel: string;
  /** ISO timestamp when the override was set. */
  setAt: string;
  /** Optional ISO timestamp after which the override is ignored. */
  expiresAt?: string;
}

/**
 * The resolved location for a specific moment in time — what
 * `getEffectiveLocation()` returns.
 */
export interface EffectiveLocation {
  timezone: string;
  locationLabel: string;
  /** Which rule produced this result, for UI + debugging. */
  source: 'override' | 'schedule' | 'default';
  /** Present only when `source === 'schedule'`. */
  scheduleEntryId?: string;
}

// ─── Validation ─────────────────────────────────────────────────

let cachedValidTimezones: Set<string> | null = null;

/**
 * Validate that a string is a real IANA timezone identifier.
 * Populated lazily from `Intl.supportedValuesOf` (Node 18+).
 * Falls back to a `Intl.DateTimeFormat` smoke test if the API is
 * unavailable.
 */
export function isValidTimezone(tz: string): boolean {
  if (!tz || typeof tz !== 'string') return false;

  if (cachedValidTimezones === null) {
    try {
      // Intl.supportedValuesOf is available in Node 18+ / modern browsers.
      // We still guard with optional chaining in case the runtime is older.
      const values = Intl.supportedValuesOf?.('timeZone') as string[] | undefined;
      if (values && values.length > 0) {
        cachedValidTimezones = new Set(values);
      }
    } catch {
      // Ignore — fall through to the smoke-test path below.
    }
  }

  if (cachedValidTimezones) {
    return cachedValidTimezones.has(tz);
  }

  // Smoke-test fallback: try constructing a DTF; throws on invalid tz.
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

// ─── Travel Schedule CRUD ───────────────────────────────────────

export async function getTravelSchedule(): Promise<ProviderTravelSchedule> {
  if (!KV_AVAILABLE) {
    return { entries: [], updatedAt: new Date().toISOString() };
  }
  const existing = await kv.get<ProviderTravelSchedule>(KEY.travelSchedule);
  return existing ?? { entries: [], updatedAt: new Date().toISOString() };
}

export async function saveTravelSchedule(
  schedule: ProviderTravelSchedule,
): Promise<void> {
  if (!KV_AVAILABLE) throw new Error('KV not available');
  await kv.set(KEY.travelSchedule, {
    ...schedule,
    updatedAt: new Date().toISOString(),
  });
}

export function generateTravelEntryId(): string {
  return `trip_${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;
}

// ─── Manual Override CRUD ───────────────────────────────────────

export async function getLocationOverride(): Promise<ProviderLocationOverride | null> {
  if (!KV_AVAILABLE) return null;
  return kv.get<ProviderLocationOverride>(KEY.locationOverride);
}

export async function saveLocationOverride(
  override: ProviderLocationOverride,
): Promise<void> {
  if (!KV_AVAILABLE) throw new Error('KV not available');
  await kv.set(KEY.locationOverride, override);
}

export async function clearLocationOverride(): Promise<void> {
  if (!KV_AVAILABLE) return;
  await kv.del(KEY.locationOverride);
}

// ─── Helpers ────────────────────────────────────────────────────

/**
 * Format a UTC moment as YYYY-MM-DD in the given IANA timezone.
 * Used for comparing against travel-schedule entry date ranges.
 * Critical: comparing in UTC would produce dateline off-by-one when
 * a trip to Dubai starts at midnight Dubai time (which is 4pm
 * previous-day UTC).
 */
function formatDateInTz(dateUtc: Date, timezone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(dateUtc);

  const y = parts.find(p => p.type === 'year')?.value;
  const m = parts.find(p => p.type === 'month')?.value;
  const d = parts.find(p => p.type === 'day')?.value;
  return `${y}-${m}-${d}`;
}

function toDate(input: Date | string): Date {
  return input instanceof Date ? input : new Date(input);
}

function overrideIsActive(o: ProviderLocationOverride | null): o is ProviderLocationOverride {
  if (!o || !o.active) return false;
  if (!o.expiresAt) return true;
  return new Date(o.expiresAt).getTime() > Date.now();
}

/**
 * Find the travel-schedule entry (if any) that covers the given UTC
 * instant. Checks each entry by formatting the UTC instant as a
 * local date string in the entry's timezone and string-comparing
 * it against `startDate`/`endDate`.
 */
function findActiveTripEntry(
  schedule: ProviderTravelSchedule,
  dateUtc: Date,
): TravelScheduleEntry | null {
  for (const entry of schedule.entries) {
    if (!isValidTimezone(entry.timezone)) continue;
    const localDate = formatDateInTz(dateUtc, entry.timezone);
    if (localDate >= entry.startDate && localDate <= entry.endDate) {
      return entry;
    }
  }
  return null;
}

// ─── Core Resolvers ─────────────────────────────────────────────

/**
 * Resolve Dr. Hala's effective location for a given UTC instant.
 *
 * This is the single source of truth consulted by the availability
 * engine, the GCal event creator, and invoice/email templates.
 * Callers should pass the booking's `startTime` (not `endTime`) so
 * sessions that span a tz transition lock onto their start zone.
 */
export async function getEffectiveLocation(
  dateUtc: Date | string,
): Promise<EffectiveLocation> {
  const instant = toDate(dateUtc);

  // 1. Manual override (highest priority, if active)
  const override = await getLocationOverride();
  if (overrideIsActive(override) && isValidTimezone(override.timezone)) {
    return {
      timezone: override.timezone,
      locationLabel: override.locationLabel,
      source: 'override',
    };
  }

  // 2. Travel schedule
  const schedule = await getTravelSchedule();
  const trip = findActiveTripEntry(schedule, instant);
  if (trip) {
    return {
      timezone: trip.timezone,
      locationLabel: trip.locationLabel,
      source: 'schedule',
      scheduleEntryId: trip.id,
    };
  }

  // 3. Home base (AvailabilityRules.timezone)
  const rules = await getAvailabilityRules();
  return {
    timezone: rules.timezone,
    // Use a friendly label for the common case of Toronto — otherwise echo
    // the IANA zone so at least it's informative. Admins can refine this
    // later if they want a proper label on home base.
    locationLabel: rules.timezone === 'America/Toronto'
      ? 'Toronto, Canada'
      : rules.timezone,
    source: 'default',
  };
}

/**
 * Shortcut that returns just the IANA timezone string. Used by the
 * availability engine which doesn't need the label.
 */
export async function getEffectiveTimezone(
  dateUtc: Date | string,
): Promise<string> {
  const loc = await getEffectiveLocation(dateUtc);
  return loc.timezone;
}

/**
 * Pick the right in-person address for a given location label.
 * UAE/Dubai labels → uae address. Everything else → canada address.
 * Returns the localized string for the requested email locale.
 */
export function resolveInPersonAddress(
  locationLabel: string | undefined,
  locale: 'en' | 'ar',
): string {
  const addrs = BUSINESS.inPersonAddresses;
  if (locationLabel && /UAE|Dubai|دبي|الإمارات/i.test(locationLabel)) {
    return addrs.uae[locale];
  }
  return addrs.canada[locale];
}

/**
 * Batch resolver: return an object mapping each input date to its
 * effective location. Used by the month-view calendar to avoid N
 * round-trips to KV when all we need are timezones. Schedule +
 * override are read once.
 */
export async function getEffectiveLocationsForDates(
  dates: (Date | string)[],
): Promise<Map<string, EffectiveLocation>> {
  const result = new Map<string, EffectiveLocation>();
  if (dates.length === 0) return result;

  const override = await getLocationOverride();
  const schedule = await getTravelSchedule();
  const rules = await getAvailabilityRules();

  const activeOverride = overrideIsActive(override) && isValidTimezone(override.timezone)
    ? override
    : null;

  for (const d of dates) {
    const key = typeof d === 'string' ? d : d.toISOString();
    const instant = toDate(d);

    if (activeOverride) {
      result.set(key, {
        timezone: activeOverride.timezone,
        locationLabel: activeOverride.locationLabel,
        source: 'override',
      });
      continue;
    }

    const trip = findActiveTripEntry(schedule, instant);
    if (trip) {
      result.set(key, {
        timezone: trip.timezone,
        locationLabel: trip.locationLabel,
        source: 'schedule',
        scheduleEntryId: trip.id,
      });
      continue;
    }

    result.set(key, {
      timezone: rules.timezone,
      locationLabel: rules.timezone === 'America/Toronto'
        ? 'Toronto, Canada'
        : rules.timezone,
      source: 'default',
    });
  }

  return result;
}
