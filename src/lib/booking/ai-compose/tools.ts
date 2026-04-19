/* ================================================================
   AI Compose — Tool definitions & server-side executors
   ================================================================
   Exposes four tools to Claude for the natural-language booking
   flow:
     • search_client      — fuzzy match existing customers
     • match_service      — map description → service slug
     • find_availability  — resolve date + find free slots
     • draft_booking      — TERMINAL: creates the pending-review hold

   The tool schemas are static (cached with the system prompt).
   Executors wrap existing helpers in src/lib/booking and
   src/lib/invoicing.
   ================================================================ */

import type Anthropic from '@anthropic-ai/sdk';
import { services } from '@/data/services';
import { PRICING_TIERS, type PricingTierKey } from '@/config/pricing';
import { COUNTRIES_BY_CODE } from '@/config/countries';
import { listCustomers, getCustomer } from '@/lib/invoicing/customer-store';
import { recommendServices } from '@/lib/booking/ai-service-recommend';
import { getAvailableSlots } from '@/lib/booking/availability';
import { getEffectiveLocation } from '@/lib/booking/provider-location';
import {
  createBookingHold,
  createSeriesHold,
} from '@/lib/booking/admin-booking-flow';
import type { Customer } from '@/lib/invoicing/types';
import type { SessionMode, RecurrenceFrequency } from '@/lib/booking/types';

// ─── Tool definitions (JSON Schema for Claude) ──────────────────

export const COMPOSE_TOOLS: Anthropic.Tool[] = [
  {
    name: 'search_client',
    description:
      'Search for an existing client by name, email, or phone. Returns up to 5 ranked matches with enough detail to disambiguate. Call FIRST whenever a client is mentioned by name. Never invent a client email — if this returns 0 or ambiguous matches, stop and ask the admin.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description:
            'Free-form client reference — full name, first name, email, or phone number. Preserve bilingual (EN/AR) names verbatim.',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'match_service',
    description:
      'Map a natural-language service description to the best-matching service slug from the 23-service catalog. Returns the top 3 candidates with confidence scores. Consider the session modality hint if the admin specified online vs in-person.',
    input_schema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description:
            'What the booking is for, in natural language — e.g. "couples counseling first session", "discovery call", "teen behavioral coaching".',
        },
        modality: {
          type: 'string',
          enum: ['online', 'inPerson'],
          description: 'Optional. Whether the admin specified online or in-person.',
        },
      },
      required: ['description'],
    },
  },
  {
    name: 'find_availability',
    description:
      'Find Dr. Hala\'s available time slots for a specific date and service. Pass the date as YYYY-MM-DD (you must resolve "next Tuesday" etc. yourself using the today context in the user message). Returns available slots in ISO 8601 UTC. If the exact preferred time is unavailable, the full day\'s available slots are returned so you can pick the closest match.',
    input_schema: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description:
            'The resolved calendar date in YYYY-MM-DD format, interpreted in the provider timezone (given in the user context).',
        },
        serviceSlug: {
          type: 'string',
          description:
            'The service slug returned by match_service. Determines session duration for slot computation.',
        },
        timePreference: {
          type: 'string',
          description:
            'Optional. Either a period — "morning" (09:00–12:00), "afternoon" (12:00–17:00), "evening" (17:00–20:00) — or a specific 24-hour time "HH:mm". If omitted, returns the whole day.',
        },
      },
      required: ['date', 'serviceSlug'],
    },
  },
  {
    name: 'draft_booking',
    description:
      'TERMINAL tool. Creates a pending-review booking hold (24-hour hold, no emails, no calendar event yet). After calling this, the admin reviews the invoice in Step 2 before anything is sent. Call this once you have resolved: service, client, start time, and optional recurring config. The loop ends after this call succeeds.',
    input_schema: {
      type: 'object',
      properties: {
        serviceSlug: { type: 'string', description: 'The exact service slug.' },
        startIso: {
          type: 'string',
          description:
            'The booking start time in ISO 8601 UTC (from a find_availability result).',
        },
        sessionMode: {
          type: 'string',
          enum: ['online', 'inPerson'],
          description: 'Default "online" if the admin did not specify.',
        },
        client: {
          type: 'object',
          description:
            'Either an existing client (provide id + optionally name to echo) or a new client (provide name + email + optional phone/country/timezone).',
          properties: {
            id: {
              type: 'string',
              description:
                'The customer email from search_client (acts as the stable ID). Set this for an existing client. If set, server uses stored record — do NOT pass a conflicting email.',
            },
            name: { type: 'string' },
            email: {
              type: 'string',
              description:
                'Required for new clients. Do not include for existing clients (use id instead).',
            },
            phone: { type: 'string' },
            country: {
              type: 'string',
              description: 'ISO-2 uppercase country code (e.g. "CA", "AE"). Default "CA".',
            },
            timezone: {
              type: 'string',
              description:
                'IANA timezone (e.g. "America/Toronto"). Default "America/Toronto".',
            },
          },
          required: ['name'],
        },
        notes: {
          type: 'string',
          description:
            'Admin\'s contextual notes about the booking — anything relevant the admin wrote in the natural-language request (e.g. "husband nervous about first session"). Keep neutral and descriptive.',
        },
        recurring: {
          type: 'object',
          description:
            'OPTIONAL. Only include if the admin explicitly stated both cadence AND count.',
          properties: {
            cadence: {
              type: 'string',
              enum: ['weekly', 'biweekly'],
            },
            count: {
              type: 'integer',
              minimum: 2,
              maximum: 12,
              description: 'Total sessions in the series (including the first).',
            },
            invoiceMode: {
              type: 'string',
              enum: ['per-session', 'bundled'],
              description: 'Default "per-session".',
            },
          },
          required: ['cadence', 'count'],
        },
      },
      required: ['serviceSlug', 'startIso', 'client'],
    },
  },
];

