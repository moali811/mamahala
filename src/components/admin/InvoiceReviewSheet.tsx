'use client';

/* ================================================================
   InvoiceReviewSheet — slide-up bottom sheet for reviewing and
   editing an invoice before sending. Opened from BookingsModule
   after approving a booking.

   Editable: client name/email/country, service, pricing controls,
   subject, Stripe payment link. Country normalization + live band
   preview ensures the admin always sees the exact pricing math
   before clicking Send.
   ================================================================ */

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Send, Loader2, Calendar, Clock, Video, Building2,
  User, Globe, ChevronDown, Eye, AlertCircle, CreditCard,
  Mail, Tag, DollarSign,
} from 'lucide-react';
import { services, serviceCategories } from '@/data/services';
import {
  PACKAGE_CONFIG,
  COMPLEXITY_CONFIG,
} from '@/lib/invoicing/types';
import type {
  InvoiceDraft,
  InvoiceRateBreakdown,
  InvoiceSettings,
  ComplexityPreset,
  PackageKey,
} from '@/lib/invoicing/types';
import { computeRateBreakdown } from '@/lib/invoicing/rate-breakdown';
import { Section, Field, BreakdownCard, inputClass } from './invoice-shared';
import type { Booking } from '@/lib/booking/types';
import { COUNTRIES, toISO2, COUNTRIES_BY_CODE } from '@/config/countries';
import { getBandForCountry, BAND_MULTIPLIERS, getCurrencyForCountry } from '@/config/pricing';

interface InvoiceReviewSheetProps {
  open: boolean;
  booking: Booking;
  draft: InvoiceDraft;
  password: string;
  onClose: () => void;
  /**
   * Fired after a successful send via /api/admin/invoices/create.
   * In `inline` mode this is only called when `onConfirm` is NOT
   * provided — see `onConfirm` below.
   */
  onSent: (invoiceNumber: string) => void;
  /**
   * Rendering mode:
   * - `sheet` (default) — slide-up bottom sheet with backdrop.
   * - `inline` — render contents in-place with no wrapper/backdrop.
   *   Used by NewBookingModal Step 2 to embed the review UI.
   */
  mode?: 'sheet' | 'inline';
  /**
   * Only relevant in `inline` mode. When provided, the primary
   * footer button calls this instead of `/api/admin/invoices/create`.
   * The latest draft is auto-saved via `/api/admin/invoices/drafts`
   * before `onConfirm` fires so the parent can trigger downstream
   * work (e.g. `/api/admin/booking/[id]/confirm-and-send`) against
   * the fresh KV state. `onSent` is NOT called in this flow.
   */
  onConfirm?: (draft: InvoiceDraft) => Promise<void> | void;
  /** Override the primary footer button label (default: "Send Invoice"). */
  onConfirmLabel?: string;
  /**
   * Optional secondary action — rendered as a muted button next to
   * the confirm button. Used by NewBookingModal for "Skip & Send Later".
   */
  onSecondaryAction?: {
    label: string;
    handler: (draft: InvoiceDraft) => Promise<void> | void;
  };
}

