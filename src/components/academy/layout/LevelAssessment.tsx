'use client';

/* ================================================================
   LevelAssessment — baseline + outcome self-assessment per level.
   Users rate themselves on 4 dimensions BEFORE starting the level,
   then again AFTER completing all modules. Shows delta to prove
   growth — answers the buyer's question "did this program change X?"
   ================================================================ */

import { useState, useEffect } from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';
import { t } from '@/lib/academy-helpers';

export interface LevelDimension {
  labelEn: string;
  labelAr: string;
}

interface Scores { [key: number]: number }

interface Props {
  programSlug: string;
  levelNumber: number;
  dimensions: LevelDimension[];
  isRTL: boolean;
  color: string;
  levelComplete?: boolean; // true when all modules in this level are done
}

const BASELINE_LABELS = {
  en: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
  ar: ['أَبَداً', 'نادِراً', 'أَحْياناً', 'غالِباً', 'دائِماً'],
};

export default function LevelAssessment({
  programSlug,
  levelNumber,
  dimensions,
  isRTL,
  color,
  levelComplete,
}: Props) {
  const baselineKey = `academy:assessment:${programSlug}:level-${levelNumber}:baseline`;
  const outcomeKey = `academy:assessment:${programSlug}:level-${levelNumber}:outcome`;

  const [baseline, setBaseline] = useState<Scores | null>(null);
  const [outcome, setOutcome] = useState<Scores | null>(null);
  const [mode, setMode] = useState<'baseline' | 'outcome' | null>(null);
  const [draft, setDraft] = useState<Scores>({});

  useEffect(() => {
    try {
      const b = localStorage.getItem(baselineKey);
      if (b) setBaseline(JSON.parse(b));
      const o = localStorage.getItem(outcomeKey);
      if (o) setOutcome(JSON.parse(o));
    } catch {}
  }, [baselineKey, outcomeKey]);

  const startBaseline = () => { setDraft({}); setMode('baseline'); };
  const startOutcome = () => { setDraft({}); setMode('outcome'); };

  const saveAssessment = () => {
    if (Object.keys(draft).length !== dimensions.length) return;
    if (mode === 'baseline') {
      localStorage.setItem(baselineKey, JSON.stringify(draft));
      setBaseline(draft);
    } else if (mode === 'outcome') {
      localStorage.setItem(outcomeKey, JSON.stringify(draft));
      setOutcome(draft);
    }
    setMode(null);
  };

  // Assessment form (baseline or outcome)
  if (mode) {
    return (
      <div className="rounded-2xl border p-5 mb-4" style={{ borderColor: `${color}40`, background: `${color}06` }}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4" style={{ color }} />
          <h3 className="text-sm font-bold text-[#2D2A33]">
            {mode === 'baseline'
              ? (isRTL ? 'تَقْييمٌ أَوَّلِيّ' : 'Baseline self-check')
              : (isRTL ? 'تَقْييمٌ بَعْدَ المُسْتَوى' : 'Post-level self-check')}
          </h3>
        </div>
        <p className="text-xs text-[#6B6580] mb-4 leading-relaxed">
          {isRTL ? 'قَيِّمْ نَفْسَكَ بِصِدْقٍ — سَنُقارِنُ النَّتائِجَ بَعْدَ اِنْتِهاءِ المُسْتَوى.' : 'Rate yourself honestly — we\'ll compare results once the level is complete.'}
        </p>
        <div className="space-y-4">
          {dimensions.map((dim, i) => (
            <div key={i}>
              <p className="text-xs text-[#2D2A33] mb-2 leading-snug">{t(dim.labelEn, dim.labelAr, isRTL)}</p>
              <div className="flex gap-1.5" dir="ltr">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setDraft(d => ({ ...d, [i]: n }))}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${
                      draft[i] === n ? 'text-white border-transparent' : 'border-[#F3EFE8] bg-white text-[#8E8E9F] hover:border-[color:var(--c)]'
                    }`}
                    style={{
                      '--c': color,
                      backgroundColor: draft[i] === n ? color : undefined,
                    } as React.CSSProperties}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-[#B0B0C0] mt-1 px-0.5" dir={isRTL ? 'rtl' : 'ltr'}>
                <span>{isRTL ? BASELINE_LABELS.ar[0] : BASELINE_LABELS.en[0]}</span>
                <span>{isRTL ? BASELINE_LABELS.ar[4] : BASELINE_LABELS.en[4]}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setMode(null)}
            className="flex-1 py-2 rounded-lg text-xs font-medium border border-[#F3EFE8] text-[#8E8E9F] hover:bg-[#FAF7F2]"
          >
            {isRTL ? 'إلْغاء' : 'Cancel'}
          </button>
          <button
            onClick={saveAssessment}
            disabled={Object.keys(draft).length !== dimensions.length}
            className="flex-1 py-2 rounded-lg text-xs font-semibold text-white disabled:opacity-40"
            style={{ backgroundColor: color }}
          >
            {isRTL ? 'حِفْظ' : 'Save'}
          </button>
        </div>
      </div>
    );
  }

  // No baseline yet — prompt to take it
  if (!baseline) {
    return (
      <button
        onClick={startBaseline}
        className="w-full rounded-2xl border-2 border-dashed p-4 mb-4 flex items-center gap-3 hover:bg-white transition-colors text-left"
        style={{ borderColor: `${color}40` }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15`, color }}>
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#2D2A33]">
            {isRTL ? 'اِبْدَأ بِتَقْييمٍ ذاتِيٍّ سَريع' : 'Start with a quick self-check'}
          </p>
          <p className="text-[11px] text-[#8E8E9F]">
            {isRTL ? '60 ثانِيَة · خَطٌّ أَساسٌ لِقِياسِ نُمُوِّك' : '60 seconds · baseline to measure your growth'}
          </p>
        </div>
        <span className="text-xs font-semibold" style={{ color }}>{isRTL ? 'اِبْدَأ ←' : 'Start →'}</span>
      </button>
    );
  }

  // Baseline captured, level not complete → show encouragement
  if (baseline && !outcome && !levelComplete) {
    const avg = Object.values(baseline).reduce((s, v) => s + v, 0) / dimensions.length;
    return (
      <div className="rounded-2xl border border-[#F3EFE8] bg-white p-4 mb-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#F0F7F4] flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-[#3B8A6E]" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-[#2D2A33]">
            {isRTL ? `خَطُّ الأَساسِ مُسَجَّل: ${avg.toFixed(1)}/5` : `Baseline saved: ${avg.toFixed(1)}/5`}
          </p>
          <p className="text-[10px] text-[#8E8E9F]">
            {isRTL ? 'أَكْمِل وِحْداتِ المُسْتَوى لِتَرَى نُمُوَّك.' : 'Finish the level modules to see your growth.'}
          </p>
        </div>
      </div>
    );
  }

  // Level complete but outcome not taken
  if (baseline && !outcome && levelComplete) {
    return (
      <button
        onClick={startOutcome}
        className="w-full rounded-2xl border-2 p-4 mb-4 flex items-center gap-3 hover:shadow-sm transition-all text-left"
        style={{ borderColor: color, background: `${color}08` }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: color }}>
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#2D2A33]">
            {isRTL ? 'أَكْمَلْت المُسْتَوى! شاهِد نُمُوَّك' : 'Level complete! See your growth'}
          </p>
          <p className="text-[11px] text-[#8E8E9F]">
            {isRTL ? 'أَعد التَّقْييمَ الآن لِلْمُقارَنَة' : 'Re-take the self-check to compare'}
          </p>
        </div>
        <span className="text-xs font-semibold text-white px-3 py-1.5 rounded-lg" style={{ backgroundColor: color }}>
          {isRTL ? 'اِبْدَأ' : 'Start'}
        </span>
      </button>
    );
  }

  // Both captured → show delta
  if (baseline && outcome) {
    const deltas = dimensions.map((_, i) => (outcome[i] || 0) - (baseline[i] || 0));
    const avgBase = Object.values(baseline).reduce((s, v) => s + v, 0) / dimensions.length;
    const avgOut = Object.values(outcome).reduce((s, v) => s + v, 0) / dimensions.length;
    const avgDelta = avgOut - avgBase;
    const deltaPct = avgBase > 0 ? Math.round((avgDelta / avgBase) * 100) : 0;

    return (
      <div className="rounded-2xl border p-5 mb-4" style={{ borderColor: `${color}40`, background: `linear-gradient(135deg, ${color}10, ${color}03)` }}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4" style={{ color }} />
          <h3 className="text-sm font-bold text-[#2D2A33]">
            {isRTL ? 'نُمُوُّك في هذا المُسْتَوى' : 'Your growth this level'}
          </h3>
          {deltaPct > 0 && (
            <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: '#3B8A6E' }}>
              +{deltaPct}%
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-4 mb-4" dir="ltr">
          <div>
            <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider">{isRTL ? 'قَبْل' : 'Before'}</p>
            <p className="text-2xl font-bold text-[#8E8E9F]">{avgBase.toFixed(1)}</p>
          </div>
          <div className="flex-1 h-px bg-[#F3EFE8]" />
          <div>
            <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider text-right">{isRTL ? 'بَعْد' : 'After'}</p>
            <p className="text-2xl font-bold" style={{ color }}>{avgOut.toFixed(1)}</p>
          </div>
        </div>
        <ul className="space-y-1.5">
          {dimensions.map((dim, i) => (
            <li key={i} className="flex items-center gap-2 text-[11px]">
              <span className="flex-1 text-[#4A4A5C] leading-snug">{t(dim.labelEn, dim.labelAr, isRTL)}</span>
              <span className="text-[#8E8E9F] font-mono text-[10px]">{baseline[i]}→{outcome[i]}</span>
              {deltas[i] > 0 && <span className="text-[#3B8A6E] font-bold text-[10px]">+{deltas[i]}</span>}
              {deltas[i] < 0 && <span className="text-[#C4636A] font-bold text-[10px]">{deltas[i]}</span>}
              {deltas[i] === 0 && <span className="text-[#B0B0C0] text-[10px]">—</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
