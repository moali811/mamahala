'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar, MessageCircle, ArrowRight, ArrowLeft,
  Check, Clock, DollarSign, ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { getMessages, type Locale } from '@/lib/i18n';
import { getServiceBySlug, getServicesByCategory, getCategoryInfo } from '@/data/services';
import type { ServiceCategory } from '@/types';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ServiceDetailPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;
  const category = params?.category as ServiceCategory;
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const service = getServiceBySlug(slug);
  const catInfo = getCategoryInfo(category);

  if (!service || !catInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#8E8E9F]">Service not found</p>
      </div>
    );
  }

  const name = isRTL ? service.nameAr : service.name;
  const description = isRTL ? service.descriptionAr : service.description;
  const catName = isRTL ? catInfo.nameAr : catInfo.name;
  const whoIsThisFor = isRTL ? service.whoIsThisForAr : service.whoIsThisFor;
  const whatToExpect = isRTL ? service.whatToExpectAr : service.whatToExpect;
  const approach = isRTL ? service.approachAr : service.approach;
  const faqs = service.faqs;

  const relatedServices = getServicesByCategory(category).filter((s) => s.slug !== slug).slice(0, 3);

  const whatsappLink = `https://wa.me/16132222104?text=${encodeURIComponent(
    isRTL ? `مرحبا، أود حجز جلسة: ${service.name}` : `Hi, I would like to book: ${service.name}`
  )}`;

  return (
    <div className="bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2B5F4E] via-[#2B5F4E] to-[#1E4A3B]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="container-main relative py-20 md:py-24">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb
              locale={locale}
              light
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.nav.services, href: `/${locale}/services` },
                { label: catName, href: `/${locale}/services/${category}` },
                { label: name },
              ]}
            />
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-6"
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {name}
          </motion.h1>
          <motion.div
            className="flex flex-wrap items-center gap-4 mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Badge variant="sand" size="md" className="!bg-[#C8A97D]/20 !text-white">
              <DollarSign className="w-3.5 h-3.5 mr-1" />
              {messages.services.priceFrom} {service.currency} ${service.priceFrom}
            </Badge>
            <Badge variant="sage" size="md" className="!bg-white/10 !text-white">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {service.duration}
            </Badge>
          </motion.div>
        </div>
      </section>

      <div className="container-main py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Description */}
            <ScrollReveal>
              <p className="text-lg text-[#4A4A5C] leading-relaxed">{description}</p>
            </ScrollReveal>

            {/* Who Is This For */}
            <ScrollReveal>
              <h2
                className="text-2xl font-bold text-[#1E1E2A] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {messages.services.whoIsThisFor}
              </h2>
              <div className="space-y-3">
                {whoIsThisFor.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#2B5F4E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#2B5F4E]" />
                    </div>
                    <span className="text-[#4A4A5C]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* What to Expect */}
            <ScrollReveal>
              <h2
                className="text-2xl font-bold text-[#1E1E2A] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {messages.services.whatToExpect}
              </h2>
              <div className="space-y-4">
                {whatToExpect.map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span
                      className="text-2xl font-bold text-[#C8A97D] flex-shrink-0 w-8"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 bg-white rounded-xl p-4 border border-[#F3EFE8]">
                      <p className="text-[#4A4A5C]">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Our Approach */}
            <ScrollReveal>
              <h2
                className="text-2xl font-bold text-[#1E1E2A] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {messages.services.ourApproach}
              </h2>
              <div className="bg-white rounded-2xl p-8 border border-[#F3EFE8]">
                <p className="text-[#4A4A5C] leading-relaxed">{approach}</p>
              </div>
            </ScrollReveal>

            {/* FAQs */}
            {faqs.length > 0 && (
              <ScrollReveal>
                <h2
                  className="text-2xl font-bold text-[#1E1E2A] mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {isRTL ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <FAQItem
                      key={i}
                      question={isRTL ? faq.questionAr : faq.question}
                      answer={isRTL ? faq.answerAr : faq.answer}
                    />
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar - Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <motion.div
                className="bg-white rounded-2xl p-8 border border-[#F3EFE8] shadow-[var(--shadow-card)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3
                  className="text-xl font-bold text-[#1E1E2A] mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {messages.services.bookSession}
                </h3>
                <p className="text-sm text-[#8E8E9F] mb-6">
                  {messages.services.priceFrom} {service.currency} ${service.priceFrom} · {service.duration}
                </p>

                <div className="space-y-3">
                  <Button
                    as="a"
                    href={`/${locale}/book-a-session`}
                    fullWidth
                    icon={<Calendar className="w-4 h-4" />}
                  >
                    {messages.services.bookOnline}
                  </Button>
                  <Button
                    as="a"
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    fullWidth
                    icon={<MessageCircle className="w-4 h-4" />}
                  >
                    {messages.services.chatWhatsApp}
                  </Button>
                </div>

                <p className="text-xs text-[#8E8E9F] mt-4 italic text-center">
                  {messages.services.priceDisclaimer}
                </p>
              </motion.div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-[#F3EFE8]">
                  <h4 className="text-sm font-semibold text-[#1E1E2A] uppercase tracking-wider mb-4">
                    {messages.services.relatedServices}
                  </h4>
                  <div className="space-y-3">
                    {relatedServices.map((rs) => (
                      <Link
                        key={rs.slug}
                        href={`/${locale}/services/${category}/${rs.slug}`}
                        className="block text-sm text-[#4A4A5C] hover:text-[#2B5F4E] transition-colors py-1"
                      >
                        {isRTL ? rs.nameAr : rs.name}
                        <span className="text-xs text-[#8E8E9F] block">
                          {messages.services.priceFrom} ${rs.priceFrom}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-start"
      >
        <span className="font-medium text-[#1E1E2A] text-sm">{question}</span>
        <ChevronDown className={`w-4 h-4 text-[#8E8E9F] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 -mt-1">
          <p className="text-sm text-[#4A4A5C] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
