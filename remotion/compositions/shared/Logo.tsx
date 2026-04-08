import React from "react";
import { Img, staticFile, interpolate, useCurrentFrame } from "remotion";

type LogoProps = {
  size?: number;
  fadeInDuration?: number;
};

export const Logo: React.FC<LogoProps> = ({
  size = 120,
  fadeInDuration = 20,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeInDuration], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, fadeInDuration], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Img
      src={staticFile("logo-512.png")}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        opacity,
        transform: `scale(${scale})`,
        objectFit: "cover",
      }}
    />
  );
};
