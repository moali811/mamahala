'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Share2,
  Mail,
  Sparkles,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import {
  getPostBySlug,
  getRelatedPosts,
  getCategoryLabel,
} from '@/data/blog-posts';

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

export default function BlogPostPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const post = getPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug, 2);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <h1
            className="text-3xl font-bold text-[#2D2A33] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {isRTL ? 'المقال غير موجود' : 'Post Not Found'}
          </h1>
          <Button as="a" href={`/${locale}/resources/blog`}>
            {isRTL ? 'العودة إلى المدونة' : 'Back to Blog'}
          </Button>
        </div>
      </div>
    );
  }

  const title = isRTL ? post.titleAr : post.titleEn;
  const content = isRTL ? post.contentAr : post.contentEn;
  const category = getCategoryLabel(post.category, isRTL);
  const authorName = isRTL ? 'د. هالة علي' : 'Dr. Hala Ali';

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-28 lg:pt-40 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C4878A]/[0.08] blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] rounded-full bg-[#C8A97D]/[0.08] blur-[80px]" />
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
                { label: messages.resources.blog, href: `/${locale}/resources/blog` },
                { label: title },
              ]}
              locale={locale}
              light
            />
          </motion.div>

          <motion.div
            className="mt-10 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Category Badge */}
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <Badge
                variant={badgeVariants[post.category] || 'sage'}
                size="md"
                className="!bg-[#C4878A]/15 !text-[#7A3B5E]"
              >
                {category}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2D2A33] leading-[1.15] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {title}
            </motion.h1>

            {/* Meta info */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="mt-6 flex flex-wrap items-center gap-4 text-[#6B6580] text-sm"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {post.readTime} {messages.common.minutes} {isRTL ? 'قراءة' : 'read'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  ARTICLE BODY                                                    */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2]">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <article className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#F3EFE8]">
                <div className="space-y-6">
                  {content.map((paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="text-[#4A4A5C] leading-[1.8] text-[16px] lg:text-[17px]"
                      style={index === 0 ? { fontSize: '18px', color: '#2D2A33', fontWeight: 500 } : undefined}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Share section */}
                <div className="mt-10 pt-8 border-t border-[#F3EFE8]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#C4878A]/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-[#7A3B5E]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2D2A33]">
                          {authorName}
                        </p>
                        <p className="text-xs text-[#8E8E9F]">
                          {isRTL ? 'مستشارة عائلية معتمدة' : 'Certified Family Counselor'}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">{messages.common.share}</span>
                    </button>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  RELATED POSTS                                                   */}
      {/* ================================================================ */}
      {relatedPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-[#FAF7F2]">
          <div className="container-main">
            <ScrollReveal className="text-center mb-12">
              <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
                {isRTL ? 'اقرأ أيضًا' : 'Keep Reading'}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'مقالات ذات صلة' : 'Related Articles'}
              </h2>
            </ScrollReveal>

            <StaggerReveal className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((related) => (
                <StaggerChild key={related.slug}>
                  <Link href={`/${locale}/resources/blog/${related.slug}`}>
                    <motion.article
                      className="group bg-white rounded-3xl overflow-hidden border border-transparent hover:border-[#C4878A]/10 transition-all duration-300"
                      whileHover={{
                        y: -4,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                      }}
                    >
                      <div
                        className={`relative h-44 bg-gradient-to-br ${gradientMap[related.category] || 'from-[#C4878A] to-[#B07578]'} flex items-center justify-center`}
                      >
                        <BookOpen className="w-10 h-10 text-white/20" />
                        <div className="absolute top-4 left-4">
                          <Badge
                            variant={badgeVariants[related.category] || 'sage'}
                            size="sm"
                          >
                            {getCategoryLabel(related.category, isRTL)}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs">
                          <Clock className="w-3 h-3" />
                          <span>
                            {related.readTime} {messages.common.minutes}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3
                          className="text-lg font-bold text-[#2D2A33] leading-snug mb-3 group-hover:text-[#7A3B5E] transition-colors duration-300"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {isRTL ? related.titleAr : related.titleEn}
                        </h3>
                        <div className="flex items-center gap-2 text-[#7A3B5E] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
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
      )}
    </div>
  );
}
