'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';

interface BlogCoverImageProps {
  src: string;
  alt: string;
  /** Tailwind gradient classes used when image is absent or broken, e.g. "from-[#F0D5CA] to-[#FAF0EC]" */
  gradient: string;
  className?: string;
  iconSize?: 'sm' | 'md';
}

/**
 * Renders a Next.js Image with an automatic gradient + icon fallback
 * if the URL is missing, invalid, or fails to load.
 */
export default function BlogCoverImage({
  src,
  alt,
  gradient,
  className = '',
  iconSize = 'md',
}: BlogCoverImageProps) {
  const [broken, setBroken] = useState(false);

  const showFallback = !src || broken;
  const iconClass = iconSize === 'sm' ? 'w-10 h-10' : 'w-12 h-12';

  return (
    <div
      className={`absolute inset-0 ${showFallback ? `bg-gradient-to-br ${gradient}` : ''} flex items-center justify-center ${className}`}
    >
      {showFallback ? (
        <BookOpen className={`${iconClass} text-white/20`} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setBroken(true)}
        />
      )}
    </div>
  );
}
