'use client';

/* ================================================================
   AvailabilityEditor — admin UI for booking availability rules
   ================================================================
   Lets Dr. Hala control:
   1. Working timezone (America/Toronto, Asia/Dubai, custom IANA)
   2. Weekly schedule — per day-of-week, add/remove time blocks
   3. Blocked dates (for vacations, holidays, days off)
   4. Global rules (buffer, max sessions/day, slot granularity,
      advance booking window, minimum notice, cancellation policy)

   Uses the existing APIs:
   - GET /api/admin/booking/availability → load rules
   - POST /api/admin/booking/availability → save rules
   - POST /api/admin/booking/block-date → block/unblock a date

   No new API routes — the engine already reads from these KV keys
   via getAvailableSlots(). Changes take effect immediately for the
   public /en/book page.
   ================================================================ */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Plus, Trash2, Save, Loader2, Check, AlertCircle,
  Globe, CalendarX, Settings as SettingsIcon, ChevronDown,
} from 'lucide-react';
import type { AvailabilityRules, DaySchedule, BlockedDate } from '@/lib/booking/types';

interface Props {
  password: string;
}

const DAY_LABELS: Record<number, { short: string; full: string }> = {
  0: { short: 'Sun', full: 'Sunday' },
  1: { short: 'Mon', full: 'Monday' },
  2: { short: 'Tue', full: 'Tuesday' },
  3: { short: 'Wed', full: 'Wednesday' },
  4: { short: 'Thu', full: 'Thursday' },
  5: { short: 'Fri', full: 'Friday' },
  6: { short: 'Sat', full: 'Saturday' },
};

const COMMON_TIMEZONES = [
  'America/Toronto',
  'America/Vancouver',
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Dubai',
  'Asia/Riyadh',
  'Europe/London',
];

