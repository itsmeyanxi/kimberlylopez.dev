import { useEffect, useRef, useState } from 'react';
import { isTodo, profile, todoText } from '../data/content.js';

/* --------------------------------------------------------------------------
   Icons — inline SVG so the page makes no extra requests and the icons
   inherit colour from their surroundings.
   -------------------------------------------------------------------------- */

const svg = (props) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
  ...props,
});

export const ArrowRight = ({ size = 15 }) => (
  <svg {...svg({ width: size, height: size })}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = ({ size = 15 }) => (
  <svg {...svg({ width: size, height: size })}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export const ArrowUpRight = ({ size = 14 }) => (
  <svg {...svg({ width: size, height: size })}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Download = ({ size = 15 }) => (
  <svg {...svg({ width: size, height: size })}>
    <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />
  </svg>
);

export const Mail = ({ size = 15 }) => (
  <svg {...svg({ width: size, height: size })}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const Sun = ({ size = 17 }) => (
  <svg {...svg({ width: size, height: size })}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const Moon = ({ size = 17 }) => (
  <svg {...svg({ width: size, height: size })}>
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
  </svg>
);

export const Menu = ({ size = 18 }) => (
  <svg {...svg({ width: size, height: size })}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = ({ size = 18 }) => (
  <svg {...svg({ width: size, height: size })}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

/* --------------------------------------------------------------------------
   Placeholder — renders any copy that still needs Kimberly's input as a
   visible amber chip rather than letting an unverified claim look finished.
   -------------------------------------------------------------------------- */

export function Copy({ value, as: Tag = 'span', className }) {
  if (isTodo(value)) {
    return <Tag className={['todo', className].filter(Boolean).join(' ')}>{todoText(value)}</Tag>;
  }
  return <Tag className={className}>{value}</Tag>;
}

/**
 * Every résumé link on the site goes through here. While no PDF has been
 * supplied the link would 404, so it renders as a visible placeholder instead
 * of a download that silently fails. Set profile.resumeReady to true once the
 * file is in public/ and all of them turn on together.
 */
export function ResumeLink({ className, children, compact = false, ...rest }) {
  if (!profile.resumeReady) {
    // In a tight row (header, footer) the full chip is far too wide, so the
    // placeholder shrinks to a badge and explains itself on hover/focus.
    if (compact) {
      return (
        <span
          className="todo todo--inline"
          role="note"
          title="No résumé PDF yet — add public/Kimberly-Lopez-Resume.pdf and set profile.resumeReady = true."
        >
          Résumé
        </span>
      );
    }
    return (
      <span className="todo" role="note">
        résumé PDF not added yet
      </span>
    );
  }
  return (
    <a className={className} href={profile.resume} download {...rest}>
      {children}
    </a>
  );
}

/* --------------------------------------------------------------------------
   Reveal — a light entrance animation. Elements are visible by default and
   only hidden once the observer is known to be running, so the content is
   never trapped invisible if IntersectionObserver is unavailable.
   -------------------------------------------------------------------------- */

export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('[data-reveal]');

    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-shown', 'true'));
      return undefined;
    }

    targets.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-shown', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* --------------------------------------------------------------------------
   Theme
   -------------------------------------------------------------------------- */

export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'light'
  );

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* Private mode — the choice just will not persist. */
    }
  };

  return { theme, toggle };
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}

/* --------------------------------------------------------------------------
   Section scaffolding
   -------------------------------------------------------------------------- */

export function Section({ id, index, title, lead, children, className = '', headId }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="shell">
        {(title || lead) && (
          <header className="section-head" data-reveal>
            {index && <p className="eyebrow">{index}</p>}
            {title && (
              <h2 className="section-title" id={headId}>
                {title}
              </h2>
            )}
            {lead && <p className="section-lead">{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Active-section tracking for the desktop nav.
   -------------------------------------------------------------------------- */

export function useActiveSection(ids) {
  const [active, setActive] = useState('');
  const ref = useRef(ids);
  ref.current = ids;

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    );

    ref.current.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}
