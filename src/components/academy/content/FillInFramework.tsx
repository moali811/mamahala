'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';
import { ease } from '@/lib/animations';

interface FrameworkField {
  id: string;
  placeholder: string;
}

interface FillInFrameworkProps {
  title: string;
  /** Template with {{fieldId}} placeholders */
  template: string;
  fields: FrameworkField[];
  isRTL: boolean;
  color?: string;
  storageKey?: string;
}

export default function FillInFramework({
  title,
  template,
  fields,
  isRTL,
  color = '#7A3B5E',
  storageKey,
}: FillInFrameworkProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    if (storageKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) try { return JSON.parse(saved); } catch {}
    }
    return {};
  });
  const [showResult, setShowResult] = useState(false);

  const allFilled = fields.every(f => values[f.id]?.trim());

  useEffect(() => {
    if (storageKey && Object.keys(values).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(values));
    }
  }, [values, storageKey]);

  const handleChange = (id: string, val: string) => {
    setValues({ ...values, [id]: val });
    setShowResult(false);
  };

  // Render template with either inputs or filled values
  const renderTemplate = (filled: boolean) => {
    const parts = template.split(/({{[^}]+}})/);
    return parts.map((part, i) => {
      const match = part.match(/^{{(.+)}}$/);
      if (match) {
        const fieldId = match[1];
        const field = fields.find(f => f.id === fieldId);
        if (!field) return part;

        if (filled) {
          return (
            <span key={i} className="font-semibold underline decoration-2 decoration-dotted" style={{ color, textDecorationColor: `${color}40` }}>
              {values[fieldId] || '___'}
            </span>
          );
        }
        return (
          <input
            key={i}
            type="text"
            value={values[fieldId] || ''}
            onChange={(e) => handleChange(fieldId, e.target.value)}
            placeholder={field.placeholder}
            className="inline-block w-40 sm:w-48 px-3 py-1.5 mx-1 rounded-lg border-2 border-dashed text-sm focus:outline-none focus:border-solid transition-colors align-middle"
            style={{
              borderColor: values[fieldId]?.trim() ? `${color}40` : '#E0DDD6',
              color: '#2D2A33',
            }}
          />
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="rounded-2xl border border-[#F3EFE8] bg-white p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
          <FileText className="w-4.5 h-4.5" style={{ color }} />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color }}>
            {isRTL ? 'إطار عمل' : 'Framework Exercise'}
          </p>
          <h4 className="text-sm font-bold text-[#2D2A33]">{title}</h4>
        </div>
      </div>

      <div className="text-sm text-[#4A4A5C] leading-loose mb-5">
        {renderTemplate(false)}
      </div>

      {allFilled && !showResult && (
        <button
          onClick={() => setShowResult(true)}
          className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-md"
          style={{ backgroundColor: color }}
        >
          <Sparkles className="w-4 h-4" /> {isRTL ? 'عرض النتيجة' : 'See Your Statement'}
        </button>
      )}

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="p-5 rounded-xl border-2 mt-4"
          style={{ borderColor: `${color}20`, backgroundColor: `${color}04` }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color }}>
            {isRTL ? 'بيانك الشخصي' : 'Your Personal Statement'}
          </p>
          <p className="text-sm text-[#2D2A33] leading-loose font-medium">
            {renderTemplate(true)}
          </p>
        </motion.div>
      )}
    </div>
  );
}
