'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ease } from '@/lib/animations';

interface ProgressRingProps {
  value: number;       // 0-100
  size?: number;       // px, default 48
  strokeWidth?: number; // px, default 4
  color?: string;
  bgColor?: string;
  showLabel?: boolean;
  className?: string;
}

export default function ProgressRing({
  value,
  size = 48,
  strokeWidth = 4,
  color = '#7A3B5E',
  bgColor = '#F3EFE8',
  showLabel = true,
  className = '',
}: ProgressRingProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference - (circumference * clamped) / 100 } : {}}
          transition={{ duration: 1, ease, delay: 0.2 }}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-xs font-bold" style={{ color, fontSize: size < 40 ? 9 : 11 }}>
          {clamped}%
        </span>
      )}
    </div>
  );
}
