'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CalendarCheck, Clock, XCircle, RefreshCw, CreditCard,
  AlertTriangle, Video, Globe, MessageSquare, Mail,
  TimerOff, Ban, CheckCircle2, Gavel,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer } from '@/lib/animations';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';

interface Section {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  list?: string[];
  afterList?: string;
  highlight?: boolean;
  isLast?: boolean;
}

const sections: Section[] = [
  {
    id: 'booking',
    icon: CalendarCheck,
    title: 'Booking Sessions',
    content: `Sessions can be booked through our website via Calendly or by contacting us on WhatsApp. We recommend booking at least 48 hours in advance to ensure availability.\n\nAll bookings are confirmed once payment has been received and processed through our secure third-party payment system. You will receive an email confirmation with your session details, including the date, time, and meeting link for online sessions.`,
  },
  {
    id: 'session-format',
    icon: Video,
    title: 'Session Format',
    content: `Most sessions are conducted online via secure video conferencing to support our global client base. Sessions are available in both English and Arabic.\n\nSession duration varies by service type but is typically between 30 and 60 minutes. Please ensure you are in a quiet, private environment for your session with a stable internet connection.`,
    list: [
      'Initial Consultation: 30 minutes',
      'Individual Sessions: 45\u201360 minutes',
      'Couples & Family Sessions: 60 minutes',
      'Experiential Therapy: Duration varies by activity',
    ],
  },
  {
    id: 'pricing',
    icon: CreditCard,
    title: 'Pricing & Payment',
    content: `Our pricing is region-based and takes into account factors such as age, case complexity, and service type. Starting rates are listed on our services pages, and exact pricing will be confirmed during your initial consultation.\n\nPayment is required prior to or at the time of the session. We accept payments through our secure third-party payment processor. All payment processing issues should be resolved directly with the processor.`,
    list: [
      'Prices vary by region (Middle East, North America, other)',
      'Age-adjusted pricing available for youth services',
      'Package rates available for ongoing support plans',
      'Free initial consultations are available with limited scope',
    ],
    highlight: true,
  },
  {
    id: 'cancellation',
    icon: XCircle,
    title: 'Cancellation Policy',
    content: `We kindly ask for a minimum of 24 hours\u2019 notice for any appointment cancellations. While we understand that unforeseen circumstances may arise, last-minute cancellations make it difficult to accommodate other clients.`,
    list: [
      '24+ hours notice: Free cancellation, no charge',
      'Less than 24 hours notice: 50% of the session fee applies',
      'No-show without notice: Full session fee applies',
    ],
    afterList: 'Your understanding and cooperation in honoring this policy enables us to maintain the quality of service for all our clients and sustain our business operations effectively.',
    highlight: true,
  },
  {
    id: 'rescheduling',
    icon: RefreshCw,
    title: 'Rescheduling',
    content: `We understand that life happens. Sessions can be rescheduled free of charge with at least 24 hours\u2019 notice. We allow one reschedule per booking to ensure fair scheduling for all clients.\n\nTo reschedule, please contact us via WhatsApp or email at admin@mamahala.ca with your preferred new time. We will do our best to accommodate your request based on availability.`,
  },
  {
    id: 'late-arrivals',
    icon: TimerOff,
    title: 'Late Arrivals',
    content: `If you arrive late to your session, the session will begin and end at the originally scheduled time. Session time will not be extended to compensate for late arrival.\n\nIf you are more than 15 minutes late without prior communication, the session may be considered a no-show and the full session fee will apply. Please contact us as soon as possible if you are running late.`,
  },
  {
    id: 'refunds',
    icon: Ban,
    title: 'Refunds',
    content: `Payments are not refundable under any circumstances, including but not limited to the termination of any agreement for whatsoever reason. This applies to all session fees, package payments, program enrollments, and digital product purchases.\n\nIf you are unsatisfied with a session or service, we encourage you to reach out to us directly so we can discuss how to best support you moving forward.`,
    highlight: true,
  },
  {
    id: 'confidentiality',
    icon: CheckCircle2,
    title: 'Confidentiality & Ethics',
    content: `All information shared during sessions is treated with the highest level of confidentiality in accordance with professional ethical guidelines and applicable privacy laws in Canada and the UAE.\n\nExceptions to confidentiality may apply only in situations where there is an imminent risk of harm to yourself or others, suspected abuse of a minor or vulnerable person, or when required by a court order.`,
  },
  {
    id: 'emergencies',
    icon: AlertTriangle,
    title: 'Emergency Disclaimer',
    content: `Our counseling and coaching services are not a substitute for emergency mental health care, medical treatment, or psychiatric intervention. If you or someone you know is in immediate danger or experiencing a mental health crisis, please contact your local emergency services immediately.\n\nMama Hala Consulting is not an emergency service provider and cannot provide crisis intervention support.`,
    highlight: true,
  },
  {
    id: 'global',
    icon: Globe,
    title: 'Global Service Delivery',
    content: `Mama Hala Consulting is registered and operates from Dubai, UAE and Canada. Services are provided remotely to clients worldwide. Session times are scheduled based on mutual availability across time zones.\n\nBy booking a session, you acknowledge that the applicable laws and regulations governing our services are those of Ontario, Canada, and the Operator\u2019s professional licensing jurisdiction.`,
  },
  {
    id: 'changes',
    icon: Gavel,
    title: 'Changes to This Policy',
    content: `We reserve the right to modify this Booking Policy at any time. Changes will be posted on this page with an updated date. Your continued use of our services after changes are posted constitutes your acceptance of the revised policy.\n\nIt is your responsibility to review this policy periodically for updates.`,
  },
  {
    id: 'contact',
    icon: MessageSquare,
    title: 'Questions?',
    content: `If you have any questions about our booking policy, cancellation terms, or need assistance with your appointment, please don\u2019t hesitate to reach out.`,
    isLast: true,
  },
];

