'use client';

/* ================================================================
   ObjectivesRail — sticky right-side panel that scrolls with the
   user, showing learning objectives with auto-ticking based on
   completed block IDs (plus manual toggle).
   ================================================================ */

import { useState, useEffect, useMemo } from 'react';
import { Target, Check, ChevronDown } from 'lucide-react';
import type { LearningObjective } from '@/types';
import { t } from '@/lib/academy-helpers';

interface Props {
  objectives: LearningObjective[];
  completedBlockIds: string[];
  moduleSlug: string;
  isRTL: boolean;
  color: string;
}

export default function ObjectivesRail({
  objectives,
  completedBlockIds,
  moduleSlug,
  isRTL,
  color,
}: Props) {
  const storageKey = `academy:objectives:${moduleSlug}`;
  const [manualTicks, setManualTicks] = useState<Record<number, boolean>>({});
  const [collapsed, setCollapsed] = useState(false);

  // Load manual overrides
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // legacy format: boolean[]
          const next: Record<number, boolean> = {};
          parsed.forEach((v, i) => { if (v) next[i] = true; });
          setManualTicks(next);
        } else if (parsed && typeof parsed === 'object') {
          setManualTicks(parsed);
        }
      }
    } catch {}
  }, [storageKey]);

  const completedSet = useMemo(() => new Set(completedBlockIds), [completedBlockIds]);

  // Auto-tick: objective is "auto-done" if all its relatedBlockIds are in completedSet
  const isDone = (obj: LearningObjective, i: number): boolean => {
    if (manualTicks[i]) return true;
    if (!obj.relatedBlockIds?.length) return false;
    return obj.relatedBlockIds.every(id => completedSet.has(id));
  };

  const toggle = (i: number) => {
    setManualTicks(prev => {
      const next = { ...prev, [i]: !prev[i] };
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const doneCount = objectives.filter((o, i) => isDone(o, i)).length;
  const pct = objectives.length > 0 ? Math.round((doneCount / objectives.length) * 100) : 0;

  return (
    <aside
      dir={isRTL ? 'rtl' : 'ltr'}
      className="hidden xl:block fixed top-32 right-4 w-[280px] z-10"
    >
      <div className="bg-white rounded-2xl border border-[#F3EFE8] shadow-sm overflow-hidden">
        <button
          onClick={() => setCollapsed(v => !v)}
          className="w-full px-4 py-3 flex items-center gap-2 border-b border-[#F3EFE8] bg-[#FAF7F2] hover:bg-[#F3EFE8]/50 transition-colors"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${color}12` }}
          >
            <Target className="w-3.5 h-3.5" style={{ color }} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E9F]">
              {isRTL ? 'أَهْدافُ التَّعَلُّم' : 'Learning Objectives'}
            </p>
            <p className="text-xs text-[#2D2A33] font-medium">
              {doneCount}/{objectives.length} · {pct}%
            </p>
          </div>
          <ChevronDown className={`w-4 h-4 text-[#8E8E9F] transition-transform ${collapsed ? '-rotate-90' : ''}`} />
        </button>

        {/* Progress bar */}
        <div className="h-1 bg-[#F3EFE8]">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        </div>

        {!collapsed && (
          <ul className="p-2 space-y-0.5 max-h-[calc(100vh-14rem)] overflow-y-auto">
            {objectives.map((obj, i) => {
              const done = isDone(obj, i);
              const auto = done && !manualTicks[i];
              return (
                <li key={i}>
                  <button
                    onClick={() => toggle(i)}
                    className="flex items-start gap-2.5 w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#FAF7F2] transition-colors group"
                    title={auto ? (isRTL ? 'تَمَّ تِلْقائِيّاً' : 'Auto-ticked from progress') : ''}
                  >
                    <span
                      className={`w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                        done ? 'border-transparent' : 'border-[#D6D1C8] group-hover:border-[color:var(--c)]'
                      }`}
                      style={{ '--c': color, backgroundColor: done ? color : 'transparent' } as React.CSSProperties}
                    >
                      {done && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                    </span>
                    <span
                      className={`text-xs leading-snug transition-colors ${
                        done ? 'text-[#8E8E9F]' : 'text-[#4A4A5C]'
                      }`}
                    >
                      {t(obj.textEn, obj.textAr, isRTL)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
