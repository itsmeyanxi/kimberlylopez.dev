import {
  about,
  contact,
  education,
  experience,
  forBusinesses,
  howIWork,
  profile,
  projects,
  skills,
} from '../data/content.js';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import {
  ArrowRight,
  ArrowUpRight,
  Copy,
  Download,
  Mail,
  ResumeLink,
  Section,
  useReveal,
} from './ui.jsx';

/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell">
        <div className="hero__topline" data-reveal>
          <p className="hero__name">{profile.name}</p>
          <p className="availability">
            <span className="availability__dot" aria-hidden="true" />
            {profile.availability}
          </p>
        </div>
        <h1 className="hero__headline" data-reveal>
          Software Developer building systems that solve{' '}
          <em>real business problems.</em>
        </h1>
        <p className="hero__intro" data-reveal>
          {profile.intro}
        </p>

        <div className="hero__actions" data-reveal>
          <a className="btn btn--primary" href="#work">
            View My Work
            <ArrowRight />
          </a>
          <ResumeLink className="btn btn--secondary">
            <Download />
            Download Résumé
          </ResumeLink>
          <a className="btn btn--ghost" href="#for-businesses">
            Let’s Work Together
          </a>
        </div>

        <ul className="hero__facts" data-reveal>
          {profile.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Project({ project, index }) {
  const { links, team, solo } = project;
  const extraTech = project.tech.length - 3;

  return (
    <article className="card" data-reveal>
      <div className="card__top">
        <span className="card__index">{String(index + 1).padStart(2, '0')}</span>
        <span
          className={`badge ${
            project.status === 'Live' || project.status === 'In production'
              ? 'badge--live'
              : ''
          }`}
        >
          {project.status}
        </span>
      </div>

      <div>
        <h3 className="card__name">
          {/* The whole card is the case-study link; the ::after on this anchor
              covers it, and the footer links sit above it on the z-axis. */}
          <a className="card__link" href={`/work/${project.slug}/`}>
            {project.name}
            <ArrowRight />
          </a>
        </h3>
        <p className="card__category">{project.category}</p>
      </div>

      <p className="card__summary">{project.cardSummary}</p>

      <div className="card__role">
        <p className="card__role-label">My role</p>
        <p>{project.cardRole}</p>
      </div>

      <ul className="chips card__tech">
        {project.tech.slice(0, 3).map((t) => (
          <li className="chip" key={t}>
            {t}
          </li>
        ))}
        {extraTech > 0 && <li className="chip chip--more">+{extraTech}</li>}
      </ul>

      <div className="card__foot">
        <span className="card__credit">{team ? team.built : solo}</span>
        <div className="card__links">
          {links.live && (
            <a
              className="link-arrow"
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live
              <ArrowUpRight />
            </a>
          )}
          {links.source && (
            <a
              className="link-arrow"
              href={links.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <ArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function SelectedWork() {
  return (
    <Section
      id="work"
      index="01 — Selected Work"
      title="Selected Work"
      lead="Production systems and applications I have helped design, develop, and improve. Each card opens a full case study with the problem, the build and exactly what was mine."
    >
      <div className="work-grid">
        {projects.map((project, i) => (
          <Project key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Experience() {
  return (
    <Section
      id="experience"
      index="02 — Experience"
      title="Experience"
      lead="Where I have worked and what I was responsible for."
    >
      <div className="timeline">
        {experience.map((role) => (
          <article className="role" key={`${role.company}-${role.role}`} data-reveal>
            <div className="role__meta">
              <Copy value={role.dates} as="p" className="role__dates" />
              <Copy value={role.location} as="p" className="role__location" />
            </div>

            <div>
              <h3 className="role__company">
                {role.current && <span className="dot" aria-hidden="true" />}
                <Copy value={role.company} />
              </h3>
              <Copy value={role.role} as="p" className="role__title" />

              <ul className="bullets">
                {role.bullets.map((b) => (
                  <li key={b}>
                    <Copy value={b} />
                  </li>
                ))}
              </ul>

              {role.tech.length > 0 && (
                <ul className="chips role__tech">
                  {role.tech.map((t) => (
                    <li className="chip" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}

        {education.items.map((item) => (
          <article className="role" key={item.school} data-reveal>
            <div className="role__meta">
              <Copy value={item.dates} as="p" className="role__dates" />
              <p className="role__location">{education.heading}</p>
            </div>
            <div>
              <h3 className="role__company">
                <Copy value={item.school} />
              </h3>
              <Copy value={item.credential} as="p" className="role__title" />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function About() {
  return (
    <Section id="about" index="03 — About" title="About Me">
      <div className="about">
        <div data-reveal>
          <p className="about__lead">{about.lead}</p>
          <div className="about__body">
            {about.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>

        <aside className="about__aside" data-reveal>
          <h3>{about.aside.heading}</h3>
          <p>{about.aside.text}</p>
          <div className="about__links">
            <a
              className="link-arrow"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <ArrowUpRight />
            </a>
            <a
              className="link-arrow"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <ArrowUpRight />
            </a>
          </div>
        </aside>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Skills() {
  return (
    <Section
      id="skills"
      index="04 — Skills"
      title="Technical Skills"
      lead="Technologies I use in production work and personal projects, and can talk through in an interview."
    >
      <div className="skills" data-reveal>
        {skills.map((group) => (
          <div className="skill-group" key={group.group}>
            <h3>{group.group}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function ForBusinesses() {
  return (
    <Section
      id="for-businesses"
      index="05 — For Businesses"
      title={forBusinesses.heading}
      lead={forBusinesses.lead}
      className="business"
    >
      <div className="capabilities">
        {forBusinesses.capabilities.map((cap) => (
          <article className="capability" key={cap.title} data-reveal>
            <h3>{cap.title}</h3>
            <p>{cap.text}</p>
          </article>
        ))}
      </div>

      <div className="business__footer" data-reveal>
        <p className="business__note">{forBusinesses.teamNote}</p>
        <div className="business__actions">
          <a
            className="btn btn--primary"
            href={`mailto:${profile.email}?subject=Project%20enquiry`}
          >
            Work With Me
            <ArrowRight />
          </a>
          <a
            className="btn btn--secondary"
            href={profile.team}
            target="_blank"
            rel="noopener noreferrer"
          >
            Meet {profile.teamName}
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function HowIWork() {
  return (
    <Section
      id="how-i-work"
      index="06 — Process"
      title={howIWork.heading}
      lead={howIWork.lead}
    >
      <div className="process" data-reveal>
        {howIWork.steps.map((step, i) => (
          <div className="step" key={step.name}>
            <p className="step__num">{String(i + 1).padStart(2, '0')}</p>
            <h3>{step.name}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Contact() {
  const channels = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'LinkedIn', value: 'lopezkcc714', href: profile.linkedin, external: true },
    { label: 'GitHub', value: 'itsmeyanxi', href: profile.github, external: true },
    { label: 'Team', value: profile.teamName, href: profile.team, external: true },
  ];

  return (
    <Section id="contact" index="07 — Contact">
      <div className="contact">
        <div data-reveal>
          <h2 className="contact__heading">{contact.heading}</h2>
          <p className="contact__lead">{contact.lead}</p>
          <div className="contact__cta">
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>
              <Mail />
              Send Me an Email
            </a>
          </div>
        </div>

        <div className="tracks" data-reveal>
          {contact.tracks.map((track) => (
            <article className="track" key={track.label}>
              <p className="track__label">{track.label}</p>
              <p>{track.text}</p>
              {track.cta === 'View Résumé' ? (
                <ResumeLink className="link-arrow">
                  {track.cta}
                  <ArrowRight />
                </ResumeLink>
              ) : (
                <a
                  className="link-arrow"
                  href={`mailto:${profile.email}?subject=Project%20enquiry`}
                >
                  {track.cta}
                  <ArrowRight />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="channels" data-reveal>
        {!profile.resumeReady && (
          <div className="channel">
            <span className="channel__label">Résumé</span>
            <span className="channel__value">
              <ResumeLink />
            </span>
          </div>
        )}
        {channels.map((c) => (
          <a
            className="channel"
            key={c.label}
            href={c.href}
            {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...(c.download ? { download: true } : {})}
          >
            <span className="channel__label">{c.label}</span>
            <span className="channel__value">
              {c.value}
              {c.external && <ArrowUpRight size={12} />}
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

export default function Home() {
  useReveal();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header home />
      <main id="main">
        <Hero />
        <SelectedWork />
        <Experience />
        <About />
        <Skills />
        <ForBusinesses />
        <HowIWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
