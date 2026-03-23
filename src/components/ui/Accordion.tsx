'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | null;
  className?: string;
  allowMultiple?: boolean;
}

export default function Accordion({ items, defaultOpen = null, className = '', allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(defaultOpen ? new Set([defaultOpen]) : new Set());

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div
            key={item.id}
            className={`
              bg-white rounded-2xl border transition-all duration-300 overflow-hidden
              ${isOpen ? 'border-[#C4878A]/20 shadow-[var(--shadow-card)]' : 'border-[#F3EFE8] shadow-[var(--shadow-subtle)]'}
            `}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center gap-4 p-6 text-start"
              aria-expanded={isOpen}
            >
              {item.icon && (
                <div className="flex-shrink-0">{item.icon}</div>
              )}
              <span className="flex-1 font-semibold text-[#2D2A33] text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                {item.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#8E8E9F] flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-[#F3EFE8] pt-4 text-[#4A4A5C] leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
