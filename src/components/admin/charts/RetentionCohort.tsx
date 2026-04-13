'use client';

/* ================================================================
   RetentionCohort — month-over-month retention matrix
   ================================================================
   Each row is a cohort month. Columns show retention percentage
   at offset 0, +1, +2, +3, +4, +5 months. Cells are color-coded
   green (high retention) to amber (low retention).
   ================================================================ */

import type { DashboardRetentionCohort } from '@/lib/invoicing/dashboard-stats';

function cellColor(percent: number): { bg: string; text: string } {
  if (percent >= 70) return { bg: '#D1FAE5', text: '#065F46' }; // green
  if (percent >= 40) return { bg: '#FEF3C7', text: '#92400E' }; // amber
  if (percent >= 15) return { bg: '#FED7AA', text: '#9A3412' }; // orange
  if (percent > 0) return { bg: '#FECACA', text: '#991B1B' }; // red
  return { bg: '#FAF7F2', text: '#C8C8D0' }; // muted
}

function monthLabel(ym: string): string {
  try {
    const [y, m] = ym.split('-');
    const d = new Date(Number(y), Number(m) - 1, 1);
    return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  } catch {
    return ym;
  }
}

export default function RetentionCohort({
  data,
}: {
  data: DashboardRetentionCohort[];
}) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-[#8E8E9F]">
        No cohort data yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-h-[320px] overflow-y-auto">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="border-b border-[#F3EFE8]">
            <th className="px-2 py-1.5 text-left text-[9px] uppercase tracking-wider text-[#8E8E9F] font-semibold">
              Cohort
            </th>
            <th className="px-2 py-1.5 text-right text-[9px] uppercase tracking-wider text-[#8E8E9F] font-semibold">
              Size
            </th>
            {[0, 1, 2, 3, 4, 5].map((offset) => (
              <th
                key={offset}
                className="px-2 py-1.5 text-center text-[9px] uppercase tracking-wider text-[#8E8E9F] font-semibold"
              >
                M+{offset}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((cohort) => (
            <tr key={cohort.cohortMonth} className="border-t border-[#F3EFE8]">
              <td className="px-2 py-1.5 text-[10px] font-semibold text-[#4A4A5C] whitespace-nowrap">
                {monthLabel(cohort.cohortMonth)}
              </td>
              <td className="px-2 py-1.5 text-right text-[10px] tabular-nums text-[#8E8E9F]">
                {cohort.cohortSize}
              </td>
              {cohort.retention.map((percent, i) => {
                const { bg, text } = cellColor(percent);
                return (
                  <td key={i} className="px-1 py-1">
                    <div
                      className="text-center text-[10px] font-bold rounded py-1 tabular-nums"
                      style={{ backgroundColor: bg, color: text }}
                      title={`${percent}% still active in month +${i}`}
                    >
                      {percent}%
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
