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

/** Demographic color system — matches the Toolkits page pattern */
const demographicColors: Record<string, string> = {
  all: '#7A3B5E',        // plum (default)
  youth: '#C4878A',      // warm rose
  families: '#C8A97D',   // gold/sand
  adults: '#5A8B6F',     // sage
  couples: '#D4836A',    // terracotta
  community: '#7A3B5E',  // plum
};

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
    <div className="space-y-3">
      {/* Audience row — per-demographic colors on active */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] w-12 flex-shrink-0">
          {isRTL ? 'لِمَن' : 'For'}
        </span>
        {Object.entries(audienceLabels).map(([key, labels]) => (
          <Pill
            key={key}
            active={filters.audience === key}
            activeColor={demographicColors[key] || '#7A3B5E'}
            label={isRTL ? labels.ar : labels.en}
            onClick={() => onFiltersChange({ ...filters, audience: key as Filters['audience'] })}
          />
        ))}
      </div>

      {/* Format + Price row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E9F] w-12 flex-shrink-0">
          {isRTL ? 'كيف' : 'How'}
        </span>
        {Object.entries(formatLabels).map(([key, labels]) => (
          <Pill
            key={key}
            active={filters.format === key}
            label={isRTL ? labels.ar : labels.en}
            onClick={() => onFiltersChange({ ...filters, format: key as Filters['format'] })}
          />
        ))}
        <span className="text-[#E8E4DE] mx-1">|</span>
        {Object.entries(priceLabels).map(([key, labels]) => (
          <Pill
            key={key}
            active={filters.price === key}
            label={isRTL ? labels.ar : labels.en}
            onClick={() => onFiltersChange({ ...filters, price: key as Filters['price'] })}
          />
        ))}
      </div>

      {/* Clear button */}
      {hasActiveFilter && (
        <button
          type="button"
          onClick={() => onFiltersChange({ audience: 'all', format: 'all', price: 'all' })}
          className="text-xs text-[#C4878A] hover:text-[#7A3B5E] font-medium transition-colors"
        >
          {isRTL ? 'مسحُ الفلاتر' : 'Clear filters'}
        </button>
      )}
    </div>
  );
}

export type { Filters };
