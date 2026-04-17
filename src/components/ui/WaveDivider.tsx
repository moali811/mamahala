/**
 * No-op — kept so existing imports don't break.
 * Sections separate via background color changes and whitespace.
 */

type WaveVariant = 'soft' | 'gentle' | 'organic';

interface WaveDividerProps {
  position?: 'top' | 'bottom';
  variant?: WaveVariant;
  fillColor?: string;
  className?: string;
  flip?: boolean;
}

export default function WaveDivider(_props: WaveDividerProps) {
  return null;
}
