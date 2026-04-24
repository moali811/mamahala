'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTourState } from './useTourState';
import TourSpotlight from './TourSpotlight';

export interface ProgramsTourProps {
  locale: string;
}

interface StepCopy {
  /** data-tour attribute on the element to highlight. */
  target: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
}

const STEPS: StepCopy[] = [
  {
    target: 'programs-grid',
    titleEn: 'Four programs',
    titleAr: 'أربعةُ برامج',
    bodyEn: 'Four programs — one for each chapter of family life: parents, teens, couples, and self.',
    bodyAr: 'أربعةُ برامج — واحدٌ لكلِّ فصلٍ من رحلة الأسرة: الآباء، المراهقون، الأزواج، والذّات.',
  },
  {
    target: 'level-1-free',
    titleEn: 'Level 1 is free',
    titleAr: 'المستوى الأوّل مجّاني',
    bodyEn: 'Every program starts with Level 1 — free, no card, no signup. Begin whenever feels right.',
    bodyAr: 'كلُّ برنامجٍ يبدأ بالمستوى الأوّل — مجّاناً، دون بطاقة، دون تسجيل. ابدأ حين يُناسبُك الوقت.',
  },
  {
    target: 'price',
    titleEn: 'One payment, lifetime',
    titleAr: 'دفعةٌ واحدة، مدى الحياة',
    bodyEn: 'If it helps, unlock the full program with one payment of $41 CAD. Yours for life. No subscription, no renewals.',
    bodyAr: 'إن وجدتَ فيه ما يُفيدك، افتح البرنامجَ بالكامل بدفعةٍ واحدة — ٤١ دولاراً كندياً. لك مدى الحياة. لا اشتراكات، ولا تجديدات.',
  },
  {
    target: 'cta',
    titleEn: 'Pick your chapter',
    titleAr: 'اختر فصلَك',
    bodyEn: "Finish any level and you'll receive a signed certificate. Pick a program that fits your chapter.",
    bodyAr: 'بإتمامِك أيَّ مستوى، ستحصُل على شهادةٍ موقّعة. اختر البرنامجَ الذي يناسبُ فصلَك.',
  },
];

const WELCOME = {
  titleEn: 'Welcome to Mama Hala Academy',
  titleAr: 'أهلاً بك في أكاديمية ماما هالة',
  bodyEn: 'A quick look inside Mama Hala Academy — 30 seconds, and the choice is yours.',
  bodyAr: 'جولةٌ قصيرةٌ داخل أكاديمية ماما هالة — ٣٠ ثانية، والقرارُ لك بعدها.',
  showMeEn: 'Show me',
  showMeAr: 'اعرِضْها',
  notNowEn: 'Not now',
  notNowAr: 'ليس الآن',
};

const UI = {
  nextEn: 'Next',
  nextAr: 'التالي',
  finishEn: 'Got it',
  finishAr: 'تمام',
  backEn: 'Back',
  backAr: 'السابق',
  dismissEn: 'Close tour',
  dismissAr: 'إغلاق الجولة',
  replayEn: 'Take the tour',
  replayAr: 'خذ الجولة',
  stepEn: (i: number, n: number) => `${i} / ${n}`,
  stepAr: (i: number, n: number) => `${i} / ${n}`,
  completeEn: 'That\'s the tour. Enjoy Mama Hala Academy.',
  completeAr: 'انتهت الجولة. رحلةً طيّبةً في أكاديمية ماما هالة.',
};

