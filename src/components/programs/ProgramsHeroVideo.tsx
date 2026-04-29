'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// ─── Scene data — original Programs page narrative ─────────────────────────
// Arc: Opening → 4 program transformation moments → free entry → trust → CTA
const SLIDES = [
  {
    image: '/images/blog/parent-hug.jpg',
    en:  { eye: 'Mama Hala Academy', hl: '4 programs built to\nchange what\'s possible.', sub: 'Science-backed. Written by Dr. Hala. Taught in English and Arabic.' },
    ar:  { eye: 'أكاديمية ماما هالة', hl: '4 برامج مصمَّمة\nلتغيير ما هو ممكن.', sub: 'مدعومة علمياً. كتبتها د. هلى. تُدرَّس بالعربية والإنجليزية.' },
    objectPosition: 'center 30%',
    kenBurns: { scale: 1.1, tx: 0, ty: -2 },
  },
  {
    image: '/images/blog/family-park.jpg',
    en: { eye: 'The Intentional Parent · Families', hl: 'Pause before you react.\nRepair within 24 hours.', sub: '15 modules · Attachment Theory · Emotional Coaching', tag: true },
    ar: { eye: 'الوالد المتعمِّد · العائلات', hl: 'توقَّف قبل أن تتفاعل.\nأصلِح خلال 24 ساعة.', sub: '15 وحدة · نظرية التعلق · التدريب العاطفي', tag: true },
    objectPosition: 'center center',
    kenBurns: { scale: 1.12, tx: 2, ty: 0 },
  },
  {
    image: '/images/services/teen-session.jpg',
    en: { eye: 'Raising Resilient Teens · Youth', hl: 'Read what\'s behind\nthe door slam.', sub: '12 modules · Neuroscience · CBT', tag: true },
    ar: { eye: 'تربية مراهقين متكيِّفين · الشباب', hl: 'افهَم ما وراء\nإغلاق الباب بعنف.', sub: '12 وحدة · علم الأعصاب · CBT', tag: true },
    objectPosition: 'center 25%',
    kenBurns: { scale: 1.1, tx: -2, ty: 0 },
  },
  {
    image: '/images/blog/couple-walking.jpg',
    en: { eye: 'Stronger Together · Couples', hl: 'Catch the bid for connection\nbefore it fades.', sub: '12 modules · Gottman Method · EFT', tag: true },
    ar: { eye: 'معاً أقوى · الأزواج', hl: 'التقط طلب التواصل\nقبل أن يختفي.', sub: '12 وحدة · منهج غوتمان · EFT', tag: true },
    objectPosition: 'center center',
    kenBurns: { scale: 1.1, tx: 1, ty: -1 },
  },
  {
    image: '/images/blog/woman-journaling.jpg',
    en: { eye: 'Inner Compass · Adults', hl: 'Name anxiety before\nit runs the day.', sub: '12 modules · CBT · ACT · Mindfulness', tag: true },
    ar: { eye: 'البوصلة الداخلية · البالغون', hl: 'سمِّ القلق قبل\nأن يسيطر على يومك.', sub: '12 وحدة · CBT · ACT · الوعي الذهني', tag: true },
    objectPosition: 'center 20%',
    kenBurns: { scale: 1.09, tx: -1, ty: -2 },
  },
  {
    image: '/images/blog/sunrise-hope.jpg',
    en: { eye: 'No risk, ever', hl: 'Level 1 is free.\nAlways. On every program.', sub: 'Start free. Pay per level only when you\'re ready. No subscriptions.' },
    ar: { eye: 'بلا مخاطرة، أبداً', hl: 'المستوى الأول مجاني.\nدائماً. في كل برنامج.', sub: 'ابدأ مجاناً. ادفع للمستوى التالي فقط حين تكون مستعداً. لا اشتراكات.' },
    objectPosition: 'center 40%',
    kenBurns: { scale: 1.08, tx: 0, ty: 1 },
  },
  {
    image: '/images/hala-working.jpg',
    en: { eye: 'One clinician. Every word.', hl: 'Dr. Hala wrote every module.\nWhere does your growth begin?', sub: 'Yale Doctorate · UofT M.A. · CBT Specialist · 8+ years · 10000+ families', isCTA: true },
    ar: { eye: 'طبيبة واحدة. كل كلمة.', hl: 'د. هلى كتبت كل وحدة.\nمن أين يبدأ نموّك؟', sub: 'دكتوراه من جامعة يايل · ماجستير UofT · متخصصة CBT · 8+ سنوات · 10000+ عائلة', isCTA: true },
    objectPosition: 'center 15%',
    kenBurns: { scale: 1.07, tx: 0, ty: 0 },
  },
] as const;

const SLIDE_DURATION = 6500;
const FADE_MS = 1100;

const PROGRAM_COLORS: Record<number, string> = {
  1: '#7A3B5E',
  2: '#3B8A6E',
  3: '#C8A97D',
  4: '#5B7FA6',
};

