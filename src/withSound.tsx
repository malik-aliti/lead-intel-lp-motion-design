/**
 * Version B wrappers: the exact same visuals as the silent film, plus the
 * soundtrack layer. Same components, no visual divergence, so the A/B compares
 * only the sound.
 */
import { AbsoluteFill } from "remotion";
import { Narrative } from "./Narrative";
import { Loop } from "./Loop";
import { SoundtrackNarrative, SoundtrackLoop } from "./audio/Soundtrack";

export const NarrativeSound: React.FC = () => (
  <AbsoluteFill>
    <Narrative />
    <SoundtrackNarrative />
  </AbsoluteFill>
);

export const LoopSound: React.FC = () => (
  <AbsoluteFill>
    <Loop />
    <SoundtrackLoop />
  </AbsoluteFill>
);
