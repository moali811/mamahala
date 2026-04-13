'use client';

/* ================================================================
   GeoRevenueMap — country revenue breakdown with horizontal bars
   ================================================================
   Shows each country with a flag, name, CAD revenue, and a bar
   proportional to the total. Top-N countries are listed in order.
   ================================================================ */

import type { DashboardGeoRevenue } from '@/lib/invoicing/dashboard-stats';

function fmtCAD(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

export default function GeoRevenueMap({
  data,
}: {
  data: DashboardGeoRevenue[];
}) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-[#8E8E9F]">
        No geographic data yet
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map((d) => d.revenueCAD), 1);

  return (
    <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
      {data.map((country) => {
        const barWidth = (country.revenueCAD / maxRevenue) * 100;
        return (
          <div key={country.country} className="group">
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-sm">{country.flag}</span>
                <span className="text-[11px] font-semibold text-[#2D2A33] truncate">
                  {country.countryName}
                </span>
                <span className="text-[9px] text-[#8E8E9F] tabular-nums">
                  · {country.count}
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#2D2A33] tabular-nums flex-shrink-0">
                {fmtCAD(country.revenueCAD)}
              </span>
            </div>
            <div className="h-2 bg-[#F3EFE8] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7A3B5E] to-[#C8A97D] transition-all group-hover:from-[#8A4B6E] group-hover:to-[#D8B98D]"
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
