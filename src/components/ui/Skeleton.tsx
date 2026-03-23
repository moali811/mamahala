interface SkeletonProps {
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

const roundedStyles = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
};

export default function Skeleton({ className = '', rounded = 'md' }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer ${roundedStyles[rounded]} ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-subtle)]">
      <Skeleton className="h-48 w-full mb-4" rounded="lg" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}
