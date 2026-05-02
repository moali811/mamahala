'use client';

/* ================================================================
   SoonestAvailableCard — fetches and renders the next available
   slot with Dr. Hala. One tap and the wizard jumps to confirm
   (recognized clients) or info (anonymous fast-lane users).
   ================================================================ */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2, MessageCircle, Calendar } from 'lucide-react';
import { BUSINESS } from '@/config/business';

type SoonestResult =
  | {
      service: {
        slug: string;
        name: string;
        nameAr: string;
        durationMinutes: number;
        sessionMode: 'online' | 'inPerson';
      };
      slot: {
        startTime: string;
        endTime: string;
        durationMinutes: number;
        locationLabel: string;
      };
      horizonDays: number;
    }
  | { noSlotAvailable: true; horizonDays: number };

interface Props {
  /** Defaults to online-phone-consultation server-side */
  serviceSlug?: string;
  /** Display timezone for the relative time hint */
  clientTimezone?: string;
  locale: 'en' | 'ar';
  isRTL: boolean;
  /** Empathy line above the slot (e.g. "Take a breath. Dr. Hala can…") */
  empathyLine?: string;
  /** When true, suppress the internal "SOONEST WITH DR. HALA" label and
   *  the outer card chrome — used when this card is embedded inside
   *  another labeled wrapper (avoids duplicate label / nested borders). */
  embedded?: boolean;
  /** Tap handler — receives the picked service + slot, wizard takes over */
  onConfirm: (picked: {
    serviceSlug: string;
    serviceName: string;
    serviceNameAr: string;
    durationMinutes: number;
    startTime: string;
    endTime: string;
    sessionMode: 'online' | 'inPerson';
  }) => void;
  /** Optional escape hatch — when provided, renders a small secondary
   *  "Or pick another time →" link below the primary CTA. Lets users who
   *  don't like the soonest slot jump to the standard date/time picker
   *  without having to back out and re-choose an intent. */
  onPickAnotherTime?: () => void;
}

const COPY = {
  en: {
    loading: 'Finding the next opening with Dr. Hala…',
    cta: 'Book this slot',
    pickAnother: 'Or pick another time →',
    noneTitle: 'No slot in the next 2 weeks',
    noneBody: 'Send a quick message and we\'ll get back to you within 24 hours.',
    whatsappCta: 'Message us on WhatsApp',
    relativeNow: 'in less than an hour',
    relativeHours: (h: number) => `in about ${h} ${h === 1 ? 'hour' : 'hours'}`,
    relativeTomorrow: 'tomorrow',
    relativeDays: (d: number) => `in ${d} days`,
    label: 'Soonest with Dr. Hala',
  },
  ar: {
    loading: 'جارٍ إيجادُ أقربِ موعدٍ مع د. هالة…',
    cta: 'احجز هذا الموعد',
    pickAnother: '← أو اختر وقتًا آخر',
    noneTitle: 'لا توجد مواعيدُ ضمنَ الأسبوعينِ القادمينِ',
    noneBody: 'أرسلْ رسالةً سريعةً وسنردُّ عليك خلالَ 24 ساعة.',
    whatsappCta: 'راسلنا عبر واتساب',
    relativeNow: 'بعد أقلَّ من ساعة',
    relativeHours: (h: number) => `بعد حوالي ${h} ${h === 1 ? 'ساعة' : 'ساعات'}`,
    relativeTomorrow: 'غدًا',
    relativeDays: (d: number) => `بعد ${d} أيام`,
    label: 'أقرب موعد مع د. هالة',
  },
} as const;

function relativeTime(startIso: string, locale: 'en' | 'ar'): string {
  const t = COPY[locale];
  const ms = new Date(startIso).getTime() - Date.now();
  const hours = ms / 3600_000;
  if (hours < 1) return t.relativeNow;
  if (hours < 24) return t.relativeHours(Math.round(hours));
  const days = Math.round(hours / 24);
  if (days === 1) return t.relativeTomorrow;
  return t.relativeDays(days);
}

