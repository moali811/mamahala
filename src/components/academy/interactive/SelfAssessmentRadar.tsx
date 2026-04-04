'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { SelfAssessmentWheel } from '@/types';
import { t } from '@/lib/academy-helpers';
import { ease } from '@/lib/animations';

interface SelfAssessmentRadarProps {
  assessment: SelfAssessmentWheel;
  isRTL: boolean;
  color?: string;
  interactive?: boolean; // false = display-only with sample data
  initialValues?: number[];
  storageKey?: string;
  className?: string;
}

export default function SelfAssessmentRadar({
  assessment,
  isRTL,
  color = '#7A3B5E',
  interactive = true,
  initialValues,
  storageKey,
  className = '',
}: SelfAssessmentRadarProps) {
  const dims = assessment.dimensions;
  const count = dims.length;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const [values, setValues] = useState<number[]>(() => {
    if (storageKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) try { return JSON.parse(saved); } catch {}
    }
    return initialValues || new Array(count).fill(interactive ? 5 : 7);
  });

  const [hoveredDim, setHoveredDim] = useState<number | null>(null);
  const title = t(assessment.titleEn, assessment.titleAr, isRTL);

  const svgSize = 300;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const maxR = 110;
  const levels = [2, 4, 6, 8, 10];

  const getPoint = (dimIdx: number, val: number) => {
    const angle = (2 * Math.PI * dimIdx) / count - Math.PI / 2;
    const r = (val / 10) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const polygonPoints = values
    .map((val, i) => {
      const p = getPoint(i, val);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  const handleChange = (dimIdx: number, newVal: number) => {
    if (!interactive) return;
    const next = [...values];
    next[dimIdx] = newVal;
    setValues(next);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(next));
    }
  };

  return (
    <div ref={ref} className={`rounded-2xl border border-[#F3EFE8] bg-white p-5 sm:p-6 ${className}`}>
      <h4 className="text-sm font-semibold text-[#2D2A33] mb-4 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h4>

      <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full max-w-[300px] mx-auto">
        {/* Grid rings */}
        {levels.map((lv) => {
          const r = (lv / 10) * maxR;
          return (
            <circle key={lv} cx={cx} cy={cy} r={r} fill="none" stroke="#F3EFE8" strokeWidth={1} />
          );
        })}

        {/* Axis lines */}
        {dims.map((_, i) => {
          const end = getPoint(i, 10);
          return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#F3EFE8" strokeWidth={1} />;
        })}

        {/* Filled polygon */}
        <motion.polygon
          points={polygonPoints}
          fill={`${color}20`}
          stroke={color}
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Dimension labels + dots */}
        {dims.map((dim, i) => {
          const labelPoint = getPoint(i, 12);
          const dotPoint = getPoint(i, values[i]);
          const isHovered = hoveredDim === i;
          const label = t(dim.labelEn, dim.labelAr, isRTL);

          return (
            <g key={i}>
              {/* Value dot */}
              <motion.circle
                cx={dotPoint.x} cy={dotPoint.y}
                r={isHovered ? 6 : 4}
                fill={color}
                stroke="white"
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.08, ease }}
              />

              {/* Label */}
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[9px] font-medium"
                fill={isHovered ? color : '#6B6580'}
                onMouseEnter={() => setHoveredDim(i)}
                onMouseLeave={() => setHoveredDim(null)}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Sliders for interactive mode */}
      {interactive && (
        <div className="space-y-3 mt-4">
          {dims.map((dim, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-[#6B6580] w-28 truncate">{t(dim.labelEn, dim.labelAr, isRTL)}</span>
              <input
                type="range"
                min={1}
                max={10}
                value={values[i]}
                onChange={(e) => handleChange(i, parseInt(e.target.value))}
                onMouseEnter={() => setHoveredDim(i)}
                onMouseLeave={() => setHoveredDim(null)}
                className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${color} 0%, ${color} ${((values[i] - 1) / 9) * 100}%, #F3EFE8 ${((values[i] - 1) / 9) * 100}%, #F3EFE8 100%)`,
                }}
              />
              <span className="text-xs font-bold w-6 text-right" style={{ color }}>{values[i]}</span>
            </div>
          ))}
        </div>
      )}

      {/* Hovered dimension description */}
      {hoveredDim !== null && (
        <p className="text-xs text-[#6B6580] mt-3 text-center italic">
          {t(dims[hoveredDim].descriptionEn, dims[hoveredDim].descriptionAr, isRTL)}
        </p>
      )}
    </div>
  );
}
