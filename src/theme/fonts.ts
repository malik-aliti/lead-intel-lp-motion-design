/**
 * Self-hosted Poppins (matches the live site 1:1). woff2 in public/fonts.
 * Loaded once at import; components also gate their first paint on `fontReady`
 * via useFontsReady() so text never flashes a fallback in a render.
 */
import { loadFont } from "@remotion/fonts";
import { continueRender, delayRender, staticFile } from "remotion";
import { useEffect, useState } from "react";
import { FONT_NAME, WEIGHT } from "./tokens";

const WEIGHTS: number[] = [
  WEIGHT.light,
  WEIGHT.regular,
  WEIGHT.medium,
  WEIGHT.semibold,
  WEIGHT.bold,
  WEIGHT.heavy,
  WEIGHT.black,
];

export const fontReady = Promise.all(
  WEIGHTS.map((w: number) =>
    loadFont({
      family: FONT_NAME,
      url: staticFile(`fonts/Poppins-${w}.woff2`),
      weight: String(w),
      display: "block",
    }),
  ),
);

/** Hold the render until every Poppins weight is available. */
export const useFontsReady = () => {
  const [handle] = useState(() => delayRender("Waiting for Poppins"));
  useEffect(() => {
    let cancelled = false;
    const done = () => {
      if (!cancelled) continueRender(handle);
    };
    fontReady.then(done, done);
    return () => {
      cancelled = true;
    };
  }, [handle]);
};
