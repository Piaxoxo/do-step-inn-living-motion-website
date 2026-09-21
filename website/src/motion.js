import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Lenis übernimmt den Scroll; window.scrollTo allein bewegt dann nichts mehr.
// Der Router braucht deshalb einen Weg, sauber nach oben zu springen.
let aktivesLenis = null;

export function nachObenSpringen() {
  if (aktivesLenis) aktivesLenis.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
}

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isCompact = () =>
  window.matchMedia("(hover: none), (max-width: 768px)").matches;

/**
 * Drive the background film from scroll position.
 *
 * The film is never played. Scroll progress maps linearly onto currentTime, so
 * the reader moves the camera themselves — forwards and backwards, at whatever
 * speed they scroll. Seeks are skipped below a sub-frame delta, otherwise every
 * scroll event queues a seek the decoder cannot keep up with.
 */
function setupVideoScrub(video) {
  let lastVideoT = -1;

  const updateVideo = () => {
    if (!video.duration) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, scrollTop / Math.max(1, maxScroll)));
    const t = progress * (video.duration - 0.05);
    if (Math.abs(t - lastVideoT) > 0.008) {
      video.currentTime = t;
      lastVideoT = t;
    }
  };

  video.pause();
  video.currentTime = 0;

  const trigger = ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: updateVideo,
  });

  video.addEventListener("loadedmetadata", updateVideo);

  return () => {
    video.removeEventListener("loadedmetadata", updateVideo);
    trigger.kill();
  };
}

/**
 * The pinned editorial reveal. Lines resolve out of blur one at a time as the
 * section holds still and the film keeps moving behind it.
 */
function setupStayReveal() {
  // Bound to a data attribute, not an id: section ids are content, and renaming
  // one should not silently switch the pin off.
  const section = document.querySelector("[data-pin-section]");
  if (!section) return () => {};
  const pin = section.querySelector(".stay__pin");
  const words = [...section.querySelectorAll(".stay-word")];
  if (!pin || !words.length) return () => {};

  const render = (p) => {
    words.forEach((word, i) => {
      const start = (i / words.length) * 0.62;
      const o = gsap.utils.clamp(0, 1, (p - start) / 0.14);
      word.style.opacity = 0.12 + o * 0.88;
      word.style.filter = `blur(${(1 - o) * 8}px)`;
      word.style.transform = `translateY(${(1 - o) * 18}px)`;
    });
  };

  render(0);

  const trigger = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => "+=" + window.innerHeight * 1.8,
    pin,
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => render(self.progress),
  });

  return () => {
    trigger.kill();
    words.forEach((w) => {
      w.style.opacity = "";
      w.style.filter = "";
      w.style.transform = "";
    });
  };
}

/**
 * Short fade-and-rise as each block comes into view. Once only, no replay.
 *
 * fromTo, not from, and the cleanup strips the inline styles it wrote. A bare
 * gsap.from() reads the element's current value as its END state, so after a
 * remount — which StrictMode does on every mount in development — it would
 * animate 0 -> 0 and leave the whole page invisible.
 */
function setupSectionEntrances() {
  const items = gsap.utils.toArray("[data-reveal]");
  const tweens = items.map((el) =>
    gsap.fromTo(
      el,
      { opacity: 0, y: 44 },
      {
        opacity: 1,
        y: 0,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      }
    )
  );
  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
    gsap.set(items, { clearProps: "opacity,transform,translate,rotate,scale" });
  };
}

/** Thin progress rule under the nav, and the mono percentage beside it. */
function setupProgressReadout() {
  const bar = document.querySelector("[data-progress-bar]");
  const label = document.querySelector("[data-progress-label]");
  if (!bar) return () => {};

  const trigger = ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      bar.style.transform = `scaleX(${self.progress})`;
      if (label) {
        label.textContent = String(Math.round(self.progress * 100)).padStart(2, "0");
      }
    },
  });
  return () => trigger.kill();
}


