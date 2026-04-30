/* ================================================================
   useBookingWizard — Multi-step booking state management
   ================================================================ */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ServiceRecommendation, BookingConfirmationResult, SessionMode } from '@/lib/booking/types';
import type { PricingTierKey } from '@/config/pricing';

export type BookingStep = 'intake' | 'service' | 'datetime' | 'info' | 'confirm' | 'success';

export interface BookingFormData {
  // Step 1: AI Intake
  intakeText: string;
  recommendations: ServiceRecommendation[];
  intakeId: string;

  // Step 2: Service
  serviceSlug: string;
  serviceName: string;
  serviceNameAr: string;
  serviceCategory: string;
  pricingTierKey: PricingTierKey;
  durationMinutes: number;

  // Step 3: Date/Time
  selectedDate: string;       // YYYY-MM-DD
  selectedStartTime: string;  // ISO 8601
  selectedEndTime: string;    // ISO 8601

  // Step 4: Client Info
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientTimezone: string;
  clientCountry: string;
  preferredLanguage: 'en' | 'ar';
  sessionMode: SessionMode;
  notes: string;
  isNewClient: boolean;

  // Returning-client memory (PIPEDA opt-in)
  /** Whether the client has authenticated via magic link this session. */
  isAuthenticatedReturning: boolean;
  /** Whether they consented to "remember me" for next time. Defaults true once authenticated. */
  consentRememberMe: boolean;
  /**
   * Explicit opt-in to WhatsApp transactional messages (booking confirmation,
   * reminders, payment nudges, rebook nudges). PIPEDA + WhatsApp Business
   * policy require active opt-in — this stays false unless the client
   * actively ticks the unchecked box in step 4.
   */
  consentWhatsapp: boolean;
  /**
   * Soft recognition: a non-PII `last_visit` cookie was set on a prior
   * booking confirmation, so we know the device has visited before even
   * if the user isn't currently authenticated. Used to render
   * SoftWelcomeBanner without revealing identifying info.
   */
  isSoftRecognized: boolean;
  /** Display data surfaced to recognition banners — never auto-fills the form. */
  recognizedFirstName: string | null;
  recognizedLastServiceSlug: string | null;
  /** Tracks self-serve eligibility for Phase C. Populated from /api/account/session. */
  paidSessionsCount: number;

  // Step 5: Result
  confirmationResult: BookingConfirmationResult | null;
}

