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

/**
 * Buchungsmaschine. Nur die Hotelzimmer sind online buchbar -- Apartment- und
 * Langzeitzimmer laufen laut Betreiber ueber Anfrage. Das Skript und das
 * Stylesheet liegen in index.html, wie vom Anbieter vorgegeben.
 */
export const IBE = {
  schluessel: "f291a9eb-f08c-4cfc-b119-ce5c644b691e",
  anbieter: "uphotel.agency",
  hinweis: {
    de: "Online buchbar sind die Hotelzimmer. Apartmentwohnungen und Langzeitzimmer vergeben wir auf Anfrage — schreib uns einfach.",
    en: "The hotel rooms can be booked online. Apartment flats and long-stay rooms are arranged on request — just write to us.",
  },
  ersatz: {
    de: "Die Buchungsmaske lässt sich gerade nicht laden. Schreib uns den Zeitraum und wir melden uns mit einem Angebot zurück.",
    en: "The booking mask cannot be loaded right now. Write to us with your dates and we will come back with an offer.",
  },
};

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
/**
 * Aufnahmen aus den Zimmern. Bewusst nicht einzelnen Zimmertypen zugeordnet:
 * aus den Bildern geht nicht hervor, ob ein Standard- oder ein Premiumzimmer
 * zu sehen ist, und das zu behaupten waere geraten. Die Zeilen beschreiben
 * deshalb nur, was tatsaechlich im Bild ist.
 */
/**
 * Diese Aufnahmen zeigen Hotelzimmer, nicht Apartmentzimmer -- die beiden
 * Produkte sehen deutlich verschieden aus. Weil das Bildband in der Sektion
 * ueber die Zimmertypen steht, muss der Unterschied dabeistehen, sonst liest
 * man die Bilder als Abbildung der vier Typen.
 */
export const ZIMMER_BILDER_HINWEIS = {
  de: "Aufnahmen aus den Hotelzimmern.",
  en: "Photographs of the hotel rooms.",
};

export const ZIMMER_BILDER = [
  {
    src: "/img/zimmer/zimmer-raum.jpg",
    titel: { de: "Tageslicht", en: "Daylight" },
    alt: { de: "Zimmer mit Bett, Dachschräge und Fenster zur Stadt", en: "Room with bed, sloped ceiling and a window onto the city" },
  },
  {
    src: "/img/zimmer/zimmer-arbeiten.jpg",
    titel: { de: "Arbeiten", en: "Working" },
    alt: { de: "Gast arbeitet mit Laptop am Bett, Telefonat am Fenster", en: "A guest working on a laptop on the bed, on the phone by the window" },
  },
  {
    src: "/img/zimmer/zimmer-ankommen.jpg",
    titel: { de: "Ankommen", en: "Settling in" },
    alt: { de: "Gast räumt den Schrank ein, Koffer daneben, Fernseher an der Wand", en: "A guest unpacking into the wardrobe, suitcase beside it, TV on the wall" },
  },
  {
    src: "/img/zimmer/zimmer-tuer.jpg",
    titel: { de: "An der Tür", en: "At the door" },
    alt: { de: "Gast mit Telefon an der Zimmertür, Garderobenhaken und Türschild", en: "A guest with a phone at the room door, coat hooks and door hanger" },
  },
];

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

// --- Preise: Firmenflyer „Ihr Langzeit-Hotel in Wien" ----------------------
// Inklusive USt. und Ortstaxe. Vom Betreiber als verbindlich bestätigt — die
// Netto-Liste der Website und die Staffel aus dem Living-Webdokument werden
// bewusst nicht verwendet, damit nie zwei Grundlagen vermischt werden.
export const KATEGORIEN = [
  { id: "ez",  name: { de: "Einzelzimmer", en: "Single room" },              nacht: 48.0, woche: 287.0, monat: 798.0 },
  { id: "dz1", name: { de: "Doppelzimmer 1 PAX", en: "Double room, 1 pax" }, nacht: 51.2, woche: 308.0, monat: 858.0 },
  { id: "dz2", name: { de: "Doppelzimmer 2 PAX", en: "Double room, 2 pax" }, nacht: 55.0, woche: 329.0, monat: 930.0 },
  { id: "zbz", name: { de: "Zweibettzimmer", en: "Twin room" },              nacht: 55.0, woche: 329.0, monat: 930.0 },
  { id: "dbz", name: { de: "Dreibettzimmer", en: "Triple room" },            nacht: 60.0, woche: 364.0, monat: 1020.0 },
  { id: "vbz", name: { de: "Vierbettzimmer", en: "Quadruple room" },         nacht: 68.0, woche: 413.0, monat: 1170.0 },
];

