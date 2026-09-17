// Inhalte für Do Step Inn Living, zweisprachig.
//
// Quellen, alle vom Betreiber:
//   • DoStepInn-Living_Web_English.docx — Standorte, Zimmertypen, Preisliste,
//     Zielgruppen, Ausstattung. Englische Texte daraus wörtlich übernommen.
//   • Firmenflyer „Ihr Langzeit-Hotel in Wien" — Firmenangebot Meidling.
//   • Website-Texte, Logo, Farbblatt.
//
// Die deutschen Fassungen der Standort- und Zimmertexte sind Übersetzungen des
// englischen Dokuments und noch nicht freigegeben — siehe copy/brand-kit.md.

export const SPRACHEN = ["de", "en"];

export const KONTAKT = {
  email: "reservierung@dostepinn.at",
  telefon: "+43 676 3682844",
  telefonHref: "tel:+436763682844",
  erreichbarkeit: { de: "Mo–Fr 08:00–17:00 Uhr", en: "Mon–Fri 8 am – 5 pm" },
  betreiber: "Kern Beherbergungsbetriebs GmbH",
  home: "https://dostepinn-living.at/",
  agb: "https://dostepinn-living.at/contact-copy/",
};

export const anfrageHref = (betreff, text) =>
  `mailto:${KONTAKT.email}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(text)}`;

// --- Zimmertypen ------------------------------------------------------------
export const ZIMMERTYPEN = [
  {
    id: "standard",
    tarif: "standard",
    name: { de: "Standard Zimmer", en: "Standard room" },
    kern: { de: "Geteiltes Bad", en: "Shared bathroom" },
    text: {
      de: "Als Einzel-, Doppel- oder Zweibettzimmer verfügbar. Mit Mini-Kühlschrank, Geschirr und Besteck, TV und WLAN. Dusche und WC liegen außerhalb des Zimmers und werden geteilt.",
      en: "Available as a single, double- or twin room; equipped with mini fridge, plates and cutlery, TV and WiFi; shared shower and toilet facilities outside",
    },
  },
  {
    id: "standard-hochbett",
    tarif: "standard",
    name: { de: "Standard Zimmer mit Hochbett", en: "Standard room with additional loft bed" },
    kern: { de: "Platz für eine Person mehr", en: "Room for one more" },
    text: {
      de: "Als Einzel-, Doppel- oder Zweibettzimmer mit zusätzlichem Hochbett. Mit Mini-Kühlschrank, Geschirr und Besteck, TV und WLAN. Dusche und WC liegen außerhalb und werden geteilt.",
      en: "Available as a single, double- or twin room with an additional loft bed; equipped with mini fridge, plates and cutlery, TV and WiFi; shared shower and toilet facilities outside",
    },
  },
  {
    id: "premium",
    tarif: "premium",
    name: { de: "Premium Zimmer", en: "Premium room" },
    kern: { de: "Eigenes Bad", en: "Private bathroom" },
    text: {
      de: "Als Einzel-, Doppel- oder Zweibettzimmer mit eigener Dusche und eigenem WC. Mit Mini-Kühlschrank, Geschirr und Besteck, TV und WLAN.",
      en: "Available as a single, double- or twin room; with private shower/toilet facilities, equipped with mini fridge, plates and cutlery, TV and WiFi",
    },
  },
  {
    id: "mini-apartment",
    tarif: "mini",
    name: { de: "Mini-Apartment", en: "Mini-Apartment" },
    kern: { de: "Eigene Küche", en: "Own kitchen" },
    text: {
      de: "Eigene Einheit mit Bad, WC und kleiner Küche.",
      en: "These entities are equipped with bathroom, toilet and a small kitchen",
    },
  },
];

