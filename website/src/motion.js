import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

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
  const section = document.querySelector("#stay");
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
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
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

/**
 * Wire everything up. Returns a teardown so React can unmount cleanly — which
 * StrictMode exercises on every mount in development.
 */
export function initMotion({ video } = {}) {
  const cleanups = [];
  const reduced = prefersReducedMotion();
  const compact = isCompact();

  if (!reduced) {
    const lenis = new Lenis({ duration: 1.12, smoothWheel: true, wheelMultiplier: 0.9 });
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
      if (import.meta.env.DEV) delete window.__lenis;
    });

    if (import.meta.env.DEV) window.__lenis = lenis;
  }

  // The film only runs where it earns its cost: not on touch, not under
  // reduced-motion. Both fall back to the hero poster.
  if (video && !reduced && !compact) {
    cleanups.push(setupVideoScrub(video));
    if (import.meta.env.DEV) {
      window.__bgv = video;
      cleanups.push(() => delete window.__bgv);
    }
  }

  if (!reduced && !compact) cleanups.push(setupStayReveal());
  if (!reduced) cleanups.push(setupSectionEntrances());
  cleanups.push(setupProgressReadout());

  if (import.meta.env.DEV) {
    window.__ST = ScrollTrigger;
    cleanups.push(() => delete window.__ST);
  }

  ScrollTrigger.refresh();

  return () => cleanups.forEach((fn) => fn());
}
