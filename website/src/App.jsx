import { useEffect, useRef, useState } from "react";
import { initMotion } from "./motion.js";
import Preisrechner from "./components/Preisrechner.jsx";
import { SpracheContext, t as uebersetze, UI } from "./i18n.js";
import { useRoute } from "./router.js";
import { Link } from "./components/Link.jsx";
import Rechtsseite from "./pages/Rechtsseite.jsx";
import {
  KONTAKT,
  anfrageHref,
  ZIMMERTYPEN,
  ZIMMER_BILDER,
  STANDORTE,
  VORTEILE,
  ZIELGRUPPEN,
  AUSSTATTUNG_TEXT,
  GEMEINSCHAFT_BILDER,
  PREIS_REGELN,
  KONDITIONEN,
  FIRMEN,
  INNSIDER,
  SPRACHEN,
} from "./data/content.js";

/**
 * Anfrage-Link. Bewusst außerhalb von App deklariert: Eine im Render erzeugte
 * Komponente ist bei jedem Durchlauf eine neue Identität, React hängt ihren
 * Teilbaum dann jedes Mal neu ein.
 */
function AnfrageLink({ sprache, ui, variant = "primary", label, betreff, text }) {
  const standardText =
    sprache === "de"
      ? "Hallo,\n\nich hätte eine Anfrage...\n\nZeitraum: \nPersonen: \nWunschstandort: "
      : "Hello,\n\nI have an enquiry...\n\nDates: \nPeople: \nPreferred location: ";
  const standardBetreff =
    sprache === "de" ? "Anfrage Do Step Inn Living" : "Enquiry Do Step Inn Living";
  return (
    <a className={`btn btn--${variant}`} data-magnet href={anfrageHref(betreff ?? standardBetreff, text ?? standardText)}>
      {label ?? ui.anfragen}
    </a>
  );
}

