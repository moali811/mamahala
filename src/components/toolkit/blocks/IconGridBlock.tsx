'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sun, Moon, Eye, Heart, Shield, BookOpen, PenLine, Clock,
  CheckCircle, Target, Sparkles, Lock, Brain, Flame, Compass, MessageCircle,
} from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { IconGridBlock } from '@/types/toolkit';
import type { ToolkitBlockContext } from '../ToolkitBlockRenderer';

/* ── Icon mapping ─────────────────────────────────────────────── */
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  sun: Sun,
  moon: Moon,
  eye: Eye,
  heart: Heart,
  shield: Shield,
  'book-open': BookOpen,
  'pen-line': PenLine,
  clock: Clock,
  'check-circle': CheckCircle,
  target: Target,
  sparkles: Sparkles,
  lock: Lock,
  brain: Brain,
  flame: Flame,
  compass: Compass,
  'message-circle': MessageCircle,
};

export default function IconGridBlockView({ block, ctx }: { block: IconGridBlock; ctx: ToolkitBlockContext }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isRTL = ctx.isRTL;
  const color = ctx.color;
  const title = block.titleEn ? t(block.titleEn, block.titleAr || '', isRTL) : null;
  const cols = block.columns || 3;

  return (
    <div ref={ref} dir={isRTL ? 'rtl' : 'ltr'}>
      {title && (
        <h3 className="text-lg font-semibold text-[#2D2A33] mb-4">{title}</h3>
      )}

      {/* Responsive grid via inline style for dynamic column count */}
      <style>{`
        .icon-grid-${block.id} { grid-template-columns: repeat(1, 1fr); }
        @media (min-width: 640px) {
          .icon-grid-${block.id} { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 768px) {
          .icon-grid-${block.id} { grid-template-columns: repeat(${cols}, 1fr); }
        }
      `}</style>
      <div className={`icon-grid-${block.id} grid gap-3`}>
        {block.items.map((item, i) => {
          const Icon = iconMap[item.iconName.toLowerCase()] || Heart;
          const label = t(item.labelEn, item.labelAr, isRTL);
          const desc = item.descEn ? t(item.descEn, item.descAr || '', isRTL) : null;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
              className="bg-white rounded-xl border border-[#F3EFE8] p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <div
                className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${color}18` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <p className="text-sm font-semibold text-[#2D2A33] mb-1">{label}</p>
              {desc && (
                <p className="text-xs text-[#8E8E9F] leading-relaxed">{desc}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
