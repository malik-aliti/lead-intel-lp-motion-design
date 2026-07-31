/**
 * Scene 3 — the split. The frame divides into two parallel tracks that run at
 * once, joined by the signature terracotta divider.
 *   Left  BEHAVIORAL: captured signals fill a funnel (Discovery -> Decision)
 *                     and a meter climbs to 88.
 *   Right FIT/PROFILE: the identity enriches into the profile card and a Fit
 *                      meter climbs to 94.
 * (88 + 94) / 2 = 91 -> the Combined Score resolved in Scene 4. Real numbers.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  COLORS,
  FONT_FAMILY,
  TRACK,
  WEIGHT,
  accentA,
  creamA,
} from "../theme/tokens";
import { BEHAVIORAL, PROFILE } from "../theme/strings";
import { useStage } from "../lib/useStage";
import { expo } from "../lib/anim";
import { Label } from "../components/Label";
import { Meter } from "../components/Meter";
import { ProfileCard } from "../components/ProfileCard";
import { Fade } from "../components/Fade";

/** Behavioral / Fit finals — publicly meaningful so Scene 4 can reuse them. */
export const BEHAVIORAL_FINAL = 88;
export const FIT_FINAL = 94;

const FunnelStage: React.FC<{
  name: string;
  index: number;
  behavioral: number; // current 0..100
  unit: number;
  width: number;
}> = ({ name, index, behavioral, unit, width }) => {
  // stage becomes active as behavioral crosses its band
  const threshold = index * 22;
  const fill = interpolate(behavioral, [threshold, threshold + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: unit * 0.7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: WEIGHT.medium,
            fontSize: unit * 1.7,
            color: `color-mix(in srgb, ${COLORS.cream} ${fill * 100}%, ${COLORS.dim})`,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: WEIGHT.semibold,
            fontSize: unit * 1.3,
            color: accentA(0.4 + 0.5 * fill),
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(fill * 100)}%
        </span>
      </div>
      <div style={{ height: unit * 0.7, borderRadius: 999, background: creamA(0.07), overflow: "hidden" }}>
        <div
          style={{
            width: `${fill * 100}%`,
            height: "100%",
            borderRadius: 999,
            background: COLORS.accent,
            boxShadow: `0 0 8px ${accentA(0.4)}`,
          }}
        />
      </div>
    </div>
  );
};

export const SceneDualScore: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { unit, isPortrait, width, height } = useStage();

  const behavioral = interpolate(frame, [20, 150], [0, BEHAVIORAL_FINAL], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const fit = interpolate(frame, [34, 158], [0, FIT_FINAL], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });

  // signature pulse travelling along the divider
  const pulsePos = ((frame % 60) / 60) * 100;

  const colWidth = isPortrait ? width * 0.8 : width * 0.34;
  const meterLen = isPortrait ? height * 0.14 : height * 0.34;
  const funnelW = colWidth * 0.62;

  const BehavioralTrack = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: unit * 2.4,
        alignItems: "flex-start",
        width: colWidth,
      }}
    >
      <Label size={unit * 1.7} color={COLORS.warm2} tracking={TRACK.labelWide}>
        {BEHAVIORAL.label}
      </Label>
      <div style={{ display: "flex", gap: unit * 3, alignItems: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: unit * 1.4 }}>
          {BEHAVIORAL.stages.map((s, i) => (
            <FunnelStage key={s} name={s} index={i} behavioral={behavioral} unit={unit} width={funnelW} />
          ))}
        </div>
        <Meter
          value={behavioral}
          label="Score"
          color={COLORS.accent}
          length={meterLen}
          thickness={unit * 1.1}
          unit={unit}
        />
      </div>
    </div>
  );

  const FitTrack = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: unit * 2.4,
        alignItems: "flex-start",
        width: colWidth,
      }}
    >
      <Label size={unit * 1.7} color={COLORS.warm2} tracking={TRACK.labelWide}>
        {PROFILE.label}
      </Label>
      <div style={{ display: "flex", gap: unit * 3, alignItems: "flex-end" }}>
        <ProfileCard reveal={frame - 12} unit={unit} width={funnelW + unit * 2} />
        <Meter
          value={fit}
          label="Fit"
          color={COLORS.warm2}
          length={meterLen}
          thickness={unit * 1.1}
          unit={unit}
        />
      </div>
    </div>
  );

  return (
    <Fade dur={dur}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isPortrait ? "column" : "row",
          gap: isPortrait ? unit * 5 : unit * 6,
        }}
      >
        {BehavioralTrack}

        {/* signature divider */}
        <div
          style={{
            position: "relative",
            width: isPortrait ? colWidth : 2,
            height: isPortrait ? 2 : meterLen * 1.5,
            background: creamA(0.12),
          }}
        >
          <div
            style={{
              position: "absolute",
              ...(isPortrait
                ? { left: `${pulsePos}%`, top: -2, width: unit * 6, height: 4 }
                : { top: `${pulsePos}%`, left: -2, height: unit * 6, width: 4 }),
              background: `linear-gradient(${isPortrait ? "90deg" : "180deg"}, transparent, ${COLORS.accent}, transparent)`,
              boxShadow: `0 0 10px ${accentA(0.6)}`,
            }}
          />
        </div>

        {FitTrack}
      </AbsoluteFill>

      {/* both-climbing readout, quiet, centered bottom (landscape only) */}
      {!isPortrait ? (
        <div
          style={{
            position: "absolute",
            bottom: unit * 6,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: unit * 4,
            opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <TinyStat label="Behavioral" value={behavioral} color={COLORS.accent} unit={unit} />
          <TinyStat label="Fit" value={fit} color={COLORS.warm2} unit={unit} />
        </div>
      ) : null}
    </Fade>
  );
};

const TinyStat: React.FC<{ label: string; value: number; color: string; unit: number }> = ({
  label,
  value,
  color,
  unit,
}) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: unit * 0.9 }}>
    <Label size={unit * 1.3} color={creamA(0.45)}>
      {label}
    </Label>
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontWeight: WEIGHT.bold,
        fontSize: unit * 2.1,
        color,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {Math.round(value)}
    </span>
  </div>
);
