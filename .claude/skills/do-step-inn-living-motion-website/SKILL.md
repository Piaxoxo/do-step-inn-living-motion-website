---
name: do-step-inn-living-motion-website
description: >-
  Production workflow and build rules for a scroll-driven cinematic website for Hotel Do Step Inn Living,
  built with Claude Code, Higgsfield MCP, GPT Image 2, Seedance 2.0, Vite, React, GSAP, Lenis, and
  ScrollTrigger. Use this skill whenever working on the Do Step Inn Living landing page, AI-generated
  hospitality imagery, cinematic hotel walkthrough video, room and lifestyle visuals, scroll-scrubbed
  background video, React implementation, video encoding, motion timing, editorial hotel UI, or asset
  replacement workflow. Triggers: do step inn living, hotel website, hostel website, hospitality website,
  motion website, scroll-driven website, Higgsfield MCP, GSAP, Lenis, ScrollTrigger, Seedance 2.0, GPT Image 2.
---

# Hotel Do Step Inn Living scroll-driven motion website

A single-page, scroll-driven cinematic landing page for **Hotel Do Step Inn Living**.

The final website should feel like a contemporary hospitality campaign and editorial lifestyle experience, not a generic hotel booking template. The main visual hook is a cinematic hotel film used as a full-screen background video. As the visitor scrolls, the video is scrubbed frame-by-frame with GSAP ScrollTrigger and Lenis, guiding the viewer through a sequence of spaces and moods: arrival, room, shared living, social atmosphere, and a final booking moment.

The workflow is designed for **Claude Code** working in a local project folder. Claude Code should create the project structure, generate or request media assets through Higgsfield MCP, organize everything locally, build the React/Vite site, encode the final video for scroll scrubbing, and verify the implementation.

The site should be built around one strong idea:

> A modern hotel stay revealed through scroll, from arrival to living.

The page can include multiple room and lifestyle visuals in cards and supporting sections, but the scroll-driven background film should remain focused on one coherent guest journey.

---

## Project facts

- **Project type:** Scroll-driven cinematic hospitality landing page
- **Brand:** Hotel Do Step Inn Living
- **Product focus:** Modern city stay, rooms, shared spaces, social atmosphere, practical comfort
- **Core interaction:** Scroll-scrubbed cinematic background video
- **Main video concept:** A smooth guest journey through the hotel, evolving from arrival into room, common areas, social moments, and evening atmosphere as the user scrolls
- **Audience:** city travelers, young adults, couples, solo travelers, groups, digital travelers, budget-conscious guests, design-conscious hospitality customers
- **Website goal:** Present Do Step Inn Living as youthful, modern, social, visually distinctive, and easy to book
- **Build environment:** Claude Code, local project folder
- **Stack:** Vite + React + GSAP + Lenis + ScrollTrigger
- **Image model:** GPT Image 2 through Higgsfield MCP
- **Video model:** Seedance 2.0 through Higgsfield MCP
- **Background video format:** 16:9, slow, cinematic, all-keyframe H.264 after encoding

---

## Creative north star

Use this positioning as the creative north star:

> **Stay somewhere that feels alive.**

The website should not only show accommodation. It should communicate the feeling of arriving, settling in, meeting people, having a drink, resting, and experiencing the city from a modern, social base.

Claude Code should operate like a production assistant: planning the brand system, preparing assets, generating approved media, organizing files, implementing scroll motion, debugging, and preparing a polished final website.

---

## Suggested project root

Suggested folder name:

```txt
do-step-inn-living-motion-website/
```

Recommended structure:

