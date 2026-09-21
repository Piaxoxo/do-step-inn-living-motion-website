import { useEffect, useState } from "react";
import { nachObenSpringen } from "./motion.js";

export const ROUTEN = ["/", "/impressum", "/datenschutz", "/agb"];

const normalisiere = (pfad) => {
  const p = pfad.replace(/\/+$/, "") || "/";
  return ROUTEN.includes(p) ? p : "/";
};

/**
 * Winziger Router über die History API — kein Paket, vier Seiten.
 *
 * Vercel liefert für alle Pfade index.html aus (siehe vercel.json), damit ein
 * direkt aufgerufenes /impressum nicht auf einem 404 landet.
 */
export function useRoute() {
  const [pfad, setPfad] = useState(() => normalisiere(window.location.pathname));

  useEffect(() => {
    const beiPop = () => setPfad(normalisiere(window.location.pathname));
    window.addEventListener("popstate", beiPop);
    return () => window.removeEventListener("popstate", beiPop);
  }, []);

  const gehe = (ziel) => {
    const p = normalisiere(ziel);
    if (p !== window.location.pathname) window.history.pushState({}, "", p);
    setPfad(p);
    nachObenSpringen();
  };

  return [pfad, gehe];
}
