'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Calendar, MessageCircle, Sparkles,
  GraduationCap, Users, User, Heart, Leaf, Clock, HelpCircle, Sprout, Smile, TreePine,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { serviceCategories, getServicesByCategory, getCategoryInfo } from '@/data/services';
import { getTestimonialsByCategory } from '@/data/testimonials';
import type { ServiceCategory } from '@/types';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';
import ContextualFAQ from '@/components/ui/ContextualFAQ';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Users, User, Heart, Leaf, Sparkles, Sprout, Smile, TreePine,
};

// Stock photos mapped to service slugs for visual storytelling
const serviceImages: Record<string, string> = {
  'teen-behavioral-coaching': '/images/services/teen-behavioral.jpg',
  'social-confidence-friendship': '/images/services/social-confidence.jpg',
  'under-18-counseling': '/images/services/under18-counseling.jpg',
  'supporting-children-through-change': '/images/services/child-big-change.jpg',
  'cbt-youth': '/images/services/teen-emotional.jpg',
  'bullying-support': '/images/services/bullying-support.jpg',
  'managing-big-emotions': '/images/services/managing-emotions.jpg',
  'family-relationship-strengthening': '/images/services/family-strengthening.jpg',
  'parenting-coaching': '/images/services/parenting-coaching.jpg',
  'tackling-child-tantrums': '/images/services/child-tantrums.jpg',
  'parental-stress-wellbeing': '/images/services/parental-wellbeing.jpg',
  'anxiety-counseling': '/images/services/anxiety-counseling.jpg',
  'anger-management': '/images/services/anger-management.jpg',
  'university-student-session': '/images/service-students.jpg',
  'adhd-executive-function-coaching': '/images/services/adhd-coaching.jpg',
  'lifestyle-coaching': '/images/services/lifestyle-coaching.jpg',
  'life-coaching': '/images/services/life-coaching.jpg',
  'self-development-coaching': '/images/services/self-development.jpg',
  'pre-marital-education': '/images/services/premarital.jpg',
  'couples-counseling': '/images/services/couple-counseling.jpg',
  'horticultural-plant-therapy': '/images/services/plant-therapy.jpg',
  'walk-and-talk': '/images/services/walk-talk-therapy.jpg',
};

// Category accent colors
const categoryAccents: Record<string, string> = {
  youth: '#C4878A',
  families: '#7A3B5E',
  adults: '#C8A97D',
  couples: '#D4836A',
  experiential: '#5A8A6E',
};

// Scenario-based "Help Me Choose" per category
const categoryScenarios: Record<string, { en: string; ar: string; slug: string }[]> = {
  youth: [
    { en: 'My teen is acting out or rebellious', ar: 'ابني المراهق يتصرف بتمرد', slug: 'teen-behavioral-coaching' },
    { en: 'My child is being bullied', ar: 'طفلي يتعرض للتنمر', slug: 'bullying-support' },
    { en: 'My child struggles with big emotions', ar: 'طفلي يعاني من مشاعر قوية', slug: 'managing-big-emotions' },
    { en: 'We\'re going through a family change', ar: 'نمر بتغيير عائلي', slug: 'supporting-children-through-change' },
    { en: 'My teen lacks confidence socially', ar: 'ابني يفتقر للثقة الاجتماعية', slug: 'social-confidence-friendship' },
    { en: 'I need general support for my child', ar: 'أحتاج دعمًا عامًا لطفلي', slug: 'under-18-counseling' },
  ],
  families: [
    { en: 'We\'re struggling to communicate', ar: 'نعاني من صعوبة في التواصل', slug: 'family-relationship-strengthening' },
    { en: 'I need parenting guidance', ar: 'أحتاج توجيهًا في التربية', slug: 'parenting-coaching' },
    { en: 'My child has frequent tantrums', ar: 'طفلي يعاني من نوبات غضب متكررة', slug: 'tackling-child-tantrums' },
    { en: 'I\'m overwhelmed as a parent', ar: 'أشعر بالإرهاق كأم/أب', slug: 'parental-stress-wellbeing' },
  ],
  adults: [
    { en: 'I\'m dealing with anxiety or worry', ar: 'أعاني من القلق والتوتر', slug: 'anxiety-counseling' },
    { en: 'I struggle with anger', ar: 'أعاني من مشاكل الغضب', slug: 'anger-management' },
    { en: 'I have trouble focusing (ADHD)', ar: 'أعاني من صعوبة التركيز', slug: 'adhd-executive-function-coaching' },
    { en: 'I want to improve my lifestyle', ar: 'أريد تحسين نمط حياتي', slug: 'lifestyle-coaching' },
    { en: 'I\'m at a crossroads in life', ar: 'أنا في مفترق طرق', slug: 'self-development-coaching' },
    { en: 'I\'m a university student needing support', ar: 'أنا طالب جامعي أحتاج دعمًا', slug: 'university-student-session' },
  ],
  couples: [
    { en: 'We\'re getting married soon', ar: 'نحن مقبلون على الزواج', slug: 'pre-marital-education' },
    { en: 'Our relationship needs help', ar: 'علاقتنا تحتاج مساعدة', slug: 'couples-counseling' },
  ],
  experiential: [
    { en: 'I prefer therapy outdoors', ar: 'أفضل العلاج في الهواء الطلق', slug: 'walk-and-talk' },
    { en: 'I find peace in nature & plants', ar: 'أجد السلام في الطبيعة والنباتات', slug: 'horticultural-plant-therapy' },
  ],
};

