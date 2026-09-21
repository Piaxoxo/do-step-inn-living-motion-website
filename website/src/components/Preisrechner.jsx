import { useState } from "react";
import { berechneZimmer, berechneExtras, eur } from "../lib/preis.js";
import { useSprache, useT, UI } from "../i18n.js";
import {
  KATEGORIEN,
  EXTRAS,
  EXTRAS_FUSSNOTE,
  KONTAKT,
  anfrageHref,
  MINDEST_NAECHTE,
  SCHLUESSELKAUTION,
} from "../data/content.js";

export default function Preisrechner() {
  const sprache = useSprache();
  const t = useT();
  const ui = UI[sprache];

  const [katId, setKatId] = useState(KATEGORIEN[0].id);
  const [naechte, setNaechte] = useState(30);
  const [zimmer, setZimmer] = useState(1);
  const [mengen, setMengen] = useState({});

  const kategorie = KATEGORIEN.find((k) => k.id === katId);
  // Keine Memoisierung: Die Staffel ist eine Schleife über höchstens 365
  // Nächte und läuft in Mikrosekunden.
  const rechnung = berechneZimmer(katId, naechte);
  const extraPosten = berechneExtras(mengen, naechte);

  const zimmerGesamt = rechnung.gueltig ? rechnung.summe * zimmer : 0;
  const extraGesamt = extraPosten.reduce((s, p) => s + p.betrag, 0);
  const gesamt = zimmerGesamt + extraGesamt;

  const setMenge = (id, wert) =>
    setMengen((v) => ({ ...v, [id]: Math.max(0, Math.min(99, wert)) }));

  const anfrageText = (() => {
    if (!rechnung.gueltig) return "";
    const zeilen = [
      sprache === "de" ? "Guten Tag," : "Hello,",
      "",
      sprache === "de" ? "ich möchte folgenden Aufenthalt anfragen:" : "I would like to enquire about the following stay:",
      "",
      `${ui.kategorie}: ${t(kategorie.name)}`,
      `${ui.naechte}: ${naechte}`,
      `${ui.zimmerAnzahl}: ${zimmer}`,
      "",
      ...rechnung.teile.map((p) => `  ${p.label}: ${eur(p.betrag)}`),
      zimmer > 1 ? `  × ${zimmer} ${ui.zimmerAnzahl}: ${eur(zimmerGesamt)}` : null,
    ];
    if (extraPosten.length) {
      zeilen.push("", sprache === "de" ? "Zusatzleistungen:" : "Additional services:");
      extraPosten.forEach((p) => {
        const wie = p.proNacht
          ? `${p.menge} × ${naechte} ${ui.nachtMehrzahl}`
          : `${p.menge} ×`;
        zeilen.push(`  ${t(p.name)} — ${wie} ${eur(p.preis)}: ${eur(p.betrag)}`);
      });
    }
    zeilen.push(
      "",
      `${ui.gesamt}: ${eur(gesamt)}`,
      "",
      ui.schluessel(eur(SCHLUESSELKAUTION)),
      "",
      sprache === "de" ? "Wunschzeitraum: " : "Preferred dates: ",
      sprache === "de" ? "Wunschstandort: " : "Preferred location: ",
      sprache === "de" ? "Name / Firma: " : "Name / company: ",
      "",
      sprache === "de" ? "Danke und beste Grüße" : "Thank you and best regards"
    );
    return zeilen.filter((l) => l !== null).join("\n");
  })();

  return (
    <div className="rechner">
      <div className="rechner__form">
        <fieldset className="feld">
          <legend>{ui.kategorie}</legend>
          <div className="chips-wahl">
            {KATEGORIEN.map((k) => (
              <button
                key={k.id}
                type="button"
                className={`chip ${k.id === katId ? "chip--an" : ""}`}
                aria-pressed={k.id === katId}
                onClick={() => setKatId(k.id)}
              >
                {t(k.name)}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="feld-reihe">
          <fieldset className="feld">
            <legend><label htmlFor="rechner-naechte">{ui.naechte}</label></legend>
            <div className="stepper">
              <button type="button" onClick={() => setNaechte((n) => Math.max(1, n - 1))} aria-label="−">−</button>
              <input id="rechner-naechte" type="number" min="1" max="365" value={naechte}
                     onChange={(e) => setNaechte(Math.max(1, Math.min(365, Number(e.target.value) || 1)))} />
              <button type="button" onClick={() => setNaechte((n) => Math.min(365, n + 1))} aria-label="+">+</button>
            </div>
            <div className="schnellwahl">
              {[3, 7, 14, 30, 90].map((n) => (
                <button key={n} type="button" className="mini" onClick={() => setNaechte(n)}>{n}</button>
              ))}
            </div>
          </fieldset>

          <fieldset className="feld">
            <legend><label htmlFor="rechner-zimmer">{ui.zimmerAnzahl}</label></legend>
            <div className="stepper">
              <button type="button" onClick={() => setZimmer((z) => Math.max(1, z - 1))} aria-label="−">−</button>
              <input id="rechner-zimmer" type="number" min="1" max="50" value={zimmer}
                     onChange={(e) => setZimmer(Math.max(1, Math.min(50, Number(e.target.value) || 1)))} />
              <button type="button" onClick={() => setZimmer((z) => Math.min(50, z + 1))} aria-label="+">+</button>
            </div>
            <p className="feld__hinweis">{ui.fuerTeams}</p>
          </fieldset>
        </div>

        <fieldset className="feld">
          <legend>{ui.zusatzleistungen}</legend>
          <ul className="extras">
            {EXTRAS.map((e) => {
              const menge = mengen[e.id] ?? 0;
              return (
                <li key={e.id} className={menge ? "extra extra--an" : "extra"}>
                  <div className="extra__text">
                    <span className="extra__name">{t(e.name)}</span>
                    <span className="extra__detail">
                      {t(e.detail)} · {eur(e.preis)} {e.proNacht ? ui.proNacht : ui.proStueck}
                    </span>
                  </div>
                  <div className="stepper stepper--klein">
                    <button type="button" onClick={() => setMenge(e.id, menge - 1)} aria-label={`${t(e.name)} −`}>−</button>
                    <span className="stepper__wert num">{menge}</span>
                    <button type="button" onClick={() => setMenge(e.id, menge + 1)} aria-label={`${t(e.name)} +`}>+</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="feld__hinweis">{t(EXTRAS_FUSSNOTE)}</p>
        </fieldset>
      </div>

      <aside className="rechner__summe panel" aria-live="polite">
        <p className="label">{ui.zusammenstellung}</p>
        <h3>
          {t(kategorie.name)}
          <span className="summe__meta">
            {zimmer} {ui.zimmerAnzahl} · {naechte} {naechte === 1 ? ui.nachtEinzahl : ui.nachtMehrzahl}
          </span>
        </h3>

        {!rechnung.gueltig ? (
          <p className="hinweis-mint">{ui.zuKurz(MINDEST_NAECHTE)}</p>
        ) : (
          <>
            <ul className="posten">
              {rechnung.teile.map((p) => (
                <li key={p.label}>
                  <span>{p.label}</span>
                  <span className="num">{eur(p.betrag)}</span>
                </li>
              ))}
              {zimmer > 1 && (
                <li className="posten--zwischen">
                  <span>× {zimmer} {ui.zimmerAnzahl}</span>
                  <span className="num">{eur(zimmerGesamt)}</span>
                </li>
              )}
              {extraPosten.map((p) => (
                <li key={p.id}>
                  <span>
                    {t(p.name)}
                    <em>{p.proNacht ? `${p.menge} × ${naechte} ${ui.nachtMehrzahl} × ${eur(p.preis)}` : `${p.menge} × ${eur(p.preis)}`}</em>
                  </span>
                  <span className="num">{eur(p.betrag)}</span>
                </li>
              ))}
            </ul>

            <p className="posten__gesamt">
              <span>{ui.gesamt}</span>
              <span className="num">{eur(gesamt)}</span>
            </p>

            {rechnung.verrechneteNaechte > naechte && (
              <p className="hinweis-mint">{ui.verrechnet(rechnung.verrechneteNaechte)}</p>
            )}

            <p className="feld__hinweis">{ui.schluessel(eur(SCHLUESSELKAUTION))}</p>

            <a className="btn btn--primary btn--breit" data-magnet
               href={anfrageHref(
                 sprache === "de" ? "Angebotsanfrage Do Step Inn Living" : "Offer request Do Step Inn Living",
                 anfrageText
               )}>
              {ui.angebotAnfragen}
            </a>
            <p className="feld__hinweis">{ui.mailHinweis(KONTAKT.email)}</p>
          </>
        )}
      </aside>
    </div>
  );
}
