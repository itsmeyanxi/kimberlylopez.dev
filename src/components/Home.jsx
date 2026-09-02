import {
  about,
  certifications,
  contact,
  education,
  experience,
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

/* A non-breaking space before each separator, so a wrap never strands a
   leading "· " at the start of the next line. */
const DOT = ' · ';
/* Spaces inside a name are made non-breaking too, so "Tailwind CSS" cannot be
   split across two lines. */
const glue = (s) => String(s).replace(/ /g, ' ');
const dotted = (items) => items.map(glue).join(DOT);

/** Technologies as a plain line rather than a row of bordered pills. */
function TechLine({ items }) {
  return <p className="tech">{dotted(items)}</p>;
}

/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell">
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

        <p className="hero__facts" data-reveal>
          {dotted(profile.facts)}
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function ProfessionalProject({ project }) {
  return (
    <article className="work" data-reveal>
      <h3 className="work__name">{project.name}</h3>
      <p className="work__category">{project.category}</p>
      <p className="work__org">{project.org}</p>

      <p className="work__what">{project.what}</p>

      <div className="work__areas">
        <p className="work__label">My work</p>
        <p>{dotted(project.areas)}</p>
      </div>

      {/* The card carries the main stack; the project page lists all of it. */}
      <TechLine items={project.tech.slice(0, 6)} />

      {project.caseStudy && (
        <a className="link-arrow" href={`/work/${project.slug}/`}>
          View project
          <ArrowRight />
        </a>
      )}
    </article>
  );
}

/** Personal work: compact rows, deliberately lighter than the cards above. */
function PersonalProject({ project }) {
  const { links } = project;

  return (
    <article className="side" data-reveal>
      <h4 className="side__name">{project.name}</h4>
      <p className="side__summary">{project.cardSummary}</p>
      <TechLine items={project.tech} />
      {links.live && (
        <a
          className="link-arrow"
          href={links.live}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit
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
    </article>
  );
}

function Work() {
  return (
    <Section
      id="work"
      title="Work"
      lead="Internal systems I help develop at Meatplus Trading Corp."
    >
      <div className="work-list">
        {professionalProjects.map((project) => (
          <ProfessionalProject key={project.slug} project={project} />
        ))}
      </div>

      <h3 className="subsection__title" data-reveal>
        Personal projects
      </h3>
      <div className="side-list">
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
    <Section id="experience" title="Experience">
      <div className="timeline">
        {experience.map((role) => (
          <article className="role" key={role.company} data-reveal>
            <p className="role__dates">{role.dates}</p>

            <div>
              <h3 className="role__company">{role.company}</h3>
              <p className="role__title">
                {role.role}
                {role.roleNote && `${DOT}${role.roleNote}`}
              </p>
              <p className="role__location">{role.location}</p>

              <ul className="bullets">
                {role.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <TechLine items={role.tech} />
            </div>
          </article>
        ))}

        {education.items.map((item) => (
          <article className="role" key={item.school} data-reveal>
            <p className="role__dates">{item.dates}</p>
            <div>
              <h3 className="role__company">{item.school}</h3>
              <p className="role__title">{item.credential}</p>
              <p className="role__location">{item.location}</p>
            </div>
          </article>
        ))}

        <article className="role" data-reveal>
          <p className="role__dates">{certifications.dates}</p>
          <div>
            <h3 className="role__company">{certifications.heading}</h3>
            <ul className="certs">
              {certifications.items.map((c) => (
                <li key={c.name}>
                  {c.name}
                  <span className="certs__meta">
                    {c.issuer ? `${DOT}${c.issuer}${DOT}${c.date}` : `${DOT}${c.date}`}
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
    <Section id="about" title={about.heading}>
      <div className="about" data-reveal>
        {about.body.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="skills" data-reveal>
        {skills.map((group) => (
          <div key={group.group}>
            <dt>{group.note ?? group.group}</dt>
            <dd className="tech">{dotted(group.items)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Contact() {
  return (
    <Section id="contact" title={contact.heading}>
      <div className="contact" data-reveal>
        <p className="contact__lead">{contact.lead}</p>

        <ul className="contact__links">
          <li>
            <a href={`mailto:${profile.email}`}>
              <Mail />
              {profile.email}
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
              <ArrowUpRight size={12} />
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
              <ArrowUpRight size={12} />
            </a>
          </li>
          <li>
            <ResumeLink>Resume (PDF)</ResumeLink>
          </li>
        </ul>
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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
