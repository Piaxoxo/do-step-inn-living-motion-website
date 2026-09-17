/**
 * Prüft die Preisstaffel des Rechners.
 *
 * Geld darf nicht raten: Diese Beträge stehen auf der Website und in jeder
 * Angebotsmail, die jemand abschickt. Ausführen aus website/:
 *
 *   node ../scripts/test-preis.mjs
 */
import { berechneAufenthalt, moeglichePersonen } from "../website/src/lib/preis.js";
import { TARIFE, MINDEST_NAECHTE } from "../website/src/data/content.js";

let fehler = 0;
const pruefe = (ok, text) => { console.log(`${ok ? "PASS" : "FAIL"}  ${text}`); if (!ok) fehler++; };

// Standard, 1 Person: Tag 37 / Woche 175 / Monat 528.
// Die Erwartungen sind die günstigste Deckung, nicht die naheliegendste:
// 13 Nächte werden als zwei Wochen abgerechnet (350 €), weil eine Woche plus
// sechs Tage 397 € kosten würde; 49 Nächte als Monat plus drei Wochen (1.053 €)
// statt als zwei Monate (1.056 €).
for (const [n, erw] of [[7,175],[8,212],[13,350],[14,350],[20,525],[21,525],[29,528],[30,528],[37,703],[49,1053],[60,1056],[67,1231]]) {
  const r = berechneAufenthalt("standard", 1, n);
  pruefe(r.gueltig && Math.abs(r.summe - erw) < 0.005,
    `Standard 1 Pers · ${String(n).padStart(2)} Nächte = ${r.summe.toFixed(2)} € (erwartet ${erw.toFixed(2)})`);
}

// Unter sieben Nächten gibt es keinen Preis, sondern einen Hinweis.
for (const n of [1, 3, 6]) {
  const r = berechneAufenthalt("standard", 1, n);
  pruefe(!r.gueltig && r.grund === "zu-kurz", `${n} Nächte werden als zu kurz abgewiesen (Minimum ${MINDEST_NAECHTE})`);
}

// Ein längerer Aufenthalt darf nie weniger kosten — sonst rechnet der Rechner
// Gästen mehr an, als ihr eigener Tarif hergibt.
let verletzung = null;
for (const t of Object.keys(TARIFE)) for (const p of moeglichePersonen(t)) {
  let vorher = 0;
  for (let n = MINDEST_NAECHTE; n <= 400; n++) {
    const s = berechneAufenthalt(t, p, n).summe;
    if (s < vorher - 0.001 && !verletzung) verletzung = `${t}/${p}P bei ${n} Nächten: ${s} < ${vorher}`;
    vorher = s;
  }
}
pruefe(!verletzung, verletzung ?? "kein längerer Aufenthalt ist billiger als ein kürzerer");

// Und nie teurer, als man es von Hand zusammenstellen könnte.
let teurer = null;
for (const t of Object.keys(TARIFE)) for (const p of moeglichePersonen(t)) {
  const s = TARIFE[t].staffel.find((x) => x.personen === p);
  for (let n = MINDEST_NAECHTE; n <= 200; n++) {
    const r = berechneAufenthalt(t, p, n).summe;
    for (let m = 0; m <= Math.ceil(n / 30); m++) for (let w = 0; w <= Math.ceil(n / 7); w++) {
      const rest = Math.max(0, n - m * 30 - w * 7);
      const vergleich = m * s.monat + w * s.woche + rest * s.tag;
      if (vergleich < r - 0.001 && !teurer) teurer = `${t}/${p}P bei ${n} Nächten: ${r} statt ${vergleich}`;
    }
  }
}
pruefe(!teurer, teurer ?? "keine Kombination aus Monaten, Wochen und Tagen ist günstiger");

// Jede Kombination aus Tarif und Personenzahl rechnet.
let alle = true;
for (const t of Object.keys(TARIFE)) for (const p of moeglichePersonen(t)) {
  const r = berechneAufenthalt(t, p, 30);
  if (!r.gueltig || !(r.summe > 0)) alle = false;
}
pruefe(alle, "alle Tarif- und Personenkombinationen liefern gültige Summen");

// Statt eines Hinweises rechnet der Rechner gleich die günstigere Einheit ab:
// 29 Nächte kosten den Monatspreis und decken 30 Nächte.
const r29 = berechneAufenthalt("standard", 1, 29);
pruefe(r29.verrechneteNaechte === 30 && Math.abs(r29.summe - 528) < 0.005,
  `29 Nächte werden als Monat zu ${r29.verrechneteNaechte} Nächten verrechnet (${r29.summe.toFixed(2)} €)`);

// Unbekannte Kombination fällt sauber durch.
pruefe(berechneAufenthalt("mini", 3, 30).gueltig === false, "Mini-Apartment für 3 Personen gibt es nicht");

console.log(fehler ? `\n${fehler} Fehler` : "\nalle Prüfungen bestanden");
process.exit(fehler ? 1 : 0);
