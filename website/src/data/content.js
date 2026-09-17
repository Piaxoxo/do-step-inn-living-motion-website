// Inhalte für Do Step Inn Living.
//
// Quellen: die Website-Texte, der Firmenflyer „Ihr Langzeit-Hotel in Wien",
// das Logo, das Farbblatt und die Angaben des Betreibers. Nichts ist erfunden.
// Preise stammen durchgehend aus dem Firmenflyer — inklusive USt. und Ortstaxe.
// Offene Punkte stehen in copy/brand-kit.md und sind auf der Seite sichtbar
// als „offen" markiert, statt geraten zu werden.

export const KONTAKT = {
  email: "reservierung@dostepinn.at",
  telefon: "+43 676 3682844",
  telefonHref: "tel:+436763682844",
  erreichbarkeit: "Mo–Fr 08:00–17:00 Uhr",
  strasse: "Wurmbstraße 36",
  ort: "1120 Wien",
  betreiber: "Kern Beherbergungsbetriebs GmbH",
  home: "https://dostepinn-living.at/",
  agb: "https://dostepinn-living.at/contact-copy/",
};

export const anfrageHref = (betreff = "Anfrage Do Step Inn Living", text = "Hallo,\n\nich hätte eine Anfrage...") =>
  `mailto:${KONTAKT.email}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(text)}`;

// --- die zwei Produkte -----------------------------------------------------
export const PRODUKTE = [
  {
    id: "mini-apartment",
    name: "Mini-Apartment",
    kern: "Mit eigener Küche",
    text: "Voll möbliert und bezugsfertig, mit eigener Küche oder Kitchenette und modernem Bad. Für alle, die für ein paar Wochen oder Monate wirklich für sich wohnen wollen.",
    merkmale: [
      "Eigene Küche oder Kitchenette",
      "Modernes Bad",
      "Voll möbliert & bezugsfertig",
      "WLAN inklusive",
    ],
  },
  {
    id: "apartmentzimmer",
    name: "Apartmentzimmer",
    kern: "Mit geteilter Küche",
    text: "Modern eingerichtetes Zimmer mit eigenem Bad, Klimaanlage und Mini-Kühlschrank. Gekocht wird in der Gemeinschaftsküche, dazu gibt es Aufenthaltsräume.",
    merkmale: [
      "Private Dusche/WC",
      "Klimaanlage & Mini-Kühlschrank",
      "Sat-TV & High-Speed WLAN",
      "Gemeinschaftsküche & Aufenthaltsräume",
    ],
  },
];

// --- Preise: Firmenflyer, inkl. USt. und Ortstaxe ---------------------------
export const PREIS_BASIS = "Alle Preise inkl. USt. und Ortstaxe · pro Zimmer · Angebot nach Verfügbarkeit, Preisänderungen vorbehalten";

export const KATEGORIEN = [
  { id: "ez",  name: "Einzelzimmer",        pax: 1, nacht: 48.0,  woche: 287.0, monat: 798.0 },
  { id: "dz1", name: "Doppelzimmer 1 PAX",  pax: 1, nacht: 51.2,  woche: 308.0, monat: 858.0 },
  { id: "dz2", name: "Doppelzimmer 2 PAX",  pax: 2, nacht: 55.0,  woche: 329.0, monat: 930.0 },
  { id: "zbz", name: "Zweibettzimmer",      pax: 2, nacht: 55.0,  woche: 329.0, monat: 930.0 },
  { id: "dbz", name: "Dreibettzimmer",      pax: 3, nacht: 60.0,  woche: 364.0, monat: 1020.0 },
  { id: "vbz", name: "Vierbettzimmer",      pax: 4, nacht: 68.0,  woche: 413.0, monat: 1170.0 },
];

export const PREIS_HINWEISE = [
  "Nachtpreis gilt So–Fr ab 3 Nächten, Wochenpreis ab 7 Nächten, Monatspreis ab 30 Nächten.",
  "Bei Monats- und Wochenzimmern ist wöchentlich eine Reinigung inkl. Bettwäschewechsel inkludiert. Bei kürzeren Aufenthalten wird täglich Klopapier aufgefüllt, Mist entleert und auf Wunsch werden Handtücher gewechselt.",
  "Ab einer Vertragsdauer von 3 Monaten entfällt die Ortstaxe — der finale Preis wird dann individuell gerechnet.",
];

