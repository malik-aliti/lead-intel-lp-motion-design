/**
 * Scene 3 — social profiling (NEW). Explains how the Social score is derived:
 * the name captured in the lead form is passed through OXO's AI, which infers
 * role, company, sector and geography, and produces the Social score.
 *
 * Flow, left to right: LEAD FORM (the captured name) -> AI core -> the profile
 * resolves (ProfileCard) -> SOCIAL SCORE counts up to 94. The signature scan
 * pulse reads the data across the connectors.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  COLORS,
  FONT_FAMILY,
  SOCIAL_FINAL,
  TRACK,
  WEIGHT,
  accentA,
  creamA,
} from "../theme/tokens";
import { ENRICH, PROFILE } from "../theme/strings";
import { useStage } from "../lib/useStage";
import { expo } from "../lib/anim";
import { Label } from "../components/Label";
import { EngineCore } from "../components/EngineCore";
import { ProfileCard } from "../components/ProfileCard";
import { ScoreCounter } from "../components/ScoreCounter";
import { Fade } from "../components/Fade";

const Connector: React.FC<{ frame: number; unit: number; length: number; delay: number }> = ({
  frame,
  unit,
  length,
  delay,
}) => {
  const draw = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const scan = ((Math.max(0, frame - delay) % 40) / 40) * 100;
  return (
    <div style={{ position: "relative", width: length, height: 2, background: creamA(0.1) }}>
      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${draw * 100}%`, background: creamA(0.22) }} />
      {draw > 0.99 ? (
        <div
          style={{
            position: "absolute",
            left: `${scan}%`,
            top: -2,
            width: unit * 4,
            height: 6,
            translate: "-50% 0",
            background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
            boxShadow: `0 0 8px ${accentA(0.6)}`,
          }}
        />
      ) : null}
    </div>
  );
};

export const SceneEnrichment: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { unit, isPortrait, width, height } = useStage();

  const social = interpolate(frame, [40, 78], [0, SOCIAL_FINAL], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });

  const coreSize = isPortrait ? width * 0.24 : height * 0.2;
  const cardW = isPortrait ? width * 0.72 : width * 0.26;

  // LEAD FORM card (the captured name)
  const formOp = interpolate(frame, [4, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
  const formDx = interpolate(frame, [4, 18], [-unit * 2, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });

  const LeadForm = (
    <div
      style={{
        opacity: formOp,
        translate: `${formDx}px 0px`,
        width: isPortrait ? width * 0.6 : width * 0.18,
        padding: unit * 1.8,
        borderRadius: unit * 1.1,
        background: creamA(0.04),
        border: `1px solid ${creamA(0.1)}`,
        display: "flex",
        flexDirection: "column",
        gap: unit * 1.1,
      }}
    >
      <Label size={unit * 1.2} color={creamA(0.45)} tracking={TRACK.label}>
        {ENRICH.formLabel}
      </Label>
      <div style={{ display: "flex", flexDirection: "column", gap: unit * 0.4 }}>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.regular, fontSize: unit * 1.3, color: COLORS.dim }}>
          {ENRICH.nameFieldLabel}
        </span>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.bold, fontSize: unit * 2.4, letterSpacing: TRACK.tight, color: COLORS.cream }}>
          {PROFILE.name}
        </span>
      </div>
      <div style={{ height: 1, background: creamA(0.08) }} />
      <div style={{ display: "flex", alignItems: "center", gap: unit * 0.7 }}>
        <div style={{ width: unit * 0.8, height: unit * 0.8, borderRadius: "50%", background: COLORS.accent, boxShadow: `0 0 8px ${accentA(0.7)}` }} />
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.medium, fontSize: unit * 1.15, color: creamA(0.5) }}>
          captured
        </span>
      </div>
    </div>
  );

  const AICore = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: unit * 1.2 }}>
      <EngineCore size={coreSize} presence={interpolate(frame, [16, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} intensity={0.5 + 0.5 * interpolate(frame, [30, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <Label size={unit * 1.15} color={COLORS.warm2} tracking={TRACK.label}>
        OXO AI
      </Label>
    </div>
  );

  const ProfileSide = (
    <div style={{ display: "flex", flexDirection: "column", gap: unit * 1.8, alignItems: "center" }}>
      <ProfileCard reveal={frame - 22} unit={unit} width={cardW} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: unit * 0.6, opacity: interpolate(frame, [40, 56], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <Label size={unit * 1.2} color={creamA(0.5)} tracking={TRACK.label}>
          {ENRICH.scoreLabel}
        </Label>
        <ScoreCounter value={social} unit={unit * 0.6} color={COLORS.warm1} showOutOf={false} />
      </div>
    </div>
  );

  const connLen = isPortrait ? 2 : width * 0.05;

  return (
    <Fade dur={dur}>
      <AbsoluteFill style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", gap: unit * 3 }}>
        {/* heading + explainer caption */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: unit * 1, maxWidth: unit * 66, textAlign: "center", opacity: interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <Label size={unit * 1.6} color={COLORS.accent} tracking={TRACK.labelWide}>
            {ENRICH.label}
          </Label>
          <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.regular, fontSize: unit * 1.7, color: COLORS.dim, lineHeight: 1.4 }}>
            {ENRICH.caption}
          </span>
        </div>

        {/* the flow */}
        <div
          style={{
            display: "flex",
            flexDirection: isPortrait ? "column" : "row",
            alignItems: "center",
            gap: isPortrait ? unit * 2 : unit * 2.5,
          }}
        >
          {LeadForm}
          {!isPortrait ? <Connector frame={frame} unit={unit} length={connLen} delay={18} /> : null}
          {AICore}
          {!isPortrait ? <Connector frame={frame} unit={unit} length={connLen} delay={30} /> : null}
          {ProfileSide}
        </div>
      </AbsoluteFill>
    </Fade>
  );
};
