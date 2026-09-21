import { useT, useSprache } from "../i18n.js";
import { RECHT_PRUEFHINWEIS, IMPRESSUM, DATENSCHUTZ, AGB } from "../data/recht.js";

function Pruefhinweis() {
  const t = useT();
  return (
    <p className="pruefhinweis" role="note">
      {t(RECHT_PRUEFHINWEIS)}
    </p>
  );
}

function Impressum() {
  const t = useT();
  return (
    <>
      <p className="lede">{t(IMPRESSUM.intro)}</p>
      <Pruefhinweis />
      <div className="recht__bloecke">
        {IMPRESSUM.bloecke.map((b, i) => (
          <section className="recht__block panel" key={i} data-reveal data-kippen="4" data-tiefe={String((i % 3) + 1)}>
            <h2>{t(b.titel)}</h2>
            <dl>
              {b.zeilen.map((z, j) => (
                <div key={j}>
                  <dt>{t(z.k)}</dt>
                  <dd>{z.href ? <a href={z.href}>{t(z.v)}</a> : t(z.v)}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <p className="recht__fliesstext" data-reveal>{t(IMPRESSUM.odr)}</p>
    </>
  );
}

function Datenschutz() {
  const t = useT();
  return (
    <>
      <p className="lede">{t(DATENSCHUTZ.intro)}</p>
      <Pruefhinweis />
      <div className="recht__abschnitte">
        {DATENSCHUTZ.abschnitte.map((a, i) => (
          <section
            className={`recht__abschnitt ${a.warnung ? "recht__abschnitt--warnung" : ""}`}
            key={i}
            data-reveal
          >
            <h2>{t(a.titel)}</h2>
            <p>{t(a.text)}</p>
          </section>
        ))}
      </div>
    </>
  );
}

function Agb() {
  const t = useT();
  const sprache = useSprache();
  return (
    <>
      <p className="lede">{t(AGB.intro)}</p>
      <p className="pruefhinweis pruefhinweis--offen" role="note">
        {sprache === "de"
          ? "Diese Seite ist absichtlich unfertig. Es stehen hier keine erfundenen Vertragsbedingungen."
          : "This page is deliberately unfinished. No invented contractual terms appear here."}
      </p>
      <ol className="recht__gliederung" data-reveal>
        {t(AGB.punkte).map((p) => (
          <li key={p}>
            <span>{p}</span>
            <em>{sprache === "de" ? "ausstehend" : "pending"}</em>
          </li>
        ))}
      </ol>
    </>
  );
}

const SEITEN = {
  "/impressum": { daten: IMPRESSUM, Inhalt: Impressum },
  "/datenschutz": { daten: DATENSCHUTZ, Inhalt: Datenschutz },
  "/agb": { daten: AGB, Inhalt: Agb },
};

export default function Rechtsseite({ pfad }) {
  const t = useT();
  const seite = SEITEN[pfad];
  if (!seite) return null;
  const { daten, Inhalt } = seite;
  return (
    <main className="page recht">
      <section className="recht__kopf">
        <h1 data-reveal data-maske>{t(daten.titel)}</h1>
      </section>
      <section className="recht__inhalt">
        <Inhalt />
      </section>
    </main>
  );
}
