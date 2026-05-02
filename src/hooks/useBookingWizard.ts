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
  /**
   * True if this client has already consumed the once-per-client free
   * discovery consultation (attended, no-showed, or has one in-flight).
   * Hides the free-consult tile in the UI; the /api/book/confirm gate
   * is the actual enforcement layer.
   */
  freeConsultUsed: boolean;

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
    freeConsultUsed: false,
    confirmationResult: null,
  };
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&')}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

const STEP_ORDER: BookingStep[] = ['intake', 'service', 'datetime', 'info', 'confirm', 'success'];

export interface GateError {
  code: 'free_consult_already_used' | 'slot_unavailable';
  message: string;
  /** For free_consult_already_used — service to switch to. */
  suggestedServiceSlug?: string;
  /** For slot_unavailable — next slot at-or-after the user's original time. */
  suggestedSlot?: {
    startTime: string;
    endTime: string;
    durationMinutes: number;
    locationLabel: string;
  };
  /** For slot_unavailable — soonest endpoint returned nothing in 30 days. */
  noneInHorizon?: boolean;
  /** For slot_unavailable — soonest fetch failed (network). Picker should auto-render. */
  networkError?: boolean;
  /** For slot_unavailable — how many times the recovery CTA itself has 409'd.
   *  When >= 2, the renderer falls through to the inline picker. */
  retryCount?: number;
}

