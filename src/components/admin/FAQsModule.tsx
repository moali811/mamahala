'use client';

import { useMemo, useState } from 'react';
import { HelpCircle, Tag, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { generalFaqs } from '@/data/faqs';

export default function FAQsModule() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const grouped = useMemo(() => {
    const map: Record<string, typeof generalFaqs> = {};
    generalFaqs.forEach(faq => {
      const tag = faq.tag || 'General';
      if (!map[tag]) map[tag] = [];
      map[tag].push(faq);
    });
    return map;
  }, []);

  const tags = Object.keys(grouped);
  const bilingualCount = generalFaqs.filter(f => f.questionAr && f.answerAr).length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <p className="text-2xl font-bold text-[#2D2A33]">{generalFaqs.length}</p>
          <p className="text-xs text-[#8E8E9F]">Total FAQs</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <p className="text-2xl font-bold text-[#7A3B5E]">{tags.length}</p>
          <p className="text-xs text-[#8E8E9F]">Categories</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-[#C8A97D]" />
            <p className="text-2xl font-bold text-[#2D2A33]">{bilingualCount}</p>
          </div>
          <p className="text-xs text-[#8E8E9F]">Bilingual (EN/AR)</p>
        </div>
        <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
          <p className="text-2xl font-bold text-[#C8A97D]">{generalFaqs.filter(f => f.link).length}</p>
          <p className="text-xs text-[#8E8E9F]">With Links</p>
        </div>
      </div>

      {/* FAQs by Category */}
      {Object.entries(grouped).map(([tag, faqs]) => (
        <div key={tag} className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F3EFE8] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center">
              <Tag className="w-4 h-4 text-[#7A3B5E]" />
            </div>
            <h3 className="text-sm font-bold text-[#2D2A33]" style={{ fontFamily: 'Georgia, serif' }}>{tag}</h3>
            <span className="ml-auto text-xs font-semibold text-[#8E8E9F] bg-[#FAF7F2] px-2.5 py-1 rounded-full">{faqs.length}</span>
          </div>
          <div className="divide-y divide-[#F3EFE8]">
            {faqs.map((faq, i) => {
              const globalIndex = generalFaqs.indexOf(faq);
              const isExpanded = expandedIndex === globalIndex;
              return (
                <div key={i}>
                  <button onClick={() => setExpandedIndex(isExpanded ? null : globalIndex)}
                    className="w-full px-5 py-3.5 flex items-center gap-3 text-left hover:bg-[#FAF7F2]/50 transition-colors">
                    <HelpCircle className="w-4 h-4 text-[#C8A97D] flex-shrink-0" />
                    <span className="text-sm text-[#2D2A33] flex-1">{faq.question}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {faq.questionAr && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C8A97D]/10 text-[#C8A97D] font-semibold">AR</span>
                      )}
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#8E8E9F]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#8E8E9F]" />}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-4 pl-12">
                      <p className="text-xs text-[#4A4A5C] leading-relaxed">{faq.answer}</p>
                      {faq.answerAr && (
                        <p className="text-xs text-[#8E8E9F] mt-2 leading-relaxed" dir="rtl">{faq.answerAr}</p>
                      )}
                      {faq.link && (
                        <a href={faq.link.href} target="_blank" className="inline-block mt-2 text-xs text-[#7A3B5E] hover:underline">
                          {faq.link.labelEn} &rarr;
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
