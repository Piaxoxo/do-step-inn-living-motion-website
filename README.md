# do-step-inn-living-motion-website

A scroll-driven cinematic landing page for **Hotel Do Step Inn Living** — Vite · React · GSAP ·
ScrollTrigger · Lenis.

> **Status: the site is built and runs on placeholder media.** Every asset is procedurally
> generated, not photographed, and every property fact on the page is a visible `TO VERIFY`
> placeholder. Swapping in the real GPT Image 2 / Seedance 2.0 assets is a file copy.

Follows the skill at
[`.claude/skills/do-step-inn-living-motion-website/SKILL.md`](../.claude/skills/do-step-inn-living-motion-website/SKILL.md).

---

## The idea

> A modern hotel stay revealed through scroll, from arrival to living.

A full-screen film sits fixed behind the page. Scroll position drives its `currentTime` frame by
frame, walking the visitor through one continuous journey: arrival, the room, shared living, social
evening, the city, and a final booking moment. Creative north star: **Stay somewhere that feels alive.**

---

## Run it

```bash
cd website
npm install
npm run dev                  # http://localhost:5173
npm run build -- --base=./   # portable static build
npx serve dist               # preview over HTTP, never file://
```

Dev-only console hooks: `window.__bgv` (the film), `window.__lenis`, `window.__ST`.

---

## Structure

```txt
do-step-inn-living-motion-website/
├── assets/
│  ├── images/       # master stills (currently procedural placeholders)
│  ├── references/   # supplied direction references — empty
│  └── videos/       # raw film (the placeholder here is gitignored, regenerate it)
├── copy/            # brand kit, asset plan, prompts, website brief
├── scripts/
│  ├── generate_placeholder_media.py   # the placeholder renderer
│  └── swap-bg-video.sh                # all-keyframe re-encode for the real film
└── website/         # the Vite + React app
   ├── public/       # bg.mp4, bg.webm, img/*.jpg
   └── src/          # App.jsx, motion.js, styles.css, data/stays.js
```

---

## The placeholder media

Higgsfield MCP is not connected, so no GPT Image 2 or Seedance 2.0 asset exists yet. Rather than
block the build, `scripts/generate_placeholder_media.py` renders the media from one shared scene
model — abstract architectural-light compositions in the brand palette, so the stills and the film
belong to the same visual world. They are deliberately abstract: they do not imitate photography,
and nothing in them makes a claim about the property.

```bash
pip install pillow numpy
python3 scripts/generate_placeholder_media.py --all   # stills + film + web assets
python3 scripts/generate_placeholder_media.py --web   # just re-publish into website/public
```

The film is rendered as one continuous camera move — no cuts, static grain, even exposure — and
encoded **all-keyframe**, which is what makes scrubbing land on an exact frame instead of snapping to
the nearest keyframe. It ships as VP9 (`bg.webm`, preferred) with H.264 (`bg.mp4`) behind it for Safari.

### Swapping in the real assets

1. Drop the approved stills into `assets/images/` at the names in `copy/asset-plan.md`.
2. Drop the Seedance film at `assets/videos/do-step-inn-living-scroll-background-raw.mp4`.
3. Encode it: `scripts/swap-bg-video.sh assets/videos/do-step-inn-living-scroll-background-raw.mp4`
   (writes both `website/public/bg.mp4` and `bg.webm`).
4. Publish the stills: `python3 scripts/generate_placeholder_media.py --web`.

No code changes — the paths are identical.

---

## What is verified in the browser

Checked in headless Chromium at 1440 / 768 / 390 px:

- scroll 0 → 100 % maps linearly onto film time 0 → 14.95 s, forwards and backwards
- the pinned `#stay` reveal resolves its lines one at a time across the pin
- the progress readout tracks scroll
- no horizontal overflow at any of the three widths
- `npm run build -- --base=./` passes

Known environment note: Google Fonts is blocked by this container's egress policy, so local
screenshots render in fallback faces. That is an environment limit, not a site bug.

---

## Rules this project runs on

- All website text is HTML/CSS. Nothing is baked into images or video.
- No invented hotel facts. Room names, capacities, amenities, address, contact, transport and
  policies render as visible `[TO VERIFY: …]` markers until the operator supplies them, and the
  booking CTA stays inert rather than pointing at a guessed URL.
- Do Step Inn **Central** facts elsewhere in this repository belong to a different property and are
  not reused here.
- The stack is fixed: Vite, React (JS), GSAP, ScrollTrigger, Lenis.

---

## Still needed

Blocking, from the operator: the address and contact details, the official room categories with
capacities and amenities, the booking engine URL, and whether rates may be shown at all. The full
list is in [`copy/brand-kit.md` §8](copy/brand-kit.md#8-fact-status) — including the open question of
whether Living is an apartment product or a hotel product, which would change the copy and the two
room cards.

Then: connect Higgsfield MCP and run the eight approved generations in `copy/asset-plan.md`.
