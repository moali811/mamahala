'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ExternalLink, Shield, BarChart3 } from 'lucide-react';
import type { ResearchCitation } from '@/types';
import { t } from '@/lib/academy-helpers';
import { ease } from '@/lib/animations';

interface ResearchSpotlightProps {
  citation: ResearchCitation;
  isRTL: boolean;
  color?: string;
}

function EvidenceStrengthBadge({ strength }: { strength: ResearchCitation['evidenceStrength'] }) {
  const config = {
    strong: { label: 'Strong Evidence', bars: 3, color: '#3B8A6E', icon: <Shield className="w-3 h-3" /> },
    moderate: { label: 'Moderate Evidence', bars: 2, color: '#C8A97D', icon: <BarChart3 className="w-3 h-3" /> },
    emerging: { label: 'Emerging Research', bars: 1, color: '#C4878A', icon: <BarChart3 className="w-3 h-3" /> },
  };
  const c = config[strength];

  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold" style={{ backgroundColor: `${c.color}12`, color: c.color }}>
      {c.icon}
      <div className="flex gap-0.5">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-1 h-2.5 rounded-sm" style={{ backgroundColor: i <= c.bars ? c.color : `${c.color}25` }} />
        ))}
      </div>
      <span className="hidden sm:inline">{c.label}</span>
    </div>
  );
}

export default function ResearchSpotlight({ citation, isRTL, color = '#7A3B5E' }: ResearchSpotlightProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="rounded-xl border border-[#F3EFE8] overflow-hidden my-4"
      style={{ backgroundColor: `${color}04` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-start gap-3 text-left hover:bg-white/40 transition-colors"
      >
        <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-semibold text-[#2D2A33]">{citation.authorShort}</span>
            <EvidenceStrengthBadge strength={citation.evidenceStrength} />
          </div>
          <p className="text-sm text-[#4A4A5C] leading-relaxed line-clamp-2">
            {t(citation.findingEn, citation.findingAr, isRTL)}
          </p>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-1">
          <ChevronDown className="w-4 h-4 text-[#8E8E9F]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-[#F3EFE8]/60 space-y-2">
              <p className="text-xs text-[#6B6580] italic">
                {t(citation.titleEn, citation.titleAr, isRTL)}
              </p>
              {citation.journal && (
                <p className="text-[10px] text-[#8E8E9F]">
                  {citation.journal} ({citation.year})
                </p>
              )}
              {citation.doi && (
                <a
                  href={`https://doi.org/${citation.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] hover:underline"
                  style={{ color }}
                >
                  <ExternalLink className="w-3 h-3" /> DOI: {citation.doi}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export { EvidenceStrengthBadge };
