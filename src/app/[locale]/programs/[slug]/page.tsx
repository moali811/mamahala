'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Clock, CheckCircle, Lock, ArrowRight, ArrowLeft,
  GraduationCap, Award, Layers, Users, Sparkles, ChevronDown,
  ChevronUp, Loader2, Heart, Sprout, HeartHandshake,
  Compass, TreePine, Play, Star, Shield, Download,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import type { AcademyProgram, AcademyLevel } from '@/types';
import { ease, drawLine, fadeUp, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';
import MyLearningButton from '@/components/academy/layout/MyLearningButton';
// Stripe Checkout replaces Cal.com for level payments
import SafetyNotice from '@/components/academy/layout/SafetyNotice';
import LevelAssessment, { type LevelDimension } from '@/components/academy/layout/LevelAssessment';

// Per-program, per-level assessment dimensions (fallback — override via program data later)
const LEVEL_DIMENSIONS: Record<string, Record<number, LevelDimension[]>> = {
  'intentional-parent': {
    1: [
      { labelEn: 'I can name what my child is feeling in the moment', labelAr: 'أَسْتَطيعُ تَسْمِيَةَ ما يَشْعُرُ بِهِ طِفْلي في اللَّحْظَة' },
      { labelEn: 'I pause before reacting to big emotions', labelAr: 'أَتَوَقَّفُ قَبْلَ الرَّدِّ على المَشاعِرِ الكَبيرَة' },
      { labelEn: 'I listen to understand, not to respond', labelAr: 'أَسْتَمِعُ لِأَفْهَم، لا لِأَرُدّ' },
      { labelEn: 'I set limits while validating feelings', labelAr: 'أَضَعُ حُدوداً مع تَصْديقِ المَشاعِر' },
    ],
    2: [
      { labelEn: 'I regulate my own reactions before guiding behavior', labelAr: 'أُنَظِّمُ رَدَّ فِعْلي قَبْلَ تَوْجيهِ السُّلوك' },
      { labelEn: 'I repair after conflict with warmth, not guilt', labelAr: 'أُصْلِحُ بَعْدَ الخِلافِ بِالدِّفْءِ لا بِالذَّنْب' },
      { labelEn: 'I build rituals of connection into daily life', labelAr: 'أَبْني طُقوسَ التَّواصُلِ في حَياتي اليَوْميّة' },
      { labelEn: 'I respond to sibling conflict without taking sides', labelAr: 'أَسْتَجيبُ لِخِلافِ الإخْوَةِ دونَ الاِنْحِيازِ لِطَرَف' },
    ],
    3: [
      { labelEn: 'I parent from values, not reactions', labelAr: 'أُرَبّي من القِيَمِ لا من رَدِّ الفِعْل' },
      { labelEn: 'I honor my own needs while caring for my family', labelAr: 'أَحْتَرِمُ احْتِياجاتي وأَنا أَرْعى عائِلَتي' },
      { labelEn: 'I weave culture and identity into daily parenting', labelAr: 'أَنْسُجُ الثَّقافَةَ والهُوِيَّةَ في تَرْبِيَتي اليَوْميّة' },
      { labelEn: 'I model the emotional skills I want my child to have', labelAr: 'أَكونُ قُدْوَةً لِلمَهاراتِ العاطِفيّةِ الّتي أُريدُها لِطِفْلي' },
    ],
  },
};
import { BUSINESS } from '@/config/business';
import { isVipEmail } from '@/lib/vip-emails';
import { t, tArray } from '@/lib/academy-helpers';
import ProgressRing from '@/components/academy/visual/ProgressRing';
import SkillMeter from '@/components/academy/visual/SkillMeter';
import MethodologyBadge from '@/components/academy/academic/MethodologyBadge';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-8 h-8" />,
  Sprout: <Sprout className="w-8 h-8" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8" />,
  Compass: <Compass className="w-8 h-8" />,
  Globe: <TreePine className="w-8 h-8" />,
};

const levelEmojis: Record<number, string> = { 1: '🌱', 2: '🌿', 3: '🌳' };
const levelNamesEN: Record<number, string> = { 1: 'Foundation', 2: 'Growth', 3: 'Mastery' };
const levelNamesAR: Record<number, string> = { 1: 'الأساس', 2: 'النمو', 3: 'الإتقان' };

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

