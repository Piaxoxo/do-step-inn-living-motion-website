import { useEffect, useRef } from "react";
import { initMotion } from "./motion.js";
import {
  KONTAKT,
  ANFRAGE_HREF,
  AUSSTATTUNG,
  ZIMMERAUSSTATTUNG,
  PREIS_BASIS,
  ZIMMER,
  PREIS_HINWEISE,
  WOCHEN_MONATSPREIS_OFFEN,
  LEISTUNGEN,
  LEISTUNGEN_FUSSNOTEN,
  RESTAURANT,
  FIRMEN_VORTEILE,
  FIRMEN_AUF_EINEN_BLICK,
  LAGE,
} from "./data/content.js";

const NAV = [
  ["Wohnen", "#wohnen"],
  ["Zimmer", "#zimmer"],
  ["Leistungen", "#leistungen"],
  ["Firmen", "#firmen"],
  ["Kontakt", "#kontakt"],
];

function Anfragen({ variant = "primary", children = "Jetzt anfragen" }) {
  return (
    <a className={`btn btn--${variant}`} href={ANFRAGE_HREF}>
      {children}
    </a>
  );
}

function Anrufen({ variant = "ghost" }) {
  return (
    <a className={`btn btn--${variant}`} href={KONTAKT.telefonHref}>
      Jetzt anrufen
    </a>
  );
}

