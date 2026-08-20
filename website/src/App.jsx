import { useEffect, useRef } from "react";
import { initMotion } from "./motion.js";
import { stays, staysVerified, BOOKING_URL } from "./data/stays.js";

const NAV = [
  ["Stay", "#stay"],
  ["Living", "#living"],
  ["Rooms", "#rooms"],
  ["Nights", "#social"],
  ["Vienna", "#vienna"],
];

/**
 * Booking call to action.
 *
 * The booking engine URL has not been supplied, so this deliberately renders as
 * a disabled control rather than pointing somewhere invented. Set BOOKING_URL
 * in src/data/stays.js and it becomes a real link.
 */
function BookCta({ variant = "primary", children }) {
  const className = `btn btn--${variant}`;
  if (!BOOKING_URL) {
    return (
      <button type="button" className={className} disabled title="Booking link not configured">
        {children}
      </button>
    );
  }
  return (
    <a className={className} href={BOOKING_URL} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Placeholder({ children }) {
  return <span className="todo">{children}</span>;
}

export default function App() {
  const videoRef = useRef(null);

  useEffect(() => initMotion({ video: videoRef.current }), []);

  return (
    <>
      <video
        ref={videoRef}
        id="bgv"
        className="bg-video"
        poster="/img/hero-room.jpg"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        {/* VP9 first — smaller and seeks well; H.264 covers Safari. Both are
            encoded all-keyframe so scrubbing lands on an exact frame. */}
        <source src="/bg.webm" type="video/webm" />
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="mobile-poster" aria-hidden="true" />
      <div className="bg-tint" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="nav">
        <a className="nav__logo" href="#home">
          Do Step Inn <em>Living</em>
        </a>
        <nav className="nav__links" aria-label="Sections">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav__end">
          <span className="nav__progress" aria-hidden="true">
            <span data-progress-label>00</span>
          </span>
          <BookCta variant="primary">Book your stay</BookCta>
        </div>
        <span className="nav__rule" aria-hidden="true">
          <span data-progress-bar />
        </span>
      </header>

      <main className="page">
        <section id="home" className="hero">
          <p className="eyebrow" data-reveal>
            Hotel Do Step Inn Living
          </p>
          <h1 className="hero__title" data-reveal>
            Stay somewhere
            <br />
            that feels alive.
          </h1>
          <p className="hero__lede" data-reveal>
            A modern city stay — sleep well, meet people, step straight out.
          </p>
          <div className="hero__actions" data-reveal>
            <BookCta variant="primary">Book your stay</BookCta>
            <a className="btn btn--ghost" href="#rooms">
              Explore rooms
            </a>
          </div>
          <p className="hero__cue" aria-hidden="true">
            scroll to arrive
          </p>
        </section>

        <section id="stay" className="stay">
          <div className="stay__pin">
            <p className="label">01 — The room</p>
            <p className="stay__lines">
              <span className="stay-word">Sleep well.</span>{" "}
              <span className="stay-word">Step out.</span>{" "}
              <span className="stay-word">Your base</span>{" "}
              <span className="stay-word">for the city.</span>
            </p>
          </div>
        </section>

        <section id="living" className="living">
          <div className="living__head" data-reveal>
            <p className="label">02 — Living</p>
            <h2>Where the stay opens up.</h2>
            <p className="lede">
              Shared rooms to sit in, cook in, work in, or wait out the afternoon with
              someone you met an hour ago.
            </p>
          </div>
          <div className="living__grid">
            <figure className="crop crop--tall" data-reveal>
              <img src="/img/lobby-living-reference.jpg" alt="Placeholder image — shared lounge" />
              <figcaption>Shared lounge</figcaption>
            </figure>
            <figure className="crop" data-reveal>
              <img src="/img/common-space.jpg" alt="Placeholder image — communal kitchen and long table" />
              <figcaption>Kitchen &amp; long table</figcaption>
            </figure>
            <div className="panel living__note" data-reveal>
              <p className="label">Facilities</p>
              <p>
                <Placeholder>TO VERIFY: shared-space facilities</Placeholder>
              </p>
              <p className="muted">
                Nothing is listed here until the property confirms it.
              </p>
            </div>
          </div>
        </section>

        <section id="rooms" className="rooms">
          <div className="rooms__head" data-reveal>
            <p className="label">03 — Rooms</p>
            <h2>Where you&rsquo;ll sleep.</h2>
          </div>
          {!staysVerified && (
            <p className="notice" data-reveal>
              Room categories, capacities and amenities are placeholders. They are filled in
              from verified property data, never invented.
            </p>
          )}
          <div className="rooms-grid">
            {stays.map((stay) => (
              <article className="stay-card panel" key={stay.id} data-reveal>
                <div className="stay-card__media">
                  <img src={stay.image} alt={stay.alt} loading="lazy" />
                </div>
                <div className="stay-card__body">
                  <h3>
                    <Placeholder>{stay.name}</Placeholder>
                  </h3>
                  <p className="muted">
                    <Placeholder>{stay.desc}</Placeholder>
                  </p>
                  <ul className="chips">
                    <li>
                      <Placeholder>{stay.capacity}</Placeholder>
                    </li>
                    {stay.features.map((f, i) => (
                      <li key={i}>
                        <Placeholder>{f}</Placeholder>
                      </li>
                    ))}
                  </ul>
                  <BookCta variant="ghost">Check dates</BookCta>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="social" className="social">
          <figure className="crop crop--wide" data-reveal>
            <img src="/img/social-night-reference.jpg" alt="Placeholder image — evening social atmosphere" />
          </figure>
          <div className="social__body" data-reveal>
            <p className="label">04 — Nights</p>
            <h2>Check in. Go out.</h2>
            <p className="lede">
              From first coffee to last drink, the evening starts downstairs and ends
              somewhere you had not planned.
            </p>
          </div>
        </section>

        <section id="vienna" className="vienna">
          <div className="vienna__body" data-reveal>
            <p className="label">05 — The city</p>
            <h2>The city starts at the door.</h2>
            <p className="lede">
              <Placeholder>
                TO VERIFY: location, transport links, walking times, named landmarks
              </Placeholder>
            </p>
            <p className="muted">
              This section runs on mood alone until the property supplies verified
              location facts. No distances, no place names, no claims.
            </p>
          </div>
          <figure className="crop crop--wide" data-reveal>
            <img src="/img/city-lifestyle.jpg" alt="Placeholder image — city street at blue hour" />
          </figure>
        </section>

        <section id="cta" className="cta">
          <h2 data-reveal>Ready when you are.</h2>
          <p className="lede" data-reveal>
            Pick your dates. The rest is easy.
          </p>
          <div className="hero__actions" data-reveal>
            <BookCta variant="primary">Book your stay</BookCta>
            <a className="btn btn--ghost" href="#rooms">
              See rooms
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer__mark">
          Do Step Inn <em>Living</em>
        </p>
        <div className="footer__cols">
          <div>
            <p className="label">Find us</p>
            <p>
              <Placeholder>TO VERIFY: address</Placeholder>
            </p>
          </div>
          <div>
            <p className="label">Contact</p>
            <p>
              <Placeholder>TO VERIFY: phone</Placeholder>
              <br />
              <Placeholder>TO VERIFY: email</Placeholder>
            </p>
          </div>
          <div>
            <p className="label">Legal</p>
            <p>
              <Placeholder>TO VERIFY: imprint, privacy, terms</Placeholder>
            </p>
          </div>
        </div>
        <p className="footer__note">
          Placeholder build. Imagery is procedurally generated, not photography, and
          every bracketed field is unverified property data.
        </p>
      </footer>
    </>
  );
}
