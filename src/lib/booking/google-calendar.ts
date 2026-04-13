/* ================================================================
   Google Calendar Integration — OAuth2 Refresh Token Flow
   ================================================================
   Reads Dr. Hala's personal Google Calendar for busy/free data,
   creates events on booking confirmation, and updates/deletes
   on reschedule/cancel.

   Setup: Dr. Hala runs scripts/google-calendar-auth.ts once to
   generate the refresh token, which is stored in env vars.
   The server exchanges it for short-lived access tokens.

   CRITICAL: Calendar failures never block bookings. All functions
   are wrapped to return graceful fallbacks on error.
   ================================================================ */

import type { Booking, CachedBusySlot } from './types';
import {
  getCachedBusySlots,
  setCachedBusySlots,
  setCalendarEventId,
  getCalendarEventId,
} from './booking-store';

// ─── Config ─────────────────────────────────────────────────────

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CALENDAR_CLIENT_ID ?? '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CALENDAR_CLIENT_SECRET ?? '';
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN ?? '';
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID ?? 'primary';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';

function isConfigured(): boolean {
  return !!(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_REFRESH_TOKEN);
}

// ─── Token Management ───────────────────────────────────────────

let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

/**
 * Exchange refresh token for a short-lived access token.
 * Caches the token in module scope (reused within serverless invocation).
 */
async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedAccessToken;
  }

  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google token refresh failed: ${res.status} ${err}`);
  }

  const data = await res.json();
  cachedAccessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in ?? 3600) * 1000;
  return cachedAccessToken!;
}

/**
 * Make an authenticated request to the Google Calendar API.
 */
async function calendarFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = await getAccessToken();
  return fetch(`${GOOGLE_CALENDAR_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}

// ─── FreeBusy: Fetch Busy Slots ─────────────────────────────────

/**
 * Fetch busy time ranges from Google Calendar for a date range.
 * Uses KV cache (10-min TTL) to avoid excessive API calls.
 *
 * Returns empty array if Google Calendar is not configured or fails.
 */
export async function fetchBusySlots(
  dateFrom: string,  // YYYY-MM-DD
  dateTo: string,    // YYYY-MM-DD (inclusive)
): Promise<CachedBusySlot[]> {
  if (!isConfigured()) {
    console.warn('[GCal] Not configured — returning empty busy slots');
    return [];
  }

  // Check cache for single-day requests
  if (dateFrom === dateTo) {
    const cached = await getCachedBusySlots(dateFrom);
    if (cached) return cached;
  }

  try {
    const timeMin = `${dateFrom}T00:00:00Z`;
    const timeMax = `${dateTo}T23:59:59Z`;

    const res = await calendarFetch('/freeBusy', {
      method: 'POST',
      body: JSON.stringify({
        timeMin,
        timeMax,
        timeZone: 'UTC',
        items: [{ id: GOOGLE_CALENDAR_ID }],
      }),
    });

    if (!res.ok) {
      console.error(`[GCal] FreeBusy failed: ${res.status}`);
      return [];
    }

    const data = await res.json();
    const calendarBusy = data.calendars?.[GOOGLE_CALENDAR_ID]?.busy ?? [];

    const busySlots: CachedBusySlot[] = calendarBusy.map(
      (b: { start: string; end: string }) => ({
        start: b.start,
        end: b.end,
      }),
    );

    // Cache single-day results
    if (dateFrom === dateTo) {
      await setCachedBusySlots(dateFrom, busySlots).catch(() => {});
    }

    return busySlots;
  } catch (err) {
    console.error('[GCal] FreeBusy error:', err);
    return [];
  }
}

/**
 * Fetch busy slots for an entire month, organized by date.
 */
export async function fetchMonthBusySlots(
  month: string,  // YYYY-MM
): Promise<Map<string, CachedBusySlot[]>> {
  const [year, monthNum] = month.split('-').map(Number);
  const daysInMonth = new Date(year, monthNum, 0).getDate();
  const dateFrom = `${month}-01`;
  const dateTo = `${month}-${String(daysInMonth).padStart(2, '0')}`;

  const allBusy = await fetchBusySlots(dateFrom, dateTo);

  // Group by date
  const byDate = new Map<string, CachedBusySlot[]>();
  for (const slot of allBusy) {
    const date = slot.start.slice(0, 10);
    if (!byDate.has(date)) byDate.set(date, []);
    byDate.get(date)!.push(slot);
  }

  return byDate;
}

// ─── Create Calendar Event ──────────────────────────────────────

/**
 * Create a Google Calendar event for a confirmed booking.
 * Auto-generates a Google Meet link for online sessions.
 * Returns { eventId, meetLink } or null if creation fails.
 */
