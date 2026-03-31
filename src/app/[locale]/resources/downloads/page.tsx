'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  BookOpen,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  MessageCircle,
  Mail,
  Check,
  Unlock,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';

interface DownloadResource {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  type: 'guide' | 'worksheet' | 'ebook' | 'checklist';
  category: 'families' | 'adults' | 'youth' | 'couples';
  price: number;
  isFree: boolean;
  isLeadMagnet: boolean;
}

const resources: DownloadResource[] = [
  // ─── FREE RESOURCES (Lead Magnets) ───
  {
    id: 'family-communication-toolkit',
    title: {
      en: 'Family Communication Toolkit',
      ar: 'مجموعةُ أدواتِ التواصلِ الأُسريّ',
    },
    description: {
      en: '12 conversation starters, active listening exercises, and a weekly family meeting template. Transform how your family connects.',
      ar: '12 بدايةَ محادثة، وتمارينُ الاستماعِ الفعّال، وقالبُ اجتماعٍ أسريٍّ أسبوعيّ. غيِّرْ طريقةَ تواصلِ عائلتِك.',
    },
    type: 'guide',
    category: 'families',
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'anger-management-worksheet',
    title: {
      en: 'Anger Management Worksheet',
      ar: 'ورقةُ عملِ إدارةِ الغضب',
    },
    description: {
      en: 'Identify your triggers, map your anger cycle, and practice 5 proven de-escalation techniques. Based on CBT principles.',
      ar: 'حدِّدْ محفِّزاتِك، وارسُمْ دورةَ غضبِك، ومارِسْ 5 تقنياتِ تهدئةٍ مُثبَتة. مبنيّةٌ على مبادئِ العلاجِ المعرفيِّ السلوكيّ.',
    },
    type: 'worksheet',
    category: 'adults',
    price: 0,
    isFree: true,
    isLeadMagnet: false,
  },
  {
    id: 'calm-parent-checklist',
    title: {
      en: 'The Calm Parent Checklist',
      ar: 'قائمةُ الوالدِ الهادئ',
    },
    description: {
      en: 'A daily checklist of 10 micro-practices that help you stay grounded when parenting feels overwhelming. Print it, stick it on your fridge.',
      ar: 'قائمةٌ يوميّة من 10 ممارساتٍ مصغّرة تساعدُك على البقاءِ متماسكًا عندما تشعرُ بأنّ الأبوّة مُرهِقة. اطبَعْها وعلِّقها على ثلّاجتِك.',
    },
    type: 'checklist',
    category: 'families',
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'understanding-your-teen',
    title: {
      en: "Understanding Your Teen's Inner World",
      ar: 'فَهْمُ العالمِ الداخليِّ لمراهقِك',
    },
    description: {
      en: 'A parent\'s guide to the teenage brain: why they act the way they do, what they need from you, and how to stay connected through the storm.',
      ar: 'دليلُ الوالدين لدماغِ المراهق: لماذا يتصرّفون هكذا، وماذا يحتاجون منك، وكيفَ تبقى متواصلًا خلالَ العاصفة.',
    },
    type: 'guide',
    category: 'youth',
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'self-care-assessment',
    title: {
      en: 'Self-Care Assessment & Planning Guide',
      ar: 'دليلُ تقييمِ الرعايةِ الذاتيّةِ والتخطيط',
    },
    description: {
      en: 'Assess your current self-care across 6 dimensions (emotional, physical, social, spiritual, professional, intellectual) and create a personalized plan.',
      ar: 'قيِّمْ رعايتَك الذاتيّةَ الحاليّة عبر 6 أبعاد (عاطفيّ، جسديّ، اجتماعيّ، روحيّ، مهنيّ، فكريّ) وأنشِئْ خطّةً شخصيّة.',
    },
    type: 'worksheet',
    category: 'adults',
    price: 0,
    isFree: true,
    isLeadMagnet: false,
  },
  // ─── PREMIUM RESOURCES ───
  {
    id: 'complete-parenting-guide',
    title: {
      en: 'The Intentional Parent: A Complete Guide',
      ar: 'الوالدُ الواعي: دليلٌ شامل',
    },
    description: {
      en: '80+ pages covering attachment-based discipline, emotional coaching, screen time strategies, and building resilient children. Includes worksheets and reflection exercises.',
      ar: 'أكثرُ من 80 صفحة تغطّي الانضباطَ القائمَ على التعلُّق، والتدريبَ العاطفيّ، واستراتيجيّاتِ وقتِ الشاشة، وبناءَ أطفالٍ أقوياء. يتضمّنُ أوراقَ عملٍ وتمارينَ تأمُّل.',
    },
    type: 'ebook',
    category: 'families',
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'couples-communication-workbook',
    title: {
      en: 'Couples Communication Workbook',
      ar: 'دفترُ عملِ التواصلِ للأزواج',
    },
    description: {
      en: '30 structured exercises to rebuild dialogue, resolve recurring conflicts, and deepen emotional intimacy. Designed for couples to work through together.',
      ar: '30 تمرينًا مُنظَّمًا لإعادةِ بناءِ الحوار، وحلِّ النزاعاتِ المتكرِّرة، وتعميقِ الحميميّةِ العاطفيّة. مصمَّمٌ ليعملَ الأزواجُ من خلالِه معًا.',
    },
    type: 'ebook',
    category: 'couples',
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'anxiety-recovery-journal',
    title: {
      en: 'The Anxiety Recovery Journal',
      ar: 'يوميّاتُ التعافي من القلق',
    },
    description: {
      en: '90-day guided journal combining CBT techniques, gratitude practices, and thought-reframing exercises. Your daily companion on the path to calm.',
      ar: 'يوميّاتٌ مُوجَّهة لمدّة 90 يومًا تجمعُ بين تقنيّاتِ العلاجِ المعرفيِّ السلوكيّ، وممارساتِ الامتنان، وتمارينِ إعادةِ صياغةِ الأفكار. رفيقُك اليوميُّ على طريقِ الهدوء.',
    },
    type: 'ebook',
    category: 'adults',
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  guide: FileText,
  worksheet: FileText,
  ebook: BookOpen,
  checklist: FileText,
};

const typeLabels: Record<string, { en: string; ar: string }> = {
  guide: { en: 'Guide', ar: 'دليل' },
  worksheet: { en: 'Worksheet', ar: 'ورقة عمل' },
  ebook: { en: 'E-Book', ar: 'كتاب إلكتروني' },
  checklist: { en: 'Checklist', ar: 'قائمة' },
};

const categoryLabels: Record<string, { en: string; ar: string }> = {
  families: { en: 'Families', ar: 'العائلات' },
  adults: { en: 'Adults', ar: 'البالغون' },
  youth: { en: 'Youth', ar: 'الناشئة' },
  couples: { en: 'Couples', ar: 'الأزواج' },
};

export default function DownloadsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // One email unlocks all toolkits
  const [unlockedEmail, setUnlockedEmail] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockEmail, setUnlockEmail] = useState('');
  const [unlockStatus, setUnlockStatus] = useState<'idle' | 'loading' | 'invalid'>('idle');
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());

  // Check localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mh_toolkit_email');
    if (saved) {
      setUnlockedEmail(saved);
      setIsUnlocked(true);
    }
    const downloaded = localStorage.getItem('mh_toolkit_downloaded');
    if (downloaded) {
      setDownloadedIds(new Set(JSON.parse(downloaded)));
    }
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(unlockEmail)) {
      setUnlockStatus('invalid');
      return;
    }
    setUnlockStatus('loading');
    try {
      await fetch('/api/toolkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: unlockEmail, toolkitId: 'unlock-all', locale }),
      });
    } catch { /* still unlock locally */ }
    localStorage.setItem('mh_toolkit_email', unlockEmail);
    setUnlockedEmail(unlockEmail);
    setIsUnlocked(true);
    setUnlockStatus('idle');
  };

  const handleDownload = async (id: string) => {
    // Track the download
    try {
      await fetch('/api/toolkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: unlockedEmail, toolkitId: id, locale }),
      });
    } catch { /* non-blocking */ }
    // Mark as downloaded
    const newDownloaded = new Set(downloadedIds);
    newDownloaded.add(id);
    setDownloadedIds(newDownloaded);
    localStorage.setItem('mh_toolkit_downloaded', JSON.stringify([...newDownloaded]));
    // Open the correct language PDF
    const pdfPath = isRTL ? `/toolkits/pdf/ar/${id}.pdf` : `/toolkits/pdf/${id}.pdf`;
    window.open(pdfPath, '_blank');
  };

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden gradient-sage">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C4878A]/[0.04] blur-[80px]" />
          <div className="absolute bottom-10 left-[10%] w-[300px] h-[300px] rounded-full bg-[#C8A97D]/[0.06] blur-[60px]" />
        </div>

        <div className="container-main relative z-10">
          <Breadcrumb
            locale={locale}
            items={[
              { label: messages.nav.home, href: `/${locale}` },
              { label: messages.nav.resources, href: `/${locale}/resources` },
              { label: messages.nav.downloads },
            ]}
          />

          <motion.div
            className={`mt-8 max-w-3xl ${isRTL ? 'text-right' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'أدواتُك المجّانيّة' : 'Your Free Toolkit'}
            </h1>
            <p className="mt-5 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed">
              {isRTL
                ? 'أوراقُ عملٍ وأدلّةٌ وأدواتٌ عمليّةٌ لدعمِ مسيرتِك — ابدأْ اليوم.'
                : 'Worksheets, guides, and practical tools to support your journey — start today.'}
            </p>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  DOWNLOADS GRID                                                  */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2]">
        <div className="container-main">

          {/* Unlock banner */}
          {!isUnlocked ? (
            <ScrollReveal className="mb-12">
              <div className="bg-white rounded-2xl border border-[#F3EFE8] p-8 md:p-10 max-w-2xl mx-auto text-center shadow-sm">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#7A3B5E]/8 mb-5">
                  <Lock className="w-7 h-7 text-[#7A3B5E]" />
                </div>
                <h3 className="text-xl font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {isRTL ? 'افتحْ جميعَ الأدواتِ المجّانيّة' : 'Unlock All Free Tools'}
                </h3>
                <p className="text-sm text-[#8E8E9F] mb-6">
                  {isRTL
                    ? 'أدخِلْ بريدَك الإلكترونيّ مرّةً واحدةً لفتحِ جميعِ الأدواتِ والتحميلِ فورًا.'
                    : 'Enter your email once to unlock all toolkits and download instantly.'}
                </p>
                <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F]`} />
                    <input
                      type="email"
                      value={unlockEmail}
                      onChange={(e) => { setUnlockEmail(e.target.value); setUnlockStatus('idle'); }}
                      placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email address'}
                      className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 text-[16px] sm:text-sm rounded-xl border border-[#F3EFE8] bg-[#FAF7F2] text-[#2D2A33] placeholder-[#8E8E9F] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={unlockStatus === 'loading'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7A3B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#5E2D48] transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    <Unlock className="w-4 h-4" />
                    {unlockStatus === 'loading'
                      ? (isRTL ? 'جارٍ...' : 'Unlocking...')
                      : (isRTL ? 'افتحْ الكلّ' : 'Unlock All')}
                  </button>
                </form>
                {unlockStatus === 'invalid' && (
                  <p className="text-xs text-[#C8A97D] mt-3">{isRTL ? 'يرجى إدخالُ بريدٍ إلكترونيٍّ صحيح.' : 'Please enter a valid email address.'}</p>
                )}
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal className="mb-8">
              <div className="flex items-center justify-center gap-2 text-sm text-[#5A8B6E] font-medium">
                <Check className="w-4 h-4" />
                {isRTL ? `مرحبًا! جميعُ الأدواتِ مفتوحةٌ لك.` : `Welcome! All toolkits are unlocked for you.`}
              </div>
            </ScrollReveal>
          )}

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => {
              const title = isRTL ? resource.title.ar : resource.title.en;
              const description = isRTL ? resource.description.ar : resource.description.en;
              const typeLabel = isRTL ? typeLabels[resource.type].ar : typeLabels[resource.type].en;
              const categoryLabel = isRTL ? categoryLabels[resource.category].ar : categoryLabels[resource.category].en;
              const TypeIcon = typeIcons[resource.type] || FileText;

              return (
                <StaggerChild key={resource.id}>
                  <motion.div
                    className="group relative bg-white rounded-2xl overflow-hidden border border-[#F3EFE8] hover:border-[#C4878A]/20 transition-all duration-300 h-full flex flex-col"
                    whileHover={{ y: -6, boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Top accent + icon area */}
                    <div className="relative bg-gradient-to-br from-[#F3EFE8] to-[#FAF7F2] p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-4">
                        <TypeIcon className="w-7 h-7 text-[#7A3B5E]" />
                      </div>

                      {/* Free badge */}
                      <div className="absolute top-4 right-4">
                        <Badge variant="success" size="md">
                          {messages.common.free}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Type + category badges */}
                      <div className="flex items-center flex-wrap gap-2 mb-4">
                        <Badge variant="sage" size="sm">
                          {typeLabel}
                        </Badge>
                        <Badge variant="neutral" size="sm">
                          {categoryLabel}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-lg font-bold text-[#2D2A33] mb-3 group-hover:text-[#7A3B5E] transition-colors duration-200"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#4A4A5C] leading-relaxed mb-6 flex-1">
                        {description}
                      </p>

                      {/* Action area */}
                      <div className="pt-5 border-t border-[#F3EFE8]">
                        {isUnlocked ? (
                          <button
                            onClick={() => handleDownload(resource.id)}
                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#7A3B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#5E2D48] transition-colors"
                          >
                            {downloadedIds.has(resource.id) ? (
                              <>
                                <Check className="w-4 h-4" />
                                {isRTL ? 'حمِّلْ مرّة أخرى' : 'Download Again'}
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                {isRTL ? 'حمِّلْ مجّانًا' : 'Download Free'}
                              </>
                            )}
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-[#8E8E9F]">
                            <Lock className="w-4 h-4" />
                            {isRTL ? 'أدخِلْ بريدَك أعلاه لفتح جميع الأدوات' : 'Enter your email above to unlock all tools'}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </StaggerChild>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={<>You've Taken the First Step — Keep <span className="text-[#7A3B5E] italic">Going</span></>}
        headingAr={<>خطوتُك الأولى بدأت — <span className="text-[#7A3B5E] italic">واصِلْ</span></>}
        primaryTextEn="Get Personal Support"
        primaryTextAr="احصلْ على دعمٍ شخصيّ"
        secondaryTextEn="I Have Questions"
        secondaryTextAr="لديّ أسئلة"
      />
    </div>
  );
}
