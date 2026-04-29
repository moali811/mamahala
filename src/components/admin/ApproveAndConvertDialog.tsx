'use client';

/* ================================================================
   ApproveAndConvertDialog — Approve a booking AND convert to series
   ================================================================
   Pops from the booking queue when admin clicks "Approve & make
   recurring" on a pending_approval booking. Lets Dr. Hala pick:
     - Frequency: weekly / biweekly / every-3-weeks
     - Total sessions (2–12)
     - Invoice mode: per-session or bundled
     - Reason (audit trail)

   Auto-runs the series planner whenever inputs change so the admin
   sees conflicts inline before submitting.
   ================================================================ */

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarClock, Check, AlertTriangle, Loader2, X } from 'lucide-react';
import type { Booking, RecurrenceFrequency } from '@/lib/booking/types';

interface PlanSlot {
  index: number;
  startTime: string;
  endTime: string;
  status: 'available' | 'conflict' | 'outside-hours';
  conflictReason?: string;
  suggestedAlternatives?: Array<{ startTime: string; endTime: string }>;
}

interface Props {
  booking: Booking;
  password: string;
  onClose: () => void;
  onSuccess: (result: { seriesId: string; siblingCount: number }) => void;
}

const FREQUENCY_LABELS: Record<RecurrenceFrequency, string> = {
  weekly: 'Weekly',
  biweekly: 'Biweekly',
  every3weeks: 'Every 3 wks',
};

