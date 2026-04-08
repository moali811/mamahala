/* ================================================================
   Programs Overview Video
   Plays on the main Programs landing page.
   Introduces all 4 programs, shows how it works, ends with booking CTA.
   ~30 seconds | 900 frames @ 30fps
   ================================================================ */

import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../lib/theme";
import { OVERVIEW, PROGRAMS } from "../lib/content";
import { Logo } from "./shared/Logo";
import { AnimatedHeading, FadeUpText } from "./shared/AnimatedText";
import { BookingCTA } from "./shared/BookingCTA";
import { WarmBackground, AccentBar, StatBadge } from "./shared/Backgrounds";

type ProgramsOverviewProps = {
  lang: "en" | "ar";
};

export const ProgramsOverview: React.FC<ProgramsOverviewProps> = ({ lang }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const isAr = lang === "ar";

  const barProgress = spring({ frame, fps, config: { damping: 20 } });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fps, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <WarmBackground accentColor={BRAND.colors.rose} />
      <AccentBar
        color={BRAND.colors.rose}
        secondaryColor={BRAND.colors.plum}
        progress={barProgress}
      />

      {/* ---- Scene 1: Logo + Title (0-120) ---- */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Welcome lang={lang} />
      </Sequence>

      {/* ---- Scene 2: Dr. Hala's intro quote (100-280) ---- */}
      <Sequence from={100} durationInFrames={180}>
        <Scene2HalaIntro lang={lang} />
      </Sequence>

      {/* ---- Scene 3: Four Programs showcase (260-560) ---- */}
      <Sequence from={260} durationInFrames={300}>
        <Scene3Programs lang={lang} />
      </Sequence>

      {/* ---- Scene 4: How it works (540-720) ---- */}
      <Sequence from={540} durationInFrames={180}>
        <Scene4HowItWorks lang={lang} />
      </Sequence>

      {/* ---- Scene 5: Stats + Booking CTA (700-900) ---- */}
      <Sequence from={700} durationInFrames={200}>
        <Scene5Booking lang={lang} />
      </Sequence>
    </AbsoluteFill>
  );
};

/* ---- Scene 1: Welcome ---- */
const Scene1Welcome: React.FC<{ lang: "en" | "ar" }> = ({ lang }) => {
  const isAr = lang === "ar";
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [90, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        opacity: fadeOut,
      }}
    >
      <Logo size={100} />
      <AnimatedHeading
        text={OVERVIEW.title[lang]}
        fontSize={isAr ? 68 : 64}
        isArabic={isAr}
        color={BRAND.colors.charcoal}
      />
      <Sequence from={25}>
        <FadeUpText
          text={OVERVIEW.subtitle[lang]}
          fontSize={isAr ? 30 : 28}
          isArabic={isAr}
          color={BRAND.colors.plum}
          fontWeight={500}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

/* ---- Scene 2: Dr. Hala's Introduction ---- */
const Scene2HalaIntro: React.FC<{ lang: "en" | "ar" }> = ({ lang }) => {
  const isAr = lang === "ar";
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 120,
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Quote marks */}
      <div
        style={{
          fontSize: 120,
          color: BRAND.colors.rose,
          opacity: 0.25,
          fontFamily: BRAND.fonts.heading,
          lineHeight: 0.6,
          marginBottom: 10,
        }}
      >
        {isAr ? "\u201D" : "\u201C"}
      </div>

      <FadeUpText
        text={OVERVIEW.halaIntro[lang]}
        fontSize={isAr ? 34 : 32}
        isArabic={isAr}
        color={BRAND.colors.charcoal}
        fontWeight={400}
        maxWidth={1200}
      />

      <Sequence from={30}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 30 }}>
          <Logo size={48} fadeInDuration={12} />
          <FadeUpText
            text={isAr ? "د. هالة علي" : "Dr. Hala Ali"}
            fontSize={22}
            isArabic={isAr}
            color={BRAND.colors.plum}
            fontWeight={600}
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

