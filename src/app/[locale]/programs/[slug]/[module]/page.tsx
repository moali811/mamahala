'use client';

import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen, CheckCircle, ArrowRight, ArrowLeft, Loader2, Lock,
  GraduationCap, Lightbulb, PenLine, Activity, HelpCircle,
  Award, Sparkles, MessageCircle, Zap, ChevronDown,
} from 'lucide-react';
import type { AcademyProgram, AcademyModule } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import { t, tArray } from '@/lib/academy-helpers';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';

// Academy components
import ReadingProgressBar from '@/components/academy/layout/ReadingProgressBar';
import TimeRemaining from '@/components/academy/layout/TimeRemaining';
import ModuleSidebar, { getModuleSections } from '@/components/academy/layout/ModuleSidebar';
import SectionDivider from '@/components/academy/layout/SectionDivider';
import LearningObjectivesChecklist from '@/components/academy/layout/LearningObjectivesChecklist';
import CompletionCelebration from '@/components/academy/layout/CompletionCelebration';
import ProgressRing from '@/components/academy/visual/ProgressRing';
import QuizEnhanced from '@/components/academy/content/QuizEnhanced';
import ResearchSpotlight from '@/components/academy/academic/ResearchSpotlight';
import MethodologyBadge from '@/components/academy/academic/MethodologyBadge';
import FrameworkVisualizer from '@/components/academy/academic/FrameworkVisualizer';
import ScenarioBrancher from '@/components/academy/interactive/ScenarioBrancher';
import DragMatchGame from '@/components/academy/interactive/DragMatchGame';
import LikertScale from '@/components/academy/interactive/LikertScale';
import SelfAssessmentRadar from '@/components/academy/interactive/SelfAssessmentRadar';

// Dynamic program loader
async function loadProgram(slug: string): Promise<AcademyProgram | null> {
  try {
    switch (slug) {
      case 'intentional-parent': return (await import('@/data/programs/intentional-parent')).intentionalParentProgram;
      case 'resilient-teens': return (await import('@/data/programs/resilient-teens')).resilientTeensProgram;
      case 'stronger-together': return (await import('@/data/programs/stronger-together')).strongerTogetherProgram;
      case 'inner-compass': return (await import('@/data/programs/inner-compass')).innerCompassProgram;
      default: return null;
    }
  } catch { return null; }
}

