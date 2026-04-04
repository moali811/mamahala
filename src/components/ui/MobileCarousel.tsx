'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  children: React.ReactNode[];
  /** Desktop grid classes (e.g., "sm:grid-cols-2 lg:grid-cols-3") */
  desktopGrid?: string;
  /** Mobile card width (default: "85vw") */
  mobileWidth?: string;
  /** Gap size in px (default: 24 = gap-6) */
  gap?: number;
  /** Show dots indicator (default: true) */
  showDots?: boolean;
  /** Show desktop arrows (default: false — carousel is mobile-only by default) */
  desktopCarousel?: boolean;
  /** Additional className for the container */
  className?: string;
}

/**
 * Mobile-first swipeable carousel that becomes a grid on desktop.
 * If desktopCarousel=true, shows carousel on all screen sizes.
 */
export default function MobileCarousel({
  children,
  desktopGrid = 'sm:grid-cols-2 lg:grid-cols-3',
  mobileWidth = '85vw',
  gap = 24,
  showDots = true,
  desktopCarousel = false,
  className = '',
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('[data-carousel-item]') as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(idx, children.length - 1));
  }, [children.length, gap]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateIndex);
  }, [updateIndex]);

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('[data-carousel-item]');
    if (cards[idx]) {
      (cards[idx] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  if (children.length === 0) return null;

  return (
    <div className={className}>
      {/* Desktop: grid layout */}
      {!desktopCarousel && (
        <div className={`hidden sm:grid ${desktopGrid}`} style={{ gap: `${gap}px` }}>
          {children}
        </div>
      )}

      {/* Mobile (or always if desktopCarousel): swipeable */}
      <div className={desktopCarousel ? '' : 'sm:hidden'}>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
          style={{ gap: `${gap}px`, scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {children.map((child, i) => (
            <div
              key={i}
              data-carousel-item
              className="flex-shrink-0 snap-start"
              style={{ width: desktopCarousel ? undefined : mobileWidth, minWidth: desktopCarousel ? undefined : mobileWidth }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Dots */}
        {showDots && children.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-2">
            {children.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-6 h-2 bg-[#7A3B5E]'
                    : 'w-2 h-2 bg-[#7A3B5E]/20 hover:bg-[#7A3B5E]/40'
                }`}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
