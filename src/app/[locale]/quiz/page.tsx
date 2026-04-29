'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, ChevronLeft, ChevronRight,
  Calendar, MessageCircle, Sparkles, Baby, Users, User, Heart,
  Brain, Shield, Compass, Zap, Check, Flame, BookOpen, HeartHandshake,
  Lightbulb, AlertTriangle, HandHeart, Eye, MessageSquare, Frown,
  GraduationCap, TreePine, Activity,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { scrollToElement, scrollToTop } from '@/lib/scroll';
import { services } from '@/data/services';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import { getBookingUrl } from '@/config/business';
import PageTracker from '@/components/analytics/PageTracker';

interface QuizAnswer {
  question: number;
  answer: string;
}

// Q2 options tailored to each Q1 answer
const concernOptionsMap: Record<string, Array<{ value: string; en: string; ar: string; desc: string; descAr: string; icon: React.ComponentType<{ className?: string }> }>> = {
  child: [
    { value: 'emotions', en: 'Big emotions & meltdowns', ar: 'مشاعر كبيرة ونوبات غضب', desc: 'Tantrums, crying spells, difficulty calming down', descAr: 'نوبات غضب، بكاء، صعوبة في التهدئة', icon: Flame },
    { value: 'behavior', en: 'Challenging behavior', ar: 'سلوك صعب', desc: 'Defiance, aggression, not listening, acting out', descAr: 'تحدي، عدوانية، عدم الاستماع، تصرفات سلبية', icon: AlertTriangle },
    { value: 'focus', en: 'Focus & attention (ADHD)', ar: 'التركيز والانتباه (ADHD)', desc: 'Difficulty concentrating, hyperactivity, impulsivity', descAr: 'صعوبة في التركيز، فرط نشاط، اندفاعية', icon: Zap },
    { value: 'anxiety', en: 'Fears, anxiety & worry', ar: 'مخاوف وقلق وتوتر', desc: 'Separation anxiety, social fears, nightmares, phobias', descAr: 'قلق الانفصال، مخاوف اجتماعية، كوابيس', icon: Shield },
    { value: 'social', en: 'Social skills & friendships', ar: 'المهارات الاجتماعية والصداقات', desc: 'Difficulty making friends, bullying, shyness', descAr: 'صعوبة في تكوين صداقات، تنمر، خجل', icon: Users },
    { value: 'school', en: 'School struggles', ar: 'صعوبات مدرسية', desc: 'Academic challenges, school refusal, learning gaps', descAr: 'تحديات أكاديمية، رفض المدرسة، فجوات تعلم', icon: GraduationCap },
  ],
  teen: [
    { value: 'behavior', en: 'Risky or rebellious behavior', ar: 'سلوك خطير أو متمرد', desc: 'Substance use, lying, sneaking out, rule-breaking', descAr: 'تعاطي مواد، كذب، تسلل، كسر القواعد', icon: AlertTriangle },
    { value: 'emotions', en: 'Mood swings & emotional outbursts', ar: 'تقلبات مزاجية ونوبات عاطفية', desc: 'Anger, irritability, withdrawal, low motivation', descAr: 'غضب، عصبية، انسحاب، انخفاض الدافع', icon: Flame },
    { value: 'anxiety', en: 'Anxiety, depression or self-harm', ar: 'قلق، اكتئاب أو إيذاء ذاتي', desc: 'Persistent worry, sadness, low self-esteem, self-harm concerns', descAr: 'قلق مستمر، حزن، تدني تقدير الذات، مخاوف إيذاء ذاتي', icon: Frown },
    { value: 'screens', en: 'Screen addiction & digital life', ar: 'إدمان الشاشات والحياة الرقمية', desc: 'Gaming addiction, social media issues, cyberbullying', descAr: 'إدمان الألعاب، مشاكل وسائل التواصل، التنمر الإلكتروني', icon: Eye },
    { value: 'identity', en: 'Identity & peer pressure', ar: 'الهوية وضغط الأقران', desc: 'Struggling with identity, fitting in, cultural conflicts', descAr: 'صراع مع الهوية، الاندماج، صراعات ثقافية', icon: Compass },
    { value: 'academic', en: 'Academic pressure & future planning', ar: 'ضغط أكاديمي وتخطيط مستقبلي', desc: 'Study stress, career confusion, exam anxiety', descAr: 'ضغط الدراسة، حيرة مهنية، قلق الامتحانات', icon: GraduationCap },
  ],
  myself: [
    { value: 'anxiety', en: 'Anxiety, stress or overwhelm', ar: 'قلق، توتر أو إرهاق', desc: 'Racing thoughts, panic attacks, burnout, constant worry', descAr: 'أفكار متسارعة، نوبات هلع، إرهاق، قلق مستمر', icon: Brain },
    { value: 'depression', en: 'Low mood or depression', ar: 'مزاج منخفض أو اكتئاب', desc: 'Feeling stuck, hopeless, unmotivated, loss of interest', descAr: 'الشعور بالعجز، فقدان الأمل، انخفاض الدافعية', icon: Frown },
    { value: 'anger', en: 'Anger management', ar: 'إدارة الغضب', desc: 'Frequent anger, difficulty controlling reactions, outbursts', descAr: 'غضب متكرر، صعوبة في السيطرة على ردود الفعل', icon: Flame },
    { value: 'growth', en: 'Personal growth & life direction', ar: 'النمو الشخصي واتجاه الحياة', desc: 'Life transitions, finding purpose, building confidence', descAr: 'تحولات حياتية، إيجاد الهدف، بناء الثقة', icon: Lightbulb },
    { value: 'self-esteem', en: 'Self-esteem & confidence', ar: 'تقدير الذات والثقة', desc: 'Negative self-talk, people-pleasing, boundaries', descAr: 'حديث ذاتي سلبي، إرضاء الآخرين، الحدود', icon: Shield },
    { value: 'lifestyle', en: 'Lifestyle & wellness coaching', ar: 'تدريب نمط الحياة والعافية', desc: 'Healthy habits, work-life balance, goal setting', descAr: 'عادات صحية، توازن بين العمل والحياة، تحديد الأهداف', icon: Activity },
  ],
  couple: [
    { value: 'communication', en: 'Communication breakdown', ar: 'انهيار التواصل', desc: 'Constant arguments, not feeling heard, emotional distance', descAr: 'شجارات مستمرة، عدم الشعور بالاستماع، مسافة عاطفية', icon: MessageSquare },
    { value: 'trust', en: 'Trust & betrayal issues', ar: 'مشاكل الثقة والخيانة', desc: 'Infidelity recovery, rebuilding trust, transparency', descAr: 'التعافي من الخيانة، إعادة بناء الثقة، الشفافية', icon: Shield },
    { value: 'premarital', en: 'Pre-marriage preparation', ar: 'التحضير لما قبل الزواج', desc: 'Readiness assessment, expectations, conflict styles', descAr: 'تقييم الاستعداد، التوقعات، أنماط النزاع', icon: HeartHandshake },
    { value: 'intimacy', en: 'Emotional or physical disconnect', ar: 'انفصال عاطفي أو جسدي', desc: 'Lost connection, different needs, feeling like roommates', descAr: 'فقدان الاتصال، احتياجات مختلفة، الشعور كشركاء سكن', icon: Heart },
    { value: 'conflict', en: 'Recurring conflicts & patterns', ar: 'نزاعات وأنماط متكررة', desc: 'Same fights on repeat, power struggles, resentment', descAr: 'نفس الشجارات تتكرر، صراعات السلطة، الاستياء', icon: Flame },
    { value: 'parenting', en: 'Co-parenting disagreements', ar: 'خلافات الأبوة المشتركة', desc: 'Different parenting styles, discipline conflicts, blended families', descAr: 'أنماط أبوة مختلفة، نزاعات التأديب، العائلات المختلطة', icon: Users },
  ],
  family: [
    { value: 'communication', en: 'Family communication & conflict', ar: 'التواصل والنزاع العائلي', desc: 'Constant tension, yelling, siblings fighting, no one listens', descAr: 'توتر مستمر، صراخ، شجارات الأخوة، لا أحد يستمع', icon: MessageSquare },
    { value: 'parenting', en: 'Parenting challenges', ar: 'تحديات الأبوة', desc: 'Discipline strategies, setting boundaries, consistency', descAr: 'استراتيجيات التأديب، وضع الحدود، الاتساق', icon: HandHeart },
    { value: 'transition', en: 'Family transition or crisis', ar: 'انتقال عائلي أو أزمة', desc: 'Divorce, relocation, loss, new family member, blending families', descAr: 'طلاق، انتقال، فقدان، فرد جديد، دمج عائلات', icon: Compass },
    { value: 'dynamics', en: 'Unhealthy family patterns', ar: 'أنماط عائلية غير صحية', desc: 'Codependency, favoritism, toxic patterns, generational trauma', descAr: 'التبعية، المحاباة، أنماط سامة، صدمات بين الأجيال', icon: AlertTriangle },
    { value: 'teens', en: 'Struggling with a teen at home', ar: 'صعوبات مع مراهق في المنزل', desc: 'Parent-teen conflicts, boundaries being pushed, disconnect', descAr: 'نزاعات الوالد-المراهق، دفع الحدود، انفصال', icon: Shield },
    { value: 'wellbeing', en: 'Building a healthier family culture', ar: 'بناء ثقافة عائلية أكثر صحة', desc: 'Quality time, emotional safety, better routines', descAr: 'وقت نوعي، أمان عاطفي، روتين أفضل', icon: TreePine },
  ],
};

