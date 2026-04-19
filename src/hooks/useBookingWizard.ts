/* ================================================================
   useBookingWizard — Multi-step booking state management
   ================================================================ */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ServiceRecommendation, BookingConfirmationResult, SessionMode } from '@/lib/booking/types';

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

  // Step 5: Result
  confirmationResult: BookingConfirmationResult | null;
}

const initialFormData: BookingFormData = {
  intakeText: '',
  recommendations: [],
  intakeId: '',
  serviceSlug: '',
  serviceName: '',
  serviceNameAr: '',
  serviceCategory: '',
  durationMinutes: 50,
  selectedDate: '',
  selectedStartTime: '',
  selectedEndTime: '',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  clientTimezone: typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'America/Toronto',
  clientCountry: '',
  preferredLanguage: 'en',
  sessionMode: 'online',
  notes: '',
  isNewClient: true,
  confirmationResult: null,
};

const STEP_ORDER: BookingStep[] = ['intake', 'service', 'datetime', 'info', 'confirm', 'success'];

export function useBookingWizard() {
  const [step, setStep] = useState<BookingStep>('intake');
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Honeypot: record mount time for timing-based bot detection
  const mountTime = useRef(Date.now());

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
    setFormData(initialFormData);
    setStep('intake');
    setError(null);
    setIsLoading(false);
  }, []);

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
