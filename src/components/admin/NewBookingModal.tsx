'use client';

/* ================================================================
   NewBookingModal — Two-step admin booking wizard
   ================================================================
   STEP 1 — Booking details
     • Creative service picker (featured row + category cards)
     • Live availability calendar (month grid → day → time chips)
     • Client details + session mode
     • Optional recurring series toggle with per-slot planner
     • Context badge: "Dr. Hala is currently in {location}"

   STEP 2 — Invoice review (inline)
     • Mounts InvoiceReviewSheet in inline mode
     • Auto-priced from the booking
     • [Preview PDF] [Skip & Send Later] [Confirm & Send]

   Submit flow:
     Step 1 [Next]
       → POST /api/admin/booking/create-draft
       → Returns primaryBookingId + primaryDraftId
       → Transition to Step 2 (free sessions skip directly to activate)
     Step 2 [Confirm & Send]
       → POST /api/admin/booking/{id}/confirm-and-send
       → Creates GCal events, sends client confirmation, sends invoice
     Step 2 [Skip & Send Later]
       → POST /api/admin/booking/{id}/save-for-later
       → Extends hold, closes modal

   Everything is timezone-aware via /api/admin/provider-location.
   Recurring series use /api/admin/booking/plan-series to check each
   slot before submission.
   ================================================================ */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Loader2, Check, Calendar, Clock, MapPin,
  ChevronLeft, ChevronRight, Video, Phone, Building2,
  RefreshCw, AlertCircle, ArrowRight,
  Heart, MessageCircle, ChevronDown, Sparkles, Globe,
} from 'lucide-react';
import { services, serviceCategories } from '@/data/services';
import { PRICING_TIERS, type PricingTierKey } from '@/config/pricing';
import { COUNTRIES } from '@/config/countries';
import type { Service, ServiceCategory } from '@/types';
import type { InvoiceDraft } from '@/lib/invoicing/types';
import type { Booking } from '@/lib/booking/types';
import InvoiceReviewSheet from './InvoiceReviewSheet';

interface Props {
  open: boolean;
  password: string;
  onClose: () => void;
  onCreated: () => void;
}

// ─── Constants ──────────────────────────────────────────────────

const TIMEZONES = [
  'Asia/Dubai',
  'America/Toronto',
  'America/New_York',
  'America/Vancouver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Riyadh',
  'Asia/Beirut',
  'UTC',
];

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ─── Types ──────────────────────────────────────────────────────

interface DayAvailability {
  date: string;
  hasSlots: boolean;
  slotCount: number;
  isBlocked: boolean;
  blockReason?: string;
}

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
  reason?: string;
}

interface PlanSlot {
  index: number;
  startTime: string;
  endTime: string;
  status: 'available' | 'conflict' | 'outside-hours';
  conflictReason?: string;
  suggestedAlternatives?: Array<{ startTime: string; endTime: string }>;
}

interface ProviderLocationInfo {
  timezone: string;
  locationLabel: string;
  source: 'override' | 'schedule' | 'default';
}

// ─── Helpers ────────────────────────────────────────────────────

function getServiceDuration(service: Service | undefined): number {
  if (!service) return 50;
  const tier = PRICING_TIERS[service.pricingTierKey as PricingTierKey];
  return tier?.durationMinutes ?? 50;
}

function isServiceFree(service: Service | undefined): boolean {
  if (!service) return false;
  const tier = PRICING_TIERS[service.pricingTierKey as PricingTierKey];
  return tier?.anchors?.CAD?.online === 0;
}

