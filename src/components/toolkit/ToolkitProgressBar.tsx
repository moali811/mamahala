'use client';

/* ================================================================
   ToolkitProgressBar — visual journey timeline showing which
   sections have been completed, which is active, and which remain.
   ================================================================ */

import { motion } from 'framer-motion';
import { t } from '@/lib/academy-helpers';

interface Section {
  id: string;
  titleEn: string;
  titleAr: string;
  color: string;
}

interface Props {
  sections: Section[];
  activeIndex: number;
  isRTL: boolean;
}

export default function ToolkitProgressBar({
  sections,
  activeIndex,
  isRTL,
}: Props) {
  const total = sections.length;
  if (total === 0) return null;

  /* Fraction of the connecting line that should be filled */
  const fillFraction = total > 1 ? activeIndex / (total - 1) : 1;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6"
      role="progressbar"
      aria-valuenow={activeIndex + 1}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      <div className="relative flex items-start justify-between">
        {/* ── Connecting line (background) ───────────────── */}
        <div className="absolute top-3 inset-x-0 mx-6 h-0.5 bg-[#F3EFE8]" aria-hidden="true" />

        {/* ── Connecting line (filled) ───────────────────── */}
        <motion.div
          className="absolute top-3 h-0.5 rounded-full"
          style={{
            left: isRTL ? 'auto' : '1.5rem',
            right: isRTL ? '1.5rem' : 'auto',
            backgroundColor: sections[activeIndex]?.color ?? '#7A3B5E',
            transformOrigin: isRTL ? 'right' : 'left',
          }}
          initial={false}
          animate={{
            width: `calc((100% - 3rem) * ${fillFraction})`,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        {/* ── Dots + labels ──────────────────────────────── */}
        {sections.map((section, i) => {
          const isCompleted = i < activeIndex;
          const isActive = i === activeIndex;
          const isFuture = i > activeIndex;
          const dotColor = isFuture ? '#D1CFC9' : section.color;
          const label = t(section.titleEn, section.titleAr, isRTL);

          return (
            <div
              key={section.id}
              className="relative z-10 flex flex-col items-center flex-1"
            >
              {/* Dot */}
              <motion.div
                className="flex items-center justify-center rounded-full border-2"
                style={{
                  borderColor: dotColor,
                  backgroundColor: isCompleted || isActive ? dotColor : '#fff',
                  width: isActive ? 28 : 24,
                  height: isActive ? 28 : 24,
                }}
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.9,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {isCompleted && (
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 6.5L5 9L9.5 3.5" />
                  </svg>
                )}
                {isActive && (
                  <span className="block w-2 h-2 rounded-full bg-white" />
                )}
              </motion.div>

              {/* Label — always visible on desktop, only active on mobile */}
              <span
                className={`mt-2 text-[11px] sm:text-xs text-center leading-tight max-w-[80px] transition-opacity duration-200 ${
                  isActive
                    ? 'font-semibold text-[#2D2A33] opacity-100'
                    : 'font-normal text-[#4A4A5C] opacity-0 sm:opacity-70'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