export default function InvoiceReviewSheet({
  open,
  booking,
  draft: initialDraft,
  password,
  onClose,
  onSent,
  mode = 'sheet',
  onConfirm,
  onConfirmLabel,
  onSecondaryAction,
}: InvoiceReviewSheetProps) {
  // Normalize the initial country to ISO-2 so the dropdown pre-selects
  // correctly even when the booking stored a raw display name. Also
  // force allowETransfer to true for Canadian clients — this is a
  // defense-in-depth assignment; booking-intake also sets it, but
  // legacy drafts may have been saved with the old default.
  const [localDraft, setLocalDraft] = useState<InvoiceDraft>(() => {
    const countryIso = toISO2(initialDraft.client.country);
    return {
      ...initialDraft,
      client: { ...initialDraft.client, country: countryIso },
      allowETransfer: countryIso === 'CA' ? true : initialDraft.allowETransfer,
    };
  });
  const [settings, setSettings] = useState<InvoiceSettings | null>(null);
  const [sending, setSending] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmSend, setConfirmSend] = useState(false);
  // Expand client-details section by default if the booking came in with
  // an unresolved country — signals "please fix this before sending".
  const [clientExpanded, setClientExpanded] = useState(
    !initialDraft.client.country ||
      toISO2(initialDraft.client.country) !== initialDraft.client.country.toUpperCase(),
  );

  const headers = useMemo(() => ({
    Authorization: `Bearer ${password}`,
    'Content-Type': 'application/json',
  }), [password]);

  // Fetch settings on mount
  useEffect(() => {
    if (!open) return;
    fetch('/api/admin/invoices/settings', { headers })
      .then(r => r.json())
      .then(d => { if (d.settings) setSettings(d.settings); })
      .catch(() => {});
  }, [open, headers]);

  // When initialDraft changes, decide whether to fully reset (different draft
  // id — admin navigated to a new invoice) or merge-in client fields only
  // (same draft, Step-1 client sync from NewBookingModal — must preserve any
  // pricing/line-item/payment-link edits already made in this sheet).
  const lastDraftIdRef = useRef<string>(initialDraft.draftId);
  useEffect(() => {
    const countryIso = toISO2(initialDraft.client.country);
    if (lastDraftIdRef.current !== initialDraft.draftId) {
      lastDraftIdRef.current = initialDraft.draftId;
      setLocalDraft({
        ...initialDraft,
        client: { ...initialDraft.client, country: countryIso },
        allowETransfer: countryIso === 'CA' ? true : initialDraft.allowETransfer,
      });
      setError(null);
      setConfirmSend(false);
      setPreviewUrl(null);
      return;
    }
    setLocalDraft(prev => ({
      ...prev,
      client: { ...initialDraft.client, country: countryIso },
      allowETransfer: countryIso === 'CA' ? true : prev.allowETransfer,
    }));
  }, [initialDraft]);

  // When the admin flips the country to CA mid-review, force-enable
  // e-Transfer. This keeps the UI and KV state consistent with the
  // locked-for-CA rule without surprising the admin.
  useEffect(() => {
    const countryIso = localDraft.client.country?.toUpperCase();
    if (countryIso === 'CA' && !localDraft.allowETransfer) {
      setLocalDraft(prev => ({ ...prev, allowETransfer: true }));
    }
  }, [localDraft.client.country, localDraft.allowETransfer]);

  // Compute breakdown
  const breakdown = useMemo<InvoiceRateBreakdown | null>(() => {
    if (!settings || !localDraft.serviceSlug) return null;
    return computeRateBreakdown(localDraft, settings);
  }, [localDraft, settings]);

  // Pricing band preview — shows what the country → band → multiplier → currency
  // chain resolves to. Helps the admin verify the right price is being billed.
  const bandPreview = useMemo(() => {
    const country = localDraft.client.country?.toUpperCase() || 'CA';
    const band = getBandForCountry(country);
    const multiplier = BAND_MULTIPLIERS[band];
    const currency = localDraft.displayCurrency || getCurrencyForCountry(country);
    const countryInfo = COUNTRIES_BY_CODE[country];
    return {
      country,
      countryName: countryInfo?.name ?? country,
      flag: countryInfo?.flag ?? '🌐',
      band,
      multiplier,
      currency,
    };
  }, [localDraft.client.country, localDraft.displayCurrency]);

  const updateDraft = (updates: Partial<InvoiceDraft>) => {
    setLocalDraft(prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }));
  };

  const updateClient = (patch: Partial<InvoiceDraft['client']>) => {
    setLocalDraft(prev => ({
      ...prev,
      client: { ...prev.client, ...patch },
      updatedAt: new Date().toISOString(),
    }));
  };

  const serviceName = booking.serviceName || booking.serviceSlug?.replace(/-/g, ' ') || '';
  const dateStr = new Date(booking.startTime).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
  const timeStr = new Date(booking.startTime).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit',
  });

  // Save the current draft to KV. Used by inline mode before firing
  // onConfirm so the parent's downstream endpoint reads the fresh state.
  const persistDraft = async () => {
    const res = await fetch('/api/admin/invoices/drafts', {
      method: 'POST',
      headers,
      body: JSON.stringify({ draft: localDraft }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to save draft');
    }
  };

  // Send invoice
  const handleSend = async () => {
    setSending(true);
    setError(null);
    try {
      // Inline mode: parent controls the send via onConfirm. Save the
      // latest draft first so the parent's endpoint reads fresh KV
      // state, then hand off.
      if (mode === 'inline' && onConfirm) {
        await persistDraft();
        await onConfirm(localDraft);
        return;
      }

      // Sheet mode (legacy): call /api/admin/invoices/create directly.
      const res = await fetch('/api/admin/invoices/create', {
        method: 'POST',
        headers,
        body: JSON.stringify({ draft: localDraft }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      // Assemble the success note: email issue + stripe warning.
      const notes: string[] = [];
      if (data.emailError) notes.push(`email: ${data.emailError}`);
      if (data.stripeWarning) notes.push(`stripe: ${data.stripeWarning}`);
      const note = notes.length ? ` (${notes.join(' · ')})` : '';
      onSent(`${data.invoice?.invoiceNumber || ''}${note}`);
    } catch (err: any) {
      setError(err.message || 'Failed to send invoice');
    } finally {
      setSending(false);
      setConfirmSend(false);
    }
  };

  // Secondary action (inline mode only): "Skip & Send Later"
  const handleSecondaryAction = async () => {
    if (!onSecondaryAction) return;
    setSending(true);
    setError(null);
    try {
      await persistDraft();
      await onSecondaryAction.handler(localDraft);
    } catch (err: any) {
      setError(err.message || onSecondaryAction.label + ' failed');
    } finally {
      setSending(false);
    }
  };

  // Preview PDF
  const handlePreview = async () => {
    try {
      const res = await fetch('/api/admin/invoices/preview-pdf', {
        method: 'POST',
        headers,
        body: JSON.stringify({ draft: localDraft }),
      });
      if (!res.ok) throw new Error('Preview failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch {
      setError('Could not generate preview');
    }
  };

  // Grouped services for dropdown
  const groupedServices = useMemo(() => {
    const groups: { category: string; items: { slug: string; name: string }[] }[] = [];
    serviceCategories.forEach(cat => {
      const items = services
        .filter(s => s.category === cat.key)
        .map(s => ({ slug: s.slug, name: s.name }));
      if (items.length) groups.push({ category: cat.name, items });
    });
    return groups;
  }, []);

  if (!open) return null;

  // ─── Shared body (sticky header + scroll + footer) ─────────
  // The same JSX is rendered inside a Sheet wrapper (mode='sheet')
  // or directly in the parent's flow layout (mode='inline'). The
  // inline variant drops the fixed positioning, backdrop, drag
  // handle, and close-X button.
  const isInline = mode === 'inline';

  const bodyContent = (
    <div
      className={
        isInline
          ? 'flex flex-col w-full bg-[#FAF7F2] rounded-xl border border-[#EDE8DF]'
          : 'fixed inset-x-0 bottom-0 z-50 bg-[#FAF7F2] rounded-t-2xl md:rounded-2xl md:inset-auto md:top-[5vh] md:left-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2 md:bottom-auto md:max-h-[90vh] flex flex-col'
      }
      style={isInline ? undefined : { maxHeight: '90vh' }}
    >
      {/* Drag handle (mobile) — sheet mode only */}
      {!isInline && (
        <div className="flex justify-center pt-2 pb-1 md:hidden">
          <div className="w-10 h-1 rounded-full bg-[#E8E0D8]" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#EDE8DF]">
        <div>
          <h2 className="text-base font-bold text-[#2D2A33]">
            {isInline ? 'Step 2 · Review Invoice' : 'Review Invoice'}
          </h2>
          <p className="text-xs text-[#8E8E9F]">
            {isInline
              ? 'Auto-priced from the booking. Edit anything, then confirm to send.'
              : 'Review and adjust before sending'}
          </p>
        </div>
        {!isInline && (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EDE6DF] transition-colors"
          >
            <X className="w-5 h-5 text-[#8E8E9F]" />
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div
        className={
          isInline
            ? 'overflow-y-auto px-4 py-4 space-y-4 max-h-[60vh]'
            : 'flex-1 overflow-y-auto px-4 py-4 space-y-4'
        }
      >
              {/* Booking context — read-only */}
              <div className="bg-white rounded-xl border border-[#EDE8DF] p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#7A3B5E]/10 flex items-center justify-center shrink-0 text-sm font-bold text-[#7A3B5E]">
                    {booking.clientName?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#2D2A33] text-sm truncate">{booking.clientName}</h3>
                    <p className="text-xs text-[#8E8E9F] truncate">{booking.clientEmail}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#6B6580]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C8A97D]" />
                    {dateStr}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C8A97D]" />
                    {timeStr} ({booking.durationMinutes}m)
                  </div>
                  <div className="flex items-center gap-1.5">
                    {booking.sessionMode === 'online'
                      ? <Video className="w-3.5 h-3.5 text-[#C8A97D]" />
                      : <Building2 className="w-3.5 h-3.5 text-[#C8A97D]" />}
                    {booking.sessionMode === 'online' ? 'Online' : 'In-Person'}
                  </div>
                  {booking.clientCountry && (
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#C8A97D]" />
                      {booking.clientCountry}
                    </div>
                  )}
                </div>
                {/* Due-date readout — shows the anchored session-based
                    date that the PDF/email will carry, so admin can
                    verify before sending. */}
                <div className="mt-3 flex items-center justify-between gap-2 pt-3 border-t border-[#F3EFE8]">
                  <span className="text-[11px] uppercase tracking-wider text-[#8E8E9F] font-semibold">
                    Invoice due
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#7A3B5E] tabular-nums">
                      {new Date(booking.startTime).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: '2-digit' })}
                    </div>
                    <div className="text-[10px] text-[#8E8E9F]">
                      Anchored to the session
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Client details — editable ─────────────────── */}
              <div className="bg-white rounded-xl border border-[#EDE8DF] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setClientExpanded(e => !e)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#FAF7F2] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#7A3B5E]" />
                    <span className="text-sm font-semibold text-[#2D2A33]">Client details</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5F0EB] text-[#8E8E9F] font-mono uppercase">
                      {bandPreview.flag} {bandPreview.country}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8E8E9F] transition-transform ${clientExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
                {clientExpanded && (
                  <div className="px-4 pb-4 space-y-3 border-t border-[#F3EFE8]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                      <Field label="Name">
                        <input
                          value={localDraft.client.name}
                          onChange={e => updateClient({ name: e.target.value })}
                          className={inputClass}
                          placeholder="Full name"
                          dir="auto"
                        />
                      </Field>
                      <Field label="Email">
                        <input
                          type="email"
                          value={localDraft.client.email}
                          onChange={e => updateClient({ email: e.target.value })}
                          className={inputClass}
                          placeholder="client@email.com"
                        />
                      </Field>
                    </div>
                    <Field label="Country (drives pricing band + currency)">
                      <select
                        value={localDraft.client.country.toUpperCase()}
                        onChange={e => updateClient({ country: e.target.value })}
                        className={inputClass}
                      >
                        {COUNTRIES.map(c => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.name} ({c.code})
                          </option>
                        ))}
                      </select>
                    </Field>

                    {/* Pricing band preview — shows the exact pricing engine math */}
                    <div className="mt-2 p-3 rounded-lg bg-gradient-to-r from-[#FFFAF5] to-[#F5F0EB] border border-[#C8A97D]/30">
                      <div className="flex items-start gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#C8A97D] mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0 text-[11px] text-[#4A4A5C] leading-relaxed">
                          <div className="font-semibold text-[#7A3B5E] mb-0.5">
                            Pricing band: <span className="capitalize">{bandPreview.band}</span> ({bandPreview.multiplier.toFixed(2)}×)
                          </div>
                          {breakdown ? (
                            <div className="font-mono text-[10px] text-[#8E8E9F]">
                              {breakdown.formulaLine}
                            </div>
                          ) : (
                            <div className="text-[#8E8E9F]">
                              Select a service to see the full formula
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Service */}
              <Section title="Service" icon={<User className="w-4 h-4" />}>
                <select
                  value={localDraft.serviceSlug}
                  onChange={e => updateDraft({ serviceSlug: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select service...</option>
                  {groupedServices.map(g => (
                    <optgroup key={g.category} label={g.category}>
                      {g.items.map(s => (
                        <option key={s.slug} value={s.slug}>{s.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </Section>

              {/* Pricing Controls */}
              <Section title="Pricing">
                {/* Complexity */}
                <Field label="Complexity">
                  <div className="flex gap-1.5 flex-wrap">
                    {(Object.keys(COMPLEXITY_CONFIG) as ComplexityPreset[]).map(preset => {
                      const cfg = COMPLEXITY_CONFIG[preset];
                      const isActive = localDraft.complexity.preset === preset;
                      return (
                        <button
                          key={preset}
                          onClick={() => updateDraft({
                            complexity: { preset, percent: cfg.percent },
                          })}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
                            isActive
                              ? 'bg-[#7A3B5E] text-white'
                              : 'bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF]'
                          }`}
                        >
                          {cfg.labelEn}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* Package */}
                <div className="mt-3">
                  <Field label="Package">
                    <div className="grid grid-cols-4 gap-2">
                      {(Object.keys(PACKAGE_CONFIG) as PackageKey[]).map(pk => {
                        const cfg = PACKAGE_CONFIG[pk];
                        const isActive = localDraft.package === pk;
                        return (
                          <button
                            key={pk}
                            onClick={() => updateDraft({ package: pk })}
                            className={`py-2 rounded-lg text-xs font-medium transition-all active:scale-95 ${
                              isActive
                                ? 'bg-[#7A3B5E] text-white'
                                : 'bg-[#F5F0EB] text-[#4A4A5C] hover:bg-[#EDE6DF]'
                            }`}
                          >
                            {cfg.sessions}× {cfg.discount > 0 && <span className="text-[10px] opacity-75">−{Math.round(cfg.discount * 100)}%</span>}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                </div>

                {/* Sliding Scale */}
                <div className="mt-3">
                  <Field label={`Sliding scale: ${Math.round(localDraft.slidingScalePercent * 100)}%`}>
                    <input
                      type="range"
                      min={0}
                      max={40}
                      value={Math.round(localDraft.slidingScalePercent * 100)}
                      onChange={e => updateDraft({ slidingScalePercent: +e.target.value / 100 })}
                      className="w-full accent-[#7A3B5E]"
                    />
                  </Field>
                </div>

                {/* Tax + e-Transfer */}
                <div className="mt-3 flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-[#4A4A5C] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localDraft.taxMode === 'manual-hst'}
                      onChange={e => updateDraft({ taxMode: e.target.checked ? 'manual-hst' : 'none' })}
                      className="w-4 h-4 rounded accent-[#7A3B5E]"
                    />
                    HST (13%)
                  </label>
                  {/* e-Transfer: always on for Canadian clients (locked),
                      manual opt-in for everyone else. */}
                  {localDraft.client.country?.toUpperCase() === 'CA' ? (
                    <label
                      className="flex items-center gap-2 text-xs text-[#4A4A5C] cursor-not-allowed"
                      title="Always on for Canadian clients"
                    >
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="w-4 h-4 rounded accent-[#7A3B5E] cursor-not-allowed"
                      />
                      <span>e-Transfer</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#3B8A6E]/10 text-[#3B8A6E] font-semibold uppercase tracking-wide">
                        CA locked
                      </span>
                    </label>
                  ) : (
                    <label className="flex items-center gap-2 text-xs text-[#4A4A5C] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localDraft.allowETransfer}
                        onChange={e => updateDraft({ allowETransfer: e.target.checked })}
                        className="w-4 h-4 rounded accent-[#7A3B5E]"
                      />
                      e-Transfer
                    </label>
                  )}
                </div>
              </Section>

              {/* Manual price override — bypasses all auto-pricing. Renders
                  inline in Step 2 so the admin can adjust the total without
                  leaving the review sheet. */}
              <Section title="Manual price override (optional)" icon={<DollarSign className="w-4 h-4" />}>
                <label className="flex items-center gap-2 text-sm text-[#4A4A5C] mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localDraft.manualPrice?.enabled ?? false}
                    onChange={e =>
                      updateDraft({
                        manualPrice: e.target.checked
                          ? {
                              enabled: true,
                              perSessionLocal: localDraft.manualPrice?.perSessionLocal ?? 0,
                              currency: localDraft.manualPrice?.currency,
                              reason: localDraft.manualPrice?.reason,
                            }
                          : undefined,
                      })
                    }
                    className="w-4 h-4 accent-[#7A3B5E]"
                  />
                  Override the auto-computed price
                </label>
                {localDraft.manualPrice?.enabled && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Per-session amount">
                        <input
                          type="number"
                          min={0}
                          step={1}
                          value={localDraft.manualPrice.perSessionLocal || ''}
                          onChange={e =>
                            updateDraft({
                              manualPrice: {
                                ...localDraft.manualPrice!,
                                perSessionLocal: Number(e.target.value) || 0,
                              },
                            })
                          }
                          className={inputClass}
                          placeholder="200"
                        />
                      </Field>
                      <Field label="Currency">
                        <input
                          value={localDraft.manualPrice.currency ?? localDraft.displayCurrency ?? 'CAD'}
                          onChange={e =>
                            updateDraft({
                              manualPrice: {
                                ...localDraft.manualPrice!,
                                currency: e.target.value.toUpperCase().slice(0, 3),
                              },
                            })
                          }
                          onBlur={e => {
                            const typos: Record<string, string> = {
                              UAE: 'AED', KSA: 'SAR', UK: 'GBP',
                              USA: 'USD', EU: 'EUR', AUS: 'AUD',
                            };
                            const v = e.target.value.toUpperCase();
                            if (typos[v]) {
                              updateDraft({
                                manualPrice: {
                                  ...localDraft.manualPrice!,
                                  currency: typos[v],
                                },
                              });
                            }
                          }}
                          list="override-currency-options"
                          className={`${inputClass} font-mono uppercase`}
                          placeholder="CAD"
                        />
                        <datalist id="override-currency-options">
                          <option value="CAD" />
                          <option value="USD" />
                          <option value="AED" />
                          <option value="SAR" />
                          <option value="KWD" />
                          <option value="QAR" />
                          <option value="BHD" />
                          <option value="OMR" />
                          <option value="EUR" />
                          <option value="GBP" />
                          <option value="CHF" />
                          <option value="JOD" />
                          <option value="LBP" />
                          <option value="ILS" />
                          <option value="TRY" />
                          <option value="EGP" />
                          <option value="MAD" />
                          <option value="TND" />
                          <option value="DZD" />
                          <option value="LYD" />
                        </datalist>
                      </Field>
                    </div>
                    <Field label="Reason (for audit)">
                      <input
                        value={localDraft.manualPrice.reason ?? ''}
                        onChange={e =>
                          updateDraft({
                            manualPrice: {
                              ...localDraft.manualPrice!,
                              reason: e.target.value,
                            },
                          })
                        }
                        className={inputClass}
                        placeholder="e.g. returning-client rate, bundled discount, special arrangement"
                      />
                    </Field>
                    <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
                      When enabled, this price replaces all auto-pricing (band, complexity, package, sliding scale).
                    </p>
                  </div>
                )}
              </Section>

              {/* Subject */}
              <Section title="Subject / Notes">
                <input
                  type="text"
                  value={localDraft.subject || ''}
                  onChange={e => updateDraft({ subject: e.target.value })}
                  placeholder="e.g. Session: Anxiety Counseling on Apr 20"
                  className={inputClass}
                />
              </Section>

              {/* ─── Stripe Payment Link (optional) ─────────────
                  Used when STRIPE_SECRET_KEY is unavailable: the admin
                  creates a one-time Payment Link in the Stripe dashboard
                  and pastes the URL here. The payment concierge page
                  routes the "Pay with Card" button to this link.
                  Leave empty to rely on dynamic sessions (when available)
                  or fall back to e-Transfer / wire / PayPal only. */}
              <Section title="Card payment link (optional)" icon={<CreditCard className="w-4 h-4" />}>
                <input
                  type="url"
                  value={localDraft.stripePaymentLink ?? ''}
                  onChange={e => updateDraft({ stripePaymentLink: e.target.value.trim() || undefined })}
                  placeholder="https://buy.stripe.com/..."
                  className={inputClass}
                />
                <p className="text-[10px] text-[#8E8E9F] mt-1.5 leading-relaxed">
                  Paste a Stripe Payment Link for this invoice. Overrides the dynamic checkout session
                  if configured. Leave empty to use automatic Stripe sessions (or fall back to e-Transfer
                  / wire / PayPal).
                </p>
              </Section>

              {/* Breakdown */}
              {!settings ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-5 h-5 text-[#C8A97D] animate-spin" />
                </div>
              ) : (
                <BreakdownCard breakdown={breakdown} />
              )}

              {/* Error */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-sm text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {error}
                  <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

      {/* Footer actions — sticky at bottom */}
      <div className="border-t border-[#EDE8DF] bg-white px-4 py-3 space-y-2">
        {confirmSend ? (
          <div className="space-y-2">
            <p className="text-sm text-[#4A4A5C] text-center">
              {isInline
                ? <>Activate booking and send invoice for <strong>{breakdown?.formattedTotal || '...'}</strong> to {booking.clientEmail}?</>
                : <>Send invoice for <strong>{breakdown?.formattedTotal || '...'}</strong> to {booking.clientEmail}?</>
              }
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmSend(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#F5F0EB] text-sm font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors active:scale-[0.97]"
              >
                Go Back
              </button>
              <button
                onClick={handleSend}
                disabled={sending}
                className="flex-1 py-2.5 rounded-xl bg-[#3B8A6E] text-sm font-semibold text-white hover:bg-[#2F7A5E] disabled:opacity-50 transition-colors active:scale-[0.97] flex items-center justify-center gap-2"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {onConfirmLabel ?? 'Confirm & Send'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handlePreview}
              className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-[#F5F0EB] text-sm font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors active:scale-[0.97] flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" /> Preview PDF
            </button>
            {isInline && onSecondaryAction && (
              <button
                onClick={handleSecondaryAction}
                disabled={sending}
                className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-[#FFFAF5] border border-[#C8A97D]/40 text-sm font-semibold text-[#7A3B5E] hover:bg-[#FCF3E8] disabled:opacity-50 transition-colors active:scale-[0.97] flex items-center justify-center gap-2"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {onSecondaryAction.label}
              </button>
            )}
            <button
              onClick={() => setConfirmSend(true)}
              disabled={!breakdown || !localDraft.serviceSlug}
              className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-[#7A3B5E] text-sm font-semibold text-white hover:bg-[#6A2E4E] disabled:opacity-50 transition-colors active:scale-[0.97] flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {onConfirmLabel ?? 'Send Invoice'}
            </button>
          </div>
        )}
      </div>

      {/* PDF Preview overlay */}
      {previewUrl && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end md:items-center justify-center" onClick={() => { URL.revokeObjectURL(previewUrl); setPreviewUrl(null); }}>
          <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-3xl h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#EDE8DF]">
              <h3 className="text-sm font-semibold text-[#2D2A33]">Invoice Preview</h3>
              <button
                onClick={() => { URL.revokeObjectURL(previewUrl); setPreviewUrl(null); }}
                className="p-2 rounded-full hover:bg-[#EDE6DF] transition-colors"
              >
                <X className="w-4 h-4 text-[#8E8E9F]" />
              </button>
            </div>
            <iframe src={previewUrl} className="flex-1 w-full" title="Invoice Preview" />
          </div>
        </div>
      )}
    </div>
  );

  // Inline mode: render body directly, no motion/backdrop.
  if (isInline) {
    return bodyContent;
  }

  // Sheet mode: wrap in AnimatePresence + backdrop + slide-up motion.
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet body (with slide-up animation) */}
          <motion.div
            className="contents"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {bodyContent}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
