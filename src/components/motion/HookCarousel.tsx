'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface HookSlide {
  headline: string;
  headlineAr: string;
  highlight: string;
  highlightAr: string;
  subtitle: string;
  subtitleAr: string;
  icon: string;
  accentColor: string;
}

const slides: HookSlide[] = [
  {
    headline: "Your child's emotions feel",
    headlineAr: "مشاعر طفلك",
    highlight: "bigger than their words",
    highlightAr: "أكبر من كلماته",
    subtitle: "We're here to help you understand and support their emotional world",
    subtitleAr: "نحن هنا لمساعدتك على فهم ودعم عالمهم العاطفي",
    icon: '🧒',
    accentColor: '#C4878A',
  },
  {
    headline: "Your teen feels",
    headlineAr: "ابنك المراهق يشعر بأنه",
    highlight: "distant, angry, or overwhelmed",
    highlightAr: "بعيد أو غاضب أو مرهق",
    subtitle: "We help bridge the gap with empathy and evidence-based strategies",
    subtitleAr: "نساعد في سد الفجوة بالتعاطف والاستراتيجيات المبنية على الأدلة",
    icon: '🧑‍🎓',
    accentColor: '#7A3B5E',
  },
  {
    headline: "Parenting feels",
    headlineAr: "الأبوة والأمومة تبدو",
    highlight: "harder than it should",
    highlightAr: "أصعب مما ينبغي",
    subtitle: "You're not alone — we provide tools and support to make it more manageable",
    subtitleAr: "لست وحدك — نوفر الأدوات والدعم لجعلها أكثر قابلية للإدارة",
    icon: '👨‍👩‍👧',
    accentColor: '#C8A97D',
  },
  {
    headline: "Your relationship needs",
    headlineAr: "علاقتكما تحتاج",
    highlight: "more than hope",
    highlightAr: "أكثر من مجرد أمل",
    subtitle: "Professional guidance to rebuild trust, communication, and connection",
    subtitleAr: "إرشاد مهني لإعادة بناء الثقة والتواصل والترابط",
    icon: '💑',
    accentColor: '#C4878A',
  },
  {
    headline: "You're seeking",
    headlineAr: "تبحث عن",
    highlight: "balance, clarity, or growth",
    highlightAr: "التوازن أو الوضوح أو النمو",
    subtitle: "We support you in finding your path to emotional wellbeing",
    subtitleAr: "ندعمك في إيجاد طريقك نحو الرفاهية العاطفية",
    icon: '🧘',
    accentColor: '#7A3B5E',
  },
  {
    headline: "You're navigating",
    headlineAr: "تمر بمرحلة من",
    highlight: "change, loss, or uncertainty",
    highlightAr: "التغيير أو الفقدان أو عدم اليقين",
    subtitle: "Together, we'll build resilience and find meaning in transition",
    subtitleAr: "معاً سنبني المرونة ونجد المعنى في التحول",
    icon: '🌅',
    accentColor: '#C8A97D',
  },
  {
    headline: "If any of this resonates —",
    headlineAr: "إذا كان أي من هذا يتردد صداه —",
    highlight: "you're in the right place",
    highlightAr: "فأنت في المكان الصحيح",
    subtitle: "Take the first step today",
    subtitleAr: "اتخذ الخطوة الأولى اليوم",
    icon: '✨',
    accentColor: '#7A3B5E',
  },
];

interface Props {
  locale: string;
  isRTL: boolean;
}

export default function HookCarousel({ locale, isRTL }: Props) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const DURATION = 6000; // 6 seconds per slide

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setProgress(0);
  }, []);

  // Progress bar + auto-advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          next();
          return 0;
        }
        return prev + (100 / (DURATION / 50));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F9EDE8] to-[#FAF7F2]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-12 right-[15%] w-32 h-32 rounded-full"
          style={{ backgroundColor: `${slide.accentColor}08` }}
          animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-16 left-[10%] w-24 h-24 rounded-full"
          style={{ backgroundColor: `${slide.accentColor}06` }}
          animate={{ y: [0, 12, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-[5%] w-16 h-16 rounded-full"
          style={{ backgroundColor: `${slide.accentColor}05` }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[20%] right-[8%] w-20 h-20 rounded-2xl rotate-12"
          style={{ backgroundColor: `${slide.accentColor}04` }}
          animate={{ rotate: [12, 20, 12], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main content */}
      <div className="container-main relative z-10 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Icon */}
              <div className="text-5xl mb-8">
                {slide.icon}
              </div>

              {/* Headline */}
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] leading-[1.15] tracking-tight text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? slide.headlineAr : slide.headline}{' '}
                <span
                  className="italic font-bold"
                  style={{ color: slide.accentColor }}
                >
                  {isRTL ? slide.highlightAr : slide.highlight}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="mt-6 text-lg text-[#6B6580] max-w-2xl mx-auto leading-relaxed">
                {isRTL ? slide.subtitleAr : slide.subtitle}
              </p>

              {/* CTA on last slide */}
              {isLast && (
                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href={`/${locale}/book-a-session`}
                    className="inline-flex items-center gap-2 bg-[#7A3B5E] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#5E2D48] transition-all shadow-lg shadow-[#7A3B5E]/20 hover:shadow-xl hover:shadow-[#7A3B5E]/30"
                  >
                    {isRTL ? 'ابدأ رحلتك' : 'Start Your Journey'}
                    {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation: progress bars */}
        <div className="flex items-center justify-center gap-1.5 mt-14">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === current ? '48px' : '20px' }}
              aria-label={isRTL ? `شريحة ${i + 1}` : `Slide ${i + 1}`}
            >
              {/* Background track */}
              <div
                className="absolute inset-0 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: i === current ? `${slides[current].accentColor}25` : '#2D2A3315',
                }}
              />
              {/* Progress fill */}
              {i === current && (
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: slides[current].accentColor,
                  }}
                />
              )}
              {/* Completed indicator */}
              {i < current && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: `${slides[i].accentColor}40` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
