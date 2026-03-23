'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Users,
  User,
  Heart,
  Leaf,
  Phone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { serviceCategories, getServiceCountByCategory } from '@/data/services';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Users,
  User,
  Heart,
  Leaf,
};

export default function ServicesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  SECTION 1: HERO                                                */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden gradient-sage">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-white/[0.04] blur-[80px]" />
          <div className="absolute bottom-10 left-[10%] w-[300px] h-[300px] rounded-full bg-[#C8A97D]/[0.06] blur-[60px]" />
        </div>

        <div className="container-main relative z-10">
          <Breadcrumb
            locale={locale}
            light
            items={[
              { label: messages.nav.home, href: `/${locale}` },
              { label: messages.nav.services },
            ]}
          />

          <motion.div
            className="mt-8 max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.services.pageTitle}
            </h1>
            <p className="mt-5 text-lg lg:text-xl text-white/75 max-w-2xl leading-relaxed">
              {messages.services.pageSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 2: START HERE CTA                                      */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal>
            <motion.div
              className="relative rounded-3xl overflow-hidden border border-[#C8A97D]/30 bg-white"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient accent border top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B5696B] via-[#C8A97D] to-[#7A3B5E]" />

              <div className="p-8 sm:p-10 lg:p-14">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className={`flex items-start gap-5 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    {/* Icon */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B5696B] to-[#9E5558] flex items-center justify-center shadow-lg shadow-[#B5696B]/20">
                      <Phone className="w-7 h-7 text-white" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h2
                          className="text-2xl sm:text-3xl font-bold text-[#2D2A33]"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {messages.services.startHere}
                        </h2>
                        <Badge variant="sand" size="md">
                          {isRTL ? 'من 100 دولار كندي' : 'From CAD $100'}
                        </Badge>
                      </div>
                      <p className="text-[#4A4A5C] leading-relaxed max-w-xl">
                        {messages.services.startHereDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <Button
                      as="a"
                      href={`/${locale}/book-a-session`}
                      size="lg"
                      icon={<Calendar className="w-5 h-5" />}
                    >
                      {messages.cta.bookNow}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 3: SERVICE CATEGORIES GRID                             */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-main">
          <ScrollReveal className={`mb-14 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {messages.nav.services}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A33] leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.services.pageTitle}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {serviceCategories.map((cat) => {
              const IconComponent = iconMap[cat.icon] || Users;
              const name = isRTL ? cat.nameAr : cat.name;
              const subtitle = isRTL ? cat.subtitleAr : cat.subtitle;
              const serviceCount = getServiceCountByCategory(cat.key);

              return (
                <StaggerChild key={cat.key}>
                  <Link href={`/${locale}/services/${cat.key}`} className="block h-full">
                    <motion.div
                      className="group relative bg-white rounded-2xl overflow-hidden border border-[#F3EFE8] hover:border-[#B5696B]/20 transition-all duration-300 h-full flex flex-col"
                      whileHover={{ y: -6, boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={cat.image}
                          alt={name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                        {/* Icon badge */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <div
                            className="w-11 h-11 rounded-xl backdrop-blur-md flex items-center justify-center"
                            style={{ backgroundColor: `${cat.color}CC` }}
                          >
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>

                          {/* Service count badge */}
                          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
                            {serviceCount} {messages.services.serviceCount}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3
                          className="text-lg font-bold text-[#2D2A33] mb-2 group-hover:text-[#B5696B] transition-colors duration-200"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {name}
                        </h3>
                        <p className="text-sm text-[#8E8E9F] leading-relaxed flex-1">
                          {subtitle}
                        </p>

                        {/* Learn More link */}
                        <div className={`mt-5 flex items-center gap-1.5 text-[#B5696B] text-sm font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>{messages.services.learnMore}</span>
                          <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
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
      {/*  SECTION 4: QUIZ CTA                                            */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#7A3B5E]/10 mb-5">
              <Sparkles className="w-7 h-7 text-[#7A3B5E]" />
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.booking.notSure}
            </h2>
            <p className="text-[#4A4A5C] leading-relaxed mb-8 max-w-lg mx-auto">
              {isRTL
                ? 'أجب عن بعض الأسئلة البسيطة وسنوجهك إلى الخدمة الأنسب لاحتياجاتك'
                : 'Answer a few simple questions and we will guide you to the service that best fits your needs'}
            </p>
            <Button
              as="a"
              href={`/${locale}/quiz`}
              variant="plum"
              size="lg"
              icon={<Sparkles className="w-5 h-5" />}
            >
              {messages.booking.takeQuiz}
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 5: FINAL CTA                                           */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-36 gradient-sage relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C8A97D]/[0.08] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
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
                href={`/${locale}/book-a-session`}
                variant="secondary"
                size="lg"
                icon={<Calendar className="w-5 h-5" />}
                className="!bg-white !text-[#B5696B] hover:!bg-[#F3EFE8]"
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
