'use client';

/* ================================================================
   DateTimePicker — Controlled date + slot picker.

   Powers two surfaces:
   - variant="standalone": Step 3 of the booking wizard (full split
     calendar/slots layout on desktop).
   - variant="inline":     Embedded inside Step 5's slot-conflict
     recovery flow (single-column compact layout, no headline,
     no timezone banner).

   The component is fully controlled — it owns no booking-flow state.
   The parent passes `durationMinutes` / `clientTimezone` / `initialDate`
   and receives the picked slot via `onSlotSelect`. Optional callbacks
   propagate provider timezone + in-person-enabled flags up to the
   parent (used by Step 4 to render mode tiles).
   ================================================================ */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock, Globe, Loader2 } from 'lucide-react';
import type { TimeSlot, DayAvailability } from '@/lib/booking/types';
import { scrollToElement } from '@/lib/scroll';

export interface DateTimePickerProps {
  durationMinutes: number;
  clientTimezone: string;
  /** YYYY-MM-DD; controls which day's slots are visible on first paint. */
  initialDate?: string;
  locale: 'en' | 'ar';
  isRTL: boolean;
  /** 'standalone' = full split layout (Step 3). 'inline' = compact (Step 5 recovery). */
  variant?: 'standalone' | 'inline';
  onSlotSelect: (slot: { date: string; start: string; end: string }) => void;
  onProviderTimezone?: (tz: string) => void;
  onInPersonEnabled?: (v: boolean) => void;
}

