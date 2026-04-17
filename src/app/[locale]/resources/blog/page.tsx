'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import BlogCoverImage from '@/components/ui/BlogCoverImage';
import { motion } from 'framer-motion';
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  Heart,
  Sparkles,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import HeroDecorCluster from '@/components/ui/HeroDecorCluster';
import FinalCTA from '@/components/shared/FinalCTA';
import { useBlog } from '@/hooks/useBlog';

const badgeVariants: Record<string, 'sage' | 'plum' | 'sand' | 'neutral'> = {
  youth: 'sage',
  couples: 'plum',
  families: 'sand',
  adults: 'neutral',
};

const gradientMap: Record<string, string> = {
  youth: 'from-[#C4878A] to-[#B07578]',
  couples: 'from-[#7A3B5E] to-[#5E2D48]',
  families: 'from-[#C8A97D] to-[#B08D5E]',
  adults: 'from-[#4A4A5C] to-[#2D2A33]',
};

export default function BlogListingPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const { posts: allPosts, getCategoryLabel } = useBlog();

  const allFilteredPosts = (
    activeCategory === 'All'
      ? allPosts
      : allPosts.filter(p => p.category === activeCategory)
  ).sort((a, b) => {
    const aNew = a.publishDate && (Date.now() - new Date(a.publishDate).getTime() < 14 * 86400000);
    const bNew = b.publishDate && (Date.now() - new Date(b.publishDate).getTime() < 14 * 86400000);
    return (bNew ? 1 : 0) - (aNew ? 1 : 0);
  });

  const totalPages = Math.ceil(allFilteredPosts.length / POSTS_PER_PAGE);
  const filteredPosts = allFilteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const categories = Array.from(new Set(allPosts.map(p => p.category)));

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5E8E5] via-[#F8EDE8] to-[#FAF7F2]" />
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

        {/* Decorative stacked article cluster — desktop only */}
        <HeroDecorCluster
          locale={locale}
          cards={[
            {
              icon: BookOpen,
              color: '#C4878A',
              eyebrowEn: 'For Couples',
              eyebrowAr: 'لِلأَزْواج',
              titleEn: 'When silence isn\u2019t peace',
              titleAr: 'حينَ لا يَكونُ الصَّمْتُ سَلاماً',
              accent: { type: 'caption', textEn: '7 min read · Communication', textAr: '٧ دَقائِق · التَّواصُل' },
            },
            {
              icon: Heart,
              color: '#C8A97D',
              eyebrowEn: 'For Families',
              eyebrowAr: 'لِلعائِلات',
              titleEn: 'The dinner table fix',
              titleAr: 'إِصْلاحُ طاوِلَةِ العَشاء',
              accent: { type: 'caption', textEn: '5 min read · Connection', textAr: '٥ دَقائِق · التَّواصُل' },
            },
            {
              icon: TrendingUp,
              color: '#5A8B6E',
              eyebrowEn: 'Most Read',
              eyebrowAr: 'الأَكْثَرُ قِراءَةً',
              titleEn: 'Raising teens with empathy',
              titleAr: 'تَرْبِيَةُ المُراهِقينَ بِتَعاطُف',
              accent: { type: 'bar', value: 78, captionEn: 'Trending this month', captionAr: 'الأَكْثَرُ تَداوُلاً هذا الشَّهْر' },
            },
          ]}
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
            className={`mt-10 max-w-3xl ${isRTL ? 'text-right' : ''}`}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-4"
            >
              {isRTL ? 'رؤىً ومقالات' : 'Insights & Articles'}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'قراءاتٌ تصنعُ فَرْقًا' : 'Reads That Make a Difference'}
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

        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  CATEGORY FILTER & BLOG GRID                                     */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          {/* Category Filter Tabs */}
          <ScrollReveal className="mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['All', ...categories].map((cat) => {
                const label = cat === 'All' ? (isRTL ? 'الكل' : 'All') : getCategoryLabel(cat, isRTL);
                return (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-[#7A3B5E] text-white shadow-sm'
                        : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:border-[#C4878A]/30 hover:text-[#7A3B5E]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Blog Post Grid */}
          <StaggerReveal key={`${activeCategory}-${currentPage}-${allFilteredPosts.length}`} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    {/* Cover image or gradient placeholder */}
                    <div className="relative h-52 overflow-hidden">
                      <BlogCoverImage
                        src={post.coverImage || ''}
                        alt={isRTL ? post.titleAr : post.titleEn}
                        gradient={gradientMap[post.category] || 'from-[#C4878A] to-[#B07578]'}
                      />
                      {/* Category badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-1.5">
                        <Badge variant={badgeVariants[post.category] || 'sage'} size="sm">
                          {getCategoryLabel(post.category, isRTL)}
                        </Badge>
                        {post.publishDate && (Date.now() - new Date(post.publishDate).getTime() < 14 * 86400000) && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-[#C4878A] to-[#7A3B5E] shadow-sm animate-pulse">
                            <Sparkles className="w-2.5 h-2.5" /> {isRTL ? 'جديد' : 'New'}
                          </span>
                        )}
                      </div>
                      {/* Reading time */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 rounded-full px-3 py-1 text-white text-xs">
                        <Clock className="w-3 h-3" />
                        <span>
                          {post.readTime} {messages.common.minutes}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8">
                      <h3
                        className="text-lg font-bold text-[#2D2A33] leading-snug mb-3 group-hover:text-[#7A3B5E] transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {isRTL ? post.titleAr : post.titleEn}
                      </h3>
                      <p className="text-sm text-[#6B6580] leading-relaxed mb-4 line-clamp-2">
                        {isRTL ? post.excerptAr : post.excerptEn}
                      </p>
                      <div className={`flex items-center gap-2 text-[#7A3B5E] font-semibold text-sm group-hover:gap-3 transition-all duration-300`}>
                        <span>{messages.common.readMore}</span>
                        <Arrow className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </StaggerChild>
            ))}
          </StaggerReveal>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                onClick={() => { setCurrentPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#F3EFE8] bg-white text-[#4A4A5C] hover:bg-[#F3EFE8] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-[#7A3B5E] text-white shadow-md'
                      : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:bg-[#F3EFE8]'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => { setCurrentPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#F3EFE8] bg-white text-[#4A4A5C] hover:bg-[#F3EFE8] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={<>Knowledge Is the First Step to <span className="text-[#7A3B5E] italic">Change</span></>}
        headingAr={<>المعرفةُ أولُ خطوةٍ نحو <span className="text-[#7A3B5E] italic">التغيير</span></>}
        primaryTextEn="I'm Ready to Start"
        primaryTextAr="أنا مستعدّ للبدء"
        secondaryTextEn="Explore Services"
        secondaryTextAr="استكشِفْ الخدمات"
        secondaryHref={`/${locale}/services`}
      />
    </div>
  );
}
