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

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Users, User, Heart, Leaf,
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2B5F4E] via-[#2B5F4E] to-[#1E4A3B]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C8A97D]/30 blur-3xl" />
        </div>
        <div className="container-main relative py-24 md:py-28">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Breadcrumb
              locale={locale}
              light
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
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <IconComponent className="w-7 h-7 text-[#C8A97D]" />
            </div>
            <div>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {name}
              </h1>
              <p className="text-white/70 mt-1">{subtitle}</p>
            </div>
          </motion.div>
          <motion.p
            className="text-white/80 max-w-2xl mt-6 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="container-main">
          <ScrollReveal className="mb-12">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#1E1E2A]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? `خدمات ${name}` : `${name} Services`}
            </h2>
            <p className="text-[#8E8E9F] mt-2">
              {services.length} {messages.services.serviceCount}
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid md:grid-cols-2 gap-5">
            {services.map((service) => {
              const sName = isRTL ? service.nameAr : service.name;
              const sDesc = isRTL ? service.shortDescAr : service.shortDesc;

              return (
                <StaggerChild key={service.slug}>
                  <div className="group bg-white rounded-2xl border border-[#F3EFE8] p-6 hover:border-[#2B5F4E]/20 hover:shadow-[var(--shadow-card)] transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        className="text-lg font-bold text-[#1E1E2A] group-hover:text-[#2B5F4E] transition-colors flex-1"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        <Link href={`/${locale}/services/${category}/${service.slug}`} className="hover:underline">
                          {sName}
                        </Link>
                      </h3>
                      <Badge variant="sand" size="sm">
                        {messages.services.priceFrom} ${service.priceFrom}
                      </Badge>
                    </div>

                    <p className="text-sm text-[#8E8E9F] leading-relaxed mb-4 line-clamp-2">
                      {sDesc}
                    </p>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/${locale}/book-a-session`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2B5F4E] hover:text-[#1E4A3B] transition-colors"
                      >
                        <Calendar className="w-4 h-4" />
                        {messages.services.bookOnline}
                      </Link>
                      <span className="text-[#F3EFE8]">|</span>
                      <a
                        href={getWhatsAppLink(service.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8E8E9F] hover:text-[#2B5F4E] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {messages.services.chatWhatsApp}
                      </a>
                    </div>
                  </div>
                </StaggerChild>
              );
            })}
          </StaggerReveal>

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
                className="text-2xl md:text-3xl font-bold text-[#1E1E2A]"
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
                      <p className="font-semibold text-[#2B5F4E]">{t.name}</p>
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
            <h3 className="text-xl font-bold text-[#1E1E2A]" style={{ fontFamily: 'var(--font-heading)' }}>
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
                  className="px-5 py-2.5 rounded-full bg-white text-sm font-medium text-[#4A4A5C] hover:text-[#2B5F4E] hover:shadow-[var(--shadow-subtle)] transition-all"
                >
                  {isRTL ? c.nameAr : c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-sage relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-2xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.cta.ready}
            </h2>
            <p className="mt-4 text-white/80 leading-relaxed">{messages.cta.readyDesc}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                as="a"
                href={`/${locale}/book-a-session`}
                variant="secondary"
                size="lg"
                icon={<Calendar className="w-5 h-5" />}
                className="!bg-white !text-[#2B5F4E] hover:!bg-[#F3EFE8]"
              >
                {messages.cta.bookNow}
              </Button>
              <Button
                as="a"
                href={`/${locale}/quiz`}
                variant="outline"
                size="lg"
                icon={<Sparkles className="w-5 h-5" />}
                className="!border-white/30 !text-white hover:!bg-white/10"
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
