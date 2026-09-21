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
  const offeneAnzahl = AGB.paragraphen
    .flatMap((p) => p.absaetze)
    .filter((a) => a.offen).length;
  const uebersetzung = t(AGB.uebersetzungshinweis);

  return (
    <>
      <p className="lede">{t(AGB.intro)}</p>
      <Pruefhinweis />
      <p className="pruefhinweis pruefhinweis--offen" role="note">
        {sprache === "de"
          ? `${offeneAnzahl} Stellen sind bewusst offen: Fristen, Beträge und die Rechtswahl sind unternehmerische Entscheidungen. Sie stehen im Text markiert, statt als erfundene Zahl.`
          : `${offeneAnzahl} points are deliberately open: deadlines, amounts and the choice of law are business decisions. They are marked in the text rather than invented.`}
      </p>
      {uebersetzung && <p className="agb__uebersetzung">{uebersetzung}</p>}

      <nav className="agb__inhalt" aria-label={sprache === "de" ? "Inhalt" : "Contents"}>
        <ol>
          {AGB.paragraphen.map((p) => (
            <li key={p.nr}>
              <a href={`#agb-${p.nr}`}>
                <span className="agb__nr">§ {p.nr}</span> {t(p.titel)}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="agb__text">
        {AGB.paragraphen.map((p) => (
          <section className="agb__paragraph" id={`agb-${p.nr}`} key={p.nr} data-reveal>
            <h2>
              <span className="agb__nr">§ {p.nr}</span> {t(p.titel)}
            </h2>
            <ol className="agb__absaetze">
              {p.absaetze.map((a, i) =>
                a.offen ? (
                  <li className="agb__absatz agb__absatz--offen" key={i}>
                    <span className="agb__marke">{sprache === "de" ? "offen" : "open"}</span>
                    {t(a.offen)}
                  </li>
                ) : (
                  <li className="agb__absatz" key={i}>{t(a.text)}</li>
                )
              )}
            </ol>
          </section>
        ))}
      </div>
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
