'use client';

/* ================================================================
   ClientsModule — Admin customers directory
   ================================================================
   A proper clients/customer workspace, separate from the marketing
   Leads view (which lives at tab=leads and tracks anonymous traffic).

   Features:
     - Searchable, sortable list of every Customer in the store
     - Per-customer detail panel: contact info, stats, notes, tags,
       recent invoices, recent bookings
     - Inline edit of contact fields (name, email, phone, country,
       salutation, address, notes, tags)
     - Secure "type DELETE to confirm" removal
     - Create New Client form

   Mobile-first: on mobile the list takes the full screen and the
   detail opens as a sliding sheet. On desktop both live side-by-
   side in a 40/60 split.

   Data sources (all already wired):
     - GET  /api/admin/invoices/customers            → list
     - GET  /api/admin/invoices/customers/[email]    → single + invoices
     - POST /api/admin/invoices/customers            → upsert
     - DEL  /api/admin/invoices/customers?email=…    → delete
     - GET  /api/admin/booking/by-customer?email=…   → per-customer bookings
   ================================================================ */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Search, Plus, X, Edit3, Trash2, Mail, Phone, MapPin,
  FileText, Calendar, Loader2, ChevronRight, Globe, AlertTriangle,
  Check, CreditCard,
} from 'lucide-react';
import type { Customer, StoredInvoice } from '@/lib/invoicing/types';
import type { Booking } from '@/lib/booking/types';
import { COUNTRIES, COUNTRIES_BY_CODE } from '@/config/countries';

const COUNTRY_FLAGS: Record<string, string> = Object.fromEntries(
  COUNTRIES.map(c => [c.code, c.flag]),
);

// ─── Formatters ────────────────────────────────────────────────

