'use client';

/* ================================================================
   ToolkitNav — sticky horizontal section tab navigation.
   Scrollable pill tabs that indicate the active section.
   ================================================================ */

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { t } from '@/lib/academy-helpers';

interface Section {
  id: string;
  titleEn: string;
  titleAr: string;
  color: string;
  iconName?: string;
}

interface Props {
  sections: Section[];
  activeIndex: number;
  onSelect: (index: number) => void;
  isRTL: boolean;
  color: string;
}

export default function ToolkitNav({
  sections,
  activeIndex,
  onSelect,
  isRTL,
  color,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Scroll active tab into view when it changes */
  useEffect(() => {
    const el = tabRefs.current[activeIndex];
    if (el && scrollRef.current) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  return (
    <nav
      dir={isRTL ? 'rtl' : 'ltr'}
      className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-[#F3EFE8]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollRef}
          className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {sections.map((section, i) => {
            const isActive = i === activeIndex;
            const label = t(section.titleEn, section.titleAr, isRTL);

            return (
              <button
                key={section.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                onClick={() => onSelect(i)}
                className="relative flex-shrink-0 snap-center rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  color: isActive ? '#fff' : '#4A4A5C',
                }}
                aria-current={isActive ? 'true' : undefined}
              >
                {/* Animated background pill */}
                {isActive && (
                  <motion.span
                    layoutId="toolkit-nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: color }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Label */}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
