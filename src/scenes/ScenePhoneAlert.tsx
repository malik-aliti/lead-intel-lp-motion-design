/**
 * Scene 6 — the hero. A clean smartphone enters and the FIRE push buzzes in
 * with the three exact lines. Device vibrates subtly; the FIRE color ignites
 * last. Given room: generous negative space, one thing leading the eye.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_FAMILY, TRACK, WEIGHT, accentA } from "../theme/tokens";
import { useStage } from "../lib/useStage";
import { expo } from "../lib/anim";
import { PhoneFrame } from "../components/PhoneFrame";
import { Label } from "../components/Label";
import { Fade } from "../components/Fade";

export const ScenePhoneAlert: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { unit, isPortrait, height } = useStage();

  // phone rises into frame with weight
  const rise = interpolate(frame, [0, 22], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const phoneH = isPortrait ? height * 0.6 : height * 0.72;

  // supporting caption fades in beside the device (landscape)
  const capOp = interpolate(frame, [46, 66], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });

  return (
    <Fade dur={dur} outFrames={16}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isPortrait ? "column" : "row",
          gap: isPortrait ? unit * 4 : unit * 9,
        }}
      >
        {!isPortrait ? (
          <div style={{ opacity: capOp, maxWidth: unit * 34, display: "flex", flexDirection: "column", gap: unit * 1.6 }}>
            <Label size={unit * 1.5} color={accentA(0.9)} tracking={TRACK.labelWide}>
              5 minute window
            </Label>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontWeight: WEIGHT.regular,
                fontSize: unit * 3,
                letterSpacing: TRACK.tight,
                color: COLORS.cream,
                lineHeight: 1.25,
              }}
            >
              The scored lead is now an action.
            </div>
            <div style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.regular, fontSize: unit * 1.7, color: COLORS.dim, lineHeight: 1.5 }}>
              Your senior agent is alerted the moment a lead turns FIRE.
            </div>
          </div>
        ) : null}

        <div style={{ translate: `0px ${rise * height * 0.5}px` }}>
          <PhoneFrame unit={unit} height={phoneH} />
        </div>
      </AbsoluteFill>

      {/* subtle FIRE glow blooming behind the phone as it ignites */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(40% 40% at 50% 52%, ${accentA(0.12)}, transparent 70%)`,
          opacity: interpolate(frame, [44, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          pointerEvents: "none",
        }}
      />
    </Fade>
  );
};
