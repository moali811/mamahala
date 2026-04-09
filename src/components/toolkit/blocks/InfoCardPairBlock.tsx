'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sun, Moon, Eye, Heart, Shield, BookOpen, PenLine, Clock,
  CheckCircle, Target, Sparkles, Lock, Brain, Flame, Compass, MessageCircle,
  AlertTriangle, Lightbulb, Users, Star, Zap, HandHeart, Smile, Frown,
} from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { InfoCardPairBlock } from '@/types/toolkit';
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
  'alert-triangle': AlertTriangle,
  lightbulb: Lightbulb,
  users: Users,
  star: Star,
  zap: Zap,
  'hand-heart': HandHeart,
  smile: Smile,
  frown: Frown,
};

/* ── Main Component ───────────────────────────────────────────── */
export default function InfoCardPairBlockView({ block, ctx }: { block: InfoCardPairBlock; ctx: ToolkitBlockContext }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isRTL = ctx.isRTL;
  const fallbackColor = ctx.color;

  return (
    <div ref={ref} dir={isRTL ? 'rtl' : 'ltr'} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {block.cards.map((card, i) => {
        const cardColor = card.color || fallbackColor;
        const Icon = card.icon ? (iconMap[card.icon.toLowerCase()] || Heart) : null;
        const title = t(card.titleEn, card.titleAr, isRTL);
        const body = t(card.bodyEn, card.bodyAr, isRTL);

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.4, ease: 'easeOut' }}
            className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden"
          >
            {/* Colored top border */}
            <div className="h-1 w-full" style={{ backgroundColor: cardColor }} />

            <div className="p-5">
              {/* Icon */}
              {Icon && (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${cardColor}14` }}
                >
                  <Icon className="w-5 h-5" style={{ color: cardColor }} />
                </div>
              )}

              {/* Title */}
              <h4 className="text-sm font-bold text-[#2D2A33] mb-2">{title}</h4>

              {/* Body */}
              <p className="text-sm text-[#4A4A5C] leading-relaxed">{body}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
