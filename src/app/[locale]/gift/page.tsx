'use client';

import { useParams } from 'next/navigation';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift, Heart, Send, ChevronDown, Check, CheckCircle2,
  ArrowRight, ArrowLeft, Calendar,
  Sparkles, Users, User, Leaf, GraduationCap, Loader2,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { serviceCategories, getServicesByCategory } from '@/data/services';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';

const catIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Users, User, Heart, Leaf, GraduationCap,
};

const occasions = [
  { value: 'birthday', en: 'Birthday', ar: 'عيد ميلاد' },
  { value: 'support', en: 'Support During Hard Times', ar: 'دعمٌ في الأوقاتِ الصّعبة' },
  { value: 'just-because', en: 'Just Because I Care', ar: 'لأنّي أهتمّ' },
  { value: 'wedding', en: 'Wedding / Engagement', ar: 'زفاف / خطوبة' },
  { value: 'new-parent', en: 'New Parent', ar: 'أبوّة / أمومة جديدة' },
  { value: 'self-care', en: 'Encouraging Self-Care', ar: 'تشجيعٌ على الرّعايةِ الذّاتيّة' },
  { value: 'other', en: 'Other', ar: 'أخرى' },
];

const INPUT_CLS = 'w-full px-4 py-3.5 rounded-xl bg-white border border-[#F3EFE8] text-sm text-[#2D2A33] placeholder:text-[#C4C0BC] focus:outline-none focus:border-[#C8A97D] focus:ring-2 focus:ring-[#C8A97D]/10 transition-all';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 'success';

const GIFT_AMOUNTS = [
  { value: 100, labelEn: '$100', labelAr: '100$', descEn: 'Initial consultation', descAr: 'استشارة أوّليّة' },
  { value: 200, labelEn: '$200', labelAr: '200$', descEn: 'Standard session', descAr: 'جلسة قياسيّة' },
  { value: 300, labelEn: '$300', labelAr: '300$', descEn: 'Extended session', descAr: 'جلسة مُمتدّة' },
  { value: 400, labelEn: '$400', labelAr: '400$', descEn: 'Premium package', descAr: 'باقة مميّزة' },
];

