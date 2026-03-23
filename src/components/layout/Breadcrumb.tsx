'use client';

import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale: string;
  light?: boolean; // For use on dark backgrounds
}

export default function Breadcrumb({ items, locale, light = false }: BreadcrumbProps) {
  const isRTL = locale === 'ar';
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  const baseColor = light ? 'text-white/60' : 'text-[#8E8E9F]';
  const activeColor = light ? 'text-white' : 'text-[#2D2A33]';
  const hoverColor = light ? 'hover:text-white' : 'hover:text-[#C4878A]';

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm ${baseColor}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <Chevron className="w-3.5 h-3.5 opacity-50" />}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={`${hoverColor} transition-colors duration-200`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? `font-medium ${activeColor}` : ''}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
