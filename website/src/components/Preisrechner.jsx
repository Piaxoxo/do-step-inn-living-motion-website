import { useMemo, useState } from "react";
import { berechneZimmer, besserePreisstufe, eur } from "../lib/preis.js";
import {
  KATEGORIEN,
  EXTRAS,
  EXTRAS_FUSSNOTE,
  PREIS_BASIS,
  ORTSTAXE_FREI_AB_NAECHTEN,
  KONTAKT,
  anfrageHref,
} from "../data/content.js";

export default function Preisrechner() {
  const [katId, setKatId] = useState(KATEGORIEN[0].id);
  const [naechte, setNaechte] = useState(30);
  const [zimmer, setZimmer] = useState(1);
  const [extras, setExtras] = useState({});

  const kategorie = KATEGORIEN.find((k) => k.id === katId);

  const zimmerRechnung = useMemo(
    () => berechneZimmer(kategorie, naechte),
    [kategorie, naechte]
  );

  // Die Staffel hat echte Sprünge — sechs Nächte kosten mehr als sieben.
  // Das sagen wir dazu, statt es stillschweigend wegzurechnen.
  const tipp = useMemo(() => besserePreisstufe(kategorie, naechte), [kategorie, naechte]);

  const extraPosten = useMemo(
    () =>
      EXTRAS.map((e) => {
        const menge = extras[e.id] ?? 0;
        if (!menge) return null;
        const anzahl = e.proNacht ? menge * naechte : menge;
        return {
          ...e,
          menge,
          anzahl,
          betrag: anzahl * e.preis,
          label: e.proNacht
            ? `${menge} × ${naechte} Nächte × ${eur(e.preis)}`
            : `${menge} × ${eur(e.preis)}`,
        };
      }).filter(Boolean),
    [extras, naechte]
  );

  const zimmerGesamt = zimmerRechnung.summe * zimmer;
  const extraGesamt = extraPosten.reduce((s, p) => s + p.betrag, 0);
  const gesamt = zimmerGesamt + extraGesamt;
  const ortstaxeEntfaellt = naechte >= ORTSTAXE_FREI_AB_NAECHTEN;

  const setExtra = (id, wert) =>
    setExtras((prev) => ({ ...prev, [id]: Math.max(0, Math.min(99, wert)) }));

  const anfrageText = useMemo(() => {
    const zeilen = [
      "Guten Tag,",
      "",
      "ich möchte folgenden Aufenthalt anfragen:",
      "",
      `Kategorie:      ${kategorie.name}`,
      `Zimmer:         ${zimmer}`,
      `Nächte:         ${naechte}`,
      "",
      "Zimmer:",
      ...zimmerRechnung.teile.map((t) => `  ${t.label}: ${eur(t.betrag)}`),
      `  Zwischensumme (${zimmer} Zimmer): ${eur(zimmerGesamt)}`,
    ];
    if (extraPosten.length) {
      zeilen.push("", "Zusatzleistungen:");
      extraPosten.forEach((p) => zeilen.push(`  ${p.name} — ${p.label}: ${eur(p.betrag)}`));
    }
    zeilen.push("", `Gesamt: ${eur(gesamt)}`, "", PREIS_BASIS);
    if (ortstaxeEntfaellt) {
      zeilen.push("Hinweis: Ab 3 Monaten entfällt die Ortstaxe — bitte um den finalen Preis.");
    }
    zeilen.push("", "Wunschzeitraum: ", "Name / Firma: ", "", "Danke und beste Grüße");
    return zeilen.join("\n");
  }, [kategorie, zimmer, naechte, zimmerRechnung, zimmerGesamt, extraPosten, gesamt, ortstaxeEntfaellt]);

  return (
    <div className="rechner">
      <div className="rechner__form">
        <fieldset className="feld">
          <legend>Kategorie</legend>
          <div className="chips-wahl">
            {KATEGORIEN.map((k) => (
              <button
                key={k.id}
                type="button"
                className={`chip ${k.id === katId ? "chip--an" : ""}`}
                aria-pressed={k.id === katId}
                onClick={() => setKatId(k.id)}
              >
                {k.name}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="feld-reihe">
          <fieldset className="feld">
            <legend>
              <label htmlFor="naechte">Nächte</label>
            </legend>
            <div className="stepper">
              <button type="button" onClick={() => setNaechte((n) => Math.max(1, n - 1))} aria-label="Eine Nacht weniger">−</button>
              <input
                id="naechte"
                type="number"
                min="1"
                max="365"
                value={naechte}
                onChange={(e) => setNaechte(Math.max(1, Math.min(365, Number(e.target.value) || 1)))}
              />
              <button type="button" onClick={() => setNaechte((n) => Math.min(365, n + 1))} aria-label="Eine Nacht mehr">+</button>
            </div>
            <div className="schnellwahl">
              {[3, 7, 14, 30, 90].map((n) => (
                <button key={n} type="button" className="mini" onClick={() => setNaechte(n)}>
                  {n}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="feld">
            <legend>
              <label htmlFor="zimmer">Zimmer</label>
            </legend>
            <div className="stepper">
              <button type="button" onClick={() => setZimmer((z) => Math.max(1, z - 1))} aria-label="Ein Zimmer weniger">−</button>
              <input
                id="zimmer"
                type="number"
                min="1"
                max="50"
                value={zimmer}
                onChange={(e) => setZimmer(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
              />
              <button type="button" onClick={() => setZimmer((z) => Math.min(50, z + 1))} aria-label="Ein Zimmer mehr">+</button>
            </div>
            <p className="feld__hinweis">Für Teams und Projekteinsätze</p>
          </fieldset>
        </div>

        <fieldset className="feld">
          <legend>Zusatzleistungen</legend>
          <ul className="extras">
            {EXTRAS.map((e) => {
              const menge = extras[e.id] ?? 0;
              return (
                <li key={e.id} className={menge ? "extra extra--an" : "extra"}>
                  <div className="extra__text">
                    <span className="extra__name">{e.name}</span>
                    <span className="extra__detail">
                      {e.detail} · {eur(e.preis)} {e.proNacht ? "pro Nacht" : "pro Stück"}
                    </span>
                  </div>
                  <div className="stepper stepper--klein">
                    <button type="button" onClick={() => setExtra(e.id, menge - 1)} aria-label={`${e.name} verringern`}>−</button>
                    <span className="stepper__wert num">{menge}</span>
                    <button type="button" onClick={() => setExtra(e.id, menge + 1)} aria-label={`${e.name} hinzufügen`}>+</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="feld__hinweis">{EXTRAS_FUSSNOTE}</p>
        </fieldset>
      </div>

      <aside className="rechner__summe panel" aria-live="polite">
        <p className="label">Ihre Zusammenstellung</p>
        <h3>
          {kategorie.name}
          <span className="summe__meta">
            {zimmer} {zimmer === 1 ? "Zimmer" : "Zimmer"} · {naechte} {naechte === 1 ? "Nacht" : "Nächte"}
          </span>
        </h3>

        <ul className="posten">
          {zimmerRechnung.teile.map((t) => (
            <li key={t.label}>
              <span>{t.label}</span>
              <span className="num">{eur(t.betrag)}</span>
            </li>
          ))}
          {zimmer > 1 && (
            <li className="posten--zwischen">
              <span>× {zimmer} Zimmer</span>
              <span className="num">{eur(zimmerGesamt)}</span>
            </li>
          )}
          {extraPosten.map((p) => (
            <li key={p.id}>
              <span>
                {p.name}
                <em>{p.label}</em>
              </span>
              <span className="num">{eur(p.betrag)}</span>
            </li>
          ))}
        </ul>

        <p className="posten__gesamt">
          <span>Gesamt</span>
          <span className="num">{eur(gesamt)}</span>
        </p>

        {tipp && (
          <button type="button" className="tarif-tipp" onClick={() => setNaechte(tipp.naechte)}>
            <strong>{tipp.naechte} Nächte kosten {eur(tipp.summe)}</strong> — {eur(tipp.ersparnis)} weniger
            als {naechte}. Übernehmen?
          </button>
        )}

        <p className="feld__hinweis">{PREIS_BASIS}</p>
        {ortstaxeEntfaellt && (
          <p className="hinweis-mint">
            Ab 3 Monaten entfällt die Ortstaxe. Sie ist hier noch enthalten — den finalen Preis
            rechnen wir individuell.
          </p>
        )}

        <a className="btn btn--primary btn--breit" href={anfrageHref("Angebotsanfrage Do Step Inn Living", anfrageText)}>
          Angebot anfragen
        </a>
        <p className="feld__hinweis">
          Öffnet eine vorausgefüllte E-Mail an {KONTAKT.email} — Sie schicken sie nur noch ab.
        </p>
      </aside>
    </div>
  );
}
