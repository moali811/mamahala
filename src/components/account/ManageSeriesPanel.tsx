'use client';

/* ================================================================
   ManageSeriesPanel — Client-side series viewer + cancel-future
   ================================================================
   Groups the client's upcoming bookings by seriesId. Each active
   series gets a card showing how many sessions remain plus a
   "Cancel future sessions" affordance that opens a confirm modal
   with the refund preview from GET /api/account/series/{id}.
   ================================================================ */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarClock, Repeat, Loader2, X, AlertTriangle } from 'lucide-react';

interface SeriesAware {
  bookingId: string;
  startTime: string;
  endTime: string;
  status: string;
  serviceName?: string;
  series?: {
    seriesId: string;
    seriesIndex: number;
    seriesTotal: number;
    frequency: string;
    invoiceMode: string;
    paidUpfront?: boolean;
    origin?: string;
  };
}

interface RefundPerSession {
  bookingId: string;
  seriesIndex: number;
  startTime: string;
  feePercent: number;
  feeReason: 'late' | 'free';
}

interface RefundPreview {
  cancellableCount: number;
  perSession: RefundPerSession[];
}

interface Props {
  bookings: SeriesAware[];
  locale: 'en' | 'ar';
  onChanged?: () => void;
}

const COPY = {
  en: {
    sectionTitle: 'Your recurring series',
    seriesLabel: (count: number) => `${count}-session series`,
    statusBadge: (paid: boolean) => (paid ? 'Paid in full' : 'Pending payment'),
    futureCount: (n: number) => `${n} session${n === 1 ? '' : 's'} coming up`,
    nextOn: 'Next',
    manageCta: 'Manage future sessions',
    confirmTitle: 'Cancel future sessions?',
    confirmIntro: 'These sessions will be cancelled from your calendar:',
    refundExplain: 'Refund preview based on the cancellation policy:',
    feeFree: 'Free',
    feeLate: (pct: number) => `${Math.round(pct * 100)}% late fee`,
    cancel: 'Keep them',
    confirm: 'Cancel sessions',
    cancelling: 'Cancelling…',
    nothing: 'Nothing left to cancel.',
    error: 'Could not cancel. Try again.',
    success: (n: number) => `Cancelled ${n} session${n === 1 ? '' : 's'}.`,
  },
  ar: {
    sectionTitle: 'سلاسلك المتكررة',
    seriesLabel: (count: number) => `سلسلة من ${count} جلسات`,
    statusBadge: (paid: boolean) => (paid ? 'مدفوع بالكامل' : 'في انتظار الدفع'),
    futureCount: (n: number) => `${n} جلسة قادمة`,
    nextOn: 'التالية',
    manageCta: 'إدارة الجلسات القادمة',
    confirmTitle: 'إلغاء الجلسات القادمة؟',
    confirmIntro: 'سيتم إلغاء هذه الجلسات من تقويمك:',
    refundExplain: 'معاينة الاسترداد حسب سياسة الإلغاء:',
    feeFree: 'مجاني',
    feeLate: (pct: number) => `رسوم تأخير ${Math.round(pct * 100)}٪`,
    cancel: 'الإبقاء عليها',
    confirm: 'إلغاء الجلسات',
    cancelling: 'جاري الإلغاء…',
    nothing: 'لا يوجد ما يلغى.',
    error: 'تعذّر الإلغاء. حاول مرة أخرى.',
    success: (n: number) => `تم إلغاء ${n} جلسة.`,
  },
} as const;

const ACTIVE_STATES = new Set(['approved', 'confirmed', 'pending-review']);

