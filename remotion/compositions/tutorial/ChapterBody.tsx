import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { BRAND } from "../../lib/theme";
import type { Chapter } from "./manifest";
import { ScreenshotPanel } from "./ScreenshotPanel";
import { CaptionBar } from "./CaptionBar";

type Props = { chapter: Chapter; bodyDurationFrames: number };

export const ChapterBody: React.FC<Props> = ({ chapter, bodyDurationFrames }) => {
  return (
    <AbsoluteFill
      style={{
        background: BRAND.colors.linen,
        padding: "72px 80px 0",
      }}
    >
      {/* Chapter bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          background: BRAND.colors.plumDark,
          display: "flex",
          alignItems: "center",
          padding: "0 48px",
          justifyContent: "space-between",
          fontFamily: BRAND.fonts.body,
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: BRAND.colors.sand,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 700,
              color: BRAND.colors.plumDark,
            }}
          >
            {chapter.number}
          </div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{chapter.title}</div>
        </div>
        <div style={{ fontSize: 16, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.85 }}>
          MCMS Tutorial · Mama Hala Consulting
        </div>
      </div>

      {/* Screenshot stage */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 80,
          right: 80,
          bottom: 240,
          borderRadius: 18,
          overflow: "hidden",
          background: "white",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        }}
      >
        {chapter.panels.map((panel, i) => {
          const startFrame = Math.floor(panel.from * bodyDurationFrames);
          const endFrame = Math.floor(panel.to * bodyDurationFrames);
          return (
            <ScreenshotPanel
              key={i}
              panel={panel}
              panelStartFrame={startFrame}
              panelEndFrame={endFrame}
            />
          );
        })}
      </div>

      {/* Caption */}
      <CaptionBar captions={chapter.captions} bodyDurationFrames={bodyDurationFrames} />

      {/* Narration audio */}
      <Audio src={staticFile(chapter.audio)} />
    </AbsoluteFill>
  );
};
