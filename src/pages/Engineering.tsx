import { useState } from 'react'
import { Link } from 'react-router'
import {
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { engineeringTopics } from '@/data/engineering'
import { CodeBlock } from '@/components/CodeBlock'
import { Meta } from '@/components/Meta'

const categories = [
  'All',
  'Frontend Engineering',
  'Backend Engineering',
  'Database Architecture',
  'Security & Auth',
  'Performance Engineering',
  'AI Integration',
] as const

export default function Engineering() {
  const [selectedCat, setSelectedCat] = useState<string>('All')

  const filteredTopics = selectedCat === 'All'
    ? engineeringTopics
    : engineeringTopics.filter((t) => t.category === selectedCat)

  return (
    <>
      <Meta
        title="Engineering Architecture & Principles — Om Jyoti Prakash"
        description="Technical breakdown of frontend state management, REST API architecture, MongoDB indexing strategies, JWT authentication pipelines, and pragmatic AI integration."
      />

      <main className="mx-auto max-w-content px-gutter py-12 md:py-20">
        {/* Header */}
        <div className="border-b border-border pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Technical Methodology
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,1.8rem+3vw,4.25rem)] text-foreground">
            Engineering Practice &amp; Architecture
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
            How I approach technical problem-solving, architectural boundaries, and performance discipline across the full stack. Real code patterns, verified trade-offs, and systems thinking.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Engineering Topics">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCat === cat}
              onClick={() => setSelectedCat(cat)}
              className={[
                'rounded-full px-3.5 py-1.5 font-label text-xs transition-colors',
                selectedCat === cat
                  ? 'bg-foreground font-medium text-background'
                  : 'border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Engineering Topics List */}
        <div className="mt-12 space-y-12">
          {filteredTopics.map((topic, idx) => (
            <article
              key={topic.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4 text-xs text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-3 py-0.5 font-mono text-primary font-medium">
                  {topic.category}
                </span>
                <span className="font-mono text-[0.6875rem]">Pillar 0{idx + 1}</span>
              </div>

              <h2 className="mt-4 font-display text-2xl text-foreground sm:text-3xl">
                {topic.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {topic.summary}
              </p>

              {/* Key Takeaways */}
              <div className="mt-6 rounded-xl border border-border/80 bg-secondary/30 p-5">
                <p className="font-semibold text-xs text-foreground uppercase tracking-wider">
                  Architectural Rules &amp; Best Practices:
                </p>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  {topic.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                      <span className="leading-relaxed">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet */}
              {topic.codeSnippet && (
                <div className="mt-6">
                  <p className="font-mono text-xs text-muted-foreground mb-1">
                    Implementation Pattern:
                  </p>
                  <CodeBlock
                    code={topic.codeSnippet.code}
                    language={topic.codeSnippet.language}
                    filename={topic.codeSnippet.filename}
                  />
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Interactive Lab Callout */}
        <div className="mt-16 rounded-2xl border border-border bg-ink p-8 text-ink-foreground text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-primary">
            Hands-on Testing
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink-foreground">
            Test these patterns live in the Developer Lab
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-ink-muted leading-relaxed sm:text-sm">
            Launch the interactive REST API client to inspect real JSON outputs, simulate network latencies, format schemas, or run calculations in the JavaScript playground.
          </p>
          <div className="mt-6">
            <Link
              to="/lab"
              className="inline-flex items-center gap-2 rounded-full bg-ink-primary px-6 py-2.5 font-label text-xs font-semibold text-ink transition-all hover:brightness-110"
            >
              Open Interactive Lab
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
