'use client';

import { Flame, Clock, Sparkles, Zap } from 'lucide-react';
import type { EventLifecycle } from '@/types';

interface Props {
  lifecycle: EventLifecycle;
  locale: string;
}

const urgencyColors = {
  none: '',
  low: 'bg-[#C8A97D]/10 text-[#C8A97D] border-[#C8A97D]/20',
  medium: 'bg-[#D4836A]/10 text-[#D4836A] border-[#D4836A]/20',
  high: 'bg-[#C4878A]/15 text-[#7A3B5E] border-[#C4878A]/30',
};

const stateIcons: Partial<Record<string, React.ReactNode>> = {
  live: <Zap className="w-3 h-3" />,
  'almost-full': <Flame className="w-3 h-3" />,
  'sold-out': <Clock className="w-3 h-3" />,
  gauging: <Sparkles className="w-3 h-3" />,
};

export default function EventUrgencyBadge({ lifecycle, locale }: Props) {
  const isRTL = locale === 'ar';
  const label = isRTL ? lifecycle.badgeLabelAr : lifecycle.badgeLabelEn;

  if (!label || lifecycle.urgency === 'none') return null;

  const icon = stateIcons[lifecycle.state];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${urgencyColors[lifecycle.urgency]} ${
        lifecycle.state === 'live' ? 'animate-pulse' : ''
      }`}
    >
      {icon}
      {label}
    </span>
  );
}
