'use client';

import { forwardRef, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== '';
    const isActive = focused || hasValue;

    return (
      <div className={`relative ${className}`}>
        <input
          ref={ref}
          id={id}
          className={`
            peer w-full px-4 pt-6 pb-2 rounded-xl border bg-white text-[#2D2A33]
            transition-all duration-200 outline-none
            placeholder-transparent
            ${error
              ? 'border-[#C45B5B] focus:border-[#C45B5B] focus:ring-2 focus:ring-[#C45B5B]/20'
              : 'border-[#F3EFE8] focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/10 hover:border-[#C4878A]/30'
            }
          `}
          placeholder={label}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        <label
          htmlFor={id}
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none
            ${isActive
              ? 'top-2 text-xs font-medium text-[#C4878A]'
              : 'top-1/2 -translate-y-1/2 text-sm text-[#8E8E9F]'
            }
            [dir=rtl]_&:left-auto [dir=rtl]_&:right-4
          `}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1.5 text-xs text-[#C45B5B]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
