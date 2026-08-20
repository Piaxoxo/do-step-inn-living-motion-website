#!/usr/bin/env python3
"""
Procedural placeholder media for the Do Step Inn Living motion website.

These are NOT photographs and are not pretending to be. They are abstract
architectural-light compositions in the brand palette, rendered from one shared
scene model so the stills and the background film belong to the same world.

They exist so the site, the scroll-scrub mechanism and the layout can be built,
reviewed and shipped before the real GPT Image 2 / Seedance 2.0 assets arrive.
Every output lands at exactly the path the real asset will occupy, so swapping
is a file copy.

Usage:
    python3 scripts/generate_placeholder_media.py [--stills] [--film] [--all]
"""

import argparse
import os
import sys

import numpy as np

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required:  pip install pillow numpy")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES = os.path.join(ROOT, "assets", "images")

# --- brand palette (see copy/brand-kit.md) ---------------------------------
BG = np.array([0x0B, 0x10, 0x20]) / 255.0
BG2 = np.array([0x11, 0x17, 0x2B]) / 255.0
SURFACE = np.array([0x17, 0x1D, 0x32]) / 255.0
SURFACE2 = np.array([0x20, 0x27, 0x41]) / 255.0
ACCENT = np.array([0xFF, 0x3B, 0x8D]) / 255.0   # pink
ACCENT2 = np.array([0xFF, 0x7A, 0x3D]) / 255.0  # warm orange
WARM = np.array([0xFF, 0xC7, 0x8F]) / 255.0     # practical light

# --- the four film phases --------------------------------------------------
# (bg_top, bg_bottom, warm_light, accent_light, warm_gain, accent_gain, density)
PHASES = [
    dict(top=BG, bot=BG2, warm=WARM, acc=ACCENT, wg=0.85, ag=0.20, density=0.35),
    dict(top=BG2, bot=SURFACE, warm=WARM, acc=ACCENT, wg=1.00, ag=0.30, density=0.60),
    dict(top=BG, bot=SURFACE2, warm=ACCENT2, acc=ACCENT, wg=1.15, ag=0.85, density=0.75),
    dict(top=BG, bot=BG2, warm=WARM, acc=ACCENT, wg=0.70, ag=0.35, density=0.30),
]
PHASE_AT = [0.0, 0.34, 0.68, 1.0]


def phase_params(t):
    """Interpolate the phase palette at film progress t in [0, 1]."""
    t = float(np.clip(t, 0.0, 1.0))
    for i in range(len(PHASE_AT) - 1):
        a, b = PHASE_AT[i], PHASE_AT[i + 1]
        if t <= b or i == len(PHASE_AT) - 2:
            k = 0.0 if b == a else (t - a) / (b - a)
            k = np.clip(k, 0.0, 1.0)
            k = k * k * (3 - 2 * k)  # smoothstep — no visible phase seams
            p, q = PHASES[i], PHASES[i + 1]
            return {
                key: (p[key] * (1 - k) + q[key] * k)
                for key in ("top", "bot", "warm", "acc", "wg", "ag", "density")
            }
    raise AssertionError("unreachable")


def _bloom(X, Y, cx, cy, radius, aspect=1.0):
    """Soft radial falloff — a practical light source, not a lens flare."""
    d = np.sqrt(((X - cx) * aspect) ** 2 + (Y - cy) ** 2) / max(radius, 1e-6)
    return np.exp(-(d ** 1.95) * 3.3)


def _soft_band(X, x0, x1, edge):
    """Vertical architectural element with soft shoulders."""
    left = np.clip((X - x0) / edge, 0.0, 1.0)
    right = np.clip((x1 - X) / edge, 0.0, 1.0)
    b = left * right
    return b * b * (3 - 2 * b)


# Static grain, generated once. Per-frame noise would flicker under scrubbing,
# which the brief explicitly forbids.
_GRAIN_CACHE = {}


def grain(h, w):
    key = (h, w)
    if key not in _GRAIN_CACHE:
        rng = np.random.default_rng(20260820)
        g = rng.normal(0.0, 1.0, (h, w))
        g = (g + np.roll(g, 1, 0) + np.roll(g, 1, 1)) / 3.0  # slight softening
        _GRAIN_CACHE[key] = g
    return _GRAIN_CACHE[key]


