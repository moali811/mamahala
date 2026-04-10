'use client';

/* ================================================================
   HeroDecorCluster — reusable decorative visual for hero sections.

   Renders a cluster of 3 stacked, lightly-rotated mini "preview cards"
   absolutely positioned to one side of the hero. Purely visual,
   desktop-only, RTL-aware, pointer-events-none.

   Originally created for the Events page hero, generalized here so
   any landing-page hero can opt in by passing 3 context-appropriate
   card descriptors.

   Usage:
   <HeroDecorCluster locale={locale} cards={[
     { icon: Compass, color: '#C8A97D', eyebrow: 'Summer Program',
       title: 'Balance Compass', accent: { type: 'bar', value: 42, label: '8 girls resonate' }},
     ...
   ]} />
   ================================================================ */

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

export interface HeroClusterCard {
  /** Lucide icon component (e.g. Compass) */
  icon: LucideIcon;
  /** Hex color for the icon, eyebrow text, and accent bar */
  color: string;
  /** Small uppercase eyebrow label above the title */
  eyebrowEn: string;
  eyebrowAr: string;
  /** Main title (kept short — 2-4 words) */
  titleEn: string;
  titleAr: string;
  /** Optional accent shown below title */
  accent?:
    | {
        type: 'bar';
        /** Progress bar fill 0-100 */
        value: number;
        /** Tiny caption beneath the bar */
        captionEn: string;
        captionAr: string;
      }
    | {
        type: 'caption';
        /** Single line of small grey text */
        textEn: string;
        textAr: string;
      };
}

interface Props {
  locale: string;
  /** Exactly 3 cards to render in back→front order */
  cards: [HeroClusterCard, HeroClusterCard, HeroClusterCard];
  /** Optional override for shadow tint (defaults to plum) */
  shadowTint?: string;
}

export default function HeroDecorCluster({ locale, cards, shadowTint = '122,59,94' }: Props) {
  const isRTL = locale === 'ar';
  const [back, middle, front] = cards;

  // Stack-position config — back card top-left, middle top-right, front low-center
  const cardConfigs = [
    {
      card: back,
      pos: 'absolute top-2 left-6',
      initial: { opacity: 0, y: 20, rotate: -8 },
      animate: { opacity: 1, y: 0, rotate: -6 },
      delay: 0.4,
      bg: 'bg-white/80',
      shadowAlpha: '0.08',
    },
    {
      card: middle,
      pos: 'absolute top-16 right-0',
      initial: { opacity: 0, y: 20, rotate: 6 },
      animate: { opacity: 1, y: 0, rotate: 4 },
      delay: 0.55,
      bg: 'bg-white/90',
      shadowAlpha: '0.1',
    },
    {
      card: front,
      pos: 'absolute top-[140px] left-4',
      initial: { opacity: 0, y: 20, rotate: -3 },
      animate: { opacity: 1, y: 0, rotate: -2 },
      delay: 0.7,
      bg: 'bg-white',
      shadowAlpha: '0.12',
    },
  ];

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none z-0 ${
        isRTL ? 'left-[8%]' : 'right-[8%]'
      }`}
      aria-hidden="true"
    >
      <div className="relative w-[280px] h-[320px]">
        {cardConfigs.map(({ card, pos, initial, animate, delay, bg, shadowAlpha }, i) => {
          const Icon = card.icon;
          const eyebrow = isRTL ? card.eyebrowAr : card.eyebrowEn;
          const title = isRTL ? card.titleAr : card.titleEn;

          return (
            <motion.div
              key={i}
              initial={initial}
              animate={animate}
              transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
              className={`${pos} w-[220px] rounded-2xl ${bg} backdrop-blur-sm border border-[#F3EFE8] p-4`}
              style={{
                transformOrigin: 'center',
                boxShadow: `0 ${i === 2 ? '12px 40px' : '8px 30px'} rgba(${shadowTint},${shadowAlpha})`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${card.color}1F` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: card.color }} />
                </div>
                <div
                  className="text-[9px] font-bold uppercase tracking-wider"
                  style={{ color: card.color }}
                >
                  {eyebrow}
                </div>
              </div>
              <div className="text-[11px] font-semibold text-[#2D2A33] leading-tight mb-2">
                {title}
              </div>

              {card.accent?.type === 'bar' && (
                <>
                  <div className="h-1 bg-[#F3EFE8] rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(Math.max(card.accent.value, 0), 100)}%`,
                        background: `linear-gradient(to right, ${card.color}, ${card.color}CC)`,
                      }}
                    />
                  </div>
                  <div className="text-[9px] text-[#8E8E9F]">
                    {isRTL ? card.accent.captionAr : card.accent.captionEn}
                  </div>
                </>
              )}

              {card.accent?.type === 'caption' && (
                <div className="text-[9px] text-[#8E8E9F] leading-relaxed">
                  {isRTL ? card.accent.textAr : card.accent.textEn}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
