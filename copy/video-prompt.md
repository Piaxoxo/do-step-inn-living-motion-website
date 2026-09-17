# Hintergrundfilm — Seedance 2.0 (Higgsfield MCP)

Eine Generierung. Läuft erst, wenn `hero-room.png`, `lobby-living-reference.png` und
`social-night-reference.png` freigegeben sind — sie werden als Referenz übergeben.

- Rohdatei: `assets/videos/do-step-inn-living-scroll-background-raw.mp4`
- Produktion: `website/public/bg.mp4` und `bg.webm` (`scripts/swap-bg-video.sh`)
- 16:9 · 12–18 s · hohe Qualität · kein Ton · kein Text

---

## Warum dieser Film anders ist

Er wird nie abgespielt, sondern **gescrubbt**: Die Scrollposition steuert `currentTime`, vorwärts
wie rückwärts, in beliebigem Tempo. Daraus folgen harte Vorgaben:

- eine durchgehende Kamerabewegung — Schnitte wirken beim Scrubben wie Fehler
- langsam und gleichmäßig — schnelle Bewegung strobt beim schnellen Scrollen
- konstante Belichtung — Flackern sieht nach kaputtem Player aus
- jedes einzelne Standbild muss lesbar sein
- gleichbleibend viel Freifläche, denn auf **jedem** Frame sitzt Text

---

## Phasen

| Phase | Fortschritt | Bild | Darüber |
|---|---|---|---|
| 1 · Ankommen | 0,00–0,28 | ruhiger, heller Wohnraum, weite Freifläche | `#home`, `#wohnen` |
| 2 · Wohnen | 0,28–0,55 | Detail und Übergang in den Gemeinschaftsbereich | `#apartments`, `#zimmer` |
| 3 · Nachmittag | 0,55–0,82 | wärmeres Spätnachmittagslicht, häusliche Ruhe | `#leistungen`, `#firmen` |
| 4 · Ruhe | 0,82–1,00 | ruhiger, sehr aufgeräumter Schlussframe | `#lage`, `#kontakt` |

Frame 0 ist zugleich das Posterbild und muss als Standbild allein tragen.

---

## Prompt

```txt
Create a calm, bright, scroll-driven background video for the Do Step Inn Living website —
furnished rooms and apartments in Vienna for stays of weeks or months.

The video is a full-screen background controlled by scroll progress with GSAP ScrollTrigger, Lenis
and frame-by-frame scrubbing. Motion must be slow, stable, smooth and readable when the viewer
scrubs it by hand, forwards and backwards.

Use the approved Do Step Inn Living reference images as the visual language.

Sequence, as one continuous camera move with no cuts:
1. Begin in a bright, uncluttered room in soft morning daylight, framed with generous empty space
   for large typography.
2. Drift slowly past architectural and domestic detail — a window, a desk, a doorway.
3. Move naturally into a shared living or kitchen area, still in daylight.
4. Warm gradually into late-afternoon light, quiet and domestic.
5. End on a calm, very clean frame with plenty of space for a closing call to action.

Visual style:
- bright, airy residential interior photography
- soft natural daylight throughout
- white, warm sand and pale mint tones, restrained blush accents
- realistic architecture and materials
- calm, practical, quietly premium

Constraints:
- No text anywhere in the video
- No logos or signage
- No invented room names, prices, ratings or amenities
- No cuts, no shaky camera, no extreme zooms
- No night scenes, no artificial or coloured lighting, no party or bar atmosphere
- No dark or moody grading
- Keep generous negative space in every frame
- Maintain visual continuity from first frame to last

Duration: 12 to 18 seconds. Aspect ratio: 16:9. Quality: high.
```

---

## Prüfliste

- [ ] eine durchgehende Kamerabewegung, keine Schnitte
- [ ] scrubbt sauber rückwärts wie vorwärts
- [ ] Frame 0 trägt als Standbild
- [ ] Schlussframe ruhig, mit Platz für den Abschluss
- [ ] Belichtung durchgehend stabil, kein Flackern
- [ ] kein Text, kein Logo, keine Beschilderung
- [ ] nichts im Bild behauptet einen Fakt über das Haus
- [ ] 12–18 s, 16:9
- [ ] unter `assets/videos/do-step-inn-living-scroll-background-raw.mp4` gespeichert

## Danach

```bash
scripts/swap-bg-video.sh "assets/videos/do-step-inn-living-scroll-background-raw.mp4"
```

Dann in der Browser-Konsole prüfen:

```js
window.__bgv.readyState === 4
window.__bgv.duration
```
