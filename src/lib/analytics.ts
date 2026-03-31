/**
 * Analytics tracking layer using Vercel KV
 * Tracks: toolkit downloads, newsletter signups, page events
 * Falls back to console logging if KV is not configured
 */

import { kv } from '@vercel/kv';

export type EventType = 'toolkit_download' | 'newsletter_signup' | 'booking_visit' | 'contact_form' | 'page_view' | 'service_detail_view' | 'event_registration';

export interface AnalyticsEvent {
  type: EventType;
  email?: string;
  toolkitId?: string;
  locale?: string;
  source?: string;
  timestamp: string;
  date: string; // YYYY-MM-DD for daily aggregation
}

export interface LeadRecord {
  email: string;
  firstSeen: string;
  lastSeen: string;
  events: { type: EventType; toolkitId?: string; timestamp: string }[];
  locale?: string;
  source?: string;
}

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

/**
 * Track an analytics event
 */
export async function trackEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'date'>) {
  const now = new Date();
  const timestamp = now.toISOString();
  const date = timestamp.split('T')[0]; // YYYY-MM-DD

  const fullEvent: AnalyticsEvent = { ...event, timestamp, date };

  console.log(`[Analytics] ${event.type}`, event.email || '', event.toolkitId || '');

  if (!KV_AVAILABLE) {
    console.log('[Analytics] KV not configured — event logged to console only');
    return;
  }

  try {
    // 1. Store event in time-sorted list
    await kv.lpush('events:all', JSON.stringify(fullEvent));

    // 2. Increment daily counter
    await kv.hincrby(`stats:daily:${date}`, event.type, 1);

    // 3. Increment total counter
    await kv.hincrby('stats:totals', event.type, 1);

    // 4. If toolkit download, track toolkit-specific stats
    if (event.type === 'toolkit_download' && event.toolkitId) {
      await kv.hincrby('stats:toolkits', event.toolkitId, 1);
    }

    // 5. If email provided, upsert lead record
    if (event.email) {
      const leadKey = `lead:${event.email.toLowerCase()}`;
      const existing = await kv.get<LeadRecord>(leadKey);

      if (existing) {
        existing.lastSeen = timestamp;
        existing.events.push({
          type: event.type,
          toolkitId: event.toolkitId,
          timestamp,
        });
        await kv.set(leadKey, existing);
      } else {
        const lead: LeadRecord = {
          email: event.email.toLowerCase(),
          firstSeen: timestamp,
          lastSeen: timestamp,
          events: [{
            type: event.type,
            toolkitId: event.toolkitId,
            timestamp,
          }],
          locale: event.locale,
          source: event.source,
        };
        await kv.set(leadKey, lead);
        // Add to email set for enumeration
        await kv.sadd('leads:emails', event.email.toLowerCase());
      }
    }
  } catch (error) {
    console.error('[Analytics] KV error:', error);
  }
}

/**
 * Get dashboard stats
 */
export async function getDashboardStats() {
  if (!KV_AVAILABLE) {
    return {
      totals: { toolkit_download: 0, newsletter_signup: 0, booking_visit: 0, contact_form: 0, page_view: 0, service_detail_view: 0 },
      toolkits: {},
      daily: [],
      totalLeads: 0,
      recentEvents: [],
    };
  }

  try {
    // Total counters
    const totals = await kv.hgetall<Record<EventType, number>>('stats:totals') || {};

    // Toolkit breakdown
    const toolkits = await kv.hgetall<Record<string, number>>('stats:toolkits') || {};

    // Daily stats for last 30 days
    const daily: { date: string; stats: Record<string, number> }[] = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayStats = await kv.hgetall<Record<string, number>>(`stats:daily:${dateStr}`) || {};
      daily.push({ date: dateStr, stats: dayStats });
    }

    // Total leads count
    const totalLeads = await kv.scard('leads:emails') || 0;

    // Recent events (last 50)
    const recentRaw = await kv.lrange('events:all', 0, 49) || [];
    const recentEvents = recentRaw.map((e: string | AnalyticsEvent) =>
      typeof e === 'string' ? JSON.parse(e) : e
    );

    return { totals, toolkits, daily, totalLeads, recentEvents };
  } catch (error) {
    console.error('[Analytics] getDashboardStats error:', error);
    return {
      totals: { toolkit_download: 0, newsletter_signup: 0, booking_visit: 0, contact_form: 0, page_view: 0, service_detail_view: 0 },
      toolkits: {},
      daily: [],
      totalLeads: 0,
      recentEvents: [],
    };
  }
}

/**
 * Get all leads (for export)
 */
export async function getAllLeads(): Promise<LeadRecord[]> {
  if (!KV_AVAILABLE) return [];

  try {
    const emails = await kv.smembers('leads:emails') || [];
    const leads: LeadRecord[] = [];

    for (const email of emails) {
      const lead = await kv.get<LeadRecord>(`lead:${email}`);
      if (lead) leads.push(lead);
    }

    // Sort by most recent first
    leads.sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());
    return leads;
  } catch (error) {
    console.error('[Analytics] getAllLeads error:', error);
    return [];
  }
}
