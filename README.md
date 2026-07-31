# OXO Lead Intel — hero motion film (Remotion)

A narrative product film + ambient loop for the hero section of the OXO Property
Dubai lead-gen landing page. Built to feel native to the live site: same font
(Poppins), same restrained navy + warm-grey palette, same single terracotta
accent (`#E18D5E`), and the site's own scan-line device promoted into the film's
signature motion.

Two deliverables from one codebase:

- **Narrative** — a ~25.5s film (765f @ 30fps): cold open → lead arrives on a
  realistic off-plan LP (behavioral signals) → social profiling (multi-source
  research → OXO AI → Social Fit) → global scoring (Behavioral + Social →
  Combined 91/100 → FIRE gauge) → OXO adds the score to the existing Salesforce
  record → the Salesforce FIRE alert on a phone → end card.
  Scores are centralized in `SCORING` (tokens.ts): realistic funnel strengths
  (94/84/82/92) → Behavioral 88, Social 94, Combined 91, identical on every frame.
- **Loop** — a 12s seamless ambient background loop (360f @ 30fps) derived from
  the same primitives. Calmer, airier, no end card. Frame 0 === frame 360.

## Run the studio

```bash
npm install
npm run dev            # opens Remotion Studio
```

## Compositions

| id | aspect | frames | use |
|---|---|---|---|
| `Narrative-16x9` | 1920×1080 | 765 | primary hero film |
| `Narrative-1x1`  | 1080×1080 | 765 | social / square |
| `Narrative-9x16` | 1080×1920 | 765 | mobile / reels |
| `Loop-16x9`      | 1920×1080 | 360 | ambient bg loop |
| `Loop-1x1`       | 1080×1080 | 360 | ambient square |
| `Loop-9x16`      | 1080×1920 | 360 | ambient mobile |
| `Narrative-Sound-16x9` | 1920×1080 | 765 | **Version B** — hero film + sound design |
| `Loop-Sound-16x9`      | 1920×1080 | 360 | **Version B** — ambient loop + sound |

### Two versions to compare (silent vs sound)

Same visuals, the only difference is audio. The LP autoplays muted, so the
silent version is what most visitors see; the sound version is for social /
unmuted contexts. The sound design is restrained and event-locked: a soft data
tick as each captured signal lands, a slow rising tone as the score climbs, a
gentle chime when the score locks at 91, and a notification ding + low bass hit
at the FIRE alert, over a very quiet ambient bed. SFX are synthesized locally
(`public/audio/*.wav`), no external assets; regenerate with
`python3 scripts/make-sfx.py`.

```bash
npx remotion render Narrative-Sound-16x9 out/videos/oxo-leadintel-hero-1080p30-SOUND.mp4 --codec h264 --crf 18
npx remotion render Loop-Sound-16x9      out/videos/oxo-leadintel-loop-1080p30-SOUND.mp4 --codec h264 --crf 18
```

## Render the deliverables

H.264 MP4 (autoplay muted inline on the LP) + VP9 WebM + a poster still:

```bash
# ── Narrative (hero film) ──
npx remotion render Narrative-16x9 out/videos/oxo-leadintel-hero-1080p30.mp4  --codec h264 --crf 18
npx remotion render Narrative-16x9 out/videos/oxo-leadintel-hero-1080p30.webm --codec vp9
# poster: a strong still around the FIRE beat
npx remotion still  Narrative-16x9 out/posters/poster-fire.png    --frame=415
npx remotion still  Narrative-16x9 out/posters/poster-endcard.png --frame=750

# ── Loop (ambient background) ──
npx remotion render Loop-16x9 out/videos/oxo-leadintel-loop-1080p30.mp4  --codec h264 --crf 18
npx remotion render Loop-16x9 out/videos/oxo-leadintel-loop-1080p30.webm --codec vp9

# ── Social variants (reuse the same components) ──
npx remotion render Narrative-9x16 out/videos/oxo-leadintel-hero-9x16.mp4 --codec h264 --crf 18
npx remotion render Narrative-1x1  out/videos/oxo-leadintel-hero-1x1.mp4  --codec h264 --crf 18
```

