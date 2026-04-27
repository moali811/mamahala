/* ================================================================
   RescheduleBookingModal — Admin-side reschedule with fee + override
   ================================================================
   Lets Dr. Hala / Mo move a booking to a new slot. Pulls available
   slots from /api/book/availability, previews the fee client-side
   from the same rules computeRescheduleFee() applies server-side
   (defaults: 2 free / 24h window / 25% late fee / cap 4), and
   submits to /api/admin/booking/reschedule with optional override.
   ================================================================ */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Clock, X, Loader2, AlertCircle, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Booking, TimeSlot } from '@/lib/booking/types';

interface Props {
  booking: Booking;
  bearerHeaders: HeadersInit;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

// Defaults match computeRescheduleFee() in src/lib/booking/cancel-policy.ts.
// Server is source-of-truth — these are just for the preview UI.
const RULE_FREE_COUNT = 2;
const RULE_WINDOW_HOURS = 24;
const RULE_LATE_FEE_PERCENT = 0.25;
const RULE_MAX_PER_BOOKING = 4;
const RULE_HARD_CUTOFF_HOURS = 2;

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatMonth(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
}

function formatSlotTime(start: string, tz: string): string {
  return new Date(start).toLocaleTimeString(undefined, {
    timeZone: tz, hour: 'numeric', minute: '2-digit',
  });
}

export default function RescheduleBookingModal({
  booking,
  bearerHeaders,
  onClose,
  onSuccess,
  onError,
}: Props) {
  const [selectedDate, setSelectedDate] = useState(addDays(todayISODate(), 1));
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [chosenSlot, setChosenSlot] = useState<TimeSlot | null>(null);
  const [reason, setReason] = useState('');

  // Override controls
  const [waiveFee, setWaiveFee] = useState(false);
  const [customFeeCents, setCustomFeeCents] = useState<string>('');
  const [overrideReason, setOverrideReason] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const tz = booking.clientTimezone || 'America/Toronto';
  const rescheduleCount = booking.rescheduleCount ?? 0;
  const paidCents = booking.paidAmountCents ?? 0;
  const currency = (booking.paidCurrency || 'CAD').toUpperCase();

  // Compute fee preview client-side (server validates on submit).
  const feePreview = useMemo(() => {
    if (!chosenSlot) return null;
    const hoursUntil = (new Date(chosenSlot.start).getTime() - Date.now()) / 3_600_000;
    if (rescheduleCount >= RULE_MAX_PER_BOOKING) {
      return { outcome: 'maxed' as const, feeCents: 0, message: `Already used ${rescheduleCount} of ${RULE_MAX_PER_BOOKING} reschedules — cancel + rebook required.` };
    }
    if (hoursUntil < RULE_HARD_CUTOFF_HOURS) {
      return { outcome: 'urgent' as const, feeCents: 0, message: `Less than ${RULE_HARD_CUTOFF_HOURS}h to current session — admin override required.` };
    }
    const withinFreeCount = rescheduleCount < RULE_FREE_COUNT;
    const insideLateWindow = hoursUntil < RULE_WINDOW_HOURS;
    if (withinFreeCount) {
      return { outcome: 'free' as const, feeCents: 0, message: `${RULE_FREE_COUNT - rescheduleCount} of ${RULE_FREE_COUNT} free reschedule${RULE_FREE_COUNT - rescheduleCount === 1 ? '' : 's'} remaining.` };
    }
    if (!insideLateWindow) {
      return { outcome: 'free' as const, feeCents: 0, message: `Past free count but ≥${RULE_WINDOW_HOURS}h notice — no fee.` };
    }
    const feeCents = Math.round(paidCents * RULE_LATE_FEE_PERCENT);
    return {
      outcome: 'fee' as const,
      feeCents,
      message: `Late reschedule (${Math.round(RULE_LATE_FEE_PERCENT * 100)}%) — $${(feeCents / 100).toFixed(2)} ${currency} fee applies.`,
    };
  }, [chosenSlot, rescheduleCount, paidCents, currency]);

  // Effective fee after override
  const effectiveFeeCents = useMemo(() => {
    const base = feePreview?.feeCents ?? 0;
    if (waiveFee) return 0;
    const custom = customFeeCents.trim();
    if (custom !== '') {
      const n = Math.round(Number(custom) * 100);
      if (Number.isFinite(n) && n >= 0) return n;
    }
    return base;
  }, [feePreview, waiveFee, customFeeCents]);

  const overrideActive = feePreview?.feeCents !== effectiveFeeCents;

  // Load slots when date changes
  const fetchSlots = useCallback(async (date: string) => {
    setSlotsLoading(true);
    setChosenSlot(null);
    try {
      const tzParam = encodeURIComponent(tz);
      const res = await fetch(
        `/api/book/availability?date=${date}&duration=${booking.durationMinutes}&tz=${tzParam}`,
      );
      if (!res.ok) {
        setSlots([]);
        return;
      }
      const data = await res.json();
      setSlots(Array.isArray(data?.slots) ? data.slots.filter((s: TimeSlot) => s.available) : []);
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, [booking.durationMinutes, tz]);

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate, fetchSlots]);

  const handleSubmit = async () => {
    if (!chosenSlot) {
      onError('Pick a new time first');
      return;
    }
    if (overrideActive && !overrideReason.trim()) {
      onError('Override reason is required when adjusting the fee');
      return;
    }
    setSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        bookingId: booking.bookingId,
        newStartTime: chosenSlot.start,
        newEndTime: chosenSlot.end,
        reason: reason.trim() || undefined,
      };
      if (overrideActive) {
        body.feeOverrideCents = effectiveFeeCents;
        body.overrideReason = overrideReason.trim();
      }
      const res = await fetch('/api/admin/booking/reschedule', {
        method: 'POST',
        headers: bearerHeaders,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        onError(data.error || 'Reschedule failed');
        return;
      }
      const niceTime = new Date(chosenSlot.start).toLocaleString(undefined, {
        timeZone: tz, weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
      });
      onSuccess(`Rescheduled ${booking.clientName} to ${niceTime}.`);
      onClose();
    } catch {
      onError('Server error');
    } finally {
      setSubmitting(false);
    }
  };

