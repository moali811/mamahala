'use client';
import { useState } from 'react';
import { t } from '@/lib/academy-helpers';
import type { TabsBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';
import BlockRenderer from './BlockRenderer';

export default function TabsBlockView({ block, ctx }: { block: TabsBlock; ctx: BlockContext }) {
  const [active, setActive] = useState(0);
  const current = block.tabs[active];
  return (
    <div className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden">
      <div className="flex border-b border-[#F3EFE8] overflow-x-auto">
        {block.tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
              i === active ? 'border-[color:var(--c)] text-[#2D2A33]' : 'border-transparent text-[#8E8E9F] hover:text-[#4A4A5C]'
            }`}
            style={{ '--c': ctx.color } as React.CSSProperties}
          >
            {t(tab.labelEn, tab.labelAr, ctx.isRTL)}
          </button>
        ))}
      </div>
      <div className="p-5 space-y-3">
        {current?.children.map(child => (
          <BlockRenderer key={child.id} block={child} ctx={ctx} />
        ))}
      </div>
    </div>
  );
}
