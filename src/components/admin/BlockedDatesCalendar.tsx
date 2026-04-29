'use client';

/* ================================================================
   BlockedDatesCalendar — month grid for picking days to block
   ================================================================
   What it shows on each day:
   - Number of confirmed/pending bookings (compact bars + count)
   - Travel-schedule trips (small plane chip with location label)
   - Already-blocked status: full-day cross, partial-time stripe
   - Today, past days, weekends (subtle visual cues)

   Interactions:
   - Click a day → selects it (parent updates the form below)
   - Keyboard arrows move selection; Esc clears
   - Hover/focus shows a quick popover with the day's bookings

   Data:
   - bookings, blockedDates, travelSchedule come from the parent
     (already fetched in AvailabilityEditor)
   - Google Calendar busy events are fetched here per-month so
     personal appointments don't get blocked by accident
   ================================================================ */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, AlertCircle, Plane, Lock,
  CalendarX, X as XIcon, Sparkles,
} from 'lucide-react';
import type { Booking } from '@/lib/booking/types';
import type { BlockedDate } from '@/lib/booking/types';
import type { ProviderTravelSchedule } from '@/lib/booking/provider-location';

// ─── Types ──────────────────────────────────────────────────────

interface AdminCalendarEvent {
  id: string;
  summary?: string;
  start: string;
  end: string;
  allDay: boolean;
  attendeesCount: number;
  hangoutLink?: string;
  visibility?: string;
}

interface Props {
  password: string;
  bookings: Booking[];
  blockedDates: BlockedDate[];
  travelSchedule: ProviderTravelSchedule | null;
  selectedDate: string;                // 'YYYY-MM-DD' | ''
  onSelectDate: (date: string) => void;
}

// ─── Date helpers ───────────────────────────────────────────────

const MS_DAY = 24 * 60 * 60 * 1000;
const pad = (n: number) => String(n).padStart(2, '0');
const ymdKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseYmd = (s: string): Date | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
};
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

function buildMonthGrid(year: number, month0: number): Date[] {
  const first = new Date(year, month0, 1);
  const startDow = first.getDay();
  const cells: Date[] = [];
  const gridStart = new Date(year, month0, 1 - startDow);
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i));
  }
  return cells;
}

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ─── Personal/busy GCal heuristic (matches CalendarView) ───────

function isBusyBlockEvent(e: AdminCalendarEvent): boolean {
  return e.attendeesCount === 0
    && !e.hangoutLink
    && (e.visibility === 'private' || /^unavailable|busy|blocked/i.test(e.summary ?? ''));
}

// ─── Component ──────────────────────────────────────────────────

