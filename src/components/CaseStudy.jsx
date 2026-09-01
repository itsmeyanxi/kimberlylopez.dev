import { findProject, professionalProjects, profile } from '../data/content.js';
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
                <dt>Period</dt>
                <dd>{project.period}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{project.credit}</dd>
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
                <h2>The workflow</h2>
                <p>
                  The system is organised around this sequence, and a record
                  carries through it rather than being re-entered at each step.
                </p>
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
              <h2>My role</h2>
              <p className="case-credit">{project.credit}</p>
              <p>{project.cardRole}</p>
            </section>

            <section className="case-section" data-reveal>
              <h2>What I worked on</h2>
              <ul className="bullets">
                {project.contribution.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="case-section" data-reveal>
              <h2>Key functionality</h2>
              <ul className="feature-grid">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            {project.notes && (
              <section className="case-section" data-reveal>
                <h2>Notes on the build</h2>
                <div className="notes">
                  {project.notes.map((note) => (
                    <article className="note" key={note.title}>
                      <h3>{note.title}</h3>
                      <p>{note.text}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
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
              <h2>Availability</h2>
              {/* No live link and no repository: this is an internal company
                  system. Saying so plainly is more use to a reader than a link
                  they cannot open. */}
              <p className="case-side__note">
                An internal company system, so there is no public deployment and
                the source is not publicly available. Happy to talk through the
                implementation.
              </p>
            </div>

            <div>
              <h2>Questions about this work?</h2>
              <a
                className="btn btn--primary btn--sm"
                href={`mailto:${profile.email}?subject=${encodeURIComponent(project.name)}`}
                style={{ marginTop: '0.7rem', width: '100%' }}
              >
                Email me
              </a>
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
