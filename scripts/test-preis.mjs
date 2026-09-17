/**
 * Prüft die Preisstaffel des Rechners.
 *
 * Geld darf nicht raten: Diese Beträge stehen auf der Website und in jeder
 * Angebotsmail, die ein Gast abschickt. Ausführen aus website/:
 *
 *   node ../scripts/test-preis.mjs
 */
import { berechneZimmer, besserePreisstufe } from "../website/src/lib/preis.js";
import { KATEGORIEN } from "../website/src/data/content.js";

const ez = KATEGORIEN[0];
let fehler = 0;
const pruefe = (ok, text) => { console.log(`${ok ? "PASS" : "FAIL"}  ${text}`); if (!ok) fehler++; };

for (const [n, erw] of [[1,48],[3,144],[6,288],[7,287],[10,431],[14,574],[30,798],[35,1038],[37,1085],[60,1596],[90,2394]]) {
  const s = berechneZimmer(ez, n).summe;
  pruefe(Math.abs(s - erw) < 0.005, `${String(n).padStart(3)} Nächte = ${s.toFixed(2)} €`);
}

let deckel = true;
for (let n = 1; n <= 365; n++) if (berechneZimmer(ez, n).summe > n * ez.nacht + 0.001) deckel = false;
pruefe(deckel, "nie teurer als der reine Nachtpreis");

let alle = true;
for (const k of KATEGORIEN) for (const n of [1, 7, 30, 45, 120]) {
  const r = berechneZimmer(k, n);
  if (!(r.summe > 0) || r.teile.length === 0) alle = false;
}
pruefe(alle, "alle sechs Kategorien liefern gültige Summen");

const tip6 = besserePreisstufe(ez, 6);
pruefe(tip6 && tip6.naechte === 7 && Math.abs(tip6.ersparnis - 1) < 0.005,
  `Tarifsprung erkannt: 6 → 7 Nächte, ${tip6 ? tip6.ersparnis.toFixed(2) : "?"} € günstiger`);
pruefe(besserePreisstufe(ez, 7) === null, "bei 7 Nächten kein überflüssiger Hinweis");
const tip29 = besserePreisstufe(ez, 29);
pruefe(tip29 && tip29.naechte === 30,
  `Tarifsprung erkannt: 29 → 30 Nächte, ${tip29 ? tip29.ersparnis.toFixed(2) : "?"} € günstiger`);

pruefe(berechneZimmer(ez, 0).summe === 0, "null Nächte = 0 €");
pruefe(berechneZimmer(null, 10).summe === 0, "ohne Kategorie = 0 €");

console.log(fehler ? `\n${fehler} Fehler` : "\nalle Prüfungen bestanden");
process.exit(fehler ? 1 : 0);
