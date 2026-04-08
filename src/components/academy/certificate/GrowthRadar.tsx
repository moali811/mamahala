'use client';

/* ================================================================
   GrowthRadar — SVG radar chart showing baseline → outcome per
   assessment dimension. Dual-layered: gray baseline, colored outcome.
   ================================================================ */

import { motion } from 'framer-motion';

interface Dimension {
  label: string;
  before: number;
  after: number;
}

interface Props {
  dimensions: Dimension[];
  color: string;
  max?: number; // scale max, default 5
}

export default function GrowthRadar({ dimensions, color, max = 5 }: Props) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 95;
  const n = dimensions.length;
  if (n < 3) return null;

  const angleFor = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const pointFor = (i: number, value: number) => {
    const r = (value / max) * radius;
    return {
      x: cx + r * Math.cos(angleFor(i)),
      y: cy + r * Math.sin(angleFor(i)),
    };
  };

  const polygon = (values: number[]) =>
    values.map((v, i) => {
      const p = pointFor(i, v);
      return `${p.x},${p.y}`;
    }).join(' ');

  const beforePoints = polygon(dimensions.map(d => d.before));
  const afterPoints = polygon(dimensions.map(d => d.after));

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[260px] mx-auto">
      {/* Grid rings */}
      {[1, 2, 3, 4, 5].map(ring => (
        <circle
          key={ring}
          cx={cx}
          cy={cy}
          r={(ring / max) * radius}
          fill="none"
          stroke="#F3EFE8"
          strokeWidth={1}
        />
      ))}
      {/* Axes */}
      {dimensions.map((_, i) => {
        const p = pointFor(i, max);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={p.x} y2={p.y}
            stroke="#F3EFE8"
            strokeWidth={1}
          />
        );
      })}

      {/* Baseline polygon (gray) */}
      <motion.polygon
        points={beforePoints}
        fill="#B0B0C0"
        fillOpacity={0.15}
        stroke="#B0B0C0"
        strokeWidth={1.5}
        strokeDasharray="4 3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {/* Outcome polygon (colored) */}
      <motion.polygon
        points={afterPoints}
        fill={color}
        fillOpacity={0.22}
        stroke={color}
        strokeWidth={2}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />

      {/* Dimension labels */}
      {dimensions.map((d, i) => {
        const p = pointFor(i, max + 0.6);
        const textAnchor = p.x < cx - 5 ? 'end' : p.x > cx + 5 ? 'start' : 'middle';
        // Wrap long labels to 2 lines
        const words = d.label.split(' ');
        const mid = Math.ceil(words.length / 2);
        const line1 = words.slice(0, mid).join(' ');
        const line2 = words.slice(mid).join(' ');
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            className="text-[9px] font-medium fill-[#4A4A5C]"
          >
            {line2 ? (
              <>
                <tspan x={p.x} dy="-0.4em">{line1}</tspan>
                <tspan x={p.x} dy="1.1em">{line2}</tspan>
              </>
            ) : line1}
          </text>
        );
      })}
    </svg>
  );
}
