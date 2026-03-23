/**
 * Reusable SVG wave dividers for smooth section transitions.
 * Place at the top or bottom of a section with `position: relative`.
 */

type WaveVariant = 'soft' | 'gentle' | 'organic';

interface WaveDividerProps {
  position?: 'top' | 'bottom';
  variant?: WaveVariant;
  fillColor?: string;
  className?: string;
  flip?: boolean;
}

const wavePaths: Record<WaveVariant, string> = {
  soft: 'M0,64 C320,100 640,20 960,64 C1280,108 1440,40 1440,40 L1440,0 L0,0 Z',
  gentle: 'M0,48 C240,96 480,16 720,48 C960,80 1200,24 1440,48 L1440,0 L0,0 Z',
  organic: 'M0,56 C180,90 360,20 540,50 C720,80 900,30 1080,56 C1260,82 1380,40 1440,48 L1440,0 L0,0 Z',
};

export default function WaveDivider({
  position = 'bottom',
  variant = 'soft',
  fillColor = '#FAF7F2',
  className = '',
  flip = false,
}: WaveDividerProps) {
  const isBottom = position === 'bottom';

  return (
    <div
      className={`absolute left-0 right-0 w-full overflow-hidden leading-[0] pointer-events-none ${
        isBottom ? 'bottom-0' : 'top-0'
      } ${className}`}
      style={{
        transform: `${isBottom ? 'rotate(180deg)' : ''} ${flip ? 'scaleX(-1)' : ''}`,
      }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block w-full h-[50px] md:h-[70px] lg:h-[90px]"
        fill={fillColor}
      >
        <path d={wavePaths[variant]} />
      </svg>
    </div>
  );
}
