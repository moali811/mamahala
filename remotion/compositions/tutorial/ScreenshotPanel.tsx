import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import type { ScreenPanel } from "./manifest";
import { Callout } from "./Callout";

type Props = {
  panel: ScreenPanel;
  panelStartFrame: number;
  panelEndFrame: number;
};

export const ScreenshotPanel: React.FC<Props> = ({ panel, panelStartFrame, panelEndFrame }) => {
  const frame = useCurrentFrame();
  const duration = panelEndFrame - panelStartFrame;
  const local = frame - panelStartFrame;
  if (local < 0 || local > duration) return null;

  // Fade in / out
  const fadeIn = interpolate(local, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(local, [duration - 10, duration], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  // Ken Burns zoom/pan
  const zoom = panel.zoom
    ? interpolate(local, [0, duration], [panel.zoom.from, panel.zoom.to])
    : 1;
  const panX = panel.pan
    ? interpolate(local, [0, duration], [panel.pan.fromX, panel.pan.toX])
    : 0;
  const panY = panel.pan
    ? interpolate(local, [0, duration], [panel.pan.fromY, panel.pan.toY])
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
          transformOrigin: "center",
        }}
      >
        <Img
          src={staticFile(panel.image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 14,
            boxShadow: "0 24px 60px rgba(45, 42, 51, 0.18)",
          }}
        />
        {(panel.callouts ?? []).map((c, i) => (
          <Callout
            key={i}
            x={c.x}
            y={c.y}
            w={c.w}
            h={c.h}
            label={c.label}
            enterFrame={Math.floor(c.from * duration)}
            exitFrame={Math.floor(c.to * duration)}
            bodyDurationFrames={duration}
          />
        ))}
      </div>
    </div>
  );
};
