'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Sparkles, Lightbulb, Zap, PenLine, Activity,
  Award, MessageCircle, Check, Menu, X,
} from 'lucide-react';
import ProgressRing from '@/components/academy/visual/ProgressRing';
import { ease } from '@/lib/animations';

interface SidebarSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  exists: boolean;
}

interface ModuleSidebarProps {
  sections: SidebarSection[];
  activeSection: string;
  completedSections: string[];
  moduleTitle: string;
  moduleIndex: number;
  totalModules: number;
  durationMinutes: number;
  color: string;
  isRTL: boolean;
  onSectionClick: (id: string) => void;
}

export default function ModuleSidebar({
  sections,
  activeSection,
  completedSections,
  moduleTitle,
  moduleIndex,
  totalModules,
  durationMinutes,
  color,
  isRTL,
  onSectionClick,
}: ModuleSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = Math.round(((moduleIndex + 1) / totalModules) * 100);
  const visibleSections = sections.filter(s => s.exists);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Module info */}
      <div className="p-5 border-b border-[#F3EFE8]">
        <div className="flex items-center gap-3 mb-3">
          <ProgressRing value={progress} size={40} strokeWidth={3} color={color} showLabel />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider">
              {isRTL ? `وحدة ${moduleIndex + 1}` : `Module ${moduleIndex + 1}`}
            </p>
            <p className="text-xs font-medium text-[#2D2A33] truncate">{moduleTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#8E8E9F]">
          <span>{durationMinutes} min</span>
          <span>·</span>
          <span>{completedSections.length}/{visibleSections.length} {isRTL ? 'أقسام' : 'sections'}</span>
        </div>
      </div>

      {/* Section list */}
      <nav className="flex-1 overflow-y-auto py-3">
        {visibleSections.map((section) => {
          const isActive = section.id === activeSection;
          const isDone = completedSections.includes(section.id);

          return (
            <button
              key={section.id}
              onClick={() => { onSectionClick(section.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-all text-sm ${
                isActive ? 'bg-[#FAF7F2]' : 'hover:bg-[#FAF7F2]/50'
              }`}
              style={isActive ? { borderLeft: `3px solid ${color}`, paddingLeft: '17px' } : { borderLeft: '3px solid transparent', paddingLeft: '17px' }}
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                {isDone ? (
                  <Check className="w-4 h-4 text-[#3B8A6E]" />
                ) : (
                  <div style={{ color: isActive ? color : '#8E8E9F' }}>{section.icon}</div>
                )}
              </div>
              <span className={`flex-1 truncate ${isActive ? 'font-medium text-[#2D2A33]' : 'text-[#6B6580]'}`}>
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-[112px] left-0 w-64 h-[calc(100vh-112px)] bg-white border-r border-[#F3EFE8] z-10 overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/30 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease }}
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[70vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3EFE8]">
                <span className="font-semibold text-[#2D2A33]">{isRTL ? 'محتويات الوحدة' : 'Module Contents'}</span>
                <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5 text-[#8E8E9F]" /></button>
              </div>
              <div className="overflow-y-auto flex-1">
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper to get default section configs
export function getModuleSections(isRTL: boolean, hasExtras: {
  hasObjectives: boolean;
  hasScenarios: boolean;
  hasDragMatch: boolean;
  hasLikert: boolean;
  hasFramework: boolean;
  hasDrNote: boolean;
}): SidebarSection[] {
  return [
    { id: 'objectives', label: isRTL ? 'أهداف التعلم' : 'Learning Objectives', icon: <BookOpen className="w-3.5 h-3.5" />, exists: hasExtras.hasObjectives },
    { id: 'lesson', label: isRTL ? 'الدرس' : 'Lesson', icon: <BookOpen className="w-3.5 h-3.5" />, exists: true },
    { id: 'dr-hala-note', label: isRTL ? 'ملاحظة د. هالة' : "Dr. Hala's Note", icon: <Sparkles className="w-3.5 h-3.5" />, exists: hasExtras.hasDrNote },
    { id: 'takeaways', label: isRTL ? 'النقاط الرئيسية' : 'Key Takeaways', icon: <Lightbulb className="w-3.5 h-3.5" />, exists: true },
    { id: 'exercises', label: isRTL ? 'تمارين تفاعلية' : 'Interactive Exercises', icon: <Zap className="w-3.5 h-3.5" />, exists: hasExtras.hasScenarios || hasExtras.hasDragMatch || hasExtras.hasLikert || hasExtras.hasFramework },
    { id: 'reflection', label: isRTL ? 'تأمّل' : 'Reflection', icon: <PenLine className="w-3.5 h-3.5" />, exists: true },
    { id: 'activity', label: isRTL ? 'نشاط عملي' : 'Practical Activity', icon: <Activity className="w-3.5 h-3.5" />, exists: true },
    { id: 'quiz', label: isRTL ? 'الاختبار' : 'Module Quiz', icon: <Award className="w-3.5 h-3.5" />, exists: true },
    { id: 'faq', label: isRTL ? 'اسأل ماما هالة' : 'Ask Mama Hala', icon: <MessageCircle className="w-3.5 h-3.5" />, exists: true },
  ];
}
