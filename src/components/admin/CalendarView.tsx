'use client';

/* ================================================================
   CalendarView — Admin live calendar for Dr. Hala
   ================================================================
   Month grid that overlays:
   - Client bookings from KV (color-coded by status)
   - Google Calendar events (personal appointments, busy blocks)

   Interactive: click a day to open a drawer with the full list.
   Filter chips toggle statuses. Keyboard arrows navigate days.
   Heatmap tint on each cell reflects total booked minutes.
   ================================================================ */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, X, Clock, Video, Building2,
  AlertCircle, ExternalLink, RefreshCw, Users, Lock,
  CalendarDays, Sparkles,
} from 'lucide-react';
import type { Booking, BookingStatus } from '@/lib/booking/types';

// ─── Types ──────────────────────────────────────────────────────

interface AdminCalendarEvent {
  id: string;
  summary?: string;
  start: string;
  end: string;
  allDay: boolean;
  location?: string;
  description?: string;
  colorId?: string;
  attendeesCount: number;
  htmlLink?: string;
  hangoutLink?: string;
  transparency?: string;
  visibility?: string;
  creatorSelf: boolean;
}

interface Props {
  password: string;
  bookings: Booking[];
  onRefresh?: () => void;
}

// ─── Status styling (mirrors BookingsModule) ────────────────────

const STATUS_STYLE: Record<string, {
  label: string;
  chipBg: string;
  chipText: string;
  dot: string;
  barBg: string;
}> = {
  'pending-review':    { label: 'Draft',       chipBg: 'bg-orange-100',  chipText: 'text-orange-800', dot: 'bg-orange-400',   barBg: 'bg-orange-400' },
  'pending_approval':  { label: 'Pending',     chipBg: 'bg-amber-100',   chipText: 'text-amber-800',  dot: 'bg-amber-500',    barBg: 'bg-amber-400' },
  'approved':          { label: 'Approved',    chipBg: 'bg-blue-100',    chipText: 'text-blue-800',   dot: 'bg-blue-500',     barBg: 'bg-blue-400' },
  'confirmed':         { label: 'Confirmed',   chipBg: 'bg-emerald-100', chipText: 'text-emerald-800', dot: 'bg-emerald-500', barBg: 'bg-emerald-500' },
  'completed':         { label: 'Completed',   chipBg: 'bg-slate-100',   chipText: 'text-slate-700',  dot: 'bg-slate-400',    barBg: 'bg-slate-400' },
  'cancelled':         { label: 'Cancelled',   chipBg: 'bg-red-100',     chipText: 'text-red-700',    dot: 'bg-red-400',      barBg: 'bg-red-300' },
  'declined':          { label: 'Declined',    chipBg: 'bg-red-100',     chipText: 'text-red-700',    dot: 'bg-red-400',      barBg: 'bg-red-300' },
  'no-show':           { label: 'No-show',     chipBg: 'bg-gray-100',    chipText: 'text-gray-700',   dot: 'bg-gray-400',     barBg: 'bg-gray-300' },
  'rescheduled':       { label: 'Rescheduled', chipBg: 'bg-orange-100',  chipText: 'text-orange-700', dot: 'bg-orange-300',   barBg: 'bg-orange-300' },
};

const FILTER_ORDER: BookingStatus[] = [
  'pending_approval', 'approved', 'confirmed', 'completed', 'pending-review', 'cancelled', 'declined', 'no-show',
];

// ─── Date helpers ───────────────────────────────────────────────

const MS_DAY = 24 * 60 * 60 * 1000;
const pad = (n: number) => String(n).padStart(2, '0');
const ymdKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
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

// ─── Unified event shape (for day drawer) ───────────────────────

type CalendarItem =
  | { kind: 'booking'; booking: Booking }
  | { kind: 'gcal'; event: AdminCalendarEvent };

