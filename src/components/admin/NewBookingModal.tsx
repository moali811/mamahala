'use client';

/* ================================================================
   NewBookingModal — Two-step admin booking wizard
   ================================================================
   STEP 1 — Booking details (section-based wizard)
     § Service & Mode — service picker + online/in-person toggle
     § Date & Time   — availability calendar + time slot picker
     § Client        — name, email, phone, country, timezone
     § Options       — recurring toggle, notes, email confirmation

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

   Mobile-first: collapsible wizard sections auto-advance on
   selection for a native-app booking flow.
   ================================================================ */

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Loader2, Check, Calendar, Clock, MapPin,
  ChevronLeft, ChevronRight, Video, Building2,
  RefreshCw, AlertCircle, ArrowRight,
  Heart, MessageCircle, ChevronDown, Sparkles, Globe,
  User, Search,
} from 'lucide-react';
import { services, serviceCategories } from '@/data/services';
import { PRICING_TIERS, type PricingTierKey } from '@/config/pricing';
import { COUNTRIES, COUNTRIES_BY_CODE } from '@/config/countries';
import type { Service, ServiceCategory } from '@/types';
import type { InvoiceDraft } from '@/lib/invoicing/types';
import type { Booking } from '@/lib/booking/types';
import InvoiceReviewSheet from './InvoiceReviewSheet';
import AIComposeBar, { type ComposedFilled } from './AIComposeBar';

interface Props {
  open: boolean;
  password: string;
  onClose: () => void;
  onCreated: () => void;
}

// ─── Section wizard type ───────────────────────────────────────
type SectionKey = 'service' | 'schedule' | 'client' | 'options';

// ─── Constants ─────────────────────────────────────────────────
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

// ─── Types ─────────────────────────────────────────────────────
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

// ─── Helpers ───────────────────────────────────────────────────
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

function isSlotMorning(iso: string, timezone: string): boolean {
  try {
    const formatted = new Date(iso).toLocaleString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      hour12: true,
    });
    return formatted.includes('AM');
  } catch {
    return true;
  }
}

