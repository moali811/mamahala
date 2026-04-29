'use client';

/* ================================================================
   GrantAccessModal — admin-initiated unlock for toolkits + programs
   ================================================================
   "Super-creative-and-smart" admin control:

     • Smart compose bar — paste "give anxiety toolkit to sarah@x.com
       as a gift" and the modal pre-fills recipient + resource +
       reason. Pure regex / keyword match — no LLM needed.

     • Recipient autocomplete from the customer roster (last-name +
       email, with last-known country flag for visual recall).

     • Multi-select resource grid — grant several toolkits + one or
       more program levels in a single action.

     • Reason quick-picks (Gift / Comp / Package perk / Beta /
       Make-good / Other) plus an optional internal note for audit.

     • Live preview line — "Sara will receive: Anxiety Recovery
       Journal + Couples Workbook access + welcome email."

   Submit POSTs /api/admin/resources/grant. KV write mirrors the
   Stripe-webhook payload so unlock checks elsewhere are unaffected.
   ================================================================ */

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Loader2, Check, Search, Sparkles, Gift, BookOpen, FileText,
  Mail, Heart, Coffee, Wrench, AlertCircle, Send,
} from 'lucide-react';
import { toolkitCatalog } from '@/data/toolkits';
import { programCatalog } from '@/data/programs';

type GrantReason = 'gift' | 'comp' | 'package-perk' | 'beta' | 'make-good' | 'other';

interface ToolkitTarget {
  kind: 'toolkit';
  slug: string;
}
interface AcademyTarget {
  kind: 'academy';
  slug: string;
  levels?: number[];
}
type ResourceTarget = ToolkitTarget | AcademyTarget;

interface AutocompleteCustomer {
  email: string;
  name: string;
  country?: string;
}

interface Props {
  open: boolean;
  password: string;
  onClose: () => void;
  onGranted: () => void;
}

const REASONS: Array<{ key: GrantReason; label: string; Icon: typeof Gift }> = [
  { key: 'gift', label: 'Gift', Icon: Gift },
  { key: 'comp', label: 'Comp', Icon: Coffee },
  { key: 'package-perk', label: 'Package perk', Icon: Heart },
  { key: 'beta', label: 'Beta tester', Icon: Wrench },
  { key: 'make-good', label: 'Make-good', Icon: Mail },
  { key: 'other', label: 'Other', Icon: FileText },
];