Tips: add `--frames=0-120` to render a slice, `--scale=0.5` for a fast preview
render, `--concurrency=4` to bound CPU.

## Embedding on the landing page

Narrative (plays once on scroll-into-view, freezes on a clean final frame):

```html
<video
  poster="poster-fire.png"
  muted playsinline preload="metadata"
  style="width:100%;height:auto">
  <source src="oxo-leadintel-hero-1080p30.webm" type="video/webm" />
  <source src="oxo-leadintel-hero-1080p30.mp4"  type="video/mp4" />
</video>
<script>
  // play once when it scrolls into view; the film ends on a designed freeze frame
  const v = document.currentScript.previousElementSibling;
  new IntersectionObserver((e, o) => {
    if (e[0].isIntersecting) { v.play(); o.disconnect(); }
  }, { threshold: 0.4 }).observe(v);
</script>
```

Ambient loop (muted autoplay, loops forever):

```html
<video autoplay muted loop playsinline
  style="width:100%;height:auto">
  <source src="oxo-leadintel-loop-1080p30.webm" type="video/webm" />
  <source src="oxo-leadintel-loop-1080p30.mp4"  type="video/mp4" />
</video>
```

The film reads perfectly silent (it autoplays muted on the LP). Optional sound
design can be added later via `<Audio>` without touching the visuals.

## Architecture

Everything is config-driven — no magic numbers scattered in components.

```
src/
  theme/
    tokens.ts     colors, Poppins stack, tracking, easings, scene timing, layout
    strings.ts    every on-screen string, verbatim (no em dashes)
    fonts.ts      self-hosted Poppins loader + useFontsReady() render gate
  lib/
    anim.ts       expo easing, prog(), spring enter(), stagger()
    useStage.ts   aspect-aware unit / margins (one set of scenes → 3 ratios)
  components/      Background, ScanLine (signature), EngineCore, Meter, Wordmark,
                   Label, ProfileCard, ScoreCounter, PhoneFrame, LeadPacket, Fade
  scenes/         SceneWordmark (open + end), SceneCapture, SceneEnrichment,
                   SceneGlobalScore, SceneCRM, ScenePhoneAlert
  Narrative.tsx   the narrative film (scenes as <Sequence>s over one canvas)
  Loop.tsx        the 12s seamless loop (same primitives, phase-driven)
  Root.tsx        registers all 8 compositions
public/fonts/     Poppins 300–900 woff2 (self-hosted, matches the live site)
```

### Brand tokens (extracted 1:1 from the live site stylesheet)

- Canvas `#202020` (warm near-black), primary text cream `#F3F0EC`, dim `#B5AF9F`
- Single accent / FIRE: terracotta **`#E18D5E`** — drives the scan line, engine
  core, score, FIRE ignition and the end-card line
- Classification: FIRE `#E18D5E` · HOT `#C0BCAF` · WARM `#B5AF9F` · COLD `#414141`
- Type: **Poppins**, display at weight 400 + tight tracking, punctuated by
  800/900 uppercase; micro-labels 600/700 at wide tracking

### Signature motion

A thin terracotta scan line (the site's own `.scan`, promoted) reads every value
into existence — the wordmark, meters, the score, the CRM record — and draws the
underline beneath the end-card line. It is the one recurring device.

### Seamless loop

`Loop-16x9` is 360 frames = a whole multiple of the engine's ring/pulse periods
(120/90/60), so the continuously spinning core wraps with no rotational jump.
Every other quantity is a function of loop phase with an envelope that returns to
its frame-0 value at the seam; two lead packets offset by half a period keep one
always in frame. Verified: `out/posters/loop-seam-check.png` (frame 359 vs 0),
mean difference 0.21%.

## 60fps

The primary is 30fps as briefed. A 60fps variant is a mechanical change (double
the frame counts in `tokens.ts` `NARRATIVE`/`LOOP_DURATION` and the per-scene
windows); ask and I'll add a `-60` composition set.