function buildInitialFormData(locale: 'en' | 'ar' = 'en'): BookingFormData {
  return {
    intakeText: '',
    recommendations: [],
    intakeId: '',
    serviceSlug: '',
    serviceName: '',
    serviceNameAr: '',
    serviceCategory: '',
    pricingTierKey: 'standard50min',
    durationMinutes: 50,
    selectedDate: '',
    selectedStartTime: '',
    selectedEndTime: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientTimezone: typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'America/Toronto',
    clientCountry: '',
    // Communication language mirrors the site locale the client is browsing
    // in. No separate user-facing toggle — keeps tips, emails, and the manage
    // page consistent with whatever language the client chose at the top of
    // the site.
    preferredLanguage: locale,
    sessionMode: 'online',
    notes: '',
    isNewClient: true,
    isAuthenticatedReturning: false,
    consentRememberMe: false,
    consentWhatsapp: false,
    isSoftRecognized: false,
    recognizedFirstName: null,
    recognizedLastServiceSlug: null,
    paidSessionsCount: 0,
    confirmationResult: null,
  };
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&')}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

const STEP_ORDER: BookingStep[] = ['intake', 'service', 'datetime', 'info', 'confirm', 'success'];

export function useBookingWizard(locale: 'en' | 'ar' = 'en') {
  const [step, setStep] = useState<BookingStep>('intake');
  const [formData, setFormData] = useState<BookingFormData>(() => buildInitialFormData(locale));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Honeypot: record mount time for timing-based bot detection
  const mountTime = useRef(Date.now());

  // ─── Hydrate from existing session ───────────────────────────
  // PIPEDA-friendly: only auto-fills personal fields when the client is
  // already authenticated via the booking_session cookie (magic-link verified).
  // Anonymous returning visitors still see empty fields — typing their email
  // triggers the soft recognition hint but never auto-prefills PII.
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;

    // Check the non-PII last_visit cookie up-front so the SoftWelcomeBanner
    // can render even before the session fetch resolves.
    const hasLastVisit = readCookie('last_visit') === '1';

    fetch('/api/account/session')
      .then(r => r.json())
      .then(data => {
        if (!data?.authenticated) {
          // Not signed in — surface soft recognition only if last_visit cookie
          // shows this device has booked before.
          if (hasLastVisit) {
            setFormData(prev => ({ ...prev, isSoftRecognized: true }));
          }
          return;
        }
        setFormData(prev => ({
          ...prev,
          // Only fill empty fields — never overwrite something the user
          // already typed in.
          clientEmail: prev.clientEmail || data.email || prev.clientEmail,
          clientName: prev.clientName || data.name || prev.clientName,
          clientPhone: prev.clientPhone || data.phone || prev.clientPhone,
          clientCountry: prev.clientCountry || data.country || prev.clientCountry,
          isAuthenticatedReturning: true,
          // Auth implies prior consent (they used a magic link to come back).
          consentRememberMe: true,
          isNewClient: false,
          recognizedFirstName: data.firstName ?? null,
          recognizedLastServiceSlug: data.lastBookedServiceSlug ?? null,
          paidSessionsCount: typeof data.paidSessionsCount === 'number' ? data.paidSessionsCount : 0,
        }));
      })
      .catch(() => {
        // Silent — anonymous booking still works. Honor the last_visit hint.
        if (hasLastVisit) {
          setFormData(prev => ({ ...prev, isSoftRecognized: true }));
        }
      });
  }, []);

  const stepIndex = STEP_ORDER.indexOf(step);

  const updateForm = useCallback((updates: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const goToStep = useCallback((newStep: BookingStep) => {
    setError(null);
    setStep(newStep);
  }, []);

  const goNext = useCallback(() => {
    const nextIdx = stepIndex + 1;
    if (nextIdx < STEP_ORDER.length) {
      setError(null);
      setStep(STEP_ORDER[nextIdx]);
    }
  }, [stepIndex]);

  const goBack = useCallback(() => {
    const prevIdx = stepIndex - 1;
    if (prevIdx >= 0) {
      setError(null);
      setStep(STEP_ORDER[prevIdx]);
    }
  }, [stepIndex]);

  const canGoBack = stepIndex > 0 && step !== 'success';
  const canGoNext = stepIndex < STEP_ORDER.length - 1;

  // ─── Step 1: AI Recommendation ─────────────────────────────
  const submitIntake = useCallback(async (text: string, locale: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/book/ai-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, locale }),
      });
      if (!res.ok) throw new Error('Failed to get recommendations');
      const data = await res.json();
      updateForm({
        intakeText: text,
        recommendations: data.recommendations,
        intakeId: data.intakeId,
      });
      goToStep('service');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [updateForm, goToStep]);

  // ─── Step 5: Confirm Booking ───────────────────────────────
  const confirmBooking = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/book/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: formData.serviceSlug,
          startTime: formData.selectedStartTime,
          endTime: formData.selectedEndTime,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone || undefined,
          clientTimezone: formData.clientTimezone,
          clientCountry: formData.clientCountry || undefined,
          preferredLanguage: formData.preferredLanguage,
          sessionMode: formData.sessionMode,
          notes: formData.notes || undefined,
          aiIntakeNotes: formData.intakeText || undefined,
          consentRememberMe: formData.consentRememberMe,
          consentWhatsapp: formData.consentWhatsapp,
          _hp: '',
          _t: mountTime.current,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to confirm booking');
      }

      const result: BookingConfirmationResult = await res.json();
      updateForm({ confirmationResult: result });
      goToStep('success');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [formData, updateForm, goToStep]);

  // ─── Self-serve series submit (Phase C) ────────────────────
  // Posts to /api/book/confirm-series and redirects the browser
  // to the Stripe Checkout URL. Bookings stay in pending-review
  // until the webhook fires on payment success.
  const submitSeries = useCallback(async (opts: {
    frequency: 'weekly' | 'biweekly' | 'every3weeks';
    totalSessions: number;
    slots: Array<{ startTime: string; endTime: string }>;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/book/confirm-series', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: formData.serviceSlug,
          sessionMode: formData.sessionMode,
          preferredLanguage: formData.preferredLanguage,
          notes: formData.notes || undefined,
          series: {
            frequency: opts.frequency,
            totalSessions: opts.totalSessions,
            slots: opts.slots,
          },
          _hp: '',
          _t: mountTime.current,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to start series checkout');
      }

      const result = await res.json();
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }
      throw new Error('No checkout URL returned');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setIsLoading(false);
    }
  }, [formData]);

  // ─── Reset ─────────────────────────────────────────────────
  const reset = useCallback(() => {
    setFormData(buildInitialFormData(locale));
    setStep('intake');
    setError(null);
    setIsLoading(false);
  }, [locale]);

  return {
    step,
    stepIndex,
    formData,
    isLoading,
    error,
    updateForm,
    goToStep,
    goNext,
    goBack,
    canGoBack,
    canGoNext,
    submitIntake,
    confirmBooking,
    submitSeries,
    reset,
    setError,
    setIsLoading,
  };
}
