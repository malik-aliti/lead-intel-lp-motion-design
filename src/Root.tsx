import "./index.css";
import { Composition } from "remotion";
import { FPS, LOOP_DURATION, NARRATIVE_DURATION } from "./theme/tokens";
import { Narrative } from "./Narrative";
import { Loop } from "./Loop";
import { NarrativeSound, NarrativeVoiceover, LoopSound } from "./withSound";
import "./theme/fonts";

const ASPECTS = [
  { id: "16x9", width: 1920, height: 1080 },
  { id: "1x1", width: 1080, height: 1080 },
  { id: "9x16", width: 1080, height: 1920 },
] as const;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── 24s narrative film, one composition per aspect ratio ── */}
      {ASPECTS.map((a) => (
        <Composition
          key={`n-${a.id}`}
          id={`Narrative-${a.id}`}
          component={Narrative}
          durationInFrames={NARRATIVE_DURATION}
          fps={FPS}
          width={a.width}
          height={a.height}
        />
      ))}

      {/* ── 12s ambient loop, one composition per aspect ratio ── */}
      {ASPECTS.map((a) => (
        <Composition
          key={`l-${a.id}`}
          id={`Loop-${a.id}`}
          component={Loop}
          durationInFrames={LOOP_DURATION}
          fps={FPS}
          width={a.width}
          height={a.height}
        />
      ))}

      {/* ── Version B: identical visuals + sound design (for A/B) ── */}
      <Composition
        id="Narrative-Sound-16x9"
        component={NarrativeSound}
        durationInFrames={NARRATIVE_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Narrative-VO-16x9"
        component={NarrativeVoiceover}
        durationInFrames={NARRATIVE_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Loop-Sound-16x9"
        component={LoopSound}
        durationInFrames={LOOP_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
