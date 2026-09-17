# Brand Kit — Do Step Inn Living

Verbindliche Grundlage für Gestaltung und Sprache dieses Projekts.
Vor jeder Änderung an der Website oder an Medien lesen.

Quellen: die Website-Texte, der Firmenflyer „Ihr Langzeit-Hotel in Wien", das Logo und das
Farbblatt — alle vom Betreiber übermittelt. Nichts hier ist erfunden. Wo sich Quellen
widersprechen, steht der Widerspruch unter [Offene Punkte](#offene-punkte), statt still
aufgelöst zu werden.

---

## 1. Was Do Step Inn Living ist

- **Produkt:** Wohnen auf Zeit — möblierte Apartments bzw. Zimmer für Kurz- und
  Langzeitaufenthalte in Wien
- **Nicht:** ein Social-Hostel, kein Städtetrip-Produkt, kein Nightlife
- **Anlässe:** Geschäftsreise, Projektarbeit, Studium, Übergangslösung
- **Zweite Zielgruppe (B2B):** Unternehmen, die Mitarbeitende längerfristig unterbringen —
  Projekteinsatz, temporäre Teamunterbringung, langfristige Stationierung
- **Claim:** *Dein Zuhause auf Zeit.*
- **Betreiber:** Kern Beherbergungsbetriebs GmbH

### Tonalität

unkompliziert · klar · ruhig · verlässlich · sachlich-warm

Kurze Sätze. Keine Superlative, keine Buchungsmaschinen-Rhetorik. Das Versprechen ist
Planbarkeit, nicht Aufregung. Leitsatz aus dem eigenen Material:

> „Ein Aufenthalt sollte sich nie kompliziert anfühlen — sondern klar, flexibel und zuverlässig."

**Duzen oder siezen:** Die Endkunden-Texte duzen („was du brauchst"), die Firmentexte siezen
(„Ihr Projekt"). Das ist bewusst getrennt und wird auf der Seite so gehalten: Wohn-Sektionen
duzen, die Firmen-Sektion siezt.

---

## 2. Farben

Aus dem Farbblatt und dem Logo gemessen, nicht geschätzt.

```css
:root {
  --paper:     #FFFFFF;
  --paper-2:   #F4FFFB;  /* mintgetöntes Weiß, aus dem Flyer */
  --sand:      #E8DCCF;  /* Farbblatt */
  --sand-deep: #D8CBBA;
  --mint:      #5ED6B2;  /* Farbblatt, Primärakzent */
  --mint-soft: #A9E9D6;  /* Flyer-Flächen */
  --mint-deep: #00875F;  /* dunkles Ende des Logo-Verlaufs */
  --blush:     #D8A7A0;  /* Farbblatt */
  --sky:       #84C2D8;  /* Flyer-Kopfband */
  --ink:       #191919;
  --ink-soft:  #3E4F4A;
  --muted:     #6B7A75;
}
```

Regeln:

- **Hell ist die Grundhaltung.** Weiß und mintgetöntes Weiß tragen die Flächen. Kein dunkler Modus.
- **Mint ist der Markenakzent** — Linien, Punkte, Hervorhebungen. `--mint-deep` für Text und
  Buttons, weil `--mint` auf Weiß keinen ausreichenden Kontrast hat.
- **Sand** ist der warme Gegenpol: Boden, Footer, ruhige Flächen.
- **Blush** sparsam für Wärme und für Hinweise.
- **Sky** selten, als zweiter kühler Akzent.
- Fließtext immer mindestens WCAG AA (4,5:1). `--ink` auf Weiß liegt bei etwa 17:1.

---

## 3. Typografie

Das Logo setzt „Do Step Inn" in eine kontrastreiche Serife und „Living" in eine Schreibschrift.
Die Website greift das über die Serifen-Überschrift und ein kursives „Living" auf — die
Schreibschrift selbst wird nicht nachgebaut, dafür gibt es das Logo.

```css
--font:      "Inter", system-ui, sans-serif;          /* Fließtext, Labels */
--font-head: "Playfair Display", Georgia, serif;      /* Überschriften, Wortmarke */
```

Zahlen in Preistabellen mit `font-variant-numeric: tabular-nums`, damit Spalten stehen.

---

## 4. Bildsprache

- helles Tageslicht, ruhige Flächen, echte Materialien
- Wohnsituationen statt Hotelrepräsentation: Schreibtisch am Fenster, Küche, aufgeräumte Ruhe
- keine Nachtaufnahmen, kein Neon, keine Partyszenen
- keine Menschenmassen; wenn Menschen, dann beiläufig und einzeln
- kein Text, keine Logos, keine Preisschilder im Bild

**Aktueller Stand:** Alle Bilder und der Hintergrundfilm sind prozedurale Platzhalter
(`scripts/generate_placeholder_media.py`) in genau dieser Palette. Sie geben Licht und Stimmung
vor, zeigen aber keine Räume. Echtes Bildmaterial ersetzt sie 1:1 an denselben Pfaden.

---

## 5. Gesicherte Fakten

Direkt aus dem übermittelten Material — auf der Website verwendbar.

| Feld | Wert | Quelle |
|---|---|---|
| Adresse | Wurmbstraße 36, 1120 Wien | Website, Flyer-Karte |
| E-Mail | reservierung@dostepinn.at | Website, Flyer |
| Telefon | +43 676 3682844 | Website, Flyer |
| Erreichbarkeit | Mo–Fr 08:00–17:00 Uhr | Website |
| Betreiber | Kern Beherbergungsbetriebs GmbH | Website |
| Website | https://dostepinn-living.at/ | Website |
| AGB | https://dostepinn-living.at/contact-copy/ | Website |

**Zimmerkategorien:** Einzelzimmer, Doppelzimmer (1 PAX / 2 PAX), Zweibettzimmer,
Dreibettzimmer, Vierbettzimmer.

**Ausstattung je Apartment (Website):** voll möbliert & bezugsfertig · eigene Küche oder
Kitchenette · modernes Bad · WLAN inklusive · gute öffentliche Anbindung · flexible Mietdauer.

**Ausstattung je Zimmer (Flyer):** private Dusche/WC · Sat-TV & High-Speed WLAN · Klimaanlage ·
Mini-Kühlschrank; aufgebettet übergeben, regelmäßig vom Housekeeping serviciert.

**InnSider Restaurant, im Haus (Flyer):** Frühstücksbuffet täglich 07:30–10:30 · frühere
Frühstückszeiten nach Absprache · warme Küche Mo–Fr 11:00–19:00 · Konsumation auf
Firmenrechnung möglich.

**Preise 3–5 Nächte, netto (Website):** Einzelzimmer 39,60 € · Doppelzimmer 1 PAX 43,20 € ·
Doppelzimmer 2 PAX 47,60 € · Zweibettzimmer 49,60 € · Dreibettzimmer 56,80 € ·
Vierbettzimmer 63,60 €. Zzgl. MwSt. und Ortstaxe. Ab 3 Monaten Vertragsdauer entfällt die
Ortstaxe; in Wochen- und Monatspreisen ist nach 2 Wochen eine Zusatzreinigung inkludiert.

**Zusatzleistungen, netto (Website):** Frühstück 9,82 € · Abendessen 12,90 € (Mo–Fr 14:00–19:00) ·
Bleibezimmer Service 7,27 € · Zusatzreinigung 14,55 € · Zusatzreinigung bei
MitarbeiterInnenwechsel 19,64 € · Parken WIPARK Garage 16,50 € · Parken Park&Ride Hetzendorf
4,60 €. Parken extern, diverse Tarife.

**Lage (nur was die Flyer-Karte selbst benennt):** Bahnhof Wien Meidling (U6, S-Bahn, Fernzüge),
Euro Plaza, WIPARK Garage, Park&Ride Hetzendorf, A2/A23 Richtung Süden, Wienerberg/Business
Park Wien. **Keine Geh- oder Fahrzeiten** — das Material nennt keine.

---

## Offene Punkte

Nicht erfunden, nicht stillschweigend entschieden. Jeder Punkt braucht eine Antwort vom Betreiber.

### 1. Zwei Preisstände, die sich widersprechen

Die Website führt Nettopreise, der Flyer Bruttopreise inklusive USt. und Ortstaxe — und die
Differenz ist nicht durch Steuern erklärbar:

| Kategorie | Website netto | Flyer brutto |
|---|---:|---:|
| Einzelzimmer | 39,60 | 48,00 |
| Doppelzimmer 1 PAX | 43,20 | 51,20 |
| Doppelzimmer 2 PAX | 47,60 | 55,00 |
| Zweibettzimmer | 49,60 | 55,00 |
| Dreibettzimmer | 56,80 | 60,00 |
| Vierbettzimmer | 63,60 | 68,00 |

Zusätzlich: Auf der Website kosten Doppelzimmer 2 PAX und Zweibettzimmer unterschiedlich viel
(47,60 / 49,60), im Flyer gleich viel (beide 55,00).
Auch die Zusatzleistungen unterscheiden sich (Frühstück 9,82 netto vs. 10,80 brutto; Abendessen
12,90 vs. 15,80; Zusatzreinigung 14,55 vs. 16,00; Park&Ride 4,60 vs. 4,99).

**Die Seite zeigt derzeit die Netto-Werte der Website.** Wochen- und Monatspreise stehen nur im
Flyer und damit auf der anderen Basis — deshalb stehen sie auf der Seite als „zu prüfen", statt
gemischt zu werden. **Benötigt:** ein freigegebener Preisstand mit einer einzigen Basis.

### 2. Apartment oder Hotelzimmer?

Die Website verkauft „Apartments" mit „eigene Küche oder Kitchenette". Der Flyer verkauft
„modern eingerichtete Hotelzimmer" mit „Gemeinschaftsküche & Aufenthaltsräume". Die
Kategorienamen (Einzel-, Doppel-, Drei-, Vierbettzimmer) sind Hotelzimmer-Namen.
Das ist kein Detail: Es entscheidet, was auf Bildern zu sehen sein muss und was die Seite
verspricht. **Die Seite übernimmt aktuell beide Formulierungen aus ihrer jeweiligen Quelle.**

### 3. Schreibweise der Adresse

Flyer-Textblock: „Wurmbsstraße 36". Flyer-Karte und Website: „Wurmbstraße 36".
Die Seite verwendet **Wurmbstraße 36** (zwei Quellen gegen eine).

### 4. Kaputter Telefonlink auf der Live-Website

Die übermittelte Website-Fassung verlinkt die Telefonnummer auf `tel:202-555-0188` — eine
Platzhalternummer aus einem Template. Angezeigt wird die richtige Nummer, gewählt die falsche.
**Auf dieser Seite korrigiert**, auf der Live-Website vermutlich noch offen.

### 5. Kleinere Unstimmigkeiten im Flyer

- Die Spalte „Ø €/Pers./Nacht" beim Wochenpreis führt Werte pro Zimmer, nicht pro Person
  (z. B. 329,00 ÷ 7 = 47,00 — das ist der Zimmerpreis, bei 2 PAX wären es 23,50).
- Einzelzimmer-Monatspreis: 798,00 ÷ 30 = 26,60, angegeben sind 27,00.

### 6. Weiterhin nicht übermittelt

- URL der Buchungsmaschine für einen „Direkt buchen"-Button
- Stornobedingungen, Kaution, Mindestaufenthalt, Check-in/Check-out-Zeiten
- Sternekategorie, Bewertungen, Auszeichnungen
- Impressum und Datenschutzerklärung für *Living* (nur die AGB-URL liegt vor)
- Social-Media-Profile
- Barrierefreiheit
- echtes Bildmaterial der Räume
