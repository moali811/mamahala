'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string; // e.g., "500+", "2", "EN/AR"
  label: string;
  className?: string;
}

export default function AnimatedCounter({ value, label, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  // Extract numeric part for animation
  const numericMatch = value.match(/^(\d+)/);
  const numericPart = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = numericMatch ? value.slice(numericMatch[1].length) : value;
  const isNumeric = numericMatch !== null;

  useEffect(() => {
    if (!isInView || !isNumeric) {
      if (!isNumeric) setDisplayValue(value);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1500; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(eased * numericPart);
      setDisplayValue(current + suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, isNumeric, numericPart, suffix, value]);

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="text-3xl lg:text-4xl font-bold text-[#2B5F4E]"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {displayValue}
      </div>
      <div className="text-sm text-[#8E8E9F] mt-1 font-medium">{label}</div>
    </motion.div>
  );
}
