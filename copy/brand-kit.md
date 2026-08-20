# Brand kit — Hotel Do Step Inn Living

Source of truth for the visual and verbal system of the `do-step-inn-living-motion-website` project.
Read this file before editing the site or generating any media.

> **Fact policy:** every hotel-specific claim in this file is either marked **VERIFIED** with its source
> or marked **TO VERIFY**. Nothing marked TO VERIFY may appear on the live site, in copy, or inside
> generated media until the operator confirms it. See [Fact status](#8-fact-status).

---

## 1. Core identity

- **Name:** Hotel Do Step Inn Living
- **Category:** modern urban city stay (Vienna) — TO VERIFY: official property category and star rating
- **Positioning:** a modern, youthful, social city stay with an editorial lifestyle feel
- **North star:** **Stay somewhere that feels alive.**
- **Promise:** a place to sleep, meet, relax, and go out from — a base, not just a bed

### Tone of voice

bold · warm · contemporary · urban · energetic · direct · welcoming

Write short. Write in second person. Lead with the feeling, follow with the practical detail.
Never oversell, never use booking-engine language ("Best rate guaranteed!", "Book now and save!").

**Voice examples (safe — no factual claims):**

- "Stay somewhere that feels alive."
- "Sleep well. Step out."
- "Check in. Go out."
- "Your base for the city."
- "From first coffee to last drink."

**Voice anti-examples:**

- "Experience unparalleled luxury in the heart of Vienna."
- "Our 5-star amenities await."
- "Book direct for the lowest price!"

---

## 2. Brand personality

Do Step Inn Living should feel like part hotel, part social hub, part city-lifestyle editorial:

- urban energy
- accessible comfort
- social atmosphere
- independence and flexibility
- stylish but unpretentious design
- memorable city stays

---

## 3. Visual character

**Yes:**

- editorial magazine layouts, oversized typography
- striking contrast, strong image crops
- nightlife warmth against calm room quiet
- deep navy foundations with bold pink accents
- large breathing room, clean hierarchy
- realistic architecture, real materials, lived-in detail

**No:**

- generic corporate hotel design
- sterile beige "luxury"
- old-fashioned travel imagery
- crowded booking-engine aesthetics
- excessive glassmorphism
- clichéd stock-photo hospitality
- generic travel-site gradients
- nightclub cliché (lasers, heavy neon)

---

## 4. Color tokens

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
  --line: rgba(255, 255, 255, 0.12);
  --success: #67D7A0;
}
```

Usage rules:

| Token | Role |
|---|---|
| `--bg`, `--bg-2` | large background areas, footer dissolve |
| `--surface`, `--surface-2`, `--surface-soft` | cards, panels, floating UI over the video |
| `--text` | primary copy (warm off-white, never pure `#fff` for body) |
| `--muted` | secondary copy, metadata |
| `--accent` (pink) | **primary brand accent** — CTAs, highlights, tags, scroll progress |
| `--accent-2` (warm orange) | nightlife, drinks, sunset, social moments only |
| `--blue` | rare graphic punctuation, never large fills |
| `--success` | availability / confirmation states only |

- Pink is an accent, not a surface. Never flood a section with it.
- Deep blue / navy carries most large background areas.
- Avoid large generic gradients unless they support a specific transition (the footer dissolve is the exception).

**Contrast requirement:** all body copy over the background film must clear WCAG AA (4.5:1).
That is what the `.bg-tint` layer exists for — see `website-brief.md`.

---

## 5. Typography

```css
:root {
  --font: "Inter", system-ui, sans-serif;
  --font-head: "Space Grotesk", system-ui, sans-serif;
  --font-mono: "Space Mono", monospace;
}
```

| Family | Use |
|---|---|
| `--font-head` (Space Grotesk / Archivo Black) | nav logo, hero statement, section titles, room titles, lifestyle statements, final CTA, footer wordmark |
| `--font` (Inter) | body copy, descriptions, links |
| `--font-mono` (Space Mono / JetBrains Mono) | room metadata, capacity, amenity chips, small labels, scroll progress, dev labels |

