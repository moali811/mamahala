'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Clock, CheckCircle, Lock, ArrowRight, ArrowLeft,
  GraduationCap, Award, Layers, Users, Sparkles, ChevronDown,
  ChevronUp, Loader2, Heart, Sprout, HeartHandshake,
  Compass, TreePine, Play, Star,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import type { AcademyProgram, AcademyLevel, AcademyModule } from '@/types';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-8 h-8" />,
  Sprout: <Sprout className="w-8 h-8" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8" />,
  Compass: <Compass className="w-8 h-8" />,
  TreePine: <TreePine className="w-8 h-8" />,
  Globe: <TreePine className="w-8 h-8" />,
};

const levelEmojis: Record<number, string> = { 1: '🌱', 2: '🌿', 3: '🌳' };
const levelNamesEN: Record<number, string> = { 1: 'Foundation', 2: 'Growth', 3: 'Mastery' };
const levelNamesAR: Record<number, string> = { 1: 'الأساس', 2: 'النمو', 3: 'الإتقان' };

// Dynamic program loader
async function loadProgram(slug: string): Promise<AcademyProgram | null> {
  try {
    switch (slug) {
      case 'intentional-parent': return (await import('@/data/programs/intentional-parent')).intentionalParentProgram;
      case 'resilient-teens': return (await import('@/data/programs/resilient-teens')).resilientTeensProgram;
      case 'stronger-together': return (await import('@/data/programs/stronger-together')).strongerTogetherProgram;
      case 'inner-compass': return (await import('@/data/programs/inner-compass')).innerCompassProgram;
      case 'cultural-roots': return (await import('@/data/programs/cultural-roots')).culturalRootsProgram;
      case 'cultural-roots-modern-wings': return (await import('@/data/programs/cultural-roots')).culturalRootsProgram;
      default: return null;
    }
  } catch { return null; }
}

