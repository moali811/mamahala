'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  isRTL: boolean;
  maskClass: string;
}

const BLUR = "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JZQC2yCFT5/Pao6aUJLgAAP7v0f5OHzJdK1svIxQtw0N/HgyyhatKQOpClQv97LqE75+dnZ34eoB+RpYabT9AAAA=";

export default function Hero3DImage({ src, alt, isRTL, maskClass }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [enabled, setEnabled] = useState(false);

  // Enable 3D only on hover-capable desktop — after mount to avoid hydration mismatch
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (min-width: 1024px)');
    setEnabled(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Direct DOM manipulation — no React state, no re-renders, no overhead
  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    const inner = innerRef.current;
    const glare = glareRef.current;
    const shadow = shadowRef.current;
    if (!el || !inner) return;

    el.style.perspective = '1200px';
    inner.style.transformStyle = 'preserve-3d';
    inner.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        inner.style.transform = `rotateX(${-normY * 3}deg) rotateY(${normX * 3}deg)`;

        if (glare) {
          const gx = ((e.clientX - rect.left) / rect.width) * 100;
          const gy = ((e.clientY - rect.top) / rect.height) * 100;
          glare.style.opacity = '0.12';
          glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.8) 0%, transparent 55%)`;
        }
        if (shadow) shadow.style.opacity = '1';
      });
    };

    const onEnter = () => {
      inner.style.transition = 'transform 0.15s ease-out';
    };

    const onLeave = () => {
      inner.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
      if (glare) glare.style.opacity = '0';
      if (shadow) shadow.style.opacity = '0';
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
      // Reset styles
      el.style.perspective = '';
      inner.style.transformStyle = '';
      inner.style.transition = '';
      inner.style.transform = '';
    };
  }, [enabled]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-y-0 ${isRTL ? 'left-0' : 'right-0'} w-full lg:w-[55%] 2xl:w-[60%]`}
    >
      <div
        ref={innerRef}
        className={`relative w-full h-full ${maskClass}`}
        style={{ backgroundColor: '#E8D5D0' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          quality={100}
          sizes="(min-width: 1536px) 60vw, (min-width: 1024px) 55vw, 100vw"
          className="object-cover object-top"
          placeholder="blur"
          blurDataURL={BLUR}
        />

        {/* Glare + shadow — rendered but hidden; only shown via DOM on desktop hover */}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{ opacity: 0, transition: 'opacity 0.3s' }}
        />
        <div
          ref={shadowRef}
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{ opacity: 0, transition: 'opacity 0.5s', boxShadow: 'inset 0 0 60px rgba(0,0,0,0.06)' }}
        />
      </div>
    </div>
  );
}
