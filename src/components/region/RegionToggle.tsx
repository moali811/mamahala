'use client';

/* ================================================================
   RegionToggle — compact pill that switches pricing region
   ================================================================
   Two buttons (CAD / AED) in a cream-bordered capsule. Active state
   uses site plum (#7A3B5E). Accessible via role="group" + aria-pressed.
   Works in RTL automatically via inline-flex + gap.
   ================================================================ */

import { useRegion } from './RegionProvider';
import { REGIONS, type Region } from '@/config/pricing';
import { getMessages, type Locale } from '@/lib/i18n';

export default function RegionToggle({
  locale,
  className = '',
}: {
  locale: Locale;
  className?: string;
}) {
  const { region, setRegion } = useRegion();
  const messages = getMessages(locale);
  const isRTL = locale === 'ar';

  const regions: Region[] = ['CAD', 'AED'];
  const label = isRTL
    ? messages.services?.regionToggleLabel ?? 'المنطقة'
    : messages.services?.regionToggleLabel ?? 'Region';

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      role="group"
      aria-label={label}
    >
      <span className="text-[9px] uppercase tracking-widest text-[#8E8E9F] font-medium">
        {label}
      </span>
      <div className="inline-flex items-center rounded-full border border-[#E8E4DE] bg-white p-0.5">
        {regions.map((r) => {
          const active = r === region;
          const meta = REGIONS[r];
          return (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              aria-pressed={active}
              aria-label={isRTL ? meta.labelAr : meta.labelEn}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                active
                  ? 'bg-[#7A3B5E] text-white'
                  : 'text-[#4A4A5C] hover:text-[#7A3B5E]'
              }`}
            >
              <span aria-hidden>{meta.flag}</span>
              <span className="tracking-wide">{r}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