// ─── Tool input shapes ──────────────────────────────────────────

interface SearchClientInput {
  query: string;
}

interface MatchServiceInput {
  description: string;
  modality?: 'online' | 'inPerson';
}

interface FindAvailabilityInput {
  date: string;
  serviceSlug: string;
  timePreference?: string;
}

interface DraftBookingInput {
  serviceSlug: string;
  startIso: string;
  sessionMode?: 'online' | 'inPerson';
  client: {
    id?: string;
    name: string;
    email?: string;
    phone?: string;
    country?: string;
    timezone?: string;
  };
  notes?: string;
  recurring?: {
    cadence: RecurrenceFrequency;
    count: number;
    invoiceMode?: 'per-session' | 'bundled';
  };
}

// ─── Tool executor dispatcher ────────────────────────────────────

export interface ToolExecutionResult {
  content: string; // JSON-stringified result or error message
  isError: boolean;
}

export async function executeTool(
  name: string,
  input: unknown,
): Promise<ToolExecutionResult> {
  try {
    switch (name) {
      case 'search_client':
        return ok(await execSearchClient(input as SearchClientInput));
      case 'match_service':
        return ok(await execMatchService(input as MatchServiceInput));
      case 'find_availability':
        return ok(await execFindAvailability(input as FindAvailabilityInput));
      case 'draft_booking':
        return ok(await execDraftBooking(input as DraftBookingInput));
      default:
        return err(`Unknown tool: ${name}`);
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Tool execution failed';
    return err(message);
  }
}

function ok(data: unknown): ToolExecutionResult {
  return { content: JSON.stringify(data), isError: false };
}

function err(message: string): ToolExecutionResult {
  return { content: JSON.stringify({ error: message }), isError: true };
}

// ─── search_client ───────────────────────────────────────────────

async function execSearchClient(input: SearchClientInput) {
  const q = (input.query ?? '').trim().toLowerCase();
  if (!q) return { matches: [], note: 'Empty query' };

  // Try exact-email shortcut first (O(1) KV read)
  if (q.includes('@')) {
    const exact = await getCustomer(q);
    if (exact) {
      return { matches: [customerToMatch(exact, 1.0)] };
    }
  }

  // Otherwise scan the customer index (capped)
  const roster = await listCustomers(500);

  const scored: Array<{ customer: Customer; score: number }> = [];
  for (const c of roster) {
    const name = c.name.toLowerCase();
    const email = c.email.toLowerCase();
    const phone = (c.phone || '').toLowerCase();

    let score = 0;
    if (email === q) score += 1000;
    if (name === q) score += 800;
    if (name.startsWith(q)) score += 500;
    if (name.includes(q)) score += 100;
    if (email.startsWith(q)) score += 400;
    if (email.includes(q)) score += 80;
    if (phone.includes(q) && q.length >= 4) score += 200;

    // Token-level matching — e.g. "Sarah Ahmed" matches "ahmed sarah"
    const tokens = q.split(/\s+/).filter(t => t.length >= 2);
    let tokenHits = 0;
    for (const t of tokens) if (name.includes(t)) tokenHits += 1;
    if (tokens.length > 0 && tokenHits === tokens.length) score += 300;

    if (score > 0) scored.push({ customer: c, score });
  }

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 5);
  const topScore = top[0]?.score ?? 0;

  return {
    matches: top.map(s => customerToMatch(s.customer, normalizeScore(s.score, topScore))),
    totalFound: scored.length,
  };
}

