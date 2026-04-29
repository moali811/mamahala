'use client';

/* ================================================================
   SelfServeRecurringStep — bundled-prepay series picker
   ================================================================
   Rendered as an expander on the confirm step when /api/account/
   eligibility returns eligible=true. Lets the client pick frequency
   + total sessions, previews the rolled slot times, and triggers a
   Stripe checkout for the bundled prepay total.

   Server enforces every constraint (the eligibility envelope is
   re-checked on POST), so this UI's job is only to make the picker
   delightful and prevent obviously-invalid inputs.
   ================================================================ */

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Loader2, Lock, Repeat, Check, AlertCircle } from 'lucide-react';
import type { RecurrenceFrequency } from '@/lib/booking/types';
import type { SelfServeEligibility } from '@/lib/booking/self-serve-eligibility';

interface PlannedSlot {
  index: number;
  startTime: string;
  endTime: string;
  status: 'available' | 'conflict' | 'outside-hours';
  conflictReason?: string;
}

interface Props {
  eligibility: SelfServeEligibility;
  serviceSlug: string;
  serviceName: string;
  durationMinutes: number;
  startTime: string;
  endTime: string;
  clientTimezone: string;
  locale: 'en' | 'ar';
  isLoading: boolean;
  /** Called on submit. Parent wires to wizard.submitSeries → Stripe redirect. */
  onSubmit: (args: {
    frequency: RecurrenceFrequency;
    totalSessions: number;
    slots: Array<{ startTime: string; endTime: string }>;
  }) => Promise<void> | void;
}

const FREQUENCY_LABELS: Record<RecurrenceFrequency, { en: string; ar: string }> = {
  weekly: { en: 'Weekly', ar: 'أسبوعياً' },
  biweekly: { en: 'Biweekly', ar: 'كل أسبوعين' },
  every3weeks: { en: 'Every 3 wks', ar: 'كل ٣ أسابيع' },
};

const COPY = {
  en: {
    title: 'Make this a recurring series',
    subtitle: 'Lock in your block of sessions and pay once. We’ll review and approve before any reminders.',
    frequencyLabel: 'How often?',
    sessionsLabel: 'Total sessions',
    sessionsHint: (count: number) => `Includes this session as #1. Up to ${count} for you.`,
    previewLabel: 'Series preview',
    payNote: 'Paid in full upfront via Stripe. Refundable per cancellation policy.',
    cta: 'Pay & request approval',
    insufficient: (n: number) =>
      n === 0
        ? 'Available after your first paid session.'
        : `${Math.max(0, 2 - n)} more paid session${2 - n === 1 ? '' : 's'} until you can self-serve a series.`,
    activeSeries: 'You already have an active series. Manage it from your account.',
    featureDisabled: 'Self-serve series booking is not yet enabled. Reach out to set one up.',
    notAuth: 'Sign in to book a recurring series.',
  },
  ar: {
    title: 'اجعليها سلسلة متكررة',
    subtitle: 'احجزي مجموعة جلساتك وادفعي مرة واحدة. سنراجع ونوافق قبل أي تذكيرات.',
    frequencyLabel: 'ما التكرار؟',
    sessionsLabel: 'عدد الجلسات',
    sessionsHint: (count: number) => `تشمل هذه الجلسة كرقم ١. الحد الأقصى لك ${count}.`,
    previewLabel: 'معاينة السلسلة',
    payNote: 'يُدفع بالكامل مقدمًا عبر Stripe. قابل للاسترداد حسب سياسة الإلغاء.',
    cta: 'ادفع/ي واطلب/ي الموافقة',
    insufficient: (n: number) =>
      n === 0
        ? 'متاح بعد أول جلسة مدفوعة.'
        : `تحتاجين ${Math.max(0, 2 - n)} جلسة مدفوعة إضافية لتتمكني من حجز سلسلة بنفسك.`,
    activeSeries: 'لديك سلسلة نشطة بالفعل. يمكنك إدارتها من حسابك.',
    featureDisabled: 'حجز السلاسل ذاتيًا غير مفعّل بعد. تواصلي معنا لإعداد واحدة.',
    notAuth: 'سجّلي الدخول لحجز سلسلة متكررة.',
  },
} as const;

const STEP_DAYS: Record<RecurrenceFrequency, number> = {
  weekly: 7,
  biweekly: 14,
  every3weeks: 21,
};

function rollSlotsClient(
  startTime: string,
  durationMinutes: number,
  frequency: RecurrenceFrequency,
  count: number,
): Array<{ index: number; startTime: string; endTime: string }> {
  const stepDays = STEP_DAYS[frequency];
  const out = [];
  for (let i = 0; i < count; i++) {
    const start = new Date(startTime);
    start.setUTCDate(start.getUTCDate() + i * stepDays);
    const end = new Date(start.getTime() + durationMinutes * 60_000);
    out.push({
      index: i + 1,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    });
  }
  return out;
}

