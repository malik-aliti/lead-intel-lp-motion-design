/**
 * Scene 4 — convergence. Behavioral 50% and Fit 50% slide together into one
 * Combined Score that counts up to 91 / 100. A classification gauge marker
 * crosses the FIRE threshold (85) and the FIRE label ignites. This is the first
 * meaningful entrance of color in the film.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  CLASS_COLORS,
  COLORS,
  FONT_FAMILY,
  TRACK,
  WEIGHT,
  accentA,
  creamA,
} from "../theme/tokens";
import { CONVERGENCE } from "../theme/strings";
import { useStage } from "../lib/useStage";
import { expo } from "../lib/anim";
import { Label } from "../components/Label";
import { ScoreCounter } from "../components/ScoreCounter";
import { Fade } from "../components/Fade";
import { BEHAVIORAL_FINAL, FIT_FINAL } from "./SceneDualScore";

const WeightChip: React.FC<{
  label: string;
  value: number;
  side: -1 | 1;
  frame: number;
  unit: number;
  color: string;
}> = ({ label, value, side, frame, unit, color }) => {
  const dx = interpolate(frame, [0, 30], [side * unit * 22, side * unit * 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const op = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // fade the chips out as the combined score takes over
  const fade = interpolate(frame, [40, 58], [1, 0.25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        translate: `${dx}px 0px`,
        opacity: op * fade,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: unit * 0.6,
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: WEIGHT.bold,
          fontSize: unit * 4.5,
          color,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <Label size={unit * 1.35} color={creamA(0.55)}>
        {label}
      </Label>
    </div>
  );
};

export const SceneConvergence: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { unit, isPortrait, width } = useStage();

  const combined = interpolate(frame, [26, 70], [0, CONVERGENCE.scoreValue], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });

  // gauge marker position (0..100 -> 0..1)
  const markerPos = combined / 100;
  const inFire = combined >= 85;
  const ignite = interpolate(frame, [58, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const flash = interpolate(frame, [60, 66, 80], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const gaugeW = isPortrait ? width * 0.8 : width * 0.5;
  const bands = [
    { c: CLASS_COLORS.COLD, w: 34 },
    { c: CLASS_COLORS.WARM, w: 30 },
    { c: CLASS_COLORS.HOT, w: 20 },
    { c: CLASS_COLORS.FIRE, w: 16 },
  ];

  return (
    <Fade dur={dur}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: unit * 4,
        }}
      >
        {/* 50 / 50 weighting */}
        <div style={{ display: "flex", alignItems: "center", gap: unit * 3 }}>
          <WeightChip label={CONVERGENCE.behavioralWeight} value={BEHAVIORAL_FINAL} side={-1} frame={frame} unit={unit} color={COLORS.accent} />
          <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.light, fontSize: unit * 3, color: COLORS.dim, opacity: interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            +
          </span>
          <WeightChip label={CONVERGENCE.fitWeight} value={FIT_FINAL} side={1} frame={frame} unit={unit} color={COLORS.warm2} />
        </div>

        {/* Combined Score */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: unit * 1.4 }}>
          <Label size={unit * 1.5} color={creamA(0.55)} tracking={TRACK.labelWide}>
            {CONVERGENCE.combinedLabel}
          </Label>
          <ScoreCounter value={combined} unit={unit} color={inFire ? CLASS_COLORS.FIRE : COLORS.cream} />
        </div>

        {/* classification gauge */}
        <div style={{ width: gaugeW, display: "flex", flexDirection: "column", gap: unit * 1.2, marginTop: unit }}>
          <div style={{ position: "relative", height: unit * 1.4, borderRadius: 999, overflow: "hidden", display: "flex" }}>
            {bands.map((b, i) => (
              <div
                key={i}
                style={{
                  width: `${b.w}%`,
                  height: "100%",
                  background: b.c,
                  opacity: i === 3 ? 0.35 + 0.65 * ignite : 0.32,
                }}
              />
            ))}
            {/* marker */}
            <div
              style={{
                position: "absolute",
                left: `${markerPos * 100}%`,
                top: -unit * 0.6,
                bottom: -unit * 0.6,
                width: 3,
                translate: "-50% 0",
                background: COLORS.white,
                boxShadow: `0 0 10px ${creamA(0.8)}`,
              }}
            />
          </div>
          {/* FIRE threshold ignition label */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: unit * 0.9,
                opacity: ignite,
                translate: `0px ${interpolate(ignite, [0, 1], [unit, 0])}px`,
              }}
            >
              <span style={{ fontSize: unit * 2.2 }}>🔥</span>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: WEIGHT.black,
                  fontSize: unit * 3.2,
                  letterSpacing: TRACK.label,
                  color: CLASS_COLORS.FIRE,
                  textShadow: `0 0 ${unit * 2 * ignite}px ${accentA(0.7)}`,
                }}
              >
                {CONVERGENCE.classification}
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* ignition flash wash */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 50% at 50% 50%, ${accentA(0.18)}, transparent 70%)`,
          opacity: flash,
          pointerEvents: "none",
        }}
      />
    </Fade>
  );
};
