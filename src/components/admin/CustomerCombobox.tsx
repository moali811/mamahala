'use client';

/* ================================================================
   CustomerCombobox — searchable customer picker
   ================================================================
   A single-input dropdown that filters the customer list by name,
   email, phone, or Zoho customer ID. Used in the ComposeTab to
   instantly auto-fill client fields from the existing customer DB.

   Interactions:
   - Type to filter (client-side, debounced 150ms, max 20 results)
   - Arrow up/down to navigate
   - Enter to select
   - Esc to close
   - "New client" action at the bottom clears the form

   Design:
   - Avatar with initials in plum circle
   - Country flag + last invoice date
   - Total paid CAD in tabular font
   - Zoho badge if imported
   ================================================================ */

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Search, Users, ChevronDown, X, Plus, Check } from 'lucide-react';
import type { Customer } from '@/lib/invoicing/types';

interface Props {
  customers: Customer[];
  selectedEmail: string;
  onSelect: (customer: Customer) => void;
  onNewClient: () => void;
  locale?: 'en' | 'ar';
  placeholder?: string;
}

const COUNTRY_FLAGS: Record<string, string> = {
  CA: '🇨🇦', US: '🇺🇸', AE: '🇦🇪', SA: '🇸🇦', KW: '🇰🇼',
  QA: '🇶🇦', BH: '🇧🇭', OM: '🇴🇲', JO: '🇯🇴', LB: '🇱🇧',
  EG: '🇪🇬', MA: '🇲🇦', TN: '🇹🇳', GB: '🇬🇧', FR: '🇫🇷',
  DE: '🇩🇪', AU: '🇦🇺', IN: '🇮🇳', PK: '🇵🇰',
};

function flagFor(country: string): string {
  return COUNTRY_FLAGS[country.toUpperCase()] || '🌐';
}