export async function createCalendarEvent(
  booking: Booking,
): Promise<{ eventId: string; meetLink?: string } | null> {
  if (!isConfigured()) {
    console.warn('[GCal] Not configured — skipping event creation');
    return null;
  }

  try {
    const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
    const modeLabel = booking.sessionMode === 'online' ? 'Online' : 'In-Person';

    const description = [
      `Client: ${booking.clientName}`,
      booking.clientEmail ? `Email: ${booking.clientEmail}` : null,
      booking.clientPhone ? `Phone: ${booking.clientPhone}` : null,
      `Timezone: ${booking.clientTimezone}`,
      `Mode: ${modeLabel}`,
      `Duration: ${booking.durationMinutes} minutes`,
      booking.clientNotes ? `\nClient Notes:\n${booking.clientNotes}` : null,
      booking.aiIntakeNotes ? `\nAI Intake Summary:\n${booking.aiIntakeNotes}` : null,
      `\nBooking ID: ${booking.bookingId}`,
    ]
      .filter(Boolean)
      .join('\n');

    const isOnline = booking.sessionMode === 'online';

    const event: Record<string, unknown> = {
      summary: `Session: ${booking.clientName} — ${serviceName}`,
      description,
      start: {
        dateTime: booking.startTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: booking.endTime,
        timeZone: 'UTC',
      },
      attendees: booking.clientEmail
        ? [{ email: booking.clientEmail, displayName: booking.clientName }]
        : [],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 60 },
          { method: 'popup', minutes: 1440 },
        ],
      },
      colorId: '2',
      status: 'confirmed',
      // Auto-generate Google Meet link for online sessions
      ...(isOnline ? {
        conferenceData: {
          createRequest: {
            requestId: booking.bookingId,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      } : {
        location: '430 Hazeldean Rd, K2L 1E8, Ottawa, Ontario, Canada',
      }),
    };

    // conferenceDataVersion=1 is required when creating Meet links
    const queryParam = isOnline ? '&conferenceDataVersion=1' : '';
    const res = await calendarFetch(
      `/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events?sendUpdates=all${queryParam}`,
      {
        method: 'POST',
        body: JSON.stringify(event),
      },
    );

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      console.error(`[GCal] Event creation failed: ${res.status}`, errBody);
      return null;
    }

    const created = await res.json();
    const eventId = created.id;

    // Extract Google Meet link if created
    const meetLink = created.conferenceData?.entryPoints?.find(
      (ep: any) => ep.entryPointType === 'video',
    )?.uri ?? created.hangoutLink ?? undefined;

    if (isOnline) {
      console.log(`[GCal] Meet link: ${meetLink ?? 'NOT CREATED'}`, {
        hasConferenceData: !!created.conferenceData,
        entryPoints: created.conferenceData?.entryPoints?.length ?? 0,
        hangoutLink: created.hangoutLink ?? 'none',
      });
    }

    // Store the mapping
    await setCalendarEventId(booking.bookingId, eventId).catch(() => {});

    // Invalidate busy cache for this date
    const date = booking.startTime.slice(0, 10);
    await setCachedBusySlots(date, []).catch(() => {});

    return { eventId, meetLink };
  } catch (err: any) {
    console.error('[GCal] Event creation error:', err?.message ?? err, err?.stack);
    return null;
  }
}

// ─── Update Calendar Event (Reschedule) ─────────────────────────

/**
 * Update a Google Calendar event's time for a rescheduled booking.
 */
export async function updateCalendarEvent(
  bookingId: string,
  newStartTime: string,
  newEndTime: string,
  updatedDescription?: string,
): Promise<boolean> {
  if (!isConfigured()) return false;

  try {
    const eventId = await getCalendarEventId(bookingId);
    if (!eventId) {
      console.warn(`[GCal] No event ID found for booking ${bookingId}`);
      return false;
    }

    const res = await calendarFetch(
      `/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events/${encodeURIComponent(eventId)}?sendUpdates=all`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          start: { dateTime: newStartTime, timeZone: 'UTC' },
          end: { dateTime: newEndTime, timeZone: 'UTC' },
          ...(updatedDescription ? { description: updatedDescription } : {}),
        }),
      },
    );

    if (!res.ok) {
      console.error(`[GCal] Event update failed: ${res.status}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[GCal] Event update error:', err);
    return false;
  }
}

// ─── Delete Calendar Event (Cancellation) ───────────────────────

/**
 * Cancel/delete a Google Calendar event.
 */
export async function deleteCalendarEvent(bookingId: string): Promise<boolean> {
  if (!isConfigured()) return false;

  try {
    const eventId = await getCalendarEventId(bookingId);
    if (!eventId) {
      console.warn(`[GCal] No event ID found for booking ${bookingId}`);
      return false;
    }

    const res = await calendarFetch(
      `/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events/${encodeURIComponent(eventId)}?sendUpdates=all`,
      { method: 'DELETE' },
    );

    // 204 No Content = success, 410 Gone = already deleted
    if (!res.ok && res.status !== 410) {
      console.error(`[GCal] Event deletion failed: ${res.status}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[GCal] Event deletion error:', err);
    return false;
  }
}

// ─── Retry: Create event for bookings that missed initial creation ──

/**
 * Attempt to create GCal events for confirmed bookings that don't have one.
 * Called by the reminder cron job.
 */
export async function retryMissingCalendarEvents(
  bookings: Booking[],
): Promise<number> {
  let created = 0;
  for (const booking of bookings) {
    if (booking.calendarEventId) continue;
    if (booking.status !== 'confirmed') continue;

    const result = await createCalendarEvent(booking);
    if (result) {
      created++;
    }
  }
  return created;
}