```txt
do-step-inn-living-motion-website/
├── assets/
│  ├── images/
│  │  ├── hero-room.png
│  │  ├── lobby-living-reference.png
│  │  ├── social-night-reference.png
│  │  ├── room-private.png
│  │  ├── room-shared.png
│  │  ├── common-space.png
│  │  └── city-lifestyle.png
│  ├── references/
│  │  ├── do-step-inn-ui-reference.png
│  │  ├── do-step-inn-hero-reference.png
│  │  ├── do-step-inn-lifestyle-reference.png
│  │  └── do-step-inn-video-master-reference.png
│  └── videos/
│     ├── do-step-inn-living-scroll-background-raw.mp4
│     └── do-step-inn-living-scroll-background-all-keyframe.mp4
├── copy/
│  ├── brand-kit.md
│  ├── asset-plan.md
│  ├── image-prompts.md
│  ├── video-prompt.md
│  └── website-brief.md
├── scripts/
│  └── swap-bg-video.sh
└── website/
   ├── index.html
   ├── package.json
   ├── vite.config.js
   ├── public/
   │  ├── bg.mp4
   │  └── img/
   └── src/
      ├── App.jsx
      ├── main.jsx
      ├── styles.css
      ├── motion.js
      └── data/
         └── stays.js
```

Rules:

- Do not place generated assets randomly in downloads or temporary folders.
- Every final media asset must be saved inside the project structure.
- Keep raw AI outputs in `assets/` and production-ready site files in `website/public/`.
- Keep all prompts in `copy/` so the workflow can be reused.
- Keep real hotel text, prices, room names, policies, amenities, and addresses out of generated media; use HTML/CSS content instead.

---

## Required stack

Use this stack unless the user explicitly changes it:

- Vite
- React
- JavaScript, not TypeScript, unless explicitly requested
- GSAP
- `gsap/ScrollTrigger`
- Lenis for smooth scrolling
- CSS variables for brand tokens
- Higgsfield MCP for GPT Image 2 and Seedance 2.0 generations
- `ffmpeg` for all-keyframe H.264 video encoding

Install expected dependencies inside `website/`:

```bash
npm create vite@latest website -- --template react
cd website
npm install
npm install gsap lenis
npm run dev
```

Portable static build:

```bash
npm run build -- --base=./
```

Preview production build over HTTP, not `file://`:

```bash
npx serve dist
```

---

## Claude Code operating rules

Claude Code should behave like a careful production assistant, not an uncontrolled generator.

Before generating media or spending credits, Claude Code must:

1. Read this skill.
2. Create or inspect the project folder.
3. Create the copy files and asset plan.
4. Return a short plan listing exactly what it intends to generate.
5. Ask the user for explicit approval before running any Higgsfield MCP generation tool (`generate_image`, `generate_video`).

Claude Code must not:

- Generate random assets without a plan.
- Use credits before approval.
- Generate more variations than requested.
- Open unrelated browser tabs or apps.
- Bake website text into images or video.
- Invent room names, prices, amenities, addresses, ratings, awards, or policies.
- Replace the requested React/Vite/GSAP/Lenis/ScrollTrigger stack with another framework.
- Build the website before the key media plan exists.

Claude Code should:

- Keep the workflow organized in files.
- Save prompts and generation notes in `copy/` before running generations.
- Use consistent naming.
- Download every Higgsfield MCP result into the correct `assets/` path immediately after generation.
- Build the site after the core media assets are ready.
- Run the app locally and verify it.
- Run a production build before considering the project complete.

### Higgsfield MCP usage notes

- Use the `generate_image` tool with GPT Image 2 for still images.
- Use the `generate_video` tool with Seedance 2.0 for the background video.
- Check credit balance before large generation batches if available.
- Image-to-video generations should reference approved room and lifestyle images.
- If a generation job is asynchronous, poll its status and report progress instead of silently waiting.

---

## Brand identity

Use the Do Step Inn Living brand kit as the source of truth. If `copy/brand-kit.md` exists, read it before editing the site or generating media.

### Core identity

- **Name:** Hotel Do Step Inn Living
- **Positioning:** A modern, youthful, social city stay with an editorial lifestyle feel
- **Tone:** bold, warm, contemporary, urban, energetic, direct, welcoming
- **Visual character:** editorial magazine layouts, oversized typography, striking contrast, strong image crops, nightlife warmth, playful but polished hospitality energy
- **Avoid:** generic corporate hotel design, sterile beige luxury, old-fashioned travel imagery, crowded booking-engine aesthetics, excessive glassmorphism, clichéd stock-photo hospitality

