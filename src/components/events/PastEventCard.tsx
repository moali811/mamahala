'use client';

import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import type { SmartEvent, EventType } from '@/types';
import Badge from '@/components/ui/Badge';
import { getFormattedDate, getEventTypeLabel } from '@/data/events';

interface Props {
  event: SmartEvent;
  locale: string;
}

const typeGradients: Record<EventType, string> = {
  workshop: 'from-[#E8E0D0]/40 to-[#FAF5ED]',
  webinar: 'from-[#E8D5E0]/40 to-[#F8EEF3]',
  'community-gathering': 'from-[#C4878A]/10 to-[#FAF0EC]',
  retreat: 'from-[#D4836A]/10 to-[#FDF5F0]',
  'support-group': 'from-[#E8E4DE]/40 to-[#F8F5F0]',
};

export default function PastEventCard({ event, locale }: Props) {
  const isRTL = locale === 'ar';
  const title = isRTL ? event.titleAr : event.titleEn;
  const highlight = isRTL ? event.highlightAr : event.highlightEn;
  const typeLabel = getEventTypeLabel(event.type, isRTL);
  const formattedDate = getFormattedDate(event, locale);

  return (
    <motion.div
      className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden opacity-85 hover:opacity-100 transition-opacity duration-300"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient strip */}
      <div className={`h-2 bg-gradient-to-r ${typeGradients[event.type]}`} />

      <div className="p-5">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="neutral" size="sm">{typeLabel}</Badge>
        </div>

        {/* Title */}
        <h4
          className="text-lg font-bold text-[#2D2A33] mb-2 line-clamp-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h4>

        {/* Date */}
        <p className="text-sm text-[#8E8E9F] inline-flex items-center gap-1.5 mb-3">
          <CalendarDays className="w-3.5 h-3.5" /> {formattedDate}
        </p>

        {/* Highlight */}
        {highlight && (
          <p className="text-sm text-[#4A4A5C] leading-relaxed mt-3 pt-3 border-t border-[#F3EFE8]">
            {highlight}
          </p>
        )}
      </div>
    </motion.div>
  );
}
