import { useEffect, useState } from 'react';
import { profile, visibleNavLinks } from '../data/content.js';
import { Close, Menu, ResumeLink, ThemeToggle, useActiveSection } from './ui.jsx';

/**
 * `home` is true on the landing page, where the nav scrolls to sections.
 * On a case-study page the same links point back at the landing page, so the
 * header is identical everywhere and nothing dead-ends.
 */
export default function Header({ home = false }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const active = useActiveSection(home ? visibleNavLinks.map((l) => l.href.slice(1)) : []);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu when the viewport grows past the breakpoint,
  // otherwise it stays mounted and invisible with its links still tabbable.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1001px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const href = (h) => (home ? h : `/${h}`);

  return (
    <header className="header" data-stuck={stuck}>
      <div className="shell header__inner">
        <a className="brand" href={home ? '#top' : '/'}>
          {profile.name}
          <span>{profile.title}</span>
        </a>

        <nav className="nav" aria-label="Sections">
          {visibleNavLinks.map((link) => (
            <a
              key={link.href}
              href={href(link.href)}
              aria-current={
                home && active === link.href.slice(1) ? 'true' : undefined
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__divider" aria-hidden="true" />

        <div className="header__actions">
          <ThemeToggle />
          <span className="header__resume">
            <ResumeLink className="btn btn--secondary btn--sm">Resume</ResumeLink>
          </span>
          <a className="btn btn--primary btn--sm" href={href('#contact')}>
            Let’s Talk
          </a>
          <button
            type="button"
            className="icon-btn nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div className="mobile-nav" id="mobile-nav" data-open={open}>
        <div className="shell">
          <ul>
            {visibleNavLinks.map((link) => (
              <li key={link.href}>
                <a href={href(link.href)} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-nav__actions">
            <ResumeLink className="btn btn--secondary">Download Resume</ResumeLink>
            <a
              className="btn btn--primary"
              href={href('#contact')}
              onClick={() => setOpen(false)}
            >
              Let’s Talk
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
