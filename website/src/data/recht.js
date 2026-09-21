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

/**
 * AGB-Entwurf.
 *
 * Ausformuliert ist, was durch das Material des Betreibers gedeckt ist:
 * Preise und Ortstaxe aus dem Firmenflyer, die 40-€-Schlüsselkaution, die
 * Kündigung zum Monatsende, Rauchverbot, Haustiere und Barrierefreiheit auf
 * Anfrage, der Reinigungsrhythmus, die Firmenrechnung.
 *
 * Jede Stelle, an der eine Frist, ein Betrag oder eine Rechtswahl zu treffen
 * wäre, steht als `offen` markiert im Text — statt eine Zahl zu erfinden, die
 * später jemanden bindet. Ein Beherbergungsvertrag ist ein Vertrag; Fristen und
 * Stornosätze sind unternehmerische Entscheidungen, keine Formulierungsfragen.
 */
export const AGB = {
  titel: { de: "Allgemeine Geschäftsbedingungen", en: "Terms and conditions" },
  intro: {
    de: "Für Beherbergungsverträge zwischen der Kern Beherbergungsbetriebs GmbH und ihren Gästen. Ausformuliert ist, was durch die Angaben des Betreibers gedeckt ist; offene Punkte sind im Text markiert.",
    en: "For accommodation contracts between Kern Beherbergungsbetriebs GmbH and its guests. What the operator's own information covers is written out; open points are marked in the text.",
  },
  uebersetzungshinweis: {
    de: null,
    en: "This English version is a convenience translation. In case of doubt, the German version prevails.",
  },
  paragraphen: [
    {
      nr: 1,
      titel: { de: "Geltungsbereich und Vertragspartner", en: "Scope and contracting parties" },
      absaetze: [
        { text: {
          de: "Diese Bedingungen gelten für Beherbergungsverträge über Zimmer und Apartments von Do Step Inn Living an den Standorten Felberstraße 20 (1150 Wien), Wurmbstraße 36 (1120 Wien), Südtiroler Platz 3 (1040 Wien) und Kollergasse 9 (1030 Wien) sowie für alle damit zusammenhängenden Leistungen.",
          en: "These terms apply to accommodation contracts for rooms and apartments of Do Step Inn Living at Felberstraße 20 (1150 Vienna), Wurmbstraße 36 (1120 Vienna), Südtiroler Platz 3 (1040 Vienna) and Kollergasse 9 (1030 Vienna), and to all related services." } },
        { text: {
          de: "Vertragspartner ist die Kern Beherbergungsbetriebs GmbH, Felberstraße 20, 1150 Wien, FN 253911 z beim Handelsgericht Wien (im Folgenden „wir“ oder „das Haus“). Gast ist, wer die Unterkunft nutzt; Vertragspartner kann auch ein Unternehmen sein, das die Unterkunft für Mitarbeitende bucht.",
          en: "The contracting party is Kern Beherbergungsbetriebs GmbH, Felberstraße 20, 1150 Vienna, company register number FN 253911 z at the Vienna Commercial Court (“we” or “the house”). The guest is whoever uses the accommodation; the contracting party may also be a company booking accommodation for its staff." } },
        { text: {
          de: "Abweichende Bedingungen des Gastes gelten nur, wenn wir ihnen schriftlich zugestimmt haben.",
          en: "Terms of the guest that deviate from these apply only if we have agreed to them in writing." } },
      ],
    },
    {
      nr: 2,
      titel: { de: "Anfrage, Angebot und Vertragsabschluss", en: "Enquiry, offer and conclusion of contract" },
      absaetze: [
        { text: {
          de: "Eine über die Website erzeugte Anfrage ist unverbindlich und noch keine Buchung. Sie enthält die von Ihnen gewählte Zusammenstellung und dient uns als Grundlage für ein Angebot.",
          en: "An enquiry generated via the website is non-binding and is not yet a booking. It contains the selection you made and serves as the basis for our offer." } },
        { text: {
          de: "Der Vertrag kommt zustande, wenn wir Ihre Anfrage annehmen oder Sie unser Angebot annehmen. Die Bestätigung erfolgt in Textform, in der Regel per E-Mail.",
          en: "The contract is concluded when we accept your enquiry or you accept our offer. Confirmation is given in text form, as a rule by email." } },
        { text: {
          de: "Angebote gelten nach Verfügbarkeit. Preisänderungen bleiben bis zur Bestätigung vorbehalten.",
          en: "Offers are subject to availability. Prices may change until confirmation." } },
        { offen: {
          de: "Zu entscheiden: Gilt ein Angebot befristet — und wenn ja, wie lange?",
          en: "To decide: is an offer valid for a limited period — and if so, how long?" } },
      ],
    },
    {
      nr: 3,
      titel: { de: "Leistungen", en: "Services" },
      absaetze: [
        { text: {
          de: "Wir stellen die vereinbarte Unterkunft möbliert und bezugsfertig zur Verfügung. Zur Ausstattung gehören je nach Kategorie eigenes oder geteiltes Bad, TV, Kühlschrank, Geschirr und Besteck sowie WLAN. Handtücher und Bettwäsche sind im Preis enthalten.",
          en: "We provide the agreed accommodation furnished and ready to move into. Depending on the category, this includes a private or shared bathroom, a TV, a fridge, plates and cutlery, and WiFi. Towels and linen are included in the price." } },
        { text: {
          de: "Bei Wochen- und Monatsaufenthalten ist wöchentlich eine Reinigung inklusive Bettwäschewechsel enthalten. Bei kürzeren Aufenthalten füllen wir täglich Toilettenpapier auf, entleeren den Abfall und wechseln auf Wunsch die Handtücher.",
          en: "Weekly and monthly stays include one clean per week with a change of linen. On shorter stays we restock toilet paper daily, empty the bins and change towels on request." } },
        { text: {
          de: "Zusatzleistungen — Frühstück, Abendessen, zusätzliche Reinigungen und Parkplätze — buchen Sie gesondert zu den jeweils gültigen Preisen. Frühstück und Halbpension finden im InnSider Restaurant statt. Parkplätze werden von externen Betreibern zur Verfügung gestellt; deren Tarife und Bedingungen gelten zusätzlich.",
          en: "Additional services — breakfast, dinner, extra cleaning and parking — are booked separately at the rates then in force. Breakfast and half board take place at the InnSider restaurant. Parking is provided by external operators, whose rates and terms apply in addition." } },
        { text: {
          de: "Ein Anspruch auf ein bestimmtes Zimmer besteht nicht. Wir können eine gleichwertige Unterkunft im selben Haus oder an einem anderen Standort zuweisen, wenn dies aus betrieblichen Gründen notwendig ist und Ihnen zumutbar bleibt.",
          en: "There is no entitlement to a specific room. We may allocate equivalent accommodation in the same building or at another location where this is operationally necessary and reasonable for you." } },
      ],
    },
    {
      nr: 4,
      titel: { de: "Preise, Ortstaxe und Nebenkosten", en: "Prices, city tax and running costs" },
      absaetze: [
        { text: {
          de: "Alle Preise verstehen sich pro Zimmer und inklusive Umsatzsteuer sowie Ortstaxe. Strom und Instandhaltung sind enthalten; gesonderte Betriebskostenabrechnungen gibt es nicht.",
          en: "All prices are per room and include VAT and city tax. Electricity and maintenance are included; there is no separate service-charge settlement." } },
        { text: {
          de: "Der Nachtpreis gilt ab drei Nächten, der Wochenpreis ab sieben Nächten, der Monatspreis wird für dreißig Nächte verrechnet. Maßgeblich ist die bestätigte Zusammenstellung.",
          en: "The nightly rate applies from three nights, the weekly rate from seven nights, and the monthly rate is charged for thirty nights. The confirmed selection is decisive." } },
        { text: {
          de: "Ab einer Vertragsdauer von drei Monaten entfällt die Ortstaxe. Der Preis wird in diesem Fall individuell gerechnet und gesondert bestätigt.",
          en: "From a contract term of three months the city tax no longer applies. The price is then calculated individually and confirmed separately." } },
        { text: {
          de: "Der Preisrechner auf dieser Website ist ein unverbindliches Hilfsmittel. Verbindlich ist ausschließlich der Betrag in unserer Bestätigung.",
          en: "The price calculator on this website is a non-binding aid. Only the amount in our confirmation is binding." } },
      ],
    },
    {
      nr: 5,
      titel: { de: "Zahlung und Rechnung", en: "Payment and invoicing" },
      absaetze: [
        { text: {
          de: "Auf Wunsch von Firmenkunden rechnen wir am Monatsende gesammelt ab. Konsumationen im InnSider Restaurant können auf die Firmenrechnung gebucht werden.",
          en: "At the request of company clients we invoice collectively at the end of the month. Consumption at the InnSider restaurant can be charged to the company invoice." } },
        { offen: {
          de: "Zu entscheiden: Zahlungszeitpunkt (Vorauszahlung, bei Anreise, monatlich im Voraus oder im Nachhinein), Zahlungsziel in Tagen und die akzeptierten Zahlungsarten.",
          en: "To decide: when payment is due (in advance, on arrival, monthly in advance or in arrears), the payment term in days and the accepted means of payment." } },
        { offen: {
          de: "Zu entscheiden: Ob eine Anzahlung verlangt wird und in welcher Höhe.",
          en: "To decide: whether a deposit is required and how much." } },
        { offen: {
          de: "Zu entscheiden: Verzugsfolgen — Verzugszinsen und Mahnspesen. Gegenüber Verbraucherinnen und Verbrauchern sind hier gesetzliche Grenzen einzuhalten; das gehört anwaltlich geprüft.",
          en: "To decide: consequences of late payment — default interest and reminder fees. Statutory limits apply towards consumers; this needs legal review." } },
      ],
    },
    {
      nr: 6,
      titel: { de: "Schlüsselkaution", en: "Key deposit" },
      absaetze: [
        { text: {
          de: "Für die Schlüsselübergabe heben wir eine Kaution von 40 Euro ein. Sie wird am Ende des Aufenthalts nach Rückgabe der Schlüssel zurückerstattet. Eine darüber hinausgehende Kaution verlangen wir nicht.",
          en: "We charge a deposit of 40 euros for the handover of keys. It is returned at the end of the stay once the keys are returned. We do not require any deposit beyond this." } },
        { text: {
          de: "Wird ein Nebenwohnsitz angemeldet, kann eine gesonderte Kaution vereinbart werden.",
          en: "Where a secondary residence is registered, a separate deposit may be agreed." } },
        { offen: {
          de: "Zu entscheiden: Höhe der Kaution bei Anmeldung eines Nebenwohnsitzes und die Bedingungen ihrer Rückzahlung.",
          en: "To decide: the amount of the deposit when a secondary residence is registered and the conditions for its return." } },
      ],
    },
    {
      nr: 7,
      titel: { de: "Beginn und Ende des Aufenthalts", en: "Start and end of the stay" },
      absaetze: [
        { text: {
          de: "Die Unterkunft steht Ihnen ab der vereinbarten Anreise zur Verfügung und ist am Abreisetag geräumt und mit allen Schlüsseln zu übergeben.",
          en: "The accommodation is available to you from the agreed arrival and must be vacated on the day of departure, with all keys handed back." } },
        { offen: {
          de: "Zu entscheiden: Check-in- und Check-out-Zeiten, ob ein Selbst-Check-in möglich ist und wie außerhalb der Rezeptionszeiten übergeben wird. Am Standort Felberstraße ist die Rezeption täglich von 7 bis 24 Uhr besetzt; für die übrigen Standorte liegt uns dazu nichts vor.",
          en: "To decide: check-in and check-out times, whether self check-in is available, and how handover works outside reception hours. At Felberstraße reception is staffed daily from 7 am to midnight; for the other locations we have no information." } },
        { offen: {
          de: "Zu entscheiden: Ob ein späterer Check-out gegen Aufpreis möglich ist.",
          en: "To decide: whether a late check-out is possible for a surcharge." } },
      ],
    },
    {
      nr: 8,
      titel: { de: "Dauer, Verlängerung und Kündigung", en: "Term, extension and notice" },
      absaetze: [
        { text: {
          de: "Der Aufenthalt läuft über den bestätigten Zeitraum. Eine Verlängerung ist nach Verfügbarkeit möglich und bedarf unserer Bestätigung.",
          en: "The stay runs for the confirmed period. An extension is possible subject to availability and requires our confirmation." } },
        { text: {
          de: "Bei fortlaufenden Aufenthalten kann das Vertragsverhältnis zum Ende eines Kalendermonats beendet werden.",
          en: "For ongoing stays the contract may be terminated with effect from the end of a calendar month." } },
        { offen: {
          de: "Zu entscheiden: Kündigungsfrist vor dem Monatsende und die Form der Kündigung (E-Mail genügt oder Schriftform).",
          en: "To decide: the notice period before month end and the form of notice (email sufficient, or written form)." } },
      ],
    },
    {
      nr: 9,
      titel: { de: "Rücktritt und Stornierung", en: "Withdrawal and cancellation" },
      absaetze: [
        { text: {
          de: "Treten Sie vor Anreise vom Vertrag zurück, gelten die bei Vertragsabschluss vereinbarten Stornobedingungen.",
          en: "If you withdraw from the contract before arrival, the cancellation terms agreed at the time of conclusion apply." } },
        { offen: {
          de: "Zu entscheiden: Stornofristen und -sätze, gestaffelt nach Vorlaufzeit, sowie ob und wie eine Ersatzperson gestellt werden kann. Bei Verbraucherverträgen bestehen gesetzliche Vorgaben — dieser Punkt braucht anwaltliche Prüfung.",
          en: "To decide: cancellation deadlines and rates, staggered by lead time, and whether a substitute guest may be named. Statutory requirements apply to consumer contracts — this point needs legal review." } },
        { offen: {
          de: "Zu entscheiden: Was gilt bei Nichtanreise ohne Absage.",
          en: "To decide: what applies in the event of a no-show without notice." } },
      ],
    },
    {
      nr: 10,
      titel: { de: "Hausordnung und Pflichten der Gäste", en: "House rules and guests' obligations" },
      absaetze: [
        { text: {
          de: "Das Rauchen ist in den Unterkünften und Gemeinschaftsräumen nicht gestattet.",
          en: "Smoking is not permitted in the accommodation or in the common areas." } },
        { text: {
          de: "Haustiere sind nur nach vorheriger Absprache erlaubt. Auch die Barrierefreiheit klären wir im Einzelfall vorab.",
          en: "Pets are permitted only by prior arrangement. Accessibility is likewise clarified individually in advance." } },
        { text: {
          de: "Gemeinschaftsküchen und Aufenthaltsräume stehen allen Gästen zur Verfügung. Wir bitten darum, sie in dem Zustand zu hinterlassen, in dem man sie selbst vorfinden möchte, und auf die Nachtruhe Rücksicht zu nehmen.",
          en: "Shared kitchens and common rooms are available to all guests. Please leave them as you would wish to find them, and be considerate during quiet hours." } },
        { text: {
          de: "Für Schäden, die Sie oder Ihre Besucherinnen und Besucher schuldhaft verursachen, haften Sie nach den allgemeinen Regeln.",
          en: "You are liable under the general rules for damage culpably caused by you or your visitors." } },
        { offen: {
          de: "Zu entscheiden: Ruhezeiten, Regeln für Besuch und Übernachtungsgäste, Umgang mit verlorenen Schlüsseln.",
          en: "To decide: quiet hours, rules for visitors and overnight guests, and how lost keys are handled." } },
      ],
    },
    {
      nr: 11,
      titel: { de: "Meldepflicht und Nebenwohnsitz", en: "Registration and secondary residence" },
      absaetze: [
        { text: {
          de: "Wir sind gesetzlich verpflichtet, Gäste zu melden. Bitte machen Sie die dafür erforderlichen Angaben und weisen Sie sich auf Verlangen aus.",
          en: "We are required by law to register guests. Please provide the information needed and identify yourself on request." } },
        { text: {
          de: "Wenn Sie an der Unterkunft einen Nebenwohnsitz anmelden möchten, sprechen Sie das bitte vorab mit uns ab.",
          en: "If you wish to register a secondary residence at the accommodation, please arrange this with us in advance." } },
      ],
    },
    {
      nr: 12,
      titel: { de: "Haftung", en: "Liability" },
      absaetze: [
        { text: {
          de: "Für eingebrachte Sachen haften wir nach den gesetzlichen Bestimmungen über die Haftung der Gastwirte (§§ 970 ff ABGB). Wertgegenstände und Bargeld verwahren Sie bitte entsprechend sicher.",
          en: "We are liable for property brought in under the statutory provisions on innkeepers' liability (§§ 970 ff of the Austrian Civil Code). Please store valuables and cash securely." } },
        { text: {
          de: "Im Übrigen haften wir für Vorsatz und grobe Fahrlässigkeit. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit dies gesetzlich zulässig ist; die Haftung für Personenschäden bleibt davon unberührt.",
          en: "Otherwise we are liable for intent and gross negligence. Liability for slight negligence is excluded to the extent permitted by law; liability for personal injury remains unaffected." } },
        { text: {
          de: "Für Leistungen externer Anbieter — insbesondere Parkplätze — haften wir nicht.",
          en: "We are not liable for services of external providers, in particular parking." } },
        { offen: {
          de: "Anwaltlich zu prüfen: Gegenüber Verbraucherinnen und Verbrauchern sind Haftungsausschlüsse nur eingeschränkt zulässig. Die Formulierung dieses Punktes sollte nicht ungeprüft übernommen werden.",
          en: "For legal review: exclusions of liability towards consumers are only permissible to a limited extent. This clause should not be adopted unchecked." } },
      ],
    },
    {
      nr: 13,
      titel: { de: "Beendigung aus wichtigem Grund", en: "Termination for cause" },
      absaetze: [
        { text: {
          de: "Wir können den Vertrag mit sofortiger Wirkung beenden, wenn die Unterkunft vertragswidrig genutzt wird, der Hausfrieden wiederholt erheblich gestört wird oder fällige Zahlungen trotz Mahnung ausbleiben.",
          en: "We may terminate the contract with immediate effect if the accommodation is used contrary to the contract, if house rules are repeatedly and seriously breached, or if due payments are not made despite a reminder." } },
        { text: {
          de: "Höhere Gewalt und andere von uns nicht zu vertretende Umstände, die die Erfüllung unmöglich machen, berechtigen beide Seiten zum Rücktritt. Bereits gezahlte Beträge für nicht erbrachte Leistungen erstatten wir.",
          en: "Force majeure and other circumstances beyond our control that make performance impossible entitle both sides to withdraw. We refund amounts already paid for services not provided." } },
      ],
    },
    {
      nr: 14,
      titel: { de: "Datenschutz", en: "Data protection" },
      absaetze: [
        { text: {
          de: "Wir verarbeiten Ihre Daten zur Erfüllung des Vertrags und zur Einhaltung gesetzlicher Pflichten. Einzelheiten stehen in unserer Datenschutzerklärung.",
          en: "We process your data to perform the contract and to comply with statutory obligations. Details are set out in our privacy policy." } },
      ],
    },
    {
      nr: 15,
      titel: { de: "Schlussbestimmungen", en: "Final provisions" },
      absaetze: [
        { text: {
          de: "Es gilt österreichisches Recht unter Ausschluss der Verweisungsnormen des internationalen Privatrechts. Zwingende Verbraucherschutzbestimmungen des Staates, in dem eine Verbraucherin oder ein Verbraucher ihren gewöhnlichen Aufenthalt hat, bleiben unberührt.",
          en: "Austrian law applies, excluding the referral rules of private international law. Mandatory consumer protection provisions of the state in which a consumer is habitually resident remain unaffected." } },
        { text: {
          de: "Sollte eine Bestimmung unwirksam sein, bleibt der übrige Vertrag wirksam. An die Stelle der unwirksamen Bestimmung tritt eine Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.",
          en: "Should a provision be invalid, the remainder of the contract remains effective. The invalid provision is replaced by a rule that comes closest to its economic purpose." } },
        { text: {
          de: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: ec.europa.eu/consumers/odr.",
          en: "The European Commission provides a platform for online dispute resolution: ec.europa.eu/consumers/odr." } },
        { offen: {
          de: "Zu entscheiden: Gerichtsstand. Gegenüber Unternehmen lässt sich Wien vereinbaren; gegenüber Verbraucherinnen und Verbrauchern gelten zwingende Zuständigkeitsregeln.",
          en: "To decide: place of jurisdiction. Vienna can be agreed with businesses; mandatory rules on jurisdiction apply towards consumers." } },
      ],
    },
  ],
};
