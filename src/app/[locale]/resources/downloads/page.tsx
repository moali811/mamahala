'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface DownloadResource {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  type: 'guide' | 'worksheet' | 'ebook';
  category: 'families' | 'adults';
  price: number;
  isFree: boolean;
  isLeadMagnet: boolean;
}

const resources: DownloadResource[] = [
  {
    id: 'family-communication-toolkit',
    title: {
      en: 'Family Communication Toolkit',
      ar: 'مجموعة أدوات التواصل الأسري',
    },
    description: {
      en: 'A practical toolkit with conversation starters, active listening exercises, and family meeting templates.',
      ar: 'مجموعة أدوات عملية تتضمن بدايات محادثات وتمارين الاستماع الفعّال وقوالب اجتماعات الأسرة.',
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
      ar: 'ورقة عمل إدارة الغضب',
    },
    description: {
      en: 'A step-by-step worksheet to identify anger triggers, practice de-escalation techniques, and build healthier response patterns.',
      ar: 'ورقة عمل خطوة بخطوة لتحديد محفزات الغضب وممارسة تقنيات تهدئة التصعيد وبناء أنماط استجابة صحية.',
    },
    type: 'worksheet',
    category: 'adults',
    price: 0,
    isFree: true,
    isLeadMagnet: false,
  },
  {
    id: 'complete-parenting-guide',
    title: {
      en: 'Complete Parenting Guide',
      ar: 'الدليل الشامل للأبوة والأمومة',
    },
    description: {
      en: 'A comprehensive guide covering communication, discipline, emotional intelligence, and building resilient children.',
      ar: 'دليل شامل يغطي التواصل والانضباط والذكاء العاطفي وبناء أطفال أقوياء.',
    },
    type: 'ebook',
    category: 'families',
    price: 19.99,
    isFree: false,
    isLeadMagnet: false,
  },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  guide: FileText,
  worksheet: FileText,
  ebook: BookOpen,
};

const typeLabels: Record<string, { en: string; ar: string }> = {
  guide: { en: 'Guide', ar: 'دليل' },
  worksheet: { en: 'Worksheet', ar: 'ورقة عمل' },
  ebook: { en: 'E-Book', ar: 'كتاب إلكتروني' },
};

const categoryLabels: Record<string, { en: string; ar: string }> = {
  families: { en: 'Families', ar: 'العائلات' },
  adults: { en: 'Adults', ar: 'البالغون' },
};

export default function DownloadsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [emailInputs, setEmailInputs] = useState<Record<string, string>>({});

  const handleEmailChange = (id: string, value: string) => {
    setEmailInputs((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden gradient-sage">
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
            className="mt-8 max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'التحميلات' : 'Downloads'}
            </h1>
            <p className="mt-5 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed">
              {isRTL
                ? 'أدلة وأوراق عمل وأدوات مجانية ومدفوعة لدعم رحلتك'
                : 'Free and premium guides, worksheets, and tools to support your journey'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  DOWNLOADS GRID                                                  */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className={`mb-14 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {isRTL ? 'مكتبة الموارد' : 'Resource Library'}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A33] leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'الموارد المتاحة للتحميل' : 'Downloadable Resources'}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => {
              const title = isRTL ? resource.title.ar : resource.title.en;
              const description = isRTL ? resource.description.ar : resource.description.en;
              const typeLabel = isRTL ? typeLabels[resource.type].ar : typeLabels[resource.type].en;
              const categoryLabel = isRTL ? categoryLabels[resource.category].ar : categoryLabels[resource.category].en;
              const TypeIcon = typeIcons[resource.type] || FileText;
              const email = emailInputs[resource.id] || '';

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

                      {/* Price tag */}
                      <div className="absolute top-4 right-4">
                        {resource.isFree ? (
                          <Badge variant="success" size="md">
                            {messages.common.free}
                          </Badge>
                        ) : (
                          <Badge variant="sand" size="md">
                            <Lock className="w-3 h-3 mr-1" />
                            CAD ${resource.price.toFixed(2)}
                          </Badge>
                        )}
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
                        {resource.isFree ? (
                          /* Free resource: email capture */
                          <div className="space-y-3">
                            <p className="text-xs text-[#8E8E9F] font-medium">
                              {isRTL
                                ? 'أدخل بريدك الإلكتروني للتحميل'
                                : 'Enter your email to download'}
                            </p>
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F]" />
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => handleEmailChange(resource.id, e.target.value)}
                                  placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email'}
                                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#F3EFE8] bg-[#FAF7F2] text-[#2D2A33] placeholder-[#8E8E9F] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 focus:border-[#7A3B5E]/40 transition-all"
                                />
                              </div>
                              <Button
                                variant="primary"
                                size="sm"
                                icon={<Download className="w-4 h-4" />}
                              >
                                {messages.common.download}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          /* Paid resource: purchase button */
                          <div className="flex items-center justify-between">
                            <span
                              className="text-lg font-bold text-[#2D2A33]"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              CAD ${resource.price.toFixed(2)}
                            </span>
                            <Button
                              variant="plum"
                              size="md"
                              icon={<Lock className="w-4 h-4" />}
                            >
                              {isRTL ? 'شراء' : 'Purchase'}
                            </Button>
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

      {/* ================================================================ */}
      {/*  CTA                                                             */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-36 gradient-cta-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C8A97D]/[0.08] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-6">
              <Sparkles className="w-7 h-7 text-[#C8A97D]" />
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold !text-white leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.cta.ready}
            </h2>
            <p className="mt-6 text-lg lg:text-xl !text-white/80 leading-relaxed max-w-xl mx-auto">
              {messages.cta.readyDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button
                as="a"
                href={`/${locale}/book-a-session`}
                variant="secondary"
                size="lg"
                icon={<Calendar className="w-5 h-5" />}
                className="!bg-white !text-[#7A3B5E] hover:!bg-[#F3EFE8]"
              >
                {messages.cta.bookNow}
              </Button>
              <Button
                as="a"
                href="https://wa.me/16132222104"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
                className="!border-white/30 !text-white hover:!bg-white/10"
              >
                {messages.cta.whatsapp}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
