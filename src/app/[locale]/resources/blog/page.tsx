'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Mail,
  Search,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const blogPosts = [
  {
    slug: 'child-emotional-support',
    title: '5 Signs Your Child Needs Emotional Support',
    titleAr: '5 علامات أن طفلك يحتاج إلى دعم عاطفي',
    cat: 'Youth',
    catAr: 'الشباب',
    time: 5,
    gradient: 'from-[#C4878A] to-[#B07578]',
  },
  {
    slug: 'communication-techniques',
    title: 'Communication Techniques That Transform Relationships',
    titleAr: 'تقنيات التواصل التي تحول العلاقات',
    cat: 'Couples',
    catAr: 'الأزواج',
    time: 7,
    gradient: 'from-[#7A3B5E] to-[#5E2D48]',
  },
  {
    slug: 'parental-burnout',
    title: 'Managing Parental Burnout: A Practical Guide',
    titleAr: 'إدارة إرهاق الوالدين: دليل عملي',
    cat: 'Families',
    catAr: 'العائلات',
    time: 6,
    gradient: 'from-[#C8A97D] to-[#B08D5E]',
  },
  {
    slug: 'understanding-anxiety',
    title: 'Understanding Anxiety: When to Seek Professional Help',
    titleAr: 'فهم القلق: متى تطلب المساعدة المهنية',
    cat: 'Adults',
    catAr: 'البالغين',
    time: 8,
    gradient: 'from-[#4A4A5C] to-[#2D2A33]',
  },
];

const categories = ['All', 'Youth', 'Families', 'Adults', 'Couples'];
const categoriesAr: Record<string, string> = {
  All: 'الكل',
  Youth: 'الشباب',
  Families: 'العائلات',
  Adults: 'البالغين',
  Couples: 'الأزواج',
};

const badgeVariants: Record<string, 'sage' | 'plum' | 'sand' | 'neutral'> = {
  Youth: 'sage',
  Couples: 'plum',
  Families: 'sand',
  Adults: 'neutral',
};

export default function BlogListingPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const [activeCategory, setActiveCategory] = useState('All');

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const filteredPosts =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.cat === activeCategory);

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C4878A]/[0.08] blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] rounded-full bg-[#C8A97D]/[0.12] blur-[80px]" />
        </div>
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
                { label: messages.resources.pageTitle, href: `/${locale}/resources` },
                { label: messages.resources.blog },
              ]}
              locale={locale}
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
              {isRTL ? 'مدونتنا' : 'Our Blog'}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.resources.blog}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed"
            >
              {messages.resources.blogDesc}
            </motion.p>
          </motion.div>
        </div>

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
      {/*  CATEGORY FILTER & BLOG GRID                                     */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-[#FAF7F2]">
        <div className="container-main">
          {/* Category Filter Tabs */}
          <ScrollReveal className="mb-12">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                    ${
                      activeCategory === cat
                        ? 'bg-[#C4878A] text-white shadow-[0_4px_12px_rgba(43,95,78,0.3)]'
                        : 'bg-white text-[#4A4A5C] hover:bg-[#F3EFE8] border border-[#F3EFE8]'
                    }
                  `}
                  whileTap={{ scale: 0.97 }}
                >
                  {isRTL ? categoriesAr[cat] : cat}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Blog Post Grid */}
          <StaggerReveal className="grid sm:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <StaggerChild key={post.slug}>
                <Link href={`/${locale}/resources/blog/${post.slug}`}>
                  <motion.article
                    className="group bg-white rounded-3xl overflow-hidden border border-transparent hover:border-[#C4878A]/10 transition-all duration-300"
                    whileHover={{
                      y: -4,
                      boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                    }}
                  >
                    {/* Image placeholder */}
                    <div
                      className={`relative h-52 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}
                    >
                      <BookOpen className="w-12 h-12 text-white/20" />
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <Badge variant={badgeVariants[post.cat] || 'sage'} size="sm">
                          {isRTL ? post.catAr : post.cat}
                        </Badge>
                      </div>
                      {/* Reading time */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs">
                        <Clock className="w-3 h-3" />
                        <span>
                          {post.time} {messages.common.minutes}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8">
                      <h3
                        className="text-lg font-bold text-[#2D2A33] leading-snug mb-3 group-hover:text-[#C4878A] transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? post.titleAr : post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[#C4878A] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>{messages.common.readMore}</span>
                        <Arrow className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  NEWSLETTER CTA                                                  */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="relative bg-gradient-to-br from-[#C4878A] to-[#B07578] rounded-3xl p-10 lg:p-16 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.06]" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#C8A97D]/[0.08]" />

              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.1, duration: 0.5, ease }}
                >
                  <Mail className="w-4 h-4 text-[#C8A97D]" />
                  <span className="text-sm text-white/80 font-medium">
                    {messages.newsletter.title}
                  </span>
                </motion.div>

                <h2
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {messages.newsletter.title}
                </h2>
                <p className="text-white/75 leading-relaxed mb-8">
                  {messages.newsletter.leadMagnet}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={messages.newsletter.placeholder}
                    className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                  />
                  <Button
                    variant="secondary"
                    className="!bg-white !text-[#C4878A] hover:!bg-[#F3EFE8]"
                  >
                    {messages.newsletter.subscribe}
                  </Button>
                </div>
                <p className="text-xs text-white/50 mt-4">
                  {messages.newsletter.privacy}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
