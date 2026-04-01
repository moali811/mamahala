'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Calendar, MessageCircle, Sparkles,
  GraduationCap, Users, User, Heart, Leaf, Clock, HelpCircle, Sprout, Smile, TreePine,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { serviceCategories, getServicesByCategory, getCategoryInfo } from '@/data/services';
import { getTestimonialsByCategory } from '@/data/testimonials';
import type { ServiceCategory } from '@/types';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';
import ContextualFAQ from '@/components/ui/ContextualFAQ';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Users, User, Heart, Leaf, Sparkles, Sprout, Smile, TreePine,
};

// Stock photos mapped to service slugs for visual storytelling
const serviceImages: Record<string, string> = {
  'teen-behavioral-coaching': '/images/services/teen-behavioral.jpg',
  'social-confidence-friendship': '/images/services/social-confidence.jpg',
  'under-18-counseling': '/images/services/under18-counseling.jpg',
  'supporting-children-through-change': '/images/services/child-big-change.jpg',
  'cbt-youth': '/images/services/teen-emotional.jpg',
  'bullying-support': '/images/services/bullying-support.jpg',
  'managing-big-emotions': '/images/services/managing-emotions.jpg',
  'family-relationship-strengthening': '/images/services/family-strengthening.jpg',
  'parenting-coaching': '/images/services/parenting-coaching.jpg',
  'tackling-child-tantrums': '/images/services/child-tantrums.jpg',
  'parental-stress-wellbeing': '/images/services/parental-wellbeing.jpg',
  'anxiety-counseling': '/images/services/anxiety-counseling.jpg',
  'anger-management': '/images/services/anger-management.jpg',
  'university-student-session': '/images/service-students.jpg',
  'adhd-executive-function-coaching': '/images/services/adhd-coaching.jpg',
  'lifestyle-coaching': '/images/services/lifestyle-coaching.jpg',
  'life-coaching': '/images/services/life-coaching.jpg',
  'self-development-coaching': '/images/services/self-development.jpg',
  'pre-marital-education': '/images/services/premarital.jpg',
  'couples-counseling': '/images/services/couple-counseling.jpg',
  'horticultural-plant-therapy': '/images/services/plant-therapy.jpg',
  'walk-and-talk': '/images/services/walk-talk-therapy.jpg',
};

// Category accent colors
const categoryAccents: Record<string, string> = {
  youth: '#C4878A',
  families: '#7A3B5E',
  adults: '#C8A97D',
  couples: '#D4836A',
  experiential: '#5A8A6E',
};

// Scenario-based "Help Me Choose" per category
const categoryScenarios: Record<string, { en: string; ar: string; slug: string }[]> = {
  youth: [
    { en: 'My teen is acting out or rebellious', ar: 'ابني المراهق يتصرف بتمرد', slug: 'teen-behavioral-coaching' },
    { en: 'My child is being bullied', ar: 'طفلي يتعرض للتنمر', slug: 'bullying-support' },
    { en: 'My child struggles with big emotions', ar: 'طفلي يعاني من مشاعر قوية', slug: 'managing-big-emotions' },
    { en: 'We\'re going through a family change', ar: 'نمر بتغيير عائلي', slug: 'supporting-children-through-change' },
    { en: 'My teen lacks confidence socially', ar: 'ابني يفتقر للثقة الاجتماعية', slug: 'social-confidence-friendship' },
    { en: 'I need general support for my child', ar: 'أحتاج دعمًا عامًا لطفلي', slug: 'under-18-counseling' },
  ],
  families: [
    { en: 'We\'re struggling to communicate', ar: 'نعاني من صعوبة في التواصل', slug: 'family-relationship-strengthening' },
    { en: 'I need parenting guidance', ar: 'أحتاج توجيهًا في التربية', slug: 'parenting-coaching' },
    { en: 'My child has frequent tantrums', ar: 'طفلي يعاني من نوبات غضب متكررة', slug: 'tackling-child-tantrums' },
    { en: 'I\'m overwhelmed as a parent', ar: 'أشعر بالإرهاق كأم/أب', slug: 'parental-stress-wellbeing' },
  ],
  adults: [
    { en: 'I\'m dealing with anxiety or worry', ar: 'أعاني من القلق والتوتر', slug: 'anxiety-counseling' },
    { en: 'I struggle with anger', ar: 'أعاني من مشاكل الغضب', slug: 'anger-management' },
    { en: 'I have trouble focusing (ADHD)', ar: 'أعاني من صعوبة التركيز', slug: 'adhd-executive-function-coaching' },
    { en: 'I want to improve my lifestyle', ar: 'أريد تحسين نمط حياتي', slug: 'lifestyle-coaching' },
    { en: 'I\'m at a crossroads in life', ar: 'أنا في مفترق طرق', slug: 'self-development-coaching' },
    { en: 'I\'m a university student needing support', ar: 'أنا طالب جامعي أحتاج دعمًا', slug: 'university-student-session' },
  ],
  couples: [
    { en: 'We\'re getting married soon', ar: 'نحن مقبلون على الزواج', slug: 'pre-marital-education' },
    { en: 'Our relationship needs help', ar: 'علاقتنا تحتاج مساعدة', slug: 'couples-counseling' },
  ],
  experiential: [
    { en: 'I prefer therapy outdoors', ar: 'أفضل العلاج في الهواء الطلق', slug: 'walk-and-talk' },
    { en: 'I find peace in nature & plants', ar: 'أجد السلام في الطبيعة والنباتات', slug: 'horticultural-plant-therapy' },
  ],
};

