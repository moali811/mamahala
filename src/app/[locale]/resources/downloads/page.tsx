'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  BookOpen,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  MessageCircle,
  Mail,
  Check,
  Unlock,
  Compass,
  PenLine,
  ListChecks,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  TrendingUp,
  Clock,
  BookMarked,
  Users,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { getMessages, type Locale } from '@/lib/i18n';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import MobileCarousel from '@/components/ui/MobileCarousel';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';
import { toolkitCatalog } from '@/data/toolkits';
import { isVipEmail, unlockAllForVip } from '@/lib/vip-emails';
import { BUSINESS } from '@/config/business';

interface DownloadResource {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  type: 'guide' | 'worksheet' | 'ebook' | 'checklist';
  category: 'families' | 'adults' | 'youth' | 'couples';
  audience?: 'teens' | 'university' | 'parents' | 'general';
  dateAdded?: string; // ISO date — shows "New" badge for 14 days
  featured?: boolean; // Dr. Hala's Pick
  popular?: boolean; // Most Popular
  isPremium?: boolean; // Premium interactive version
  priceCAD?: number; // Price in CAD for premium unlock
  price: number;
  isFree: boolean;
  isLeadMagnet: boolean;
}

const NEW_BADGE_DAYS = 14;
function isNew(dateAdded?: string): boolean {
  if (!dateAdded) return false;
  const diff = Date.now() - new Date(dateAdded).getTime();
  return diff < NEW_BADGE_DAYS * 24 * 60 * 60 * 1000;
}

