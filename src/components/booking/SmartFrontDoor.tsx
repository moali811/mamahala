'use client';

/* ================================================================
   SmartFrontDoor — the new /book entry experience.

   Renders one of three states depending on what we know about the
   visitor:

     A. AUTHENTICATED RETURNING — two big cards: "Same as last time"
        and "Soonest with Dr. Hala". Free-consult tile suppressed.

     B. SOFT-RECOGNIZED — same two cards, plus an option to verify
        via magic link for full prefill. Free-consult suppressed if
        a prior recognition probe set freeConsultUsed.

     C. BRAND NEW — three intent cards (Talk soon / Help me find /
        I know what I need). Free-consult tile suppressed if the
        recognize-on-blur probe later sets freeConsultUsed.

   When ?fast=1 is on the URL, every state collapses to just the
   SoonestAvailableCard with an empathy line — the panic / on-the-go
   fast lane from the floating "Talk Now" button.
   ================================================================ */

import { Repeat, Zap, Heart, Compass, Grid3x3, ArrowRight, ArrowLeft } from 'lucide-react';
import MobileCarousel from '@/components/ui/MobileCarousel';
import SoonestAvailableCard from './SoonestAvailableCard';
import { services } from '@/data/services';

type Intent = 'soon' | 'explore' | 'browse';

interface PickedSlot {
  serviceSlug: string;
  serviceName: string;
  serviceNameAr: string;
  durationMinutes: number;
  startTime: string;
  endTime: string;
  sessionMode: 'online' | 'inPerson';
}

interface Props {
  locale: 'en' | 'ar';
  isRTL: boolean;
  fast: boolean;
  isAuthenticatedReturning: boolean;
  isSoftRecognized: boolean;
  recognizedFirstName: string | null;
  recognizedLastServiceSlug: string | null;
  clientTimezone: string;
  /** "Same as last time" tap → wizard pre-loads service + jumps to datetime */
  onRebookLast: (serviceSlug: string) => void;
  /** SoonestAvailableCard confirm → wizard takes the slot and routes onward */
  onPickSoonest: (picked: PickedSlot) => void;
  /** "Help me find" → existing AI intake flow */
  onIntent: (intent: Intent) => void;
}

const COPY = {
  en: {
    heroNamed: (n: string) => `Welcome back, ${n}.`,
    heroAnon: 'Welcome back.',
    heroNew: 'Hi. How can we help today?',
    heroSubReturning: 'Pick up where you left off, or jump to the next slot.',
    heroSubNew: 'Three quick paths to the right session for you.',
    sameAsLast: 'Same as last time',
    sameAsLastSub: (svc: string) => svc,
    sameAsLastNoSvc: 'Pick a service first time round, then we\'ll remember.',
    soonest: 'Soonest with Dr. Hala',
    soonestSub: 'Skip the calendar — we\'ll find the next opening.',
    intentSoonTitle: 'I need to talk soon',
    intentSoonSub: 'Find me the next opening with Dr. Hala.',
    intentExploreTitle: 'Help me find what fits',
    intentExploreSub: 'Tell us what\'s going on and we\'ll suggest a session.',
    intentBrowseTitle: 'I know what I need',
    intentBrowseSub: 'Browse our sessions by category.',
    fastEmpathy: 'Take a breath. Dr. Hala can meet you {when}.',
    fastEmpathyNoWhen: 'Take a breath. Dr. Hala will get back to you soon.',
    panicLabel: 'Talk to Dr. Hala — soonest slot',
    browseInstead: 'Try a different service →',
  },
  ar: {
    heroNamed: (n: string) => `مرحبًا بعودتك يا ${n}.`,
    heroAnon: 'مرحبًا بعودتك.',
    heroNew: 'مرحبًا. كيف يمكننا مساعدتك اليوم؟',
    heroSubReturning: 'تابع من حيث توقّفت، أو انتقل إلى أقرب موعد.',
    heroSubNew: 'ثلاثة طرق سريعة للوصول إلى الجلسة المناسبة لك.',
    sameAsLast: 'كما في المرّة السّابقة',
    sameAsLastSub: (svc: string) => svc,
    sameAsLastNoSvc: 'اختر خدمةً في مرّتك الأولى، وسنتذكّرها.',
    soonest: 'أقرب موعد مع د. هالة',
    soonestSub: 'تخطَّ التقويم — سنجد لك أقرب فرصة.',
    intentSoonTitle: 'أحتاج للحديث قريبًا',
    intentSoonSub: 'ابحث لي عن أقرب موعد مع د. هالة.',
    intentExploreTitle: 'ساعدني في إيجاد ما يناسبني',
    intentExploreSub: 'أخبرنا بما تمرّ به وسنقترح جلسة.',
    intentBrowseTitle: 'أعرف ما أحتاج',
    intentBrowseSub: 'تصفّح جلساتنا حسب الفئة.',
    fastEmpathy: 'خذ نفسًا عميقًا. تستطيع د. هالة لقاءَك {when}.',
    fastEmpathyNoWhen: 'خذ نفسًا عميقًا. ستعود إليك د. هالة قريبًا.',
    panicLabel: 'تحدّث مع د. هالة — أقرب موعد',
    browseInstead: '← جرّب خدمةً أخرى',
  },
} as const;