function fmtCAD(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtDate(iso: string | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

function fmtAbsoluteDate(iso: string | undefined): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function initialsOf(name: string): string {
  if (!name) return '?';
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

// ─── Types ─────────────────────────────────────────────────────

interface DetailResponse {
  customer: Customer;
  invoices: StoredInvoice[];
}

// ─── Main Component ─────────────────────────────────────────────

export default function ClientsModule({ password }: { password: string }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${password}`, 'Content-Type': 'application/json' }),
    [password],
  );

  // ─── Load all customers ──────────────────────────────────────
  const loadCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/invoices/customers?limit=500', { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCustomers(data.customers ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => { loadCustomers(); }, [loadCustomers]);

  // ─── Derived: filtered + ranked list ────────────────────────
  const filtered = useMemo(() => {
    let list = [...customers];
    if (countryFilter) list = list.filter(c => c.country?.toUpperCase() === countryFilter);

    const q = search.trim().toLowerCase();
    if (!q) {
      return list.sort((a, b) => {
        const at = a.lastInvoiceAt ? Date.parse(a.lastInvoiceAt) : 0;
        const bt = b.lastInvoiceAt ? Date.parse(b.lastInvoiceAt) : 0;
        return bt - at;
      });
    }

    const scored: Array<{ c: Customer; score: number }> = [];
    for (const c of list) {
      const name = c.name.toLowerCase();
      const email = c.email.toLowerCase();
      const phone = (c.phone || '').toLowerCase();
      let score = 0;
      if (email === q) score += 1000;
      if (name === q) score += 800;
      if (name.startsWith(q)) score += 500;
      if (name.includes(q)) score += 100;
      if (email.startsWith(q)) score += 400;
      if (email.includes(q)) score += 80;
      if (phone.includes(q) && q.length >= 4) score += 200;
      const tokens = q.split(/\s+/).filter(t => t.length >= 2);
      let hits = 0;
      for (const t of tokens) if (name.includes(t)) hits += 1;
      if (tokens.length > 1 && hits === tokens.length) score += 300;
      if (score > 0) scored.push({ c, score });
    }
    return scored.sort((a, b) => b.score - a.score || b.c.totalPaidCAD - a.c.totalPaidCAD).map(s => s.c);
  }, [customers, search, countryFilter]);

  // Stats strip — computed from full roster, not filtered
  const stats = useMemo(() => {
    let totalPaid = 0, outstanding = 0, totalInvoices = 0;
    for (const c of customers) {
      totalPaid += c.totalPaidCAD ?? 0;
      outstanding += c.outstandingCAD ?? 0;
      totalInvoices += c.totalInvoices ?? 0;
    }
    return {
      customerCount: customers.length,
      totalPaid, outstanding, totalInvoices,
    };
  }, [customers]);

  const uniqueCountries = useMemo(() => {
    const seen = new Map<string, number>();
    for (const c of customers) {
      const code = (c.country || '').toUpperCase();
      if (code) seen.set(code, (seen.get(code) ?? 0) + 1);
    }
    return [...seen.entries()].sort((a, b) => b[1] - a[1]);
  }, [customers]);

  const handleCreated = (customer: Customer) => {
    setCustomers(prev => {
      const existing = prev.find(c => c.email === customer.email);
      if (existing) return prev.map(c => c.email === customer.email ? customer : c);
      return [customer, ...prev];
    });
    setCreating(false);
    setSelectedEmail(customer.email);
  };

  const handleUpdated = (customer: Customer) => {
    setCustomers(prev => prev.map(c => c.email === customer.email ? customer : c));
  };

  const handleDeleted = (email: string) => {
    setCustomers(prev => prev.filter(c => c.email !== email));
    if (selectedEmail === email) setSelectedEmail(null);
  };

  return (
    <div className="space-y-4">
      {/* Header + stats strip */}
      <div className="bg-white rounded-2xl border border-[#F3EFE8] p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#2D2A33] flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
              <Users className="w-5 h-5 text-[#7A3B5E]" />
              Clients
            </h2>
            <p className="text-xs text-[#8E8E9F] mt-0.5">
              {stats.customerCount} {stats.customerCount === 1 ? 'customer' : 'customers'} · {fmtCAD(stats.totalPaid)} lifetime paid
              {stats.outstanding > 0 && <span className="text-amber-700"> · {fmtCAD(stats.outstanding)} outstanding</span>}
            </p>
          </div>
          <button
            onClick={() => setCreating(true)}
            className="px-3 py-2 rounded-xl bg-[#7A3B5E] text-white text-xs font-semibold hover:bg-[#6A2E4E] active:scale-[0.97] transition-all inline-flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> <span className="hidden sm:inline">New Client</span><span className="sm:hidden">New</span>
          </button>
        </div>

        {/* Search + filter row */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E9F]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, or phone…"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8E4DE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#C8A97D]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-[#8E8E9F] hover:text-[#4A4A5C]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {uniqueCountries.length > 1 && (
            <select
              value={countryFilter}
              onChange={e => setCountryFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#E8E4DE] bg-white text-sm text-[#4A4A5C] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
            >
              <option value="">All countries</option>
              {uniqueCountries.map(([code, n]) => (
                <option key={code} value={code}>
                  {COUNTRY_FLAGS[code] || '🌐'} {COUNTRIES_BY_CODE[code]?.name ?? code} ({n})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="shrink-0"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* Main 2-pane layout — list left, detail right (desktop).
          On mobile: detail opens in a full-screen sheet. */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] gap-4">
        {/* LIST */}
        <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden">
          {loading ? (
            <div className="py-12 text-center">
              <Loader2 className="w-5 h-5 text-[#C8A97D] animate-spin mx-auto" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#8E8E9F]">
              {customers.length === 0
                ? 'No customers yet. Click New Client to add your first.'
                : 'No customers match your search.'}
            </div>
          ) : (
            <div className="divide-y divide-[#F3EFE8] max-h-[70vh] overflow-y-auto">
              {filtered.map(customer => (
                <CustomerRow
                  key={customer.email}
                  customer={customer}
                  selected={selectedEmail === customer.email}
                  onClick={() => setSelectedEmail(customer.email)}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAIL — desktop-only inline view */}
        <div className="hidden lg:block">
          {selectedEmail ? (
            <CustomerDetailPanel
              email={selectedEmail}
              password={password}
              onClose={() => setSelectedEmail(null)}
              onUpdated={handleUpdated}
              onDeleted={handleDeleted}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-[#F3EFE8] p-10 text-center">
              <Users className="w-8 h-8 mx-auto text-[#C8A97D] mb-2" />
              <p className="text-sm text-[#8E8E9F]">
                Pick a customer from the list to see their profile, invoices, and bookings.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE detail sheet */}
      <AnimatePresence>
        {selectedEmail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-[#FAF7F2]"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute inset-0 overflow-y-auto p-4 pb-24"
            >
              <CustomerDetailPanel
                email={selectedEmail}
                password={password}
                mobile
                onClose={() => setSelectedEmail(null)}
                onUpdated={handleUpdated}
                onDeleted={handleDeleted}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREATE CLIENT MODAL */}
      <AnimatePresence>
        {creating && (
          <CreateClientModal
            password={password}
            onClose={() => setCreating(false)}
            onCreated={handleCreated}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── CustomerRow ───────────────────────────────────────────────

function CustomerRow({
  customer, selected, onClick,
}: { customer: Customer; selected: boolean; onClick: () => void }) {
  const flag = COUNTRY_FLAGS[(customer.country || '').toUpperCase()] || '🌐';
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-colors ${
        selected ? 'bg-[#FAF7F2]' : 'hover:bg-[#FAF7F2]/60'
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7A3B5E] to-[#5A2D47] text-white flex items-center justify-center text-xs font-bold shrink-0">
        {initialsOf(customer.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-[#2D2A33] truncate">
            {customer.salutation && !/^(Mrs?|Ms|Miss|Mr|Dr|Prof)\.?\s/i.test(customer.name) ? `${customer.salutation} ` : ''}
            {customer.name}
          </span>
          <span className="shrink-0">{flag}</span>
        </div>
        <div className="text-[11px] text-[#8E8E9F] truncate">
          {customer.email.endsWith('@no-email.mamahala.local') ? (customer.phone || 'no email/phone') : customer.email}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-xs font-bold text-[#2D2A33] tabular-nums">{fmtCAD(customer.totalPaidCAD ?? 0)}</div>
        <div className="text-[10px] text-[#8E8E9F]">
          {customer.totalInvoices ?? 0} {customer.totalInvoices === 1 ? 'inv' : 'invs'} · {fmtDate(customer.lastInvoiceAt)}
        </div>
      </div>
      {selected && <ChevronRight className="w-4 h-4 text-[#7A3B5E] shrink-0" />}
    </button>
  );
}

// ─── CustomerDetailPanel ───────────────────────────────────────

function CustomerDetailPanel({
  email, password, mobile, onClose, onUpdated, onDeleted,
}: {
  email: string;
  password: string;
  mobile?: boolean;
  onClose: () => void;
  onUpdated: (customer: Customer) => void;
  onDeleted: (email: string) => void;
}) {
  const [data, setData] = useState<DetailResponse | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<Partial<Customer>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'bookings'>('overview');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [deleting, setDeleting] = useState(false);

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${password}`, 'Content-Type': 'application/json' }),
    [password],
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setEditing(false);
    setActiveTab('overview');
    setDeleteConfirmOpen(false);
    setDeleteText('');

    const encoded = encodeURIComponent(email);
    Promise.all([
      fetch(`/api/admin/invoices/customers/${encoded}`, { headers }).then(r => r.json()),
      fetch(`/api/admin/booking/by-customer?email=${encoded}`, { headers }).then(r => r.json()),
    ]).then(([detailRes, bookingsRes]) => {
      if (cancelled) return;
      if (detailRes.error) {
        setError(detailRes.error);
      } else {
        setData(detailRes);
        setDraft(detailRes.customer);
      }
      setBookings(bookingsRes.bookings ?? []);
    }).catch(e => {
      if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load');
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, [email, headers]);

  const handleSave = async () => {
    if (!draft.email || !draft.email.includes('@')) {
      setError('Valid email required');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/invoices/customers', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: draft.email,
          name: draft.name,
          country: draft.country,
          phone: draft.phone,
          address: draft.address,
          notes: draft.notes,
          tags: draft.tags,
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Save failed');
      setData(d => d ? { ...d, customer: j.customer } : d);
      onUpdated(j.customer);
      setEditing(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteText !== 'DELETE') return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/invoices/customers?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers,
      });
      if (!res.ok) throw new Error('Delete failed');
      onDeleted(email);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#F3EFE8] p-12 text-center">
        <Loader2 className="w-5 h-5 text-[#C8A97D] animate-spin mx-auto" />
      </div>
    );
  }

  if (!data || !data.customer) {
    return (
      <div className="bg-white rounded-2xl border border-[#F3EFE8] p-8 text-center text-sm text-[#8E8E9F]">
        {error || 'Customer not found'}
      </div>
    );
  }

  const customer = data.customer;
  const flag = COUNTRY_FLAGS[(customer.country || '').toUpperCase()] || '🌐';

  return (
    <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden">
      {/* Mobile close bar */}
      {mobile && (
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 w-full px-4 py-3 bg-[#FAF7F2] text-sm font-semibold text-[#7A3B5E] border-b border-[#F3EFE8]"
        >
          <X className="w-4 h-4" /> Close
        </button>
      )}

      {/* Header: avatar + name + quick stats */}
      <div className="p-4 sm:p-5 border-b border-[#F3EFE8]">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7A3B5E] to-[#5A2D47] text-white flex items-center justify-center text-base font-bold shrink-0">
            {initialsOf(customer.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-[#2D2A33] truncate">
                {customer.salutation && !/^(Mrs?|Ms|Miss|Mr|Dr|Prof)\.?\s/i.test(customer.name) ? `${customer.salutation} ` : ''}
                {customer.name}
              </h3>
              <span>{flag}</span>
              {customer.zohoCustomerId && (
                <span className="px-1.5 py-0.5 rounded bg-[#F3EFE8] text-[#8E8E9F] text-[9px] uppercase tracking-wide font-semibold">Zoho</span>
              )}
            </div>
            <p className="text-xs text-[#8E8E9F] truncate mt-0.5">{customer.email}</p>
            {customer.phone && (
              <p className="text-[11px] text-[#8E8E9F] mt-0.5 flex items-center gap-1"><Phone className="w-3 h-3" /> {customer.phone}</p>
            )}
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="p-2 rounded-lg text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2] transition-colors"
              title="Edit"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Stat label="Lifetime" value={fmtCAD(customer.totalPaidCAD ?? 0)} tone="primary" />
          <Stat label="Outstanding" value={fmtCAD(customer.outstandingCAD ?? 0)} tone={customer.outstandingCAD > 0 ? 'warn' : 'muted'} />
          <Stat label="Invoices" value={String(customer.totalInvoices ?? 0)} tone="muted" subtitle={customer.lastInvoiceAt ? `last ${fmtDate(customer.lastInvoiceAt)}` : undefined} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#F3EFE8] px-2">
        {(['overview', 'invoices', 'bookings'] as const).map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-3 sm:px-4 py-2.5 text-xs font-semibold capitalize border-b-2 transition-colors ${
              activeTab === t
                ? 'border-[#7A3B5E] text-[#7A3B5E]'
                : 'border-transparent text-[#8E8E9F] hover:text-[#4A4A5C]'
            }`}
          >
            {t}
            {t === 'invoices' && data.invoices.length > 0 && (
              <span className="ml-1 opacity-60">({data.invoices.length})</span>
            )}
            {t === 'bookings' && bookings.length > 0 && (
              <span className="ml-1 opacity-60">({bookings.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4 sm:p-5">
        {error && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError(null)}><X className="w-3 h-3" /></button>
          </div>
        )}

        {activeTab === 'overview' && (
          <OverviewTab
            customer={customer}
            draft={draft}
            setDraft={setDraft}
            editing={editing}
            saving={saving}
            onSave={handleSave}
            onCancel={() => { setDraft(customer); setEditing(false); }}
            onDeleteClick={() => setDeleteConfirmOpen(true)}
          />
        )}
        {activeTab === 'invoices' && (
          <InvoicesTab invoices={data.invoices} />
        )}
        {activeTab === 'bookings' && (
          <BookingsTab bookings={bookings} />
        )}
      </div>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteConfirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { if (!deleting) { setDeleteConfirmOpen(false); setDeleteText(''); }}}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-[#C45B5B]" />
                <h3 className="text-sm font-bold text-[#2D2A33]">Delete customer?</h3>
              </div>
              <p className="text-xs text-[#4A4A5C] mb-3">
                This permanently removes <span className="font-semibold">{customer.name}</span> from the customer list. Their existing invoices will remain in History but will no longer link to a customer record. Type <span className="font-mono font-bold">DELETE</span> to confirm.
              </p>
              <input
                value={deleteText}
                onChange={e => setDeleteText(e.target.value)}
                placeholder="Type DELETE"
                className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#C45B5B]/20 focus:border-[#C45B5B]"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => { setDeleteConfirmOpen(false); setDeleteText(''); }}
                  disabled={deleting}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#F5F0EB] text-xs font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteText !== 'DELETE' || deleting}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#C45B5B] text-xs font-semibold text-white hover:bg-[#B04A4A] disabled:opacity-40 inline-flex items-center justify-center gap-1.5"
                >
                  {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Stat chip ─────────────────────────────────────────────────

function Stat({ label, value, tone, subtitle }: {
  label: string; value: string; tone: 'primary' | 'warn' | 'muted'; subtitle?: string;
}) {
  const bg = tone === 'primary' ? 'bg-[#7A3B5E]/8' : tone === 'warn' ? 'bg-amber-50' : 'bg-[#FAF7F2]';
  const color = tone === 'primary' ? 'text-[#7A3B5E]' : tone === 'warn' ? 'text-amber-700' : 'text-[#4A4A5C]';
  return (
    <div className={`${bg} rounded-xl p-3`}>
      <p className="text-[9px] uppercase tracking-wider text-[#8E8E9F] font-semibold mb-0.5">{label}</p>
      <p className={`text-sm font-bold tabular-nums ${color}`}>{value}</p>
      {subtitle && <p className="text-[10px] text-[#8E8E9F] mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ─── Tabs ──────────────────────────────────────────────────────

function OverviewTab({
  customer, draft, setDraft, editing, saving, onSave, onCancel, onDeleteClick,
}: {
  customer: Customer;
  draft: Partial<Customer>;
  setDraft: React.Dispatch<React.SetStateAction<Partial<Customer>>>;
  editing: boolean;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
  onDeleteClick: () => void;
}) {
  if (editing) {
    return (
      <div className="space-y-3">
        <Field label="Full name" icon={<Users className="w-3 h-3" />}>
          <input
            value={draft.name ?? ''}
            onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#C8A97D]"
          />
        </Field>
        <Field label="Email" icon={<Mail className="w-3 h-3" />}>
          <input
            value={draft.email ?? ''}
            readOnly
            className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-[#FAF7F2] text-[#8E8E9F] cursor-not-allowed"
          />
          <p className="text-[10px] text-[#8E8E9F] mt-1">Email is the customer&apos;s stable ID — create a new customer if this needs to change.</p>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone" icon={<Phone className="w-3 h-3" />}>
            <input
              value={draft.phone ?? ''}
              onChange={e => setDraft(d => ({ ...d, phone: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#C8A97D]"
            />
          </Field>
          <Field label="Country" icon={<Globe className="w-3 h-3" />}>
            <select
              value={(draft.country ?? '').toUpperCase()}
              onChange={e => setDraft(d => ({ ...d, country: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
            >
              <option value="">—</option>
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Address" icon={<MapPin className="w-3 h-3" />}>
          <input
            value={draft.address?.line1 ?? ''}
            onChange={e => setDraft(d => ({ ...d, address: { ...(d.address ?? {}), line1: e.target.value } }))}
            placeholder="Street / line 1"
            className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
          />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input
              value={draft.address?.city ?? ''}
              onChange={e => setDraft(d => ({ ...d, address: { ...(d.address ?? {}), city: e.target.value } }))}
              placeholder="City"
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
            />
            <input
              value={draft.address?.postal_code ?? ''}
              onChange={e => setDraft(d => ({ ...d, address: { ...(d.address ?? {}), postal_code: e.target.value } }))}
              placeholder="Postal / ZIP"
              className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20"
            />
          </div>
        </Field>
        <Field label="Notes" icon={<FileText className="w-3 h-3" />}>
          <textarea
            value={draft.notes ?? ''}
            onChange={e => setDraft(d => ({ ...d, notes: e.target.value }))}
            rows={3}
            placeholder="Private notes only the admin sees"
            className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 resize-none"
          />
        </Field>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onCancel}
            disabled={saving}
            className="flex-1 px-3 py-2.5 rounded-xl bg-[#F5F0EB] text-xs font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex-1 px-3 py-2.5 rounded-xl bg-[#7A3B5E] text-xs font-semibold text-white hover:bg-[#6A2E4E] disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 text-xs text-[#4A4A5C]">
      <DisplayField label="Country" icon={<Globe className="w-3 h-3" />}>
        {customer.country ? `${COUNTRY_FLAGS[customer.country.toUpperCase()] || '🌐'} ${COUNTRIES_BY_CODE[customer.country.toUpperCase()]?.name ?? customer.country}` : '—'}
      </DisplayField>
      {customer.phone && (
        <DisplayField label="Phone" icon={<Phone className="w-3 h-3" />}>
          {customer.phone}
        </DisplayField>
      )}
      {customer.address && (customer.address.line1 || customer.address.city) && (
        <DisplayField label="Address" icon={<MapPin className="w-3 h-3" />}>
          {[customer.address.line1, customer.address.line2, customer.address.city, customer.address.state, customer.address.postal_code].filter(Boolean).join(', ')}
        </DisplayField>
      )}
      {customer.preferredPaymentMethod && (
        <DisplayField label="Preferred payment" icon={<CreditCard className="w-3 h-3" />}>
          {customer.preferredPaymentMethod}
        </DisplayField>
      )}
      <DisplayField label="Notes" icon={<FileText className="w-3 h-3" />}>
        {customer.notes || <span className="italic text-[#B8B3AD]">None</span>}
      </DisplayField>
      {customer.firstInvoiceAt && (
        <DisplayField label="Client since" icon={<Calendar className="w-3 h-3" />}>
          {fmtAbsoluteDate(customer.firstInvoiceAt)}
        </DisplayField>
      )}

      <div className="pt-4 border-t border-[#F3EFE8]">
        <button
          onClick={onDeleteClick}
          className="text-[11px] font-semibold text-[#C45B5B] hover:text-[#B04A4A] inline-flex items-center gap-1.5"
        >
          <Trash2 className="w-3 h-3" /> Delete this customer
        </button>
      </div>
    </div>
  );
}

function InvoicesTab({ invoices }: { invoices: StoredInvoice[] }) {
  if (invoices.length === 0) {
    return <p className="text-xs text-[#8E8E9F] text-center py-6">No invoices yet for this customer.</p>;
  }
  const sorted = [...invoices].sort((a, b) => (b.issuedAt ?? '').localeCompare(a.issuedAt ?? ''));
  return (
    <div className="space-y-1.5">
      {sorted.map(inv => (
        <div
          key={inv.invoiceId}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[#F3EFE8] hover:bg-[#FAF7F2]/60 transition-colors"
        >
          <div className="w-1.5 h-8 rounded-full shrink-0" style={{ background: statusColor(inv.status) }} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#2D2A33] truncate">{inv.invoiceNumber}</p>
            <p className="text-[10px] text-[#8E8E9F] truncate">
              {fmtAbsoluteDate(inv.issuedAt)}
              {inv.status === 'paid' && inv.paidAt && ` · paid ${fmtDate(inv.paidAt)}`}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-bold text-[#2D2A33] tabular-nums">
              {inv.breakdown?.formattedTotal || fmtCAD(inv.breakdown?.totalCAD ?? 0)}
            </p>
            <p className="text-[9px] uppercase tracking-wide font-semibold" style={{ color: statusColor(inv.status) }}>
              {inv.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BookingsTab({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return <p className="text-xs text-[#8E8E9F] text-center py-6">No bookings yet for this customer.</p>;
  }
  return (
    <div className="space-y-1.5">
      {bookings.map(b => (
        <div
          key={b.bookingId}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[#F3EFE8] hover:bg-[#FAF7F2]/60 transition-colors"
        >
          <div className="w-1.5 h-8 rounded-full shrink-0" style={{ background: bookingStatusColor(b.status) }} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#2D2A33] truncate">{b.serviceName ?? b.serviceSlug}</p>
            <p className="text-[10px] text-[#8E8E9F] truncate">
              {fmtAbsoluteDate(b.startTime)} · {b.durationMinutes}min · {b.sessionMode === 'online' ? 'online' : 'in-person'}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[9px] uppercase tracking-wide font-semibold" style={{ color: bookingStatusColor(b.status) }}>
              {b.status.replace(/_/g, ' ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function statusColor(status: StoredInvoice['status']): string {
  switch (status) {
    case 'paid': return '#3B8A6E';
    case 'overdue': return '#C45B5B';
    case 'void': return '#8E8E9F';
    case 'sent': return '#C8A97D';
    case 'draft': return '#B8B3AD';
    default: return '#8E8E9F';
  }
}

function bookingStatusColor(status: Booking['status']): string {
  switch (status) {
    case 'confirmed':
    case 'completed':
    case 'approved':
      return '#3B8A6E';
    case 'cancelled':
    case 'declined':
    case 'no-show':
      return '#C45B5B';
    case 'pending-review':
    case 'pending_approval':
      return '#C8A97D';
    default:
      return '#8E8E9F';
  }
}

// ─── Create Client Modal ───────────────────────────────────────

function CreateClientModal({
  password, onClose, onCreated,
}: { password: string; onClose: () => void; onCreated: (customer: Customer) => void }) {
  const [form, setForm] = useState({ name: '', email: '', country: 'CA', phone: '', notes: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.includes('@')) { setError('Valid email required'); return; }
    if (!form.name.trim()) { setError('Name required'); return; }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/invoices/customers', {
        method: 'POST',
        headers: { Authorization: `Bearer ${password}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          name: form.name.trim(),
          country: form.country,
          phone: form.phone.trim() || undefined,
          notes: form.notes.trim() || undefined,
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Failed to save');
      onCreated(j.customer);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
      onClick={() => { if (!saving) onClose(); }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-5 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#2D2A33] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#7A3B5E]" /> New Client
          </h3>
          <button type="button" onClick={onClose} className="text-[#8E8E9F] hover:text-[#4A4A5C]">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          <Field label="Full name"><input autoFocus value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#C8A97D]" /></Field>
          <Field label="Email"><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#C8A97D]" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone"><input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20" /></Field>
            <Field label="Country">
              <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20">
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Notes (optional)"><textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 resize-none" /></Field>
        </div>
        {error && <p className="text-xs text-red-700 mt-3">{error}</p>}
        <div className="flex gap-2 mt-5">
          <button type="button" onClick={onClose} disabled={saving} className="flex-1 px-3 py-2.5 rounded-xl bg-[#F5F0EB] text-xs font-semibold text-[#4A4A5C] hover:bg-[#EDE6DF] disabled:opacity-50">Cancel</button>
          <button type="submit" disabled={saving} className="flex-1 px-3 py-2.5 rounded-xl bg-[#7A3B5E] text-xs font-semibold text-white hover:bg-[#6A2E4E] disabled:opacity-50 inline-flex items-center justify-center gap-1.5">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
            Create
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

// ─── Helper components ─────────────────────────────────────────

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#8E8E9F] font-semibold mb-1">
        {icon}{label}
      </label>
      {children}
    </div>
  );
}

function DisplayField({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#8E8E9F] font-semibold mb-0.5">
        {icon}{label}
      </p>
      <p className="text-xs text-[#2D2A33]">{children}</p>
    </div>
  );
}