export default function DateTimePicker({
  durationMinutes,
  clientTimezone,
  initialDate,
  locale,
  isRTL,
  variant = 'standalone',
  onSlotSelect,
  onProviderTimezone,
  onInPersonEnabled,
}: DateTimePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (initialDate && /^\d{4}-\d{2}-\d{2}$/.test(initialDate)) {
      return initialDate.slice(0, 7);
    }
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [monthData, setMonthData] = useState<DayAvailability[]>([]);
  const [daySlots, setDaySlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState(initialDate || '');
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingDay, setLoadingDay] = useState(false);
  // Provider timezone comes from the availability API (admin-editable in KV).
  // Fallback to Toronto is only used for the very first render before the
  // month fetch resolves. Once the API responds, this updates to whatever
  // Dr. Hala has set in the admin Availability editor (e.g. 'Asia/Dubai').
  const [providerTimezone, setProviderTimezone] = useState<string>('America/Toronto');
  const slotsRef = useRef<HTMLDivElement>(null);
  const isInline = variant === 'inline';

  const hasDateSelected = !!selectedDate;

  // Fetch month availability — with auto-refresh on focus / visibility
  // / 60s poll so the calendar reflects bookings made on other devices
  // without a manual page reload. Loading spinner only shows on the
  // initial fetch; refreshes are silent so the user's view doesn't flicker.
  useEffect(() => {
    let cancelled = false;
    let lastRun = 0;
    let isInitial = true;

    const run = () => {
      if (document.hidden) return;
      const now = Date.now();
      if (now - lastRun < 5000) return;
      lastRun = now;
      if (isInitial) setLoadingMonth(true);
      fetch(`/api/book/availability/month?month=${currentMonth}&duration=${durationMinutes}`)
        .then(r => r.json())
        .then(data => {
          if (cancelled) return;
          setMonthData(data.dates ?? []);
          if (data.timezone) { setProviderTimezone(data.timezone); onProviderTimezone?.(data.timezone); }
        })
        .catch(() => { if (!cancelled && isInitial) setMonthData([]); })
        .finally(() => { if (!cancelled && isInitial) setLoadingMonth(false); isInitial = false; });
    };

    run();
    const onFocus = () => { run(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onFocus);
    const interval = setInterval(run, 60_000);
    return () => {
      cancelled = true;
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onFocus);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, durationMinutes]);

  // Fetch day slots when date selected — same auto-refresh pattern.
  useEffect(() => {
    if (!selectedDate) { setDaySlots([]); return; }
    let cancelled = false;
    let lastRun = 0;
    let isInitial = true;
    const tz = encodeURIComponent(clientTimezone);
    const url = `/api/book/availability?date=${selectedDate}&duration=${durationMinutes}&tz=${tz}`;

    const run = () => {
      if (document.hidden) return;
      const now = Date.now();
      if (now - lastRun < 5000) return;
      lastRun = now;
      if (isInitial) setLoadingDay(true);
      fetch(url)
        .then(r => r.json())
        .then(data => {
          if (cancelled) return;
          setDaySlots(data.slots ?? []);
          if (data.timezone) { setProviderTimezone(data.timezone); onProviderTimezone?.(data.timezone); }
          if (typeof data.inPersonEnabled === 'boolean') onInPersonEnabled?.(data.inPersonEnabled);
          // Scroll to slots on mobile only on the initial fetch — refreshes
          // shouldn't yank the page down while the user is reading.
          if (isInitial && slotsRef.current) void scrollToElement(slotsRef.current);
        })
        .catch(() => { if (!cancelled && isInitial) setDaySlots([]); })
        .finally(() => { if (!cancelled && isInitial) setLoadingDay(false); isInitial = false; });
    };

    run();
    const onFocus = () => { run(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onFocus);
    const interval = setInterval(run, 45_000);
    return () => {
      cancelled = true;
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onFocus);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, durationMinutes, clientTimezone]);

  const selectSlot = (slot: TimeSlot) => {
    onSlotSelect({ date: selectedDate, start: slot.start, end: slot.end });
  };

  const [year, monthNum] = currentMonth.split('-').map(Number);
  const daysInMonth = new Date(year, monthNum, 0).getDate();
  const firstDayOfWeek = new Date(year, monthNum - 1, 1).getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    const d = new Date(year, monthNum - 2, 1);
    setCurrentMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    setSelectedDate('');
  };
  const nextMonth = () => {
    const d = new Date(year, monthNum, 1);
    setCurrentMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    setSelectedDate('');
  };

  const dayNames = isRTL
    ? ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthLabel = new Date(year, monthNum - 1).toLocaleDateString(isRTL ? 'ar' : 'en-US', { month: 'long', year: 'numeric' });

  // Group available slots by period — in the CLIENT's local timezone,
  // not UTC. Historical bug: getUTCHours() put 9am Toronto slots into
  // "Afternoon" because 13:00 UTC >= 12, and 2pm Toronto into "Evening"
  // because 18:00 UTC >= 17. This made the labels (Morning/Afternoon/
  // Evening) not match the displayed times — exactly the calendar bug
  // Mo reported.
  const getLocalHour = (iso: string, tz: string): number => {
    try {
      const fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        hour12: false,
      });
      // Intl returns "0"-"23" — occasionally "24" for midnight, normalize.
      const h = parseInt(fmt.format(new Date(iso)), 10);
      return h === 24 ? 0 : h;
    } catch {
      return new Date(iso).getHours(); // fallback to browser-local
    }
  };

  // Detect when a slot crosses the day boundary in the client's timezone.
  // E.g. Dr. Hala's 11 PM Dubai = 12 AM Qostanay (next day).
  const getLocalDateStr = (iso: string, tz: string): string => {
    try {
      const fmt = new Intl.DateTimeFormat('en-CA', {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      return fmt.format(new Date(iso)); // returns YYYY-MM-DD
    } catch {
      return new Date(iso).toISOString().slice(0, 10);
    }
  };

  const availableSlots = daySlots.filter(s => s.available);

  // Separate same-day slots from cross-midnight (next-day) slots
  const sameDaySlots = availableSlots.filter(s => getLocalDateStr(s.start, clientTimezone) === selectedDate);
  const nextDaySlots = availableSlots.filter(s => getLocalDateStr(s.start, clientTimezone) !== selectedDate);

  const morningSlots = sameDaySlots.filter(s => getLocalHour(s.start, clientTimezone) < 12);
  const afternoonSlots = sameDaySlots.filter(s => {
    const h = getLocalHour(s.start, clientTimezone);
    return h >= 12 && h < 17;
  });
  const eveningSlots = sameDaySlots.filter(s => getLocalHour(s.start, clientTimezone) >= 17);

  const selectedDateLabel = selectedDate
    ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString(isRTL ? 'ar' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : '';

  // Timezone banner — only on standalone variant. Inline variant suppresses
  // it because the parent (recovery card) already explains context.
  const renderTimezoneBanner = () => {
    if (isInline) return null;
    const formatTZName = (tz: string) => tz.replace(/_/g, ' ');
    const getOffset = (tz: string): string => {
      try {
        const now = new Date();
        const fmt = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          timeZoneName: 'shortOffset',
        });
        const parts = fmt.formatToParts(now);
        const off = parts.find(p => p.type === 'timeZoneName')?.value || '';
        return off.replace('GMT', '').trim() || '±0';
      } catch {
        return '';
      }
    };
    const clientOffset = getOffset(clientTimezone);
    const providerOffset = getOffset(providerTimezone);
    const sameTz = clientTimezone === providerTimezone;
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center justify-center gap-2 text-xs text-[#8E8E9F]">
          <Globe className="w-3.5 h-3.5" />
          <span>
            {isRTL ? 'المنطقة الزمنية لديك' : 'Your time zone'}:{' '}
            <span className="font-medium text-[#4A4A5C]">
              {formatTZName(clientTimezone)}
            </span>
            {clientOffset && <span className="text-[#C0B8B0]"> (GMT{clientOffset})</span>}
          </span>
        </div>
        {!sameTz && (
          <div className="flex items-center justify-center gap-2 text-[10px] text-[#8E8E9F]">
            <span className="opacity-60">•</span>
            <span>
              {isRTL ? 'حاليًّا في' : 'Currently in'}{' '}
              <span className="font-medium text-[#4A4A5C]">
                {formatTZName(providerTimezone)}
              </span>
              {providerOffset && <span className="text-[#C0B8B0]"> (GMT{providerOffset})</span>}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={isInline ? 'space-y-4' : 'space-y-6'}>
      {renderTimezoneBanner()}

      {/* Layout: standalone uses split calendar/slots; inline stacks single-column */}
      <div className={isInline ? 'flex flex-col gap-4' : 'flex flex-col lg:flex-row lg:gap-6 lg:items-start'}>

        {/* Calendar */}
        <motion.div
          layout={!isInline}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={
            isInline
              ? 'w-full'
              : hasDateSelected
                ? 'lg:w-[420px] lg:shrink-0'
                : 'lg:w-full lg:max-w-[520px] lg:mx-auto'
          }
        >
          <motion.div layout={!isInline} className="bg-white rounded-2xl border border-[#F0ECE8] shadow-sm overflow-hidden">
            {/* Month Navigation */}
            <div className={`flex items-center justify-between bg-[#7A3B5E] ${isInline ? 'px-4 py-3' : 'px-5 py-4'}`}>
              <button onClick={prevMonth} className="p-2 rounded-full hover:bg-white/15 transition-colors">
                {isRTL ? <ChevronRight className="w-5 h-5 text-white/80" /> : <ChevronLeft className="w-5 h-5 text-white/80" />}
              </button>
              <h3 className={`font-semibold text-white ${isInline ? 'text-sm' : 'text-[15px]'}`}>{monthLabel}</h3>
              <button onClick={nextMonth} className="p-2 rounded-full hover:bg-white/15 transition-colors">
                {isRTL ? <ChevronLeft className="w-5 h-5 text-white/80" /> : <ChevronRight className="w-5 h-5 text-white/80" />}
              </button>
            </div>

            <div className={isInline ? 'p-3 sm:p-4' : 'p-4 sm:p-5'}>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {dayNames.map(d => (
                  <div key={d} className="text-center text-[11px] font-semibold text-[#7A3B5E]/50 uppercase tracking-wider py-1">{d}</div>
                ))}
              </div>

              {/* Day Cells */}
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${currentMonth}-${String(day).padStart(2, '0')}`;
                  const dayInfo = monthData.find(d => d.date === dateStr);
                  const isSelected = dateStr === selectedDate;
                  const isPast = new Date(year, monthNum - 1, day) < today;
                  const hasSlots = dayInfo?.hasSlots ?? false;
                  const isBlocked = dayInfo?.isBlocked ?? false;
                  const isToday = new Date(year, monthNum - 1, day).toDateString() === new Date().toDateString();

                  return (
                    <button
                      key={day}
                      onClick={() => { if (hasSlots && !isPast) setSelectedDate(dateStr); }}
                      disabled={isPast || !hasSlots || isBlocked}
                      className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-all ${
                        isSelected
                          ? 'bg-[#7A3B5E] text-white font-bold shadow-[var(--shadow-card)] scale-105'
                          : isToday && hasSlots
                            ? 'bg-[#C8A97D]/10 text-[#7A3B5E] font-semibold ring-2 ring-[#C8A97D]/30 hover:bg-[#C8A97D]/20'
                            : hasSlots && !isPast
                              ? 'text-[#4A4A5C] font-medium hover:bg-[#F9E8E2] hover:scale-[1.02] cursor-pointer'
                              : 'text-[#D4CFC8] cursor-not-allowed'
                      }`}
                    >
                      {day}
                      {hasSlots && !isPast && !isSelected && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#3B8A6E]" />
                      )}
                      {isToday && (
                        <span className="absolute top-0.5 text-[7px] font-bold text-[#C8A97D] uppercase">
                          {isRTL ? 'اليوم' : 'today'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {loadingMonth && (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-5 h-5 text-[#C8A97D] animate-spin" />
                </div>
              )}

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-[#F0ECE8]">
                <div className="flex items-center gap-1.5 text-[10px] text-[#8E8E9F]">
                  <span className="w-2 h-2 rounded-full bg-[#3B8A6E]" /> {isRTL ? 'متاح' : 'Available'}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#8E8E9F]">
                  <span className="w-2 h-2 rounded-full bg-[#D4CFC8]" /> {isRTL ? 'غير متاح' : 'Unavailable'}
                </div>
              </div>

              {/* Prompt text when no date selected (desktop only on standalone) */}
              {!hasDateSelected && !isInline && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden lg:block text-center text-xs text-[#8E8E9F] mt-3"
                >
                  {isRTL ? 'اختر يوماً لعرض المواعيد المتاحة' : 'Select a day to see available times'}
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Time Slots */}
        <AnimatePresence mode="wait">
          {hasDateSelected && (
            <motion.div
              key="slots-panel"
              ref={slotsRef}
              className={
                isInline
                  ? 'flex-1 min-w-0 scroll-anchor'
                  : 'flex-1 min-w-0 mt-6 lg:mt-0 lg:sticky lg:top-24 scroll-anchor'
              }
              initial={{ opacity: 0, x: isInline ? 0 : 40, y: isInline ? 12 : 0, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: isInline ? 0 : 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {loadingDay ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-[#F0ECE8]">
                  <Loader2 className="w-6 h-6 text-[#C8A97D] animate-spin" />
                  <p className="text-xs text-[#8E8E9F] mt-3">{isRTL ? 'جارٍ تحميل المواعيد...' : 'Loading times...'}</p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-[#F0ECE8]">
                  <Clock className="w-8 h-8 text-[#E8E0D8] mx-auto mb-2" />
                  <p className="text-sm text-[#8E8E9F]">
                    {isRTL ? 'لا توجد مواعيد متاحة في هذا اليوم' : 'No available slots for this day'}
                  </p>
                  <p className="text-xs text-[#C0B8B0] mt-1">{isRTL ? 'جرب يوماً آخر' : 'Try another day'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Selected date header */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center">
                      <Calendar className="w-3.5 h-3.5 text-[#7A3B5E]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#4A4A5C]">{selectedDateLabel}</p>
                      <p className="text-[10px] text-[#8E8E9F]">{isRTL ? 'اختر الوقت' : 'Choose a time'}</p>
                    </div>
                  </div>

                  {(() => {
                    // Dynamic sublabel: show the actual first-to-last available
                    // time in each bucket (client-local), rounded to whole-hour
                    // strings. Empty buckets are filtered out below.
                    const fmtTime = (iso: string) =>
                      new Date(iso).toLocaleTimeString(isRTL ? 'ar' : 'en-US', {
                        timeZone: clientTimezone,
                        hour: 'numeric',
                        minute: '2-digit',
                      });
                    const slotRange = (slots: TimeSlot[]): string => {
                      if (slots.length === 0) return '';
                      if (slots.length === 1) return fmtTime(slots[0].start);
                      const first = fmtTime(slots[0].start);
                      const last = fmtTime(slots[slots.length - 1].start);
                      return `${first} – ${last}`;
                    };
                    return [
                      { label: isRTL ? 'صباحاً' : 'Morning', sublabel: slotRange(morningSlots), slots: morningSlots, bg: 'bg-amber-50', accent: 'text-amber-600', icon: '☀️' },
                      { label: isRTL ? 'بعد الظهر' : 'Afternoon', sublabel: slotRange(afternoonSlots), slots: afternoonSlots, bg: 'bg-sky-50', accent: 'text-sky-600', icon: '🌤' },
                      { label: isRTL ? 'مساءً' : 'Evening', sublabel: slotRange(eveningSlots), slots: eveningSlots, bg: 'bg-indigo-50', accent: 'text-indigo-600', icon: '🌙' },
                      ...(nextDaySlots.length > 0 ? [{ label: isRTL ? 'متأخّر (اليوم التالي)' : 'Late Night (next day)', sublabel: slotRange(nextDaySlots), slots: nextDaySlots, bg: 'bg-violet-50', accent: 'text-violet-600', icon: '🌛' }] : []),
                    ];
                  })().filter(group => group.slots.length > 0).map((group, gi) => (
                    <motion.div
                      key={group.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 + gi * 0.08 }}
                      className="bg-white rounded-xl border border-[#F0ECE8] overflow-hidden"
                    >
                      <div className={`px-3 py-2 ${group.bg} flex items-center justify-between`}>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{group.icon}</span>
                          <span className={`text-xs font-semibold ${group.accent}`}>{group.label}</span>
                        </div>
                        <span className="text-[10px] text-[#8E8E9F]">{group.sublabel}</span>
                      </div>
                      <div className="p-2.5 flex flex-wrap gap-1.5">
                        {group.slots.map((slot, si) => {
                          const slotDate = new Date(slot.start);
                          const clientTimeLabel = slotDate.toLocaleTimeString(isRTL ? 'ar' : 'en-US', {
                            timeZone: clientTimezone,
                            hour: 'numeric',
                            minute: '2-digit',
                          });
                          // Secondary line: same moment in Dr. Hala's timezone.
                          // Hidden when the client shares her timezone, to keep
                          // the button lean.
                          const sameTz = clientTimezone === providerTimezone;
                          const providerTimeLabel = sameTz
                            ? null
                            : slotDate.toLocaleTimeString(isRTL ? 'ar' : 'en-US', {
                                timeZone: providerTimezone,
                                hour: 'numeric',
                                minute: '2-digit',
                              });
                          return (
                            <motion.button
                              key={slot.start}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: 0.2 + gi * 0.08 + si * 0.02 }}
                              onClick={() => selectSlot(slot)}
                              className="group px-3.5 py-2 rounded-lg border border-[#E8E0D8] text-sm text-[#4A4A5C] font-semibold hover:border-[#7A3B5E] hover:text-white hover:bg-[#7A3B5E] hover:shadow-md transition-all active:scale-95 flex flex-col items-center leading-tight"
                            >
                              <span>{clientTimeLabel}</span>
                              {providerTimeLabel && (
                                <span className="text-[9px] font-normal text-[#8E8E9F] group-hover:text-white/75 mt-0.5">
                                  {isRTL ? 'محليًّا: ' : 'Local: '}{providerTimeLabel}
                                </span>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
