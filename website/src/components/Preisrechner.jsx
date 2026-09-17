import { useState } from "react";
import { berechneAufenthalt, moeglichePersonen, eur } from "../lib/preis.js";
import { useSprache, useT, UI } from "../i18n.js";
import {
  ZIMMERTYPEN,
  TARIFE,
  KONTAKT,
  anfrageHref,
  MINDEST_NAECHTE,
  SCHLUESSELKAUTION,
  PREIS_REGELN,
} from "../data/content.js";

export default function Preisrechner() {
  const sprache = useSprache();
  const t = useT();
  const ui = UI[sprache];

  const [typId, setTypId] = useState(ZIMMERTYPEN[0].id);
  const [personen, setPersonen] = useState(1);
  const [naechte, setNaechte] = useState(30);
  const [zimmer, setZimmer] = useState(1);

  const typ = ZIMMERTYPEN.find((z) => z.id === typId);
  const erlaubtePersonen = moeglichePersonen(typ.tarif);
  const gewaehltePersonen = erlaubtePersonen.includes(personen) ? personen : erlaubtePersonen[0];

  // Kein useMemo: Die Staffel ist eine Schleife über höchstens 365 Nächte und
  // läuft in Mikrosekunden. Memoisierung kostet hier mehr Aufmerksamkeit, als
  // sie spart.
  const rechnung = berechneAufenthalt(typ.tarif, gewaehltePersonen, naechte);

  const gesamt = rechnung.gueltig ? rechnung.summe * zimmer : 0;

  const anfrageText = (() => {
    if (!rechnung.gueltig) return "";
    const z = [
      sprache === "de" ? "Guten Tag," : "Hello,",
      "",
      sprache === "de" ? "ich möchte folgenden Aufenthalt anfragen:" : "I would like to enquire about the following stay:",
      "",
      `${ui.zimmertyp}: ${t(typ.name)}`,
      `${ui.personen}: ${gewaehltePersonen}`,
      `${ui.naechte}: ${naechte}`,
      `${ui.zimmerAnzahl}: ${zimmer}`,
      "",
      ...rechnung.teile.map((p) => `  ${p.label}: ${eur(p.betrag)}`),
      zimmer > 1 ? `  × ${zimmer} ${ui.zimmerAnzahl}` : null,
      "",
      `${ui.gesamt}: ${eur(gesamt)}`,
      "",
      ui.schluessel(eur(SCHLUESSELKAUTION)),
      ...t(PREIS_REGELN).slice(3),
      "",
      sprache === "de" ? "Wunschzeitraum: " : "Preferred dates: ",
      sprache === "de" ? "Wunschstandort: " : "Preferred location: ",
      sprache === "de" ? "Name / Firma: " : "Name / company: ",
      "",
      sprache === "de" ? "Danke und beste Grüße" : "Thank you and best regards",
    ].filter((l) => l !== null);
    return z.join("\n");
  })();

  return (
    <div className="rechner">
      <div className="rechner__form">
        <fieldset className="feld">
          <legend>{ui.zimmertyp}</legend>
          <div className="chips-wahl">
            {ZIMMERTYPEN.map((z) => (
              <button
                key={z.id}
                type="button"
                className={`chip ${z.id === typId ? "chip--an" : ""}`}
                aria-pressed={z.id === typId}
                onClick={() => setTypId(z.id)}
              >
                {t(z.name)}
              </button>
            ))}
          </div>
          <p className="feld__hinweis">
            {t(TARIFE[typ.tarif].name)} · {t(TARIFE[typ.tarif].hinweis)}
          </p>
        </fieldset>

        <fieldset className="feld">
          <legend>{ui.personen}</legend>
          <div className="chips-wahl">
            {erlaubtePersonen.map((p) => (
              <button
                key={p}
                type="button"
                className={`chip ${p === gewaehltePersonen ? "chip--an" : ""}`}
                aria-pressed={p === gewaehltePersonen}
                onClick={() => setPersonen(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="feld-reihe">
          <fieldset className="feld">
            <legend><label htmlFor="naechte">{ui.naechte}</label></legend>
            <div className="stepper">
              <button type="button" onClick={() => setNaechte((n) => Math.max(1, n - 1))} aria-label="−">−</button>
              <input
                id="naechte" type="number" min="1" max="365" value={naechte}
                onChange={(e) => setNaechte(Math.max(1, Math.min(365, Number(e.target.value) || 1)))}
              />
              <button type="button" onClick={() => setNaechte((n) => Math.min(365, n + 1))} aria-label="+">+</button>
            </div>
            <div className="schnellwahl">
              {[7, 14, 30, 90, 180].map((n) => (
                <button key={n} type="button" className="mini" onClick={() => setNaechte(n)}>{n}</button>
              ))}
            </div>
          </fieldset>

          <fieldset className="feld">
            <legend><label htmlFor="zimmer">{ui.zimmerAnzahl}</label></legend>
            <div className="stepper">
              <button type="button" onClick={() => setZimmer((z) => Math.max(1, z - 1))} aria-label="−">−</button>
              <input
                id="zimmer" type="number" min="1" max="50" value={zimmer}
                onChange={(e) => setZimmer(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
              />
              <button type="button" onClick={() => setZimmer((z) => Math.min(50, z + 1))} aria-label="+">+</button>
            </div>
            <p className="feld__hinweis">{ui.fuerTeams}</p>
          </fieldset>
        </div>
      </div>

      <aside className="rechner__summe panel" aria-live="polite">
        <p className="label">{ui.zusammenstellung}</p>
        <h3>
          {t(typ.name)}
          <span className="summe__meta">
            {gewaehltePersonen} {ui.personen} · {zimmer} {ui.zimmerAnzahl} · {naechte}{" "}
            {naechte === 1 ? ui.nachtEinzahl : ui.nachtMehrzahl}
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
                  <span className="num">{eur(gesamt)}</span>
                </li>
              )}
            </ul>

            <p className="posten__gesamt">
              <span>{ui.gesamt}</span>
              <span className="num">{eur(gesamt)}</span>
            </p>

            {rechnung.verrechneteNaechte > naechte && (
              <p className="hinweis-mint">{ui.verrechnet(rechnung.verrechneteNaechte)}</p>
            )}

            <p className="feld__hinweis">{ui.schluessel(eur(SCHLUESSELKAUTION))}</p>

            <a
              className="btn btn--primary btn--breit"
              href={anfrageHref(
                sprache === "de" ? "Angebotsanfrage Do Step Inn Living" : "Offer request Do Step Inn Living",
                anfrageText
              )}
            >
              {ui.angebotAnfragen}
            </a>
            <p className="feld__hinweis">{ui.mailHinweis(KONTAKT.email)}</p>
          </>
        )}
      </aside>
    </div>
  );
}
