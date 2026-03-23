'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield, Users, FileText, Baby, CreditCard, Ban,
  Scale, AlertTriangle, Puzzle, Gavel, RefreshCw,
  CheckCircle, Mail, ScrollText,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer } from '@/lib/animations';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';

const sections = [
  {
    id: 'agreement',
    icon: ScrollText,
    title: 'Terms and Conditions',
    content: `This policy was last updated on 29.11.2022.\n\nThese terms and conditions (\u201cAgreement\u201d) set forth the general terms and conditions of your use of the mamahala.ca website (\u201cWebsite\u201d or \u201cService\u201d) and any of its related products and services (collectively, \u201cServices\u201d). This Agreement is legally binding between you (\u201cUser\u201d, \u201cyou\u201d or \u201cyour\u201d) and this Website operator (\u201cOperator\u201d, \u201cwe\u201d, \u201cus\u201d or \u201cour\u201d). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms \u201cUser\u201d, \u201cyou\u201d or \u201cyour\u201d shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. You acknowledge that this Agreement is a contract between you and the Operator, even though it is electronic and is not physically signed by you, and it governs your use of the Website and Services.`,
  },
  {
    id: 'accounts',
    icon: Users,
    title: 'Accounts and Membership',
    content: `If you create an account on the Website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may monitor and review new accounts before you may sign in and/or start using the Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.`,
  },
  {
    id: 'user-content',
    icon: FileText,
    title: 'User Content',
    content: `We do not own any data, information or material (collectively, \u201cContent\u201d) that you submit on the Website in the course of using the Service. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted Content. We may monitor and review the Content on the Website submitted or created using our Services by you. You grant us permission to access, copy, distribute, store, transmit, reformat, display and perform the Content of your user account solely as required for the purpose of providing the Services to you. Without limiting any of those representations or warranties, we have the right, though not the obligation, to, in our own sole discretion, refuse or remove any Content that, in our reasonable opinion, violates any of our policies or is in any way harmful or objectionable. You also grant us the license to use, reproduce, adapt, modify, publish or distribute the Content created by you or stored in your user account for commercial, marketing or any similar purpose.`,
  },
  {
    id: 'children',
    icon: Baby,
    title: 'Privacy of Children',
    content: `We do not knowingly collect any Personal Information from children under the age of 13. If you are under the age of 13, please do not submit any Personal Information through the Website and Services.\n\nWe encourage parents and legal guardians to monitor their children\u2019s Internet usage and to help enforce this Policy by instructing their children never to provide Personal Information through the Website and Services without their permission.`,
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Payments and Refunds',
    content: `The Site may offer products and services for sale. The Site does not handle payments for these products directly but rather refers these payments to a secure third-party payment processor which handles all aspects of the payment process. Any payment processing issues should be resolved directly with the payment processor. All other payment-related questions, disputes, or issues must be resolved directly with the Operator. Once we have been notified by the payment processor that a payment has been made, and that the payment has successfully passed a fraud review, access will be granted to the product or service being purchased as soon as possible, however, we make no guarantees of timeliness or immediacy. Free accounts and consultations are provided with limited access to the Site that allows the user to test all available services prior to making a payment and determine if the offered services meet your needs.\n\nIn order to streamline our scheduling procedures and provide the best service to all our clients, we kindly ask for a minimum of 24 hours\u2019 notice for any appointment changes or cancellations. While we understand that unforeseen circumstances may arise, last-minute cancellations can make it difficult to accommodate other clients. We greatly appreciate your understanding and cooperation in honoring this policy, which includes payment of half the full rate for late cancellations. Your support enables us to maintain the quality of service for all our clients and sustain our business operations effectively.\n\nPayments referred to herein shall not be refundable under any circumstances, including but not limited to the termination of this Agreement for whatsoever reason.`,
    highlight: true,
  },
  {
    id: 'prohibited',
    icon: Ban,
    title: 'Prohibited Uses',
    content: `In addition to other terms as set forth in the Agreement, you are prohibited from using the Website and Services or Content:`,
    list: [
      'For any unlawful purpose',
      'To solicit others to perform or participate in any unlawful acts',
      'To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances',
      'To infringe upon or violate our intellectual property rights or the intellectual property rights of others',
      'To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability',
      'To submit false or misleading information',
      'To upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Website and Services, third party products and services, or the Internet',
      'To spam, phish, pharm, pretext, spider, crawl, or scrape',
      'For any obscene or immoral purpose',
      'To interfere with or circumvent the security features of the Website and Services, third party products and services, or the Internet',
    ],
    afterList: 'We reserve the right to terminate your use of the Website and Services for violating any of the prohibited uses.',
  },
  {
    id: 'ip',
    icon: Shield,
    title: 'Intellectual Property Rights',
    content: `This Agreement does not transfer to you any intellectual property owned by the Operator or third parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with the Operator. All trademarks, service marks, graphics and logos used in connection with the Website and Services, are trademarks or registered trademarks of the Operator or its licensors. Other trademarks, service marks, graphics and logos used in connection with the Website and Services may be the trademarks of other third parties. Your use of the Website and Services grants you no right or license to reproduce or otherwise use any of the Operator or third party trademarks.`,
  },
  {
    id: 'indemnification',
    icon: AlertTriangle,
    title: 'Indemnification',
    content: `You agree to indemnify and hold harmless the Operator, its contractors, and its licensors, and their respective directors, officers, employees, and agents from and against any and all claims and expenses, including attorneys\u2019 fees, arising out of your use of the Site, including but not limited to your violation of this Agreement.`,
  },
  {
    id: 'severability',
    icon: Puzzle,
    title: 'Severability',
    content: `All rights and restrictions contained in this Agreement may be exercised and shall be applicable and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.`,
  },
  {
    id: 'disputes',
    icon: Gavel,
    title: 'Dispute Resolution',
    content: `The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Ontario, Canada without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of Canada. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the courts located in Ontario, Canada, and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.`,
  },
  {
    id: 'changes',
    icon: RefreshCw,
    title: 'Changes and Amendments',
    content: `We reserve the right to modify this Agreement or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. It is your responsibility to check this Agreement periodically for changes. Your continued use of or access to the Site following the posting of any changes to this Agreement constitutes acceptance of those changes. The Operator may also, in the future, offer new services and/or features through the Site (including, the release of new tools and resources). Such new features and/or services shall be subject to the terms and conditions of this Agreement.`,
  },
  {
    id: 'acceptance',
    icon: CheckCircle,
    title: 'Acceptance of These Terms',
    content: `You acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing and using the Website and Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Website and Services.`,
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Contacting Us',
    content: `Any questions about these terms of service and privacy policy should be addressed to us via our contact form or at admin@mamahala.ca.`,
    isLast: true,
  },
];