Scale direction: the hero headline is the largest type on the page by a clear margin.
Use `clamp()` for every heading so oversized type never causes horizontal overflow on mobile.

---

## 6. Motion principles

- Motion serves reading, never decoration for its own sake.
- The background film is scrubbed by scroll — it never autoplays past the reader.
- One pinned reveal section is the motion centrepiece (`#stay`). Do not pin three sections in a row.
- Text reveals are blur + rise + opacity, short distances (max 18px), no bounce, no spin.
- Respect `prefers-reduced-motion`: fall back to the poster image and static text.

---

## 7. Content rules

- All website text lives in HTML/CSS. **Never** bake copy into generated images or video.
- No fake hotel logos or signage in generated media.
- No invented room names, prices, capacities, amenities, ratings, awards, addresses, transport times,
  or booking conditions — anywhere, including image prompts.
- Where a real fact is required but unknown, the site uses a visible placeholder token
  (e.g. `[TO VERIFY: room name]`) so an unverified build can never be mistaken for a finished one.

---

## 8. Fact status

### VERIFIED — brand / operator level

Source: `imprint.html` in this repository (the Do Step Inn **Central** site). These are **operator-level**
facts for the "Do Step Inn" brand. They must still be confirmed as applying to the *Living* property
before they are used on this site.

| Fact | Value | Source |
|---|---|---|
| Operating company | Kern Beherbergungsbetriebs GmbH | repo `imprint.html` |
| Brand | Do Step Inn | repo `imprint.html` |
| Company register | FN 253911 z, Commercial Court of Vienna | repo `imprint.html` |
| VAT | ATU61356623 | repo `imprint.html` |
| Managing director | Mag. Gerald Kern | repo `imprint.html` |
| Operator email | office@dostepinn.at | repo `imprint.html` |

### TO VERIFY — everything property-specific

Nothing below may be published or generated until the operator supplies it.

- [ ] **TO VERIFY** — official property name and spelling ("Hotel Do Step Inn Living" vs another form)
- [ ] **TO VERIFY** — street address and postal code of the *Living* property
- [ ] **TO VERIFY** — property phone number and booking email for *Living*
- [ ] **TO VERIFY** — booking engine URL / deep link for the "Book your stay" CTA
- [ ] **TO VERIFY** — official room / stay category names
- [ ] **TO VERIFY** — capacity per category
- [ ] **TO VERIFY** — amenities per category and property-wide
- [ ] **TO VERIFY** — rates, rate structure, currency, and whether any price may be shown at all
- [ ] **TO VERIFY** — check-in / check-out times and process
- [ ] **TO VERIFY** — cancellation, deposit, age, and pet policies
- [ ] **TO VERIFY** — star rating / category classification
- [ ] **TO VERIFY** — ratings, review scores, awards (only if officially documented)
- [ ] **TO VERIFY** — nearest transport nodes and any walking or transport times
- [ ] **TO VERIFY** — nearby landmarks the site may name
- [ ] **TO VERIFY** — social media handles and legal / footer links for *Living*
- [ ] **TO VERIFY** — whether real property photography exists that should replace or sit beside AI imagery
- [ ] **TO VERIFY** — accessibility information
- [ ] **TO VERIFY** — languages the site must ship in (the Central site ships 7)

### Explicitly NOT reusable

The Do Step Inn **Central** facts in this repository (Südtiroler Platz 3, 1040 Vienna; the three-minute
Hauptbahnhof walk; the pod-bed and private-room descriptions; the phone number +43 1 890 23 51) belong to
a **different property**. They must not be copied into the Living site.

> Note for the operator: the existing Central site is internally inconsistent — page footers say
> *Südtiroler Platz 3, 1040 Vienna* while `imprint.html` says *Felberstraße 20, 1150 Vienna*.
> Worth resolving there, and a good reason to be careful about which address belongs to which property here.