function formatMonthLabel(yearMonth: string): string {
  const [y, m] = yearMonth.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function ymdToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function shiftMonth(yearMonth: string, delta: number): string {
  const [y, m] = yearMonth.split('-').map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function daysInMonth(yearMonth: string): number {
  const [y, m] = yearMonth.split('-').map(Number);
  return new Date(y, m, 0).getDate();
}

function firstWeekday(yearMonth: string): number {
  const [y, m] = yearMonth.split('-').map(Number);
  return new Date(y, m - 1, 1).getDay();
}

function formatSlotInTz(iso: string, timezone: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return iso;
  }
}

function formatSlotDateInTz(iso: string, timezone: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

// ─── Component ──────────────────────────────────────────────────

export default function NewBookingModal({ open, password, onClose, onCreated }: Props) {
  // ─── Step state ──────────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // ─── Step 1 booking form state ───────────────────────────────
  const [serviceSlug, setServiceSlug] = useState<string>('initial-consultation');
  const [sessionMode, setSessionMode] = useState<'online' | 'inPerson'>('online');
  const [notes, setNotes] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientTimezone, setClientTimezone] = useState('America/Toronto');
  const [clientCountry, setClientCountry] = useState('CA');
  const [sendClientEmail, setSendClientEmail] = useState(true);

  // ─── Calendar state ──────────────────────────────────────────
  const [currentMonth, setCurrentMonth] = useState(() => ymdToday().slice(0, 7));
  const [monthAvailability, setMonthAvailability] = useState<Map<string, DayAvailability>>(new Map());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [daySlots, setDaySlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [monthLoading, setMonthLoading] = useState(false);
  const [daySlotsLoading, setDaySlotsLoading] = useState(false);

  // ─── Recurring state ─────────────────────────────────────────
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState<'weekly' | 'biweekly'>('weekly');
  const [recurringCount, setRecurringCount] = useState(6);
  const [recurringInvoiceMode, setRecurringInvoiceMode] = useState<'per-session' | 'bundled'>('per-session');
  const [seriesPlan, setSeriesPlan] = useState<PlanSlot[] | null>(null);
  const [seriesPlanLoading, setSeriesPlanLoading] = useState(false);
  const [seriesOverrides, setSeriesOverrides] = useState<Map<number, { startTime: string; endTime: string }>>(new Map());
  const [seriesSkips, setSeriesSkips] = useState<Set<number>>(new Set());

  // ─── Provider location badge ─────────────────────────────────
  const [providerLoc, setProviderLoc] = useState<ProviderLocationInfo | null>(null);

  // ─── Step 1 submission / Step 2 state ───────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step2, setStep2] = useState<{
    booking: Booking;
    draft: InvoiceDraft;
  } | null>(null);

  // ─── Derived: service + duration ─────────────────────────────
  const selectedService = useMemo(
    () => services.find(s => s.slug === serviceSlug),
    [serviceSlug],
  );
  const duration = getServiceDuration(selectedService);
  const isFreeSession = isServiceFree(selectedService);

  const headers = useMemo(() => ({
    Authorization: `Bearer ${password}`,
    'Content-Type': 'application/json',
  }), [password]);

  // ─── Effect: reset when modal opens ──────────────────────────
  useEffect(() => {
    if (!open) return;
    setCurrentStep(1);
    setServiceSlug('initial-consultation');
    setSessionMode('online');
    setNotes('');
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientTimezone('America/Toronto');
    setClientCountry('CA');
    setSendClientEmail(true);
    setCurrentMonth(ymdToday().slice(0, 7));
    setSelectedDate('');
    setSelectedSlot(null);
    setDaySlots([]);
    setIsRecurring(false);
    setRecurringFrequency('weekly');
    setRecurringCount(6);
    setRecurringInvoiceMode('per-session');
    setSeriesPlan(null);
    setSeriesOverrides(new Map());
    setSeriesSkips(new Set());
    setError(null);
    setStep2(null);
  }, [open]);

  // ─── Effect: fetch month availability ─────────────────────────
  useEffect(() => {
    if (!open || currentStep !== 1) return;
    setMonthLoading(true);
    fetch(`/api/book/availability/month?month=${currentMonth}&duration=${duration}`)
      .then(r => r.json())
      .then(data => {
        const map = new Map<string, DayAvailability>();
        for (const d of data.dates ?? []) {
          map.set(d.date, d);
        }
        setMonthAvailability(map);
      })
      .catch(() => {})
      .finally(() => setMonthLoading(false));
  }, [open, currentStep, currentMonth, duration]);

  // ─── Effect: fetch day slots when date selected ──────────────
  useEffect(() => {
    if (!open || !selectedDate || currentStep !== 1) return;
    setDaySlotsLoading(true);
    setSelectedSlot(null);
    fetch(`/api/book/availability?date=${selectedDate}&duration=${duration}&tz=${clientTimezone}`)
      .then(r => r.json())
      .then(data => {
        setDaySlots(data.slots ?? []);
      })
      .catch(() => setDaySlots([]))
      .finally(() => setDaySlotsLoading(false));
  }, [open, selectedDate, duration, clientTimezone, currentStep]);

  // ─── Effect: fetch provider location badge ────────────────────
  useEffect(() => {
    if (!open) return;
    fetch('/api/admin/provider-location', { headers })
      .then(r => r.json())
      .then(data => {
        if (data.location) {
          setProviderLoc({
            timezone: data.location.timezone,
            locationLabel: data.location.locationLabel,
            source: data.location.source,
          });
        }
      })
      .catch(() => {});
  }, [open, headers]);

  // ─── Handler: check recurring series availability ────────────
  const handleCheckSeries = useCallback(async () => {
    if (!selectedSlot || !serviceSlug) return;
    setSeriesPlanLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/booking/plan-series', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          serviceSlug,
          startTime: selectedSlot.start,
          frequency: recurringFrequency,
          count: recurringCount,
          durationMinutes: duration,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Series planner failed');
      setSeriesPlan(data.slots ?? []);
      setSeriesOverrides(new Map());
      setSeriesSkips(new Set());
    } catch (err: any) {
      setError(err.message || 'Could not plan series');
      setSeriesPlan(null);
    } finally {
      setSeriesPlanLoading(false);
    }
  }, [selectedSlot, serviceSlug, recurringFrequency, recurringCount, duration, headers]);

  // ─── Handler: Step 1 Next ────────────────────────────────────
  const handleStep1Next = useCallback(async () => {
    setError(null);
    if (!clientName.trim()) return setError('Client name is required');
    if (!clientEmail.includes('@')) return setError('Valid client email is required');
    if (!selectedSlot) return setError('Pick a time slot first');
    if (isRecurring && !seriesPlan) {
      return setError('Check series availability first (or disable recurring)');
    }

    setSubmitting(true);
    try {
      // Build request body
      const body: Record<string, unknown> = {
        serviceSlug,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: clientPhone.trim() || undefined,
        clientTimezone,
        clientCountry,
        sessionMode,
        notes: notes.trim() || undefined,
      };

      if (isRecurring && seriesPlan) {
        // Resolve final slot list: apply overrides, filter out skips
        const finalSlots = seriesPlan
          .filter(s => !seriesSkips.has(s.index))
          .map(s => {
            const override = seriesOverrides.get(s.index);
            return override ?? { startTime: s.startTime, endTime: s.endTime };
          });

        if (finalSlots.length === 0) {
          setSubmitting(false);
          return setError('All series slots are skipped — pick at least one');
        }

        body.series = {
          frequency: recurringFrequency,
          invoiceMode: recurringInvoiceMode,
          slots: finalSlots,
        };
      } else {
        body.startTime = selectedSlot.start;
        body.endTime = selectedSlot.end;
      }

      const res = await fetch('/api/admin/booking/create-draft', {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create booking');

      // Free sessions skip Step 2 and activate immediately
      if (data.isFreeSession || !data.primaryDraftId) {
        const actRes = await fetch(`/api/admin/booking/${data.primaryBookingId}/confirm-and-send`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ sendClientEmail }),
        });
        const actData = await actRes.json();
        if (!actRes.ok) throw new Error(actData.error || 'Failed to activate booking');
        onCreated();
        onClose();
        return;
      }

      // Paid: fetch booking + draft for Step 2
      const [bookingRes, draftRes] = await Promise.all([
        fetch(`/api/admin/booking/list?id=${data.primaryBookingId}`, { headers })
          .catch(() => null),
        fetch(`/api/admin/invoices/drafts?id=${data.primaryDraftId}`, { headers }),
      ]);

      let booking: Booking | null = null;
      if (bookingRes && bookingRes.ok) {
        const bData = await bookingRes.json();
        booking = bData.booking || bData.bookings?.[0] || null;
      }

      // Fallback: construct a minimal booking snapshot from form state
      // if the list endpoint doesn't return a direct lookup. Step 2
      // only needs clientName/email/startTime/durationMinutes/country
      // for the context card.
      if (!booking) {
        booking = {
          bookingId: data.primaryBookingId,
          clientEmail: clientEmail.trim(),
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim() || undefined,
          clientTimezone,
          clientCountry,
          preferredLanguage: 'en',
          serviceSlug,
          serviceName: selectedService?.name,
          sessionMode,
          durationMinutes: duration,
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
          status: 'pending-review',
          source: 'manual',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Booking;
      }

      const draftData = await draftRes.json();
      if (!draftData.draft) throw new Error('Could not load invoice draft');

      setStep2({ booking, draft: draftData.draft });
      setCurrentStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  }, [
    clientName, clientEmail, selectedSlot, isRecurring, seriesPlan,
    serviceSlug, clientPhone, clientTimezone, clientCountry, sessionMode, notes,
    recurringFrequency, recurringInvoiceMode, seriesOverrides, seriesSkips,
    sendClientEmail, headers, onCreated, onClose, selectedService, duration,
  ]);

  // ─── Handler: Step 2 Confirm & Send ──────────────────────────
  const handleConfirmSend = useCallback(async () => {
    if (!step2) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/booking/${step2.booking.bookingId}/confirm-and-send`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ sendClientEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to confirm booking');
      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to confirm booking');
    } finally {
      setSubmitting(false);
    }
  }, [step2, headers, sendClientEmail, onCreated, onClose]);

  // ─── Handler: Step 2 Skip & Send Later ───────────────────────
  const handleSkipForLater = useCallback(async () => {
    if (!step2) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/booking/${step2.booking.bookingId}/save-for-later`, {
        method: 'POST',
        headers,
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save hold');
      }
      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save hold');
    } finally {
      setSubmitting(false);
    }
  }, [step2, headers, onCreated, onClose]);

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  if (!open) return null;

  // ─── Render ──────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pointer-events-none overflow-y-auto"
          >
            <div className="pointer-events-auto w-full max-w-3xl my-4 bg-white rounded-2xl shadow-2xl">
              {/* Header with step indicator */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 bg-white border-b border-[#F0ECE8] rounded-t-2xl">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {currentStep === 2 && (
                    <button
                      onClick={() => setCurrentStep(1)}
                      disabled={submitting}
                      className="p-1.5 rounded-lg hover:bg-[#F5F0EB] text-[#8E8E9F] hover:text-[#4A4A5C] transition-colors"
                      aria-label="Back"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-[#2D2A33] truncate">
                      {currentStep === 1 ? 'New Booking' : 'Review Invoice'}
                    </h2>
                    <p className="text-xs text-[#8E8E9F] truncate">
                      {currentStep === 1
                        ? 'Step 1 of 2 · Pick a service, time, and client'
                        : 'Step 2 of 2 · Confirm pricing and send'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  disabled={submitting}
                  aria-label="Close"
                  className="p-2 rounded-lg hover:bg-[#F5F0EB] text-[#8E8E9F] hover:text-[#4A4A5C] transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="px-4 sm:px-6 py-5 space-y-5">
                {currentStep === 1 ? (
                  <Step1Content
                    serviceSlug={serviceSlug}
                    setServiceSlug={setServiceSlug}
                    selectedService={selectedService}
                    duration={duration}
                    isFreeSession={isFreeSession}
                    sessionMode={sessionMode}
                    setSessionMode={setSessionMode}
                    notes={notes}
                    setNotes={setNotes}
                    clientName={clientName}
                    setClientName={setClientName}
                    clientEmail={clientEmail}
                    setClientEmail={setClientEmail}
                    clientPhone={clientPhone}
                    setClientPhone={setClientPhone}
                    clientTimezone={clientTimezone}
                    setClientTimezone={setClientTimezone}
                    clientCountry={clientCountry}
                    setClientCountry={setClientCountry}
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    monthAvailability={monthAvailability}
                    monthLoading={monthLoading}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    daySlots={daySlots}
                    daySlotsLoading={daySlotsLoading}
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                    providerLoc={providerLoc}
                    isRecurring={isRecurring}
                    setIsRecurring={setIsRecurring}
                    recurringFrequency={recurringFrequency}
                    setRecurringFrequency={setRecurringFrequency}
                    recurringCount={recurringCount}
                    setRecurringCount={setRecurringCount}
                    recurringInvoiceMode={recurringInvoiceMode}
                    setRecurringInvoiceMode={setRecurringInvoiceMode}
                    seriesPlan={seriesPlan}
                    seriesPlanLoading={seriesPlanLoading}
                    seriesOverrides={seriesOverrides}
                    setSeriesOverrides={setSeriesOverrides}
                    seriesSkips={seriesSkips}
                    setSeriesSkips={setSeriesSkips}
                    onCheckSeries={handleCheckSeries}
                    sendClientEmail={sendClientEmail}
                    setSendClientEmail={setSendClientEmail}
                  />
                ) : (
                  step2 && (
                    <InvoiceReviewSheet
                      open
                      mode="inline"
                      booking={step2.booking}
                      draft={step2.draft}
                      password={password}
                      onClose={handleClose}
                      onSent={() => { /* noop in inline mode */ }}
                      onConfirm={handleConfirmSend}
                      onConfirmLabel="Confirm & Send"
                      onSecondaryAction={{
                        label: 'Skip & Send Later',
                        handler: handleSkipForLater,
                      }}
                    />
                  )
                )}

                {/* Error banner */}
                {error && (
                  <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              {/* Step 1 footer (Step 2 has its own footer inside InvoiceReviewSheet) */}
              {currentStep === 1 && (
                <div className="sticky bottom-0 z-10 px-4 sm:px-6 py-3 bg-white border-t border-[#F0ECE8] rounded-b-2xl flex gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={submitting}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#F5F0EB] text-sm font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleStep1Next}
                    disabled={submitting || !selectedSlot || !clientName || !clientEmail}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#7A3B5E] text-sm font-semibold text-white hover:bg-[#6A2E4E] transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating…
                      </>
                    ) : (
                      <>
                        {isFreeSession ? 'Create & Send Confirmation' : 'Next — Review Invoice'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Step 1 Content ─────────────────────────────────────────────

interface Step1Props {
  serviceSlug: string;
  setServiceSlug: (v: string) => void;
  selectedService: Service | undefined;
  duration: number;
  isFreeSession: boolean;
  sessionMode: 'online' | 'inPerson';
  setSessionMode: (v: 'online' | 'inPerson') => void;
  notes: string;
  setNotes: (v: string) => void;
  clientName: string;
  setClientName: (v: string) => void;
  clientEmail: string;
  setClientEmail: (v: string) => void;
  clientPhone: string;
  setClientPhone: (v: string) => void;
  clientTimezone: string;
  setClientTimezone: (v: string) => void;
  clientCountry: string;
  setClientCountry: (v: string) => void;
  currentMonth: string;
  setCurrentMonth: (v: string) => void;
  monthAvailability: Map<string, DayAvailability>;
  monthLoading: boolean;
  selectedDate: string;
  setSelectedDate: (v: string) => void;
  daySlots: TimeSlot[];
  daySlotsLoading: boolean;
  selectedSlot: TimeSlot | null;
  setSelectedSlot: (v: TimeSlot | null) => void;
  providerLoc: ProviderLocationInfo | null;
  isRecurring: boolean;
  setIsRecurring: (v: boolean) => void;
  recurringFrequency: 'weekly' | 'biweekly';
  setRecurringFrequency: (v: 'weekly' | 'biweekly') => void;
  recurringCount: number;
  setRecurringCount: (v: number) => void;
  recurringInvoiceMode: 'per-session' | 'bundled';
  setRecurringInvoiceMode: (v: 'per-session' | 'bundled') => void;
  seriesPlan: PlanSlot[] | null;
  seriesPlanLoading: boolean;
  seriesOverrides: Map<number, { startTime: string; endTime: string }>;
  setSeriesOverrides: (v: Map<number, { startTime: string; endTime: string }>) => void;
  seriesSkips: Set<number>;
  setSeriesSkips: (v: Set<number>) => void;
  onCheckSeries: () => void;
  sendClientEmail: boolean;
  setSendClientEmail: (v: boolean) => void;
}

function Step1Content(props: Step1Props) {
  return (
    <>
      {/* Provider location badge */}
      {props.providerLoc && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#FFFAF5] to-[#F5F0EB] border border-[#C8A97D]/30">
          <MapPin className="w-4 h-4 text-[#C8A97D] shrink-0" />
          <p className="text-xs text-[#4A4A5C]">
            Dr. Hala is currently in{' '}
            <strong className="text-[#7A3B5E]">{props.providerLoc.locationLabel}</strong>
            {' · '}
            <span className="text-[#8E8E9F]">{props.providerLoc.timezone}</span>
            {props.providerLoc.source !== 'default' && (
              <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-[#3B8A6E]/10 text-[#3B8A6E] font-semibold uppercase tracking-wide">
                {props.providerLoc.source}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Service picker */}
      <ServicePicker
        selected={props.serviceSlug}
        onSelect={props.setServiceSlug}
        duration={props.duration}
        isFree={props.isFreeSession}
      />

      {/* Session mode */}
      <div>
        <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">Session mode</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => props.setSessionMode('online')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors inline-flex items-center justify-center gap-2 ${
              props.sessionMode === 'online'
                ? 'bg-[#7A3B5E] text-white'
                : 'bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF]'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Online (Meet / Phone)
          </button>
          <button
            type="button"
            onClick={() => props.setSessionMode('inPerson')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors inline-flex items-center justify-center gap-2 ${
              props.sessionMode === 'inPerson'
                ? 'bg-[#7A3B5E] text-white'
                : 'bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            In-Person — Ottawa
          </button>
        </div>
      </div>

      {/* Availability calendar */}
      <AvailabilityCalendar
        currentMonth={props.currentMonth}
        onMonthChange={props.setCurrentMonth}
        monthAvailability={props.monthAvailability}
        monthLoading={props.monthLoading}
        selectedDate={props.selectedDate}
        onDateSelect={d => { props.setSelectedDate(d); props.setSelectedSlot(null); }}
        daySlots={props.daySlots}
        daySlotsLoading={props.daySlotsLoading}
        selectedSlot={props.selectedSlot}
        onSlotSelect={props.setSelectedSlot}
        providerTz={props.providerLoc?.timezone ?? 'America/Toronto'}
        clientTz={props.clientTimezone}
      />

      {/* Recurring toggle */}
      <RecurringSection
        isRecurring={props.isRecurring}
        setIsRecurring={props.setIsRecurring}
        frequency={props.recurringFrequency}
        setFrequency={props.setRecurringFrequency}
        count={props.recurringCount}
        setCount={props.setRecurringCount}
        invoiceMode={props.recurringInvoiceMode}
        setInvoiceMode={props.setRecurringInvoiceMode}
        seriesPlan={props.seriesPlan}
        seriesPlanLoading={props.seriesPlanLoading}
        seriesOverrides={props.seriesOverrides}
        setSeriesOverrides={props.setSeriesOverrides}
        seriesSkips={props.seriesSkips}
        setSeriesSkips={props.setSeriesSkips}
        onCheckSeries={props.onCheckSeries}
        canCheck={!!props.selectedSlot}
        providerTz={props.providerLoc?.timezone ?? 'America/Toronto'}
      />

      {/* Client fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">Client name</label>
          <input
            type="text"
            value={props.clientName}
            onChange={e => props.setClientName(e.target.value)}
            placeholder="Full name"
            className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">Client email</label>
          <input
            type="email"
            value={props.clientEmail}
            onChange={e => props.setClientEmail(e.target.value)}
            placeholder="client@example.com"
            className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">
            Phone <span className="text-[#C4C0BC] font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            value={props.clientPhone}
            onChange={e => props.setClientPhone(e.target.value)}
            placeholder="+1 613 555 0000"
            className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">Country</label>
          <select
            value={props.clientCountry}
            onChange={e => props.setClientCountry(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 bg-white"
          >
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name} ({c.code}){c.code === 'CA' ? ' — e-Transfer locked on' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">
          <Globe className="inline w-3 h-3 mr-1" />
          Client timezone
        </label>
        <select
          value={props.clientTimezone}
          onChange={e => props.setClientTimezone(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 bg-white"
        >
          {TIMEZONES.map(tz => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
        <p className="text-[10px] text-[#8E8E9F] mt-1">
          The client sees session times in this timezone. The calendar above also shows them in this timezone for your reference.
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">
          Notes <span className="text-[#C4C0BC] font-normal">(optional, for Dr. Hala)</span>
        </label>
        <textarea
          value={props.notes}
          onChange={e => props.setNotes(e.target.value)}
          rows={2}
          placeholder="Anything Dr. Hala should know before the session…"
          className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 resize-none"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={props.sendClientEmail}
          onChange={e => props.setSendClientEmail(e.target.checked)}
          className="w-4 h-4 accent-[#7A3B5E]"
        />
        <span className="text-xs text-[#4A4A5C]">
          Send confirmation email to client after activation
        </span>
      </label>
    </>
  );
}

// ─── Service Picker ─────────────────────────────────────────────

function ServicePicker({
  selected,
  onSelect,
  duration,
  isFree,
}: {
  selected: string;
  onSelect: (slug: string) => void;
  duration: number;
  isFree: boolean;
}) {
  const [expandedCategory, setExpandedCategory] = useState<ServiceCategory | null>(() => {
    const svc = services.find(s => s.slug === selected);
    return (svc?.category as ServiceCategory) ?? null;
  });

  const featured = useMemo(
    () => services.filter(s => s.slug === 'initial-consultation' || s.slug === 'online-phone-consultation'),
    [],
  );
  const categorized = useMemo(() => {
    const groups = new Map<ServiceCategory, Service[]>();
    for (const s of services) {
      if (s.slug === 'initial-consultation' || s.slug === 'online-phone-consultation') continue;
      const list = groups.get(s.category) ?? [];
      list.push(s);
      groups.set(s.category, list);
    }
    return groups;
  }, []);

  return (
    <div>
      <label className="block text-xs font-semibold text-[#4A4A5C] mb-2">
        Service
        <span className="ml-2 text-[10px] text-[#8E8E9F] font-normal">
          {duration} min · {isFree ? 'Free consultation' : 'Paid session (invoice in Step 2)'}
        </span>
      </label>

      {/* Featured row — Free consultation + Online/Phone consultation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {featured.map(s => {
          const free = isServiceFree(s);
          const dur = getServiceDuration(s);
          const active = selected === s.slug;
          const Icon = s.slug === 'initial-consultation' ? Heart : MessageCircle;
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => onSelect(s.slug)}
              className={`text-left px-3 py-2.5 rounded-xl border-2 transition-all ${
                active
                  ? 'border-[#7A3B5E] bg-gradient-to-br from-[#FFFAF5] to-[#FDF6ED] shadow-sm'
                  : 'border-[#F0ECE8] bg-white hover:border-[#C8A97D]/50'
              }`}
            >
              <div className="flex items-start gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  active ? 'bg-[#7A3B5E] text-white' : 'bg-[#F5F0EB] text-[#7A3B5E]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-[#2D2A33] truncate">{s.name}</p>
                    <Sparkles className="w-3 h-3 text-[#C8A97D] shrink-0" />
                  </div>
                  <p className="text-[10px] text-[#8E8E9F] mt-0.5">
                    {dur} min · {free ? 'Free' : `CA$${s.priceFrom}`}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Category sections */}
      <div className="space-y-1.5 rounded-xl border border-[#F0ECE8] overflow-hidden bg-[#FAF7F2]">
        {serviceCategories.map(cat => {
          const list = categorized.get(cat.key) ?? [];
          if (list.length === 0) return null;
          const expanded = expandedCategory === cat.key;
          return (
            <div key={cat.key}>
              <button
                type="button"
                onClick={() => setExpandedCategory(expanded ? null : cat.key)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white hover:bg-[#F5F0EB] transition-colors text-left"
              >
                <span className="text-xs font-semibold text-[#4A4A5C]">
                  {cat.name} <span className="text-[#8E8E9F] font-normal">({list.length})</span>
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#8E8E9F] transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
              {expanded && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-2 bg-[#FAF7F2]">
                  {list.map(s => {
                    const active = selected === s.slug;
                    return (
                      <button
                        key={s.slug}
                        type="button"
                        onClick={() => onSelect(s.slug)}
                        className={`text-left px-2.5 py-2 rounded-lg border transition-all ${
                          active
                            ? 'border-[#7A3B5E] bg-white shadow-sm'
                            : 'border-transparent bg-white/60 hover:bg-white'
                        }`}
                      >
                        <p className="text-[11px] font-semibold text-[#2D2A33] leading-tight">{s.name}</p>
                        <p className="text-[10px] text-[#8E8E9F] mt-0.5">
                          {s.duration} · CA${s.priceFrom}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Availability Calendar ──────────────────────────────────────

function AvailabilityCalendar({
  currentMonth,
  onMonthChange,
  monthAvailability,
  monthLoading,
  selectedDate,
  onDateSelect,
  daySlots,
  daySlotsLoading,
  selectedSlot,
  onSlotSelect,
  providerTz,
  clientTz,
}: {
  currentMonth: string;
  onMonthChange: (m: string) => void;
  monthAvailability: Map<string, DayAvailability>;
  monthLoading: boolean;
  selectedDate: string;
  onDateSelect: (d: string) => void;
  daySlots: TimeSlot[];
  daySlotsLoading: boolean;
  selectedSlot: TimeSlot | null;
  onSlotSelect: (s: TimeSlot | null) => void;
  providerTz: string;
  clientTz: string;
}) {
  const firstDay = firstWeekday(currentMonth);
  const totalDays = daysInMonth(currentMonth);
  const today = ymdToday();
  const cells: (string | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= totalDays; d++) {
    cells.push(`${currentMonth}-${String(d).padStart(2, '0')}`);
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const available = daySlots.filter(s => s.available);
  const busy = daySlots.filter(s => !s.available && (s.reason === 'busy' || s.reason === 'buffer'));

  return (
    <div className="rounded-xl border border-[#F0ECE8] bg-[#FAF7F2] overflow-hidden">
      {/* Month header */}
      <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-[#F0ECE8]">
        <button
          type="button"
          onClick={() => onMonthChange(shiftMonth(currentMonth, -1))}
          className="p-1.5 rounded-lg hover:bg-[#F5F0EB] text-[#8E8E9F]"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-[#7A3B5E]" />
          <span className="text-xs font-bold text-[#2D2A33]">{formatMonthLabel(currentMonth)}</span>
          {monthLoading && <Loader2 className="w-3 h-3 animate-spin text-[#8E8E9F]" />}
        </div>
        <button
          type="button"
          onClick={() => onMonthChange(shiftMonth(currentMonth, 1))}
          className="p-1.5 rounded-lg hover:bg-[#F5F0EB] text-[#8E8E9F]"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday row */}
      <div className="grid grid-cols-7 bg-white">
        {WEEKDAY_LABELS.map(w => (
          <div key={w} className="text-center py-1.5 text-[10px] font-semibold text-[#8E8E9F]">
            {w}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-px bg-[#F0ECE8] border-t border-[#F0ECE8]">
        {cells.map((cell, i) => {
          if (!cell) {
            return <div key={`empty-${i}`} className="bg-white aspect-square" />;
          }
          const info = monthAvailability.get(cell);
          const isPast = cell < today;
          const isSelected = cell === selectedDate;
          const hasSlots = info?.hasSlots ?? false;
          const isBlocked = info?.isBlocked ?? false;
          const dayNum = parseInt(cell.slice(-2), 10);

          return (
            <button
              key={cell}
              type="button"
              disabled={isPast || isBlocked}
              onClick={() => onDateSelect(cell)}
              title={isBlocked ? info?.blockReason : undefined}
              className={`bg-white aspect-square flex flex-col items-center justify-center text-xs transition-colors relative ${
                isPast
                  ? 'text-[#D8D2C8] cursor-not-allowed'
                  : isSelected
                  ? 'bg-[#7A3B5E] text-white font-bold'
                  : isBlocked
                  ? 'bg-red-50 text-red-400 cursor-not-allowed'
                  : hasSlots
                  ? 'hover:bg-[#F5F0EB] text-[#2D2A33]'
                  : 'text-[#C4C0BC] hover:bg-[#FAF7F2]'
              }`}
            >
              <span>{dayNum}</span>
              {!isPast && !isSelected && hasSlots && (
                <span className="w-1 h-1 rounded-full bg-[#3B8A6E] absolute bottom-1" />
              )}
              {!isPast && isBlocked && (
                <span className="w-1 h-1 rounded-full bg-red-400 absolute bottom-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Day slots */}
      {selectedDate && (
        <div className="px-3 py-3 bg-white border-t border-[#F0ECE8]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-[#4A4A5C]">
              <Clock className="inline w-3 h-3 mr-1 text-[#C8A97D]" />
              Available times
              <span className="ml-1.5 text-[10px] text-[#8E8E9F] font-normal">
                (Dr. Hala tz: {providerTz})
              </span>
            </p>
            {daySlotsLoading && <Loader2 className="w-3 h-3 animate-spin text-[#8E8E9F]" />}
          </div>
          {available.length === 0 && !daySlotsLoading && (
            <p className="text-xs text-[#8E8E9F] py-2">No available times on this day.</p>
          )}
          {available.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {available.map(s => {
                const active = selectedSlot?.start === s.start;
                return (
                  <button
                    key={s.start}
                    type="button"
                    onClick={() => onSlotSelect(s)}
                    title={`Client sees: ${formatSlotInTz(s.start, clientTz)} (${clientTz})`}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all ${
                      active
                        ? 'bg-[#7A3B5E] text-white shadow-sm'
                        : 'bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF]'
                    }`}
                  >
                    {formatSlotInTz(s.start, providerTz)}
                  </button>
                );
              })}
            </div>
          )}
          {busy.length > 0 && (
            <details className="text-[10px] text-[#8E8E9F]">
              <summary className="cursor-pointer hover:text-[#4A4A5C]">
                {busy.length} busy / buffered slot{busy.length === 1 ? '' : 's'} (click to override)
              </summary>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {busy.map(s => (
                  <button
                    key={s.start}
                    type="button"
                    onClick={() => onSlotSelect({ ...s, available: true })}
                    className="px-2 py-1 rounded-md font-mono text-[10px] bg-[#FFF4F0] text-[#C45B5B] border border-red-100 hover:bg-red-50"
                    title={`${s.reason} — click to force-book`}
                  >
                    {formatSlotInTz(s.start, providerTz)} ⚠
                  </button>
                ))}
              </div>
            </details>
          )}

          {/* Selected slot summary */}
          {selectedSlot && (
            <div className="mt-2 p-2 rounded-lg bg-gradient-to-r from-[#F0FAF5] to-[#FAF7F2] border border-[#3B8A6E]/20">
              <p className="text-[11px] text-[#4A4A5C]">
                <strong className="text-[#3B8A6E]">
                  {formatSlotDateInTz(selectedSlot.start, providerTz)} · {formatSlotInTz(selectedSlot.start, providerTz)}
                </strong>{' '}
                in {providerTz}
              </p>
              {clientTz !== providerTz && (
                <p className="text-[10px] text-[#8E8E9F] mt-0.5">
                  Client will see: {formatSlotDateInTz(selectedSlot.start, clientTz)} · {formatSlotInTz(selectedSlot.start, clientTz)} ({clientTz})
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Recurring Section ──────────────────────────────────────────

function RecurringSection({
  isRecurring,
  setIsRecurring,
  frequency,
  setFrequency,
  count,
  setCount,
  invoiceMode,
  setInvoiceMode,
  seriesPlan,
  seriesPlanLoading,
  seriesOverrides,
  setSeriesOverrides,
  seriesSkips,
  setSeriesSkips,
  onCheckSeries,
  canCheck,
  providerTz,
}: {
  isRecurring: boolean;
  setIsRecurring: (v: boolean) => void;
  frequency: 'weekly' | 'biweekly';
  setFrequency: (v: 'weekly' | 'biweekly') => void;
  count: number;
  setCount: (v: number) => void;
  invoiceMode: 'per-session' | 'bundled';
  setInvoiceMode: (v: 'per-session' | 'bundled') => void;
  seriesPlan: PlanSlot[] | null;
  seriesPlanLoading: boolean;
  seriesOverrides: Map<number, { startTime: string; endTime: string }>;
  setSeriesOverrides: (v: Map<number, { startTime: string; endTime: string }>) => void;
  seriesSkips: Set<number>;
  setSeriesSkips: (v: Set<number>) => void;
  onCheckSeries: () => void;
  canCheck: boolean;
  providerTz: string;
}) {
  return (
    <div className="rounded-xl border border-[#F0ECE8] bg-[#FAF7F2] overflow-hidden">
      <label className="flex items-center gap-2 px-3 py-2.5 bg-white border-b border-[#F0ECE8] cursor-pointer">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={e => setIsRecurring(e.target.checked)}
          className="w-4 h-4 accent-[#7A3B5E]"
        />
        <RefreshCw className="w-3.5 h-3.5 text-[#C8A97D]" />
        <span className="text-xs font-semibold text-[#2D2A33]">Make this a recurring session</span>
      </label>

      {isRecurring && (
        <div className="px-3 py-3 space-y-3">
          {/* Frequency + count + mode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-semibold text-[#4A4A5C] mb-1 uppercase tracking-wide">Frequency</label>
              <div className="flex gap-1">
                {(['weekly', 'biweekly'] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`flex-1 px-2 py-1.5 rounded-md text-[11px] font-semibold transition-colors ${
                      frequency === f
                        ? 'bg-[#7A3B5E] text-white'
                        : 'bg-white text-[#4A4A5C] hover:bg-[#F5F0EB] border border-[#E8E4DE]'
                    }`}
                  >
                    {f === 'weekly' ? 'Weekly' : 'Biweekly'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-[#4A4A5C] mb-1 uppercase tracking-wide">Sessions</label>
              <input
                type="number"
                min={1}
                max={12}
                value={count}
                onChange={e => setCount(Math.max(1, Math.min(12, parseInt(e.target.value, 10) || 1)))}
                className="w-full px-2 py-1.5 rounded-md border border-[#E8E4DE] text-xs text-center font-semibold bg-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-[#4A4A5C] mb-1 uppercase tracking-wide">Invoice</label>
              <div className="flex gap-1">
                {(['per-session', 'bundled'] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setInvoiceMode(m)}
                    className={`flex-1 px-2 py-1.5 rounded-md text-[10px] font-semibold transition-colors ${
                      invoiceMode === m
                        ? 'bg-[#7A3B5E] text-white'
                        : 'bg-white text-[#4A4A5C] hover:bg-[#F5F0EB] border border-[#E8E4DE]'
                    }`}
                  >
                    {m === 'per-session' ? 'Per session' : 'Bundled'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Check availability button */}
          <button
            type="button"
            onClick={onCheckSeries}
            disabled={!canCheck || seriesPlanLoading}
            className="w-full px-3 py-2 rounded-lg bg-[#FFFAF5] border border-[#C8A97D]/40 text-[11px] font-semibold text-[#7A3B5E] hover:bg-[#FCF3E8] disabled:opacity-40 transition-colors inline-flex items-center justify-center gap-2"
          >
            {seriesPlanLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3" />
            )}
            {canCheck ? 'Check availability for all sessions' : 'Pick a first slot above first'}
          </button>

          {/* Series plan results */}
          {seriesPlan && (
            <div className="space-y-1">
              {seriesPlan.map(slot => {
                const effective = seriesOverrides.get(slot.index);
                const isSkipped = seriesSkips.has(slot.index);
                const statusColor = isSkipped
                  ? 'bg-gray-50 text-gray-400 border-gray-200 line-through'
                  : slot.status === 'available'
                  ? 'bg-[#F0FAF5] text-[#3B8A6E] border-[#3B8A6E]/20'
                  : slot.status === 'conflict'
                  ? 'bg-[#FFFAF5] text-[#C8A97D] border-[#C8A97D]/40'
                  : 'bg-red-50 text-red-600 border-red-200';
                const displayStart = effective?.startTime ?? slot.startTime;

                return (
                  <div key={slot.index} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-[11px] ${statusColor}`}>
                    <span className="font-bold w-6">#{slot.index}</span>
                    <span className="flex-1 min-w-0 font-mono truncate">
                      {formatSlotDateInTz(displayStart, providerTz)} · {formatSlotInTz(displayStart, providerTz)}
                    </span>
                    {!isSkipped && slot.status !== 'available' && slot.suggestedAlternatives && slot.suggestedAlternatives.length > 0 && (
                      <select
                        value=""
                        onChange={e => {
                          if (!e.target.value) return;
                          const [s, en] = e.target.value.split('|');
                          const next = new Map(seriesOverrides);
                          next.set(slot.index, { startTime: s, endTime: en });
                          setSeriesOverrides(next);
                        }}
                        className="bg-white text-[10px] border border-[#E8E4DE] rounded px-1 py-0.5"
                      >
                        <option value="">Alternative…</option>
                        {slot.suggestedAlternatives.map(a => (
                          <option key={a.startTime} value={`${a.startTime}|${a.endTime}`}>
                            {formatSlotDateInTz(a.startTime, providerTz)} {formatSlotInTz(a.startTime, providerTz)}
                          </option>
                        ))}
                      </select>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const next = new Set(seriesSkips);
                        if (isSkipped) next.delete(slot.index);
                        else next.add(slot.index);
                        setSeriesSkips(next);
                      }}
                      className="text-[10px] px-1.5 py-0.5 rounded hover:bg-white/60"
                    >
                      {isSkipped ? 'Include' : 'Skip'}
                    </button>
                  </div>
                );
              })}
              {seriesPlan.some(s => s.status !== 'available' && !seriesSkips.has(s.index) && !seriesOverrides.has(s.index)) && (
                <p className="text-[10px] text-[#C8A97D] px-1 pt-1">
                  Resolve conflicts by picking an alternative or skipping before continuing.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
