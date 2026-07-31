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

          {/* the FIRE push notification — iOS lock-screen style */}
          <div
            style={{
              margin: `0 ${w * 0.038}px`,
              padding: `${w * 0.048}px ${w * 0.05}px`,
              borderRadius: w * 0.085,
              background: "rgba(46,45,42,0.7)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1px solid ${mix(creamA(0.12), accentA(0.55), ignite)}`,
              boxShadow: `0 ${unit}px ${unit * 4}px rgba(0,0,0,0.45), inset 0 1px 0 ${creamA(0.08)}`,
              translate: `0px ${ny}px`,
              opacity: nOpacity,
              display: "flex",
              gap: w * 0.04,
              alignItems: "flex-start",
            }}
          >
            {/* Salesforce app icon (the alert comes from the CRM) */}
            <div
              style={{
                width: w * 0.13,
                height: w * 0.13,
                borderRadius: w * 0.032,
                flexShrink: 0,
                background: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.06)`,
              }}
            >
              <svg width="72%" height="72%" viewBox="0 0 64 44" aria-hidden="true">
                <g fill="#00A1E0">
                  <circle cx="24" cy="27" r="14" />
                  <circle cx="41" cy="25" r="12" />
                  <circle cx="34" cy="15" r="11" />
                  <circle cx="15" cy="31" r="9" />
                  <rect x="14" y="27" width="36" height="14" rx="7" />
                </g>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* header: app name + time */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: w * 0.006 }}>
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontWeight: WEIGHT.semibold,
                    fontSize: w * 0.031,
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                    color: creamA(0.52),
                  }}
                >
                  {PHONE.app}
                </span>
                <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.regular, fontSize: w * 0.031, color: creamA(0.4) }}>
                  {PHONE.time}
                </span>
              </div>
              {/* title */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: WEIGHT.bold,
                  fontSize: w * 0.05,
                  color: mix(COLORS.cream, fireColor, ignite * 0.9),
                  letterSpacing: "0.004em",
                  lineHeight: 1.15,
                }}
              >
                {PHONE.line1}
              </div>
              {/* body */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: WEIGHT.regular,
                  fontSize: w * 0.04,
                  color: creamA(0.8),
                  marginTop: w * 0.008,
                  whiteSpace: "nowrap",
                }}
              >
                {PHONE.line2}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: WEIGHT.regular,
                  fontSize: w * 0.04,
                  color: creamA(0.55),
                  marginTop: w * 0.005,
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
