/**
 * Interner Link. Mit echtem href, damit Mittelklick, Strg-Klick und
 * „Link kopieren" funktionieren — abgefangen wird nur der normale Klick.
 */
export function Link({ to, gehe, children, ...rest }) {
  return (
    <a
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        gehe(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
