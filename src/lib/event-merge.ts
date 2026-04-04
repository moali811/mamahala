/* ================================================================
   Event Merge System
   ================================================================
   Merges static events from events.ts with KV overrides so admin
   can change any field without code deployments.

   Priority: KV override > static data
   ================================================================ */

import type { SmartEvent } from '@/types';
import { events as staticEvents } from '@/data/events';

/**
 * Merge a single static event with its KV overrides.
 * KV overrides are Partial<SmartEvent> stored at `event:{slug}:overrides`.
 */
export function mergeEventOverrides(
  event: SmartEvent,
  overrides: Partial<SmartEvent> | null | undefined,
): SmartEvent {
  if (!overrides || Object.keys(overrides).length === 0) return event;
  return { ...event, ...overrides };
}

/**
 * Get all events (static + custom KV events), with overrides applied.
 * Called server-side in API routes and page data fetching.
 *
 * @param kvOverrides - Map of slug → Partial<SmartEvent> from KV
 * @param kvCustomEvents - Custom events created entirely in KV
 * @param hiddenSlugs - Static event slugs hidden by admin
 */
export function getAllMergedEvents(
  kvOverrides: Record<string, Partial<SmartEvent>>,
  kvCustomEvents: SmartEvent[] = [],
  hiddenSlugs: string[] = [],
): SmartEvent[] {
  const hiddenSet = new Set(hiddenSlugs);

  // Static events with overrides applied, excluding hidden
  const mergedStatic = staticEvents
    .filter((e) => !hiddenSet.has(e.slug))
    .map((e) => mergeEventOverrides(e, kvOverrides[e.slug]));

  // Custom KV events (already fully defined, no merge needed)
  return [...mergedStatic, ...kvCustomEvents];
}
