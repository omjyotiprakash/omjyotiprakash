import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  Layers,
  ShieldCheck,
  Cpu,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { GithubIcon } from '@/components/Icons'
import { caseStudies } from '@/data/caseStudies'
import { projects } from '@/data/site'
import { ReadingProgress } from '@/components/ReadingProgress'
import { Meta } from '@/components/Meta'

const tableOfContents = [
  { id: 'overview', label: '1. Overview & Context' },
  { id: 'problem', label: '2. The Problem' },
  { id: 'why-built', label: '3. Why I Built It' },
  { id: 'requirements', label: '4. Technical Requirements' },
  { id: 'tech-selection', label: '5. Technology Selection' },
  { id: 'architecture', label: '6. System Architecture' },
  { id: 'database', label: '7. Database Schema & Indexing' },
  { id: 'frontend-backend', label: '8. Frontend & Backend Layers' },
  { id: 'api-design', label: '9. REST API Specification' },
  { id: 'auth-security', label: '10. Authentication & Security' },
  { id: 'decisions', label: '11. Implementation Decisions' },
  { id: 'challenges', label: '12. Challenges & Debugging' },
  { id: 'performance', label: '13. Performance & Lessons' },
  { id: 'roadmap', label: '14. Future Improvements' },
]

export default function ProjectCaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const [activeSection, setActiveSection] = useState('overview')

  const study = slug ? caseStudies[slug] : null
  const projectMeta = projects.find((p) => p.slug === slug)

  // Find next and previous projects
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  // Intersection observer to highlight current TOC section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180
      for (const item of tableOfContents) {
        const el = document.getElementById(item.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!study || !projectMeta) {
    return (
      <div className="mx-auto max-w-content px-gutter py-24 text-center">
        <h1 className="font-display text-3xl text-foreground">Case Study Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested project case study could not be located.
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 font-label text-xs text-background"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <>
      <Meta
        title={`${study.title} Case Study — Om Jyoti Prakash`}
        description={study.overview}
      />
      <ReadingProgress />

      <main className="mx-auto max-w-content px-gutter py-10 md:py-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Link to="/projects" className="hover:text-foreground">
            Projects
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{study.title}</span>
        </nav>

        {/* Case Study Header Banner */}
        <header className="mt-6 border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-primary font-medium">
              {study.category}
            </span>
            <span>·</span>
            <span>Role: <strong className="text-foreground">{study.role}</strong></span>
            <span>·</span>
            <span className="font-mono">{study.period}</span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(2.5rem,2rem+3vw,4.25rem)] leading-[1.04] text-foreground">
            {study.title}
          </h1>
          <p className="mt-2 text-xl font-medium text-primary">
            {study.subtitle}
          </p>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {study.overview}
          </p>

          {/* Links and tech tags bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {study.liveUrl && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 font-label text-xs font-medium text-background transition-colors hover:bg-primary"
                >
                  Live Deployment
                  <ExternalLink className="size-3.5" />
                </a>
              )}
              {study.githubUrl && (
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 font-label text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <GithubIcon className="size-3.5" />
                  GitHub Repository
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Two-Column Layout: Main Content + Sticky TOC */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_260px]">
          {/* Main Content Sections */}
          <div className="space-y-16">
            {/* 1. OVERVIEW & CONTEXT */}
            <section id="overview" className="scroll-mt-24 space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                1. Project Overview &amp; Context
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {study.overview}
              </p>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-semibold text-xs text-foreground uppercase tracking-wider">
                  Operational Architecture Summary
                </p>
                <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
                  {study.architecture.overview}
                </p>
              </div>
            </section>

            {/* 2. THE PROBLEM */}
            <section id="problem" className="scroll-mt-24 space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                2. The Problem
              </h2>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm text-foreground/90 leading-relaxed">
                <p>{study.theProblem}</p>
              </div>
            </section>

            {/* 3. WHY I BUILT IT */}
            <section id="why-built" className="scroll-mt-24 space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                3. Why I Built It &amp; Engineering Goals
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {study.whyIBuiltIt}
              </p>
            </section>

            {/* 4. TECHNICAL REQUIREMENTS */}
            <section id="requirements" className="scroll-mt-24 space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                4. Technical Requirements
              </h2>
              <ul className="space-y-2.5">
                {study.technicalRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 5. TECHNOLOGY SELECTION */}
            <section id="tech-selection" className="scroll-mt-24 space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                5. Technology Selection &amp; Justification
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {study.technologySelection.map((tech, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-5">
                    <span className="font-mono text-xs font-semibold text-primary">
                      {tech.tech}
                    </span>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {tech.reason}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. SYSTEM ARCHITECTURE & DIAGRAM */}
            <section id="architecture" className="scroll-mt-24 space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                6. System Architecture Diagram
              </h2>
              <p className="text-sm text-muted-foreground">
                {study.architecture.overview}
              </p>

              {/* Interactive Architecture Flow Visualizer */}
              <div className="my-6 overflow-hidden rounded-2xl border border-border bg-[#0d1117] p-6 text-[#e6edf3]">
                <div className="mb-4 flex items-center justify-between border-b border-[#30363d] pb-3 text-xs">
                  <span className="font-mono text-[#8b949e]">System Architecture Pipeline</span>
                  <span className="rounded bg-primary/20 px-2 py-0.5 font-mono text-[0.625rem] text-primary">
                    Interactive Spec
                  </span>
                </div>

                <div className="space-y-4">
                  {study.architecture.layers.map((layer, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 rounded-lg border border-[#30363d] bg-[#161b22] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 font-mono text-[0.6875rem] text-primary">
                          0{idx + 1}
                        </span>
                        <div>
                          <span className="font-mono text-xs font-semibold text-emerald-400">
                            {layer.layer}
                          </span>
                          <p className="text-xs font-medium text-[#c9d1d9]">
                            {layer.component}
                          </p>
                        </div>
                      </div>
                      <p className="max-w-md text-right text-[0.75rem] text-[#8b949e] sm:text-left">
                        {layer.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. DATABASE DESIGN & INDEXING */}
            <section id="database" className="scroll-mt-24 space-y-6">
              <h2 className="font-display text-2xl text-foreground">
                7. Database Design &amp; Indexing Strategy
              </h2>
              <p className="text-sm text-muted-foreground">
                {study.databaseDesign.description}
              </p>

              {study.databaseDesign.collections.map((coll) => (
                <div key={coll.name} className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Database className="size-4 text-primary" />
                      <span className="font-mono text-xs font-semibold text-foreground">
                        Collection: {coll.name}
                      </span>
                    </div>
                    <span className="text-[0.6875rem] text-muted-foreground">{coll.purpose}</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-border/80 bg-secondary/20 font-mono text-[0.6875rem] text-muted-foreground">
                        <tr>
                          <th className="px-4 py-2.5">Field</th>
                          <th className="px-4 py-2.5">BSON Type</th>
                          <th className="px-4 py-2.5">Purpose &amp; Validation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {coll.fields.map((field) => (
                          <tr key={field.name} className="hover:bg-secondary/10">
                            <td className="px-4 py-2 font-mono text-primary font-medium">{field.name}</td>
                            <td className="px-4 py-2 font-mono text-muted-foreground">{field.type}</td>
                            <td className="px-4 py-2 text-foreground/80">{field.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {coll.indexes && (
                    <div className="border-t border-border bg-secondary/10 px-4 py-2.5 font-mono text-[0.6875rem] text-muted-foreground">
                      <span className="text-foreground font-semibold">Active Compound Indexes: </span>
                      {coll.indexes.join(' · ')}
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* 8. FRONTEND & BACKEND ARCHITECTURE */}
            <section id="frontend-backend" className="scroll-mt-24 space-y-6">
              <h2 className="font-display text-2xl text-foreground">
                8. Frontend &amp; Backend Implementation
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Frontend */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    <Layers className="size-4" />
                    <span>Frontend Architecture</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {study.frontendArchitecture.summary}
                  </p>
                  <ul className="space-y-2 pt-2 text-xs text-muted-foreground">
                    {study.frontendArchitecture.keyPatterns.map((pat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">·</span>
                        <span>{pat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Backend */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    <Cpu className="size-4" />
                    <span>Backend Architecture</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {study.backendArchitecture.summary}
                  </p>
                  <ul className="space-y-2 pt-2 text-xs text-muted-foreground">
                    {study.backendArchitecture.keyPatterns.map((pat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">·</span>
                        <span>{pat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 9. REST API SPECIFICATION */}
            <section id="api-design" className="scroll-mt-24 space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                9. REST API Contract &amp; Endpoints
              </h2>
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-border bg-secondary/40 font-mono text-[0.6875rem] text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3">Method</th>
                        <th className="px-4 py-3">Endpoint Route</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Auth Guard</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {study.apiDesign.map((api, i) => (
                        <tr key={i} className="hover:bg-secondary/10">
                          <td className="px-4 py-2.5 font-mono">
                            <span
                              className={[
                                'rounded px-2 py-0.5 text-[0.6875rem] font-bold',
                                api.method === 'GET'
                                  ? 'bg-blue-500/10 text-blue-500'
                                  : api.method === 'POST'
                                    ? 'bg-emerald-500/10 text-emerald-500'
                                    : api.method === 'PUT'
                                      ? 'bg-amber-500/10 text-amber-500'
                                      : 'bg-rose-500/10 text-rose-500',
                              ].join(' ')}
                            >
                              {api.method}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 font-mono text-foreground font-medium">
                            {api.endpoint}
                          </td>
                          <td className="px-4 py-2.5 text-muted-foreground">
                            {api.description}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-[0.6875rem]">
                            {api.auth ? (
                              <span className="text-emerald-500">Bearer JWT</span>
                            ) : (
                              <span className="text-muted-foreground">Public</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 10. AUTH & SECURITY */}
            <section id="auth-security" className="scroll-mt-24 space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                10. Authentication, Security &amp; Data Integrity
              </h2>
              <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                  <ShieldCheck className="size-4" />
                  <span>Security Strategy</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {study.authAndSecurity.approach}
                </p>
                <div className="grid gap-2 sm:grid-cols-2 pt-2">
                  {study.authAndSecurity.measures.map((m, i) => (
                    <div key={i} className="rounded-lg border border-border/80 bg-secondary/30 p-3 text-xs text-muted-foreground">
                      ✔ {m}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 11. IMPLEMENTATION DECISIONS */}
            <section id="decisions" className="scroll-mt-24 space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                11. Key Engineering Decisions &amp; Trade-offs
              </h2>
              <div className="space-y-4">
                {study.implementationDecisions.map((dec, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-2">
                    <h3 className="font-semibold text-sm text-foreground">
                      {dec.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      <strong className="text-primary">Decision Rationale: </strong>
                      {dec.rationale}
                    </p>
                    <p className="text-xs text-muted-foreground/80 italic border-t border-border/60 pt-2">
                      Alternative Rejected: {dec.alternativeConsidered}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 12. CHALLENGES & DEBUGGING */}
            <section id="challenges" className="scroll-mt-24 space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                12. Challenges Encountered &amp; Debugging
              </h2>
              <div className="space-y-4">
                {study.challengesAndDebugging.map((ch, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-3">
                    <div className="flex items-center gap-2 text-rose-500 font-semibold text-xs uppercase tracking-wider">
                      <AlertTriangle className="size-4" />
                      <span>{ch.issue}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Symptom: </strong>{ch.symptom}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Investigation: </strong>{ch.investigation}
                    </p>
                    <div className="rounded-lg bg-emerald-500/10 p-3 text-xs text-emerald-800 dark:text-emerald-300">
                      <strong>Resolution: </strong>{ch.resolution}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 13. PERFORMANCE & LESSONS */}
            <section id="performance" className="scroll-mt-24 space-y-6">
              <h2 className="font-display text-2xl text-foreground">
                13. Performance Discipline &amp; What I Learned
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                  <h3 className="font-semibold text-xs text-primary uppercase tracking-wider">
                    Performance Considerations
                  </h3>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {study.performanceConsiderations.map((perf, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary">⚡</span>
                        <span>{perf}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                  <h3 className="font-semibold text-xs text-emerald-500 uppercase tracking-wider">
                    What I Learned
                  </h3>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {study.lessonsLearned.map((lesson, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Lightbulb className="size-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 14. FUTURE IMPROVEMENTS */}
            <section id="roadmap" className="scroll-mt-24 space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                14. Future Improvements &amp; Roadmap
              </h2>
              <div className="rounded-xl border border-border bg-card p-6">
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  {study.futureImprovements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="font-mono text-primary font-bold">→</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Next and Previous Navigation */}
            <div className="flex items-center justify-between border-t border-border pt-8">
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.slug}`}
                  className="group flex flex-col text-left"
                >
                  <span className="font-mono text-[0.6875rem] text-muted-foreground">
                    ← Previous Case Study
                  </span>
                  <span className="font-display text-base font-medium text-foreground group-hover:text-primary">
                    {prevProject.title}
                  </span>
                </Link>
              ) : <div />}

              {nextProject && (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="group flex flex-col text-right"
                >
                  <span className="font-mono text-[0.6875rem] text-muted-foreground">
                    Next Case Study →
                  </span>
                  <span className="font-display text-base font-medium text-foreground group-hover:text-primary">
                    {nextProject.title}
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* Sticky Desktop Table of Contents Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4 rounded-xl border border-border bg-card p-5">
              <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
                Case Study Index
              </p>
              <nav className="space-y-1">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={[
                      'block rounded px-2.5 py-1.5 text-xs transition-colors',
                      activeSection === item.id
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                    ].join(' ')}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="border-t border-border pt-3">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="size-3.5" />
                  All Projects
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}
