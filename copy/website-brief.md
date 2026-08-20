# Website brief — Hotel Do Step Inn Living

Single-page, scroll-driven cinematic landing page.
Stack: **Vite + React (JS) + GSAP + ScrollTrigger + Lenis**. No TypeScript, no other framework.

One idea drives the whole page:

> **A modern hotel stay revealed through scroll, from arrival to living.**

---

## 1. Page structure

Eight blocks, one continuous scroll, one fixed film behind all of them.

| # | ID | Working title | Job | Media |
|---:|---|---|---|---|
| 1 | `#home` | Arrival | Name the brand, land the north star, offer the booking CTA | film phase 1 |
| 2 | `#stay` | The room | Pinned editorial reveal — what staying here feels like | film phase 1→2 |
| 3 | `#living` | Living | Shared spaces, the social shift | `lobby-living-reference.png`, `common-space.png` |
| 4 | `#rooms` | Rooms | Stay formats as editorial cards | `room-private.png`, `room-shared.png` |
| 5 | `#social` | Nights | Evening warmth, drinks, people | `social-night-reference.png` |
| 6 | `#vienna` | The city | The property as a base for Vienna | `city-lifestyle.png` |
| 7 | `#cta` | Book | The single strongest booking moment | film phase 4 |
| 8 | `footer` | — | Dissolve to navy, brand signature, legal | — |

Fixed chrome: minimal top nav (wordmark + anchor links + booking CTA), and a thin mono scroll-progress
indicator in the brand pink.

---

## 2. The scroll story

The film and the copy tell the same story at the same time. Nothing on the page contradicts the frame
behind it.

**0% — Arrival.** Full-bleed calm room frame. Oversized headline, one supporting line, two CTAs.
A small mono cue invites the scroll. The reader has not moved yet and already knows the tone.

**~12% — The room.** The section pins. Lines of an editorial statement resolve one at a time out of blur
as the film drifts through room detail. This is the quietest, most confident moment on the page.

**~30% — Living.** The pin releases into shared space. Layout opens from centred type into asymmetric
editorial cards. The film moves out of the private room and into the common area — private becomes shared.

**~45% — Rooms.** Two large cards. Image-forward, oversized names, small mono metadata.
This is the practical beat: what can I actually book? Every fact here comes from verified data or shows
a placeholder.

**~62% — Nights.** Colour temperature turns. Pink and warm orange come forward, the film reaches its
evening phase, the copy shifts from "where you sleep" to "who you meet".

**~78% — The city.** The frame widens to the street. The hotel becomes a base rather than a destination.
No distances or landmark claims until they are verified.

**~90% — Book.** The film settles into its final calm frame. One headline, one line, one primary CTA.
Nothing else competes.

**100% — Footer.** A gradient dissolves the film into flat navy. The wordmark, then the legal small print.

---

## 3. Copy deck (draft — no factual claims)

Every line below is brand voice only. Anything factual is a bracketed placeholder that must be replaced
with verified content before launch.

**`#home`**
- eyebrow: `HOTEL DO STEP INN LIVING`
- headline: **Stay somewhere that feels alive.**
- support: A modern city stay — sleep well, meet people, step straight out.
- primary CTA: `Book your stay` → `[TO VERIFY: booking URL]`
- secondary CTA: `Explore rooms` → `#rooms`

**`#stay`** — pinned reveal, one word/line at a time:
- `Sleep well.` / `Step out.` / `Your base for the city.`

**`#living`**
- title: **Where the stay opens up.**
- body: Shared rooms to sit in, cook in, work in, or wait out the afternoon with someone you just met.
- chips: `[TO VERIFY: shared-space facilities]`

**`#rooms`**
- title: **Where you'll sleep.**
- cards: see the data contract in §6 — names, capacity, and amenities are placeholders until verified.
- note: no prices anywhere until `[TO VERIFY: whether rates may be displayed]` is answered.

**`#social`**
- title: **Check in. Go out.**
- body: From first coffee to last drink, the evening starts downstairs.

**`#vienna`**
- title: **The city starts at the door.**
- body: `[TO VERIFY: location, transport links, walking times, named landmarks]`
- Until verified, this section runs on mood and imagery only — no numbers, no place names.

**`#cta`**
- headline: **Ready when you are.**
- support: Pick your dates. The rest is easy.
- primary CTA: `Book your stay` · secondary: `See rooms`

**`footer`**
- wordmark, `[TO VERIFY: address]`, `[TO VERIFY: phone]`, `[TO VERIFY: email]`,
  `[TO VERIFY: legal links]`, `[TO VERIFY: social handles]`