export default function ProgramsHeroVideo({ locale }: { locale: string }) {
  const isRTL = locale === 'ar';
  const total = SLIDES.length;
  const [cur, setCur] = useState(0);
  const [active, setActive] = useState<boolean[]>(SLIDES.map((_, i) => i === 0));
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setActive(SLIDES.map((_, i) => i === cur)), 60);
    return () => clearTimeout(t);
  }, [cur]);

  const goTo = useCallback((i: number) => { setCur(i); setProgress(0); }, []);
  const next = useCallback(() => goTo((cur + 1) % total), [cur, goTo, total]);
  const prev = useCallback(() => goTo((cur - 1 + total) % total), [cur, goTo, total]);

  useEffect(() => {
    if (paused || !inView) { if (slideRef.current) clearInterval(slideRef.current); return; }
    slideRef.current = setInterval(next, SLIDE_DURATION);
    return () => { if (slideRef.current) clearInterval(slideRef.current); };
  }, [next, paused, inView]);

  useEffect(() => {
    if (paused || !inView) { if (progRef.current) clearInterval(progRef.current); return; }
    setProgress(0);
    const step = 40;
    progRef.current = setInterval(() => setProgress(p => Math.min(p + (step / SLIDE_DURATION) * 100, 100)), step);
    return () => { if (progRef.current) clearInterval(progRef.current); };
  }, [cur, paused, inView]);

  const slide = SLIDES[cur];
  const d = isRTL ? slide.ar : slide.en;
  const lines = d.hl.split('\n');
  const isProgram = 'tag' in d && d.tag;
  const isCTA = 'isCTA' in d && d.isCTA;
  const accent = PROGRAM_COLORS[cur] ?? null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: 'min(78vh, 700px)', minHeight: '440px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={isRTL ? 'نظرة عامة على برامج الأكاديمية' : 'Academy programs overview'}
    >
      {SLIDES.map((s, i) => {
        const kb = s.kenBurns;
        return (
          <div key={i} className="absolute inset-0" style={{ zIndex: i === cur ? 1 : 0, opacity: i === cur ? 1 : 0, transition: `opacity ${FADE_MS}ms ease-in-out` }}>
            <div style={{ position: 'absolute', inset: 0, transform: active[i] ? `scale(${kb.scale}) translate(${kb.tx}%, ${kb.ty}%)` : 'scale(1) translate(0,0)', transition: active[i] ? `transform ${SLIDE_DURATION + FADE_MS}ms ease-out` : 'none' }}>
              <Image src={s.image} alt={s.en.eye} fill className="object-cover" style={{ objectPosition: s.objectPosition }} sizes="100vw" priority={i < 2} quality={90} />
            </div>
            <div className="absolute inset-0" style={{ background: isCTA ? 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.20) 100%)' : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.10) 100%)' }} />
            {PROGRAM_COLORS[i] && <div className="absolute inset-0" style={{ background: `${PROGRAM_COLORS[i]}18`, mixBlendMode: 'multiply' }} />}
          </div>
        );
      })}

      <div className="absolute inset-0 z-10 flex items-end" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="w-full" style={{ padding: 'clamp(24px,4%,56px) clamp(20px,6%,72px)', paddingBottom: 'clamp(52px,7%,80px)', maxWidth: isRTL ? 'none' : '880px' }}>
          <div key={`eye-${cur}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px', animation: 'mhSlide 0.55s ease-out both' }}>
            {isProgram && accent && <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: accent, flexShrink: 0 }} />}
            <span style={{ fontSize: 'clamp(10px, 1.2vw, 13px)', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: isProgram && accent ? accent : 'rgba(255,255,255,0.65)' }}>{d.eye}</span>
          </div>
          <div key={`hl-${cur}`}>
            {lines.map((line, li) => (
              <p key={li} style={{ fontFamily: 'var(--font-heading, "Georgia", serif)', fontSize: 'clamp(30px, 5vw, 66px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0, textShadow: '0 2px 28px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)', animation: `mhSlide 0.65s ease-out ${80 + li * 110}ms both` }}>{line}</p>
            ))}
          </div>
          <p key={`sub-${cur}`} style={{ fontSize: 'clamp(12px, 1.4vw, 15px)', fontWeight: 400, color: 'rgba(255,255,255,0.68)', marginTop: 'clamp(8px,1.2vw,14px)', letterSpacing: '0.02em', animation: 'mhFade 0.7s ease-out 380ms both', lineHeight: 1.55 }}>{d.sub}</p>
          {isCTA && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'clamp(16px, 2vw, 24px)', animation: 'mhFade 0.7s ease-out 500ms both', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              <button onClick={() => void scrollToElement('all-programs')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '40px', background: '#ffffff', color: '#2D2A33', fontWeight: 700, fontSize: 'clamp(13px, 1.4vw, 15px)', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.25)', transition: 'all 0.2s' }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}>
                {isRTL ? 'استعرض البرامج' : 'Explore programs'}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={() => void scrollToElement('[data-quiz]')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '40px', background: 'rgba(255,255,255,0.12)', color: '#ffffff', fontWeight: 500, fontSize: 'clamp(13px, 1.4vw, 15px)', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}>
                {isRTL ? 'ساعدني أختار' : 'Help me choose'}
              </button>
            </div>
          )}
        </div>
      </div>

      <button onClick={isRTL ? next : prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition-all hover:bg-black/45 hover:scale-110" aria-label={isRTL ? 'التالي' : 'Previous'}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 14L6 9l5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button onClick={isRTL ? prev : next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition-all hover:bg-black/45 hover:scale-110" aria-label={isRTL ? 'السابق' : 'Next'}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      <div className="absolute top-5 z-20 font-mono text-white/30 select-none" style={{ [isRTL ? 'left' : 'right']: '20px', fontSize: '11px', letterSpacing: '0.1em' }}>
        {String(cur + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      <div className="absolute bottom-5 z-20 flex items-center gap-2" style={{ [isRTL ? 'left' : 'right']: '20px' }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ height: '2px', width: i === cur ? '32px' : '12px', background: i === cur ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.28)', border: 'none', borderRadius: '2px', cursor: 'pointer', padding: 0, transition: 'all 0.35s ease' }} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
        <div className="h-full bg-white/55" style={{ width: `${progress}%`, transition: 'none' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none" style={{ height: '56px', background: 'linear-gradient(to bottom, #FAF7F2, transparent)' }} />

      <style>{`
        @keyframes mhSlide { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes mhFade { from { opacity:0; } to { opacity:1; } }
      `}</style>
    </section>
  );
}
