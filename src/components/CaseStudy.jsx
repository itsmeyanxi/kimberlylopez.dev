import {
  findProject,
  professionalProjects,
  projectAccessNote,
} from '../data/content.js';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import { ArrowLeft, ArrowRight, useReveal } from './ui.jsx';

export default function CaseStudy({ slug }) {
  useReveal();

  const project = findProject(slug);
  if (!project) {
    return (
      <>
        <Header />
        <main id="main" className="shell" style={{ paddingBlock: '6rem' }}>
          <h1 className="section-title">Case study not found</h1>
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

      <main id="main">
        <div className="case-hero">
          <div className="shell">
            <a className="breadcrumb" href="/#work" data-reveal>
              <ArrowLeft size={13} />
              My work
            </a>

            <p className="case-hero__category" data-reveal>
              {project.category}
            </p>
            <h1 className="case-hero__title" data-reveal>
              {project.name}
            </h1>
            {project.subtitle && (
              <p className="case-hero__subtitle" data-reveal>
                {project.subtitle}
              </p>
            )}

            <dl className="case-facts" data-reveal>
              <div>
                <dt>Organisation</dt>
                <dd>{project.org}</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>{project.team}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="shell case-body">
          <div className="case-main">
            <section className="case-section" data-reveal>
              <h2>What it is</h2>
              <p>{project.what}</p>
            </section>

            {project.workflow && (
              <section className="case-section" data-reveal>
                <h2>How it works</h2>
                <ol className="flow flow--stacked">
                  {project.workflow.map((step, i) => (
                    <li className="flow__step" key={step}>
                      <span className="flow__num">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section className="case-section" data-reveal>
              <h2>What I worked on</h2>
              {project.worked.map((item) =>
                typeof item === 'string' ? (
                  <p key={item}>{item}</p>
                ) : (
                  <div className="worked" key={item.title}>
                    <p className="worked__title">{item.title}</p>
                    <p>{item.text}</p>
                  </div>
                )
              )}
              {project.workedNote && <p>{project.workedNote}</p>}
            </section>
          </div>

          <aside className="case-side" data-reveal aria-label="Project details">
            <div>
              <h2>Technologies</h2>
              <ul className="chips" style={{ marginTop: '0.7rem' }}>
                {project.tech.map((t) => (
                  <li className="chip" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Access</h2>
              <p className="case-side__note">{projectAccessNote}</p>
            </div>
          </aside>
        </div>

        <div className="shell">
          <nav className="case-nav" aria-label="Case studies">
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
        </div>
      </main>

      <Footer />
    </>
  );
}
