import {
  findProject,
  professionalProjects,
  projectAccessNote,
} from '../data/content.js';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import { ArrowLeft, ArrowRight, useReveal } from './ui.jsx';

const DOT = ' · ';
const glue = (s) => String(s).replace(/ /g, ' ');

export default function CaseStudy({ slug }) {
  useReveal();

  const project = findProject(slug);
  if (!project) {
    return (
      <>
        <Header />
        <main id="main" className="shell" style={{ paddingBlock: '6rem' }}>
          <h1 className="section-title">Project not found</h1>
          <p className="section-lead" style={{ marginTop: '1rem' }}>
            <a className="text-link" href="/#work">
              Back to my work
            </a>
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const index = professionalProjects.findIndex((p) => p.slug === slug);
  const next = professionalProjects[(index + 1) % professionalProjects.length];
  const hasNext = next && next.slug !== slug;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />

      <main id="main" className="shell project">
        <a className="breadcrumb" href="/#work" data-reveal>
          <ArrowLeft size={13} />
          My work
        </a>

        <h1 className="project__title" data-reveal>
          {project.name}
        </h1>
        <p className="project__subtitle" data-reveal>
          {project.category}
        </p>
        <p className="project__org" data-reveal>
          {project.org}{DOT}{project.team}
        </p>

        <section className="project__section" data-reveal>
          <h2>What it is</h2>
          <p>{project.what}</p>
        </section>

        {project.workflow && (
          <section className="project__section" data-reveal>
            <h2>How it works</h2>
            {/* A wrapped sequence, with the arrows as separators. No boxes. */}
            <ol className="flow">
              {project.workflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        <section className="project__section" data-reveal>
          <h2>What I worked on</h2>
          {project.worked.map((item) =>
            typeof item === 'string' ? (
              <p key={item}>{item}</p>
            ) : (
              <div className="worked" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            )
          )}
          {project.workedNote && <p>{project.workedNote}</p>}
        </section>

        <section className="project__section" data-reveal>
          <h2>Technologies</h2>
          <p className="tech">{project.tech.map(glue).join(DOT)}</p>
        </section>

        <section className="project__section" data-reveal>
          <h2>Access</h2>
          <p>{projectAccessNote}</p>
        </section>

        <nav className="project__nav" aria-label="Projects">
          <a className="link-arrow" href="/#work">
            <ArrowLeft />
            All work
          </a>
          {hasNext && (
            <a className="link-arrow" href={`/work/${next.slug}/`}>
              Next: {next.name}
              <ArrowRight />
            </a>
          )}
        </nav>
      </main>

      <Footer />
    </>
  );
}