/* ---- Scene 3: Four Programs Cards ---- */
const Scene3Programs: React.FC<{ lang: "en" | "ar" }> = ({ lang }) => {
  const isAr = lang === "ar";
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [260, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
        padding: "60px 80px",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Section title */}
      <FadeUpText
        text={isAr ? "٤ برامج مصممة لك" : "4 Programs Designed for You"}
        fontSize={isAr ? 40 : 36}
        isArabic={isAr}
        color={BRAND.colors.charcoal}
        fontWeight={600}
      />

      {/* Program cards grid */}
      <div
        style={{
          display: "flex",
          gap: 30,
          flexDirection: isAr ? "row-reverse" : "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {PROGRAMS.map((program, i) => (
          <Sequence key={program.slug} from={30 + i * 25}>
            <ProgramCard program={program} lang={lang} index={i} />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const ProgramCard: React.FC<{
  program: (typeof PROGRAMS)[number];
  lang: "en" | "ar";
  index: number;
}> = ({ program, lang, index }) => {
  const isAr = lang === "ar";
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 380,
        background: BRAND.colors.white,
        borderRadius: 24,
        padding: 36,
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        transform: `scale(${scale})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        borderTop: `4px solid ${program.color}`,
        direction: isAr ? "rtl" : "ltr",
      }}
    >
      {/* Category pill */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: program.color,
          fontFamily: isAr ? BRAND.fonts.arabic : BRAND.fonts.body,
          textTransform: isAr ? "none" : "uppercase",
          letterSpacing: isAr ? 0 : 2,
        }}
      >
        {program.whoFor[lang]}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: isAr ? 28 : 26,
          fontWeight: 700,
          color: BRAND.colors.charcoal,
          fontFamily: isAr ? BRAND.fonts.arabic : BRAND.fonts.heading,
          lineHeight: 1.2,
        }}
      >
        {program.title[lang]}
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: isAr ? 18 : 17,
          color: BRAND.colors.slate,
          fontFamily: isAr ? BRAND.fonts.arabic : BRAND.fonts.body,
          lineHeight: 1.5,
        }}
      >
        {program.tagline[lang]}
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 8,
          fontSize: 15,
          color: BRAND.colors.mist,
          fontFamily: isAr ? BRAND.fonts.arabic : BRAND.fonts.body,
        }}
      >
        <span>{program.modules} {isAr ? "وحدة" : "modules"}</span>
        <span>|</span>
        <span>{program.hours} {isAr ? "ساعة" : "hours"}</span>
      </div>
    </div>
  );
};

/* ---- Scene 4: How it Works ---- */
const Scene4HowItWorks: React.FC<{ lang: "en" | "ar" }> = ({ lang }) => {
  const isAr = lang === "ar";
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const steps = OVERVIEW.howItWorks[lang];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
        padding: "80px 120px",
        opacity: fadeIn * fadeOut,
      }}
    >
      <FadeUpText
        text={isAr ? "كيف يعمل" : "How It Works"}
        fontSize={isAr ? 44 : 40}
        isArabic={isAr}
        color={BRAND.colors.charcoal}
        fontWeight={600}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: isAr ? "flex-end" : "flex-start",
          maxWidth: 900,
        }}
      >
        {steps.map((step, i) => (
          <Sequence key={i} from={20 + i * 20}>
            <StepItem step={step} index={i} isArabic={isAr} />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const StepItem: React.FC<{
  step: string;
  index: number;
  isArabic: boolean;
}> = ({ step, index, isArabic }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const x = spring({ frame, fps, config: { damping: 14 } });
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const colors = [BRAND.colors.plum, BRAND.colors.rose, BRAND.colors.terracotta, BRAND.colors.sand];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        opacity,
        transform: `translateX(${isArabic ? -(1 - x) * 40 : (1 - x) * 40}px)`,
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          background: colors[index],
          color: BRAND.colors.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 700,
          fontFamily: BRAND.fonts.body,
          flexShrink: 0,
        }}
      >
        {index + 1}
      </div>
      <div
        style={{
          fontSize: isArabic ? 26 : 24,
          color: BRAND.colors.charcoal,
          fontFamily: isArabic ? BRAND.fonts.arabic : BRAND.fonts.body,
          fontWeight: 500,
        }}
      >
        {step}
      </div>
    </div>
  );
};

/* ---- Scene 5: Stats + CTA ---- */
const Scene5Booking: React.FC<{ lang: "en" | "ar" }> = ({ lang }) => {
  const isAr = lang === "ar";
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const stats = OVERVIEW.stats[lang];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
        opacity: fadeIn,
      }}
    >
      {/* Stats row */}
      <div style={{ display: "flex", gap: 20 }}>
        {[stats.families, stats.recommend, stats.experience].map((stat, i) => (
          <Sequence key={i} from={10 + i * 12}>
            <StatBadge value={stat} isArabic={isAr} />
          </Sequence>
        ))}
      </div>

      {/* CTA */}
      <Sequence from={60}>
        <BookingCTA
          text={OVERVIEW.bookingCta[lang]}
          isArabic={isAr}
          accentColor={BRAND.colors.plum}
        />
      </Sequence>

      {/* Logo at bottom */}
      <Sequence from={80}>
        <Logo size={60} fadeInDuration={15} />
      </Sequence>
    </AbsoluteFill>
  );
};
