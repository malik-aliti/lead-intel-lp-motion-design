/**
 * The 12s ambient background loop, derived from the same primitives as the
 * narrative (EngineCore, Meter, LeadPacket, ScanLine, Wordmark) rather than
 * rebuilt.
 *
 * Seam strategy (frame 0 === frame 360):
 *  - The engine spins/pulses on absolute frame; 360 is a whole multiple of its
 *    ring/pulse periods (120/90/60), so rotation & pulse wrap with no jump.
 *  - Every other quantity is a function of phase p = (frame % 360) / 360 with an
 *    envelope that returns to its p=0 value by p=1 (opacity 0 at both ends, or a
 *    raised-cosine bump). Two lead packets are offset by half a period, so one is
 *    always mid-frame while the other is invisible at an edge.
 * Continuous flow of one lead per cycle: enter left, scored on both axes,
 * combined, FIRE ignites (the single accent beat), routes right as the next
 * enters. Calmer and airier than the hero film.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  CLASS_COLORS,
  COLORS,
  FONT_FAMILY,
  LOOP_DURATION,
  LOOP_PHASE,
  TRACK,
  WEIGHT,
  accentA,
  creamA,
} from "./theme/tokens";
import { BEHAVIORAL, CONVERGENCE, PROFILE, WORDMARK } from "./theme/strings";
import { useStage } from "./lib/useStage";
import { Background } from "./components/Background";
import { EngineCore } from "./components/EngineCore";
import { Meter } from "./components/Meter";
import { LeadPacket } from "./components/LeadPacket";
import { ScanLine } from "./components/ScanLine";
import { Label } from "./components/Label";
import { ScoreCounter } from "./components/ScoreCounter";
import { useFontsReady } from "./theme/fonts";

/** raised-cosine bump: 0 at edges of [a,b], 1 at the midpoint. */
const bump = (p: number, a: number, b: number) => {
  if (p <= a || p >= b) return 0;
  const t = (p - a) / (b - a);
  return 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
};
/** trapezoid envelope: 0 -> 1 (a..b) -> hold -> 1 -> 0 (c..d). */
const env = (p: number, a: number, b: number, c: number, d: number) =>
  interpolate(p, [a, b, c, d], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const TravellingPacket: React.FC<{ phase: number; unit: number; landed: number; laneY: number }> = ({
  phase,
  unit,
  landed,
  laneY,
}) => {
  // left (8%) -> right (92%) along a conveyor lane below the core; invisible at
  // both ends so the wrap is unseen.
  const x = interpolate(phase, [0, 1], [0.08, 0.92]);
  const op = interpolate(phase, [0, 0.12, 0.88, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: `${x * 100}%`,
        top: `${laneY * 100}%`,
        translate: "-50% -50%",
        opacity: op,
      }}
    >
      <LeadPacket unit={unit} compact landed={landed} />
    </div>
  );
};

export const Loop: React.FC = () => {
  useFontsReady();
  const frame = useCurrentFrame();
  const { unit, width, height, isPortrait } = useStage();
  const p = (frame % LOOP_DURATION) / LOOP_DURATION;

  // scoring envelopes (return to 0 at the seam)
  const behavioral = env(p, 0.16, 0.46, 0.8, 0.96) * 88;
  const fit = env(p, 0.22, 0.52, 0.82, 0.96) * 94;

  // combined score appears mid-cycle, counts up, fades before the seam
  const combinedOp = env(p, 0.46, 0.56, 0.84, 0.94);
  const combined = interpolate(p, [0.48, 0.66], [0, CONVERGENCE.scoreValue], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // the single FIRE beat per loop
  const fire = bump(p, LOOP_PHASE.fireStart, LOOP_PHASE.fireEnd);

  // one gentle signature scan sweep across the core per loop
  const scanOp = bump(p, 0.1, 0.5) * 0.5;

  const coreSize = isPortrait ? width * 0.3 : height * 0.26;
  const meterLen = isPortrait ? height * 0.12 : height * 0.26;

  return (
    <AbsoluteFill>
      <Background />

      {/* persistent quiet wordmark in the corner (no end card, since no end) */}
      <div style={{ position: "absolute", top: unit * 5, left: unit * 6, opacity: 0.9 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: unit * 1.1 }}>
          <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.black, fontSize: unit * 3, letterSpacing: TRACK.wordmarkTight, color: COLORS.cream }}>
            {WORDMARK.oxo}
          </span>
          <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: unit * 1.2, letterSpacing: TRACK.wordmarkSub, textTransform: "uppercase", color: COLORS.warm3 }}>
            {WORDMARK.product}
          </span>
        </div>
      </div>

      {/* core + parallel meters, lifted above centre to leave room below */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", translate: `0px ${-height * 0.08}px` }}>
        <div style={{ display: "flex", alignItems: "center", gap: isPortrait ? unit * 4 : unit * 8 }}>
          <Meter value={behavioral} label={BEHAVIORAL.label} color={COLORS.accent} length={meterLen} thickness={unit} unit={unit} showValue={false} />
          <div style={{ position: "relative", width: coreSize, height: coreSize, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <EngineCore size={coreSize} intensity={0.4 + 0.6 * env(p, 0.2, 0.5, 0.82, 0.96)} />
            {scanOp > 0.001 ? <ScanLine progress={interpolate(p, [0.1, 0.5], [0.2, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} opacity={scanOp} thickness={1} /> : null}
          </div>
          <Meter value={fit} label={PROFILE.label} color={COLORS.warm2} length={meterLen} thickness={unit} unit={unit} showValue={false} />
        </div>
      </AbsoluteFill>

      {/* combined score + FIRE, sitting just below the core */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", translate: `0px ${height * 0.2}px` }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: unit * 1, opacity: combinedOp }}>
          <Label size={unit * 1.3} color={creamA(0.5)} tracking={TRACK.labelWide}>
            {CONVERGENCE.combinedLabel}
          </Label>
          <div style={{ display: "flex", alignItems: "center", gap: unit * 1.6 }}>
            <ScoreCounter value={combined} unit={unit * 0.62} color={fire > 0.2 ? CLASS_COLORS.FIRE : COLORS.cream} />
            <div style={{ display: "flex", alignItems: "center", gap: unit * 0.7, opacity: fire }}>
              <span style={{ fontSize: unit * 1.8 }}>🔥</span>
              <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.black, fontSize: unit * 2.4, letterSpacing: TRACK.label, color: CLASS_COLORS.FIRE, textShadow: `0 0 ${unit * 2 * fire}px ${accentA(0.7)}` }}>
                {CONVERGENCE.classification}
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* two travelling packets, offset half a period → always one in frame, seam hidden */}
      <AbsoluteFill>
        <TravellingPacket phase={p} unit={unit} landed={fire} laneY={0.84} />
        <TravellingPacket phase={(p + 0.5) % 1} unit={unit} landed={bump((p + 0.5) % 1, LOOP_PHASE.fireStart, LOOP_PHASE.fireEnd)} laneY={0.84} />
      </AbsoluteFill>

      {/* FIRE bloom, the one accent beat */}
      <AbsoluteFill style={{ background: `radial-gradient(45% 40% at 50% 50%, ${accentA(0.1)}, transparent 70%)`, opacity: fire, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
