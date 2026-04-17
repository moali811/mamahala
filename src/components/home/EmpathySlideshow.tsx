'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Slide {
  image: string;
  textEn: string;
  textAr: string;
  isCTA?: boolean;
  objectPosition?: string; // CSS object-position for panoramic images
}

const slides: Slide[] = [
  {
    image: '/images/slideshow/slide-1.jpg',
    textEn: 'You might be here because...',
    textAr: 'ربّما أنتَ هنا لأنّ...',
  },
  {
    image: '/images/slideshow/slide-2.jpg',
    textEn: "Your child's emotions feel\nbigger than their words",
    textAr: 'مشاعرُ طفلِك\nأكبرُ من كلماتِه',
    objectPosition: '70% center',
  },
  {
    image: '/images/slideshow/slide-3.jpg',
    textEn: 'Parenting feels exhausting\nor confusing lately',
    textAr: 'التربيةُ باتت مُرهِقةً\nأو مُحيّرةً مؤخّرًا',
  },
  {
    image: '/images/slideshow/slide-4.jpg',
    textEn: 'Your teen feels distant,\nangry, or overwhelmed',
    textAr: 'مراهقُكَ يبدو بعيدًا\nأو غاضبًا أو مُثقَلًا',
  },
  {
    image: '/images/slideshow/slide-5.jpg',
    textEn: "You're navigating change,\nloss, or uncertainty",
    textAr: 'تُبحِرُ وسطَ التغييرِ\nأو الفقدانِ أو الغموض',
  },
  {
    image: '/images/slideshow/slide-6.jpg',
    textEn: "You're searching for peace\nwithin the chaos",
    textAr: 'تبحثُ عن السّكينةِ\nوسطَ العاصفة',
  },
  {
    image: '/images/slideshow/slide-7.jpg',
    textEn: "If any of this resonates—\nyou're in the right place",
    textAr: 'إن كانَ أيٌّ من هذا يُشبهُك—\nفأنتَ في المكانِ الصّحيح',
    isCTA: true,
  },
];

const SLIDE_DURATION = 5500;
const FADE_DURATION = 1500;

// Ken Burns directions for each slide
const kenBurns = [
  'scale-[1.15] translate-x-[2%]',      // 1: slow zoom + drift right
  'scale-[1.12] -translate-y-[3%]',     // 2: zoom + drift up
  'scale-[1.1] translate-x-[-2%]',      // 3: zoom + drift left
  'scale-[1.15] translate-y-[2%]',      // 4: zoom + drift down
  'scale-[1.12] translate-x-[3%]',      // 5: zoom + drift right
  'scale-[1.1] -translate-x-[2%]',      // 6: zoom + drift left
  'scale-[1.08]',                         // 7: gentle zoom center
];

export default function EmpathySlideshow({
  locale,
  isRTL,
}: {
  locale: string;
  isRTL: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [isActive, setIsActive] = useState<boolean[]>(new Array(slides.length).fill(false));
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  // Sticky flag: stays false until the section scrolls into view for the
  // first time, then flips to true and never flips back. Before this is
  // true, the slideshow stays frozen on slide 1 so users who land at
  // the top of the page don't see frames advance below the fold.
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Watch for the section scrolling into view. `rootMargin: -10%` means
  // we wait until ~10% of the section is actually inside the viewport
  // before triggering, so an intersection with just the top edge peeking
  // in doesn't count. Once triggered, we unobserve — this is one-shot.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Fallback for environments without IntersectionObserver: start
    // immediately so we don't permanently freeze the slideshow.
    if (typeof IntersectionObserver === 'undefined') {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasEnteredView(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        // Fire when at least 15% of the section is visible — enough that
        // the user is clearly looking at it, not just scrolling past a
        // sliver at the top.
        threshold: 0.15,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Activate Ken Burns for current slide — gated on hasEnteredView so
  // the first frame's subtle zoom doesn't burn its animation budget
  // while the user is still reading the hero above.
  useEffect(() => {
    if (!hasEnteredView) return;
    const newActive = new Array(slides.length).fill(false);
    newActive[current] = true;
    // Small delay to trigger CSS transition
    const t = setTimeout(() => setIsActive(newActive), 50);
    return () => clearTimeout(t);
  }, [current, hasEnteredView]);

  // Auto-advance
  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused || !hasEnteredView) return;
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next, isPaused, hasEnteredView]);

  // Progress bar
  useEffect(() => {
    if (isPaused || !hasEnteredView) return;
    setProgress(0);
    const step = 50; // ms
    const increment = (step / SLIDE_DURATION) * 100;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + increment, 100));
    }, step);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, isPaused, hasEnteredView]);

  const goTo = (i: number) => {
    setCurrent(i);
    setProgress(0);
  };

  const slide = slides[current];
  const text = isRTL ? slide.textAr : slide.textEn;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[75vh] overflow-hidden bg-[#1a1a1a]"
    >
      {/* Image layers with Ken Burns */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity ease-in-out ${
            i === current ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
          }`}
          style={{ transitionDuration: `${FADE_DURATION}ms` }}
        >
          <div
            className={`absolute inset-0 transition-transform duration-[6000ms] ease-out ${
              isActive[i] ? kenBurns[i] : 'scale-100'
            }`}
          >
            <Image
              src={s.image}
              alt={s.textEn}
              fill
              className="object-cover"
              style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined}
              sizes="100vw"
              priority={i < 2}
              quality={80}
            />
          </div>
          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
      ))}

      {/* Text content */}
      <div className="absolute inset-0 z-[2] flex items-end">
        <div className="container-main w-full pb-16 sm:pb-20 md:pb-24">
          {/* Main text */}
          <div
            key={current}
            className={`animate-slideUp ${isRTL ? 'text-right ml-auto' : 'text-left'}`}
          >
            {text.split('\n').map((line, li) => (
              <p
                key={li}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white leading-[1.2] tracking-tight"
                style={{
                  fontFamily: 'var(--font-heading)',
                  animationDelay: `${li * 150}ms`,
                  textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                }}
              >
                {line}
              </p>
            ))}

            {/* CTA on last slide */}
            {slide.isCTA && (
              <div
                className={`mt-6 sm:mt-8 animate-fadeInUp`}
                style={{ animationDelay: '600ms', animationFillMode: 'both' }}
              >
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#2D2A33] text-sm sm:text-base font-semibold rounded-full hover:bg-white/90 transition-colors shadow-lg"
                >
                  {isRTL ? 'ابدأ رحلتَك' : 'Get Support'}
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thin progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-[3]">
        <div
          className="h-full bg-white/60 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide counter - minimal */}
      <div className={`absolute bottom-6 z-[3] flex items-center gap-3 ${isRTL ? 'left-6 md:left-8' : 'right-6 md:right-8'}`}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 ${
              i === current
                ? 'w-8 h-[2px] bg-white'
                : 'w-3 h-[2px] bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Top & bottom edge blends */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#FAF7F2] to-transparent z-[2] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-[2] pointer-events-none" />

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out both;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
}