### Brand personality

Do Step Inn Living should feel like part hotel, part social hub, part city-lifestyle editorial.

The brand should communicate:

- urban energy
- accessible comfort
- social atmosphere
- independence and flexibility
- stylish but unpretentious design
- memorable city stays
- a place to sleep, meet, relax, and go out from

---

## Visual reference direction

Translate the brand into a bold editorial hospitality landing page:

- oversized typography
- dark navy / deep blue foundations
- strong pink accents
- warm nightlife photography
- expressive room and drink photography
- large editorial image crops
- magazine-style composition
- strong contrast between calm room scenes and energetic social scenes
- layered cards and floating details only where useful
- clean hierarchy with plenty of breathing room
- no generic travel-site gradients

The website should feel young, cool, urban, and social-media ready.

---

## Brand tokens

Recommended CSS variables:

```css
:root {
  --bg: #0B1020;
  --bg-2: #11172B;
  --surface: #171D32;
  --surface-2: #202741;
  --surface-soft: rgba(23, 29, 50, 0.78);
  --text: #F7F4F2;
  --muted: #B6B4BE;
  --accent: #FF3B8D;
  --accent-2: #FF7A3D;
  --blue: #243DFF;
  --line: rgba(255,255,255,0.12);
  --success: #67D7A0;
}
```

Rules:

- Pink is the primary brand accent for CTAs, highlights, tags, and progress.
- Deep blue / navy should carry most large background areas.
- Warm orange can support nightlife, drinks, sunset, and social moments.
- White / warm off-white is the main text color.
- Avoid large generic gradients unless they support a specific transition.
- Avoid excessive neon or nightclub clichés.

---

## Typography

Use modern sans-serif typography with strong editorial scale.

Recommended:

- **Headings:** `Space Grotesk` or `Archivo Black`
- **Body:** `Inter`
- **Labels / room data / counters:** `Space Mono` or `JetBrains Mono`

Recommended CSS variables:

```css
:root {
  --font: "Inter", system-ui, sans-serif;
  --font-head: "Space Grotesk", system-ui, sans-serif;
  --font-mono: "Space Mono", monospace;
}
```

Use large heading typography for:

- nav logo
- hero statement
- section titles
- room category titles
- social/lifestyle statements
- final CTA
- footer brand wordmark

Use mono typography for:

- room metadata
- guest counts
- amenity chips
- small labels
- scroll progress
- technical development labels

---

## Media asset plan

The site needs five asset groups.

### 1. Hero room image

File:

```txt
assets/images/hero-room.png
```

Purpose:

- Defines the main visual language of the hotel.
- Used as hero poster, loading image, and master style reference.
- Can be copied into `website/public/img/`.

Visual direction:

- modern hotel room
- warm practical lighting
- clean bedding
- urban editorial composition
- deep blue and warm accent tones where appropriate
- subtle lived-in details without clutter
- natural depth
- no baked-in text
- no fake logos

### 2. Lobby / shared living reference

File:

```txt
assets/images/lobby-living-reference.png
```

Purpose:

- Defines the social and shared-space look.
- Acts as a key reference for the middle of the scroll film.

Visual direction:

- modern common area
- relaxed seating
- social but not overcrowded
- warm practical lighting
- young urban hospitality atmosphere
- editorial framing
- no text

### 3. Social / night reference

File:

```txt
assets/images/social-night-reference.png
```

Purpose:

- Defines the evening atmosphere.
- Supports bar, drinks, social, nightlife, or city-energy sections.

Visual direction:

- warm nightlife photography
- expressive drinks
- strong shadows
- pink / navy accent environment
- candid energy without identifiable real people if unnecessary
- premium editorial framing

### 4. Room and lifestyle catalog images

Files:

```txt
assets/images/room-private.png
assets/images/room-shared.png
assets/images/common-space.png
assets/images/city-lifestyle.png
```

