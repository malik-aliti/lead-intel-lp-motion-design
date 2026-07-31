/**
 * A thin rising meter with a numeric readout. Used for the Behavioral and Fit
 * tracks. Fills 0..value (value 0..100); a terracotta signature tick sits at
 * the fill head. Vertical by default; horizontal supported.
 */
import { FONT_FAMILY, TRACK, WEIGHT, accentA, creamA } from "../theme/tokens";
import { Label } from "./Label";

export const Meter: React.FC<{
  /** 0..100 current filled value (already eased by caller). */
  value: number;
  max?: number;
  label: string;
  color: string;
  length: number; // px along fill axis
  thickness?: number; // px cross axis
  orientation?: "vertical" | "horizontal";
  showValue?: boolean;
  unit: number;
}> = ({
  value,
  max = 100,
  label,
  color,
  length,
  thickness = 8,
  orientation = "vertical",
  showValue = true,
  unit,
}) => {
  const frac = Math.max(0, Math.min(1, value / max));
  const vertical = orientation === "vertical";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: vertical ? "center" : "flex-start",
        gap: unit * 1.1,
      }}
    >
      <Label size={unit * 1.35} tracking={TRACK.label} color={creamA(0.55)}>
        {label}
      </Label>

      <div
        style={{
          position: "relative",
          width: vertical ? thickness : length,
          height: vertical ? length : thickness,
          borderRadius: 999,
          backgroundColor: creamA(0.08),
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: vertical ? "100%" : `${frac * 100}%`,
            height: vertical ? `${frac * 100}%` : "100%",
            borderRadius: 999,
            background: color,
            boxShadow: `0 0 12px ${accentA(0.35)}`,
          }}
        />
        {/* signature tick at the fill head */}
        <div
          style={{
            position: "absolute",
            ...(vertical
              ? {
                  bottom: `calc(${frac * 100}% - 1px)`,
                  left: -thickness * 0.5,
                  right: -thickness * 0.5,
                  height: 2,
                }
              : {
                  left: `calc(${frac * 100}% - 1px)`,
                  top: -thickness * 0.5,
                  bottom: -thickness * 0.5,
                  width: 2,
                }),
            background: color,
            boxShadow: `0 0 10px ${accentA(0.6)}`,
            opacity: frac > 0.02 ? 1 : 0,
          }}
        />
      </div>

      {showValue ? (
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: WEIGHT.bold,
            fontSize: unit * 2.4,
            letterSpacing: TRACK.tight,
            color,
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(value)}
        </span>
      ) : null}
    </div>
  );
};