# --- variants: how each still crops into the shared world ------------------
VARIANTS = {
    "hero-room": dict(
        t=0.05, horizon=0.72, pan=0.00, bands=[(0.58, 0.79, 1.0), (0.83, 0.93, 0.55)],
        blooms=[(0.68, 0.46, 0.34, 1.00, "warm"), (0.22, 0.66, 0.30, 0.22, "warm")],
        zoom=1.00,
    ),
    "lobby-living-reference": dict(
        t=0.38, horizon=0.68, pan=0.18, bands=[(0.06, 0.20, 0.6), (0.30, 0.44, 0.9), (0.62, 0.74, 0.75), (0.86, 0.98, 0.5)],
        blooms=[(0.37, 0.42, 0.30, 0.95, "warm"), (0.72, 0.55, 0.26, 0.45, "warm"), (0.10, 0.70, 0.22, 0.30, "acc")],
        zoom=1.03,
    ),
    "social-night-reference": dict(
        t=0.72, horizon=0.62, pan=0.44, bands=[(0.14, 0.26, 0.5), (0.44, 0.56, 0.8)],
        blooms=[(0.50, 0.40, 0.34, 1.10, "warm"), (0.79, 0.58, 0.24, 0.80, "acc"), (0.20, 0.52, 0.20, 0.45, "acc")],
        zoom=1.06,
    ),
    "room-private": dict(
        t=0.12, horizon=0.74, pan=0.06, bands=[(0.64, 0.86, 1.0)],
        blooms=[(0.75, 0.44, 0.30, 0.95, "warm"), (0.30, 0.62, 0.24, 0.20, "warm")],
        zoom=1.02,
    ),
    "room-shared": dict(
        t=0.22, horizon=0.70, pan=0.12, bands=[(0.08, 0.19, 0.7), (0.28, 0.39, 0.8), (0.48, 0.59, 0.8), (0.68, 0.79, 0.7)],
        blooms=[(0.18, 0.50, 0.16, 0.70, "warm"), (0.38, 0.50, 0.16, 0.70, "warm"),
                (0.58, 0.50, 0.16, 0.70, "warm"), (0.78, 0.50, 0.16, 0.55, "warm")],
        zoom=1.01,
    ),
    "common-space": dict(
        t=0.48, horizon=0.60, pan=0.26, bands=[(0.04, 0.16, 0.55), (0.34, 0.48, 0.85), (0.76, 0.92, 0.6)],
        blooms=[(0.41, 0.38, 0.32, 1.00, "warm"), (0.66, 0.50, 0.22, 0.35, "warm")],
        zoom=1.04,
    ),
    "city-lifestyle": dict(
        t=0.82, horizon=0.66, pan=0.58,
        bands=[(0.03, 0.09, 0.45), (0.16, 0.21, 0.6), (0.30, 0.34, 0.75), (0.45, 0.52, 0.9),
               (0.63, 0.68, 0.7), (0.78, 0.83, 0.55), (0.91, 0.97, 0.4)],
        blooms=[(0.48, 0.44, 0.28, 0.85, "warm"), (0.20, 0.56, 0.18, 0.55, "acc"), (0.84, 0.52, 0.18, 0.40, "acc")],
        zoom=1.05,
    ),
}