// Zusatzleistungen, ebenfalls Firmenflyer, inkl. USt.
// "proNacht" entscheidet, ob der Rechner mit der Nächtezahl multipliziert oder
// eine frei wählbare Stückzahl anbietet.
export const EXTRAS = [
  { id: "fruehstueck", preis: 10.8, proNacht: true,
    name: { de: "Frühstück", en: "Breakfast" },
    detail: { de: "Buffet im InnSider, täglich 07:30–10:30", en: "Buffet at the InnSider, daily 7:30–10:30 am" } },
  { id: "abendessen", preis: 15.8, proNacht: true,
    name: { de: "Abendessen", en: "Dinner" },
    detail: { de: "Im InnSider, Mo–Fr 14:00–19:00", en: "At the InnSider, Mon–Fri 2–7 pm" } },
  { id: "reinigung", preis: 16.0, proNacht: false,
    name: { de: "Zusatzreinigung", en: "Extra cleaning" },
    detail: { de: "Gesamtreinigung inkl. Bettwäschewechsel", en: "Full clean including a change of linen" } },
  { id: "wechsel", preis: 21.6, proNacht: false,
    name: { de: "Reinigung bei MitarbeiterInnenwechsel", en: "Cleaning between staff changes" },
    detail: { de: "Für einen reibungslosen Wechsel", en: "For a smooth handover" } },
  { id: "wipark", preis: 16.5, proNacht: true,
    name: { de: "Parken WIPARK Garage", en: "Parking, WIPARK garage" },
    detail: { de: "Tagespauschale, extern", en: "Daily rate, external" } },
  { id: "parkride", preis: 4.99, proNacht: true,
    name: { de: "Parken Park&Ride Hetzendorf", en: "Parking, Park&Ride Hetzendorf" },
    detail: { de: "Tagespauschale, extern", en: "Daily rate, external" } },
];

export const EXTRAS_FUSSNOTE = {
  de: "Parken extern, diverse Tarife (Abendpauschale, Tagespauschale, Wochenkarte, Dauerparker).",
  en: "Parking is external, various rates available (evening, daily, weekly, season ticket).",
};

export const MINDEST_NAECHTE = 3;   // Nachtpreis gilt laut Flyer ab 3 Nächten
export const MONAT_NAECHTE = 30;
export const SCHLUESSELKAUTION = 40;

export const PREIS_REGELN = {
  de: [
    "Alle Preise inkl. USt. und Ortstaxe, pro Zimmer. Angebot nach Verfügbarkeit, Preisänderungen vorbehalten.",
    "Der Nachtpreis gilt ab 3 Nächten (So–Fr), der Wochenpreis ab 7 Nächten, der Monatspreis ab 30 Nächten.",
    "Bei Monats- und Wochenzimmern ist wöchentlich eine Reinigung inkl. Bettwäschewechsel inkludiert. Bei kürzeren Aufenthalten wird täglich Klopapier aufgefüllt, Mist entleert und auf Wunsch werden Handtücher gewechselt.",
    "Ab einer Vertragsdauer von 3 Monaten entfällt die Ortstaxe — der finale Preis wird dann individuell gerechnet.",
    "Keine Kaution — ausgenommen 40 € Schlüsselkaution, die am Ende des Aufenthalts zurückerstattet wird.",
  ],
  en: [
    "All prices include VAT and city tax, per room. Subject to availability; prices may change.",
    "The nightly rate applies from 3 nights (Sun–Fri), the weekly rate from 7 nights, the monthly rate from 30 nights.",
    "Weekly and monthly rooms include one clean per week with a change of linen. On shorter stays, toilet paper is restocked daily, bins are emptied and towels changed on request.",
    "From a contract term of 3 months the city tax no longer applies — the final price is then calculated individually.",
    "No deposit — apart from a € 40 key deposit, returned at the end of your stay.",
  ],
};

// --- Standorte --------------------------------------------------------------
/**
 * Zwei verschiedene Dinge stehen in dieser Liste, und das muss sichtbar sein:
 * die Do-Step-Inn-Hotels einerseits, die Apartmentwohnungen andererseits.
 * Suedtiroler Platz und Kollergasse hiessen hier faelschlich "Do Step Inn" --
 * sie sind keine Hotels, sondern Wohnungen. In der Felberstrasse gibt es
 * beides. Deshalb traegt jeder Eintrag ein `art`-Feld, das auf der Karte steht.
 */
