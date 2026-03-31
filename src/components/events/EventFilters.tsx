'use client';

import { motion } from 'framer-motion';
import type { EventType } from '@/types';
import { getEventTypeLabel } from '@/data/events';

interface Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  availableTypes: EventType[];
  locale: string;
}

export default function EventFilters({ activeFilter, onFilterChange, availableTypes, locale }: Props) {
  const isRTL = locale === 'ar';
  const allLabel = isRTL ? 'الكل' : 'All';

  const filters = [
    { key: 'all', label: allLabel },
    ...availableTypes.map((type) => ({
      key: type,
      label: getEventTypeLabel(type, isRTL),
    })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ key, label }) => {
        const isActive = activeFilter === key;
        return (
          <motion.button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'bg-[#7A3B5E] text-white shadow-sm'
                : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:border-[#C4878A]/30 hover:text-[#7A3B5E]'
            }`}
            whileTap={{ scale: 0.97 }}
          >
            {label}
          </motion.button>
        );
      })}
    </div>
  );
}