export default function App() {
  const videoRef = useRef(null);
  const [sprache, setSprache] = useState("de");
  const [pfad, gehe] = useRoute();
  const istHome = pfad === "/";
  const ui = UI[sprache];
  const t = (w) => uebersetze(w, sprache);

  useEffect(() => initMotion({ video: videoRef.current, film: istHome }), [pfad, istHome]);
  useEffect(() => {
    document.documentElement.lang = sprache;
  }, [sprache]);

  return (
    <SpracheContext.Provider value={sprache}>
      <div className="loader" data-loader aria-hidden="true">
        <span className="loader__mark">Do Step Inn <em>Living</em></span>
      </div>
      <div className="cursor" data-cursor aria-hidden="true" />

      <video ref={videoRef} id="bgv" className="bg-video" poster="/img/hero-room.jpg"
             muted playsInline preload="auto" aria-hidden="true" tabIndex={-1}>
        <source src="/bg.webm" type="video/webm" />
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="mobile-poster" aria-hidden="true" />
      <div className="bg-tint" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="nav">
        <Link className="nav__logo" to="/" gehe={gehe}>Do Step Inn <em>Living</em></Link>
        <nav className="nav__links" aria-label={sprache === "de" ? "Abschnitte" : "Sections"}>
          {istHome
            ? ui.nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)
            : <Link to="/" gehe={gehe}>{sprache === "de" ? "Zur Startseite" : "Back to home"}</Link>}
        </nav>
        <div className="nav__end">
          <div className="sprachwahl" role="group" aria-label={sprache === "de" ? "Sprache" : "Language"}>
            {SPRACHEN.map((s) => (
              <button key={s} type="button" className={s === sprache ? "an" : ""}
                      aria-pressed={s === sprache} onClick={() => setSprache(s)}>
                {s.toUpperCase()}
              </button>
            ))}
          </div>
          <span className="nav__progress" aria-hidden="true"><span data-progress-label>00</span></span>
          <AnfrageLink sprache={sprache} ui={ui} label={ui.anfragenKurz} />
        </div>
        <span className="nav__rule" aria-hidden="true"><span data-progress-bar /></span>
      </header>

      {istHome ? (
      <main className="page">
        <section id="home" className="hero">
          <p className="eyebrow" data-reveal>{ui.heroEyebrow}</p>
          <h1 className="hero__title" data-reveal data-maske>
            {ui.heroTitel[0]}<br />{ui.heroTitel[1]}
          </h1>
          <p className="hero__lede" data-reveal>{ui.heroText}</p>
          <div className="actions" data-reveal>
            <AnfrageLink sprache={sprache} ui={ui} />
            <a className="btn btn--ghost" href="#preise">{ui.preisBerechnen}</a>
          </div>
          <p className="hero__cue" aria-hidden="true">{ui.weiterscrollen}</p>
        </section>

        <section id="wohnen" className="stay" data-pin-section>
          <div className="stay__pin">
            <p className="label">{ui.pinLabel}</p>
            <p className="stay__lines">
              {ui.pinZeilen.map((w, i) => (
                <span className="stay-word" key={i}>{w}{" "}</span>
              ))}
            </p>
          </div>
        </section>

        <section id="vorteile" className="produkte">
          <div className="section__head" data-reveal>
            <p className="label">{ui.vorteileLabel}</p>
            <h2 data-maske>{ui.vorteileTitel}</h2>
            <p className="lede">{ui.vorteileText}</p>
          </div>
          <div className="produkte__grid">
            <ul className="ticks panel" data-reveal data-tiefe="1">
              {t(VORTEILE).map((v) => <li key={v}>{v}</li>)}
            </ul>
            <div className="panel note" data-reveal data-tiefe="2">
              <p className="label">{ui.zielgruppenTitel}</p>
              <ul className="ticks ticks--tight">
                {t(ZIELGRUPPEN).map((z) => <li key={z}>{z}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="zimmer" className="zimmertypen">
          <div className="section__head" data-reveal>
            <p className="label">{ui.zimmerLabel}</p>
            <h2 data-maske>{ui.zimmerTitel}</h2>
            <p className="lede">{ui.zimmerText}</p>
          </div>
          <div className="zimmerschau" data-reveal>
            {ZIMMER_BILDER.map((b, i) => (
              <figure className="zimmerschau__bild" key={b.src} data-tiefe={String((i % 3) + 1)} data-kippen="5">
                <img src={b.src} alt={t(b.alt)} loading="lazy" />
                <figcaption>{t(b.titel)}</figcaption>
              </figure>
            ))}
          </div>

          <div className="typen__grid">
            {ZIMMERTYPEN.map((z, i) => (
              <article className="typ panel" key={z.id} data-reveal data-kippen="7" data-tiefe={String((i % 2) + 1)}>
                <p className="produkt__kern">{t(z.kern)}</p>
                <h3>{t(z.name)}</h3>
                <p className="muted">{t(z.text)}</p>
              </article>
            ))}
          </div>
          <div className="panel note ausstattung" data-reveal>
            <div className="ausstattung__text">
              <p className="label">{ui.ausstattungTitel}</p>
              <p className="muted">{t(AUSSTATTUNG_TEXT)}</p>
            </div>
            <div className="ausstattung__bilder">
              {GEMEINSCHAFT_BILDER.map((b, i) => (
                <figure className="ausstattung__bild" key={b.src} data-tiefe={String((i % 2) + 1)} data-kippen="5">
                  <img src={b.src} alt={t(b.alt)} loading="lazy" />
                  <figcaption>{t(b.titel)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="preise" className="preise">
          <div className="section__head" data-reveal>
            <p className="label">{ui.preiseLabel}</p>
            <h2 data-maske>{ui.preiseTitel}</h2>
            <p className="lede">{ui.preiseText}</p>
          </div>
          <p className="notice" data-reveal>
            {sprache === "de"
              ? "Die Kategorien im Rechner folgen der Firmenpreisliste und beschreiben die Belegung. Die Zimmertypen weiter oben beschreiben die Ausstattung."
              : "The categories in the calculator follow the company price list and describe occupancy. The room types above describe the fit-out."}
          </p>
          <div data-reveal><Preisrechner /></div>
          <ul className="footnotes" data-reveal>
            {t(PREIS_REGELN).map((r) => <li key={r}>{r}</li>)}
          </ul>
        </section>

        <section id="standorte" className="standorte">
          <div className="section__head" data-reveal>
            <p className="label">{ui.standorteLabel}</p>
            <h2 data-maske>{ui.standorteTitel}</h2>
            <p className="lede">{ui.standorteText}</p>
          </div>
          <div className="standorte__liste">
            {STANDORTE.map((s, i) => (
              <article className="standort panel" key={s.id} data-reveal data-kippen="5" data-tiefe={String((i % 3) + 1)}>
                <header>
                  <h3>{s.name}</h3>
                  <p className="standort__adresse">{s.strasse} · {s.ort}</p>
                  <p className="standort__bahn">{t(s.bahnhof)}</p>
                </header>
                <p className="muted">{t(s.text)}</p>
                <p className="muted">{t(s.zusatz)}</p>
                <ul className="chips">
                  {t(s.merkmale).map((m) => <li key={m}>{m}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="innsider" className="innsider">
          <div className="section__head" data-reveal>
            <p className="label">{ui.innsiderLabel}</p>
            <h2 data-maske>{ui.innsiderTitel}</h2>
            <p className="lede">{t(INNSIDER.text)}</p>
            <ul className="ticks ticks--tight">
              {t(INNSIDER.punkte).map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div className="galerie-buehne" data-galerie-buehne>
            <div className="galerie" data-galerie>
              {INNSIDER.bilder.map((b, i) => (
                <figure className="galerie__bild" key={b.src} data-tiefe={String((i % 3) + 1)}>
                  <img src={b.src} alt={t(b.alt)} loading="lazy" />
                  <figcaption>{t(b.titel)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="firmen" className="business">
          <div className="business__body" data-reveal>
            <p className="label">{ui.firmenLabel}</p>
            <h2 data-maske>{ui.firmenTitel}</h2>
            <p className="lede">{ui.firmenText}</p>
            <ul className="ticks">
              {t(FIRMEN.vorteile).map((v) => <li key={v}>{v}</li>)}
            </ul>
            <AnfrageLink
              sprache={sprache}
              ui={ui}
              label={ui.firmenCta}
              betreff={sprache === "de" ? "Firmenanfrage Do Step Inn Living" : "Company enquiry Do Step Inn Living"}
              text={sprache === "de"
                ? "Guten Tag,\n\nwir möchten Mitarbeitende längerfristig unterbringen.\n\nZeitraum: \nAnzahl Personen: \nAnzahl Zimmer: \nWunschstandort: \n\nBeste Grüße"
                : "Hello,\n\nwe would like to accommodate staff long term.\n\nDates: \nNumber of people: \nNumber of rooms: \nPreferred location: \n\nBest regards"}
            />
          </div>
          <div className="panel note" data-reveal data-tiefe="2">
            <p className="label">{ui.konditionenLabel}</p>
            <dl className="fakten fakten--eng">
              {KONDITIONEN.map((k) => (
                <div key={t(k.frage)}>
                  <dt>{t(k.frage)}</dt>
                  <dd>{t(k.antwort)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="kontakt" className="cta">
          <div data-reveal>
            <p className="label">{ui.kontaktLabel}</p>
            <h2 data-maske>{ui.kontaktTitel}</h2>
            <p className="lede">{ui.kontaktText}</p>
          </div>
          <div className="actions" data-reveal>
            <AnfrageLink sprache={sprache} ui={ui} />
            <a className="btn btn--ghost" href={KONTAKT.telefonHref}>{ui.anrufen}</a>
          </div>
          <dl className="contact" data-reveal>
            <div><dt>{ui.eMail}</dt><dd><a href={anfrageHref("Anfrage", "")}>{KONTAKT.email}</a></dd></div>
            <div><dt>{ui.telefon}</dt><dd><a href={KONTAKT.telefonHref}>{KONTAKT.telefon}</a></dd></div>
            <div><dt>{ui.erreichbar}</dt><dd>{t(KONTAKT.erreichbarkeit)}</dd></div>
            <div>
              <dt>{ui.adresse}</dt>
              <dd>{STANDORTE.map((s) => <span key={s.id} className="zeile">{s.strasse}, {s.ort}</span>)}</dd>
            </div>
          </dl>
        </section>
      </main>
      ) : (
        <Rechtsseite pfad={pfad} />
      )}

      <footer className="footer">
        <p className="footer__mark">Do Step Inn <em>Living</em></p>
        <p className="footer__claim">{ui.claim}</p>
        <div className="footer__cols">
          <div>
            <p className="label">{ui.kontaktLabel.split("—").pop().trim()}</p>
            <p>
              <a href={anfrageHref("Anfrage", "")}>{KONTAKT.email}</a><br />
              <a href={KONTAKT.telefonHref}>{KONTAKT.telefon}</a><br />
              {t(KONTAKT.erreichbarkeit)}
            </p>
          </div>
          <div>
            <p className="label">{ui.standorteTitel.replace(".", "")}</p>
            <p>{STANDORTE.map((s) => <span key={s.id} className="zeile">{s.strasse}, {s.ort}</span>)}</p>
          </div>
          <div>
            <p className="label">{ui.rechtliches}</p>
            <p>
              <Link to="/impressum" gehe={gehe}>{sprache === "de" ? "Impressum" : "Legal notice"}</Link><br />
              <Link to="/datenschutz" gehe={gehe}>{sprache === "de" ? "Datenschutz" : "Privacy"}</Link><br />
              <Link to="/agb" gehe={gehe}>AGB</Link><br />
              {KONTAKT.betreiber}
            </p>
          </div>
        </div>
        <p className="footer__note">
          {sprache === "de"
            ? "Vorschau-Build. Impressum und Datenschutzerklärung stehen als Entwurf bereit und gehören vor einer Veröffentlichung juristisch geprüft; die AGB müssen vom Betreiber kommen. Die Raumbilder und der Hintergrundfilm sind prozedurale Platzhalter — die Fotos im InnSider-Abschnitt sind echt."
            : "Preview build. The legal notice and privacy policy are drafts and need legal review before publication; the terms must come from the operator. The room images and the background film are procedural placeholders — the photos in the InnSider section are real."}
        </p>
      </footer>
    </SpracheContext.Provider>
  );
}
