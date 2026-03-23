'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // 0 = no parallax, 1 = full speed. Default 0.3
  className?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = '',
  overlayColor = '#000',
  overlayOpacity = 0.4,
  children,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to Y offset
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-[-100px] w-[calc(100%+200px)]"
        style={{ y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay — gradient for better text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${overlayColor}dd 0%, ${overlayColor}cc 40%, ${overlayColor}88 100%)`,
          opacity: overlayOpacity,
        }}
      />

      {/* Content */}
      {children && (
        <div className="relative z-10">{children}</div>
      )}
    </div>
  );
}