export default function ServiceCategoryPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const category = params?.category as ServiceCategory;
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const catInfo = getCategoryInfo(category);
  const services = getServicesByCategory(category);
  const categoryTestimonials = getTestimonialsByCategory(category);

  if (!catInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#8E8E9F]">Category not found</p>
      </div>
    );
  }

  const name = isRTL ? catInfo.nameAr : catInfo.name;
  const subtitle = isRTL ? catInfo.subtitleAr : catInfo.subtitle;
  const description = isRTL ? catInfo.descriptionAr : catInfo.description;
  const IconComponent = iconMap[catInfo.icon] || Users;
  const accent = categoryAccents[category] || '#C8A97D';

  const getWhatsAppLink = (serviceName: string) => {
    const msg = encodeURIComponent(
      isRTL
        ? `مرحبا، أود حجز جلسة: ${serviceName}`
        : `Hi, I would like to book a session: ${serviceName}`
    );
    return `https://wa.me/16132222104?text=${msg}`;
  };

  return (
    <div className="bg-[#FAF7F2]">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#C4878A]/8 hidden lg:block blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C8A97D]/30 hidden lg:block blur-3xl" />
        </div>
        <div className="container-main relative pt-24 pb-16 md:pt-28 md:pb-20">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb
              locale={locale}
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.nav.services, href: `/${locale}/services` },
                { label: name },
              ]}
            />
          </motion.div>
          <motion.div
            className={`mt-6 flex items-center gap-4 ${isRTL ? 'text-right' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${accent}15` }}
            >
              <IconComponent className="w-7 h-7 text-[#C8A97D]" />
            </div>
            <div>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {name}
              </h1>
              <p className="text-[#6B6580] mt-1">{subtitle}</p>
            </div>
          </motion.div>
          <motion.p
            className={`text-[#4A4A5C] max-w-2xl mt-6 text-lg leading-relaxed ${isRTL ? 'text-right' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>


      {/* ─── HELP ME CHOOSE ─── */}
      {(categoryScenarios[category]?.length ?? 0) > 2 && (
        <section className="pt-10 pb-0 bg-[#FAF7F2]">
          <div className="container-main">
            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <HelpCircle className="w-5 h-5" style={{ color: accent }} />
                  <h3 className="text-lg font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? 'ساعِدْني في الاختيار' : 'Help Me Choose'}
                  </h3>
                </div>
                <p className={`text-sm text-[#6B6580] mb-5 ${isRTL ? 'text-right' : ''}`}>
                  {isRTL ? 'اختَرْ ما يصفُ وضعَك وسنوجّهُك للخدمة المناسبة:' : 'Select what best describes your situation:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {categoryScenarios[category]?.map((scenario) => (
                    <button
                      key={scenario.slug}
                      onClick={() => {
                        const el = document.getElementById(`service-${scenario.slug}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          el.classList.add('ring-2', 'ring-offset-2');
                          el.style.setProperty('--tw-ring-color', accent);
                          setTimeout(() => el.classList.remove('ring-2', 'ring-offset-2'), 2000);
                        }
                      }}
                      className="px-4 py-2.5 rounded-full text-sm font-medium border border-[#F3EFE8] text-[#4A4A5C] hover:text-white transition-all duration-200"
                      style={{ ['--hover-bg' as string]: accent }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = accent; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = accent; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '#4A4A5C'; e.currentTarget.style.borderColor = ''; }}
                    >
                      {isRTL ? scenario.ar : scenario.en}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── SERVICES: Alternating visual sections ─── */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          {services.map((service, i) => {
            const sName = isRTL ? service.nameAr : service.name;
            const sDesc = isRTL ? service.descriptionAr : service.description;
            const sShort = isRTL ? service.shortDescAr : service.shortDesc;
            const imgSrc = serviceImages[service.slug] || '/images/hala-consultation.png';
            const isEven = i % 2 === 0;

            return (
              <ScrollReveal key={service.slug}>
                <div id={`service-${service.slug}`} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 lg:gap-0 mb-12 lg:mb-20 bg-white rounded-3xl overflow-hidden border border-[#F3EFE8] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500`}>
                  {/* Image */}
                  <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto lg:min-h-[400px]">
                    <Image
                      src={imgSrc}
                      alt={sName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Gradient overlay for text readability on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent lg:hidden" />
                  </div>

                  {/* Content */}
                  <div className={`w-full lg:w-1/2 p-8 sm:p-10 lg:p-12 flex flex-col justify-center ${isRTL ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-3 mb-4`}>
                      <span
                        className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${accent}12`, color: accent }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-[#8E8E9F]">
                        <Clock className="w-3 h-3" />
                        {service.duration}
                        <span className="mx-1">·</span>
                        {service.priceFrom === 0 ? (
                          <span className="text-[#5A8B6F] font-medium">{isRTL ? 'مجّانيّة' : 'Free'}</span>
                        ) : (
                          <span>{isRTL ? `من ${service.priceFrom}$ كندي` : `From $${service.priceFrom}`}</span>
                        )}
                      </div>
                    </div>

                    <h3
                      className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-3 leading-snug"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {sName}
                    </h3>

                    <p className="text-[#6B6580] leading-relaxed mb-8 line-clamp-3">
                      {sShort || sDesc}
                    </p>

                    <div>
                      <Link
                        href={`/${locale}/services/${category}/${service.slug}`}
                        className={`inline-flex items-center gap-2 text-sm font-semibold text-[#7A3B5E] hover:text-[#5A2D47] transition-colors group`}
                      >
                        {messages.services.learnMore}
                        <ArrowIcon className={`w-4 h-4 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          <ScrollReveal className="text-center">
            <p className="text-xs text-[#8E8E9F] italic">{messages.services.priceDisclaimer}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      {categoryTestimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-main">
            <ScrollReveal className="text-center mb-12">
              <h2
                className="text-2xl md:text-3xl font-bold text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {messages.testimonials.sectionTitle}
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {categoryTestimonials.slice(0, 4).map((t) => (
                <ScrollReveal key={t.id}>
                  <div className="glass-card rounded-2xl p-8">
                    <p className="text-[#4A4A5C] italic leading-relaxed mb-4">
                      &ldquo;{isRTL ? t.textAr : t.text}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold text-[#7A3B5E]">{t.name}</p>
                      <p className="text-xs text-[#8E8E9F]">{isRTL ? t.roleAr : t.role}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── "YOU MIGHT BE WONDERING" — Client-Voice FAQs ─── */}
      {(() => {
        // Psychologically crafted FAQs in the CLIENT's voice
        // These address real fears, hesitations, and internal dialogue
        const clientFaqs: Record<string, { q: string; qAr: string; a: string; aAr: string }[]> = {
          youth: [
            { q: `My child doesn't want to talk to anyone. Will this still work?`, qAr: 'طفلي لا يريد التحدث مع أحد. هل سينجح هذا؟', a: `Absolutely. Most young clients feel that way at first. Dr. Hala uses creative, non-pressuring approaches — art, stories, and games — that let children open up at their own pace. There's no forcing, no interrogation. Just a safe space where they feel seen.`, aAr: 'بالتأكيد. معظم العملاء الصغار يشعرون بهذا في البداية. تستخدم الدكتورة هالة أساليب إبداعية غير ضاغطة — الفن والقصص والألعاب — تتيح للأطفال الانفتاح بوتيرتهم الخاصة.' },
            { q: `Is something actually wrong with my child, or am I overreacting?`, qAr: 'هل هناك مشكلة حقيقية مع طفلي، أم أنني أبالغ في ردة فعلي؟', a: `The fact that you're asking this question shows how much you care. There's no such thing as overreacting when it comes to your child's wellbeing. A session isn't a diagnosis — it's a conversation. And often, early support prevents small concerns from becoming bigger ones.`, aAr: 'حقيقة أنك تطرح هذا السؤال تظهر مدى اهتمامك. لا يوجد شيء اسمه "مبالغة" عندما يتعلق الأمر بصحة طفلك. الجلسة ليست تشخيصاً — إنها محادثة.' },
            { q: `Will my teen think I'm punishing them by sending them to counseling?`, qAr: 'هل سيعتقد مراهقي أنني أعاقبه بإرساله للاستشارة؟', a: `This is one of the most common worries parents have. Dr. Hala frames sessions as a "support space," not a punishment. Many teens actually end up looking forward to their sessions because it's the one place where someone listens without judgment or agenda.`, aAr: 'هذا من أكثر المخاوف شيوعاً لدى الوالدين. تصيغ الدكتورة هالة الجلسات على أنها "مساحة دعم" وليست عقوبة. كثير من المراهقين يتطلعون لجلساتهم لأنها المكان الوحيد الذي يستمع فيه شخص دون حكم.' },
          ],
          families: [
            { q: `We're not a "broken" family. Do we still need counseling?`, qAr: 'نحن لسنا عائلة "مفككة". هل نحتاج فعلاً للاستشارة؟', a: `Counseling isn't just for crisis — it's for growth. Many of our families come because they want to be even better, not because something is "wrong." Think of it like going to the gym for your relationships. Prevention is always easier than repair.`, aAr: 'الاستشارة ليست فقط للأزمات — إنها للنمو. كثير من عائلاتنا تأتي لأنها تريد أن تكون أفضل، وليس لأن هناك خطأ. فكر في الأمر كالذهاب لصالة الرياضة لعلاقاتك.' },
            { q: `What if my partner doesn't want to come?`, qAr: 'ماذا لو لم يرغب شريكي في الحضور؟', a: `That's okay — and more common than you think. You can start alone, and often when one person starts making changes, the whole family dynamic shifts. Dr. Hala can guide you on how to create positive change even if you're the only one in the room.`, aAr: 'لا بأس — وهذا أكثر شيوعاً مما تعتقد. يمكنك البدء وحدك، وغالباً عندما يبدأ شخص واحد بالتغيير، تتغير ديناميكية الأسرة بأكملها.' },
            { q: `I grew up fine without counseling. Why does my family need it?`, qAr: 'أنا كبرت بدون استشارة. لماذا تحتاج عائلتي لها؟', a: `Different times, different challenges. Screen time, social media, cultural identity abroad — today's families face pressures that didn't exist before. Seeking support isn't a weakness; it's wisdom. Your parents did their best with what they had. Now you have access to more tools.`, aAr: 'أوقات مختلفة، تحديات مختلفة. وقت الشاشة ووسائل التواصل والهوية الثقافية في الخارج — عائلات اليوم تواجه ضغوطاً لم تكن موجودة من قبل. طلب الدعم ليس ضعفاً؛ إنه حكمة.' },
          ],
          adults: [
            { q: `I feel like my problems aren't "serious enough" for therapy.`, qAr: 'أشعر أن مشاكلي ليست "خطيرة بما يكفي" للعلاج.', a: `There's no minimum threshold for seeking support. If something is taking up space in your mind, affecting your sleep, or making you feel stuck — that's enough. You don't need to wait until things get worse to deserve help.`, aAr: 'لا يوجد حد أدنى لطلب الدعم. إذا كان شيء ما يشغل عقلك أو يؤثر على نومك أو يجعلك تشعر بالجمود — فهذا كافٍ. لست بحاجة للانتظار حتى تسوء الأمور لتستحق المساعدة.' },
            { q: `I've tried therapy before and it didn't help. What's different here?`, qAr: 'جربت العلاج من قبل ولم يساعد. ما المختلف هنا؟', a: `Not every counselor is the right fit, and that's okay. Dr. Hala combines evidence-based approaches (CBT, mindfulness) with deep cultural sensitivity. Many clients who've had lukewarm experiences elsewhere find that the warmth and personalization here makes all the difference.`, aAr: 'ليس كل مستشار هو الخيار الصحيح، ولا بأس بذلك. تجمع الدكتورة هالة بين الأساليب المبنية على الأدلة والحساسية الثقافية العميقة. كثير من العملاء الذين لم تنجح معهم تجارب سابقة يجدون أن الدفء والتخصيص هنا يحدث فرقاً حقيقياً.' },
            { q: `Will anyone find out I'm seeing a counselor?`, qAr: 'هل سيعرف أحد أنني أراجع مستشاراً؟', a: `Never. Confidentiality is non-negotiable. Your sessions, your identity, and everything you share are protected. Online sessions mean you can connect from the privacy of your own space — no waiting rooms, no running into people you know.`, aAr: 'أبداً. السرية غير قابلة للتفاوض. جلساتك وهويتك وكل ما تشاركه محمي. الجلسات عبر الإنترنت تعني أنك تتواصل من خصوصية مكانك — بدون غرف انتظار.' },
          ],
          couples: [
            { q: `Does going to couples counseling mean our relationship is failing?`, qAr: 'هل الذهاب لاستشارة الأزواج يعني أن علاقتنا فاشلة؟', a: `Actually, it means the opposite. Seeking help shows that you both care enough to invest in your relationship. The couples who are really in trouble are the ones who stop trying. You're here because you want things to be better — and that's a powerful starting point.`, aAr: 'في الواقع، يعني العكس تماماً. طلب المساعدة يُظهر أنكما تهتمان بما يكفي للاستثمار في علاقتكما. الأزواج الذين هم في مشكلة حقيقية هم الذين يتوقفون عن المحاولة.' },
            { q: `What if one of us isn't comfortable opening up in front of the other?`, qAr: 'ماذا لو كان أحدنا غير مرتاح للانفتاح أمام الآخر؟', a: `Completely normal — and expected. Dr. Hala creates a structured, safe environment where both partners feel heard. She may even suggest individual sessions alongside couples work. The goal isn't to expose anyone; it's to build a bridge between you.`, aAr: 'طبيعي تماماً — ومتوقع. تخلق الدكتورة هالة بيئة منظمة وآمنة حيث يشعر كلا الشريكين بأنه مسموع. قد تقترح حتى جلسات فردية إلى جانب العمل الزوجي.' },
            { q: `We argue about the same things over and over. Can counseling actually change that?`, qAr: 'نتشاجر حول نفس الأشياء مراراً. هل يمكن للاستشارة تغيير ذلك فعلاً؟', a: `Yes — because recurring arguments aren't about the topic. They're about unmet needs underneath. Dr. Hala helps you decode what's really happening beneath the surface so you can break the cycle and start communicating about what actually matters.`, aAr: 'نعم — لأن الخلافات المتكررة ليست عن الموضوع نفسه. إنها عن احتياجات غير ملباة تحتها. تساعدك الدكتورة هالة على فك شفرة ما يحدث فعلاً تحت السطح.' },
          ],
          experiential: [
            { q: `I'm not artistic at all. Will art therapy still work for me?`, qAr: 'لست فنياً على الإطلاق. هل سينجح العلاج بالفن معي؟', a: `Art therapy has nothing to do with artistic talent. It's about expression, not perfection. Drawing a circle, molding clay, or arranging plants can unlock emotions that words alone can't reach. You don't need to be good at art — you just need to be open.`, aAr: 'العلاج بالفن لا علاقة له بالموهبة الفنية. إنه عن التعبير، ليس الكمال. رسم دائرة أو تشكيل الصلصال أو ترتيب النباتات يمكن أن يفتح مشاعر لا تستطيع الكلمات وحدها الوصول إليها.' },
            { q: `How is walking outside a "therapy session"?`, qAr: 'كيف يكون المشي في الخارج "جلسة علاج"؟', a: `Nature reduces cortisol, regulates the nervous system, and opens up different kinds of conversation than a clinic room. Walk & Talk therapy is evidence-based and especially powerful for people who feel confined or restless in traditional settings. Movement frees the mind.`, aAr: 'الطبيعة تقلل الكورتيزول وتنظم الجهاز العصبي وتفتح أنواعاً مختلفة من المحادثة. العلاج بالمشي مبني على الأدلة وفعال بشكل خاص للأشخاص الذين يشعرون بالضيق في الأماكن التقليدية.' },
            { q: `Is this real therapy, or just a nice walk / art class?`, qAr: 'هل هذا علاج حقيقي، أم مجرد نزهة لطيفة / حصة فنية؟', a: `It's real, evidence-based therapy with a different medium. The same therapeutic goals — emotional processing, pattern recognition, self-regulation — just delivered through nature, art, or plants instead of only conversation. The research behind these approaches is extensive and growing.`, aAr: 'إنه علاج حقيقي مبني على الأدلة بوسيط مختلف. نفس الأهداف العلاجية — المعالجة العاطفية والتعرف على الأنماط والتنظيم الذاتي — لكن يُقدم من خلال الطبيعة أو الفن أو النباتات بدلاً من المحادثة فقط.' },
          ],
        };

        const faqs = clientFaqs[category as string] || [];
        if (faqs.length === 0) return null;

        return (
          <section className="py-16 lg:py-20 bg-[#FAF7F2]">
            <div className="container-main max-w-5xl">
              <ScrollReveal className="text-center mb-10">
                <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
                  {isRTL ? 'ربّما تتساءل' : 'You Might Be Wondering'}
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-[#2D2A33]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {isRTL
                    ? 'أسئلة نسمعها كثيراً'
                    : `Questions We Hear Often`}
                </h3>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {faqs.map((faq, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <div className="group bg-white rounded-2xl border border-[#F3EFE8] p-6 h-full hover:border-[#C4878A]/20 hover:shadow-md transition-all duration-300">
                      {/* Question — in the client's voice */}
                      <div className="flex items-start gap-3 mb-4">
                        <span className="text-xl leading-none mt-0.5">"</span>
                        <p
                          className="text-[15px] font-semibold text-[#2D2A33] leading-snug italic"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {isRTL ? faq.qAr : faq.q}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="w-10 h-[2px] bg-gradient-to-r from-[#C8A97D] to-transparent mb-4 group-hover:w-16 transition-all duration-300" />

                      {/* Answer — Dr. Hala's warm response */}
                      <p className="text-sm text-[#4A4A5C] leading-relaxed">
                        {isRTL ? faq.aAr : faq.a}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ─── RELATED CATEGORIES ─── */}
      <section className="py-16 bg-[#F3EFE8]">
        <div className="container-main">
          <ScrollReveal className="mb-8">
            <h3 className={`text-xl font-bold text-[#2D2A33] ${isRTL ? 'text-right' : ''}`} style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'استكشِفْ خدماتٍ أخرى' : 'Explore Other Services'}
            </h3>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {serviceCategories
              .filter((c) => c.key !== category)
              .map((c) => (
                <Link
                  key={c.key}
                  href={`/${locale}/services/${c.key}`}
                  className="px-5 py-2.5 rounded-full bg-white text-sm font-medium text-[#4A4A5C] hover:text-[#7A3B5E] hover:shadow-[var(--shadow-subtle)] transition-all"
                >
                  {isRTL ? c.nameAr : c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={
          category === 'youth' ? <>Every Child Deserves to <span className="text-[#7A3B5E] italic">Thrive</span></> :
          category === 'families' ? <>Stronger Families Start <span className="text-[#7A3B5E] italic">Here</span></> :
          category === 'adults' ? <>Your Well-being <span className="text-[#7A3B5E] italic">Matters</span></> :
          category === 'couples' ? <>Love Deserves <span className="text-[#7A3B5E] italic">Effort</span></> :
          <>Experience Something <span className="text-[#7A3B5E] italic">Different</span></>
        }
        headingAr={
          category === 'youth' ? <>كلُّ طفلٍ يستحقُّ أن <span className="text-[#7A3B5E] italic">يزدهِر</span></> :
          category === 'families' ? <>الأُسَرُ الأقوى تبدأُ من <span className="text-[#7A3B5E] italic">هنا</span></> :
          category === 'adults' ? <>عافيتُك <span className="text-[#7A3B5E] italic">تهمّ</span></> :
          category === 'couples' ? <>الحبُّ يستحقُّ <span className="text-[#7A3B5E] italic">الجهد</span></> :
          <>جرِّبْ شيئًا <span className="text-[#7A3B5E] italic">مختلفًا</span></>
        }
      />
    </div>
  );
}