// --- Preise: Preisliste aus dem Living-Webdokument --------------------------
// Inklusive aller Steuern und Serviceleistungen. Keine Zusatzkosten, keine
// Kaution — außer 40 € Schlüsselkaution, die am Ende zurückerstattet wird.
export const TARIFE = {
  standard: {
    name: { de: "Standard Zimmer", en: "Standard room" },
    hinweis: { de: "Zimmertyp 1 + 2", en: "room type 1+2" },
    staffel: [
      { personen: 1, tag: 37, woche: 175, monat: 528 },
      { personen: 2, tag: 45, woche: 205, monat: 594 },
      { personen: 3, tag: 52, woche: 245, monat: 658 },
    ],
  },
  premium: {
    name: { de: "Premium Zimmer", en: "Premium room" },
    hinweis: { de: "Zimmertyp 3", en: "room type 3" },
    staffel: [
      { personen: 1, tag: 45, woche: 199, monat: 594 },
      { personen: 2, tag: 55, woche: 239, monat: 668 },
      { personen: 3, tag: 64, woche: 259, monat: 748 },
    ],
  },
  mini: {
    name: { de: "Mini-Apartment", en: "Mini apartment" },
    hinweis: { de: "Zimmertyp 4", en: "room type 4" },
    staffel: [
      { personen: 1, tag: 49, woche: 228, monat: 685 },
      { personen: 2, tag: 59, woche: 258, monat: 768 },
    ],
  },
};

export const MINDEST_NAECHTE = 7;   // Wochenpreis ab 7 Nächten
export const MONAT_NAECHTE = 30;    // Monatspreis wird immer für 30 Nächte verrechnet
export const SCHLUESSELKAUTION = 40;

export const PREIS_REGELN = {
  de: [
    "Einzelne Tage sind nicht buchbar — der Tagespreis dient nur dazu, einen Wochen- oder Monatsaufenthalt zu verlängern.",
    "Der Wochenpreis setzt einen Aufenthalt von mindestens 7 Nächten voraus.",
    "Der Monatspreis wird immer für 30 Nächte verrechnet.",
    "Alle Preise verstehen sich inklusive Steuern und Serviceleistungen. Strom und Instandhaltung sind im Monatspreis enthalten.",
    "Keine Kaution — ausgenommen 40 € Schlüsselkaution, die am Ende des Aufenthalts zurückerstattet wird.",
  ],
  en: [
    "You cannot book single days — daily rates are only used to add on to a weekly or monthly stay.",
    "The weekly rate requires a minimum stay of 7 nights.",
    "The monthly rate is always charged for 30 nights.",
    "Given prices always include all taxes and service charges. Electricity and maintenance are included in the monthly rent.",
    "No room deposit — apart from a key deposit of € 40, which is returned at the end of your stay.",
  ],
};