export default function BlockedDatesCalendar({
  password,
  bookings,
  blockedDates,
  travelSchedule,
  selectedDate,
  onSelectDate,
}: Props) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const initialCursor = useMemo(() => {
    const sel = parseYmd(selectedDate);
    const base = sel ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  }, [selectedDate, today]);

  const [cursor, setCursor] = useState(initialCursor);
  const [gcalEvents, setGcalEvents] = useState<AdminCalendarEvent[]>([]);
  const [hoverDay, setHoverDay] = useState<string | null>(null);

  const headers = useMemo(() => ({
    Authorization: `Bearer ${password}`,
    'Content-Type': 'application/json',
  }), [password]);

  // Fetch GCal events for the visible month grid (silent — no spinner). The
  // Calendar tab already fetches these for the same range; we duplicate
  // here so the Blocked Dates view works even before the user opens that tab.
  const fetchGcal = useCallback(async () => {
    try {
      const grid = buildMonthGrid(cursor.getFullYear(), cursor.getMonth());
      const timeMin = new Date(grid[0].getFullYear(), grid[0].getMonth(), grid[0].getDate()).toISOString();
      const last = grid[grid.length - 1];
      const timeMax = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1).toISOString();
      const url = `/api/admin/calendar/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}`;
      const res = await fetch(url, { headers });
      if (!res.ok) return;
      const data = await res.json();
      setGcalEvents(Array.isArray(data.events) ? data.events : []);
    } catch {
      // GCal load failure is non-fatal — KV bookings still surface.
    }
  }, [cursor, headers]);

  useEffect(() => { void fetchGcal(); }, [fetchGcal]);

  // ─── Index data by day ─────────────────────────────────────

  const bookingsByDay = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of bookings) {
      if (!b.startTime) continue;
      // Skip cancelled / declined / no-show — they don't block anything.
      if (b.status === 'cancelled' || b.status === 'declined' || b.status === 'no-show') continue;
      const k = ymdKey(new Date(b.startTime));
      const arr = map.get(k) ?? [];
      arr.push(b);
      map.set(k, arr);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [bookings]);

  const personalByDay = useMemo(() => {
    const map = new Map<string, AdminCalendarEvent[]>();
    for (const e of gcalEvents) {
      if (isBusyBlockEvent(e)) continue; // already-blocked events show via blockedDates
      const k = ymdKey(new Date(e.start));
      const arr = map.get(k) ?? [];
      arr.push(e);
      map.set(k, arr);
    }
    return map;
  }, [gcalEvents]);

  const blockedByDay = useMemo(() => {
    const map = new Map<string, BlockedDate>();
    for (const b of blockedDates) map.set(b.date, b);
    return map;
  }, [blockedDates]);

  // Travel coverage — span every day from startDate to endDate inclusive.
  const travelByDay = useMemo(() => {
    const map = new Map<string, { label: string; tz: string }>();
    if (!travelSchedule) return map;
    for (const e of travelSchedule.entries) {
      const start = parseYmd(e.startDate);
      const end = parseYmd(e.endDate);
      if (!start || !end) continue;
      for (let t = start.getTime(); t <= end.getTime(); t += MS_DAY) {
        const d = new Date(t);
        map.set(ymdKey(d), { label: e.locationLabel, tz: e.timezone });
      }
    }
    return map;
  }, [travelSchedule]);

  // ─── Navigation ────────────────────────────────────────────

  const goPrev = () => setCursor(c => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  const goNext = () => setCursor(c => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  const goToday = () => {
    const t = new Date();
    setCursor(new Date(t.getFullYear(), t.getMonth(), 1));
    onSelectDate(ymdKey(t));
  };

  // Keep cursor in sync when parent changes the selection (e.g. from the
  // blocked-dates list below).
  useEffect(() => {
    const sel = parseYmd(selectedDate);
    if (!sel) return;
    if (sel.getMonth() !== cursor.getMonth() || sel.getFullYear() !== cursor.getFullYear()) {
      setCursor(new Date(sel.getFullYear(), sel.getMonth(), 1));
    }
  }, [selectedDate, cursor]);

  // Keyboard arrow navigation when a day is selected
  useEffect(() => {
    const sel = parseYmd(selectedDate);
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => {
      // Don't steal arrows from form fields
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      const delta = e.key === 'ArrowLeft' ? -1
        : e.key === 'ArrowRight' ? 1
        : e.key === 'ArrowUp' ? -7
        : e.key === 'ArrowDown' ? 7
        : 0;
      if (delta === 0) return;
      const next = new Date(sel.getTime() + delta * MS_DAY);
      onSelectDate(ymdKey(next));
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedDate, onSelectDate]);

  // ─── Month stats (helpful summary) ─────────────────────────

  const monthStats = useMemo(() => {
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getTime();
    const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1).getTime();
    let activeBookings = 0;
    let blocksThisMonth = 0;
    for (const b of bookings) {
      const t = new Date(b.startTime).getTime();
      if (t < start || t >= end) continue;
      if (b.status === 'cancelled' || b.status === 'declined' || b.status === 'no-show') continue;
      activeBookings++;
    }
    for (const bd of blockedDates) {
      const d = parseYmd(bd.date);
      if (!d) continue;
      const t = d.getTime();
      if (t >= start && t < end) blocksThisMonth++;
    }
    return { activeBookings, blocksThisMonth };
  }, [bookings, blockedDates, cursor]);

  const grid = useMemo(() => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()), [cursor]);
  const monthLabel = cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-3">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <button
            onClick={goPrev}
            aria-label="Previous month"
            className="p-1.5 rounded-lg hover:bg-[#F5F0EB] text-[#4A4A5C] transition-colors active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="text-base font-bold text-[#2D2A33] min-w-[10ch] text-center tabular-nums">
            {monthLabel}
          </h3>
          <button
            onClick={goNext}
            aria-label="Next month"
            className="p-1.5 rounded-lg hover:bg-[#F5F0EB] text-[#4A4A5C] transition-colors active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={goToday}
            className="ml-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors"
          >
            Today
          </button>
        </div>

        {/* Stats pills */}
        <div className="flex items-center gap-1.5 text-[10px] text-[#8E8E9F]">
          <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold">
            {monthStats.activeBookings} session{monthStats.activeBookings === 1 ? '' : 's'}
          </span>
          {monthStats.blocksThisMonth > 0 && (
            <span className="px-2 py-1 rounded-md bg-red-50 text-red-700 font-semibold">
              {monthStats.blocksThisMonth} blocked
            </span>
          )}
        </div>
      </div>

      {/* Legend (subtle) */}
      <div className="flex items-center gap-3 text-[10px] text-[#8E8E9F] flex-wrap">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> sessions</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> pending</span>
        <span className="flex items-center gap-1"><Plane className="w-3 h-3 text-[#7A3B5E]" /> travel</span>
        <span className="flex items-center gap-1"><CalendarX className="w-3 h-3 text-red-500" /> blocked</span>
        <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-slate-400" /> personal</span>
      </div>

      {/* Calendar grid */}
      <div className="bg-white rounded-xl border border-[#F0ECE8] overflow-hidden">
        {/* Day-of-week header */}
        <div className="grid grid-cols-7 border-b border-[#F0ECE8] bg-[#FAF7F2]">
          {WEEKDAY_LABELS.map((d, i) => (
            <div
              key={d}
              className={`px-1 py-1.5 text-[10px] font-semibold text-center uppercase tracking-wider ${
                i === 0 || i === 6 ? 'text-[#C8A97D]' : 'text-[#8E8E9F]'
              }`}
            >
              <span className="hidden sm:inline">{d}</span>
              <span className="sm:hidden">{d[0]}</span>
            </div>
          ))}
        </div>

        {/* 6 × 7 grid */}
        <div className="grid grid-cols-7 auto-rows-fr">
          {grid.map((date, idx) => {
            const k = ymdKey(date);
            const isToday = isSameDay(date, today);
            const isPast = date < today && !isToday;
            const isOtherMonth = date.getMonth() !== cursor.getMonth();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isSelected = selectedDate === k;

            const dayBookings = bookingsByDay.get(k) ?? [];
            const dayPersonal = personalByDay.get(k) ?? [];
            const blocked = blockedByDay.get(k);
            const travel = travelByDay.get(k);

            const pendingCount = dayBookings.filter(
              b => b.status === 'pending_approval' || b.status === 'pending-review',
            ).length;
            const confirmedCount = dayBookings.filter(
              b => b.status === 'confirmed' || b.status === 'approved' || b.status === 'completed',
            ).length;
            const totalSessions = dayBookings.length;

            // Heatmap-ish tint when there are sessions
            const heatStyle: React.CSSProperties = totalSessions > 0
              ? { backgroundColor: `rgba(59, 138, 110, ${0.04 + Math.min(0.10, totalSessions * 0.03)})` }
              : {};

            const fullyBlocked = !!blocked && blocked.allDay;
            const partiallyBlocked = !!blocked && !blocked.allDay;

            return (
              <button
                key={idx}
                onClick={() => onSelectDate(k)}
                onMouseEnter={() => setHoverDay(k)}
                onMouseLeave={() => setHoverDay(prev => prev === k ? null : prev)}
                onFocus={() => setHoverDay(k)}
                onBlur={() => setHoverDay(prev => prev === k ? null : prev)}
                style={fullyBlocked ? undefined : heatStyle}
                aria-pressed={isSelected}
                aria-label={`${k}${totalSessions > 0 ? `, ${totalSessions} session${totalSessions === 1 ? '' : 's'}` : ''}${blocked ? ', blocked' : ''}`}
                className={`relative min-h-[64px] sm:min-h-[88px] p-1 sm:p-1.5 border-r border-b border-[#F0ECE8] text-left transition-all group focus:outline-none
                  ${idx % 7 === 6 ? 'border-r-0' : ''}
                  ${idx >= 35 ? 'border-b-0' : ''}
                  ${isOtherMonth ? 'bg-[#FAF7F2]/50 opacity-60' : 'hover:bg-[#FAF7F2]/70'}
                  ${isPast && !isOtherMonth ? 'opacity-75' : ''}
                  ${fullyBlocked ? 'bg-red-50/60 hover:bg-red-50' : ''}
                  ${isSelected ? 'ring-2 ring-[#7A3B5E] ring-inset z-10 bg-[#FAF5F8]' : ''}
                `}
              >
                {/* Diagonal hatch overlay for fully-blocked days */}
                {fullyBlocked && (
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(135deg, rgba(196,91,91,0.5) 0 2px, transparent 2px 8px)',
                    }}
                  />
                )}

                {/* Day number + status icons */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center justify-center text-[11px] font-semibold tabular-nums
                    ${isToday
                      ? 'w-5 h-5 rounded-full bg-[#7A3B5E] text-white'
                      : isOtherMonth
                        ? 'text-[#C5C0BA]'
                        : isWeekend
                          ? 'text-[#C8A97D]'
                          : 'text-[#2D2A33]'}
                  `}>
                    {date.getDate()}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {pendingCount > 0 && (
                      <span
                        className="relative flex h-1.5 w-1.5"
                        title={`${pendingCount} pending`}
                      >
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                      </span>
                    )}
                    {fullyBlocked && (
                      <CalendarX className="w-3 h-3 text-red-500" />
                    )}
                    {partiallyBlocked && (
                      <span title="Partially blocked" className="block w-2.5 h-0.5 rounded-full bg-red-400" />
                    )}
                  </div>
                </div>

                {/* Travel chip */}
                {travel && !fullyBlocked && (
                  <div className="mt-1 flex items-center gap-0.5 px-1 py-px rounded text-[9px] font-medium bg-[#7A3B5E]/8 text-[#7A3B5E] truncate">
                    <Plane className="w-2.5 h-2.5 flex-shrink-0" />
                    <span className="truncate">{travel.label}</span>
                  </div>
                )}

                {/* Booking density bars (compact) */}
                {totalSessions > 0 && !fullyBlocked && (
                  <div className="mt-1 flex flex-col gap-0.5">
                    {confirmedCount > 0 && (
                      <div className="flex items-center gap-1">
                        <div className="h-1 rounded-full bg-emerald-400" style={{ width: `${Math.min(100, confirmedCount * 25 + 25)}%` }} />
                        <span className="text-[9px] text-emerald-700 font-semibold tabular-nums">{confirmedCount}</span>
                      </div>
                    )}
                    {pendingCount > 0 && (
                      <div className="flex items-center gap-1">
                        <div className="h-1 rounded-full bg-amber-300" style={{ width: `${Math.min(100, pendingCount * 25 + 25)}%` }} />
                        <span className="text-[9px] text-amber-700 font-semibold tabular-nums">{pendingCount}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Personal/private dot */}
                {dayPersonal.length > 0 && !fullyBlocked && (
                  <div
                    className="absolute bottom-1 right-1 inline-flex items-center gap-0.5 text-[9px] text-slate-500"
                    title={`${dayPersonal.length} personal event${dayPersonal.length === 1 ? '' : 's'}`}
                  >
                    <Lock className="w-2.5 h-2.5" />
                    <span>{dayPersonal.length}</span>
                  </div>
                )}

                {/* Block reason (full-day blocks) */}
                {fullyBlocked && blocked.reason && (
                  <p className="mt-1 text-[9px] text-red-700 font-medium truncate" title={blocked.reason}>
                    {blocked.reason}
                  </p>
                )}

                {/* Hover popover with bookings list */}
                <AnimatePresence>
                  {hoverDay === k && totalSessions > 0 && !isOtherMonth && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.12 }}
                      className="absolute z-30 left-1 right-1 -top-1 -translate-y-full pointer-events-none"
                    >
                      <div className="bg-white rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[#F0ECE8] p-2 space-y-1 max-w-xs">
                        <p className="text-[10px] font-bold text-[#2D2A33]">
                          {totalSessions} session{totalSessions === 1 ? '' : 's'} on this day
                        </p>
                        {dayBookings.slice(0, 4).map(b => {
                          const t = new Date(b.startTime);
                          const time = `${pad(t.getHours())}:${pad(t.getMinutes())}`;
                          return (
                            <div key={b.bookingId} className="flex items-center gap-1.5 text-[10px]">
                              <span className="font-mono text-[#8E8E9F]">{time}</span>
                              <span className="truncate text-[#2D2A33]">{b.clientName ?? 'Client'}</span>
                            </div>
                          );
                        })}
                        {dayBookings.length > 4 && (
                          <p className="text-[10px] italic text-[#8E8E9F]">+{dayBookings.length - 4} more</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected-date conflict warning — surfaces above the form below */}
      {(() => {
        const sel = parseYmd(selectedDate);
        if (!sel) return null;
        const sessionsOnDay = bookingsByDay.get(selectedDate) ?? [];
        const personalOnDay = personalByDay.get(selectedDate) ?? [];
        const travelOnDay = travelByDay.get(selectedDate);
        if (sessionsOnDay.length === 0 && personalOnDay.length === 0 && !travelOnDay) return null;
        return (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-amber-900">
                  Heads up — {sel.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} already has activity
                </p>
                <ul className="mt-1.5 space-y-0.5 text-[11px] text-amber-800">
                  {sessionsOnDay.length > 0 && (
                    <li className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>
                        <span className="font-semibold">{sessionsOnDay.length}</span> session{sessionsOnDay.length === 1 ? '' : 's'}
                        {' — '}
                        {sessionsOnDay.slice(0, 3).map(b => {
                          const t = new Date(b.startTime);
                          return `${pad(t.getHours())}:${pad(t.getMinutes())}`;
                        }).join(', ')}
                        {sessionsOnDay.length > 3 && '…'}
                      </span>
                    </li>
                  )}
                  {travelOnDay && (
                    <li className="flex items-center gap-1.5">
                      <Plane className="w-3 h-3" />
                      Traveling: {travelOnDay.label}
                    </li>
                  )}
                  {personalOnDay.length > 0 && (
                    <li className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      {personalOnDay.length} personal event{personalOnDay.length === 1 ? '' : 's'} on Google Calendar
                    </li>
                  )}
                </ul>
                {sessionsOnDay.length > 0 && (
                  <p className="mt-1.5 text-[10px] text-amber-700 italic">
                    Blocking this day all-day won&apos;t cancel existing sessions, but new clients won&apos;t be able to book.
                    Reschedule or cancel them first if you need the day fully clear.
                  </p>
                )}
              </div>
              <button
                onClick={() => onSelectDate('')}
                aria-label="Clear selection"
                className="text-amber-600 hover:text-amber-900 transition-colors"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
