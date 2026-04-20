import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../../lib/theme";

type Props = {
  // Position in percent of the screenshot container
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  /** Frame in chapter where callout appears */
  enterFrame: number;
  /** Frame in chapter where callout exits */
  exitFrame: number;
  /** Total chapter duration in frames */
  bodyDurationFrames: number;
};

export const Callout: React.FC<Props> = ({
  x,
  y,
  w,
  h,
  label,
  enterFrame,
  exitFrame,
  bodyDurationFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < enterFrame || frame > exitFrame) return null;

  const enterProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const exitStart = exitFrame - 8;
  const exitProgress = frame > exitStart
    ? interpolate(frame, [exitStart, exitFrame], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  const opacity = enterProgress * (1 - exitProgress);
  const scale = 0.9 + enterProgress * 0.1;

  // Pulsing ring for emphasis
  const pulsePhase = (frame % 40) / 40;
  const pulseScale = 1 + pulsePhase * 0.15;
  const pulseOpacity = (1 - pulsePhase) * 0.6;

  const labelY = y < 0.5 ? y + h + 0.015 : y - 0.06;
  const labelAbove = y >= 0.5;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        width: `${w * 100}%`,
        height: `${h * 100}%`,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        pointerEvents: "none",
      }}
    >
      {/* Pulsing ring */}
      <div
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: 16,
          border: `3px solid ${BRAND.colors.plum}`,
          transform: `scale(${pulseScale})`,
          opacity: pulseOpacity,
          transition: "none",
        }}
      />
      {/* Primary highlight box */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 14,
          border: `4px solid ${BRAND.colors.plum}`,
          boxShadow: `0 0 0 4px ${BRAND.colors.rose}50, 0 12px 32px rgba(122, 59, 94, 0.35)`,
          background: `${BRAND.colors.rose}15`,
        }}
      />
      {/* Label pill */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: labelAbove ? "auto" : "calc(100% + 12px)",
          bottom: labelAbove ? "calc(100% + 12px)" : "auto",
          transform: "translateX(-50%)",
          background: BRAND.colors.plum,
          color: "white",
          padding: "10px 18px",
          borderRadius: 10,
          fontSize: 22,
          fontFamily: BRAND.fonts.body,
          fontWeight: 600,
          whiteSpace: "nowrap",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}
      >
        {label}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: labelAbove ? "100%" : "auto",
            bottom: labelAbove ? "auto" : "100%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: labelAbove ? `8px solid ${BRAND.colors.plum}` : undefined,
            borderBottom: labelAbove ? undefined : `8px solid ${BRAND.colors.plum}`,
          }}
        />
      </div>
    </div>
  );
};
