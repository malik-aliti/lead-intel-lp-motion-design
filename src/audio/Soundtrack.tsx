/**
 * Sound design layer (Version B). Restrained, event-driven, tied to the exact
 * frames where things happen on screen. Reads perfectly silent too (the LP
 * autoplays muted), so it never carries the film.
 *
 *  - soft data tick as each captured signal lands
 *  - a slow rising tone as the score climbs
 *  - a gentle chime when the Combined Score locks at 91
 *  - a notification ding + a low bass hit at the FIRE alert (the hero beat)
 *  - a very quiet ambient bed underneath
 */
import { Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";

const A = (f: string) => staticFile(`audio/${f}`);

/** Frames where the six capture signals light up (SceneCapture, global). */
const TICKS = [80, 90, 100, 110, 120, 130];

export const SoundtrackNarrative: React.FC = () => (
  <>
    {/* ambient bed: barely there */}
    <Audio src={A("bed.wav")} volume={0.1} loop />
    {/* capture ticks: soft, they should register subliminally */}
    {TICKS.map((f, i) => (
      <Sequence key={i} from={f} name={`tick ${i + 1}`}>
        <Audio src={A("tick.wav")} volume={0.26} />
      </Sequence>
    ))}
    {/* rising tone under the scoring: present but never fatiguing */}
    <Sequence from={150} name="score rise">
      <Audio src={A("rise.wav")} volume={0.3} />
    </Sequence>
    {/* the accents lead the mix — clear moments */}
    <Sequence from={398} name="score lock">
      <Audio src={A("chime.wav")} volume={0.44} />
    </Sequence>
    <Sequence from={540} name="notification ding">
      <Audio src={A("ding.wav")} volume={0.56} />
    </Sequence>
    <Sequence from={552} name="FIRE bass">
      <Audio src={A("bass.wav")} volume={0.72} />
    </Sequence>
  </>
);

/** Loop soundtrack: bed + one ding/bass at the single FIRE beat (~frame 245). */
export const SoundtrackLoop: React.FC = () => (
  <>
    <Audio src={A("bed.wav")} volume={0.1} loop />
    <Sequence from={108} name="tick a">
      <Audio src={A("tick.wav")} volume={0.22} />
    </Sequence>
    <Sequence from={150} name="tick b">
      <Audio src={A("tick.wav")} volume={0.22} />
    </Sequence>
    <Sequence from={232} name="FIRE ding">
      <Audio src={A("ding.wav")} volume={0.5} />
    </Sequence>
    <Sequence from={244} name="FIRE bass">
      <Audio src={A("bass.wav")} volume={0.66} />
    </Sequence>
  </>
);
