/* ================================================================
   Video Content — All copy for Remotion compositions (EN + AR)
   Dr. Hala's warm, empowering, culturally sensitive voice.
   ================================================================ */

export type ProgramVideoContent = {
  slug: string;
  color: string;
  icon: string;
  title: { en: string; ar: string };
  tagline: { en: string; ar: string };
  halaQuote: { en: string; ar: string };
  highlights: { en: string[]; ar: string[] };
  whoFor: { en: string; ar: string };
  cta: { en: string; ar: string };
  modules: number;
  hours: number;
  framework: { en: string; ar: string };
};

export const PROGRAMS: ProgramVideoContent[] = [
  {
    slug: "intentional-parent",
    color: "#7A3B5E",
    icon: "Heart",
    title: {
      en: "The Intentional Parent",
      ar: "الوالد الواعي",
    },
    tagline: {
      en: "From reactive to intentional — one moment at a time",
      ar: "من ردّة الفعل إلى القصد والوعي — لحظة بلحظة",
    },
    halaQuote: {
      en: "Every child needs to feel seen, heard, and valued. This program helps you become the parent your child needs — not perfect, but present.",
      ar: "كل طفل يحتاج أن يشعر بأنه مرئي ومسموع ومقدّر. هذا البرنامج يساعدك لتصبح الوالد الذي يحتاجه طفلك — ليس مثالياً، بل حاضراً.",
    },
    highlights: {
      en: [
        "Emotional coaching techniques",
        "Boundaries that build trust",
        "Co-regulation strategies",
        "Culturally rooted practices",
      ],
      ar: [
        "تقنيات التدريب العاطفي",
        "حدود تبني الثقة",
        "استراتيجيات التنظيم المشترك",
        "ممارسات متجذرة ثقافياً",
      ],
    },
    whoFor: {
      en: "Parents of children ages 2-12",
      ar: "آباء وأمهات أطفال من ٢ إلى ١٢ سنة",
    },
    cta: {
      en: "Start your journey — Level 1 is free",
      ar: "ابدأ رحلتك — المستوى الأول مجاني",
    },
    modules: 15,
    hours: 12,
    framework: {
      en: "Attachment Theory & Emotional Coaching",
      ar: "نظرية التعلق والتدريب العاطفي",
    },
  },
  {
    slug: "resilient-teens",
    color: "#C4878A",
    icon: "Sprout",
    title: {
      en: "Raising Resilient Teens",
      ar: "تربية مراهقين أقوياء",
    },
    tagline: {
      en: "Understanding their world changes everything",
      ar: "فهم عالمهم يغيّر كل شيء",
    },
    halaQuote: {
      en: "Understanding the teen brain was one of the most transformative things in my own practice. When you know why they act the way they do, judgment turns to compassion.",
      ar: "فهم دماغ المراهق كان من أكثر الأشياء تحويلاً في ممارستي. عندما تعرف لماذا يتصرفون هكذا، يتحول الحكم إلى تعاطف.",
    },
    highlights: {
      en: [
        "Teen brain science simplified",
        "Communication bridges that work",
        "Digital wellness strategies",
        "Building self-worth",
      ],
      ar: [
        "علم دماغ المراهق مبسّط",
        "جسور تواصل فعّالة",
        "استراتيجيات العافية الرقمية",
        "بناء تقدير الذات",
      ],
    },
    whoFor: {
      en: "Parents of teens & pre-teens (10-18)",
      ar: "آباء وأمهات المراهقين (١٠-١٨ سنة)",
    },
    cta: {
      en: "Start your journey — Level 1 is free",
      ar: "ابدأ رحلتك — المستوى الأول مجاني",
    },
    modules: 12,
    hours: 10,
    framework: {
      en: "Neuroscience & CBT",
      ar: "علم الأعصاب والعلاج المعرفي السلوكي",
    },
  },
  {
    slug: "stronger-together",
    color: "#D4836A",
    icon: "HeartHandshake",
    title: {
      en: "Stronger Together",
      ar: "أقوى معاً",
    },
    tagline: {
      en: "Turn conflict into connection",
      ar: "حوّل الخلاف إلى تواصل",
    },
    halaQuote: {
      en: "Love is not the absence of conflict — it is the presence of repair. Every couple can learn to turn towards each other instead of away.",
      ar: "الحب ليس غياب الخلاف — بل حضور الإصلاح. كل زوجين يمكنهما تعلّم التوجه نحو بعضهما بدلاً من الابتعاد.",
    },
    highlights: {
      en: [
        "Love languages in practice",
        "Turning conflict into growth",
        "Emotional bids & responses",
        "Co-parenting harmony",
      ],
      ar: [
        "لغات الحب عملياً",
        "تحويل النزاع إلى نمو",
        "المبادرات العاطفية والاستجابة",
        "انسجام التربية المشتركة",
      ],
    },
    whoFor: {
      en: "Couples at any stage of their relationship",
      ar: "أزواج في أي مرحلة من علاقتهم",
    },
    cta: {
      en: "Start your journey — Level 1 is free",
      ar: "ابدأ رحلتك — المستوى الأول مجاني",
    },
    modules: 12,
    hours: 10,
    framework: {
      en: "Gottman Method & EFT",
      ar: "منهج غوتمان والعلاج المركّز عاطفياً",
    },
  },
  {
    slug: "inner-compass",
    color: "#C8A97D",
    icon: "Compass",
    title: {
      en: "Inner Compass",
      ar: "البوصلة الداخلية",
    },
    tagline: {
      en: "Find your direction, live your truth",
      ar: "اعثر على اتجاهك، عِش حقيقتك",
    },
    halaQuote: {
      en: "I see so many adults living someone else's version of their life. This program is your invitation to come home to yourself — to discover what truly matters to you.",
      ar: "أرى الكثير من البالغين يعيشون نسخة شخص آخر من حياتهم. هذا البرنامج دعوتك للعودة إلى ذاتك — لاكتشاف ما يهمّك حقاً.",
    },
    highlights: {
      en: [
        "Self-compassion practices",
        "Anxiety management tools",
        "Pattern-breaking strategies",
        "Values-aligned living",
      ],
      ar: [
        "ممارسات التعاطف مع الذات",
        "أدوات إدارة القلق",
        "استراتيجيات كسر الأنماط",
        "العيش المتوافق مع القيم",
      ],
    },
    whoFor: {
      en: "Adults navigating transitions & seeking purpose",
      ar: "بالغون يمرّون بتحولات ويبحثون عن الهدف",
    },
    cta: {
      en: "Start your journey — Level 1 is free",
      ar: "ابدأ رحلتك — المستوى الأول مجاني",
    },
    modules: 12,
    hours: 10,
    framework: {
      en: "CBT, ACT & Mindfulness",
      ar: "العلاج المعرفي السلوكي واليقظة الذهنية",
    },
  },
];

