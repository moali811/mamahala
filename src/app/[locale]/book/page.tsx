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
import { PRICING_TIERS, getAnchor, type Region } from '@/config/pricing';
import {
  COUNTRIES,
  type CountryInfo,
} from '@/config/countries';
import { useBookingWizard, type BookingStep } from '@/hooks/useBookingWizard';
import type { ServiceRecommendation, TimeSlot, DayAvailability, SessionMode } from '@/lib/booking/types';
import type { ServiceCategory, Service } from '@/types';
import Breadcrumb from '@/components/layout/Breadcrumb';

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

  const wizard = useBookingWizard();
  const { step, stepIndex, formData, isLoading, error } = wizard;

  const BackArrow = isRTL ? ChevronRight : ChevronLeft;
  const ForwardArrow = isRTL ? ChevronLeft : ChevronRight;
  const stepContentRef = useRef<HTMLDivElement>(null);

  // Scroll to top of step content when step changes
  useEffect(() => {
    // Small delay to let AnimatePresence swap content
    const t = setTimeout(() => {
      stepContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => clearTimeout(t);
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
        durationMinutes: duration,
      });
      wizard.goToStep('datetime');
    }
  }, [preSelectedService]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div ref={stepContentRef} className="max-w-2xl mx-auto px-4 py-6 scroll-mt-4">
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
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {step === 'intake' && <IntakeStep wizard={wizard} locale={locale} isRTL={isRTL} />}
            {step === 'service' && <ServiceStep wizard={wizard} locale={locale} isRTL={isRTL} />}
            {step === 'datetime' && <DateTimeStep wizard={wizard} locale={locale} isRTL={isRTL} />}
            {step === 'info' && <InfoStep wizard={wizard} locale={locale} isRTL={isRTL} />}
            {step === 'confirm' && <ConfirmStep wizard={wizard} locale={locale} isRTL={isRTL} />}
            {step === 'success' && <SuccessStep wizard={wizard} locale={locale} isRTL={isRTL} />}
          </motion.div>
        </AnimatePresence>

        {/* Error Banner */}
        {error && (
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
  const [text, setText] = useState(wizard.formData.intakeText);
  const [isFirstTime, setIsFirstTime] = useState(true);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-[#7A3B5E]/10 flex items-center justify-center mx-auto">
          <Sparkles className="w-7 h-7 text-[#7A3B5E]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A4A5C]" style={{ fontFamily: 'DM Serif Display, serif' }}>
          {isRTL ? 'كيف يمكننا مساعدتك؟' : 'How Can We Help?'}
        </h1>
        <p className="text-sm text-[#8E8E9F] max-w-md mx-auto">
          {isRTL
            ? 'صِف ما يشغل بالك وسيوصي مساعدنا الذكي بأنسب خدمة لك.'
            : 'Describe what\'s on your mind and our AI assistant will recommend the best service for you.'}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0ECE8]">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={isRTL ? 'أخبرنا بما تمر به...' : 'Tell us what you\'re going through...'}
          className="w-full h-32 resize-none text-[15px] text-[#4A4A5C] placeholder-[#C0B8B0] bg-transparent outline-none leading-relaxed"
          dir={isRTL ? 'rtl' : 'ltr'}
        />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F0ECE8]">
          <span className="text-xs text-[#C0B8B0]">{text.length}/2000</span>
          <button
            onClick={() => wizard.submitIntake(text, locale)}
            disabled={text.trim().length < 3 || wizard.isLoading}
            className="px-6 py-2.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {wizard.isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> {isRTL ? 'جارٍ التحليل...' : 'Analyzing...'}</>
            ) : (
              <><Sparkles className="w-4 h-4" /> {isRTL ? 'أوصِ بخدمة' : 'Get Recommendations'}</>
            )}
          </button>
        </div>
      </div>

      {/* First time toggle */}
      <div className="bg-white rounded-xl p-4 border border-[#F0ECE8] flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#4A4A5C]">
            {isRTL ? 'هل هذه أول جلسة لك مع د. هالة؟' : 'First time with Dr. Hala?'}
          </p>
          <p className="text-xs text-[#8E8E9F] mt-0.5">
            {isRTL ? 'ابدأ باستشارة مجانية' : 'Start with a free consultation'}
          </p>
        </div>
        <button
          onClick={() => {
            wizard.updateForm({
              serviceSlug: 'initial-consultation',
              serviceName: 'Free Consultation',
              serviceNameAr: 'استشارة مجانية',
              durationMinutes: 30,
              isNewClient: true,
            });
            wizard.goToStep('datetime');
          }}
          className="px-4 py-2 rounded-lg bg-[#F5F0EB] text-[#7A3B5E] text-sm font-semibold hover:bg-[#EDE6DF] transition-colors"
        >
          {isRTL ? 'نعم، احجز استشارة' : 'Yes, Book Consultation'}
        </button>
      </div>

      {/* Skip to service selector */}
      <div className="text-center">
        <button
          onClick={() => wizard.goToStep('service')}
          className="text-sm text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors underline underline-offset-4"
        >
          {isRTL ? 'أعرف ما أحتاج — تخطي للاختيار' : 'I know what I need — skip to services'}
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Service Selection ──────────────────────────────────

