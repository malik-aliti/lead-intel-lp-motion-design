/**
 * The 24-second narrative film. One persistent canvas (grain + vignette runs
 * continuously across cuts) with each beat as a <Sequence>-wrapped scene.
 * All timing comes from NARRATIVE in tokens.ts — no magic numbers here.
 */
import { AbsoluteFill, Sequence } from "remotion";
import { NARRATIVE } from "./theme/tokens";
import { Background } from "./components/Background";
import { SceneWordmark } from "./scenes/SceneWordmark";
import { SceneCapture } from "./scenes/SceneCapture";
import { SceneDualScore } from "./scenes/SceneDualScore";
import { SceneConvergence } from "./scenes/SceneConvergence";
import { SceneRouteCRM } from "./scenes/SceneRouteCRM";
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

      <Sequence name="3 · Dual score" from={N.dualScore.from} durationInFrames={N.dualScore.duration} layout="none">
        <SceneDualScore dur={N.dualScore.duration} />
      </Sequence>

      <Sequence name="4 · Convergence" from={N.convergence.from} durationInFrames={N.convergence.duration} layout="none">
        <SceneConvergence dur={N.convergence.duration} />
      </Sequence>

      <Sequence name="5 · Route to CRM" from={N.routeCRM.from} durationInFrames={N.routeCRM.duration} layout="none">
        <SceneRouteCRM dur={N.routeCRM.duration} />
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