export default function ManageSeriesPanel({ bookings, locale, onChanged }: Props) {
  const t = COPY[locale];

  // Group active series-aware bookings by seriesId.
  const seriesGroups = useMemo(() => {
    const groups = new Map<string, SeriesAware[]>();
    for (const b of bookings) {
      if (!b.series?.seriesId) continue;
      if (!ACTIVE_STATES.has(b.status)) continue;
      const arr = groups.get(b.series.seriesId) ?? [];
      arr.push(b);
      groups.set(b.series.seriesId, arr);
    }
    return Array.from(groups.entries()).map(([seriesId, items]) => ({
      seriesId,
      items: items.sort((a, b) => (a.series?.seriesIndex ?? 0) - (b.series?.seriesIndex ?? 0)),
    }));
  }, [bookings]);

  if (seriesGroups.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold text-[#8E8E9F] uppercase tracking-wider">{t.sectionTitle}</h2>
      {seriesGroups.map((g) => (
        <SeriesCard key={g.seriesId} seriesId={g.seriesId} items={g.items} locale={locale} onChanged={onChanged} />
      ))}
    </div>
  );
}

function SeriesCard({
  seriesId,
  items,
  locale,
  onChanged,
}: {
  seriesId: string;
  items: SeriesAware[];
  locale: 'en' | 'ar';
  onChanged?: () => void;
}) {
  const t = COPY[locale];
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [refund, setRefund] = useState<RefundPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const anchor = items.find((b) => b.series?.seriesIndex === 1) ?? items[0];
  const total = anchor.series?.seriesTotal ?? items.length;
  const paidUpfront = anchor.series?.paidUpfront === true;
  const futureCount = items.length;
  const next = items[0];

  const openConfirm = async () => {
    setConfirmOpen(true);
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/account/series/${seriesId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'fetch failed');
      setRefund(data.refundPreview as RefundPreview);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load preview.');
    } finally {
      setLoading(false);
    }
  };

  const submitCancel = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/account/series/${seriesId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notifyClient: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.error);
      setSuccess(t.success(data.cancelledCount ?? 0));
      onChanged?.();
      // Auto-close after a short pause so the user sees confirmation.
      setTimeout(() => setConfirmOpen(false), 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#7A3B5E]/15 bg-white px-4 py-3">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-[#7A3B5E]/10 flex items-center justify-center shrink-0">
          <Repeat className="w-4 h-4 text-[#7A3B5E]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-[#4A4A5C]">{t.seriesLabel(total)}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${paidUpfront ? 'bg-[#F0FAF5] text-[#3B8A6E]' : 'bg-[#FFF3E6] text-[#C8A97D]'}`}>
              {t.statusBadge(paidUpfront)}
            </span>
          </div>
          <p className="text-xs text-[#8E8E9F] mt-0.5">{t.futureCount(futureCount)}</p>
          {next && (
            <p className="text-[11px] text-[#8E8E9F] mt-0.5 flex items-center gap-1">
              <CalendarClock className="w-3 h-3" />
              {t.nextOn}: {new Date(next.startTime).toLocaleString(locale === 'ar' ? 'ar' : 'en-US', {
                weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
              })}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={openConfirm}
          className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#7A3B5E] hover:underline"
        >
          {t.manageCta}
        </button>
      </div>

      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => !submitting && setConfirmOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-5 py-4 border-b border-[#F0ECE8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#C45B5B]" />
                  <h3 className="text-sm font-semibold text-[#4A4A5C]">{t.confirmTitle}</h3>
                </div>
                <button
                  onClick={() => !submitting && setConfirmOpen(false)}
                  className="w-7 h-7 rounded-lg hover:bg-[#F5F0EB] flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5 text-[#8E8E9F]" />
                </button>
              </div>

              <div className="px-5 py-4 overflow-y-auto flex-1 space-y-3">
                {loading && (
                  <div className="flex justify-center py-6">
                    <Loader2 className="w-5 h-5 animate-spin text-[#8E8E9F]" />
                  </div>
                )}
                {!loading && refund && (
                  <>
                    <p className="text-xs text-[#4A4A5C]">{t.confirmIntro}</p>
                    {refund.cancellableCount === 0 ? (
                      <p className="text-xs text-[#8E8E9F] py-3 text-center">{t.nothing}</p>
                    ) : (
                      <>
                        <div className="rounded-lg border border-[#E8E4DE] divide-y divide-[#F0ECE8]">
                          {refund.perSession.map((s) => (
                            <div key={s.bookingId} className="px-3 py-2 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-5 h-5 rounded-full bg-[#7A3B5E]/10 text-[#7A3B5E] flex items-center justify-center text-[10px] font-bold">
                                  {s.seriesIndex}
                                </div>
                                <span className="text-xs text-[#4A4A5C]">
                                  {new Date(s.startTime).toLocaleString(locale === 'ar' ? 'ar' : 'en-US', {
                                    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
                                  })}
                                </span>
                              </div>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                s.feeReason === 'free' ? 'bg-[#F0FAF5] text-[#3B8A6E]' : 'bg-[#FFF1F1] text-[#C45B5B]'
                              }`}>
                                {s.feeReason === 'free' ? t.feeFree : t.feeLate(s.feePercent)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="text-[10px] text-[#8E8E9F] leading-relaxed">{t.refundExplain}</p>
                      </>
                    )}
                  </>
                )}
                {error && <p className="text-xs text-[#C45B5B]">{error}</p>}
                {success && <p className="text-xs text-[#3B8A6E] font-semibold">{success}</p>}
              </div>

              <div className="px-5 py-3 border-t border-[#F0ECE8] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#4A4A5C] hover:bg-[#F5F0EB] disabled:opacity-50"
                >
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={submitCancel}
                  disabled={submitting || loading || !refund || refund.cancellableCount === 0 || !!success}
                  className="px-5 py-2 rounded-lg bg-[#C45B5B] text-white text-xs font-semibold hover:bg-[#B14B4B] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
                  {submitting ? t.cancelling : t.confirm}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
