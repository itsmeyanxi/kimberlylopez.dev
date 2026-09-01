import { findProject, profile, projects } from '../data/content.js';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import { ArrowLeft, ArrowRight, ArrowUpRight, Copy, useReveal } from './ui.jsx';

function Notes({ items }) {
  return (
    <div className="notes">
      {items.map((item) => (
        <article className="note" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

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
              Back to selected work
            </a>
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

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
              Selected Work
            </a>

            <p className="case-hero__category" data-reveal>
              {project.category}
            </p>
            <h1 className="case-hero__title" data-reveal>
              {project.name}
            </h1>
            <p className="case-hero__lead" data-reveal>
              {project.oneLiner}
            </p>

            <dl className="case-facts" data-reveal>
              <div>
                <dt>Client</dt>
                <dd>
                  <Copy value={project.client ?? 'Personal project'} />
                </dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{project.team ? project.team.built : project.solo}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="shell case-body">
          <div className="case-main">
            <section className="case-section" data-reveal>
              <h2>Overview</h2>
              <p>{project.solution}</p>
              {project.scale && <p>{project.scale}</p>}
            </section>

            <section className="case-section" data-reveal>
              <h2>The problem</h2>
              <p>{project.problem}</p>
            </section>

            <section className="case-section" data-reveal>
              <h2>My contribution</h2>
              {project.team && <p>{project.team.note}</p>}
              <ul className="bullets">
                {project.contribution.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="case-section" data-reveal>
              <h2>Key features</h2>
              <ul className="feature-grid">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            {project.architecture && (
              <section className="case-section" data-reveal>
                <h2>Technical approach</h2>
                <Notes items={project.architecture} />
              </section>
            )}

            {project.decisions && (
              <section className="case-section" data-reveal>
                <h2>Challenges &amp; decisions</h2>
                <Notes items={project.decisions} />
              </section>
            )}

            <section className="case-section" data-reveal>
              <h2>Screenshots</h2>
              <div className="screenshot-slot">
                <p>
                  No screenshots published yet. Any images added here will be
                  sanitised first — no customer records, pricing, supplier
                  details, credentials or internal financial data.
                </p>
              </div>
            </section>

            <section className="case-section" data-reveal>
              <h2>What I took from it</h2>
              <p>{project.learned}</p>
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
              <h2>Links</h2>
              <div className="case-side__links" style={{ marginTop: '0.7rem' }}>
                {project.links.live ? (
                  <a
                    className="link-arrow"
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live preview
                    <ArrowUpRight />
                  </a>
                ) : (
                  <p style={{ fontSize: '0.87rem', color: 'var(--ink-faint)' }}>
                    {project.links.liveNote ?? 'No public deployment.'}
                  </p>
                )}

                {project.links.source ? (
                  <a
                    className="link-arrow"
                    href={project.links.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source on GitHub
                    <ArrowUpRight />
                  </a>
                ) : (
                  <p style={{ fontSize: '0.87rem', color: 'var(--ink-faint)' }}>
                    {project.links.sourceNote ?? 'Source is not public.'}
                  </p>
                )}
              </div>
            </div>

            {project.demo && (
              <div>
                <h2>Demo sign-in</h2>
                <p className="demo-note" style={{ marginTop: '0.7rem' }}>
                  {project.demo.email}
                  <br />
                  {project.demo.password}
                </p>
              </div>
            )}

            <div>
              <h2>Talk about this work</h2>
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
            <a className="link-arrow" href={`/work/${next.slug}/`}>
              Next: {next.name}
              <ArrowRight />
            </a>
          </nav>
        </div>
      </main>

      <Footer />
    </>
  );
}