type QuizOption = {
  value: string;
  en: string;
  ar: string;
  desc?: string;
  descAr?: string;
  icon: React.ComponentType<{ className?: string }>;
};

type QuizQuestion = {
  id: number;
  en: string;
  ar: string;
  options: QuizOption[];
};

const baseQuestions: QuizQuestion[] = [
  {
    id: 1,
    en: 'Who needs support?',
    ar: 'من يحتاج الدعم؟',
    options: [
      { value: 'child', en: 'My child (under 12)', ar: 'طفلي (أقل من 12)', icon: Baby },
      { value: 'teen', en: 'My teenager (13-17)', ar: 'ابني المراهق (13-17)', icon: Shield },
      { value: 'myself', en: 'Myself', ar: 'أنا شخصيًا', icon: User },
      { value: 'couple', en: 'My partner & me', ar: 'شريكي وأنا', icon: Heart },
      { value: 'family', en: 'Our whole family', ar: 'عائلتنا بأكملها', icon: Users },
    ],
  },
  {
    id: 2,
    en: 'What area concerns you most?',
    ar: 'ما هو المجال الأكثر إثارة للقلق؟',
    options: [], // dynamically populated
  },
  {
    id: 3,
    en: 'Have you had counseling before?',
    ar: 'هل سبق لك أن حصلت على استشارة من قبل؟',
    options: [
      { value: 'no', en: 'No, this is my first time', ar: 'لا، هذه أول مرة', icon: Sparkles },
      { value: 'yes', en: 'Yes, I have experience', ar: 'نعم، لدي تجربة سابقة', icon: Check },
    ],
  },
  {
    id: 4,
    en: 'How would you like to connect?',
    ar: 'كيف تود التواصل؟',
    options: [
      { value: 'online', en: 'Online sessions', ar: 'جلسات عبر الإنترنت', icon: Compass },
      { value: 'flexible', en: "I'm flexible", ar: 'أنا مرن', icon: Check },
    ],
  },
];

