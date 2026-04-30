/** Inline-SVG donut chart. Up to 4 segments + an "other" bucket if
 *  more provided. Center shows total. */
export function Donut({
  segments,
  size = 96,
  thickness = 12,
  centerLabel,
}: {
  segments: { label: string; value: number; color?: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
}) {
  const palette = ['var(--color-plum)', 'var(--color-sand)', 'var(--color-rose)', 'var(--color-terracotta)', 'var(--color-info)'];
  const top = segments.slice(0, 4);
  const other = segments.slice(4).reduce((s, x) => s + x.value, 0);
  const all = other > 0 ? [...top, { label: 'Other', value: other }] : top;
  const total = all.reduce((s, x) => s + x.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-none" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--color-cloud)"
            strokeWidth={thickness}
          />
          {total > 0 && all.map((s, i) => {
            const frac = s.value / total;
            const dash = c * frac;
            const gap = c - dash;
            const offset = -acc * c;
            acc += frac;
            return (
              <circle
                key={s.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color ?? palette[i % palette.length]}
                strokeWidth={thickness}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={offset}
                strokeLinecap="butt"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            );
          })}
        </svg>
        {centerLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-base font-semibold tabular-nums" style={{ color: 'var(--color-charcoal)' }}>{centerLabel}</span>
          </div>
        )}
      </div>
      <ul className="flex-1 min-w-0 space-y-1 text-[11px]">
        {all.map((s, i) => (
          <li key={s.label} className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 flex-none rounded-full" style={{ background: s.color ?? palette[i % palette.length] }} />
            <span className="flex-1 truncate" style={{ color: 'var(--color-mist)' }}>{s.label}</span>
            <span className="flex-none tabular-nums" style={{ color: 'var(--color-charcoal)' }}>{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
