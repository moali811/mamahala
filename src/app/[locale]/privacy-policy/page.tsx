'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield, Database, User, Baby, Server, Mail, Share2, Clock,
  Cookie, Link as LinkIcon, Lock, AlertTriangle, Eye, Settings,
  CheckCircle2, Phone,
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
    id: 'disclaimer',
    icon: Shield,
    title: 'Legal Disclaimer',
    content: `We respect your privacy and are committed to protecting it through our compliance with this privacy policy (\u201cPolicy\u201d). This Policy commitment is based on the Personal Information Protection and Electronic Documents Act (Canada) (\u201cPIPEDA\u201d). This Policy describes the types of information we may collect from you or that you may provide (\u201cPersonal Information\u201d) on the www.mamahala.ca website (\u201cWebsite\u201d or \u201cService\u201d) and any of its related products and services (collectively, \u201cServices\u201d), and our practices for collecting, using, maintaining, protecting, and disclosing that Personal Information. It also describes the choices available to you regarding our use of your Personal Information and how you can access and update it.\n\nThis Policy is a legally binding agreement between you (\u201cUser\u201d, \u201cyou\u201d or \u201cyour\u201d) and this Website operator (\u201cOperator\u201d, \u201cwe\u201d, \u201cus\u201d or \u201cour\u201d). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms \u201cUser\u201d, \u201cyou\u201d or \u201cyour\u201d shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Policy. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.`,
    highlight: true,
  },
  {
    id: 'automatic',
    icon: Server,
    title: 'Automatic Collection of Information',
    content: `When you open the Website, our servers may automatically record information that your browser sends. Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding the usage and traffic of the Website and Services. This statistical information is not otherwise aggregated in such a way that would identify any particular User of the system.`,
  },
  {
    id: 'personal-info',
    icon: User,
    title: 'Collection of Personal Information',
    content: `You can access and use the Website and Services without telling us who you are or revealing any information by which someone could identify you as a specific, identifiable individual. If, however, you wish to use some of the features offered on the Website, you may be asked to provide certain Personal Information (for example, your name and e-mail address).\n\nWe receive and store any information you knowingly provide to us when you publish content, or fill any forms on the Website. When required, this information may include the following:`,
    list: [
      'Account details (such as user name, unique user ID, password, etc)',
      'Contact information (such as email address, phone number, etc)',
      'Basic personal information (such as name, country of residence, etc)',
      'Sensitive personal information (such as ethnicity, religious beliefs, mental health, etc)',
      'Geolocation data of your device (such as latitude and longitude)',
      'Information about other individuals (such as your family members, friends, etc)',
      'Any other materials you willingly submit to us (such as articles, images, feedback, etc)',
    ],
    afterList: 'You can choose not to provide us with your Personal Information, but then you may not be able to take advantage of some of the features on the Website.',
  },
  {
    id: 'children',
    icon: Baby,
    title: 'Privacy of Children',
    content: `We do not knowingly collect any Personal Information from children under the age of 13. If you are under the age of 13, please do not submit any Personal Information through the Website and Services. We encourage parents and legal guardians to monitor their children\u2019s Internet usage and to help enforce this Policy by instructing their children never to provide Personal Information through the Website and Services without their permission.`,
  },
  {
    id: 'use-processing',
    icon: Database,
    title: 'Use and Processing of Collected Information',
    content: `We act as a data controller and a data processor when handling Personal Information, unless we have entered into a data processing agreement with you in which case you would be the data controller and we would be the data processor.\n\nIn order to make the Website and Services available to you, or to meet a legal obligation, we may need to collect and use certain Personal Information. If you do not provide the information that we request, we may not be able to provide you with the requested products or services. Any of the information we collect from you may be used for the following purposes:`,
    list: [
      'Create and manage user accounts',
      'Send administrative information',
      'Send product and service updates',
      'Respond to inquiries and offer support',
      'Request user feedback',
      'Improve user experience',
      'Enforce terms and conditions and policies',
      'Protect from abuse and malicious users',
      'Respond to legal requests and prevent harm',
      'Run and operate the Website and Services',
    ],
    afterList: 'We may also combine or aggregate some of your Personal Information in order to better serve you and to improve and update our Website and Services. Note that under some legislations we may be allowed to process information until you object to such processing by opting out, without having to rely on consent or any other of the legal bases.',
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email Policies',
    content: `If you choose to correspond with us through email, we may retain the content of your email messages together with your email address and our responses. We provide the same protections for these electronic communications that we employ in the maintenance of information received online, mail, and telephone. All e-mails sent by us will be in compliance with the Canadian Anti-Spam Legislation (\u201cCASL\u201d), including clearly stating who the e-mail is from and provide clear information on how to contact the sender.`,
  },
  {
    id: 'disclosure',
    icon: Share2,
    title: 'Disclosure of Information',
    content: `Depending on the requested Services or as necessary to complete any transaction or provide any Service you have requested, we may share your information with our affiliates, contracted companies, and service providers (collectively, \u201cService Providers\u201d) we rely upon to assist in the operation of the Website and Services available to you and whose privacy policies are consistent with ours or who agree to abide by our policies with respect to Personal Information. We will not share any information with unaffiliated third parties.\n\nWe may also disclose any Personal Information we collect, use or receive if required or permitted by law, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.`,
  },
  {
    id: 'retention',
    icon: Clock,
    title: 'Retention of Information',
    content: `We will retain and use your Personal Information for the period necessary to comply with our legal obligations, to enforce our agreements, resolve disputes, and unless a longer retention period is required or permitted by law. We may use any aggregated data derived from or incorporating your Personal Information after you update or delete it, but not in a manner that would identify you personally.`,
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Cookies',
    content: `Our Website and Services may use \u201ccookies\u201d to help personalize your online experience. We may contract with third-party service providers to assist us in better understanding our site visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business.`,
  },
  {
    id: 'links',
    icon: LinkIcon,
    title: 'Links to Other Resources',
    content: `The Website and Services may contain links to other resources that are not owned or controlled by us. Please be aware that we are not responsible for the privacy practices of such other resources or third parties. We encourage you to be aware when you leave the Website and Services and to read the privacy statements of each and every resource that may collect Personal Information.`,
  },
  {
    id: 'security',
    icon: Lock,
    title: 'Information Security',
    content: `We maintain reasonable administrative, technical, and physical safeguards in an effort to protect against unauthorized access, use, modification, and disclosure of Personal Information in our control and custody. However, no data transmission over the Internet or wireless network can be guaranteed. Therefore, while we strive to protect your Personal Information, you acknowledge that (i) there are security and privacy limitations of the Internet which are beyond our control; (ii) the security, integrity, and privacy of any and all information and data exchanged between you and the Website and Services cannot be guaranteed; and (iii) any such information and data may be viewed or tampered with in transit by a third party, despite best efforts.`,
    highlight: true,
  },
  {
    id: 'data-breach',
    icon: AlertTriangle,
    title: 'Data Breach',
    content: `In the event we become aware that the security of the Website and Services has been compromised or Users\u2019 Personal Information has been disclosed to unrelated third parties as a result of external activity, including, but not limited to, security attacks or fraud, we reserve the right to take reasonably appropriate measures, including, but not limited to, investigation and reporting, as well as notification to and cooperation with law enforcement authorities. In the event of a data breach, we will make reasonable efforts to notify affected individuals if we believe that there is a reasonable risk of harm to the User as a result of the breach or if notice is otherwise required by law. When we do, we will probably post a notice on the Website.`,
  },
  {
    id: 'access',
    icon: Eye,
    title: 'Access to Personal Information',
    content: `We will respond promptly to any request for access to your personal information and will advise you of the cost, if any, prior to the retrieval of such records or information. We will not respond to requests for access to personal information that are frivolous, vexatious or repetitious. In certain circumstances, we may be unable to provide access to some or all of the personal information that we hold about you.`,
  },
  {
    id: 'changes',
    icon: Settings,
    title: 'Changes and Amendments',
    content: `We reserve the right to modify this Policy or its terms related to the Website and Services at any time at our discretion. When we do, we will probably revise the updated date at the bottom of this page. An updated version of this Policy will be effective immediately upon the posting of the revised Policy unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Policy (or such other act specified at that time) will constitute your consent to those changes.`,
  },
  {
    id: 'acceptance',
    icon: CheckCircle2,
    title: 'Acceptance of This Policy',
    content: `You acknowledge that you have read this Policy and agree to all its terms and conditions. By accessing and using the Website and Services and submitting your information you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to access or use the Website and Services.`,
  },
  {
    id: 'contact',
    icon: Phone,
    title: 'Contacting Us',
    content: `Any questions about these terms of service and privacy policy should be addressed to us via our contact form.`,
    isLast: true,
  },
];