// Hand-curated recommendation map: [who][concern] → service slugs in priority order.
// Cross-category picks are intentional (e.g. ADHD coaching for children, parenting-coaching for couples).
const recommendationMap: Record<string, Record<string, string[]>> = {
  child: {
    emotions: ['managing-big-emotions', 'cbt-youth', 'under-18-counseling'],
    behavior: ['under-18-counseling', 'managing-big-emotions', 'cbt-youth'],
    focus:    ['cbt-youth', 'under-18-counseling', 'adhd-executive-function-coaching'],
    anxiety:  ['cbt-youth', 'managing-big-emotions', 'under-18-counseling'],
    social:   ['social-confidence-friendship', 'bullying-support', 'under-18-counseling'],
    school:   ['cbt-youth', 'under-18-counseling', 'supporting-children-through-change'],
  },
  teen: {
    behavior: ['teen-behavioral-coaching', 'under-18-counseling', 'cbt-youth'],
    emotions: ['managing-big-emotions', 'cbt-youth', 'under-18-counseling'],
    anxiety:  ['cbt-youth', 'under-18-counseling', 'managing-big-emotions'],
    screens:  ['teen-behavioral-coaching', 'cbt-youth', 'under-18-counseling'],
    identity: ['under-18-counseling', 'social-confidence-friendship', 'cbt-youth'],
    academic: ['teen-behavioral-coaching', 'cbt-youth', 'under-18-counseling'],
  },
  myself: {
    anxiety:     ['individual-counseling', 'cbt-adults'],
    depression:  ['individual-counseling', 'cbt-adults'],
    anger:       ['anger-management', 'cbt-adults', 'individual-counseling'],
    growth:      ['life-coaching', 'self-development-coaching', 'lifestyle-coaching'],
    'self-esteem': ['self-development-coaching', 'individual-counseling', 'cbt-adults'],
    lifestyle:   ['lifestyle-coaching', 'life-coaching', 'self-development-coaching'],
  },
  couple: {
    premarital:    ['pre-marital-education', 'relationship-enrichment', 'couples-counseling'],
    communication: ['couples-counseling', 'relationship-enrichment'],
    trust:         ['couples-counseling', 'relationship-enrichment'],
    intimacy:      ['couples-counseling', 'relationship-enrichment'],
    conflict:      ['couples-counseling', 'relationship-enrichment'],
    parenting:     ['couples-counseling', 'parenting-coaching'],
  },
  family: {
    parenting:      ['parenting-coaching', 'tackling-child-tantrums', 'parental-stress-wellbeing'],
    communication:  ['family-relationship-strengthening', 'parenting-coaching'],
    transition:     ['family-relationship-strengthening', 'parental-stress-wellbeing', 'supporting-children-through-change'],
    dynamics:       ['family-relationship-strengthening', 'parenting-coaching', 'parental-stress-wellbeing'],
    teens:          ['family-relationship-strengthening', 'parenting-coaching', 'teen-behavioral-coaching'],
    wellbeing:      ['family-relationship-strengthening', 'parental-stress-wellbeing', 'parenting-coaching'],
  },
};

