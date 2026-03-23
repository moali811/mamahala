'use client';

type BadgeVariant = 'sage' | 'rose' | 'plum' | 'sand' | 'terracotta' | 'neutral' | 'success' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  sage: 'bg-[#B5696B]/10 text-[#B5696B]',
  rose: 'bg-[#B5696B]/10 text-[#B5696B]',
  plum: 'bg-[#7A3B5E]/10 text-[#7A3B5E]',
  sand: 'bg-[#C8A97D]/15 text-[#B08D5E]',
  terracotta: 'bg-[#D4836A]/10 text-[#B96A52]',
  neutral: 'bg-[#F3EFE8] text-[#4A4A5C]',
  success: 'bg-[#3B8A6E]/10 text-[#3B8A6E]',
  outline: 'bg-transparent border border-current text-[#4A4A5C]',
};

const sizeStyles = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3.5 py-1 text-sm',
};

export default function Badge({ children, variant = 'sage', size = 'sm', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full whitespace-nowrap
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
}
