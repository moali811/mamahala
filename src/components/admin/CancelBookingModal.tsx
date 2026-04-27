/* ================================================================
   CancelBookingModal — Admin-side cancel with fee preview + override
   ================================================================
   Mirrors the RescheduleBookingModal pattern. Shows what the cancel
   policy would charge right now (computed client-side from the same
   rules computeCancelFee uses on the server), surfaces compassionate-
   cancel keyword highlights, and submits to the new
   /api/admin/booking/cancel endpoint which writes an audit-log entry.
   ================================================================ */

'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, AlertCircle, Heart } from 'lucide-react';
import type { Booking } from '@/lib/booking/types';

interface Props {
  booking: Booking;
  bearerHeaders: HeadersInit;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

// Defaults match computeCancelFee() in src/lib/booking/cancel-policy.ts.
const RULE_FREE_WINDOW_HOURS = 24;
const RULE_HARD_CUTOFF_HOURS = 2;
const RULE_LATE_FEE_PERCENT = 0.5;

// Mirrors detectCompassionateCancel() — keep in sync if that list changes.
const COMPASSION_KEYWORDS = [
  'death', 'died', 'passed away', 'passing', 'funeral', 'bereavement',
  'hospital', 'hospitalized', 'er ', 'emergency', 'urgent care',
  'illness', 'sick', 'flu', 'covid', 'fever', 'surgery',
  'accident', 'crash', 'injury', 'injured',
  'family crisis', 'mental health', 'crisis', 'breakdown',
  'miscarriage', 'pregnancy', 'labor',
];

function detectCompassion(reason: string): { matched: boolean; keywords: string[] } {
  if (!reason.trim()) return { matched: false, keywords: [] };
  const lc = reason.toLowerCase();
  const hits = COMPASSION_KEYWORDS.filter(k => lc.includes(k));
  return { matched: hits.length > 0, keywords: Array.from(new Set(hits)) };
}

export default function CancelBookingModal({
  booking,
  bearerHeaders,
  onClose,
  onSuccess,
  onError,
}: Props) {
  const [reason, setReason] = useState('');
  const [waiveFee, setWaiveFee] = useState(false);
  const [customFeeCents, setCustomFeeCents] = useState<string>('');
  const [overrideReason, setOverrideReason] = useState('');
  const [notifyClient, setNotifyClient] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const tz = booking.clientTimezone || 'America/Toronto';
  const paidCents = booking.paidAmountCents ?? 0;
  const currency = (booking.paidCurrency || 'CAD').toUpperCase();

  const feePreview = useMemo(() => {
    const hoursUntil = (new Date(booking.startTime).getTime() - Date.now()) / 3_600_000;
    if (hoursUntil < 0) {
      return { outcome: 'past' as const, feeCents: 0, refundCents: 0, hoursUntil, message: 'Session already happened.' };
    }
    if (hoursUntil < RULE_HARD_CUTOFF_HOURS) {
      return {
        outcome: 'urgent' as const,
        feeCents: Math.round(paidCents * RULE_LATE_FEE_PERCENT),
        refundCents: paidCents - Math.round(paidCents * RULE_LATE_FEE_PERCENT),
        hoursUntil,
        message: `Less than ${RULE_HARD_CUTOFF_HOURS}h to session. Client cannot self-cancel — admin override only.`,
      };
    }
    if (hoursUntil >= RULE_FREE_WINDOW_HOURS) {
      return { outcome: 'free' as const, feeCents: 0, refundCents: paidCents, hoursUntil, message: `${Math.round(hoursUntil)}h notice — free cancellation.` };
    }
    const feeCents = Math.round(paidCents * RULE_LATE_FEE_PERCENT);
    return {
      outcome: 'fee' as const,
      feeCents,
      refundCents: paidCents - feeCents,
      hoursUntil,
      message: `Inside the ${RULE_FREE_WINDOW_HOURS}h window — ${Math.round(RULE_LATE_FEE_PERCENT * 100)}% late fee applies.`,
    };
  }, [booking.startTime, paidCents]);

  const compassion = useMemo(() => detectCompassion(reason), [reason]);

  // Auto-suggest waive on compassion match (admin can untoggle).
  useEffect(() => {
    if (compassion.matched && feePreview.outcome === 'fee' && !waiveFee && customFeeCents === '') {
      setWaiveFee(true);
      if (!overrideReason.trim()) {
        setOverrideReason('Compassion — keyword match: ' + compassion.keywords.join(', '));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compassion.matched, feePreview.outcome]);

  const effectiveFeeCents = useMemo(() => {
    const base = feePreview.feeCents;
    if (waiveFee) return 0;
    const custom = customFeeCents.trim();
    if (custom !== '') {
      const n = Math.round(Number(custom) * 100);
      if (Number.isFinite(n) && n >= 0) return n;
    }
    return base;
  }, [feePreview, waiveFee, customFeeCents]);

  const overrideActive = feePreview.feeCents !== effectiveFeeCents;
  const refundCents = Math.max(0, paidCents - effectiveFeeCents);

  const handleSubmit = async () => {
    if (overrideActive && !overrideReason.trim()) {
      onError('Override reason is required when adjusting the fee');
      return;
    }
    setSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        bookingId: booking.bookingId,
        reason: reason.trim() || undefined,
        notifyClient,
      };
      if (overrideActive) {
        body.feeOverrideCents = effectiveFeeCents;
        body.overrideReason = overrideReason.trim();
      }
      const res = await fetch('/api/admin/booking/cancel', {
        method: 'POST',
        headers: bearerHeaders,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        onError(data.error || 'Cancel failed');
        return;
      }
      const feeNote = effectiveFeeCents > 0
        ? ` — fee retained: ${(effectiveFeeCents / 100).toFixed(2)} ${currency}, refund: ${(refundCents / 100).toFixed(2)} ${currency}`
        : refundCents > 0
          ? ` — full refund of ${(refundCents / 100).toFixed(2)} ${currency} issued`
          : '';
      const manualNote = data.fee?.manualRefundNeeded ? ' (manual refund needed — non-Stripe payment)' : '';
      onSuccess(`Cancelled ${booking.clientName}'s booking${feeNote}${manualNote}`);
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
              <X className="w-4 h-4 text-[#C45B5B]" />
              Cancel booking
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
          {/* Current session info */}
          <div className="rounded-lg bg-[#FAF7F2] p-3">
            <p className="text-[10px] font-semibold text-[#C8A97D] uppercase tracking-[0.15em] mb-1">Session</p>
            <p className="text-sm text-[#4A4A5C]">{oldDateLabel}</p>
            <p className="text-[11px] text-[#8E8E9F] mt-1">
              Paid: <strong>{paidCents > 0 ? `${(paidCents / 100).toFixed(2)} ${currency}` : '—'}</strong>
              {' · '}
              {Math.round(feePreview.hoursUntil * 10) / 10}h until session
            </p>
          </div>

          {/* Reason */}
          <div>
            <label className="text-xs font-semibold text-[#4A4A5C] mb-1 block">Cancel reason</label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Why is this booking being cancelled? (optional, but helpful for audit)"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#7A3B5E] resize-none"
            />
            {compassion.matched && (
              <div className="mt-2 px-3 py-2 rounded-lg bg-[#F0FAF5] border border-[#3B8A6E]/20 flex items-start gap-2">
                <Heart className="w-3.5 h-3.5 text-[#3B8A6E] mt-0.5 shrink-0" />
                <p className="text-[11px] text-[#2D6E54] leading-relaxed">
                  <strong>Compassion match:</strong> {compassion.keywords.join(', ')}. Fee waiver pre-filled — adjust below if needed.
                </p>
              </div>
            )}
          </div>

          {/* Fee preview */}
          <div
            className={`rounded-lg p-3 text-xs flex items-start gap-2 ${
              feePreview.outcome === 'fee'
                ? 'bg-[#FFFAF0] border border-[#D49A4E]/30 text-[#8B6322]'
                : feePreview.outcome === 'urgent' || feePreview.outcome === 'past'
                  ? 'bg-rose-50 border border-rose-200 text-rose-700'
                  : 'bg-[#F0FAF5] border border-[#3B8A6E]/20 text-[#2D6E54]'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">{feePreview.message}</p>
              {feePreview.feeCents > 0 && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Computed fee:</span>
                    <strong>{(feePreview.feeCents / 100).toFixed(2)} {currency}</strong>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={waiveFee}
                      onChange={e => {
                        setWaiveFee(e.target.checked);
                        if (e.target.checked) setCustomFeeCents('');
                      }}
                      className="w-3.5 h-3.5 rounded"
                    />
                    <span>Waive fee (no charge — full refund)</span>
                  </label>
                  {!waiveFee && (
                    <label className="flex items-center gap-2">
                      <span>Custom fee:</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max={(paidCents / 100).toString()}
                        value={customFeeCents}
                        onChange={e => setCustomFeeCents(e.target.value)}
                        placeholder={(feePreview.feeCents / 100).toFixed(2)}
                        className="w-24 px-2 py-1 rounded border border-[#D49A4E]/40 bg-white"
                      />
                      <span>{currency}</span>
                    </label>
                  )}
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#D49A4E]/20">
                    <span>Effective refund:</span>
                    <strong>{(refundCents / 100).toFixed(2)} {currency}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Override reason — required when overriding */}
          {overrideActive && (
            <div>
              <label className="text-xs font-semibold text-[#4A4A5C] mb-1 block">
                Override reason <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={overrideReason}
                onChange={e => setOverrideReason(e.target.value)}
                placeholder="Required for audit log — e.g., 'Compassion: hospital admission'"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#7A3B5E] resize-none"
              />
            </div>
          )}

          {/* Notify client toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#4A4A5C]">
            <input
              type="checkbox"
              checked={notifyClient}
              onChange={e => setNotifyClient(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span>Send cancellation email to client</span>
          </label>
        </div>

        {/* Footer */}
        <div className="border-t border-[#EDE8DF] px-5 py-3 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-[#4A4A5C] hover:bg-[#FAF7F2] disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || (overrideActive && !overrideReason.trim())}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C45B5B] text-white text-sm font-semibold hover:bg-[#9D3E3E] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
            {submitting
              ? 'Cancelling…'
              : effectiveFeeCents > 0
                ? `Cancel + retain ${(effectiveFeeCents / 100).toFixed(2)} ${currency}`
                : refundCents > 0
                  ? `Cancel + refund ${(refundCents / 100).toFixed(2)} ${currency}`
                  : 'Confirm cancel'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