def render(w, h, t, horizon=0.68, pan=0.0, bands=None, blooms=None, zoom=1.0):
    """Render one frame of the shared scene world."""
    p = phase_params(t)
    xs = np.linspace(0.0, 1.0, w, dtype=np.float32)
    ys = np.linspace(0.0, 1.0, h, dtype=np.float32)
    X, Y = np.meshgrid(xs, ys)

    # slow breathing zoom around the frame centre
    Xc = (X - 0.5) / zoom + 0.5
    Yc = (Y - 0.5) / zoom + 0.5

    # 1. base vertical gradient
    g = np.clip(Yc, 0, 1)[..., None] ** 0.85
    img = p["top"] * 0.72 * (1 - g) + p["bot"] * 1.05 * g

    # 2. architectural bands, parallaxed by depth
    for (x0, x1, depth) in (bands or []):
        shift = pan * (0.35 + 0.65 * depth)
        bx0, bx1 = x0 - shift, x1 - shift
        while bx1 < -0.15:
            bx0 += 1.3
            bx1 += 1.3
        while bx0 > 1.15:
            bx0 -= 1.3
            bx1 -= 1.3
        b = _soft_band(Xc, bx0, bx1, 0.010 + 0.018 * (1 - depth))
        b = b * np.clip((horizon + 0.06 - Yc) / 0.5, 0.0, 1.0)  # stop at the floor
        lift = SURFACE2 * (0.30 + 0.55 * depth)
        img += b[..., None] * lift
        # warm edge highlight along the leading edge
        edge = _soft_band(Xc, bx1 - 0.012, bx1 + 0.006, 0.008)
        edge = edge * np.clip((horizon - Yc) / 0.45, 0.0, 1.0)
        img += edge[..., None] * p["warm"] * 0.26 * depth

    # 3. floor plane
    floor = np.clip((Yc - horizon) / 0.06, 0.0, 1.0)
    floor = floor * floor * (3 - 2 * floor)
    depth_fade = np.clip((Yc - horizon) / max(1.0 - horizon, 1e-6), 0, 1)
    floor_col = BG * (0.34 + 0.16 * depth_fade)[..., None]
    img = img * (1 - floor[..., None]) + floor_col * floor[..., None]

    # 4. practical lights, with smeared floor reflections
    for (cx, cy, r, gain, kind) in (blooms or []):
        col = p["warm"] if kind == "warm" else p["acc"]
        amp = p["wg"] if kind == "warm" else p["ag"]
        bx = cx - pan * 0.85
        while bx < -0.3:
            bx += 1.3
        while bx > 1.3:
            bx -= 1.3
        light = _bloom(Xc, Yc, bx, cy, r, aspect=0.78)
        img += light[..., None] * col * gain * amp * 0.34
        refl = _bloom(Xc, Yc, bx, horizon + (horizon - cy) * 0.75, r * 0.9, aspect=0.42)
        img += (refl * floor)[..., None] * col * gain * amp * 0.13

    # 5. horizon seam — a thin line of light where wall meets floor
    seam = np.exp(-((Yc - horizon) / 0.004) ** 2)
    img += seam[..., None] * p["warm"] * 0.05

    # 6. vignette
    vig = 1.0 - 0.80 * ((Xc - 0.5) ** 2 * 1.6 + (Yc - 0.5) ** 2 * 1.3)
    img *= np.clip(vig, 0.12, 1.0)[..., None]

    # 7. static grain
    img += grain(h, w)[..., None] * 0.016

    # 8. gentle filmic shoulder, keeps highlights off pure white
    img = np.clip(img, 0.0, None)
    img = img / (img + 1.35) * 2.15   # shoulder on highlights only
    img = np.clip(img, 0, 1) ** 1.12  # keep the shadows deep
    return (np.clip(img, 0, 1) * 255).astype(np.uint8)


def write_stills(width=1600, height=900):
    os.makedirs(IMAGES, exist_ok=True)
    written = []
    for name, cfg in VARIANTS.items():
        arr = render(width, height, **cfg)
        path = os.path.join(IMAGES, f"{name}.png")
        Image.fromarray(arr).save(path, optimize=True)
        written.append(path)
        print(f"  {os.path.relpath(path, ROOT)}")
    return written


# --- the film -------------------------------------------------------------
# One continuous set of elements; the camera pans across them for the whole
# take. No cuts — a cut reads as a glitch when the viewer scrubs the film.
FILM_BANDS = [(0.10, 0.24, 0.85), (0.38, 0.50, 0.65), (0.62, 0.78, 0.95),
              (0.92, 1.04, 0.55), (1.22, 1.34, 0.75)]
FILM_BLOOMS = [(0.20, 0.44, 0.30, 0.85, "warm"), (0.55, 0.50, 0.26, 0.90, "warm"),
               (0.88, 0.46, 0.28, 0.75, "acc"), (1.18, 0.52, 0.24, 0.70, "warm")]

FILM_W, FILM_H, FILM_FPS, FILM_SECONDS = 1024, 576, 24, 15.0


def film_frame(args):
    """Render frame i of the film. Module-level so it can be pickled to a pool."""
    i, total, w, h = args
    t = i / (total - 1)
    ease = t * t * (3 - 2 * t)        # no jolt at either end of the scrub
    return render(
        w, h, t,
        horizon=0.72 - 0.10 * ease,   # the camera rises slowly
        pan=0.92 * ease,              # one continuous move
        zoom=1.00 + 0.07 * ease,      # a very slight push in
        bands=FILM_BANDS, blooms=FILM_BLOOMS,
    )


