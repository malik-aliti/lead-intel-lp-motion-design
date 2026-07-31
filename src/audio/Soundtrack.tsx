/**
 * Audio layers for the narrative.
 *  - SoundtrackNarrative: restrained SFX/music (Version B "sound").
 *  - SoundtrackVO: spoken voice-over explaining each step (Version C), over a
 *    quiet bed with only the FIRE accents kept so speech stays clear.
 * Event frames are tied to the 900f (~30s) timeline in tokens.ts.
 */
import { Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { VO_AT } from "../theme/tokens";

const A = (f: string) => staticFile(`audio/${f}`);
const V = (n: number) => staticFile(`audio/vo/vo${n}.wav`);

/** Capture signals light up (SceneCapture, global frames). */
const CAPTURE_TICKS = [86, 98, 110, 122, 134, 146];
/** Each research source matches (SceneEnrichment). */
const ENRICH_TICKS = [224, 236, 248, 260];

export const SoundtrackNarrative: React.FC = () => (
  <>
    <Audio src={A("bed.wav")} volume={0.1} loop />
    {CAPTURE_TICKS.map((f, i) => (
      <Sequence key={i} from={f} name={`capture tick ${i + 1}`}>
        <Audio src={A("tick.wav")} volume={0.26} />
      </Sequence>
    ))}
    {ENRICH_TICKS.map((f, i) => (
      <Sequence key={`e${i}`} from={f} name={`source ${i + 1}`}>
        <Audio src={A("tick.wav")} volume={0.24} />
      </Sequence>
    ))}
    <Sequence from={306} name="social fit lock">
      <Audio src={A("chime.wav")} volume={0.3} />
    </Sequence>
    <Sequence from={366} name="score rise">
      <Audio src={A("rise.wav")} volume={0.3} />
    </Sequence>
    <Sequence from={476} name="combined lock">
      <Audio src={A("chime.wav")} volume={0.44} />
    </Sequence>
    <Sequence from={566} name="crm write">
      <Audio src={A("tick.wav")} volume={0.3} />
    </Sequence>
    <Sequence from={594} name="crm score lock">
      <Audio src={A("chime.wav")} volume={0.34} />
    </Sequence>
    <Sequence from={662} name="notification ding">
      <Audio src={A("ding.wav")} volume={0.56} />
    </Sequence>
    <Sequence from={676} name="FIRE bass">
      <Audio src={A("bass.wav")} volume={0.72} />
    </Sequence>
  </>
);

const VO = [VO_AT.l1, VO_AT.l2, VO_AT.l3, VO_AT.l4, VO_AT.l5, VO_AT.l6, VO_AT.l7];

export const SoundtrackVO: React.FC = () => (
  <>
    {/* very quiet bed so the voice sits on something */}
    <Audio src={A("bed.wav")} volume={0.07} loop />
    {VO.map((f, i) => (
      <Sequence key={i} from={f} name={`vo ${i + 1}`}>
        <Audio src={V(i + 1)} volume={1} />
      </Sequence>
    ))}
    {/* keep only the FIRE accents under the narration */}
    <Sequence from={476} name="combined lock">
      <Audio src={A("chime.wav")} volume={0.24} />
    </Sequence>
    <Sequence from={662} name="notification ding">
      <Audio src={A("ding.wav")} volume={0.36} />
    </Sequence>
    <Sequence from={676} name="FIRE bass">
      <Audio src={A("bass.wav")} volume={0.5} />
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
