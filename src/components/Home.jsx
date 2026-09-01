import {
  about,
  certifications,
  contact,
  education,
  experience,
  howIWork,
  personalProjects,
  professionalProjects,
  profile,
  skills,
} from '../data/content.js';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import {
  ArrowRight,
  ArrowUpRight,
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
        <p className="hero__name" data-reveal>
          {profile.name}
        </p>

        <h1 className="hero__headline" data-reveal>
          <span className="hero__greeting">{profile.greeting}</span>{' '}
          {profile.headline}
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
            Download Resume
          </ResumeLink>
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

/** The two work systems. These get the most room on the page. */
function ProfessionalProject({ project }) {
  return (
    <article className="work" data-reveal>
      <div className="work__head">
        <div>
          <h3 className="work__name">
            {project.name}
            {project.subtitle && (
              <span className="work__subtitle">{project.subtitle}</span>
            )}
          </h3>
          <p className="work__category">{project.category}</p>
        </div>
        <dl className="work__meta">
          <div>
            <dt>Organisation</dt>
            <dd>{project.org}</dd>
          </div>
          <div>
            <dt>Period</dt>
            <dd>{project.period}</dd>
          </div>
        </dl>
      </div>

      <p className="work__what">{project.what}</p>

      {project.workflow && (
        <div className="flow" aria-label="Workflow the system covers">
          {project.workflow.map((step, i) => (
            <span className="flow__step" key={step}>
              <span className="flow__num">{String(i + 1).padStart(2, '0')}</span>
              {step}
            </span>
          ))}
        </div>
      )}

      <div className="work__role">
        <p className="work__role-label">My role</p>
        <p className="work__credit">{project.credit}</p>
        <p>{project.cardRole}</p>
      </div>

      <div className="work__foot">
        <ul className="chips">
          {project.tech.slice(0, 5).map((t) => (
            <li className="chip" key={t}>
              {t}
            </li>
          ))}
          {project.tech.length > 5 && (
            <li className="chip chip--more">+{project.tech.length - 5}</li>
          )}
        </ul>
        {project.caseStudy && (
          <a className="link-arrow" href={`/work/${project.slug}/`}>
            Read the case study
            <ArrowRight />
          </a>
        )}
      </div>
    </article>
  );
}

/** Personal work, deliberately given less room. */
function PersonalProject({ project }) {
  const { links } = project;

  return (
    <article className="side-card" data-reveal>
      <div>
        <h3 className="side-card__name">{project.name}</h3>
        <p className="side-card__category">{project.category}</p>
      </div>
      <p className="side-card__summary">{project.cardSummary}</p>
      <p className="side-card__role">{project.cardRole}</p>
      <div className="side-card__foot">
        <ul className="chips">
          {project.tech.map((t) => (
            <li className="chip" key={t}>
              {t}
            </li>
          ))}
        </ul>
        {(links.live || links.source) && (
          <div className="side-card__links">
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
        )}
      </div>
    </article>
  );
}

function Work() {
  return (
    <Section
      id="work"
      index="01 — Work"
      title="Professional Work"
      lead="Internal systems I help develop at Meatplus Trading Corp. Both were built with another developer, so what I worked on is listed separately from what the system does."
    >
      <div className="work-list">
        {professionalProjects.map((project) => (
          <ProfessionalProject key={project.slug} project={project} />
        ))}
      </div>

      <div className="subsection" data-reveal>
        <h3 className="subsection__title">Personal Projects</h3>
        <p className="subsection__lead">
          Things I built on my own, mostly to learn a stack properly.
        </p>
      </div>

      <div className="side-grid">
        {personalProjects.map((project) => (
          <PersonalProject key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Experience() {
  return (
    <Section id="experience" index="02 — Experience" title="Experience">
      <div className="timeline">
        {experience.map((role) => (
          <article className="role" key={role.company} data-reveal>
            <div className="role__meta">
              <p className="role__dates">{role.dates}</p>
              <p className="role__location">{role.location}</p>
            </div>

            <div>
              <h3 className="role__company">
                {role.current && <span className="dot" aria-hidden="true" />}
                {role.company}
              </h3>
              <p className="role__title">
                {role.role}
                {role.roleNote && (
                  <span className="role__note">{role.roleNote}</span>
                )}
              </p>

              <ul className="bullets">
                {role.bullets.map((b) => (
                  <li key={b}>{b}</li>
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
              <p className="role__dates">{item.dates}</p>
              <p className="role__location">{item.location}</p>
            </div>
            <div>
              <p className="role__section">{education.heading}</p>
              <h3 className="role__company">{item.school}</h3>
              <p className="role__title">{item.credential}</p>
            </div>
          </article>
        ))}

        <article className="role" data-reveal>
          <div className="role__meta">
            <p className="role__dates">{certifications.dates}</p>
          </div>
          <div>
            <p className="role__section">{certifications.heading}</p>
            <ul className="certs">
              {certifications.items.map((c) => (
                <li key={c.name}>
                  <span className="certs__name">{c.name}</span>
                  <span className="certs__meta">
                    {c.issuer ? `${c.issuer} · ${c.date}` : c.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function About() {
  return (
    <Section id="about" index="03 — About" title={about.heading}>
      <div className="about" data-reveal>
        <p className="about__lead">{about.lead}</p>
        <div className="about__body">
          {about.body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
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
      lead="Grouped by how much I actually use them, rather than listed flat."
    >
      <div className="skills" data-reveal>
        {skills.map((group) => (
          <div
            className={`skill-group${group.primary ? ' skill-group--primary' : ''}`}
            key={group.group}
          >
            <div className="skill-group__head">
              <h3>{group.group}</h3>
              {group.note && <p className="skill-group__note">{group.note}</p>}
            </div>
            <ul className="chips">
              {group.items.map((item) => (
                <li className="chip" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function HowIWork() {
  return (
    <Section
      id="how-i-work"
      index="05 — Process"
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
    {
      label: 'LinkedIn',
      value: 'lopezkcc714',
      href: profile.linkedin,
      external: true,
    },
    {
      label: 'GitHub',
      value: 'itsmeyanxi',
      href: profile.github,
      external: true,
    },
  ];

  return (
    <Section id="contact" index="06 — Contact">
      <div className="contact" data-reveal>
        <div>
          <h2 className="contact__heading">{contact.heading}</h2>
          <p className="contact__lead">{contact.lead}</p>
        </div>
        <div className="contact__cta">
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            <Mail />
            Email Me
          </a>
          <ResumeLink className="btn btn--secondary">
            <Download />
            Download Resume
          </ResumeLink>
        </div>
      </div>

      <div className="channels" data-reveal>
        {channels.map((c) => (
          <a
            className="channel"
            key={c.label}
            href={c.href}
            {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
        <Work />
        <Experience />
        <About />
        <Skills />
        <HowIWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
