# Asset plan — Hotel Do Step Inn Living

The complete, approved-list-only inventory of media for this project.
**Nothing here is generated yet.** No generation may run until the operator approves this list.

Legend: ⛔ not generated · ⏳ generating · 🔍 needs review · ✅ approved

---

## 1. Still images — GPT Image 2 (via Higgsfield MCP)

7 images. 7 generations total. No variations unless explicitly requested.

| # | File | Subject | Ratio | Used for | Status |
|---:|---|---|---|---|:--:|
| 1 | `assets/images/hero-room.png` | Modern hotel room, calm wide hero composition | 16:9 | Hero poster, video poster frame, **master style reference for all other images and the film**, mobile fallback background | ⛔ |
| 2 | `assets/images/lobby-living-reference.png` | Shared lounge / common living space | 16:9 | `#living` section, mid-film visual reference | ⛔ |
| 3 | `assets/images/social-night-reference.png` | Warm nightlife drink moment | 16:9 | `#social` section, evening-phase film reference | ⛔ |
| 4 | `assets/images/room-private.png` | Private room, card crop | 16:9 | `#rooms` card A | ⛔ |
| 5 | `assets/images/room-shared.png` | Shared / multi-bed room, card crop | 16:9 | `#rooms` card B | ⛔ |
| 6 | `assets/images/common-space.png` | Secondary common space (kitchen / work / hang) | 16:9 | `#living` editorial crop | ⛔ |
| 7 | `assets/images/city-lifestyle.png` | Vienna street / city-at-dusk lifestyle frame | 16:9 | `#vienna` section | ⛔ |

**Generation order matters.** Image 1 is generated and approved *first*; it becomes the style anchor
referenced by images 2–7 and by the film. If image 1 is rejected, nothing downstream runs.

Shared settings for all seven:

- aspect ratio 16:9, high quality
- realistic editorial hospitality photography
- deep navy foundation, warm practical light, restrained pink accent
- **no text, no logos, no signage, no price tags, no menus, no room numbers**
- no identifiable real people as the dominant subject
- no luxury cliché, no beige, no stock-photo posing

Prompts: `copy/image-prompts.md`.

---

## 2. Reference images (not generated)

`assets/references/` holds anything supplied by the operator or captured for direction:

| File | What it should hold |
|---|---|
| `do-step-inn-ui-reference.png` | UI / layout direction reference |
| `do-step-inn-hero-reference.png` | Hero framing reference |
| `do-step-inn-lifestyle-reference.png` | Lifestyle / tone reference |
| `do-step-inn-video-master-reference.png` | The approved frame the film must match |

**TO VERIFY:** whether the operator has real property photography. If real photos of the Living
property exist, they belong here and should replace AI imagery wherever a space is shown as if real.

---

## 3. Background film — Seedance 2.0 (via Higgsfield MCP)

One generation. Runs only after images 1–3 are approved.

| Stage | File | Notes |
|---|---|---|
| Raw output | `assets/videos/do-step-inn-living-scroll-background-raw.mp4` | 16:9, 12–18 s, high quality, no audio needed |
| Production | `website/public/bg.mp4` | all-keyframe H.264, produced by `scripts/swap-bg-video.sh` |

Prompt and phase map: `copy/video-prompt.md`.

---

## 4. Derived production assets (no credits)

Copied or encoded from the above, once they exist:

- `website/public/img/*.png` — the seven images, copied and web-optimised
- `website/public/bg.mp4` — all-keyframe re-encode of the raw film
- `website/public/img/hero-room.png` — doubles as mobile poster and video `poster`

---

## 5. Budget shape

| Item | Count |
|---|---:|
| GPT Image 2 generations | 7 |
| Seedance 2.0 generations | 1 |
| **Total planned generations** | **8** |

Re-rolls are not included. Any re-roll is a separate approval.

---

## 6. Approval gates

1. **Gate A — planning** (current): structure + planning files reviewed and approved.
2. **Gate B — hero image**: generate image 1 only. Review. Approve the style anchor.
3. **Gate C — remaining images**: generate images 2–7 against the approved anchor. Review.
4. **Gate D — film**: generate the Seedance 2.0 background video. Review.
5. **Gate E — build**: encode, then build the Vite/React site.

Claude does not cross a gate without an explicit go-ahead.

---

## 7. Blockers

- ⚠️ **Higgsfield MCP is not connected to this session.** No `generate_image` / `generate_video` tool is
  available right now, so Gates B–D cannot run until the MCP server is added. Nothing else is blocked.
- ⚠️ **`ffmpeg` is not installed in this environment.** Needed at Gate E for the all-keyframe re-encode.
  Fix at build time with a system install or an `ffmpeg-static` dev dependency.
- ⚠️ **The property's own site is unreachable from this session.** `dostepinn-living.at` is blocked by the
  environment's egress policy, so room categories and property facts could not be pulled from
  `https://dostepinn-living.at/#/booking/search`. Until they are supplied, the subjects of images 4 and 5
  (`room-private`, `room-shared`) are provisional — if Living is an apartment product rather than a
  hostel-style hotel, those two prompts must be rewritten before generation.
