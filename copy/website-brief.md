# Website brief — Hotel Do Step Inn Living

Single-page, scroll-driven cinematic landing page.
Stack: **Vite + React (JS) + GSAP + ScrollTrigger + Lenis**. No TypeScript, no other framework.

One idea drives the whole page:

> **A modern hotel stay revealed through scroll, from arrival to living.**

---

## 1. Seitenstruktur

Neun Blöcke, ein durchgehender Scroll, ein fixierter Film dahinter.

| # | ID | Titel | Aufgabe | Medien |
|---:|---|---|---|---|
| 1 | `#home` | Wohnen auf Zeit | Produkt benennen, Anfrage anbieten | Film Phase 1 |
| 2 | `#wohnen` | Dein Zuhause auf Zeit | gepinnter Reveal des Kernsatzes | Film Phase 1→2 |
| 3 | `#apartments` | Ausstattung | was jedes Apartment und jedes Zimmer mitbringt | `lobby-living-reference` |
| 4 | `#zimmer` | Preisübersicht | Kategorien und Nettopreise, transparent | Film Phase 2 |
| 5 | `#leistungen` | Zusatzleistungen | Services, Preise, InnSider Restaurant | Film Phase 3 |
| 6 | `#firmen` | Ihr Langzeit-Hotel in Wien | B2B: Planbarkeit, Abrechnung, Teams | Film Phase 3 |
| 7 | `#lage` | Wien-Meidling | Umgebung, nur belegte Nennungen | `city-lifestyle` |
| 8 | `#kontakt` | Wir sind für Sie da | Anfrage, Anruf, Kontaktdaten | Film Phase 4 |
| 9 | `footer` | — | Auflösung in Sand, Wortmarke, Rechtliches | — |

Fixe Elemente: schlanke Kopfzeile (Wortmarke, Ankerlinks, Anfrage-Button) und ein dünner
Fortschrittsbalken in `--mint-deep`.

**Duzen/Siezen:** Wohn-Sektionen duzen, `#firmen` und `#kontakt` siezen — so trennt es das
Ausgangsmaterial.

---

## 2. Die Scroll-Erzählung

Der Film und der Text erzählen dasselbe: einen ruhigen Tag in einer Wohnung, nicht eine Nacht in
einem Hotel.

**0 %** Heller Wohnraum, Serifen-Schlagzeile „Wohnen auf Zeit", zwei Handlungsangebote.

**~12 %** Die Sektion pinnt. Der Kernsatz löst sich Zeile für Zeile aus der Unschärfe, während der
Film an Raumdetails vorbeizieht. Der ruhigste Moment der Seite.

**~30 %** Der Pin löst sich in die Ausstattung: was mitkommt, was im Zimmer steht.

**~45 %** Preise. Der sachliche Takt — echte Nettowerte, ungeklärte Spalten sichtbar als „zu prüfen".

**~62 %** Zusatzleistungen und das Haus-Restaurant. Das Licht im Film wird wärmer.

**~78 %** Firmenkunden. Die Sprache wechselt ins Sie, das Versprechen heißt Planbarkeit.

**~90 %** Lage und Kontakt. Der Film kommt zur Ruhe, eine Anfrage steht am Ende.

**100 %** Der Footer läuft in Sand aus.

---

## 3. Textstand

Sämtliche Texte stammen aus dem Material des Betreibers (Website, Firmenflyer). Fakten, die nicht
belegt sind, stehen nicht auf der Seite; ungeklärte Preisspalten sind sichtbar als „zu prüfen"
markiert. Die Widersprüche zwischen Website und Flyer sind in
[`copy/brand-kit.md`](brand-kit.md#offene-punkte) dokumentiert.

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

`website/src/data/content.js` — alle Inhalte an einer Stelle, jeder Wert belegt:

```js
export const ZIMMER = [
  { name: "Einzelzimmer", preis: "39,60" },
  // …
];
export const WOCHEN_MONATSPREIS_OFFEN = true;  // rendert "zu prüfen" statt einer Zahl
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
- [ ] echtes Bildmaterial ersetzt die prozeduralen Platzhalter
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
- [ ] **kein unbelegter Fakt auf der Seite** — offene Werte sichtbar markiert, nicht geraten
- [ ] fonts self-hosted rather than hotlinked from Google (GDPR — see README)
- [ ] `scripts/verify-motion.cjs` passes
- [ ] no text baked into any image or video
- [ ] every asset saved at its planned path