  const oldDateLabel = new Date(booking.startTime).toLocaleString(undefined, {
    timeZone: tz, weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40" onClick={submitting ? undefined : onClose} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDE8DF]">
          <div>
            <h3 className="text-base font-bold text-[#2D2A33] flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-[#7A3B5E]" />
              Reschedule booking
            </h3>
            <p className="text-xs text-[#8E8E9F] mt-0.5">
              {booking.clientName} · {booking.serviceName ?? booking.serviceSlug}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="p-1.5 rounded-lg text-[#8E8E9F] hover:bg-[#FAF7F2] disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Current vs new */}
          <div className="rounded-lg bg-[#FAF7F2] p-3">
            <p className="text-[10px] font-semibold text-[#C8A97D] uppercase tracking-[0.15em] mb-1">Currently</p>
            <p className="text-sm text-[#4A4A5C]">{oldDateLabel}</p>
            <p className="text-[11px] text-[#8E8E9F] mt-1">
              Reschedule count: <strong>{rescheduleCount}</strong> of {RULE_MAX_PER_BOOKING}
              {' · '}
              Paid: <strong>{paidCents > 0 ? `${(paidCents / 100).toFixed(2)} ${currency}` : '—'}</strong>
            </p>
          </div>

          {/* Date picker */}
          <div>
            <label className="text-xs font-semibold text-[#4A4A5C] mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#7A3B5E]" />
              New date
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedDate(d => addDays(d, -1))}
                disabled={selectedDate <= todayISODate()}
                className="p-1.5 rounded-lg border border-[#E8E4DE] text-[#4A4A5C] hover:bg-[#FAF7F2] disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <input
                type="date"
                value={selectedDate}
                min={todayISODate()}
                onChange={e => setSelectedDate(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm text-[#4A4A5C] bg-white focus:outline-none focus:border-[#7A3B5E]"
              />
              <button
                type="button"
                onClick={() => setSelectedDate(d => addDays(d, 1))}
                className="p-1.5 rounded-lg border border-[#E8E4DE] text-[#4A4A5C] hover:bg-[#FAF7F2]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-[#8E8E9F] mt-1">{formatMonth(selectedDate)} · times shown in {tz}</p>
          </div>

          {/* Slots */}
          <div>
            <label className="text-xs font-semibold text-[#4A4A5C] mb-2 block">Available times</label>
            {slotsLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-5 h-5 text-[#C8A97D] animate-spin" />
              </div>
            ) : slots.length === 0 ? (
              <p className="text-xs text-[#8E8E9F] py-3">No availability on this day. Try another date.</p>
            ) : (
              <div className="grid grid-cols-3 gap-1.5">
                {slots.map(slot => {
                  const active = chosenSlot?.start === slot.start;
                  return (
                    <button
                      key={slot.start}
                      type="button"
                      onClick={() => setChosenSlot(slot)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        active
                          ? 'bg-[#7A3B5E] text-white'
                          : 'bg-[#FAF7F2] text-[#4A4A5C] hover:bg-[#EDE6DF]'
                      }`}
                    >
                      {formatSlotTime(slot.start, tz)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Fee preview */}
          {feePreview && (
            <div
              className={`rounded-lg p-3 text-xs flex items-start gap-2 ${
                feePreview.outcome === 'fee'
                  ? 'bg-[#FFFAF0] border border-[#D49A4E]/30 text-[#8B6322]'
                  : feePreview.outcome === 'maxed' || feePreview.outcome === 'urgent'
                    ? 'bg-rose-50 border border-rose-200 text-rose-700'
                    : 'bg-[#F0FAF5] border border-[#3B8A6E]/20 text-[#2D6E54]'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold">{feePreview.message}</p>
                {feePreview.outcome === 'fee' && (
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={waiveFee}
                        onChange={e => setWaiveFee(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-[#D49A4E]"
                      />
                      <span>Waive fee (no charge)</span>
                    </label>
                    {!waiveFee && (
                      <label className="flex items-center gap-2">
                        <span>Custom fee:</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={customFeeCents}
                          onChange={e => setCustomFeeCents(e.target.value)}
                          placeholder={(feePreview.feeCents / 100).toFixed(2)}
                          className="w-24 px-2 py-1 rounded border border-[#D49A4E]/40 bg-white text-[#8B6322]"
                        />
                        <span>{currency}</span>
                      </label>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Override reason — required when overriding */}
          {feePreview && overrideActive && (
            <div>
              <label className="text-xs font-semibold text-[#4A4A5C] mb-1 block">
                Override reason <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={overrideReason}
                onChange={e => setOverrideReason(e.target.value)}
                placeholder="Required for audit log — e.g., 'Family emergency, waived as goodwill'"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#7A3B5E] resize-none"
              />
            </div>
          )}

          {/* Optional reschedule reason */}
          <div>
            <label className="text-xs font-semibold text-[#4A4A5C] mb-1 block">Reason (optional)</label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Why are we rescheduling?"
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#7A3B5E] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#EDE8DF] px-5 py-3 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-[#4A4A5C] hover:bg-[#FAF7F2] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || !chosenSlot || (overrideActive && !overrideReason.trim())}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5A2D47] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {submitting ? 'Rescheduling…' : effectiveFeeCents > 0 ? `Reschedule + charge ${(effectiveFeeCents / 100).toFixed(2)} ${currency}` : 'Reschedule'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
