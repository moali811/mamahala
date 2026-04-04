'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SmartEvent, EventLifecycle } from '@/types';
import PulseCard from './PulseCard';

interface Props {
  events: Array<SmartEvent & { lifecycle: EventLifecycle }>;
  pulseCounts: Record<string, number>;
  locale: string;
  onResonate: (slug: string) => void;
  expandedSlug: string | null;
  onToggleExpand: (slug: string) => void;
}

export default function PulseCarousel({
  events,
  pulseCounts,
  locale,
  onResonate,
  expandedSlug,
  onToggleExpand,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    // Determine active index from scroll position
    const cardWidth = el.querySelector('[data-pulse-card]')?.clientWidth || el.clientWidth;
    const gap = 24; // gap-6 = 24px
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(idx, events.length - 1));
  }, [events.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    // Re-check on resize
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollTo = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-pulse-card]')?.clientWidth || el.clientWidth * 0.85;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    el.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('[data-pulse-card]');
    if (cards[idx]) {
      (cards[idx] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  return (
    <div className="relative">
      {/* Arrow buttons — desktop only */}
      {canScrollLeft && (
        <button
          onClick={() => scrollTo('left')}
          className="hidden lg:flex absolute -left-5 top-1/3 z-10 w-10 h-10 rounded-full bg-white/90 border border-[#F3EFE8] shadow-md items-center justify-center text-[#7A3B5E] hover:bg-white hover:shadow-lg transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scrollTo('right')}
          className="hidden lg:flex absolute -right-5 top-1/3 z-10 w-10 h-10 rounded-full bg-white/90 border border-[#F3EFE8] shadow-md items-center justify-center text-[#7A3B5E] hover:bg-white hover:shadow-lg transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 lg:-mx-0 lg:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {events.map((event) => (
          <div
            key={event.slug}
            data-pulse-card
            className="flex-shrink-0 snap-start w-[85vw] sm:w-[420px] lg:w-[calc(50%-12px)]"
          >
            <PulseCard
              event={event}
              locale={locale}
              pulseCount={pulseCounts[event.slug] || 0}
              onResonate={onResonate}
              isExpanded={expandedSlug === event.slug}
              onToggleExpand={() => onToggleExpand(event.slug)}
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {events.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {events.map((event, idx) => (
            <button
              key={event.slug}
              onClick={() => scrollToIndex(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-6 h-2 bg-[#7A3B5E]'
                  : 'w-2 h-2 bg-[#7A3B5E]/20 hover:bg-[#7A3B5E]/40'
              }`}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
