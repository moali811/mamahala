'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, ArrowLeft, Calendar, Clock, User, Mail, Phone,
  MapPin, MessageSquare, Check, ChevronRight, ChevronLeft, ChevronDown, Globe,
  Loader2, AlertCircle, Heart, Users, Leaf, GraduationCap, Shield, Baby,
  Brain, Target, Compass, Zap, Wind, Flame, BookOpen, HeartHandshake,
  Smile, ShieldCheck, CloudLightning, Flower2, TrendingUp, Gem,
  Video, Building2, MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import { getMessages, type Locale } from '@/lib/i18n';
import { BUSINESS } from '@/config/business';
import { services, serviceCategories, getServicesByCategory, getFreeConsultation } from '@/data/services';
import { PRICING_TIERS, getAnchor, getAvailableModes, COUNTRY_TO_REGION, type Region } from '@/config/pricing';
import {
  COUNTRIES,
  type CountryInfo,
} from '@/config/countries';
import { useBookingWizard, type BookingStep } from '@/hooks/useBookingWizard';
import type { ServiceRecommendation, TimeSlot, DayAvailability, SessionMode } from '@/lib/booking/types';
import type { ServiceCategory, Service } from '@/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import PageTracker from '@/components/analytics/PageTracker';
import ReturningClientBanner from '@/components/booking/ReturningClientBanner';
import SoftWelcomeBanner from '@/components/booking/SoftWelcomeBanner';
import SelfServeRecurringStep from '@/components/booking/SelfServeRecurringStep';
import FirstTimeEligibilityModal from '@/components/booking/FirstTimeEligibilityModal';
import SmartFrontDoor from '@/components/booking/SmartFrontDoor';
import SoonestAvailableCard from '@/components/booking/SoonestAvailableCard';
import DateTimePicker from '@/components/booking/DateTimePicker';
import MobileCarousel from '@/components/ui/MobileCarousel';
import type { SelfServeEligibility } from '@/lib/booking/self-serve-eligibility';
import { scrollToElement } from '@/lib/scroll';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Users, User, Heart, Leaf, GraduationCap, Shield, Baby, Compass,
  Brain, ShieldCheck, Flame, HeartHandshake, BookOpen, CloudLightning,
  Flower2, Wind, Zap, Target, TrendingUp, Gem, Smile,
};

const STEP_LABELS: Record<BookingStep, { en: string; ar: string }> = {
  intake: { en: 'Your Needs', ar: 'احتياجاتك' },
  service: { en: 'Service', ar: 'الخدمة' },
  datetime: { en: 'Date & Time', ar: 'التاريخ والوقت' },
  info: { en: 'Your Info', ar: 'معلوماتك' },
  confirm: { en: 'Confirm', ar: 'تأكيد' },
  success: { en: 'Done', ar: 'تم' },
};

const STEPS: BookingStep[] = ['intake', 'service', 'datetime', 'info', 'confirm'];

