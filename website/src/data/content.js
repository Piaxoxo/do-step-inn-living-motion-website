// Content for Do Step Inn Living.
//
// Everything here comes from material supplied by the operator: the live site
// texts, the company flyer ("Ihr Langzeit-Hotel in Wien") and the brand sheet.
// Nothing is invented. Where the two sources disagree, the live site text wins
// and the conflict is noted in copy/brand-kit.md — see "Offene Punkte".

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

export const ANFRAGE_HREF =
  "mailto:reservierung@dostepinn.at" +
  "?subject=" + encodeURIComponent("Anfrage Do Step Inn Living") +
  "&body=" + encodeURIComponent("Hallo,\n\nich hätte eine Anfrage...");

// Was jedes Apartment mitbringt — von der Website.
export const AUSSTATTUNG = [
  "Voll möbliert & bezugsfertig",
  "Eigene Küche oder Kitchenette",
  "Modernes Bad",
  "WLAN inklusive",
  "Gute öffentliche Anbindung",
  "Flexible Mietdauer",
];

// Zimmerausstattung — aus dem Firmenflyer.
export const ZIMMERAUSSTATTUNG = [
  "Private Dusche/WC",
  "Sat-TV & High-Speed WLAN",
  "Klimaanlage",
  "Mini-Kühlschrank",
];

// Preise: Basispreis (netto) = Zimmer, zzgl. MwSt. und Ortstaxe.
// Nur die Spalte "3–5 Nächte" liegt netto vor; Wochen- und Monatspreise
// existieren, die Nettowerte wurden aber nicht übermittelt.
export const PREIS_BASIS = "Basispreis (netto) = Zimmer · zzgl. MwSt. und Ortstaxe";

export const ZIMMER = [
  { name: "Einzelzimmer", preis: "39,60" },
  { name: "Doppelzimmer 1 PAX", preis: "43,20" },
  { name: "Doppelzimmer 2 PAX", preis: "47,60" },
  { name: "Zweibettzimmer", preis: "49,60" },
  { name: "Dreibettzimmer", preis: "56,80" },
  { name: "Vierbettzimmer", preis: "63,60" },
];

export const PREIS_HINWEISE = [
  "Bei längeren Aufenthalten ist im Wochenpreis & Monatspreis nach 2 Wochen eine Zusatzreinigung inkludiert.",
  "Ab einer Vertragsdauer von 3 Monaten oder mehr entfällt die Ortstaxe.",
];

// Wochen- und Monatspreise sind angekündigt, liegen netto aber nicht vor.
export const WOCHEN_MONATSPREIS_OFFEN = true;

export const LEISTUNGEN = [
  { name: "Frühstück", detail: "Täglich flexibel buchbar", preis: "9,82" },
  { name: "Abendessen", detail: "Mo–Fr von 14:00–19:00", preis: "12,90" },
  { name: "Bleibezimmer Service", detail: "Pro Reinigung*", preis: "7,27" },
  { name: "Zusatzreinigung", detail: "Gesamtreinigung inkl. Bettwäschewechsel", preis: "14,55" },
  { name: "Zusatzreinigung bei MitarbeiterInnenwechsel", detail: "Für einen reibungslosen Wechsel", preis: "19,64" },
  { name: "Parken WIPARK Garage", detail: "Tagespauschale**", preis: "16,50" },
  { name: "Parken Park&Ride Hetzendorf", detail: "Tagespauschale**", preis: "4,60" },
];

export const LEISTUNGEN_FUSSNOTEN = [
  "* Reinigung des Bads, Auffüllen von WC-Papier & Handtuchtausch",
  "** Extern, diverse Tarife (Abendpauschale, Tagespauschale, Wochenkarte, Dauerparker)",
];

// InnSider Restaurant, im Haus — aus dem Firmenflyer.
export const RESTAURANT = [
  "Frühstücksbuffet täglich 07:30–10:30",
  "Frühere Frühstückszeiten nach Absprache möglich",
  "Warme Küche Mo–Fr 11:00–19:00",
  "Konsumation auf Firmenrechnung möglich",
];

// Firmenkunden — aus dem Flyer.
export const FIRMEN_VORTEILE = [
  "Klare Planbarkeit",
  "Entlastung Ihrer Administration",
  "Flexible Anpassung bei Projektänderungen",
  "Transparente Leistungsstruktur",
];

export const FIRMEN_AUF_EINEN_BLICK = [
  "Modern eingerichtete Hotelzimmer mit eigenem Bad, Klimaanlage & Mini-Kühlschrank",
  "Frühstück und Abendessen optional buchbar",
  "Gemeinschaftsküche & Aufenthaltsräume",
  "Auf Wunsch Firmenrechnung am Monatsende",
  "Attraktive Wochen- & Monatspreise",
];

// Nur was die Karte im Flyer selbst benennt — keine erfundenen Gehzeiten.
export const LAGE = [
  "Bahnhof Wien Meidling · U6, S-Bahn, Fernzüge",
  "Euro Plaza",
  "InnSider Restaurant im Haus",
  "WIPARK Garage & Park&Ride Hetzendorf",
  "A2 / A23 Richtung Süden",
  "Wienerberg / Business Park Wien",
];
