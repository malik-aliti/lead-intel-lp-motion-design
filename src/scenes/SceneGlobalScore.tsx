/**
 * Scene 4 — global scoring (merges the old dual-score + convergence beats).
 * The two axes resolve as compact tiles (Behavioral with its funnel breakdown,
 * Social with the profile), then blend 50/50 into the Combined Score, which
 * crosses the graduated gauge into FIRE. The FIRE ignition is the color beat.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  BEHAVIORAL_FINAL,
  CLASS_COLORS,
  COLORS,
  COMBINED_FINAL,
  FONT_FAMILY,
  SCORING,
  SOCIAL_FINAL,
  TRACK,
  WEIGHT,
  accentA,
  creamA,
} from "../theme/tokens";
import { BEHAVIORAL, CONVERGENCE, PROFILE } from "../theme/strings";
import { useStage } from "../lib/useStage";
import { expo } from "../lib/anim";
import { Label } from "../components/Label";
import { ScoreCounter } from "../components/ScoreCounter";
import { Fade } from "../components/Fade";

const Tile: React.FC<{
  side: -1 | 1;
  frame: number;
  unit: number;
  label: string;
  weight: string;
  value: number;
  color: string;
  children: React.ReactNode;
}> = ({ side, frame, unit, label, weight, value, color, children }) => {
  const delay = side < 0 ? 6 : 12;
  const op = interpolate(frame, [delay, delay + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
  const dx = interpolate(frame, [delay, delay + 16], [side * unit * 3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
  const fade = interpolate(frame, [78, 96], [1, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        opacity: op * fade,
        translate: `${dx}px 0px`,
        width: unit * 30,
        padding: unit * 2.2,
        borderRadius: unit * 1.3,
        background: creamA(0.04),
        border: `1px solid ${creamA(0.1)}`,
        display: "flex",
        flexDirection: "column",
        gap: unit * 1.4,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Label size={unit * 1.4} color={COLORS.warm2} tracking={TRACK.label}>{label}</Label>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.black, fontSize: unit * 4, color, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{Math.round(value)}</span>
      </div>
      {children}
      <Label size={unit * 1.15} color={creamA(0.4)} tracking={TRACK.label}>{weight}</Label>
    </div>
  );
};

export const SceneGlobalScore: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { unit, isPortrait, width } = useStage();

  const behavioral = interpolate(frame, [10, 60], [0, BEHAVIORAL_FINAL], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
  const social = interpolate(frame, [16, 66], [0, SOCIAL_FINAL], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
  const combined = interpolate(frame, [66, 112], [0, COMBINED_FINAL], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });

  const inFire = combined >= 85;
  const ignite = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
  const flash = interpolate(frame, [112, 120, 138], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gaugeW = isPortrait ? width * 0.82 : width * 0.52;
  const bands = [
    { c: CLASS_COLORS.COLD, w: 34 },
    { c: CLASS_COLORS.WARM, w: 30 },
    { c: CLASS_COLORS.HOT, w: 20 },
    { c: CLASS_COLORS.FIRE, w: 16 },
  ];

  const BehavioralDetail = (
    <div style={{ display: "flex", flexDirection: "column", gap: unit * 0.7 }}>
      {SCORING.stages.map((st, i) => {
        const f = interpolate(frame, [14 + i * 6, 14 + i * 6 + 26], [0, st.score / 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
        return (
          <div key={st.name} style={{ display: "flex", alignItems: "center", gap: unit * 1 }}>
            <span style={{ width: unit * 12, fontFamily: FONT_FAMILY, fontWeight: WEIGHT.medium, fontSize: unit * 1.25, color: creamA(0.6) }}>{st.name}</span>
            <div style={{ flex: 1, height: unit * 0.6, borderRadius: 999, background: creamA(0.07), overflow: "hidden" }}>
              <div style={{ width: `${f * 100}%`, height: "100%", background: COLORS.accent, borderRadius: 999 }} />
            </div>
            <span style={{ width: unit * 3, textAlign: "right", fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: unit * 1.2, color: accentA(0.8), fontVariantNumeric: "tabular-nums" }}>{Math.round(f * 100)}</span>
          </div>
        );
      })}
    </div>
  );

  const SocialDetail = (
    <div style={{ display: "flex", alignItems: "center", gap: unit * 1.2 }}>
      <div style={{ width: unit * 4.2, height: unit * 4.2, borderRadius: "50%", background: `linear-gradient(135deg, ${accentA(0.9)}, ${accentA(0.5)})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_FAMILY, fontWeight: WEIGHT.bold, fontSize: unit * 1.8, color: COLORS.bg }}>AK</div>
      <div style={{ display: "flex", flexDirection: "column", gap: unit * 0.2 }}>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.bold, fontSize: unit * 2, color: COLORS.cream }}>{PROFILE.name}</span>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.regular, fontSize: unit * 1.4, color: COLORS.warm2 }}>{PROFILE.title}</span>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.regular, fontSize: unit * 1.25, color: creamA(0.5) }}>{PROFILE.company}</span>
      </div>
    </div>
  );

  return (
    <Fade dur={dur}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: unit * 3.2 }}>
        {/* two axes as tiles */}
        <div style={{ display: "flex", alignItems: "stretch", gap: unit * 2.2, flexDirection: isPortrait ? "column" : "row" }}>
          <Tile side={-1} frame={frame} unit={unit} label={BEHAVIORAL.label} weight={CONVERGENCE.behavioralWeight} value={behavioral} color={COLORS.accent}>
            {BehavioralDetail}
          </Tile>
          <Tile side={1} frame={frame} unit={unit} label={PROFILE.label} weight={CONVERGENCE.socialWeight} value={social} color={COLORS.warm1}>
            {SocialDetail}
          </Tile>
        </div>

        {/* combined score */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: unit * 1, opacity: interpolate(frame, [60, 74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <Label size={unit * 1.4} color={creamA(0.55)} tracking={TRACK.labelWide}>{CONVERGENCE.combinedLabel}</Label>
          <ScoreCounter value={combined} unit={unit * 0.82} color={inFire ? CLASS_COLORS.FIRE : COLORS.cream} />
        </div>

        {/* graduated gauge with FIRE */}
        <div style={{ width: gaugeW, display: "flex", flexDirection: "column", gap: unit * 1.1, opacity: interpolate(frame, [90, 104], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <div style={{ position: "relative", height: unit * 1.4, borderRadius: 999, overflow: "hidden", display: "flex" }}>
            {bands.map((b, i) => (
              <div key={i} style={{ width: `${b.w}%`, height: "100%", background: b.c, opacity: i === 3 ? 0.35 + 0.65 * ignite : 0.32 }} />
            ))}
            <div style={{ position: "absolute", left: `${(combined / 100) * 100}%`, top: -unit * 0.6, bottom: -unit * 0.6, width: 3, translate: "-50% 0", background: COLORS.white, boxShadow: `0 0 10px ${creamA(0.8)}` }} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: unit * 0.9, opacity: ignite, translate: `0px ${interpolate(ignite, [0, 1], [unit, 0])}px` }}>
              <span style={{ fontSize: unit * 2.2 }}>🔥</span>
              <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.black, fontSize: unit * 3.2, letterSpacing: TRACK.label, color: CLASS_COLORS.FIRE, textShadow: `0 0 ${unit * 2 * ignite}px ${accentA(0.7)}` }}>{CONVERGENCE.classification}</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ background: `radial-gradient(60% 50% at 50% 50%, ${accentA(0.18)}, transparent 70%)`, opacity: flash, pointerEvents: "none" }} />
    </Fade>
  );
};