function customerToMatch(c: Customer, confidence: number) {
  const country = COUNTRIES_BY_CODE[c.country?.toUpperCase() || ''];
  return {
    id: c.email, // email is the stable KV key
    name: c.name,
    email: c.email,
    phone: c.phone || null,
    country: c.country || null,
    timezone: country?.timezones[0] || null,
    totalInvoices: c.totalInvoices ?? 0,
    lastInvoiceAt: c.lastInvoiceAt || null,
    confidence,
  };
}

function normalizeScore(s: number, top: number): number {
  if (top === 0) return 0;
  return Math.min(1, Math.max(0, s / top));
}

// ─── match_service ───────────────────────────────────────────────

async function execMatchService(input: MatchServiceInput) {
  const description = (input.description ?? '').trim();
  if (!description) return { matches: [] };

  // Reuse the existing AI recommender (Haiku-powered, cached knowledge of catalog)
  const result = await recommendServices(description, 'en');

  const matches = result.recommendations.slice(0, 3).map(rec => {
    const service = services.find(s => s.slug === rec.serviceSlug);
    const tier = service
      ? PRICING_TIERS[service.pricingTierKey as PricingTierKey]
      : null;
    return {
      slug: rec.serviceSlug,
      name: rec.serviceName,
      category: rec.category,
      durationMinutes: tier?.durationMinutes ?? 50,
      isFree: tier?.anchors?.CAD?.online === 0,
      confidence: rec.confidence,
      reason: rec.reason,
    };
  });

  return { matches };
}

// ─── find_availability ───────────────────────────────────────────

async function execFindAvailability(input: FindAvailabilityInput) {
  const { date, serviceSlug, timePreference } = input;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) {
    return { error: 'date must be YYYY-MM-DD format' };
  }

  const service = services.find(s => s.slug === serviceSlug);
  if (!service) {
    return { error: `Unknown serviceSlug: ${serviceSlug}` };
  }
  const tier = PRICING_TIERS[service.pricingTierKey as PricingTierKey];
  const duration = tier?.durationMinutes ?? 50;

  // Resolve effective timezone for display
  const midday = new Date(`${date}T12:00:00Z`);
  const loc = await getEffectiveLocation(midday);

  const slots = await getAvailableSlots(date, duration);
  const allAvailable = slots.filter(s => s.available);

  // Apply time preference filter
  const filtered = filterByTimePreference(allAvailable, timePreference, loc.timezone);

  return {
    date,
    timezone: loc.timezone,
    locationLabel: loc.locationLabel,
    durationMinutes: duration,
    totalAvailable: allAvailable.length,
    slotsInPreference: filtered.length,
    slots: (filtered.length > 0 ? filtered : allAvailable).slice(0, 12).map(s => ({
      startIso: s.start,
      endIso: s.end,
      localTime: formatLocal(s.start, loc.timezone),
    })),
    note: filtered.length === 0 && allAvailable.length > 0
      ? `No slots match the time preference; returning all available slots for the day.`
      : undefined,
  };
}

function filterByTimePreference<T extends { start: string }>(
  slots: T[],
  pref: string | undefined,
  timezone: string,
) {
  if (!pref) return slots;
  const p = pref.toLowerCase().trim();

  // Specific HH:mm → match within 30 minutes either side
  const hm = /^(\d{1,2}):(\d{2})$/.exec(p);
  if (hm) {
    const [hh, mm] = [parseInt(hm[1], 10), parseInt(hm[2], 10)];
    const targetMinutes = hh * 60 + mm;
    return slots.filter(s => {
      const localHm = getLocalHourMinute(s.start, timezone);
      if (!localHm) return false;
      const local = localHm.hour * 60 + localHm.minute;
      return Math.abs(local - targetMinutes) <= 30;
    });
  }

  // Period
  const ranges: Record<string, [number, number]> = {
    morning: [9 * 60, 12 * 60],
    afternoon: [12 * 60, 17 * 60],
    evening: [17 * 60, 20 * 60],
  };
  const range = ranges[p];
  if (!range) return slots;

  return slots.filter(s => {
    const localHm = getLocalHourMinute(s.start, timezone);
    if (!localHm) return false;
    const local = localHm.hour * 60 + localHm.minute;
    return local >= range[0] && local < range[1];
  });
}

function getLocalHourMinute(iso: string, timezone: string): { hour: number; minute: number } | null {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date(iso));
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
    if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
    return { hour, minute };
  } catch {
    return null;
  }
}

function formatLocal(iso: string, timezone: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return iso;
  }
}

// ─── draft_booking (TERMINAL) ────────────────────────────────────

