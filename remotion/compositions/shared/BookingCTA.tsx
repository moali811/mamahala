import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../../lib/theme";

type BookingCTAProps = {
  text: string;
  isArabic?: boolean;
  accentColor?: string;
};

export const BookingCTA: React.FC<BookingCTAProps> = ({
  text,
  isArabic = false,
  accentColor = BRAND.colors.plum,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle pulse effect after appearing
  const pulse =
    frame > 30
      ? 1 + Math.sin((frame - 30) * 0.08) * 0.015
      : 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        opacity,
        transform: `scale(${scale * pulse})`,
      }}
    >
      <div
        style={{
          background: accentColor,
          color: BRAND.colors.white,
          fontSize: 28,
          fontWeight: 600,
          fontFamily: isArabic ? BRAND.fonts.arabic : BRAND.fonts.body,
          direction: isArabic ? "rtl" : "ltr",
          padding: "20px 56px",
          borderRadius: 60,
          letterSpacing: isArabic ? 0 : 0.5,
          boxShadow: `0 8px 30px ${accentColor}40`,
        }}
      >
        {text}
      </div>
      <div
        style={{
          fontSize: 16,
          color: BRAND.colors.mist,
          fontFamily: isArabic ? BRAND.fonts.arabic : BRAND.fonts.body,
          direction: isArabic ? "rtl" : "ltr",
          letterSpacing: 1,
        }}
      >
        {isArabic ? "mamahala.ca" : "mamahala.ca"}
      </div>
    </div>
  );
};