export default function BookPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  const wizard = useBookingWizard(isRTL ? 'ar' : 'en');
  const { step, stepIndex, formData, isLoading, error } = wizard;
  const [providerTimezone, setProviderTimezone] = useState('America/Toronto');
  const [inPersonEnabled, setInPersonEnabled] = useState(true);

  const BackArrow = isRTL ? ChevronRight : ChevronLeft;
  const ForwardArrow = isRTL ? ChevronLeft : ChevronRight;
  const stepContentRef = useRef<HTMLDivElement>(null);

  // Scroll to top of step content when step changes. The smart scroll waits
  // for layout settle (covers AnimatePresence swap) and respects reduced-motion.
  const isFirstStepRender = useRef(true);
  useEffect(() => {
    if (isFirstStepRender.current) {
      isFirstStepRender.current = false;
      return;
    }
    if (!stepContentRef.current) return;
    void scrollToElement(stepContentRef.current);
  }, [step]);

  // ─── Direct booking from service page (?service= param) ────────
  // Skips intake + service steps → streamlined 3-step flow
  const serviceParam = searchParams.get('service');
  const preSelectedService = serviceParam ? services.find(s => s.slug === serviceParam) : null;
  const isDirectBooking = !!preSelectedService;
  const autoSelected = useRef(false);
  useEffect(() => {
    if (preSelectedService && !autoSelected.current) {
      autoSelected.current = true;
      const duration = PRICING_TIERS[preSelectedService.pricingTierKey]?.durationMinutes ?? 50;
      wizard.updateForm({
        serviceSlug: preSelectedService.slug,
        serviceName: preSelectedService.name,
        serviceNameAr: preSelectedService.nameAr,
        serviceCategory: preSelectedService.category,
        pricingTierKey: preSelectedService.pricingTierKey,
        durationMinutes: duration,
      });
      wizard.goToStep('datetime');
    }
  }, [preSelectedService]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Resume from booking-token email link (?resume=1) ──────────
  // The booking-token route sets the booking_session cookie and redirects
  // here. Once the wizard's hydrate fetch confirms the session is real,
  // skip the intake step — the client already knows what they want.
  const resumeRequested = searchParams.get('resume') === '1';
  const resumeJumped = useRef(false);
  useEffect(() => {
    if (
      resumeRequested
      && !resumeJumped.current
      && wizard.formData.isAuthenticatedReturning
      && wizard.step === 'intake'
    ) {
      resumeJumped.current = true;
      wizard.goToStep('service');
    }
  }, [resumeRequested, wizard.formData.isAuthenticatedReturning, wizard.step]); // eslint-disable-line react-hooks/exhaustive-deps

  // One-click rebook from the ReturningClientBanner — pre-selects the
  // last service (from the customer record) and jumps to datetime.
  const handleRebookLast = useCallback((slug: string) => {
    const svc = services.find(s => s.slug === slug);
    if (!svc) return;
    const duration = PRICING_TIERS[svc.pricingTierKey]?.durationMinutes ?? 50;
    wizard.updateForm({
      serviceSlug: svc.slug,
      serviceName: svc.name,
      serviceNameAr: svc.nameAr,
      serviceCategory: svc.category,
      pricingTierKey: svc.pricingTierKey,
      durationMinutes: duration,
    });
    wizard.goToStep('datetime');
  }, [wizard]);

  // For direct booking, show only 3 steps (datetime, info, confirm)
  const directSteps: BookingStep[] = ['datetime', 'info', 'confirm'];
  const directStepLabels: Record<string, { en: string; ar: string }> = {
    datetime: { en: 'Date & Time', ar: 'التاريخ والوقت' },
    info: { en: 'Your Info', ar: 'معلوماتك' },
    confirm: { en: 'Confirm', ar: 'تأكيد' },
  };
  const visibleSteps = isDirectBooking ? directSteps : STEPS;
  const visibleStepIndex = isDirectBooking
    ? directSteps.indexOf(step)
    : stepIndex;

  return (
    <div className="min-h-screen bg-[#FAF7F2]" dir={isRTL ? 'rtl' : 'ltr'}>
      <PageTracker type="booking_visit" source="booking" locale={locale} />
      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Breadcrumb
          items={[
            { label: isRTL ? 'الرئيسية' : 'Home', href: `/${locale}` },
            { label: isRTL ? 'حجز جلسة' : 'Book a Session' },
          ]}
          locale={locale}
        />
      </div>

      {/* Recognition banners — only on the service step; the intake step
          delegates the welcome to SmartFrontDoor, which already greets by
          name and offers the rebook CTA as one of its primary cards. */}
      {step === 'service' && (
        <>
          {formData.isAuthenticatedReturning && (
            <ReturningClientBanner
              firstName={formData.recognizedFirstName}
              lastBookedServiceSlug={formData.recognizedLastServiceSlug}
              locale={isRTL ? 'ar' : 'en'}
              onRebookLast={handleRebookLast}
            />
          )}
          {!formData.isAuthenticatedReturning && formData.isSoftRecognized && (
            <SoftWelcomeBanner locale={isRTL ? 'ar' : 'en'} />
          )}
        </>
      )}

      {/* Service Context Banner (direct booking from service page) */}
      {isDirectBooking && preSelectedService && step !== 'success' && (
        <div className="max-w-3xl mx-auto px-4 pt-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#7A3B5E]/5 border border-[#7A3B5E]/10">
            <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-[#7A3B5E]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#4A4A5C] truncate">
                {isRTL ? preSelectedService.nameAr : preSelectedService.name}
              </p>
              <p className="text-[10px] text-[#8E8E9F]">
                {PRICING_TIERS[preSelectedService.pricingTierKey]?.durationMinutes ?? 50} {isRTL ? 'دقيقة' : 'min'}
              </p>
            </div>
            <a
              href={`/${locale}/book`}
              className="text-[10px] font-medium text-[#7A3B5E] hover:underline shrink-0"
            >
              {isRTL ? 'تغيير' : 'Change'}
            </a>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {step !== 'success' && (
        <div ref={stepContentRef} className="max-w-2xl mx-auto px-4 py-6 scroll-anchor">
          <div className="flex items-center justify-between">
            {visibleSteps.map((s, i) => {
              const isActive = s === step;
              const isCompleted = i < visibleStepIndex;
              const labels = isDirectBooking ? directStepLabels[s] : STEP_LABELS[s];
              const label = labels?.[locale as 'en' | 'ar'] ?? labels?.en ?? '';
              return (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        isCompleted
                          ? 'bg-[#7A3B5E] text-white'
                          : isActive
                            ? 'bg-[#C8A97D] text-white ring-4 ring-[#C8A97D]/20'
                            : 'bg-[#F0ECE8] text-[#8E8E9F]'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-[8px] sm:text-[10px] mt-1 ${isActive ? 'text-[#7A3B5E] font-semibold' : 'text-[#8E8E9F]'} ${!isActive && !isCompleted ? 'hidden sm:block' : ''}`}>
                      {label}
                    </span>
                  </div>
                  {i < visibleSteps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${isCompleted ? 'bg-[#7A3B5E]' : 'bg-[#E8E0D8]'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step Content — wider for datetime step's two-column layout */}
      <div className={`mx-auto px-4 pb-8 sm:pb-16 ${step === 'datetime' ? 'max-w-5xl' : 'max-w-3xl'}`}>
        {/* Per-step motion wrapper. Intentionally NOT wrapped in
            AnimatePresence — with React 19 + framer-motion v12, the
            mode="wait" exit-animation never resolved, leaving the
            previous step's content frozen on screen. The simple
            per-step motion.div still gets the soft fade-in. */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {step === 'intake' ? <IntakeStep wizard={wizard} locale={locale} isRTL={isRTL} /> :
           step === 'service' ? <ServiceStep wizard={wizard} locale={locale} isRTL={isRTL} /> :
           step === 'datetime' ? <DateTimeStep wizard={wizard} locale={locale} isRTL={isRTL} onProviderTimezone={setProviderTimezone} onInPersonEnabled={setInPersonEnabled} /> :
           step === 'info' ? <InfoStep wizard={wizard} locale={locale} isRTL={isRTL} providerTimezone={providerTimezone} inPersonEnabled={inPersonEnabled} /> :
           step === 'confirm' ? <ConfirmStep wizard={wizard} locale={locale} isRTL={isRTL} /> :
           step === 'success' ? <SuccessStep wizard={wizard} locale={locale} isRTL={isRTL} /> : null}
        </motion.div>

        {/* Gate Error — humane: not a red banner, offers a one-tap path forward.
            Slot-conflict (slot_unavailable) renders inline inside ConfirmStep
            instead of here, so the recovery card stays anchored next to the
            booking summary. Only the once-per-client gate renders at this
            page level. */}
        {wizard.gateError && wizard.gateError.code !== 'slot_unavailable' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-5 rounded-2xl bg-[#FFFAF5] border border-[#7A3B5E]/20"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#7A3B5E]/10 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-[#7A3B5E]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#4A4A5C] leading-relaxed">{wizard.gateError.message}</p>
                {wizard.gateError.suggestedServiceSlug && (() => {
                  const suggested = services.find(s => s.slug === wizard.gateError!.suggestedServiceSlug);
                  if (!suggested) return null;
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        const tier = suggested.pricingTierKey;
                        const dur = PRICING_TIERS[tier]?.durationMinutes ?? 45;
                        wizard.updateForm({
                          serviceSlug: suggested.slug,
                          serviceName: suggested.name,
                          serviceNameAr: suggested.nameAr,
                          serviceCategory: suggested.category,
                          pricingTierKey: tier,
                          durationMinutes: dur,
                        });
                        wizard.clearGateError();
                        wizard.goToStep('datetime');
                      }}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#7A3B5E] hover:bg-[#69304F] text-white px-4 py-2 text-sm font-semibold transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      {isRTL
                        ? `حجز ${suggested.nameAr}`
                        : `Book ${suggested.name} instead`}
                    </button>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Banner */}
        {error && !wizard.gateError && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Back Button */}
        {wizard.canGoBack && step !== 'success' && (
          <div className="mt-6">
            <button
              onClick={wizard.goBack}
              className="flex items-center gap-2 text-sm text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors"
            >
              <BackArrow className="w-4 h-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </button>
          </div>
        )}
      </div>

      {/* ─── Subtle WhatsApp + Policy Footer ─── */}
      {step !== 'success' && (
        <div className="max-w-3xl mx-auto px-4 pb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#F0ECE8]">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[#B0AAA0]">
              <span>{isRTL ? 'الاستشارة الأولى مجّانيّة' : 'Free first consultation'}</span>
              <span>·</span>
              <span>{isRTL ? 'إشعار إلغاء 24 ساعة' : '24h cancellation notice'}</span>
              <span>·</span>
              <Link href={`/${locale}/booking-policy`} className="text-[#7A3B5E] hover:underline">
                {isRTL ? 'سياسة الحجز' : 'Booking Policy'}
              </Link>
            </div>
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-[#8E8E9F] hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              {isRTL ? 'أو تواصل عبر واتساب' : 'Or chat on WhatsApp'}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 1: AI Intake ──────────────────────────────────────────

function IntakeStep({ wizard, locale, isRTL }: StepProps) {
  const sp = useSearchParams();
  const fast = sp.get('fast') === '1';
  const [text, setText] = useState(wizard.formData.intakeText);
  const [aiOpen, setAiOpen] = useState(false);
  const [eligibilityOpen, setEligibilityOpen] = useState(false);
  const isReturning = wizard.formData.isAuthenticatedReturning;
  const isSoftRecognized = wizard.formData.isSoftRecognized;
  // Hide the discovery-call tile both for authed returning clients AND
  // for any client whose email recognition surfaced a prior free consult.
  // Server gate in /api/book/confirm is the actual enforcement.
  const hideDiscoveryTile = isReturning || wizard.formData.freeConsultUsed;
  // Sub-view inside the intake step. 'door' = SmartFrontDoor; 'soonest'
  // = inline SoonestAvailableCard (panic / on-the-go); 'classic' = the
  // legacy intake tiles (browse + free + AI). Defaults to door for
  // recognised + brand-new alike — only fast=1 forces soonest.
  const [view, setView] = useState<'door' | 'soonest' | 'classic'>(
    fast ? 'soonest' : 'door',
  );

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const goToServices = () => {
    try { sessionStorage.setItem('mh:skip_consult', '1'); } catch {}
    wizard.goToStep('service');
  };

  const startDiscoveryCall = () => {
    wizard.updateForm({
      serviceSlug: 'initial-consultation',
      serviceName: 'Free Consultation',
      serviceNameAr: 'استشارة مجانية',
      serviceCategory: 'adults',
      pricingTierKey: 'discoveryCall30min',
      durationMinutes: 30,
      isNewClient: true,
    });
    wizard.goToStep('datetime');
  };

  const pickService = (svc: typeof services[number]) => {
    const tier = svc.pricingTierKey;
    const duration = PRICING_TIERS[tier]?.durationMinutes ?? 50;
    wizard.updateForm({
      serviceSlug: svc.slug,
      serviceName: svc.name,
      serviceNameAr: svc.nameAr,
      serviceCategory: svc.category,
      pricingTierKey: tier,
      durationMinutes: duration,
    });
  };

  // Soonest pick: route based on whether the wizard already has the
  // client's contact info. Recognized → confirm in one tap. Anonymous →
  // info step to collect name/email, then confirm.
  const handlePickSoonest = (picked: {
    serviceSlug: string;
    serviceName: string;
    serviceNameAr: string;
    durationMinutes: number;
    startTime: string;
    endTime: string;
    sessionMode: 'online' | 'inPerson';
  }) => {
    const svc = services.find(s => s.slug === picked.serviceSlug);
    if (svc) pickService(svc);
    wizard.updateForm({
      selectedDate: picked.startTime.slice(0, 10),
      selectedStartTime: picked.startTime,
      selectedEndTime: picked.endTime,
      sessionMode: picked.sessionMode,
    });
    const hasContact = !!(wizard.formData.clientEmail && wizard.formData.clientName);
    wizard.goToStep(hasContact ? 'confirm' : 'info');
  };

  const handleRebookFromDoor = (slug: string) => {
    const svc = services.find(s => s.slug === slug);
    if (!svc) return;
    pickService(svc);
    wizard.goToStep('datetime');
  };

  const handleIntent = (intent: 'soon' | 'explore' | 'browse') => {
    if (intent === 'soon') {
      setView('soonest');
    } else if (intent === 'explore') {
      setView('classic');
      // Open the AI textarea on the classic view so the intent is honoured.
      setTimeout(() => setAiOpen(true), 0);
    } else {
      goToServices();
    }
  };

  // ─── View: SmartFrontDoor ──────────────────────────────────────
  if (view === 'door' && !fast) {
    return (
      <SmartFrontDoor
        locale={isRTL ? 'ar' : 'en'}
        isRTL={isRTL}
        fast={false}
        isAuthenticatedReturning={isReturning}
        isSoftRecognized={isSoftRecognized}
        recognizedFirstName={wizard.formData.recognizedFirstName}
        recognizedLastServiceSlug={wizard.formData.recognizedLastServiceSlug}
        clientTimezone={wizard.formData.clientTimezone}
        onRebookLast={handleRebookFromDoor}
        onPickSoonest={handlePickSoonest}
        onIntent={handleIntent}
      />
    );
  }

  // ─── View: Soonest (fast lane) ─────────────────────────────────
  if (view === 'soonest') {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
            {isRTL ? 'تحدّث مع د. هالة — أقرب موعد' : 'Talk to Dr. Hala — soonest slot'}
          </h1>
          <p className="text-sm text-[#8E8E9F] max-w-md mx-auto">
            {isRTL
              ? 'سنبحث لك عن أقربِ فرصة. لن تُحجز إلّا بعد تأكيدك.'
              : "We'll find the next opening. Nothing is booked until you confirm."}
          </p>
        </div>
        <SoonestAvailableCard
          locale={isRTL ? 'ar' : 'en'}
          isRTL={isRTL}
          clientTimezone={wizard.formData.clientTimezone}
          empathyLine={isRTL
            ? 'خذ نفسًا عميقًا. د. هالة هنا من أجلك.'
            : 'Take a breath. Dr. Hala is here for you.'}
          onConfirm={handlePickSoonest}
        />
        {!fast && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setView('door')}
              className="text-xs text-[#7A3B5E] hover:underline"
            >
              {isRTL ? '← خياراتٌ أخرى' : '← Other options'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ─── View: Classic (the legacy intake tiles) ───────────────────

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
          {isRTL ? 'لنجد الجلسة المناسبة لك' : "Let's find the right session for you"}
        </h1>
        <p className="text-sm text-[#8E8E9F] max-w-md mx-auto">
          {isRTL
            ? 'اختر الطريقة التي تناسبك للبدء.'
            : 'Choose how you\'d like to start.'}
        </p>
      </div>

      {/* PRIMARY — Browse services (filled plum, dominant) */}
      <button
        type="button"
        onClick={goToServices}
        data-cta="intake-skip-card"
        className="w-full text-start group bg-[#7A3B5E] hover:bg-[#69304F] active:scale-[0.995] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-base sm:text-lg font-semibold text-white">
              {isRTL ? 'تصفّح خدماتنا' : 'Browse our services'}
            </p>
            <p className="text-sm text-white/80 mt-1 leading-relaxed">
              {isRTL
                ? 'اختر الجلسة التي تناسب احتياجك.'
                : 'Pick the session that fits what you need.'}
            </p>
          </div>
          <div className="shrink-0 w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
            <ForwardArrow className="w-5 h-5 text-white" />
          </div>
        </div>
      </button>

      {/* SECONDARY — Free discovery call (cream tile, hidden for returning
          clients and anyone who has already consumed the freebie). */}
      {!hideDiscoveryTile && (
        <button
          type="button"
          onClick={() => setEligibilityOpen(true)}
          data-cta="discovery-call-card"
          className="w-full text-start bg-[#FAF7F2] hover:bg-[#F5F0EB] active:scale-[0.995] rounded-2xl p-5 border border-[#E8E0D8] transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-[#4A4A5C]">
                  {isRTL ? 'جديد مع ماما هالة؟' : 'New to Mama Hala?'}
                </p>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#7A3B5E]/10 text-[#7A3B5E]">
                  {isRTL ? 'للعملاء الجدد' : 'For first-time clients'}
                </span>
              </div>
              <p className="text-xs text-[#8E8E9F] mt-1 leading-relaxed">
                {isRTL
                  ? 'مكالمة تعارف مجانية ٣٠ دقيقة لنرى إن كنا الأنسب لك.'
                  : 'Free 30-min discovery call to see if we\'re the right fit.'}
              </p>
            </div>
            <div className="shrink-0 w-9 h-9 rounded-xl bg-[#7A3B5E]/10 flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#7A3B5E]" />
            </div>
          </div>
        </button>
      )}

      {/* TERTIARY — AI recommendation: a small magical pill (centered) that
          expands a textarea when tapped. Visual weight is intentionally
          minimal so it doesn't compete with the two primary cards above. */}
      <div className="flex flex-col items-center gap-3 pt-1">
        <button
          type="button"
          onClick={() => setAiOpen(o => !o)}
          aria-expanded={aiOpen}
          className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#7A3B5E]/8 via-[#C8A97D]/12 to-[#7A3B5E]/8 hover:from-[#7A3B5E]/14 hover:via-[#C8A97D]/16 hover:to-[#7A3B5E]/14 text-[11px] font-medium text-[#7A3B5E] border border-[#7A3B5E]/15 shadow-sm hover:shadow transition-all active:scale-[0.97]"
        >
          <Sparkles className="w-3 h-3 animate-twinkle" />
          <span>
            {isRTL
              ? (aiOpen ? 'إخفاء التوصية الذكية' : 'لست متأكداً؟ اسأل الذكاء الاصطناعي')
              : (aiOpen ? 'Hide AI helper' : 'Not sure? Ask our AI')}
          </span>
          <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${aiOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence initial={false}>
          {aiOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden w-full"
            >
              <div className="rounded-2xl border border-[#F0ECE8] bg-white px-5 py-4">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder={isRTL ? 'أخبرنا بما تمر به...' : 'Tell us what you\'re going through...'}
                  className="w-full h-24 resize-none text-[15px] text-[#4A4A5C] placeholder-[#C0B8B0] bg-transparent outline-none leading-relaxed"
                  dir={isRTL ? 'rtl' : 'ltr'}
                  autoFocus
                />
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-[#F0ECE8]">
                  <span className="text-xs text-[#C0B8B0]">{text.length}/2000</span>
                  <button
                    onClick={() => wizard.submitIntake(text, locale)}
                    disabled={text.trim().length < 3 || wizard.isLoading}
                    className="px-5 py-2 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    {wizard.isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> {isRTL ? 'جارٍ التحليل...' : 'Analyzing...'}</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> {isRTL ? 'أوصِ بخدمة' : 'Get Recommendations'}</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FirstTimeEligibilityModal
        open={eligibilityOpen}
        isRTL={isRTL}
        onClose={() => setEligibilityOpen(false)}
        onConfirmNew={() => {
          setEligibilityOpen(false);
          startDiscoveryCall();
        }}
        onRedirectToServices={() => {
          setEligibilityOpen(false);
          goToServices();
        }}
      />
    </div>
  );
}

// ─── Step 2: Service Selection ──────────────────────────────────

function ServiceStep({ wizard, locale, isRTL }: StepProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('youth');
  // Category-first browse: until the user taps a category tile, render
  // 5 large tiles instead of 26 services. Reduces overwhelm. Skipped
  // when AI recommendations are present (those become the headline).
  const [categoryChosen, setCategoryChosen] = useState(false);
  // When the user explicitly skipped intake via "Browse services", treat the
  // free consultation as opt-in (small link below the grid) rather than the
  // headline tile. They've already declined; respect that without removing
  // the option entirely.
  const [skippedConsult, setSkippedConsult] = useState(false);
  useEffect(() => {
    try { setSkippedConsult(sessionStorage.getItem('mh:skip_consult') === '1'); } catch {}
  }, []);
  const { recommendations } = wizard.formData;
  const hasRecommendations = recommendations.length > 0;
  const hideFreeConsultTile = wizard.formData.freeConsultUsed
    || wizard.formData.isAuthenticatedReturning;
  // If we have AI recs, they replace the category carousel as the headline,
  // and the user goes straight to category-tab navigation below.
  const showCategoryGrid = !categoryChosen && !hasRecommendations;

  const selectService = (service: Service) => {
    const tier = service.pricingTierKey;
    const duration = PRICING_TIERS[tier]?.durationMinutes ?? 50;
    try { sessionStorage.removeItem('mh:skip_consult'); } catch {}
    wizard.updateForm({
      serviceSlug: service.slug,
      serviceName: service.name,
      serviceNameAr: service.nameAr,
      serviceCategory: service.category,
      pricingTierKey: tier,
      durationMinutes: duration,
    });
    wizard.goNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-[#4A4A5C]" style={{ fontFamily: 'DM Serif Display, serif' }}>
          {isRTL ? 'اختر خدمة' : 'Choose a Service'}
        </h1>
      </div>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C8A97D]" />
            <span className="text-sm font-semibold text-[#7A3B5E]">
              {isRTL ? 'موصى به لك' : 'Recommended for You'}
            </span>
          </div>
          {recommendations.map((rec, i) => {
            const svc = services.find(s => s.slug === rec.serviceSlug);
            if (!svc) return null;
            const Icon = iconMap[svc.icon || ''] ?? Heart;
            return (
              <button
                key={rec.serviceSlug}
                onClick={() => selectService(svc)}
                className="w-full p-4 rounded-xl bg-white border-2 border-[#C8A97D]/30 hover:border-[#C8A97D] transition-all text-left group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C8A97D]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#C8A97D]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#4A4A5C] text-sm">
                        {isRTL ? svc.nameAr : svc.name}
                      </p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A97D]/10 text-[#C8A97D] font-medium">
                        {Math.round(rec.confidence * 100)}% match
                      </span>
                    </div>
                    <p className="text-xs text-[#8E8E9F] mt-1 line-clamp-2">
                      {isRTL ? (rec.reasonAr || rec.reason) : rec.reason}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-[#C0B8B0] group-hover:text-[#7A3B5E] transition-colors flex-shrink-0 mt-1 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Free Discovery Call — prominent tile above categories, UNLESS the
          user explicitly skipped intake to browse services, OR they've
          already used their freebie. In the skipped case it's rendered as
          a subtle link below the grid (see end of ServiceStep). */}
      {!skippedConsult && !hideFreeConsultTile && (() => {
        const freeConsult = getFreeConsultation();
        if (!freeConsult) return null;
        return (
          <button
            onClick={() => selectService(freeConsult)}
            className="w-full p-4 rounded-xl bg-[#C8A97D]/8 border-2 border-[#C8A97D]/25 hover:border-[#C8A97D] transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8A97D]/15 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#C8A97D]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[#4A4A5C] text-sm">{isRTL ? freeConsult.nameAr : freeConsult.name}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3B8A6E]/10 text-[#3B8A6E] font-semibold">{isRTL ? 'مجاني' : 'Free'}</span>
                </div>
                <p className="text-xs text-[#8E8E9F] mt-0.5">{isRTL ? '30 دقيقة — للعملاء الجدد' : '30 min — for new clients'}</p>
              </div>
              <ChevronRight className={`w-4 h-4 text-[#C8A97D] group-hover:text-[#7A3B5E] transition-colors flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
            </div>
          </button>
        );
      })()}

      {/* Category-first carousel — 5 large tiles. Hidden once a category
          is chosen or when AI recs are leading the page. */}
      {showCategoryGrid && (
        <div className="space-y-3">
          <p className="text-center text-sm text-[#8E8E9F]">
            {isRTL ? 'ابدأ من فئة' : 'Start with a category'}
          </p>
          <MobileCarousel mobileWidth="70vw" gap={16} desktopGrid="sm:grid-cols-3 lg:grid-cols-5">
            {serviceCategories.map(cat => {
              const Icon = iconMap[cat.icon] ?? Heart;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => { setActiveCategory(cat.key); setCategoryChosen(true); }}
                  className="group w-full h-full text-start bg-white hover:bg-[#FAF7F2] rounded-2xl p-5 border-2 border-[#E8E0D8] hover:border-[#7A3B5E]/30 transition-all flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#7A3B5E]/10 flex items-center justify-center group-hover:bg-[#7A3B5E]/15 transition-colors">
                    <Icon className="w-5 h-5 text-[#7A3B5E]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-[#4A4A5C] leading-tight">
                      {isRTL ? cat.nameAr : cat.name}
                    </p>
                    <p className="text-xs text-[#8E8E9F] leading-snug line-clamp-2">
                      {isRTL ? cat.subtitleAr : cat.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </MobileCarousel>
        </div>
      )}

      {/* Category Tabs — shown after a category is chosen, or when AI recs
          opened the page directly into category navigation. */}
      {!showCategoryGrid && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {serviceCategories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-[#7A3B5E] text-white shadow-sm'
                  : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:border-[#C4878A]/30 hover:text-[#7A3B5E]'
              }`}
            >
              {isRTL ? cat.nameAr : cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Service List — only renders after category-first selection */}
      {!showCategoryGrid && (
      <div className="space-y-2">
        {getServicesByCategory(activeCategory).map(svc => {
          const Icon = iconMap[svc.icon || ''] ?? Heart;
          return (
            <button
              key={svc.slug}
              onClick={() => selectService(svc)}
              className="w-full p-4 rounded-xl bg-white border border-[#F0ECE8] hover:border-[#C4878A]/40 hover:shadow-sm transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F9E8E2] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-[#C4878A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#4A4A5C] text-sm">{isRTL ? svc.nameAr : svc.name}</p>
                  <p className="text-xs text-[#8E8E9F] mt-0.5 line-clamp-1">{isRTL ? svc.shortDescAr : svc.shortDesc}</p>
                </div>
                <div className={`text-right flex-shrink-0 ${isRTL ? 'text-left' : ''}`}>
                  <p className="text-xs text-[#8E8E9F]">{PRICING_TIERS[svc.pricingTierKey]?.durationMinutes ?? 50} min</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      )}

      {/* Demoted free-consultation link — only shown when the user explicitly
          skipped intake AND hasn't already used their freebie. Keeps the
          option discoverable without re-pitching it as the headline. */}
      {skippedConsult && !hideFreeConsultTile && (() => {
        const freeConsult = getFreeConsultation();
        if (!freeConsult) return null;
        return (
          <div className="text-center pt-2">
            <button
              onClick={() => selectService(freeConsult)}
              className="text-xs text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors underline decoration-dotted underline-offset-4"
            >
              {isRTL
                ? 'هل تفضّل مكالمة تعارف مجانية مدّتها 30 دقيقة؟ ابدأ من هنا'
                : 'Prefer a free 30-min intro call instead? Start here'}
              <ChevronRight className={`inline w-3 h-3 ms-1 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        );
      })()}
    </div>
  );
}

// ─── Step 3: Date & Time Picker ─────────────────────────────────
// Dynamic layout: calendar starts full-width centered, then animates
// to the left when a date is selected, revealing time slots on the right.

function DateTimeStep({ wizard, locale, isRTL, onProviderTimezone, onInPersonEnabled }: StepProps & { onProviderTimezone?: (tz: string) => void; onInPersonEnabled?: (v: boolean) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-[#4A4A5C]" style={{ fontFamily: 'DM Serif Display, serif' }}>
          {isRTL ? 'اختر التاريخ والوقت' : 'Pick a Date & Time'}
        </h1>
        <p className="text-sm text-[#8E8E9F]">
          {isRTL ? wizard.formData.serviceNameAr || wizard.formData.serviceName : wizard.formData.serviceName}
          {' '}— {wizard.formData.durationMinutes} {isRTL ? 'دقيقة' : 'min'}
        </p>
      </div>

      <DateTimePicker
        durationMinutes={wizard.formData.durationMinutes}
        clientTimezone={wizard.formData.clientTimezone}
        initialDate={wizard.formData.selectedDate}
        locale={locale as 'en' | 'ar'}
        isRTL={isRTL}
        variant="standalone"
        onSlotSelect={(slot) => {
          wizard.updateForm({
            selectedDate: slot.date,
            selectedStartTime: slot.start,
            selectedEndTime: slot.end,
          });
          wizard.goNext();
        }}
        onProviderTimezone={onProviderTimezone}
        onInPersonEnabled={onInPersonEnabled}
      />
    </div>
  );
}

// ─── Step 4: Client Info ────────────────────────────────────────

// NOTE: The COUNTRIES array, CountryInfo type, and detectCountryFromTimezone
// now live in @/config/countries (imported at the top of this file).
// The _LEGACY_COUNTRIES array below is kept temporarily as dead code — it
// WILL NOT be referenced at runtime. TypeScript may flag it as unused;
// a later cleanup pass can delete it outright. Done this way to keep the
// diff minimal and avoid accidentally breaking the phone picker.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _LEGACY_COUNTRIES: CountryInfo[] = [
  // ─── GCC ────────────────────────────────────────────────────────
  { code: 'AE', name: 'UAE', nameAr: 'الإمارات', flag: '\u{1F1E6}\u{1F1EA}', dial: '+971', city: 'Dubai', cityAr: 'دبي', timezones: ['Asia/Dubai', 'Asia/Muscat'] },
  { code: 'CA', name: 'Canada', nameAr: 'كندا', flag: '\u{1F1E8}\u{1F1E6}', dial: '+1', city: 'Ottawa', cityAr: 'أوتاوا', timezones: ['America/Toronto', 'America/Vancouver', 'America/Edmonton', 'America/Winnipeg', 'America/Halifax', 'America/St_Johns'] },
  { code: 'US', name: 'United States', nameAr: 'أمريكا', flag: '\u{1F1FA}\u{1F1F8}', dial: '+1', city: '', cityAr: '', timezones: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Phoenix'] },
  { code: 'SA', name: 'Saudi Arabia', nameAr: 'السعودية', flag: '\u{1F1F8}\u{1F1E6}', dial: '+966', city: 'Riyadh', cityAr: 'الرياض', timezones: ['Asia/Riyadh'] },
  { code: 'KW', name: 'Kuwait', nameAr: 'الكويت', flag: '\u{1F1F0}\u{1F1FC}', dial: '+965', city: 'Kuwait City', cityAr: 'الكويت', timezones: ['Asia/Kuwait'] },
  { code: 'QA', name: 'Qatar', nameAr: 'قطر', flag: '\u{1F1F6}\u{1F1E6}', dial: '+974', city: 'Doha', cityAr: 'الدوحة', timezones: ['Asia/Qatar'] },
  { code: 'BH', name: 'Bahrain', nameAr: 'البحرين', flag: '\u{1F1E7}\u{1F1ED}', dial: '+973', city: 'Manama', cityAr: 'المنامة', timezones: ['Asia/Bahrain'] },
  { code: 'OM', name: 'Oman', nameAr: 'عُمان', flag: '\u{1F1F4}\u{1F1F2}', dial: '+968', city: 'Muscat', cityAr: 'مسقط', timezones: [] },
  // ─── Middle East ────────────────────────────────────────────────
  { code: 'JO', name: 'Jordan', nameAr: 'الأردن', flag: '\u{1F1EF}\u{1F1F4}', dial: '+962', city: 'Amman', cityAr: 'عمّان', timezones: ['Asia/Amman'] },
  { code: 'LB', name: 'Lebanon', nameAr: 'لبنان', flag: '\u{1F1F1}\u{1F1E7}', dial: '+961', city: 'Beirut', cityAr: 'بيروت', timezones: ['Asia/Beirut'] },
  { code: 'IQ', name: 'Iraq', nameAr: 'العراق', flag: '\u{1F1EE}\u{1F1F6}', dial: '+964', city: 'Baghdad', cityAr: 'بغداد', timezones: ['Asia/Baghdad'] },
  { code: 'SY', name: 'Syria', nameAr: 'سوريا', flag: '\u{1F1F8}\u{1F1FE}', dial: '+963', city: 'Damascus', cityAr: 'دمشق', timezones: ['Asia/Damascus'] },
  { code: 'PS', name: 'Palestine', nameAr: 'فلسطين', flag: '\u{1F1F5}\u{1F1F8}', dial: '+970', city: 'Gaza', cityAr: 'غزة', timezones: ['Asia/Gaza', 'Asia/Hebron'] },
  { code: 'YE', name: 'Yemen', nameAr: 'اليمن', flag: '\u{1F1FE}\u{1F1EA}', dial: '+967', city: 'Sanaa', cityAr: 'صنعاء', timezones: ['Asia/Aden'] },
  { code: 'TR', name: 'Turkey', nameAr: 'تركيا', flag: '\u{1F1F9}\u{1F1F7}', dial: '+90', city: 'Istanbul', cityAr: 'إسطنبول', timezones: ['Europe/Istanbul'] },
  { code: 'IL', name: 'Israel', nameAr: 'إسرائيل', flag: '\u{1F1EE}\u{1F1F1}', dial: '+972', city: 'Tel Aviv', cityAr: 'تل أبيب', timezones: ['Asia/Jerusalem'] },
  { code: 'IR', name: 'Iran', nameAr: 'إيران', flag: '\u{1F1EE}\u{1F1F7}', dial: '+98', city: 'Tehran', cityAr: 'طهران', timezones: ['Asia/Tehran'] },
  // ─── North Africa ───────────────────────────────────────────────
  { code: 'EG', name: 'Egypt', nameAr: 'مصر', flag: '\u{1F1EA}\u{1F1EC}', dial: '+20', city: 'Cairo', cityAr: 'القاهرة', timezones: ['Africa/Cairo'] },
  { code: 'MA', name: 'Morocco', nameAr: 'المغرب', flag: '\u{1F1F2}\u{1F1E6}', dial: '+212', city: 'Casablanca', cityAr: 'الدار البيضاء', timezones: ['Africa/Casablanca'] },
  { code: 'TN', name: 'Tunisia', nameAr: 'تونس', flag: '\u{1F1F9}\u{1F1F3}', dial: '+216', city: 'Tunis', cityAr: 'تونس', timezones: ['Africa/Tunis'] },
  { code: 'DZ', name: 'Algeria', nameAr: 'الجزائر', flag: '\u{1F1E9}\u{1F1FF}', dial: '+213', city: 'Algiers', cityAr: 'الجزائر', timezones: ['Africa/Algiers'] },
  { code: 'LY', name: 'Libya', nameAr: 'ليبيا', flag: '\u{1F1F1}\u{1F1FE}', dial: '+218', city: 'Tripoli', cityAr: 'طرابلس', timezones: ['Africa/Tripoli'] },
  { code: 'SD', name: 'Sudan', nameAr: 'السودان', flag: '\u{1F1F8}\u{1F1E9}', dial: '+249', city: 'Khartoum', cityAr: 'الخرطوم', timezones: ['Africa/Khartoum'] },
  // ─── Sub-Saharan Africa ─────────────────────────────────────────
  { code: 'NG', name: 'Nigeria', nameAr: 'نيجيريا', flag: '\u{1F1F3}\u{1F1EC}', dial: '+234', city: 'Lagos', cityAr: 'لاغوس', timezones: ['Africa/Lagos'] },
  { code: 'ZA', name: 'South Africa', nameAr: 'جنوب أفريقيا', flag: '\u{1F1FF}\u{1F1E6}', dial: '+27', city: 'Johannesburg', cityAr: 'جوهانسبرغ', timezones: ['Africa/Johannesburg'] },
  { code: 'KE', name: 'Kenya', nameAr: 'كينيا', flag: '\u{1F1F0}\u{1F1EA}', dial: '+254', city: 'Nairobi', cityAr: 'نيروبي', timezones: ['Africa/Nairobi'] },
  { code: 'GH', name: 'Ghana', nameAr: 'غانا', flag: '\u{1F1EC}\u{1F1ED}', dial: '+233', city: 'Accra', cityAr: 'أكرا', timezones: ['Africa/Accra'] },
  { code: 'ET', name: 'Ethiopia', nameAr: 'إثيوبيا', flag: '\u{1F1EA}\u{1F1F9}', dial: '+251', city: 'Addis Ababa', cityAr: 'أديس أبابا', timezones: ['Africa/Addis_Ababa'] },
  { code: 'SO', name: 'Somalia', nameAr: 'الصومال', flag: '\u{1F1F8}\u{1F1F4}', dial: '+252', city: 'Mogadishu', cityAr: 'مقديشو', timezones: ['Africa/Mogadishu'] },
  // ─── Europe ─────────────────────────────────────────────────────
  { code: 'GB', name: 'United Kingdom', nameAr: 'بريطانيا', flag: '\u{1F1EC}\u{1F1E7}', dial: '+44', city: 'London', cityAr: 'لندن', timezones: ['Europe/London'] },
  { code: 'DE', name: 'Germany', nameAr: 'ألمانيا', flag: '\u{1F1E9}\u{1F1EA}', dial: '+49', city: 'Berlin', cityAr: 'برلين', timezones: ['Europe/Berlin'] },
  { code: 'FR', name: 'France', nameAr: 'فرنسا', flag: '\u{1F1EB}\u{1F1F7}', dial: '+33', city: 'Paris', cityAr: 'باريس', timezones: ['Europe/Paris'] },
  { code: 'NL', name: 'Netherlands', nameAr: 'هولندا', flag: '\u{1F1F3}\u{1F1F1}', dial: '+31', city: 'Amsterdam', cityAr: 'أمستردام', timezones: ['Europe/Amsterdam'] },
  { code: 'SE', name: 'Sweden', nameAr: 'السويد', flag: '\u{1F1F8}\u{1F1EA}', dial: '+46', city: 'Stockholm', cityAr: 'ستوكهولم', timezones: ['Europe/Stockholm'] },
  { code: 'NO', name: 'Norway', nameAr: 'النرويج', flag: '\u{1F1F3}\u{1F1F4}', dial: '+47', city: 'Oslo', cityAr: 'أوسلو', timezones: ['Europe/Oslo'] },
  { code: 'DK', name: 'Denmark', nameAr: 'الدنمارك', flag: '\u{1F1E9}\u{1F1F0}', dial: '+45', city: 'Copenhagen', cityAr: 'كوبنهاغن', timezones: ['Europe/Copenhagen'] },
  { code: 'FI', name: 'Finland', nameAr: 'فنلندا', flag: '\u{1F1EB}\u{1F1EE}', dial: '+358', city: 'Helsinki', cityAr: 'هلسنكي', timezones: ['Europe/Helsinki'] },
  { code: 'IT', name: 'Italy', nameAr: 'إيطاليا', flag: '\u{1F1EE}\u{1F1F9}', dial: '+39', city: 'Rome', cityAr: 'روما', timezones: ['Europe/Rome'] },
  { code: 'ES', name: 'Spain', nameAr: 'إسبانيا', flag: '\u{1F1EA}\u{1F1F8}', dial: '+34', city: 'Madrid', cityAr: 'مدريد', timezones: ['Europe/Madrid'] },
  { code: 'PT', name: 'Portugal', nameAr: 'البرتغال', flag: '\u{1F1F5}\u{1F1F9}', dial: '+351', city: 'Lisbon', cityAr: 'لشبونة', timezones: ['Europe/Lisbon'] },
  { code: 'CH', name: 'Switzerland', nameAr: 'سويسرا', flag: '\u{1F1E8}\u{1F1ED}', dial: '+41', city: 'Zurich', cityAr: 'زيوريخ', timezones: ['Europe/Zurich'] },
  { code: 'AT', name: 'Austria', nameAr: 'النمسا', flag: '\u{1F1E6}\u{1F1F9}', dial: '+43', city: 'Vienna', cityAr: 'فيينا', timezones: ['Europe/Vienna'] },
  { code: 'BE', name: 'Belgium', nameAr: 'بلجيكا', flag: '\u{1F1E7}\u{1F1EA}', dial: '+32', city: 'Brussels', cityAr: 'بروكسل', timezones: ['Europe/Brussels'] },
  { code: 'IE', name: 'Ireland', nameAr: 'أيرلندا', flag: '\u{1F1EE}\u{1F1EA}', dial: '+353', city: 'Dublin', cityAr: 'دبلن', timezones: ['Europe/Dublin'] },
  { code: 'PL', name: 'Poland', nameAr: 'بولندا', flag: '\u{1F1F5}\u{1F1F1}', dial: '+48', city: 'Warsaw', cityAr: 'وارسو', timezones: ['Europe/Warsaw'] },
  { code: 'CZ', name: 'Czech Republic', nameAr: 'التشيك', flag: '\u{1F1E8}\u{1F1FF}', dial: '+420', city: 'Prague', cityAr: 'براغ', timezones: ['Europe/Prague'] },
  { code: 'GR', name: 'Greece', nameAr: 'اليونان', flag: '\u{1F1EC}\u{1F1F7}', dial: '+30', city: 'Athens', cityAr: 'أثينا', timezones: ['Europe/Athens'] },
  { code: 'RO', name: 'Romania', nameAr: 'رومانيا', flag: '\u{1F1F7}\u{1F1F4}', dial: '+40', city: 'Bucharest', cityAr: 'بوخارست', timezones: ['Europe/Bucharest'] },
  { code: 'UA', name: 'Ukraine', nameAr: 'أوكرانيا', flag: '\u{1F1FA}\u{1F1E6}', dial: '+380', city: 'Kyiv', cityAr: 'كييف', timezones: ['Europe/Kyiv'] },
  { code: 'RU', name: 'Russia', nameAr: 'روسيا', flag: '\u{1F1F7}\u{1F1FA}', dial: '+7', city: 'Moscow', cityAr: 'موسكو', timezones: ['Europe/Moscow'] },
  // ─── North America ──────────────────────────────────────────────
  { code: 'MX', name: 'Mexico', nameAr: 'المكسيك', flag: '\u{1F1F2}\u{1F1FD}', dial: '+52', city: 'Mexico City', cityAr: 'مكسيكو', timezones: ['America/Mexico_City'] },
  // ─── South America ──────────────────────────────────────────────
  { code: 'BR', name: 'Brazil', nameAr: 'البرازيل', flag: '\u{1F1E7}\u{1F1F7}', dial: '+55', city: 'Sao Paulo', cityAr: 'ساو باولو', timezones: ['America/Sao_Paulo'] },
  { code: 'AR', name: 'Argentina', nameAr: 'الأرجنتين', flag: '\u{1F1E6}\u{1F1F7}', dial: '+54', city: 'Buenos Aires', cityAr: 'بوينس آيرس', timezones: ['America/Argentina/Buenos_Aires'] },
  { code: 'CO', name: 'Colombia', nameAr: 'كولومبيا', flag: '\u{1F1E8}\u{1F1F4}', dial: '+57', city: 'Bogota', cityAr: 'بوغوتا', timezones: ['America/Bogota'] },
  { code: 'CL', name: 'Chile', nameAr: 'تشيلي', flag: '\u{1F1E8}\u{1F1F1}', dial: '+56', city: 'Santiago', cityAr: 'سانتياغو', timezones: ['America/Santiago'] },
  // ─── South Asia ─────────────────────────────────────────────────
  { code: 'IN', name: 'India', nameAr: 'الهند', flag: '\u{1F1EE}\u{1F1F3}', dial: '+91', city: '', cityAr: '', timezones: ['Asia/Kolkata'] },
  { code: 'PK', name: 'Pakistan', nameAr: 'باكستان', flag: '\u{1F1F5}\u{1F1F0}', dial: '+92', city: '', cityAr: '', timezones: ['Asia/Karachi'] },
  { code: 'BD', name: 'Bangladesh', nameAr: 'بنغلاديش', flag: '\u{1F1E7}\u{1F1E9}', dial: '+880', city: 'Dhaka', cityAr: 'دكا', timezones: ['Asia/Dhaka'] },
  { code: 'LK', name: 'Sri Lanka', nameAr: 'سريلانكا', flag: '\u{1F1F1}\u{1F1F0}', dial: '+94', city: 'Colombo', cityAr: 'كولومبو', timezones: ['Asia/Colombo'] },
  // ─── Southeast Asia ─────────────────────────────────────────────
  { code: 'MY', name: 'Malaysia', nameAr: 'ماليزيا', flag: '\u{1F1F2}\u{1F1FE}', dial: '+60', city: 'Kuala Lumpur', cityAr: 'كوالالمبور', timezones: ['Asia/Kuala_Lumpur'] },
  { code: 'SG', name: 'Singapore', nameAr: 'سنغافورة', flag: '\u{1F1F8}\u{1F1EC}', dial: '+65', city: 'Singapore', cityAr: 'سنغافورة', timezones: ['Asia/Singapore'] },
  { code: 'ID', name: 'Indonesia', nameAr: 'إندونيسيا', flag: '\u{1F1EE}\u{1F1E9}', dial: '+62', city: 'Jakarta', cityAr: 'جاكرتا', timezones: ['Asia/Jakarta'] },
  { code: 'PH', name: 'Philippines', nameAr: 'الفلبين', flag: '\u{1F1F5}\u{1F1ED}', dial: '+63', city: 'Manila', cityAr: 'مانيلا', timezones: ['Asia/Manila'] },
  { code: 'TH', name: 'Thailand', nameAr: 'تايلاند', flag: '\u{1F1F9}\u{1F1ED}', dial: '+66', city: 'Bangkok', cityAr: 'بانكوك', timezones: ['Asia/Bangkok'] },
  { code: 'VN', name: 'Vietnam', nameAr: 'فيتنام', flag: '\u{1F1FB}\u{1F1F3}', dial: '+84', city: 'Hanoi', cityAr: 'هانوي', timezones: ['Asia/Ho_Chi_Minh'] },
  // ─── East Asia ──────────────────────────────────────────────────
  { code: 'CN', name: 'China', nameAr: 'الصين', flag: '\u{1F1E8}\u{1F1F3}', dial: '+86', city: 'Beijing', cityAr: 'بكين', timezones: ['Asia/Shanghai'] },
  { code: 'JP', name: 'Japan', nameAr: 'اليابان', flag: '\u{1F1EF}\u{1F1F5}', dial: '+81', city: 'Tokyo', cityAr: 'طوكيو', timezones: ['Asia/Tokyo'] },
  { code: 'KR', name: 'South Korea', nameAr: 'كوريا الجنوبية', flag: '\u{1F1F0}\u{1F1F7}', dial: '+82', city: 'Seoul', cityAr: 'سيول', timezones: ['Asia/Seoul'] },
  { code: 'TW', name: 'Taiwan', nameAr: 'تايوان', flag: '\u{1F1F9}\u{1F1FC}', dial: '+886', city: 'Taipei', cityAr: 'تايبيه', timezones: ['Asia/Taipei'] },
  { code: 'HK', name: 'Hong Kong', nameAr: 'هونغ كونغ', flag: '\u{1F1ED}\u{1F1F0}', dial: '+852', city: 'Hong Kong', cityAr: 'هونغ كونغ', timezones: ['Asia/Hong_Kong'] },
  // ─── Central Asia ───────────────────────────────────────────────
  { code: 'KZ', name: 'Kazakhstan', nameAr: 'كازاخستان', flag: '\u{1F1F0}\u{1F1FF}', dial: '+7', city: '', cityAr: '', timezones: ['Asia/Almaty', 'Asia/Qostanay'] },
  { code: 'UZ', name: 'Uzbekistan', nameAr: 'أوزبكستان', flag: '\u{1F1FA}\u{1F1FF}', dial: '+998', city: 'Tashkent', cityAr: 'طشقند', timezones: ['Asia/Tashkent'] },
  // ─── Oceania ────────────────────────────────────────────────────
  { code: 'AU', name: 'Australia', nameAr: 'أستراليا', flag: '\u{1F1E6}\u{1F1FA}', dial: '+61', city: 'Sydney', cityAr: 'سيدني', timezones: ['Australia/Sydney', 'Australia/Melbourne'] },
  { code: 'NZ', name: 'New Zealand', nameAr: 'نيوزيلندا', flag: '\u{1F1F3}\u{1F1FF}', dial: '+64', city: 'Auckland', cityAr: 'أوكلاند', timezones: ['Pacific/Auckland'] },
];

function detectCountryFromTimezone(tz: string): CountryInfo {
  const match = COUNTRIES.find(c => c.timezones.includes(tz));
  return match || COUNTRIES[1]; // fallback to Canada
}

function formatPhoneDisplay(raw: string): string {
  // Light formatting: group digits for readability
  const digits = raw.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
}

// ─── Completion Ring SVG ─────────────────────────────────────────

function CompletionRing({ filled, total }: { filled: number; total: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? filled / total : 0;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative w-12 h-12">
      <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="#F0ECE8" strokeWidth="3" />
        <motion.circle
          cx="24" cy="24" r={radius} fill="none"
          stroke="#7A3B5E" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-bold text-[#7A3B5E]">{filled}/{total}</span>
      </div>
    </div>
  );
}

// ─── Smart Input Field ──────────────────────────────────────────

function SmartField({ icon: Icon, label, valid, children }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  valid: boolean;
  children: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="relative group"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className={`w-3.5 h-3.5 transition-colors duration-300 ${focused ? 'text-[#7A3B5E]' : 'text-[#C0B8B0]'}`} />
        <span className={`text-xs font-medium transition-colors duration-300 ${focused ? 'text-[#7A3B5E]' : 'text-[#8E8E9F]'}`}>
          {label}
        </span>
        <AnimatePresence>
          {valid && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <Check className="w-3.5 h-3.5 text-[#3B8A6E]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {children}
      {/* Focus underline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7A3B5E] origin-center"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function InfoStep({ wizard, locale, isRTL, providerTimezone, inPersonEnabled = true }: StepProps & { providerTimezone: string; inPersonEnabled?: boolean }) {
  const detectedCountry = detectCountryFromTimezone(wizard.formData.clientTimezone);

  const [name, setName] = useState(wizard.formData.clientName);
  const [email, setEmail] = useState(wizard.formData.clientEmail);
  const [phoneDigits, setPhoneDigits] = useState(() => {
    // Strip existing dial code if phone was pre-filled
    const existing = wizard.formData.clientPhone;
    if (!existing) return '';
    const stripped = existing.replace(detectedCountry.dial, '').replace(/\D/g, '');
    return stripped;
  });
  const [phoneCountry, setPhoneCountry] = useState<CountryInfo>(detectedCountry);
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  // ─── Returning-client recognition (PIPEDA-friendly) ──────────────
  // Soft hint only — typing a known email triggers a "we recognize you,
  // get a magic link" prompt. We never auto-fill PII without a
  // magic-link round-trip (handled at hydration time via /api/account/session).
  const [recognized, setRecognized] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [magicSending, setMagicSending] = useState(false);
  const isAuthed = wizard.formData.isAuthenticatedReturning;
  const [consentRememberMe, setConsentRememberMe] = useState(
    wizard.formData.consentRememberMe || isAuthed,
  );
  // WhatsApp opt-in: unchecked by default per PIPEDA + WhatsApp Business
  // policy. Even authenticated returning clients see it unchecked unless
  // they previously opted in (consent persists on the customer record).
  const [consentWhatsapp, setConsentWhatsapp] = useState(wizard.formData.consentWhatsapp);
  // Debounced recognition probe — runs once email looks valid.
  useEffect(() => {
    if (isAuthed) return; // already known, no need to probe
    const trimmed = email.trim().toLowerCase();
    if (!trimmed.includes('@') || !trimmed.includes('.') || trimmed.length < 6) {
      setRecognized(false);
      return;
    }
    const handle = setTimeout(() => {
      fetch('/api/booking/recognize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
        .then(r => r.json())
        .then(data => {
          setRecognized(!!data?.recognized);
          // Pre-emptively flag if this email has already used the
          // free consult — so the SmartFrontDoor / IntakeStep tile
          // hides even before they verify via magic link.
          if (data?.recognized && data?.freeConsultUsed) {
            wizard.updateForm({ freeConsultUsed: true });
          }
        })
        .catch(() => setRecognized(false));
    }, 500);
    return () => clearTimeout(handle);
  }, [email, isAuthed]); // eslint-disable-line react-hooks/exhaustive-deps

  const sendMagicLink = async () => {
    if (!email.includes('@')) return;
    setMagicSending(true);
    try {
      await fetch('/api/account/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      setMagicSent(true);
    } finally {
      setMagicSending(false);
    }
  };
  // Location-aware session mode: show In-Person only when Dr. Hala is in the client's region
  const isInOttawa = providerTimezone?.includes('Toronto') || providerTimezone?.includes('Eastern');
  const isInDubai = providerTimezone?.includes('Dubai') || providerTimezone?.includes('Gulf');
  const clientCountry = wizard.formData.clientCountry;
  // ─── Tier-aware mode availability ──────────────────────────────
  // Some services (experiential) are in-person only because they depend on a physical
  // setting. Pricing tier is the source of truth — null anchor = mode not offered.
  const tierKey = wizard.formData.pricingTierKey;
  const clientRegion: Region | undefined = clientCountry ? COUNTRY_TO_REGION[clientCountry.toUpperCase()] : undefined;
  const providerRegion: Region | undefined = isInOttawa ? 'CAD' : isInDubai ? 'AED' : undefined;
  // Online is global if any region offers it (PPP band pricing covers non-region clients).
  const tierOffersOnline = getAvailableModes(tierKey, 'CAD').includes('online') || getAvailableModes(tierKey, 'AED').includes('online');
  const tierOffersInPersonLocal = clientRegion ? getAvailableModes(tierKey, clientRegion).includes('inPerson') : false;
  const tierOffersInPersonViaTravel = providerRegion ? getAvailableModes(tierKey, providerRegion).includes('inPerson') : false;
  // Admin toggle + region match still gate in-person; tier null can also disable it.
  const sameRegion = (isInOttawa && ['CA', 'US'].includes(clientCountry)) || (isInDubai && ['AE', 'SA', 'KW', 'BH', 'QA', 'OM'].includes(clientCountry));
  const showInPerson = inPersonEnabled && sameRegion && tierOffersInPersonLocal;
  // Different region but admin allows in-person AND the tier offers it → show travel hint
  const isLocationMismatch = inPersonEnabled && !sameRegion && (isInOttawa || isInDubai) && tierOffersInPersonViaTravel;
  const [showTravelHint, setShowTravelHint] = useState(false);
  const providerCity = isInDubai ? (isRTL ? 'دبي' : 'Dubai') : (isRTL ? 'أوتاوا' : 'Ottawa');
  // Auto-correct mode when current selection isn't valid for the chosen service.
  const [mode, setMode] = useState<SessionMode>(() => {
    const current = wizard.formData.sessionMode;
    if (current === 'online' && !tierOffersOnline) return 'inPerson';
    if (current === 'inPerson' && !tierOffersInPersonLocal && !tierOffersInPersonViaTravel) return tierOffersOnline ? 'online' : 'inPerson';
    if (current === 'inPerson' && !showInPerson && !showTravelHint && tierOffersOnline) return 'online';
    return current;
  });
  // Service is in-person only AND client is in same region → friendly hint
  const isInPersonOnlyService = !tierOffersOnline && tierOffersInPersonLocal;
  const [notes, setNotes] = useState(wizard.formData.notes || wizard.formData.intakeText);
  const [showNotes, setShowNotes] = useState(!!notes);
  const [locationCountry, setLocationCountry] = useState<CountryInfo>(
    // formData.clientCountry is now an ISO-2 code — match on code first, then
    // fall back to name-match (for any legacy drafts still holding the old
    // name-based value) before defaulting to the timezone-detected country.
    COUNTRIES.find(c => c.code === wizard.formData.clientCountry)
      || COUNTRIES.find(c => c.name === wizard.formData.clientCountry)
      || detectedCountry,
  );
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Compose full phone for storage
  const fullPhone = phoneDigits ? `${phoneCountry.dial}${phoneDigits.replace(/\D/g, '')}` : '';

  // Validation
  const nameValid = name.trim().length >= 2;
  const emailValid = email.includes('@') && email.includes('.');
  const phoneValid = phoneDigits.replace(/\D/g, '').length >= 6;
  const filledCount = [nameValid, emailValid, phoneValid, true, true, notes.trim().length > 0].filter(Boolean).length;
  const allRequired = nameValid && emailValid && phoneValid;

  const handleSubmit = () => {
    if (!nameValid || !emailValid) {
      wizard.setError(isRTL ? 'الاسم والبريد الإلكتروني مطلوبان' : 'Name and email are required');
      return;
    }
    if (!phoneValid) {
      wizard.setError(isRTL ? 'رقم الهاتف مطلوب' : 'Phone number is required');
      return;
    }
    wizard.updateForm({
      clientName: name.trim(),
      clientEmail: email.trim().toLowerCase(),
      clientPhone: fullPhone,
      // Store ISO-2 code — the pricing engine, country-to-band lookup,
      // and invoice create route all expect a 2-letter code. Display
      // name + flag are rendered from this code via COUNTRIES_BY_CODE.
      clientCountry: locationCountry.code,
      // Communication language mirrors the site locale the client is
      // browsing in — no separate toggle. Re-read it here so the form
      // always snapshots the current URL locale even if the wizard
      // was mounted under a different default.
      preferredLanguage: isRTL ? 'ar' : 'en',
      sessionMode: mode,
      notes: notes.trim(),
      consentRememberMe,
      consentWhatsapp,
    });
    wizard.goNext();
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border-0 bg-[#FAF7F2] text-sm text-[#2D2A33] placeholder-[#C0B8B0] focus:bg-white focus:ring-2 focus:ring-[#7A3B5E]/20 outline-none transition-all duration-300';
  const glassCard = 'bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/60 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-500';

  // Country dropdown component (reused for phone + location)
  // Country picker as a fixed bottom sheet on mobile, absolute dropdown on desktop
  const CountryDropdown = ({ onSelect, onClose }: { onSelect: (c: CountryInfo) => void; onClose: () => void }) => (
    <>
      {/* Full-screen backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] bg-black/20"
        onClick={onClose}
      />
      {/* Full-screen centered modal — guarantees no clipping */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="fixed z-[9999] inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-[360px] bg-white rounded-2xl border border-[#F0ECE8] shadow-2xl max-h-[70vh] overflow-hidden flex flex-col"
      >
        <div className="px-4 py-3 border-b border-[#F0ECE8] flex items-center justify-between shrink-0">
          <span className="text-sm font-semibold text-[#4A4A5C]">{isRTL ? 'اختر البلد' : 'Select Country'}</span>
          <button onClick={onClose} className="text-xs text-[#8E8E9F] hover:text-[#7A3B5E]">{isRTL ? 'إغلاق' : 'Close'}</button>
        </div>
        <div className="overflow-y-auto flex-1">
          {COUNTRIES.map(c => (
            <button
              key={c.code}
              onClick={() => { onSelect(c); onClose(); }}
              className="w-full flex items-center gap-2.5 px-4 py-3.5 text-left hover:bg-[#FAF7F2] active:bg-[#F5F0EB] transition-colors text-sm border-b border-[#F0ECE8]/50 last:border-0"
            >
              <span className="text-lg">{c.flag}</span>
              <span className="text-[#4A4A5C] flex-1 font-medium">{isRTL ? c.nameAr : c.name}</span>
              <span className="text-xs text-[#8E8E9F]">{c.dial}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="space-y-5">
      {/* Header with completion ring */}
      <div className="flex items-center justify-center gap-4">
        <CompletionRing filled={filledCount} total={6} />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2D2A33]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
            {isRTL ? 'أخبرنا عنك' : 'Tell Us About You'}
          </h1>
          <p className="text-xs text-[#8E8E9F] mt-0.5">
            {isRTL ? 'معلوماتك آمنة ومحمية' : 'Your information is safe and private'}
          </p>
        </div>
      </div>

      {/* ─── Card 1: About You ─── */}
      <motion.div
        className={`${glassCard} overflow-visible relative z-10`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[10px] font-semibold text-[#C8A97D] uppercase tracking-[0.15em] mb-4">
          {isRTL ? 'بياناتك الشخصية' : 'Personal Details'}
        </p>
        <div className="space-y-4">
          <SmartField icon={User} label={isRTL ? 'الاسم الكامل' : 'Full Name'} valid={nameValid}>
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder={isRTL ? 'اسمك الكامل' : 'Your full name'}
              className={inputClass} dir="auto"
            />
          </SmartField>
          <SmartField icon={Mail} label={isRTL ? 'البريد الإلكتروني' : 'Email Address'} valid={emailValid}>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="email@example.com"
              className={inputClass} dir="ltr"
            />
          </SmartField>

          {/* Returning-client recognition — soft hint only, no PII shown.
              On the free-discovery-call flow, prefer redirecting to services
              (the call is for new clients only). Otherwise, offer magic-link
              prefill. Either way, "Continue anyway" is always available — the
              recognition can be wrong (shared family email, etc.). */}
          {recognized && !isAuthed && !magicSent && wizard.formData.serviceSlug === 'initial-consultation' && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-3 py-3 rounded-xl bg-[#7A3B5E]/5 border border-[#7A3B5E]/20"
            >
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-[#7A3B5E] mt-0.5 shrink-0" />
                <p className="text-xs text-[#4A4A5C] leading-relaxed">
                  {isRTL
                    ? 'مرحباً بعودتك! المكالمة المجانية للعملاء الجدد — هل تود الاختيار من خدماتنا؟'
                    : "Welcome back! The free discovery call is for new clients — would you like to pick from our services?"}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2.5">
                <button
                  type="button"
                  onClick={() => {
                    try { sessionStorage.setItem('mh:skip_consult', '1'); } catch {}
                    wizard.goToStep('service');
                  }}
                  data-cta="info-recognize-redirect"
                  className="px-3 py-1.5 rounded-lg bg-[#7A3B5E] text-white text-[11px] font-semibold hover:bg-[#69304F] transition-colors"
                >
                  {isRTL ? 'تصفّح الخدمات' : 'Browse services'}
                </button>
                <button
                  type="button"
                  onClick={sendMagicLink}
                  disabled={magicSending}
                  data-cta="info-recognize-continue-discovery"
                  className="text-[11px] font-medium text-[#8E8E9F] hover:text-[#4A4A5C] disabled:opacity-50"
                >
                  {isRTL ? 'متابعة المكالمة المجانية' : 'Continue with discovery call anyway'}
                </button>
              </div>
            </motion.div>
          )}
          {recognized && !isAuthed && !magicSent && wizard.formData.serviceSlug !== 'initial-consultation' && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-[#3B8A6E]/8 border border-[#3B8A6E]/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#3B8A6E] mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#2D6E54] leading-relaxed">
                  {isRTL ? 'يبدو أنّكَ زرتَنا من قبل.' : 'Looks like we have you on file.'}
                </p>
                <button
                  type="button"
                  onClick={sendMagicLink}
                  disabled={magicSending}
                  className="text-[11px] font-semibold text-[#3B8A6E] hover:text-[#2D6E54] mt-0.5 disabled:opacity-50"
                >
                  {magicSending
                    ? (isRTL ? 'جارٍ الإرسال...' : 'Sending…')
                    : (isRTL ? 'أرسل رابط دخول سريع لملء بياناتي ←' : 'Send me a quick login link to prefill my details →')}
                </button>
              </div>
            </motion.div>
          )}
          {magicSent && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E0D8]">
              <Check className="w-3.5 h-3.5 text-[#3B8A6E] shrink-0" />
              <p className="text-xs text-[#4A4A5C]">
                {isRTL
                  ? 'تحقق من بريدك الإلكتروني للحصول على الرابط (15 دقيقة).'
                  : 'Check your email for a sign-in link (valid 15 min).'}
              </p>
            </div>
          )}
          {isAuthed && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#7A3B5E]/5 border border-[#7A3B5E]/15">
              <Check className="w-3.5 h-3.5 text-[#7A3B5E] shrink-0" />
              <p className="text-xs text-[#4A4A5C]">
                {isRTL
                  ? <>أهلًا بعودتك{name ? <>, <strong>{name.split(' ')[0]}</strong></> : ''} — تم ملء بياناتك تلقائيًّا.</>
                  : <>Welcome back{name ? <>, <strong>{name.split(' ')[0]}</strong></> : ''} — your details are pre-filled.</>}
              </p>
            </div>
          )}

          {/* Smart Phone — country code + number */}
          <SmartField icon={Phone} label={isRTL ? 'رقم الهاتف' : 'Phone Number'} valid={phoneValid}>
            <div className="flex gap-1.5 relative">
              <button
                type="button"
                onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
                className="flex items-center gap-1 px-3 py-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F5F0EB] text-sm font-medium text-[#4A4A5C] transition-all shrink-0"
              >
                <span className="text-base leading-none">{phoneCountry.flag}</span>
                <span className="text-xs text-[#8E8E9F]">{phoneCountry.dial}</span>
                <ChevronDown className="w-3 h-3 text-[#C0B8B0]" />
              </button>
              <input
                type="tel"
                value={formatPhoneDisplay(phoneDigits)}
                onChange={e => setPhoneDigits(e.target.value.replace(/\D/g, '').slice(0, 12))}
                placeholder="522 464 844"
                className={`${inputClass} flex-1`}
                dir="ltr"
              />
              <AnimatePresence>
                {showPhoneDropdown && (
                  <CountryDropdown
                    onSelect={c => setPhoneCountry(c)}
                    onClose={() => setShowPhoneDropdown(false)}
                  />
                )}
              </AnimatePresence>
            </div>
          </SmartField>
        </div>
      </motion.div>

      {/* ─── Card 2: Preferences ─── */}
      <motion.div
        className={`${glassCard} overflow-visible relative z-10`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[10px] font-semibold text-[#C8A97D] uppercase tracking-[0.15em] mb-4">
          {isRTL ? 'تفضيلاتك' : 'Your Preferences'}
        </p>

        {/* Location — smart auto-detected with dropdown */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#C0B8B0]" />
            <span className="text-xs font-medium text-[#8E8E9F]">{isRTL ? 'الموقع' : 'Location'}</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[9px] font-semibold text-[#3B8A6E] bg-[#3B8A6E]/10 px-2 py-0.5 rounded-full"
            >
              {isRTL ? 'تم الكشف' : 'Auto-detected'}
            </motion.span>
          </div>
          <button
            type="button"
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="w-full py-3 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F5F0EB] text-sm text-left flex items-center gap-2.5 transition-all"
          >
            <span className="text-base">{locationCountry.flag}</span>
            <span className="text-[#2D2A33] flex-1">
              {locationCountry.city && `${isRTL ? locationCountry.cityAr : locationCountry.city}, `}
              {isRTL ? locationCountry.nameAr : locationCountry.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#C0B8B0]" />
          </button>
          <AnimatePresence>
            {showLocationDropdown && (
              <CountryDropdown
                onSelect={c => setLocationCountry(c)}
                onClose={() => setShowLocationDropdown(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ─── Card 3: Session Setup ─── */}
      <motion.div
        className={glassCard}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[10px] font-semibold text-[#C8A97D] uppercase tracking-[0.15em] mb-4">
          {isRTL ? 'إعداد الجلسة' : 'Session Setup'}
        </p>

        {/* In-person-only explainer — shown for experiential services */}
        {isInPersonOnlyService && (
          <div className="mb-3 p-3 rounded-xl bg-[#7A3B5E]/5 border border-[#7A3B5E]/15">
            <p className="text-xs text-[#7A3B5E] flex items-start gap-2 leading-relaxed">
              <Leaf className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>
                {isRTL
                  ? <>هذه التجربة تُقام شخصيًّا في <strong>{providerCity}</strong> — تتطلب حضور المُعالِج وبيئة محددة.</>
                  : <>This experience is held in person in <strong>{providerCity}</strong> — it depends on the setting.</>}
              </span>
            </p>
          </div>
        )}

        {/* Session Mode — visual cards (service- and location-aware) */}
        {(() => {
          type ModeOption = { key: SessionMode; icon: typeof Video; label: string; desc: string };
          const modeOptions: ModeOption[] = [];
          if (tierOffersOnline) {
            modeOptions.push({
              key: 'online',
              icon: Video,
              label: isRTL ? 'عبر الإنترنت' : 'Online',
              desc: isRTL ? 'مكالمة فيديو من أي مكان' : 'Video call from anywhere',
            });
          }
          if (showInPerson || showTravelHint) {
            modeOptions.push({
              key: 'inPerson',
              icon: Building2,
              label: isInDubai ? (isRTL ? 'شخصياً — دبي' : 'In-Person — Dubai') : (isRTL ? 'شخصياً — أوتاوا' : 'In-Person — Ottawa'),
              desc: isInDubai ? (isRTL ? 'جلسة حضوريّة في دبي' : 'Face-to-face session in Dubai') : (isRTL ? 'مكتب أوتاوا، 430 هازلدين' : 'Ottawa, 430 Hazeldean Rd'),
            });
          }
          return (
        <div className={`grid ${modeOptions.length === 2 ? 'grid-cols-2' : 'grid-cols-1 max-w-xs mx-auto'} gap-3 mb-4`}>
          {modeOptions.map(opt => (
            <motion.button
              key={opt.key}
              onClick={() => setMode(opt.key)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`relative p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                mode === opt.key
                  ? 'border-[#7A3B5E] bg-[#7A3B5E]/5 shadow-[var(--shadow-card)]'
                  : 'border-[#F0ECE8] hover:border-[#C4878A]/30 bg-white'
              }`}
            >
              <opt.icon className={`w-6 h-6 mx-auto mb-2 transition-colors duration-300 ${mode === opt.key ? 'text-[#7A3B5E]' : 'text-[#C0B8B0]'}`} />
              <p className={`text-sm font-semibold transition-colors duration-300 ${mode === opt.key ? 'text-[#7A3B5E]' : 'text-[#4A4A5C]'}`}>
                {opt.label}
              </p>
              <p className="text-[10px] text-[#8E8E9F] mt-0.5 leading-tight">{opt.desc}</p>
              {mode === opt.key && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#7A3B5E] flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
          );
        })()}

        {/* Travel hint — shown when client is in a different region than Dr. Hala */}
        <AnimatePresence>
          {isLocationMismatch && !showTravelHint && (
            <motion.button
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              type="button"
              onClick={() => setShowTravelHint(true)}
              className="w-full flex items-center gap-2.5 px-4 py-3 -mt-1 mb-4 rounded-xl bg-gradient-to-r from-[#C8A97D]/8 to-[#7A3B5E]/5 border border-[#C8A97D]/20 text-start hover:border-[#C8A97D]/40 transition-colors group"
            >
              <span className="text-base flex-shrink-0">✈️</span>
              <span className="flex-1 min-w-0">
                <span className="text-xs text-[#4A4A5C] leading-relaxed">
                  {isRTL
                    ? <>نستقبلُ حاليًّا في <strong className="text-[#7A3B5E]">{providerCity}</strong>. ترغبُ بزيارتِنا شخصيًّا؟</>
                    : <>Currently seeing clients in <strong className="text-[#7A3B5E]">{providerCity}</strong>. Willing to visit?</>}
                </span>
              </span>
              <span className="text-[10px] font-semibold text-[#C8A97D] group-hover:text-[#7A3B5E] transition-colors whitespace-nowrap flex-shrink-0">
                {isRTL ? 'حجز شخصي ←' : 'Book In-Person →'}
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Notes — collapsible */}
        {!showNotes ? (
          <button
            onClick={() => setShowNotes(true)}
            className="w-full py-2.5 rounded-xl border border-dashed border-[#E8E0D8] text-xs font-medium text-[#8E8E9F] hover:border-[#C8A97D] hover:text-[#C8A97D] transition-all flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {isRTL ? 'إضافة ملاحظات (اختياري)' : 'Add a note (optional)'}
          </button>
        ) : (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
            <div className="flex items-center gap-2 mb-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#C0B8B0]" />
              <span className="text-xs font-medium text-[#8E8E9F]">{isRTL ? 'ملاحظات' : 'Notes'}</span>
            </div>
            <textarea
              value={notes} onChange={e => setNotes(e.target.value)}
              placeholder={isRTL ? 'أي شيء تود مشاركته مسبقاً...' : 'Anything you\'d like to share beforehand...'}
              rows={3} autoFocus
              className={`${inputClass} resize-none`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </motion.div>
        )}
      </motion.div>

      {/* ─── Remember-me consent ─── */}
      <label className="flex items-start gap-2.5 px-1 py-1 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={consentRememberMe}
          onChange={e => setConsentRememberMe(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-[#C0B8B0] text-[#7A3B5E] focus:ring-2 focus:ring-[#7A3B5E]/20"
        />
        <span className="text-xs text-[#8E8E9F] leading-relaxed">
          {isRTL ? (
            <>
              تذكّرني في المرة القادمة لأخطّي إعادة الإدخال.{' '}
              <Link href={`/${locale}/privacy-policy#returning-clients`} className="text-[#7A3B5E] hover:underline">
                كيف نحمي بياناتك
              </Link>
            </>
          ) : (
            <>
              Remember me next time so I can skip re-entry.{' '}
              <Link href={`/${locale}/privacy-policy#returning-clients`} className="text-[#7A3B5E] hover:underline">
                How we protect your data
              </Link>
            </>
          )}
        </span>
      </label>

      {/* ─── WhatsApp opt-in (unchecked by default per PIPEDA + WhatsApp policy) ─── */}
      <label className="flex items-start gap-2.5 px-1 py-1 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={consentWhatsapp}
          onChange={e => setConsentWhatsapp(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-[#C0B8B0] text-[#7A3B5E] focus:ring-2 focus:ring-[#7A3B5E]/20"
        />
        <span className="text-xs text-[#8E8E9F] leading-relaxed">
          {isRTL ? (
            <>
              أرسل التأكيدات والتذكيرات عبر واتساب أيضاً إلى هذا الرقم. سنرسل
              فقط رسائل متعلقة بجلستك. أرسل STOP في أي وقت لإلغاء الاشتراك.
            </>
          ) : (
            <>
              Also send confirmations and reminders via WhatsApp to this number.
              We&apos;ll only message you about your session and rebooking. Reply
              STOP anytime to opt out.
            </>
          )}
        </span>
      </label>

      {/* ─── Submit CTA with shimmer ─── */}
      <motion.button
        onClick={handleSubmit}
        disabled={!allRequired}
        whileTap={{ scale: 0.98 }}
        className={`relative w-full py-3.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 overflow-hidden ${
          allRequired
            ? 'bg-[#7A3B5E] hover:bg-[#6A2E4E] shadow-[var(--shadow-card)]'
            : 'bg-[#C0B8B0] cursor-not-allowed'
        }`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {allRequired && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {allRequired ? <ArrowRight className="w-4 h-4" /> : <AlertCircle className="w-4 h-4 opacity-60" />}
          {isRTL ? 'التالي — مراجعة الحجز' : 'Next — Review Booking'}
        </span>
      </motion.button>
    </div>
  );
}

// ─── Step 5: Confirmation ───────────────────────────────────────

function ConfirmStep({ wizard, locale, isRTL }: StepProps) {
  const [consent, setConsent] = useState(false);
  const [recurringExpanded, setRecurringExpanded] = useState(false);
  const [eligibility, setEligibility] = useState<SelfServeEligibility | null>(null);
  const { formData, confirmBooking, submitSeries, isLoading, gateError, swapSlotAndConfirm } = wizard;

  // Slot-conflict recovery mode — controls whether the recovery card shows
  // the suggested-slot CTA (default) or the inline picker (after the user
  // taps "Pick another time" or after retries exhausted).
  const [recoveryMode, setRecoveryMode] = useState<'suggestion' | 'picker'>('suggestion');

  // When the recovery error appears with networkError or retryCount >= 3,
  // jump straight to the picker (Tier 2). The first 409 shows a suggestion,
  // a second silent re-suggest acknowledges the double race with the
  // retryFailed notice, and a third 409 finally escalates to the picker.
  // Resets back to suggestion when the error clears (after a successful re-confirm).
  useEffect(() => {
    if (!gateError || gateError.code !== 'slot_unavailable') {
      setRecoveryMode('suggestion');
      return;
    }
    if (gateError.networkError || (gateError.retryCount ?? 0) >= 3) {
      setRecoveryMode('picker');
    }
  }, [gateError]);

  const inSlotRecovery = gateError?.code === 'slot_unavailable';

  // Fetch self-serve eligibility once when this step mounts. Authenticated
  // returning clients with the gate met see the "Make this recurring?"
  // expander; everyone else sees the standard single-booking confirm flow.
  // Also runs the Tier 3 proactive slot guard in parallel — if the user's
  // selected slot has already been taken before they tap confirm, kick the
  // recovery flow immediately by firing confirmBooking (which 409s and
  // populates gateError). Single code path; no duplicated logic.
  useEffect(() => {
    let cancelled = false;
    if (formData.isAuthenticatedReturning) {
      fetch('/api/account/eligibility')
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (!cancelled && data) setEligibility(data as SelfServeEligibility);
        })
        .catch(() => { /* silent — single booking still works */ });
    }
    // Tier 3 — proactive availability check. Only meaningful if we have a
    // selected slot to verify; skip if state is incomplete (shouldn't happen
    // by step 5 but defensive). Don't run if recovery is already active.
    if (formData.selectedDate && formData.selectedStartTime && !inSlotRecovery) {
      const tz = encodeURIComponent(formData.clientTimezone);
      fetch(`/api/book/availability?date=${formData.selectedDate}&duration=${formData.durationMinutes}&tz=${tz}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (cancelled || !data?.slots) return;
          const stillAvailable = (data.slots as TimeSlot[]).some(
            (s) => s.start === formData.selectedStartTime && s.available,
          );
          if (!stillAvailable) {
            // Slot is gone — fire confirmBooking to surface the recovery card
            // via the same 409 path. This way the user never wastes a tap on
            // a doomed confirm attempt.
            void confirmBooking();
          }
        })
        .catch(() => { /* silent — confirm tap will catch real conflicts */ });
    }
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount-only; intentionally not reactive to formData

  const dateStr = new Date(formData.selectedStartTime).toLocaleDateString(
    isRTL ? 'ar' : 'en-US',
    { timeZone: formData.clientTimezone, weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  );
  const timeStr = new Date(formData.selectedStartTime).toLocaleTimeString(
    isRTL ? 'ar' : 'en-US',
    { timeZone: formData.clientTimezone, hour: 'numeric', minute: '2-digit' },
  );

  // Recovery card copy — these live close to the component to avoid an
  // i18n round-trip for what is a single namespace; if it grows, lift to
  // the message bundles.
  const recoveryCopy = isRTL
    ? {
        headline: 'للأسف، حُجز هذا الوقت للتو',
        subline: 'حجزه شخصٌ آخرُ قبل لحظات. إليك أقربَ موعدٍ متاح — معلوماتُك محفوظة.',
        findingNext: 'جارٍ إيجادُ الموعدِ التالي…',
        primaryCtaPrefix: 'احجز',
        primaryCtaInfix: 'الساعة',
        primaryCtaSuffix: 'بدلاً من ذلك',
        secondaryCta: 'اختر وقتًا آخر',
        pickerPrompt: 'اختر وقتًا جديدًا',
        retryFailed: 'حُجز هذا أيضًا للتو — إليك التالي المتاح.',
        noneInHorizon: 'لا توجدُ مواعيدُ ضمنَ الثلاثينَ يومًا القادمة. أرسلْ رسالةً للدكتورة هالة وستتواصلُ معك خلالَ 24 ساعة.',
        whatsappCta: 'راسلنا عبر واتساب',
        networkError: 'تعذّر الاتصال بالتقويم. اختر وقتًا من الأسفل.',
      }
    : {
        headline: 'That time was just booked',
        subline: "Someone reserved it a moment before you. Here's the next opening — your details are saved.",
        findingNext: 'Finding the next opening…',
        primaryCtaPrefix: 'Book',
        primaryCtaInfix: 'at',
        primaryCtaSuffix: 'instead',
        secondaryCta: 'Pick another time',
        pickerPrompt: 'Choose a new time',
        retryFailed: 'That one was just taken too — here\'s the next available.',
        noneInHorizon: 'No openings in the next 30 days. Send Dr. Hala a message and she\'ll reach out within 24 hours.',
        whatsappCta: 'Message us on WhatsApp',
        networkError: "Couldn't reach the calendar. Pick a time below.",
      };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-[#4A4A5C]" style={{ fontFamily: 'DM Serif Display, serif' }}>
          {isRTL ? 'تأكيد الحجز' : 'Confirm Your Booking'}
        </h1>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#F0ECE8] space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-[#F0ECE8]">
          <Calendar className="w-5 h-5 text-[#7A3B5E]" />
          <div>
            <p className="font-semibold text-[#4A4A5C]">{isRTL ? formData.serviceNameAr || formData.serviceName : formData.serviceName}</p>
            <p className="text-xs text-[#8E8E9F]">{formData.durationMinutes} {isRTL ? 'دقيقة' : 'min'} — {formData.sessionMode === 'online' ? (isRTL ? 'عبر الإنترنت' : 'Online') : (isRTL ? 'شخصياً' : 'In-Person')}</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#8E8E9F]"><Clock className="w-3.5 h-3.5 inline mr-1.5" />{isRTL ? 'التاريخ والوقت' : 'Date & Time'}</span>
            <span className="text-[#4A4A5C] font-medium">{dateStr}, {timeStr}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8E8E9F]"><User className="w-3.5 h-3.5 inline mr-1.5" />{isRTL ? 'الاسم' : 'Name'}</span>
            <span className="text-[#4A4A5C] font-medium">{formData.clientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8E8E9F]"><Mail className="w-3.5 h-3.5 inline mr-1.5" />{isRTL ? 'البريد' : 'Email'}</span>
            <span className="text-[#4A4A5C] font-medium" dir="ltr">{formData.clientEmail}</span>
          </div>
          {formData.clientPhone && (
            <div className="flex justify-between">
              <span className="text-[#8E8E9F]"><Phone className="w-3.5 h-3.5 inline mr-1.5" />{isRTL ? 'الهاتف' : 'Phone'}</span>
              <span className="text-[#4A4A5C] font-medium" dir="ltr">{formData.clientPhone}</span>
            </div>
          )}
          {formData.clientCountry && (() => {
            // formData.clientCountry is an ISO-2 code; look up the flag + name.
            const countryInfo = COUNTRIES.find(c => c.code === formData.clientCountry);
            const display = countryInfo
              ? `${countryInfo.flag} ${isRTL ? countryInfo.nameAr : countryInfo.name}`
              : formData.clientCountry;
            return (
              <div className="flex justify-between">
                <span className="text-[#8E8E9F]"><Globe className="w-3.5 h-3.5 inline mr-1.5" />{isRTL ? 'الموقع' : 'Location'}</span>
                <span className="text-[#4A4A5C] font-medium">{display}</span>
              </div>
            );
          })()}
        </div>

        {formData.notes && (
          <div className="bg-[#FFFAF5] rounded-lg p-3 border-l-3 border-[#C8A97D]">
            <p className="text-xs text-[#8E8E9F] mb-1">{isRTL ? 'ملاحظاتك' : 'Your notes'}</p>
            <p className="text-xs text-[#4A4A5C]">{formData.notes}</p>
          </div>
        )}
      </div>

      {/* Self-serve recurring expander — only when authenticated + eligible */}
      {eligibility?.eligible && (
        <div className="space-y-2">
          {!recurringExpanded ? (
            <button
              type="button"
              onClick={() => setRecurringExpanded(true)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#7A3B5E]/30 bg-white px-4 py-3 text-sm font-semibold text-[#7A3B5E] hover:bg-[#7A3B5E]/5 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              {isRTL ? 'هل تجعلينها سلسلة متكررة؟' : 'Make this recurring?'}
            </button>
          ) : (
            <SelfServeRecurringStep
              eligibility={eligibility}
              serviceSlug={formData.serviceSlug}
              serviceName={isRTL ? (formData.serviceNameAr || formData.serviceName) : formData.serviceName}
              durationMinutes={formData.durationMinutes}
              startTime={formData.selectedStartTime}
              endTime={formData.selectedEndTime}
              clientTimezone={formData.clientTimezone}
              locale={isRTL ? 'ar' : 'en'}
              isLoading={isLoading}
              onSubmit={async (args) => { await submitSeries(args); }}
            />
          )}
        </div>
      )}

      {/* Slot-conflict recovery — replaces consent + confirm button when active.
          Warm, non-alarmist framing. Summary card above stays visible so the
          user sees their info is intact. Suggested slot loads via gateError;
          inline picker auto-renders on network error or after retry exhaustion. */}
      {inSlotRecovery ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-[#FFFAF5] border border-[#7A3B5E]/20 p-5 sm:p-6 space-y-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7A3B5E]/10 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-[#7A3B5E]" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <p className="font-semibold text-[#4A4A5C]">{recoveryCopy.headline}</p>
              <p className="text-sm text-[#6B6580] leading-relaxed">{recoveryCopy.subline}</p>
            </div>
          </div>

          {(gateError?.retryCount ?? 0) >= 2 && !gateError?.noneInHorizon && (
            <p className="text-xs text-[#7A3B5E] italic">{recoveryCopy.retryFailed}</p>
          )}

          {gateError?.networkError && recoveryMode === 'picker' && (
            <p className="text-xs text-[#8E8E9F]">{recoveryCopy.networkError}</p>
          )}

          {/* Tier 1 — Suggested slot CTA */}
          {recoveryMode === 'suggestion' && !gateError?.noneInHorizon && !gateError?.networkError && (
            <>
              {gateError?.suggestedSlot ? (() => {
                const sd = new Date(gateError.suggestedSlot.startTime);
                const sDate = sd.toLocaleDateString(isRTL ? 'ar' : 'en-US', {
                  timeZone: formData.clientTimezone,
                  weekday: 'long', month: 'long', day: 'numeric',
                });
                const sTime = sd.toLocaleTimeString(isRTL ? 'ar' : 'en-US', {
                  timeZone: formData.clientTimezone,
                  hour: 'numeric', minute: '2-digit',
                });
                const sDateOnly = (() => {
                  try {
                    return new Intl.DateTimeFormat('en-CA', {
                      timeZone: formData.clientTimezone,
                      year: 'numeric', month: '2-digit', day: '2-digit',
                    }).format(sd);
                  } catch {
                    return gateError.suggestedSlot!.startTime.slice(0, 10);
                  }
                })();
                return (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        swapSlotAndConfirm(
                          gateError.suggestedSlot!.startTime,
                          gateError.suggestedSlot!.endTime,
                          sDateOnly,
                          false, // automated swap, not a fresh user pick
                        );
                      }}
                      disabled={isLoading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7A3B5E] hover:bg-[#69304F] active:scale-[0.99] text-white px-4 py-3 text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Calendar className="w-4 h-4" />
                      )}
                      <span>
                        {recoveryCopy.primaryCtaPrefix} {sDate} {recoveryCopy.primaryCtaInfix} {sTime} {recoveryCopy.primaryCtaSuffix}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecoveryMode('picker')}
                      disabled={isLoading}
                      className="w-full text-sm text-[#7A3B5E] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {recoveryCopy.secondaryCta}
                    </button>
                  </div>
                );
              })() : (
                <div className="flex items-center gap-2 text-sm text-[#8E8E9F]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#7A3B5E]" />
                  <span>{recoveryCopy.findingNext}</span>
                </div>
              )}
            </>
          )}

          {/* No slots within 30 days — WhatsApp escape hatch */}
          {gateError?.noneInHorizon && (
            <div className="space-y-3">
              <p className="text-sm text-[#6B6580] leading-relaxed">{recoveryCopy.noneInHorizon}</p>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1DA851] text-white px-4 py-2.5 text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {recoveryCopy.whatsappCta}
              </a>
            </div>
          )}

          {/* Tier 2 — Inline picker. Auto-rendered on network error, after
              retry exhaustion, or when the user taps "Pick another time". */}
          {recoveryMode === 'picker' && !gateError?.noneInHorizon && (
            <div className="pt-2 border-t border-[#7A3B5E]/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7A3B5E]/70 mb-3">
                {recoveryCopy.pickerPrompt}
              </p>
              <DateTimePicker
                durationMinutes={formData.durationMinutes}
                clientTimezone={formData.clientTimezone}
                initialDate={formData.selectedDate}
                locale={locale as 'en' | 'ar'}
                isRTL={isRTL}
                variant="inline"
                onSlotSelect={(slot) => {
                  swapSlotAndConfirm(slot.start, slot.end, slot.date, true);
                }}
              />
            </div>
          )}
        </motion.div>
      ) : (
        <>
          {/* Consent */}
          <label className="flex items-start gap-3 cursor-pointer bg-[#FAF7F2] rounded-xl p-4 border border-[#F0ECE8]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-[#D4ADA8] accent-[#7A3B5E] flex-shrink-0"
            />
            <span className="text-[11px] text-[#6B6580] leading-relaxed">
              {isRTL
                ? 'أوافقُ على أنّ المعلوماتِ المقدَّمةَ دقيقةٌ وأنّني أفهمُ أنّ هذا الطلبَ يخضعُ لمراجعةِ فريقنا. أوافقُ على سياسة الخصوصيّة وشروط الحجز.'
                : 'I confirm that the information provided is accurate and understand this request is subject to our team\'s review. I agree to the Privacy Policy and Booking Policy.'}
            </span>
          </label>

          <button
            onClick={confirmBooking}
            disabled={isLoading || !consent || recurringExpanded}
            className="w-full py-3.5 rounded-xl bg-[#7A3B5E] text-white font-semibold hover:bg-[#6A2E4E] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> {isRTL ? 'جارٍ التأكيد...' : 'Confirming...'}</>
            ) : (
              <><Check className="w-5 h-5" /> {isRTL ? 'تأكيد الحجز' : 'Confirm Booking'}</>
            )}
          </button>
        </>
      )}
    </div>
  );
}

// ─── Success State ──────────────────────────────────────────────

function SuccessStep({ wizard, locale, isRTL }: StepProps) {
  const result = wizard.formData.confirmationResult;
  const { formData } = wizard;
  const isPendingApproval = result?.status === 'pending_approval';

  return (
    <div className="space-y-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${isPendingApproval ? 'bg-[#C8A97D]/10' : 'bg-[#3B8A6E]/10'}`}
      >
        {isPendingApproval
          ? <Clock className="w-10 h-10 text-[#C8A97D]" />
          : <Check className="w-10 h-10 text-[#3B8A6E]" />
        }
      </motion.div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[#4A4A5C]" style={{ fontFamily: 'DM Serif Display, serif' }}>
          {isPendingApproval
            ? (isRTL ? 'تم استلام طلبك!' : 'Request Submitted!')
            : (isRTL ? 'تم تأكيد حجزك!' : 'You\'re All Set!')
          }
        </h1>
        <p className="text-sm text-[#8E8E9F]">
          {isPendingApproval
            ? (isRTL ? 'سنراجع طلبك ونؤكّده خلال ساعات قليلة.' : 'We will review your request and confirm within a few hours.')
            : (isRTL ? 'تم إرسال تفاصيل الحجز وملف التقويم إلى بريدك الإلكتروني.' : 'Booking details and a calendar file have been sent to your email.')
          }
        </p>
      </div>

      {/* What happens next (for pending approval) */}
      {isPendingApproval && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border-2 border-[#C8A97D]/30"
        >
          <p className={`text-sm font-bold text-[#7A3B5E] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الخطوات التالية' : 'What Happens Next'}</p>
          <div className="space-y-3">
            {[
              { num: '1', en: 'Our team reviews your request (usually within 4 hours)', ar: 'فريقنا يراجع طلبك (عادةً خلال ٤ ساعات)' },
              { num: '2', en: 'You receive an invoice with payment details via email', ar: 'ستصلك فاتورة بتفاصيل الدفع عبر البريد الإلكتروني' },
              { num: '3', en: 'Complete payment — your session is confirmed!', ar: 'أكمل الدفع — يتم تأكيد جلستك!' },
            ].map(step => (
              <div key={step.num} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C8A97D] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{step.num}</span>
                <p className={`text-sm text-[#4A4A5C] flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? step.ar : step.en}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Summary Card */}
      <div className={`bg-white rounded-2xl p-5 border border-[#F0ECE8] space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className="text-sm font-semibold text-[#4A4A5C]">{isRTL ? formData.serviceNameAr || formData.serviceName : formData.serviceName}</p>
        <p className="text-sm text-[#8E8E9F]">
          {new Date(formData.selectedStartTime).toLocaleDateString(isRTL ? 'ar' : 'en-US', {
            timeZone: formData.clientTimezone,
            weekday: 'long', month: 'long', day: 'numeric',
          })}
          {' '}
          {isRTL ? 'الساعة' : 'at'}{' '}
          {new Date(formData.selectedStartTime).toLocaleTimeString(isRTL ? 'ar' : 'en-US', {
            timeZone: formData.clientTimezone,
            hour: 'numeric', minute: '2-digit',
          })}
        </p>
        {/* Meet link for online sessions */}
        {result?.meetLink && (
          <a href={result.meetLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F0FAF5] text-xs font-semibold text-[#3B8A6E] hover:bg-[#E0F5ED] transition-colors">
            <Video className="w-3.5 h-3.5" />
            {isRTL ? 'رابط Google Meet' : 'Google Meet Link'}
          </a>
        )}
      </div>

      {/* AI Prep Tips */}
      {result?.aiPrepTips && result.aiPrepTips.length > 0 && (
        <div className={`bg-[#FFFAF5] rounded-xl p-5 border border-[#C8A97D]/20 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-xs font-semibold text-[#7A3B5E] mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {isRTL ? 'نصائح للتحضير لجلستك' : 'Prepare for Your Session'}
          </p>
          <ul className="text-xs text-[#4A4A5C] space-y-1.5">
            {result.aiPrepTips.map((tip, i) => (
              <li key={i} className={`relative ${isRTL ? 'pr-4 before:right-0' : 'pl-4 before:left-0'} before:content-['•'] before:absolute before:top-0`}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {!isPendingApproval && result?.meetLink && (
          <a href={result.meetLink} target="_blank" rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-[#3B8A6E] text-white text-sm font-semibold hover:bg-[#2F7A5E] transition-colors flex items-center justify-center gap-2">
            <Video className="w-4 h-4" />
            {isRTL ? 'رابط Google Meet' : 'Google Meet Link'}
          </a>
        )}
        {result?.manageUrl && (
          <a href={result.manageUrl}
            className="flex-1 py-2.5 rounded-xl bg-white border border-[#E8E0D8] text-sm font-semibold text-[#4A4A5C] hover:bg-[#F5F0EB] transition-colors flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            {isPendingApproval
              ? (isRTL ? 'عرض أو إلغاء الطلب' : 'View or Cancel Request')
              : (isRTL ? 'إدارة الحجز' : 'Manage Booking')
            }
          </a>
        )}
      </div>

      {/* ─── While You Wait — Strategic Engagement ─── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}
      >
        <p className="text-[10px] font-semibold text-[#C8A97D] uppercase tracking-[0.15em] text-center">
          {isRTL ? 'أثناء الانتظار' : 'While You Wait'}
        </p>

        <a
          href={`/${locale}/resources/assessments`}
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#F0ECE8] hover:border-[#C8A97D]/40 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#7A3B5E]/8 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-[#7A3B5E]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#4A4A5C] group-hover:text-[#7A3B5E] transition-colors">
              {isRTL ? 'تقييم ذاتي سريع' : 'Take a Quick Self Check-in'}
            </p>
            <p className="text-xs text-[#8E8E9F] mt-0.5">
              {isRTL ? 'ساعدنا على فهمك بشكل أفضل' : 'Help us understand you better before your session'}
            </p>
          </div>
          <ChevronRight className={`w-4 h-4 text-[#C0B8B0] group-hover:text-[#7A3B5E] shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
        </a>

        <a
          href={`/${locale}/resources/downloads`}
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#F0ECE8] hover:border-[#C8A97D]/40 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#C8A97D]/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-[#C8A97D]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#4A4A5C] group-hover:text-[#7A3B5E] transition-colors">
              {isRTL ? 'استكشف مواردنا المجانية' : 'Explore Free Resources'}
            </p>
            <p className="text-xs text-[#8E8E9F] mt-0.5">
              {isRTL ? 'أدوات ونصائح عملية يمكنك البدء بها الآن' : 'Practical tools you can start using today'}
            </p>
          </div>
          <ChevronRight className={`w-4 h-4 text-[#C0B8B0] group-hover:text-[#7A3B5E] shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
        </a>

        <a
          href={`/${locale}/resources/blog`}
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#F0ECE8] hover:border-[#C8A97D]/40 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#C4878A]/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-[#C4878A]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#4A4A5C] group-hover:text-[#7A3B5E] transition-colors">
              {isRTL ? 'اقرأ من مدوّنتنا' : 'Read Our Blog'}
            </p>
            <p className="text-xs text-[#8E8E9F] mt-0.5">
              {isRTL ? 'مقالات عن النمو الشخصي والعلاقات' : 'Articles on growth, relationships & wellbeing'}
            </p>
          </div>
          <ChevronRight className={`w-4 h-4 text-[#C0B8B0] group-hover:text-[#7A3B5E] shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
        </a>
      </motion.div>

      <button
        onClick={wizard.reset}
        className="text-sm text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors underline underline-offset-4"
      >
        {isRTL ? 'حجز جلسة أخرى' : 'Book Another Session'}
      </button>
    </div>
  );
}

// ─── Types ──────────────────────────────────────────────────────

interface StepProps {
  wizard: ReturnType<typeof useBookingWizard>;
  locale: string;
  isRTL: boolean;
}
