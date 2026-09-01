import { profile } from '../data/content.js';
import { ResumeLink } from './ui.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div>
          <p className="footer__name">{profile.name}</p>
          <p className="footer__role">{profile.title}</p>
        </div>

        <nav className="footer__links" aria-label="Elsewhere">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <ResumeLink compact>Résumé</ResumeLink>
          <a href={profile.team} target="_blank" rel="noopener noreferrer">
            {profile.teamName}
          </a>
        </nav>

        <div className="footer__legal">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>
            {profile.location} · Open to remote opportunities ·{' '}
            {profile.availabilityShort}
          </span>
        </div>
      </div>
    </footer>
  );
}