export default function PrivacyPolicyPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const messages = getMessages(locale as Locale);

  return (
    <div className="bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#B5696B] via-[#B5696B] to-[#1E4A3A]">
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
                { label: 'Privacy Policy' },
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
                <Shield className="w-6 h-6 text-[#C8A97D]" />
              </div>
              <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D]">
                Privacy
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-white/70 mt-4 max-w-2xl"
            >
              Your privacy matters to us. This policy explains how we collect, use, and protect your personal information in compliance with PIPEDA.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex items-center gap-4 mt-6 text-sm text-white/50"
            >
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                Last updated: 29.11.2022
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <Shield className="w-3.5 h-3.5" />
                PIPEDA Compliant
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
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#4A4A5C] hover:bg-[#B5696B]/5 hover:text-[#B5696B] transition-all duration-200 group"
                  >
                    <span className="text-xs font-mono text-[#C8A97D] w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Icon className="w-4 h-4 text-[#8E8E9F] group-hover:text-[#B5696B] transition-colors flex-shrink-0" />
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
            const isAlternate = i % 2 === 1;
            return (
              <ScrollReveal key={section.id}>
                <div
                  id={section.id}
                  className={`rounded-2xl border shadow-[var(--shadow-subtle)] scroll-mt-24 overflow-hidden ${
                    section.highlight
                      ? 'border-[#B5696B]/20 ring-1 ring-[#B5696B]/10 bg-white'
                      : isAlternate
                        ? 'border-[#F3EFE8] bg-[#FAF7F2]'
                        : 'border-[#F3EFE8] bg-white'
                  }`}
                >
                  {/* Section Header */}
                  <div className={`flex items-center gap-4 px-6 md:px-8 py-5 border-b ${
                    section.highlight ? 'border-[#B5696B]/15 bg-[#B5696B]/5' : 'border-[#F3EFE8]'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      section.highlight ? 'bg-[#B5696B]/15 text-[#B5696B]' : 'bg-[#B5696B]/10 text-[#B5696B]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-xs font-mono text-[#C8A97D] bg-[#C8A97D]/10 px-2 py-0.5 rounded-md">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h2
                        className="text-lg md:text-xl font-bold text-[#2D2A33] truncate"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {section.title}
                      </h2>
                    </div>
                    {section.highlight && (
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#B5696B] bg-[#B5696B]/10 px-3 py-1 rounded-full flex-shrink-0">
                        <Shield className="w-3.5 h-3.5" />
                        Key Section
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
                            <div className="w-5 h-5 rounded-full bg-[#B5696B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#B5696B]" />
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
                      <div className="mt-6">
                        <Link
                          href={`/${locale}/contact`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#B5696B] px-5 py-3 rounded-xl hover:bg-[#244F41] transition-colors shadow-sm"
                        >
                          <Phone className="w-4 h-4" />
                          Contact Us
                        </Link>
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
            className="inline-flex items-center gap-2 text-sm text-[#8E8E9F] hover:text-[#B5696B] transition-colors"
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