const categoryFallback: Record<string, string> = {
  child: 'youth', teen: 'youth', myself: 'adults', couple: 'couples', family: 'families',
};

interface RecommendationResult {
  main: typeof services;
  startHere: (typeof services)[number] | null;
  bonus: (typeof services)[number] | null;
}

function getRecommendations(answers: QuizAnswer[]): RecommendationResult {
  const who = answers.find((a) => a.question === 1)?.answer || '';
  const concern = answers.find((a) => a.question === 2)?.answer || '';
  const experience = answers.find((a) => a.question === 3)?.answer || '';
  const mode = answers.find((a) => a.question === 4)?.answer || '';

  // 1. Look up curated slugs
  const slugs = recommendationMap[who]?.[concern] ?? [];
  let matched = slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => s != null);

  // 2. Fallback: all services in the category
  if (matched.length === 0) {
    const cat = categoryFallback[who];
    if (cat) matched = services.filter((s) => s.category === cat);
  }
  // 3. Last resort
  if (matched.length === 0) {
    const consultation = services.find((s) => s.slug === 'initial-consultation');
    if (consultation) matched = [consultation];
  }

  // 4. Q3: first-timers get the free consultation as a "Start here" card
  let startHere: (typeof services)[number] | null = null;
  if (experience === 'no') {
    const consultation = services.find((s) => s.slug === 'initial-consultation');
    if (consultation && !matched.some((s) => s.slug === 'initial-consultation')) {
      startHere = consultation;
      matched = matched.slice(0, 2); // keep top 2 so total = 3
    }
  }

  // 5. Q4: flexible users get a walk-and-talk bonus suggestion
  let bonus: (typeof services)[number] | null = null;
  if (mode === 'flexible') {
    const walkAndTalk = services.find((s) => s.slug === 'walk-and-talk');
    if (walkAndTalk && !matched.some((s) => s.slug === 'walk-and-talk')) {
      bonus = walkAndTalk;
    }
  }

  return { main: matched.slice(0, 3), startHere, bonus };
}

