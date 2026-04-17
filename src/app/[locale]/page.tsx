'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import FinalCTA from '@/components/shared/FinalCTA';
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Sparkles,
  Calendar,
  GraduationCap,
  Users,
  User,
  Heart,
  Leaf,
  BookOpen,
  Quote,
  Instagram,
  CheckCircle2,
  Gift,
  Shield,
  HeartCrack,
  Compass,
  Home,
  Star,
  Sprout,
  Smile,
  TreePine,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { useServices } from '@/hooks/useServices';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useBlog } from '@/hooks/useBlog';
import { getCategoryLabel } from '@/data/blog-posts';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import EmpathySlideshow from '@/components/home/EmpathySlideshow';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';
import { getBookingUrl } from '@/config/business';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Users, User, Heart, Leaf, Sparkles: Sparkles, Sprout, Smile, TreePine,
};

/* ─── Guided Scenario Flow ─── */
type ScenarioItem = {
  icon: 'heart' | 'shield' | 'users' | 'heartCrack' | 'compass' | 'home';
  headlineEn: string;
  headlineAr: string;
  subtitleEn: string;
  subtitleAr: string;
  category: string;
  gradient: string;
  accent: string;
};

function GuidedScenarioFlow({
  scenarios,
  locale,
  isRTL,
}: {
  scenarios: ScenarioItem[];
  locale: string;
  isRTL: boolean;
}) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const current = scenarios[step];
  const total = scenarios.length;

  const handleYes = () => {
    setSelected((prev) => [...prev, step]);
    advance();
  };

  const handleNo = () => {
    advance();
  };

  const advance = () => {
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setStep(0);
    setSelected([]);
    setFinished(false);
  };

  // Result: figure out which category was most selected
  const getResult = () => {
    if (selected.length === 0) return null;
    const cats = selected.map((i) => scenarios[i].category);
    const counts: Record<string, number> = {};
    cats.forEach((c) => { counts[c] = (counts[c] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  if (finished) {
    const topCategory = getResult();
    return (
      <motion.div
        key="result"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="bg-white rounded-3xl p-10 lg:p-14 border border-[#F3EFE8] shadow-[var(--shadow-elevated)] max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#C4878A]/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-[#7A3B5E]" />
          </div>

          {selected.length > 0 && topCategory ? (
            <>
              <h3
                className="text-2xl font-bold text-[#2D2A33] mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'وجدنا ما يُناسبُك' : "We Found What Fits"}
              </h3>
              <p className="text-[#6B6580] mb-8 leading-relaxed">
                {isRTL
                  ? `بناءً على إجاباتِك، نعتقدُ أنّ خدماتِنا في مجالِ ${
                      topCategory === 'youth' ? 'الشّباب' : topCategory === 'families' ? 'العائلات' : topCategory === 'couples' ? 'الأزواج' : 'البالغين'
                    } ستكونُ الأنسبَ لك.`
                  : `Based on your answers, our ${
                      topCategory === 'youth' ? 'Youth' : topCategory === 'families' ? 'Family' : topCategory === 'couples' ? 'Couples' : 'Adult'
                    } services seem like the best fit for you.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/${locale}/services/${topCategory}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#7A3B5E] text-white font-semibold hover:bg-[#5E2D48] transition-all duration-300 text-[15px]"
                >
                  {isRTL ? 'استعرِضِ الخدماتِ المُناسبة' : 'Explore Matching Services'}
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
                <Link
                  href={getBookingUrl(locale as string)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#7A3B5E] text-[#7A3B5E] font-semibold hover:bg-[#7A3B5E]/5 transition-all duration-300 text-[15px]"
                >
                  <Calendar className="w-4 h-4" />
                  {isRTL ? 'ابدأْ محادثةً مجّانيّة' : 'Start a Free Conversation'}
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3
                className="text-2xl font-bold text-[#2D2A33] mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'لا بأس — نحنُ هنا لمُساعدتِك' : "That's Okay — We're Here to Help"}
              </h3>
              <p className="text-[#6B6580] mb-8 leading-relaxed">
                {isRTL
                  ? 'كلّ رحلةٍ مختلفة. ابدأْ بمحادثةٍ مجّانيّة أو تواصَلْ معنا مباشرة.'
                  : "Every journey is different. Start with a free conversation or reach out to us directly."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={getBookingUrl(locale as string)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#7A3B5E] text-white font-semibold hover:bg-[#5E2D48] transition-all duration-300 text-[15px]"
                >
                  <Calendar className="w-4 h-4" />
                  {isRTL ? 'ابدأْ محادثةً مجّانيّة' : 'Start a Free Conversation'}
                </Link>
                <a
                  href="https://wa.me/16132222104"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#7A3B5E] text-[#7A3B5E] font-semibold hover:bg-[#7A3B5E]/5 transition-all duration-300 text-[15px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  {isRTL ? 'تواصَلْ عبر واتساب' : 'Chat on WhatsApp'}
                </a>
              </div>
            </>
          )}

          <button
            onClick={restart}
            className="mt-6 text-sm text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors"
          >
            {isRTL ? 'ابدأْ من جديد' : 'Start over'}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs font-medium text-[#8E8E9F]">
          {step + 1} / {total}
        </span>
        <div className="flex-1 mx-4 h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C8A97D] to-[#7A3B5E] rounded-full"
            initial={false}
            animate={{ width: `${((step + 1) / total) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <button
          onClick={() => { setFinished(true); }}
          className="text-xs text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors"
        >
          {isRTL ? 'تخطّي' : 'Skip'}
        </button>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRTL ? 40 : -40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative rounded-3xl p-8 lg:p-10 border border-transparent overflow-hidden"
            style={{ borderColor: `${current.accent}20` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient}`} />
            <div className="relative z-10 text-center">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: `${current.accent}15` }}>
                {current.icon === 'heart' && <Heart className="w-7 h-7" style={{ color: current.accent }} />}
                {current.icon === 'shield' && <Shield className="w-7 h-7" style={{ color: current.accent }} />}
                {current.icon === 'users' && <Users className="w-7 h-7" style={{ color: current.accent }} />}
                {current.icon === 'heartCrack' && <HeartCrack className="w-7 h-7" style={{ color: current.accent }} />}
                {current.icon === 'compass' && <Compass className="w-7 h-7" style={{ color: current.accent }} />}
                {current.icon === 'home' && <Home className="w-7 h-7" style={{ color: current.accent }} />}
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold text-[#2D2A33] leading-snug mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? current.headlineAr : current.headlineEn}
              </h3>
              <p className="text-[#6B6580] leading-relaxed mb-8 max-w-sm mx-auto">
                {isRTL ? current.subtitleAr : current.subtitleEn}
              </p>

              {/* Action buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleYes}
                  className="flex-1 max-w-[180px] py-3.5 rounded-full font-semibold text-[15px] transition-all duration-300 text-white"
                  style={{ backgroundColor: current.accent }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  {isRTL ? 'هذا يُشبهُني' : 'This is me'}
                </button>
                <button
                  onClick={handleNo}
                  className="flex-1 max-w-[180px] py-3.5 rounded-full border-2 font-semibold text-[15px] transition-all duration-300 hover:bg-white/60"
                  style={{ borderColor: `${current.accent}40`, color: current.accent }}
                >
                  {isRTL ? 'ليسَ تمامًا' : 'Not quite'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step dots */}
      <div className="flex justify-center gap-2 mt-6">
        {scenarios.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === step
                ? 'bg-[#7A3B5E] w-6'
                : i < step
                  ? selected.includes(i) ? 'bg-[#C8A97D]' : 'bg-[#D4D0CC]'
                  : 'bg-[#E8E4E0]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const aboutRef = useRef<HTMLDivElement>(null);
  const { serviceCategories } = useServices();

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  SECTION 1: HERO                                                */}
      {/* ================================================================ */}
      <section className="relative min-h-[80vh] lg:min-h-[75vh] bg-[#FAF7F2] overflow-hidden -mt-16 pt-16">
        {/* Editorial image — soft fade via CSS mask */}
        <div
          className={`absolute inset-y-0 ${isRTL ? 'left-0' : 'right-0'} w-full lg:w-[55%] 2xl:w-[60%] ${isRTL ? 'hero-mask-rtl' : 'hero-mask-ltr'}`}
          style={{ backgroundColor: '#E8D5D0' }}
        >
          <Image
            src="/images/hala-hero-desktop.jpg"
            alt="Dr. Hala Ali - Mama Hala"
            fill
            priority
            quality={90}
            sizes="(min-width: 1536px) 60vw, (min-width: 1024px) 55vw, 100vw"
            className="object-cover object-top"
          />
        </div>

        {/* Mobile text readability gradient — positioned lower so the photo shows through more */}
        <div className="absolute inset-x-0 bottom-0 top-[45%] z-[5] bg-gradient-to-t from-[#FDF8F4] via-[#FDF8F4]/75 to-transparent lg:hidden" />

        {/* Content layer */}
        <div className="container-main relative z-10 flex flex-col justify-end lg:justify-center min-h-[80vh] lg:min-h-[75vh] pb-6 lg:pb-6 lg:pt-8">
          <div className={`max-w-xl ${isRTL ? 'lg:mr-0 lg:ml-auto text-right' : 'lg:ml-0 lg:mr-auto'}`}>
            {/* Mobile: label as a pill that stays readable over the image */}
            <span
              className={`sm:hidden inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-white/85 backdrop-blur-sm text-[11px] font-semibold tracking-[0.15em] uppercase text-[#9A7340] border border-white/60 ${isRTL ? 'self-end' : 'self-start'}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97D]" />
              {messages.hero.badge}
            </span>
            {/* Desktop: label + gold accent line (original design) */}
            <span
              className={`hidden sm:block text-sm font-semibold tracking-[0.2em] uppercase text-[#9A7340] mb-4 ${isRTL ? 'text-right w-full pt-2' : ''}`}
              style={{ textShadow: '0 1px 8px rgba(255,255,255,0.8)' }}
            >
              {messages.hero.badge}
            </span>

            {/* Gold editorial accent line — desktop only */}
            <div className={`hidden sm:block w-12 h-[2px] bg-[#C8A97D] mb-6 ${isRTL ? 'ml-auto' : ''}`} />

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-4 ${isRTL ? 'text-right w-full' : ''}`}
              style={{
                fontFamily: isRTL ? 'var(--font-arabic)' : 'var(--font-fraunces), Georgia, serif',
                fontWeight: isRTL ? 700 : 600,
                textShadow: '0 1px 12px rgba(253,248,244,0.6)',
              }}
            >
              <span className="block text-[#2D2A33]">
                {isRTL ? <>لحياةٍ مُفعَمةٍ</> : <>For a Life Full of</>}
              </span>
              {/* Kinetic color on desktop only — static plum on mobile for performance */}
              <motion.span
                animate={{ color: ['#7A3B5E', '#C4878A', '#7A3B5E'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden lg:block italic mt-1"
              >
                {isRTL ? <>بالحبِّ والسّكينةِ والسّلام.</> : <>Love, Tranquility {'\u0026'} Peace.</>}
              </motion.span>
              <span className="block lg:hidden italic mt-1 text-[#7A3B5E]">
                {isRTL ? <>بالحبِّ والسّكينةِ والسّلام.</> : <>Love, Tranquility {'\u0026'} Peace.</>}
              </span>
            </h1>

            <p
              className={`text-base lg:text-lg text-[#3A3848] max-w-md leading-relaxed mb-6 ${isRTL ? 'text-right ml-auto' : ''}`}
              style={{ textShadow: '0 1px 8px rgba(253,248,244,0.5)' }}
            >
              <span className="hidden sm:inline">{messages.hero.subtitle}</span>
              <span className="sm:hidden">
                {isRTL ? 'استشاراتٌ مهنيّةٌ للأفرادِ والأُسَرِ والأزواج.' : 'Professional counseling for individuals, families & couples.'}
              </span>
            </p>

            <div className="flex flex-wrap gap-3 w-full">
              <Button
                as="a"
                href={`/${locale}/services`}
                size="lg"
                icon={isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                className="!px-10 !py-4 !text-base"
              >
                {isRTL ? 'ابدأْ رحلتَك' : 'Start your journey'}
              </Button>
            </div>
          </div>
        </div>

        {/* Trust bar — inside the fixed hero, fades with it */}
        <div className="relative z-20 bg-[#FAF7F2]">
          {(() => {
            const trustItems = [
              {
                icon: GraduationCap,
                value: isRTL ? 'ييل' : 'Yale',
                label: isRTL ? 'دكتوراه مهنيّة' : 'Professional Doctorate',
                desc: isRTL ? 'صحّةُ الطّفلِ والأسرة' : 'Child & Family Health',
                color: '#7A3B5E',
              },
              {
                icon: Heart,
                value: isRTL ? 'مُعتمَدة' : 'Certified',
                label: isRTL ? 'مُستشارةٌ أُسَريّة' : 'Family Counselor',
                desc: isRTL ? 'علاجٌ سلوكيٌّ معرفيٌّ وتدريبٌ تنفيذيّ' : 'CBT specialist & executive coach',
                color: '#C4878A',
              },
              {
                icon: MessageCircle,
                value: isRTL ? 'ثنائيُّ اللّغة' : 'Bilingual',
                label: isRTL ? 'عربي / English' : 'English / عربي',
                desc: isRTL ? 'دعمٌ حسّاسٌ ثقافيًّا' : 'Culturally sensitive support',
                color: '#C8A97D',
              },
              {
                icon: Calendar,
                value: isRTL ? 'عبر الإنترنت' : 'Online',
                label: isRTL ? 'وحضوري' : '& In-Person',
                desc: isRTL ? 'جلساتٌ مَرِنةٌ عالميًّا' : 'Flexible sessions worldwide',
                color: '#7A3B5E',
              },
            ];
            return (
              <>
                {/* Mobile: elegant single-line trust whisper */}
                <div className="lg:hidden py-5 text-center">
                  <p className="text-[11px] tracking-[0.08em] text-[#8E8E9F] leading-relaxed">
                    {isRTL
                      ? 'ييل · مُعتمَدة · ثنائيّةُ اللّغة · عبر الإنترنت وحضوريًّا'
                      : 'Yale · Certified · Bilingual · Online & In-Person'}
                  </p>
                </div>

                {/* Desktop: full grid */}
                <div className="hidden lg:block container-main py-4">
                  <div className="grid grid-cols-4 gap-4">
                    {trustItems.map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <div key={i} className="group flex flex-col items-center text-center">
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${stat.color}12` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: stat.color }} />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                              {stat.value}
                            </div>
                            <div className="text-sm font-medium text-[#4A4A5C]">{stat.label}</div>
                            <div className="text-xs text-[#8E8E9F] mt-0.5">{stat.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* Spacer between hero and slides */}
      <div className="h-16 lg:h-24 bg-[#FAF7F2]" />

      {/* ================================================================ */}
      {/*  EMPATHY SLIDESHOW — "You might be here because..."              */}
      {/* ================================================================ */}
      <EmpathySlideshow locale={locale} isRTL={isRTL} />

      {/* ================================================================ */}
      {/*  SERVICE SHOWCASE                                                */}
      {/* ================================================================ */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="container-main">
          <ScrollReveal className="mb-16 text-center">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {isRTL ? 'من ندعم' : 'Who We Support'}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A33] leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.services.subtitle}
            </h2>
          </ScrollReveal>

          {(() => {
            const cards = [
              {
                key: 'youth',
                icon: Sprout,
                gradient: 'from-[#EAC8BD] via-[#F2D8CE] to-[#F8ECE6]',
                accentColor: '#C4878A',
                decorCircle: 'bg-[#C4878A]/10',
                patternOpacity: '0.04',
              },
              {
                key: 'families',
                icon: Users,
                gradient: 'from-[#DFC8D8] via-[#EBD5E3] to-[#F5E8F0]',
                accentColor: '#7A3B5E',
                decorCircle: 'bg-[#7A3B5E]/10',
                patternOpacity: '0.03',
              },
              {
                key: 'adults',
                icon: User,
                gradient: 'from-[#E0D5C0] via-[#ECE2D2] to-[#F6F0E6]',
                accentColor: '#C8A97D',
                decorCircle: 'bg-[#C8A97D]/10',
                patternOpacity: '0.04',
              },
              {
                key: 'couples',
                icon: Heart,
                gradient: 'from-[#E2BAB5] via-[#EED0CB] to-[#F8E8E4]',
                accentColor: '#C4878A',
                decorCircle: 'bg-[#C4878A]/10',
                patternOpacity: '0.03',
              },
            ];
            return (
              <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                {cards.map((card) => {
                  const cat = serviceCategories.find((c) => c.key === card.key);
                  if (!cat) return null;
                  const name = isRTL ? cat.nameAr : cat.name;
                  const subtitle = isRTL ? cat.subtitleAr : cat.subtitle;
                  const Icon = card.icon;

                  return (
                    <StaggerChild key={card.key}>
                      <Link href={`/${locale}/services/${card.key}`}>
                        <motion.div
                          className={`group relative rounded-3xl overflow-hidden bg-gradient-to-br ${card.gradient} p-8 md:p-10 min-h-[260px] flex flex-col justify-between cursor-pointer`}
                          whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Decorative elements */}
                          <div className={`absolute top-0 ${isRTL ? 'left-0 -translate-x-1/4' : 'right-0 translate-x-1/4'} w-40 h-40 rounded-full bg-white/20 hidden lg:block blur-3xl -translate-y-1/2`} />
                          <div className={`absolute bottom-0 ${isRTL ? 'right-0 translate-x-1/4' : 'left-0 -translate-x-1/4'} w-32 h-32 rounded-full ${card.decorCircle} hidden lg:block blur-2xl translate-y-1/3`} />
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 0.5px, transparent 0)',
                              backgroundSize: '30px 30px',
                              opacity: card.patternOpacity,
                              color: card.accentColor,
                            }}
                          />

                          {/* Large background icon */}
                          <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500`}>
                            <Icon className="w-32 h-32" style={{ color: card.accentColor }} />
                          </div>

                          {/* Content */}
                          <div className="relative z-10">
                            <div
                              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                              style={{ backgroundColor: `${card.accentColor}15` }}
                            >
                              <Icon className="w-7 h-7" style={{ color: card.accentColor }} />
                            </div>
                            <h3
                              className="text-xl md:text-2xl font-bold text-[#2D2A33] mb-2 group-hover:text-[#7A3B5E] transition-colors"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              {name}
                            </h3>
                            <p className="text-sm text-[#4A4A5C] leading-relaxed max-w-xs">{subtitle}</p>
                          </div>

                          {/* Bottom arrow */}
                          <div className="relative z-10 flex items-center gap-2 mt-6 text-[#7A3B5E] text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                            {messages.services.learnMore}
                            <ArrowIcon className="w-4 h-4" />
                          </div>
                        </motion.div>
                      </Link>
                    </StaggerChild>
                  );
                })}
              </StaggerReveal>
            );
          })()}


          {/* Help Me Choose CTA */}
          <ScrollReveal className="mt-12 text-center" delay={0.2}>
            <Link
              href={`/${locale}/quiz`}
              className="inline-flex items-center justify-center w-full max-w-2xl px-8 py-4 rounded-full border-2 border-[#7A3B5E] text-[#7A3B5E] font-semibold hover:bg-[#7A3B5E] hover:text-white transition-all duration-300 text-[15px] gap-2"
            >
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              {isRTL ? 'ساعِدْني في اختيارِ الدّعمِ المُناسب' : 'Help Me Choose The Right Support'}
            </Link>
          </ScrollReveal>
        </div>
      </section>


      {/* ================================================================ */}
      {/*  PROCESS STEPS                                                   */}
      {/* ================================================================ */}
      <section className="py-28 lg:py-36 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center mb-16">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {messages.method.sectionTitle}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A33] text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.method.subtitle}
            </h2>
          </ScrollReveal>

          {/* Desktop: Grid */}
          <StaggerReveal className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {messages.method.steps.map(
              (step: { title: string; description: string }, index: number) => (
                <StaggerChild key={index}>
                  <MethodStepCard step={step} index={index} isRTL={isRTL} />
                </StaggerChild>
              )
            )}
          </StaggerReveal>

          {/* Mobile: Swipeable */}
          <MobileSwipeRow itemCount={messages.method.steps.length}>
            {messages.method.steps.map(
              (step: { title: string; description: string }, index: number) => (
                <div key={index} className="snap-center shrink-0 w-[80vw] max-w-[280px]">
                  <MethodStepCard step={step} index={index} isRTL={isRTL} />
                </div>
              )
            )}
          </MobileSwipeRow>
        </div>
      </section>


      {/* ================================================================ */}
      {/*  TESTIMONIALS                                                    */}
      {/* ================================================================ */}
      <TestimonialsSection locale={locale} isRTL={isRTL} messages={messages} />



      {/* ================================================================ */}
      {/*  BLOG PREVIEW                                                    */}
      {/* ================================================================ */}
      <BlogPreviewSection locale={locale} isRTL={isRTL} messages={messages} />


      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={<>You Don't Have to Figure It Out <span className="text-[#7A3B5E] italic">Alone</span></>}
        headingAr={<>لا يجبُ أن تواجهَ الأمرَ <span className="text-[#7A3B5E] italic">وحدَك</span></>}
      />
    </div>
  );
}

/* ================================================================ */
/*  TESTIMONIALS — CLEAN & CALM                                      */
/* ================================================================ */
function TestimonialsSection({
  locale,
  isRTL,
  messages,
}: {
  locale: string;
  isRTL: boolean;
  messages: ReturnType<typeof getMessages>;
}) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { testimonials } = useTestimonials();
  const total = testimonials.length;

  const next = useCallback(() => setActive((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setActive((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  // Mobile: pause on touch, resume after 4s of no interaction
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleTouch = useCallback(() => {
    setIsPaused(true);
    if (touchTimer.current) clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setIsPaused(false), 4000);
  }, []);

  // Mobile swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    handleTouch();
  }, [handleTouch]);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if ((diff > 0 && !isRTL) || (diff < 0 && isRTL)) next();
      else prev();
    }
  }, [next, prev, isRTL]);

  const t = testimonials[active];

  const catLinks: Record<string, { en: string; ar: string; href: string }> = {
    families: { en: 'Families', ar: 'الأُسَر', href: `/${locale}/services/families` },
    youth: { en: 'Youth', ar: 'الناشئة', href: `/${locale}/services/youth` },
    adults: { en: 'Adults', ar: 'البالغون', href: `/${locale}/services/adults` },
    couples: { en: 'Couples', ar: 'الأزواج', href: `/${locale}/services/couples` },
    experiential: { en: 'Experiential', ar: 'تجريبيّ', href: `/${locale}/services/experiential` },
  };

  const cat = catLinks[t.category];

  return (
    <section className="py-28 lg:py-36 bg-white">
      <div className="container-main">
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
            {isRTL ? 'شَهادات' : 'Testimonials'}
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2A33]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {messages.testimonials.sectionTitle}
          </h2>
        </ScrollReveal>

        {/* Quote Card — warm, inviting, premium */}
        <div className="max-w-3xl mx-auto relative">
          {/* Warm glow behind card */}
          <div className="absolute -inset-4 rounded-[2rem] bg-[#C8A97D]/[0.06] hidden lg:block" />

          <div
            className="relative bg-[#FAF7F2] rounded-2xl overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top gold accent line */}
            <div className="h-[3px] bg-gradient-to-r from-transparent via-[#C8A97D]/40 to-transparent" />


            {/* Content area */}
            <div className="relative z-10 px-10 sm:px-14 lg:px-20 pt-16 pb-8 h-[380px] sm:h-[340px] lg:h-[300px] text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 px-10 sm:px-14 lg:px-20 pt-16 pb-8 flex flex-col justify-center"
                >
                  {/* Star rating */}
                  <div className="flex justify-center gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} className="fill-[#C8A97D] text-[#C8A97D]" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-base sm:text-lg lg:text-xl leading-[1.85] text-[#2D2A33] italic max-w-2xl mx-auto" style={{ fontFamily: 'Georgia, var(--font-heading), serif' }}>
                    &ldquo;{isRTL ? t.textAr : t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-6 flex flex-col items-center gap-1">
                    <span className="font-semibold text-[#2D2A33] text-sm">{t.name}</span>
                    <Link
                      href={cat?.href || '#'}
                      className="inline-flex items-center gap-1 text-xs text-[#C8A97D] hover:text-[#7A3B5E] transition-colors font-medium mt-1"
                    >
                      {isRTL ? cat?.ar : cat?.en}
                      {isRTL ? <ArrowLeft size={10} /> : <ArrowRight size={10} />}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation — elegant bottom bar */}
            <div className="relative z-10 flex items-center justify-center gap-6 pb-8">
              <button
                onClick={prev}
                aria-label="Previous"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#C8A97D]/50 hover:text-[#7A3B5E] transition-colors duration-200"
              >
                {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`rounded-full transition-all duration-500 ${
                      i === active ? 'bg-[#C8A97D] w-7 h-2' : 'bg-[#C8A97D]/15 hover:bg-[#C8A97D]/30 w-2 h-2'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#C8A97D]/50 hover:text-[#7A3B5E] transition-colors duration-200"
              >
                {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ */
/*  BLOG PREVIEW — Desktop grid + Mobile swipeable carousel          */
/* ================================================================ */
function BlogPreviewSection({
  locale,
  isRTL,
  messages,
}: {
  locale: string;
  isRTL: boolean;
  messages: ReturnType<typeof getMessages>;
}) {
  const { posts: allBlogPosts, getCategoryLabel } = useBlog();
  // Show only featured posts on homepage; fall back to latest 3 if none are featured
  const featuredPosts = allBlogPosts.filter((p: any) => p.featured);
  const posts = featuredPosts.length > 0 ? featuredPosts.slice(0, 3) : allBlogPosts.slice(0, 3);
  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Track scroll position for dot indicator
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / posts.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveDot(Math.min(idx, posts.length - 1));
  }, [posts.length]);

  return (
    <section className="py-28 lg:py-36 bg-[#FAF7F2]">
      <div className="container-main">
        <ScrollReveal className="flex items-end justify-between mb-12">
          <div>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {messages.resources.blog}
            </span>
            <h2
              className="text-3xl sm:text-4xl text-[#2D2A33]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'أحدثُ المقالات' : 'Latest Insights'}
            </h2>
            <p className="text-sm text-[#8E8E9F] mt-2">
              {isRTL ? 'حكمةٌ عمليّةٌ للحظاتِ التي تهمُّ أكثر' : 'Practical wisdom for the moments that matter most'}
            </p>
          </div>
          <Link
            href={`/${locale}/resources/blog`}
            className="hidden md:flex items-center gap-1.5 text-[#7A3B5E] font-semibold text-sm hover:gap-2.5 transition-all"
          >
            {isRTL ? 'تابِعْ القراءة' : 'Keep Reading'}
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        {/* Desktop: Grid */}
        <StaggerReveal key={`blog-${posts.length}-${posts[0]?.slug || ''}`} className="hidden md:grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <StaggerChild key={post.slug}>
              <BlogCard post={post} locale={locale} isRTL={isRTL} />
            </StaggerChild>
          ))}
        </StaggerReveal>

        {/* Mobile: Swipeable horizontal scroll */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {posts.map((post) => (
              <div key={post.slug} className="snap-center shrink-0 w-[85vw] max-w-[320px]">
                <BlogCard post={post} locale={locale} isRTL={isRTL} />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  const cardWidth = el.scrollWidth / posts.length;
                  el.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === activeDot ? 'bg-[#7A3B5E] w-6 h-2' : 'bg-[#D4ADA8]/30 w-2 h-2'
                }`}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href={`/${locale}/resources/blog`} className="text-[#7A3B5E] font-semibold text-sm">
              {isRTL ? 'تابِعْ القراءة →' : 'Keep Reading →'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Shared blog card used by both desktop grid and mobile carousel */
function BlogCard({ post, locale, isRTL }: { post: any; locale: string; isRTL: boolean }) {
  return (
    <Link href={`/${locale}/resources/blog/${post.slug}`}>
      <div className="group bg-white rounded-2xl overflow-hidden border border-[#F3EFE8] hover:shadow-[var(--shadow-card)] transition-all duration-300 h-full">
        <div className="relative h-48 bg-gradient-to-br from-[#C4878A]/10 to-[#7A3B5E]/10 flex items-center justify-center overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={isRTL ? post.titleAr : post.titleEn}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <BookOpen className="w-10 h-10 text-[#7A3B5E]/30" />
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#C4878A]/10 text-[#7A3B5E]">
              {getCategoryLabel(post.category, isRTL)}
            </span>
            <span className="text-xs text-[#8E8E9F]">{post.readTime} {isRTL ? 'دقيقة' : 'min read'}</span>
          </div>
          <h3 className="font-bold text-[#2D2A33] group-hover:text-[#7A3B5E] transition-colors leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
            {isRTL ? post.titleAr : post.titleEn}
          </h3>
        </div>
      </div>
    </Link>
  );
}

/* ================================================================ */
/*  REUSABLE: Mobile Swipe Row with Dots                             */
/* ================================================================ */
function MobileSwipeRow({ children, itemCount }: { children: React.ReactNode; itemCount: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / itemCount;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveDot(Math.min(idx, itemCount - 1));
  }, [itemCount]);

  return (
    <div className="sm:hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {children}
      </div>
      <div className="flex items-center justify-center gap-2 mt-5">
        {Array.from({ length: itemCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const cardWidth = el.scrollWidth / itemCount;
              el.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
            }}
            className={`rounded-full transition-all duration-300 ${
              i === activeDot ? 'bg-[#7A3B5E] w-6 h-2' : 'bg-[#D4ADA8]/30 w-2 h-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ================================================================ */
/*  METHOD STEP CARD (extracted for desktop grid + mobile swipe)     */
/* ================================================================ */
function MethodStepCard({ step, index, isRTL }: { step: { title: string; description: string }; index: number; isRTL: boolean }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl h-full cursor-default"
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="relative bg-white border border-[#C8A97D]/15 group-hover:border-[#C8A97D]/40 rounded-2xl p-8 lg:p-10 h-full transition-all duration-500 group-hover:shadow-[var(--shadow-elevated)] text-center flex flex-col items-center">
        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#C8A97D]/40 mb-5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3
          className={`text-2xl lg:text-[26px] font-bold mb-5 relative ${isRTL ? '' : 'tracking-wide uppercase'}`}
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span
            className="relative z-10"
            style={isRTL ? {
              color: '#C9A24E',
              textShadow: '0 0 15px rgba(212,168,83,0.5), 0 0 30px rgba(212,168,83,0.2)',
            } : {
              background: 'linear-gradient(135deg, #D4A853 0%, #E8C668 25%, #B8935A 50%, #D4A853 75%, #E8C668 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {step.title}
          </span>
        </h3>
        <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-[#C8A97D] to-transparent mb-5 group-hover:w-16 transition-all duration-500 rounded-full" />
        <p className="text-sm text-[#6B6580] leading-relaxed group-hover:text-[#4A4A5C] transition-colors duration-500">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
