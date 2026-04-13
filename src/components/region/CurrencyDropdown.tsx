'use client';

/* ================================================================
   CurrencyDropdown — compact currency-only override
   ================================================================
   Lets the visitor change which currency the online price is
   DISPLAYED in, without changing their detected country or the
   underlying pricing band. This prevents arbitrage (can't switch
   country to get cheaper prices) while still offering control.

   Options:
   - "Local" (default) — uses the visitor's country currency
   - A curated shortlist of major currencies for quick switching
   ================================================================ */

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRegion } from './RegionProvider';
import { getCurrencyForCountry } from '@/config/pricing';

/**
 * Curated shortlist of currencies most relevant to Mama Hala's actual client
 * base: Canada (primary), UAE, Saudi Arabia, Middle East, and North Africa.
 * Ordered by strategic priority — first entries are her biggest markets.
 * Non-market currencies (INR, JPY, CNY, BRL) intentionally omitted.
 */
const CURRENCY_OPTIONS: { code: string; labelEn: string; labelAr: string }[] = [
  // Primary markets
  { code: 'CAD', labelEn: 'Canadian Dollar', labelAr: 'دولار كندي' },
  { code: 'USD', labelEn: 'US Dollar', labelAr: 'دولار أمريكي' },
  // Gulf — biggest secondary market
  { code: 'AED', labelEn: 'UAE Dirham', labelAr: 'درهم إماراتي' },
  { code: 'SAR', labelEn: 'Saudi Riyal', labelAr: 'ريال سعودي' },
  { code: 'KWD', labelEn: 'Kuwaiti Dinar', labelAr: 'دينار كويتي' },
  { code: 'QAR', labelEn: 'Qatari Riyal', labelAr: 'ريال قطري' },
  { code: 'BHD', labelEn: 'Bahraini Dinar', labelAr: 'دينار بحريني' },
  { code: 'OMR', labelEn: 'Omani Rial', labelAr: 'ريال عُماني' },
  // Europe (clients who travel or live abroad)
  { code: 'EUR', labelEn: 'Euro', labelAr: 'يورو' },
  { code: 'GBP', labelEn: 'British Pound', labelAr: 'جنيه إسترليني' },
  // Middle East / Levant
  { code: 'JOD', labelEn: 'Jordanian Dinar', labelAr: 'دينار أردني' },
  { code: 'TRY', labelEn: 'Turkish Lira', labelAr: 'ليرة تركية' },
  // North Africa
  { code: 'EGP', labelEn: 'Egyptian Pound', labelAr: 'جنيه مصري' },
  { code: 'MAD', labelEn: 'Moroccan Dirham', labelAr: 'درهم مغربي' },
  { code: 'TND', labelEn: 'Tunisian Dinar', labelAr: 'دينار تونسي' },
];

export default function CurrencyDropdown({
  locale,
  className = '',
}: {
  locale: 'en' | 'ar';
  className?: string;
}) {
  const { country, preferredCurrency, setPreferredCurrency } = useRegion();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === 'ar';

  const localCurrency = getCurrencyForCountry(country);
  const current = preferredCurrency ?? localCurrency;
  const isLocal = preferredCurrency === null;

  // Close on outside click
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

  const chooseLocal = () => {
    setPreferredCurrency(null);
    setOpen(false);
  };
  const choose = (code: string) => {
    setPreferredCurrency(code);
    setOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-1 text-[10px] font-medium text-[#7A3B5E] hover:text-[#5A2D47] transition-colors"
      >
        <span className="uppercase tracking-wider text-[#8E8E9F]">
          {isRTL ? 'العملة' : 'Show in'}
        </span>
        <span className="font-semibold text-[#4A4A5C]">{current}</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {open && (
        <div
          role="listbox"
          className={`absolute z-30 mt-2 min-w-[180px] rounded-xl border border-[#E8E4DE] bg-white shadow-lg py-1 ${
            isRTL ? 'right-0' : 'left-0'
          }`}
        >
          <button
            type="button"
            role="option"
            aria-selected={isLocal}
            onClick={chooseLocal}
            className={`w-full text-start px-3 py-1.5 text-[11px] transition-colors ${
              isLocal
                ? 'bg-[#FAF7F2] text-[#7A3B5E] font-semibold'
                : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'
            }`}
          >
            {isRTL
              ? `العملة المحليّة (${localCurrency})`
              : `Local currency (${localCurrency})`}
          </button>
          <div className="h-px bg-[#F3EFE8] my-1" />
          {CURRENCY_OPTIONS.map((opt) => {
            const active = !isLocal && preferredCurrency === opt.code;
            return (
              <button
                key={opt.code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => choose(opt.code)}
                className={`w-full text-start px-3 py-1.5 text-[11px] transition-colors ${
                  active
                    ? 'bg-[#FAF7F2] text-[#7A3B5E] font-semibold'
                    : 'text-[#4A4A5C] hover:bg-[#FAF7F2]'
                }`}
              >
                <span className="font-mono text-[10px] text-[#8E8E9F] mr-1.5">
                  {opt.code}
                </span>
                {isRTL ? opt.labelAr : opt.labelEn}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
