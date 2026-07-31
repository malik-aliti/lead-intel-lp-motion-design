#!/usr/bin/env python3
"""
Synthesize the restrained SFX for the sound-design version (Version B).
Writes WAVs to public/audio/. No external assets. Run from the project root:

    python3 scripts/make-sfx.py

Requires numpy.
"""
import numpy as np, wave, os

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(OUT, exist_ok=True)


def save(name, sig):
    sig = np.asarray(sig, dtype=np.float32)
    if sig.ndim == 1:
        sig = np.stack([sig, sig], axis=1)  # stereo
    peak = np.max(np.abs(sig)) or 1.0
    sig = sig / peak * 0.92
    i16 = (sig * 32767).astype("<i2")
    with wave.open(os.path.join(OUT, f"{name}.wav"), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(i16.tobytes())
    print(f"  {name}.wav  {len(sig) / SR:.2f}s")


def t(dur):
    return np.linspace(0, dur, int(SR * dur), endpoint=False)


def fade(sig, ms=6):
    n = int(SR * ms / 1000)
    n = min(n, len(sig) // 2)
    e = np.ones(len(sig))
    e[:n] = np.linspace(0, 1, n)
    e[-n:] = np.linspace(1, 0, n)
    return sig * e


# 1) tick — soft data-land pip (~1.7kHz) + faint noise, fast decay
d = t(0.05)
tick = (
    np.sin(2 * np.pi * 1720 * d) * np.exp(-d * 95) * 0.8
    + np.random.default_rng(1).normal(0, 1, len(d)) * np.exp(-d * 160) * 0.10
)
save("tick", fade(tick, 2))

# 2) rise — slow cinematic score-climb swell (~9s), two detuned sines gliding up
D = 9.0
d = t(D)
prog = 0.5 - 0.5 * np.cos(np.pi * np.clip(d / D, 0, 1))  # ease in-out 0..1
f0 = 174.6 + (261.6 - 174.6) * prog  # F3 -> C4 glide
osc = (
    np.sin(2 * np.pi * np.cumsum(f0) / SR)
    + 0.6 * np.sin(2 * np.pi * np.cumsum(f0 * 1.005) / SR)  # detune
    + 0.25 * np.sin(2 * np.pi * np.cumsum(f0 * 2) / SR) * prog  # harmonic blooms in
)
shimmer = 0.06 * np.sin(2 * np.pi * np.cumsum(f0 * 3) / SR) * (prog**2)
amp = np.clip(d / 2.2, 0, 1) * (1 - 0.12 * np.clip((d - 7.5) / 1.5, 0, 1))
save("rise", fade((osc + shimmer) * amp, 40))

# 3) chime — score locks at 91: soft two-note bell
d = t(1.1)


def bell(f, dur=1.1, dcy=5.5):
    dd = t(dur)
    return (
        np.sin(2 * np.pi * f * dd)
        + 0.4 * np.sin(2 * np.pi * f * 2.01 * dd) * np.exp(-dd * 2)
        + 0.2 * np.sin(2 * np.pi * f * 2.99 * dd) * np.exp(-dd * 3)
    ) * np.exp(-dd * dcy)


chime = bell(783.99) + 0.8 * np.concatenate([np.zeros(int(SR * 0.06)), bell(1046.5)])[: len(d)]
save("chime", fade(chime, 4))

# 4) ding — phone notification: refined two-note pip w/ short tail
seg = []
for f, dur in [(880, 0.09), (1318.5, 0.16)]:
    dd = t(dur)
    seg.append(np.sin(2 * np.pi * f * dd) * np.exp(-dd * 7) * (1 - np.exp(-dd * 400)))
ding = np.concatenate(seg)
ding = np.concatenate([ding, np.zeros(int(SR * 0.12))])
dd = t(len(ding) / SR)
ding = ding + 0.15 * np.sin(2 * np.pi * 1318.5 * dd) * np.exp(-dd * 9)
save("ding", fade(ding, 3))

# 5) bass — FIRE impact: pitch-dropping low sine + click transient
d = t(1.0)
f = 70 * np.exp(-d * 22) + 46  # ~116 -> 46 Hz drop
body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-d * 3.2)
sub = 0.5 * np.sin(2 * np.pi * np.cumsum(f * 0.5) / SR) * np.exp(-d * 2.6)
click = np.random.default_rng(2).normal(0, 1, len(d)) * np.exp(-d * 260) * 0.25
save("bass", fade(body + sub + click, 3))

# 6) bed — very low premium ambient drone, constant (seamless-loop safe), quiet
D = 6.0
d = t(D)
bed = np.sin(2 * np.pi * 55 * d) + 0.5 * np.sin(2 * np.pi * 110 * d) + 0.12 * np.sin(2 * np.pi * 164.8 * d)
breath = 1 + 0.05 * np.sin(2 * np.pi * d / D)  # one cycle over the file -> loops
n = np.random.default_rng(3).normal(0, 1, len(d))
n = np.convolve(n, np.ones(400) / 400, mode="same")  # gentle lowpass
save("bed", (bed * breath + 0.08 * n) * 0.5)

print("done")
