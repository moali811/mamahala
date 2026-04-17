'use client';

import { motion } from 'framer-motion';
import type { EventAudience } from '@/types';

interface Filters {
  audience: EventAudience | 'all';
  format: 'all' | 'online' | 'in-person' | 'hybrid';
  price: 'all' | 'free' | 'paid';
}

interface Props {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  locale: string;
  /** Pre-selected audience from visitor profile */
  suggestedAudience?: EventAudience;
}

/** Single accent color for all active states */
const ACTIVE_COLOR = '#7A3B5E';

const audienceLabels: Record<string, { en: string; ar: string }> = {
  all: { en: 'All', ar: 'الكلّ' },
  youth: { en: 'Youth', ar: 'الشّباب' },
  families: { en: 'Families', ar: 'العائلات' },
  adults: { en: 'Adults', ar: 'البالغون' },
  couples: { en: 'Couples', ar: 'الأزواج' },
  community: { en: 'Community', ar: 'المجتمع' },
};

const formatLabels: Record<string, { en: string; ar: string }> = {
  all: { en: 'Any Format', ar: 'أيُّ صيغة' },
  online: { en: 'Online', ar: 'عبر الإنترنت' },
  'in-person': { en: 'In Person', ar: 'حضوريّ' },
  hybrid: { en: 'Hybrid', ar: 'حضوريّ + عن بُعد' },
};

const priceLabels: Record<string, { en: string; ar: string }> = {
  all: { en: 'Any Price', ar: 'أيُّ سعر' },
  free: { en: 'Free', ar: 'مجّانيّ' },
  paid: { en: 'Paid', ar: 'مدفوع' },
};

function Pill({
  active,
  label,
  onClick,
  activeColor = '#7A3B5E',
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  activeColor?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
        active
          ? 'text-white shadow-sm'
          : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:border-[#C4878A]/30 hover:text-[#7A3B5E]'
      }`}
      style={active ? { backgroundColor: activeColor } : undefined}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.button>
  );
}

export default function EventFilters({ filters, onFiltersChange, locale }: Props) {
  const isRTL = locale === 'ar';

  const hasActiveFilter = filters.audience !== 'all' || filters.format !== 'all' || filters.price !== 'all';

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Object.entries(audienceLabels).map(([key, labels]) => (
        <Pill
          key={key}
          active={filters.audience === key}
          activeColor={ACTIVE_COLOR}
          label={isRTL ? labels.ar : labels.en}
          onClick={() => onFiltersChange({ ...filters, audience: key as Filters['audience'] })}
        />
      ))}
    </div>
  );
}

export type { Filters };
