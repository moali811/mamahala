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
    const [p1, p2, p3, p4, p5] = await Promise.all([
      import('./intentional-parent').then(m => m.intentionalParentProgram).catch(() => null),
      import('./resilient-teens').then(m => m.resilientTeensProgram).catch(() => null),
      import('./stronger-together').then(m => m.strongerTogetherProgram).catch(() => null),
      import('./inner-compass').then(m => m.innerCompassProgram).catch(() => null),
      import('./cultural-roots').then(m => m.culturalRootsProgram).catch(() => null),
    ]);
    _programs = [p1, p2, p3, p4, p5].filter(Boolean) as AcademyProgram[];
  } catch {
    _programs = [];
  }
  return _programs;
}

// Synchronous program catalog (metadata only, for static rendering)
export const programCatalog: Omit<AcademyProgram, 'levels'>[] = [
  {
    slug: 'intentional-parent',
    titleEn: 'The Intentional Parent',
    titleAr: 'الوالد الواعي',
    descriptionEn: 'Master the art of emotionally intelligent parenting with evidence-based strategies for every stage.',
    descriptionAr: 'أتقن فن التربية الذكية عاطفياً باستراتيجيات مبنية على الأدلة لكل مرحلة.',
    longDescriptionEn: 'A comprehensive 15-module journey that transforms your parenting approach from reactive to intentional. Learn emotional coaching, set boundaries with warmth, and build a family culture rooted in connection.',
    longDescriptionAr: '[Arabic translation needed]',
    category: 'families',
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
      ar: ['[Arabic translation needed]'],
    },
    whatYouWillLearn: {
      en: ['Emotional coaching techniques', 'Boundaries that build trust', 'Co-regulation strategies', 'Culturally rooted parenting practices', 'Conflict repair skills'],
      ar: ['[Arabic translation needed]'],
    },
  },
  {
    slug: 'resilient-teens',
    titleEn: 'Raising Resilient Teens',
    titleAr: 'تربية مراهقين أقوياء',
    descriptionEn: 'Navigate the teen years with confidence — communication tools, digital wellness, and resilience building.',
    descriptionAr: 'تنقّل في سنوات المراهقة بثقة — أدوات التواصل والعافية الرقمية وبناء المرونة.',
    longDescriptionEn: 'A 12-module program designed for parents of teenagers and pre-teens. Understand the teen brain, bridge communication gaps, and equip your teen with tools for anxiety, peer pressure, and self-worth.',
    longDescriptionAr: '[Arabic translation needed]',
    category: 'youth',
    image: '',
    color: '#C4878A',
    icon: 'Sprout',
    isFree: false,
    priceCAD: 99,
    totalModules: 12,
    totalDurationHours: 10,
    certificate: { titleEn: 'Teen Resilience', titleAr: 'مرونة المراهقين', signedBy: 'Dr. Hala Ali' },
    whoIsThisFor: {
      en: ['Parents of teens and pre-teens (ages 10-18)', 'Educators working with adolescents', 'Families experiencing teen communication challenges', 'Parents concerned about digital wellness'],
      ar: ['[Arabic translation needed]'],
    },
    whatYouWillLearn: {
      en: ['Teen brain science simplified', 'Communication bridges that work', 'Digital wellness strategies', 'Anxiety management for teens', 'Building self-worth and independence'],
      ar: ['[Arabic translation needed]'],
    },
  },
  {
    slug: 'stronger-together',
    titleEn: 'Stronger Together',
    titleAr: 'أقوى معاً',
    descriptionEn: 'Deepen your connection, transform conflict into growth, and build a relationship that lasts.',
    descriptionAr: 'عمّق ترابطكما، حوّل الخلاف إلى نمو، وابنِ علاقة تدوم.',
    longDescriptionEn: 'A 12-module couples program rooted in Gottman research and emotionally-focused therapy. Whether you are newlyweds or decades in, this program gives you tools to communicate, connect, and co-create a meaningful partnership.',
    longDescriptionAr: '[Arabic translation needed]',
    category: 'couples',
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
      ar: ['[Arabic translation needed]'],
    },
    whatYouWillLearn: {
      en: ['Love languages in practice', 'Turning conflict into connection', 'Emotional bids and responses', 'Co-parenting harmony', 'Trust rebuilding strategies'],
      ar: ['[Arabic translation needed]'],
    },
  },
  {
    slug: 'inner-compass',
    titleEn: 'Inner Compass',
    titleAr: 'البوصلة الداخلية',
    descriptionEn: 'Discover your authentic self, manage anxiety, and build a life aligned with your values.',
    descriptionAr: 'اكتشف ذاتك الحقيقية، أدر قلقك، وابنِ حياة تتوافق مع قيمك.',
    longDescriptionEn: 'A 12-module self-discovery program for adults navigating life transitions, anxiety, or a search for meaning. Grounded in CBT, ACT, and mindfulness practices, this program helps you break unhelpful patterns and live with intention.',
    longDescriptionAr: '[Arabic translation needed]',
    category: 'adults',
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
      ar: ['[Arabic translation needed]'],
    },
    whatYouWillLearn: {
      en: ['Self-compassion practices', 'Anxiety management tools', 'Pattern-breaking strategies', 'Values-aligned living', 'Resilience building techniques'],
      ar: ['[Arabic translation needed]'],
    },
  },
  {
    slug: 'cultural-roots',
    titleEn: 'Cultural Roots, Modern Wings',
    titleAr: 'جذور ثقافية، أجنحة حديثة',
    descriptionEn: 'Celebrate your heritage while thriving in a new world — a guide for multicultural families.',
    descriptionAr: 'احتفِ بتراثك بينما تزدهر في عالم جديد — دليل للعائلات متعددة الثقافات.',
    longDescriptionEn: 'An 8-module program celebrating the strength of bicultural identity. Designed for Arab families abroad (and any multicultural family), this free program helps you pass down values, navigate school systems, and build bridges between generations.',
    longDescriptionAr: '[Arabic translation needed]',
    category: 'families',
    image: '',
    color: '#3B8A6E',
    icon: 'TreePine',
    isFree: true,
    totalModules: 8,
    totalDurationHours: 6,
    certificate: { titleEn: 'Cultural Bridge Builder', titleAr: 'باني الجسور الثقافية', signedBy: 'Dr. Hala Ali' },
    whoIsThisFor: {
      en: ['Arab families living abroad', 'Any multicultural or immigrant family', 'Parents wanting to preserve cultural identity', 'Families navigating bilingual education'],
      ar: ['[Arabic translation needed]'],
    },
    whatYouWillLearn: {
      en: ['The bicultural advantage', 'Values transmission without pressure', 'Language and identity preservation', 'Navigating school systems abroad', 'Intergenerational understanding'],
      ar: ['[Arabic translation needed]'],
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
