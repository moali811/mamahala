'use client';

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { FillableTableBlock } from '@/types/toolkit';
import type { ToolkitBlockContext } from '../ToolkitBlockRenderer';

/* ── localStorage helper for 2D grid ─────────────────────────── */
function useAutoSaveGrid(key: string, rows: number, cols: number) {
  const [grid, setGrid] = useState<string[][]>(() =>
    Array.from({ length: rows }, () => Array(cols).fill(''))
  );
  useEffect(() => {
    try {
      const s = localStorage.getItem(key);
      if (s) {
        const parsed = JSON.parse(s);
        // Ensure proper dimensions
        const restored = Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => parsed[r]?.[c] ?? '')
        );
        setGrid(restored);
      }
    } catch {}
  }, [key, rows, cols]);
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(grid)); } catch {}
  }, [key, grid]);
  const setCell = (r: number, c: number, v: string) => {
    setGrid(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = v;
      return next;
    });
  };
  return [grid, setCell] as const;
}

/* ── Main Component ───────────────────────────────────────────── */
export default function FillableTableBlockView({ block, ctx }: { block: FillableTableBlock; ctx: ToolkitBlockContext }) {
  const prefix = `toolkit:${ctx.toolkitSlug}:${block.id}`;
  const isRTL = ctx.isRTL;
  const color = ctx.color;
  const title = block.titleEn ? t(block.titleEn, block.titleAr || '', isRTL) : null;
  const [grid, setCell] = useAutoSaveGrid(`${prefix}:grid`, block.rows, block.columns.length);

  const headers = block.columns.map(col => t(col.headerEn, col.headerAr, isRTL));

  return (
    <div
      className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Gradient top border */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }} />

      <div className="p-5 sm:p-6">
        {title && (
          <h3 className="text-lg font-semibold text-[#2D2A33] mb-5">{title}</h3>
        )}

        {/* ── Desktop table ─────────────────────────────────── */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {headers.map((header, ci) => (
                  <th
                    key={ci}
                    className="text-xs font-semibold text-[#2D2A33] px-3 py-2.5 text-start"
                    style={{
                      backgroundColor: `${color}0D`,
                      width: block.columns[ci].width || 'auto',
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: block.rows }, (_, ri) => (
                <tr key={ri} className="border-t border-[#F3EFE8]">
                  {block.columns.map((_, ci) => (
                    <td key={ci} className="p-1.5">
                      <input
                        type="text"
                        value={grid[ri]?.[ci] ?? ''}
                        onChange={e => setCell(ri, ci, e.target.value)}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className="w-full px-3 py-2 rounded-lg border border-[#F3EFE8] text-sm text-[#4A4A5C] focus:outline-none focus:ring-2"
                        style={{ '--tw-ring-color': `${color}33` } as React.CSSProperties}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile card layout ────────────────────────────── */}
        <div className="md:hidden space-y-4">
          {Array.from({ length: block.rows }, (_, ri) => (
            <div
              key={ri}
              className="rounded-xl border border-[#F3EFE8] p-4 space-y-3"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B0B0C0]">
                {isRTL ? `صفّ ${ri + 1}` : `Row ${ri + 1}`}
              </span>
              {block.columns.map((col, ci) => {
                const header = t(col.headerEn, col.headerAr, isRTL);
                return (
                  <div key={ci}>
                    <label className="block text-xs font-semibold text-[#2D2A33] mb-1">
                      {header}
                    </label>
                    <input
                      type="text"
                      value={grid[ri]?.[ci] ?? ''}
                      onChange={e => setCell(ri, ci, e.target.value)}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      className="w-full px-3 py-2 rounded-lg border border-[#F3EFE8] text-sm text-[#4A4A5C] focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': `${color}33` } as React.CSSProperties}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Auto-saved */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#F3EFE8]">
          <CheckCircle className="w-3 h-3 text-[#5A8B6F]" />
          <p className="text-[10px] text-[#B0B0C0]">
            {isRTL ? 'يُحْفَظُ تِلْقائيّاً' : 'Auto-saved'}
          </p>
        </div>
      </div>
    </div>
  );
}
