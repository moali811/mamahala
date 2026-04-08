'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Users, Clock, MapPin, CheckCircle, Heart } from 'lucide-react';
import type { SmartEvent, EventType } from '@/types';
import { getFormattedDate, getEventTypeLabel } from '@/data/events';

interface Props {
  event: SmartEvent;
  locale: string;
}

const typeGradients: Record<EventType, string> = {
  workshop: 'from-[#C8A97D] to-[#E8D5B0]',           // Gold/amber
  webinar: 'from-[#7A3B5E] to-[#C4878A]',            // Plum/rose
  'community-gathering': 'from-[#3B8A6E] to-[#A8D4C0]', // Sage/teal
  retreat: 'from-[#5B8FA8] to-[#A8C8DC]',            // Blue/slate
  'support-group': 'from-[#C4878A] to-[#E8C0C8]',    // Warm rose
};

/**
 * Extracts attendance count from the event's highlight/description.
 * Looks for spelled-out numbers (eight, twelve, twenty-two…) or explicit digits.
 */
function extractAttendance(event: SmartEvent): number | null {
  const text = `${event.highlightEn || ''} ${event.descriptionEn || ''} ${event.longDescriptionEn || ''}`.toLowerCase();

  // Explicit digit match: "8 mothers", "22 participants", "over 30 families"
  const digitMatch = text.match(/(?:over|around|about)?\s*(\d{1,3})\s+(?:mothers|families|participants|attendees|teens|women|men|people)/i);
  if (digitMatch) return Number(digitMatch[1]);

  // Spelled-out number match (1-30) — check compound forms first so "twenty-two" isn't clipped as "two"
  const wordNumbers: Array<[string, number]> = [
    ['twenty-one', 21], ['twenty-two', 22], ['twenty-three', 23], ['twenty-four', 24],
    ['twenty-five', 25], ['twenty-six', 26], ['twenty-seven', 27], ['twenty-eight', 28],
    ['twenty-nine', 29], ['thirty', 30], ['twenty', 20], ['nineteen', 19], ['eighteen', 18],
    ['seventeen', 17], ['sixteen', 16], ['fifteen', 15], ['fourteen', 14], ['thirteen', 13],
    ['twelve', 12], ['eleven', 11], ['ten', 10], ['nine', 9], ['eight', 8], ['seven', 7],
    ['six', 6], ['five', 5], ['four', 4], ['three', 3], ['two', 2], ['one', 1],
  ];
  for (const [word, num] of wordNumbers) {
    // Use negative lookbehind/ahead for hyphens so "two" doesn't match inside "twenty-two"
    const regex = new RegExp(`(?<![-\\w])${word}\\s+(mothers|families|participants|attendees|teens|women|men|people)\\b`, 'i');
    if (regex.test(text)) return num;
  }
  return null;
}

function computeDurationMinutes(event: SmartEvent): number | null {
  if (!event.startTime || !event.endTime) return null;
  const [sh, sm] = event.startTime.split(':').map(Number);
  const [eh, em] = event.endTime.split(':').map(Number);
  if (isNaN(sh) || isNaN(eh)) return null;
  return (eh * 60 + em) - (sh * 60 + sm);
}

function formatDuration(minutes: number | null, isRTL: boolean): string | null {
  if (minutes == null || minutes <= 0) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (isRTL) {
    if (h > 0 && m > 0) return `${h}س ${m}د`;
    if (h > 0) return `${h} ${h === 1 ? 'ساعة' : h === 2 ? 'ساعتان' : 'ساعات'}`;
    return `${m}د`;
  }
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

export default function PastEventCard({ event, locale }: Props) {
  const isRTL = locale === 'ar';
  const title = isRTL ? event.titleAr : event.titleEn;
  const highlight = isRTL ? event.highlightAr : event.highlightEn;
  const typeLabel = getEventTypeLabel(event.type, isRTL);
  const formattedDate = getFormattedDate(event, locale);

  const attendance = extractAttendance(event);
  const duration = formatDuration(computeDurationMinutes(event), isRTL);
  const locationLabel = event.locationType === 'online'
    ? (isRTL ? 'عبر الإنترنت' : 'Online')
    : event.locationType === 'in-person'
      ? (isRTL ? 'حُضوري' : 'In person')
      : (isRTL ? 'مُزْدَوِج' : 'Hybrid');

  return (
    <motion.article
      className="group relative bg-white rounded-xl border border-[#F3EFE8] overflow-hidden h-full flex flex-col"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient strip */}
      <div className={`h-2 bg-gradient-to-r ${typeGradients[event.type]}`} />

      {/* Completed corner ribbon */}
      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10`}>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3B8A6E]/10 text-[#3B8A6E] text-[9px] font-bold uppercase tracking-[0.12em]">
          <CheckCircle className="w-2.5 h-2.5" />
          {isRTL ? 'اِنْعَقَدَتْ' : 'Held'}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Type + date */}
        <div className="flex items-center gap-2 mb-3 text-[10px] uppercase tracking-[0.12em] text-[#8E8E9F]">
          <span className="font-semibold">{typeLabel}</span>
          <span className="text-[#D4B98E]">·</span>
          <span>{formattedDate}</span>
        </div>

        {/* Title */}
        <h4
          className="text-lg font-bold text-[#2D2A33] mb-3 line-clamp-2 group-hover:text-[#7A3B5E] transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h4>

        {/* Stats row — attendance · duration · location */}
        <div className="flex items-center gap-4 mb-3 text-[11px] text-[#6B6580]">
          {attendance != null && (
            <span className="inline-flex items-center gap-1">
              <Users className="w-3 h-3" />
              <strong className="text-[#2D2A33] tabular-nums">{attendance}</strong>{' '}
              {isRTL ? 'حَضَروا' : 'attended'}
            </span>
          )}
          {duration && (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {duration}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {locationLabel}
          </span>
        </div>

        {/* Highlight */}
        {highlight && (
          <p className="text-sm text-[#4A4A5C] leading-relaxed pt-3 border-t border-[#F3EFE8] italic">
            {highlight}
          </p>
        )}

        {/* Pulse origin — this event started as a community vote */}
        {event.pulseOriginVotes && (
          <div className="mt-3 pt-3 border-t border-dashed border-[#E8DFC9] flex items-center gap-2 text-[11px]">
            <Heart className="w-3 h-3 flex-shrink-0" fill="#7A3B5E" style={{ color: '#7A3B5E' }} />
            <span className="text-[#6B6580]">
              {isRTL
                ? (<>بَدَأَتْ كَطَلَبٍ مِنَ المُجْتَمَع — <strong className="text-[#7A3B5E] tabular-nums">{event.pulseOriginVotes}</strong>{' '}صَوْتاً طَلَبوها</>)
                : (<>Started as a community request — <strong className="text-[#7A3B5E] tabular-nums">{event.pulseOriginVotes}</strong> voices asked for it</>)}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
