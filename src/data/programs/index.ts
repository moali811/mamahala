/* ================================================================
   Mama Hala Academy — Program Catalog
   ================================================================
   Central index for all academy programs.
   Individual program content lives in separate files.
   ================================================================ */

import type { AcademyProgram } from '@/types';

// Programs will be imported once their data files are created
// For now, export helpers that work with any program array

let _programs: AcademyProgram[] = [];

// Lazy loader — imports program files on first access
async function loadPrograms(): Promise<AcademyProgram[]> {
  if (_programs.length > 0) return _programs;
  try {
    const [p1, p2, p3, p4] = await Promise.all([
      import('./intentional-parent').then(m => m.intentionalParentProgram).catch(() => null),
      import('./resilient-teens').then(m => m.resilientTeensProgram).catch(() => null),
      import('./stronger-together').then(m => m.strongerTogetherProgram).catch(() => null),
      import('./inner-compass').then(m => m.innerCompassProgram).catch(() => null),
    ]);
    _programs = [p1, p2, p3, p4].filter(Boolean) as AcademyProgram[];
  } catch {
    _programs = [];
  }
  return _programs;
}

// Extended catalog type with overview page fields
export interface ProgramCatalogEntry extends Omit<AcademyProgram, 'levels'> {
  frameworks: string[];
  categoryLabel: string;
}

