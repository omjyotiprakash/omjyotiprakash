import { useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Check,
  Code2,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/Icons'
import { site, projects, currentlyExploring, requestPath } from '@/data/site'
import { articles } from '@/data/articles'
import { Meta } from '@/components/Meta'

/* QuickNote Interactive Software Sandbox for Hero */
function QuickNoteHeroPreview() {
  const [activeTab, setActiveTab] = useState<'notes' | 'api' | 'db'>('notes')
  const [notes, setNotes] = useState([
    {
      id: 'n-01',
      title: 'Compound Indexing on User Notes',
      body: 'ESR rule: equality (userId) + sort (createdAt: -1) converts collection scans into fast index scans.',
      tag: 'mongodb',
      done: true,
    },
    {
      id: 'n-02',
      title: 'Server-Side Price Reconciliation',
      body: 'Never trust client-calculated totals. Database queries verify dish availability and recalculate sum.',
      tag: 'security',
      done: true,
    },
    {
      id: 'n-03',
      title: 'Structured LLM Output with Zod',
      body: 'Strict schema validation prevents malformed JSON from reaching frontend components.',
      tag: 'ai-patterns',
      done: false,
    },
  ])

  const toggleNote = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, done: !n.done } : n))
    )
  }

  return (
    <figure className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -top-10 bottom-0 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--primary)_18%,transparent),transparent)] blur-xl"
      />

      {/* Main software window frame */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all">
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-[0.6875rem] text-muted-foreground">
              quicknote.app / workspace
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[0.625rem] text-primary">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span>MERN · Production</span>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center border-b border-border bg-secondary/20 px-3 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={[
              'border-b-2 px-3 py-2 font-label transition-colors',
              activeTab === 'notes'
                ? 'border-primary font-medium text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            ].join(' ')}
          >
            Live Notes ({notes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('api')}
            className={[
              'border-b-2 px-3 py-2 font-label transition-colors',
              activeTab === 'api'
                ? 'border-primary font-medium text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            ].join(' ')}
          >
            REST API Log
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('db')}
            className={[
              'border-b-2 px-3 py-2 font-label transition-colors',
              activeTab === 'db'
                ? 'border-primary font-medium text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            ].join(' ')}
          >
            Atlas Index
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'notes' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Interactive Tasks</span>
                <span className="font-mono text-[0.6875rem]">Click circle to toggle state</span>
              </div>
              <ul className="space-y-2">
                {notes.map((note) => (
                  <li
                    key={note.id}
                    onClick={() => toggleNote(note.id)}
                    className="group flex cursor-pointer items-start gap-3 rounded-lg border border-border/70 bg-background/60 p-3 transition-colors hover:border-primary/50 hover:bg-secondary/40"
                  >
                    <button
                      type="button"
                      className={[
                        'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border transition-colors',
                        note.done
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border group-hover:border-primary',
                      ].join(' ')}
                      aria-label="Toggle note"
                    >
                      {note.done && <Check className="size-3" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={[
                            'text-xs font-medium',
                            note.done ? 'text-muted-foreground line-through' : 'text-foreground',
                          ].join(' ')}
                        >
                          {note.title}
                        </p>
                        <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.625rem] text-primary">
                          #{note.tag}
                        </span>
                      </div>
                      <p className="mt-1 text-[0.75rem] leading-relaxed text-muted-foreground">
                        {note.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="font-mono text-xs text-muted-foreground">
              <div className="mb-2 flex items-center justify-between border-b border-border/40 pb-1.5 text-[0.6875rem]">
                <span className="text-foreground">Recent HTTP Transactions</span>
                <span className="text-emerald-500">200 OK</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between rounded bg-secondary/40 px-2 py-1">
                  <span className="text-primary font-semibold">GET /api/notes</span>
                  <span>142ms · 200 OK</span>
                </div>
                <div className="flex items-center justify-between rounded bg-secondary/40 px-2 py-1">
                  <span className="text-emerald-500 font-semibold">POST /api/notes</span>
                  <span>188ms · 201 Created</span>
                </div>
                <div className="flex items-center justify-between rounded bg-secondary/40 px-2 py-1">
                  <span className="text-amber-500 font-semibold">PUT /api/notes/n-01</span>
                  <span>94ms · 200 OK</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'db' && (
            <div className="font-mono text-xs text-muted-foreground">
              <div className="mb-2 text-[0.6875rem] text-foreground">
                Mongoose Compound Index: <code className="text-primary">notes</code> collection
              </div>
              <div className="rounded-lg border border-border bg-[#0d1117] p-3 text-[0.75rem] text-[#c9d1d9]">
                <div className="text-emerald-400">// ESR Query Execution Plan</div>
                <div>{`{ "userId": 1, "createdAt": -1 }`} → Index Scan (IXSCAN)</div>
                <div className="mt-1 text-[#8b949e]">totalKeysExamined: 3 | nReturned: 3</div>
                <div className="text-amber-400">stage: "PROJECTION_COVERED"</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-4 py-2 font-mono text-[0.6875rem] text-muted-foreground">
          <span>Deploy: Vercel + Render</span>
          <Link
            to="/projects/quicknote"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            Read Case Study
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </figure>
  )
}

export default function Home() {
  return (
    <>
      <Meta
        title="OM JYOTI PRAKASH — Full-Stack Developer & Software Engineer"
        description="Digital headquarters of Om Jyoti Prakash. I build software that makes complex things feel simple. Explore MERN architecture, engineering case studies, and interactive developer tools."
      />

      <main className="relative">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden border-b border-border pb-16 pt-12 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-content px-gutter">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left Column: Headline & Bio */}
              <div>
                {/* Availability status badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3.5 py-1 text-xs text-foreground">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                    Status:
                  </span>
                  <span className="font-medium">{site.availability}</span>
                </div>

                {/* Name & Headline */}
                <h1 className="mt-6 font-display text-[clamp(2.4rem,1.8rem+3.2vw,4.5rem)] leading-[1.04] tracking-[-0.035em] text-foreground">
                  I build software that makes complex things feel simple.
                </h1>

                {/* Supporting description */}
                <p className="mt-5 max-w-[38rem] text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {site.supporting}
                </p>

                {/* Location & Credentials */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium text-foreground">
                    <MapPin className="size-3.5 text-primary" />
                    {site.location}
                  </span>
                  <span>·</span>
                  <span>B.Tech in CSE, Nalanda Institute of Technology</span>
                  <span>·</span>
                  <span className="text-primary font-mono">React · Node · Express · Mongo</span>
                </div>

                {/* Actions & Links */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    to="/projects"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 font-label text-sm font-medium text-background transition-colors hover:bg-primary"
                  >
                    Selected Work
                    <ArrowDown className="size-4" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 font-label text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    About Me
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 font-label text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    Contact
                  </Link>

                  {/* Social icons */}
                  <div className="flex items-center gap-1 pl-2">
                    <a
                      href={site.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                      aria-label="GitHub Profile"
                    >
                      <GithubIcon className="size-4" />
                    </a>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedinIcon className="size-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive QuickNote Preview */}
              <div>
                <QuickNoteHeroPreview />
              </div>
            </div>
          </div>
        </section>

        {/* 2. SELECTED WORK */}
        <section id="work" className="border-b border-border py-section">
          <div className="mx-auto max-w-content px-gutter">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-primary">
                  01 · Portfolio
                </p>
                <h2 className="mt-2 font-display text-[clamp(2rem,1.4rem+2vw,3rem)] leading-none text-foreground">
                  Selected Work
                </h2>
              </div>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                View all 5 engineering projects
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Project Cards Grid */}
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project, idx) => (
                <div
                  key={project.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-raised"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-mono text-primary font-semibold">0{idx + 1}</span>
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[0.6875rem]">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-primary/90">
                      {project.tagline}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>

                    {/* Stack tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-border/80 bg-secondary/50 px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 font-label text-xs font-semibold text-foreground group-hover:text-primary"
                    >
                      Case Study
                      <ArrowRight className="size-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground"
                          title="Live Demo"
                        >
                          <ArrowUpRight className="size-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground"
                          title="GitHub Source"
                        >
                          <GithubIcon className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. ENGINEERING REQUEST PATH (THE MERN LOOP) */}
        <section className="border-b border-border bg-ink py-section text-ink-foreground">
          <div className="mx-auto max-w-content px-gutter">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-primary">
                02 · System Model
              </p>
              <h2 className="mt-2 font-display text-[clamp(2rem,1.4rem+2vw,3rem)] leading-tight text-ink-foreground">
                How a request moves through my stack
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                From an interactive click on the client to disk persistence in MongoDB Atlas. I architect web applications with clear layer boundaries and end-to-end data predictability.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {requestPath.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-ink-border bg-ink-foreground/5 p-5 transition-colors hover:border-ink-primary/50"
                >
                  <span className="font-mono text-xs font-semibold text-ink-primary">
                    {item.layer}
                  </span>
                  <p className="mt-2 text-sm font-medium text-ink-foreground">
                    {item.component}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ENGINEERING PHILOSOPHY */}
        <section className="border-b border-border py-section">
          <div className="mx-auto max-w-content px-gutter">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-primary">
                  03 · Principles
                </p>
                <h2 className="mt-2 font-display text-[clamp(2rem,1.4rem+2vw,3rem)] leading-tight text-foreground">
                  Engineering Philosophy
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  How I approach software architecture, code quality, trade-offs, and product design. These principles guide every line of code I write.
                </p>
                <div className="mt-6">
                  <Link
                    to="/engineering"
                    className="inline-flex items-center gap-1.5 font-label text-sm font-medium text-primary hover:underline"
                  >
                    Read technical architecture guide
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                {site.philosophy.map((item, i) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
                        0{i + 1}
                      </span>
                      <h3 className="text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. CURRENTLY EXPLORING & EXPERIMENTS RADAR */}
        <section className="border-b border-border bg-secondary/30 py-section">
          <div className="mx-auto max-w-content px-gutter">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-primary">
                  04 · Active Learning
                </p>
                <h2 className="mt-2 font-display text-[clamp(2rem,1.4rem+2vw,3rem)] text-foreground">
                  Currently Exploring
                </h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  Continuous improvement is at the core of my development journey. Here is what is on my radar right now.
                </p>
              </div>
              <Link
                to="/now"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Visit the "Now" page
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {currentlyExploring.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div>
                    <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[0.625rem] font-semibold text-primary">
                      {item.area}
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-border pt-3 text-[0.6875rem] font-medium text-emerald-600 dark:text-emerald-400">
                    ● {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. RECENT ENGINEERING WRITING */}
        <section className="border-b border-border py-section">
          <div className="mx-auto max-w-content px-gutter">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-primary">
                  05 · Engineering Journal
                </p>
                <h2 className="mt-2 font-display text-[clamp(2rem,1.4rem+2vw,3rem)] text-foreground">
                  Recent Writing &amp; Guides
                </h2>
              </div>
              <Link
                to="/writing"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Browse all articles
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-10 divide-y divide-border">
              {articles.slice(0, 3).map((article) => (
                <article
                  key={article.slug}
                  className="group py-6 transition-colors first:pt-0 last:pb-0"
                >
                  <Link
                    to={`/writing/${article.slug}`}
                    className="grid gap-2 md:grid-cols-[160px_1fr_120px] md:items-center"
                  >
                    <div className="font-mono text-xs text-muted-foreground">
                      {article.publishedAt} · {article.readingTime}
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex md:justify-end">
                      <span className="inline-flex items-center gap-1 font-label text-xs font-semibold text-primary">
                        Read essay
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 7. INTERACTIVE LAB & TERMINAL CALLOUT */}
        <section className="border-b border-border bg-gradient-to-b from-card to-secondary/30 py-16">
          <div className="mx-auto max-w-content px-gutter">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card p-8 md:flex-row md:p-10">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-primary">
                  <Code2 className="size-4" />
                  <span>Developer Workbench &amp; Simulator</span>
                </div>
                <h3 className="mt-2 font-display text-2xl text-foreground">
                  Explore interactive API testing, JSON tools &amp; DB models
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Visit the Lab to test working REST API requests with real simulated latencies, format JSON payloads, inspect database schemas, or run code in the interactive JavaScript playground.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  to="/lab"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 font-label text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
                >
                  Open Lab Tools
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  )
}