export default function TermsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  return (
    <div className="bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2B5F4E] via-[#2B5F4E] to-[#1E4A3B]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C8A97D]/30 blur-3xl" />
        </div>
        <div className="container-main relative py-24 md:py-28">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb
              locale={locale}
              light
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.footer.terms },
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
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#C8A97D]" />
              </div>
              <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D]">
                Legal
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Terms &amp; Conditions
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-white/70 mt-4 max-w-2xl"
            >
              Please read these terms carefully before using our website and services. By accessing mamahala.ca, you agree to be bound by this agreement.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex items-center gap-4 mt-6 text-sm text-white/50"
            >
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <RefreshCw className="w-3.5 h-3.5" />
                Last updated: November 29, 2022
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <Gavel className="w-3.5 h-3.5" />
                Ontario, Canada
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
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#4A4A5C] hover:bg-[#2B5F4E]/5 hover:text-[#2B5F4E] transition-all duration-200 group"
                  >
                    <span className="text-xs font-mono text-[#C8A97D] w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Icon className="w-4 h-4 text-[#8E8E9F] group-hover:text-[#2B5F4E] transition-colors flex-shrink-0" />
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
                        <CreditCard className="w-3.5 h-3.5" />
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
                            <span className="text-xs font-mono text-[#C8A97D] bg-white px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0">
                              {String.fromCharCode(97 + li)}
                            </span>
                            <span className="text-sm text-[#4A4A5C] leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.afterList && (
                      <p className="text-[#4A4A5C] leading-relaxed mt-4 text-[15px] font-medium">
                        {section.afterList}
                      </p>
                    )}

                    {section.isLast && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          href={`/${locale}/contact`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B5F4E] bg-[#2B5F4E]/5 px-4 py-2.5 rounded-xl hover:bg-[#2B5F4E]/10 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Contact Form
                        </Link>
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
            className="inline-flex items-center gap-2 text-sm text-[#8E8E9F] hover:text-[#2B5F4E] transition-colors"
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
