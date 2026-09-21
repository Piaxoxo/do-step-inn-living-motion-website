import { KATEGORIEN, EXTRAS, MINDEST_NAECHTE, MONAT_NAECHTE } from "../data/content.js";

export const eur = (n) =>
  n.toLocaleString("de-AT", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

export const findeKategorie = (id) => KATEGORIEN.find((k) => k.id === id) ?? null;

/**
 * Rechnet einen Aufenthalt nach der Staffel des Firmenflyers.
 *
 * Gesucht ist die günstigste Kombination aus Monaten, Wochen und Nächten, die
 * den Aufenthalt abdeckt — nicht die naheliegendste. Der Unterschied ist Geld:
 * 13 Nächte im Einzelzimmer kosten als zwei Wochen 574 €, als Woche plus sechs
 * Nächte 575 €. Wer gierig von der größten Einheit abwärts rechnet, stellt
 * Gästen zu viel in Rechnung.
 *
 * kosten[i] ist der günstigste Preis, der mindestens i Nächte abdeckt. Weil
 * jede Lösung für i auch i−1 abdeckt, ist das Ergebnis von Haus aus monoton:
 * ein längerer Aufenthalt kann nie billiger werden als ein kürzerer.
 */
export function berechneZimmer(kategorieId, naechte) {
  const k = findeKategorie(kategorieId);
  if (!k) return { gueltig: false, grund: "kategorie", summe: 0, teile: [] };
  const n = Math.floor(naechte);
  if (!Number.isFinite(n) || n < MINDEST_NAECHTE) {
    return { gueltig: false, grund: "zu-kurz", summe: 0, teile: [] };
  }

  const einheiten = [
    { art: "monat", laenge: MONAT_NAECHTE, preis: k.monat },
    { art: "woche", laenge: 7, preis: k.woche },
    { art: "nacht", laenge: 1, preis: k.nacht },
  ];

  const kosten = new Array(n + 1).fill(Infinity);
  const wahl = new Array(n + 1).fill(null);
  kosten[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (const e of einheiten) {
      const preis = kosten[Math.max(0, i - e.laenge)] + e.preis;
      if (preis < kosten[i]) {
        kosten[i] = preis;
        wahl[i] = e;
      }
    }
  }

  const zaehler = { monat: 0, woche: 0, nacht: 0 };
  let abgedeckt = 0;
  for (let i = n; i > 0; ) {
    const e = wahl[i];
    zaehler[e.art] += 1;
    abgedeckt += e.laenge;
    i = Math.max(0, i - e.laenge);
  }

  const teile = [];
  if (zaehler.monat) teile.push({ label: `${zaehler.monat} × Monatspreis (${MONAT_NAECHTE} Nächte)`, betrag: zaehler.monat * k.monat });
  if (zaehler.woche) teile.push({ label: `${zaehler.woche} × Wochenpreis (7 Nächte)`, betrag: zaehler.woche * k.woche });
  if (zaehler.nacht) teile.push({ label: `${zaehler.nacht} × Nachtpreis`, betrag: zaehler.nacht * k.nacht });

  return { gueltig: true, summe: kosten[n], teile, verrechneteNaechte: abgedeckt };
}

/** Zusatzleistungen: pro Nacht multipliziert oder als Stückzahl. */
export function berechneExtras(mengen, naechte) {
  return EXTRAS.map((e) => {
    const menge = mengen[e.id] ?? 0;
    if (!menge) return null;
    const anzahl = e.proNacht ? menge * naechte : menge;
    return { ...e, menge, anzahl, betrag: anzahl * e.preis };
  }).filter(Boolean);
}