---

## 4. Layer architecture

| Element | z-index | Role |
|---|---:|---|
| `.bg-video` / `#bgv` | 0 | fixed full-screen video, `object-fit: cover`, scrubbed by scroll |
| `.bg-tint` | 1 | contrast layer that keeps copy at AA over any frame |
| `.grain` / `.ambient-shapes` | 2 | very subtle editorial texture |
| `#root` / `.page` | 10 | React page sections |
| `.floating-ui` | 20 | optional room / booking cards |
| `.custom-cursor` | 100 | optional, desktop only |

The footer uses a gradient dissolve into `--bg`, never a hard black overlay.

---

## 5. Motion spec

**Scroll scrubbing** — page scroll progress maps linearly to `bgVideo.currentTime`, guarded so a sub-frame
delta never triggers a seek:

```js
const t = progress * (bgVideo.duration - 0.05);
if (Math.abs(t - lastVideoT) > 0.008) { bgVideo.currentTime = t; lastVideoT = t; }
```

The video is `muted`, `playsInline`, `preload="auto"`, `poster="/img/hero-room.png"`, and paused for its
whole life. Seeking only works smoothly because the file is re-encoded to all keyframes.

**Lenis + GSAP** — Lenis drives the ticker, ScrollTrigger updates from Lenis, lag smoothing off:

```js
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

**Pinned reveal** — `#stay` pins for `+= innerHeight * 1.8`, `scrub: 1`,
`invalidateOnRefresh: true`; each line resolves from `blur(8px)` / `translateY(18px)` / `opacity 0.12`
to clear across its own slice of progress.

**Section entrances** — everything else is a short fade + rise on `start: "top 80%"`, `once: true`.
No parallax stacking, no horizontal scroll, no scroll-jacking.

**Dev hooks** (development only): `window.__lenis`, `window.__ST`, `window.__bgv`.

---

## 6. Data contract

`website/src/data/stays.js` — placeholders only until verified:

```js
export const stays = [
  {
    name: "[TO VERIFY: official room name]",
    desc: "[TO VERIFY: verified short description]",
    capacity: "[TO VERIFY: capacity]",
    image: "/img/room-private.png",
  },
  {
    name: "[TO VERIFY: official room name]",
    desc: "[TO VERIFY: verified short description]",
    capacity: "[TO VERIFY: capacity]",
    image: "/img/room-shared.png",
  },
];
```

Rules: large image, oversized name, short description, small mono metadata, one clear CTA, hover lift or
crop shift. No invented pricing or amenities. The card must stay readable over the film.

---

## 7. Responsive and accessibility

- **Touch / ≤768px:** hide `.bg-video`, show a fixed `hero-room.png` poster; drop the pin; stack room
  cards to one column; disable the custom cursor; keep the booking CTA reachable but unobtrusive.
- **`prefers-reduced-motion: reduce`:** poster instead of film, no pin, no reveal animations, instant anchors.
- Oversized type uses `clamp()`; the page never scrolls horizontally.
- Every section is reachable by keyboard; anchor links have visible focus rings in `--accent`.
- All copy over the film clears WCAG AA (4.5:1) against the tinted background.
- Images carry descriptive `alt`; the film is decorative and `aria-hidden`.

---

## 8. Build and preview

```bash
npm create vite@latest website -- --template react
cd website && npm install && npm install gsap lenis
npm run dev
npm run build -- --base=./
npx serve dist      # preview over HTTP, never file://
```

---

## 9. Definition of done

- [ ] `copy/brand-kit.md`, `asset-plan.md`, `image-prompts.md`, `video-prompt.md`, `website-brief.md` exist
- [ ] all seven approved images exist in `assets/images/`
- [ ] raw Seedance film exists in `assets/videos/`
- [ ] all-keyframe film exists at `website/public/bg.mp4`
- [ ] `npm run dev` runs; GSAP + ScrollTrigger registered; Lenis smooth scroll works
- [ ] the film scrubs smoothly in both directions
- [ ] hero copy is readable over every frame it sits on
- [ ] the pinned reveal works and releases cleanly
- [ ] room cards are readable and responsive
- [ ] mobile poster fallback works; reduced-motion path works
- [ ] the booking CTA is unmistakable
- [ ] `npm run build -- --base=./` passes
- [ ] **zero unverified hotel facts on the page** — every placeholder replaced or removed
- [ ] no text baked into any image or video
- [ ] every asset saved at its planned path
