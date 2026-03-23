'use client';

import { motion } from 'framer-motion';
import { ease, viewportOnce } from '@/lib/animations';

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  text,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
  stagger = 0.04,
}: TextRevealProps) {
  const words = text.split(' ');

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '100%', opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.5, ease },
                },
              }}
            >
              {word}
              {i < words.length - 1 && '\u00A0'}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
