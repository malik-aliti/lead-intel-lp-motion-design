/**
 * Scene 5 — route to CRM. The scored, classified lead travels as a clean packet
 * along a connector into a Salesforce record and drops into the FIRE queue.
 * Deliberate, weighty motion; the signature scan pulse rides the connector.
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
import { CRM } from "../theme/strings";
import { useStage } from "../lib/useStage";
import { expo } from "../lib/anim";
import { Label } from "../components/Label";
import { Fade } from "../components/Fade";
import { LeadPacket } from "../components/LeadPacket";

export const SceneRouteCRM: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { unit, isPortrait, width, height } = useStage();

  // packet travels along the connector, arrives ~frame 52
  const travel = interpolate(frame, [10, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const dropped = interpolate(frame, [52, 66], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expo,
  });
  const scanPos = ((frame % 45) / 45) * 100;

  const panelW = isPortrait ? width * 0.78 : width * 0.32;
  const panelH = isPortrait ? height * 0.34 : height * 0.5;

  const CRMPanel = (
    <div
      style={{
        width: panelW,
        height: panelH,
        borderRadius: unit * 1.4,
        background: creamA(0.04),
        border: `1px solid ${creamA(0.1)}`,
        overflow: "hidden",
        boxShadow: `0 ${unit * 3}px ${unit * 8}px rgba(0,0,0,0.4)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* header */}
      <div
        style={{
          padding: unit * 1.6,
          borderBottom: `1px solid ${creamA(0.08)}`,
          display: "flex",
          alignItems: "center",
          gap: unit * 1,
        }}
      >
        <div style={{ width: unit * 2.6, height: unit * 2.6, borderRadius: unit * 0.6, background: "#00A1E0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: unit * 1.6, height: unit * 1.1, borderRadius: 999, background: COLORS.white }} />
        </div>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: WEIGHT.bold, fontSize: unit * 1.9, color: COLORS.cream }}>
          {CRM.destination}
        </span>
      </div>
      {/* FIRE queue */}
      <div style={{ padding: unit * 1.6, display: "flex", flexDirection: "column", gap: unit * 1.2, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: unit * 0.8 }}>
          <div style={{ width: unit * 0.9, height: unit * 0.9, borderRadius: "50%", background: CLASS_COLORS.FIRE, boxShadow: `0 0 8px ${accentA(0.7)}` }} />
          <Label size={unit * 1.4} color={accentA(0.9)} tracking={TRACK.label}>
            {CRM.queue}
          </Label>
        </div>
        {/* dropped-in lead row */}
        <div
          style={{
            opacity: dropped,
            translate: `0px ${interpolate(dropped, [0, 1], [-unit * 2, 0])}px`,
          }}
        >
          <LeadPacket unit={unit} compact landed={dropped} />
        </div>
        {/* existing quiet rows */}
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              height: unit * 3.4,
              borderRadius: unit * 0.8,
              background: creamA(0.03),
              border: `1px solid ${creamA(0.06)}`,
              opacity: 0.5,
            }}
          />
        ))}
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
          gap: 0,
        }}
      >
        {/* origin + connector + panel laid on a row/column */}
        <div
          style={{
            display: "flex",
            flexDirection: isPortrait ? "column" : "row",
            alignItems: "center",
            gap: isPortrait ? unit * 3 : unit * 4,
          }}
        >
          {/* connector rail with travelling packet */}
          <div
            style={{
              position: "relative",
              width: isPortrait ? 3 : width * 0.22,
              height: isPortrait ? height * 0.18 : 3,
              background: creamA(0.1),
              borderRadius: 999,
            }}
          >
            {/* signature scan pulse riding the rail */}
            <div
              style={{
                position: "absolute",
                ...(isPortrait
                  ? { top: `${scanPos}%`, left: -1.5, width: 6, height: unit * 5 }
                  : { left: `${scanPos}%`, top: -1.5, height: 6, width: unit * 5 }),
                background: `linear-gradient(${isPortrait ? "180deg" : "90deg"}, transparent, ${COLORS.accent}, transparent)`,
                boxShadow: `0 0 8px ${accentA(0.6)}`,
              }}
            />
            {/* the packet, travelling */}
            <div
              style={{
                position: "absolute",
                ...(isPortrait
                  ? { top: `${travel * 100}%`, left: "50%", translate: "-50% -50%" }
                  : { left: `${travel * 100}%`, top: "50%", translate: "-50% -50%" }),
                opacity: 1 - dropped, // hands off to the dropped row
              }}
            >
              <LeadPacket unit={unit} />
            </div>
          </div>

          {CRMPanel}
        </div>
      </AbsoluteFill>
    </Fade>
  );
};