/** Overview video content for the main Programs landing page */
export const OVERVIEW = {
  title: {
    en: "Your Growth Journey Starts Here",
    ar: "رحلة نموّك تبدأ من هنا",
  },
  subtitle: {
    en: "Evidence-based programs by Dr. Hala Ali",
    ar: "برامج مبنية على الأدلة من د. هالة علي",
  },
  halaIntro: {
    en: "I designed these programs for people like you — busy, caring, and ready for change. Each one is built on real research and years of working with families just like yours.",
    ar: "صمّمت هذه البرامج لأشخاص مثلك — مشغولون، محبّون، ومستعدون للتغيير. كل برنامج مبني على أبحاث حقيقية وسنوات من العمل مع عائلات مثل عائلتك.",
  },
  howItWorks: {
    en: [
      "Start free — Level 1 is always on us",
      "Learn at your own pace, anywhere",
      "Earn a certificate signed by Dr. Hala",
      "Need more support? Book a 1-on-1 session",
    ],
    ar: [
      "ابدأ مجاناً — المستوى الأول دائماً مجاني",
      "تعلّم بسرعتك، من أي مكان",
      "احصل على شهادة موقّعة من د. هالة",
      "تحتاج المزيد من الدعم؟ احجز جلسة خاصة",
    ],
  },
  bookingCta: {
    en: "Not sure where to start? Book a free consultation",
    ar: "لست متأكداً من أين تبدأ؟ احجز استشارة مجانية",
  },
  stats: {
    en: { families: "500+ families supported", recommend: "98% would recommend", experience: "8+ years of practice" },
    ar: { families: "+٥٠٠ عائلة", recommend: "٩٨٪ ينصحون بالخدمة", experience: "+٨ سنوات خبرة" },
  },
};
