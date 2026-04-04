'use client';

const METHOD_COLORS: Record<string, string> = {
  'Gottman Method': '#7A3B5E',
  'CBT': '#3B8A6E',
  'ACT': '#C8A97D',
  'EFT': '#C4878A',
  'Attachment Theory': '#D4836A',
  'Positive Psychology': '#5B8AC4',
  'Mindfulness': '#3B8A6E',
  'DBT': '#7A3B5E',
  'Family Systems': '#C8A97D',
  'Neuroscience': '#4A4A5C',
};

interface MethodologyBadgeProps {
  method: string;
  size?: 'sm' | 'md';
}

export default function MethodologyBadge({ method, size = 'sm' }: MethodologyBadgeProps) {
  const color = METHOD_COLORS[method] || '#6B6580';

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
      }`}
      style={{ backgroundColor: `${color}10`, color }}
    >
      {method}
    </span>
  );
}