export default function SoonestAvailableCard({
  serviceSlug,
  clientTimezone,
  locale,
  isRTL,
  empathyLine,
  embedded = false,
  onConfirm,
  onPickAnotherTime,
}: Props) {
  const [data, setData] = useState<SoonestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = COPY[locale];

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    if (serviceSlug) params.set('service', serviceSlug);
    if (clientTimezone) params.set('tz', clientTimezone);
    fetch(`/api/book/soonest?${params.toString()}`)
      .then(r => (r.ok ? r.json() : Promise.reject(new Error('lookup failed'))))
      .then((d: SoonestResult) => { if (!cancelled) setData(d); })
      .catch(() => { if (!cancelled) setError('lookup failed'); });
    return () => { cancelled = true; };
  }, [serviceSlug, clientTimezone]);

  if (error) {
    return (
      <div className="rounded-2xl border border-[#E8E0D8] bg-white p-5 text-sm text-[#8E8E9F]">
        {t.noneBody}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-[#E8E0D8] bg-white p-5 flex items-center gap-3 text-sm text-[#8E8E9F]">
        <Loader2 className="w-4 h-4 animate-spin text-[#7A3B5E]" />
        <span>{t.loading}</span>
      </div>
    );
  }

  if ('noSlotAvailable' in data) {
    return (
      <div className="rounded-2xl border border-[#E8E0D8] bg-[#FFFAF5] p-6 space-y-3">
        <p className="font-semibold text-[#4A4A5C]">{t.noneTitle}</p>
        <p className="text-sm text-[#8E8E9F] leading-relaxed">{t.noneBody}</p>
        <a
          href={BUSINESS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1DA851] text-white px-4 py-2 text-sm font-semibold transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          {t.whatsappCta}
        </a>
      </div>
    );
  }

  const tz = clientTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const startDate = new Date(data.slot.startTime);
  const dateStr = startDate.toLocaleDateString(isRTL ? 'ar' : 'en-US', {
    timeZone: tz, weekday: 'long', month: 'long', day: 'numeric',
  });
  const timeStr = startDate.toLocaleTimeString(isRTL ? 'ar' : 'en-US', {
    timeZone: tz, hour: 'numeric', minute: '2-digit',
  });
  const rel = relativeTime(data.slot.startTime, locale);
  const serviceName = isRTL ? data.service.nameAr : data.service.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={embedded ? '' : 'rounded-2xl border border-[#7A3B5E]/15 bg-white p-5 sm:p-6 shadow-sm'}
    >
      {empathyLine && (
        <p className="text-sm text-[#7A3B5E] mb-3 leading-relaxed">{empathyLine}</p>
      )}

      <div className={`flex items-start gap-3 mb-4 ${embedded ? 'mt-0' : ''}`}>
        {!embedded && (
          <div className="w-10 h-10 rounded-xl bg-[#7A3B5E]/10 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-[#7A3B5E]" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {!embedded && (
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7A3B5E]/80">
              {t.label}
            </p>
          )}
          <p className={`font-semibold text-[#4A4A5C] leading-tight ${embedded ? 'text-sm' : 'text-base mt-0.5'}`}>
            {dateStr}, {timeStr}
          </p>
          <p className="text-xs text-[#8E8E9F] mt-1 leading-tight">
            {rel} • {data.slot.durationMinutes} {isRTL ? 'دقيقة' : 'min'} • {serviceName}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onConfirm({
          serviceSlug: data.service.slug,
          serviceName: data.service.name,
          serviceNameAr: data.service.nameAr,
          durationMinutes: data.service.durationMinutes,
          startTime: data.slot.startTime,
          endTime: data.slot.endTime,
          sessionMode: data.service.sessionMode,
        })}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7A3B5E] hover:bg-[#69304F] active:scale-[0.99] text-white px-4 py-2.5 sm:py-3 text-sm font-semibold transition-all"
      >
        <Calendar className="w-4 h-4" />
        {t.cta}
      </button>

      {onPickAnotherTime && (
        <button
          type="button"
          onClick={onPickAnotherTime}
          className="w-full mt-2 text-xs sm:text-sm text-[#7A3B5E] hover:underline font-medium transition-colors"
        >
          {t.pickAnother}
        </button>
      )}
    </motion.div>
  );
}
