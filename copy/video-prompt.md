# Background film — Seedance 2.0 (Higgsfield MCP)

One generation. Runs only after `hero-room.png`, `lobby-living-reference.png`, and
`social-night-reference.png` are approved — those three are passed as visual references.

- Output (raw): `assets/videos/do-step-inn-living-scroll-background-raw.mp4`
- Output (production): `website/public/bg.mp4` (all-keyframe H.264, see `scripts/swap-bg-video.sh`)
- 16:9 · 12–18 s · high quality · no audio · no text

---

## Why this film is different from a normal hero video

It is never played. It is **scrubbed**: scroll position maps to `currentTime`, forward and backward, at
whatever speed the reader moves. That imposes hard constraints:

- one continuous camera language — cuts read as glitches when scrubbed
- slow, even motion — fast motion turns into strobing under a fast scroll
- stable exposure — flicker looks like a broken player
- no motion the reader can "lose" — the frame must be readable at any single paused instant
- consistent negative space — text sits on top of *every* frame, not just the first

---

## Phase map

The film has four slow phases. The site's sections are timed against them (see `website-brief.md`).

| Phase | Approx. progress | On screen | Section overhead |
|---|---|---|---|
| 1 · Arrival / room reveal | 0.00 – 0.28 | calm modern room, hero framing, wide negative space | `#home`, `#stay` |
| 2 · Living / shared space | 0.28 – 0.55 | drift through detail into a shared living atmosphere | `#living`, `#rooms` |
| 3 · Social / night | 0.55 – 0.82 | warmer light, evening mood, subtle city-night energy | `#social`, `#vienna` |
| 4 · Final calm | 0.82 – 1.00 | settles to a clean, quiet frame with open space | `#cta` |

Frame 0 must be the strongest single frame in the film — it is also the poster image and the first thing
a visitor sees before scrolling.

---

## Final prompt

```txt
Create a cinematic scroll-driven background video for the Hotel Do Step Inn Living website.

This video will be used as a full-screen website background controlled by scroll progress with GSAP ScrollTrigger, Lenis, and frame-by-frame video scrubbing. Motion must be slow, stable, smooth, and readable when the user manually scrolls.

Use the approved Hotel Do Step Inn Living reference images as the visual language.

Sequence:
1. Start with a calm modern hotel room or arrival scene, framed as the hero image with strong negative space for large typography.
2. Move slowly through architectural or room details with one continuous cinematic camera language.
3. Transition naturally into a shared living or common-space atmosphere.
4. Progress into a warmer social / evening mood with subtle city-night energy.
5. End on a calm, visually clean final frame with enough negative space for the booking CTA.

Visual style:
- modern editorial hospitality campaign
- youthful urban European city-stay energy
- deep navy / blue foundation
- bold restrained pink accents
- warm practical and nightlife lighting
- realistic architecture and materials
- polished but approachable
- cinematic depth

Important constraints:
- No text inside the video
- No fake hotel logos or signage
- No invented room names, prices, ratings, or amenities
- No fast cuts
- No shaky camera
- No extreme zooms
- No generic five-star luxury aesthetic
- No chaotic party scenes
- Keep enough negative space for website text and cards
- Maintain visual continuity across all spaces

Duration: 12 to 18 seconds.
Aspect ratio: 16:9.
Quality: high.
```

---

## Review checklist

- [ ] one continuous camera language, no hard cuts
- [ ] scrubs cleanly backwards as well as forwards
- [ ] frame 0 works as a still hero poster
- [ ] final frame is calm and has room for the booking CTA
- [ ] exposure is stable end to end, no flicker
- [ ] no text, no logo, no signage in any frame
- [ ] nothing in frame makes a factual claim about the property
- [ ] duration between 12 and 18 s, 16:9
- [ ] saved to `assets/videos/do-step-inn-living-scroll-background-raw.mp4`

## After approval

```bash
scripts/swap-bg-video.sh "assets/videos/do-step-inn-living-scroll-background-raw.mp4"
```

Then confirm in the browser console:

```js
window.__bgv.readyState === 4
window.__bgv.duration
```
