'use client';
import { t } from '@/lib/academy-helpers';
import type { HeadingBlock } from '@/types';
import type { BlockContext } from './BlockRenderer';

export default function HeadingBlockView({ block, ctx }: { block: HeadingBlock; ctx: BlockContext }) {
  const text = t(block.textEn, block.textAr, ctx.isRTL);
  const cls = block.level === 2
    ? 'text-2xl font-bold text-[#2D2A33] mt-2'
    : 'text-lg font-semibold text-[#2D2A33] mt-1';
  const Tag = block.level === 2 ? 'h2' : 'h3';
  return <Tag id={block.id} className={cls} style={{ fontFamily: 'var(--font-heading)' }}>{text}</Tag>;
}