/** Eigener Cursor, nur wo es ein echtes Zeigegerät gibt. */
function setupCursor() {
  const el = document.querySelector("[data-cursor]");
  if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};

  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const ziel = { ...pos };
  const setX = gsap.quickSetter(el, "x", "px");
  const setY = gsap.quickSetter(el, "y", "px");

  const onMove = (e) => {
    ziel.x = e.clientX;
    ziel.y = e.clientY;
    el.classList.add("cursor--an");
  };
  const onOut = () => el.classList.remove("cursor--an");
  const onOver = (e) => {
    const gross = e.target.closest("a, button, .produkt, .galerie__bild, input");
    el.classList.toggle("cursor--gross", Boolean(gross));
  };

  const tick = () => {
    pos.x += (ziel.x - pos.x) * 0.18;
    pos.y += (ziel.y - pos.y) * 0.18;
    setX(pos.x);
    setY(pos.y);
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerover", onOver, { passive: true });
  document.addEventListener("pointerleave", onOut);
  gsap.ticker.add(tick);
  document.documentElement.classList.add("hat-cursor");

  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerover", onOver);
    document.removeEventListener("pointerleave", onOut);
    gsap.ticker.remove(tick);
    document.documentElement.classList.remove("hat-cursor");
  };
}

/**
 * Tiefenebenen: Elemente mit data-tiefe wandern unterschiedlich schnell.
 * Das ist die verabredete "3D"-Wirkung — Parallax, kein WebGL, kein Ladegewicht.
 */
function setupTiefe() {
  const teile = gsap.utils.toArray("[data-tiefe]");
  const tweens = teile.map((el) => {
    const tiefe = Number(el.dataset.tiefe) || 1;
    return gsap.fromTo(el,
      { yPercent: 4 * tiefe },
      {
        yPercent: -4 * tiefe,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
  });
  return () => tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
}

/** Die InnSider-Galerie zieht beim Scrollen seitlich durch. */
function setupGalerie() {
  const el = document.querySelector("[data-galerie]");
  if (!el) return () => {};
  const weite = () => el.scrollWidth - el.clientWidth;
  if (weite() <= 0) return () => {};
  const tween = gsap.to(el, {
    scrollLeft: weite,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top 75%",
      end: "bottom top",
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  });
  return () => { tween.scrollTrigger?.kill(); tween.kill(); };
}


/**
 * Karten kippen unter dem Zeiger — echtes CSS-3D mit Perspektive.
 *
 * Kein WebGL: Die Transformation läuft auf dem Compositor, kostet kein
 * zusätzliches Ladegewicht und fällt auf Touch-Geräten einfach weg. Der Zeiger
 * wird über quickSetter geschrieben statt über ein Tween pro Bewegung, sonst
 * stapeln sich bei jeder Mausbewegung neue Animationen.
 */
function setupKippen() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const karten = gsap.utils.toArray("[data-kippen]");
  const aufraeumer = [];

  karten.forEach((el) => {
    const setRX = gsap.quickSetter(el, "rotationX", "deg");
    const setRY = gsap.quickSetter(el, "rotationY", "deg");
    const setZ = gsap.quickSetter(el, "z", "px");
    const staerke = Number(el.dataset.kippen) || 6;

    const bewegen = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setRY(x * staerke * 2);
      setRX(-y * staerke * 2);
      setZ(18);
    };
    const zurueck = () => {
      gsap.to(el, { rotationX: 0, rotationY: 0, z: 0, duration: 0.6, ease: "power3.out" });
    };

    el.addEventListener("pointermove", bewegen);
    el.addEventListener("pointerleave", zurueck);
    aufraeumer.push(() => {
      el.removeEventListener("pointermove", bewegen);
      el.removeEventListener("pointerleave", zurueck);
      gsap.set(el, { clearProps: "transform" });
    });
  });

  return () => aufraeumer.forEach((f) => f());
}

/** Der Hauptknopf zieht den Zeiger leicht an. */
function setupMagnet() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const knoepfe = gsap.utils.toArray("[data-magnet]");
  const aufraeumer = [];

  knoepfe.forEach((el) => {
    const bewegen = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * 0.22, y: y * 0.3, duration: 0.4, ease: "power3.out" });
    };
    const zurueck = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.45)" });
    el.addEventListener("pointermove", bewegen);
    el.addEventListener("pointerleave", zurueck);
    aufraeumer.push(() => {
      el.removeEventListener("pointermove", bewegen);
      el.removeEventListener("pointerleave", zurueck);
      gsap.set(el, { clearProps: "transform" });
    });
  });

  return () => aufraeumer.forEach((f) => f());
}