def encode_film(out_path, w=FILM_W, h=FILM_H, fps=FILM_FPS, seconds=FILM_SECONDS):
    """Render the film and pipe it straight into an all-keyframe H.264 encode.

    All-keyframe matters: scroll scrubbing seeks to arbitrary times constantly,
    and a file with long GOPs stutters or snaps to the nearest keyframe.
    """
    import multiprocessing as mp
    import subprocess

    ffmpeg = find_ffmpeg()
    total = int(seconds * fps)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)

    cmd = [
        ffmpeg, "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{w}x{h}", "-r", str(fps),
        "-i", "pipe:0", "-an",
        "-c:v", "libx264", "-preset", "slow", "-crf", "26",
        "-g", "1", "-keyint_min", "1", "-sc_threshold", "0",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        out_path,
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    jobs = [(i, total, w, h) for i in range(total)]
    workers = max(1, min(mp.cpu_count() - 1, 8))
    try:
        with mp.Pool(workers) as pool:
            for i, frame in enumerate(pool.imap(film_frame, jobs, chunksize=4)):
                proc.stdin.write(frame.tobytes())
                if i % 60 == 0:
                    print(f"  frame {i}/{total}")
    finally:
        proc.stdin.close()
        if proc.wait() != 0:
            raise SystemExit("ffmpeg failed")
    size = os.path.getsize(out_path) / 1e6
    print(f"  {total} frames, {seconds:g}s @ {fps}fps -> "
          f"{os.path.relpath(out_path, ROOT)} ({size:.1f} MB)")
    return out_path


def find_ffmpeg():
    """System ffmpeg if present, else the ffmpeg-static binary from website/."""
    from shutil import which
    env = os.environ.get("FFMPEG")
    if env and os.path.exists(env):
        return env
    found = which("ffmpeg")
    if found:
        return found
    vendored = os.path.join(ROOT, "website", "node_modules", "ffmpeg-static", "ffmpeg")
    if os.path.exists(vendored):
        return vendored
    raise SystemExit("no ffmpeg: install it, or run `npm install` inside website/")


# --- publish to the site ---------------------------------------------------
PUBLIC = os.path.join(ROOT, "website", "public")
FILM_RAW = os.path.join(ROOT, "assets", "videos",
                        "do-step-inn-living-scroll-background-placeholder.mp4")


def publish_web_assets(quality=82, max_width=1600):
    """Copy the master assets into the site as web-weight files.

    Stills become JPEG: these are large smooth gradients, and a 1600px PNG of
    one costs ~1.4 MB against ~150 KB as JPEG with no visible loss. The film is
    already all-keyframe H.264, so it is copied rather than re-encoded — a
    second lossy pass would only cost quality. Real Seedance output goes
    through scripts/swap-bg-video.sh instead.
    """
    import shutil

    img_out = os.path.join(PUBLIC, "img")
    os.makedirs(img_out, exist_ok=True)
    for name in sorted(os.listdir(IMAGES)):
        if not name.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
            continue
        im = Image.open(os.path.join(IMAGES, name)).convert("RGB")
        if im.width > max_width:
            im = im.resize((max_width, round(im.height * max_width / im.width)),
                           Image.LANCZOS)
        stem = os.path.splitext(name)[0]
        dst = os.path.join(img_out, f"{stem}.jpg")
        im.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
        print(f"  {os.path.relpath(dst, ROOT)} ({os.path.getsize(dst)/1e3:.0f} KB)")

    if os.path.exists(FILM_RAW):
        os.makedirs(PUBLIC, exist_ok=True)
        dst = os.path.join(PUBLIC, "bg.mp4")
        shutil.copy2(FILM_RAW, dst)
        print(f"  {os.path.relpath(dst, ROOT)} ({os.path.getsize(dst)/1e6:.1f} MB)")
        _encode_webm(FILM_RAW, os.path.join(PUBLIC, "bg.webm"))


def _encode_webm(src, dst, crf=36):
    """VP9 sibling for Chrome and Firefox; H.264 stays as the Safari fallback."""
    import subprocess

    subprocess.run(
        [find_ffmpeg(), "-y", "-loglevel", "error", "-i", src, "-an",
         "-c:v", "libvpx-vp9", "-crf", str(crf), "-b:v", "0",
         "-g", "1", "-keyint_min", "1", "-deadline", "good", "-cpu-used", "3",
         "-row-mt", "1", "-pix_fmt", "yuv420p", dst],
        check=True,
    )
    print(f"  {os.path.relpath(dst, ROOT)} ({os.path.getsize(dst)/1e6:.1f} MB)")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--stills", action="store_true", help="render the seven still images")
    ap.add_argument("--film", action="store_true", help="render and encode the background film")
    ap.add_argument("--web", action="store_true", help="publish master assets into website/public")
    ap.add_argument("--all", action="store_true")
    a = ap.parse_args()
    do_stills = a.all or a.stills or not (a.stills or a.film or a.web)
    do_film = a.all or a.film
    if do_stills:
        print("stills:")
        write_stills()
    if do_film:
        print("film:")
        encode_film(FILM_RAW)
    if a.all or a.web:
        print("web assets:")
        publish_web_assets()