const resources: DownloadResource[] = [
  // ─── PARENTS & FAMILIES ───
  {
    id: 'family-communication-toolkit',
    title: {
      en: 'Family Communication Toolkit',
      ar: 'مجموعةُ أدواتِ التواصلِ الأُسريّ',
    },
    description: {
      en: '12 conversation starters, active listening exercises, and a weekly family meeting template. Transform how your family connects.',
      ar: '12 بدايةَ محادثة، وتمارينُ الاستماعِ الفعّال، وقالبُ اجتماعٍ أسريٍّ أسبوعيّ. غيِّرْ طريقةَ تواصلِ عائلتِك.',
    },
    type: 'guide',
    category: 'families',
    featured: true,
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'anger-management-worksheet',
    title: {
      en: 'Anger Management Worksheet',
      ar: 'ورقةُ عملِ إدارةِ الغضب',
    },
    description: {
      en: 'Identify your triggers, map your anger cycle, and practice 5 proven de-escalation techniques. Based on CBT principles.',
      ar: 'حدِّدْ محفِّزاتِك، وارسُمْ دورةَ غضبِك، ومارِسْ 5 تقنياتِ تهدئةٍ مُثبَتة. مبنيّةٌ على مبادئِ العلاجِ المعرفيِّ السلوكيّ.',
    },
    type: 'worksheet',
    category: 'adults',
    price: 0,
    isFree: true,
    isLeadMagnet: false,
  },
  {
    id: 'calm-parent-checklist',
    title: {
      en: 'The Calm Parent Checklist',
      ar: 'قائمةُ الوالدِ الهادئ',
    },
    description: {
      en: 'A daily checklist of 10 micro-practices that help you stay grounded when parenting feels overwhelming. Print it, stick it on your fridge.',
      ar: 'قائمةٌ يوميّة من 10 ممارساتٍ مصغّرة تساعدُك على البقاءِ متماسكًا عندما تشعرُ بأنّ الأبوّة مُرهِقة. اطبَعْها وعلِّقها على ثلّاجتِك.',
    },
    type: 'checklist',
    category: 'families',
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'understanding-your-teen',
    title: {
      en: "Understanding Your Teen's Inner World",
      ar: 'فَهْمُ العالمِ الداخليِّ لمراهقِك',
    },
    description: {
      en: 'A parent\'s guide to the teenage brain: why they act the way they do, what they need from you, and how to stay connected through the storm.',
      ar: 'دليلُ الوالدين لدماغِ المراهق: لماذا يتصرّفون هكذا، وماذا يحتاجون منك، وكيفَ تبقى متواصلًا خلالَ العاصفة.',
    },
    type: 'guide',
    category: 'youth',
    popular: true,
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'self-care-assessment',
    title: {
      en: 'Self-Care Assessment & Planning Guide',
      ar: 'دليلُ تقييمِ الرعايةِ الذاتيّةِ والتخطيط',
    },
    description: {
      en: 'Assess your current self-care across 6 dimensions (emotional, physical, social, spiritual, professional, intellectual) and create a personalized plan.',
      ar: 'قيِّمْ رعايتَك الذاتيّةَ الحاليّة عبر 6 أبعاد (عاطفيّ، جسديّ، اجتماعيّ، روحيّ، مهنيّ، فكريّ) وأنشِئْ خطّةً شخصيّة.',
    },
    type: 'worksheet',
    category: 'adults',
    price: 0,
    isFree: true,
    isLeadMagnet: false,
  },
  // ─── PREMIUM RESOURCES ───
  {
    id: 'complete-parenting-guide',
    title: {
      en: 'The Intentional Parent: A Complete Guide',
      ar: 'الوالدُ الواعي: دليلٌ شامل',
    },
    description: {
      en: '80+ pages covering attachment-based discipline, emotional coaching, screen time strategies, and building resilient children. Includes worksheets and reflection exercises.',
      ar: 'أكثرُ من 80 صفحة تغطّي الانضباطَ القائمَ على التعلُّق، والتدريبَ العاطفيّ، واستراتيجيّاتِ وقتِ الشاشة، وبناءَ أطفالٍ أقوياء. يتضمّنُ أوراقَ عملٍ وتمارينَ تأمُّل.',
    },
    type: 'ebook',
    category: 'families',
    featured: true,
    popular: true,
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'couples-communication-workbook',
    title: {
      en: 'Couples Communication Workbook',
      ar: 'دفترُ عملِ التواصلِ للأزواج',
    },
    description: {
      en: '30 structured exercises to rebuild dialogue, resolve recurring conflicts, and deepen emotional intimacy. Designed for couples to work through together.',
      ar: '30 تمرينًا مُنظَّمًا لإعادةِ بناءِ الحوار، وحلِّ النزاعاتِ المتكرِّرة، وتعميقِ الحميميّةِ العاطفيّة. مصمَّمٌ ليعملَ الأزواجُ من خلالِه معًا.',
    },
    type: 'ebook',
    category: 'couples',
    featured: true,
    popular: true,
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'anxiety-recovery-journal',
    title: {
      en: 'The Anxiety Recovery Journal',
      ar: 'يوميّاتُ التعافي من القلق',
    },
    description: {
      en: '90-day guided journal combining CBT techniques, gratitude practices, and thought-reframing exercises. Your daily companion on the path to calm.',
      ar: 'يوميّاتٌ مُوجَّهة لمدّة 90 يومًا تجمعُ بين تقنيّاتِ العلاجِ المعرفيِّ السلوكيّ، وممارساتِ الامتنان، وتمارينِ إعادةِ صياغةِ الأفكار. رفيقُك اليوميُّ على طريقِ الهدوء.',
    },
    type: 'ebook',
    category: 'adults',
    featured: true,
    popular: true,
    isPremium: true,
    priceCAD: 19,
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },

  // ─── FOR TEENS (13-18) ───
  {
    id: 'social-media-survival-guide',
    title: {
      en: 'The Social Media Survival Guide',
      ar: 'دليلُ النّجاةِ في وسائلِ التّواصلِ الاجتماعيّ',
    },
    description: {
      en: 'Is your feed making you feel worse? 7 experiments to take back control — from the \'comparison detox\' to the \'unfollow audit.\' Backed by research on teens and social media.',
      ar: 'هل يجعلُك ما تراه على الإنترنت تشعرُ بالسّوء؟ 7 تجاربَ لاستعادةِ السّيطرة — من "حميةِ المقارنة" إلى "تدقيقِ المتابَعات." مبنيٌّ على أبحاثِ المراهقينَ ووسائلِ التّواصل.',
    },
    type: 'guide',
    category: 'youth',
    audience: 'teens',
    dateAdded: '2026-04-08',
    popular: true,
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'teen-anger-toolkit',
    title: {
      en: 'Brain on Fire: Your Anger Is Not the Enemy',
      ar: 'دماغٌ مشتعل: غضبُك ليسَ عدوَّك',
    },
    description: {
      en: 'Why you blow up (it\'s not because you\'re broken). Map your anger cycle, decode what\'s really underneath, and try 5 cool-down techniques that actually work — not the boring \'count to 10\' stuff.',
      ar: 'لماذا تنفجرُ غضبًا (ليسَ لأنّ فيك خللًا). ارسُمْ دورةَ غضبِك، وافهَمْ ما يختبئُ تحته حقًّا، وجرِّبْ 5 تقنيّاتِ تهدئةٍ تنفعُ فعلًا — وليسَ "عُدّ للعشرة" المملّة.',
    },
    type: 'worksheet',
    category: 'youth',
    audience: 'teens',
    dateAdded: '2026-04-08',
    price: 0,
    isFree: true,
    isLeadMagnet: false,
  },
  {
    id: 'teen-identity-map',
    title: {
      en: 'The "Who Am I Actually?" Identity Map',
      ar: 'خريطةُ "مَن أنا فعلًا؟"',
    },
    description: {
      en: 'A visual mapping exercise for teens figuring out who they are — your values vs. what everyone expects, the parts of you that feel \'too much\' or \'not enough,\' and how to own your story between two cultures.',
      ar: 'تمرينُ رسمِ خريطةٍ بصريّة للمراهقينَ الذين يكتشفونَ هويّتَهم — قِيَمُك مقابلَ ما يتوقّعُه الجميع، والأجزاءُ التي تشعرُ أنّها "أكثرُ من اللّازم" أو "ليست كافية"، وكيفَ تمتلكُ قصّتَك عندما تعيشُ بينَ ثقافتَين.',
    },
    type: 'worksheet',
    category: 'youth',
    audience: 'teens',
    dateAdded: '2026-04-08',
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'friendship-flags-checklist',
    title: {
      en: 'Friendship Red Flags & Green Flags',
      ar: 'علاماتُ الصّداقةِ الحمراءُ والخضراء',
    },
    description: {
      en: 'A pocket-sized checklist to figure out which friendships are lifting you up and which ones are draining you. Plus: how to set boundaries without losing everyone, and what to do when a group chat turns toxic.',
      ar: 'قائمةٌ مختصرةٌ لمعرفةِ أيُّ الصّداقاتِ ترفعُك وأيُّها تستنزفُك. بالإضافة إلى: كيفَ تضعُ حدودًا دونَ أن تخسرَ الجميع، وماذا تفعلُ عندما تتحوَّلُ مجموعةُ الدّردشةِ إلى بيئةٍ سامّة.',
    },
    type: 'checklist',
    category: 'youth',
    audience: 'teens',
    dateAdded: '2026-04-08',
    price: 0,
    isFree: true,
    isLeadMagnet: false,
  },
  {
    id: 'exam-season-emergency-kit',
    title: {
      en: 'Exam Season Emergency Kit',
      ar: 'حقيبةُ طوارئِ موسمِ الامتحانات',
    },
    description: {
      en: 'For when your brain shuts down and everything feels impossible. Quick-relief anxiety hacks, a panic-to-plan worksheet, study-break rituals that actually recharge you, and a \'what if I fail?\' reality check.',
      ar: 'لتلك اللّحظاتِ التي ينغلقُ فيها دماغُك ويبدو كلُّ شيءٍ مستحيلًا. حيلٌ سريعةٌ لتخفيفِ القلق، وورقةُ عملٍ للانتقالِ من الذّعرِ إلى الخطّة، وطقوسُ استراحةٍ تشحنُك فعلًا، و"فحصُ واقع" لسؤالِ "ماذا لو رسبت؟"',
    },
    type: 'guide',
    category: 'youth',
    audience: 'teens',
    dateAdded: '2026-04-08',
    price: 0,
    isFree: true,
    isLeadMagnet: false,
  },

  // ─── FOR UNIVERSITY STUDENTS (18-25) ───
  {
    id: 'imposter-syndrome-playbook',
    title: {
      en: 'The Imposter Syndrome Playbook',
      ar: 'دليلُ التّعاملِ مع متلازمةِ المحتال',
    },
    description: {
      en: 'You got in. You belong. But your brain keeps saying otherwise. A CBT-based playbook with thought logs, a \'proof you\'re not faking it\' exercise, and strategies for when you\'re the only one in the room who looks like you.',
      ar: 'لقد قُبِلت. أنتَ تستحقّ. لكنّ دماغَك يقولُ عكسَ ذلك. دليلٌ قائمٌ على العلاجِ المعرفيّ السلوكيّ مع سجلّاتِ أفكار، وتمرينِ "إثباتُ أنّك لا تُزيِّف"، واستراتيجيّاتٍ لتلك اللّحظاتِ التي تكونُ فيها الوحيدَ المختلفَ في الغرفة.',
    },
    type: 'guide',
    category: 'adults',
    audience: 'university',
    dateAdded: '2026-04-08',
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'adulting-emotional-edition',
    title: {
      en: 'Adulting 101: The Emotional Edition',
      ar: 'دليلُ الكِبار 101: النّسخةُ العاطفيّة',
    },
    description: {
      en: 'Nobody taught you this in school: how to handle homesickness without feeling weak, set boundaries with family who still treat you like a kid, manage your first real heartbreak, and ask for help without feeling like a burden.',
      ar: 'لم يعلِّمْك أحدٌ هذا في المدرسة: كيفَ تتعاملُ مع الحنينِ للوطنِ بلا شعورٍ بالضّعف، وتضعُ حدودًا مع عائلةٍ لا تزالُ تعاملُك كطفل، وتتجاوزُ أوّلَ كسرِ قلبٍ حقيقيّ، وتطلبُ المساعدةَ بلا شعورٍ بأنّك عبء.',
    },
    type: 'ebook',
    category: 'adults',
    audience: 'university',
    dateAdded: '2026-04-08',
    popular: true,
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'student-burnout-recovery',
    title: {
      en: 'Burnout Is Not a Badge of Honor',
      ar: 'الإنهاكُ ليسَ وسامَ شرف',
    },
    description: {
      en: 'A 4-week recovery plan for students running on empty. Includes a burnout assessment, an \'energy audit\' to find what\'s draining you, the minimum viable self-care checklist, and how to say no when your plate is already full.',
      ar: 'خطّةُ تعافٍ لأربعةِ أسابيعَ للطّلّابِ الذين يعملونَ على الاحتياطيّ. تتضمّنُ تقييمَ إنهاك، و"تدقيقَ طاقة" لاكتشافِ ما يستنزفُك، وقائمةَ الحدِّ الأدنى للرّعايةِ الذاتيّة، وكيفَ تقولُ "لا" عندما يكونُ طبقُك ممتلئًا.',
    },
    type: 'worksheet',
    category: 'adults',
    audience: 'university',
    dateAdded: '2026-04-08',
    price: 0,
    isFree: true,
    isLeadMagnet: false,
  },
  {
    id: 'bicultural-student-guide',
    title: {
      en: 'Caught Between Two Worlds: A Bicultural Student\'s Guide',
      ar: 'بينَ عالَمَين: دليلُ الطّالبِ ثنائيِّ الثّقافة',
    },
    description: {
      en: 'For when home culture and campus culture feel like different planets. Navigate code-switching without losing yourself, handle the \'where are you really from?\' question, and find belonging when you feel too Western for your family and too Arab for your friends.',
      ar: 'عندما تشعرُ أنّ ثقافةَ البيتِ وثقافةَ الحرمِ الجامعيِّ كوكبانِ مختلفان. تنقَّلْ بينَ أساليبِ التّعاملِ دونَ أن تفقدَ ذاتَك، وتعاملْ مع سؤالِ "من أينَ أنتَ حقًّا؟"، وجِدِ الانتماءَ عندما تشعرُ بأنّك "غربيٌّ أكثرَ من اللّازم" لعائلتِك و"عربيٌّ أكثرَ من اللّازم" لأصدقائك.',
    },
    type: 'ebook',
    category: 'adults',
    audience: 'university',
    dateAdded: '2026-04-08',
    price: 0,
    isFree: true,
    isLeadMagnet: false,
  },
  {
    id: 'student-loneliness-toolkit',
    title: {
      en: 'The Loneliness Toolkit (for People Surrounded by People)',
      ar: 'أدواتُ التّغلّبِ على الوحدة (لِمَن حولَهم النّاسُ في كلِّ مكان)',
    },
    description: {
      en: 'You have 500 followers and a full schedule, but something still feels empty. Understand why connection isn\'t clicking, build \'real talk\' friendships, navigate loneliness in your first year, and stop performing happiness online.',
      ar: 'لديك 500 متابِع وجدولٌ مليءٌ بالمواعيد، لكنَّ شيئًا ما يبقى فارغًا. يساعدُك هذا الدّليلُ على فهمِ لماذا لا ينجحُ التّواصل، وبناءِ صداقاتٍ حقيقيّة، وتجاوزِ الوحدةِ في سنتِك الأولى، والتّوقُّفِ عن تمثيلِ السّعادةِ على الإنترنت.',
    },
    type: 'guide',
    category: 'adults',
    audience: 'university',
    dateAdded: '2026-04-08',
    price: 0,
    isFree: true,
    isLeadMagnet: false,
  },
  // Couples toolkits
  {
    id: 'conflict-resolution-playbook',
    title: {
      en: 'The Conflict Resolution Playbook',
      ar: 'دليلُ حلِّ النزاعات',
    },
    description: {
      en: 'A practical guide to fighting fair: understand your conflict pattern, learn the 5 rules of fair fighting, and use the repair conversation template to grow closer through disagreement.',
      ar: 'دليلٌ عمليٌّ للخلافِ البنّاء: افهَمْ نمطَ خلافِك، وتعلَّمْ قواعدَ الخلافِ العادلِ الخمس، واستخدِمْ قالبَ محادثةِ الإصلاحِ للتقاربِ من خلالِ الاختلاف.',
    },
    type: 'guide',
    category: 'couples',
    audience: 'general',
    dateAdded: '2026-04-09',
    popular: true,
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
  {
    id: 'reconnection-rituals',
    title: {
      en: 'Reconnection Rituals: A Couples Activity Kit',
      ar: 'طقوسُ إعادةِ التواصل: مجموعةُ أنشطةٍ للأزواج',
    },
    description: {
      en: '10 evidence-based rituals to rebuild closeness — from the 6-second kiss to the monthly memory walk. No babysitter needed, no reservation required. Just two people choosing to turn toward each other.',
      ar: '10 طقوسٍ مبنيّةٍ على أُسسٍ علميّة لإعادةِ بناءِ القُرب — من قُبلةِ الستِّ ثوانٍ إلى نزهةِ الذّكرياتِ الشهريّة. لا حاجةَ لجليسِ أطفال. فقط شخصان يختاران التوجُّهَ نحوَ بعضِهما.',
    },
    type: 'worksheet',
    category: 'couples',
    audience: 'general',
    dateAdded: '2026-04-09',
    price: 0,
    isFree: true,
    isLeadMagnet: true,
  },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  guide: Compass,
  worksheet: PenLine,
  ebook: BookOpen,
  checklist: ListChecks,
};

const typeGradients: Record<string, string> = {
  guide: 'from-[#E8D5E0] to-[#F5EBF1]',
  worksheet: 'from-[#F0D5D6] to-[#F9ECEC]',
  ebook: 'from-[#D5E3DA] to-[#EBF3EE]',
  checklist: 'from-[#E8DDD0] to-[#F5EDE3]',
};

const typeIconColors: Record<string, string> = {
  guide: 'text-[#7A3B5E]',
  worksheet: 'text-[#C4878A]',
  ebook: 'text-[#5A8B6F]',
  checklist: 'text-[#B08D57]',
};

const typeFilters = [
  { key: 'all', en: 'All Types', ar: 'جميعُ الأنواع' },
  { key: 'guide', en: 'Guides', ar: 'أدلّة' },
  { key: 'worksheet', en: 'Worksheets', ar: 'أوراق عمل' },
  { key: 'ebook', en: 'E-Books', ar: 'كتب إلكترونيّة' },
  { key: 'checklist', en: 'Checklists', ar: 'قوائم' },
];

const typeLabels: Record<string, { en: string; ar: string }> = {
  guide: { en: 'Guide', ar: 'دليل' },
  worksheet: { en: 'Worksheet', ar: 'ورقة عمل' },
  ebook: { en: 'E-Book', ar: 'كتاب إلكتروني' },
  checklist: { en: 'Checklist', ar: 'قائمة' },
};

const categoryLabels: Record<string, { en: string; ar: string }> = {
  families: { en: 'Families', ar: 'العائلات' },
  adults: { en: 'Adults', ar: 'البالغون' },
  youth: { en: 'Youth', ar: 'الناشئة' },
  couples: { en: 'Couples', ar: 'الأزواج' },
};

// Level 1: Primary demographic tabs (matches Services page)
const demographicFilters = [
  { key: 'all', en: 'All Toolkits', ar: 'جميعُ الأدوات' },
  { key: 'youth', en: 'Youth', ar: 'الناشئة' },
  { key: 'families', en: 'Families', ar: 'العائلات' },
  { key: 'adults', en: 'Adults', ar: 'البالغون' },
  { key: 'couples', en: 'Couples', ar: 'الأزواج' },
];

// Level 2: Contextual theme chips — derived from toolkit id groupings
const themesByDemographic: Record<string, Array<{ key: string; en: string; ar: string; ids: string[] }>> = {
  youth: [
    {
      key: 'teens', en: 'For Teens', ar: 'للمراهقين',
      ids: ['social-media-survival-guide', 'teen-anger-toolkit', 'teen-identity-map', 'friendship-flags-checklist', 'exam-season-emergency-kit'],
    },
    {
      key: 'parents-of-teens', en: 'Parents of Teens', ar: 'آباء المراهقين',
      ids: ['understanding-your-teen'],
    },
  ],
  families: [
    {
      key: 'communication', en: 'Communication', ar: 'التواصل',
      ids: ['family-communication-toolkit'],
    },
    {
      key: 'daily-practice', en: 'Daily Practice', ar: 'الممارسة اليومية',
      ids: ['calm-parent-checklist'],
    },
    {
      key: 'intentional', en: 'Intentional Parenting', ar: 'التربية القصدية',
      ids: ['complete-parenting-guide'],
    },
  ],
  adults: [
    {
      key: 'university', en: 'University Life', ar: 'الحياة الجامعية',
      ids: ['imposter-syndrome-playbook', 'adulting-emotional-edition', 'student-burnout-recovery', 'bicultural-student-guide', 'student-loneliness-toolkit'],
    },
    {
      key: 'anxiety', en: 'Anxiety & Emotions', ar: 'القلق والمشاعر',
      ids: ['anxiety-recovery-journal', 'anger-management-worksheet', 'self-care-assessment'],
    },
  ],
  couples: [
    {
      key: 'communication', en: 'Communication', ar: 'التواصل',
      ids: ['couples-communication-workbook'],
    },
    {
      key: 'conflict', en: 'Conflict', ar: 'الخلافات',
      ids: ['conflict-resolution-playbook'],
    },
    {
      key: 'reconnection', en: 'Reconnection', ar: 'إعادة التواصل',
      ids: ['reconnection-rituals'],
    },
  ],
};

// Demographic colors (matches Services page palette)
const demographicColors: Record<string, string> = {
  youth: '#C4878A',
  families: '#C8A97D',
  adults: '#5A8B6F',
  couples: '#D4836A',
};

const audienceBadgeLabels: Record<string, { en: string; ar: string; color: string }> = {
  teens: { en: 'For Teens', ar: 'للمراهقين', color: '#C4878A' },
  university: { en: 'For University Students', ar: 'لطلّابِ الجامعات', color: '#7A3B5E' },
  parents: { en: 'For Parents', ar: 'للآباء', color: '#C8A97D' },
  adults: { en: 'For Adults', ar: 'للبالغين', color: '#5A8B6F' },
  couples: { en: 'For Couples', ar: 'للأزواج', color: '#D4836A' },
};

export default function DownloadsPage() {
  return (
    <Suspense>
      <DownloadsPageInner />
    </Suspense>
  );
}

function DownloadsPageInner() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Filters — two-level system
  const [demographicFilter, setDemographicFilter] = useState<string>('all');
  const [themeFilter, setThemeFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Pagination
  const ITEMS_PER_PAGE = 6;
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;
  const setCurrentPage = (pageOrFn: number | ((prev: number) => number)) => {
    const newPage = typeof pageOrFn === 'function' ? pageOrFn(currentPage) : pageOrFn;
    const params = new URLSearchParams(searchParams.toString());
    if (newPage <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }
    const qs = params.toString();
    router.replace(`/${locale}/resources/downloads${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  // Preview modal
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<string>('');
  const [previewLoading, setPreviewLoading] = useState(false);

  // One email unlocks all toolkits
  const [unlockedEmail, setUnlockedEmail] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockEmail, setUnlockEmail] = useState('');
  const [unlockStatus, setUnlockStatus] = useState<'idle' | 'loading' | 'invalid'>('idle');
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());

  // Filter resources by demographic (level 1) + theme (level 2) + type
  // Sort new items to the top
  const filteredResources = resources
    .filter(r => {
      if (demographicFilter !== 'all' && r.category !== demographicFilter) return false;
      if (themeFilter !== 'all') {
        const theme = themesByDemographic[demographicFilter]?.find(t => t.key === themeFilter);
        if (theme && !theme.ids.includes(r.id)) return false;
      }
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;
      return true;
    })
    .sort((a, b) => {
      // Featured first, then popular, then new, then rest
      const score = (r: DownloadResource) =>
        (r.featured ? 8 : 0) + (r.popular ? 4 : 0) + (isNew(r.dateAdded) ? 2 : 0);
      return score(b) - score(a);
    });

  // Pagination
  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change (skip initial mount)
  const filterMounted = useRef(false);
  useEffect(() => {
    if (!filterMounted.current) { filterMounted.current = true; return; }
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    const qs = params.toString();
    router.replace(`/${locale}/resources/downloads${qs ? `?${qs}` : ''}`, { scroll: false });
  }, [demographicFilter, themeFilter, typeFilter]);

  // Reset theme filter when demographic changes
  useEffect(() => {
    setThemeFilter('all');
  }, [demographicFilter]);

  // Preview handler
  const openPreview = async (id: string) => {
    setPreviewId(id);
    setPreviewLoading(true);
    try {
      const mdPath = `/toolkits/${isRTL ? `ar/${id}` : id}.md`;
      const res = await fetch(mdPath);
      const text = await res.text();
      setPreviewContent(text);
    } catch {
      setPreviewContent('');
    }
    setPreviewLoading(false);
  };

  // Check localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mh_toolkit_email');
    if (saved) {
      setUnlockedEmail(saved);
      setIsUnlocked(true);
      // VIP bypass: auto-unlock all premium toolkits + academy levels
      if (isVipEmail(saved)) {
        const premiumToolkits = toolkitCatalog.filter(tc => tc.isPremium).map(tc => tc.slug);
        const allPrograms = ['intentional-parent', 'inner-compass', 'resilient-teens', 'stronger-together'];
        unlockAllForVip(allPrograms, premiumToolkits);
      }
    }
    const downloaded = localStorage.getItem('mh_toolkit_downloaded');
    if (downloaded) {
      setDownloadedIds(new Set(JSON.parse(downloaded)));
    }
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(unlockEmail)) {
      setUnlockStatus('invalid');
      return;
    }
    setUnlockStatus('loading');
    try {
      await fetch('/api/toolkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: unlockEmail, toolkitId: 'unlock-all', locale }),
      });
    } catch { /* still unlock locally */ }
    localStorage.setItem('mh_toolkit_email', unlockEmail);
    setUnlockedEmail(unlockEmail);
    setIsUnlocked(true);
    setUnlockStatus('idle');
    // VIP bypass: auto-unlock all premium content site-wide
    if (isVipEmail(unlockEmail)) {
      const premiumToolkits = toolkitCatalog.filter(tc => tc.isPremium).map(tc => tc.slug);
      const allPrograms = ['intentional-parent', 'inner-compass', 'resilient-teens', 'stronger-together'];
      unlockAllForVip(allPrograms, premiumToolkits);
    }
  };

  const handleDownload = async (id: string) => {
    // Track the download
    try {
      await fetch('/api/toolkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: unlockedEmail, toolkitId: id, locale }),
      });
    } catch { /* non-blocking */ }
    // Mark as downloaded
    const newDownloaded = new Set(downloadedIds);
    newDownloaded.add(id);
    setDownloadedIds(newDownloaded);
    localStorage.setItem('mh_toolkit_downloaded', JSON.stringify([...newDownloaded]));
    // Open the correct language PDF
    const pdfPath = isRTL ? `/toolkits/pdf/ar/${id}.pdf` : `/toolkits/pdf/${id}.pdf`;
    window.open(pdfPath, '_blank');
  };

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden gradient-sage">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C4878A]/[0.04] blur-[80px]" />
          <div className="absolute bottom-10 left-[10%] w-[300px] h-[300px] rounded-full bg-[#C8A97D]/[0.06] blur-[60px]" />
        </div>

        <div className="container-main relative z-10">
          <Breadcrumb
            locale={locale}
            items={[
              { label: messages.nav.home, href: `/${locale}` },
              { label: messages.nav.resources, href: `/${locale}/resources` },
              { label: messages.nav.downloads },
            ]}
          />

          <motion.div
            className={`mt-8 max-w-3xl ${isRTL ? 'text-right' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'مكتبتُك من الأدوات' : 'Your Resource Library'}
            </h1>
            <p className="mt-5 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed">
              {isRTL
                ? 'أدواتٌ مبنيّةٌ على أُسسٍ علميّة من دكتورة هالة — معظمُها مجّانيّ، وبعضُها تجارِبُ تفاعليّةٌ مُمَيَّزة لعملٍ أعمق.'
                : 'Evidence-based tools from Dr. Hala — most are free, a few premium experiences for deeper work.'}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {(() => {
                const premiumCount = toolkitCatalog.filter(tc => tc.isPremium).length;
                const freeCount = resources.length - premiumCount;
                return [
                  { icon: BookMarked, en: `${freeCount} Free Downloads`, ar: `${freeCount} تحميلًا مجّانيًّا` },
                  { icon: Sparkles, en: `${premiumCount} Premium Interactive`, ar: `${premiumCount} تجربةً تفاعليّةً مُمَيَّزة` },
                  { icon: Globe, en: 'Bilingual EN/AR', ar: 'ثنائيّةُ اللغة' },
                ];
              })().map((stat, i) => (
                <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-sm text-[#4A4A5C] font-medium">
                  <stat.icon className="w-4 h-4 text-[#7A3B5E]" />
                  {isRTL ? stat.ar : stat.en}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  DOWNLOADS GRID                                                  */}
      {/* ================================================================ */}
      <section className="py-10 lg:py-14 bg-[#FAF7F2]">
        <div className="container-main">

          {/* Unlock banner */}
          {!isUnlocked ? (
            <ScrollReveal className="mb-8">
              <div className="bg-white rounded-2xl border border-[#F3EFE8] p-8 md:p-10 max-w-2xl mx-auto text-center shadow-sm">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#7A3B5E]/8 mb-5">
                  <Lock className="w-7 h-7 text-[#7A3B5E]" />
                </div>
                <h3 className="text-xl font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {isRTL ? 'افتحي جميعَ التحميلاتِ المجّانيّة' : 'Unlock All Free Downloads'}
                </h3>
                <p className="text-sm text-[#8E8E9F] mb-6">
                  {isRTL
                    ? 'أدخلي بريدَكِ الإلكترونيّ مرّةً واحدةً لتحميلِ جميعِ الأدواتِ المجّانيّة فورًا. التجاربُ التفاعليّةُ المُمَيَّزة تُفتَحُ بشكلٍ منفصل.'
                    : 'Enter your email once to download every free toolkit instantly. Premium interactive experiences unlock separately.'}
                </p>
                <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F]`} />
                    <input
                      type="email"
                      value={unlockEmail}
                      onChange={(e) => { setUnlockEmail(e.target.value); setUnlockStatus('idle'); }}
                      placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email address'}
                      className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 text-[16px] sm:text-sm rounded-xl border border-[#F3EFE8] bg-[#FAF7F2] text-[#2D2A33] placeholder-[#8E8E9F] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={unlockStatus === 'loading'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7A3B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#5E2D48] transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    <Unlock className="w-4 h-4" />
                    {unlockStatus === 'loading'
                      ? (isRTL ? 'جارٍ...' : 'Unlocking...')
                      : (isRTL ? 'افتحْ الكلّ' : 'Unlock All')}
                  </button>
                </form>
                {unlockStatus === 'invalid' && (
                  <p className="text-xs text-[#C8A97D] mt-3">{isRTL ? 'يرجى إدخالُ بريدٍ إلكترونيٍّ صحيح.' : 'Please enter a valid email address.'}</p>
                )}
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal className="mb-8">
              <div className="flex items-center justify-center gap-2 text-sm text-[#5A8B6E] font-medium">
                <Check className="w-4 h-4" />
                {isRTL ? `مرحبًا! جميعُ الأدواتِ مفتوحةٌ لك.` : `Welcome! All toolkits are unlocked for you.`}
              </div>
            </ScrollReveal>
          )}

          {/* Level 1: Demographic filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            {demographicFilters.map((filter) => {
              const isActive = demographicFilter === filter.key;
              const activeColor = filter.key !== 'all' ? demographicColors[filter.key] : '#7A3B5E';
              return (
                <button
                  key={filter.key}
                  onClick={() => setDemographicFilter(filter.key)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:border-[#C4878A]/30 hover:bg-[#FAF7F2]'
                  }`}
                  style={isActive ? { backgroundColor: activeColor } : undefined}
                >
                  {isRTL ? filter.ar : filter.en}
                </button>
              );
            })}
          </div>

          {/* Level 2: Theme chips (contextual — animate in when demographic selected) */}
          <AnimatePresence mode="wait">
            {demographicFilter !== 'all' && themesByDemographic[demographicFilter]?.length > 0 && (
              <motion.div
                key={demographicFilter}
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-center gap-2 mb-3 pt-1">
                  <button
                    onClick={() => setThemeFilter('all')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      themeFilter === 'all'
                        ? 'text-white'
                        : 'bg-white text-[#6B6580] border border-[#F3EFE8] hover:bg-[#FAF7F2]'
                    }`}
                    style={themeFilter === 'all' ? { backgroundColor: `${demographicColors[demographicFilter]}CC` } : undefined}
                  >
                    {isRTL ? 'الكل' : 'All'}
                  </button>
                  {themesByDemographic[demographicFilter].map((theme) => {
                    const isActive = themeFilter === theme.key;
                    return (
                      <button
                        key={theme.key}
                        onClick={() => setThemeFilter(theme.key)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-white'
                            : 'bg-white text-[#6B6580] border border-[#F3EFE8] hover:bg-[#FAF7F2]'
                        }`}
                        style={isActive ? { backgroundColor: `${demographicColors[demographicFilter]}CC` } : undefined}
                      >
                        {isRTL ? theme.ar : theme.en}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Type filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {typeFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setTypeFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  typeFilter === filter.key
                    ? 'bg-[#4A4A5C] text-white shadow-sm'
                    : 'bg-white text-[#6B6580] border border-[#F3EFE8] hover:border-[#6B6580]/30 hover:bg-[#FAF7F2]'
                }`}
              >
                {isRTL ? filter.ar : filter.en}
              </button>
            ))}
          </div>

          <MobileCarousel desktopGrid="sm:grid-cols-2 lg:grid-cols-3" gap={32} mobileWidth="85vw">
            {paginatedResources.map((resource) => {
              const title = isRTL ? resource.title.ar : resource.title.en;
              const description = isRTL ? resource.description.ar : resource.description.en;
              const typeLabel = isRTL ? typeLabels[resource.type].ar : typeLabels[resource.type].en;
              const categoryLabel = isRTL ? categoryLabels[resource.category].ar : categoryLabels[resource.category].en;
              const TypeIcon = typeIcons[resource.type] || FileText;
              const catalogEntry = toolkitCatalog.find(tc => tc.slug === resource.id);
              const hasInteractive = catalogEntry?.hasInteractiveVersion ?? false;
              const isPremium = catalogEntry?.isPremium ?? resource.isPremium ?? false;
              // All premium toolkits share the same flat price
              const priceCAD = BUSINESS.toolkitFullAccessPrice;

              return (
                <motion.div key={resource.id}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-[#F3EFE8] hover:border-[#C4878A]/20 transition-all duration-300 h-full flex flex-col"
                    whileHover={{ y: -6, boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Accent stripe */}
                    <div className={`h-1 bg-gradient-to-r ${typeGradients[resource.type] || 'from-[#F3EFE8] to-[#FAF7F2]'}`} />

                    <div className="p-5 flex-1 flex flex-col">
                      {/* Compact header: icon + contextual labels + popular/new badge */}
                      <div className="flex items-center justify-between mb-3 min-h-[2.25rem]">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${typeGradients[resource.type] || 'from-[#F3EFE8] to-[#FAF7F2]'}`}
                          >
                            <TypeIcon className={`w-4.5 h-4.5 ${typeIconColors[resource.type] || 'text-[#7A3B5E]'}`} />
                          </div>
                          {/* Only show type label when not filtered by type */}
                          {typeFilter === 'all' && (
                            <Badge variant="sage" size="sm">{typeLabel}</Badge>
                          )}
                          {/* Only show demographic label when not filtered by demographic */}
                          {demographicFilter === 'all' && (
                            <span
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold truncate"
                              style={{
                                backgroundColor: `${demographicColors[resource.category]}15`,
                                color: demographicColors[resource.category],
                              }}
                            >
                              {isRTL ? categoryLabels[resource.category].ar : categoryLabels[resource.category].en}
                            </span>
                          )}
                        </div>
                        {/* Premium takes precedence, then Popular, then New */}
                        {isPremium ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-[#B08D57] to-[#7A3B5E] flex-shrink-0 shadow-sm">
                            <Sparkles className="w-2.5 h-2.5" /> {isRTL ? 'مميّز' : 'Premium'}
                          </span>
                        ) : resource.popular ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-[#C8A97D] to-[#B08D57] flex-shrink-0">
                            <TrendingUp className="w-2.5 h-2.5" /> {isRTL ? 'شائع' : 'Popular'}
                          </span>
                        ) : isNew(resource.dateAdded) ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-[#C4878A] to-[#7A3B5E] flex-shrink-0">
                            <Sparkles className="w-2.5 h-2.5" /> {isRTL ? 'جديد' : 'New'}
                          </span>
                        ) : null}
                      </div>

                      {/* Title */}
                      <h3
                        className="text-base font-bold text-[#2D2A33] mb-2 group-hover:text-[#7A3B5E] transition-colors duration-200 leading-snug"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {title}
                      </h3>

                      {/* Description — 2 lines max */}
                      <p className="text-sm text-[#4A4A5C] leading-relaxed mb-5 flex-1 line-clamp-2">
                        {description}
                      </p>

                      {/* Action area */}
                      <div className="pt-4 border-t border-[#F3EFE8] flex flex-col gap-2">
                        {/* Primary CTA: Interactive version OR Peek Inside */}
                        {hasInteractive ? (
                          <>
                            <Link
                              href={`/${locale}/resources/toolkits/${resource.id}`}
                              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity ${
                                isPremium
                                  ? 'bg-gradient-to-r from-[#B08D57] to-[#7A3B5E] shadow-md'
                                  : 'bg-gradient-to-r from-[#7A3B5E] to-[#C4878A]'
                              }`}
                            >
                              <Sparkles className="w-4 h-4" />
                              {isPremium
                                ? (isRTL ? `جرّبها مجّانًا · $${priceCAD}` : `Try Free · Unlock $${priceCAD}`)
                                : (isRTL ? 'النسخة التفاعلية' : 'Try Interactive Version')}
                            </Link>
                            <button
                              onClick={() => openPreview(resource.id)}
                              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2 text-[#7A3B5E] text-xs font-medium hover:underline transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              {isRTL ? 'ألقِ نظرة' : 'Peek Inside'}
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => openPreview(resource.id)}
                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#7A3B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#5E2D48] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            {isRTL ? 'ألقِ نظرة' : 'Peek Inside'}
                          </button>
                        )}

                        {isUnlocked ? (
                          <button
                            onClick={() => handleDownload(resource.id)}
                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2 text-[#7A3B5E] text-xs font-medium hover:underline transition-colors"
                          >
                            {downloadedIds.has(resource.id) ? (
                              <><Check className="w-3.5 h-3.5" /> {isRTL ? 'حمِّلْ مرّة أخرى' : 'Download Again'}</>
                            ) : (
                              <><Download className="w-3.5 h-3.5" /> {isRTL ? 'حمِّلْ مجّانًا' : 'Download Free'}</>
                            )}
                          </button>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 text-xs text-[#8E8E9F]">
                            <Lock className="w-3 h-3" />
                            {isRTL ? 'أدخِلْ بريدَك لفتح التحميل' : 'Unlock with email above'}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
              );
            })}
          </MobileCarousel>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                disabled={currentPage === 1}
                className="p-2.5 rounded-full border border-[#F3EFE8] bg-white text-[#4A4A5C] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-[#7A3B5E] text-white shadow-md'
                      : 'bg-white text-[#4A4A5C] border border-[#F3EFE8] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-full border border-[#F3EFE8] bg-white text-[#4A4A5C] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Results count */}
          <p className="text-center text-xs text-[#8E8E9F] mt-4">
            {isRTL
              ? `${filteredResources.length} أداة`
              : `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filteredResources.length)} of ${filteredResources.length} toolkits`}
          </p>
        </div>
      </section>

      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={<>You've Taken the First Step — Keep <span className="text-[#7A3B5E] italic">Going</span></>}
        headingAr={<>خطوتُك الأولى بدأت — <span className="text-[#7A3B5E] italic">واصِلْ</span></>}
        primaryTextEn="Get Personal Support"
        primaryTextAr="احصلْ على دعمٍ شخصيّ"
        secondaryTextEn="I Have Questions"
        secondaryTextAr="لديّ أسئلة"
      />

      {/* Peek Inside Preview Modal */}
      {previewId && (() => {
        const resource = resources.find(r => r.id === previewId);
        if (!resource) return null;
        const title = isRTL ? resource.title.ar : resource.title.en;
        const description = isRTL ? resource.description.ar : resource.description.en;
        const TypeIcon = typeIcons[resource.type] || FileText;
        const typeLabel = isRTL ? typeLabels[resource.type].ar : typeLabels[resource.type].en;

        // Extract structured preview from markdown
        const sections = previewContent
          ? previewContent.split('\n').filter(l => l.startsWith('## ')).map(l => l.replace('## ', ''))
          : [];
        const totalWords = previewContent ? previewContent.split(/\s+/).length : 0;
        const readTime = Math.max(1, Math.ceil(totalWords / 200));

        // Related toolkits: score by audience + category + type diversity
        const relatedToolkits = resources
          .filter(r => r.id !== resource.id)
          .map(r => {
            let score = 0;
            const rAud = r.audience || ({ families: 'parents', adults: 'adults', youth: 'parents', couples: 'couples' }[r.category]);
            const curAud = resource.audience || ({ families: 'parents', adults: 'adults', youth: 'parents', couples: 'couples' }[resource.category]);
            if (rAud === curAud) score += 3;
            if (r.category === resource.category) score += 2;
            if (r.type !== resource.type) score += 1; // diversity bonus
            return { resource: r, score };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewId(null)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              dir={isRTL ? 'rtl' : 'ltr'}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${typeGradients[resource.type] || 'from-[#F3EFE8] to-[#FAF7F2]'} p-6 flex items-center gap-4`}>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm">
                  <TypeIcon className={`w-6 h-6 ${typeIconColors[resource.type] || 'text-[#7A3B5E]'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="sage" size="sm">{typeLabel}</Badge>
                  </div>
                  <h2 className="text-lg font-bold text-[#2D2A33] truncate" style={{ fontFamily: 'var(--font-heading)' }}>
                    {title}
                  </h2>
                </div>
                <button onClick={() => setPreviewId(null)} className="p-2 rounded-full hover:bg-white/50 transition-colors">
                  <X className="w-5 h-5 text-[#4A4A5C]" />
                </button>
              </div>

              {/* Structured content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Description */}
                  <p className="text-sm text-[#4A4A5C] leading-relaxed mb-5">{description}</p>

                  {/* Stats bar */}
                  {!previewLoading && previewContent && (
                    <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[#F3EFE8]">
                      <div className="flex items-center gap-1.5 text-xs text-[#8E8E9F]">
                        <BookMarked className="w-3.5 h-3.5" />
                        {isRTL ? `${sections.length} أقسام` : `${sections.length} sections`}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#8E8E9F]">
                        <Clock className="w-3.5 h-3.5" />
                        {isRTL ? `${readTime} دقائق قراءة` : `${readTime} min read`}
                      </div>
                      <Badge variant="success" size="sm">{messages.common.free}</Badge>
                    </div>
                  )}

                  {/* What you'll learn — Table of Contents */}
                  {previewLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-8 h-8 border-2 border-[#7A3B5E] border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : sections.length > 0 ? (
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-[#2D2A33] uppercase tracking-wider mb-3">
                        {isRTL ? 'ماذا ستتعلّم' : "What You'll Learn"}
                      </h3>
                      <div className="space-y-2">
                        {sections.map((section, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#F3EFE8]">
                            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-white text-xs font-bold text-[#7A3B5E] shadow-sm shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-sm text-[#2D2A33] font-medium">{section}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : !previewContent ? (
                    <p className="text-sm text-[#8E8E9F] text-center py-8">
                      {isRTL ? 'لا يمكن تحميل المعاينة' : 'Preview not available'}
                    </p>
                  ) : null}

                  {/* Related toolkits */}
                  {relatedToolkits.length > 0 && (
                    <div className="pt-5 border-t border-[#F3EFE8]">
                      <h3 className="text-sm font-bold text-[#2D2A33] uppercase tracking-wider mb-3">
                        {isRTL ? 'قد يعجبُك أيضًا' : 'You Might Also Like'}
                      </h3>
                      <div className="space-y-2">
                        {relatedToolkits.map(({ resource: r }) => {
                          const RIcon = typeIcons[r.type] || FileText;
                          return (
                            <button
                              key={r.id}
                              onClick={() => openPreview(r.id)}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl border border-[#F3EFE8] hover:bg-[#FAF7F2] transition-colors text-${isRTL ? 'right' : 'left'}`}
                            >
                              <div className={`flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${typeGradients[r.type] || 'from-[#F3EFE8] to-[#FAF7F2]'}`}>
                                <RIcon className={`w-4 h-4 ${typeIconColors[r.type] || 'text-[#7A3B5E]'}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#2D2A33] truncate">
                                  {isRTL ? r.title.ar : r.title.en}
                                </p>
                                <p className="text-xs text-[#8E8E9F]">
                                  {isRTL ? typeLabels[r.type].ar : typeLabels[r.type].en}
                                </p>
                              </div>
                              <Eye className="w-4 h-4 text-[#8E8E9F] shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="p-5 border-t border-[#F3EFE8] bg-white flex items-center gap-3">
                {isUnlocked ? (
                  <button
                    onClick={() => { handleDownload(resource.id); setPreviewId(null); }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#7A3B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#5E2D48] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {isRTL ? 'حمِّلْ الأداة كاملة' : 'Download Full Toolkit'}
                  </button>
                ) : (
                  <div className="flex-1 text-center text-sm text-[#8E8E9F]">
                    <Lock className="w-4 h-4 inline-block mr-1" />
                    {isRTL ? 'أدخِلْ بريدَك لفتح التحميل' : 'Enter your email above to unlock downloads'}
                  </div>
                )}
                <button
                  onClick={() => setPreviewId(null)}
                  className="px-5 py-3 border border-[#F3EFE8] text-sm font-medium text-[#4A4A5C] rounded-xl hover:bg-[#FAF7F2] transition-colors"
                >
                  {isRTL ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        );
      })()}
    </div>
  );
}
