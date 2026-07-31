/**
 * The narrative film. One persistent canvas (grain + vignette runs continuously
 * across cuts) with each beat as a <Sequence>-wrapped scene. All timing comes
 * from NARRATIVE in tokens.ts — no magic numbers here.
 */
import { AbsoluteFill, Sequence } from "remotion";
import { NARRATIVE } from "./theme/tokens";
import { Background } from "./components/Background";
import { SceneWordmark } from "./scenes/SceneWordmark";
import { SceneCapture } from "./scenes/SceneCapture";
import { SceneEnrichment } from "./scenes/SceneEnrichment";
import { SceneGlobalScore } from "./scenes/SceneGlobalScore";
import { SceneCRM } from "./scenes/SceneCRM";
import { ScenePhoneAlert } from "./scenes/ScenePhoneAlert";
import { useFontsReady } from "./theme/fonts";

export const Narrative: React.FC = () => {
  useFontsReady();
  const N = NARRATIVE;
  return (
    <AbsoluteFill>
      <Sequence name="Canvas">
        <Background />
      </Sequence>

      <Sequence name="1 · Cold open" from={N.wordmarkIn.from} durationInFrames={N.wordmarkIn.duration} layout="none">
        <SceneWordmark variant="open" dur={N.wordmarkIn.duration} />
      </Sequence>

      <Sequence name="2 · Capture" from={N.capture.from} durationInFrames={N.capture.duration} layout="none">
        <SceneCapture dur={N.capture.duration} />
      </Sequence>

      <Sequence name="3 · Social profiling" from={N.enrichment.from} durationInFrames={N.enrichment.duration} layout="none">
        <SceneEnrichment dur={N.enrichment.duration} />
      </Sequence>

      <Sequence name="4 · Global scoring" from={N.globalScore.from} durationInFrames={N.globalScore.duration} layout="none">
        <SceneGlobalScore dur={N.globalScore.duration} />
      </Sequence>

      <Sequence name="5 · CRM score" from={N.crm.from} durationInFrames={N.crm.duration} layout="none">
        <SceneCRM dur={N.crm.duration} />
      </Sequence>

      <Sequence name="6 · FIRE alert" from={N.phoneAlert.from} durationInFrames={N.phoneAlert.duration} layout="none">
        <ScenePhoneAlert dur={N.phoneAlert.duration} />
      </Sequence>

      <Sequence name="7 · End card" from={N.wordmarkOut.from} durationInFrames={N.wordmarkOut.duration} layout="none">
        <SceneWordmark variant="end" dur={N.wordmarkOut.duration} />
      </Sequence>
    </AbsoluteFill>
  );
};