// --- Standorte --------------------------------------------------------------
export const STANDORTE = [
  {
    id: "felberstrasse",
    name: "Do Step Inn Hotel",
    strasse: "Felberstraße 20",
    ort: "1150 Wien",
    bahnhof: { de: "Wien Westbahnhof · 3 Minuten zu Fuß", en: "Wien Westbahnhof · 3 minutes on foot" },
    text: {
      de: "Unser Hauptstandort, drei Gehminuten vom Westbahnhof: direkte Busverbindung zum Flughafen, Bahn, die U3 und U6 sowie fünf Straßenbahnhaltestellen. Die Rezeption ist täglich von 7 bis 24 Uhr besetzt und hilft bei allen Fragen weiter.",
      en: "Do Step Inn Hotel is our headquarter, located only a 3 minute's walking distance from Wien-Westbahnhof train station where you find a direct connection to the airport (via bus); the railway; 2 underground lines U3 and U6 as well as 5 tram stops. Our front desk is happy to answer all your questions and assist you with problems daily between 7 am and midnight.",
    },
    zusatz: {
      de: "Neben den Hotelzimmern gibt es im Nachbargebäude zahlreiche Langzeitzimmer. Alle Gäste nutzen die großzügigen Gemeinschaftsflächen: Lounge, Hotelbar, Gemeinschaftsraum, Gästeküche, eine Fun Lounge mit Billard und Darts sowie den Garten.",
      en: "At Do Step Inn Hotel we offer a great variety of private hotel rooms as well as numerous long term rooms in the next door building. All rooms enjoy access to our spacious common areas such as the lounge, the hotel bar, the common room and guest kitchen as well as a fun lounge equipped with billard & dart and our back garden.",
    },
    merkmale: {
      de: ["Rezeption täglich 07:00–24:00", "Lounge, Hotelbar & Gemeinschaftsraum", "Gästeküche", "Billard & Darts", "Garten"],
      en: ["Front desk daily 7 am – midnight", "Lounge, hotel bar & common room", "Guest kitchen", "Billiards & darts", "Back garden"],
    },
  },
  {
    id: "meidling",
    name: "Do Step Inn Meidling",
    strasse: "Wurmbstraße 36",
    ort: "1120 Wien",
    bahnhof: { de: "Wien Meidling · 3 Minuten zu Fuß", en: "Wien Meidling · 3 minutes on foot" },
    text: {
      de: "Drei Gehminuten vom Bahnhof Wien Meidling: direkte Zugverbindung zum Flughafen, Bahn, die U6 sowie mehrere Bus- und Straßenbahnhaltestellen. Direkt gegenüber der Europlaza und in unmittelbarer Nähe vieler Einkaufsmöglichkeiten.",
      en: "Do Step Inn Hotel Meidling is a 3 min walking distance from Wien-Meidling train station where you find a direct connection to the airport (via train); the railway; the underground line U6 and several bus and tram stops. This location is situated in close proximity to a variety of shopping options and located just opposite of the Europlaza.",
    },
    zusatz: {
      de: "Meidling bietet viele Standard Zimmer mit Hochbett sowie zahlreiche Premium Zimmer mit eigenem Bad. Alle Zimmer haben Zugang zur Gemeinschaftsküche und sind mit eigenem Kühlschrank, Geschirr und Besteck ausgestattet. Die Zimmergrößen reichen vom Einzelzimmer bis zu maximal fünf Personen pro Langzeitzimmer.",
      en: "Do Step Inn Meidling offers a great number of standard rooms with additional loft beds as well as countless premium rooms with private bathroom facilities. All our rooms get access to public kitchen facilities and are equipped with a personal small fridge, plates and cutlery in each room. Our room sizes vary from single rooms up to a maximum of 5 people per long term room.",
    },
    merkmale: {
      de: ["Gegenüber der Europlaza", "Gemeinschaftsküche", "Standard mit Hochbett & Premium", "Bis 5 Personen pro Zimmer"],
      en: ["Opposite Europlaza", "Shared kitchen", "Standard with loft bed & premium", "Up to 5 people per room"],
    },
  },
  {
    id: "central",
    name: "Do Step Inn Central",
    strasse: "Südtiroler Platz 3",
    ort: "1040 Wien",
    bahnhof: { de: "Wien Hauptbahnhof · gegenüber", en: "Wien Hauptbahnhof · opposite" },
    text: {
      de: "Direkt gegenüber dem Hauptbahnhof: Direktverbindung zum Flughafen, Bahn, die U1 und mehrere Straßenbahnlinien. Das Schloss Belvedere ist in zehn Gehminuten erreichbar.",
      en: "Do Step Inn Central is located opposite of Wien Hauptbahnhof, the central train station, where you find a direct connection to the airport, the railway, underground line U1 and multiple tram stops. It is also located within a 10 minutes walking distance to Belvedere castle, one Vienna's most popular attractions.",
    },
    zusatz: {
      de: "Am Südtiroler Platz gibt es eine frisch renovierte Wohnung mit drei Mini-Apartment-Doppelzimmern. Alle drei haben ein eigenes Bad, TV, Kühlschrank sowie Geschirr und Besteck; die Küche teilen sich die drei Zimmer.",
      en: "At Südtiroler Platz we offer a newly renovated flat with a total of 3 mini apartment double rooms. All 3 double rooms are equipped with a private bathroom, a TV, a small fridge as well as plates and cutlery and able to access a mutual kitchen shared between the 3 rooms.",
    },
    merkmale: {
      de: ["Frisch renoviert", "3 Mini-Apartment-Doppelzimmer", "Eigenes Bad je Zimmer", "10 Minuten zum Belvedere"],
      en: ["Newly renovated", "3 mini apartment double rooms", "Private bathroom per room", "10 minutes to Belvedere"],
    },
  },
  {
    id: "kollergasse",
    name: "Do Step Inn Kollergasse",
    strasse: "Kollergasse 9",
    ort: "1030 Wien",
    bahnhof: { de: "Wien Mitte · in unmittelbarer Nähe", en: "Wien Mitte · close by" },
    text: {
      de: "In unmittelbarer Nähe der Station Wien Mitte: Direktverbindung zum Flughafen, Bahn, die U3 und U4, Straßenbahn sowie ein großes Einkaufszentrum.",
      en: "Our apartments in Kollergasse are located in close proximity of Wien Mitte station, where you find a direct connection to the airport, the railway, underground line U3 and U4 and tram as well as a large shopping mall.",
    },
    zusatz: {
      de: "In der Kollergasse gibt es eine moderne Wohnung mit mehreren Standard Zimmern mit Hochbett. Alle Zimmer haben TV, Kühlschrank sowie Geschirr und Besteck; Küche, Bad und WC werden geteilt.",
      en: "In Kollergasse we offer a modern flat with several standard rooms with additional loft bed. All rooms are equipped with a TV, a small fridge as well as plates and cutlery and are able to access a mutual kitchen as well as shared bathroom and toilet facilities.",
    },
    merkmale: {
      de: ["Moderne Wohnung", "Standard Zimmer mit Hochbett", "Geteilte Küche & Bad", "U3 und U4"],
      en: ["Modern flat", "Standard rooms with loft bed", "Shared kitchen & bathroom", "U3 and U4"],
    },
  },
];

