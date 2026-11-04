import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  CheckCircle2,
} from 'lucide-react'
import { GithubIcon } from '@/components/Icons'
import { projects } from '@/data/site'
import { Meta } from '@/components/Meta'

const categories = [
  'All',
  'Full-Stack',
  'Frontend',
  'Backend',
  'Concepts & Architecture',
] as const

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        project.category === selectedCategory ||
        (selectedCategory === 'Frontend' && (project.category === 'Full-Stack' || project.category === 'Frontend')) ||
        (selectedCategory === 'Backend' && (project.category === 'Full-Stack' || project.category === 'Backend'))

      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <>
      <Meta
        title="Projects & Case Studies — Om Jyoti Prakash"
        description="Explore engineering case studies by Om Jyoti Prakash: QuickNote (MERN notes & social platform), Food Delivery multi-app system, Cinequirk media catalog, EDUQUIRK, and SmartPark simulator."
      />

      <main className="mx-auto max-w-content px-gutter py-12 md:py-20">
        {/* Page Header */}
        <div className="border-b border-border pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Engineering Portfolio
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,1.8rem+3vw,4.25rem)] text-foreground">
            Projects &amp; Case Studies
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Real software built end-to-end. Each project demonstrates practical architecture, problem-solving, state management, and transparent technical trade-offs.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Project Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={[
                  'rounded-full px-3.5 py-1.5 font-label text-xs transition-colors',
                  selectedCategory === cat
                    ? 'bg-foreground font-medium text-background'
                    : 'border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or title..."
              className="h-9 w-full rounded-full border border-border bg-card pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
              aria-label="Search projects"
            />
          </div>
        </div>

        {/* Projects Showcase List */}
        <div className="mt-12 space-y-10">
          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
              No projects found matching your criteria. Try adjusting your search query.
            </div>
          ) : (
            filteredProjects.map((project, idx) => (
              <article
                key={project.slug}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-raised md:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                  {/* Left Column: Project Details */}
                  <div className="flex flex-col justify-between">
                    <div>
                      {/* Meta header row */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-mono text-primary font-semibold">
                          0{idx + 1}
                        </span>
                        <span>·</span>
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[0.6875rem]">
                          {project.category}
                        </span>
                        <span>·</span>
                        <span className="font-mono text-[0.6875rem]">{project.year}</span>
                        <span>·</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {project.status}
                        </span>
                      </div>

                      {/* Project Title & Tagline */}
                      <h2 className="mt-4 font-display text-2xl text-foreground group-hover:text-primary transition-colors sm:text-3xl">
                        {project.title}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-primary">
                        {project.tagline}
                      </p>

                      {/* Problem Statement */}
                      <div className="mt-5 rounded-lg border border-border/70 bg-secondary/30 p-3.5 text-xs">
                        <span className="font-semibold text-foreground uppercase tracking-wider text-[0.625rem]">
                          The Problem:
                        </span>
                        <p className="mt-1 text-muted-foreground leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      {/* Solution Summary */}
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {project.solution}
                      </p>

                      {/* Key highlights checklist */}
                      <div className="mt-5 space-y-1.5 text-xs text-muted-foreground">
                        <p className="font-semibold text-foreground">Key Architecture Highlights:</p>
                        {project.highlights.slice(0, 3).map((h, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="size-3.5 shrink-0 text-primary mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack badges */}
                      <div className="mt-6 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[0.6875rem] text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-5">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 font-label text-xs font-medium text-background transition-colors hover:bg-primary"
                      >
                        Read Deep Case Study
                        <ArrowRight className="size-3.5" />
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 font-label text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                        >
                          Live Demo
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 font-label text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                        >
                          <GithubIcon className="size-3.5" />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Architecture Preview */}
                  <div className="flex flex-col justify-center rounded-xl border border-border bg-[#0d1117] p-5 text-[#e6edf3]">
                    <div className="flex items-center justify-between border-b border-[#30363d] pb-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-400" />
                        <span className="font-mono text-[0.6875rem] text-[#8b949e]">
                          {project.slug}.architecture
                        </span>
                      </div>
                      <span className="font-mono text-[0.625rem] text-primary">
                        Production Spec
                      </span>
                    </div>

                    <div className="mt-4 space-y-3 font-mono text-xs">
                      <div>
                        <span className="text-[#8b949e]">// System Blueprint</span>
                        <p className="mt-1 text-[0.75rem] leading-relaxed text-[#c9d1d9]">
                          {project.architectureSummary}
                        </p>
                      </div>

                      <div className="rounded border border-[#30363d] bg-[#161b22] p-3 text-[0.6875rem]">
                        <div className="text-emerald-400 font-semibold mb-1">
                          Core Modules Verified:
                        </div>
                        <ul className="space-y-1 text-[#8b949e]">
                          <li>✔ End-to-end HTTP request lifecycle</li>
                          <li>✔ Stateless auth guard validation</li>
                          <li>✔ Database index query optimization</li>
                          <li>✔ Resilient error fallbacks</li>
                        </ul>
                      </div>

                      {project.demoNote && (
                        <p className="text-[0.6875rem] text-amber-400/90 italic">
                          ℹ Note: {project.demoNote}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 border-t border-[#30363d] pt-3 text-right">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="font-mono text-xs text-primary hover:underline"
                      >
                        Inspect 18-part technical case study →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </>
  )
}