export default function ModuleLessonPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'en';
  const programSlug = params?.slug as string;
  const moduleSlug = params?.module as string;
  const isRTL = locale === 'ar';

  const [program, setProgram] = useState<AcademyProgram | null>(null);
  const [currentModule, setCurrentModule] = useState<AcademyModule | null>(null);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [allModules, setAllModules] = useState<AcademyModule[]>([]);
  const [loading, setLoading] = useState(true);

  // Reflection state
  const [reflection, setReflection] = useState('');

  // Quiz gating — must pass quiz to complete module
  const [quizPassed, setQuizPassed] = useState(false);

  // Section tracking
  const [activeSection, setActiveSection] = useState('lesson');
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  // Section refs for intersection observer
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    loadProgram(programSlug).then(p => {
      if (p) {
        setProgram(p);
        const mods = p.levels.flatMap(l => l.modules);
        setAllModules(mods);
        const idx = mods.findIndex(m => m.slug === moduleSlug);
        if (idx >= 0) {
          setCurrentModule(mods[idx]);
          setModuleIndex(idx);

          // Check if user has access to this module's level
          const isEnrolled = localStorage.getItem(`academy_enrolled_${programSlug}`);
          const hasPaid = localStorage.getItem(`academy:paid:${programSlug}`);
          const moduleLevel = p.levels.find(l => l.modules.some(m => m.slug === moduleSlug));
          const levelIsFree = moduleLevel?.isFree || p.isFree;

          if (!isEnrolled) {
            // Not enrolled at all — redirect to program page
            router.replace(`/${locale}/programs/${programSlug}`);
            return;
          }

          if (!levelIsFree && !hasPaid) {
            // Paid level, user hasn't paid — redirect to program page with upgrade message
            router.replace(`/${locale}/programs/${programSlug}?upgrade=true`);
            return;
          }
        }
      }
      setLoading(false);
    });
  }, [programSlug, moduleSlug, locale, router]);

  // Check if quiz was previously passed
  useEffect(() => {
    const passed = localStorage.getItem(`academy:quiz-passed:${programSlug}:${moduleSlug}`);
    if (passed === 'true') setQuizPassed(true);
  }, [programSlug, moduleSlug]);

  // Load saved reflection
  useEffect(() => {
    if (currentModule) {
      const saved = localStorage.getItem(`academy:reflection:${programSlug}:${moduleSlug}`);
      if (saved) setReflection(saved);
    }
  }, [currentModule, programSlug, moduleSlug]);

  // Auto-save reflection
  useEffect(() => {
    if (reflection) {
      localStorage.setItem(`academy:reflection:${programSlug}:${moduleSlug}`, reflection);
    }
  }, [reflection, programSlug, moduleSlug]);

  // Intersection observer for section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the most visible entry
          const top = visible.reduce((a, b) => a.intersectionRatio > b.intersectionRatio ? a : b);
          const id = top.target.getAttribute('data-section-id');
          if (id) setActiveSection(id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] }
    );

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentModule]);

  const markSectionComplete = useCallback((id: string) => {
    setCompletedSections(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleComplete = async () => {
    const email = typeof window !== 'undefined' ? localStorage.getItem('academy_email') : null;
    if (email) {
      try {
        await fetch('/api/academy/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, programSlug, moduleSlug, action: 'complete' }),
        });
      } catch { /* ignore */ }
    }

    setShowCelebration(true);
    setTimeout(() => {
      if (moduleIndex < allModules.length - 1) {
        router.push(`/${locale}/programs/${programSlug}/${allModules[moduleIndex + 1].slug}`);
      } else {
        router.push(`/${locale}/programs/${programSlug}`);
      }
    }, 1200);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]"><Loader2 className="w-8 h-8 animate-spin text-[#7A3B5E]" /></div>;
  }

  if (!program || !currentModule) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <h1 className="text-xl font-bold text-[#2D2A33]">{isRTL ? 'الوحدة غير موجودة' : 'Module not found'}</h1>
          <Button as="a" href={`/${locale}/programs/${programSlug}`} variant="primary" size="md" className="mt-4">Back to Program</Button>
        </div>
      </div>
    );
  }

  const modTitle = t(currentModule.titleEn, currentModule.titleAr, isRTL);
  const lessonContent = t(currentModule.lesson.contentEn, currentModule.lesson.contentAr, isRTL);
  const drNote = currentModule.drHalaNote ? t(currentModule.drHalaNote.en, currentModule.drHalaNote.ar, isRTL) : null;
  const takeaways = tArray(currentModule.keyTakeaways.en, currentModule.keyTakeaways.ar, isRTL);
  const reflectionPrompt = t(currentModule.reflection.promptEn, currentModule.reflection.promptAr, isRTL);
  const activityTitle = t(currentModule.activity.titleEn, currentModule.activity.titleAr, isRTL);
  const activityDesc = t(currentModule.activity.descriptionEn, currentModule.activity.descriptionAr, isRTL);
  const prevModule = moduleIndex > 0 ? allModules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < allModules.length - 1 ? allModules[moduleIndex + 1] : null;

  // Interactive content checks
  const hasObjectives = !!currentModule.learningObjectives?.length;
  const hasResearch = !!currentModule.researchCitations?.length;
  const hasFrameworks = !!currentModule.frameworkDiagrams?.length;
  const hasScenarios = !!currentModule.scenarios?.length;
  const hasDragMatch = !!currentModule.dragMatchExercises?.length;
  const hasLikert = !!currentModule.likertReflections?.length;
  const hasSelfAssessment = !!currentModule.selfAssessment;
  const hasExercises = hasScenarios || hasDragMatch || hasLikert || hasFrameworks || hasSelfAssessment;
  const totalWords = lessonContent.split(/\s+/).length;

  const sidebarSections = getModuleSections(isRTL, {
    hasObjectives,
    hasScenarios,
    hasDragMatch,
    hasLikert,
    hasFramework: hasFrameworks,
    hasDrNote: !!drNote,
  });

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Reading progress bar */}
      <ReadingProgressBar color={program.color} />
      <CompletionCelebration show={showCelebration} color={program.color} />

      {/* ─── TOP BAR ─── */}
      <header className="bg-white border-b border-[#F3EFE8] sticky top-[3px] z-20">
        <div className="max-w-4xl mx-auto lg:ml-64 lg:mr-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href={`/${locale}/programs/${programSlug}`} className="text-sm text-[#8E8E9F] hover:text-[#7A3B5E] flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t(program.titleEn, program.titleAr, isRTL)}</span>
          </a>
          <div className="flex items-center gap-3">
            <TimeRemaining totalWords={totalWords} isRTL={isRTL} />
            <div className="w-px h-4 bg-[#F3EFE8]" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8E8E9F]">{moduleIndex + 1} / {allModules.length}</span>
              <div className="w-16 h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${((moduleIndex + 1) / allModules.length) * 100}%`, backgroundColor: program.color }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <ModuleSidebar
        sections={sidebarSections}
        activeSection={activeSection}
        completedSections={completedSections}
        moduleTitle={modTitle}
        moduleIndex={moduleIndex}
        totalModules={allModules.length}
        durationMinutes={currentModule.durationMinutes}
        color={program.color}
        isRTL={isRTL}
        onSectionClick={scrollToSection}
      />

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-3xl mx-auto lg:ml-72 lg:mr-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ─── MODULE HEADER ─── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <Badge variant="neutral" size="sm">
              {isRTL ? `الوحدة ${moduleIndex + 1}` : `Module ${moduleIndex + 1}`} · {currentModule.durationMinutes} min
            </Badge>
            {currentModule.skillTags?.map(tag => (
              <Badge key={tag} variant="sand" size="sm">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2D2A33] leading-tight mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            {modTitle}
          </h1>
          {/* Methodology badges */}
          {program.researchFoundation?.theoreticalBases && (
            <div className="flex items-center gap-2 flex-wrap">
              {program.researchFoundation.theoreticalBases.map(method => (
                <MethodologyBadge key={method} method={method} />
              ))}
            </div>
          )}
        </motion.div>

        {/* ─── LEARNING OBJECTIVES ─── */}
        {hasObjectives && (
          <div ref={setSectionRef('objectives')} data-section-id="objectives">
            <LearningObjectivesChecklist
              objectives={currentModule.learningObjectives!}
              isRTL={isRTL}
              moduleSlug={moduleSlug}
              color={program.color}
            />
          </div>
        )}

        {/* ─── LESSON CONTENT ─── */}
        <div ref={setSectionRef('lesson')} data-section-id="lesson">
          <SectionDivider icon={<BookOpen className="w-4 h-4" />} label={isRTL ? 'الدرس' : 'Lesson'} color="#C8A97D" />

          <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
            <div className="prose prose-sm max-w-none text-[#4A4A5C] leading-relaxed whitespace-pre-line">
              {lessonContent}
            </div>

            {/* Research citations inline */}
            {hasResearch && (
              <div className="mt-6 pt-4 border-t border-[#F3EFE8]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8E8E9F] mb-3">
                  {isRTL ? 'الأبحاث المرجعية' : 'Research References'}
                </p>
                {currentModule.researchCitations!.map((citation, i) => (
                  <ResearchSpotlight key={i} citation={citation} isRTL={isRTL} color={program.color} />
                ))}
              </div>
            )}
          </div>

          {/* Framework diagrams */}
          {hasFrameworks && currentModule.frameworkDiagrams!.map((diagram, i) => (
            <FrameworkVisualizer key={i} diagram={diagram} isRTL={isRTL} color={program.color} />
          ))}
        </div>

        {/* ─── DR. HALA'S NOTE ─── */}
        {drNote && (
          <div ref={setSectionRef('dr-hala-note')} data-section-id="dr-hala-note">
            <ScrollReveal direction="left">
              <div className="rounded-2xl border-l-4 p-6 sm:p-8 relative overflow-hidden" style={{ borderColor: program.color, backgroundColor: `${program.color}06` }}>
                <div className="absolute top-3 right-4 text-6xl opacity-[0.04] leading-none" style={{ fontFamily: 'var(--font-heading)', color: program.color }}>&ldquo;</div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5" style={{ color: program.color }} />
                  <h3 className="text-sm font-semibold" style={{ color: program.color }}>
                    {isRTL ? 'ملاحظة الدكتورة هالة' : "Dr. Hala's Note"}
                  </h3>
                </div>
                <p className="text-[#4A4A5C] italic leading-relaxed">{drNote}</p>
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* ─── KEY TAKEAWAYS ─── */}
        <div ref={setSectionRef('takeaways')} data-section-id="takeaways">
          <SectionDivider icon={<Lightbulb className="w-4 h-4" />} label={isRTL ? 'النقاط الرئيسية' : 'Key Takeaways'} color="#C8A97D" />

          <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
            <StaggerReveal className="space-y-3">
              {takeaways.map((item, i) => (
                <StaggerChild key={i}>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#3B8A6E] mt-0.5 flex-shrink-0" />
                    <span className="text-[#4A4A5C]">{item}</span>
                  </div>
                </StaggerChild>
              ))}
            </StaggerReveal>
          </div>
        </div>

        {/* ─── INTERACTIVE EXERCISES ─── */}
        {hasExercises && (
          <div ref={setSectionRef('exercises')} data-section-id="exercises">
            <SectionDivider icon={<Zap className="w-4 h-4" />} label={isRTL ? 'تمارين تفاعلية' : 'Interactive Exercises'} color={program.color} />

            <div className="space-y-6">
              {/* Scenarios */}
              {hasScenarios && currentModule.scenarios!.map((scenario, i) => (
                <ScenarioBrancher key={i} scenario={scenario} isRTL={isRTL} color={program.color} />
              ))}

              {/* Drag-match exercises */}
              {hasDragMatch && currentModule.dragMatchExercises!.map((exercise, i) => (
                <DragMatchGame key={i} exercise={exercise} isRTL={isRTL} color={program.color} />
              ))}

              {/* Framework visualizers (interactive) */}
              {hasFrameworks && currentModule.frameworkDiagrams!.length > 1 && currentModule.frameworkDiagrams!.slice(1).map((diagram, i) => (
                <FrameworkVisualizer key={i} diagram={diagram} isRTL={isRTL} color={program.color} interactive />
              ))}

              {/* Likert reflections */}
              {hasLikert && currentModule.likertReflections!.map((lr, i) => (
                <LikertScale
                  key={i}
                  reflection={lr}
                  isRTL={isRTL}
                  color={program.color}
                  storageKey={`academy:likert:${programSlug}:${moduleSlug}:${i}`}
                />
              ))}

              {/* Self-assessment radar */}
              {hasSelfAssessment && (
                <SelfAssessmentRadar
                  assessment={currentModule.selfAssessment!}
                  isRTL={isRTL}
                  color={program.color}
                  storageKey={`academy:radar:${programSlug}:${moduleSlug}`}
                />
              )}
            </div>
          </div>
        )}

        {/* ─── REFLECTION ─── */}
        <div ref={setSectionRef('reflection')} data-section-id="reflection">
          <SectionDivider icon={<PenLine className="w-4 h-4" />} label={isRTL ? 'تأمّل' : 'Reflection'} color="#C4878A" />

          <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
            <p className="text-[#4A4A5C] mb-4 italic">{reflectionPrompt}</p>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder={isRTL ? 'اكتب أفكارك هنا...' : 'Write your thoughts here...'}
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-[#F3EFE8] text-sm text-[#4A4A5C] focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20 resize-y"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-[10px] text-[#B0B0C0]">
                {isRTL ? 'يتم الحفظ تلقائياً' : 'Auto-saved locally'}
              </p>
              <p className="text-[10px] text-[#B0B0C0]">
                {reflection.split(/\s+/).filter(Boolean).length} {isRTL ? 'كلمة' : 'words'}
              </p>
            </div>
          </div>
        </div>

        {/* ─── PRACTICAL ACTIVITY ─── */}
        <div ref={setSectionRef('activity')} data-section-id="activity">
          <SectionDivider icon={<Activity className="w-4 h-4" />} label={isRTL ? 'نشاط عملي' : 'Practical Activity'} color="#D4836A" />

          <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
            <h3 className="font-bold text-[#2D2A33] mb-2">{activityTitle}</h3>
            <p className="text-[#4A4A5C] leading-relaxed">{activityDesc}</p>
          </div>
        </div>

        {/* ─── MODULE QUIZ ─── */}
        <div ref={setSectionRef('quiz')} data-section-id="quiz">
          <SectionDivider icon={<Award className="w-4 h-4" />} label={isRTL ? 'اختبار الوحدة' : 'Module Quiz'} color="#7A3B5E" />

          <QuizEnhanced
            quiz={currentModule.quiz}
            isRTL={isRTL}
            color={program.color}
            programSlug={programSlug}
            moduleSlug={moduleSlug}
            onPass={() => {
              markSectionComplete('quiz');
              setQuizPassed(true);
              localStorage.setItem(`academy:quiz-passed:${programSlug}:${moduleSlug}`, 'true');
            }}
          />
        </div>

        {/* ─── AI FAQ ─── */}
        {currentModule.aiFaq && currentModule.aiFaq.length > 0 && (
          <div ref={setSectionRef('faq')} data-section-id="faq">
            <SectionDivider icon={<MessageCircle className="w-4 h-4" />} label={isRTL ? 'اسأل ماما هالة' : 'Ask Mama Hala'} color="#C8A97D" />

            <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 sm:p-8">
              <Accordion
                items={currentModule.aiFaq.map((faq, i) => ({
                  id: `faq-${i}`,
                  title: t(faq.questionEn, faq.questionAr, isRTL),
                  content: t(faq.answerEn, faq.answerAr, isRTL),
                }))}
              />
            </div>
          </div>
        )}

        {/* ─── CONSULTATION UPSELL ─── */}
        <div className="rounded-2xl p-5 sm:p-6 text-center" style={{ background: `linear-gradient(135deg, ${program.color}08, ${program.color}04)`, border: `1px solid ${program.color}15` }}>
          <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: program.color }} />
          <h3 className="text-sm font-bold text-[#2D2A33] mb-1">
            {isRTL ? 'هل تريد إرشاداً شخصياً؟' : 'Want Personalized Guidance?'}
          </h3>
          <p className="text-xs text-[#6B6580] mb-3 max-w-sm mx-auto">
            {isRTL
              ? 'احجز جلسة مع الدكتورة هالة لمناقشة كيفية تطبيق ما تعلمته على وضعك الخاص.'
              : 'Book a session with Dr. Hala to discuss how to apply what you\'ve learned to your unique situation.'}
          </p>
          <a
            href={`/${locale}/book-a-session`}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:shadow-md"
            style={{ backgroundColor: program.color }}
          >
            {isRTL ? 'احجز جلسة' : 'Book a Session'}
          </a>
        </div>

        {/* ─── NAVIGATION ─── */}
        <div className="pt-4 space-y-4">
          {/* Overall progress */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#F3EFE8]">
            <ProgressRing value={Math.round(((moduleIndex + 1) / allModules.length) * 100)} size={36} strokeWidth={3} color={program.color} />
            <div className="flex-1">
              <p className="text-xs font-medium text-[#2D2A33]">
                {isRTL ? 'التقدم الكلي' : 'Overall Progress'}
              </p>
              <p className="text-[10px] text-[#8E8E9F]">
                {moduleIndex + 1} / {allModules.length} {isRTL ? 'وحدات مكتملة' : 'modules'}
              </p>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between">
            {prevModule ? (
              <a
                href={`/${locale}/programs/${programSlug}/${prevModule.slug}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#6B6580] hover:text-[#2D2A33] hover:bg-white border border-transparent hover:border-[#F3EFE8] transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <div className="hidden sm:block text-left">
                  <p className="text-[10px] text-[#8E8E9F]">{isRTL ? 'السابق' : 'Previous'}</p>
                  <p className="text-xs font-medium truncate max-w-[160px]">{t(prevModule.titleEn, prevModule.titleAr, isRTL)}</p>
                </div>
              </a>
            ) : <div />}

            <div className="flex flex-col items-end gap-2">
              <button
                onClick={handleComplete}
                disabled={!quizPassed}
                className={`px-8 py-3 rounded-xl text-white text-sm font-semibold transition-all flex items-center gap-2 ${
                  quizPassed ? 'hover:shadow-md' : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ backgroundColor: program.color }}
              >
                {!quizPassed && <Lock className="w-4 h-4" />}
                {nextModule ? (
                  <>{isRTL ? 'أكمل وانتقل للتالي' : 'Complete & Continue'} {quizPassed && <ArrowRight className="w-4 h-4" />}</>
                ) : (
                  <>{isRTL ? 'أكمل البرنامج' : 'Complete Program'} {quizPassed && <GraduationCap className="w-4 h-4" />}</>
                )}
              </button>
              {!quizPassed && (
                <p className="text-[10px] text-[#8E8E9F]">
                  {isRTL ? 'اجتز اختبار الوحدة للمتابعة' : 'Pass the module quiz to continue'}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