// Synchronous program catalog (metadata only, for static rendering)
export const programCatalog: ProgramCatalogEntry[] = [
  {
    slug: 'intentional-parent',
    titleEn: 'The Intentional Parent',
    titleAr: 'الوالد الواعي',
    descriptionEn: 'Master emotionally intelligent parenting with 15 evidence-based modules. Build deeper connections and raise confident children.',
    descriptionAr: 'أتقن التربية الذكية عاطفياً مع 15 وحدة مبنية على الأدلة. ابنِ روابط أعمق وربِّ أطفالاً واثقين.',
    longDescriptionEn: 'A comprehensive 15-module journey that transforms your parenting approach from reactive to intentional. Learn emotional coaching, set boundaries with warmth, and build a family culture rooted in connection.',
    longDescriptionAr: 'رحلة شاملة من 15 وحدة تحوّل أسلوبك التربوي من ردّة الفعل إلى القصد والوعي. تعلّم التدريب العاطفي، وضع الحدود بدفء، وابنِ ثقافة أسرية متجذرة في التواصل.',
    category: 'families',
    categoryLabel: 'Families',
    frameworks: ['Attachment Theory', 'Emotional Coaching'],
    image: '',
    color: '#7A3B5E',
    icon: 'Heart',
    isFree: false,
    priceCAD: 149,
    totalModules: 15,
    totalDurationHours: 12,
    certificate: { titleEn: 'Intentional Parenting', titleAr: 'التربية الواعية', signedBy: 'Dr. Hala Ali' },
    whoIsThisFor: {
      en: ['Parents of children ages 2-12', 'Parents wanting to break generational patterns', 'Families navigating cultural transitions', 'Anyone seeking evidence-based parenting tools'],
      ar: ['آباء وأمهات أطفال من 2 إلى 12 سنة', 'من يرغب بكسر الأنماط الموروثة', 'عائلات تمرّ بتحولات ثقافية', 'كل من يبحث عن أدوات تربوية مبنية على الأدلة'],
    },
    whatYouWillLearn: {
      en: ['Emotional coaching techniques', 'Boundaries that build trust', 'Co-regulation strategies', 'Culturally rooted parenting practices', 'Conflict repair skills'],
      ar: ['تقنيات التدريب العاطفي', 'حدود تبني الثقة', 'استراتيجيات التنظيم المشترك', 'ممارسات تربوية متجذرة ثقافياً', 'مهارات إصلاح النزاعات'],
    },
  },
  {
    slug: 'resilient-teens',
    titleEn: 'Raising Resilient Teens',
    titleAr: 'تربية مراهقين أقوياء',
    descriptionEn: 'Navigate the teen years with confidence — communication tools, digital wellness, and resilience building.',
    descriptionAr: 'تنقّل في سنوات المراهقة بثقة — أدوات التواصل والعافية الرقمية وبناء المرونة.',
    longDescriptionEn: 'A 12-module program designed for parents of teenagers and pre-teens. Understand the teen brain, bridge communication gaps, and equip your teen with tools for anxiety, peer pressure, and self-worth.',
    longDescriptionAr: 'برنامج من 12 وحدة مصمم لآباء وأمهات المراهقين. افهم دماغ المراهق، وجسّر فجوات التواصل، وزوّد ابنك بأدوات لمواجهة القلق وضغط الأقران وتقدير الذات.',
    category: 'youth',
    categoryLabel: 'Youth',
    frameworks: ['Neuroscience', 'CBT'],
    image: '',
    color: '#C4878A',
    icon: 'Sprout',
    isFree: false,
    priceCAD: 129,
    totalModules: 12,
    totalDurationHours: 10,
    certificate: { titleEn: 'Teen Resilience', titleAr: 'مرونة المراهقين', signedBy: 'Dr. Hala Ali' },
    whoIsThisFor: {
      en: ['Parents of teens and pre-teens (ages 10-18)', 'Educators working with adolescents', 'Families experiencing teen communication challenges', 'Parents concerned about digital wellness'],
      ar: ['آباء وأمهات المراهقين (10-18 سنة)', 'معلمون يعملون مع المراهقين', 'عائلات تعاني من تحديات تواصل مع المراهقين', 'آباء قلقون بشأن العافية الرقمية'],
    },
    whatYouWillLearn: {
      en: ['Teen brain science simplified', 'Communication bridges that work', 'Digital wellness strategies', 'Anxiety management for teens', 'Building self-worth and independence'],
      ar: ['علم دماغ المراهق بأسلوب مبسّط', 'جسور تواصل فعّالة', 'استراتيجيات العافية الرقمية', 'إدارة القلق لدى المراهقين', 'بناء تقدير الذات والاستقلالية'],
    },
  },
  {
    slug: 'stronger-together',
    titleEn: 'Stronger Together',
    titleAr: 'أقوى معاً',
    descriptionEn: 'Deepen your connection, transform conflict into growth, and build a relationship that lasts.',
    descriptionAr: 'عمّق ترابطكما، حوّل الخلاف إلى نمو، وابنِ علاقة تدوم.',
    longDescriptionEn: 'A 12-module couples program rooted in Gottman research and emotionally-focused therapy. Whether you are newlyweds or decades in, this program gives you tools to communicate, connect, and co-create a meaningful partnership.',
    longDescriptionAr: 'برنامج للأزواج من 12 وحدة مبني على أبحاث غوتمان والعلاج المركّز عاطفياً. سواء كنتما حديثي الزواج أو معاً منذ عقود، يمنحكما هذا البرنامج أدوات للتواصل والتواصل وبناء شراكة ذات معنى.',
    category: 'couples',
    categoryLabel: 'Couples',
    frameworks: ['Gottman Method', 'EFT'],
    image: '',
    color: '#D4836A',
    icon: 'HeartHandshake',
    isFree: false,
    priceCAD: 149,
    totalModules: 12,
    totalDurationHours: 10,
    certificate: { titleEn: 'Relationship Mastery', titleAr: 'إتقان العلاقات', signedBy: 'Dr. Hala Ali' },
    whoIsThisFor: {
      en: ['Couples at any stage of their relationship', 'Engaged couples preparing for marriage', 'Parents wanting to strengthen their co-parenting', 'Couples navigating a rough patch'],
      ar: ['أزواج في أي مرحلة من علاقتهم', 'مخطوبون يستعدون للزواج', 'آباء يرغبون بتقوية تربيتهم المشتركة', 'أزواج يمرّون بمرحلة صعبة'],
    },
    whatYouWillLearn: {
      en: ['Love languages in practice', 'Turning conflict into connection', 'Emotional bids and responses', 'Co-parenting harmony', 'Trust rebuilding strategies'],
      ar: ['لغات الحب في التطبيق العملي', 'تحويل النزاع إلى تواصل', 'المبادرات العاطفية والاستجابة لها', 'انسجام التربية المشتركة', 'استراتيجيات إعادة بناء الثقة'],
    },
  },
  {
    slug: 'inner-compass',
    titleEn: 'Inner Compass',
    titleAr: 'البوصلة الداخلية',
    descriptionEn: 'Discover your authentic self, manage anxiety, and build a life aligned with your values.',
    descriptionAr: 'اكتشف ذاتك الحقيقية، أدر قلقك، وابنِ حياة تتوافق مع قيمك.',
    longDescriptionEn: 'A 12-module self-discovery program for adults navigating life transitions, anxiety, or a search for meaning. Grounded in CBT, ACT, and mindfulness practices, this program helps you break unhelpful patterns and live with intention.',
    longDescriptionAr: 'برنامج اكتشاف ذاتي من 12 وحدة للبالغين الذين يمرّون بتحولات حياتية أو قلق أو بحث عن المعنى. مبني على العلاج المعرفي السلوكي والقبول والالتزام واليقظة الذهنية، يساعدك على كسر الأنماط غير المفيدة والعيش بقصد.',
    category: 'adults',
    categoryLabel: 'Adults',
    frameworks: ['CBT', 'ACT', 'Mindfulness'],
    image: '',
    color: '#C8A97D',
    icon: 'Compass',
    isFree: false,
    priceCAD: 99,
    totalModules: 12,
    totalDurationHours: 10,
    certificate: { titleEn: 'Personal Growth', titleAr: 'النمو الشخصي', signedBy: 'Dr. Hala Ali' },
    whoIsThisFor: {
      en: ['Adults navigating life transitions', 'Anyone managing anxiety or stress', 'People seeking purpose and direction', 'Individuals breaking unhelpful patterns'],
      ar: ['بالغون يمرّون بتحولات حياتية', 'أي شخص يعاني من القلق أو التوتر', 'باحثون عن الهدف والاتجاه', 'أفراد يسعون لكسر الأنماط السلبية'],
    },
    whatYouWillLearn: {
      en: ['Self-compassion practices', 'Anxiety management tools', 'Pattern-breaking strategies', 'Values-aligned living', 'Resilience building techniques'],
      ar: ['ممارسات التعاطف مع الذات', 'أدوات إدارة القلق', 'استراتيجيات كسر الأنماط', 'العيش المتوافق مع القيم', 'تقنيات بناء المرونة النفسية'],
    },
  },
];

// Helper functions
export function getProgramBySlug(slug: string) {
  return programCatalog.find(p => p.slug === slug);
}

export function getProgramsByCategory(category: string) {
  return programCatalog.filter(p => p.category === category);
}

export function getFreePrograms() {
  return programCatalog.filter(p => p.isFree);
}

export { loadPrograms };
