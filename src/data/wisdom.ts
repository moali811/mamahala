/* Daily wisdom card — rotating quotes shown at the bottom of the
   Dashboard. Picked deterministically from the date so it stays the
   same all day, fresh tomorrow. Edit freely; ordering doesn't matter. */

export interface Wisdom {
  en: string;
  ar: string;
}

export const WISDOM: Wisdom[] = [
  { en: "Slow is a kind of attention.", ar: "البطءُ شكلٌ من أشكالِ الانتباه." },
  { en: "What you protect grows.", ar: "ما تحميه يكبر." },
  { en: "Listening is its own kind of help.", ar: "الإصغاءُ مساعدةٌ بحدِّ ذاته." },
  { en: "A small door, opened gently, leads further than a forced one.", ar: "البابُ الصغيرُ يُفتحُ بلطفٍ فيؤدّي أبعدَ من المُكسَّر." },
  { en: "Care is a practice, not a feeling.", ar: "الرعايةُ ممارسة، لا شعور." },
  { en: "Quiet days are not wasted days.", ar: "الأيّامُ الهادئةُ ليست أيّاماً ضائعة." },
  { en: "Hold space first; advice is a guest.", ar: "احتضن المساحةَ أوّلاً؛ النصيحةُ ضيف." },
  { en: "The work that lasts is the work that fits.", ar: "العملُ الذي يدومُ هو العملُ الذي يُناسب." },
  { en: "Kindness is a long road. Pace yourself.", ar: "اللُّطفُ طريقٌ طويل — وازِن خطواتك." },
  { en: "Boundaries are how love stays.", ar: "الحدودُ هي ما يُبقي الحبَّ حيّاً." },
  { en: "There is wisdom in waiting one more breath.", ar: "في الانتظارِ نفسَاً واحداً حكمة." },
  { en: "The smallest honest sentence outweighs a perfect speech.", ar: "أصغرُ جملةٍ صادقةٍ أثقلُ من خطبةٍ كاملة." },
  { en: "Begin with what is already true.", ar: "ابدأ ممّا هو حقٌّ بالفعل." },
  { en: "Repair is creative work.", ar: "الإصلاحُ عملٌ إبداعيّ." },
  { en: "Tend to the soil, not the bloom.", ar: "اعتنِ بالتُّربة، لا بالزَّهرة." },
  { en: "Patience is a way of telling the truth.", ar: "الصَّبرُ طريقةٌ لقولِ الحقّ." },
  { en: "One full breath changes the room.", ar: "نفسٌ كاملٌ يُغيِّرُ الغرفة." },
  { en: "Compassion includes you.", ar: "الرَّحمةُ تشملُك أنت." },
  { en: "Names matter. Use them.", ar: "للأسماءِ وزن — استخدِمها." },
  { en: "What you witness, you tend.", ar: "ما تشهدُه، تعتني به." },
  { en: "Go gently, and arrive whole.", ar: "امضِ برفق، وتصِل سليماً." },
  { en: "A single good question can reshape a week.", ar: "سؤالٌ واحدٌ جيّدٌ قد يُعيدُ تشكيلَ أسبوع." },
  { en: "Permission is a gift you can give yourself.", ar: "الإذنُ هديّةٌ تمنحُها لنفسِك." },
  { en: "The room sets the tone before the words do.", ar: "الغرفةُ تُحدِّدُ النَّبرةَ قبلَ الكلمات." },
  { en: "Endings are also beginnings of attention.", ar: "النِّهاياتُ أيضاً بداياتُ انتباه." },
  { en: "Soft things are not weak things.", ar: "اللّيِّنُ ليس ضعيفاً." },
  { en: "Steady hands change more than loud voices.", ar: "الأيدي الثابتةُ تُغيِّرُ أكثرَ من الأصواتِ العالية." },
  { en: "You are allowed a slow morning.", ar: "يُسمَحُ لكَ بصباحٍ بطيء." },
  { en: "Choose the work you can do for years.", ar: "اختر العملَ الذي يُمكنُكَ متابعتُه لسنوات." },
  { en: "Quiet care is care.", ar: "الرعايةُ الهادئةُ رعاية." },
];

/** Pick today's wisdom — same all day, rotates daily. */
export function pickTodaysWisdom(now: Date = new Date()): Wisdom {
  const epochDay = Math.floor(now.getTime() / 86_400_000);
  return WISDOM[epochDay % WISDOM.length];
}