export default function ProgramOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [program, setProgram] = useState<AcademyProgram | null>(null);
  const [certId, setCertId] = useState<string | null>(null);
  const [programComplete, setProgramComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedLevel, setExpandedLevel] = useState<number>(1);
  const [enrollEmail, setEnrollEmail] = useState('');
  const [enrollName, setEnrollName] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [unlockedModules, setUnlockedModules] = useState<Set<string>>(new Set());
  const [unlockedLevels, setUnlockedLevels] = useState<Set<number>>(new Set());
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [unlockingLevel, setUnlockingLevel] = useState<number | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [dynamicPricing, setDynamicPricing] = useState({
    toolkitFullAccessPrice: BUSINESS.toolkitFullAccessPrice,
    academyFullAccessPrice: BUSINESS.academyFullAccessPrice,
  });

  useEffect(() => {
    loadProgram(slug).then(p => { setProgram(p); setLoading(false); });
  }, [slug]);

  // Fetch dynamic pricing on mount
  useEffect(() => {
    fetch('/api/pricing')
      .then(r => r.json())
      .then(data => {
        if (data.toolkitFullAccessPrice != null || data.academyFullAccessPrice != null) {
          setDynamicPricing(prev => ({
            toolkitFullAccessPrice: data.toolkitFullAccessPrice ?? prev.toolkitFullAccessPrice,
            academyFullAccessPrice: data.academyFullAccessPrice ?? prev.academyFullAccessPrice,
          }));
        }
      })
      .catch(() => { /* use BUSINESS defaults */ });
  }, []);

  // Load unlock state from localStorage (both per-level and legacy per-module)
  useEffect(() => {
    if (typeof window !== 'undefined' && program) {
      // VIP bypass: if stored academy or toolkit email is a VIP, unlock ALL levels
      const academyEmail = localStorage.getItem('academy_email');
      const toolkitEmail = localStorage.getItem('mh_toolkit_email');
      const vipBypass = isVipEmail(academyEmail) || isVipEmail(toolkitEmail);

      const levels = new Set<number>();
      program.levels.forEach(lvl => {
        if (vipBypass) {
          levels.add(lvl.level);
          localStorage.setItem(`academy:paid:${slug}:level-${lvl.level}`, 'true');
        } else if (localStorage.getItem(`academy:paid:${slug}:level-${lvl.level}`) === 'true') {
          levels.add(lvl.level);
        }
      });
      setUnlockedLevels(levels);

      // Legacy per-module unlocks (kept for back-compat)
      const unlocked = new Set<string>();
      const allMods = program.levels.flatMap(l => l.modules);
      allMods.forEach(mod => {
        if (localStorage.getItem(`academy:paid:${slug}:${mod.slug}`) === 'true') {
          unlocked.add(mod.slug);
        }
      });
      // Also mark all modules in an unlocked level as unlocked
      program.levels.forEach(lvl => {
        if (levels.has(lvl.level)) {
          lvl.modules.forEach(m => unlocked.add(m.slug));
        }
      });
      setUnlockedModules(unlocked);
    }
  }, [slug, program]);

  // Handle return from Stripe Payment Link or legacy Checkout Session
  useEffect(() => {
    if (typeof window === 'undefined' || !program) return;
    const params = new URLSearchParams(window.location.search);

    // Stripe Payment Link return: ?paid=level-N or ?paid=bundle
    const paidParam = params.get('paid');
    if (paidParam) {
      if (paidParam === 'bundle') {
        // Unlock both Growth (2) and Mastery (3)
        unlockLevelLocally(2);
        unlockLevelLocally(3);
      } else {
        const levelMatch = paidParam.match(/^level-(\d+)$/);
        if (levelMatch) {
          unlockLevelLocally(Number(levelMatch[1]));
        }
      }
      window.history.replaceState({}, '', `/${locale}/programs/${slug}`);
    }

    // Legacy Stripe Checkout Session return
    const sessionId = params.get('session_id');
    const paymentStatus = params.get('payment');
    const levelParam = params.get('level');
    if (paymentStatus === 'success' && sessionId) {
      fetch(`/api/academy/checkout?session_id=${sessionId}`)
        .then(r => r.json())
        .then(data => {
          if (data.paid && data.levelNumber) unlockLevelLocally(data.levelNumber);
        })
        .catch(() => {
          if (levelParam) unlockLevelLocally(Number(levelParam));
        })
        .finally(() => {
          window.history.replaceState({}, '', `/${locale}/programs/${slug}`);
        });
    } else if (paymentStatus === 'cancelled') {
      window.history.replaceState({}, '', `/${locale}/programs/${slug}`);
    }

    // Legacy: ?unlock=level-N redirects to payment
    const unlockParam = params.get('unlock');
    if (unlockParam && enrolled) {
      const levelMatch = unlockParam.match(/^level-(\d+)$/);
      if (levelMatch) {
        handleUnlockLevel(Number(levelMatch[1]));
      }
      window.history.replaceState({}, '', `/${locale}/programs/${slug}`);
    }
  }, [program, enrolled, slug, locale]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUnlockLevel = async (levelNum: number) => {
    if (checkoutLoading) return;
    setCheckoutLoading(true);
    setUnlockingLevel(levelNum);

    const email = typeof window !== 'undefined' ? localStorage.getItem('academy_email') || '' : '';

    // Try dynamic checkout first
    try {
      const res = await fetch('/api/academy/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programSlug: slug,
          programTitle: program?.titleEn || slug,
          levelNumber: levelNum,
          email,
          locale,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch { /* fall through to payment link */ }

    // Fallback: static Stripe payment link
    const paymentUrl = BUSINESS.academyPaymentLinks.fullAccess;
    if (paymentUrl) {
      const url = new URL(paymentUrl);
      if (email) url.searchParams.set('prefilled_email', email);
      url.searchParams.set('client_reference_id', `${slug}:bundle:${email}`);
      window.location.href = url.toString();
    } else {
      setCheckoutLoading(false);
      setUnlockingLevel(null);
    }
  };

  const unlockLevelLocally = (levelNum: number) => {
    if (!program) return;
    localStorage.setItem(`academy:paid:${slug}:level-${levelNum}`, 'true');
    setUnlockedLevels(prev => new Set([...prev, levelNum]));
    const lvl = program.levels.find(l => l.level === levelNum);
    if (lvl) {
      setUnlockedModules(prev => {
        const next = new Set(prev);
        lvl.modules.forEach(m => next.add(m.slug));
        return next;
      });
    }
  };

  // Stripe webhook handles KV persistence for cross-device sync.

  const handleEnroll = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!enrollEmail.trim()) return;
    setEnrolling(true);
    const normalizedEmail = enrollEmail.trim();
    const isVip = isVipEmail(normalizedEmail);
    try {
      const res = await fetch('/api/academy/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, name: enrollName.trim(), programSlug: slug }),
      });
      const data = await res.json();
      if (res.ok) {
        setEnrolled(true);
        localStorage.setItem(`academy_email`, normalizedEmail);
        localStorage.setItem(`academy_enrolled_${slug}`, 'true');
        // Admin/VIP auto-unlock: set all paid levels in localStorage
        if (data.adminUnlocked || isVip) {
          unlockLevelLocally(2);
          unlockLevelLocally(3);
        }
        // Auto-scroll to curriculum after a beat
        setTimeout(() => {
          document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 600);
      }
    } catch {
      // Network error — still unlock locally if VIP (works offline)
      if (isVip) {
        setEnrolled(true);
        localStorage.setItem(`academy_email`, normalizedEmail);
        localStorage.setItem(`academy_enrolled_${slug}`, 'true');
        unlockLevelLocally(2);
        unlockLevelLocally(3);
      }
    }
    setEnrolling(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isEnrolled = localStorage.getItem(`academy_enrolled_${slug}`);
      if (isEnrolled) setEnrolled(true);
    }
  }, [slug]);

  // Track completed modules (for progress rings + checkmarks)
  useEffect(() => {
    if (typeof window === 'undefined' || !program) return;
    const completed = new Set<string>();
    for (const lvl of program.levels) {
      for (const mod of lvl.modules) {
        if (localStorage.getItem(`academy:quiz-passed:${slug}:${mod.slug}`) === 'true') {
          completed.add(mod.slug);
        }
      }
    }
    setCompletedModules(completed);
  }, [slug, program]);

  useEffect(() => {
    if (typeof window !== 'undefined') {

      // Check program completion + fetch/create certificate
      if (program) {
        const allModules = program.levels.flatMap(l => l.modules);
        const allPassed = allModules.every(m => localStorage.getItem(`academy:quiz-passed:${slug}:${m.slug}`) === 'true');
        setProgramComplete(allPassed);
        if (allPassed) {
          const email = localStorage.getItem('academy_email');
          if (email) {
            fetch(`/api/academy/certificate?email=${encodeURIComponent(email)}&program=${slug}`)
              .then(r => r.json())
              .then(data => { if (data.certificate?.certId) setCertId(data.certificate.certId); })
              .catch(() => {});
          }
        }
      }
    }
  }, [slug, program]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]"><Loader2 className="w-8 h-8 animate-spin text-[#7A3B5E]" /></div>;
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

  const title = t(program.titleEn, program.titleAr, isRTL);
  const longDesc = t(program.longDescriptionEn, program.longDescriptionAr, isRTL);
  const icon = iconMap[program.icon] || <BookOpen className="w-8 h-8" />;

  // Count total research citations across all modules
  const totalCitations = program.levels.reduce((acc, level) =>
    acc + level.modules.reduce((macc, mod) => macc + (mod.researchCitations?.length || 0), 0), 0);

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

          <motion.div className="mt-8 max-w-3xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${program.color}15` }}>
                <div style={{ color: program.color }}>{icon}</div>
              </div>
              <div>
                <Badge variant="plum" size="md">
                  <GraduationCap className="w-3.5 h-3.5 mr-1" /> {isRTL ? 'أكاديمية ماما هالة' : 'Mama Hala Academy'}
                </Badge>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#2D2A33] leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h1>
            {/* Apple-style staggered sentence reveal */}
            <div className="mt-6 max-w-2xl space-y-1">
              {longDesc.split(/(?<=\.)\s+/).map((sentence, i) => {
                const words = sentence.split(' ');
                const hookEnd = Math.min(words.length, isRTL ? 3 : 4);
                const hook = words.slice(0, hookEnd).join(' ');
                const rest = words.slice(hookEnd).join(' ');
                return (
                  <p
                    key={i}
                    className="text-base sm:text-lg font-light text-[#4A4A5C] leading-[1.65] tracking-[-0.01em] animate-[fadeSlideUp_0.8s_ease_both]"
                    style={{ animationDelay: `${0.6 + i * 0.18}s` }}
                  >
                    <span className="font-semibold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${program.color}, #2D2A33)` }}>{hook}</span>
                    {rest && <> {rest}</>}
                  </p>
                );
              })}
            </div>

            {/* Methodology badges */}
            {program.researchFoundation?.theoreticalBases && (
              <div className="flex items-center gap-2 flex-wrap mt-4">
                {program.researchFoundation.theoreticalBases.map(method => (
                  <MethodologyBadge key={method} method={method} size="md" />
                ))}
                {totalCitations > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#3B8A6E] font-medium px-3 py-1 rounded-full bg-[#3B8A6E]/8">
                    <Shield className="w-3.5 h-3.5" /> {totalCitations} {isRTL ? 'مرجع بحثي' : 'research citations'}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Badge variant={program.isFree ? 'success' : 'sand'} size="md">
                {program.isFree
                  ? (isRTL ? 'مجاني' : 'Free')
                  : (isRTL
                      ? `ابْدَأ مَجّاناً · $${dynamicPricing.academyFullAccessPrice} CAD للوُصولِ الكامِل`
                      : `Start free · $${dynamicPricing.academyFullAccessPrice} CAD for full access`)}
              </Badge>
              <span className="text-sm text-[#8E8E9F] inline-flex items-center gap-1.5"><Layers className="w-4 h-4" /> {program.totalModules} {isRTL ? 'وحدة' : 'modules'}</span>
              <span className="text-sm text-[#8E8E9F] inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {program.totalDurationHours}h</span>
              <span className="text-sm text-[#8E8E9F] inline-flex items-center gap-1.5"><Award className="w-4 h-4" /> {isRTL ? 'شهادة إتمام' : 'Certificate'}</span>
            </div>

            {/* Hero CTA — enroll or continue */}
            <div className="mt-8">
              {enrolled ? (
                <div className="flex flex-wrap items-center gap-3">
                  {program.levels[0]?.modules[0] && (
                    <a
                      href={`/${locale}/programs/${slug}/${program.levels[0].modules[0].slug}`}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-lg"
                      style={{ backgroundColor: program.color }}
                    >
                      <Play className="w-4 h-4" />
                      {isRTL ? 'واصلِ التعلّم' : 'Continue Learning'}
                    </a>
                  )}
                  <a href={`/${locale}/dashboard`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#F3EFE8] text-sm font-medium text-[#4A4A5C] hover:bg-white transition-colors">
                    <Layers className="w-4 h-4" />
                    {isRTL ? 'لوحة التحكّم' : 'My Dashboard'}
                  </a>
                </div>
              ) : (
                <a
                  href="#enroll"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-lg"
                  style={{ backgroundColor: program.color }}
                >
                  <GraduationCap className="w-4 h-4" />
                  {program.isFree ? (isRTL ? 'سجّل مجاناً' : 'Enroll Free') : (isRTL ? 'سجّل الآن' : 'Enroll Now')}
                </a>
              )}
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
              <StaggerReveal className="space-y-3">
                {tArray(program.whatYouWillLearn.en, program.whatYouWillLearn.ar, isRTL).map((item, i) => (
                  <StaggerChild key={i}>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#3B8A6E] mt-0.5 flex-shrink-0" />
                      <span className="text-[#4A4A5C]">{item}</span>
                    </div>
                  </StaggerChild>
                ))}
              </StaggerReveal>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                {isRTL ? 'لمن هذا البرنامج' : 'Who Is This For'}
              </h2>
              <StaggerReveal className="space-y-3">
                {tArray(program.whoIsThisFor.en, program.whoIsThisFor.ar, isRTL).map((item, i) => (
                  <StaggerChild key={i}>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-[#C8A97D] mt-0.5 flex-shrink-0" />
                      <span className="text-[#4A4A5C]">{item}</span>
                    </div>
                  </StaggerChild>
                ))}
              </StaggerReveal>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── SKILL DIMENSIONS ─── */}
      {program.skillDimensions && program.skillDimensions.length > 0 && (
        <section className="py-12 lg:py-16 bg-[#FAF7F2]">
          <div className="container-main">
            <ScrollReveal className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-[#2D2A33] mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                {isRTL ? 'مجالات النمو' : 'Growth Areas'}
              </h2>
              <div className="space-y-4">
                {program.skillDimensions.map((dim, i) => (
                  <SkillMeter key={i} label={dim} value={70 + i * 5} color={program.color} />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── LEVEL ROADMAP ─── */}
      <section id="curriculum" className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center mb-12">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'خريطة الرحلة' : 'Your Journey Map'}
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'من الأساس إلى الإتقان' : 'From Foundation to Mastery'}
            </h2>
            {enrolled && completedModules.size > 0 && (
              <div className="max-w-xl mx-auto mt-6">
                <div className="flex items-center justify-between text-xs text-[#8E8E9F] mb-2">
                  <span className="font-semibold uppercase tracking-wider">
                    {isRTL ? 'تَقَدُّمُك' : 'Your progress'}
                  </span>
                  <span className="font-bold" style={{ color: program.color }}>
                    {completedModules.size} / {program.totalModules} · {Math.round((completedModules.size / program.totalModules) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-[#F3EFE8] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedModules.size / program.totalModules) * 100}%` }}
                    transition={{ duration: 0.8, ease }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: program.color }}
                  />
                </div>
              </div>
            )}
          </ScrollReveal>

          {/* Full Program Access CTA — show when enrolled and at least one paid level is still locked */}
          {enrolled && !program.isFree && !(unlockedLevels.has(2) && unlockedLevels.has(3)) && (
            <ScrollReveal className="max-w-3xl mx-auto mb-8">
              <div
                className="relative rounded-2xl border-2 overflow-hidden"
                style={{ borderColor: `${program.color}40`, background: `linear-gradient(135deg, ${program.color}06, ${program.color}03)` }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-5 sm:p-6">
                  <div className="flex-1 text-center sm:text-start">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: program.color }}>
                        {isRTL ? '🚀 سِعْرُ الإطْلاق' : '🚀 Launch Pricing'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#2D2A33] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {isRTL ? 'افتحِ البرنامجَ بالكامل' : 'Unlock the Full Program'}
                    </h3>
                    <p className="text-sm text-[#6B6580]">
                      {isRTL
                        ? 'دَفْعَةٌ واحِدَة · جَميعُ المُسْتَوَياتِ والوَحَدات · وُصولٌ مَدى الحَياة · شَهادَةُ إِتْمام.'
                        : 'One payment · all levels and modules · lifetime access · completion certificate.'}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold" style={{ color: program.color }}>${dynamicPricing.academyFullAccessPrice}</span>
                      <span className="text-xs text-[#8E8E9F]">CAD</span>
                    </div>
                    <button
                      onClick={() => handleUnlockLevel(2)}
                      disabled={checkoutLoading}
                      className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-lg disabled:opacity-50"
                      style={{ backgroundColor: program.color }}
                    >
                      {checkoutLoading
                        ? (isRTL ? 'جارٍ...' : 'Loading...')
                        : (isRTL ? 'افتحِ الوُصولَ الكامِل' : 'Unlock Full Access')}
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          <div className="max-w-3xl mx-auto relative">
            {/* Animated vertical timeline */}
            <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-[#F3EFE8] hidden sm:block" />

            <div className="space-y-4">
              {program.levels.map((level) => {
                const isExpanded = expandedLevel === level.level;
                const levelName = t(level.titleEn || levelNamesEN[level.level], level.titleAr || levelNamesAR[level.level], isRTL);
                const levelSubtitle = t(level.subtitleEn, level.subtitleAr, isRTL);
                const moduleCount = level.modules.length;

                return (
                  <ScrollReveal key={level.level}>
                    <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[5px] top-7 w-3 h-3 rounded-full border-2 border-white hidden sm:block" style={{ backgroundColor: program.color }} />

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
                            ) : unlockedLevels.has(level.level) ? (
                              <Badge variant="success" size="sm">{isRTL ? 'متاح' : 'Unlocked'}</Badge>
                            ) : (
                              <Badge variant="neutral" size="sm">
                                <Lock className="w-3 h-3 mr-1" /> {isRTL ? 'مُغْلَق' : 'Locked'}
                              </Badge>
                            )}
                          </div>
                          {levelSubtitle && <p className="text-sm text-[#8E8E9F] mt-0.5">{levelSubtitle}</p>}
                          {(() => {
                            const done = level.modules.filter(m => completedModules.has(m.slug)).length;
                            return (
                              <p className="text-xs text-[#B0B0C0] mt-1">
                                {done > 0 ? (
                                  <>
                                    <span className="font-semibold" style={{ color: program.color }}>{done}/{moduleCount}</span>
                                    {' · '}
                                    {isRTL ? 'مُكْتَمِل' : 'complete'}
                                  </>
                                ) : (
                                  <>{moduleCount} {isRTL ? 'وحدات' : 'modules'}</>
                                )}
                              </p>
                            );
                          })()}
                        </div>
                        {(() => {
                          const done = level.modules.filter(m => completedModules.has(m.slug)).length;
                          const pct = moduleCount > 0 ? Math.round((done / moduleCount) * 100) : 0;
                          return <ProgressRing value={pct} size={36} strokeWidth={3} color={program.color} showLabel={false} />;
                        })()}
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-[#8E8E9F]" /> : <ChevronDown className="w-5 h-5 text-[#8E8E9F]" />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pt-2 border-t border-[#F3EFE8] space-y-1">
                              {/* Per-level pre/post self-assessment — only for enrolled users with access */}
                              {enrolled && (level.isFree || program.isFree || unlockedLevels.has(level.level)) && LEVEL_DIMENSIONS[slug]?.[level.level] && (
                                <LevelAssessment
                                  programSlug={slug}
                                  levelNumber={level.level}
                                  dimensions={LEVEL_DIMENSIONS[slug][level.level]}
                                  isRTL={isRTL}
                                  color={program.color}
                                  levelComplete={level.modules.every(m => typeof window !== 'undefined' && localStorage.getItem(`academy:quiz-passed:${slug}:${m.slug}`) === 'true')}
                                />
                              )}
                              {/* Level unlock CTA — shown when enrolled, level is paid, and not yet unlocked */}
                              {enrolled && !level.isFree && !program.isFree && !unlockedLevels.has(level.level) && (
                                <div className="mt-3 mb-4 rounded-xl border p-4 flex items-center gap-3" style={{ borderColor: `${program.color}30`, background: `linear-gradient(135deg, ${program.color}08, ${program.color}02)` }}>
                                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${program.color}15`, color: program.color }}>
                                    <Lock className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#2D2A33]">
                                      {isRTL ? 'اِفْتَحِ البَرْنامَجَ بِالكامِل' : 'Unlock the Full Program'}
                                    </p>
                                    <p className="text-[11px] text-[#8E8E9F]">
                                      {isRTL ? 'جَميعُ المُسْتَوَيات · دَفْعةٌ واحِدَة · وُصولٌ دائِم' : 'All levels · one payment · lifetime access'}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => handleUnlockLevel(level.level)}
                                    disabled={checkoutLoading}
                                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:shadow-md flex-shrink-0 disabled:opacity-50"
                                    style={{ backgroundColor: program.color }}
                                  >
                                    CAD ${dynamicPricing.academyFullAccessPrice}
                                  </button>
                                </div>
                              )}
                              {level.modules.map((mod, modIdxInLevel) => {
                                moduleNumber++;
                                const modTitle = t(mod.titleEn, mod.titleAr, isRTL);
                                const canAccess = enrolled && (level.isFree || program.isFree || unlockedModules.has(mod.slug));
                                const hasInteractive = !!(mod.scenarios?.length || mod.dragMatchExercises?.length || mod.likertReflections?.length);
                                const isCompleted = completedModules.has(mod.slug);
                                // "Next" = first non-completed accessible module in this level
                                const isNext = canAccess && !isCompleted && level.modules.slice(0, modIdxInLevel).every(m => completedModules.has(m.slug));

                                return (
                                  <div key={mod.slug}>
                                    {canAccess ? (
                                      <a
                                        href={`/${locale}/programs/${slug}/${mod.slug}`}
                                        className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-colors group ${isNext ? 'bg-[color:var(--c)]/5 border border-[color:var(--c)]/20' : 'hover:bg-[#FAF7F2]'}`}
                                        style={isNext ? { '--c': program.color } as React.CSSProperties : undefined}
                                      >
                                        <div
                                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 relative"
                                          style={{ backgroundColor: isCompleted ? program.color : `${program.color}12`, color: isCompleted ? 'white' : program.color }}
                                        >
                                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : moduleNumber}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <span className={`text-sm transition-colors font-medium block truncate ${isCompleted ? 'text-[#8E8E9F] line-through' : 'text-[#2D2A33] group-hover:text-[#7A3B5E]'}`}>
                                            {modTitle}
                                          </span>
                                          {isNext && (
                                            <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: program.color }}>
                                              {isRTL ? 'التّالي →' : 'Continue →'}
                                            </span>
                                          )}
                                          {/* Skill tags */}
                                          {mod.skillTags && (
                                            <div className="flex gap-1 mt-0.5">
                                              {mod.skillTags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-[9px] text-[#8E8E9F]">{tag}</span>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                          {hasInteractive && <Sparkles className="w-3 h-3 text-[#C8A97D]" />}
                                          <span className="text-xs text-[#8E8E9F]">{mod.durationMinutes} min</span>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              window.location.href = `/api/academy/worksheet/${slug}/${mod.slug}?locale=${locale}`;
                                            }}
                                            title={locale === 'ar' ? 'تحميل ورقة العمل' : 'Download worksheet'}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[#8E8E9F] hover:text-[#7A3B5E] cursor-pointer"
                                          >
                                            <Download className="w-3.5 h-3.5" />
                                          </button>
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
                                        <Lock className="w-3.5 h-3.5 text-[#B0B0C0]" />
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
        </div>
      </section>

      {/* ─── ENROLLMENT ─── */}
      <section id="enroll" className="py-20 lg:py-28 bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="max-w-lg mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5" style={{ backgroundColor: `${program.color}10` }}>
                <Sparkles className="w-8 h-8" style={{ color: program.color }} />
              </div>

              <h2 className="text-3xl font-bold text-[#2D2A33] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {!enrolled
                  ? (isRTL ? 'ابدأ رحلتك اليوم' : 'Start Your Journey Today')
                  : completedModules.size > 0
                    ? (isRTL ? 'أكمِلْ رحلتَك' : 'Keep Going!')
                    : (isRTL ? 'أنت مسجل!' : "You're Enrolled!")}
              </h2>

              {enrolled ? (
                <div>
                  {(() => {
                    const allModules = program.levels.flatMap(l => l.modules);
                    const completedCount = completedModules.size;
                    const totalCount = allModules.length;
                    const nextModule = allModules.find(m => !completedModules.has(m.slug));
                    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

                    if (programComplete && certId) {
                      return (
                        <div className="mb-6">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C8A97D]/15 text-[#C8A97D] text-xs font-semibold uppercase tracking-wider mb-4">
                            <Award className="w-3.5 h-3.5" />
                            {isRTL ? 'أَكْمَلْت البَرْنامَج' : 'Program Complete'}
                          </div>
                          <p className="text-[#4A4A5C] mb-6">
                            {isRTL
                              ? 'شَهادَتُك جاهِزَة — مع رِسالَةٍ شَخْصيَّةٍ من الدّكتورة هالة، وخَريطَةِ نُمُوِّك، وكَلِماتك أَنْت.'
                              : 'Your certificate is ready — with a personal note from Dr. Hala, your growth map, and your own words.'}
                          </p>
                          <a
                            href={`/${locale}/programs/certificate/${certId}`}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-lg"
                            style={{ backgroundColor: '#C8A97D' }}
                          >
                            <Award className="w-4 h-4" />
                            {isRTL ? 'اِعْرِض شَهادَتي' : 'View My Certificate'}
                          </a>
                        </div>
                      );
                    }

                    if (completedCount > 0 && nextModule) {
                      // In progress — show encouraging message + continue button
                      return (
                        <>
                          <div className="inline-flex items-center gap-2 text-[#C8A97D] mb-3">
                            <Star className="w-5 h-5" />
                            <span className="font-semibold text-sm">
                              {isRTL ? `${completedCount} من ${totalCount} مكتمل — أحسنتَ!` : `${completedCount} of ${totalCount} complete — well done!`}
                            </span>
                          </div>
                          <p className="text-[#4A4A5C] mb-6">
                            {isRTL
                              ? 'كلُّ خطوةٍ تقرّبُكَ من النّسخةِ الأفضل. استمرَّ — أنتَ على الطّريقِ الصّحيح.'
                              : "Every step brings you closer to the version of yourself you're working toward. Keep going — you're on the right path."}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <a
                              href={`/${locale}/programs/${slug}/${nextModule.slug}`}
                              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-lg"
                              style={{ backgroundColor: program.color }}
                            >
                              <Play className="w-4 h-4" />
                              {isRTL ? 'أكمِلْ الرّحلةَ' : 'Continue Your Journey'}
                            </a>
                            <button
                              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#F3EFE8] text-sm font-semibold text-[#4A4A5C] hover:border-[#C8A97D]/30 transition-all"
                            >
                              <Layers className="w-4 h-4" />
                              {isRTL ? 'خريطة الرّحلة' : 'View Journey Map'}
                            </button>
                          </div>
                        </>
                      );
                    }

                    // Fresh enrollment — no progress yet
                    return (
                      <>
                        <div className="inline-flex items-center gap-2 text-[#3B8A6E] mb-4">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">{isRTL ? 'تم التسجيل بنجاح' : 'Successfully enrolled'}</span>
                        </div>
                        <p className="text-[#4A4A5C] mb-6">{isRTL ? 'أنت جاهز — ابدأ بالوحدة الأولى الآن.' : "You're all set — start with the first module now."}</p>
                        {program.levels[0]?.modules[0] && (
                          <a
                            href={`/${locale}/programs/${slug}/${program.levels[0].modules[0].slug}`}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-lg"
                            style={{ backgroundColor: program.color }}
                          >
                            <Play className="w-4 h-4" />
                            {isRTL ? 'ابدأ الوحدة الأولى' : 'Start Module 1'}
                          </a>
                        )}
                      </>
                    );
                  })()}
                  <p className="text-xs text-[#8E8E9F] mt-4">
                    <a href={`/${locale}/dashboard`} className="text-[#7A3B5E] hover:underline">
                      {isRTL ? 'لوحة تحكّمك' : 'Your Dashboard'}
                    </a>
                    {' — '}{isRTL ? 'تتبّع تقدّمك وعُدْ في أي وقت' : 'track progress & come back anytime'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-start">
                    <SafetyNotice isRTL={isRTL} color={program.color} />
                  </div>
                  <p className="text-[#4A4A5C] mb-8">
                    {isRTL
                      ? 'أدخل بريدك الإلكتروني للتسجيل والبدء مع المستوى الأول مجاناً.'
                      : 'Enter your email to enroll and start with Level 1 — completely free.'}
                  </p>
                  <form onSubmit={handleEnroll} className="space-y-3">
                    <input type="text" value={enrollName} onChange={(e) => setEnrollName(e.target.value)} placeholder={isRTL ? 'اسمك' : 'Your name'}
                      className="w-full px-4 py-3 rounded-xl border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20" />
                    <input type="email" value={enrollEmail} onChange={(e) => setEnrollEmail(e.target.value)} placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email'} required
                      className="w-full px-4 py-3 rounded-xl border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20" />
                    <button type="submit" disabled={enrolling} className="w-full py-3.5 rounded-xl text-white text-sm font-semibold disabled:opacity-60 flex items-center justify-center gap-2 transition-all hover:shadow-md" style={{ backgroundColor: program.color }}>
                      {enrolling ? <><Loader2 className="w-4 h-4 animate-spin" /> {isRTL ? 'جاري التسجيل...' : 'Enrolling...'}</> : <><GraduationCap className="w-4 h-4" /> {isRTL ? 'ابدأ مجاناً' : 'Start Free'}</>}
                    </button>
                  </form>
                  {!program.isFree && (
                    <p className="text-xs text-[#8E8E9F] text-center mt-3">
                      {isRTL
                        ? `المُسْتَوى الأَوَّل مَجّاني · الوُصولُ الكامِل $${dynamicPricing.academyFullAccessPrice} CAD`
                        : `Level 1 is free · Full access $${dynamicPricing.academyFullAccessPrice} CAD`}
                    </p>
                  )}
                </>
              )}

              {/* Consultation upsell — personalized guidance with Dr. Hala */}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA locale={locale} fillColorAbove="#ffffff"
        headingEn={<>Ready to <span className="text-[#7A3B5E] italic">Transform?</span></>}
        headingAr={<>مستعد <span className="text-[#7A3B5E] italic">للتحول؟</span></>}
      />


      <MyLearningButton locale={locale} color={program?.color || '#7A3B5E'} />

      {/* Stripe Checkout loading overlay */}
      {checkoutLoading && (
        <div className="fixed inset-0 z-50 bg-[#2D2A33]/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
            <Loader2 className="w-8 h-8 animate-spin text-[#7A3B5E]" />
            <p className="text-sm font-medium text-[#2D2A33]">
              {isRTL ? 'جارٍ التحويل إلى صفحة الدفع...' : 'Redirecting to checkout...'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