export default function GrantAccessModal({ open, password, onClose, onGranted }: Props) {
  // ─── State ──────────────────────────────────────────────────
  const [composeText, setComposeText] = useState('');
  const [composeApplied, setComposeApplied] = useState<string | null>(null);

  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [selected, setSelected] = useState<ResourceTarget[]>([]);
  const [reason, setReason] = useState<GrantReason>('gift');
  const [reasonNote, setReasonNote] = useState('');
  const [sendEmail, setSendEmail] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  // ─── Customer autocomplete ──────────────────────────────────
  const [allCustomers, setAllCustomers] = useState<AutocompleteCustomer[]>([]);
  const [customerMenuOpen, setCustomerMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const headers = useMemo(() => ({
    Authorization: `Bearer ${password}`,
    'Content-Type': 'application/json',
  }), [password]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/admin/invoices/customers?limit=500', {
          headers: { Authorization: `Bearer ${password}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const list = Array.isArray(data?.customers) ? data.customers : [];
        setAllCustomers(list.map((c: { email: string; name?: string; country?: string }) => ({
          email: c.email,
          name: c.name || '',
          country: c.country,
        })));
      } catch { /* silent — autocomplete is optional */ }
    })();
    return () => { cancelled = true; };
  }, [open, password]);

  const customerMatches = useMemo(() => {
    const q = recipientEmail.toLowerCase().trim();
    if (q.length < 2) return [];
    return allCustomers
      .filter(c =>
        c.email.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [recipientEmail, allCustomers]);

  // ─── Reset on open ──────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    setComposeText('');
    setComposeApplied(null);
    setRecipientName('');
    setRecipientEmail('');
    setSelected([]);
    setReason('gift');
    setReasonNote('');
    setSendEmail(true);
    setError(null);
    setSuccessCount(null);
    setSubmitting(false);
  }, [open]);

  // Close autocomplete on outside click
  useEffect(() => {
    if (!customerMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setCustomerMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [customerMenuOpen]);

  // ─── Resource selection toggles ─────────────────────────────
  const toggleToolkit = (slug: string) => {
    setSelected(prev => {
      const exists = prev.find(r => r.kind === 'toolkit' && r.slug === slug);
      if (exists) return prev.filter(r => !(r.kind === 'toolkit' && r.slug === slug));
      return [...prev, { kind: 'toolkit', slug }];
    });
  };
  const toggleProgram = (slug: string) => {
    setSelected(prev => {
      const exists = prev.find(r => r.kind === 'academy' && r.slug === slug);
      if (exists) return prev.filter(r => !(r.kind === 'academy' && r.slug === slug));
      return [...prev, { kind: 'academy', slug }];
    });
  };
  const isToolkitSelected = (slug: string) => selected.some(r => r.kind === 'toolkit' && r.slug === slug);
  const isProgramSelected = (slug: string) => selected.some(r => r.kind === 'academy' && r.slug === slug);

  // ─── Smart compose parser ───────────────────────────────────
  const applyCompose = useCallback(() => {
    if (!composeText.trim()) return;
    const parsed = parseCompose(composeText);
    if (parsed.email) setRecipientEmail(parsed.email);
    if (parsed.reason) setReason(parsed.reason);
    if (parsed.resources.length > 0) {
      setSelected(prev => {
        // merge unique
        const merged = [...prev];
        for (const r of parsed.resources) {
          const dupe = merged.find(m => m.kind === r.kind && m.slug === r.slug);
          if (!dupe) merged.push(r);
        }
        return merged;
      });
    }
    setComposeApplied(buildAppliedSummary(parsed));
  }, [composeText]);

  // ─── Submit ─────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!recipientEmail.trim() || selected.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/resources/grant', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          recipientEmail: recipientEmail.trim(),
          recipientName: recipientName.trim() || undefined,
          reason,
          reasonNote: reasonNote.trim() || undefined,
          sendEmail,
          resources: selected,
        }),
      });
      const data = await res.json();
      if (!res.ok && res.status !== 207) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const errs: string[] = data.errors || [];
      const granted = (data.toolkits?.filter((r: { ok: boolean }) => r.ok)?.length ?? 0)
        + (data.academy?.filter((r: { ok: boolean }) => r.ok)?.length ?? 0);
      if (errs.length > 0 && granted === 0) {
        throw new Error(errs.join(' · '));
      }
      setSuccessCount(granted);
      onGranted();
      // Auto-close after a beat so the success state is visible
      setTimeout(() => onClose(), 1400);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Grant failed');
    } finally {
      setSubmitting(false);
    }
  }, [recipientEmail, recipientName, reason, reasonNote, sendEmail, selected, headers, onGranted, onClose]);

  // ─── Live preview ───────────────────────────────────────────
  const previewLine = useMemo(() => {
    if (selected.length === 0 || !recipientEmail.trim()) return null;
    const firstName = recipientName.trim().split(/\s+/)[0] || recipientEmail.split('@')[0];
    const titles = selected.map(r => {
      if (r.kind === 'toolkit') {
        return toolkitCatalog.find(t => t.slug === r.slug)?.titleEn || r.slug;
      }
      const p = programCatalog.find(pr => pr.slug === r.slug);
      return p ? p.titleEn : r.slug;
    });
    const list = formatList(titles);
    const tail = sendEmail ? ' + welcome email' : ' (silent — no email)';
    return `${firstName} will receive: ${list} access${tail}.`;
  }, [selected, recipientEmail, recipientName, sendEmail]);

  if (!open) return null;

  const submitDisabled = submitting || !recipientEmail.trim() || selected.length === 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-stretch sm:items-center justify-center bg-black/50 backdrop-blur-sm sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 20, scale: 0.98, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 20, scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={e => e.stopPropagation()}
          className="bg-[#FAF7F2] w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-screen sm:max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-[#F0ECE8] sm:rounded-t-2xl">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#7A3B5E]/10 flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4 text-[#7A3B5E]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-[#2D2A33]">Grant Access</h2>
                <p className="text-[11px] text-[#8E8E9F]">Unlock toolkits or academy programs for a client.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={submitting}
              className="p-2 -mr-1 rounded-xl text-[#8E8E9F] hover:text-[#4A4A5C] hover:bg-[#F5F0EB] disabled:opacity-50"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4"
            style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
          >
            {/* Smart compose */}
            <div className="bg-white rounded-2xl border border-[#F0ECE8] p-3 sm:p-4 space-y-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#7A3B5E] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Smart compose
                <span className="ml-auto text-[#C4C0BC] font-normal normal-case tracking-normal">optional</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={composeText}
                  onChange={e => setComposeText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); applyCompose(); } }}
                  placeholder='e.g. "Give anxiety toolkit to sara@chen.com as a gift"'
                  className="flex-1 px-3 py-2 rounded-lg border border-[#E8E4DE] text-[13px] text-[#2D2A33] placeholder:text-[#C4C0BC] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#7A3B5E]/30"
                />
                <button
                  onClick={applyCompose}
                  disabled={!composeText.trim()}
                  className="px-3 py-2 rounded-lg bg-[#7A3B5E] text-white text-[12px] font-semibold hover:bg-[#6A2E4E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Apply
                </button>
              </div>
              {composeApplied && (
                <p className="text-[11px] text-[#3B8A6E] flex items-center gap-1.5">
                  <Check className="w-3 h-3" /> {composeApplied}
                </p>
              )}
            </div>

            {/* Recipient */}
            <div ref={wrapperRef} className="bg-white rounded-2xl border border-[#F0ECE8] p-3 sm:p-4 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7A3B5E]">Recipient</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={e => { setRecipientEmail(e.target.value); setCustomerMenuOpen(true); }}
                    onFocus={() => setCustomerMenuOpen(true)}
                    placeholder="client@example.com"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E8E4DE] text-[13px] text-[#2D2A33] placeholder:text-[#C4C0BC] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#7A3B5E]/30"
                  />
                  {customerMenuOpen && customerMatches.length > 0 && (
                    <div className="absolute z-10 mt-1 left-0 right-0 bg-white border border-[#E8E4DE] rounded-xl shadow-lg max-h-56 overflow-y-auto">
                      {customerMatches.map(c => (
                        <button
                          key={c.email}
                          type="button"
                          onClick={() => {
                            setRecipientEmail(c.email);
                            if (!recipientName) setRecipientName(c.name);
                            setCustomerMenuOpen(false);
                          }}
                          className="w-full text-start px-3 py-2 hover:bg-[#FAF7F2] flex items-center gap-2 text-[13px] border-b border-[#F0ECE8] last:border-0"
                        >
                          <Search className="w-3 h-3 text-[#C4C0BC] shrink-0" />
                          <span className="flex-1 min-w-0">
                            <span className="block font-medium text-[#4A4A5C] truncate">{c.name || c.email}</span>
                            {c.name && <span className="block text-[11px] text-[#8E8E9F] truncate">{c.email}</span>}
                          </span>
                          {c.country && <span className="text-[10px] text-[#C4C0BC] uppercase">{c.country}</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                  placeholder="Name (optional)"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E8E4DE] text-[13px] text-[#2D2A33] placeholder:text-[#C4C0BC] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#7A3B5E]/30"
                />
              </div>
            </div>

            {/* Toolkits */}
            <div className="bg-white rounded-2xl border border-[#F0ECE8] p-3 sm:p-4 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7A3B5E] flex items-center gap-1.5">
                <FileText className="w-3 h-3" /> Toolkits
                <span className="ml-auto text-[#C4C0BC] font-normal normal-case tracking-normal">multi-select</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {toolkitCatalog.filter(t => t.isPremium).map(t => {
                  const active = isToolkitSelected(t.slug);
                  return (
                    <button
                      key={t.slug}
                      type="button"
                      onClick={() => toggleToolkit(t.slug)}
                      className={`text-start px-3 py-2.5 rounded-xl border-2 transition-all flex items-start gap-2 ${
                        active
                          ? 'border-[#7A3B5E] bg-gradient-to-r from-[#FFFAF5] to-[#FDF6ED]'
                          : 'border-[#F0ECE8] bg-white hover:border-[#C8A97D]/40'
                      }`}
                    >
                      <span
                        className={`shrink-0 w-4 h-4 rounded border-2 mt-0.5 flex items-center justify-center transition-colors ${
                          active ? 'border-[#7A3B5E] bg-[#7A3B5E]' : 'border-[#C4C0BC]'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </span>
                      <span className="text-[12px] font-medium text-[#4A4A5C] leading-snug">{t.titleEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Academy programs */}
            <div className="bg-white rounded-2xl border border-[#F0ECE8] p-3 sm:p-4 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7A3B5E] flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" /> Academy programs
                <span className="ml-auto text-[#C4C0BC] font-normal normal-case tracking-normal">full access per program</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {programCatalog.filter(p => !p.isFree).map(p => {
                  const active = isProgramSelected(p.slug);
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => toggleProgram(p.slug)}
                      className={`text-start px-3 py-2.5 rounded-xl border-2 transition-all flex items-start gap-2 ${
                        active
                          ? 'border-[#7A3B5E] bg-gradient-to-r from-[#FFFAF5] to-[#FDF6ED]'
                          : 'border-[#F0ECE8] bg-white hover:border-[#C8A97D]/40'
                      }`}
                    >
                      <span
                        className={`shrink-0 w-4 h-4 rounded border-2 mt-0.5 flex items-center justify-center transition-colors ${
                          active ? 'border-[#7A3B5E] bg-[#7A3B5E]' : 'border-[#C4C0BC]'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[12px] font-medium text-[#4A4A5C] leading-snug">{p.titleEn}</span>
                        <span className="block text-[10px] text-[#8E8E9F] mt-0.5">{p.categoryLabel} · {p.totalModules} modules</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reason */}
            <div className="bg-white rounded-2xl border border-[#F0ECE8] p-3 sm:p-4 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7A3B5E]">Reason</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {REASONS.map(r => {
                  const active = reason === r.key;
                  const Icon = r.Icon;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setReason(r.key)}
                      className={`px-3 py-2 rounded-lg border-2 text-[12px] font-semibold transition-colors flex items-center gap-1.5 justify-center ${
                        active
                          ? 'border-[#7A3B5E] bg-[#7A3B5E] text-white'
                          : 'border-[#F0ECE8] bg-white text-[#4A4A5C] hover:border-[#C8A97D]/40'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {r.label}
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                value={reasonNote}
                onChange={e => setReasonNote(e.target.value)}
                placeholder="Internal note (optional, for audit)"
                className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-[12px] text-[#2D2A33] placeholder:text-[#C4C0BC] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#7A3B5E]/30"
              />
            </div>

            {/* Email toggle */}
            <label className="flex items-center gap-3 cursor-pointer bg-white rounded-2xl border border-[#F0ECE8] p-3 sm:p-4">
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={e => setSendEmail(e.target.checked)}
                className="w-5 h-5 accent-[#7A3B5E] rounded"
              />
              <span className="flex-1 min-w-0">
                <span className="block text-[13px] font-medium text-[#4A4A5C]">
                  Send welcome email to client
                </span>
                <span className="block text-[11px] text-[#8E8E9F]">
                  Off = silent grant (admin record only)
                </span>
              </span>
              <Send className="w-4 h-4 text-[#8E8E9F]" />
            </label>

            {/* Live preview */}
            {previewLine && (
              <div className="px-4 py-3 rounded-xl bg-[#FFFAF5] border border-[#E8DFC8] text-[13px] leading-relaxed text-[#5C4A3A]">
                <Sparkles className="inline w-3.5 h-3.5 text-[#C8A97D] mr-1.5 align-text-top" />
                {previewLine}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="flex-1">{error}</span>
                <button onClick={() => setError(null)} className="shrink-0 p-0.5 rounded-lg hover:bg-red-100">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Success */}
            {successCount !== null && (
              <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800 flex items-center gap-2.5">
                <Check className="w-4 h-4 shrink-0" />
                <span>Granted {successCount} resource{successCount === 1 ? '' : 's'} to {recipientEmail}.</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="shrink-0 px-4 sm:px-6 py-3 bg-white border-t border-[#F0ECE8] sm:rounded-b-2xl flex gap-2"
            style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-5 py-3 rounded-xl bg-[#F5F0EB] text-sm font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] active:scale-[0.97] transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitDisabled}
              className="flex-1 py-3 rounded-xl bg-[#7A3B5E] text-sm font-semibold text-white hover:bg-[#6A2E4E] active:scale-[0.97] transition-all disabled:opacity-40 inline-flex items-center justify-center gap-2 shadow-sm"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Granting…</>
              ) : (
                <><Gift className="w-4 h-4" /> Grant Access</>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────
   Smart compose parser — deterministic regex/keyword match
   ────────────────────────────────────────────────────────────── */

interface ComposeResult {
  email?: string;
  reason?: GrantReason;
  resources: ResourceTarget[];
}

function parseCompose(text: string): ComposeResult {
  const lower = text.toLowerCase();
  const result: ComposeResult = { resources: [] };

  // Email
  const emailMatch = text.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/);
  if (emailMatch) result.email = emailMatch[0].toLowerCase();

  // Reason — order matters: longer/more-specific first
  if (/\bmake[-\s]?good\b|\bapology\b|\bsorry\b/.test(lower)) result.reason = 'make-good';
  else if (/\bbeta\b|\btester\b/.test(lower)) result.reason = 'beta';
  else if (/\bperk\b|\bpackage\b/.test(lower)) result.reason = 'package-perk';
  else if (/\bgift\b|\bpresent\b/.test(lower)) result.reason = 'gift';
  else if (/\bcomp\b|\bfree\b|\bon (the|us)\b/.test(lower)) result.reason = 'comp';

  // Toolkits — keyword → slug. Order from most-specific to least.
  const toolkitMatchers: Array<[RegExp, string]> = [
    [/anxiety/, 'anxiety-recovery-journal'],
    [/couples?|communication|partner/, 'couples-communication-workbook'],
    [/parenting|parent guide|complete parent/, 'complete-parenting-guide'],
    [/teen|adolescent/, 'understanding-your-teen'],
    [/adulting|emotional edition/, 'adulting-emotional-edition'],
    [/digital mirror|screen|phone use/, 'digital-mirror-workbook'],
  ];
  for (const [rx, slug] of toolkitMatchers) {
    if (rx.test(lower)) result.resources.push({ kind: 'toolkit', slug });
  }

  // Academy programs — only match if the phrase clearly intends a program
  // (e.g. "intentional parent program", "inner compass program").
  const programMatchers: Array<[RegExp, string]> = [
    [/intentional parent(?: program)?/, 'intentional-parent'],
    [/resilient teens?(?: program)?/, 'resilient-teens'],
    [/stronger together(?: program)?/, 'stronger-together'],
    [/inner compass(?: program)?/, 'inner-compass'],
  ];
  for (const [rx, slug] of programMatchers) {
    if (rx.test(lower)) result.resources.push({ kind: 'academy', slug });
  }

  return result;
}

function buildAppliedSummary(parsed: ComposeResult): string {
  const parts: string[] = [];
  if (parsed.email) parts.push(`recipient: ${parsed.email}`);
  if (parsed.resources.length > 0) parts.push(`${parsed.resources.length} resource${parsed.resources.length === 1 ? '' : 's'}`);
  if (parsed.reason) parts.push(`reason: ${parsed.reason.replace('-', ' ')}`);
  return parts.length > 0 ? `Applied — ${parts.join(' · ')}` : 'Nothing recognized — fill the form below.';
}

function formatList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} + ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} + ${items[items.length - 1]}`;
}
