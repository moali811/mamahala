'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTourState } from './useTourState';
import TourSpotlight from './TourSpotlight';

export interface ProgramOverviewTourProps {
  locale: string;
  /** Used in welcome copy. Falls back to a neutral phrase when empty. */
  programTitle?: string;
  /** Skip the "one payment unlocks 2&3" step when the program is free. */
  isFree?: boolean;
}

interface StepCopy {
  target: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  /** When true, skip for free programs. */
  paidOnly?: boolean;
}

const ALL_STEPS: StepCopy[] = [
  {
    target: 'levels',
    titleEn: 'Three levels, your pace',
    titleAr: 'ثلاثةُ مستويات، على إيقاعك',
    bodyEn: 'Three levels — each deeper than the last. Your path, at your pace.',
    bodyAr: 'ثلاثةُ مستويات — كلُّ واحدٍ أعمقُ من سابقه. طريقُك، على إيقاعك.',
  },
  {
    target: 'level-1',
    titleEn: 'Start here — Level 1 is free',
    titleAr: 'ابدأ من هنا — المستوى الأوّل مجّاني',
    bodyEn: 'Start here. Level 1 is free — any module, right now, no signup.',
    bodyAr: 'ابدأ من هنا. المستوى الأوّل مجّاني — أيُّ وحدة، الآن، دون تسجيل.',
  },
  {
    target: 'pricing',
    titleEn: 'One payment, lifetime',
    titleAr: 'دفعةٌ واحدة، مدى الحياة',
    bodyEn: 'If Level 1 helps, unlock Levels 2 & 3 with one $41 CAD payment. Lifetime access.',
    bodyAr: 'إن أفادك المستوى الأوّل، افتح المستويَين الثاني والثالث بدفعةٍ واحدة — ٤١ دولاراً كندياً. وُصولٌ مدى الحياة.',
    paidOnly: true,
  },
  {
    target: 'cta',
    titleEn: 'Earn a signed certificate',
    titleAr: 'احصل على شهادةٍ موقّعة',
    bodyEn: 'Finish a level, earn a signed certificate. Pick your first module to begin.',
    bodyAr: 'بإتمامك أيَّ مستوى، تحصل على شهادةٍ موقّعة. اختر أوّلَ وحدة لتبدأ.',
  },
];

const welcomeTitleEn = 'A quick look inside';
const welcomeTitleAr = 'جولةٌ قصيرةٌ في الداخل';
const welcomeBodyEnDefault = "Here's what's inside this program. 30 seconds, and the choice is yours.";
const welcomeBodyArDefault = 'إليك ما في هذا البرنامج. ٣٠ ثانية، والقرارُ لك بعدها.';
const welcomeBodyEnWithTitle = (title: string) => `Here's what's inside ${title}. 30 seconds, and the choice is yours.`;
const welcomeBodyArWithTitle = (title: string) => `إليك ما في داخل ${title}. ٣٠ ثانية، والقرارُ لك بعدها.`;

const UI = {
  showMeEn: 'Show me',
  showMeAr: 'اعرِضْها',
  notNowEn: 'Not now',
  notNowAr: 'ليس الآن',
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
  completeEn: "That's the tour. Pick a module when you're ready.",
  completeAr: 'انتهت الجولة. اختر وحدة حين تجهز.',
};

export default function ProgramOverviewTour({ locale, programTitle, isFree }: ProgramOverviewTourProps) {
  const isRTL = locale === 'ar';

  // Filter steps once per mount based on isFree. Must be memoized — the
  // scroll/reveal effect depends on `steps` and a fresh-array-every-render
  // would thrash the effect and race with setReady(true).
  const steps = useMemo(
    () => ALL_STEPS.filter(s => !(s.paidOnly && isFree)),
    [isFree],
  );

  const tour = useTourState({
    storageKey: 'mh_program_overview_tour_seen',
    stepCount: steps.length,
    welcomeDelayMs: 1400,
  });

  const [ready, setReady] = useState(false);
  const tourDismiss = tour.dismiss;
  useEffect(() => {
    if (tour.phase !== 'running') {
      setReady(false);
      return;
    }
    const key = steps[tour.stepIndex]?.target;
    if (!key) return;
    setReady(false);

    const revealIfReady = () => {
      const el = document.querySelector<HTMLElement>(`[data-tour="${key}"]`);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const offScreen = rect.top < 80 || rect.bottom > window.innerHeight - 60;
      if (offScreen) {
        const absoluteTop = rect.top + window.scrollY;
        const targetY = Math.max(0, absoluteTop - Math.max(0, (window.innerHeight - rect.height) / 2));
        window.scrollTo({ top: targetY, behavior: 'auto' });
        // setTimeout fallback: requestAnimationFrame is throttled/skipped when
        // the tab is hidden, which stalled the tour in preview testing.
        window.setTimeout(() => setReady(true), 80);
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
    // Depend on primitives only — tour is a new object every render.
  }, [tour.phase, tour.stepIndex, tourDismiss, steps]);

  const step = steps[tour.stepIndex];
  const isLastStep = tour.stepIndex === steps.length - 1;

  const welcomeBodyEn = programTitle ? welcomeBodyEnWithTitle(programTitle) : welcomeBodyEnDefault;
  const welcomeBodyAr = programTitle ? welcomeBodyArWithTitle(programTitle) : welcomeBodyArDefault;

  return (
    <>
      <button
        type="button"
        onClick={tour.start}
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-40 px-3 py-2 rounded-full bg-white/90 backdrop-blur border border-[#F0ECE8] text-xs font-semibold text-[#7A3B5E] shadow-md hover:bg-white hover:shadow-lg transition-all`}
        aria-label={isRTL ? UI.replayAr : UI.replayEn}
      >
        <span aria-hidden className={isRTL ? 'ml-1.5' : 'mr-1.5'}>✨</span>
        {isRTL ? UI.replayAr : UI.replayEn}
      </button>

      {tour.phase === 'welcome' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
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
              {isRTL ? welcomeTitleAr : welcomeTitleEn}
            </h2>
            <p className="text-sm text-[#4A4A5C] leading-relaxed mb-5">
              {isRTL ? welcomeBodyAr : welcomeBodyEn}
            </p>
            <div className={`flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                type="button"
                onClick={tour.dismiss}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#8E8E9F] hover:bg-[#F5F0EB] transition-colors"
              >
                {isRTL ? UI.notNowAr : UI.notNowEn}
              </button>
              <button
                type="button"
                autoFocus
                onClick={tour.acceptWelcome}
                className="px-5 py-2 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] transition-colors"
              >
                {isRTL ? UI.showMeAr : UI.showMeEn}
              </button>
            </div>
          </div>
        </div>
      )}

      {tour.phase === 'running' && ready && step && (
        <TourSpotlight
          targetKey={step.target}
          title={isRTL ? step.titleAr : step.titleEn}
          body={isRTL ? step.bodyAr : step.bodyEn}
          nextLabel={isLastStep ? (isRTL ? UI.finishAr : UI.finishEn) : (isRTL ? UI.nextAr : UI.nextEn)}
          backLabel={isRTL ? UI.backAr : UI.backEn}
          dismissLabel={isRTL ? UI.dismissAr : UI.dismissEn}
          stepLabel={`${tour.stepIndex + 1} / ${steps.length}`}
          isRTL={isRTL}
          showBack={tour.stepIndex > 0}
          onNext={tour.next}
          onBack={tour.prev}
          onDismiss={tour.dismiss}
        />
      )}

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