function fmtCAD(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

function initialsOf(name: string): string {
  if (!name) return '?';
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function fmtLastInvoice(iso: string | undefined): string {
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

export default function CustomerCombobox({
  customers,
  selectedEmail,
  onSelect,
  onNewClient,
  locale = 'en',
  placeholder,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === 'ar';

  // Find the currently selected customer
  const selected = useMemo(
    () => customers.find((c) => c.email === selectedEmail) || null,
    [customers, selectedEmail],
  );

  // Filter logic — score-based: exact email match > starts-with > includes
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // No query: show top 20 customers by last invoice date (most recent first)
      return [...customers]
        .sort((a, b) => {
          const aTime = a.lastInvoiceAt ? Date.parse(a.lastInvoiceAt) : 0;
          const bTime = b.lastInvoiceAt ? Date.parse(b.lastInvoiceAt) : 0;
          return bTime - aTime;
        })
        .slice(0, 20);
    }

    const scored: Array<{ customer: Customer; score: number }> = [];
    for (const c of customers) {
      const name = c.name.toLowerCase();
      const email = c.email.toLowerCase();
      const phone = (c.phone || '').toLowerCase();
      const zohoId = (c.zohoCustomerId || '').toLowerCase();

      let score = 0;
      if (email === q) score += 1000;
      if (name.startsWith(q)) score += 500;
      if (name.includes(q)) score += 100;
      if (email.startsWith(q)) score += 400;
      if (email.includes(q)) score += 80;
      if (phone.includes(q)) score += 60;
      if (zohoId.includes(q)) score += 40;
      // Country code match (2-letter)
      if (q.length === 2 && c.country.toLowerCase() === q) score += 50;

      if (score > 0) {
        scored.push({ customer: c, score });
      }
    }
    return scored
      .sort((a, b) => b.score - a.score || b.customer.totalPaidCAD - a.customer.totalPaidCAD)
      .slice(0, 20)
      .map((s) => s.customer);
  }, [customers, query]);

  // Reset highlight when filter changes
  useEffect(() => {
    setHighlight(0);
  }, [query]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const handleSelect = useCallback(
    (customer: Customer) => {
      onSelect(customer);
      setOpen(false);
      setQuery('');
    },
    [onSelect],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlight < filtered.length) {
        handleSelect(filtered[highlight]);
      } else if (highlight === filtered.length) {
        // "New client" row
        onNewClient();
        setOpen(false);
        setQuery('');
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleClearSelected = () => {
    onNewClient();
    setQuery('');
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Input row */}
      <div className="relative">
        <Search className={`w-4 h-4 absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-[#8E8E9F]`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={
            placeholder ||
            (isRTL
              ? 'ابحث عن عميل بالاسم أو البريد...'
              : 'Search customer by name, email, or phone…')
          }
          className={`w-full ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2.5 rounded-lg border-2 border-[#E8E4DE] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#C8A97D]`}
          aria-expanded={open}
          aria-haspopup="listbox"
          role="combobox"
          autoComplete="off"
        />
        <ChevronDown className={`w-4 h-4 absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-[#8E8E9F] pointer-events-none transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>

      {/* Selected customer chip (when not open and a customer is picked) */}
      {selected && !open && !query && (
        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8E4DE] text-xs">
          <div className="w-6 h-6 rounded-full bg-[#7A3B5E] text-white flex items-center justify-center text-[9px] font-bold">
            {initialsOf(selected.name)}
          </div>
          <span className="font-semibold text-[#2D2A33]">{selected.name}</span>
          <span>{flagFor(selected.country)}</span>
          {selected.zohoCustomerId && (
            <span className="px-1.5 py-0.5 rounded bg-[#F3EFE8] text-[#8E8E9F] text-[9px] uppercase tracking-wide font-semibold">
              Zoho
            </span>
          )}
          <span className="text-[#8E8E9F]">
            {fmtCAD(selected.totalPaidCAD)} · {selected.totalInvoices}{' '}
            {selected.totalInvoices === 1 ? 'inv' : 'invs'}
          </span>
          <button
            type="button"
            onClick={handleClearSelected}
            className="text-[#8E8E9F] hover:text-[#7A3B5E]"
            aria-label="Clear customer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full max-h-[380px] overflow-y-auto bg-white border border-[#E8E4DE] rounded-xl shadow-lg"
        >
          {filtered.length === 0 && query && (
            <div className="px-4 py-6 text-center text-xs text-[#8E8E9F]">
              No customers match &ldquo;{query}&rdquo;
            </div>
          )}

          {filtered.length === 0 && !query && (
            <div className="px-4 py-6 text-center text-xs text-[#8E8E9F]">
              No customers yet — start typing to search or add a new one
            </div>
          )}

          {filtered.map((customer, i) => {
            const isHighlighted = i === highlight;
            const isCurrent = customer.email === selectedEmail;
            return (
              <button
                key={customer.email}
                type="button"
                role="option"
                aria-selected={isCurrent}
                onClick={() => handleSelect(customer)}
                onMouseEnter={() => setHighlight(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-${isRTL ? 'right' : 'left'} transition-colors ${
                  isHighlighted
                    ? 'bg-[#FAF7F2]'
                    : 'hover:bg-[#FAF7F2]'
                } ${isCurrent ? 'bg-[#F3EFE8]' : ''}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#7A3B5E] to-[#5A2D47] text-white flex items-center justify-center text-xs font-bold">
                  {initialsOf(customer.name)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#2D2A33] truncate">
                      {customer.salutation &&
                      !/^(Mrs?|Ms|Miss|Mr|Dr|Prof)\.?\s/i.test(customer.name)
                        ? `${customer.salutation} `
                        : ''}
                      {customer.name}
                    </span>
                    <span className="flex-shrink-0">{flagFor(customer.country)}</span>
                    {customer.zohoCustomerId && (
                      <span className="px-1 py-0.5 rounded bg-[#F3EFE8] text-[#8E8E9F] text-[8px] uppercase tracking-wide font-semibold flex-shrink-0">
                        Zoho
                      </span>
                    )}
                    {isCurrent && (
                      <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-[10px] text-[#8E8E9F] truncate">
                    {customer.email.endsWith('@no-email.mamahala.local')
                      ? `${customer.phone || 'no email/phone'}`
                      : customer.email}
                  </div>
                </div>

                {/* Stats */}
                <div className={`flex-shrink-0 ${isRTL ? 'text-left' : 'text-right'}`}>
                  <div className="text-xs font-bold text-[#2D2A33] tabular-nums">
                    {fmtCAD(customer.totalPaidCAD)}
                  </div>
                  <div className="text-[9px] text-[#8E8E9F]">
                    {customer.totalInvoices} {customer.totalInvoices === 1 ? 'inv' : 'invs'} ·{' '}
                    {fmtLastInvoice(customer.lastInvoiceAt)}
                  </div>
                </div>
              </button>
            );
          })}

          {/* "New client" action */}
          <button
            type="button"
            role="option"
            aria-selected={highlight === filtered.length}
            onClick={() => {
              onNewClient();
              setOpen(false);
              setQuery('');
            }}
            onMouseEnter={() => setHighlight(filtered.length)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 border-t border-[#F3EFE8] transition-colors ${
              highlight === filtered.length ? 'bg-[#FAF7F2]' : 'hover:bg-[#FAF7F2]'
            }`}
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-full border-2 border-dashed border-[#C8A97D] flex items-center justify-center">
              <Plus className="w-4 h-4 text-[#C8A97D]" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-xs font-bold text-[#7A3B5E]">
                {isRTL ? 'عميل جديد' : 'New client'}
              </div>
              <div className="text-[10px] text-[#8E8E9F]">
                {isRTL
                  ? 'ابدأ بفاتورة جديدة بدون تحديد عميل'
                  : 'Start fresh with blank client fields'}
              </div>
            </div>
            <Users className="w-4 h-4 text-[#C8A97D] flex-shrink-0" />
          </button>
        </div>
      )}
    </div>
  );
}
