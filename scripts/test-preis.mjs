/**
 * Prüft die Preisstaffel des Rechners gegen den Firmenflyer.
 *
 * Geld darf nicht raten: Diese Beträge stehen auf der Website und in jeder
 * Angebotsmail. Ausführen aus website/:  node ../scripts/test-preis.mjs
 */
import { berechneZimmer, berechneExtras } from "../website/src/lib/preis.js";
import { KATEGORIEN, EXTRAS, MINDEST_NAECHTE } from "../website/src/data/content.js";

let fehler = 0;
const pruefe = (ok, text) => { console.log(`${ok ? "PASS" : "FAIL"}  ${text}`); if (!ok) fehler++; };

// Einzelzimmer: Nacht 48 / Woche 287 / Monat 798.
// Erwartet ist jeweils die günstigste Deckung, nicht die naheliegendste:
// 21 Nächte werden als Monat verrechnet (798 €), weil drei Wochen 861 € kosten.
for (const [n, erw] of [[3,144],[6,287],[7,287],[10,431],[13,574],[14,574],[21,798],[29,798],[30,798],[37,1085],[60,1596]]) {
  const r = berechneZimmer("ez", n);
  pruefe(r.gueltig && Math.abs(r.summe - erw) < 0.005,
    `Einzelzimmer · ${String(n).padStart(2)} Nächte = ${r.summe.toFixed(2)} € (erwartet ${erw.toFixed(2)})`);
}

for (const n of [1, 2]) {
  const r = berechneZimmer("ez", n);
  pruefe(!r.gueltig && r.grund === "zu-kurz", `${n} Nächte werden abgewiesen (Nachtpreis gilt ab ${MINDEST_NAECHTE})`);
}

// Ein längerer Aufenthalt darf nie weniger kosten.
let verletzung = null;
for (const k of KATEGORIEN) {
  let vorher = 0;
  for (let n = MINDEST_NAECHTE; n <= 400; n++) {
    const s = berechneZimmer(k.id, n).summe;
    if (s < vorher - 0.001 && !verletzung) verletzung = `${k.id} bei ${n} Nächten: ${s} < ${vorher}`;
    vorher = s;
  }
}
pruefe(!verletzung, verletzung ?? "kein längerer Aufenthalt ist billiger als ein kürzerer");

// Und nie teurer als eine von Hand gebaute Kombination.
let teurer = null;
for (const k of KATEGORIEN) {
  for (let n = MINDEST_NAECHTE; n <= 200; n++) {
    const r = berechneZimmer(k.id, n).summe;
    for (let m = 0; m <= Math.ceil(n / 30); m++) for (let w = 0; w <= Math.ceil(n / 7); w++) {
      const rest = Math.max(0, n - m * 30 - w * 7);
      const vergleich = m * k.monat + w * k.woche + rest * k.nacht;
      if (vergleich < r - 0.001 && !teurer) teurer = `${k.id} bei ${n} Nächten: ${r} statt ${vergleich}`;
    }
  }
}
pruefe(!teurer, teurer ?? "keine Kombination aus Monaten, Wochen und Nächten ist günstiger");

// Alle sechs Kategorien tragen den Flyer-Wert für 30 Nächte.
const monat = { ez: 798, dz1: 858, dz2: 930, zbz: 930, dbz: 1020, vbz: 1170 };
let alle = true;
for (const k of KATEGORIEN) if (Math.abs(berechneZimmer(k.id, 30).summe - monat[k.id]) > 0.005) alle = false;
pruefe(alle, "alle sechs Kategorien treffen den Monatspreis des Flyers");

// 29 Nächte werden als Monat verrechnet, weil das günstiger ist.
const r29 = berechneZimmer("ez", 29);
pruefe(r29.verrechneteNaechte === 30 && Math.abs(r29.summe - 798) < 0.005,
  `29 Nächte werden als Monat zu ${r29.verrechneteNaechte} Nächten verrechnet (${r29.summe.toFixed(2)} €)`);

// Extras: pro Nacht multipliziert, Stückzahlen nicht.
const ex = berechneExtras({ fruehstueck: 1, reinigung: 2 }, 14);
const f = ex.find((e) => e.id === "fruehstueck");
const rg = ex.find((e) => e.id === "reinigung");
pruefe(Math.abs(f.betrag - 14 * 10.8) < 0.005, `Frühstück 1 × 14 Nächte = ${f.betrag.toFixed(2)} €`);
pruefe(Math.abs(rg.betrag - 2 * 16.0) < 0.005, `Zusatzreinigung 2 × Stückpreis = ${rg.betrag.toFixed(2)} €`);
pruefe(berechneExtras({}, 14).length === 0, "ohne Auswahl keine Extras-Posten");
pruefe(EXTRAS.length === 6, "sechs Zusatzleistungen aus dem Flyer");

console.log(fehler ? `\n${fehler} Fehler` : "\nalle Prüfungen bestanden");
process.exit(fehler ? 1 : 0);