// --- Zusatzleistungen: ebenfalls Flyer, inkl. USt. -------------------------
// "proNacht" entscheidet, ob der Rechner mit der Nächtezahl multipliziert oder
// eine frei wählbare Stückzahl anbietet.
export const EXTRAS = [
  { id: "fruehstueck", name: "Frühstück",        detail: "Buffet im InnSider, täglich 07:30–10:30", preis: 10.8, proNacht: true },
  { id: "abendessen",  name: "Abendessen",       detail: "Im InnSider, Mo–Fr 14:00–19:00",          preis: 15.8, proNacht: true },
  { id: "reinigung",   name: "Zusatzreinigung",  detail: "Gesamtreinigung inkl. Bettwäschewechsel", preis: 16.0, proNacht: false },
  { id: "wechsel",     name: "Reinigung bei MitarbeiterInnenwechsel", detail: "Für einen reibungslosen Wechsel", preis: 21.6, proNacht: false },
  { id: "wipark",      name: "Parken WIPARK Garage", detail: "Tagespauschale, extern",              preis: 16.5, proNacht: true },
  { id: "parkride",    name: "Parken Park&Ride Hetzendorf", detail: "Tagespauschale, extern",       preis: 4.99, proNacht: true },
];

export const EXTRAS_FUSSNOTE =
  "Parken extern, diverse Tarife (Abendpauschale, Tagespauschale, Wochenkarte, Dauerparker).";

// Ab dieser Aufenthaltsdauer entfällt laut Flyer die Ortstaxe. Der Rechner
// nennt das, rechnet es aber nicht heraus — der Anteil wurde nicht übermittelt.
export const ORTSTAXE_FREI_AB_NAECHTEN = 90;

// --- Konditionen ------------------------------------------------------------
export const KONDITIONEN = [
  { frage: "Mindestaufenthalt", antwort: "Keiner. Der Aufenthalt ist zu jedem Monatsende kündbar." },
  { frage: "Kaution", antwort: "Nur bei Schlüsselübergabe oder wenn ein Nebenwohnsitz angemeldet wird." },
  { frage: "Rauchen", antwort: "Nicht gestattet." },
  { frage: "Haustiere", antwort: "Auf Anfrage." },
  { frage: "Barrierefreiheit", antwort: "Auf Anfrage." },
  { frage: "Abrechnung", antwort: "Auf Wunsch Firmenrechnung am Monatsende, Konsumation im InnSider inklusive." },
];

// --- Firmenkunden -----------------------------------------------------------
export const FIRMEN_VORTEILE = [
  "Klare Planbarkeit",
  "Entlastung Ihrer Administration",
  "Flexible Anpassung bei Projektänderungen",
  "Transparente Leistungsstruktur",
];

export const FIRMEN_AUF_EINEN_BLICK = [
  "Modern eingerichtete Zimmer mit eigenem Bad, Klimaanlage & Mini-Kühlschrank",
  "Frühstück und Abendessen optional buchbar",
  "Gemeinschaftsküche & Aufenthaltsräume",
  "Auf Wunsch Firmenrechnung am Monatsende",
  "Attraktive Wochen- & Monatspreise",
];

// --- InnSider ---------------------------------------------------------------
export const INNSIDER = {
  text: "Das InnSider ist ein eigenständiges Restaurant im Haus — und der Ort, an dem Frühstück und Halbpension stattfinden.",
  punkte: [
    "Frühstücksbuffet täglich 07:30–10:30",
    "Frühere Frühstückszeiten nach Absprache möglich",
    "Warme Küche Mo–Fr 11:00–19:00",
    "Konsumation auf Firmenrechnung möglich",
  ],
  bilder: [
    { src: "/img/innsider/innsider-vorspeise.jpg", alt: "Vorspeise im InnSider Restaurant" },
    { src: "/img/innsider/innsider-hauptspeise.jpg", alt: "Hauptspeise im InnSider Restaurant" },
    { src: "/img/innsider/innsider-mehlspeise.jpg", alt: "Mehlspeise im InnSider Restaurant" },
    { src: "/img/innsider/innsider-ausschank.jpg", alt: "Ausschank im InnSider Restaurant" },
  ],
};

// --- Lage: nur was die Flyer-Karte selbst benennt. Keine Gehzeiten. ---------
export const LAGE = [
  "Bahnhof Wien Meidling · U6, S-Bahn, Fernzüge",
  "Euro Plaza",
  "WIPARK Garage & Park&Ride Hetzendorf",
  "A2 / A23 Richtung Süden",
  "Wienerberg / Business Park Wien",
];

// Weitere Standorte existieren laut Betreiber; Namen und Adressen liegen noch
// nicht vor. Bis dahin steht hier kein erfundener Ort.
export const WEITERE_STANDORTE_OFFEN = true;