export default function QuizPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

  const quizRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount to ensure hero is fully visible
  useEffect(() => {
    void scrollToTop({ behavior: 'instant' });
  }, []);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Scroll to quiz section on every step change and results
  useEffect(() => {
    if ((step > 0 || showResults) && quizRef.current) {
      void scrollToElement(quizRef.current);
    }
  }, [step, showResults]);

  // Dynamically build Q2 based on Q1 answer
  const whoAnswer = answers.find((a) => a.question === 1)?.answer || '';
  const questions: QuizQuestion[] = baseQuestions.map((q) => {
    if (q.id === 2) {
      return { ...q, options: concernOptionsMap[whoAnswer] || concernOptionsMap['myself'] };
    }
    return q;
  });

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleSelect = (value: string) => {
    const newAnswers = [...answers.filter((a) => a.question !== currentQuestion.id), { question: currentQuestion.id, answer: value }];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const result = showResults ? getRecommendations(answers) : null;
  const recommendations = result?.main ?? [];
  const startHere = result?.startHere ?? null;
  const bonus = result?.bonus ?? null;

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      <PageTracker type="page_view" source="quiz-hub" locale={locale as string} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7A3B5E] via-[#7A3B5E] to-[#5E2D48]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/20 hidden lg:block blur-3xl" />
        </div>
        <div className="container-main relative pt-16 pb-24 md:pt-20 md:pb-28 text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Sparkles className="w-8 h-8 text-[#C8A97D] mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'ساعدني في اختيار الدعم المناسب' : 'Help Me Choose The Right Support'}
            </h1>
            <p className="text-white/70 mt-3 max-w-lg mx-auto">
              {isRTL ? 'أجب على بعض الأسئلة السريعة وسنوصيك بالخدمة الأنسب لك' : 'Answer a few quick questions and we\'ll recommend the best service for you'}
            </p>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      <div ref={quizRef} className="max-w-2xl mx-auto px-6 py-16 scroll-anchor">
        {!showResults ? (
          <>
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#8E8E9F]">
                  {isRTL ? `سؤال ${step + 1} من ${questions.length}` : `Question ${step + 1} of ${questions.length}`}
                </span>
                <span className="text-sm font-medium text-[#7A3B5E]">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-[#F3EFE8] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#C4878A] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Back button */}
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1 text-sm text-[#8E8E9F] hover:text-[#4A4A5C] mb-6 transition-colors"
              >
                <BackIcon className="w-4 h-4" />
                {isRTL ? 'السابق' : 'Back'}
              </button>
            )}

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-[#2D2A33] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                  {isRTL ? currentQuestion.ar : currentQuestion.en}
                </h2>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers.find((a) => a.question === currentQuestion.id)?.answer === option.value;
                    const Icon = option.icon;
                    return (
                      <motion.button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-start transition-all duration-200 ${
                          isSelected
                            ? 'border-[#C4878A] bg-[#C4878A]/5'
                            : 'border-[#F3EFE8] bg-white hover:border-[#C4878A]/30 hover:shadow-[var(--shadow-subtle)]'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-[#7A3B5E] text-white' : 'bg-[#F3EFE8] text-[#4A4A5C]'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`font-medium block ${isSelected ? 'text-[#7A3B5E]' : 'text-[#2D2A33]'}`}>
                            {isRTL ? option.ar : option.en}
                          </span>
                          {option.desc && (
                            <span className="text-xs text-[#8E8E9F] mt-0.5 block leading-relaxed">
                              {isRTL ? option.descAr : option.desc}
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-6 h-6 rounded-full bg-[#C4878A] flex items-center justify-center"
                          >
                            <Check className="w-3.5 h-3.5 text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-[#C4878A]/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#7A3B5E]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                {isRTL ? 'توصياتنا لك' : 'Our Recommendations For You'}
              </h2>
              <p className="text-[#8E8E9F] mt-2">
                {isRTL ? 'بناءً على إجاباتك، نوصي بالخدمات التالية' : 'Based on your answers, we recommend these services'}
              </p>
            </div>

            <div className="space-y-4">
              {/* Start Here card for first-time users */}
              {startHere && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-[#7A3B5E]/5 to-[#C8A97D]/10 rounded-2xl p-6 border-2 border-dashed border-[#C8A97D]/40"
                >
                  <Badge variant="sage" size="sm" className="mb-3">
                    {isRTL ? 'ابدأ من هنا' : 'Start Here'}
                  </Badge>
                  <h3 className="text-lg font-bold text-[#2D2A33] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? startHere.nameAr : startHere.name}
                  </h3>
                  <p className="text-sm text-[#8E8E9F] mb-1">{isRTL ? startHere.shortDescAr : startHere.shortDesc}</p>
                  <p className="text-xs text-[#7A3B5E] font-medium mb-4">
                    {isRTL ? 'مثالي إذا كنت جديدًا على الاستشارة — بدون التزام' : 'Perfect if you\'re new to counseling — no commitment'}
                  </p>
                  <Badge variant="neutral" size="sm">{startHere.duration}</Badge>
                  <div className="flex gap-3 mt-5">
                    <Button as="a" href={getBookingUrl(locale as string, startHere.slug)} size="sm" icon={<Calendar className="w-4 h-4" />}>
                      {messages.services.bookOnline}
                    </Button>
                    <Button as="a" href={`/${locale}/services/${startHere.category}/${startHere.slug}`} variant="ghost" size="sm">
                      {messages.services.learnMore}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Main recommended services */}
              {recommendations.map((service, i) => {
                const sName = isRTL ? service.nameAr : service.name;
                const sDesc = isRTL ? service.shortDescAr : service.shortDesc;
                const delay = startHere ? (i + 1) * 0.15 : i * 0.15;
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay }}
                    className="bg-white rounded-2xl p-6 border border-[#F3EFE8] shadow-[var(--shadow-subtle)]"
                  >
                    {i === 0 && (
                      <Badge variant="sage" size="sm" className="mb-3">
                        {isRTL ? 'الأنسب لك' : 'Best Match'}
                      </Badge>
                    )}
                    <h3 className="text-lg font-bold text-[#2D2A33] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {sName}
                    </h3>
                    <p className="text-sm text-[#8E8E9F] mb-4">{sDesc}</p>
                    <Badge variant="neutral" size="sm">{service.duration}</Badge>
                    <div className="flex gap-3 mt-5">
                      <Button as="a" href={getBookingUrl(locale as string, service.slug)} size="sm" icon={<Calendar className="w-4 h-4" />}>
                        {messages.services.bookOnline}
                      </Button>
                      <Button
                        as="a"
                        href={`/${locale}/services/${service.category}/${service.slug}`}
                        variant="ghost"
                        size="sm"
                      >
                        {messages.services.learnMore}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Bonus experiential suggestion for flexible users */}
              {bonus && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (recommendations.length + (startHere ? 1 : 0)) * 0.15 }}
                  className="bg-[#F3EFE8]/60 rounded-2xl p-5 border border-[#E8E2D8]"
                >
                  <p className="text-xs font-semibold text-[#8E8E9F] uppercase tracking-wide mb-2">
                    {isRTL ? 'قد يعجبك أيضًا' : 'You might also like'}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {isRTL ? bonus.nameAr : bonus.name}
                      </h3>
                      <p className="text-sm text-[#8E8E9F] mt-0.5">{isRTL ? bonus.shortDescAr : bonus.shortDesc}</p>
                    </div>
                    <Button
                      as="a"
                      href={`/${locale}/services/${bonus.category}/${bonus.slug}`}
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0"
                    >
                      {messages.services.learnMore}
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="mt-10 text-center space-y-4">
              <button
                onClick={() => { setStep(0); setAnswers([]); setShowResults(false); }}
                className="text-sm text-[#7A3B5E] font-semibold hover:text-[#5E2D48] transition-colors"
              >
                {isRTL ? 'أعد الاختبار' : 'Retake Quiz'}
              </button>
              <p className="text-sm text-[#8E8E9F]">
                {isRTL ? 'أو' : 'or'}{' '}
                <a href="https://wa.me/16132222104" target="_blank" rel="noopener noreferrer" className="text-[#7A3B5E] font-medium hover:underline">
                  {messages.services.chatWhatsApp}
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