/**
 * Überschriften schieben sich hinter einer Maske hervor.
 *
 * clip-path statt opacity: Die Zeile ist nie halb sichtbar, sondern wird
 * aufgedeckt — das liest sich gedruckt statt eingeblendet.
 */
function setupMaskenReveal() {
  const ziele = gsap.utils.toArray("[data-maske]");
  const tweens = ziele.map((el) =>
    gsap.fromTo(el,
      { clipPath: "inset(0 0 100% 0)", y: 16 },
      {
        clipPath: "inset(0 0 -10% 0)",
        y: 0,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      })
  );
  return () => {
    tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
    gsap.set(ziele, { clearProps: "clipPath,transform" });
  };
}

/** Die Bildergalerie dreht sich beim Durchscrollen leicht in den Raum. */
function setupGalerieTiefe() {
  const bilder = gsap.utils.toArray("[data-galerie] .galerie__bild");
  if (!bilder.length) return () => {};
  const tweens = bilder.map((el) =>
    gsap.fromTo(el,
      { rotationY: 12, z: -70 },
      {
        rotationY: -12,
        z: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
      })
  );
  return () => {
    tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
    gsap.set(bilder, { clearProps: "transform" });
  };
}

/** Der Hero atmet mit dem Zeiger — sehr leise, sonst wird es kirmesartig. */
function setupHeroTiefe() {
  const hero = document.querySelector(".hero");
  if (!hero || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const schichten = gsap.utils.toArray(".hero > *");
  const setter = schichten.map((el, i) => ({
    x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
    y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
    tiefe: (i + 1) * 1.6,
  }));

  const bewegen = (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    setter.forEach((s) => { s.x(x * s.tiefe); s.y(y * s.tiefe * 0.5); });
  };
  window.addEventListener("pointermove", bewegen, { passive: true });
  return () => {
    window.removeEventListener("pointermove", bewegen);
    gsap.set(schichten, { clearProps: "transform" });
  };
}

/**
 * Wire everything up. Returns a teardown so React can unmount cleanly — which
 * StrictMode exercises on every mount in development.
 */
export function initMotion({ video, film = true } = {}) {
  const cleanups = [];
  const reduced = prefersReducedMotion();
  const compact = isCompact();

  if (!reduced) {
    const lenis = new Lenis({ duration: 1.12, smoothWheel: true, wheelMultiplier: 0.9 });
    aktivesLenis = lenis;
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    cleanups.push(() => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      if (aktivesLenis === lenis) aktivesLenis = null;
      if (import.meta.env.DEV) delete window.__lenis;
    });

    if (import.meta.env.DEV) window.__lenis = lenis;
  }

  // The film only runs where it earns its cost: not on touch, not under
  // reduced-motion. Both fall back to the hero poster.
  if (video && film && !reduced && !compact) {
    cleanups.push(setupVideoScrub(video));
    if (import.meta.env.DEV) {
      window.__bgv = video;
      cleanups.push(() => delete window.__bgv);
    }
  }

  if (!reduced && !compact) cleanups.push(setupStayReveal());
  if (!reduced) {
    cleanups.push(setupSectionEntrances());
    cleanups.push(setupTiefe());
    cleanups.push(setupGalerie());
    cleanups.push(setupGalerieTiefe());
    cleanups.push(setupCursor());
    cleanups.push(setupKippen());
    cleanups.push(setupMagnet());
    cleanups.push(setupMaskenReveal());
    cleanups.push(setupHeroTiefe());
  }
  cleanups.push(setupProgressReadout());

  if (import.meta.env.DEV) {
    window.__ST = ScrollTrigger;
    cleanups.push(() => delete window.__ST);
  }

  ScrollTrigger.refresh();

  return () => cleanups.forEach((fn) => fn());
}
