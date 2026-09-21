// Rechtstexte.
//
// Das Impressum übernimmt die Angaben aus dem veröffentlichten Impressum der
// Kern Beherbergungsbetriebs GmbH — dieselbe Gesellschaft, dieselbe Adresse wie
// der Living-Hauptstandort. Die Datenschutzerklärung beschreibt, was diese
// Seite technisch tatsächlich tut. Beides gehört vor einer Veröffentlichung
// juristisch geprüft; die AGB kann und darf hier niemand erfinden.

export const RECHT_PRUEFHINWEIS = {
  de: "Dieser Text wurde aus den Angaben des Betreibers zusammengestellt und ist noch nicht juristisch geprüft. Vor einer Veröffentlichung bitte von einer Rechtsberatung freigeben lassen.",
  en: "This text was compiled from information supplied by the operator and has not been reviewed by a lawyer. Please have it approved before publication.",
};

export const IMPRESSUM = {
  titel: { de: "Impressum", en: "Legal notice" },
  intro: {
    de: "Offenlegung nach § 5 ECG, § 14 UGB und § 25 MedienG.",
    en: "Disclosure pursuant to § 5 ECG, § 14 UGB and § 25 MedienG (Austria).",
  },
  bloecke: [
    {
      titel: { de: "Unternehmen", en: "Company" },
      zeilen: [
        { k: { de: "Firma", en: "Company" }, v: "Kern Beherbergungsbetriebs GmbH" },
        { k: { de: "Marke", en: "Brand" }, v: "Do Step Inn · Do Step Inn Living" },
        { k: { de: "Anschrift", en: "Address" }, v: "Felberstraße 20, 1150 Wien, Österreich" },
      ],
    },
    {
      titel: { de: "Kontakt", en: "Contact" },
      zeilen: [
        { k: { de: "E-Mail", en: "Email" }, v: "office@dostepinn.at", href: "mailto:office@dostepinn.at" },
        { k: { de: "Reservierung Living", en: "Living reservations" }, v: "reservierung@dostepinn.at", href: "mailto:reservierung@dostepinn.at" },
        { k: { de: "Telefon", en: "Phone" }, v: "+43 676 3682844", href: "tel:+436763682844" },
      ],
    },
    {
      titel: { de: "Register & UID", en: "Register & VAT" },
      zeilen: [
        { k: { de: "Firmenbuchnummer", en: "Company register number" }, v: "FN 253911 z" },
        { k: { de: "Firmenbuchgericht", en: "Register court" }, v: "Handelsgericht Wien" },
        { k: { de: "UID-Nummer", en: "VAT number" }, v: "ATU61356623" },
      ],
    },
    {
      titel: { de: "Vertretung", en: "Management" },
      zeilen: [{ k: { de: "Geschäftsführer", en: "Managing director" }, v: "Mag. Gerald Kern" }],
    },
    {
      titel: { de: "Unternehmensgegenstand", en: "Business activity" },
      zeilen: [
        { k: { de: "Tätigkeit", en: "Activity" }, v: { de: "Beherbergung von Gästen", en: "Accommodation of guests" } },
        { k: { de: "Kammer", en: "Chamber" }, v: { de: "Wirtschaftskammer Wien, Fachgruppe Hotellerie", en: "Vienna Economic Chamber, hotel trade division" } },
        { k: { de: "Gewerberecht", en: "Trade law" }, v: { de: "Gewerbeordnung (GewO), ris.bka.gv.at", en: "Austrian Trade Regulation Act (GewO), ris.bka.gv.at" } },
        { k: { de: "Aufsichtsbehörde", en: "Supervisory authority" }, v: { de: "Magistrat der Stadt Wien", en: "Municipality of the City of Vienna" } },
      ],
    },
  ],
  odr: {
    de: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: ec.europa.eu/consumers/odr. Unsere E-Mail-Adresse für Verbraucheranfragen lautet office@dostepinn.at. Wir sind nicht verpflichtet und grundsätzlich nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    en: "The European Commission provides a platform for online dispute resolution: ec.europa.eu/consumers/odr. Our email address for consumer enquiries is office@dostepinn.at. We are neither obliged nor generally willing to take part in dispute resolution proceedings before a consumer arbitration board.",
  },
};