export default function ProgramOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [program, setProgram] = useState<AcademyProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedLevel, setExpandedLevel] = useState<number>(1);
  const [enrollEmail, setEnrollEmail] = useState('');
  const [enrollName, setEnrollName] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    loadProgram(slug).then(p => { setProgram(p); setLoading(false); });
  }, [slug]);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollEmail.trim()) return;
    setEnrolling(true);
    try {
      const res = await fetch('/api/academy/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: enrollEmail.trim(), name: enrollName.trim(), programSlug: slug }),
      });
      if (res.ok) {
        setEnrolled(true);
        // Store enrollment locally for module access
        localStorage.setItem(`academy_email`, enrollEmail.trim());
        localStorage.setItem(`academy_enrolled_${slug}`, 'true');
      }
    } catch { /* ignore */ }
    setEnrolling(false);
  };

  // Check if already enrolled
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isEnrolled = localStorage.getItem(`academy_enrolled_${slug}`);
      if (isEnrolled) setEnrolled(true);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="w-8 h-8 animate-spin text-[#7A3B5E]" />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <GraduationCap className="w-12 h-12 text-[#8E8E9F] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
            {isRTL ? 'البرنامج غير موجود' : 'Program Not Found'}
          </h1>
          <Button as="a" href={`/${locale}/resources/programs`} variant="primary" size="md" className="mt-4">
            {isRTL ? 'العودة للبرامج' : 'Back to Programs'}
          </Button>
        </div>
      </div>
    );
  }

  const title = isRTL ? program.titleAr : program.titleEn;
  const longDesc = isRTL ? program.longDescriptionAr : program.longDescriptionEn;
  const icon = iconMap[program.icon] || <BookOpen className="w-8 h-8" />;

  // Flatten all modules for numbering
  let moduleNumber = 0;

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${program.color}08, ${program.color}04, #FAF7F2)` }}>
        <div className="container-main relative z-10">
          <Breadcrumb locale={locale} items={[
            { label: messages.nav.home, href: `/${locale}` },
            { label: messages.nav.programs, href: `/${locale}/resources/programs` },
            { label: title },
          ]} />

          <motion.div className="mt-8 max-w-3xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${program.color}15` }}>
                <div style={{ color: program.color }}>{icon}</div>
              </div>
              <Badge variant="plum" size="md">
                <GraduationCap className="w-3.5 h-3.5 mr-1" /> {isRTL ? 'أكاديمية ماما هالة' : 'Mama Hala Academy'}
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#2D2A33] leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h1>
            <p className="mt-5 text-lg text-[#4A4A5C] max-w-2xl leading-relaxed">{longDesc}</p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Badge variant={program.isFree ? 'success' : 'sand'} size="md">
                {program.isFree ? (isRTL ? 'مجاني' : 'Free') : `CAD $${program.priceCAD}`}
              </Badge>
              <span className="text-sm text-[#8E8E9F] inline-flex items-center gap-1.5"><Layers className="w-4 h-4" /> {program.totalModules} {isRTL ? 'وحدة' : 'modules'}</span>
              <span className="text-sm text-[#8E8E9F] inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {program.totalDurationHours}h</span>
              <span className="text-sm text-[#8E8E9F] inline-flex items-center gap-1.5"><Award className="w-4 h-4" /> {isRTL ? 'شهادة إتمام' : 'Certificate'}</span>
            </div>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#ffffff" variant="gentle" />
      </section>

      {/* ─── WHAT YOU'LL LEARN + WHO IS THIS FOR ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                {isRTL ? 'ماذا ستتعلم' : 'What You Will Learn'}
              </h2>
              <div className="space-y-3">
                {(isRTL ? program.whatYouWillLearn.ar : program.whatYouWillLearn.en).map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#3B8A6E] mt-0.5 flex-shrink-0" />
                    <span className="text-[#4A4A5C]">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                {isRTL ? 'لمن هذا البرنامج' : 'Who Is This For'}
              </h2>
              <div className="space-y-3">
                {(isRTL ? program.whoIsThisFor.ar : program.whoIsThisFor.en).map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-[#C8A97D] mt-0.5 flex-shrink-0" />
                    <span className="text-[#4A4A5C]">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── LEVEL ROADMAP WITH REAL MODULES ─── */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center mb-12">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'خريطة الرحلة' : 'Your Journey Map'}
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'من الأساس إلى الإتقان' : 'From Foundation to Mastery'}
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {program.levels.map((level) => {
              const isExpanded = expandedLevel === level.level;
              const levelName = isRTL ? (level.titleAr || levelNamesAR[level.level]) : (level.titleEn || levelNamesEN[level.level]);
              const levelSubtitle = isRTL ? level.subtitleAr : level.subtitleEn;

              return (
                <ScrollReveal key={level.level}>
                  <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden">
                    <button
                      onClick={() => setExpandedLevel(isExpanded ? 0 : level.level)}
                      className="w-full px-6 py-5 flex items-center gap-4 text-left hover:bg-[#FAF7F2]/50 transition-colors"
                    >
                      <span className="text-2xl">{levelEmojis[level.level] || '📚'}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                            {isRTL ? `المستوى ${level.level}: ${levelName}` : `Level ${level.level}: ${levelName}`}
                          </h3>
                          {level.isFree ? (
                            <Badge variant="success" size="sm">{isRTL ? 'مجاني' : 'Free'}</Badge>
                          ) : (
                            <Badge variant="neutral" size="sm"><Lock className="w-3 h-3 mr-1" /> {isRTL ? 'مدفوع' : 'Premium'}</Badge>
                          )}
                        </div>
                        {levelSubtitle && <p className="text-sm text-[#8E8E9F] mt-0.5">{levelSubtitle}</p>}
                        <p className="text-xs text-[#B0B0C0] mt-1">{level.modules.length} {isRTL ? 'وحدات' : 'modules'}</p>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#8E8E9F]" /> : <ChevronDown className="w-5 h-5 text-[#8E8E9F]" />}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 pt-2 border-t border-[#F3EFE8] space-y-1">
                            {level.modules.map((mod, i) => {
                              moduleNumber++;
                              const modTitle = isRTL ? mod.titleAr : mod.titleEn;
                              const canAccess = enrolled && (level.isFree || program.isFree);

                              return (
                                <div key={mod.slug}>
                                  {canAccess ? (
                                    <a
                                      href={`/${locale}/programs/${slug}/${mod.slug}`}
                                      className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-[#FAF7F2] transition-colors group"
                                    >
                                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: `${program.color}12`, color: program.color }}>
                                        {moduleNumber}
                                      </div>
                                      <span className="text-sm text-[#2D2A33] flex-1 group-hover:text-[#7A3B5E] transition-colors font-medium">{modTitle}</span>
                                      <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-xs text-[#8E8E9F]">{mod.durationMinutes} min</span>
                                        <Play className="w-3.5 h-3.5 text-[#C8A97D] opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                    </a>
                                  ) : (
                                    <div className="flex items-center gap-3 py-3 px-3 rounded-lg">
                                      <div className="w-8 h-8 rounded-lg bg-[#F3EFE8] flex items-center justify-center text-xs font-bold text-[#8E8E9F] flex-shrink-0">
                                        {moduleNumber}
                                      </div>
                                      <span className="text-sm text-[#4A4A5C] flex-1">{modTitle}</span>
                                      <span className="text-xs text-[#8E8E9F]">{mod.durationMinutes} min</span>
                                      {!enrolled && <Lock className="w-3.5 h-3.5 text-[#B0B0C0]" />}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Level dots */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-3">
              {program.levels.map((lvl, i) => (
                <div key={lvl.level} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: program.color }} />
                  {i < program.levels.length - 1 && <div className="w-12 h-0.5 bg-[#F3EFE8]" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ENROLLMENT ─── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="max-w-lg mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5" style={{ backgroundColor: `${program.color}10` }}>
                <Sparkles className="w-8 h-8" style={{ color: program.color }} />
              </div>

              <h2 className="text-3xl font-bold text-[#2D2A33] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {enrolled ? (isRTL ? 'أنت مسجل!' : "You're Enrolled!") : (isRTL ? 'ابدأ رحلتك اليوم' : 'Start Your Journey Today')}
              </h2>

              {enrolled ? (
                <div>
                  <p className="text-[#4A4A5C] mb-6">{isRTL ? 'اختر أول وحدة من الأعلى لبدء التعلم.' : 'Choose your first module above to start learning.'}</p>
                  <div className="inline-flex items-center gap-2 text-[#3B8A6E]">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{isRTL ? 'تم التسجيل بنجاح' : 'Successfully enrolled'}</span>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-[#4A4A5C] mb-8">{isRTL ? 'أدخل بريدك الإلكتروني للتسجيل والبدء.' : 'Enter your email to enroll and start learning.'}</p>
                  <form onSubmit={handleEnroll} className="space-y-3">
                    <input type="text" value={enrollName} onChange={(e) => setEnrollName(e.target.value)} placeholder={isRTL ? 'اسمك' : 'Your name'}
                      className="w-full px-4 py-3 rounded-xl border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20" />
                    <input type="email" value={enrollEmail} onChange={(e) => setEnrollEmail(e.target.value)} placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email'} required
                      className="w-full px-4 py-3 rounded-xl border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20" />
                    <button type="submit" disabled={enrolling} className="w-full py-3.5 rounded-xl text-white text-sm font-semibold disabled:opacity-60 flex items-center justify-center gap-2" style={{ backgroundColor: program.color }}>
                      {enrolling ? <><Loader2 className="w-4 h-4 animate-spin" /> {isRTL ? 'جاري التسجيل...' : 'Enrolling...'}</> : <><GraduationCap className="w-4 h-4" /> {program.isFree ? (isRTL ? 'سجّل مجاناً' : 'Enroll — Free') : (isRTL ? 'سجّل الآن' : 'Enroll Now')}</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA locale={locale} fillColorAbove="#ffffff"
        headingEn={<>Ready to <span className="text-[#7A3B5E] italic">Transform?</span></>}
        headingAr={<>مستعد <span className="text-[#7A3B5E] italic">للتحول؟</span></>}
      />
    </div>
  );
}