// Is a GCal event a busy-block (admin-created "Unavailable")?
function isBusyBlockEvent(e: AdminCalendarEvent): boolean {
  return e.attendeesCount === 0
    && !e.hangoutLink
    && (e.visibility === 'private' || /^unavailable|busy|blocked/i.test(e.summary ?? ''));
}

// ─── Main component ─────────────────────────────────────────────

export default function CalendarView({ password, bookings, onRefresh }: Props) {
  const now = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [gcalEvents, setGcalEvents] = useState<AdminCalendarEvent[]>([]);
  const [gcalLoading, setGcalLoading] = useState(false);
  const [gcalError, setGcalError] = useState<string | null>(null);
  const [hiddenStatuses, setHiddenStatuses] = useState<Set<BookingStatus>>(new Set(['completed', 'cancelled', 'declined']));
  const [showPersonal, setShowPersonal] = useState(true);

  const headers = useMemo(() => ({
    Authorization: `Bearer ${password}`,
    'Content-Type': 'application/json',
  }), [password]);

  // ─── Fetch GCal events for visible grid range ────────────────
  const fetchGcal = useCallback(async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) setGcalLoading(true);
    setGcalError(null);
    try {
      const grid = buildMonthGrid(cursor.getFullYear(), cursor.getMonth());
      const timeMin = new Date(grid[0].getFullYear(), grid[0].getMonth(), grid[0].getDate()).toISOString();
      const last = grid[grid.length - 1];
      const timeMax = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1).toISOString();
      const url = `/api/admin/calendar/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}`;
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setGcalEvents(Array.isArray(data.events) ? data.events : []);
    } catch {
      setGcalError('Could not load Google Calendar events');
    } finally {
      if (!opts?.silent) setGcalLoading(false);
    }
  }, [cursor, headers]);

  // Fetch on mount + on month change, then poll every 30s
  useEffect(() => {
    fetchGcal();
    const tick = () => {
      if (typeof document !== 'undefined' && document.hidden) return;
      fetchGcal({ silent: true });
    };
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [fetchGcal]);

  // ─── Index bookings & GCal events by day ─────────────────────
  // Booking IDs that already have a matching GCal event (so we don't
  // show the same session twice in the drawer)
  const bookingGcalIds = useMemo(() => {
    const s = new Set<string>();
    for (const b of bookings) if (b.calendarEventId) s.add(b.calendarEventId);
    return s;
  }, [bookings]);

  const bookingsByDay = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of bookings) {
      if (!b.startTime) continue;
      if (hiddenStatuses.has(b.status)) continue;
      const d = new Date(b.startTime);
      const k = ymdKey(d);
      const arr = map.get(k) ?? [];
      arr.push(b);
      map.set(k, arr);
    }
    // Sort each day's bookings by time
    for (const list of map.values()) {
      list.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [bookings, hiddenStatuses]);

  const gcalByDay = useMemo(() => {
    const map = new Map<string, AdminCalendarEvent[]>();
    if (!showPersonal) return map;
    for (const e of gcalEvents) {
      // Skip events that already correspond to a booking
      if (bookingGcalIds.has(e.id)) continue;
      const d = new Date(e.start);
      const k = ymdKey(d);
      const arr = map.get(k) ?? [];
      arr.push(e);
      map.set(k, arr);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.start.localeCompare(b.start));
    }
    return map;
  }, [gcalEvents, bookingGcalIds, showPersonal]);

  // ─── Per-day computed metadata ───────────────────────────────
  const dayMeta = useMemo(() => {
    const meta = new Map<string, {
      bookingCount: number;
      pendingCount: number;
      personalCount: number;
      minutes: number;
      hasConflict: boolean;
    }>();
    for (const [k, list] of bookingsByDay.entries()) {
      let mins = 0;
      let pending = 0;
      // Conflict = any two bookings overlap
      let conflict = false;
      const active = list.filter(b => b.status !== 'cancelled' && b.status !== 'declined' && b.status !== 'no-show');
      for (let i = 0; i < active.length; i++) {
        mins += active[i].durationMinutes ?? 0;
        if (active[i].status === 'pending_approval' || active[i].status === 'pending-review') pending++;
        for (let j = i + 1; j < active.length; j++) {
          const aS = new Date(active[i].startTime).getTime();
          const aE = new Date(active[i].endTime).getTime();
          const bS = new Date(active[j].startTime).getTime();
          const bE = new Date(active[j].endTime).getTime();
          if (aS < bE && bS < aE) conflict = true;
        }
      }
      meta.set(k, { bookingCount: list.length, pendingCount: pending, personalCount: 0, minutes: mins, hasConflict: conflict });
    }
    for (const [k, list] of gcalByDay.entries()) {
      const existing = meta.get(k) ?? { bookingCount: 0, pendingCount: 0, personalCount: 0, minutes: 0, hasConflict: false };
      existing.personalCount = list.length;
      meta.set(k, existing);
    }
    return meta;
  }, [bookingsByDay, gcalByDay]);

  // Max minutes in month (for heatmap normalization)
  const maxDayMinutes = useMemo(() => {
    let max = 0;
    for (const m of dayMeta.values()) if (m.minutes > max) max = m.minutes;
    return max;
  }, [dayMeta]);

  // ─── Month stats ─────────────────────────────────────────────
  const monthStats = useMemo(() => {
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getTime();
    const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1).getTime();
    let confirmed = 0, pending = 0, hours = 0, personal = 0;
    for (const b of bookings) {
      const t = new Date(b.startTime).getTime();
      if (t < start || t >= end) continue;
      if (b.status === 'confirmed' || b.status === 'completed') confirmed++;
      if (b.status === 'pending_approval') pending++;
      if (b.status !== 'cancelled' && b.status !== 'declined' && b.status !== 'no-show') {
        hours += (b.durationMinutes ?? 0) / 60;
      }
    }
    for (const e of gcalEvents) {
      if (bookingGcalIds.has(e.id)) continue;
      const t = new Date(e.start).getTime();
      if (t < start || t >= end) continue;
      personal++;
    }
    return { confirmed, pending, hours, personal };
  }, [bookings, gcalEvents, bookingGcalIds, cursor]);

  // ─── Month navigation ────────────────────────────────────────
  const goPrev = () => setCursor(c => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  const goNext = () => setCursor(c => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  const goToday = () => {
    const t = new Date();
    setCursor(new Date(t.getFullYear(), t.getMonth(), 1));
    setSelectedDay(startOfDay(t));
  };

  // ─── Keyboard navigation ─────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedDay) {
        if (e.key === 'Escape') { setSelectedDay(null); e.preventDefault(); return; }
        const delta = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' ? -7 : e.key === 'ArrowDown' ? 7 : 0;
        if (delta !== 0) {
          const next = new Date(selectedDay.getTime() + delta * MS_DAY);
          setSelectedDay(next);
          if (next.getMonth() !== cursor.getMonth() || next.getFullYear() !== cursor.getFullYear()) {
            setCursor(new Date(next.getFullYear(), next.getMonth(), 1));
          }
          e.preventDefault();
        }
      } else {
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 't' || e.key === 'T') goToday();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedDay, cursor]);

  const toggleStatus = (s: BookingStatus) => {
    setHiddenStatuses(prev => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });
  };

  const grid = useMemo(() => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()), [cursor]);
  const today = startOfDay(new Date());
  const monthLabel = cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Status counts for filter pills (for this month)
  const statusCounts = useMemo(() => {
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getTime();
    const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1).getTime();
    const counts = new Map<BookingStatus, number>();
    for (const b of bookings) {
      const t = new Date(b.startTime).getTime();
      if (t < start || t >= end) continue;
      counts.set(b.status, (counts.get(b.status) ?? 0) + 1);
    }
    return counts;
  }, [bookings, cursor]);

  return (
    <div className="space-y-4">
      {/* ─── Top bar: month + nav + stats ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            aria-label="Previous month"
            className="p-2 rounded-lg hover:bg-[#F5F0EB] text-[#4A4A5C] transition-colors active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-[#2D2A33] min-w-[11ch] text-center tabular-nums">
            {monthLabel}
          </h2>
          <button
            onClick={goNext}
            aria-label="Next month"
            className="p-2 rounded-lg hover:bg-[#F5F0EB] text-[#4A4A5C] transition-colors active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={goToday}
            className="ml-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { onRefresh?.(); fetchGcal(); }}
            disabled={gcalLoading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F5F0EB] text-xs font-medium text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${gcalLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* ─── Quick stats strip ─── */}
      <div className="grid grid-cols-4 gap-2">
        <StatPill label="Confirmed" value={monthStats.confirmed} tone="emerald" />
        <StatPill label="Pending" value={monthStats.pending} tone="amber" pulse={monthStats.pending > 0} />
        <StatPill label="Hours" value={Math.round(monthStats.hours * 10) / 10} tone="plum" />
        <StatPill label="Personal" value={monthStats.personal} tone="slate" icon={<Lock className="w-3 h-3" />} />
      </div>

      {gcalError && (
        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 text-xs text-amber-700 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5" />
          {gcalError} — showing KV bookings only
        </div>
      )}

      {/* ─── Filter chips ─── */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] font-semibold text-[#8E8E9F] uppercase tracking-wider mr-1">Show:</span>
        {FILTER_ORDER.map(s => {
          const cfg = STATUS_STYLE[s];
          const count = statusCounts.get(s) ?? 0;
          const hidden = hiddenStatuses.has(s);
          if (count === 0 && hidden) return null; // hide empty toggled-off chips
          return (
            <button
              key={s}
              onClick={() => toggleStatus(s)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all active:scale-95 ${
                hidden
                  ? 'bg-[#F5F0EB]/50 text-[#B8B8C5] border border-dashed border-[#E8E4DE]'
                  : `${cfg.chipBg} ${cfg.chipText} border border-transparent`
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${hidden ? 'bg-[#D8D4CE]' : cfg.dot}`} />
              {cfg.label}
              {count > 0 && <span className="opacity-70">{count}</span>}
            </button>
          );
        })}
        <button
          onClick={() => setShowPersonal(p => !p)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all active:scale-95 ${
            showPersonal
              ? 'bg-slate-100 text-slate-700 border border-transparent'
              : 'bg-[#F5F0EB]/50 text-[#B8B8C5] border border-dashed border-[#E8E4DE]'
          }`}
        >
          <Lock className="w-3 h-3" />
          Personal
        </button>
      </div>

      {/* ─── Calendar grid ─── */}
      <div className="bg-white rounded-2xl border border-[#F0ECE8] overflow-hidden">
        {/* Day of week header */}
        <div className="grid grid-cols-7 border-b border-[#F0ECE8] bg-[#FAF7F2]">
          {WEEKDAY_LABELS.map((d, i) => (
            <div
              key={d}
              className={`px-2 py-2 text-[10px] sm:text-xs font-semibold text-center uppercase tracking-wider ${
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
            const dayBookings = bookingsByDay.get(k) ?? [];
            const dayPersonal = gcalByDay.get(k) ?? [];
            const meta = dayMeta.get(k);
            const isToday = isSameDay(date, today);
            const isPast = date < today && !isToday;
            const isOtherMonth = date.getMonth() !== cursor.getMonth();
            const isSelected = selectedDay && isSameDay(selectedDay, date);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;

            // Heatmap tint based on booked minutes
            const mins = meta?.minutes ?? 0;
            const intensity = maxDayMinutes > 0 ? Math.min(1, mins / Math.max(maxDayMinutes, 60)) : 0;
            const heatmapStyle: React.CSSProperties = mins > 0
              ? { backgroundColor: `rgba(122, 59, 94, ${0.035 + intensity * 0.09})` }
              : {};

            // Combine items for display (bookings first, then personal)
            const items: CalendarItem[] = [
              ...dayBookings.map(b => ({ kind: 'booking' as const, booking: b })),
              ...dayPersonal.map(e => ({ kind: 'gcal' as const, event: e })),
            ];
            const visibleCount = 3;
            const visible = items.slice(0, visibleCount);
            const overflow = items.length - visible.length;

            return (
              <button
                key={idx}
                onClick={() => setSelectedDay(date)}
                style={heatmapStyle}
                className={`relative min-h-[72px] sm:min-h-[104px] p-1.5 sm:p-2 border-r border-b border-[#F0ECE8] text-left transition-all group
                  ${idx % 7 === 6 ? 'border-r-0' : ''}
                  ${idx >= 35 ? 'border-b-0' : ''}
                  ${isOtherMonth ? 'bg-[#FAF7F2]/50 opacity-60' : 'hover:bg-[#FAF7F2]'}
                  ${isPast && !isOtherMonth ? 'opacity-80' : ''}
                  ${isSelected ? 'ring-2 ring-[#7A3B5E] ring-inset z-10' : ''}
                `}
              >
                {/* Day number + today ring */}
                <div className="flex items-center justify-between mb-1">
                  <span className={`inline-flex items-center justify-center text-[11px] sm:text-xs font-semibold tabular-nums
                    ${isToday
                      ? 'w-6 h-6 rounded-full bg-[#7A3B5E] text-white'
                      : isOtherMonth
                        ? 'text-[#C5C0BA]'
                        : isWeekend
                          ? 'text-[#C8A97D]'
                          : 'text-[#2D2A33]'}
                  `}>
                    {date.getDate()}
                  </span>
                  <div className="flex items-center gap-1">
                    {meta?.hasConflict && (
                      <span title="Overlapping sessions" className="text-red-500">
                        <AlertCircle className="w-3 h-3" />
                      </span>
                    )}
                    {(meta?.pendingCount ?? 0) > 0 && (
                      <span className="relative flex h-2 w-2" title={`${meta!.pendingCount} pending`}>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Event chips */}
                <div className="space-y-0.5">
                  {visible.map((item, i) => {
                    if (item.kind === 'booking') {
                      const b = item.booking;
                      const style = STATUS_STYLE[b.status] ?? STATUS_STYLE.confirmed;
                      const time = new Date(b.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                      return (
                        <div
                          key={`b-${b.bookingId}-${i}`}
                          className={`flex items-center gap-1 px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-medium truncate ${style.chipBg} ${style.chipText}`}
                        >
                          <span className={`w-1 h-1 rounded-full ${style.dot} shrink-0`} />
                          <span className="tabular-nums hidden sm:inline">{time}</span>
                          <span className="truncate">{b.clientName}</span>
                        </div>
                      );
                    } else {
                      const e = item.event;
                      const isBusy = isBusyBlockEvent(e);
                      const time = e.allDay
                        ? 'All day'
                        : new Date(e.start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                      return (
                        <div
                          key={`g-${e.id}-${i}`}
                          className={`flex items-center gap-1 px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-medium truncate border-dashed border ${
                            isBusy
                              ? 'bg-gray-50 text-gray-500 border-gray-200'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                          title={e.summary ?? 'Personal event'}
                        >
                          {isBusy ? <Lock className="w-2 h-2 shrink-0" /> : <Users className="w-2 h-2 shrink-0" />}
                          <span className="tabular-nums hidden sm:inline">{time}</span>
                          <span className="truncate">{e.summary || 'Busy'}</span>
                        </div>
                      );
                    }
                  })}
                  {overflow > 0 && (
                    <div className="text-[9px] sm:text-[10px] font-medium text-[#8E8E9F] pl-1">
                      +{overflow} more
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend hint */}
      <p className="text-[10px] text-[#B8B8C5] text-center">
        <Sparkles className="w-2.5 h-2.5 inline -mt-0.5 mr-1" />
        Click any day for details · Arrow keys to navigate · <kbd className="px-1 rounded bg-[#F5F0EB]">T</kbd> for today
      </p>

      {/* ─── Day drawer ─── */}
      <AnimatePresence>
        {selectedDay && (
          <DayDrawer
            date={selectedDay}
            bookings={bookingsByDay.get(ymdKey(selectedDay)) ?? []}
            personal={gcalByDay.get(ymdKey(selectedDay)) ?? []}
            onClose={() => setSelectedDay(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Stat pill ───────────────────────────────────────────────────

function StatPill({
  label, value, tone, pulse, icon,
}: {
  label: string;
  value: number;
  tone: 'emerald' | 'amber' | 'plum' | 'slate';
  pulse?: boolean;
  icon?: React.ReactNode;
}) {
  const tones: Record<string, { bg: string; text: string; num: string }> = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', num: 'text-emerald-900' },
    amber:   { bg: 'bg-amber-50',   text: 'text-amber-700',   num: 'text-amber-900' },
    plum:    { bg: 'bg-[#F7EEF2]',  text: 'text-[#7A3B5E]',   num: 'text-[#5C2746]' },
    slate:   { bg: 'bg-slate-50',   text: 'text-slate-600',   num: 'text-slate-800' },
  };
  const t = tones[tone];
  return (
    <div className={`${t.bg} rounded-xl px-2.5 py-2 relative overflow-hidden`}>
      {pulse && (
        <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
        </span>
      )}
      <div className={`flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider ${t.text}`}>
        {icon}
        {label}
      </div>
      <div className={`text-lg sm:text-xl font-bold tabular-nums ${t.num}`}>{value}</div>
    </div>
  );
}

// ─── Day drawer ──────────────────────────────────────────────────

function DayDrawer({
  date, bookings, personal, onClose,
}: {
  date: Date;
  bookings: Booking[];
  personal: AdminCalendarEvent[];
  onClose: () => void;
}) {
  const dateLabel = date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
  const isToday = isSameDay(date, new Date());
  const total = bookings.length + personal.length;
  const activeBookings = bookings.filter(b => b.status !== 'cancelled' && b.status !== 'declined');
  const hours = activeBookings.reduce((s, b) => s + (b.durationMinutes ?? 0), 0) / 60;

  // Merge and sort all items by start time for unified timeline
  type TimelineItem =
    | { kind: 'booking'; time: string; booking: Booking }
    | { kind: 'gcal'; time: string; event: AdminCalendarEvent };
  const timeline: TimelineItem[] = [
    ...bookings.map(b => ({ kind: 'booking' as const, time: b.startTime, booking: b })),
    ...personal.map(e => ({ kind: 'gcal' as const, time: e.start, event: e })),
  ].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/30 z-40"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col sm:max-w-2xl sm:mx-auto"
      >
        {/* Handle */}
        <div className="flex justify-center pt-2 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#E8E0D8]" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 flex items-start justify-between border-b border-[#F0ECE8] shrink-0">
          <div>
            <p className="text-[10px] font-semibold text-[#C8A97D] uppercase tracking-wider">
              {isToday ? 'Today' : ''}
            </p>
            <h3 className="text-lg font-bold text-[#2D2A33]">{dateLabel}</h3>
            <p className="text-xs text-[#8E8E9F] mt-0.5">
              {total === 0 ? 'No events' : `${total} event${total === 1 ? '' : 's'}`}
              {hours > 0 && ` · ${hours.toFixed(1)}h booked`}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-lg hover:bg-[#F5F0EB] text-[#8E8E9F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5">
          {timeline.length === 0 && (
            <div className="text-center py-12">
              <CalendarDays className="w-10 h-10 text-[#E8E0D8] mx-auto mb-2" />
              <p className="text-sm text-[#8E8E9F]">No bookings or events on this day</p>
              <p className="text-[10px] text-[#B8B8C5] mt-1">Dr. Hala has the day free</p>
            </div>
          )}

          {timeline.map((item, i) => {
            if (item.kind === 'booking') {
              return <BookingRow key={`b-${item.booking.bookingId}`} booking={item.booking} />;
            }
            return <PersonalRow key={`g-${item.event.id}-${i}`} event={item.event} />;
          })}
        </div>
      </motion.div>
    </>
  );
}

// ─── Booking row inside drawer ───────────────────────────────────

function BookingRow({ booking }: { booking: Booking }) {
  const style = STATUS_STYLE[booking.status] ?? STATUS_STYLE.confirmed;
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);
  const timeLabel = `${start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} – ${end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  const mode = booking.sessionMode === 'online' ? 'Online' : 'In-person';
  const ModeIcon = booking.sessionMode === 'online' ? Video : Building2;

  return (
    <div className={`rounded-xl p-3 bg-white border border-[#F0ECE8] hover:border-[#E8E0D8] transition-colors`}>
      <div className="flex items-start gap-3">
        {/* Time column */}
        <div className="shrink-0 w-16 text-right">
          <div className="text-[10px] font-semibold text-[#8E8E9F] uppercase tracking-wider tabular-nums">
            {start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </div>
          <div className="text-[9px] text-[#B8B8C5] tabular-nums">
            {booking.durationMinutes} min
          </div>
        </div>

        {/* Vertical bar */}
        <div className={`w-0.5 self-stretch rounded-full ${style.barBg}`} />

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#2D2A33] truncate">{booking.clientName}</p>
              <p className="text-xs text-[#8E8E9F] truncate">
                {booking.serviceName || booking.serviceSlug}
              </p>
            </div>
            <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-semibold ${style.chipBg} ${style.chipText}`}>
              {style.label}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-[#8E8E9F]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="tabular-nums">{timeLabel}</span>
            </span>
            <span className="flex items-center gap-1">
              <ModeIcon className="w-3 h-3" />
              {mode}
            </span>
            {booking.series && (
              <span className="flex items-center gap-1 text-[#7A3B5E]">
                <RefreshCw className="w-3 h-3" />
                {booking.series.seriesIndex}/{booking.series.seriesTotal}
              </span>
            )}
          </div>
          {booking.meetLink && (
            <a
              href={booking.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[10px] font-medium text-[#7A3B5E] hover:text-[#6A2E4E] mt-1"
            >
              <Video className="w-3 h-3" />
              Join Meet
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Personal/GCal event row ─────────────────────────────────────

function PersonalRow({ event }: { event: AdminCalendarEvent }) {
  const isBusy = isBusyBlockEvent(event);
  const start = new Date(event.start);
  const end = new Date(event.end);
  const timeLabel = event.allDay
    ? 'All day'
    : `${start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} – ${end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;

  return (
    <div className="rounded-xl p-3 bg-slate-50/60 border border-dashed border-slate-200">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-16 text-right">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider tabular-nums">
            {event.allDay ? 'All day' : start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </div>
        </div>
        <div className={`w-0.5 self-stretch rounded-full ${isBusy ? 'bg-gray-300' : 'bg-slate-300'}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-700 truncate flex items-center gap-1.5">
                {isBusy ? <Lock className="w-3 h-3 text-gray-400" /> : <Users className="w-3 h-3 text-slate-400" />}
                {event.summary || 'Busy'}
              </p>
              {event.location && (
                <p className="text-[10px] text-slate-500 truncate">
                  <Building2 className="w-2.5 h-2.5 inline mr-1 -mt-0.5" />
                  {event.location}
                </p>
              )}
            </div>
            <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600">
              {isBusy ? 'Blocked' : 'Personal'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-0.5">
            <span className="flex items-center gap-1 tabular-nums">
              <Clock className="w-3 h-3" />
              {timeLabel}
            </span>
            {event.htmlLink && (
              <a
                href={event.htmlLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[#7A3B5E] hover:text-[#6A2E4E]"
              >
                Open in GCal
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
