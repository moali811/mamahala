'use client';

/* ================================================================
   SeasonalCalendar — 365-day GitHub-style contribution grid
   ================================================================
   Custom SVG (no recharts dependency for this one — recharts doesn't
   ship a heatmap). Shows 53 columns × 7 rows of cells, each cell
   colored by the day's revenue. Hover for tooltip.
   ================================================================ */

import { useState } from 'react';
import type { DashboardSeasonalDay } from '@/lib/invoicing/dashboard-stats';

const CELL = 11;
const GAP = 2;
const COLS = 53;
const ROWS = 7;

// Gradient from cream (no activity) to deep plum (max revenue)
const COLOR_STOPS = [
  '#F3EFE8', // 0 — no activity
  '#E8D5D8', // low
  '#D5A8B0', // medium
  '#B76C80', // high
  '#7A3B5E', // max
];

function colorForValue(value: number, maxValue: number): string {
  if (value === 0) return COLOR_STOPS[0];
  const ratio = maxValue > 0 ? value / maxValue : 0;
  if (ratio < 0.25) return COLOR_STOPS[1];
  if (ratio < 0.5) return COLOR_STOPS[2];
  if (ratio < 0.75) return COLOR_STOPS[3];
  return COLOR_STOPS[4];
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function fmtCAD(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

export default function SeasonalCalendar({
  data,
}: {
  data: DashboardSeasonalDay[];
}) {
  const [hover, setHover] = useState<DashboardSeasonalDay | null>(null);

  if (data.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-xs text-[#8E8E9F]">
        No seasonal data yet
      </div>
    );
  }

  // Normalize to 371 cells (53 × 7) — pad the start with empty cells to
  // align the first day with its day-of-week column.
  const firstDayOfWeek = new Date(data[0].date).getDay(); // 0 = Sunday
  const paddingStart = firstDayOfWeek;
  const cells: (DashboardSeasonalDay | null)[] = [];
  for (let i = 0; i < paddingStart; i++) cells.push(null);
  for (const d of data) cells.push(d);
  while (cells.length < COLS * ROWS) cells.push(null);

  const maxRevenue = Math.max(...data.map((d) => d.revenueCAD), 1);

  const width = COLS * (CELL + GAP) + 60; // +60 for month labels
  const height = ROWS * (CELL + GAP) + 20;

  // Compute month labels — show the first cell of each new month
  const monthLabels: Array<{ col: number; label: string }> = [];
  let currentMonth = '';
  cells.forEach((cell, i) => {
    if (!cell) return;
    const month = cell.date.slice(0, 7);
    if (month !== currentMonth) {
      const col = Math.floor(i / ROWS);
      const monthLabel = new Date(cell.date).toLocaleDateString('en-US', {
        month: 'short',
      });
      monthLabels.push({ col, label: monthLabel });
      currentMonth = month;
    }
  });

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <svg width={width} height={height} role="img" aria-label="Seasonal calendar">
          {/* Month labels */}
          {monthLabels.map((m, i) => {
            const x = m.col * (CELL + GAP) + 20;
            // Skip labels that are too close together
            if (i > 0 && x - (monthLabels[i - 1].col * (CELL + GAP) + 20) < 28) return null;
            return (
              <text
                key={`${m.col}-${m.label}`}
                x={x}
                y={10}
                fontSize={9}
                fill="#8E8E9F"
                fontWeight={500}
              >
                {m.label}
              </text>
            );
          })}
          {/* Day-of-week labels */}
          {['', 'Mon', '', 'Wed', '', 'Fri', ''].map(
            (label, i) =>
              label && (
                <text
                  key={label}
                  x={0}
                  y={i * (CELL + GAP) + 25}
                  fontSize={8}
                  fill="#8E8E9F"
                >
                  {label}
                </text>
              ),
          )}
          {/* Cells */}
          {cells.map((cell, i) => {
            const col = Math.floor(i / ROWS);
            const row = i % ROWS;
            const x = col * (CELL + GAP) + 20;
            const y = row * (CELL + GAP) + 18;
            const fill = cell ? colorForValue(cell.revenueCAD, maxRevenue) : '#FAF7F2';
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={CELL}
                height={CELL}
                rx={2}
                fill={fill}
                stroke={cell && cell === hover ? '#7A3B5E' : 'none'}
                strokeWidth={cell && cell === hover ? 1.5 : 0}
                style={{ cursor: cell ? 'pointer' : 'default' }}
                onMouseEnter={() => cell && setHover(cell)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-2 text-[9px] text-[#8E8E9F]">
        <span>Less</span>
        {COLOR_STOPS.map((c, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: c }}
          />
        ))}
        <span>More</span>
      </div>

      {/* Hover tooltip */}
      {hover && (
        <div className="absolute top-0 right-0 bg-white border border-[#EDE8DF] rounded-lg shadow-lg px-3 py-1.5 pointer-events-none">
          <div className="text-[10px] font-semibold text-[#8E8E9F] mb-0.5">
            {fmtDate(hover.date)}
          </div>
          <div className="text-xs font-bold text-[#2D2A33] tabular-nums">
            {hover.count > 0 ? (
              <>
                {fmtCAD(hover.revenueCAD)}
                <span className="text-[9px] text-[#8E8E9F] font-normal ml-1">
                  · {hover.count} {hover.count === 1 ? 'invoice' : 'invoices'}
                </span>
              </>
            ) : (
              <span className="text-[#8E8E9F] font-normal">No activity</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
