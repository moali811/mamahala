'use client';

/* ================================================================
   RelationshipDepth — histogram of customer invoice counts
   ================================================================
   Groups customers into buckets by their total invoice count:
   1, 2-5, 6-10, 11-20, 21+. Shows both the count of customers
   and the total revenue for each bucket.
   ================================================================ */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import type { DashboardRelationshipBucket } from '@/lib/invoicing/dashboard-stats';

interface TooltipPropsShim {
  active?: boolean;
  payload?: Array<{
    payload?: Record<string, unknown>;
  }>;
}

const BUCKET_COLORS = [
  '#E4CFA8', // 1 invoice — light
  '#C8A97D', // 2-5
  '#B76C80', // 6-10
  '#8B5A7A', // 11-20
  '#7A3B5E', // 21+ — deepest
];

function fmtCAD(n: number): string {
  if (n >= 1000) return `CA$${(n / 1000).toFixed(1)}k`;
  return `CA$${Math.round(n)}`;
}

function DepthTooltip({ active, payload }: TooltipPropsShim) {
  if (!active || !payload || payload.length === 0) return null;
  const datum = payload[0].payload as unknown as DashboardRelationshipBucket;
  return (
    <div className="bg-white border border-[#EDE8DF] rounded-lg shadow-lg px-3 py-2">
      <div className="text-xs font-bold text-[#2D2A33] mb-1">{datum.label}</div>
      <div className="text-[10px] text-[#8E8E9F]">
        {datum.count} client{datum.count === 1 ? '' : 's'}
      </div>
      <div className="text-[10px] font-semibold text-[#7A3B5E]">
        {fmtCAD(datum.revenueCAD)} total
      </div>
    </div>
  );
}

export default function RelationshipDepth({
  data,
}: {
  data: DashboardRelationshipBucket[];
}) {
  if (data.length === 0 || data.every((b) => b.count === 0)) {
    return (
      <div className="h-48 flex items-center justify-center text-xs text-[#8E8E9F]">
        No relationship data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="2 4" stroke="#FAF7F2" vertical={false} />
        <XAxis
          dataKey="label"
          stroke="#8E8E9F"
          fontSize={10}
          tickLine={false}
          axisLine={{ stroke: '#F3EFE8' }}
        />
        <YAxis
          stroke="#8E8E9F"
          fontSize={10}
          tickLine={false}
          axisLine={{ stroke: '#F3EFE8' }}
          allowDecimals={false}
        />
        <Tooltip content={<DepthTooltip />} cursor={{ fill: '#FAF7F2' }} />
        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={BUCKET_COLORS[i] || BUCKET_COLORS[0]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
