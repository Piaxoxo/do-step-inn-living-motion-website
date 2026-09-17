import { useEffect, useRef } from "react";
import { initMotion } from "./motion.js";
import Preisrechner from "./components/Preisrechner.jsx";
import {
  KONTAKT,
  anfrageHref,
  PRODUKTE,
  KATEGORIEN,
  PREIS_BASIS,
  PREIS_HINWEISE,
  KONDITIONEN,
  FIRMEN_VORTEILE,
  FIRMEN_AUF_EINEN_BLICK,
  INNSIDER,
  LAGE,
  WEITERE_STANDORTE_OFFEN,
} from "./data/content.js";
import { eur } from "./lib/preis.js";

const NAV = [
  ["Wohnen", "#wohnen"],
  ["Apartments", "#apartments"],
  ["Preise", "#preise"],
  ["InnSider", "#innsider"],
  ["Firmen", "#firmen"],
  ["Kontakt", "#kontakt"],
];

function Anfragen({ variant = "primary", children = "Jetzt anfragen", betreff, text }) {
  return (
    <a className={`btn btn--${variant}`} href={anfrageHref(betreff, text)}>
      {children}
    </a>
  );
}

export default function App() {
  const videoRef = useRef(null);
  useEffect(() => initMotion({ video: videoRef.current }), []);

  return (
    <>
      <div className="loader" data-loader aria-hidden="true">
        <span className="loader__mark">
          Do Step Inn <em>Living</em>
        </span>
      </div>
      <div className="cursor" data-cursor aria-hidden="true" />

      <video
        ref={videoRef}
        id="bgv"
        className="bg-video"
        poster="/img/hero-room.jpg"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/bg.webm" type="video/webm" />
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="mobile-poster" aria-hidden="true" />
      <div className="bg-tint" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="nav">
        <a className="nav__logo" href="#home">
          Do Step Inn <em>Living</em>
        </a>
        <nav className="nav__links" aria-label="Abschnitte">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="nav__end">
          <span className="nav__progress" aria-hidden="true">
            <span data-progress-label>00</span>
          </span>
          <Anfragen variant="primary">Anfragen</Anfragen>
        </div>
        <span className="nav__rule" aria-hidden="true">
          <span data-progress-bar />
        </span>
      </header>

      <main className="page">
        <section id="home" className="hero">
          <p className="eyebrow" data-reveal>unkompliziert &amp; komfortabel</p>
          <h1 className="hero__title" data-reveal>
            Wohnen<br />auf Zeit
          </h1>
          <p className="hero__lede" data-reveal>
            Möblierte Apartments und Zimmer in Wien-Meidling — für ein paar Wochen,
            ein paar Monate oder so lange, wie das Projekt dauert. Keine Mindestdauer,
            zu jedem Monatsende kündbar.
          </p>
          <div className="actions" data-reveal>
            <Anfragen />
            <a className="btn btn--ghost" href="#preise">Preis berechnen</a>
          </div>
          <p className="hero__cue" aria-hidden="true">weiterscrollen</p>
        </section>

        <section id="wohnen" className="stay" data-pin-section>
          <div className="stay__pin">
            <p className="label">01 — Dein Zuhause auf Zeit</p>
            <p className="stay__lines">
              <span className="stay-word">Einfach einziehen</span>{" "}
              <span className="stay-word">und wohlfühlen</span>{" "}
              <span className="stay-word">– ohne langfristige</span>{" "}
              <span className="stay-word">Verpflichtungen.</span>
            </p>
          </div>
        </section>

        <section id="apartments" className="produkte">
          <div className="section__head" data-reveal>
            <p className="label">02 — Zwei Arten zu wohnen</p>
            <h2>Mit eigener Küche oder mit geteilter.</h2>
            <p className="lede">
              Beides voll möbliert, beides bezugsfertig. Der Unterschied ist, wie viel
              eigenen Haushalt du willst.
            </p>
          </div>
          <div className="produkte__grid">
            {PRODUKTE.map((p, i) => (
              <article className="produkt panel" key={p.id} data-reveal data-tiefe={i === 0 ? "1" : "2"}>
                <p className="produkt__kern">{p.kern}</p>
                <h3>{p.name}</h3>
                <p className="muted">{p.text}</p>
                <ul className="ticks ticks--tight">
                  {p.merkmale.map((m) => <li key={m}>{m}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="preise" className="preise">
          <div className="section__head" data-reveal>
            <p className="label">03 — Preisrechner</p>
            <h2>Stellen Sie Ihren Aufenthalt zusammen.</h2>
            <p className="lede">
              Kategorie, Dauer und Leistungen wählen — die Summe rechnet sich mit.
              Am Ende schicken Sie die fertige Zusammenstellung als Anfrage ab.
            </p>
          </div>

          <div data-reveal>
            <Preisrechner />
          </div>

          <div className="tabelle-wrap panel" data-reveal>
            <p className="label">Alle Kategorien im Überblick</p>
            <div className="tabelle-scroll">
              <table className="prices">
                <thead>
                  <tr>
                    <th scope="col">Kategorie</th>
                    <th scope="col">3–5 Nächte</th>
                    <th scope="col">Woche ab 7</th>
                    <th scope="col">Monat ab 30</th>
                  </tr>
                </thead>
                <tbody>
                  {KATEGORIEN.map((k) => (
                    <tr key={k.id}>
                      <th scope="row">{k.name}</th>
                      <td className="num">{eur(k.nacht)}</td>
                      <td className="num">{eur(k.woche)}</td>
                      <td className="num">{eur(k.monat)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="table__basis">{PREIS_BASIS}</p>
            <ul className="footnotes">
              {PREIS_HINWEISE.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </div>
        </section>

        <section id="innsider" className="innsider">
          <div className="section__head" data-reveal>
            <p className="label">04 — Frühstück &amp; Halbpension</p>
            <h2>Gegessen wird im InnSider.</h2>
            <p className="lede">{INNSIDER.text}</p>
            <ul className="ticks ticks--tight">
              {INNSIDER.punkte.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div className="galerie" data-galerie>
            {INNSIDER.bilder.map((b, i) => (
              <figure className="galerie__bild" key={b.src} data-tiefe={String((i % 3) + 1)}>
                <img src={b.src} alt={b.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section id="firmen" className="business">
          <div className="business__body" data-reveal>
            <p className="label">05 — Ihr Langzeit-Hotel in Wien</p>
            <h2>Eine Lösung, die sich Ihrem Projekt anpasst.</h2>
            <p className="lede">
              Do Step Inn Living ist auf längere Aufenthalte von Unternehmensmitarbeitenden
              spezialisiert. Ob mehrwöchiger Projekteinsatz, temporäre Teamunterbringung
              oder langfristige Stationierung – wir bieten eine strukturierte,
              wirtschaftliche Lösung mit Hotelkomfort und klar kalkulierbaren Kosten.
            </p>
            <ul className="ticks">
              {FIRMEN_VORTEILE.map((v) => <li key={v}>{v}</li>)}
            </ul>
            <Anfragen
              betreff="Firmenanfrage Do Step Inn Living"
              text={"Guten Tag,\n\nwir möchten Mitarbeitende längerfristig unterbringen.\n\nZeitraum: \nAnzahl Personen: \nAnzahl Zimmer: \n\nBeste Grüße"}
            >
              Firmenangebot anfragen
            </Anfragen>
          </div>
          <div className="panel note" data-reveal>
            <p className="label">Die Vorteile auf einen Blick</p>
            <ul className="ticks ticks--tight">
              {FIRMEN_AUF_EINEN_BLICK.map((v) => <li key={v}>{v}</li>)}
            </ul>
          </div>
        </section>

        <section id="konditionen" className="konditionen">
          <div className="section__head" data-reveal>
            <p className="label">06 — Gut zu wissen</p>
            <h2>Die Konditionen, kurz.</h2>
          </div>
          <dl className="fakten" data-reveal>
            {KONDITIONEN.map((k) => (
              <div key={k.frage}>
                <dt>{k.frage}</dt>
                <dd>{k.antwort}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="lage" className="lage">
          <div className="section__head" data-reveal>
            <p className="label">07 — Lage</p>
            <h2>Wien-Meidling.</h2>
            <p className="lede">
              {KONTAKT.strasse}, {KONTAKT.ort}. Was in unmittelbarer Umgebung liegt:
            </p>
            <ul className="ticks">
              {LAGE.map((l) => <li key={l}>{l}</li>)}
            </ul>
            {WEITERE_STANDORTE_OFFEN && (
              <p className="notice">
                Weitere Wohnungen an anderen Standorten in Wien sind vorhanden — Namen,
                Adressen und Preise liegen uns noch nicht vor und stehen deshalb hier
                noch nicht. Auf Anfrage.
              </p>
            )}
          </div>
          <figure className="crop crop--wide" data-reveal data-tiefe="2">
            <img src="/img/city-lifestyle.jpg" alt="Platzhalterbild — Stadtumgebung" />
          </figure>
        </section>

        <section id="kontakt" className="cta">
          <div data-reveal>
            <p className="label">08 — Kontakt</p>
            <h2>Wir sind für Sie da.</h2>
            <p className="lede">
              Sie haben Fragen, wünschen ein individuelles Angebot oder möchten direkt
              buchen? Kontaktieren Sie uns gerne persönlich — wir beraten Sie zuverlässig
              und unkompliziert.
            </p>
          </div>
          <div className="actions" data-reveal>
            <Anfragen />
            <a className="btn btn--ghost" href={KONTAKT.telefonHref}>Jetzt anrufen</a>
          </div>
          <dl className="contact" data-reveal>
            <div>
              <dt>E-Mail</dt>
              <dd><a href={anfrageHref()}>{KONTAKT.email}</a></dd>
            </div>
            <div>
              <dt>Telefon</dt>
              <dd><a href={KONTAKT.telefonHref}>{KONTAKT.telefon}</a></dd>
            </div>
            <div>
              <dt>Erreichbarkeit</dt>
              <dd>{KONTAKT.erreichbarkeit}</dd>
            </div>
            <div>
              <dt>Adresse</dt>
              <dd>{KONTAKT.strasse}<br />{KONTAKT.ort}</dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="footer">
        <p className="footer__mark">Do Step Inn <em>Living</em></p>
        <p className="footer__claim">Dein Zuhause auf Zeit.</p>
        <div className="footer__cols">
          <div>
            <p className="label">Kontakt</p>
            <p>
              <a href={anfrageHref()}>{KONTAKT.email}</a><br />
              <a href={KONTAKT.telefonHref}>{KONTAKT.telefon}</a><br />
              {KONTAKT.erreichbarkeit}
            </p>
          </div>
          <div>
            <p className="label">Adresse</p>
            <p>{KONTAKT.strasse}<br />{KONTAKT.ort}</p>
          </div>
          <div>
            <p className="label">Rechtliches</p>
            <p>
              <a href={KONTAKT.home}>Home</a><br />
              <a href={KONTAKT.agb}>AGB</a><br />
              {KONTAKT.betreiber}
            </p>
          </div>
        </div>
        <p className="footer__note">
          Vorschau-Build. Impressum und Datenschutzerklärung für Do Step Inn Living fehlen
          noch und sind vor einer Veröffentlichung verpflichtend. Die Raumbilder und der
          Hintergrundfilm sind prozedurale Platzhalter; die Fotos im InnSider-Abschnitt sind echt.
        </p>
      </footer>
    </>
  );
}
