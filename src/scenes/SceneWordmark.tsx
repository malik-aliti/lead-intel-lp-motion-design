/**
 * Scene 1 — reused at both ends of the film.
 *   variant="open": cold open. Black canvas, the wordmark resolves via the
 *                   signature scan sweep.
 *   variant="end" : end card. Wordmark holds; the two end-card lines arrive,
 *                   the signature line draws itself under the large line.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_FAMILY, TRACK, WEIGHT } from "../theme/tokens";
import { END_CARD } from "../theme/strings";
import { useStage } from "../lib/useStage";
import { expo, prog } from "../lib/anim";
import { RevealByScan } from "../components/ScanLine";
import { Wordmark } from "../components/Wordmark";
import { Fade } from "../components/Fade";

export const SceneWordmark: React.FC<{ variant: "open" | "end"; dur: number }> = ({
  variant,
  dur,
}) => {
  const frame = useCurrentFrame();
  const { unit, isPortrait } = useStage();

  if (variant === "open") {
    // Scan sweeps across the wordmark, reading it into existence, then a soft settle.
    const sweep = prog(frame, 8, 46);
    const settle = interpolate(frame, [40, 58], [0.985, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: expo,
    });
    return (
      <Fade dur={dur} inFrames={6} outFrames={14}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ scale: String(settle) }}>
            <RevealByScan progress={sweep} orientation="vertical">
              <Wordmark unit={unit} scale={isPortrait ? 1.15 : 1.35} stacked={isPortrait} />
            </RevealByScan>
          </div>
        </AbsoluteFill>
      </Fade>
    );
  }

  // variant === "end"
  const wmScale = interpolate(frame, [0, 20], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const smallOp = prog(frame, 16, 34);
  const largeReveal = prog(frame, 30, 62); // scan-reveal of the large line
  const underline = prog(frame, 58, 82); // signature line draws under it

  return (
    <Fade dur={dur} inFrames={12} outFrames={0}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: unit * 4.5,
          paddingLeft: unit * 8,
          paddingRight: unit * 8,
          textAlign: "center",
        }}
      >
        <div style={{ scale: String(wmScale) }}>
          <Wordmark unit={unit} scale={isPortrait ? 0.95 : 1.05} stacked={isPortrait} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: unit * 2 }}>
          <span
            style={{
              opacity: smallOp,
              fontFamily: FONT_FAMILY,
              fontWeight: WEIGHT.regular,
              fontSize: unit * 2.1,
              letterSpacing: "0.02em",
              color: COLORS.dim,
            }}
          >
            {END_CARD.small}
          </span>

          <div style={{ position: "relative", paddingBottom: unit * 1.4 }}>
            <RevealByScan progress={largeReveal} orientation="vertical">
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: WEIGHT.heavy,
                  fontSize: unit * (isPortrait ? 3.9 : 4.4),
                  letterSpacing: TRACK.tight,
                  color: COLORS.accent,
                  lineHeight: 1.12,
                  display: "block",
                  maxWidth: unit * (isPortrait ? 78 : 92),
                }}
              >
                {END_CARD.large}
              </span>
            </RevealByScan>
            {/* signature underline draws itself */}
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                height: 2,
                width: `${underline * 100}%`,
                background: COLORS.accent,
                boxShadow: `0 0 10px ${COLORS.accent}`,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </Fade>
  );
};
