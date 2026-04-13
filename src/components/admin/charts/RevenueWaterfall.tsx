'use client';

/* ================================================================
   RevenueWaterfall — monthly revenue area + bar chart
   ================================================================
   Shows up to 24 months of paid revenue with a gradient area chart
   (revenue line) overlaid on a bar chart (invoice count). Recharts
   renders the SVG; the data comes from DashboardView.trend.
   ================================================================ */

import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import type { DashboardTrendPoint } from '@/lib/invoicing/dashboard-stats';

interface TooltipPropsShim {
  active?: boolean;
  payload?: Array<{
    dataKey?: string | number;
    value?: number | string;
    payload?: Record<string, unknown>;
  }>;
  label?: string | number;
}

const PLUM = '#7A3B5E';
const GOLD = '#C8A97D';
const CREAM = '#FAF7F2';

function fmtCAD(n: number): string {
  if (n >= 1000) return `CA$${(n / 1000).toFixed(1)}k`;
  return `CA$${Math.round(n)}`;
}

function CustomTooltip({ active, payload, label }: TooltipPropsShim) {
  if (!active || !payload || payload.length === 0) return null;
  const revenue = payload.find((p) => p.dataKey === 'revenueCAD')?.value ?? 0;
  const count = payload.find((p) => p.dataKey === 'count')?.value ?? 0;
  return (
    <div className="bg-white border border-[#EDE8DF] rounded-lg shadow-lg px-3 py-2">
      <div className="text-[10px] font-semibold text-[#8E8E9F] uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-sm font-bold text-[#2D2A33] tabular-nums">
        {fmtCAD(revenue as number)}
      </div>
      <div className="text-[10px] text-[#8E8E9F]">
        {count} invoice{count === 1 ? '' : 's'}
      </div>
    </div>
  );
}

export default function RevenueWaterfall({
  data,
}: {
  data: DashboardTrendPoint[];
}) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-[#8E8E9F]">
        No revenue data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart
        data={data}
        margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PLUM} stopOpacity={0.4} />
            <stop offset="100%" stopColor={PLUM} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke={CREAM} vertical={false} />
        <XAxis
          dataKey="monthLabel"
          stroke="#8E8E9F"
          fontSize={10}
          tickLine={false}
          axisLine={{ stroke: CREAM }}
        />
        <YAxis
          yAxisId="left"
          stroke="#8E8E9F"
          fontSize={10}
          tickLine={false}
          axisLine={{ stroke: CREAM }}
          tickFormatter={(v) => fmtCAD(v)}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#8E8E9F"
          fontSize={10}
          tickLine={false}
          axisLine={{ stroke: CREAM }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            fontSize: '10px',
            color: '#8E8E9F',
          }}
          iconType="circle"
        />
        <Bar
          yAxisId="right"
          dataKey="count"
          fill={GOLD}
          opacity={0.35}
          name="Invoices"
          radius={[4, 4, 0, 0]}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="revenueCAD"
          stroke={PLUM}
          strokeWidth={2.5}
          fill="url(#revenueGradient)"
          name="Revenue"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
