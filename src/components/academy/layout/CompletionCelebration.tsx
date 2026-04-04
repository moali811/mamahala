'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CompletionCelebrationProps {
  show: boolean;
  color?: string;
  onComplete?: () => void;
}

const PARTICLE_COUNT = 24;
const COLORS = ['#7A3B5E', '#C4878A', '#C8A97D', '#D4836A', '#3B8A6E', '#FFD700'];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function CompletionCelebration({ show, color, onComplete }: CompletionCelebrationProps) {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; color: string; size: number; shape: 'circle' | 'square' | 'star' }[]
  >([]);

  useEffect(() => {
    if (show) {
      const p = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: randomBetween(-150, 150),
        y: randomBetween(-180, -40),
        color: color || COLORS[Math.floor(Math.random() * COLORS.length)],
        size: randomBetween(6, 14),
        shape: (['circle', 'square', 'star'] as const)[Math.floor(Math.random() * 3)],
      }));
      setParticles(p);
      const timer = setTimeout(() => { onComplete?.(); }, 1800);
      return () => clearTimeout(timer);
    } else {
      setParticles([]);
    }
  }, [show, color, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [1, 1, 0],
                scale: [0, 1.3, 0.6],
                x: p.x,
                y: [0, p.y, p.y + randomBetween(80, 160)],
                rotate: randomBetween(-360, 360),
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.4 + Math.random() * 0.4,
                delay: p.id * 0.025,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'star' ? '2px' : '3px',
                transform: p.shape === 'star' ? 'rotate(45deg)' : undefined,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
