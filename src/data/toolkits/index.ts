import type { ToolkitMeta } from '@/types/toolkit';

export interface ToolkitCatalogEntry {
  slug: string;
  titleEn: string;
  titleAr: string;
  hasInteractiveVersion: boolean;
}

export const toolkitCatalog: ToolkitCatalogEntry[] = [
  {
    slug: 'anxiety-recovery-journal',
    titleEn: 'The Anxiety Recovery Journal',
    titleAr: 'يوميّاتُ التعافي من القلق',
    hasInteractiveVersion: true,
  },
  // All others have hasInteractiveVersion: false for now
];

const toolkitLoaders: Record<string, () => Promise<{ default: ToolkitMeta }>> = {
  'anxiety-recovery-journal': () => import('./anxiety-recovery-journal'),
};

export async function getToolkit(slug: string): Promise<ToolkitMeta | null> {
  const loader = toolkitLoaders[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
