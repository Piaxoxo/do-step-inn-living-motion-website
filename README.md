# Hotel Do Step Inn Living — motion website

A scroll-driven cinematic landing page for **Hotel Do Step Inn Living** — Vite · React · GSAP ·
ScrollTrigger · Lenis.

> **Status: the site is built, in German, on the operator's real content and prices.** Two
> products (Mini-Apartment with its own kitchen, Apartmentzimmer with a shared one), the full
> flyer tariff, an interactive price calculator that produces a ready-to-send enquiry, and the
> real InnSider photos. Still open: photography of the rooms themselves, an English version, the
> other locations, and the legally required imprint and privacy policy — see
> [Offene Punkte](copy/brand-kit.md#offene-punkte).

Follows the skill at
[`.claude/skills/do-step-inn-living-motion-website/SKILL.md`](.claude/skills/do-step-inn-living-motion-website/SKILL.md).

---

## The idea

> Wohnen auf Zeit, im Scrollen erzählt.

A full-screen film sits fixed behind the page. Scroll position drives its `currentTime` frame by
frame, following one quiet day in a long-stay apartment: morning light, the rooms, the shared
kitchen, warm afternoon, and a closing enquiry. Claim: **Dein Zuhause auf Zeit.**

Do Step Inn Living lets furnished rooms and apartments in Vienna-Meidling for stays of weeks or
months — business trips, project work, study, interim housing — and to companies placing staff
long-term. It is not a hostel and not a city-break product; the site is written accordingly, and
in German.

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

## The price calculator

`website/src/lib/preis.js` holds the tariff logic, deliberately separate from the component so it
can be tested without a browser:

```bash
cd website && node ../scripts/test-preis.mjs
```

Full months at the monthly rate, whole weeks at the weekly rate, the remainder per night, and a
final cap so a staged stay is never dearer than paying per night. The operator's own tariff has
real jumps — six nights cost 288 €, seven cost 287 € — so the calculator surfaces them ("30 Nächte
kosten 398 € weniger als 29 — übernehmen?") instead of quietly smoothing someone else's prices.

The "Angebot anfragen" button opens a pre-filled mail to the operator with the whole breakdown. No
backend, nothing to maintain, and the enquiry arrives itemised.

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
- No invented hotel facts. Everything on the page traces to supplied material; where two sources
  disagree the page shows "zu prüfen" rather than picking a number, and the conflicts are listed
  under [Offene Punkte](copy/brand-kit.md#offene-punkte).
- The CTAs are the operator's real enquiry email and phone number. No booking-engine URL has been
  supplied, so no "book now" button is invented.
- Do Step Inn **Central** facts elsewhere in this repository belong to a different property and are
  not reused here.
- The stack is fixed: Vite, React (JS), GSAP, ScrollTrigger, Lenis.

---

## Still needed

From the operator, in rough order of importance — full detail under
[Offene Punkte](copy/brand-kit.md#offene-punkte):

1. **One approved price set on one basis.** The website texts are net, the flyer is gross, and the
   difference is not explained by tax. Weekly and monthly columns stay "zu prüfen" until this is settled.
2. **Apartment or hotel room?** The website sells apartments with their own kitchen; the flyer sells
   hotel rooms with a shared kitchen. This decides what the photography has to show.
3. Booking-engine URL, cancellation and deposit terms, minimum stay, check-in times.
4. Imprint and privacy policy for *Living*.
5. Real photography of the rooms.

Then: connect Higgsfield MCP and run the eight approved generations in `copy/asset-plan.md`.

Also worth fixing on the live site: the phone number links to `tel:202-555-0188`, a template
placeholder. It displays correctly but dials the wrong number.
