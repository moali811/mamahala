'use client';

/* ================================================================
   ServiceTreemap — hierarchical service revenue breakdown
   ================================================================
   Each leaf is a service slug. Box area is proportional to CAD
   revenue. Colors rotate through the plum palette family so the
   categories are visually distinct but cohesive.
   ================================================================ */

import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { DashboardServiceMixNode } from '@/lib/invoicing/dashboard-stats';

interface TooltipPropsShim {
  active?: boolean;
  payload?: Array<{
    payload?: Record<string, unknown>;
  }>;
}

const PALETTE = [
  '#7A3B5E',
  '#9D5B80',
  '#C4878A',
  '#C8A97D',
  '#D4B896',
  '#E4CFA8',
  '#B89B6E',
  '#8B5A7A',
];

function fmtCAD(n: number): string {
  if (n >= 1000) return `CA$${(n / 1000).toFixed(1)}k`;
  return `CA$${Math.round(n)}`;
}

interface TreemapDatum {
  name: string;
  size: number;
  count: number;
  fill: string;
  // Index signature required by recharts TreemapDataType
  [key: string]: string | number;
}

function TreemapTooltip({ active, payload }: TooltipPropsShim) {
  if (!active || !payload || payload.length === 0) return null;
  const datum = payload[0].payload as unknown as TreemapDatum;
  return (
    <div className="bg-white border border-[#EDE8DF] rounded-lg shadow-lg px-3 py-2">
      <div className="text-xs font-bold text-[#2D2A33] mb-1">{datum.name}</div>
      <div className="text-sm font-semibold text-[#7A3B5E] tabular-nums">
        {fmtCAD(datum.size)}
      </div>
      <div className="text-[10px] text-[#8E8E9F]">
        {datum.count} session{datum.count === 1 ? '' : 's'}
      </div>
    </div>
  );
}

// Custom cell renderer to show service name + value inside each box
interface TreemapCellProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  size?: number;
  fill?: string;
  count?: number;
}

function TreemapCell(props: TreemapCellProps) {
  const { x = 0, y = 0, width = 0, height = 0, name, size, fill = '#7A3B5E' } = props;
  const canShowLabel = width > 60 && height > 40;
  const canShowValue = width > 80 && height > 55;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke="#FAF7F2"
        strokeWidth={2}
      />
      {canShowLabel && (
        <text
          x={x + 8}
          y={y + 18}
          fill="white"
          fontSize={11}
          fontWeight={600}
          style={{ pointerEvents: 'none' }}
        >
          {(name || '').slice(0, 18)}
          {(name || '').length > 18 ? '…' : ''}
        </text>
      )}
      {canShowValue && (
        <text
          x={x + 8}
          y={y + 34}
          fill="white"
          fontSize={13}
          fontWeight={700}
          style={{ pointerEvents: 'none', opacity: 0.85 }}
        >
          {fmtCAD(size || 0)}
        </text>
      )}
    </g>
  );
}

export default function ServiceTreemap({
  data,
}: {
  data: DashboardServiceMixNode[];
}) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-[#8E8E9F]">
        No service data yet
      </div>
    );
  }

  const treemapData: TreemapDatum[] = data.map((node, i) => ({
    name: node.serviceName,
    size: node.revenueCAD,
    count: node.count,
    fill: PALETTE[i % PALETTE.length],
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <Treemap
        data={treemapData}
        dataKey="size"
        stroke="#FAF7F2"
        isAnimationActive={false}
        content={<TreemapCell />}
      >
        <Tooltip content={<TreemapTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
}