export default function ProgramsTour({ locale }: ProgramsTourProps) {
  const isRTL = locale === 'ar';
  const tour = useTourState({
    storageKey: 'mh_programs_tour_seen',
    stepCount: STEPS.length,
    welcomeDelayMs: 1200,
  });

  // Wait for target elements to render before committing to "running". If the
  // target isn't in the DOM, the step would render a broken spotlight — so we
  // skip to next. Also scrolls the target into view before revealing the
  // tooltip, otherwise targets below the fold render the tooltip clamped to
  // the middle of the viewport with no visible highlight.
  // Effect depends only on stable primitive values (phase + stepIndex) and
  // the stable callback `dismiss` — NOT the whole `tour` object, which is a
  // fresh reference every render and would thrash this effect.
  const [ready, setReady] = useState(false);
  const tourDismiss = tour.dismiss;
  useEffect(() => {
    if (tour.phase !== 'running') {
      setReady(false);
      return;
    }
    const key = STEPS[tour.stepIndex]?.target;
    if (!key) return;
    setReady(false);

    const revealIfReady = () => {
      const el = document.querySelector<HTMLElement>(`[data-tour="${key}"]`);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const offScreen = rect.top < 80 || rect.bottom > window.innerHeight - 60;
      if (offScreen) {
        // Compute absolute target Y. Using 'auto' (instant) so it works even
        // when the tab is backgrounded / document is hidden, where 'smooth'
        // gets throttled to 0. Users see a near-instant scroll, which is fine
        // for a guided tour — smoothness isn't essential.
        const absoluteTop = rect.top + window.scrollY;
        const targetY = Math.max(0, absoluteTop - Math.max(0, (window.innerHeight - rect.height) / 2));
        window.scrollTo({ top: targetY, behavior: 'auto' });
        // Single frame to let the scroll settle before revealing.
        requestAnimationFrame(() => setReady(true));
      } else {
        setReady(true);
      }
      return true;
    };

    if (revealIfReady()) return;

    const observer = new MutationObserver(() => {
      if (revealIfReady()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const kill = window.setTimeout(() => {
      observer.disconnect();
      const el = document.querySelector(`[data-tour="${key}"]`);
      if (!el) tourDismiss();
    }, 3000);
    return () => { observer.disconnect(); window.clearTimeout(kill); };
  }, [tour.phase, tour.stepIndex, tourDismiss]);

  const step = STEPS[tour.stepIndex];
  const isLastStep = tour.stepIndex === STEPS.length - 1;

  return (
    <>
      {/* Replay pill — always visible, unobtrusive. Re-opens the tour. */}
      <button
        type="button"
        onClick={tour.start}
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-40 px-3 py-2 rounded-full bg-white/90 backdrop-blur border border-[#F0ECE8] text-xs font-semibold text-[#7A3B5E] shadow-md hover:bg-white hover:shadow-lg transition-all`}
        aria-label={isRTL ? UI.replayAr : UI.replayEn}
      >
        <span aria-hidden className={isRTL ? 'ml-1.5' : 'mr-1.5'}>✨</span>
        {isRTL ? UI.replayAr : UI.replayEn}
      </button>

      {/* Welcome modal — plain conditional (no AnimatePresence) to avoid
          a framer-motion exit-overlap with the spotlight that left the
          overlay stuck at ~0.7 opacity. */}
      {tour.phase === 'welcome' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200"
          style={{ background: 'rgba(20,15,25,0.55)' }}
          onClick={e => { if (e.target === e.currentTarget) tour.dismiss(); }}
        >
          <div
            dir={isRTL ? 'rtl' : 'ltr'}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-welcome-title"
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7 text-center"
          >
            <div className="text-3xl mb-3" aria-hidden>🌿</div>
            <h2 id="tour-welcome-title" className="text-xl font-bold text-[#2D2A33] mb-2">
              {isRTL ? WELCOME.titleAr : WELCOME.titleEn}
            </h2>
            <p className="text-sm text-[#4A4A5C] leading-relaxed mb-5">
              {isRTL ? WELCOME.bodyAr : WELCOME.bodyEn}
            </p>
            <div className={`flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                type="button"
                onClick={tour.dismiss}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#8E8E9F] hover:bg-[#F5F0EB] transition-colors"
              >
                {isRTL ? WELCOME.notNowAr : WELCOME.notNowEn}
              </button>
              <button
                type="button"
                autoFocus
                onClick={tour.acceptWelcome}
                className="px-5 py-2 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] transition-colors"
              >
                {isRTL ? WELCOME.showMeAr : WELCOME.showMeEn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Running step */}
      {tour.phase === 'running' && ready && step && (
        <TourSpotlight
          targetKey={step.target}
          title={isRTL ? step.titleAr : step.titleEn}
          body={isRTL ? step.bodyAr : step.bodyEn}
          nextLabel={isLastStep ? (isRTL ? UI.finishAr : UI.finishEn) : (isRTL ? UI.nextAr : UI.nextEn)}
          backLabel={isRTL ? UI.backAr : UI.backEn}
          dismissLabel={isRTL ? UI.dismissAr : UI.dismissEn}
          stepLabel={isRTL ? UI.stepAr(tour.stepIndex + 1, STEPS.length) : UI.stepEn(tour.stepIndex + 1, STEPS.length)}
          isRTL={isRTL}
          showBack={tour.stepIndex > 0}
          onNext={tour.next}
          onBack={tour.prev}
          onDismiss={tour.dismiss}
        />
      )}

      {/* Complete toast */}
      <AnimatePresence>
        {tour.phase === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] bg-[#3B8A6E] text-white px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg"
          >
            ✓ {isRTL ? UI.completeAr : UI.completeEn}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