export default function AvailabilityEditor({ password }: Props) {
  const [rules, setRules] = useState<AvailabilityRules | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [section, setSection] = useState<'schedule' | 'blocked' | 'rules'>('schedule');

  // Blocked dates state — loaded from KV on mount via loadBlockedDates()
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [newBlockDate, setNewBlockDate] = useState('');
  const [newBlockReason, setNewBlockReason] = useState('Day off');
  const [newBlockType, setNewBlockType] = useState<'all-day' | 'time-range'>('all-day');
  const [newBlockStart, setNewBlockStart] = useState('20:00');
  const [newBlockEnd, setNewBlockEnd] = useState('21:00');

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${password}`,
      'Content-Type': 'application/json',
    }),
    [password],
  );

  // Auto-dismiss success after 4s
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(null), 4000);
    return () => clearTimeout(t);
  }, [success]);

  // Load rules on mount
  const loadRules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/booking/availability', { headers });
      if (!res.ok) throw new Error('Failed to load availability rules');
      const data = await res.json();
      setRules(data);
      setDirty(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [headers]);

  // Load blocked dates on mount — without this, the Blocked Dates tab
  // shows an empty list even if KV has blocked records, so previously-
  // blocked days can only be seen (and unblocked) by guessing dates.
  const loadBlockedDates = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/booking/block-date', { headers });
      if (!res.ok) throw new Error('Failed to load blocked dates');
      const data = await res.json();
      setBlockedDates(data.blockedDates ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blocked dates');
    }
  }, [headers]);

  useEffect(() => {
    loadRules();
    loadBlockedDates();
  }, [loadRules, loadBlockedDates]);

  // ─── Save ─────────────────────────────────────────────
  const saveRules = async () => {
    if (!rules) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/booking/availability', {
        method: 'POST',
        headers,
        body: JSON.stringify(rules),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setRules(data.rules);
      setDirty(false);
      setSuccess('Availability updated — clients will see the new schedule immediately');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  // ─── Update helpers ───────────────────────────────────
  const updateRules = (patch: Partial<AvailabilityRules>) => {
    if (!rules) return;
    setRules({ ...rules, ...patch });
    setDirty(true);
  };

  const toggleDay = (dayIndex: number, active: boolean) => {
    if (!rules) return;
    const schedule: DaySchedule | null = active
      ? { blocks: [{ start: '09:00', end: '17:00' }] }
      : null;
    updateRules({
      weeklySchedule: { ...rules.weeklySchedule, [dayIndex]: schedule },
    });
  };

  const addBlock = (dayIndex: number) => {
    if (!rules) return;
    const current = rules.weeklySchedule[dayIndex];
    if (!current) return;
    const newBlocks = [...current.blocks, { start: '18:00', end: '20:00' }];
    updateRules({
      weeklySchedule: {
        ...rules.weeklySchedule,
        [dayIndex]: { blocks: newBlocks },
      },
    });
  };

  const removeBlock = (dayIndex: number, blockIndex: number) => {
    if (!rules) return;
    const current = rules.weeklySchedule[dayIndex];
    if (!current) return;
    const newBlocks = current.blocks.filter((_, i) => i !== blockIndex);
    updateRules({
      weeklySchedule: {
        ...rules.weeklySchedule,
        [dayIndex]: newBlocks.length > 0 ? { blocks: newBlocks } : null,
      },
    });
  };

  const updateBlockTime = (
    dayIndex: number,
    blockIndex: number,
    field: 'start' | 'end',
    value: string,
  ) => {
    if (!rules) return;
    const current = rules.weeklySchedule[dayIndex];
    if (!current) return;
    const newBlocks = current.blocks.map((b, i) =>
      i === blockIndex ? { ...b, [field]: value } : b,
    );
    updateRules({
      weeklySchedule: {
        ...rules.weeklySchedule,
        [dayIndex]: { blocks: newBlocks },
      },
    });
  };

  // ─── Blocked date operations ──────────────────────────
  const addBlockedDate = async () => {
    if (!newBlockDate || !/^\d{4}-\d{2}-\d{2}$/.test(newBlockDate)) {
      setError('Pick a valid date first');
      return;
    }

    const isAllDay = newBlockType === 'all-day';

    // Validate time range for partial blocks
    if (!isAllDay) {
      if (!/^\d{2}:\d{2}$/.test(newBlockStart) || !/^\d{2}:\d{2}$/.test(newBlockEnd)) {
        setError('Start and end times are required');
        return;
      }
      if (newBlockStart >= newBlockEnd) {
        setError('End time must be after start time');
        return;
      }
    }

    const blockedSlots = isAllDay
      ? undefined
      : [{ start: newBlockStart, end: newBlockEnd }];

    try {
      const res = await fetch('/api/admin/booking/block-date', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          date: newBlockDate,
          reason: newBlockReason || (isAllDay ? 'Day off' : 'Unavailable'),
          allDay: isAllDay,
          blockedSlots,
          action: 'block',
        }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Block failed');
      }
      const result = await res.json().catch(() => ({}));

      setBlockedDates([
        ...blockedDates.filter(d => d.date !== newBlockDate),
        {
          date: newBlockDate,
          reason: newBlockReason || (isAllDay ? 'Day off' : 'Unavailable'),
          allDay: isAllDay,
          blockedSlots,
        },
      ].sort((a, b) => a.date.localeCompare(b.date)));
      setNewBlockDate('');

      const gcalHint = !isAllDay && result.gcalSynced > 0
        ? ' · added to Google Calendar'
        : '';
      setSuccess(
        isAllDay
          ? `Blocked ${newBlockDate} (all day)`
          : `Blocked ${newBlockDate} ${newBlockStart}–${newBlockEnd}${gcalHint}`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to block');
    }
  };

  const unblockDate = async (date: string) => {
    try {
      const res = await fetch('/api/admin/booking/block-date', {
        method: 'POST',
        headers,
        body: JSON.stringify({ date, action: 'unblock' }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Unblock failed');
      }
      setBlockedDates(blockedDates.filter(d => d.date !== date));
      setSuccess(`Unblocked ${date}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unblock');
    }
  };

  // ─── Render ────────────────────────────────────────────
  if (loading || !rules) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-6 h-6 text-[#C8A97D] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[#2D2A33]">Availability</h2>
          <p className="text-xs text-[#8E8E9F] mt-0.5">
            Control when clients can book sessions with Dr. Hala
          </p>
        </div>
        {dirty && (
          <button
            onClick={saveRules}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3B8A6E] text-white text-xs font-semibold hover:bg-[#2F7A5E] disabled:opacity-50 transition-all active:scale-95"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Changes
          </button>
        )}
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" /> {error}
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3 rounded-xl bg-green-50 border border-green-100 text-sm text-green-700 flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section tabs */}
      <div className="flex gap-1.5 p-1 bg-[#F5F0EB] rounded-xl">
        {([
          { key: 'schedule' as const, label: 'Weekly Schedule', icon: Clock },
          { key: 'blocked' as const, label: 'Blocked Dates', icon: CalendarX },
          { key: 'rules' as const, label: 'Global Rules', icon: SettingsIcon },
        ]).map(tab => {
          const Icon = tab.icon;
          const isActive = section === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSection(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-white text-[#7A3B5E] shadow-sm'
                  : 'text-[#8E8E9F] hover:text-[#4A4A5C]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── Weekly Schedule ──────────────────────────── */}
      {section === 'schedule' && (
        <div className="space-y-4">
          {/* Timezone picker */}
          <div className="bg-white rounded-xl border border-[#F0ECE8] p-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#4A4A5C] mb-2">
              <Globe className="w-3.5 h-3.5 text-[#C8A97D]" />
              Working timezone
            </label>
            <select
              value={rules.timezone}
              onChange={e => updateRules({ timezone: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
            >
              {COMMON_TIMEZONES.map(tz => (
                <option key={tz} value={tz}>
                  {tz.replace(/_/g, ' ')}
                </option>
              ))}
              {/* Always include the current value if it's custom */}
              {!COMMON_TIMEZONES.includes(rules.timezone) && (
                <option value={rules.timezone}>
                  {rules.timezone} (custom)
                </option>
              )}
            </select>
            <p className="text-[10px] text-[#8E8E9F] mt-1.5 leading-relaxed">
              All weekly schedule times below are interpreted in this timezone.
              Clients always see their own local time; the slot computation handles the conversion.
            </p>
          </div>

          {/* Weekly schedule — 7 days */}
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6, 0].map(dayIndex => {
              const label = DAY_LABELS[dayIndex];
              const day = rules.weeklySchedule[dayIndex];
              const active = day !== null && day !== undefined;
              return (
                <div
                  key={dayIndex}
                  className={`bg-white rounded-xl border p-3 transition-all ${
                    active ? 'border-[#F0ECE8]' : 'border-dashed border-[#E8E0D8] opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={e => toggleDay(dayIndex, e.target.checked)}
                        className="w-4 h-4 rounded accent-[#7A3B5E]"
                      />
                      <span className="text-sm font-semibold text-[#2D2A33]">
                        {label.full}
                      </span>
                    </label>
                    {active && (
                      <button
                        onClick={() => addBlock(dayIndex)}
                        className="text-[10px] font-semibold text-[#7A3B5E] hover:text-[#6A2E4E] flex items-center gap-1 px-2 py-1 rounded-md hover:bg-[#7A3B5E]/5 transition-colors"
                      >
                        <Plus className="w-3 h-3" /> Add block
                      </button>
                    )}
                  </div>
                  {active && day.blocks.map((block, blockIndex) => (
                    <div key={blockIndex} className="flex items-center gap-2 mb-1.5 last:mb-0">
                      <input
                        type="time"
                        value={block.start}
                        onChange={e => updateBlockTime(dayIndex, blockIndex, 'start', e.target.value)}
                        className="flex-1 px-2 py-1.5 rounded-md border border-[#E8E4DE] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                      />
                      <span className="text-xs text-[#8E8E9F]">→</span>
                      <input
                        type="time"
                        value={block.end}
                        onChange={e => updateBlockTime(dayIndex, blockIndex, 'end', e.target.value)}
                        className="flex-1 px-2 py-1.5 rounded-md border border-[#E8E4DE] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                      />
                      <button
                        onClick={() => removeBlock(dayIndex, blockIndex)}
                        className="p-1.5 text-[#8E8E9F] hover:text-red-500 transition-colors"
                        aria-label="Remove block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {!active && (
                    <p className="text-[10px] text-[#C0B8B0] italic">No sessions this day</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Blocked Dates ────────────────────────────── */}
      {section === 'blocked' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#F0ECE8] p-4 space-y-3">
            <p className="text-xs font-semibold text-[#4A4A5C]">Block a date or time slot</p>

            {/* Type toggle */}
            <div className="flex gap-1 p-1 bg-[#FAF7F2] rounded-lg w-fit">
              {(['all-day', 'time-range'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setNewBlockType(type)}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${
                    newBlockType === type
                      ? 'bg-white text-[#7A3B5E] shadow-sm'
                      : 'text-[#8E8E9F] hover:text-[#4A4A5C]'
                  }`}
                >
                  {type === 'all-day' ? 'All day' : 'Specific time'}
                </button>
              ))}
            </div>

            {/* Date + reason row */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="date"
                value={newBlockDate}
                onChange={e => setNewBlockDate(e.target.value)}
                min={new Date().toISOString().slice(0, 10)}
                className="flex-1 px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
              />
              <input
                type="text"
                value={newBlockReason}
                onChange={e => setNewBlockReason(e.target.value)}
                placeholder={newBlockType === 'all-day' ? 'Reason (e.g. Holiday)' : 'Private note (optional)'}
                className="flex-1 px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
              />
            </div>

            {/* Time range row (only for time-range blocks) */}
            {newBlockType === 'time-range' && (
              <>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={newBlockStart}
                    onChange={e => setNewBlockStart(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                  />
                  <span className="text-xs text-[#8E8E9F]">→</span>
                  <input
                    type="time"
                    value={newBlockEnd}
                    onChange={e => setNewBlockEnd(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
                  />
                </div>
                <p className="text-[10px] text-[#8E8E9F] italic leading-relaxed">
                  Clients won&apos;t see this slot in the booking picker. A generic
                  &ldquo;Unavailable&rdquo; event is added to Dr. Hala&apos;s Google Calendar — no
                  details are exposed publicly. Times use the provider timezone from the
                  Weekly Schedule tab.
                </p>
              </>
            )}

            <button
              onClick={addBlockedDate}
              disabled={!newBlockDate}
              className="w-full px-4 py-2 rounded-lg bg-[#7A3B5E] text-white text-xs font-semibold hover:bg-[#6A2E4E] disabled:opacity-50 transition-all active:scale-95 inline-flex items-center justify-center gap-1.5"
            >
              <CalendarX className="w-3.5 h-3.5" />
              Block
            </button>
          </div>

          {blockedDates.length > 0 && (
            <div className="bg-white rounded-xl border border-[#F0ECE8] overflow-hidden">
              <div className="px-4 py-2 bg-[#FAF7F2] border-b border-[#F0ECE8]">
                <p className="text-[10px] uppercase tracking-widest text-[#8E8E9F] font-semibold">
                  Blocked dates ({blockedDates.length})
                </p>
              </div>
              <div className="divide-y divide-[#F0ECE8]">
                {blockedDates.map(b => {
                  const slotLabel = !b.allDay && b.blockedSlots?.length
                    ? b.blockedSlots.map(s => `${s.start}–${s.end}`).join(', ')
                    : 'All day';
                  return (
                  <div key={b.date} className="flex items-center justify-between px-4 py-2.5">
                    <div>
                      <p className="text-sm font-mono text-[#2D2A33]">
                        {b.date}
                        <span className="ml-2 text-[11px] text-[#7A3B5E] font-sans font-semibold">
                          {slotLabel}
                        </span>
                      </p>
                      <p className="text-[10px] text-[#8E8E9F]">{b.reason}</p>
                    </div>
                    <button
                      onClick={() => unblockDate(b.date)}
                      className="text-[10px] font-semibold text-red-500 hover:text-red-600 px-2 py-1 rounded"
                    >
                      Unblock
                    </button>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

          {blockedDates.length === 0 && (
            <p className="text-xs text-center text-[#8E8E9F] py-6">
              No dates blocked. Use the form above to block a holiday or day off.
            </p>
          )}
        </div>
      )}

      {/* ─── Global Rules ─────────────────────────────── */}
      {section === 'rules' && (
        <div className="space-y-3">
          <RuleRow
            label="Buffer between sessions"
            help="Minutes of gap enforced between back-to-back sessions. Prevents rushed transitions."
            value={rules.bufferMinutes}
            unit="min"
            min={0}
            max={60}
            step={5}
            onChange={v => updateRules({ bufferMinutes: v })}
          />
          <RuleRow
            label="Max sessions per day"
            help="Hard cap on how many sessions can be booked on any single day."
            value={rules.maxSessionsPerDay}
            unit="sessions"
            min={1}
            max={20}
            step={1}
            onChange={v => updateRules({ maxSessionsPerDay: v })}
          />
          <RuleRow
            label="Slot granularity"
            help="Time intervals clients can pick. 15 min shows 9:00, 9:15, 9:30… 30 min shows 9:00, 9:30…"
            value={rules.slotGranularityMinutes}
            unit="min"
            min={5}
            max={60}
            step={5}
            onChange={v => updateRules({ slotGranularityMinutes: v })}
          />
          <RuleRow
            label="Advance booking window"
            help="How far in advance clients can book. 60 days = they can book up to 2 months out."
            value={rules.advanceBookingDays}
            unit="days"
            min={1}
            max={365}
            step={1}
            onChange={v => updateRules({ advanceBookingDays: v })}
          />
          <RuleRow
            label="Minimum notice"
            help="How close to 'now' clients can book. 2 hours prevents last-minute surprise bookings."
            value={rules.minimumNoticeHours}
            unit="hours"
            min={0}
            max={72}
            step={1}
            onChange={v => updateRules({ minimumNoticeHours: v })}
          />
          <RuleRow
            label="Cancellation window"
            help="Free cancellation allowed up to this many hours before the session."
            value={rules.cancellationPolicyHours}
            unit="hours"
            min={0}
            max={168}
            step={1}
            onChange={v => updateRules({ cancellationPolicyHours: v })}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Inline rule-row component ─────────────────────── */

function RuleRow({
  label,
  help,
  value,
  unit,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  help: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-[#F0ECE8] p-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setExpanded(e => !e)}
          className="p-1 rounded text-[#8E8E9F] hover:text-[#4A4A5C]"
          aria-label={expanded ? 'Collapse help' : 'Show help'}
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#2D2A33]">{label}</p>
          {expanded && (
            <p className="text-[10px] text-[#8E8E9F] mt-1 leading-relaxed">{help}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={e => onChange(Math.max(min, Math.min(max, parseInt(e.target.value, 10) || min)))}
            className="w-16 px-2 py-1 rounded-md border border-[#E8E4DE] text-xs font-mono text-right focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
          />
          <span className="text-xs text-[#8E8E9F] w-12">{unit}</span>
        </div>
      </div>
    </div>
  );
}
