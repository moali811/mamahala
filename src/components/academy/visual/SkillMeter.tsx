'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ease } from '@/lib/animations';

interface SkillMeterProps {
  label: string;
  value: number; // 0-100
  color?: string;
  className?: string;
}

export default function SkillMeter({ label, value, color = '#7A3B5E', className = '' }: SkillMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div ref={ref} className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#2D2A33]">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{clamped}%</span>
      </div>
      <div className="w-full h-2 bg-[#F3EFE8] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${clamped}%` } : {}}
          transition={{ duration: 1, ease, delay: 0.2 }}
        />
      </div>
    </div>
  );
}
