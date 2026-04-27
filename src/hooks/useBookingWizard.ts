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
    confirmationResult: null,
  };
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
    fetch('/api/account/session')
      .then(r => r.json())
      .then(data => {
        if (!data?.authenticated) return;
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
        }));
      })
      .catch(() => { /* silent — anonymous booking still works */ });
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
    reset,
    setError,
    setIsLoading,
  };
}