export default function App() {
  const videoRef = useRef(null);

  useEffect(() => initMotion({ video: videoRef.current }), []);

  return (
    <>
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
        {/* VP9 first — smaller and seeks well; H.264 covers Safari. Both are
            encoded all-keyframe so scrubbing lands on an exact frame. */}
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
            <a key={href} href={href}>
              {label}
            </a>
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
          <p className="eyebrow" data-reveal>
            unkompliziert &amp; komfortabel
          </p>
          <h1 className="hero__title" data-reveal>
            Wohnen auf Zeit
          </h1>
          <p className="hero__lede" data-reveal>
            Do Step Inn Living bietet moderne, voll ausgestattete Apartments für
            Kurzzeitaufenthalte in Wien. Ob Geschäftsreise, Projektarbeit, Studium oder
            Übergangslösung – wir verbinden die Flexibilität einer Kurzzeitvermietung mit
            dem Komfort eines Zuhauses.
          </p>
          <div className="actions" data-reveal>
            <Anfragen />
            <a className="btn btn--ghost" href="#zimmer">
              Zu den Preisen
            </a>
          </div>
          <p className="hero__cue" aria-hidden="true">
            weiterscrollen
          </p>
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

        <section id="apartments" className="living">
          <div className="section__head" data-reveal>
            <p className="label">02 — Flexible Kurzzeitvermietung in Wien</p>
            <h2>Alles da, worauf es ankommt.</h2>
            <p className="lede">
              Unsere Apartments sind ideal für alle, die eine flexible Wohnlösung ab
              wenigen Wochen suchen. Jedes Apartment ist funktional eingerichtet und
              bietet alles, was du für einen angenehmen Aufenthalt brauchst.
            </p>
          </div>
          <div className="living__grid">
            <ul className="ticks panel" data-reveal>
              {AUSSTATTUNG.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <figure className="crop" data-reveal>
              <img
                src="/img/lobby-living-reference.jpg"
                alt="Platzhalterbild — Wohnbereich"
              />
              <figcaption>Wohnen mit Atmosphäre</figcaption>
            </figure>
            <div className="panel note" data-reveal>
              <p className="label">In jedem Zimmer</p>
              <ul className="ticks ticks--tight">
                {ZIMMERAUSSTATTUNG.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="muted small">
                Die Zimmer werden aufgebettet übergeben und vom Housekeeping regelmäßig
                serviciert.
              </p>
            </div>
          </div>
        </section>

        <section id="zimmer" className="rooms">
          <div className="section__head" data-reveal>
            <p className="label">03 — Preisübersicht</p>
            <h2>Transparentes Preis- &amp; Leistungsmodell</h2>
            <p className="lede">Sie entscheiden, wir gestalten die passende Lösung.</p>
          </div>

          <div className="table-wrap panel" data-reveal>
            <p className="table__basis">{PREIS_BASIS}</p>
            <table className="prices">
              <thead>
                <tr>
                  <th scope="col">Kategorie</th>
                  <th scope="col">3–5 Nächte</th>
                  <th scope="col">Wochenpreis</th>
                  <th scope="col">Monatspreis</th>
                </tr>
              </thead>
              <tbody>
                {ZIMMER.map((z) => (
                  <tr key={z.name}>
                    <th scope="row">{z.name}</th>
                    <td className="num">{z.preis} €</td>
                    <td className="num todo">
                      {WOCHEN_MONATSPREIS_OFFEN ? "zu prüfen" : ""}
                    </td>
                    <td className="num todo">
                      {WOCHEN_MONATSPREIS_OFFEN ? "zu prüfen" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="footnotes">
              {PREIS_HINWEISE.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          {WOCHEN_MONATSPREIS_OFFEN && (
            <p className="notice" data-reveal>
              Wochen- und Monatspreise sind noch nicht freigegeben: Der Firmenflyer führt
              sie inklusive USt. und Ortstaxe, die Website netto. Beide Stände weichen
              voneinander ab, deshalb steht hier nichts, statt womöglich Falsches.
            </p>
          )}
        </section>

        <section id="leistungen" className="services">
          <div className="section__head" data-reveal>
            <p className="label">04 — Zusatzleistungen</p>
            <h2>Stellen Sie Ihren Aufenthalt zusammen.</h2>
            <p className="lede">
              Ergänze den Aufenthalt flexibel mit zusätzlichen Services.
            </p>
          </div>
          <div className="services__grid">
            <ul className="service-list" data-reveal>
              {LEISTUNGEN.map((l) => (
                <li key={l.name}>
                  <span className="service-list__name">{l.name}</span>
                  <span className="service-list__detail">{l.detail}</span>
                  <span className="service-list__price num">€ {l.preis}</span>
                </li>
              ))}
            </ul>
            <aside className="panel note" data-reveal>
              <p className="label">InnSider Restaurant · im Haus</p>
              <ul className="ticks ticks--tight">
                {RESTAURANT.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </aside>
          </div>
          <ul className="footnotes" data-reveal>
            {LEISTUNGEN_FUSSNOTEN.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
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
              {FIRMEN_VORTEILE.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
          <div className="panel note" data-reveal>
            <p className="label">Die Vorteile auf einen Blick</p>
            <ul className="ticks ticks--tight">
              {FIRMEN_AUF_EINEN_BLICK.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="lage" className="vienna">
          <div className="section__head" data-reveal>
            <p className="label">06 — Lage</p>
            <h2>Wien-Meidling, gut angebunden.</h2>
            <p className="lede">
              {KONTAKT.strasse}, {KONTAKT.ort}. Was in unmittelbarer Umgebung liegt:
            </p>
            <ul className="ticks">
              {LAGE.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <figure className="crop crop--wide" data-reveal>
            <img src="/img/city-lifestyle.jpg" alt="Platzhalterbild — Stadtumgebung" />
          </figure>
        </section>

        <section id="kontakt" className="cta">
          <div data-reveal>
            <p className="label">07 — Kontakt</p>
            <h2>Wir sind für Sie da.</h2>
            <p className="lede">
              Sie haben Fragen, wünschen ein individuelles Angebot oder möchten direkt
              buchen? Kontaktieren Sie uns gerne persönlich — wir beraten Sie zuverlässig
              und unkompliziert.
            </p>
          </div>
          <div className="actions" data-reveal>
            <Anfragen />
            <Anrufen />
          </div>
          <dl className="contact" data-reveal>
            <div>
              <dt>E-Mail</dt>
              <dd>
                <a href={ANFRAGE_HREF}>{KONTAKT.email}</a>
              </dd>
            </div>
            <div>
              <dt>Telefon</dt>
              <dd>
                <a href={KONTAKT.telefonHref}>{KONTAKT.telefon}</a>
              </dd>
            </div>
            <div>
              <dt>Erreichbarkeit</dt>
              <dd>{KONTAKT.erreichbarkeit}</dd>
            </div>
            <div>
              <dt>Adresse</dt>
              <dd>
                {KONTAKT.strasse}
                <br />
                {KONTAKT.ort}
              </dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="footer">
        <p className="footer__mark">
          Do Step Inn <em>Living</em>
        </p>
        <p className="footer__claim">Dein Zuhause auf Zeit.</p>
        <div className="footer__cols">
          <div>
            <p className="label">Kontakt</p>
            <p>
              <a href={ANFRAGE_HREF}>{KONTAKT.email}</a>
              <br />
              <a href={KONTAKT.telefonHref}>{KONTAKT.telefon}</a>
              <br />
              {KONTAKT.erreichbarkeit}
            </p>
          </div>
          <div>
            <p className="label">Adresse</p>
            <p>
              {KONTAKT.strasse}
              <br />
              {KONTAKT.ort}
            </p>
          </div>
          <div>
            <p className="label">Rechtliches</p>
            <p>
              <a href={KONTAKT.home}>Home</a>
              <br />
              <a href={KONTAKT.agb}>AGB</a>
              <br />
              {KONTAKT.betreiber}
            </p>
          </div>
        </div>
        <p className="footer__note">
          Platzhalter-Build. Die Bilder und der Hintergrundfilm sind prozedural erzeugt,
          keine Fotografie — sie werden durch echtes Bildmaterial ersetzt.
        </p>
      </footer>
    </>
  );
}
