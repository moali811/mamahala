'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar, MessageCircle, ArrowRight, ArrowLeft,
  Check, Clock, ChevronDown, Globe, Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { getMessages, type Locale } from '@/lib/i18n';
import { useServices } from '@/hooks/useServices';
import type { ServiceCategory } from '@/types';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import { useRegion } from '@/components/region/RegionProvider';
import RegionToggle from '@/components/region/RegionToggle';
import CurrencyDropdown from '@/components/region/CurrencyDropdown';
import { getServicePricingForRegion } from '@/data/services';
import { getOnlinePriceForVisitor } from '@/lib/pricing-engine';
import { PRICING_TIERS, getBandForCountry } from '@/config/pricing';
import { getBookingUrl } from '@/config/business';

export default function ServiceDetailPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;
  const category = params?.category as ServiceCategory;
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const { region, country, preferredCurrency } = useRegion();

  const { getServiceBySlug, getServicesByCategory, getCategoryInfo } = useServices();
  const service = getServiceBySlug(slug);
  const catInfo = getCategoryInfo(category);

  if (!service || !catInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#8E8E9F]">{isRTL ? 'الخدمة غير موجودة' : 'Service not found'}</p>
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
    isRTL ? `مرحبًا، أودُّ حجزَ جلسة: ${service.nameAr}` : `Hi, I would like to book: ${service.name}`
  )}`;

  return (
    <div className="bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F5E8E5] via-[#F8EDE8] to-[#FAF7F2]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#C4878A]/8 hidden lg:block blur-3xl" />
        </div>
        <div className="container-main relative pt-20 pb-28 md:pt-24 md:pb-32">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb
              locale={locale}
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.nav.services, href: `/${locale}/services` },
                { label: catName, href: `/${locale}/services/${category}` },
                { label: name },
              ]}
            />
          </motion.div>
          <motion.h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2A33] mt-6 ${isRTL ? 'text-right' : ''}`}
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {name}
          </motion.h1>
          <motion.div
            className="flex flex-wrap items-center gap-3 mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Badge variant="sage" size="md" className="!bg-[#C4878A]/10 !text-[#2D2A33]">
              <Clock className={`w-3.5 h-3.5 ${isRTL ? 'ml-1' : 'mr-1'}`} />
              {service.duration}
            </Badge>
            <Badge variant="sage" size="md" className="!bg-white/40 !text-[#2D2A33]">
              <Globe className={`w-3.5 h-3.5 ${isRTL ? 'ml-1' : 'mr-1'}`} />
              {isRTL ? 'ثنائي اللغة: EN · AR' : 'Bilingual: EN · AR'}
            </Badge>
            <Link href={`/${locale}/book`}>
              <Badge variant="sand" size="md" className="!bg-[#C8A97D]/25 !text-[#5E2D48] hover:!bg-[#C8A97D]/40 transition-colors cursor-pointer">
                <Sparkles className={`w-3.5 h-3.5 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {isRTL ? 'استشارة مجانية — ابدأ هنا' : 'Free Discovery Call'}
              </Badge>
            </Link>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      <div className="container-main py-20 lg:py-28">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className={`lg:col-span-2 space-y-16 lg:order-1 ${isRTL ? 'text-right' : ''}`}>
            {/* Description */}
            <ScrollReveal>
              <p className="text-lg text-[#4A4A5C] leading-relaxed">{description}</p>
            </ScrollReveal>

            {/* Who Is This For */}
            <ScrollReveal>
              <h2
                className="text-2xl font-bold text-[#2D2A33] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {messages.services.whoIsThisFor}
              </h2>
              <div className="space-y-3">
                {whoIsThisFor.map((item, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-start gap-3 ${isRTL ? 'text-right' : ''}`}
                    initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#C4878A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#7A3B5E]" />
                    </div>
                    <span className="text-[#4A4A5C]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* What to Expect */}
            <ScrollReveal>
              <h2
                className="text-2xl font-bold text-[#2D2A33] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {messages.services.whatToExpect}
              </h2>
              <div className="space-y-4">
                {whatToExpect.map((step, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-start gap-4 ${isRTL ? 'text-right' : ''}`}
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
                className="text-2xl font-bold text-[#2D2A33] mb-4"
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
                  className="text-2xl font-bold text-[#2D2A33] mb-6"
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
          <div className={`lg:col-span-1 lg:order-2`}>
            <div className="sticky top-24 space-y-6">
              <motion.div
                className={`bg-white rounded-2xl p-8 border border-[#F3EFE8] shadow-[var(--shadow-card)] ${isRTL ? 'text-right' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3
                  className="text-xl font-bold text-[#2D2A33] mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {messages.services.bookSession}
                </h3>

                {/* Pricing card — Online (global, localized) + In-Person (CAD/AED toggle) */}
                {(() => {
                  const tier = PRICING_TIERS[service.pricingTierKey];
                  const inPerson = getServicePricingForRegion(service, region);
                  const onlinePrice = getOnlinePriceForVisitor(
                    service.pricingTierKey,
                    country,
                    isRTL ? 'ar' : 'en',
                    preferredCurrency ?? undefined,
                  );
                  const hasOnline =
                    tier.anchors.CAD.online !== null ||
                    tier.anchors.AED.online !== null;
                  const hasInPerson = inPerson.rows.some((r) => r.mode === 'inPerson');

                  const durationLabel = isRTL
                    ? `جلسة ${tier.durationMinutes} دقيقة`
                    : `${tier.durationMinutes}-minute session`;

                  // Localized copy
                  const onlineLabel = isRTL ? 'عن بُعد (عالميًّا)' : 'Online (Global)';
                  const inPersonLabel = isRTL ? 'حضوريّ' : 'In-Person';
                  const localizedForLabel = isRTL
                    ? `مُخصَّصةٌ لمنطقتِك`
                    : `Localized for your region`;
                  const officeLabel = isRTL ? 'يعكسُ موقعَ المكتب' : 'Reflects office location';

                  return (
                    <div className="space-y-5 mb-6">
                      {/* Duration chip + per-session label */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F2] px-3 py-1 text-[11px] font-medium text-[#4A4A5C] border border-[#EDE8DF]">
                          <Clock className="w-3 h-3" />
                          {durationLabel}
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-[#8E8E9F] font-medium">
                          {messages.services.perSession}
                        </span>
                      </div>

                      {/* ─── Online (Global) section ─── */}
                      {hasOnline && onlinePrice && (
                        <div className="rounded-xl border border-[#EDE8DF] bg-gradient-to-br from-white to-[#FAF7F2] p-3">
                          <div className={`flex items-center justify-between gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#7A3B5E]">
                              <span aria-hidden>🌍</span>
                              {onlineLabel}
                            </span>
                            <CurrencyDropdown locale={isRTL ? 'ar' : 'en'} />
                          </div>
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-[11px] text-[#8E8E9F]">
                              {messages.services.startingAt}
                            </span>
                            <span className="text-[15px] font-bold text-[#2D2A33] tabular-nums whitespace-nowrap">
                              {onlinePrice.formatted}
                            </span>
                          </div>
                          <p className={`text-[9px] text-[#8E8E9F] mt-1.5 ${isRTL ? 'text-right' : ''}`}>
                            {localizedForLabel}
                            <span className="mx-1 text-[#C8A97D]">·</span>
                            <span className="font-mono uppercase">{onlinePrice.country}</span>
                          </p>
                        </div>
                      )}

                      {/* ─── In-Person section ─── */}
                      {hasInPerson && (
                        <div className="rounded-xl border border-[#EDE8DF] bg-white p-3">
                          <div className={`flex items-center justify-between gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#C8A97D]">
                              <span aria-hidden>🏢</span>
                              {inPersonLabel}
                            </span>
                            <RegionToggle locale={locale as Locale} />
                          </div>
                          {inPerson.rows
                            .filter((r) => r.mode === 'inPerson')
                            .map((row) => (
                              <div
                                key={row.mode}
                                className="flex items-baseline justify-between gap-3"
                              >
                                <span className="text-[11px] text-[#8E8E9F]">
                                  {messages.services.startingAt}
                                </span>
                                <span className="text-[15px] font-bold text-[#2D2A33] tabular-nums whitespace-nowrap">
                                  {inPerson.currencySymbol} {row.anchor}
                                </span>
                              </div>
                            ))}
                          <p className={`text-[9px] text-[#8E8E9F] mt-1.5 ${isRTL ? 'text-right' : ''}`}>
                            {officeLabel}
                          </p>
                        </div>
                      )}

                      {/* Personalized disclaimer */}
                      <p className="text-[11px] text-[#8E8E9F] leading-relaxed italic">
                        {messages.services.personalizedDisclaimer}
                      </p>
                    </div>
                  );
                })()}

                <div className="space-y-3">
                  <Button
                    as="a"
                    href={getBookingUrl(locale, service.slug)}
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
              </motion.div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className={`bg-white rounded-2xl p-6 border border-[#F3EFE8] ${isRTL ? 'text-right' : ''}`}>
                  <h4 className="text-sm font-semibold text-[#2D2A33] uppercase tracking-wider mb-4">
                    {messages.services.relatedServices}
                  </h4>
                  <div className="space-y-2">
                    {relatedServices.map((rs) => (
                      <Link
                        key={rs.slug}
                        href={`/${locale}/services/${category}/${rs.slug}`}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#4A4A5C] hover:bg-[#FAF7F2] hover:text-[#7A3B5E] transition-all group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97D] group-hover:bg-[#7A3B5E] transition-colors shrink-0" />
                        {isRTL ? rs.nameAr : rs.name}
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
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-[#F3EFE8] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-5 text-start ${isRTL ? 'text-right' : ''}`}
      >
        <span className="font-medium text-[#2D2A33] text-sm">{question}</span>
        <ChevronDown className={`w-4 h-4 text-[#8E8E9F] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className={`px-5 pb-5 -mt-1 ${isRTL ? 'text-right' : ''}`}>
          <p className="text-sm text-[#4A4A5C] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