// --- „Easy living" ----------------------------------------------------------
export const VORTEILE = {
  de: [
    "Fixe Monatsmiete, ohne Zusatzkosten für Strom oder Instandhaltung",
    "Einzug ohne Kaution",
    "Zimmer in allen Größen und für jedes Budget, mit oder ohne eigenes Bad",
    "Jedes Zimmer mit TV, Geschirr, Besteck und Kühlschrank, dazu Gemeinschaftsküche und kostenloses WLAN",
    "Als Hotel sind wir bei technischen Problemen und Instandhaltung immer ansprechbar",
    "Zentrale Standorte in ganz Wien, alle bestens an die Öffis und die Bahnhöfe angebunden",
  ],
  en: [
    "We offer a fixed monthly rent without any additional costs for electricity or maintenance",
    "You are able to move in without having to pay a deposit",
    "Rooms in all shapes and sizes, for all budgets, both with and without private bathroom facilities",
    "All rooms are equipped with their own TV, plates, cutlery and fridge and have access to common kitchen facilities. All rooms offer free WiFi",
    "As a hotel, we are always available to assist with technical difficulties and maintenance issues",
    "Our long term rooms are situated in different central locations throughout Vienna; all locations offer perfect access to public transport as well as Vienna's main train stations",
  ],
};

export const ZIELGRUPPEN = {
  de: [
    "Alle, die längerfristig eine Unterkunft suchen",
    "Studierende jeden Alters",
    "Pendelnde und Arbeitssuchende ohne festen Wohnsitz in Wien",
    "Wer eine Stadtwohnung sucht und eine Übergangslösung braucht",
    "Unternehmen, die Mitarbeitende längerfristig unterbringen",
  ],
  en: [
    "All individuals looking for long term accommodation",
    "Students of all ages",
    "Migrant workers and job hunters without permanent residency",
    "Individuals who search for a city apartment and need a transitional, interim solution",
    "Companies looking for long-term accommodation for employees",
  ],
};

