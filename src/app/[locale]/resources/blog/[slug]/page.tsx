'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  CheckCircle2,
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
  youth: 'from-[#F0D5CA] to-[#FAF0EC]',
  couples: 'from-[#E8C4C0] to-[#FAF0EC]',
  families: 'from-[#E8D5E0] to-[#F8EEF3]',
  adults: 'from-[#E8E0D0] to-[#FAF5ED]',
};

const ctaThemes: Record<string, { bg: string; accent: string; accentLight: string; icon: string }> = {
  youth: { bg: 'from-[#F0D5CA]/60 via-[#FAF0EC]/40 to-[#FAF7F2]', accent: '#C4878A', accentLight: '#C4878A15', icon: '#C4878A' },
  families: { bg: 'from-[#E8D5E0]/60 via-[#F8EEF3]/40 to-[#FAF7F2]', accent: '#7A3B5E', accentLight: '#7A3B5E15', icon: '#7A3B5E' },
  adults: { bg: 'from-[#E8E0D0]/60 via-[#FAF5ED]/40 to-[#FAF7F2]', accent: '#C8A97D', accentLight: '#C8A97D15', icon: '#C8A97D' },
  couples: { bg: 'from-[#E8C4C0]/60 via-[#FAF0EC]/40 to-[#FAF7F2]', accent: '#C4878A', accentLight: '#C4878A15', icon: '#C4878A' },
};

function BlogNewsletterForm({ theme, messages, isRTL }: { theme: { accent: string }; messages: Record<string, any>; isRTL: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'invalid'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('invalid'); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      if (res.ok) { setStatus('success'); setEmail(''); } else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <p className="text-sm font-semibold text-green-700">{isRTL ? 'شكرًا لاشتراكك!' : 'Subscribed successfully!'}</p>
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle'); }}
          placeholder={messages.newsletter?.placeholder || (isRTL ? 'بريدك الإلكتروني' : 'Your email')}
          className="flex-1 px-5 py-3.5 rounded-full border bg-white/95 text-[16px] text-[#2D2A33] placeholder:text-[#8E8E9F] outline-none focus:ring-2 transition-all"
          style={{ borderColor: `${theme.accent}20` }}
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-60"
          style={{ backgroundColor: theme.accent }}
        >
          {status === 'loading' ? (isRTL ? 'جارٍ...' : 'Sending...') : (messages.newsletter?.subscribe || 'Subscribe')}
        </button>
      </form>
      {status === 'invalid' && <p className="text-xs text-[#C8A97D] mt-3 text-center">{isRTL ? 'يرجى إدخالُ بريدٍ صحيح.' : 'Please enter a valid email.'}</p>}
      {status === 'error' && <p className="text-xs text-red-500 mt-3 text-center">{isRTL ? 'حدث خطأ. حاول مرةً أخرى.' : 'Something went wrong. Try again.'}</p>}
      <p className="text-xs text-[#8E8E9F] mt-4">{messages.newsletter?.privacy || (isRTL ? 'نحترم خصوصيّتك.' : 'We respect your privacy. Unsubscribe at any time.')}</p>
    </>
  );
}

/* Giscus comments removed — not configured yet */

