'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'plum' | 'terracotta';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  rounded?: boolean;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#2B5F4E] text-white hover:bg-[#1E4A3B] shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-glow-sage)]',
  secondary:
    'bg-[#F3EFE8] text-[#2B5F4E] hover:bg-[#e8e2d8] border border-[#2B5F4E]/10',
  outline:
    'bg-transparent text-[#2B5F4E] border-2 border-[#2B5F4E] hover:bg-[#2B5F4E] hover:text-white',
  ghost:
    'bg-transparent text-[#4A4A5C] hover:bg-[#F3EFE8] hover:text-[#2B5F4E]',
  plum:
    'bg-[#7A3B5E] text-white hover:bg-[#5E2D48] shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-glow-plum)]',
  terracotta:
    'bg-[#D4836A] text-white hover:bg-[#B96A52] shadow-[var(--shadow-subtle)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-[15px] gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      rounded = true,
      className = '',
      children,
      disabled,
      as = 'button',
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold
      transition-all duration-200 ease-out
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B5F4E]
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
      ${rounded ? 'rounded-full' : 'rounded-xl'}
      ${fullWidth ? 'w-full' : ''}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `.trim();

    const content = (
      <>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && icon}
        {children && <span>{children}</span>}
        {!loading && icon && iconPosition === 'right' && icon}
      </>
    );

    if (as === 'a' && href) {
      return (
        <motion.a
          href={href}
          target={target}
          rel={rel}
          className={baseStyles}
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={baseStyles}
        disabled={disabled || loading}
        type={props.type || 'button'}
        onClick={props.onClick}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
