'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  CalendarDays,
  Download,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const resourceTypes = [
  { key: 'blog', icon: BookOpen, color: '#2B5F4E', bgColor: '#2B5F4E' },
  { key: 'programs', icon: GraduationCap, color: '#7A3B5E', bgColor: '#7A3B5E' },
  { key: 'events', icon: CalendarDays, color: '#C8A97D', bgColor: '#C8A97D' },
  { key: 'downloads', icon: Download, color: '#4A4A5C', bgColor: '#4A4A5C' },
  { key: 'faqs', icon: HelpCircle, color: '#2B5F4E', bgColor: '#2B5F4E' },
] as const;

export default function ResourcesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const descKeys: Record<string, string> = {
    blog: messages.resources.blogDesc,
    programs: messages.resources.programsDesc,
    events: messages.resources.eventsDesc,
    downloads: messages.resources.downloadsDesc,
    faqs: messages.resources.faqsDesc,
  };

  const titleKeys: Record<string, string> = {
    blog: messages.resources.blog,
    programs: messages.resources.programs,
    events: messages.resources.events,
    downloads: messages.resources.downloads,
    faqs: messages.resources.faqs,
  };

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B5F4E] via-[#2B5F4E] to-[#1E4A3B]" />
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-[400px] h-[400px] rounded-full bg-white/[0.04] blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] rounded-full bg-[#C8A97D]/[0.08] blur-[80px]" />
        </div>
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Breadcrumb
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.resources.pageTitle },
              ]}
              locale={locale}
              light
            />
          </motion.div>

          <motion.div
            className="mt-10 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-4"
            >
              {isRTL ? 'مكتبة الموارد' : 'Resource Library'}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.resources.pageTitle}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg lg:text-xl text-white/75 max-w-2xl leading-relaxed"
            >
              {messages.resources.subtitle}
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 55 1440 60V60H0Z"
              fill="#FAF7F2"
            />
          </svg>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  RESOURCE TYPE CARDS                                             */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-[#FAF7F2]">
        <div className="container-main">
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceTypes.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <StaggerChild key={resource.key}>
                  <Link href={`/${locale}/resources/${resource.key}`}>
                    <motion.div
                      className="group relative bg-white rounded-3xl p-8 lg:p-10 h-full border border-transparent hover:border-[#2B5F4E]/10 transition-all duration-300 cursor-pointer"
                      whileHover={{
                        y: -4,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                      }}
                    >
                      {/* Number accent */}
                      <span
                        className="absolute top-6 right-6 text-5xl font-bold text-[#2B5F4E]/[0.04]"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300"
                        style={{ backgroundColor: `${resource.bgColor}15` }}
                      >
                        <IconComponent
                          className="w-6 h-6 transition-colors duration-300"
                          style={{ color: resource.color }}
                        />
                      </div>

                      <h3
                        className="text-xl font-bold text-[#1E1E2A] mb-3"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {titleKeys[resource.key]}
                      </h3>
                      <p className="text-sm text-[#8E8E9F] leading-relaxed mb-6">
                        {descKeys[resource.key]}
                      </p>

                      {/* Arrow link */}
                      <div className="flex items-center gap-2 text-[#2B5F4E] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>{isRTL ? 'استكشف' : 'Explore'}</span>
                        <Arrow className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </Link>
                </StaggerChild>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CTA                                                             */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B5F4E] via-[#234F40] to-[#1A3D30]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C8A97D]/[0.08] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.1, duration: 0.5, ease }}
            >
              <Sparkles className="w-4 h-4 text-[#C8A97D]" />
              <span className="text-sm text-white/80 font-medium">
                {isRTL ? 'هل لديك سؤال؟' : 'Have a Question?'}
              </span>
            </motion.div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.cta.ready}
            </h2>
            <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl mx-auto">
              {messages.cta.readyDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button
                as="a"
                href={`/${locale}/contact`}
                variant="secondary"
                size="lg"
                className="!bg-white !text-[#2B5F4E] hover:!bg-[#F3EFE8]"
              >
                {messages.contact.pageTitle}
              </Button>
              <Button
                as="a"
                href={`/${locale}/book-a-session`}
                variant="outline"
                size="lg"
                className="!border-white/30 !text-white hover:!bg-white/10"
              >
                {messages.cta.bookNow}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