Purpose:

- Used in room cards and editorial content sections.
- Gives the site multiple visual entry points while keeping the hero film coherent.

Rules:

- Use consistent camera language and lighting.
- Do not invent final room-category names if official names are not provided.
- Keep room text, capacity, rates, and amenities in HTML/CSS.
- Avoid stock-photo clichés.

### 5. Final scroll video background

Raw file:

```txt
assets/videos/do-step-inn-living-scroll-background-raw.mp4
```

Production file:

```txt
website/public/bg.mp4
```

Purpose:

- Full-screen fixed video background.
- Scrubbed by scroll progress.
- Main visual experience of the site.

Video concept:

A coherent cinematic hotel journey starts with a calm hero room or arrival scene. As the user scrolls, the sequence moves smoothly through the space: room details, corridor or transition, shared living area, social atmosphere, evening mood, and a final calm frame with enough negative space for the booking CTA. The film should feel like one continuous hospitality campaign, not a montage of unrelated clips.

---

## Image generation model rules

Use **GPT Image 2** through Higgsfield MCP for still images.

Default image settings:

- aspect ratio: 16:9 for hero and section images
- quality: high
- style: realistic editorial hospitality photography
- no text baked into images
- no fake hotel signage unless specifically approved
- no fake awards, ratings, prices, or amenity claims
- consistent blue / pink / warm-night visual language
- realistic architecture and furniture

Before generation, write prompts into:

```txt
copy/image-prompts.md
```

Generate only the approved list of images. Do not generate extra alternatives unless requested.

---

## Recommended image prompts

### Hero room prompt

```txt
Create a premium editorial hero image for Hotel Do Step Inn Living, a modern youthful urban hospitality brand.

The main subject is a contemporary hotel room shown in a confident wide composition. The room should feel clean, comfortable, practical, stylish, and lived-in without looking staged or luxurious in a generic five-star way.

Style: modern hospitality campaign, editorial magazine photography, youthful European city-stay energy, bold but approachable design.

Composition: wide 16:9 frame, strong architectural lines, one clear visual focal area, enough negative space for large website typography. Use warm bedside or practical ambient lighting with deep navy shadows and restrained pink or warm accent details where natural.

Mood: welcoming, urban, calm, cool, design-conscious.

Restrictions: no baked-in text, no fake hotel logos, no fake signage, no people as the dominant subject, no luxury cliché styling, no excessive beige, no generic stock-photo look.

Aspect ratio: 16:9. High quality.
```

### Shared living reference prompt

```txt
Create a cinematic editorial image for Hotel Do Step Inn Living showing a modern shared lounge or common living space.

The space should feel social, youthful, relaxed, practical, and visually distinctive. Show comfortable seating, warm light, small hospitality details, and an atmosphere that suggests people can meet, work, relax, or prepare for a night out.

Style: editorial lifestyle hotel campaign, contemporary urban hostel/hotel energy, premium but accessible.

Composition: wide 16:9, layered depth, strong image crop, dark blue foundation with warm practical light and subtle pink accents.

Restrictions: no text, no fake logos, no crowded party scene, no generic luxury lobby, no unrealistic architecture.
```

### Social night prompt

```txt
Create an expressive editorial nightlife image for Hotel Do Step Inn Living.

Focus on warm social atmosphere, a stylish drink moment, dark blue surroundings, pink highlights, reflections, candid energy, and a sense of starting or ending a night in the city.

Style: modern magazine photography, youthful European nightlife, premium social-media campaign, cinematic but natural.

Restrictions: no readable text, no fake logos, no nightclub cliché lasers, no excessive neon, no obvious stock-photo posing.

Aspect ratio: 16:9. High quality.
```

### Room / lifestyle card prompt template

