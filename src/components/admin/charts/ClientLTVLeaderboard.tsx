'use client';

/* ================================================================
   ClientLTVLeaderboard — top 20 clients with sparklines
   ================================================================
   Table-style list showing top clients by CAD revenue. Each row has
   an inline 12-month sparkline so you can see the trajectory at a
   glance. Click a row to see their full invoice history in History.
   ================================================================ */

import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { DashboardClientLTV } from '@/lib/invoicing/dashboard-stats';

const PLUM = '#7A3B5E';
const GOLD = '#C8A97D';

const COUNTRY_FLAGS: Record<string, string> = {
  CA: '🇨🇦', US: '🇺🇸', AE: '🇦🇪', SA: '🇸🇦', KW: '🇰🇼',
  QA: '🇶🇦', BH: '🇧🇭', OM: '🇴🇲', JO: '🇯🇴', LB: '🇱🇧',
  EG: '🇪🇬', MA: '🇲🇦', TN: '🇹🇳', GB: '🇬🇧',
};

function fmtCAD(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-[12px]">🥇</span>;
  if (rank === 2) return <span className="text-[12px]">🥈</span>;
  if (rank === 3) return <span className="text-[12px]">🥉</span>;
  return (
    <span className="text-[10px] font-mono font-bold text-[#8E8E9F] tabular-nums w-5 text-right">
      {rank}
    </span>
  );
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width={60} height={24}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function ClientLTVLeaderboard({
  data,
  onClientClick,
}: {
  data: DashboardClientLTV[];
  onClientClick?: (email: string) => void;
}) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-[#8E8E9F]">
        No client data yet
      </div>
    );
  }

  return (
    <div className="max-h-[360px] overflow-y-auto">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-white z-10 border-b border-[#F3EFE8]">
          <tr>
            <th className="px-2 py-2 text-left text-[9px] uppercase tracking-wider text-[#8E8E9F] font-semibold w-6">
              #
            </th>
            <th className="px-2 py-2 text-left text-[9px] uppercase tracking-wider text-[#8E8E9F] font-semibold">
              Client
            </th>
            <th className="px-2 py-2 text-left text-[9px] uppercase tracking-wider text-[#8E8E9F] font-semibold">
              12-mo trend
            </th>
            <th className="px-2 py-2 text-right text-[9px] uppercase tracking-wider text-[#8E8E9F] font-semibold">
              Paid CAD
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((client, i) => {
            const hasActivity = client.last12MonthsSparkline.some((v) => v > 0);
            return (
              <tr
                key={client.email}
                className="border-t border-[#F3EFE8] hover:bg-[#FAF7F2] cursor-pointer transition-colors"
                onClick={() => onClientClick?.(client.email)}
              >
                <td className="px-2 py-2">
                  <RankBadge rank={i + 1} />
                </td>
                <td className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#7A3B5E] to-[#5A2D47] text-white flex items-center justify-center text-[9px] font-bold">
                      {initialsOf(client.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold text-[#2D2A33] truncate">
                        {client.name} {COUNTRY_FLAGS[client.country] || ''}
                      </div>
                      <div className="text-[9px] text-[#8E8E9F]">
                        {client.invoiceCount}{' '}
                        {client.invoiceCount === 1 ? 'invoice' : 'invoices'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2">
                  {hasActivity ? (
                    <MiniSparkline
                      data={client.last12MonthsSparkline}
                      color={i < 3 ? GOLD : PLUM}
                    />
                  ) : (
                    <span className="text-[9px] text-[#8E8E9F] italic">
                      no recent activity
                    </span>
                  )}
                </td>
                <td className="px-2 py-2 text-right tabular-nums font-bold text-[#2D2A33]">
                  {fmtCAD(client.totalCAD)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