export default function ServiceCategoryPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const category = params?.category as ServiceCategory;
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const catInfo = getCategoryInfo(category);
  const services = getServicesByCategory(category);
  const categoryTestimonials = getTestimonialsByCategory(category);

  if (!catInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#8E8E9F]">Category not found</p>
      </div>
    );
  }

  const name = isRTL ? catInfo.nameAr : catInfo.name;
  const subtitle = isRTL ? catInfo.subtitleAr : catInfo.subtitle;
  const description = isRTL ? catInfo.descriptionAr : catInfo.description;
  const IconComponent = iconMap[catInfo.icon] || Users;
  const accent = categoryAccents[category] || '#C8A97D';

  const getWhatsAppLink = (serviceName: string) => {
    const msg = encodeURIComponent(
      isRTL
        ? `مرحبا، أود حجز جلسة: ${serviceName}`
        : `Hi, I would like to book a session: ${serviceName}`
    );
    return `https://wa.me/16132222104?text=${msg}`;
  };

  return (
    <div className="bg-[#FAF7F2]">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#C4878A]/8 hidden lg:block blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C8A97D]/30 hidden lg:block blur-3xl" />
        </div>
        <div className="container-main relative pt-24 pb-16 md:pt-28 md:pb-20">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb
              locale={locale}
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.nav.services, href: `/${locale}/services` },
                { label: name },
              ]}
            />
          </motion.div>
          <motion.div
            className={`mt-6 flex items-center gap-4 ${isRTL ? 'text-right' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${accent}15` }}
            >
              <IconComponent className="w-7 h-7 text-[#C8A97D]" />
            </div>
            <div>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {name}
              </h1>
              <p className="text-[#6B6580] mt-1">{subtitle}</p>
            </div>
          </motion.div>
          <motion.p
            className={`text-[#4A4A5C] max-w-2xl mt-6 text-lg leading-relaxed ${isRTL ? 'text-right' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>


      {/* ─── HELP ME CHOOSE ─── */}
      {(categoryScenarios[category]?.length ?? 0) > 2 && (
        <section className="pt-10 pb-0 bg-[#FAF7F2]">
          <div className="container-main">
            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <HelpCircle className="w-5 h-5" style={{ color: accent }} />
                  <h3 className="text-lg font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? 'ساعِدْني في الاختيار' : 'Help Me Choose'}
                  </h3>
                </div>
                <p className={`text-sm text-[#6B6580] mb-5 ${isRTL ? 'text-right' : ''}`}>
                  {isRTL ? 'اختَرْ ما يصفُ وضعَك وسنوجّهُك للخدمة المناسبة:' : 'Select what best describes your situation:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {categoryScenarios[category]?.map((scenario) => (
                    <button
                      key={scenario.slug}
                      onClick={() => {
                        const el = document.getElementById(`service-${scenario.slug}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          el.classList.add('ring-2', 'ring-offset-2');
                          el.style.setProperty('--tw-ring-color', accent);
                          setTimeout(() => el.classList.remove('ring-2', 'ring-offset-2'), 2000);
                        }
                      }}
                      className="px-4 py-2.5 rounded-full text-sm font-medium border border-[#F3EFE8] text-[#4A4A5C] hover:text-white transition-all duration-200"
                      style={{ ['--hover-bg' as string]: accent }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = accent; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '#4A4A5C'; e.currentTarget.style.borderColor = ''; }}
                    >
                      {isRTL ? scenario.ar : scenario.en}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── SERVICES: Alternating visual sections ─── */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          {services.map((service, i) => {
            const sName = isRTL ? service.nameAr : service.name;
            const sDesc = isRTL ? service.descriptionAr : service.description;
            const sShort = isRTL ? service.shortDescAr : service.shortDesc;
            const imgSrc = serviceImages[service.slug] || '/images/hala-consultation.png';
            const isEven = i % 2 === 0;

            return (
              <ScrollReveal key={service.slug}>
                <div id={`service-${service.slug}`} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 lg:gap-0 mb-12 lg:mb-20 bg-white rounded-3xl overflow-hidden border border-[#F3EFE8] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500`}>
                  {/* Image */}
                  <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto lg:min-h-[400px]">
                    <Image
                      src={imgSrc}
                      alt={sName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Gradient overlay for text readability on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent lg:hidden" />
                  </div>

                  {/* Content */}
                  <div className={`w-full lg:w-1/2 p-8 sm:p-10 lg:p-12 flex flex-col justify-center ${isRTL ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-3 mb-4`}>
                      <span
                        className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${accent}12`, color: accent }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-[#8E8E9F]">
                        <Clock className="w-3 h-3" />
                        {service.duration}
                        <span className="mx-1">·</span>
                        {service.priceFrom === 0 ? (
                          <span className="text-[#5A8B6F] font-medium">{isRTL ? 'مجّانيّة' : 'Free'}</span>
                        ) : (
                          <span>{isRTL ? `من ${service.priceFrom}$ كندي` : `From $${service.priceFrom}`}</span>
                        )}
                      </div>
                    </div>

                    <h3
                      className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-3 leading-snug"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {sName}
                    </h3>

                    <p className="text-[#6B6580] leading-relaxed mb-8 line-clamp-3">
                      {sShort || sDesc}
                    </p>

                    <div>
                      <Link
                        href={`/${locale}/services/${category}/${service.slug}`}
                        className={`inline-flex items-center gap-2 text-sm font-semibold text-[#7A3B5E] hover:text-[#5A2D47] transition-colors group`}
                      >
                        {messages.services.learnMore}
                        <ArrowIcon className={`w-4 h-4 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          <ScrollReveal className="text-center">
            <p className="text-xs text-[#8E8E9F] italic">{messages.services.priceDisclaimer}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      {categoryTestimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-main">
            <ScrollReveal className="text-center mb-12">
              <h2
                className="text-2xl md:text-3xl font-bold text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {messages.testimonials.sectionTitle}
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {categoryTestimonials.slice(0, 4).map((t) => (
                <ScrollReveal key={t.id}>
                  <div className="glass-card rounded-2xl p-8">
                    <p className="text-[#4A4A5C] italic leading-relaxed mb-4">
                      &ldquo;{isRTL ? t.textAr : t.text}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold text-[#7A3B5E]">{t.name}</p>
                      <p className="text-xs text-[#8E8E9F]">{isRTL ? t.roleAr : t.role}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CONTEXTUAL FAQs ─── */}
      {(() => {
        const categoryFaqs = services.flatMap((s) => s.faqs).slice(0, 4);
        return categoryFaqs.length > 0 ? (
          <ContextualFAQ faqs={categoryFaqs} locale={locale} />
        ) : null;
      })()}

      {/* ─── RELATED CATEGORIES ─── */}
      <section className="py-16 bg-[#F3EFE8]">
        <div className="container-main">
          <ScrollReveal className="mb-8">
            <h3 className={`text-xl font-bold text-[#2D2A33] ${isRTL ? 'text-right' : ''}`} style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'استكشِفْ خدماتٍ أخرى' : 'Explore Other Services'}
            </h3>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {serviceCategories
              .filter((c) => c.key !== category)
              .map((c) => (
                <Link
                  key={c.key}
                  href={`/${locale}/services/${c.key}`}
                  className="px-5 py-2.5 rounded-full bg-white text-sm font-medium text-[#4A4A5C] hover:text-[#7A3B5E] hover:shadow-[var(--shadow-subtle)] transition-all"
                >
                  {isRTL ? c.nameAr : c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={
          category === 'youth' ? <>Every Child Deserves to <span className="text-[#7A3B5E] italic">Thrive</span></> :
          category === 'families' ? <>Stronger Families Start <span className="text-[#7A3B5E] italic">Here</span></> :
          category === 'adults' ? <>Your Well-being <span className="text-[#7A3B5E] italic">Matters</span></> :
          category === 'couples' ? <>Love Deserves <span className="text-[#7A3B5E] italic">Effort</span></> :
          <>Experience Something <span className="text-[#7A3B5E] italic">Different</span></>
        }
        headingAr={
          category === 'youth' ? <>كلُّ طفلٍ يستحقُّ أن <span className="text-[#7A3B5E] italic">يزدهِر</span></> :
          category === 'families' ? <>الأُسَرُ الأقوى تبدأُ من <span className="text-[#7A3B5E] italic">هنا</span></> :
          category === 'adults' ? <>عافيتُك <span className="text-[#7A3B5E] italic">تهمّ</span></> :
          category === 'couples' ? <>الحبُّ يستحقُّ <span className="text-[#7A3B5E] italic">الجهد</span></> :
          <>جرِّبْ شيئًا <span className="text-[#7A3B5E] italic">مختلفًا</span></>
        }
      />
    </div>
  );
}
