'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ease } from '@/lib/animations';

interface SectionDividerProps {
  icon: React.ReactNode;
  label: string;
  color?: string;
  className?: string;
}

export default function SectionDivider({ icon, label, color = '#C8A97D', className = '' }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className={`flex items-center gap-4 py-6 ${className}`}>
      <motion.div
        className="flex-1 h-px origin-right"
        style={{ backgroundColor: `${color}30` }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease }}
      />
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: `${color}08` }}>
        <div style={{ color }}>{icon}</div>
        <span className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color }}>{label}</span>
      </div>
      <motion.div
        className="flex-1 h-px origin-left"
        style={{ backgroundColor: `${color}30` }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
      />
    </div>
  );
}