export const STANDORTE = [
  {
    id: "felberstrasse",
    name: "Do Step Inn Hotel",
    art: { de: "Hotel & Apartmentwohnungen", en: "Hotel & apartment flats" },
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
    art: { de: "Hotel", en: "Hotel" },
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
    name: "Apartmentwohnung Südtiroler Platz",
    art: { de: "Apartmentwohnung", en: "Apartment flat" },
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
    name: "Apartmentwohnung Kollergasse",
    art: { de: "Apartmentwohnung", en: "Apartment flat" },
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

/**
 * Die Gemeinschaftsküche. Der Ausstattungstext nennt sie, bisher ohne Bild --
 * und sie ist der Unterschied zwischen "Zimmer" und "auf Zeit wohnen".
 */
export const GEMEINSCHAFT_BILDER = [
  {
    src: "/img/haus/kueche-arbeitsflaeche.jpg",
    titel: { de: "Gemeinschaftsküche", en: "Shared kitchen" },
    alt: { de: "Küche mit Ziegelwand, Arbeitsflächen aus Edelstahl, Töpfen, Mikrowelle und Dunstabzug", en: "Kitchen with brick wall, stainless steel counters, pots, microwave and extractor hood" },
  },
  {
    src: "/img/haus/kueche-tisch.jpg",
    titel: { de: "Platz zum Essen", en: "Somewhere to eat" },
    alt: { de: "Hoher Gemeinschaftstisch mit Stühlen neben Kochfeld und Spüle", en: "A high communal table with chairs beside the hob and sink" },
  },
];

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
    { src: "/img/innsider/innsider-vorspeise.jpg",     titel: { de: "Vorspeise",        en: "Starter" },        alt: { de: "Angerichtete Vorspeise im InnSider", en: "Plated starter at the InnSider" } },
    { src: "/img/innsider/innsider-teller-fisch.jpg",  titel: { de: "Aus der Küche",    en: "From the kitchen" }, alt: { de: "Hauptgang mit Fisch, am Teller angerichtet", en: "Fish main course, plated" } },
    { src: "/img/innsider/innsider-hauptspeise.jpg",   titel: { de: "Hauptgang",        en: "Main course" },     alt: { de: "Hauptgang mit Knödeln im InnSider", en: "Main course with dumplings at the InnSider" } },
    { src: "/img/innsider/innsider-teller-tatar.jpg",  titel: { de: "Tagesempfehlung",  en: "Today's pick" },    alt: { de: "Angerichteter Gang im InnSider", en: "Plated course at the InnSider" } },
    { src: "/img/innsider/innsider-mehlspeise.jpg",    titel: { de: "Mehlspeise",       en: "Dessert" },         alt: { de: "Süße Mehlspeise im InnSider", en: "Sweet dessert at the InnSider" } },
    { src: "/img/innsider/innsider-karte.jpg",         titel: { de: "Karte",            en: "The menu" },        alt: { de: "Getränkekarte mit Aperitif im InnSider", en: "Drinks menu with an aperitif at the InnSider" } },
    { src: "/img/innsider/innsider-ausschank.jpg",     titel: { de: "Ausschank",        en: "At the tap" },      alt: { de: "Bier wird im InnSider frisch gezapft", en: "Beer being poured at the InnSider" } },
    { src: "/img/innsider/innsider-bar.jpg",           titel: { de: "Die Bar",          en: "The bar" },         alt: { de: "Gast an der Bar im InnSider", en: "A guest at the InnSider bar" } },
    { src: "/img/innsider/innsider-gastraum.jpg",      titel: { de: "Gastraum",         en: "The dining room" }, alt: { de: "Zwei Gäste beim Essen im Gastraum des InnSider", en: "Two guests dining in the InnSider dining room" } },
    { src: "/img/innsider/innsider-service.jpg",       titel: { de: "Service",          en: "Service" },         alt: { de: "Mitarbeiterin hinter der Bar mit einer Rose", en: "A member of staff behind the bar, holding a rose" } },
    { src: "/img/innsider/innsider-service-rose.jpg",  titel: { de: "Hinter der Bar",   en: "Behind the bar" },  alt: { de: "Mitarbeiterin bei der Arbeit hinter der Bar", en: "A member of staff at work behind the bar" } },
    { src: "/img/innsider/innsider-anstossen.jpg",     titel: { de: "Anstoßen",         en: "A toast" },         alt: { de: "Gäste stoßen mit Aperol Spritz an", en: "Guests raising Aperol spritz glasses" } },
    { src: "/img/innsider/innsider-abend.jpg",         titel: { de: "Abend",            en: "Evening" },         alt: { de: "Zwei Gäste am Abend im InnSider", en: "Two guests at the InnSider in the evening" } },
    { src: "/img/innsider/innsider-tanz.jpg",          titel: { de: "Später Abend",     en: "Late evening" },    alt: { de: "Gäste tanzen an der Bar im InnSider", en: "Guests dancing at the InnSider bar" } },
  ],
};

export const KONDITIONEN = [
  { frage: { de: "Mindestaufenthalt", en: "Minimum stay" }, antwort: { de: "Kein fixer Mindestaufenthalt. Die Nachtpreise laut Firmenflyer gelten ab 3 Nächten. Zu jedem Monatsende kündbar.", en: "No fixed minimum stay. The nightly rates in the company flyer apply from 3 nights. Cancellable at the end of any month." } },
  { frage: { de: "Kaution", en: "Deposit" }, antwort: { de: "Keine — außer 40 € Schlüsselkaution, die zurückerstattet wird.", en: "None — apart from a € 40 key deposit, which is returned." } },
  { frage: { de: "Nebenkosten", en: "Running costs" }, antwort: { de: "Strom und Instandhaltung sind in der Monatsmiete enthalten.", en: "Electricity and maintenance are included in the monthly rent." } },
  { frage: { de: "Rauchen", en: "Smoking" }, antwort: { de: "Nicht gestattet.", en: "Not permitted." } },
  { frage: { de: "Haustiere", en: "Pets" }, antwort: { de: "Auf Anfrage.", en: "On request." } },
  { frage: { de: "Barrierefreiheit", en: "Accessibility" }, antwort: { de: "Auf Anfrage.", en: "On request." } },
];