export default function SmartFrontDoor(props: Props) {
  const {
    locale, isRTL, fast,
    isAuthenticatedReturning, isSoftRecognized,
    recognizedFirstName, recognizedLastServiceSlug,
    clientTimezone,
    onRebookLast, onPickSoonest, onIntent,
  } = props;
  const t = COPY[locale];
  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  // ─── Fast lane: ?fast=1 ─────────────────────────────────────
  if (fast) {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
            {t.panicLabel}
          </h1>
        </div>
        <SoonestAvailableCard
          locale={locale}
          isRTL={isRTL}
          clientTimezone={clientTimezone}
          empathyLine={t.fastEmpathyNoWhen}
          onConfirm={onPickSoonest}
        />
      </div>
    );
  }

  // ─── Returning paths (A + B) — show two big cards ──────────
  if (isAuthenticatedReturning || isSoftRecognized) {
    const lastSvc = recognizedLastServiceSlug
      ? services.find(s => s.slug === recognizedLastServiceSlug)
      : null;
    const lastSvcName = lastSvc
      ? (isRTL ? lastSvc.nameAr : lastSvc.name)
      : null;

    return (
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
            {recognizedFirstName ? t.heroNamed(recognizedFirstName) : t.heroAnon}
          </h1>
          <p className="text-sm text-[#8E8E9F]">{t.heroSubReturning}</p>
        </div>

        <MobileCarousel mobileWidth="85vw" gap={16} desktopGrid="sm:grid-cols-2">
          {[
            // Same as last time — falls back to a quiet hint when we don't
            // know their last service yet.
            <button
              key="last"
              type="button"
              onClick={() => lastSvc && onRebookLast(lastSvc.slug)}
              disabled={!lastSvc}
              className="group w-full h-full text-start bg-white hover:bg-[#FAF7F2] disabled:hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl p-5 border-2 border-[#7A3B5E]/15 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#7A3B5E]/10 flex items-center justify-center">
                  <Repeat className="w-5 h-5 text-[#7A3B5E]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#4A4A5C]">{t.sameAsLast}</p>
                  <p className="text-xs text-[#8E8E9F] mt-1 leading-relaxed">
                    {lastSvcName ? t.sameAsLastSub(lastSvcName) : t.sameAsLastNoSvc}
                  </p>
                </div>
                <ForwardArrow className="w-4 h-4 text-[#7A3B5E] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>,
            // Soonest — fetches its own slot
            <div key="soonest" className="rounded-2xl border-2 border-[#C8A97D]/30 bg-white p-5 h-full">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#C8A97D]/15 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#C8A97D]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#4A4A5C]">{t.soonest}</p>
                  <p className="text-xs text-[#8E8E9F] mt-1 leading-relaxed">{t.soonestSub}</p>
                </div>
              </div>
              <SoonestAvailableCard
                locale={locale}
                isRTL={isRTL}
                clientTimezone={clientTimezone}
                embedded
                onConfirm={onPickSoonest}
              />
            </div>,
          ]}
        </MobileCarousel>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => onIntent('browse')}
            className="text-xs text-[#7A3B5E] hover:underline"
          >
            {t.browseInstead}
          </button>
        </div>
      </div>
    );
  }

  // ─── Brand new — three intent cards (C) ────────────────────
  const intentCards: { key: Intent; icon: typeof Heart; title: string; sub: string }[] = [
    { key: 'soon',    icon: Heart,   title: t.intentSoonTitle,    sub: t.intentSoonSub },
    { key: 'explore', icon: Compass, title: t.intentExploreTitle, sub: t.intentExploreSub },
    { key: 'browse',  icon: Grid3x3, title: t.intentBrowseTitle,  sub: t.intentBrowseSub },
  ];

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
          {t.heroNew}
        </h1>
        <p className="text-sm text-[#8E8E9F]">{t.heroSubNew}</p>
      </div>

      <MobileCarousel mobileWidth="80vw" gap={16} desktopGrid="sm:grid-cols-3">
        {intentCards.map(card => {
          const Icon = card.icon;
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => onIntent(card.key)}
              className="group w-full h-full text-start bg-white hover:bg-[#FAF7F2] active:scale-[0.98] rounded-2xl p-5 border-2 border-[#E8E0D8] hover:border-[#7A3B5E]/30 transition-all flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#7A3B5E]/10 flex items-center justify-center group-hover:bg-[#7A3B5E]/15 transition-colors">
                <Icon className="w-5 h-5 text-[#7A3B5E]" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-[#4A4A5C] leading-tight">{card.title}</p>
                <p className="text-xs text-[#8E8E9F] leading-relaxed">{card.sub}</p>
              </div>
            </button>
          );
        })}
      </MobileCarousel>
    </div>
  );
}
