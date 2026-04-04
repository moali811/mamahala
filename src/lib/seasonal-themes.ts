/* ================================================================
   Seasonal Auto-Themes
   ================================================================
   Maps months to thematic copy for the events page hero subtitle.
   Pure static — zero AI cost, zero maintenance.
   ================================================================ */

interface SeasonalTheme {
  subtitleEn: string;
  subtitleAr: string;
}

const themes: Record<number, SeasonalTheme> = {
  // January — New beginnings
  1: {
    subtitleEn: 'A new year, a fresh start — explore what growth looks like for you.',
    subtitleAr: 'عامٌ جديد، بدايةٌ جديدة — اكتشِفْ ما يعنيهِ النّموُّ لك.',
  },
  // February — Love & relationships
  2: {
    subtitleEn: 'Nurture your relationships — workshops for deeper connection.',
    subtitleAr: 'اعتنِ بعلاقاتِك — ورشُ عملٍ لتواصلٍ أعمق.',
  },
  // March — Women & family
  3: {
    subtitleEn: 'Celebrate strength — events for families and communities.',
    subtitleAr: 'احتفِ بالقوّة — فعاليّاتٌ للعائلاتِ والمجتمعات.',
  },
  // April — Spring renewal
  4: {
    subtitleEn: 'Spring into growth — community events to refresh your well-being.',
    subtitleAr: 'ازهِرْ مع الرّبيع — فعاليّاتٌ مجتمعيّةٌ لتجديدِ عافيتِك.',
  },
  // May — Mental health awareness
  5: {
    subtitleEn: 'Mental health matters — join conversations that make a difference.',
    subtitleAr: 'الصّحةُ النّفسيّةُ مهمّة — انضمّ لحواراتٍ تصنعُ الفرق.',
  },
  // June — Summer start
  6: {
    subtitleEn: 'Summer of connection — outdoor retreats and community gatherings.',
    subtitleAr: 'صيفُ التّواصل — خلواتٌ في الطّبيعةِ ولقاءاتٌ مجتمعيّة.',
  },
  // July — Outdoors & nature
  7: {
    subtitleEn: 'Heal in nature — experiential events under the open sky.',
    subtitleAr: 'تعافَ في الطّبيعة — تجارِبُ علاجيّةٌ تحتَ السّماءِ المفتوحة.',
  },
  // August — Back to school prep
  8: {
    subtitleEn: 'Prepare for transitions — workshops for the season ahead.',
    subtitleAr: 'استعدّ للتّحوّلات — ورشُ عملٍ للموسمِ القادم.',
  },
  // September — Back to school
  9: {
    subtitleEn: 'Supporting your child through new beginnings and transitions.',
    subtitleAr: 'ادعَمْ طفلَك خلالَ البداياتِ الجديدةِ والتّحوّلات.',
  },
  // October — Emotional wellness
  10: {
    subtitleEn: 'Cozy up to growth — fall workshops for emotional wellness.',
    subtitleAr: 'تدفّأْ بالنّموّ — ورشُ خريفٍ للعافيةِ العاطفيّة.',
  },
  // November — Gratitude & community
  11: {
    subtitleEn: 'Gratitude season — build community and strengthen bonds.',
    subtitleAr: 'موسمُ الامتنان — ابنِ المجتمعَ وعزّزِ الرّوابط.',
  },
  // December — Reflection
  12: {
    subtitleEn: 'Reflect, reset, renew — close the year with intention.',
    subtitleAr: 'تأمَّلْ، أعِدْ ضبطَ نفسِك، تجدَّدْ — اختِمِ العامَ بنيّةٍ واعية.',
  },
};

/**
 * Get the seasonal theme for the current month.
 */
export function getSeasonalTheme(): SeasonalTheme {
  const month = new Date().getMonth() + 1; // 1-12
  return themes[month] || themes[1];
}
