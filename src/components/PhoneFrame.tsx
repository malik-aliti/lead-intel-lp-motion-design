/**
 * A clean smartphone device frame with a FIRE push notification.
 * The hero beat: notification slides in with weight + a short settle, the
 * device carries a subtle decaying vibration, and the FIRE color ignites last.
 * All motion frame-driven.
 */
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, CLASS_COLORS, FONT_FAMILY, TRACK, WEIGHT, accentA, creamA } from "../theme/tokens";
import { PHONE } from "../theme/strings";
import { expo } from "../lib/anim";

export const PhoneFrame: React.FC<{
  /** scene-local frame */
  frame?: number;
  unit: number;
  height: number;
}> = ({ frame: frameProp, unit, height }) => {
  const localFrame = useCurrentFrame();
  const frame = frameProp ?? localFrame;

  const w = height * 0.485;
  const radius = w * 0.13;

  // Notification: slides down into place, arriving ~frame 26, settle overshoot.
  const nStart = 20;
  const ny = interpolate(frame, [nStart, nStart + 16], [-unit * 10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const nOpacity = interpolate(frame, [nStart, nStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decaying vibration begins as the notification lands (~frame 30).
  const vibStart = 32;
  const vibAge = Math.max(0, frame - vibStart);
  const vibDecay = Math.exp(-vibAge / 9);
  const vibX = Math.sin(vibAge * 2.4) * unit * 0.5 * vibDecay;
  const vibY = Math.cos(vibAge * 2.9) * unit * 0.35 * vibDecay;

  // FIRE color ignites last: the notification's fire strip warms up after landing.
  const ignite = interpolate(frame, [40, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const fireColor = CLASS_COLORS.FIRE;

  return (
    <div style={{ translate: `${vibX}px ${vibY}px`, width: w, height }}>
      {/* device body */}
      <div
        style={{
          width: w,
          height,
          borderRadius: radius,
          background: `linear-gradient(160deg, #2b2b28, #171716)`,
          border: `${w * 0.014}px solid #0e0e0d`,
          boxShadow: `0 ${unit * 4}px ${unit * 9}px rgba(0,0,0,0.55), inset 0 0 2px ${creamA(0.15)}`,
          position: "relative",
          overflow: "hidden",
          padding: w * 0.055,
        }}
      >
        {/* screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: radius * 0.8,
            background: `radial-gradient(140% 100% at 50% 0%, #262523, ${COLORS.bg})`,
            position: "relative",
            paddingTop: h(w) * 0.5,
          }}
        >
          {/* notch */}
          <div
            style={{
              position: "absolute",
              top: w * 0.05,
              left: "50%",
              translate: "-50% 0",
              width: w * 0.32,
              height: w * 0.055,
              borderRadius: 999,
              background: "#0e0e0d",
            }}
          />
          {/* lock-screen clock */}
          <div
            style={{
              textAlign: "center",
              fontFamily: FONT_FAMILY,
              color: creamA(0.85),
              marginBottom: h(w) * 0.45,
            }}
          >
            <div style={{ fontSize: w * 0.19, fontWeight: WEIGHT.light, letterSpacing: TRACK.tight, lineHeight: 1 }}>
              9:41
            </div>
            <div style={{ fontSize: w * 0.05, fontWeight: WEIGHT.medium, letterSpacing: "0.04em", color: creamA(0.5) }}>
              Tuesday, 14 January
            </div>
          </div>

          {/* the FIRE push notification */}
          <div
            style={{
              margin: `0 ${w * 0.06}px`,
              padding: w * 0.055,
              borderRadius: w * 0.07,
              background: "rgba(38,37,34,0.86)",
              backdropFilter: "blur(6px)",
              border: `1px solid ${accentA(0.25 + 0.35 * ignite)}`,
              boxShadow: `0 ${unit}px ${unit * 4}px rgba(0,0,0,0.4)`,
              translate: `0px ${ny}px`,
              opacity: nOpacity,
              display: "flex",
              gap: w * 0.045,
              alignItems: "flex-start",
            }}
          >
            {/* app glyph — ignites to FIRE */}
            <div
              style={{
                width: w * 0.12,
                height: w * 0.12,
                borderRadius: w * 0.03,
                flexShrink: 0,
                background: `linear-gradient(135deg, ${mix(creamA(0.15), fireColor, ignite)}, ${mix("#3a3a36", accentA(0.85), ignite)})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: w * 0.06,
                boxShadow: ignite > 0.5 ? `0 0 ${unit * 2 * ignite}px ${accentA(0.6 * ignite)}` : "none",
              }}
            >
              OXO
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: WEIGHT.bold,
                  fontSize: w * 0.058,
                  color: mix(COLORS.cream, fireColor, ignite * 0.9),
                  letterSpacing: "0.01em",
                }}
              >
                {PHONE.line1}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: WEIGHT.medium,
                  fontSize: w * 0.046,
                  color: creamA(0.82),
                  marginTop: w * 0.012,
                  whiteSpace: "nowrap",
                }}
              >
                {PHONE.line2}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: WEIGHT.regular,
                  fontSize: w * 0.047,
                  color: creamA(0.55),
                  marginTop: w * 0.01,
                }}
              >
                {PHONE.line3}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// small helpers kept local to the phone
const h = (w: number) => w; // vertical rhythm unit tied to width
function mix(a: string, b: string, t: number) {
  // a is an rgba()/hex baseline shown at t=0; b hex shown at t=1.
  // Simple crossfade via color-mix (supported in modern Chromium used by Remotion).
  const tt = Math.max(0, Math.min(1, t));
  return `color-mix(in srgb, ${b} ${tt * 100}%, ${a})`;
}