export const DATENSCHUTZ = {
  titel: { de: "Datenschutzerklärung", en: "Privacy policy" },
  intro: {
    de: "Diese Erklärung beschreibt, was diese Website technisch tatsächlich tut. Sie ist bewusst kurz, weil die Seite wenig tut.",
    en: "This policy describes what this website actually does technically. It is deliberately short, because the site does very little.",
  },
  abschnitte: [
    {
      titel: { de: "Verantwortlicher", en: "Controller" },
      text: {
        de: "Kern Beherbergungsbetriebs GmbH, Felberstraße 20, 1150 Wien, office@dostepinn.at. Die vollständigen Angaben stehen im Impressum.",
        en: "Kern Beherbergungsbetriebs GmbH, Felberstraße 20, 1150 Vienna, office@dostepinn.at. Full details are in the legal notice.",
      },
    },
    {
      titel: { de: "Keine Cookies, keine Analyse", en: "No cookies, no analytics" },
      text: {
        de: "Diese Website setzt keine Cookies, bindet keine Analyse- oder Trackingdienste ein und erstellt keine Profile. Es gibt deshalb auch keinen Cookie-Banner.",
        en: "This website sets no cookies, embeds no analytics or tracking services and builds no profiles. That is why there is no cookie banner.",
      },
    },
    {
      titel: { de: "Kein Kontaktformular", en: "No contact form" },
      text: {
        de: "Die Anfrage-Schaltflächen öffnen Ihr eigenes E-Mail-Programm mit einem vorbereiteten Text. Es werden dabei keine Daten an diese Website übermittelt — Ihre Nachricht geht direkt von Ihnen an reservierung@dostepinn.at. Was Sie uns dort schreiben, verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO).",
        en: "The enquiry buttons open your own email program with prepared text. No data is transmitted to this website — your message goes directly from you to reservierung@dostepinn.at. We use what you write to us there solely to process your enquiry (Art. 6(1)(b) GDPR).",
      },
    },
    {
      titel: { de: "Hosting", en: "Hosting" },
      text: {
        de: "Die Website wird bei Vercel Inc. gehostet. Beim Abruf werden technisch notwendige Server-Logdaten verarbeitet (IP-Adresse, Zeitpunkt, abgerufene Datei, Browsertyp). Rechtsgrundlage ist unser berechtigtes Interesse am sicheren Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).",
        en: "The website is hosted by Vercel Inc. On access, technically necessary server log data is processed (IP address, time, file requested, browser type). The legal basis is our legitimate interest in operating the site securely (Art. 6(1)(f) GDPR).",
      },
    },
    {
      titel: { de: "Schriftarten von Google", en: "Google Fonts" },
      text: {
        de: "Die Schriften werden derzeit von Google-Servern geladen. Dabei wird Ihre IP-Adresse an Google übertragen. Wir empfehlen dem Betreiber, die Schriften selbst auszuliefern — dann entfällt diese Übertragung ersatzlos.",
        en: "The typefaces are currently loaded from Google servers, which transmits your IP address to Google. We recommend the operator self-host the fonts, which removes this transfer entirely.",
      },
      warnung: true,
    },
    {
      titel: { de: "Ihre Rechte", en: "Your rights" },
      text: {
        de: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenden Sie sich dafür an office@dostepinn.at. Außerdem können Sie sich bei der österreichischen Datenschutzbehörde beschweren (dsb.gv.at).",
        en: "You have the right to information, rectification, erasure, restriction of processing, data portability and objection. Please contact office@dostepinn.at. You may also lodge a complaint with the Austrian Data Protection Authority (dsb.gv.at).",
      },
    },
  ],
};

export const AGB = {
  titel: { de: "Allgemeine Geschäftsbedingungen", en: "Terms and conditions" },
  intro: {
    de: "Die AGB müssen vom Betreiber kommen — Vertragsbedingungen lassen sich nicht erfinden. Die folgende Gliederung zeigt, welche Punkte ein Beherbergungsvertrag üblicherweise regelt. Sobald die Texte vorliegen, stehen sie hier.",
    en: "The terms must come from the operator — contractual conditions cannot be invented. The outline below shows the points an accommodation contract usually covers. As soon as the texts exist, they appear here.",
  },
  offen: true,
  punkte: {
    de: [
      "Geltungsbereich und Vertragspartner",
      "Vertragsabschluss, Anzahlung und Schlüsselkaution",
      "Beginn und Ende des Aufenthalts, Check-in und Check-out",
      "Kündigung zum Monatsende, Rücktritt und Stornobedingungen",
      "Leistungen, Zusatzleistungen und deren Abrechnung",
      "Preise, Ortstaxe und Zahlungsbedingungen",
      "Hausordnung, Rauchverbot, Haustiere",
      "Haftung, Verwahrung mitgebrachter Sachen",
      "Meldepflicht und Nebenwohnsitz",
      "Gerichtsstand und anwendbares Recht",
    ],
    en: [
      "Scope and contracting parties",
      "Conclusion of contract, advance payment and key deposit",
      "Start and end of the stay, check-in and check-out",
      "Notice to the end of the month, withdrawal and cancellation terms",
      "Services, additional services and how they are invoiced",
      "Prices, city tax and payment terms",
      "House rules, smoking ban, pets",
      "Liability, safekeeping of belongings",
      "Registration requirements and secondary residence",
      "Place of jurisdiction and applicable law",
    ],
  },
};
