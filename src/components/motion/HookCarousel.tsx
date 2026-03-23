'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HookSlide {
  headline: string;
  headlineAr: string;
  subtitle: string;
  subtitleAr: string;
  gradient: string;
  accentOrb1: string;
  accentOrb2: string;
  icon: string;
}

const slides: HookSlide[] = [
  {
    headline: "Your child's emotions feel bigger than their words",
    headlineAr: "مشاعر طفلك أكبر من كلماته",
    subtitle: "We're here to help you understand and support their emotional world",
    subtitleAr: "نحن هنا لمساعدتك على فهم ودعم عالمهم العاطفي",
    gradient: 'from-[#2D2A33] via-[#3D2A33] to-[#4A2A3A]',
    accentOrb1: 'bg-[#C4878A]/20',
    accentOrb2: 'bg-[#F0D5CA]/10',
    icon: '🧒',
  },
  {
    headline: "Your teen feels distant, angry, or overwhelmed",
    headlineAr: "ابنك المراهق يبدو بعيداً أو غاضباً أو مرهقاً",
    subtitle: "We help bridge the gap with empathy and evidence-based strategies",
    subtitleAr: "نساعد في سد الفجوة بالتعاطف والاستراتيجيات المبنية على الأدلة",
    gradient: 'from-[#3D2A33] via-[#2D2A33] to-[#2A2D3D]',
    accentOrb1: 'bg-[#7A3B5E]/20',
    accentOrb2: 'bg-[#C8A97D]/10',
    icon: '🧑‍🎓',
  },
  {
    headline: "Parenting feels harder than it should",
    headlineAr: "الأبوة والأمومة أصعب مما ينبغي",
    subtitle: "You're not alone — we provide tools and support to make it more manageable",
    subtitleAr: "لست وحدك — نوفر الأدوات والدعم لجعلها أكثر قابلية للإدارة",
    gradient: 'from-[#2A2D3D] via-[#2D2A33] to-[#3A2A30]',
    accentOrb1: 'bg-[#C8A97D]/15',
    accentOrb2: 'bg-[#C4878A]/10',
    icon: '👨‍👩‍👧',
  },
  {
    headline: "Your relationship needs more than hope",
    headlineAr: "علاقتكما تحتاج أكثر من مجرد أمل",
    subtitle: "Professional guidance to rebuild trust, communication, and connection",
    subtitleAr: "إرشاد مهني لإعادة بناء الثقة والتواصل والتواصل",
    gradient: 'from-[#3A2A30] via-[#2D2A33] to-[#2D333A]',
    accentOrb1: 'bg-[#C4878A]/20',
    accentOrb2: 'bg-[#7A3B5E]/10',
    icon: '💑',
  },
  {
    headline: "You're seeking balance, clarity, or growth",
    headlineAr: "تبحث عن التوازن أو الوضوح أو النمو",
    subtitle: "We support you in finding your path to emotional wellbeing",
    subtitleAr: "ندعمك في إيجاد طريقك نحو الرفاهية العاطفية",
    gradient: 'from-[#2D333A] via-[#2D2A33] to-[#332A2D]',
    accentOrb1: 'bg-[#F0D5CA]/15',
    accentOrb2: 'bg-[#C8A97D]/10',
    icon: '🧘',
  },
  {
    headline: "You're navigating change, loss, or uncertainty",
    headlineAr: "تمر بتغيير أو فقدان أو عدم يقين",
    subtitle: "Together, we'll build resilience and find meaning in transition",
    subtitleAr: "معاً سنبني المرونة ونجد المعنى في التحول",
    gradient: 'from-[#332A2D] via-[#2D2A33] to-[#2D2A38]',
    accentOrb1: 'bg-[#7A3B5E]/15',
    accentOrb2: 'bg-[#F0D5CA]/10',
    icon: '🌅',
  },
  {
    headline: "If any of this resonates — you're in the right place",
    headlineAr: "إذا كان أي من هذا يتردد صداه — فأنت في المكان الصحيح",
    subtitle: "Take the first step today",
    subtitleAr: "اتخذ الخطوة الأولى اليوم",
    gradient: 'from-[#2D2A38] via-[#3D2A33] to-[#2D2A33]',
    accentOrb1: 'bg-[#C8A97D]/20',
    accentOrb2: 'bg-[#C4878A]/15',
    icon: '✨',
  },
];

interface Props {
  locale: string;
  isRTL: boolean;
}

export default function HookCarousel({ locale, isRTL }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: 0.98,
    }),
  };

  return (
    <section className="relative overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`relative bg-gradient-to-br ${slide.gradient} min-h-[450px] lg:min-h-[520px] flex items-center justify-center`}
        >
          {/* Decorative orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full ${slide.accentOrb1} blur-[120px]`} />
            <div className={`absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full ${slide.accentOrb2} blur-[100px]`} />
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }} />
          </div>

          {/* Content */}
          <div className="container-main relative z-10 py-20 lg:py-24 text-center max-w-4xl mx-auto px-6">
            {/* Icon */}
            <motion.div
              className="text-4xl mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {slide.icon}
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.15] tracking-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {isRTL ? slide.headlineAr : slide.headline}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="mt-5 text-lg text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {isRTL ? slide.subtitleAr : slide.subtitle}
            </motion.p>

            {/* CTA for last slide */}
            {current === slides.length - 1 && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <a
                  href={`/${locale}/book-a-session`}
                  className="inline-flex items-center gap-2 bg-white text-[#7A3B5E] font-semibold px-8 py-4 rounded-full hover:bg-[#FAF7F2] transition-colors shadow-lg"
                >
                  {isRTL ? 'ابدأ رحلتك' : 'Start Your Journey'}
                  {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-4">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className="group relative p-1"
              aria-label={`Slide ${i + 1}`}
            >
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/30 group-hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Arrow buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide counter */}
      <div className="absolute top-6 right-6 z-20 text-white/30 text-sm font-mono">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  );
}
