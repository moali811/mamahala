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
import { t, tArray } from '@/lib/academy-helpers';
import { startAcademyCheckout, markJustPaid } from '@/lib/academy-checkout';
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

  // Cross-device sign-in (magic link)
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInState, setSignInState] = useState<'idle' | 'sending' | 'sent' | 'notEnrolled' | 'error'>('idle');

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

  // Load enrollment + unlock state — server is the source of truth.
  // Try session-based /api/academy/me first (works cross-device after magic-link sign-in),
  // then fall back to email-based /api/academy/access (read-only view from localStorage email).
  // localStorage becomes a warm cache; the server always overrides.
  useEffect(() => {
    if (typeof window === 'undefined' || !program) return;

    const controller = new AbortController();
    let cancelled = false;

    const applyServerState = (data: {
      enrolledPrograms?: string[];
      unlockedLevels?: Record<string, number[]>;
      unlockedModules?: Record<string, string[]>;
      completedModules?: Record<string, string[]>;
      allAccess?: boolean;
      email?: string;
    }) => {
      if (cancelled || !program) return;

      const isEnrolledNow = (data.enrolledPrograms || []).includes(slug) || !!data.allAccess;
      if (isEnrolledNow) {
        setEnrolled(true);
        localStorage.setItem(`academy_enrolled_${slug}`, 'true');
      }
      if (data.email) localStorage.setItem('academy_email', data.email);

      const levelsUnlocked = new Set<number>();
      if (data.allAccess) {
        program.levels.forEach(l => levelsUnlocked.add(l.level));
      } else {
        ((data.unlockedLevels || {})[slug] || []).forEach(n => levelsUnlocked.add(n));
      }
      setUnlockedLevels(levelsUnlocked);

      const modulesUnlocked = new Set<string>();
      program.levels.forEach(l => {
        if (levelsUnlocked.has(l.level)) l.modules.forEach(m => modulesUnlocked.add(m.slug));
      });
      ((data.unlockedModules || {})[slug] || []).forEach(s => {
        if (s !== '*') modulesUnlocked.add(s);
      });
      setUnlockedModules(modulesUnlocked);

      // Warm localStorage cache for fast reloads (server still re-checks on every mount)
      levelsUnlocked.forEach(n => localStorage.setItem(`academy:paid:${slug}:level-${n}`, 'true'));

      const completed = new Set((data.completedModules || {})[slug] || []);
      if (completed.size > 0) setCompletedModules(completed);
    };

    (async () => {
      // 1) Session-authoritative
      try {
        const meRes = await fetch('/api/academy/me', { signal: controller.signal });
        if (meRes.ok) {
          const me = await meRes.json();
          applyServerState(me);
          return;
        }
      } catch {
        /* network/abort — fall through */
      }

      // 2) Email fallback — read-only view if localStorage has an email
      try {
        const storedEmail = localStorage.getItem('academy_email');
        if (storedEmail) {
          const res = await fetch(
            `/api/academy/access?email=${encodeURIComponent(storedEmail)}&programSlug=${encodeURIComponent(slug)}`,
            { signal: controller.signal },
          );
          if (res.ok) {
            const data = await res.json();
            const hasAny = !!(data.isAdmin || data.isVip || (data.unlockedLevels || []).length > 0);
            applyServerState({
              enrolledPrograms: hasAny ? [slug] : [],
              unlockedLevels: data.unlockedLevels ? { [slug]: data.unlockedLevels } : {},
              unlockedModules: data.unlockedModules ? { [slug]: data.unlockedModules } : {},
              allAccess: !!data.isAdmin || !!data.isVip,
              email: storedEmail,
            });
          }
          if (localStorage.getItem(`academy_enrolled_${slug}`) === 'true') setEnrolled(true);
        } else if (localStorage.getItem(`academy_enrolled_${slug}`) === 'true') {
          // Enrolled flag without email — honor enrollment but don't unlock paid
          setEnrolled(true);
        }
      } catch {
        /* ignore */
      }
    })();

    return () => { cancelled = true; controller.abort(); };
  }, [slug, program]);

  // Handle return from Stripe Payment Link or legacy Checkout Session
  useEffect(() => {
    if (typeof window === 'undefined' || !program) return;
    const params = new URLSearchParams(window.location.search);

    // Poll server to confirm webhook-persisted unlock matches the expected level(s).
    // Stripe's webhook is async — the user may land here before KV is updated.
    const reconcileWithServer = async (expected: number[]) => {
      const email = localStorage.getItem('academy_email') || '';
      if (!email) return;
      for (const delay of [800, 1600, 3200]) {
        await new Promise(r => setTimeout(r, delay));
        try {
          const res = await fetch(
            `/api/academy/access?email=${encodeURIComponent(email)}&programSlug=${encodeURIComponent(slug)}`,
          );
          if (!res.ok) continue;
          const data = await res.json();
          const serverLevels: number[] = Array.isArray(data.unlockedLevels) ? data.unlockedLevels : [];
          if (expected.every(n => serverLevels.includes(n))) {
            setUnlockedLevels(new Set(serverLevels));
            return;
          }
        } catch { /* retry */ }
      }
    };

    // Stripe Payment Link return: ?paid=level-N or ?paid=bundle
    const paidParam = params.get('paid');
    if (paidParam) {
      markJustPaid(slug);
      if (paidParam === 'bundle') {
        unlockLevelLocally(2);
        unlockLevelLocally(3);
        void reconcileWithServer([2, 3]);
      } else {
        const levelMatch = paidParam.match(/^level-(\d+)$/);
        if (levelMatch) {
          const n = Number(levelMatch[1]);
          unlockLevelLocally(n);
          // With fullAccess tier the webhook unlocks every paid level; reconcile
          // against the program's paid levels so the UI flips all badges at once.
          const expected = program.levels.filter(l => !l.isFree).map(l => l.level);
          void reconcileWithServer(expected.length > 0 ? expected : [n]);
        }
      }
      window.history.replaceState({}, '', `/${locale}/programs/${slug}`);
    }

    // Legacy Stripe Checkout Session return
    const sessionId = params.get('session_id');
    const paymentStatus = params.get('payment');
    const levelParam = params.get('level');
    if (paymentStatus === 'success' && sessionId) {
      markJustPaid(slug);
      const paidLevels = program.levels.filter(l => !l.isFree).map(l => l.level);
      fetch(`/api/academy/checkout?session_id=${sessionId}`)
        .then(r => r.json())
        .then(data => {
          if (data.paid) {
            paidLevels.forEach(n => unlockLevelLocally(n));
            void reconcileWithServer(paidLevels.length > 0 ? paidLevels : (data.levelNumber ? [data.levelNumber] : []));
          }
        })
        .catch(() => {
          if (levelParam) {
            const n = Number(levelParam);
            unlockLevelLocally(n);
            void reconcileWithServer(paidLevels.length > 0 ? paidLevels : [n]);
          }
        })
        .finally(() => {
          window.history.replaceState({}, '', `/${locale}/programs/${slug}`);
        });
    } else if (paymentStatus === 'cancelled') {
      window.history.replaceState({}, '', `/${locale}/programs/${slug}`);
    }

    // ?unlock=level-N — surface the unlock CTA in the curriculum rather than
    // re-opening Stripe. Re-opening caused a double-charge trap when the
    // module page's access check fired before the webhook had written to KV.
    const unlockParam = params.get('unlock');
    if (unlockParam) {
      const levelMatch = unlockParam.match(/^level-(\d+)$/);
      if (levelMatch) {
        const n = Number(levelMatch[1]);
        setExpandedLevel(n);
        setTimeout(() => {
          document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      window.history.replaceState({}, '', `/${locale}/programs/${slug}`);
    }

    // ?signin=1 — proxy gate redirected an unauthorized visitor here.
    // The session cookie is missing or expired, so treat the device as not
    // enrolled (they may have enrolled on another device). Clearing the local
    // flag makes the enrollment section render, which hosts the sign-in
    // dialog. Open the dialog and scroll the user to it so they don't have
    // to hunt for the button.
    if (params.get('signin') === '1') {
      try {
        localStorage.removeItem(`academy_enrolled_${slug}`);
      } catch { /* ignore */ }
      setEnrolled(false);
      setSignInOpen(true);
      setTimeout(() => {
        document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      window.history.replaceState({}, '', `/${locale}/programs/${slug}`);
    }

    // ?error=1 — proxy gate fell back to fail-closed (KV unavailable).
    // Surface a quick message rather than silently sending the user in
    // circles between the module page and here.
    if (params.get('error') === '1') {
      window.history.replaceState({}, '', `/${locale}/programs/${slug}`);
      alert(isRTL
        ? 'تعذّرَ التحقّقُ من وصولكَ مؤقّتاً. الرجاء المحاولةُ مرّةً أخرى بعد لحظات.'
        : 'We could not verify your access right now. Please try again in a moment.');
    }
  }, [program, enrolled, slug, locale, isRTL]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUnlockLevel = async (levelNum: number) => {
    if (checkoutLoading) return;

    // Idempotency: if the level is already unlocked client-side, never create a
    // second Stripe session. Refresh from the server so the UI reflects the
    // authoritative state and clears any stale "locked" banner.
    if (unlockedLevels.has(levelNum)) {
      try {
        const me = await fetch('/api/academy/me').then(r => r.ok ? r.json() : null);
        if (me && program) {
          const serverLevels: number[] = me.allAccess
            ? program.levels.map(l => l.level)
            : (me.unlockedLevels?.[slug] || []);
          if (serverLevels.length > 0) {
            setUnlockedLevels(new Set(serverLevels));
            setUnlockedModules(prev => {
              const next = new Set(prev);
              program.levels.forEach(l => {
                if (serverLevels.includes(l.level)) l.modules.forEach(m => next.add(m.slug));
              });
              return next;
            });
          }
        }
      } catch { /* non-critical — UI already reflects unlock */ }
      return;
    }

    setCheckoutLoading(true);
    setUnlockingLevel(levelNum);

    const email = typeof window !== 'undefined' ? localStorage.getItem('academy_email') || '' : '';
    const result = await startAcademyCheckout({
      programSlug: slug,
      programTitle: program?.titleEn || slug,
      levelNumber: levelNum,
      email,
      locale,
    });

    if (!result.ok) {
      setCheckoutLoading(false);
      setUnlockingLevel(null);
      alert(isRTL
        ? 'تعذّر فتح صفحة الدفع — الرجاء المحاولة مرة أخرى.'
        : 'Could not open checkout. Please try again in a moment.');
    }
    // On success the browser navigates away; no cleanup needed.
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
    try {
      const res = await fetch('/api/academy/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, name: enrollName.trim(), programSlug: slug }),
      });
      const data = await res.json();
      if (res.ok) {
        setEnrolled(true);
        localStorage.setItem('academy_email', normalizedEmail);
        localStorage.setItem(`academy_enrolled_${slug}`, 'true');
        // Server-side auto-unlock (admin / VIP) — pull unlocked levels from /me
        if (data.adminUnlocked) {
          try {
            const meRes = await fetch('/api/academy/me');
            if (meRes.ok) {
              const me = await meRes.json();
              if (me.allAccess && program) {
                program.levels.forEach(l => unlockLevelLocally(l.level));
              }
            }
          } catch { /* non-critical */ }
        }
        setTimeout(() => {
          document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 600);
      }
    } catch {
      /* Network error — server is the source of truth, local-only unlock removed */
    }
    setEnrolling(false);
  };

  // Magic-link "Sign in" flow for cross-device access
  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = signInEmail.trim();
    if (!email.includes('@')) return;
    setSignInState('sending');
    try {
      const res = await fetch('/api/academy/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSignInState('sent');
      } else {
        const data = await res.json().catch(() => ({}));
        setSignInState(data.notEnrolled ? 'notEnrolled' : 'error');
      }
    } catch {
      setSignInState('error');
    }
  };

  // Merge any localStorage-cached completions on top of the server-hydrated set.
  // Server is the source of truth; localStorage only adds completions not yet
  // synced (e.g., just-passed quiz whose server POST is still in flight).
  useEffect(() => {
    if (typeof window === 'undefined' || !program) return;
    setCompletedModules(prev => {
      const merged = new Set(prev);
      for (const lvl of program.levels) {
        for (const mod of lvl.modules) {
          if (localStorage.getItem(`academy:quiz-passed:${slug}:${mod.slug}`) === 'true') {
            merged.add(mod.slug);
          }
        }
      }
      return merged;
    });
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
                  {(() => {
                    // Program complete + cert ready → route to the certificate
                    if (programComplete && certId) {
                      return (
                        <a
                          href={`/${locale}/programs/certificate/${certId}`}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-lg"
                          style={{ backgroundColor: '#C8A97D' }}
                        >
                          <Award className="w-4 h-4" />
                          {isRTL ? 'اِعْرِض شَهادَتي' : 'View My Certificate'}
                        </a>
                      );
                    }
                    const allMods = program.levels.flatMap(l => l.modules);
                    // Pick first incomplete module whose level is accessible (free or unlocked).
                    // Prevents the hero from sending users into a paid module they haven't bought yet.
                    const target = allMods.find(m => {
                      if (completedModules.has(m.slug)) return false;
                      const lvl = program.levels.find(l => l.modules.some(mm => mm.slug === m.slug));
                      if (!lvl) return false;
                      return lvl.isFree || program.isFree || unlockedLevels.has(lvl.level);
                    }) ?? allMods[0];
                    if (!target) return null;
                    const hasProgress = completedModules.size > 0;
                    return (
                      <a
                        href={`/${locale}/programs/${slug}/${target.slug}`}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-lg"
                        style={{ backgroundColor: program.color }}
                      >
                        <Play className="w-4 h-4" />
                        {hasProgress
                          ? (isRTL ? 'واصلِ التعلّم' : 'Continue Your Journey')
                          : (isRTL ? 'ابدأ الوحدة الأولى' : 'Start Module 1')}
                      </a>
                    );
                  })()}
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
                                const levelUnlocked = level.isFree || program.isFree || unlockedLevels.has(level.level);
                                const canAccess = enrolled && levelUnlocked;
                                const hasInteractive = !!(mod.scenarios?.length || mod.dragMatchExercises?.length || mod.likertReflections?.length);
                                const isCompleted = completedModules.has(mod.slug);
                                // Progression state:
                                //   isCurrent = the single next module in order the user should tackle (first uncompleted in this level, and earlier levels complete)
                                //   isRecommendedLater = accessible but there's an earlier uncompleted module to finish first (soft guidance)
                                //   isMasteryLocked = Level-3 module while any Level-1 or Level-2 module is still incomplete (hard gate)
                                const priorInLevelComplete = level.modules.slice(0, modIdxInLevel).every(m => completedModules.has(m.slug));
                                const priorLevelsComplete = program.levels
                                  .filter(l => l.level < level.level)
                                  .every(l => l.modules.every(m => completedModules.has(m.slug)));
                                const isCurrent = canAccess && !isCompleted && priorInLevelComplete && priorLevelsComplete;
                                const isRecommendedLater = canAccess && !isCompleted && !isCurrent;
                                const isMasteryLocked = enrolled
                                  && level.level === 3
                                  && !program.levels
                                    .filter(l => l.level <= 2)
                                    .every(l => l.modules.every(m => completedModules.has(m.slug)));

                                return (
                                  <div key={mod.slug}>
                                    {isMasteryLocked ? (
                                      <div
                                        className="flex items-center gap-3 py-3 px-3 rounded-lg opacity-70"
                                        title={isRTL ? 'أَكمِل المستويَين الأوّل والثّاني لِفَتح مستوى الإتقان' : 'Complete Levels 1 & 2 to unlock Mastery'}
                                      >
                                        <div className="w-8 h-8 rounded-lg bg-[#F3EFE8] flex items-center justify-center flex-shrink-0">
                                          <Lock className="w-3.5 h-3.5 text-[#C8A97D]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <span className="text-sm text-[#8E8E9F] font-medium block truncate">{modTitle}</span>
                                          <span className="text-[10px] text-[#C8A97D] font-semibold uppercase tracking-wider">
                                            {isRTL ? 'أَكمِل المُسْتَوَيَيْن الأَوَّل والثّاني أَوَّلاً' : 'Finish Levels 1 & 2 first'}
                                          </span>
                                        </div>
                                        <span className="text-xs text-[#8E8E9F] flex-shrink-0">{mod.durationMinutes} min</span>
                                      </div>
                                    ) : canAccess ? (
                                      <a
                                        href={`/${locale}/programs/${slug}/${mod.slug}`}
                                        className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-colors group ${isCurrent ? 'bg-[color:var(--c)]/5 border border-[color:var(--c)]/20' : isRecommendedLater ? 'opacity-70 hover:opacity-100 hover:bg-[#FAF7F2]' : 'hover:bg-[#FAF7F2]'}`}
                                        style={isCurrent ? { '--c': program.color } as React.CSSProperties : undefined}
                                        title={isRecommendedLater ? (isRTL ? 'نُوصي بإكمال الوحدة السّابقة أوّلاً — يُمكِنك المُتابَعة على أيّ حال' : 'Recommended: finish the previous module first — you can skip anyway') : undefined}
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
                                          {isCurrent && (
                                            <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: program.color }}>
                                              {isRTL ? 'التّالي →' : 'Continue →'}
                                            </span>
                                          )}
                                          {isRecommendedLater && (
                                            <span className="text-[9px] text-[#8E8E9F] italic">
                                              {isRTL ? 'أكمِل السّابق أوّلاً · مُتاح للتّخَطّي' : 'Complete previous first · skip ok'}
                                            </span>
                                          )}
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

                  {/* Already enrolled? Sign in with email (magic link) */}
                  <div className="mt-6 pt-5 border-t border-[#F3EFE8] text-center">
                    <p className="text-xs text-[#8E8E9F]">
                      {isRTL ? 'سَجَّلتَ من قبل على جهاز آخر؟' : 'Already enrolled on another device?'}
                      {' '}
                      <button
                        type="button"
                        onClick={() => setSignInOpen(prev => !prev)}
                        className="text-[#7A3B5E] font-medium hover:underline"
                      >
                        {isRTL ? 'سَجِّل الدّخول بالبريد' : 'Sign in with email'}
                      </button>
                    </p>
                    {signInOpen && (
                      <div className="mt-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#F3EFE8] text-start">
                        {signInState === 'sent' ? (
                          <p className="text-sm text-[#3B8A6E] flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            {isRTL ? 'تحقّق من بريدك — أرسلنا لك رابط الدّخول.' : 'Check your inbox — we sent you a login link.'}
                          </p>
                        ) : (
                          <form onSubmit={handleSendMagicLink} className="space-y-2">
                            <input
                              type="email"
                              value={signInEmail}
                              onChange={e => { setSignInEmail(e.target.value); if (signInState !== 'idle') setSignInState('idle'); }}
                              placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email'}
                              required
                              className="w-full px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20"
                            />
                            <button
                              type="submit"
                              disabled={signInState === 'sending'}
                              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60 transition-colors"
                              style={{ backgroundColor: '#7A3B5E' }}
                            >
                              {signInState === 'sending'
                                ? (isRTL ? 'جاري الإرسال…' : 'Sending…')
                                : (isRTL ? 'أرسل رابط الدّخول' : 'Send login link')}
                            </button>
                            {signInState === 'notEnrolled' && (
                              <p className="text-xs text-[#D4836A]">
                                {isRTL ? 'لم نعثر على حسابك. يُرجى التّسجيل أوّلاً.' : 'No account found. Please enroll first.'}
                              </p>
                            )}
                            {signInState === 'error' && (
                              <p className="text-xs text-[#D4836A]">
                                {isRTL ? 'حدث خطأ. حاوِل مرّةً أخرى.' : 'Something went wrong. Please try again.'}
                              </p>
                            )}
                          </form>
                        )}
                      </div>
                    )}
                  </div>
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
