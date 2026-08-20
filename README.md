# do-step-inn-living-motion-website

A scroll-driven cinematic landing page for **Hotel Do Step Inn Living**, built with
Vite · React · GSAP · ScrollTrigger · Lenis, with media generated through Higgsfield MCP
(GPT Image 2 for stills, Seedance 2.0 for the background film).

> **Status: planning only.** No media has been generated. No credits have been spent.
> The React app has not been created yet. See [Workflow](#workflow).

The project follows the skill at
[`.claude/skills/do-step-inn-living-motion-website/SKILL.md`](../.claude/skills/do-step-inn-living-motion-website/SKILL.md).

---

## The idea

> A modern hotel stay revealed through scroll, from arrival to living.

A full-screen cinematic film sits fixed behind the page. Scroll position drives its `currentTime`
frame by frame, walking the visitor through one continuous guest journey: arrival, the room, shared
living, social evening, the city, and a final booking moment.

Creative north star: **Stay somewhere that feels alive.**

---

## Structure

```txt
do-step-inn-living-motion-website/
├── assets/
│  ├── images/       # generated stills (GPT Image 2)          — empty
│  ├── references/   # supplied / captured direction references — empty
│  └── videos/       # raw generated film (Seedance 2.0)        — empty
├── copy/
│  ├── brand-kit.md      # identity, tokens, type, fact status
│  ├── asset-plan.md     # every asset, path, and approval gate
│  ├── image-prompts.md  # the seven image prompts
│  ├── video-prompt.md   # the film prompt and phase map
│  └── website-brief.md  # page structure, scroll story, motion spec
├── scripts/
│  └── swap-bg-video.sh  # ffmpeg all-keyframe H.264 re-encode
└── website/           # Vite + React app — not created yet
```

---

## Workflow

| Gate | Step | Status |
|---|---|:--:|
| A | Structure + planning files | ✅ done |
| B | Generate `hero-room.png` (style anchor), review | ⛔ awaiting approval |
| C | Generate the remaining six images, review | ⛔ |
| D | Generate the Seedance 2.0 background film, review | ⛔ |
| E | Re-encode to all-keyframe H.264, build the site | ⛔ |

Claude does not cross a gate without an explicit go-ahead. Planned spend: **8 generations total**
(7 images + 1 film), no re-rolls.

---

## Rules this project runs on

- All website text is HTML/CSS. Nothing is baked into images or video.
- No invented hotel facts — room names, prices, capacities, amenities, ratings, awards, addresses,
  transport times, and policies are placeholders marked `TO VERIFY` until the operator confirms them.
- Do Step Inn **Central** facts elsewhere in this repository belong to a different property and are
  not reused here.
- Every generated asset is saved to its planned path immediately, never left in a temp folder.
- The stack is fixed: Vite, React (JS), GSAP, ScrollTrigger, Lenis.

---

## Environment notes

- **Higgsfield MCP is not connected to this session** — `generate_image` / `generate_video` are
  unavailable, so gates B–D cannot run until the MCP server is added.
- **`ffmpeg` is not installed** — needed at gate E. Install it system-wide or add `ffmpeg-static`
  as a dev dependency before re-encoding.

---

## Commands (once the app exists)

```bash
cd website
npm install
npm run dev                  # local dev
npm run build -- --base=./   # portable static build
npx serve dist               # preview over HTTP, never file://
```

Swap in a new background film:

```bash
scripts/swap-bg-video.sh "assets/videos/do-step-inn-living-scroll-background-raw.mp4"
```

---

## Open questions

The full list lives in [`copy/brand-kit.md` §8](copy/brand-kit.md#8-fact-status). The blocking ones:
the Living property's address and contact details, its official room categories and capacities, the
booking URL, and whether rates may be shown at all.
