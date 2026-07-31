/**
 * Scene 2 — the lead arrives. An abstract but real property landing page sits
 * in a browser frame; a cursor moves and acts; the six micro-conversion labels
 * light up one by one as captured signals. Staggered, nothing arrives at once.
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
import { LP, MICRO_CONVERSIONS } from "../theme/strings";
import { useStage } from "../lib/useStage";
import { expo } from "../lib/anim";
import { Label } from "../components/Label";
import { Fade } from "../components/Fade";

const Signal: React.FC<{ text: string; index: number; frame: number; unit: number }> = ({
  text,
  index,
  frame,
  unit,
}) => {
  const start = 20 + index * 10;
  const op = interpolate(frame, [start, start + 8], [0.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const dx = interpolate(frame, [start, start + 10], [unit * 1.2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const lit = interpolate(frame, [start, start + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: unit * 1.1,
        opacity: op,
        translate: `${dx}px 0px`,
      }}
    >
      <div
        style={{
          width: unit * 1.1,
          height: unit * 1.1,
          borderRadius: "50%",
          background: COLORS.accent,
          opacity: lit,
          boxShadow: `0 0 ${unit * 1.4 * lit}px ${accentA(0.7)}`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: WEIGHT.medium,
          fontSize: unit * 1.9,
          letterSpacing: "0.01em",
          color: `color-mix(in srgb, ${COLORS.cream} ${lit * 100}%, ${COLORS.dim})`,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const SceneCapture: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { unit, isPortrait, width, height } = useStage();

  const browserW = isPortrait ? width * 0.82 : Math.min(width * 0.46, height * 0.86);
  const browserH = browserW * 0.66;

  // cursor path: drifts across the CTAs then toward the signal column
  const cx = interpolate(frame, [10, 40, 70, 90], [0.3, 0.55, 0.78, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const cy = interpolate(frame, [10, 40, 70, 90], [0.35, 0.72, 0.6, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });

  return (
    <Fade dur={dur}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isPortrait ? "column" : "row",
          gap: isPortrait ? unit * 5 : unit * 7,
        }}
      >
        {/* Browser frame with abstract property LP */}
        <div
          style={{
            width: browserW,
            height: browserH,
            borderRadius: unit * 1.4,
            background: creamA(0.03),
            border: `1px solid ${creamA(0.1)}`,
            overflow: "hidden",
            position: "relative",
            boxShadow: `0 ${unit * 3}px ${unit * 8}px rgba(0,0,0,0.4)`,
          }}
        >
          {/* browser chrome */}
          <div
            style={{
              height: unit * 3.2,
              display: "flex",
              alignItems: "center",
              gap: unit * 0.8,
              padding: `0 ${unit * 1.4}px`,
              borderBottom: `1px solid ${creamA(0.08)}`,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{ width: unit * 0.9, height: unit * 0.9, borderRadius: "50%", background: creamA(0.18) }}
              />
            ))}
            <div
              style={{
                marginLeft: unit * 1.2,
                flex: 1,
                height: unit * 1.7,
                borderRadius: 999,
                background: creamA(0.06),
              }}
            />
          </div>

          {/* hero image block (abstract skyline, no cliché) */}
          <div
            style={{
              height: browserH * 0.5,
              background: `linear-gradient(160deg, #35322d, #232220)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* faint building silhouettes */}
            {[0.12, 0.3, 0.44, 0.62, 0.8].map((x, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: `${x * 100}%`,
                  width: browserW * 0.09,
                  height: browserH * (0.16 + (i % 3) * 0.09),
                  background: creamA(0.06),
                }}
              />
            ))}
            <div style={{ position: "absolute", top: unit * 1.6, left: unit * 1.8 }}>
              <Label size={unit * 1.2} color={accentA(0.9)} tracking={TRACK.labelWide}>
                {LP.eyebrow}
              </Label>
            </div>
          </div>

          {/* title / price / CTAs */}
          <div style={{ padding: unit * 1.8, display: "flex", flexDirection: "column", gap: unit * 1.1 }}>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontWeight: WEIGHT.bold,
                fontSize: unit * 2.5,
                letterSpacing: TRACK.tight,
                color: COLORS.cream,
              }}
            >
              {LP.title}
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontWeight: WEIGHT.regular,
                fontSize: unit * 1.9,
                color: COLORS.accent,
              }}
            >
              {LP.price}
            </div>
            <div style={{ display: "flex", gap: unit * 1, marginTop: unit * 0.6, flexWrap: "wrap" }}>
              {LP.ctas.map((c) => (
                <div
                  key={c}
                  style={{
                    padding: `${unit * 0.7}px ${unit * 1.2}px`,
                    borderRadius: 999,
                    border: `1px solid ${creamA(0.18)}`,
                    fontFamily: FONT_FAMILY,
                    fontWeight: WEIGHT.medium,
                    fontSize: unit * 1.4,
                    color: creamA(0.7),
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* cursor */}
          <div
            style={{
              position: "absolute",
              left: `${cx * 100}%`,
              top: `${cy * 100}%`,
              width: unit * 2.2,
              height: unit * 2.2,
              translate: "-10% -10%",
              filter: `drop-shadow(0 1px 2px rgba(0,0,0,0.6))`,
            }}
          >
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <path d="M4 2 L4 19 L9 14 L12.5 21 L15 20 L11.5 13 L18 13 Z" fill={COLORS.cream} stroke={COLORS.bg} strokeWidth={1} />
            </svg>
          </div>
        </div>

        {/* Captured signals lighting up */}
        <div style={{ display: "flex", flexDirection: "column", gap: unit * 1.7 }}>
          <Label size={unit * 1.35} color={creamA(0.5)} tracking={TRACK.label} style={{ marginBottom: unit }}>
            Signals captured
          </Label>
          {MICRO_CONVERSIONS.map((m, i) => (
            <Signal key={m} text={m} index={i} frame={frame} unit={unit} />
          ))}
        </div>
      </AbsoluteFill>
    </Fade>
  );
};
