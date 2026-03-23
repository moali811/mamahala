'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Youtube,
} from 'lucide-react';
import { SnapchatIcon, TelegramIcon, TiktokIcon } from '@/components/icons/SocialIcons';
import { getMessages, type Locale } from '@/lib/i18n';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

/* ================================================================
   Contact Page
   ================================================================ */

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
  };

  const breadcrumbItems = [
    { label: messages.nav.home, href: `/${locale}` },
    { label: messages.nav.contact },
  ];

  const contactCards = [
    {
      icon: Phone,
      label: messages.contact.phone,
      value: '+1 (613) 222-2104',
      href: 'tel:+16132222104',
    },
    {
      icon: Mail,
      label: messages.contact.email,
      value: 'admin@mamahala.ca',
      href: 'mailto:admin@mamahala.ca',
    },
    {
      icon: MapPin,
      label: messages.contact.location,
      value: 'Ottawa, ON, Canada',
    },
    {
      icon: Clock,
      label: messages.contact.hours,
      value: messages.contact.hoursDetail,
    },
  ];

  const socials = [
    { icon: Instagram, href: 'https://www.instagram.com/mamahala.ca/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/mamahala.ca', label: 'Facebook' },
    { icon: Youtube, href: 'https://youtube.com/@MamaHala-ca?si=pwg5_hhRIfXt-usP', label: 'YouTube' },
    { icon: TiktokIcon, href: 'https://www.tiktok.com/@mamahala.ca?_t=8jv2H8Tkli2&_r=1', label: 'TikTok' },
    { icon: SnapchatIcon, href: 'https://www.snapchat.com/add/mamahala.ca', label: 'Snapchat' },
    { icon: TelegramIcon, href: 'https://t.me/+Ut1Xms3zRX5jMmNh', label: 'Telegram' },
  ];

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                           */}
      {/* ================================================================ */}
      <section className="relative bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC] overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C4878A]/[0.04] blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full bg-[#C8A97D]/[0.08] blur-[60px]" />
        </div>

        <div className="container-main relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumb items={breadcrumbItems} locale={locale} />
          </motion.div>

          <motion.h1
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {messages.contact.pageTitle}
          </motion.h1>

          <motion.p
            className="mt-4 text-lg text-[#4A4A5C] max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {messages.contact.subtitle}
          </motion.p>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  FORM + INFO                                                    */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* ---------- LEFT: FORM ---------- */}
            <ScrollReveal
              direction={isRTL ? 'right' : 'left'}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-[var(--shadow-card)]">
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-8"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {messages.contact.formTitle}
                </h2>

                <AnimatePresence mode="wait">
                  {sent ? (
                    /* ---- Success State ---- */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          damping: 15,
                          delay: 0.15,
                        }}
                        className="w-20 h-20 rounded-full bg-[#C4878A]/10 flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10 text-[#7A3B5E]" />
                      </motion.div>
                      <h3
                        className="text-2xl font-bold text-[#2D2A33] mb-2"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {messages.contact.sent}
                      </h3>
                      <p className="text-[#8E8E9F] max-w-sm">
                        {messages.contact.sentDesc}
                      </p>
                    </motion.div>
                  ) : (
                    /* ---- Form ---- */
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          label={messages.contact.firstName}
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          label={messages.contact.lastName}
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          label={messages.contact.emailField}
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          label={messages.contact.phoneField}
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Textarea */}
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder={messages.contact.messageField}
                          className="
                            peer w-full px-4 pt-6 pb-3 rounded-xl border bg-white text-[#2D2A33]
                            transition-all duration-200 outline-none resize-none
                            border-[#F3EFE8] focus:border-[#7A3B5E] focus:ring-2 focus:ring-[#7A3B5E]/10
                            hover:border-[#C4878A]/30 placeholder-transparent
                          "
                        />
                        <label
                          htmlFor="message"
                          className="
                            absolute left-4 top-2 text-xs font-medium text-[#7A3B5E]
                            transition-all duration-200 pointer-events-none
                            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                            peer-placeholder-shown:text-[#8E8E9F] peer-placeholder-shown:font-normal
                            peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-[#7A3B5E]
                          "
                        >
                          {messages.contact.messageField}
                        </label>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          size="lg"
                          loading={sending}
                          icon={<Send className="w-4 h-4" />}
                          fullWidth
                        >
                          {sending
                            ? messages.contact.sending
                            : messages.contact.send}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>

            {/* ---------- RIGHT: INFO ---------- */}
            <ScrollReveal
              direction={isRTL ? 'left' : 'right'}
              delay={0.15}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* WhatsApp CTA */}
              <motion.a
                href="https://wa.me/16132222104"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-3xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-8 text-white overflow-hidden"
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(37,211,102,0.25)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.06] rounded-full -translate-y-1/2 translate-x-1/2" />
                <MessageCircle className="w-10 h-10 mb-4 opacity-90" />
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {messages.contact.whatsapp}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {isRTL
                    ? 'تواصل معنا مباشرة عبر واتساب للرد السريع'
                    : 'Message us directly on WhatsApp for a quick response'}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold bg-white/20 rounded-full px-4 py-2 group-hover:bg-white/30 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {isRTL ? 'ابدأ المحادثة' : 'Start Chat'}
                </div>
              </motion.a>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactCards.map((card, i) => {
                  const Icon = card.icon;
                  const inner = (
                    <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-[#F3EFE8] hover:border-[#C4878A]/20 hover:shadow-[var(--shadow-subtle)] transition-all duration-300 h-full">
                      <div className="w-11 h-11 rounded-xl bg-[#C4878A]/[0.08] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#7A3B5E]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#8E8E9F] mb-0.5">
                          {card.label}
                        </p>
                        <p className="text-[15px] font-medium text-[#2D2A33] leading-snug">
                          {card.value}
                        </p>
                      </div>
                    </div>
                  );

                  if (card.href) {
                    return (
                      <a key={i} href={card.href} className="block">
                        {inner}
                      </a>
                    );
                  }
                  return <div key={i}>{inner}</div>;
                })}
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-6 border border-[#F3EFE8]">
                <p className="text-sm font-semibold text-[#2D2A33] mb-4">
                  {messages.contact.followUs}
                </p>
                <div className="flex items-center gap-3">
                  {socials.map((s, i) => {
                    const SIcon = s.icon;
                    return (
                      <motion.a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-11 h-11 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#4A4A5C] hover:bg-[#7A3B5E] hover:text-white transition-all duration-200"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <SIcon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
