import type { ToolkitMeta } from '@/types/toolkit';

export interface ToolkitCatalogEntry {
  slug: string;
  titleEn: string;
  titleAr: string;
  hasInteractiveVersion: boolean;
  isPremium?: boolean;
  priceCAD?: number;
}

export const toolkitCatalog: ToolkitCatalogEntry[] = [
  {
    slug: 'anxiety-recovery-journal',
    titleEn: 'The Anxiety Recovery Journal',
    titleAr: 'يوميّاتُ التعافي من القلق',
    hasInteractiveVersion: true,
    isPremium: true,
    priceCAD: 7,
  },
  {
    slug: 'couples-communication-workbook',
    titleEn: 'Couples Communication Workbook',
    titleAr: 'دَفْتَرُ عَمَلِ التَّواصُلِ لِلأَزْواج',
    hasInteractiveVersion: true,
    isPremium: true,
    priceCAD: 7,
  },
  {
    slug: 'complete-parenting-guide',
    titleEn: 'The Intentional Parent: A Complete Guide',
    titleAr: 'الوالِدُ الواعي: دَليلٌ شامِل',
    hasInteractiveVersion: true,
    isPremium: true,
    priceCAD: 7,
  },
  {
    slug: 'understanding-your-teen',
    titleEn: "Understanding Your Teen's Inner World",
    titleAr: 'فَهْمُ العالَمِ الدّاخِلِيِّ لِمُراهِقِك',
    hasInteractiveVersion: true,
    isPremium: true,
    priceCAD: 7,
  },
  {
    slug: 'adulting-emotional-edition',
    titleEn: 'Adulting 101: The Emotional Edition',
    titleAr: 'دَليلُ الكِبار ١٠١: النُّسْخَةُ العاطِفِيَّة',
    hasInteractiveVersion: true,
    isPremium: true,
    priceCAD: 7,
  },
  // All others have hasInteractiveVersion: false for now
];

const toolkitLoaders: Record<string, () => Promise<{ default: ToolkitMeta }>> = {
  'anxiety-recovery-journal': () => import('./anxiety-recovery-journal'),
  'couples-communication-workbook': () => import('./couples-communication-workbook'),
  'complete-parenting-guide': () => import('./complete-parenting-guide'),
  'understanding-your-teen': () => import('./understanding-your-teen'),
  'adulting-emotional-edition': () => import('./adulting-emotional-edition'),
};

export async function getToolkit(slug: string): Promise<ToolkitMeta | null> {
  const loader = toolkitLoaders[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
