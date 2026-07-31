/**
 * Scene 2 — the lead arrives. A realistic off-plan property landing page sits in
 * a browser frame: developer nav, a cinematic dusk-skyline hero with the project
 * name / price / register CTA, a register-interest form and a details strip.
 * A cursor moves and acts; the six micro-conversion labels light up one by one
 * as captured signals. Staggered, nothing arrives at once.
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

/** Dusk skyline built from towers with lit-window grids + water. */
const Skyline: React.FC<{ w: number; h: number }> = ({ w, h }) => {
  const towers = [
    { x: 0.02, w: 0.06, h: 0.4 },
    { x: 0.1, w: 0.08, h: 0.62 },
    { x: 0.19, w: 0.05, h: 0.48 },
    { x: 0.25, w: 0.11, h: 0.82 },
    { x: 0.37, w: 0.07, h: 0.56 },
    { x: 0.45, w: 0.06, h: 0.7 },
    { x: 0.52, w: 0.1, h: 0.9 },
    { x: 0.63, w: 0.05, h: 0.52 },
    { x: 0.69, w: 0.08, h: 0.74 },
    { x: 0.78, w: 0.06, h: 0.6 },
    { x: 0.85, w: 0.1, h: 0.68 },
    { x: 0.95, w: 0.05, h: 0.46 },
  ];
  const win = `radial-gradient(rgba(255,206,150,0.6) 0.5px, transparent 1.2px)`;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,#101a30 0%,#26243f 45%,#5a3d42 76%,#9a5d3d 100%)` }} />
      {/* dusk sun glow */}
      <div style={{ position: "absolute", left: "60%", top: "34%", width: h * 0.55, height: h * 0.55, borderRadius: "50%", background: `radial-gradient(circle, rgba(240,175,115,0.55), transparent 62%)` }} />
      {/* towers */}
      {towers.map((t, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: "16%",
            left: `${t.x * 100}%`,
            width: `${t.w * 100}%`,
            height: `${t.h * 100}%`,
            background: "#0b1220",
            backgroundImage: win,
            backgroundSize: `${w * 0.012}px ${w * 0.017}px`,
            backgroundPosition: "center",
            boxShadow: `0 0 ${w * 0.02}px rgba(0,0,0,0.4)`,
          }}
        />
      ))}
      {/* water */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "16%", background: `linear-gradient(180deg,#0a0f1a,#0c1320)` }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "16%", background: `radial-gradient(120% 80% at 60% 0%, rgba(240,175,115,0.18), transparent 60%)` }} />
      {/* darken for text legibility */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, rgba(6,9,16,0.72) 0%, rgba(6,9,16,0.3) 45%, transparent 70%)` }} />
    </div>
  );
};

const Signal: React.FC<{ text: string; index: number; frame: number; unit: number }> = ({
  text,
  index,
  frame,
  unit,
}) => {
  const start = 26 + index * 11;
  const op = interpolate(frame, [start, start + 8], [0.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
  const dx = interpolate(frame, [start, start + 10], [unit * 1.2, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
  const lit = interpolate(frame, [start, start + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: unit * 1.1, opacity: op, translate: `${dx}px 0px` }}>
      <div style={{ width: unit * 1.1, height: unit * 1.1, borderRadius: "50%", background: COLORS.accent, opacity: lit, boxShadow: `0 0 ${unit * 1.4 * lit}px ${accentA(0.7)}`, flexShrink: 0 }} />
      <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.medium, fontSize: unit * 1.9, letterSpacing: "0.01em", color: `color-mix(in srgb, ${COLORS.cream} ${lit * 100}%, ${COLORS.dim})`, whiteSpace: "nowrap" }}>
        {text}
      </span>
    </div>
  );
};

export const SceneCapture: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { unit, isPortrait, width, height } = useStage();

  const browserW = isPortrait ? width * 0.86 : Math.min(width * 0.5, height * 0.92);
  const browserH = browserW * 0.64;
  const chromeH = unit * 3;
  const navH = unit * 4.2;
  const heroH = browserH - chromeH - navH - unit * 6.4;
  const s = browserW / 100; // local unit inside the browser

  // cursor path across the CTA then toward the signals
  const cx = interpolate(frame, [10, 42, 74, 100], [0.32, 0.5, 0.72, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });
  const cy = interpolate(frame, [10, 42, 74, 100], [0.4, 0.74, 0.62, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: expo });

  return (
    <Fade dur={dur}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isPortrait ? "column" : "row",
          gap: isPortrait ? unit * 4 : unit * 6,
        }}
      >
        {/* Browser frame with the off-plan LP */}
        <div style={{ width: browserW, height: browserH, borderRadius: unit * 1.4, background: "#0a0d14", border: `1px solid ${creamA(0.1)}`, overflow: "hidden", position: "relative", boxShadow: `0 ${unit * 3}px ${unit * 9}px rgba(0,0,0,0.5)` }}>
          {/* browser chrome */}
          <div style={{ height: chromeH, display: "flex", alignItems: "center", gap: s * 1, padding: `0 ${s * 1.6}px`, background: "#12161f", borderBottom: `1px solid ${creamA(0.06)}` }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: s * 1.1, height: s * 1.1, borderRadius: "50%", background: creamA(0.18) }} />
            ))}
            <div style={{ marginLeft: s * 1.4, flex: 1, height: s * 2, borderRadius: 999, background: creamA(0.06), display: "flex", alignItems: "center", paddingLeft: s * 1.4 }}>
              <span style={{ fontFamily: FONT_FAMILY, fontSize: s * 1.1, color: creamA(0.4) }}>auradevelopment.ae/marina-heights</span>
            </div>
          </div>

          {/* site nav */}
          <div style={{ height: navH, display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${s * 3}px`, background: "#0b0f18" }}>
            <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.black, fontSize: s * 1.7, letterSpacing: "0.14em", color: COLORS.cream }}>{LP.developer}</span>
            <div style={{ display: "flex", alignItems: "center", gap: s * 2.4 }}>
              {LP.nav.map((n) => (
                <span key={n} style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.medium, fontSize: s * 1.15, color: creamA(0.6) }}>{n}</span>
              ))}
              <div style={{ padding: `${s * 0.7}px ${s * 1.6}px`, borderRadius: 999, background: COLORS.accent, fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: s * 1.1, color: "#141019" }}>Register</div>
            </div>
          </div>

          {/* hero */}
          <div style={{ position: "relative", height: heroH, overflow: "hidden" }}>
            <Skyline w={browserW} h={heroH} />
            {/* overlay text */}
            <div style={{ position: "absolute", left: s * 3.4, top: heroH * 0.2, display: "flex", flexDirection: "column", gap: s * 1.1, maxWidth: browserW * 0.52 }}>
              <Label size={s * 1.15} color={accentA(0.95)} tracking={TRACK.labelWide}>{LP.eyebrow}</Label>
              <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.bold, fontSize: s * 3.6, letterSpacing: TRACK.tight, color: COLORS.white, lineHeight: 1.05 }}>{LP.title}</span>
              <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.regular, fontSize: s * 1.4, color: creamA(0.75) }}>{LP.tagline}</span>
              <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: s * 2, color: COLORS.accent, marginTop: s * 0.6 }}>{LP.price}</span>
              <div style={{ marginTop: s * 0.8, alignSelf: "flex-start", padding: `${s * 1}px ${s * 2}px`, borderRadius: 999, background: COLORS.accent, fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: s * 1.3, color: "#141019" }}>{LP.cta}</div>
            </div>

            {/* register form card */}
            <div style={{ position: "absolute", right: s * 3, top: heroH * 0.16, width: browserW * 0.28, padding: s * 1.8, borderRadius: s * 1.2, background: "rgba(12,15,22,0.72)", backdropFilter: "blur(8px)", border: `1px solid ${creamA(0.12)}`, display: "flex", flexDirection: "column", gap: s * 1 }}>
              <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: s * 1.3, color: COLORS.cream }}>{LP.form.title}</span>
              {LP.form.fields.map((f) => (
                <div key={f} style={{ height: s * 2.4, borderRadius: s * 0.6, border: `1px solid ${creamA(0.14)}`, display: "flex", alignItems: "center", paddingLeft: s * 1, fontFamily: FONT_FAMILY, fontSize: s * 1.05, color: creamA(0.4) }}>{f}</div>
              ))}
              <div style={{ height: s * 2.6, borderRadius: s * 0.6, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: s * 1.15, color: "#141019" }}>{LP.form.submit}</div>
            </div>
          </div>

          {/* details strip */}
          <div style={{ height: unit * 6.4, display: "flex", alignItems: "center", background: "#0b0f18", borderTop: `1px solid ${creamA(0.06)}` }}>
            {LP.details.map((d, i) => (
              <div key={d.k} style={{ flex: 1, display: "flex", flexDirection: "column", gap: s * 0.3, padding: `0 ${s * 2}px`, borderLeft: i === 0 ? "none" : `1px solid ${creamA(0.07)}` }}>
                <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: s * 1.05, letterSpacing: "0.1em", textTransform: "uppercase", color: creamA(0.4) }}>{d.k}</span>
                <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.semibold, fontSize: s * 1.5, color: COLORS.cream }}>{d.v}</span>
              </div>
            ))}
          </div>

          {/* cursor */}
          <div style={{ position: "absolute", left: `${cx * 100}%`, top: `${cy * 100}%`, width: s * 2.4, height: s * 2.4, translate: "-10% -10%", filter: `drop-shadow(0 1px 2px rgba(0,0,0,0.7))` }}>
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <path d="M4 2 L4 19 L9 14 L12.5 21 L15 20 L11.5 13 L18 13 Z" fill={COLORS.white} stroke="#0a0d14" strokeWidth={1} />
            </svg>
          </div>
        </div>

        {/* captured signals */}
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
