'use client';

/* ================================================================
   PredictiveForecast — 16-week revenue line with confidence band
   ================================================================
   Shows 12 past weeks (actual) + 4 future weeks (forecast with
   confidence interval). The forecast section is visually
   distinguished with a dashed line and shaded confidence band.
   ================================================================ */

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { DashboardForecastPoint } from '@/lib/invoicing/dashboard-stats';

interface TooltipPropsShim {
  active?: boolean;
  payload?: Array<{
    payload?: Record<string, unknown>;
  }>;
}

const PLUM = '#7A3B5E';
const GOLD = '#C8A97D';

function fmtCAD(n: number): string {
  if (n >= 1000) return `CA$${(n / 1000).toFixed(1)}k`;
  return `CA$${Math.round(n)}`;
}

function fmtWeek(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

interface ChartDatum extends DashboardForecastPoint {
  weekLabel: string;
  isFuture: boolean;
}

function ForecastTooltip({ active, payload }: TooltipPropsShim) {
  if (!active || !payload || payload.length === 0) return null;
  const datum = payload[0].payload as unknown as ChartDatum;
  return (
    <div className="bg-white border border-[#EDE8DF] rounded-lg shadow-lg px-3 py-2">
      <div className="text-[10px] font-semibold text-[#8E8E9F] mb-1">
        Week of {datum.weekLabel}
      </div>
      {datum.isFuture ? (
        <>
          <div className="text-xs font-bold text-[#7A3B5E] tabular-nums">
            Forecast: {fmtCAD(datum.forecastCAD)}
          </div>
          <div className="text-[9px] text-[#8E8E9F]">
            Range: {fmtCAD(datum.confidenceLow)}–{fmtCAD(datum.confidenceHigh)}
          </div>
        </>
      ) : (
        <div className="text-xs font-bold text-[#2D2A33] tabular-nums">
          Actual: {fmtCAD(datum.actualCAD || 0)}
        </div>
      )}
    </div>
  );
}

export default function PredictiveForecast({
  data,
}: {
  data: DashboardForecastPoint[];
}) {
  if (data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-xs text-[#8E8E9F]">
        Not enough data for forecast
      </div>
    );
  }

  const chartData: ChartDatum[] = data.map((p) => ({
    ...p,
    weekLabel: fmtWeek(p.weekStart),
    isFuture: p.actualCAD === null,
  }));

  // Find the boundary between actual and forecast for the reference line
  const boundaryIdx = chartData.findIndex((d) => d.isFuture);
  const boundaryLabel = boundaryIdx > 0 ? chartData[boundaryIdx].weekLabel : null;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart
        data={chartData}
        margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity={0.25} />
            <stop offset="100%" stopColor={GOLD} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke="#FAF7F2" vertical={false} />
        <XAxis
          dataKey="weekLabel"
          stroke="#8E8E9F"
          fontSize={9}
          tickLine={false}
          axisLine={{ stroke: '#F3EFE8' }}
        />
        <YAxis
          stroke="#8E8E9F"
          fontSize={10}
          tickLine={false}
          axisLine={{ stroke: '#F3EFE8' }}
          tickFormatter={(v) => fmtCAD(v)}
        />
        <Tooltip content={<ForecastTooltip />} />
        {boundaryLabel && (
          <ReferenceLine
            x={boundaryLabel}
            stroke={GOLD}
            strokeDasharray="3 3"
            label={{
              value: 'Now',
              position: 'top',
              fill: GOLD,
              fontSize: 9,
              fontWeight: 600,
            }}
          />
        )}
        {/* Confidence band (only future weeks have this visible) */}
        <Area
          type="monotone"
          dataKey="confidenceHigh"
          stroke="none"
          fill="url(#confidenceGradient)"
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="confidenceLow"
          stroke="none"
          fill="white"
          fillOpacity={1}
          isAnimationActive={false}
        />
        {/* Actual (past) line */}
        <Line
          type="monotone"
          dataKey="actualCAD"
          stroke={PLUM}
          strokeWidth={2.5}
          dot={{ fill: PLUM, r: 3 }}
          connectNulls={false}
          isAnimationActive={false}
        />
        {/* Forecast line */}
        <Line
          type="monotone"
          dataKey="forecastCAD"
          stroke={PLUM}
          strokeWidth={2}
          strokeDasharray="4 4"
          dot={{ fill: GOLD, r: 3 }}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
