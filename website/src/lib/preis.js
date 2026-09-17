import { TARIFE, MINDEST_NAECHTE, MONAT_NAECHTE } from "../data/content.js";

export const eur = (n) =>
  n.toLocaleString("de-AT", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

/** Die Preiszeile für einen Tarif und eine Personenzahl. */
export function findeStaffel(tarifId, personen) {
  const tarif = TARIFE[tarifId];
  if (!tarif) return null;
  return tarif.staffel.find((s) => s.personen === personen) ?? null;
}

/** Wie viele Personen dieser Tarif überhaupt zulässt. */
export function moeglichePersonen(tarifId) {
  return (TARIFE[tarifId]?.staffel ?? []).map((s) => s.personen);
}

/**
 * Rechnet einen Aufenthalt nach der Staffel des Betreibers.
 *
 * Gesucht ist die günstigste Kombination aus Monaten, Wochen und Tagen, die den
 * Aufenthalt abdeckt — nicht die naheliegendste. Der Unterschied ist real: 49
 * Nächte als Monat plus zwei Wochen plus fünf Tage kosten 1.063 €, während zwei
 * Monate 1.056 € kosten und dieselbe Zeit abdecken. Wer gierig von der größten
 * Einheit nach unten rechnet, stellt Gästen zu viel in Rechnung.
 *
 * Deshalb kleine dynamische Programmierung: kosten[i] ist der günstigste Preis,
 * der mindestens i Nächte abdeckt. Weil jede Lösung für i auch i−1 abdeckt, ist
 * das Ergebnis von Haus aus monoton — ein längerer Aufenthalt kann nie billiger
 * werden als ein kürzerer.
 *
 * Einzelne Tage sind nicht buchbar: Unterhalb von sieben Nächten gibt es keinen
 * Preis, sondern einen Hinweis.
 */
export function berechneAufenthalt(tarifId, personen, naechte) {
  const s = findeStaffel(tarifId, personen);
  if (!s) return { gueltig: false, grund: "tarif", summe: 0, teile: [] };
  const n = Math.floor(naechte);
  if (!Number.isFinite(n) || n < MINDEST_NAECHTE) {
    return { gueltig: false, grund: "zu-kurz", summe: 0, teile: [] };
  }

  const einheiten = [
    { art: "monat", laenge: MONAT_NAECHTE, preis: s.monat },
    { art: "woche", laenge: 7, preis: s.woche },
    { art: "tag", laenge: 1, preis: s.tag },
  ];

  const kosten = new Array(n + 1).fill(Infinity);
  const wahl = new Array(n + 1).fill(null);
  kosten[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (const e of einheiten) {
      const davor = Math.max(0, i - e.laenge);
      const preis = kosten[davor] + e.preis;
      if (preis < kosten[i]) {
        kosten[i] = preis;
        wahl[i] = e;
      }
    }
  }

  // Zurückverfolgen und gleiche Einheiten zusammenfassen.
  const zaehler = { monat: 0, woche: 0, tag: 0 };
  let abgedeckt = 0;
  for (let i = n; i > 0; ) {
    const e = wahl[i];
    zaehler[e.art] += 1;
    abgedeckt += e.laenge;
    i = Math.max(0, i - e.laenge);
  }

  const teile = [];
  if (zaehler.monat) teile.push({ label: `${zaehler.monat} × Monatspreis (${MONAT_NAECHTE} Nächte)`, betrag: zaehler.monat * s.monat });
  if (zaehler.woche) teile.push({ label: `${zaehler.woche} × Wochenpreis (7 Nächte)`, betrag: zaehler.woche * s.woche });
  if (zaehler.tag) teile.push({ label: `${zaehler.tag} × Tagespreis`, betrag: zaehler.tag * s.tag });

  return {
    gueltig: true,
    summe: kosten[n],
    teile,
    // Wie viele Nächte tatsächlich verrechnet werden. Der Monatspreis gilt
    // immer für 30 Nächte, deshalb kann das über der Aufenthaltsdauer liegen.
    verrechneteNaechte: abgedeckt,
  };
}
