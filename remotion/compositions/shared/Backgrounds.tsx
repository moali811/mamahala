import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { BRAND } from "../../lib/theme";

type WarmBackgroundProps = {
  accentColor?: string;
};

/** Warm linen base with soft gradient orbs */
export const WarmBackground: React.FC<WarmBackgroundProps> = ({
  accentColor = BRAND.colors.rose,
}) => {
  const frame = useCurrentFrame();
  // Gentle floating movement
  const drift = Math.sin(frame * 0.02) * 20;
  const drift2 = Math.cos(frame * 0.015) * 15;

  return (
    <>
      {/* Base */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: BRAND.colors.linen }} />

      {/* Top-right accent orb */}
      <div
        style={{
          position: "absolute",
          top: -100 + drift,
          right: -80 + drift2,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}18, transparent 70%)`,
        }}
      />

      {/* Bottom-left peach orb */}
      <div
        style={{
          position: "absolute",
          bottom: -120 - drift,
          left: -60 - drift2,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.colors.peach}60, transparent 70%)`,
        }}
      />

      {/* Center soft glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "30%",
          width: 800,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${BRAND.colors.cloud}80, transparent 70%)`,
          opacity: 0.5,
        }}
      />
    </>
  );
};

/** Accent line along top with spring animation */
export const AccentBar: React.FC<{
  color?: string;
  secondaryColor?: string;
  progress: number;
}> = ({
  color = BRAND.colors.rose,
  secondaryColor = BRAND.colors.plum,
  progress,
}) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: `${progress * 100}%`,
      height: 6,
      background: `linear-gradient(90deg, ${color}, ${secondaryColor})`,
    }}
  />
);

/** Decorative dots pattern */
export const DotPattern: React.FC<{
  color?: string;
  opacity?: number;
}> = ({ color = BRAND.colors.rose, opacity = 0.06 }) => {
  const dots: { x: number; y: number }[] = [];
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 9; j++) {
      dots.push({ x: 128 * i, y: 120 * j });
    }
  }

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      {dots.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: d.x,
            top: d.y,
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

/** Stat badge */
export const StatBadge: React.FC<{
  value: string;
  isArabic?: boolean;
}> = ({ value, isArabic = false }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 15], [10, 0], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        background: BRAND.colors.white,
        color: BRAND.colors.plum,
        fontSize: 20,
        fontWeight: 600,
        fontFamily: isArabic ? BRAND.fonts.arabic : BRAND.fonts.body,
        direction: isArabic ? "rtl" : "ltr",
        padding: "12px 28px",
        borderRadius: 40,
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {value}
    </div>
  );
};