// ─── Component ─────────────────────────────────────────────────
export default function NewBookingModal({ open, password, onClose, onCreated }: Props) {
  // ─── Step state ────────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // ─── Section wizard state ──────────────────────────────────
  const [activeSection, setActiveSection] = useState<SectionKey>('service');

  // ─── Step 1 booking form state ─────────────────────────────
  const [serviceSlug, setServiceSlug] = useState<string>('initial-consultation');
  const [sessionMode, setSessionMode] = useState<'online' | 'inPerson'>('online');
  const [notes, setNotes] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientTimezone, setClientTimezone] = useState('America/Toronto');
  const [clientCountry, setClientCountry] = useState('CA');
  const [sendClientEmail, setSendClientEmail] = useState(false);

  // ─── Calendar state ────────────────────────────────────────
  const [currentMonth, setCurrentMonth] = useState(() => ymdToday().slice(0, 7));
  const [monthAvailability, setMonthAvailability] = useState<Map<string, DayAvailability>>(new Map());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [daySlots, setDaySlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [monthLoading, setMonthLoading] = useState(false);
  const [daySlotsLoading, setDaySlotsLoading] = useState(false);

  // ─── Recurring state ───────────────────────────────────────
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState<'weekly' | 'biweekly'>('weekly');
  const [recurringCount, setRecurringCount] = useState(6);
  const [recurringInvoiceMode, setRecurringInvoiceMode] = useState<'per-session' | 'bundled'>('per-session');
  const [seriesPlan, setSeriesPlan] = useState<PlanSlot[] | null>(null);
  const [seriesPlanLoading, setSeriesPlanLoading] = useState(false);
  const [seriesOverrides, setSeriesOverrides] = useState<Map<number, { startTime: string; endTime: string }>>(new Map());
  const [seriesSkips, setSeriesSkips] = useState<Set<number>>(new Set());

  // ─── Provider location badge ───────────────────────────────
  const [providerLoc, setProviderLoc] = useState<ProviderLocationInfo | null>(null);

  // ─── Step 1 submission / Step 2 state ──────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step2, setStep2] = useState<{
    booking: Booking;
    draft: InvoiceDraft;
  } | null>(null);

  // ─── AI Compose summary (shown on Step 1 after AI fills fields) ───
  const [aiComposeSummary, setAiComposeSummary] = useState<{
    fieldsFilled: number;
    resolvedDateLabel: string;
    clientEmail: string;
    isNewClient: boolean;
  } | null>(null);

  // ─── Derived ───────────────────────────────────────────────
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

  // ─── Effect: reset when modal opens ────────────────────────
  useEffect(() => {
    if (!open) return;
    setCurrentStep(1);
    setActiveSection('service');
    setServiceSlug('initial-consultation');
    setSessionMode('online');
    setNotes('');
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientTimezone('America/Toronto');
    setClientCountry('CA');
    setSendClientEmail(false);
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
    setAiComposeSummary(null);
  }, [open]);

  // ─── Effect: auto-clear errors ─────────────────────────────
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(t);
  }, [error]);

  // ─── Effect: fetch month availability ──────────────────────
  useEffect(() => {
    if (!open || currentStep !== 1) return;
    setMonthLoading(true);
    fetch(`/api/book/availability/month?month=${currentMonth}&duration=${duration}`)
      .then(r => r.json())
      .then(data => {
        const map = new Map<string, DayAvailability>();
        for (const d of data.dates ?? []) map.set(d.date, d);
        setMonthAvailability(map);
      })
      .catch(() => {})
      .finally(() => setMonthLoading(false));
  }, [open, currentStep, currentMonth, duration]);

  // ─── Effect: fetch day slots when date or timezone changes ──
  // NOTE: selectedSlot is NOT cleared here — the slot's ISO string
  // is absolute and stays valid across timezone changes. The slot is
  // only cleared when the user picks a different date (in handleDatePick).
  useEffect(() => {
    if (!open || !selectedDate || currentStep !== 1) return;
    setDaySlotsLoading(true);
    fetch(`/api/book/availability?date=${selectedDate}&duration=${duration}&tz=${clientTimezone}`)
      .then(r => r.json())
      .then(data => setDaySlots(data.slots ?? []))
      .catch(() => setDaySlots([]))
      .finally(() => setDaySlotsLoading(false));
  }, [open, selectedDate, duration, clientTimezone, currentStep]);

  // ─── Effect: fetch provider location badge ─────────────────
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

  // ─── Handler: check recurring series availability ──────────
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

  // ─── Handler: Step 1 Next (with smart section navigation) ──
  const handleStep1Next = useCallback(async () => {
    setError(null);

    // If we already created a draft (user went back to Step 1 and clicked Next again),
    // skip creation and go straight to Step 2 to avoid duplicate drafts.
    if (step2) {
      setCurrentStep(2);
      return;
    }

    if (!selectedSlot) {
      setActiveSection('schedule');
      return setError('Pick a time slot first');
    }
    if (!clientName.trim()) {
      setActiveSection('client');
      return setError('Client name is required');
    }
    if (!clientEmail.includes('@')) {
      setActiveSection('client');
      return setError('Valid client email is required');
    }
    if (isRecurring && !seriesPlan) {
      setActiveSection('options');
      return setError('Check series availability first (or disable recurring)');
    }

    setSubmitting(true);
    try {
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
        fetch(`/api/admin/booking/list?id=${data.primaryBookingId}`, { headers }).catch(() => null),
        fetch(`/api/admin/invoices/drafts?id=${data.primaryDraftId}`, { headers }),
      ]);

      let booking: Booking | null = null;
      if (bookingRes && bookingRes.ok) {
        const bData = await bookingRes.json();
        booking = bData.booking || bData.bookings?.[0] || null;
      }

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
    setActiveSection,
  ]);

  // ─── Handler: AI Compose draft ready → jump to Step 2 ─────
  const handleAIDraftReady = useCallback(
    async ({
      bookingId,
      draftId,
      filled,
    }: {
      bookingId: string;
      draftId: string | null;
      filled: ComposedFilled;
      kind: 'single' | 'series';
      seriesId?: string;
    }) => {
      setError(null);

      // Mirror AI-resolved fields into Step 1 form state so that if
      // the admin clicks "← Back" from Step 2, everything is filled.
      setServiceSlug(filled.serviceSlug);
      setSessionMode(filled.sessionMode);
      setClientName(filled.client.name);
      setClientEmail(filled.client.email);
      setClientPhone(filled.client.phone || '');
      setClientTimezone(filled.client.timezone);
      setClientCountry(filled.client.country);
      setNotes(filled.notes || '');
      setSelectedDate(filled.startIso.slice(0, 10));
      setSelectedSlot({ start: filled.startIso, end: filled.endIso, available: true });
      if (filled.recurring) {
        setIsRecurring(true);
        setRecurringFrequency(filled.recurring.cadence);
        setRecurringCount(filled.recurring.count);
        setRecurringInvoiceMode(filled.recurring.invoiceMode || 'per-session');
      }

      // Remember summary so we can show verification banner in Step 2
      const providerTz = providerLoc?.timezone ?? 'America/Toronto';
      const resolvedDateLabel = formatSlotDateInTz(filled.startIso, providerTz)
        + ' · ' + formatSlotInTz(filled.startIso, providerTz);
      const fieldsFilled = Object.values({
        service: !!filled.serviceSlug,
        mode: !!filled.sessionMode,
        date: !!filled.startIso,
        client: !!filled.client.name,
        email: !!filled.client.email,
        tz: !!filled.client.timezone,
        notes: !!filled.notes,
      }).filter(Boolean).length;
      setAiComposeSummary({
        fieldsFilled,
        resolvedDateLabel,
        clientEmail: filled.client.email,
        isNewClient: !filled.clientWasExisting,
      });

      // If free session with no draft, activate immediately (matches manual flow)
      if (!draftId) {
        setSubmitting(true);
        try {
          const actRes = await fetch(`/api/admin/booking/${bookingId}/confirm-and-send`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ sendClientEmail: false }),
          });
          const actData = await actRes.json();
          if (!actRes.ok) throw new Error(actData.error || 'Failed to activate booking');
          onCreated();
          onClose();
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : 'Failed to activate');
        } finally {
          setSubmitting(false);
        }
        return;
      }

      // Paid: fetch the invoice draft, construct synthetic Booking, go to Step 2
      try {
        const draftRes = await fetch(`/api/admin/invoices/drafts?id=${draftId}`, { headers });
        const draftData = await draftRes.json();
        if (!draftData.draft) throw new Error('Could not load invoice draft');

        const booking: Booking = {
          bookingId,
          clientEmail: filled.client.email,
          clientName: filled.client.name,
          clientPhone: filled.client.phone,
          clientTimezone: filled.client.timezone,
          clientCountry: filled.client.country,
          preferredLanguage: 'en',
          serviceSlug: filled.serviceSlug,
          serviceName: filled.serviceName,
          sessionMode: filled.sessionMode,
          durationMinutes: filled.durationMinutes,
          startTime: filled.startIso,
          endTime: filled.endIso,
          status: 'pending-review',
          source: 'manual',
          clientNotes: filled.notes || undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setStep2({ booking, draft: draftData.draft });
        setCurrentStep(2);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load draft');
      }
    },
    [headers, providerLoc, onCreated, onClose],
  );

  // ─── Handler: Step 2 Confirm & Send ────────────────────────
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

  // ─── Handler: Step 2 Skip & Send Later ─────────────────────
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

  // ─── Render ────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-end sm:items-start justify-center sm:p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-3xl bg-white sm:rounded-2xl shadow-2xl flex flex-col h-[100dvh] sm:h-auto sm:my-4 sm:max-h-[calc(100dvh-2rem)]">
              {/* ── Grab handle (mobile) ── */}
              <div className="sm:hidden flex justify-center pt-2.5 pb-0.5">
                <div className="w-10 h-1 rounded-full bg-[#E0DBD4]" />
              </div>

              {/* ── Header ── */}
              <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-[#F0ECE8] sm:rounded-t-2xl">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {currentStep === 2 && (
                    <button
                      onClick={() => setCurrentStep(1)}
                      disabled={submitting}
                      className="p-2 -ml-1 rounded-xl hover:bg-[#F5F0EB] text-[#8E8E9F] hover:text-[#4A4A5C] transition-colors active:scale-95"
                      aria-label="Back"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-[#2D2A33]">
                      {currentStep === 1 ? 'New Booking' : 'Review Invoice'}
                    </h2>
                    {currentStep === 1 ? (
                      <div className="flex items-center gap-1 mt-1.5">
                        {(['service', 'schedule', 'client', 'options'] as const).map(s => {
                          const isActive = s === activeSection;
                          const isComplete =
                            s === 'service' ? !!serviceSlug
                            : s === 'schedule' ? !!selectedSlot
                            : s === 'client' ? !!clientName.trim() && clientEmail.includes('@')
                            : true;
                          return (
                            <div
                              key={s}
                              className={`h-1 rounded-full transition-all duration-300 ${
                                isActive ? 'w-5 bg-[#7A3B5E]'
                                : isComplete ? 'w-1.5 bg-[#7A3B5E]/50'
                                : 'w-1.5 bg-[#E8E4DE]'
                              }`}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-[#8E8E9F] mt-0.5">Step 2 · Confirm pricing and send</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  disabled={submitting}
                  aria-label="Close"
                  className="p-2 rounded-xl hover:bg-[#F5F0EB] text-[#8E8E9F] hover:text-[#4A4A5C] transition-colors active:scale-95 shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ── Scrollable body ── */}
              <div className="px-4 sm:px-6 py-4 space-y-3 overflow-y-auto flex-1 min-h-0 overscroll-contain">
                {/* AI Compose bar — shown only in Step 1 */}
                {currentStep === 1 && (
                  <AIComposeBar password={password} onDraftReady={handleAIDraftReady} />
                )}

                {/* Verification banner — shown after AI fills fields, in both steps */}
                {aiComposeSummary && (
                  <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#FFFBF5] border border-[#C8A97D]/40">
                    <Sparkles className="w-4 h-4 text-[#C8A97D] shrink-0 mt-0.5" />
                    <div className="text-[11px] text-[#4A4A5C] leading-snug flex-1">
                      <span className="font-semibold text-[#7A3B5E]">AI filled {aiComposeSummary.fieldsFilled} fields.</span>{' '}
                      Please verify the date{' '}
                      <span className="font-bold text-[#2D2A33]">{aiComposeSummary.resolvedDateLabel}</span>
                      {' '}and client email{' '}
                      <span className="font-mono text-[#2D2A33]">{aiComposeSummary.clientEmail}</span>
                      {aiComposeSummary.isNewClient && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-[#C8A97D]/15 text-[#7A3B5E] text-[9px] uppercase tracking-wide font-semibold">
                          new client
                        </span>
                      )}
                      {' '}before confirming.
                    </div>
                  </div>
                )}

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
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
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
                      onSent={() => {}}
                      onConfirm={handleConfirmSend}
                      onConfirmLabel="Confirm & Send"
                      onSecondaryAction={{
                        label: 'Skip & Send Later',
                        handler: handleSkipForLater,
                      }}
                    />
                  )
                )}

                {/* Error toast */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="flex-1 text-[13px] leading-snug">{error}</span>
                      <button
                        onClick={() => setError(null)}
                        className="shrink-0 p-0.5 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Footer CTA (Step 1 only) ── */}
              {currentStep === 1 && (
                <div
                  className="shrink-0 px-4 sm:px-6 py-3 bg-white border-t border-[#F0ECE8] sm:rounded-b-2xl flex gap-2"
                  style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
                >
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={submitting}
                    className="px-5 py-3 rounded-xl bg-[#F5F0EB] text-sm font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] active:scale-[0.97] transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleStep1Next}
                    disabled={submitting || !selectedSlot || !clientName || !clientEmail}
                    className="flex-1 py-3 rounded-xl bg-[#7A3B5E] text-sm font-semibold text-white hover:bg-[#6A2E4E] active:scale-[0.97] transition-all disabled:opacity-40 inline-flex items-center justify-center gap-2 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        {isFreeSession ? 'Create & Confirm' : 'Review Invoice'}
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

// ─── Wizard Section ────────────────────────────────────────────

function WizardSection({
  number,
  title,
  active,
  completed,
  summary,
  onToggle,
  children,
}: {
  number: number;
  title: string;
  active: boolean;
  completed: boolean;
  summary: string;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && ref.current) {
      const t = setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 200);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <div ref={ref} className="rounded-2xl border border-[#F0ECE8] overflow-hidden bg-white transition-shadow data-[active=true]:shadow-sm" data-active={active}>
      {/* Header — always visible */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${
          active ? 'bg-white' : completed ? 'bg-[#FAFAF8] hover:bg-[#F5F2EE]' : 'bg-[#FAF7F2] hover:bg-[#F5F0EB]'
        }`}
      >
        {/* Number / check circle */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-all ${
          active
            ? 'bg-[#7A3B5E] text-white shadow-sm'
            : completed
            ? 'bg-[#3B8A6E] text-white'
            : 'bg-[#F0ECE8] text-[#8E8E9F]'
        }`}>
          {completed && !active ? <Check className="w-4 h-4" /> : number}
        </div>
        {/* Title + collapsed summary */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold transition-colors ${active ? 'text-[#2D2A33]' : 'text-[#4A4A5C]'}`}>
            {title}
          </p>
          {!active && completed && summary && (
            <p className="text-xs text-[#8E8E9F] truncate mt-0.5">{summary}</p>
          )}
        </div>
        {/* Chevron */}
        <ChevronDown className={`w-4 h-4 text-[#8E8E9F] transition-transform duration-200 shrink-0 ${
          active ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Content */}
      {active && (
        <div className="px-4 pb-4 pt-2 border-t border-[#F0ECE8]">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Step 1 Content ────────────────────────────────────────────

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
  activeSection: SectionKey;
  setActiveSection: (v: SectionKey) => void;
}

function Step1Content(props: Step1Props) {
  const providerTz = props.providerLoc?.timezone ?? 'America/Toronto';

  // Section completion
  const sectionComplete = {
    service: !!props.serviceSlug,
    schedule: !!props.selectedSlot,
    client: !!props.clientName.trim() && props.clientEmail.includes('@'),
    options: true,
  };

  // Section summaries (shown when collapsed)
  const sectionSummary = {
    service: props.selectedService
      ? `${props.selectedService.name} · ${props.duration}min · ${props.sessionMode === 'online' ? 'Online' : 'In-Person'}`
      : '',
    schedule: props.selectedSlot
      ? `${formatSlotDateInTz(props.selectedSlot.start, providerTz)} · ${formatSlotInTz(props.selectedSlot.start, providerTz)}`
      : '',
    client: props.clientName.trim()
      ? `${props.clientName.trim()}${props.clientEmail.trim() ? ' · ' + props.clientEmail.trim() : ''}`
      : '',
    options: props.isRecurring
      ? `Recurring · ${props.recurringFrequency} · ${props.recurringCount} sessions`
      : 'Single session',
  };

  // Auto-advance: service → schedule
  const handleServicePick = (slug: string) => {
    props.setServiceSlug(slug);
    setTimeout(() => props.setActiveSection('schedule'), 350);
  };

  // Auto-advance: slot → client
  const handleSlotPick = (slot: TimeSlot | null) => {
    props.setSelectedSlot(slot);
    if (slot) setTimeout(() => props.setActiveSection('client'), 350);
  };

  // Date pick (no auto-advance — user still needs to pick a slot)
  const handleDatePick = (date: string) => {
    props.setSelectedDate(date);
    props.setSelectedSlot(null);
  };

  return (
    <>
      {/* Provider location context */}
      {props.providerLoc && (
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFFAF5] to-[#F5F0EB] border border-[#C8A97D]/20">
          <MapPin className="w-4 h-4 text-[#C8A97D] shrink-0" />
          <p className="text-xs text-[#4A4A5C]">
            Dr. Hala is in{' '}
            <strong className="text-[#7A3B5E]">{props.providerLoc.locationLabel}</strong>
            {props.providerLoc.source !== 'default' && (
              <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-[#3B8A6E]/10 text-[#3B8A6E] font-semibold uppercase tracking-wide">
                {props.providerLoc.source}
              </span>
            )}
          </p>
        </div>
      )}

      {/* § 1 — Service & Mode */}
      <WizardSection
        number={1}
        title="Service & Mode"
        active={props.activeSection === 'service'}
        completed={sectionComplete.service}
        summary={sectionSummary.service}
        onToggle={() => props.setActiveSection('service')}
      >
        <div className="space-y-4">
          <ServicePicker
            selected={props.serviceSlug}
            onSelect={handleServicePick}
            duration={props.duration}
            isFree={props.isFreeSession}
          />
          {/* Session mode toggle */}
          <div>
            <label className="block text-xs font-semibold text-[#4A4A5C] mb-2">Session Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => props.setSessionMode('online')}
                className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] ${
                  props.sessionMode === 'online'
                    ? 'bg-[#7A3B5E] text-white shadow-sm'
                    : 'bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF]'
                }`}
              >
                <Video className="w-4 h-4" />
                Online
              </button>
              <button
                type="button"
                onClick={() => props.setSessionMode('inPerson')}
                className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] ${
                  props.sessionMode === 'inPerson'
                    ? 'bg-[#7A3B5E] text-white shadow-sm'
                    : 'bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                In-Person
              </button>
            </div>
          </div>
        </div>
      </WizardSection>

      {/* § 2 — Date & Time */}
      <WizardSection
        number={2}
        title="Date & Time"
        active={props.activeSection === 'schedule'}
        completed={sectionComplete.schedule}
        summary={sectionSummary.schedule}
        onToggle={() => props.setActiveSection('schedule')}
      >
        <AvailabilityCalendar
          currentMonth={props.currentMonth}
          onMonthChange={props.setCurrentMonth}
          monthAvailability={props.monthAvailability}
          monthLoading={props.monthLoading}
          selectedDate={props.selectedDate}
          onDateSelect={handleDatePick}
          daySlots={props.daySlots}
          daySlotsLoading={props.daySlotsLoading}
          selectedSlot={props.selectedSlot}
          onSlotSelect={handleSlotPick}
          providerTz={providerTz}
          clientTz={props.clientTimezone}
        />
      </WizardSection>

      {/* § 3 — Client Details */}
      <WizardSection
        number={3}
        title="Client Details"
        active={props.activeSection === 'client'}
        completed={sectionComplete.client}
        summary={sectionSummary.client}
        onToggle={() => props.setActiveSection('client')}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">
              <User className="inline w-3 h-3 mr-1" />
              Client name
            </label>
            <input
              type="text"
              value={props.clientName}
              onChange={e => props.setClientName(e.target.value)}
              placeholder="Full name"
              className="w-full h-12 px-4 rounded-xl border border-[#E8E4DE] text-base text-[#2D2A33] placeholder:text-[#C4C0BC] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#7A3B5E]/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">Client email</label>
            <input
              type="email"
              value={props.clientEmail}
              onChange={e => props.setClientEmail(e.target.value)}
              placeholder="client@example.com"
              className="w-full h-12 px-4 rounded-xl border border-[#E8E4DE] text-base text-[#2D2A33] placeholder:text-[#C4C0BC] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#7A3B5E]/30 transition-colors"
            />
          </div>
          {/* Country — searchable picker with auto-fill */}
          <CountryPicker
            value={props.clientCountry}
            onChange={(code) => {
              props.setClientCountry(code);
              const country = COUNTRIES_BY_CODE[code];
              if (country) {
                const currentPhone = props.clientPhone.trim();
                if (!currentPhone || /^\+\d{0,4}$/.test(currentPhone)) {
                  props.setClientPhone(country.dial + ' ');
                }
                if (country.timezones.length > 0) {
                  props.setClientTimezone(country.timezones[0]);
                }
              }
            }}
          />
          {/* Phone + Timezone side by side (phone auto-filled from country above) */}
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
                className="w-full h-12 px-4 rounded-xl border border-[#E8E4DE] text-base text-[#2D2A33] placeholder:text-[#C4C0BC] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#7A3B5E]/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">
                <Globe className="inline w-3 h-3 mr-1" />
                Client timezone
              </label>
              <select
                value={props.clientTimezone}
                onChange={e => props.setClientTimezone(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-[#E8E4DE] text-base text-[#2D2A33] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 bg-white transition-colors"
              >
                {(() => {
                  const countryTzs = COUNTRIES_BY_CODE[props.clientCountry]?.timezones ?? [];
                  const all = [...new Set([...countryTzs, ...TIMEZONES])];
                  if (props.clientTimezone && !all.includes(props.clientTimezone)) {
                    all.unshift(props.clientTimezone);
                  }
                  return all.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ));
                })()}
              </select>
            </div>
          </div>
        </div>
      </WizardSection>

      {/* § 4 — Session Options */}
      <WizardSection
        number={4}
        title="Session Options"
        active={props.activeSection === 'options'}
        completed={sectionComplete.options}
        summary={sectionSummary.options}
        onToggle={() => props.setActiveSection('options')}
      >
        <div className="space-y-4">
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
            providerTz={providerTz}
          />
          <div>
            <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">
              Notes <span className="text-[#C4C0BC] font-normal">(optional, for Dr. Hala)</span>
            </label>
            <textarea
              value={props.notes}
              onChange={e => props.setNotes(e.target.value)}
              rows={3}
              placeholder="Anything Dr. Hala should know before the session..."
              className="w-full px-4 py-3 rounded-xl border border-[#E8E4DE] text-base text-[#2D2A33] placeholder:text-[#C4C0BC] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#7A3B5E]/30 resize-none transition-colors"
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={props.sendClientEmail}
              onChange={e => props.setSendClientEmail(e.target.checked)}
              className="w-5 h-5 accent-[#7A3B5E] rounded"
            />
            <span className="text-sm text-[#4A4A5C]">
              Send confirmation email to client
            </span>
          </label>
        </div>
      </WizardSection>
    </>
  );
}

// ─── Service Picker ────────────────────────────────────────────

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
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(() => {
    const svc = services.find(s => s.slug === selected);
    if (svc?.slug === 'initial-consultation' || svc?.slug === 'online-phone-consultation') return null;
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
    <div className="space-y-3">
      {/* Duration / price hint */}
      <div className="flex items-center gap-2 text-xs text-[#8E8E9F]">
        <Clock className="w-3.5 h-3.5" />
        <span>{duration} min · {isFree ? 'Free consultation' : 'Paid session (invoice in Step 2)'}</span>
      </div>

      {/* Featured services — prominent cards */}
      <div className="space-y-2">
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
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all active:scale-[0.98] ${
                active
                  ? 'border-[#7A3B5E] bg-gradient-to-r from-[#FFFAF5] to-[#FDF6ED] shadow-sm'
                  : 'border-[#F0ECE8] bg-white hover:border-[#C8A97D]/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  active ? 'bg-[#7A3B5E] text-white' : 'bg-[#F5F0EB] text-[#7A3B5E]'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#2D2A33]">{s.name}</p>
                    <Sparkles className="w-3.5 h-3.5 text-[#C8A97D] shrink-0" />
                  </div>
                  <p className="text-xs text-[#8E8E9F] mt-0.5">
                    {dur} min · {free ? 'Free' : `from CA$${s.priceFrom}`}
                  </p>
                </div>
                {active && (
                  <div className="w-6 h-6 rounded-full bg-[#7A3B5E] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Category chips — horizontal scroll */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {serviceCategories.map(cat => {
          const list = categorized.get(cat.key) ?? [];
          if (list.length === 0) return null;
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(isActive ? null : cat.key)}
              className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-[#7A3B5E] text-white shadow-sm'
                  : 'bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Category service list */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-1.5"
          >
            {(categorized.get(activeCategory) ?? []).map(s => {
              const active = selected === s.slug;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => onSelect(s.slug)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all active:scale-[0.98] ${
                    active
                      ? 'border-[#7A3B5E] bg-[#FFFAF5] shadow-sm'
                      : 'border-[#F0ECE8] bg-white hover:border-[#C8A97D]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#2D2A33]">{s.name}</p>
                      <p className="text-xs text-[#8E8E9F] mt-0.5">{s.duration} · from CA${s.priceFrom}</p>
                    </div>
                    {active && (
                      <div className="w-5 h-5 rounded-full bg-[#7A3B5E] flex items-center justify-center shrink-0 ml-2">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Availability Calendar ─────────────────────────────────────

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

  // Group available slots by morning/afternoon
  const morningSlots = available.filter(s => isSlotMorning(s.start, providerTz));
  const afternoonSlots = available.filter(s => !isSlotMorning(s.start, providerTz));

  return (
    <div className="space-y-3">
      {/* Calendar card */}
      <div className="rounded-xl border border-[#F0ECE8] bg-[#FAF7F2] overflow-hidden">
        {/* Month header */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-white border-b border-[#F0ECE8]">
          <button
            type="button"
            onClick={() => onMonthChange(shiftMonth(currentMonth, -1))}
            className="p-2 rounded-xl hover:bg-[#F5F0EB] text-[#8E8E9F] active:scale-95 transition-all"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#7A3B5E]" />
            <span className="text-sm font-bold text-[#2D2A33]">{formatMonthLabel(currentMonth)}</span>
            {monthLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8E8E9F]" />}
          </div>
          <button
            type="button"
            onClick={() => onMonthChange(shiftMonth(currentMonth, 1))}
            className="p-2 rounded-xl hover:bg-[#F5F0EB] text-[#8E8E9F] active:scale-95 transition-all"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 bg-white">
          {WEEKDAY_LABELS.map(w => (
            <div key={w} className="text-center py-2 text-[11px] font-semibold text-[#8E8E9F]">
              {w}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-px bg-[#F0ECE8] border-t border-[#F0ECE8]">
          {cells.map((cell, i) => {
            if (!cell) {
              return <div key={`empty-${i}`} className="bg-white min-h-[44px]" />;
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
                className={`bg-white min-h-[44px] flex flex-col items-center justify-center text-sm transition-all relative active:scale-95 ${
                  isPast
                    ? 'text-[#D8D2C8] cursor-not-allowed'
                    : isSelected
                    ? 'bg-[#7A3B5E] text-white font-bold'
                    : isBlocked
                    ? 'bg-red-50 text-red-400 cursor-not-allowed'
                    : hasSlots
                    ? 'hover:bg-[#F5F0EB] text-[#2D2A33] font-medium'
                    : 'text-[#C4C0BC] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>{dayNum}</span>
                {!isPast && !isSelected && hasSlots && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B8A6E] absolute bottom-1" />
                )}
                {!isPast && isBlocked && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots (shown when date selected) */}
      {selectedDate && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#4A4A5C]">
              <Clock className="inline w-3.5 h-3.5 mr-1 text-[#C8A97D]" />
              Available times
            </p>
            {daySlotsLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8E8E9F]" />}
          </div>

          {available.length === 0 && !daySlotsLoading && (
            <p className="text-sm text-[#8E8E9F] py-3 text-center">No available times on this day.</p>
          )}

          {/* Morning slots */}
          {morningSlots.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-[#8E8E9F] uppercase tracking-wider mb-2">Morning</p>
              <div className="grid grid-cols-3 gap-2">
                {morningSlots.map(s => {
                  const active = selectedSlot?.start === s.start;
                  return (
                    <button
                      key={s.start}
                      type="button"
                      onClick={() => onSlotSelect(s)}
                      title={`Client sees: ${formatSlotInTz(s.start, clientTz)} (${clientTz})`}
                      className={`py-2.5 rounded-xl text-sm font-mono font-semibold transition-all active:scale-95 ${
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
            </div>
          )}

          {/* Afternoon slots */}
          {afternoonSlots.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-[#8E8E9F] uppercase tracking-wider mb-2">Afternoon</p>
              <div className="grid grid-cols-3 gap-2">
                {afternoonSlots.map(s => {
                  const active = selectedSlot?.start === s.start;
                  return (
                    <button
                      key={s.start}
                      type="button"
                      onClick={() => onSlotSelect(s)}
                      title={`Client sees: ${formatSlotInTz(s.start, clientTz)} (${clientTz})`}
                      className={`py-2.5 rounded-xl text-sm font-mono font-semibold transition-all active:scale-95 ${
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
            </div>
          )}

          {/* Busy slots (overridable) */}
          {busy.length > 0 && (
            <details className="text-xs text-[#8E8E9F]">
              <summary className="cursor-pointer hover:text-[#4A4A5C] py-1">
                {busy.length} busy/buffered slot{busy.length === 1 ? '' : 's'} (tap to override)
              </summary>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {busy.map(s => (
                  <button
                    key={s.start}
                    type="button"
                    onClick={() => onSlotSelect({ ...s, available: true })}
                    className="py-2 rounded-xl font-mono text-xs bg-[#FFF4F0] text-[#C45B5B] border border-red-100 hover:bg-red-50 active:scale-95 transition-all"
                    title={`${s.reason} — tap to force-book`}
                  >
                    {formatSlotInTz(s.start, providerTz)}
                  </button>
                ))}
              </div>
            </details>
          )}

          {/* Selected slot confirmation */}
          {selectedSlot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3.5 rounded-xl bg-gradient-to-r from-[#F0FAF5] to-[#FAF7F2] border border-[#3B8A6E]/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#3B8A6E] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#3B8A6E]">
                    {formatSlotDateInTz(selectedSlot.start, providerTz)} · {formatSlotInTz(selectedSlot.start, providerTz)}
                  </p>
                  {clientTz !== providerTz && (
                    <p className="text-xs text-[#8E8E9F] mt-0.5">
                      Client: {formatSlotInTz(selectedSlot.start, clientTz)} ({clientTz.split('/')[1]?.replace('_', ' ')})
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Recurring Section ─────────────────────────────────────────

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
      {/* Toggle header */}
      <label className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#F0ECE8] cursor-pointer">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={e => setIsRecurring(e.target.checked)}
          className="w-5 h-5 accent-[#7A3B5E] rounded"
        />
        <RefreshCw className="w-4 h-4 text-[#C8A97D]" />
        <span className="text-sm font-semibold text-[#2D2A33]">Make this recurring</span>
      </label>

      {isRecurring && (
        <div className="px-4 py-3.5 space-y-3">
          {/* Frequency + count + invoice mode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#4A4A5C] mb-1.5 uppercase tracking-wider">Frequency</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['weekly', 'biweekly'] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`px-2 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
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
              <label className="block text-[11px] font-semibold text-[#4A4A5C] mb-1.5 uppercase tracking-wider">Sessions</label>
              <input
                type="number"
                min={1}
                max={12}
                value={count}
                onChange={e => setCount(Math.max(1, Math.min(12, parseInt(e.target.value, 10) || 1)))}
                className="w-full h-[38px] px-3 rounded-lg border border-[#E8E4DE] text-sm text-center font-semibold bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4A4A5C] mb-1.5 uppercase tracking-wider">Invoice</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['per-session', 'bundled'] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setInvoiceMode(m)}
                    className={`px-2 py-2 rounded-lg text-[11px] font-semibold transition-all active:scale-95 ${
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

          {/* Check availability */}
          <button
            type="button"
            onClick={onCheckSeries}
            disabled={!canCheck || seriesPlanLoading}
            className="w-full px-4 py-2.5 rounded-xl bg-[#FFFAF5] border border-[#C8A97D]/40 text-sm font-semibold text-[#7A3B5E] hover:bg-[#FCF3E8] disabled:opacity-40 transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2"
          >
            {seriesPlanLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {canCheck ? 'Check availability for all sessions' : 'Pick a first slot above first'}
          </button>

          {/* Series plan results */}
          {seriesPlan && (
            <div className="space-y-1.5">
              {seriesPlan.map(slot => {
                const effective = seriesOverrides.get(slot.index);
                const isSkipped = seriesSkips.has(slot.index);
                const statusColor = isSkipped
                  ? 'bg-gray-50 text-gray-400 border-gray-200'
                  : slot.status === 'available'
                  ? 'bg-[#F0FAF5] text-[#3B8A6E] border-[#3B8A6E]/20'
                  : slot.status === 'conflict'
                  ? 'bg-[#FFFAF5] text-[#C8A97D] border-[#C8A97D]/40'
                  : 'bg-red-50 text-red-600 border-red-200';
                const displayStart = effective?.startTime ?? slot.startTime;

                return (
                  <div key={slot.index} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs ${statusColor} ${isSkipped ? 'line-through opacity-60' : ''}`}>
                    <span className="font-bold w-7 shrink-0">#{slot.index}</span>
                    <span className="flex-1 min-w-0 font-mono truncate text-[13px]">
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
                        className="bg-white text-xs border border-[#E8E4DE] rounded-lg px-2 py-1 max-w-[120px]"
                      >
                        <option value="">Alt...</option>
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
                      className="text-xs px-2 py-1 rounded-lg hover:bg-white/60 font-semibold shrink-0 active:scale-95"
                    >
                      {isSkipped ? 'Include' : 'Skip'}
                    </button>
                  </div>
                );
              })}
              {seriesPlan.some(s => s.status !== 'available' && !seriesSkips.has(s.index) && !seriesOverrides.has(s.index)) && (
                <p className="text-xs text-[#C8A97D] px-1 pt-1">
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

// ─── Country Picker (searchable) ───────────────────────────────

function CountryPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRIES_BY_CODE[value];

  const filtered = useMemo(() => {
    if (!query.trim()) return COUNTRIES;
    const q = query.toLowerCase();
    return COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.nameAr.includes(q) ||
      c.dial.includes(q)
    );
  }, [query]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Focus search when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery('');
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-xs font-semibold text-[#4A4A5C] mb-1.5">Country</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-12 px-4 rounded-xl border text-base text-left flex items-center gap-2 transition-colors bg-white ${
          open ? 'border-[#7A3B5E]/30 ring-2 ring-[#7A3B5E]/20' : 'border-[#E8E4DE]'
        }`}
      >
        <span className="text-lg leading-none">{selected?.flag}</span>
        <span className="flex-1 truncate text-[#2D2A33]">{selected?.name ?? value}</span>
        <span className="text-xs text-[#8E8E9F]">{value}</span>
        <ChevronDown className={`w-4 h-4 text-[#8E8E9F] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-white rounded-xl border border-[#E8E4DE] shadow-xl max-h-[280px] flex flex-col overflow-hidden">
          <div className="px-3 py-2 border-b border-[#F0ECE8] shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8E8E9F]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search country..."
                className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#FAF7F2] text-sm focus:outline-none placeholder:text-[#C4C0BC]"
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 overscroll-contain">
            {filtered.length === 0 && (
              <p className="text-sm text-[#8E8E9F] text-center py-4">No countries match</p>
            )}
            {filtered.map(c => (
              <button
                key={c.code}
                type="button"
                onClick={() => { onChange(c.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors active:scale-[0.98] ${
                  value === c.code
                    ? 'bg-[#7A3B5E]/5 text-[#7A3B5E] font-semibold'
                    : 'text-[#2D2A33] hover:bg-[#FAF7F2]'
                }`}
              >
                <span className="text-base leading-none">{c.flag}</span>
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-xs text-[#8E8E9F] shrink-0">{c.dial}</span>
                {value === c.code && <Check className="w-4 h-4 text-[#7A3B5E] shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
