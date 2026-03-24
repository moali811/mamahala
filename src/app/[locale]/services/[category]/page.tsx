'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Calendar, MessageCircle, Sparkles,
  GraduationCap, Users, User, Heart, Leaf, Star,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { serviceCategories, getServicesByCategory, getCategoryInfo } from '@/data/services';
import { getTestimonialsByCategory } from '@/data/testimonials';
import { staggerContainer, fadeUp, ease } from '@/lib/animations';
import type { ServiceCategory } from '@/types';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Users, User, Heart, Leaf, Sparkles,
};

// Category accent colors for service cards
const categoryAccents: Record<string, { gradient: string; accent: string; light: string }> = {
  youth: { gradient: 'from-[#F0D5CA] to-[#FAF0EC]', accent: '#C4878A', light: 'bg-[#C4878A]/5' },
  families: { gradient: 'from-[#E8D5E0] to-[#F8EEF3]', accent: '#7A3B5E', light: 'bg-[#7A3B5E]/5' },
  adults: { gradient: 'from-[#E8E0D0] to-[#FAF5ED]', accent: '#C8A97D', light: 'bg-[#C8A97D]/5' },
  couples: { gradient: 'from-[#E8C4C0] to-[#FAF0EC]', accent: '#C4878A', light: 'bg-[#C4878A]/5' },
  experiential: { gradient: 'from-[#D5E8DE] to-[#EAF5EE]', accent: '#5A8A6E', light: 'bg-[#5A8A6E]/5' },
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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#C4878A]/8 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C8A97D]/30 blur-3xl" />
        </div>
        <div className="container-main relative pt-24 pb-32 md:pt-28 md:pb-36">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
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
            className="mt-6 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#C4878A]/10 flex items-center justify-center">
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
            className="text-[#4A4A5C] max-w-2xl mt-6 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="container-main">
          <ScrollReveal className="mb-12">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#2D2A33]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? `خدمات ${name}` : `${name} Services`}
            </h2>
            <p className="text-[#8E8E9F] mt-2">
              {services.length} {messages.services.serviceCount}
            </p>
          </ScrollReveal>

          {(() => {
            const colors = categoryAccents[category] || categoryAccents.adults;
            return (
              <StaggerReveal className="space-y-5">
                {services.map((service, i) => {
                  const sName = isRTL ? service.nameAr : service.name;
                  const sDesc = isRTL ? service.shortDescAr : service.shortDesc;

                  return (
                    <StaggerChild key={service.slug}>
                      <motion.div
                        className="group relative bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden hover:shadow-[var(--shadow-card)] transition-all duration-300"
                        whileHover={{ y: -3 }}
                      >
                        {/* Accent strip */}
                        <div
                          className={`absolute top-0 ${isRTL ? 'right-0 rounded-r-2xl' : 'left-0 rounded-l-2xl'} w-1.5 h-full`}
                          style={{ background: `linear-gradient(180deg, ${colors.accent}40, ${colors.accent}15)` }}
                        />

                        <div className={`flex flex-col md:flex-row items-start gap-5 p-6 md:p-7 ${isRTL ? 'pr-8 md:pr-9' : 'pl-8 md:pl-9'}`}>
                          {/* Number badge */}
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                            style={{ backgroundColor: `${colors.accent}10`, color: colors.accent }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                              <Link href={`/${locale}/services/${category}/${service.slug}`}>
                                <h3
                                  className="text-lg font-bold text-[#2D2A33] group-hover:text-[#7A3B5E] transition-colors"
                                  style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                  {sName}
                                </h3>
                              </Link>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Badge variant="sand" size="sm">
                                  {messages.services.priceFrom} ${service.priceFrom}
                                </Badge>
                                <Badge variant="neutral" size="sm">{service.duration}</Badge>
                              </div>
                            </div>

                            <p className="text-sm text-[#8E8E9F] leading-relaxed mb-4">
                              {sDesc}
                            </p>

                            <div className="flex flex-wrap items-center gap-3">
                              <Link
                                href={`/${locale}/services/${category}/${service.slug}`}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A3B5E] hover:text-[#5E2D48] transition-colors"
                              >
                                {messages.services.learnMore}
                                <ArrowIcon className="w-3.5 h-3.5" />
                              </Link>
                              <span className="text-[#F3EFE8]">|</span>
                              <Link
                                href={`/${locale}/book-a-session`}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4A4A5C] hover:text-[#7A3B5E] transition-colors"
                              >
                                <Calendar className="w-3.5 h-3.5" />
                                {messages.services.bookOnline}
                              </Link>
                              <span className="text-[#F3EFE8]">|</span>
                              <a
                                href={getWhatsAppLink(service.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8E8E9F] hover:text-[#25D366] transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                WhatsApp
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </StaggerChild>
                  );
                })}
              </StaggerReveal>
            );
          })()}

          <ScrollReveal className="mt-6 text-center">
            <p className="text-xs text-[#8E8E9F] italic">{messages.services.priceDisclaimer}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials (if any) */}
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

            <StaggerReveal className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {categoryTestimonials.slice(0, 4).map((t) => (
                <StaggerChild key={t.id}>
                  <div className="glass-card rounded-2xl p-8">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C8A97D] text-[#C8A97D]" />
                      ))}
                    </div>
                    <p className="text-[#4A4A5C] italic leading-relaxed mb-4">
                      &ldquo;{isRTL ? t.textAr : t.text}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold text-[#7A3B5E]">{t.name}</p>
                      <p className="text-xs text-[#8E8E9F]">{isRTL ? t.roleAr : t.role}</p>
                    </div>
                  </div>
                </StaggerChild>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* Related Categories */}
      <section className="py-16 bg-[#F3EFE8]">
        <div className="container-main">
          <ScrollReveal className="mb-8">
            <h3 className="text-xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'استكشف خدمات أخرى' : 'Explore Other Services'}
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

      {/* CTA */}
      <section className="py-24 gradient-cta-dark relative overflow-hidden">
        <WaveDivider position="top" fillColor="#F3EFE8" variant="organic" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#7A3B5E]/[0.06] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-2xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#2D2A33] text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.cta.ready}
            </h2>
            <p className="mt-4 text-[#4A4A5C] leading-relaxed">{messages.cta.readyDesc}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                as="a"
                href={`/${locale}/book-a-session`}
                variant="secondary"
                size="lg"
                icon={<Calendar className="w-5 h-5" />}
                className=""
              >
                {messages.cta.bookNow}
              </Button>
              <Button
                as="a"
                href={`/${locale}/quiz`}
                variant="outline"
                size="lg"
                icon={<Sparkles className="w-5 h-5" />}
                className="!border-[#7A3B5E]/20 !text-[#7A3B5E] hover:!bg-[#7A3B5E]/5"
              >
                {messages.cta.takeQuiz}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