export default function BlogPostPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const [shareCopied, setShareCopied] = useState(false);

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
            className={`mt-10 max-w-3xl ${isRTL ? 'text-right' : ''}`}
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
                <div className="space-y-5">
                  {content.map((block: string, index: number) => {
                    // H2 headings
                    if (block.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl lg:text-[26px] font-bold text-[#2D2A33] mt-10 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                          {block.slice(3)}
                        </h2>
                      );
                    }
                    // H3 headings
                    if (block.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-xl font-bold text-[#2D2A33] mt-8 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                          {block.slice(4)}
                        </h3>
                      );
                    }
                    // Bullet list items (collect consecutive bullets)
                    if (block.startsWith('• ') || block.startsWith('- ')) {
                      const items = block.split('\n').filter(Boolean);
                      return (
                        <ul key={index} className="space-y-2.5 my-4">
                          {items.map((item, i) => {
                            const text = item.replace(/^[•\-]\s*/, '');
                            // Support bold lead-in: **Bold:** rest of text
                            const boldMatch = text.match(/^\*\*(.+?)\*\*[:\s]*(.*)/);
                            return (
                              <li key={i} className={`flex items-start gap-3 text-[#4A4A5C] leading-[1.7] text-[15px] ${isRTL ? 'text-right' : ''}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97D] mt-2.5 flex-shrink-0" />
                                <span>
                                  {boldMatch
                                    ? <><strong className="text-[#2D2A33] font-semibold">{boldMatch[1]}:</strong> {boldMatch[2]}</>
                                    : text
                                  }
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      );
                    }
                    // Numbered items (1. 2. 3.)
                    if (/^\d+\.\s/.test(block)) {
                      const items = block.split('\n').filter(Boolean);
                      return (
                        <ol key={index} className="space-y-3 my-4">
                          {items.map((item, i) => {
                            const text = item.replace(/^\d+\.\s*/, '');
                            const boldMatch = text.match(/^\*\*(.+?)\*\*[:\s]*(.*)/);
                            return (
                              <li key={i} className={`flex items-start gap-3 text-[#4A4A5C] leading-[1.7] text-[15px] ${isRTL ? 'text-right' : ''}`}>
                                <span className="w-6 h-6 rounded-full bg-[#7A3B5E]/10 text-[#7A3B5E] text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">{i + 1}</span>
                                <span>
                                  {boldMatch
                                    ? <><strong className="text-[#2D2A33] font-semibold">{boldMatch[1]}</strong> {boldMatch[2]}</>
                                    : text
                                  }
                                </span>
                              </li>
                            );
                          })}
                        </ol>
                      );
                    }
                    // Blockquote
                    if (block.startsWith('> ')) {
                      return (
                        <blockquote key={index} className={`${isRTL ? 'border-r-3 pr-5' : 'border-l-3 pl-5'} border-[#C8A97D] bg-[#FAF7F2] rounded-xl p-5 my-6 italic text-[#6B6580] leading-[1.8] text-[15px]`}>
                          {block.slice(2)}
                        </blockquote>
                      );
                    }
                    // Regular paragraph
                    return (
                      <p
                        key={index}
                        className="text-[#4A4A5C] leading-[1.8] text-[16px] lg:text-[17px]"
                        style={index === 0 ? { fontSize: '18px', color: '#2D2A33', fontWeight: 500 } : undefined}
                      >
                        {block}
                      </p>
                    );
                  })}
                </div>

                {/* Share section */}
                <div className="mt-10 pt-8 border-t border-[#F3EFE8]">
                  <div className={`flex items-center justify-between`}>
                    <div className={`flex items-center gap-3 ${isRTL ? 'text-right' : ''}`}>
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
                    <button
                      onClick={async () => {
                        const url = window.location.href;
                        const title = isRTL ? post.titleAr : post.titleEn;
                        if (navigator.share) {
                          try { await navigator.share({ title, url }); } catch {}
                        } else {
                          await navigator.clipboard.writeText(url);
                          setShareCopied(true);
                          setTimeout(() => setShareCopied(false), 2000);
                        }
                      }}
                      className="flex items-center gap-2 text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors"
                    >
                      {shareCopied ? <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> : <Share2 className="w-4 h-4" />}
                      <span className="text-sm">{shareCopied ? (isRTL ? 'تمّ النسخ!' : 'Link copied!') : (messages.common.share)}</span>
                    </button>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CATEGORY-THEMED NEWSLETTER CTA                                  */}
      {/* ================================================================ */}
      {(() => {
        const theme = ctaThemes[post.category] || ctaThemes.adults;
        return (
          <section className="py-16 lg:py-20 bg-white">
            <div className="container-main">
              <ScrollReveal>
                <div className={`relative bg-gradient-to-br ${theme.bg} rounded-3xl p-10 lg:p-14 overflow-hidden border border-[#F3EFE8]`}>
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full hidden lg:block blur-3xl pointer-events-none" style={{ backgroundColor: `${theme.accent}08` }} />
                  <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full hidden lg:block blur-3xl pointer-events-none" style={{ backgroundColor: `${theme.accent}06` }} />
                  <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 0.5px, transparent 0)',
                      backgroundSize: '32px 32px',
                      color: theme.accent,
                    }}
                  />

                  <div className="relative z-10 max-w-xl mx-auto text-center">
                    {/* Icon */}
                    <motion.div
                      className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                      style={{ backgroundColor: theme.accentLight }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={viewportOnce}
                      transition={{ delay: 0.1, duration: 0.5, ease }}
                    >
                      <Mail className="w-6 h-6" style={{ color: theme.accent }} />
                    </motion.div>

                    <h2
                      className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-3"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {isRTL ? 'أعجبك المقال؟' : 'Enjoyed This Article?'}
                    </h2>
                    <p className="text-[#4A4A5C] mb-8 leading-relaxed">
                      {isRTL
                        ? 'اشترك واحصل على نصائح ومقالات حصرية في بريدك مباشرة'
                        : 'Subscribe to get exclusive tips and articles delivered straight to your inbox'
                      }
                    </p>

                    <BlogNewsletterForm theme={theme} messages={messages} isRTL={isRTL} />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        );
      })()}

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
                        className={`relative h-44 ${related.coverImage ? '' : `bg-gradient-to-br ${gradientMap[related.category] || 'from-[#C4878A] to-[#B07578]'}`} flex items-center justify-center overflow-hidden`}
                      >
                        {related.coverImage ? (
                          <Image
                            src={related.coverImage}
                            alt={isRTL ? related.titleAr : related.titleEn}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <BookOpen className="w-10 h-10 text-white/20" />
                        )}
                        <div className="absolute top-4 left-4">
                          <Badge
                            variant={badgeVariants[related.category] || 'sage'}
                            size="sm"
                          >
                            {getCategoryLabel(related.category, isRTL)}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 rounded-full px-3 py-1 text-white text-xs">
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
          </div>
        </section>
      )}
    </div>
  );
}
