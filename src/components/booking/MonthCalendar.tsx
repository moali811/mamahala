'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import type { DayAvailability } from '@/lib/booking/types';

interface MonthCalendarProps {
  duration: number;
  onSelectDate: (date: string) => void;
  selectedDate?: string;
  isRTL?: boolean;
}

const EN_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const AR_WEEKDAYS = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];

const EN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const AR_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

export default function MonthCalendar({
  duration,
  onSelectDate,
  selectedDate,
  isRTL = false,
}: MonthCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`,
  );
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [loading, setLoading] = useState(true);

  const todayStr = useMemo(
    () =>
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
    [],
  );

  useEffect(() => {
    setLoading(true);
    fetch(`/api/book/availability/month?month=${currentMonth}&duration=${duration}`)
      .then((r) => r.json())
      .then((data) => setAvailability(data.dates ?? []))
      .catch(() => setAvailability([]))
      .finally(() => setLoading(false));
  }, [currentMonth, duration]);

  const [year, month] = currentMonth.split('-').map(Number);
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const weekdays = isRTL ? AR_WEEKDAYS : EN_WEEKDAYS;
  const monthName = isRTL ? AR_MONTHS[month - 1] : EN_MONTHS[month - 1];

  const availMap = useMemo(() => {
    const m = new Map<string, DayAvailability>();
    for (const d of availability) m.set(d.date, d);
    return m;
  }, [availability]);

  const prevMonth = () => {
    const d = new Date(year, month - 2, 1);
    setCurrentMonth(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
    );
  };

  const nextMonth = () => {
    const d = new Date(year, month, 1);
    setCurrentMonth(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
    );
  };

  const canGoPrev = (() => {
    const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    return currentMonth > thisMonth;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-5 border border-[#F0ECE8]"
    >
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-1.5 rounded-lg hover:bg-[#F5F0EB] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {isRTL ? (
            <ChevronRight className="w-4 h-4 text-[#4A4A5C]" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-[#4A4A5C]" />
          )}
        </button>
        <span className="text-sm font-semibold text-[#4A4A5C]">
          {monthName} {year}
        </span>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-[#F5F0EB] transition-colors"
        >
          {isRTL ? (
            <ChevronLeft className="w-4 h-4 text-[#4A4A5C]" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[#4A4A5C]" />
          )}
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-medium text-[#8E8E9F] py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-5 h-5 text-[#C8A97D] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9" />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${currentMonth}-${String(day).padStart(2, '0')}`;
            const avail = availMap.get(dateStr);
            const hasSlots = avail?.hasSlots && !avail.isBlocked;
            const isPast = dateStr < todayStr;
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;

            return (
              <button
                key={dateStr}
                onClick={() => hasSlots && !isPast && onSelectDate(dateStr)}
                disabled={!hasSlots || isPast}
                className={`
                  h-9 rounded-lg text-sm font-medium transition-all relative
                  ${isSelected
                    ? 'bg-[#7A3B5E] text-white shadow-sm'
                    : hasSlots && !isPast
                      ? 'bg-[#7A3B5E]/5 text-[#7A3B5E] hover:bg-[#7A3B5E]/15 cursor-pointer'
                      : 'text-[#C0C0C0] cursor-not-allowed'
                  }
                  ${isToday && !isSelected ? 'ring-1 ring-[#C8A97D]' : ''}
                `}
              >
                {day}
                {hasSlots && !isPast && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#3B8A6E]" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#F0ECE8]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7A3B5E]/10 ring-1 ring-[#7A3B5E]/20" />
          <span className="text-[10px] text-[#8E8E9F]">
            {isRTL ? 'متاح' : 'Available'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full ring-1 ring-[#C8A97D]" />
          <span className="text-[10px] text-[#8E8E9F]">
            {isRTL ? 'اليوم' : 'Today'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