export const AUSSTATTUNG_TEXT = {
  de: "Alle Unterkünfte sind sauber, modern und voll möbliert. Ob mit oder ohne eigenes Bad — jedes Zimmer hat TV, Kühlschrank, Geschirr und Besteck. Dazu kommen die Gemeinschaftsküche und kostenloses WLAN. Handtücher und Bettwäsche sind im Preis enthalten, ebenso die wöchentliche Reinigung der Gemeinschaftsflächen. Die Reinigung des eigenen Zimmers durch unser Personal lässt sich gegen Aufpreis dazubuchen.",
  en: "All our accommodations are clean, modern and fully furnished. No matter if you choose a room with or without private bathroom, all rooms will be equipped with their own TV, fridge, plates and cutlery. You will also have access to common kitchen facilities and be able to use our free WiFi. Towels and linen are included in the price, so is a weekly cleaning of the common areas. Cleaning of your long-term room by our staff can be arranged for an additional fee.",
};

// --- Firmenkunden: aus dem Firmenflyer -------------------------------------
export const FIRMEN = {
  vorteile: {
    de: ["Klare Planbarkeit", "Entlastung Ihrer Administration", "Flexible Anpassung bei Projektänderungen", "Transparente Leistungsstruktur"],
    en: ["Clear planning", "Less work for your administration", "Flexible adjustment when projects change", "Transparent structure of services"],
  },
};

// --- InnSider ---------------------------------------------------------------
export const INNSIDER = {
  text: {
    de: "Das InnSider ist ein eigenständiges Restaurant im Haus — und der Ort, an dem Frühstück und Halbpension stattfinden.",
    en: "The InnSider is a restaurant in its own right, here in the building — and where breakfast and half board take place.",
  },
  punkte: {
    de: ["Frühstücksbuffet täglich 07:30–10:30", "Frühere Frühstückszeiten nach Absprache möglich", "Warme Küche Mo–Fr 11:00–19:00", "Konsumation auf Firmenrechnung möglich"],
    en: ["Breakfast buffet daily 7:30–10:30 am", "Earlier breakfast by arrangement", "Hot food Mon–Fri 11 am – 7 pm", "Can be put on the company invoice"],
  },
  bilder: [
    { src: "/img/innsider/innsider-vorspeise.jpg", alt: { de: "Vorspeise im InnSider Restaurant", en: "Starter at the InnSider restaurant" } },
    { src: "/img/innsider/innsider-hauptspeise.jpg", alt: { de: "Hauptspeise im InnSider Restaurant", en: "Main course at the InnSider restaurant" } },
    { src: "/img/innsider/innsider-mehlspeise.jpg", alt: { de: "Mehlspeise im InnSider Restaurant", en: "Dessert at the InnSider restaurant" } },
    { src: "/img/innsider/innsider-ausschank.jpg", alt: { de: "Ausschank im InnSider Restaurant", en: "At the bar of the InnSider restaurant" } },
  ],
};

export const KONDITIONEN = [
  { frage: { de: "Mindestaufenthalt", en: "Minimum stay" }, antwort: { de: "7 Nächte. Danach zu jedem Monatsende kündbar.", en: "7 nights. After that, cancellable at the end of any month." } },
  { frage: { de: "Kaution", en: "Deposit" }, antwort: { de: "Keine — außer 40 € Schlüsselkaution, die zurückerstattet wird.", en: "None — apart from a € 40 key deposit, which is returned." } },
  { frage: { de: "Nebenkosten", en: "Running costs" }, antwort: { de: "Strom und Instandhaltung sind in der Monatsmiete enthalten.", en: "Electricity and maintenance are included in the monthly rent." } },
  { frage: { de: "Rauchen", en: "Smoking" }, antwort: { de: "Nicht gestattet.", en: "Not permitted." } },
  { frage: { de: "Haustiere", en: "Pets" }, antwort: { de: "Auf Anfrage.", en: "On request." } },
  { frage: { de: "Barrierefreiheit", en: "Accessibility" }, antwort: { de: "Auf Anfrage.", en: "On request." } },
];
