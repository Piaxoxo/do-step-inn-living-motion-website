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

## Verifying it

A scroll-driven page fails quietly — a pin can print itself over the next section, a reveal can stick
at `opacity: 0`, the film can stop following the scroll — and the build still passes.
`scripts/verify-motion.cjs` drives a real browser and asserts the behaviour. It caught both of those
bugs during the first build.

```bash
cd website && npm run dev                                    # one shell
npx --yes playwright@latest node ../scripts/verify-motion.cjs   # another
```

Playwright is deliberately not a dependency of this project — fetch it on demand. `URL` and
`CHROMIUM` override the target and the browser binary. It exits non-zero on failure.

15 checks, all passing: the film loads and exposes its dev hooks; scrubbing is monotonic forwards
*and* backwards and spans the whole film; the pinned reveal resolves and does not bleed into the
next section; hero copy clears WCAG AA; no horizontal overflow at 1440/1024/768/390/320 px; no page
errors or failed same-origin requests; touch falls back to the poster with a nav that fits; and
reduced-motion disables smooth scroll and the film while leaving every line visible.

### Before launch: self-host the fonts

`index.html` currently pulls Inter, Space Grotesk and Space Mono from Google Fonts. For an Austrian
property that is worth changing: hotlinking transmits every visitor's IP to Google, which a German
regional court found to be a GDPR violation in 2022, and the same reasoning applies here. Download
the three families, serve them from `website/public/fonts/`, and replace the `<link>` with local
`@font-face` rules. It also removes a render-blocking third-party request.

(This could not be done in the build environment — `fonts.gstatic.com` is blocked by its egress
policy, which is also why local screenshots render in fallback faces.)

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