export default function GiftPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const FwdArrow = isRTL ? ArrowLeft : ArrowRight;

  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wizardRef = useRef<HTMLDivElement | null>(null);

  // Form state
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [occasion, setOccasion] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [giftAmount, setGiftAmount] = useState<number | null>(null);
  const [gifterName, setGifterName] = useState('');
  const [gifterEmail, setGifterEmail] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const goNext = () => {
    setDirection(1);
    setStep((s) => (typeof s === 'number' ? ((s + 1) as Step) : s));
    scrollToWizard();
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => (typeof s === 'number' && s > 1 ? ((s - 1) as Step) : s));
    scrollToWizard();
  };
  const scrollToWizard = () => {
    setTimeout(() => wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  // Resolve display names
  const catInfo = selectedCategory && selectedCategory !== 'surprise'
    ? serviceCategories.find((c) => c.key === selectedCategory)
    : null;
  const serviceInfo = selectedService
    ? getServicesByCategory(catInfo?.key as Parameters<typeof getServicesByCategory>[0]).find((s) => s.slug === selectedService)
    : null;

  const displayServiceName = serviceInfo
    ? (isRTL ? serviceInfo.nameAr : serviceInfo.name)
    : selectedCategory === 'surprise'
      ? (isRTL ? 'اختيارُ ماما هالة' : "Mama Hala's Choice")
      : catInfo
        ? (isRTL ? `جلسة ${catInfo.nameAr}` : `${catInfo.name} Session`)
        : '';

  const occasionLabel = occasions.find((o) => o.value === occasion);

  // Send gift email via API
  const sendGift = async (alsoBook: boolean) => {
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/gift/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gifterName,
          gifterEmail,
          recipientName,
          recipientEmail,
          category: selectedCategory,
          serviceSlug: selectedService || null,
          occasion: occasionLabel?.en || '',
          occasionAr: occasionLabel?.ar || '',
          message: personalMessage || '',
          amount: giftAmount,
          locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send');
      }

      if (alsoBook) {
        const slug = selectedService || serviceInfo?.slug || 'initial-consultation';
        window.open(`https://cal.com/mamahala/${slug}`, '_blank');
      }

      setStep('success');
      scrollToWizard();
    } catch (err) {
      setError(isRTL ? 'حدثَ خطأ. يرجى المحاولة مرّةً أخرى.' : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  // Step validation
  const canProceed: Record<number, boolean> = {
    1: recipientName.trim().length > 0 && recipientEmail.includes('@'),
    2: selectedCategory !== null,
    3: giftAmount !== null,
    4: occasion.length > 0,
    5: gifterName.trim().length > 0 && gifterEmail.includes('@'),
    6: true,
  };

  // Animation variants
  const slideVariants = {
    enter: (d: number) => ({ x: d * (isRTL ? -80 : 80), opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * (isRTL ? 80 : -80), opacity: 0 }),
  };

  const stepTitles: Record<number, { en: string; ar: string }> = {
    1: { en: 'Who is this gift for?', ar: 'لِمَنْ هذه الهديّة؟' },
    2: { en: 'Choose the type of support', ar: 'اختَرْ نوعَ الدّعم' },
    3: { en: 'Choose gift card value', ar: 'اختَرْ قيمةَ البطاقة' },
    4: { en: 'Add your personal touch', ar: 'أضِفْ لمستَكَ الشّخصيّة' },
    5: { en: 'Your details', ar: 'معلوماتُك' },
    6: { en: 'Review your gift', ar: 'راجِعْ هديّتَك' },
  };

  const faqs = [
    {
      qEn: 'How will the recipient receive their gift?',
      qAr: 'كيفَ سيتلقّى المُستلِمُ هديّتَه؟',
      aEn: 'They will receive a beautiful branded email with a personalized gift card, your message, and a link to schedule their session.',
      aAr: 'سيتلقّى بريدًا إلكترونيًّا يحتوي على بطاقةِ هديّةٍ مُصمَّمة بأناقة، ورسالتِك الشّخصيّة، ورابطٍ لحجزِ جلستِه.',
    },
    {
      qEn: 'Can I choose the session date?',
      qAr: 'هل يمكنُني اختيارُ تاريخِ الجلسة؟',
      aEn: 'The recipient will choose their own session time for maximum flexibility. You can also book a specific time on their behalf.',
      aAr: 'سيختارُ المُستلِمُ وقتَ جلستِه بنفسِه لأقصى مرونة. يمكنُكَ أيضًا حجزُ وقتٍ مُحدَّدٍ نيابةً عنه.',
    },
    {
      qEn: "What if the gift session isn't used?",
      qAr: 'ماذا لو لم تُستخدَمِ الجلسةُ المُهداة؟',
      aEn: "Gift sessions are valid for 6 months. If unused, we'll work with you to find an alternative — no gift goes to waste.",
      aAr: 'الجلساتُ المُهداةُ صالحةٌ لمدّة 6 أشهر. إن لم تُستخدَم، سنعملُ معك لإيجادِ بديل — لن تذهبَ أيّ هديّةٍ سُدى.',
    },
  ];

  return (
    <div className="bg-[#FAF7F2]">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F0E0D8] via-[#F5E8E0] to-[#FAF0EC]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[15%] w-80 h-80 rounded-full bg-[#C4878A]/6 blur-[100px]" />
          <div className="absolute bottom-10 right-[10%] w-96 h-96 rounded-full bg-[#C8A97D]/8 blur-[100px]" />
        </div>
        <div className="container-main relative pt-24 pb-32 md:pt-28 md:pb-36 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb locale={locale} items={[{ label: messages.nav.home, href: `/${locale}` }, { label: isRTL ? 'أهدِ جلسة' : 'Gift a Session' }]} />
          </motion.div>
          <motion.div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center mx-auto mt-8 mb-6 shadow-lg shadow-[#C4878A]/10" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <Gift className="w-10 h-10 text-[#7A3B5E]" />
          </motion.div>
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            {isRTL ? <>أهدِ هديّةَ <span className="text-[#7A3B5E] italic">الاحتواء</span></> : <>Give the Gift of <span className="text-[#7A3B5E] italic">Being Heard</span></>}
          </motion.h1>
          <motion.p className="text-lg text-[#4A4A5C] max-w-xl mx-auto mt-5 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            {isRTL ? 'أجملُ الهدايا هي التي تُلامسُ الرّوح. امنَحْ مَنْ تحبُّ فرصةً للشّعورِ بالأمانِ والفَهْمِ والدّعم.' : 'The most meaningful gifts touch the soul. Give someone you love the chance to feel safe, understood, and supported.'}
          </motion.p>
          <motion.div className="w-24 h-1 bg-[#C8A97D] mx-auto mt-6 rounded-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.6 }} />
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20">
        <div className="container-main max-w-4xl">
          <ScrollReveal className="text-center mb-14">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">{isRTL ? 'كيفَ تعمَل' : 'How It Works'}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'ثلاثُ خطواتٍ بسيطة' : 'Three Simple Steps'}</h2>
          </ScrollReveal>
          <StaggerReveal className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', tEn: 'Choose', tAr: 'اختَرْ', dEn: 'Pick a service category or let Mama Hala recommend the perfect fit.', dAr: 'اختَرْ فئةَ الخدمة أو دَعْ ماما هالة توصي بالأنسب.' },
              { step: '02', tEn: 'Personalize', tAr: 'خصِّصْ', dEn: 'Add a heartfelt message and tell us about the lucky recipient.', dAr: 'أضِفْ رسالةً من القلب وأخبِرْنا عن المُستلِمِ المحظوظ.' },
              { step: '03', tEn: 'They Receive It', tAr: 'يتلقّونَها', dEn: 'A beautiful digital gift card lands in their inbox with a link to schedule.', dAr: 'بطاقةُ هديّةٍ رقميّةٍ أنيقة تصلُ إلى بريدِهم مع رابطِ الحجز.' },
            ].map((item, i) => (
              <StaggerChild key={i}>
                <div className="text-center">
                  <div className="relative inline-block mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F0D5CA] to-[#E8C4C0] flex items-center justify-center shadow-sm">
                      {i === 0 && <Sparkles className="w-7 h-7 text-[#7A3B5E]" />}
                      {i === 1 && <Heart className="w-7 h-7 text-[#7A3B5E]" />}
                      {i === 2 && <Send className="w-7 h-7 text-[#7A3B5E]" />}
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#7A3B5E] text-white text-xs font-bold flex items-center justify-center">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? item.tAr : item.tEn}</h3>
                  <p className="text-sm text-[#6B6580] leading-relaxed">{isRTL ? item.dAr : item.dEn}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <div className="h-8 bg-gradient-to-b from-[#FAF7F2] to-white" />

      {/* ═══════════════════════════════════════════════════════════════
         6-STEP GIFT WIZARD
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" ref={wizardRef}>
        <div className="container-main max-w-2xl">

          {/* Progress bar */}
          {typeof step === 'number' && (
            <div className="flex items-center justify-center gap-2 mb-12">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500 ${
                    s < step ? 'bg-[#7A3B5E] text-white' : s === step ? 'bg-[#7A3B5E] text-white ring-4 ring-[#7A3B5E]/15' : 'bg-[#F3EFE8] text-[#C4C0BC]'
                  }`}>
                    {s < step ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 6 && <div className={`w-4 sm:w-8 h-0.5 rounded-full transition-colors duration-500 ${s < step ? 'bg-[#7A3B5E]' : 'bg-[#F3EFE8]'}`} />}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            {/* ── STEP 1: Recipient ── */}
            {step === 1 && (
              <motion.div key="step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#C4878A]/10 flex items-center justify-center mx-auto mb-3"><Heart className="w-6 h-6 text-[#7A3B5E]" /></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? stepTitles[1].ar : stepTitles[1].en}</h2>
                </div>
                <div className="bg-[#FAF7F2] rounded-2xl p-6 lg:p-8 border border-[#F3EFE8] space-y-4">
                  <input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder={isRTL ? 'اسمُ المُستلِم *' : "Recipient's Name *"} className={INPUT_CLS} />
                  <input type="email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder={isRTL ? 'بريدُ المُستلِم الإلكترونيّ *' : "Recipient's Email *"} className={INPUT_CLS} />
                  <p className="text-xs text-[#8E8E9F] text-center">{isRTL ? 'سنرسلُ بطاقةَ الهديّة إلى هذا البريد.' : "We'll send the gift card to this email."}</p>
                </div>
                <div className="flex justify-center mt-8">
                  <Button size="lg" icon={<FwdArrow className="w-5 h-5" />} iconPosition="right" disabled={!canProceed[1]} onClick={goNext}>
                    {isRTL ? 'التالي' : 'Next'}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Category ── */}
            {step === 2 && (
              <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#C8A97D]/10 flex items-center justify-center mx-auto mb-3"><Sparkles className="w-6 h-6 text-[#C8A97D]" /></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? stepTitles[2].ar : stepTitles[2].en}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    ...serviceCategories.map((cat) => ({ key: cat.key, nEn: cat.name, nAr: cat.nameAr, sEn: cat.subtitle, sAr: cat.subtitleAr, icon: cat.icon })),
                    { key: 'surprise', nEn: 'Surprise Me', nAr: 'فاجِئْني', sEn: 'Let Mama Hala decide', sAr: 'دَعْ ماما هالة تختار', icon: 'Sparkles' },
                  ].map((opt) => {
                    const isSel = selectedCategory === opt.key;
                    const Icon = catIcons[opt.icon] || Gift;
                    return (
                      <motion.button key={opt.key} type="button" onClick={() => { setSelectedCategory(opt.key); setSelectedService(null); }} whileTap={{ scale: 0.97 }}
                        className={`relative rounded-2xl p-5 text-center border-2 transition-all duration-300 ${isSel ? 'border-[#7A3B5E] bg-[#7A3B5E]/5 shadow-md' : 'border-[#F3EFE8] bg-[#FAF7F2] hover:border-[#C8A97D]/40'}`}>
                        {isSel && <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#7A3B5E] flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${isSel ? 'text-[#7A3B5E]' : 'text-[#C8A97D]'}`} />
                        <p className={`text-sm font-semibold ${isSel ? 'text-[#7A3B5E]' : 'text-[#2D2A33]'}`}>{isRTL ? opt.nAr : opt.nEn}</p>
                        <p className="text-[10px] text-[#8E8E9F] mt-0.5">{isRTL ? opt.sAr : opt.sEn}</p>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Optional: specific service within category */}
                {selectedCategory && selectedCategory !== 'surprise' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 overflow-hidden">
                    <p className="text-xs text-[#8E8E9F] mb-3 text-center">{isRTL ? 'اختياريّ: اختَرْ خدمةً مُحدَّدة' : 'Optional: choose a specific service'}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {getServicesByCategory(selectedCategory as Parameters<typeof getServicesByCategory>[0]).map((svc) => (
                        <button key={svc.slug} type="button" onClick={() => setSelectedService(selectedService === svc.slug ? null : svc.slug)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedService === svc.slug ? 'bg-[#7A3B5E] text-white border-[#7A3B5E]' : 'bg-white text-[#6B6580] border-[#F3EFE8] hover:border-[#C8A97D]'}`}>
                          {isRTL ? svc.nameAr : svc.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-between mt-8">
                  <Button variant="ghost" icon={<BackArrow className="w-5 h-5" />} onClick={goBack}>{isRTL ? 'السابق' : 'Back'}</Button>
                  <Button size="lg" icon={<FwdArrow className="w-5 h-5" />} iconPosition="right" disabled={!canProceed[2]} onClick={goNext}>{isRTL ? 'التالي' : 'Next'}</Button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Gift Amount ── */}
            {step === 3 && (
              <motion.div key="step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#C8A97D]/10 flex items-center justify-center mx-auto mb-3"><Gift className="w-6 h-6 text-[#C8A97D]" /></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'اختَرْ قيمةَ البطاقة' : 'Choose Gift Card Value'}</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {GIFT_AMOUNTS.map((amt) => (
                    <motion.button
                      key={amt.value}
                      type="button"
                      onClick={() => { setGiftAmount(amt.value); setTimeout(goNext, 300); }}
                      className={`relative rounded-2xl p-6 text-center border-2 transition-all duration-300 ${
                        giftAmount === amt.value
                          ? 'border-[#C8A97D] bg-[#C8A97D]/5 shadow-md'
                          : 'border-[#F3EFE8] bg-[#FAF7F2] hover:border-[#C8A97D]/40'
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      {giftAmount === amt.value && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#C8A97D] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <p
                        className="text-2xl font-bold mb-1"
                        style={{
                          color: '#C9A24E',
                          textShadow: '0 0 10px rgba(212,168,83,0.3)',
                        }}
                      >
                        {isRTL ? amt.labelAr : amt.labelEn}
                      </p>
                      <p className="text-xs text-[#8E8E9F]">{isRTL ? amt.descAr : amt.descEn}</p>
                    </motion.button>
                  ))}
                </div>
                <p className="text-xs text-[#8E8E9F] text-center mt-4">
                  {isRTL ? 'القيمةُ بالدولارِ الكنديّ (CAD). تُستبدَلُ عند حجزِ جلسةٍ عبر Cal.com.' : 'Values in Canadian Dollars (CAD). Redeemable when booking a session via Cal.com.'}
                </p>
                <div className="flex justify-between mt-8">
                  <Button variant="ghost" icon={<BackArrow className="w-5 h-5" />} onClick={goBack}>{isRTL ? 'السابق' : 'Back'}</Button>
                  <Button size="lg" icon={<FwdArrow className="w-5 h-5" />} iconPosition="right" disabled={!canProceed[3]} onClick={goNext}>{isRTL ? 'التالي' : 'Next'}</Button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: Personal Touch ── */}
            {step === 4 && (
              <motion.div key="step4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#7A3B5E]/10 flex items-center justify-center mx-auto mb-3"><Send className="w-6 h-6 text-[#7A3B5E]" /></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? stepTitles[4].ar : stepTitles[4].en}</h2>
                </div>
                <div className="bg-[#FAF7F2] rounded-2xl p-6 lg:p-8 border border-[#F3EFE8] space-y-5">
                  <div className="relative">
                    <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className={`${INPUT_CLS} appearance-none`}>
                      <option value="">{isRTL ? 'المُناسَبة *' : 'Occasion *'}</option>
                      {occasions.map((o) => <option key={o.value} value={o.value}>{isRTL ? o.ar : o.en}</option>)}
                    </select>
                    <ChevronDown className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F] pointer-events-none ${isRTL ? 'left-4' : 'right-4'}`} />
                  </div>
                  <div className="relative">
                    <textarea value={personalMessage} onChange={(e) => setPersonalMessage(e.target.value.slice(0, 500))} rows={4} placeholder={isRTL ? 'رسالتُك الشّخصيّة (اختياريّة) — ستظهرُ في بطاقةِ الهديّة' : 'Your personal message (optional) — will appear in the gift card'} className={`${INPUT_CLS} resize-none`} />
                    <span className={`absolute bottom-3 text-[10px] text-[#C4C0BC] ${isRTL ? 'left-4' : 'right-4'}`}>{personalMessage.length}/500</span>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="ghost" icon={<BackArrow className="w-5 h-5" />} onClick={goBack}>{isRTL ? 'السابق' : 'Back'}</Button>
                  <Button size="lg" icon={<FwdArrow className="w-5 h-5" />} iconPosition="right" disabled={!canProceed[4]} onClick={goNext}>{isRTL ? 'التالي' : 'Next'}</Button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 5: Gifter Details ── */}
            {step === 5 && (
              <motion.div key="step5" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#7A3B5E]/10 flex items-center justify-center mx-auto mb-3"><User className="w-6 h-6 text-[#7A3B5E]" /></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? stepTitles[5].ar : stepTitles[5].en}</h2>
                </div>
                <div className="bg-[#FAF7F2] rounded-2xl p-6 lg:p-8 border border-[#F3EFE8] space-y-4">
                  <input value={gifterName} onChange={(e) => setGifterName(e.target.value)} placeholder={isRTL ? 'اسمُك *' : 'Your Name *'} className={INPUT_CLS} />
                  <input type="email" value={gifterEmail} onChange={(e) => setGifterEmail(e.target.value)} placeholder={isRTL ? 'بريدُك الإلكترونيّ *' : 'Your Email *'} className={INPUT_CLS} />
                  <p className="text-xs text-[#8E8E9F] text-center">{isRTL ? 'بريدُك يُستخدَمُ فقط لتأكيدِ إرسالِ الهديّة.' : 'Your email is only used to confirm the gift was sent.'}</p>
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="ghost" icon={<BackArrow className="w-5 h-5" />} onClick={goBack}>{isRTL ? 'السابق' : 'Back'}</Button>
                  <Button size="lg" icon={<FwdArrow className="w-5 h-5" />} iconPosition="right" disabled={!canProceed[5]} onClick={goNext}>{isRTL ? 'مراجعة' : 'Review'}</Button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 6: Review ── */}
            {step === 6 && (
              <motion.div key="step6" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#C4878A]/10 flex items-center justify-center mx-auto mb-3"><Gift className="w-6 h-6 text-[#7A3B5E]" /></div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? stepTitles[6].ar : stepTitles[6].en}</h2>
                </div>

                {/* Gift card preview */}
                <div className="rounded-2xl overflow-hidden border border-[#E8D8D0]/50 shadow-lg mb-8">
                  <div className="bg-gradient-to-br from-[#F0E0D8] via-[#F5E8E0] to-[#FAF0EC] p-8 sm:p-12 text-center">
                    <p className="text-xs font-semibold tracking-[3px] uppercase text-[#C8A97D] mb-2">{isRTL ? 'هديّةٌ لك' : 'A Gift For You'}</p>
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#2D2A33] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{recipientName}</h3>
                    <div className="w-10 h-0.5 bg-[#C8A97D] mx-auto mb-4" />
                    <p className="text-[#6B6580] text-sm">{isRTL ? 'مِن' : 'From'} <strong className="text-[#2D2A33]">{gifterName}</strong></p>
                    {occasionLabel && (
                      <span className="inline-block mt-3 px-4 py-1.5 bg-[#C8A97D]/15 rounded-full text-xs font-semibold text-[#C8A97D]">
                        {isRTL ? occasionLabel.ar : occasionLabel.en}
                      </span>
                    )}
                    {personalMessage && (
                      <div className={`mt-6 bg-white/50 rounded-xl p-5 ${isRTL ? 'text-right border-r-[3px]' : 'text-left border-l-[3px]'} border-[#C8A97D]`}>
                        <p className="text-xs text-[#C8A97D] uppercase tracking-wider font-semibold mb-2">{isRTL ? 'رسالةٌ شخصيّة' : 'Personal Message'}</p>
                        <p className="text-[#2D2A33] text-sm italic leading-relaxed">&ldquo;{personalMessage}&rdquo;</p>
                      </div>
                    )}
                  </div>
                  <div className="bg-white p-6 border-t border-[#F3EFE8] space-y-2">
                    {giftAmount && (
                      <div className={`flex justify-between items-center text-sm`}>
                        <span className="text-[#8E8E9F]">{isRTL ? 'قيمةُ البطاقة' : 'Gift Card Value'}</span>
                        <span className="font-bold text-[#C9A24E]">CAD ${giftAmount}</span>
                      </div>
                    )}
                    <div className={`flex justify-between items-center text-sm`}>
                      <span className="text-[#8E8E9F]">{isRTL ? 'الخدمة' : 'Service'}</span>
                      <span className="font-semibold text-[#2D2A33]">{displayServiceName}</span>
                    </div>
                    {serviceInfo && (
                      <div className={`flex justify-between items-center text-sm`}>
                        <span className="text-[#8E8E9F]">{isRTL ? 'المدّة' : 'Duration'}</span>
                        <span className="font-semibold text-[#2D2A33]">{serviceInfo.duration}</span>
                      </div>
                    )}
                    <div className={`flex justify-between items-center text-sm`}>
                      <span className="text-[#8E8E9F]">{isRTL ? 'يُرسَلُ إلى' : 'Sending to'}</span>
                      <span className="font-semibold text-[#2D2A33]">{recipientEmail}</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-6 text-center">{error}</div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" icon={sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />} disabled={sending} onClick={() => sendGift(false)} className="min-w-[220px]">
                    {isRTL ? 'أرسِلْ بطاقةَ الهديّة' : 'Send Gift Card'}
                  </Button>
                  <Button size="lg" variant="outline" icon={<Calendar className="w-5 h-5" />} disabled={sending} onClick={() => sendGift(true)} className="min-w-[220px]">
                    {isRTL ? 'احجِزْ وادفَعْ الآن' : 'Book & Pay Now'}
                  </Button>
                </div>
                <p className="text-xs text-[#8E8E9F] text-center mt-4">
                  {isRTL
                    ? '"أرسِلْ بطاقة الهديّة" يُرسلُ البطاقةَ بالبريد فورًا. "احجِزْ وادفَعْ" يفتحُ التقويمَ لحجزِ جلسةٍ نيابةً عن المُستلِم.'
                    : '"Send Gift Card" emails the card instantly. "Book & Pay" opens the calendar to book a session on their behalf.'}
                </p>

                <div className="flex justify-center mt-6">
                  <Button variant="ghost" icon={<BackArrow className="w-5 h-5" />} onClick={goBack}>{isRTL ? 'السابق' : 'Back'}</Button>
                </div>
              </motion.div>
            )}

            {/* ── SUCCESS ── */}
            {step === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-center py-12">
                <motion.div className="w-20 h-20 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
                  <CheckCircle2 className="w-10 h-10 text-[#25D366]" />
                </motion.div>
                <h2 className="text-3xl font-bold text-[#2D2A33] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  {isRTL ? 'هديّتُك في الطّريق!' : 'Your Gift is On Its Way!'}
                </h2>
                <p className="text-[#6B6580] max-w-md mx-auto mb-8 leading-relaxed">
                  {isRTL
                    ? `أرسلنا بطاقةَ هديّةٍ جميلة إلى ${recipientName}. سيتلقّونَها في بريدِهم الإلكترونيّ قريبًا.`
                    : `We've sent a beautiful gift card to ${recipientName}. They'll receive it in their inbox shortly.`}
                </p>
                <Button variant="outline" onClick={() => { setStep(1); setRecipientName(''); setRecipientEmail(''); setSelectedCategory(null); setSelectedService(null); setOccasion(''); setPersonalMessage(''); setGifterName(''); setGifterEmail(''); }}>
                  {isRTL ? 'أرسِلْ هديّةً أخرى' : 'Send Another Gift'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="h-8 bg-gradient-to-b from-white to-[#FAF7F2]" />

      {/* ─── WHY GIFT A SESSION ─── */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="container-main max-w-4xl">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? <>لماذا تُهدي <span className="text-[#7A3B5E] italic">جلسة؟</span></> : <>Why Gift a <span className="text-[#7A3B5E] italic">Session?</span></>}
            </h2>
          </ScrollReveal>
          <StaggerReveal className="grid sm:grid-cols-3 gap-6">
            {[
              { iconEl: <Heart className="w-7 h-7 text-[#C4878A]" />, tEn: 'More Meaningful Than Flowers', tAr: 'أعمقُ أثرًا من الزّهور', dEn: 'A gift that shows real understanding — not just a gesture, but genuine care for their wellbeing.', dAr: 'هديّةٌ تعكسُ فَهْمًا حقيقيًّا — ليست مجرّدَ لَفْتة، بل رعايةٌ صادقةٌ لرفاهيتِهم.' },
              { iconEl: <Users className="w-7 h-7 text-[#7A3B5E]" />, tEn: 'Shows You Truly Care', tAr: 'تُظهِرُ اهتمامًا حقيقيًّا', dEn: 'Sometimes the most loving thing you can do is give someone a safe space to be heard.', dAr: 'أحيانًا أجملُ ما تفعلُه لِمَنْ تحبّ هو أن تمنحَه مساحةً آمنةً ليُسمَع.' },
              { iconEl: <Leaf className="w-7 h-7 text-[#C8A97D]" />, tEn: 'A Gift That Keeps Giving', tAr: 'هديّةٌ أثرُها يَدوم', dEn: 'The tools and insights from a session create lasting positive change in their life.', dAr: 'الأدواتُ والبصائرُ من الجلسةِ تصنعُ تغييرًا إيجابيًّا مُستدامًا في حياتِهم.' },
            ].map((card, i) => (
              <StaggerChild key={i}>
                <div className="bg-white rounded-2xl p-8 border border-[#F3EFE8] text-center h-full shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-card)] transition-shadow duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] flex items-center justify-center mx-auto mb-4">{card.iconEl}</div>
                  <h3 className="text-lg font-bold text-[#2D2A33] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? card.tAr : card.tEn}</h3>
                  <p className="text-sm text-[#6B6580] leading-relaxed">{isRTL ? card.dAr : card.dEn}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ─── MINI FAQ ─── */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="container-main max-w-2xl">
          <ScrollReveal className="text-center mb-10">
            <h3 className="text-2xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{isRTL ? 'أسئلةٌ شائعة' : 'Common Questions'}</h3>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden" initial={false}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className={`w-full flex items-center justify-between p-5 text-start ${isRTL ? 'text-right' : ''}`}>
                  <span className="font-semibold text-[#2D2A33] text-sm">{isRTL ? faq.qAr : faq.qEn}</span>
                  <ChevronDown className={`w-4 h-4 text-[#8E8E9F] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-[#6B6580] leading-relaxed">{isRTL ? faq.aAr : faq.aEn}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