async function execDraftBooking(input: DraftBookingInput) {
  const { serviceSlug, startIso, client, notes, sessionMode, recurring } = input;

  if (!serviceSlug || !startIso || !client?.name) {
    return { error: 'serviceSlug, startIso, and client.name are required' };
  }

  const service = services.find(s => s.slug === serviceSlug);
  if (!service) return { error: `Unknown serviceSlug: ${serviceSlug}` };

  const tier = PRICING_TIERS[service.pricingTierKey as PricingTierKey];
  const durationMinutes = tier?.durationMinutes ?? 50;
  const startDate = new Date(startIso);
  if (Number.isNaN(startDate.getTime())) {
    return { error: `Invalid startIso: ${startIso}` };
  }
  const endDate = new Date(startDate.getTime() + durationMinutes * 60_000);

  // Resolve client fields — if client.id is given, server-authoritative record wins.
  // Never overwrite an existing client's email from AI-supplied input.
  let resolvedClient: {
    name: string;
    email: string;
    phone?: string;
    country: string;
    timezone: string;
  };

  if (client.id) {
    const existing = await getCustomer(client.id.toLowerCase());
    if (!existing) {
      return {
        error: `Client with id=${client.id} not found. Re-run search_client and pick a new id, or treat as new client (omit id, include email).`,
      };
    }
    const country = COUNTRIES_BY_CODE[existing.country?.toUpperCase() || 'CA'];
    resolvedClient = {
      name: existing.name,
      email: existing.email, // authoritative
      phone: existing.phone,
      country: existing.country || 'CA',
      timezone: country?.timezones[0] || 'America/Toronto',
    };
  } else {
    if (!client.email || !client.email.includes('@')) {
      return { error: 'New clients require a valid email (client.email).' };
    }
    const countryCode = (client.country || 'CA').toUpperCase();
    const country = COUNTRIES_BY_CODE[countryCode];
    resolvedClient = {
      name: client.name.trim(),
      email: client.email.trim().toLowerCase(),
      phone: client.phone?.trim(),
      country: countryCode,
      timezone: client.timezone || country?.timezones[0] || 'America/Toronto',
    };
  }

  const finalSessionMode: SessionMode = sessionMode ?? 'online';

  // ─── Recurring series path ────────────────────────────────
  if (recurring) {
    const slots = generateRecurringSlots(
      startDate,
      endDate,
      recurring.cadence,
      recurring.count,
    );
    try {
      const result = await createSeriesHold({
        serviceSlug,
        clientName: resolvedClient.name,
        clientEmail: resolvedClient.email,
        clientPhone: resolvedClient.phone,
        clientTimezone: resolvedClient.timezone,
        clientCountry: resolvedClient.country,
        sessionMode: finalSessionMode,
        notes,
        slots,
        frequency: recurring.cadence,
        invoiceMode: recurring.invoiceMode ?? 'per-session',
      });
      return {
        ok: true,
        kind: 'series',
        seriesId: result.seriesId,
        primaryBookingId: result.primaryBookingId,
        primaryDraftId: result.primaryDraftId,
        totalSessions: result.bookings.length,
        filled: {
          serviceSlug,
          serviceName: service.name,
          durationMinutes,
          startIso,
          endIso: endDate.toISOString(),
          sessionMode: finalSessionMode,
          client: resolvedClient,
          notes: notes ?? null,
          recurring,
          clientWasExisting: !!client.id,
        },
      };
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Series creation failed';
      return { error: `Could not create series: ${message}` };
    }
  }

  // ─── Single booking path ──────────────────────────────────
  try {
    const result = await createBookingHold({
      serviceSlug,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      clientName: resolvedClient.name,
      clientEmail: resolvedClient.email,
      clientPhone: resolvedClient.phone,
      clientTimezone: resolvedClient.timezone,
      clientCountry: resolvedClient.country,
      sessionMode: finalSessionMode,
      notes,
    });
    return {
      ok: true,
      kind: 'single',
      bookingId: result.bookingId,
      draftId: result.draftId,
      isFreeSession: result.isFreeSession,
      pendingReviewExpiresAt: result.pendingReviewExpiresAt,
      filled: {
        serviceSlug,
        serviceName: service.name,
        durationMinutes,
        startIso: startDate.toISOString(),
        endIso: endDate.toISOString(),
        sessionMode: finalSessionMode,
        client: resolvedClient,
        notes: notes ?? null,
        clientWasExisting: !!client.id,
      },
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Booking creation failed';
    return { error: `Could not create booking: ${message}` };
  }
}

function generateRecurringSlots(
  firstStart: Date,
  firstEnd: Date,
  cadence: RecurrenceFrequency,
  count: number,
): Array<{ startTime: string; endTime: string }> {
  const daysBetween = cadence === 'weekly' ? 7 : 14;
  const slots: Array<{ startTime: string; endTime: string }> = [];
  for (let i = 0; i < count; i += 1) {
    const offsetMs = i * daysBetween * 24 * 60 * 60 * 1000;
    slots.push({
      startTime: new Date(firstStart.getTime() + offsetMs).toISOString(),
      endTime: new Date(firstEnd.getTime() + offsetMs).toISOString(),
    });
  }
  return slots;
}
