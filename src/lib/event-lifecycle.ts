/* ================================================================
   Event Lifecycle Computer
   ================================================================
   Pure function that computes an event's lifecycle state from its
   data + pulse count. No manual state management — every render
   computes the correct state automatically.
   ================================================================ */

import type { SmartEvent, EventLifecycle, EventLifecycleState } from '@/types';

/** Pulse thresholds that drive concept → gauging transition */
const GAUGING_THRESHOLD = 25;

/** Capacity ratio below which "almost-full" kicks in */
const ALMOST_FULL_RATIO = 0.2;

/** Days after completion before archiving */
const ARCHIVE_DAYS = 30;

/**
 * Compute the lifecycle state for a single event.
 * This is the single source of truth for how an event renders.
 */
export function computeLifecycle(
  event: SmartEvent,
  pulseCount: number = 0,
  now: Date = new Date(),
): EventLifecycle {
  const today = toDateStr(now);
  const state = computeState(event, pulseCount, now, today);

  return {
    state,
    section: getSection(state),
    urgency: getUrgency(state, event),
    ...getBadge(state, event, pulseCount),
  };
}

function computeState(
  event: SmartEvent,
  pulseCount: number,
  now: Date,
  today: string,
): EventLifecycleState {
  // Past event?
  if (event.date < today && !event.dateTBD) {
    const eventDate = new Date(event.date + 'T23:59:59');
    const daysSince = Math.floor((now.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSince >= ARCHIVE_DAYS ? 'archived' : 'completed';
  }

  // Registration explicitly closed → treat as completed-like
  if (event.registrationStatus === 'closed' && !event.dateTBD) {
    return 'completed';
  }

  // Currently live? (same day + within time window)
  if (event.date === today && !event.dateTBD && event.startTime && event.endTime) {
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const [startH, startM] = event.startTime.split(':').map(Number);
    const [endH, endM] = event.endTime.split(':').map(Number);
    const startMin = startH * 60 + startM;
    const endMin = endH * 60 + endM;
    if (nowMinutes >= startMin - 15 && nowMinutes <= endMin) {
      return 'live';
    }
  }

  // Date TBD → concept or gauging based on pulse
  if (event.dateTBD) {
    return pulseCount >= GAUGING_THRESHOLD ? 'gauging' : 'concept';
  }

  // Date is set → check registration and capacity
  if (event.registrationStatus === 'waitlist') return 'sold-out';
  if (event.spotsRemaining != null && event.spotsRemaining <= 0) return 'sold-out';

  if (
    event.spotsRemaining != null &&
    event.capacity != null &&
    event.capacity > 0 &&
    event.spotsRemaining / event.capacity <= ALMOST_FULL_RATIO
  ) {
    return 'almost-full';
  }

  if (event.registrationStatus === 'open') return 'registration-open';

  return 'scheduled';
}

function getSection(state: EventLifecycleState): 'upcoming' | 'pulse' | 'past' {
  switch (state) {
    case 'concept':
    case 'gauging':
      return 'pulse';
    case 'completed':
    case 'archived':
      return 'past';
    default:
      return 'upcoming';
  }
}

function getUrgency(state: EventLifecycleState, event: SmartEvent): 'none' | 'low' | 'medium' | 'high' {
  if (state === 'almost-full' || state === 'sold-out') return 'high';
  if (state === 'live') return 'high';

  // Check early bird deadline proximity
  if (event.earlyBirdDeadline) {
    const today = new Date();
    const deadline = new Date(event.earlyBirdDeadline + 'T23:59:59');
    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 3 && daysLeft >= 0) return 'high';
    if (daysLeft <= 7 && daysLeft >= 0) return 'medium';
  }

  // Check event proximity
  if (!event.dateTBD) {
    const eventDate = new Date(event.date + 'T00:00:00');
    const daysUntil = Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntil <= 3) return 'high';
    if (daysUntil <= 7) return 'medium';
  }

  if (state === 'gauging') return 'low';

  return 'none';
}

function getBadge(
  state: EventLifecycleState,
  event: SmartEvent,
  pulseCount: number,
): { badgeLabelEn?: string; badgeLabelAr?: string } {
  switch (state) {
    case 'gauging':
      return {
        badgeLabelEn: `${pulseCount} voices — gaining momentum`,
        badgeLabelAr: `${pulseCount} صوتًا — زخمٌ متصاعد`,
      };
    case 'live':
      return { badgeLabelEn: 'Happening Now', badgeLabelAr: 'يحدثُ الآن' };
    case 'almost-full':
      return {
        badgeLabelEn: `${event.spotsRemaining} spots left`,
        badgeLabelAr: `${event.spotsRemaining} أماكنَ متبقّية`,
      };
    case 'sold-out':
      return { badgeLabelEn: 'Waitlist', badgeLabelAr: 'قائمةُ الانتظار' };
    default: {
      // Check early bird
      if (event.earlyBirdDeadline && !event.dateTBD) {
        const daysLeft = Math.ceil(
          (new Date(event.earlyBirdDeadline + 'T23:59:59').getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        );
        if (daysLeft >= 0 && daysLeft <= 7) {
          return {
            badgeLabelEn: `Early bird ends in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`,
            badgeLabelAr: `ينتهي السّعرُ المبكّرُ خلالَ ${daysLeft} ${daysLeft === 1 ? 'يوم' : 'أيّام'}`,
          };
        }
      }
      // Check event proximity
      if (!event.dateTBD) {
        const daysUntil = Math.ceil(
          (new Date(event.date + 'T00:00:00').getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        );
        if (daysUntil <= 5 && daysUntil >= 0) {
          return {
            badgeLabelEn: `Starts in ${daysUntil} day${daysUntil === 1 ? '' : 's'}`,
            badgeLabelAr: `يبدأُ خلالَ ${daysUntil} ${daysUntil === 1 ? 'يوم' : 'أيّام'}`,
          };
        }
      }
      return {};
    }
  }
}

/** Helper: date → 'YYYY-MM-DD' */
function toDateStr(d: Date): string {
  return d.toISOString().split('T')[0];
}

/**
 * Categorize a list of events into lifecycle sections.
 * Returns events sorted within each section.
 */
export function categorizeEvents(
  events: SmartEvent[],
  pulseCounts: Record<string, number>,
): {
  upcoming: Array<SmartEvent & { lifecycle: EventLifecycle }>;
  pulse: Array<SmartEvent & { lifecycle: EventLifecycle }>;
  past: Array<SmartEvent & { lifecycle: EventLifecycle }>;
} {
  const now = new Date();
  const upcoming: Array<SmartEvent & { lifecycle: EventLifecycle }> = [];
  const pulse: Array<SmartEvent & { lifecycle: EventLifecycle }> = [];
  const past: Array<SmartEvent & { lifecycle: EventLifecycle }> = [];

  for (const event of events) {
    const lifecycle = computeLifecycle(event, pulseCounts[event.slug] || 0, now);
    const enriched = { ...event, lifecycle };

    switch (lifecycle.section) {
      case 'upcoming':
        upcoming.push(enriched);
        break;
      case 'pulse':
        pulse.push(enriched);
        break;
      case 'past':
        past.push(enriched);
        break;
    }
  }

  // Sort upcoming by date (soonest first), pulse by pulse count (highest first), past by date (most recent first)
  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  pulse.sort((a, b) => (pulseCounts[b.slug] || 0) - (pulseCounts[a.slug] || 0));
  past.sort((a, b) => b.date.localeCompare(a.date));

  return { upcoming, pulse, past };
}
