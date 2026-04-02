'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Clock, MessageCircle, ArrowRight, Monitor,
  Instagram, Facebook, Youtube,
  HelpCircle, Calendar, Handshake, Gift, Star,
  User, Users, Heart, Leaf, GraduationCap, Mic, Globe, Sparkles,
  CheckCircle2, Shield,
} from 'lucide-react';
import { SnapchatIcon, TelegramIcon, TiktokIcon } from '@/components/icons/SocialIcons';
import { useCallback, useRef, useEffect } from 'react';
import { getMessages, type Locale } from '@/lib/i18n';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import WaveDivider from '@/components/ui/WaveDivider';
import ChatForm, { type ChatStep } from '@/components/ui/ChatForm';

/* ================================================================
   Contact Page — AI-Feel Conversational Chat Form
   ================================================================ */

// ── Country list ──
const countries = [
  { code: 'CA', en: 'Canada', ar: 'كندا' },
  { code: 'AE', en: 'United Arab Emirates', ar: 'الإماراتُ العربيّةُ المتّحدة' },
  { code: 'SA', en: 'Saudi Arabia', ar: 'المملكة العربيّة السعوديّة' },
  { code: 'KW', en: 'Kuwait', ar: 'الكويت' },
  { code: 'QA', en: 'Qatar', ar: 'قطر' },
  { code: 'BH', en: 'Bahrain', ar: 'البحرين' },
  { code: 'OM', en: 'Oman', ar: 'عُمان' },
  { code: 'JO', en: 'Jordan', ar: 'الأردن' },
  { code: 'LB', en: 'Lebanon', ar: 'لبنان' },
  { code: 'EG', en: 'Egypt', ar: 'مصر' },
  { code: 'IQ', en: 'Iraq', ar: 'العراق' },
  { code: 'PS', en: 'Palestine', ar: 'فلسطين' },
  { code: 'SY', en: 'Syria', ar: 'سوريا' },
  { code: 'YE', en: 'Yemen', ar: 'اليمن' },
  { code: 'SD', en: 'Sudan', ar: 'السودان' },
  { code: 'LY', en: 'Libya', ar: 'ليبيا' },
  { code: 'TN', en: 'Tunisia', ar: 'تونس' },
  { code: 'DZ', en: 'Algeria', ar: 'الجزائر' },
  { code: 'MA', en: 'Morocco', ar: 'المغرب' },
  { code: 'US', en: 'United States', ar: 'الولايات المتّحدة' },
  { code: 'GB', en: 'United Kingdom', ar: 'المملكة المتّحدة' },
  { code: 'AU', en: 'Australia', ar: 'أستراليا' },
  { code: 'DE', en: 'Germany', ar: 'ألمانيا' },
  { code: 'FR', en: 'France', ar: 'فرنسا' },
  { code: 'TR', en: 'Turkey', ar: 'تركيا' },
  { code: 'MY', en: 'Malaysia', ar: 'ماليزيا' },
  { code: 'PK', en: 'Pakistan', ar: 'باكستان' },
  { code: 'IN', en: 'India', ar: 'الهند' },
  { code: 'OTHER', en: 'Other', ar: 'أخرى' },
];

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  const t = (en: string, ar: string) => isRTL ? ar : en;
  const formRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to form section after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Track contact_form event on successful submission
  const handleFormComplete = useCallback((data: Record<string, string | boolean>) => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact_form',
        email: typeof data.email === 'string' ? data.email : undefined,
        source: 'contact_page',
        locale,
      }),
    }).catch(() => {
      // Tracking failure is non-blocking
    });
  }, [locale]);

  // ── Build conversation steps ──
  const steps: ChatStep[] = [
    // Step 1: Reason
    {
      id: 'reason',
      field: 'reason',
      message: t(
        "Welcome! I'm here to help you get connected with Mama Hala. What brings you here today?",
        'أهلًا! أنا هنا لأساعدَك في التواصلِ مع ماما هالة. ما الذي يجلبُك اليوم؟'
      ),
      type: 'cards',
      autoAdvance: true,
      required: true,
      options: [
        { value: 'booking', label: t('Schedule a Session', 'جدولةُ جلسة'), icon: <Calendar className="w-4 h-4" style={{ color: '#7A3B5E' }} />, color: '#7A3B5E' },
        { value: 'services', label: t('Learn About Services', 'التعرُّفُ على الخدمات'), icon: <Star className="w-4 h-4" style={{ color: '#C4878A' }} />, color: '#C4878A' },
        { value: 'general', label: t('General Inquiry', 'استفسارٌ عامّ'), icon: <HelpCircle className="w-4 h-4" style={{ color: '#C8A97D' }} />, color: '#C8A97D' },
        { value: 'gift', label: t('Gift of Care', 'هديّةُ رعاية'), icon: <Gift className="w-4 h-4" style={{ color: '#D4836A' }} />, color: '#D4836A', redirect: `/${locale}/gift` },
        { value: 'collaboration', label: t('Collaboration', 'تعاوُن'), icon: <Handshake className="w-4 h-4" style={{ color: '#4A7A6B' }} />, color: '#4A7A6B' },
        { value: 'feedback', label: t('Share Feedback', 'مشاركةُ ملاحظات'), icon: <MessageCircle className="w-4 h-4" style={{ color: '#6B6580' }} />, color: '#6B6580' },
      ],
      followUp: (val) => {
        const map: Record<string, string> = {
          booking: t("Great choice — let's find the right session for you.", 'اختيارٌ رائع — لنجدْ لك الجلسةَ المناسبة.'),
          services: t("I'd be happy to help you explore our services.", 'يسعدُني مساعدتُك في استكشافِ خدماتِنا.'),
          general: t("Of course — ask us anything.", 'بالطّبع — اسألْنا أيَّ شيء.'),
          collaboration: t("We love connecting with like-minded professionals.", 'نحبُّ التواصلَ مع المهنيّينَ الذين يشاركوننا الرؤية.'),
          feedback: t('Your feedback means a lot to us.', 'ملاحظاتُك تعني لنا الكثير.'),
        };
        return map[val] || null;
      },
    },

    // Booking: Who is the session for?
    {
      id: 'sessionFor',
      field: 'sessionFor',
      message: t('Who would the session be for?', 'لِمَنْ ستكونُ الجلسة؟'),
      type: 'cards',
      autoAdvance: true,
      required: true,
      condition: (d) => d.reason === 'booking',
      options: [
        { value: 'myself', label: t('Myself', 'لنفسي'), icon: <User className="w-4 h-4" style={{ color: '#7A3B5E' }} />, color: '#7A3B5E' },
        { value: 'child', label: t('My Child / Teen', 'طفلي / مراهقي'), icon: <GraduationCap className="w-4 h-4" style={{ color: '#C4878A' }} />, color: '#C4878A' },
        { value: 'couple', label: t('My Partner & I', 'شريكي وأنا'), icon: <Heart className="w-4 h-4" style={{ color: '#D4836A' }} />, color: '#D4836A' },
        { value: 'family', label: t('Our Family', 'عائلتُنا'), icon: <Users className="w-4 h-4" style={{ color: '#C8A97D' }} />, color: '#C8A97D' },
      ],
    },

    // Booking: Session format
    {
      id: 'sessionFormat',
      field: 'sessionFormat',
      message: t('How would you prefer to meet?', 'كيفَ تفضِّلُ أن نلتقي؟'),
      type: 'cards',
      autoAdvance: true,
      required: true,
      condition: (d) => d.reason === 'booking',
      options: [
        { value: 'online', label: t('Online', 'عبر الإنترنت'), icon: <Globe className="w-4 h-4" style={{ color: '#7A3B5E' }} />, color: '#7A3B5E' },
        { value: 'in-person', label: t('In-Person', 'حضوريًّا'), icon: <MapPin className="w-4 h-4" style={{ color: '#C8A97D' }} />, color: '#C8A97D' },
        { value: 'flexible', label: t('Either Works', 'كلاهما'), icon: <Sparkles className="w-4 h-4" style={{ color: '#C4878A' }} />, color: '#C4878A' },
      ],
    },

    // Services: Which area?
    {
      id: 'serviceArea',
      field: 'serviceArea',
      message: t('Which area of support are you interested in?', 'أيُّ مجالِ دعمٍ يهمُّك؟'),
      type: 'cards',
      autoAdvance: true,
      required: true,
      condition: (d) => d.reason === 'services',
      options: [
        { value: 'youth', label: t('Youth', 'الناشئة'), icon: <GraduationCap className="w-4 h-4" style={{ color: '#C4878A' }} />, color: '#C4878A' },
        { value: 'families', label: t('Families', 'العائلات'), icon: <Users className="w-4 h-4" style={{ color: '#C8A97D' }} />, color: '#C8A97D' },
        { value: 'adults', label: t('Adults', 'البالغون'), icon: <User className="w-4 h-4" style={{ color: '#7A3B5E' }} />, color: '#7A3B5E' },
        { value: 'couples', label: t('Couples', 'الأزواج'), icon: <Heart className="w-4 h-4" style={{ color: '#D4836A' }} />, color: '#D4836A' },
        { value: 'experiential', label: t('Experiential', 'التجريبيّ'), icon: <Leaf className="w-4 h-4" style={{ color: '#4A7A6B' }} />, color: '#4A7A6B' },
        { value: 'unsure', label: t('Not Sure Yet', 'لستُ متأكّدًا'), icon: <HelpCircle className="w-4 h-4" style={{ color: '#6B6580' }} />, color: '#6B6580' },
      ],
      followUp: (val) => val === 'unsure' ? t("No worries — that's exactly what we're here for.", 'لا بأس — هذا بالضّبطِ سببُ وجودِنا.') : null,
    },

    // Collaboration: Type
    {
      id: 'collabType',
      field: 'collabType',
      message: t('What type of collaboration are you interested in?', 'ما نوعُ التعاوُنِ الذي يهمُّك؟'),
      type: 'cards',
      autoAdvance: true,
      required: true,
      condition: (d) => d.reason === 'collaboration',
      options: [
        { value: 'workshop', label: t('Workshop / Speaking', 'ورشة / محاضرة'), icon: <Mic className="w-4 h-4" style={{ color: '#7A3B5E' }} />, color: '#7A3B5E' },
        { value: 'partnership', label: t('Partnership', 'شراكة'), icon: <Handshake className="w-4 h-4" style={{ color: '#C8A97D' }} />, color: '#C8A97D' },
        { value: 'media', label: t('Media / Press', 'إعلام'), icon: <Star className="w-4 h-4" style={{ color: '#C4878A' }} />, color: '#C4878A' },
        { value: 'other', label: t('Other', 'أخرى'), icon: <HelpCircle className="w-4 h-4" style={{ color: '#6B6580' }} />, color: '#6B6580' },
      ],
    },

    // Feedback: Rating
    {
      id: 'feedbackRating',
      field: 'feedbackRating',
      message: t('How would you rate your experience with Mama Hala?', 'كيف تقيِّمُ تجربتَك مع ماما هالة؟'),
      type: 'cards',
      autoAdvance: true,
      required: true,
      condition: (d) => d.reason === 'feedback',
      options: [
        { value: 'excellent', label: t('Excellent', 'ممتازة'), icon: <Star className="w-4 h-4" style={{ color: '#C8A97D' }} />, color: '#C8A97D' },
        { value: 'good', label: t('Good', 'جيّدة'), icon: <Star className="w-4 h-4" style={{ color: '#7A3B5E' }} />, color: '#7A3B5E' },
        { value: 'okay', label: t('Okay', 'لا بأس'), icon: <Star className="w-4 h-4" style={{ color: '#C4878A' }} />, color: '#C4878A' },
        { value: 'needs-improvement', label: t('Needs Improvement', 'تحتاجُ تحسينًا'), icon: <Star className="w-4 h-4" style={{ color: '#6B6580' }} />, color: '#6B6580' },
      ],
      followUp: (val) => {
        if (val === 'excellent' || val === 'good') return t('Thank you! We\'re so glad to hear that.', 'شكرًا! سعداءُ جدًّا بسماعِ ذلك.');
        return t('Thank you for your honesty — this helps us grow.', 'شكرًا على صراحتِك — هذا يُساعدُنا على التطوُّر.');
      },
    },

    // Feedback: Written feedback
    {
      id: 'feedbackText',
      field: 'feedbackText',
      message: t('Would you like to share more about your experience?', 'هل تودُّ مشاركةَ المزيدِ عن تجربتِك؟'),
      type: 'textarea',
      rows: 3,
      required: true,
      condition: (d) => d.reason === 'feedback',
      placeholder: t('What stood out to you? What could be better?', 'ما الذي لفتَ انتباهَك؟ ما الذي يمكنُ تحسينُه؟'),
    },

    // Feedback: Ask to publish (only for excellent/good)
    {
      id: 'feedbackPublish',
      field: 'feedbackPublish',
      message: t(
        'Your words could inspire someone who\'s hesitating to take that first step. Would you be comfortable sharing your feedback on our website? We\'d only use your initials to protect your privacy.',
        'كلماتُك قد تُلهمُ شخصًا يتردّدُ في اتّخاذِ الخطوةِ الأولى. هل توافقُ على نشرِ ملاحظاتِك على موقعِنا؟ سنستخدمُ الأحرفَ الأولى من اسمِك فقط حمايةً لخصوصيّتِك.'
      ),
      type: 'cards',
      autoAdvance: true,
      required: true,
      condition: (d) => d.reason === 'feedback' && (d.feedbackRating === 'excellent' || d.feedbackRating === 'good'),
      options: [
        { value: 'yes', label: t('Yes, share it', 'نعم، شارِكْها'), icon: <CheckCircle2 className="w-4 h-4" style={{ color: '#25D366' }} />, color: '#25D366' },
        { value: 'no', label: t('Keep it private', 'أبقِها خاصّة'), icon: <Shield className="w-4 h-4" style={{ color: '#6B6580' }} />, color: '#6B6580' },
      ],
      followUp: (val) => val === 'yes'
        ? t('Thank you for trusting us with your story. It will help others.', 'شكرًا لثقتِك بنا. قصّتُك ستُساعدُ الآخرين.')
        : t('Absolutely — your privacy is our priority.', 'بالتأكيد — خصوصيّتُك أولويّتُنا.'),
    },

    // Name
    {
      id: 'name',
      field: 'name',
      message: t("Now, what's your name?", 'الآن، ما اسمُك؟'),
      type: 'text',
      placeholder: t('Type your name...', 'اكتُبْ اسمَك...'),
      required: true,
      followUp: (val) => t(`Nice to meet you, ${val}!`, `سعيدةٌ بلقائِك، ${val}!`),
    },

    // Email
    {
      id: 'email',
      field: 'email',
      message: t("What's the best email to reach you at?", 'ما أفضلُ بريدٍ إلكترونيٍّ للتواصلِ معك؟'),
      type: 'email',
      placeholder: t('your@email.com', 'بريدك@الإلكتروني.com'),
      required: true,
    },

    // Phone (optional)
    {
      id: 'phone',
      field: 'phone',
      message: t('Would you like to share a phone number? (Optional — skip if you prefer)', 'هل تودُّ مشاركةَ رقمِ هاتفٍ؟ (اختياريّ — تخطَّ إن شئت)'),
      type: 'tel',
      placeholder: t('+1 (___) ___-____', '+___ ___ ___ ___'),
      required: false,
    },

    // Country
    {
      id: 'country',
      field: 'country',
      message: t("Where are you based? This helps us tailor our support.", 'أين تتواجَد؟ هذا يُساعدُنا في تقديمِ الدّعمِ المناسب.'),
      type: 'select',
      required: true,
      placeholder: t('Select your country...', 'اختَرْ بلدَك...'),
      options: countries.map((c) => ({ value: c.code, label: isRTL ? c.ar : c.en })),
      followUp: (val) => {
        if (val === 'CA') return t('Wonderful — we have in-person sessions available in Ottawa.', 'رائع — لدينا جلساتٌ حضوريّة في أوتاوا.');
        if (val === 'AE') return t('Great — we offer both online and in-person sessions in Dubai.', 'ممتاز — نقدِّمُ جلساتٍ حضوريّة وعبر الإنترنت في دبي.');
        return t('We offer online sessions worldwide — you\'re in good hands.', 'نقدِّمُ جلساتٍ عبر الإنترنت حول العالم — أنت في أيدٍ أمينة.');
      },
    },

    // Preferred language
    {
      id: 'preferredLang',
      field: 'preferredLang',
      message: t('Which language would you prefer to communicate in?', 'بأيِّ لغةٍ تفضِّلُ التواصُل؟'),
      type: 'cards',
      autoAdvance: true,
      required: true,
      options: [
        { value: 'english', label: 'English', icon: <Globe className="w-4 h-4" style={{ color: '#7A3B5E' }} />, color: '#7A3B5E' },
        { value: 'arabic', label: 'العربية', icon: <Globe className="w-4 h-4" style={{ color: '#C8A97D' }} />, color: '#C8A97D' },
        { value: 'both', label: t('Either is fine', 'كلاهما'), icon: <Globe className="w-4 h-4" style={{ color: '#C4878A' }} />, color: '#C4878A' },
      ],
    },

    // Message
    {
      id: 'message',
      field: 'message',
      message: t(
        "Last step — share anything you'd like us to know. The more you share, the better we can prepare.",
        'الخطوةُ الأخيرة — شارِكْنا أيَّ شيءٍ تودُّ أن نعرفَه. كلَّما شاركتَ أكثر، استعدَدْنا بشكلٍ أفضل.'
      ),
      type: 'textarea',
      rows: 4,
      placeholder: t('Type your message here...', 'اكتُبْ رسالتَك هنا...'),
      required: true,
    },

    // Consent
    {
      id: 'consent',
      field: 'consent',
      message: t(
        'One last thing — please confirm you\'re okay with how we handle your information.',
        'أمرٌ أخير — يُرجى التأكيدُ على موافقتِك على طريقةِ تعاملِنا مع معلوماتِك.'
      ),
      type: 'checkbox',
      required: true,
      consentText: (
        <span>
          {t(
            'I consent to Mama Hala Consulting handling my information with care. I understand full online confidentiality cannot be guaranteed and this does not replace professional counseling.',
            'أوافقُ على تعاملِ ماما هالة للاستشارات مع معلوماتي بعناية. أُدرِكُ أنّ السرّيّةَ الكاملةَ عبر الإنترنت غيرُ مضمونة وأنّ هذا لا يحلُّ محلَّ الاستشارةِ المهنيّة.'
          )}
          {' '}
          <Link href={`/${locale}/privacy-policy`} target="_blank" rel="noopener noreferrer" className="text-[#7A3B5E] font-medium underline underline-offset-2">
            {t('Privacy Policy', 'الخصوصيّة')}
          </Link>
        </span>
      ),
    },
  ];

  const socials = [
    { icon: Instagram, href: 'https://www.instagram.com/mamahala.ca/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/mamahala.ca', label: 'Facebook' },
    { icon: TelegramIcon, href: 'https://t.me/+Ut1Xms3zRX5jMmNh', label: 'Telegram' },
  ];

  return (
    <div className="overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C4878A]/[0.04] blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full bg-[#C8A97D]/[0.08] blur-[60px]" />
        </div>
        <div className="container-main relative z-10 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb items={[{ label: messages.nav.home, href: `/${locale}` }, { label: messages.nav.contact }]} locale={locale} />
          </motion.div>
          <motion.h1 className={`mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-tight ${isRTL ? 'text-right' : ''}`} style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {messages.contact.pageTitle}
          </motion.h1>
          <motion.p className={`mt-4 text-lg text-[#4A4A5C] max-w-xl leading-relaxed ${isRTL ? 'text-right' : ''}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {messages.contact.subtitle}
          </motion.p>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ── CHAT FORM + INFO ── */}
      <section ref={formRef} className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* LEFT: Chat Form */}
            <ScrollReveal direction={isRTL ? 'right' : 'left'} className={`lg:col-span-3 lg:order-1`}>
              <ChatForm
                steps={steps}
                greeting=""
                successTitle={t("Message Received!", 'تمَّ استلامُ رسالتِك!')}
                successMessage={t(
                  "Thank you for reaching out. We'll get back to you within 24 hours.",
                  'شكرًا لتواصُلِك. سنردُّ عليك خلالَ 24 ساعة.'
                )}
                endpoint="/api/contact"
                locale={locale}
                isRTL={isRTL}
                sendLabel={t('Send', 'أرسِلْ')}
                sendingLabel={t('Sending...', 'جارِ الإرسال...')}
                onComplete={handleFormComplete}
              />
            </ScrollReveal>

            {/* RIGHT: Info sidebar */}
            <ScrollReveal direction={isRTL ? 'left' : 'right'} delay={0.15} className={`lg:col-span-2 flex flex-col gap-5 lg:order-2`}>
              {/* WhatsApp */}
              <a href="https://wa.me/16132222104" target="_blank" rel="noopener noreferrer"
                className={`group flex items-center gap-4 rounded-2xl bg-[#25D366]/[0.08] border border-[#25D366]/15 hover:border-[#25D366]/30 p-5 transition-all ${isRTL ? 'text-right' : ''}`}>
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 flex items-center justify-center flex-shrink-0"><MessageCircle className="w-5 h-5 text-[#25D366]" /></div>
                <div className="flex-1"><p className="text-sm font-semibold text-[#2D2A33]">WhatsApp</p><p className="text-xs text-[#6B6580]">{t('Quick reply during business hours', 'ردٌّ سريع خلالَ ساعات العمل')}</p></div>
                <ArrowRight className={`w-4 h-4 text-[#25D366] group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </a>

              {/* Email */}
              <a href="mailto:admin@mamahala.ca" className={`group flex items-center gap-4 bg-white rounded-2xl p-5 border border-[#F3EFE8] hover:border-[#C4878A]/20 hover:shadow-sm transition-all ${isRTL ? 'text-right' : ''}`}>
                <div className="w-11 h-11 rounded-xl bg-[#C4878A]/[0.08] flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-[#7A3B5E]" /></div>
                <div className="flex-1"><p className="text-sm font-semibold text-[#2D2A33]">admin@mamahala.ca</p><p className="text-xs text-[#6B6580]">{t('Email us anytime', 'راسِلْنا في أيِّ وقت')}</p></div>
              </a>

              {/* Hours */}
              <div className={`flex items-center gap-4 bg-white rounded-2xl p-5 border border-[#F3EFE8] ${isRTL ? 'text-right' : ''}`}>
                <div className="w-11 h-11 rounded-xl bg-[#C8A97D]/[0.08] flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5 text-[#C8A97D]" /></div>
                <div className="flex-1"><p className="text-sm font-semibold text-[#2D2A33]">{messages.contact.hours}</p><p className="text-xs text-[#6B6580]">{messages.contact.hoursDetail}</p></div>
              </div>

              {/* How We Connect */}
              <div className="bg-white rounded-2xl border border-[#F3EFE8] p-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#7A3B5E]/8 flex items-center justify-center flex-shrink-0">
                      <Monitor className="w-4 h-4 text-[#7A3B5E]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2D2A33]">{t('Online Sessions', 'جلساتٌ عبر الإنترنت')}</p>
                      <p className="text-xs text-[#8E8E9F]">{t('Available worldwide', 'متاحةٌ في جميعِ أنحاءِ العالم')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#C8A97D]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[#C8A97D]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2D2A33]">{t('In-Person Sessions', 'جلساتٌ حضوريّة')}</p>
                      <p className="text-xs text-[#8E8E9F]">{t('Canada & UAE', 'كندا والإمارات')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className={`bg-white rounded-2xl p-5 border border-[#F3EFE8] ${isRTL ? 'text-right' : ''}`}>
                <p className="text-sm font-semibold text-[#2D2A33] mb-3">{messages.contact.followUs}</p>
                <div className="flex items-center gap-2.5">
                  {socials.map((s, i) => { const SI = s.icon; return (
                    <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#4A4A5C] hover:bg-[#7A3B5E] hover:text-white transition-all duration-200"
                      whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}><SI className="w-4 h-4" /></motion.a>
                  ); })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
