'use client';

import type { SmartEvent, EventLifecycle } from '@/types';
import EventCard from './EventCard';
import PulseCard from './PulseCard';
import PastEventCard from './PastEventCard';
import EventUrgencyBadge from './EventUrgencyBadge';

interface Props {
  event: SmartEvent & { lifecycle: EventLifecycle };
  locale: string;
  pulseCount: number;
  onResonate: (slug: string) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

/**
 * Renders the correct card component based on event lifecycle state.
 * This is the single entry point for rendering any event on the page.
 */
export default function LifecycleCard({
  event,
  locale,
  pulseCount,
  onResonate,
  isExpanded,
  onToggleExpand,
}: Props) {
  const { lifecycle } = event;

  switch (lifecycle.section) {
    case 'pulse':
      return (
        <PulseCard
          event={event}
          locale={locale}
          pulseCount={pulseCount}
          onResonate={onResonate}
        />
      );

    case 'past':
      return <PastEventCard event={event} locale={locale} />;

    case 'upcoming':
    default:
      return (
        <div className="relative">
          {/* Urgency badge overlay */}
          {lifecycle.badgeLabelEn && lifecycle.urgency !== 'none' && (
            <div className="absolute top-4 right-4 z-10">
              <EventUrgencyBadge lifecycle={lifecycle} locale={locale} />
            </div>
          )}
          <EventCard
            event={event}
            locale={locale}
            isExpanded={isExpanded}
            onToggleExpand={onToggleExpand}
          />
        </div>
      );
  }
}