export default function ApproveAndConvertDialog({ booking, password, onClose, onSuccess }: Props) {
  const headers = { Authorization: `Bearer ${password}`, 'Content-Type': 'application/json' };

  const [frequency, setFrequency] = useState<RecurrenceFrequency>('weekly');
  const [totalSessions, setTotalSessions] = useState(4);
  const [invoiceMode, setInvoiceMode] = useState<'per-session' | 'bundled'>('per-session');
  const [reason, setReason] = useState('');
  const [plan, setPlan] = useState<PlanSlot[] | null>(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Map<number, { startTime: string; endTime: string }>>(new Map());

  // ─── Plan series whenever inputs change ──────────────────────
  const refetchPlan = useCallback(async () => {
    setPlanLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/booking/plan-series', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          serviceSlug: booking.serviceSlug,
          startTime: booking.startTime,
          frequency,
          count: totalSessions,
          durationMinutes: booking.durationMinutes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Series planner failed');
      setPlan(data.slots ?? []);
      setOverrides(new Map());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not plan series');
      setPlan(null);
    } finally {
      setPlanLoading(false);
    }
  }, [booking.serviceSlug, booking.startTime, booking.durationMinutes, frequency, totalSessions]);

  useEffect(() => {
    refetchPlan();
  }, [refetchPlan]);

  // ─── Submit ──────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!reason.trim()) {
      setError('Please add a brief reason — saved to the audit log.');
      return;
    }
    if (!plan) {
      setError('Wait for the series plan to load.');
      return;
    }

    // Slots for siblings (index 2..N). Use overrides where set.
    const siblingSlots = plan
      .filter(s => s.index > 1)
      .map(s => {
        const override = overrides.get(s.index);
        return override ?? { startTime: s.startTime, endTime: s.endTime };
      });

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/booking/approve-and-convert', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          bookingId: booking.bookingId,
          frequency,
          invoiceMode,
          totalSessions,
          slots: siblingSlots,
          reason: reason.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Conversion failed');
      onSuccess({ seriesId: data.seriesId, siblingCount: data.siblingBookingIds.length });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setSubmitting(false);
    }
  };

  const conflictCount = plan?.filter(s => s.status !== 'available').length ?? 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#F0ECE8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center">
                <CalendarClock className="w-4 h-4 text-[#7A3B5E]" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#4A4A5C]">Approve & make recurring</h2>
                <p className="text-[11px] text-[#8E8E9F]">{booking.clientName} · {booking.serviceName || booking.serviceSlug}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-[#F5F0EB] flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-[#8E8E9F]" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4 space-y-4 overflow-y-auto flex-1">
            {/* Frequency + count + invoice mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#4A4A5C] mb-1.5 uppercase tracking-wider">Frequency</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(Object.entries(FREQUENCY_LABELS) as Array<[RecurrenceFrequency, string]>).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFrequency(key)}
                      className={`px-2 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                        frequency === key
                          ? 'bg-[#7A3B5E] text-white'
                          : 'bg-white text-[#4A4A5C] hover:bg-[#F5F0EB] border border-[#E8E4DE]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#4A4A5C] mb-1.5 uppercase tracking-wider">Total sessions</label>
                <input
                  type="number"
                  min={2}
                  max={12}
                  value={totalSessions}
                  onChange={(e) => setTotalSessions(Math.max(2, Math.min(12, parseInt(e.target.value, 10) || 2)))}
                  className="w-full h-[38px] px-3 rounded-lg border border-[#E8E4DE] text-sm text-center font-semibold bg-white"
                />
                <p className="text-[10px] text-[#8E8E9F] mt-1">Includes the original session as #1</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4A4A5C] mb-1.5 uppercase tracking-wider">Invoice mode</label>
              <div className="grid grid-cols-2 gap-1.5">
                {([
                  { key: 'per-session', label: 'Per session', sub: 'One invoice per session' },
                  { key: 'bundled', label: 'Bundled', sub: 'One invoice for all sessions' },
                ] as const).map(opt => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setInvoiceMode(opt.key)}
                    className={`px-3 py-2.5 rounded-lg text-left transition-all active:scale-[0.98] ${
                      invoiceMode === opt.key
                        ? 'bg-[#7A3B5E] text-white'
                        : 'bg-white text-[#4A4A5C] hover:bg-[#F5F0EB] border border-[#E8E4DE]'
                    }`}
                  >
                    <div className="text-xs font-semibold">{opt.label}</div>
                    <div className={`text-[10px] mt-0.5 ${invoiceMode === opt.key ? 'text-white/80' : 'text-[#8E8E9F]'}`}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Series plan preview */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-[#4A4A5C] uppercase tracking-wider">Series preview</label>
                {planLoading && <Loader2 className="w-3 h-3 animate-spin text-[#8E8E9F]" />}
                {!planLoading && plan && (
                  conflictCount === 0
                    ? <span className="text-[10px] text-[#3B8A6E] font-semibold flex items-center gap-1"><Check className="w-3 h-3" /> All slots clear</span>
                    : <span className="text-[10px] text-[#C45B5B] font-semibold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {conflictCount} conflict{conflictCount === 1 ? '' : 's'}</span>
                )}
              </div>

              <div className="rounded-lg border border-[#E8E4DE] divide-y divide-[#F0ECE8] max-h-56 overflow-y-auto">
                {plan?.map(slot => {
                  const isConflict = slot.status !== 'available';
                  const slotTime = new Date(slot.startTime).toLocaleString('en-US', {
                    weekday: 'short', month: 'short', day: 'numeric',
                    hour: 'numeric', minute: '2-digit',
                    timeZone: booking.clientTimezone,
                  });
                  return (
                    <div key={slot.index} className={`px-3 py-2 flex items-center justify-between gap-2 ${isConflict ? 'bg-[#FFF8F8]' : ''}`}>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isConflict
                            ? 'bg-[#C45B5B]/15 text-[#C45B5B]'
                            : slot.index === 1 ? 'bg-[#7A3B5E] text-white' : 'bg-[#3B8A6E]/15 text-[#3B8A6E]'
                        }`}>
                          {slot.index}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-[#4A4A5C] truncate">{slotTime}</div>
                          {isConflict && (
                            <div className="text-[10px] text-[#C45B5B]">{slot.conflictReason}</div>
                          )}
                        </div>
                      </div>
                      {isConflict && slot.index > 1 && slot.suggestedAlternatives && slot.suggestedAlternatives.length > 0 && (
                        <select
                          className="text-[10px] px-2 py-1 rounded border border-[#E8E4DE] bg-white max-w-[160px]"
                          onChange={(e) => {
                            if (!e.target.value) return;
                            const alt = slot.suggestedAlternatives!.find(a => a.startTime === e.target.value);
                            if (alt) {
                              setOverrides(prev => {
                                const next = new Map(prev);
                                next.set(slot.index, alt);
                                return next;
                              });
                            }
                          }}
                          defaultValue=""
                        >
                          <option value="" disabled>Pick alternative…</option>
                          {slot.suggestedAlternatives.map(alt => (
                            <option key={alt.startTime} value={alt.startTime}>
                              {new Date(alt.startTime).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: booking.clientTimezone })}
                            </option>
                          ))}
                        </select>
                      )}
                      {overrides.has(slot.index) && (
                        <span className="text-[10px] text-[#3B8A6E] font-semibold">Overridden</span>
                      )}
                    </div>
                  );
                })}
                {!plan && !planLoading && (
                  <div className="px-3 py-4 text-xs text-[#8E8E9F] text-center">No plan yet</div>
                )}
              </div>
              <p className="text-[10px] text-[#8E8E9F] mt-1">Session #1 stays at the original time. Sessions #2+ are auto-rolled at the chosen frequency.</p>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-[11px] font-semibold text-[#4A4A5C] mb-1.5 uppercase tracking-wider">Reason for conversion</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Client requested a 6-session block at intake call"
                className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white resize-none"
                rows={2}
              />
              <p className="text-[10px] text-[#8E8E9F] mt-1">Saved to the audit log. Required.</p>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-[#FFF1F1] border border-[#F4D4D4] text-xs text-[#C45B5B]">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-[#F0ECE8] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#4A4A5C] hover:bg-[#F5F0EB] disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || planLoading || !plan}
              className="px-5 py-2 rounded-lg bg-[#7A3B5E] text-white text-xs font-semibold hover:bg-[#69304F] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              Approve {totalSessions} sessions
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