export default function BookingPolicyPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const messages = getMessages(locale as Locale);

  return (
    <div className="bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#C8A97D] via-[#B8956A] to-[#A07A52]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#2B5F4E]/20 blur-3xl" />
        </div>
        <div className="container-main relative py-24 md:py-28">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb
              locale={locale}
              light
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.footer.bookingPolicy },
              ]}
            />
          </motion.div>
          <motion.div
            className="mt-8 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                <CalendarCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-[0.15em] uppercase text-white/80">
                Booking
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Booking Policy
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-white/80 mt-4 max-w-2xl"
            >
              Everything you need to know about scheduling, cancellations, payments, and what to expect from your sessions with Dr. Hala.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex items-center gap-4 mt-6 text-sm text-white/60"
            >
              <span className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                24h cancellation notice
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full">
                <Globe className="w-3.5 h-3.5" />
                Dubai &amp; Canada
              </span>
            </motion.div>
          </motion.div>
        </div>
        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-12" preserveAspectRatio="none">
            <path d="M0,60 L0,30 Q720,0 1440,30 L1440,60 Z" fill="#FAF7F2" />
          </svg>
        </div>
      </section>

      {/* Table of Contents */}
      <div className="container-main max-w-5xl pt-8 pb-4">
        <ScrollReveal>
          <div className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-subtle)] p-6 md:p-8">
            <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] mb-4">
              Table of Contents
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {sections.map((section, i) => {
                const Icon = section.icon;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#4A4A5C] hover:bg-[#C8A97D]/5 hover:text-[#A07A52] transition-all duration-200 group"
                  >
                    <span className="text-xs font-mono text-[#C8A97D] w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Icon className="w-4 h-4 text-[#8E8E9F] group-hover:text-[#C8A97D] transition-colors flex-shrink-0" />
                    <span className="truncate">{section.title}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Sections */}
      <div className="container-main max-w-5xl py-8 pb-24">
        <div className="space-y-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <ScrollReveal key={section.id}>
                <div
                  id={section.id}
                  className={`bg-white rounded-2xl border shadow-[var(--shadow-subtle)] scroll-mt-24 overflow-hidden ${
                    section.highlight
                      ? 'border-[#C8A97D]/30 ring-1 ring-[#C8A97D]/10'
                      : 'border-[#F3EFE8]'
                  }`}
                >
                  {/* Section Header */}
                  <div className={`flex items-center gap-4 px-6 md:px-8 py-5 border-b ${
                    section.highlight ? 'border-[#C8A97D]/20 bg-[#C8A97D]/5' : 'border-[#F3EFE8]'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      section.highlight ? 'bg-[#C8A97D]/15 text-[#C8A97D]' : 'bg-[#2B5F4E]/10 text-[#2B5F4E]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-xs font-mono text-[#C8A97D] bg-[#C8A97D]/10 px-2 py-0.5 rounded-md">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h2
                        className="text-lg md:text-xl font-bold text-[#1E1E2A] truncate"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {section.title}
                      </h2>
                    </div>
                    {section.highlight && (
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8A97D] bg-[#C8A97D]/10 px-3 py-1 rounded-full flex-shrink-0">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Important
                      </span>
                    )}
                  </div>

                  {/* Section Body */}
                  <div className="px-6 md:px-8 py-6">
                    {section.content.split('\n\n').map((paragraph, pi) => (
                      <p
                        key={pi}
                        className="text-[#4A4A5C] leading-relaxed mb-4 last:mb-0 text-[15px]"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.list && (
                      <div className="mt-4 space-y-2">
                        {section.list.map((item, li) => (
                          <div
                            key={li}
                            className="flex items-start gap-3 bg-[#FAF7F2] rounded-xl px-4 py-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#C8A97D]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97D]" />
                            </div>
                            <span className="text-sm text-[#4A4A5C] leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.afterList && (
                      <p className="text-[#4A4A5C] leading-relaxed mt-4 text-[15px]">
                        {section.afterList}
                      </p>
                    )}

                    {section.isLast && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          href={`/${locale}/contact`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B5F4E] bg-[#2B5F4E]/5 px-4 py-2.5 rounded-xl hover:bg-[#2B5F4E]/10 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Contact Form
                        </Link>
                        <a
                          href="https://wa.me/16132222104"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#25D366] bg-[#25D366]/5 px-4 py-2.5 rounded-xl hover:bg-[#25D366]/10 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          WhatsApp
                        </a>
                        <a
                          href="mailto:admin@mamahala.ca"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A3B5E] bg-[#7A3B5E]/5 px-4 py-2.5 rounded-xl hover:bg-[#7A3B5E]/10 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          admin@mamahala.ca
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Back to top */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-sm text-[#8E8E9F] hover:text-[#C8A97D] transition-colors"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Back to top
          </button>
        </div>
      </div>
    </div>
  );
}
