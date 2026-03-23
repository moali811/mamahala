'use client';

import { motion } from 'framer-motion';
import { cardHover } from '@/lib/animations';

type CardVariant = 'default' | 'elevated' | 'bordered' | 'glass';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white shadow-[var(--shadow-subtle)]',
  elevated: 'bg-white shadow-[var(--shadow-card)]',
  bordered: 'bg-white border border-[#F3EFE8]',
  glass: 'glass-card',
};

const paddingStyles = {
  none: '',
  sm: 'p-5',
  md: 'p-8',
  lg: 'p-10',
};

export default function Card({
  children,
  variant = 'default',
  hover = true,
  className = '',
  padding = 'md',
  onClick,
}: CardProps) {
  return (
    <motion.div
      className={`
        rounded-2xl overflow-hidden transition-shadow duration-300
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hover ? 'hover:shadow-[var(--shadow-elevated)] cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `.trim()}
      whileHover={hover ? cardHover : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
