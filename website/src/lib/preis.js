/**
 * Preisstaffel nach Aufenthaltsdauer.
 *
 * Volle Monate zum Monatspreis, der Rest in vollen Wochen zum Wochenpreis, was
 * dann noch bleibt zum Nachtpreis. Zum Schluss geprüft gegen die reine
 * Nachtrechnung: die Staffelung darf nie teurer ausfallen als jede Nacht
 * einzeln, sonst würde der Rechner Gäste für längere Aufenthalte bestrafen.
 */
export function berechneZimmer(kategorie, naechte) {
  if (!kategorie || !Number.isFinite(naechte) || naechte < 1) {
    return { summe: 0, teile: [] };
  }
  const teile = [];
  let rest = Math.floor(naechte);

  const monate = Math.floor(rest / 30);
  if (monate > 0) {
    teile.push({ label: `${monate} × Monatspreis (30 Nächte)`, betrag: monate * kategorie.monat });
    rest -= monate * 30;
  }
  const wochen = Math.floor(rest / 7);
  if (wochen > 0) {
    teile.push({ label: `${wochen} × Wochenpreis (7 Nächte)`, betrag: wochen * kategorie.woche });
    rest -= wochen * 7;
  }
  if (rest > 0) {
    teile.push({ label: `${rest} × Nachtpreis`, betrag: rest * kategorie.nacht });
  }

  const summe = teile.reduce((s, t) => s + t.betrag, 0);
  const nurNaechte = Math.floor(naechte) * kategorie.nacht;
  if (nurNaechte < summe) {
    return {
      summe: nurNaechte,
      teile: [{ label: `${Math.floor(naechte)} × Nachtpreis`, betrag: nurNaechte }],
    };
  }
  return { summe, teile };
}

export const eur = (n) =>
  n.toLocaleString("de-AT", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

/**
 * Findet heraus, ob ein etwas längerer Aufenthalt günstiger wäre.
 *
 * Die Staffel des Betreibers hat echte Sprünge: sechs Nächte im Einzelzimmer
 * kosten 288 €, sieben nur 287 €. Das ist deren Tarif, nicht unsere Rechnung —
 * wir glätten ihn nicht still, sondern sagen es dazu. Wer es weiß, ärgert sich
 * nicht hinterher.
 */
export function besserePreisstufe(kategorie, naechte) {
  if (!kategorie || naechte < 1) return null;
  const jetzt = berechneZimmer(kategorie, naechte).summe;
  for (const ziel of [7, 30]) {
    if (naechte >= ziel) continue;
    const dann = berechneZimmer(kategorie, ziel).summe;
    if (dann < jetzt - 0.001) {
      return { naechte: ziel, summe: dann, ersparnis: jetzt - dann };
    }
  }
  return null;
}
