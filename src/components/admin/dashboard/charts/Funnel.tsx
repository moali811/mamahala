/** 4-stage funnel as 4 bars whose width is proportional to the count
 *  at that stage relative to the top stage. */
export function Funnel({
  stages,
  width,
}: {
  stages: { label: string; value: number }[];
  width?: number;
}) {
  const top = Math.max(...stages.map((s) => s.value), 1);
  return (
    <div style={{ width: width ?? '100%' }}>
      {stages.map((s, i) => {
        const pct = (s.value / top) * 100;
        return (
          <div key={s.label} className="mb-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-mist)' }}>{s.label}</span>
              <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--color-charcoal)' }}>{s.value}</span>
            </div>
            <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--color-cloud)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${pct}%`,
                  background: i === stages.length - 1 ? 'var(--color-success)' : 'var(--color-plum)',
                  opacity: 1 - i * 0.12,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
