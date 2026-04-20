import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CHAPTERS, TITLE_CARD_SECONDS, FPS } from "./manifest";
import { ChapterTitle } from "./ChapterTitle";
import { ChapterBody } from "./ChapterBody";
import { Intro } from "./Intro";
import { Outro } from "./Outro";

const INTRO_SECONDS = 3;
const OUTRO_SECONDS = 4;

export function getTutorialDurationFrames(): number {
  const chapterFrames = CHAPTERS.reduce((sum, c) => {
    const body = Math.ceil(c.durationSeconds * FPS);
    const title = Math.ceil(TITLE_CARD_SECONDS * FPS);
    return sum + body + title;
  }, 0);
  const intro = Math.ceil(INTRO_SECONDS * FPS);
  const outro = Math.ceil(OUTRO_SECONDS * FPS);
  return intro + chapterFrames + outro;
}

export const AdminTutorial: React.FC = () => {
  let frameCursor = 0;
  const introFrames = Math.ceil(INTRO_SECONDS * FPS);
  const outroFrames = Math.ceil(OUTRO_SECONDS * FPS);

  return (
    <AbsoluteFill style={{ background: "#FAF7F2" }}>
      <Sequence from={frameCursor} durationInFrames={introFrames}>
        <Intro durationFrames={introFrames} />
      </Sequence>
      {(() => {
        frameCursor += introFrames;
        return null;
      })()}

      {CHAPTERS.map((chapter) => {
        const titleFrames = Math.ceil(TITLE_CARD_SECONDS * FPS);
        const bodyFrames = Math.ceil(chapter.durationSeconds * FPS);
        const titleStart = frameCursor;
        const bodyStart = titleStart + titleFrames;
        frameCursor = bodyStart + bodyFrames;

        return (
          <React.Fragment key={chapter.id}>
            <Sequence from={titleStart} durationInFrames={titleFrames}>
              <ChapterTitle
                number={chapter.number}
                title={chapter.title}
                subtitle={chapter.subtitle}
                durationFrames={titleFrames}
              />
            </Sequence>
            <Sequence from={bodyStart} durationInFrames={bodyFrames}>
              <ChapterBody chapter={chapter} bodyDurationFrames={bodyFrames} />
            </Sequence>
          </React.Fragment>
        );
      })}

      <Sequence from={frameCursor} durationInFrames={outroFrames}>
        <Outro durationFrames={outroFrames} />
      </Sequence>
    </AbsoluteFill>
  );
};