export function useBookingWizard(locale: 'en' | 'ar' = 'en') {
  const [step, setStep] = useState<BookingStep>('intake');
  const [formData, setFormData] = useState<BookingFormData>(() => buildInitialFormData(locale));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Structured error for once-per-client gate rejections, etc. — lets the
  // UI render an inline "switch to suggested service" CTA instead of a
  // generic red banner.
  const [gateError, setGateError] = useState<GateError | null>(null);

  // Honeypot: record mount time for timing-based bot detection
  const mountTime = useRef(Date.now());
  // Slot-conflict recovery retry counter. Increments each time the recovery
  // CTA re-fires confirm and gets 409 back. At >= 2 the renderer falls
  // through to the inline picker (Tier 2). Reset whenever a non-409 outcome
  // occurs (success, navigation away, picker selection) — see swapSlotAndConfirm.
  const slotConflictRetryRef = useRef(0);
  // Live mirror of formData. The recovery flow's swapSlotAndConfirm calls
  // setFormData then schedules confirmBooking via setTimeout — by the time
  // the timeout fires, React has flushed the state update, but the captured
  // confirmBooking closure may still hold the OLD formData. Reading through
  // this ref inside confirmBooking sidesteps the stale-closure issue.
  const formDataRef = useRef<BookingFormData>(formData);
  useEffect(() => { formDataRef.current = formData; }, [formData]);

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
          freeConsultUsed: data.freeConsultUsed === true,
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
    setGateError(null);
    slotConflictRetryRef.current = 0;
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
      setGateError(null);
      slotConflictRetryRef.current = 0;
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
  // Reads formData via formDataRef (not the closure) so swapSlotAndConfirm
  // can update state and call this immediately without stale data.
  const confirmBooking = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fd = formDataRef.current;
      const res = await fetch('/api/book/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: fd.serviceSlug,
          startTime: fd.selectedStartTime,
          endTime: fd.selectedEndTime,
          clientName: fd.clientName,
          clientEmail: fd.clientEmail,
          clientPhone: fd.clientPhone || undefined,
          clientTimezone: fd.clientTimezone,
          clientCountry: fd.clientCountry || undefined,
          preferredLanguage: fd.preferredLanguage,
          sessionMode: fd.sessionMode,
          notes: fd.notes || undefined,
          aiIntakeNotes: fd.intakeText || undefined,
          consentRememberMe: fd.consentRememberMe,
          consentWhatsapp: fd.consentWhatsapp,
          _hp: '',
          _t: mountTime.current,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({} as Record<string, unknown>)) as {
          error?: string;
          message?: string;
          suggestedServiceSlug?: string;
        };
        // Humane handling for the once-per-client gate: surface the
        // friendly message via gateError (renders the "book paid instead"
        // inline CTA) and remember that this email used it.
        if (res.status === 403 && errData?.error === 'free_consult_already_used') {
          updateForm({ freeConsultUsed: true });
          setGateError({
            code: 'free_consult_already_used',
            message: errData.message || "You've already had your complimentary discovery session.",
            suggestedServiceSlug: errData.suggestedServiceSlug,
          });
          return;
        }

        // Slot-conflict recovery: someone else booked the slot, or the lock
        // was held by a parallel request. Don't show a red banner — fetch
        // the next available slot at-or-after the user's original time and
        // surface the warm "That time was just booked" recovery card.
        // ConfirmStep renders the recovery UI; this hook just populates state.
        if (res.status === 409 && errData?.error === 'slot_unavailable') {
          slotConflictRetryRef.current += 1;
          const retryCount = slotConflictRetryRef.current;
          try {
            const params = new URLSearchParams({
              service: fd.serviceSlug,
              from: fd.selectedStartTime,
            });
            if (fd.clientTimezone) params.set('tz', fd.clientTimezone);
            const soonestRes = await fetch(`/api/book/soonest?${params.toString()}`);
            if (!soonestRes.ok) throw new Error('soonest lookup failed');
            const soonestData = await soonestRes.json() as
              | {
                  slot: { startTime: string; endTime: string; durationMinutes: number; locationLabel: string };
                }
              | { noSlotAvailable: true };
            if ('noSlotAvailable' in soonestData) {
              setGateError({
                code: 'slot_unavailable',
                message: errData.message || 'Time slot is no longer available',
                noneInHorizon: true,
                retryCount,
              });
            } else if (soonestData.slot.startTime === fd.selectedStartTime) {
              // Defensive: if soonest returned the EXACT slot we just tried
              // (server-side stale cache, GCal busy-cache miss, etc.), don't
              // surface it — that would loop the user back into the same 409.
              // Force-escalate retryCount past the picker threshold (3) so the
              // ConfirmStep useEffect auto-switches to inline picker mode.
              // The retryFailed notice still renders (retryCount >= 2) but the
              // misleading networkError copy doesn't (flag not set).
              setGateError({
                code: 'slot_unavailable',
                message: errData.message || 'Time slot is no longer available',
                retryCount: Math.max(retryCount, 3),
              });
            } else {
              setGateError({
                code: 'slot_unavailable',
                message: errData.message || 'Time slot is no longer available',
                suggestedSlot: soonestData.slot,
                retryCount,
              });
            }
          } catch {
            setGateError({
              code: 'slot_unavailable',
              message: errData.message || 'Time slot is no longer available',
              networkError: true,
              retryCount,
            });
          }
          return;
        }

        throw new Error(errData.error || 'Failed to confirm booking');
      }

      // Success — clear any prior recovery state.
      slotConflictRetryRef.current = 0;
      const result: BookingConfirmationResult = await res.json();
      updateForm({ confirmationResult: result });
      setGateError(null);
      goToStep('success');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [updateForm, goToStep]);

  // ─── Slot-conflict recovery: swap slot and re-fire confirm ───
  // One-tap recovery from the suggested-slot CTA or the inline picker.
  // Updates form state synchronously, mirrors it into formDataRef so
  // confirmBooking sees the new slot immediately, then re-fires confirm.
  // Picker selections reset the retry counter — the user is making a fresh
  // choice, not racing against an automated retry.
  const swapSlotAndConfirm = useCallback(
    (start: string, end: string, date: string, fromPicker = false) => {
      if (fromPicker) slotConflictRetryRef.current = 0;
      // Mirror into ref synchronously so confirmBooking (which reads via ref)
      // sees the new slot on this same call, not after the next render.
      formDataRef.current = {
        ...formDataRef.current,
        selectedDate: date,
        selectedStartTime: start,
        selectedEndTime: end,
      };
      setFormData(prev => ({
        ...prev,
        selectedDate: date,
        selectedStartTime: start,
        selectedEndTime: end,
      }));
      void confirmBooking();
    },
    [confirmBooking],
  );

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
    setGateError(null);
    setIsLoading(false);
  }, [locale]);

  const clearGateError = useCallback(() => setGateError(null), []);

  return {
    step,
    stepIndex,
    formData,
    isLoading,
    error,
    gateError,
    clearGateError,
    updateForm,
    goToStep,
    goNext,
    goBack,
    canGoBack,
    canGoNext,
    submitIntake,
    confirmBooking,
    swapSlotAndConfirm,
    submitSeries,
    reset,
    setError,
    setIsLoading,
  };
}