```txt
Create a premium editorial image for Hotel Do Step Inn Living.

Subject: [ROOM OR LIFESTYLE SUBJECT].

Use the same visual language as the approved hero image: modern urban hospitality, strong editorial framing, deep blue foundations, warm practical light, restrained pink accents, realistic materials, and an approachable youthful mood.

Composition: clean enough for use inside a website card, clear focal point, realistic proportions, no embedded copy.

Restrictions: no text, no fake logos, no invented prices, no fake amenity signage, no busy stock-photo styling.

Aspect ratio: 16:9. High quality.
```

---

## Video generation model rules

Use **Seedance 2.0** through Higgsfield MCP for the final background video.

Default video settings:

- aspect ratio: 16:9
- duration: 12 to 18 seconds
- quality: high
- no dialogue
- no text
- no fake hotel logos
- no fast cuts
- no shaky camera
- no heavy flicker
- no abrupt scene changes
- designed for scroll scrubbing, not normal autoplay

The video should be generated only after the approved hero and lifestyle reference images exist.

Before generation, write the final prompt into:

```txt
copy/video-prompt.md
```

---

## Final Seedance 2.0 background video prompt

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

## Background video requirements

The main background video must be designed for a scroll-driven website.

### Raw generated file

```txt
assets/videos/do-step-inn-living-scroll-background-raw.mp4
```

### Final scrubbed file

```txt
website/public/bg.mp4
```

### Creative direction

The video should feel like one continuous hospitality campaign with four slow phases:

1. **Arrival / room reveal**
2. **Living / shared space**
3. **Social / night atmosphere**
4. **Final booking moment**

Constraints:

- 16:9
- 12–18 seconds
- slow and smooth
- suitable for scroll scrubbing
- enough negative space for text overlays
- no readable text baked into the video
- no third-party marks
- no busy background
- no fast cuts
- no heavy flicker
- visual continuity must remain strong

---

## Re-encode the video for scroll scrubbing

Raw AI-generated MP4 files often seek poorly during scroll scrubbing. Re-encode the final background video to all-keyframe H.264.

Create this helper script:

```bash
mkdir -p scripts
cat > scripts/swap-bg-video.sh <<'SCRIPT'
#!/usr/bin/env bash
set -euo pipefail

INPUT="$1"
OUTPUT="website/public/bg.mp4"

mkdir -p website/public

ffmpeg -y -i "$INPUT" -an -c:v libx264 -preset slow -crf 18 \
  -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p \
  -movflags +faststart "$OUTPUT"

echo "Encoded all-keyframe background video to $OUTPUT"
SCRIPT

chmod +x scripts/swap-bg-video.sh
```

Run:

```bash
scripts/swap-bg-video.sh "assets/videos/do-step-inn-living-scroll-background-raw.mp4"
```

After swapping, confirm in the browser console:

```js
window.__bgv.readyState === 4
window.__bgv.duration
```

---

## Website section plan

### 1. `#home` — Hero / first impression

Purpose:

- Establish Hotel Do Step Inn Living immediately.
- Start on the calmest, strongest frame of the background film.
- Use very large editorial typography.
- Show a clear booking CTA.

Suggested content direction:

- short brand statement
- one strong headline
- short supporting line
- primary CTA: “Book your stay”
- secondary CTA: “Explore rooms”

Do not invent prices or availability.

### 2. `#stay` — Room / stay reveal

Purpose:

- Explain what staying here feels like.
- Use pinned text while the background film moves through room details.

Suggested copy direction:

- “Sleep well. Step out.”
- “Your base for the city.”
- “Simple stay. Strong atmosphere.”

Motion:

- pinned section
- large text reveals line by line
- small HTML/CSS metadata chips only when real content is available

### 3. `#living` — Shared living / common spaces

Purpose:

- Present the social side of the property.
- Shift from private room mood into shared-space energy.

Layout:

- editorial cards
- large image crops
- short bold statements
- restrained floating UI

### 4. `#rooms` — Room categories / stay options

Purpose:

- Show available stay formats visually.
- Use approved room imagery.

Each card can include, once official data is provided:

- official room name
- short description
- capacity
- key amenities
- booking CTA

Never invent room categories, occupancy, amenities, or pricing.

### 5. `#social` — Drinks / people / evening energy