export default function SelfServeRecurringStep(props: Props) {
  const t = COPY[props.locale];
  const [frequency, setFrequency] = useState<RecurrenceFrequency>('biweekly');
  const [totalSessions, setTotalSessions] = useState(Math.min(4, props.eligibility.maxSessionsAllowed || 4));
  const [planLoading, setPlanLoading] = useState(false);
  const [plan, setPlan] = useState<PlannedSlot[] | null>(null);

  // ─── Roll slots client-side for instant preview, then validate
  // server-side via /api/admin/booking/plan-series? No — that's an
  // admin route. Use a client-only roll for the preview. The server
  // re-validates every slot on POST anyway.
  const rolledSlots = useMemo(
    () => rollSlotsClient(props.startTime, props.durationMinutes, frequency, totalSessions),
    [props.startTime, props.durationMinutes, frequency, totalSessions],
  );

  useEffect(() => {
    setPlan(rolledSlots.map(s => ({
      index: s.index,
      startTime: s.startTime,
      endTime: s.endTime,
      status: 'available' as const,
    })));
  }, [rolledSlots]);

  // ─── Eligibility-guarded UI ─────────────────────────────────
  if (!props.eligibility.eligible) {
    let message: string;
    switch (props.eligibility.reason) {
      case 'not-authenticated': message = t.notAuth; break;
      case 'feature-disabled': message = t.featureDisabled; break;
      case 'has-active-series': message = t.activeSeries; break;
      case 'insufficient-history':
      default:
        message = t.insufficient(props.eligibility.paidSessionsCount);
    }
    return (
      <div className="rounded-2xl border border-[#E8E4DE] bg-white px-4 py-3 flex items-center gap-3">
        <Lock className="w-4 h-4 text-[#8E8E9F] shrink-0" />
        <p className="text-xs text-[#8E8E9F]">{message}</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    const slots = rolledSlots.map(s => ({ startTime: s.startTime, endTime: s.endTime }));
    await props.onSubmit({ frequency, totalSessions, slots });
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="rounded-2xl border border-[#7A3B5E]/20 bg-[#FFFAF5] p-4 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center shrink-0">
            <Repeat className="w-4 h-4 text-[#7A3B5E]" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[#4A4A5C]">{t.title}</h3>
            <p className="text-xs text-[#8E8E9F] mt-0.5">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#4A4A5C] mb-1.5 uppercase tracking-wider">{t.frequencyLabel}</label>
            <div className="grid grid-cols-3 gap-1.5">
              {props.eligibility.allowedFrequencies.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`px-2 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                    frequency === f
                      ? 'bg-[#7A3B5E] text-white'
                      : 'bg-white text-[#4A4A5C] hover:bg-[#F5F0EB] border border-[#E8E4DE]'
                  }`}
                >
                  {FREQUENCY_LABELS[f][props.locale]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#4A4A5C] mb-1.5 uppercase tracking-wider">{t.sessionsLabel}</label>
            <input
              type="number"
              min={2}
              max={props.eligibility.maxSessionsAllowed}
              value={totalSessions}
              onChange={(e) => setTotalSessions(Math.max(2, Math.min(props.eligibility.maxSessionsAllowed, parseInt(e.target.value, 10) || 2)))}
              className="w-full h-[38px] px-3 rounded-lg border border-[#E8E4DE] text-sm text-center font-semibold bg-white"
            />
            <p className="text-[10px] text-[#8E8E9F] mt-1">{t.sessionsHint(props.eligibility.maxSessionsAllowed)}</p>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#4A4A5C] mb-1.5 uppercase tracking-wider">{t.previewLabel}</label>
          <div className="rounded-lg border border-[#E8E4DE] divide-y divide-[#F0ECE8] max-h-48 overflow-y-auto bg-white">
            {plan?.map((slot) => {
              const slotTime = new Date(slot.startTime).toLocaleString(props.locale === 'ar' ? 'ar' : 'en-US', {
                weekday: 'short', month: 'short', day: 'numeric',
                hour: 'numeric', minute: '2-digit',
                timeZone: props.clientTimezone,
              });
              const conflict = slot.status !== 'available';
              return (
                <div key={slot.index} className={`px-3 py-2 flex items-center justify-between gap-2 ${conflict ? 'bg-[#FFF8F8]' : ''}`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      conflict
                        ? 'bg-[#C45B5B]/15 text-[#C45B5B]'
                        : slot.index === 1 ? 'bg-[#7A3B5E] text-white' : 'bg-[#3B8A6E]/15 text-[#3B8A6E]'
                    }`}>
                      {slot.index}
                    </div>
                    <span className="text-xs text-[#4A4A5C]">{slotTime}</span>
                  </div>
                  {conflict && (
                    <span className="text-[10px] text-[#C45B5B] font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {slot.conflictReason}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-start gap-2 text-[11px] text-[#8E8E9F] leading-relaxed">
          <CalendarClock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>{t.payNote}</span>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={props.isLoading || planLoading}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#69304F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {props.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          {t.cta}
        </button>
      </div>
    </motion.div>
  );
}