function ServiceStep({ wizard, locale, isRTL }: StepProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('youth');
  const { recommendations } = wizard.formData;

  const selectService = (service: Service) => {
    const tier = service.pricingTierKey;
    const duration = PRICING_TIERS[tier]?.durationMinutes ?? 50;
    wizard.updateForm({
      serviceSlug: service.slug,
      serviceName: service.name,
      serviceNameAr: service.nameAr,
      serviceCategory: service.category,
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

      {/* Free Discovery Call — standalone above categories */}
      {(() => {
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

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {serviceCategories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.key
                ? 'bg-[#7A3B5E] text-white'
                : 'bg-white text-[#8E8E9F] hover:bg-[#F5F0EB]'
            }`}
          >
            {isRTL ? cat.nameAr : cat.name}
          </button>
        ))}
      </div>

      {/* Service List */}
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
    </div>
  );
}

// ─── Step 3: Date & Time Picker ─────────────────────────────────
// Dynamic layout: calendar starts full-width centered, then animates
// to the left when a date is selected, revealing time slots on the right.

function DateTimeStep({ wizard, locale, isRTL }: StepProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [monthData, setMonthData] = useState<DayAvailability[]>([]);
  const [daySlots, setDaySlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState(wizard.formData.selectedDate);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingDay, setLoadingDay] = useState(false);
  // Provider timezone comes from the availability API (admin-editable in KV).
  // Fallback to Toronto is only used for the very first render before the
  // month fetch resolves. Once the API responds, this updates to whatever
  // Dr. Hala has set in the admin Availability editor (e.g. 'Asia/Dubai').
  const [providerTimezone, setProviderTimezone] = useState<string>('America/Toronto');
  const slotsRef = useRef<HTMLDivElement>(null);

  const hasDateSelected = !!selectedDate;

  // Fetch month availability
  useEffect(() => {
    setLoadingMonth(true);
    fetch(`/api/book/availability/month?month=${currentMonth}&duration=${wizard.formData.durationMinutes}`)
      .then(r => r.json())
      .then(data => {
        setMonthData(data.dates ?? []);
        if (data.timezone) setProviderTimezone(data.timezone);
      })
      .catch(() => setMonthData([]))
      .finally(() => setLoadingMonth(false));
  }, [currentMonth, wizard.formData.durationMinutes]);

  // Fetch day slots when date selected
  useEffect(() => {
    if (!selectedDate) { setDaySlots([]); return; }
    setLoadingDay(true);
    const tz = encodeURIComponent(wizard.formData.clientTimezone);
    fetch(`/api/book/availability?date=${selectedDate}&duration=${wizard.formData.durationMinutes}&tz=${tz}`)
      .then(r => r.json())
      .then(data => {
        setDaySlots(data.slots ?? []);
        // Also refresh the provider timezone from the day fetch — in case
        // the admin changed it between month and day loads.
        if (data.timezone) setProviderTimezone(data.timezone);
        // Scroll to slots on mobile (delay for animation)
        setTimeout(() => {
          slotsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 350);
      })
      .catch(() => setDaySlots([]))
      .finally(() => setLoadingDay(false));
  }, [selectedDate, wizard.formData.durationMinutes, wizard.formData.clientTimezone]);

  const selectSlot = (slot: TimeSlot) => {
    wizard.updateForm({
      selectedDate,
      selectedStartTime: slot.start,
      selectedEndTime: slot.end,
    });
    wizard.goNext();
  };

  const [year, monthNum] = currentMonth.split('-').map(Number);
  const daysInMonth = new Date(year, monthNum, 0).getDate();
  const firstDayOfWeek = new Date(year, monthNum - 1, 1).getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    const d = new Date(year, monthNum - 2, 1);
    setCurrentMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    setSelectedDate('');
  };
  const nextMonth = () => {
    const d = new Date(year, monthNum, 1);
    setCurrentMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    setSelectedDate('');
  };

  const dayNames = isRTL
    ? ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthLabel = new Date(year, monthNum - 1).toLocaleDateString(isRTL ? 'ar' : 'en-US', { month: 'long', year: 'numeric' });

  // Group available slots by period — in the CLIENT's local timezone,
  // not UTC. Historical bug: getUTCHours() put 9am Toronto slots into
  // "Afternoon" because 13:00 UTC >= 12, and 2pm Toronto into "Evening"
  // because 18:00 UTC >= 17. This made the labels (Morning/Afternoon/
  // Evening) not match the displayed times — exactly the calendar bug
  // Mo reported.
  const getLocalHour = (iso: string, tz: string): number => {
    try {
      const fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        hour12: false,
      });
      // Intl returns "0"-"23" — occasionally "24" for midnight, normalize.
      const h = parseInt(fmt.format(new Date(iso)), 10);
      return h === 24 ? 0 : h;
    } catch {
      return new Date(iso).getHours(); // fallback to browser-local
    }
  };
  const clientTz = wizard.formData.clientTimezone;
  const availableSlots = daySlots.filter(s => s.available);
  const morningSlots = availableSlots.filter(s => getLocalHour(s.start, clientTz) < 12);
  const afternoonSlots = availableSlots.filter(s => {
    const h = getLocalHour(s.start, clientTz);
    return h >= 12 && h < 17;
  });
  const eveningSlots = availableSlots.filter(s => getLocalHour(s.start, clientTz) >= 17);

  const selectedDateLabel = selectedDate
    ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString(isRTL ? 'ar' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : '';

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

      {/* Timezones — show BOTH the client's and Dr. Hala's so neither
           party gets confused about session times. Dr. Hala's TZ comes
           from the availability API response (admin-editable in KV). */}
      {(() => {
        const formatTZName = (tz: string) => tz.replace(/_/g, ' ');
        const getOffset = (tz: string): string => {
          try {
            const now = new Date();
            const fmt = new Intl.DateTimeFormat('en-US', {
              timeZone: tz,
              timeZoneName: 'shortOffset',
            });
            const parts = fmt.formatToParts(now);
            const off = parts.find(p => p.type === 'timeZoneName')?.value || '';
            return off.replace('GMT', '').trim() || '±0';
          } catch {
            return '';
          }
        };
        const providerTz = providerTimezone;
        const clientOffset = getOffset(wizard.formData.clientTimezone);
        const providerOffset = getOffset(providerTz);
        const sameTz = wizard.formData.clientTimezone === providerTz;
        return (
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center gap-2 text-xs text-[#8E8E9F]">
              <Globe className="w-3.5 h-3.5" />
              <span>
                {isRTL ? 'المنطقة الزمنية لديك' : 'Your time zone'}:{' '}
                <span className="font-medium text-[#4A4A5C]">
                  {formatTZName(wizard.formData.clientTimezone)}
                </span>
                {clientOffset && <span className="text-[#C0B8B0]"> (GMT{clientOffset})</span>}
              </span>
            </div>
            {!sameTz && (
              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8E8E9F]">
                <span className="opacity-60">•</span>
                <span>
                  {isRTL ? 'د. هالة في' : 'Dr. Hala is in'}{' '}
                  <span className="font-medium text-[#4A4A5C]">
                    {formatTZName(providerTz)}
                  </span>
                  {providerOffset && <span className="text-[#C0B8B0]"> (GMT{providerOffset})</span>}
                </span>
              </div>
            )}
          </div>
        );
      })()}

      {/* ─── Dynamic Layout: full → split on date select ─── */}
      <div className="flex flex-col lg:flex-row lg:gap-6 lg:items-start">

        {/* Calendar — animates from full-width centered to left-aligned */}
        <motion.div
          layout
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`${
            hasDateSelected
              ? 'lg:w-[420px] lg:shrink-0'
              : 'lg:w-full lg:max-w-[520px] lg:mx-auto'
          }`}
        >
          <motion.div layout className="bg-white rounded-2xl border border-[#F0ECE8] shadow-sm overflow-hidden">
            {/* Month Navigation */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#7A3B5E]">
              <button onClick={prevMonth} className="p-2 rounded-full hover:bg-white/15 transition-colors">
                {isRTL ? <ChevronRight className="w-5 h-5 text-white/80" /> : <ChevronLeft className="w-5 h-5 text-white/80" />}
              </button>
              <h3 className="font-semibold text-white text-[15px]">{monthLabel}</h3>
              <button onClick={nextMonth} className="p-2 rounded-full hover:bg-white/15 transition-colors">
                {isRTL ? <ChevronLeft className="w-5 h-5 text-white/80" /> : <ChevronRight className="w-5 h-5 text-white/80" />}
              </button>
            </div>

            <div className="p-4 sm:p-5">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {dayNames.map(d => (
                  <div key={d} className="text-center text-[11px] font-semibold text-[#7A3B5E]/50 uppercase tracking-wider py-1">{d}</div>
                ))}
              </div>

              {/* Day Cells */}
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${currentMonth}-${String(day).padStart(2, '0')}`;
                  const dayInfo = monthData.find(d => d.date === dateStr);
                  const isSelected = dateStr === selectedDate;
                  const isPast = new Date(year, monthNum - 1, day) < today;
                  const hasSlots = dayInfo?.hasSlots ?? false;
                  const isBlocked = dayInfo?.isBlocked ?? false;
                  const isToday = new Date(year, monthNum - 1, day).toDateString() === new Date().toDateString();

                  return (
                    <button
                      key={day}
                      onClick={() => { if (hasSlots && !isPast) setSelectedDate(dateStr); }}
                      disabled={isPast || !hasSlots || isBlocked}
                      className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-all ${
                        isSelected
                          ? 'bg-[#7A3B5E] text-white font-bold shadow-lg shadow-[#7A3B5E]/20 scale-105'
                          : isToday && hasSlots
                            ? 'bg-[#C8A97D]/10 text-[#7A3B5E] font-semibold ring-2 ring-[#C8A97D]/30 hover:bg-[#C8A97D]/20'
                            : hasSlots && !isPast
                              ? 'text-[#4A4A5C] font-medium hover:bg-[#F9E8E2] hover:scale-[1.02] cursor-pointer'
                              : 'text-[#D4CFC8] cursor-not-allowed'
                      }`}
                    >
                      {day}
                      {hasSlots && !isPast && !isSelected && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#3B8A6E]" />
                      )}
                      {isToday && (
                        <span className="absolute top-0.5 text-[7px] font-bold text-[#C8A97D] uppercase">
                          {isRTL ? 'اليوم' : 'today'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {loadingMonth && (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-5 h-5 text-[#C8A97D] animate-spin" />
                </div>
              )}

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-[#F0ECE8]">
                <div className="flex items-center gap-1.5 text-[10px] text-[#8E8E9F]">
                  <span className="w-2 h-2 rounded-full bg-[#3B8A6E]" /> {isRTL ? 'متاح' : 'Available'}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#8E8E9F]">
                  <span className="w-2 h-2 rounded-full bg-[#D4CFC8]" /> {isRTL ? 'غير متاح' : 'Unavailable'}
                </div>
              </div>

              {/* Prompt text when no date selected (desktop only) */}
              {!hasDateSelected && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden lg:block text-center text-xs text-[#8E8E9F] mt-3"
                >
                  {isRTL ? 'اختر يوماً لعرض المواعيد المتاحة' : 'Select a day to see available times'}
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Time Slots — slides in from the right when date selected */}
        <AnimatePresence mode="wait">
          {hasDateSelected && (
            <motion.div
              key="slots-panel"
              ref={slotsRef}
              className="flex-1 min-w-0 mt-6 lg:mt-0 lg:sticky lg:top-24 scroll-mt-24"
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {loadingDay ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-[#F0ECE8]">
                  <Loader2 className="w-6 h-6 text-[#C8A97D] animate-spin" />
                  <p className="text-xs text-[#8E8E9F] mt-3">{isRTL ? 'جارٍ تحميل المواعيد...' : 'Loading times...'}</p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-[#F0ECE8]">
                  <Clock className="w-8 h-8 text-[#E8E0D8] mx-auto mb-2" />
                  <p className="text-sm text-[#8E8E9F]">
                    {isRTL ? 'لا توجد مواعيد متاحة في هذا اليوم' : 'No available slots for this day'}
                  </p>
                  <p className="text-xs text-[#C0B8B0] mt-1">{isRTL ? 'جرب يوماً آخر' : 'Try another day'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Selected date header */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center">
                      <Calendar className="w-3.5 h-3.5 text-[#7A3B5E]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#4A4A5C]">{selectedDateLabel}</p>
                      <p className="text-[10px] text-[#8E8E9F]">{isRTL ? 'اختر الوقت' : 'Choose a time'}</p>
                    </div>
                  </div>

                  {(() => {
                    // Dynamic sublabel: show the actual first-to-last available
                    // time in each bucket (client-local), rounded to whole-hour
                    // strings. Empty buckets are filtered out below so they
                    // never render.
                    //
                    // Why dynamic: previously the labels were hardcoded
                    // ("9 AM – 12 PM", "12 – 5 PM", "5 – 8 PM") which didn't
                    // match reality when Dr. Hala sets custom hours or the
                    // minimum-notice filter eats the earliest slots.
                    const fmtTime = (iso: string) =>
                      new Date(iso).toLocaleTimeString(isRTL ? 'ar' : 'en-US', {
                        timeZone: wizard.formData.clientTimezone,
                        hour: 'numeric',
                        minute: '2-digit',
                      });
                    const slotRange = (slots: TimeSlot[]): string => {
                      if (slots.length === 0) return '';
                      if (slots.length === 1) return fmtTime(slots[0].start);
                      const first = fmtTime(slots[0].start);
                      const last = fmtTime(slots[slots.length - 1].start);
                      return `${first} – ${last}`;
                    };
                    return [
                      { label: isRTL ? 'صباحاً' : 'Morning', sublabel: slotRange(morningSlots), slots: morningSlots, bg: 'bg-amber-50', accent: 'text-amber-600', icon: '☀️' },
                      { label: isRTL ? 'بعد الظهر' : 'Afternoon', sublabel: slotRange(afternoonSlots), slots: afternoonSlots, bg: 'bg-sky-50', accent: 'text-sky-600', icon: '🌤' },
                      { label: isRTL ? 'مساءً' : 'Evening', sublabel: slotRange(eveningSlots), slots: eveningSlots, bg: 'bg-indigo-50', accent: 'text-indigo-600', icon: '🌙' },
                    ];
                  })().filter(group => group.slots.length > 0).map((group, gi) => (
                    <motion.div
                      key={group.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 + gi * 0.08 }}
                      className="bg-white rounded-xl border border-[#F0ECE8] overflow-hidden"
                    >
                      <div className={`px-3 py-2 ${group.bg} flex items-center justify-between`}>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{group.icon}</span>
                          <span className={`text-xs font-semibold ${group.accent}`}>{group.label}</span>
                        </div>
                        <span className="text-[10px] text-[#8E8E9F]">{group.sublabel}</span>
                      </div>
                      <div className="p-2.5 flex flex-wrap gap-1.5">
                        {group.slots.map((slot, si) => {
                          const slotDate = new Date(slot.start);
                          const clientTimeLabel = slotDate.toLocaleTimeString(isRTL ? 'ar' : 'en-US', {
                            timeZone: wizard.formData.clientTimezone,
                            hour: 'numeric',
                            minute: '2-digit',
                          });
                          // Secondary line: same moment rendered in Dr. Hala's
                          // actual working timezone (from the availability API).
                          // Hidden when the client shares her timezone, to keep
                          // the button lean.
                          const sameTz = wizard.formData.clientTimezone === providerTimezone;
                          const providerTimeLabel = sameTz
                            ? null
                            : slotDate.toLocaleTimeString(isRTL ? 'ar' : 'en-US', {
                                timeZone: providerTimezone,
                                hour: 'numeric',
                                minute: '2-digit',
                              });
                          return (
                            <motion.button
                              key={slot.start}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: 0.2 + gi * 0.08 + si * 0.02 }}
                              onClick={() => selectSlot(slot)}
                              className="group px-3.5 py-2 rounded-lg border border-[#E8E0D8] text-sm text-[#4A4A5C] font-semibold hover:border-[#7A3B5E] hover:text-white hover:bg-[#7A3B5E] hover:shadow-md transition-all active:scale-95 flex flex-col items-center leading-tight"
                            >
                              <span>{clientTimeLabel}</span>
                              {providerTimeLabel && (
                                <span className="text-[9px] font-normal text-[#8E8E9F] group-hover:text-white/75 mt-0.5">
                                  {isRTL ? 'د. هالة: ' : 'Hala: '}{providerTimeLabel}
                                </span>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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

function InfoStep({ wizard, locale, isRTL }: StepProps) {
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
  const [mode, setMode] = useState<SessionMode>(wizard.formData.sessionMode);
  const [notes, setNotes] = useState(wizard.formData.notes || wizard.formData.intakeText);
  const [showNotes, setShowNotes] = useState(!!notes);
  const [preferredLang, setPreferredLang] = useState<'en' | 'ar'>(
    wizard.formData.preferredLanguage || (locale === 'ar' ? 'ar' : 'en'),
  );
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
      preferredLanguage: preferredLang,
      sessionMode: mode,
      notes: notes.trim(),
    });
    wizard.goNext();
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border-0 bg-[#FAF7F2] text-sm text-[#2D2A33] placeholder-[#C0B8B0] focus:bg-white focus:ring-2 focus:ring-[#7A3B5E]/20 outline-none transition-all duration-300';
  const glassCard = 'bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/60 shadow-[0_8px_32px_rgba(122,59,94,0.06)] hover:shadow-[0_12px_40px_rgba(122,59,94,0.1)] transition-shadow duration-500';

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
              className={inputClass} dir={isRTL ? 'rtl' : 'ltr'}
            />
          </SmartField>
          <SmartField icon={Mail} label={isRTL ? 'البريد الإلكتروني' : 'Email Address'} valid={emailValid}>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="email@example.com"
              className={inputClass} dir="ltr"
            />
          </SmartField>

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

        {/* Language — segmented pill control */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-3.5 h-3.5 text-[#C0B8B0]" />
            <span className="text-xs font-medium text-[#8E8E9F]">{isRTL ? 'لغة التواصل' : 'Communication Language'}</span>
          </div>
          <div className="relative bg-[#FAF7F2] rounded-xl p-1 flex">
            <motion.div
              className="absolute top-1 bottom-1 rounded-lg bg-[#7A3B5E]"
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{ width: 'calc(50% - 4px)', left: preferredLang === 'en' ? '4px' : 'calc(50%)' }}
            />
            <button
              onClick={() => setPreferredLang('en')}
              className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                preferredLang === 'en' ? 'text-white' : 'text-[#8E8E9F]'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setPreferredLang('ar')}
              className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                preferredLang === 'ar' ? 'text-white' : 'text-[#8E8E9F]'
              }`}
            >
              العربية
            </button>
          </div>
        </div>

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

        {/* Session Mode — visual cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {([
            { key: 'online' as SessionMode, icon: Video, label: isRTL ? 'عبر الإنترنت' : 'Online', desc: isRTL ? 'مكالمة فيديو من أي مكان' : 'Video call from anywhere' },
            { key: 'inPerson' as SessionMode, icon: Building2, label: isRTL ? 'شخصياً' : 'In-Person', desc: isRTL ? 'مكتب أوتاوا، 430 هازلدين' : 'Ottawa, 430 Hazeldean Rd' },
          ]).map(opt => (
            <motion.button
              key={opt.key}
              onClick={() => setMode(opt.key)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`relative p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                mode === opt.key
                  ? 'border-[#7A3B5E] bg-[#7A3B5E]/5 shadow-[0_4px_20px_rgba(122,59,94,0.12)]'
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

      {/* ─── Submit CTA with shimmer ─── */}
      <motion.button
        onClick={handleSubmit}
        disabled={!allRequired}
        whileTap={{ scale: 0.98 }}
        className={`relative w-full py-3.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 overflow-hidden ${
          allRequired
            ? 'bg-[#7A3B5E] hover:bg-[#6A2E4E] shadow-lg shadow-[#7A3B5E]/20'
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
  const { formData, confirmBooking, isLoading } = wizard;
  const dateStr = new Date(formData.selectedStartTime).toLocaleDateString(
    isRTL ? 'ar' : 'en-US',
    { timeZone: formData.clientTimezone, weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  );
  const timeStr = new Date(formData.selectedStartTime).toLocaleTimeString(
    isRTL ? 'ar' : 'en-US',
    { timeZone: formData.clientTimezone, hour: 'numeric', minute: '2-digit' },
  );

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
            <span className="text-[#4A4A5C] font-medium">{formData.clientEmail}</span>
          </div>
          {formData.clientPhone && (
            <div className="flex justify-between">
              <span className="text-[#8E8E9F]"><Phone className="w-3.5 h-3.5 inline mr-1.5" />{isRTL ? 'الهاتف' : 'Phone'}</span>
              <span className="text-[#4A4A5C] font-medium">{formData.clientPhone}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[#8E8E9F]"><MessageCircle className="w-3.5 h-3.5 inline mr-1.5" />{isRTL ? 'لغة التواصل' : 'Language'}</span>
            <span className="text-[#4A4A5C] font-medium">{formData.preferredLanguage === 'ar' ? 'العربية' : 'English'}</span>
          </div>
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

      <button
        onClick={confirmBooking}
        disabled={isLoading}
        className="w-full py-3.5 rounded-xl bg-[#7A3B5E] text-white font-semibold hover:bg-[#6A2E4E] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> {isRTL ? 'جارٍ التأكيد...' : 'Confirming...'}</>
        ) : (
          <><Check className="w-5 h-5" /> {isRTL ? 'تأكيد الحجز' : 'Confirm Booking'}</>
        )}
      </button>
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
            ? (isRTL ? 'ستراجع د. هالة طلبك وترسل لك فاتورة مع تعليمات الدفع قريباً.' : 'Dr. Hala will review your request and send you an invoice with payment instructions shortly.')
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
          <p className="text-sm font-bold text-[#7A3B5E] mb-4">{isRTL ? 'الخطوات التالية' : 'What Happens Next'}</p>
          <div className="space-y-3">
            {[
              { num: '1', en: 'Dr. Hala reviews your request — typically within a few hours', ar: 'ستراجع د. هالة طلبك — عادة خلال ساعات قليلة' },
              { num: '2', en: 'You receive an invoice with payment details via email', ar: 'ستصلك فاتورة بتفاصيل الدفع عبر البريد الإلكتروني' },
              { num: '3', en: 'Complete payment — your session is confirmed!', ar: 'أكمل الدفع — يتم تأكيد جلستك!' },
            ].map(step => (
              <div key={step.num} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C8A97D] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{step.num}</span>
                <p className="text-sm text-[#4A4A5C]">{isRTL ? step.ar : step.en}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Summary Card */}
      <div className="bg-white rounded-2xl p-5 border border-[#F0ECE8] text-left space-y-3">
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
        <div className="bg-[#FFFAF5] rounded-xl p-5 border border-[#C8A97D]/20 text-left">
          <p className="text-xs font-semibold text-[#7A3B5E] mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {isRTL ? 'نصائح للتحضير لجلستك' : 'Prepare for Your Session'}
          </p>
          {result.aiPrepTips.map((tip, i) => (
            <p key={i} className="text-xs text-[#4A4A5C] mb-1.5">• {tip}</p>
          ))}
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
        className="space-y-3 text-left"
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
              {isRTL ? 'ساعد د. هالة على فهمك بشكل أفضل' : 'Help Dr. Hala understand you better before your session'}
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