Purpose:

- Communicate the warmer nightlife and social dimension.
- Use expressive imagery and stronger pink / warm tones.

Possible content direction:

- “Check in. Go out.”
- “Stay for the night. Remember the people.”
- “From first coffee to last drink.”

### 6. `#vienna` — City connection

Purpose:

- Position the hotel as a base for exploring Vienna.
- Use city lifestyle imagery or a simple editorial map treatment.

Do not invent walking times, public transport times, or nearby attractions unless verified.

### 7. `#cta` — Final booking section

Purpose:

- Finish with a strong booking action.
- Use the calm final frame of the scroll film.

Content:

- large headline
- short line
- primary CTA: “Book your stay”
- secondary CTA: “See rooms”

### 8. `footer`

Purpose:

- Dissolve to deep navy / black.
- Minimal brand signature.
- Add verified contact, navigation, social, and legal links only when provided.

---

## Layer architecture

Background is fixed. Content scrolls over it.

| Element | z-index | Role |
|---|---:|---|
| `.bg-video` / `#bgv` | 0 | Fixed full-screen video, object-fit cover, scrubbed by scroll |
| `.bg-tint` | 1 | Contrast layer for readability |
| `.grain` / `.ambient-shapes` | 2 | Very subtle editorial texture |
| `#root` / `.page` | 10 | React page sections |
| `.floating-ui` | 20 | Optional room or booking cards |
| `.custom-cursor` | 100 | Optional desktop-only cursor |

Use a gradient dissolve above the footer rather than a fixed black overlay.

---

## Scroll-scrubbed video implementation

The video should be controlled by scroll position, not autoplay timing.

```js
const bgVideo = document.querySelector("#bgv");
let lastVideoT = -1;

function setupVideoScrub() {
  const updateVideo = () => {
    if (!bgVideo.duration) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, scrollTop / Math.max(1, maxScroll)));
    const t = progress * (bgVideo.duration - 0.05);

    if (Math.abs(t - lastVideoT) > 0.008) {
      bgVideo.currentTime = t;
      lastVideoT = t;
    }
  };

  bgVideo.pause();
  bgVideo.currentTime = 0;

  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: updateVideo,
  });

  bgVideo.addEventListener("loadedmetadata", updateVideo);
}
```

If using Lenis, connect Lenis to GSAP/ScrollTrigger:

```js
const lenis = new Lenis({
  duration: 1.12,
  smoothWheel: true,
  wheelMultiplier: 0.9,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

Expose dev hooks in development:

```js
if (import.meta.env.DEV) {
  window.__lenis = lenis;
  window.__ST = ScrollTrigger;
  window.__bgv = bgVideo;
}
```

---

## Pinned editorial reveal section

Use the main stay/living section as the primary pinned text reveal.

```js
function setupLivingReveal() {
  const section = document.querySelector("#stay");
  const pin = section.querySelector(".stay__pin");
  const words = [...section.querySelectorAll(".stay-word")];

  function render(p) {
    words.forEach((word, i) => {
      const start = (i / words.length) * 0.62;
      const o = gsap.utils.clamp(0, 1, (p - start) / 0.14);
      word.style.opacity = 0.12 + o * 0.88;
      word.style.filter = `blur(${(1 - o) * 8}px)`;
      word.style.transform = `translateY(${(1 - o) * 18}px)`;
    });
  }

  render(0);

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => "+=" + innerHeight * 1.8,
    pin,
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: self => render(self.progress),
  });
}
```

All labels and copy must remain HTML/CSS overlays. Do not bake text into generated video.

---

## Room card interaction

Room cards should feel editorial rather than like a generic booking engine.

Recommended data structure:

```js
export const stays = [
  {
    name: "[Official room name]",
    desc: "[Verified short description]",
    capacity: "[Verified capacity]",
    image: "/img/room-private.png",
  },
  {
    name: "[Official room name]",
    desc: "[Verified short description]",
    capacity: "[Verified capacity]",
    image: "/img/room-shared.png",
  },
];
```

Card rules:

- large room image
- oversized room name
- short description only
- small mono metadata
- clear CTA
- strong image crop
- hover lift or crop shift
- no invented pricing or amenities
- readable over the background film

---

## Editorial UI components

Recommended panel style:

```css
.panel {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(23,29,50,0.90), rgba(11,16,32,0.80));
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 26px;
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.34);
}

.panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 18% 0%, rgba(255,59,141,0.14), transparent 34%),
    linear-gradient(135deg, rgba(255,255,255,0.05), transparent 42%);
  pointer-events: none;
}
```

Primary button:

```css
.btn--primary {
  background: var(--accent);
  color: #fff;
  border: 0;
  box-shadow: 0 18px 48px rgba(255, 59, 141, 0.25);
}
```

Secondary button:

```css
.btn--ghost {
  color: var(--text);
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.04);
}
```

---

## Footer dissolve

```css
.footer {
  position: relative;
  margin-top: 24vh;
  padding: 16vh clamp(1.25rem, 5vw, 6rem) 8vh;
  background: var(--bg);
}

.footer::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  height: 45vh;
  background: linear-gradient(to bottom, transparent, var(--bg));
  pointer-events: none;
}
```

---

## Mobile behavior

Scroll-scrubbed video can be heavy on mobile. Provide a fallback.

Recommended:

- keep video on larger screens
- use `hero-room.png` or a mobile poster image on touch devices
- reduce or remove pinned sections on small screens
- convert room cards into a vertical stack
- disable custom cursor on touch devices
- keep booking CTA persistent but unobtrusive
- preserve oversized typography without horizontal overflow

```css
@media (hover: none), (max-width: 768px) {
  .bg-video {
    display: none;
  }

  .mobile-poster {
    display: block;
    position: fixed;
    inset: 0;
    background-image: url("/img/hero-room.png");
    background-size: cover;
    background-position: center;
    z-index: 0;
  }

  .rooms-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Verification checklist

Before considering the site complete:

- [ ] `copy/brand-kit.md` exists and matches Hotel Do Step Inn Living
- [ ] `copy/asset-plan.md` exists
- [ ] `copy/image-prompts.md` exists
- [ ] `copy/video-prompt.md` exists
- [ ] hero room image exists
- [ ] shared living reference exists
- [ ] social/night reference exists
- [ ] approved room/lifestyle images exist
- [ ] raw Seedance 2.0 video exists in `assets/videos`
- [ ] all-keyframe video exists at `website/public/bg.mp4`
- [ ] Vite React app runs with `npm run dev`
- [ ] GSAP and ScrollTrigger are installed and registered
- [ ] Lenis smooth scroll works
- [ ] video scrubs smoothly on scroll
- [ ] hero text remains readable over the video
- [ ] pinned reveal section works
- [ ] room cards are readable and responsive
- [ ] mobile fallback exists
- [ ] booking CTA is clear
- [ ] `npm run build -- --base=./` passes
- [ ] no unverified hotel facts were invented
- [ ] no text is baked into images or video
- [ ] generated assets are saved in the correct folders

---

## Preferred build philosophy

Start simple, then add motion.

Recommended order:

1. Create project folder
2. Create brand kit
3. Create asset plan
4. Write image prompts
5. Generate approved reference images with GPT Image 2
6. Review images
7. Write Seedance 2.0 video prompt
8. Generate scroll-friendly background video
9. Re-encode video to all-keyframe H.264
10. Create Vite + React app
11. Add fixed video background and basic scrub mapping
12. Add hero section
13. Add pinned stay/living reveal section
14. Add room cards
15. Add social / lifestyle section
16. Add Vienna / location context with verified content only
17. Add final booking CTA and footer
18. Add mobile fallback
19. Polish typography, spacing, motion, and contrast
20. Run production build
21. Document final usage notes

The final website should feel like a modern editorial hospitality campaign and a real booking-oriented brand experience, not a generic coding demo.

---

## First prompt for Claude Code

```txt
We are starting a new project called do-step-inn-living-motion-website.

Read and follow the Hotel Do Step Inn Living motion website skill.

The goal is to build a scroll-driven cinematic hospitality landing page using Vite, React, GSAP, Lenis, and ScrollTrigger.

The website is for Hotel Do Step Inn Living. The main visual experience should be a full-screen cinematic background video generated later with Higgsfield MCP using Seedance 2.0. The video should present one coherent guest journey through the hotel: arrival or room reveal, shared living, social atmosphere, evening mood, and a final booking moment as the user scrolls.

The visual direction should feel modern, youthful, editorial, urban, and social-media ready, with oversized typography, strong contrast, deep blue foundations, bold pink accents, warm nightlife imagery, and expressive hospitality photography.

Before generating any media or spending credits, create only the project structure and planning files:

- assets/images
- assets/videos
- assets/references
- copy
- scripts

Create these files:

- copy/brand-kit.md
- copy/asset-plan.md
- copy/image-prompts.md
- copy/video-prompt.md
- copy/website-brief.md
- README.md

In the planning files, define the Do Step Inn Living brand direction, color palette, visual language, required image assets, video concept, and website section plan.

Do not invent room names, prices, amenities, ratings, addresses, policies, or location claims. Leave factual hotel details as placeholders unless they are provided or verified.

Use GPT Image 2 for images later and Seedance 2.0 for the final video later, but do not generate media yet.

After creating the files, summarize the planned workflow and ask for approval before running any Higgsfield MCP generation.
```

---

## Media generation approval prompt

```txt
The Hotel Do Step Inn Living planning files are approved.

Now use Higgsfield MCP to generate only the approved still image assets with GPT Image 2.

Generate exactly the images listed in copy/asset-plan.md and save them in the correct folders.

Use the prompts from copy/image-prompts.md.
Use high quality.
Use the approved aspect ratios.
Do not generate extra variations.
Do not generate video yet.
Do not invent hotel facts inside the visuals.

After generation, report the saved files and wait for review.
```

---

## Video generation approval prompt

```txt
The Hotel Do Step Inn Living image references are approved.

Now use Higgsfield MCP with Seedance 2.0 to generate the final scroll-driven background video.

Use the approved reference images from assets/images and the final prompt from copy/video-prompt.md.

The video must be 16:9, slow, stable, cinematic, visually consistent, and suitable for frame-by-frame scroll scrubbing.

Save the raw generated video as:

assets/videos/do-step-inn-living-scroll-background-raw.mp4

Do not build the website yet. After the video is generated, report the file path and wait for approval.
```

---

## Website build prompt

```txt
The Hotel Do Step Inn Living images and scroll background video are approved.

Now build the website inside the website folder using Vite + React + GSAP + Lenis + ScrollTrigger.

Requirements:

1. Re-encode assets/videos/do-step-inn-living-scroll-background-raw.mp4 to all-keyframe H.264 and save it as website/public/bg.mp4.
2. Copy the final image assets into website/public/img.
3. Create a polished single-page Hotel Do Step Inn Living landing page with these sections:
   - home
   - stay
   - living
   - rooms
   - social
   - vienna
   - cta
   - footer
4. Use the fixed video background as the main motion layer.
5. Map scroll progress to the background video currentTime.
6. Use GSAP ScrollTrigger for pinned reveals and section animations.
7. Use Lenis for smooth scrolling.
8. Use a bold editorial hospitality visual direction: oversized typography, deep blue surfaces, pink accents, warm nightlife imagery, strong image crops, and spacious compositions.
9. Keep all website text as HTML/CSS, not baked into images or videos.
10. Add a mobile fallback using the hero-room poster.
11. Expose dev hooks for the video, Lenis, and ScrollTrigger in development.
12. Never invent room names, prices, amenities, ratings, policies, addresses, or transport times. Use only supplied or verified hotel facts.
13. Run npm run build -- --base=./ and fix any errors.

After the build, summarize what was created and explain how to run and preview the project.
```
