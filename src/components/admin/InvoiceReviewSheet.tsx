'use client';

/* ================================================================
   InvoiceReviewSheet — slide-up bottom sheet for reviewing and
   editing an invoice before sending. Opened from BookingsModule
   after approving a booking.
   ================================================================ */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Send, Loader2, Calendar, Clock, Video, Building2,
  User, Globe, ChevronDown, Eye, AlertCircle,
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

interface InvoiceReviewSheetProps {
  open: boolean;
  booking: Booking;
  draft: InvoiceDraft;
  password: string;
  onClose: () => void;
  onSent: (invoiceNumber: string) => void;
}

export default function InvoiceReviewSheet({
  open,
  booking,
  draft: initialDraft,
  password,
  onClose,
  onSent,
}: InvoiceReviewSheetProps) {
  const [localDraft, setLocalDraft] = useState<InvoiceDraft>(initialDraft);
  const [settings, setSettings] = useState<InvoiceSettings | null>(null);
  const [sending, setSending] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmSend, setConfirmSend] = useState(false);

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

  // Reset local draft when initial draft changes
  useEffect(() => {
    setLocalDraft(initialDraft);
    setError(null);
    setConfirmSend(false);
    setPreviewUrl(null);
  }, [initialDraft]);

  // Compute breakdown
  const breakdown = useMemo<InvoiceRateBreakdown | null>(() => {
    if (!settings || !localDraft.serviceSlug) return null;
    return computeRateBreakdown(localDraft, settings);
  }, [localDraft, settings]);

  const updateDraft = (updates: Partial<InvoiceDraft>) => {
    setLocalDraft(prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }));
  };

  const serviceName = booking.serviceName || booking.serviceSlug?.replace(/-/g, ' ') || '';
  const dateStr = new Date(booking.startTime).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
  const timeStr = new Date(booking.startTime).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit',
  });

  // Send invoice
  const handleSend = async () => {
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/invoices/create', {
        method: 'POST',
        headers,
        body: JSON.stringify({ draft: localDraft }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      const emailNote = data.emailError
        ? ` (email issue: ${data.emailError})`
        : '';
      onSent(`${data.invoice?.invoiceNumber || ''}${emailNote}`);
    } catch (err: any) {
      setError(err.message || 'Failed to send invoice');
    } finally {
      setSending(false);
      setConfirmSend(false);
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

          {/* Sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 bg-[#FAF7F2] rounded-t-2xl md:rounded-2xl md:inset-auto md:top-[5vh] md:left-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2 md:bottom-auto md:max-h-[90vh] flex flex-col"
            style={{ maxHeight: '90vh' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Drag handle (mobile) */}
            <div className="flex justify-center pt-2 pb-1 md:hidden">
              <div className="w-10 h-1 rounded-full bg-[#E8E0D8]" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#EDE8DF]">
              <div>
                <h2 className="text-base font-bold text-[#2D2A33]">Review Invoice</h2>
                <p className="text-xs text-[#8E8E9F]">Review and adjust before sending</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#EDE6DF] transition-colors"
              >
                <X className="w-5 h-5 text-[#8E8E9F]" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
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
                  <label className="flex items-center gap-2 text-xs text-[#4A4A5C] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localDraft.allowETransfer}
                      onChange={e => updateDraft({ allowETransfer: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#7A3B5E]"
                    />
                    e-Transfer
                  </label>
                </div>
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
                    Send invoice for <strong>{breakdown?.formattedTotal || '...'}</strong> to {booking.clientEmail}?
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
                      Confirm & Send
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handlePreview}
                    className="flex-1 py-2.5 rounded-xl bg-[#F5F0EB] text-sm font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] transition-colors active:scale-[0.97] flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" /> Preview PDF
                  </button>
                  <button
                    onClick={() => setConfirmSend(true)}
                    disabled={!breakdown || !localDraft.serviceSlug}
                    className="flex-1 py-2.5 rounded-xl bg-[#7A3B5E] text-sm font-semibold text-white hover:bg-[#6A2E4E] disabled:opacity-50 transition-colors active:scale-[0.97] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Invoice
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
