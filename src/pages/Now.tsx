import { Link } from 'react-router'
import { Clock, Hammer, BookOpen, Target, Sparkles, ArrowRight } from 'lucide-react'
import { currentlyExploring, readingList } from '@/data/site'
import { Meta } from '@/components/Meta'

export default function Now() {
  const lastUpdated = 'November 2024'

  return (
    <>
      <Meta
        title="Now — What Om Jyoti Prakash is Focused on Today"
        description="A real-time snapshot of what Om Jyoti Prakash is building, studying, and exploring. Inspired by Derek Sivers' /now page concept."
      />

      <main className="mx-auto max-w-3xl px-gutter py-12 md:py-20">
        {/* Header */}
        <div className="border-b border-border pb-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
            <Clock className="size-3.5" />
            <span>Derek Sivers /now page movement</span>
          </div>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,1.8rem+3vw,4.25rem)] text-foreground">
            Now
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            What I am focused on at this exact moment in time. Last updated in{' '}
            <strong className="text-foreground">{lastUpdated}</strong> from Bhubaneswar, Odisha.
          </p>
        </div>

        {/* Content Sections */}
        <div className="mt-10 space-y-12 text-sm text-muted-foreground leading-relaxed sm:text-base">
          {/* 1. What I am building */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-display text-xl font-semibold">
              <Hammer className="size-5 text-primary" />
              <h2>What I Am Currently Building</h2>
            </div>
            <p>
              I am currently refining <strong className="text-foreground">QuickNote v2</strong>. The initial version proved the end-to-end MERN architecture (JWT auth, Multer file uploads, and Mongo compound indexing). Now, I am adding a distraction-free markdown live preview mode, optimizing mobile drawer responsiveness, and testing vector search with MongoDB Atlas.
            </p>
            <p>
              Simultaneously, I am building the interactive engineering workbench in the <Link to="/lab" className="text-primary underline">Lab</Link> to turn complex database relationships and REST API request lifecycles into visual, intuitive simulators.
            </p>
          </section>

          {/* 2. What I am learning & exploring */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-display text-xl font-semibold">
              <Sparkles className="size-5 text-primary" />
              <h2>Technologies &amp; Concepts I Am Exploring</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {currentlyExploring.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-4 space-y-1.5"
                >
                  <span className="font-mono text-[0.6875rem] font-semibold text-primary">
                    {item.area}
                  </span>
                  <h3 className="font-medium text-xs text-foreground sm:text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Current Reading List */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-display text-xl font-semibold">
              <BookOpen className="size-5 text-primary" />
              <h2>Books &amp; Technical Literature</h2>
            </div>
            <div className="space-y-3">
              {readingList.map((book) => (
                <div
                  key={book.title}
                  className="flex flex-col justify-between gap-1 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="font-medium text-sm text-foreground">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      by {book.author} · {book.topic}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[0.6875rem] text-primary">
                    {book.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Professional Goals */}
          <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-foreground font-display text-xl font-semibold">
              <Target className="size-5 text-primary" />
              <h2>Current Professional Goals</h2>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>
                  <strong>Full-Time Software Engineering Role:</strong> Joining an engineering team where code quality, user trust, and thoughtful product iteration matter.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>
                  <strong>Deepening Backend Reliability:</strong> Writing resilient Express/Node micro-services with automated unit tests and centralized error pipelines.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>
                  <strong>Publishing Regularly:</strong> Documenting debugging breakthroughs and architectural patterns in my <Link to="/writing" className="text-primary underline">Engineering Journal</Link>.
                </span>
              </li>
            </ul>
          </section>

          {/* Footer CTA */}
          <div className="border-t border-border pt-8 text-center sm:text-left">
            <p className="text-xs text-muted-foreground">
              Interested in collaborating or discussing an engineering opportunity?
            </p>
            <div className="mt-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 font-label text-xs font-semibold text-primary hover:underline"
              >
                Send a message through the contact page
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
