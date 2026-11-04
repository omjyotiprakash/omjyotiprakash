import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Search, BookOpen, Clock, Calendar, Tag } from 'lucide-react'
import { articles } from '@/data/articles'
import { Meta } from '@/components/Meta'

const categories = [
  'All',
  'Full-stack development',
  'MongoDB',
  'React',
  'AI integration',
  'Engineering lessons',
] as const

export default function Writing() {
  const [selectedCat, setSelectedCat] = useState<string>('All')
  const [search, setSearch] = useState('')

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchCat = selectedCat === 'All' || article.category === selectedCat
      const matchQuery =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.description.toLowerCase().includes(search.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))

      return matchCat && matchQuery
    })
  }, [selectedCat, search])

  return (
    <>
      <Meta
        title="Writing & Engineering Journal — Om Jyoti Prakash"
        description="Technical essays and architecture guides on MERN authentication, MongoDB compound indexing, React state machines, pragmatic LLM integration, and web performance."
      />

      <main className="mx-auto max-w-content px-gutter py-12 md:py-20">
        {/* Header */}
        <div className="border-b border-border pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Engineering Journal
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,1.8rem+3vw,4.25rem)] text-foreground">
            Writing &amp; Technical Notes
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
            In-depth engineering reflections, practical guides, and architectural breakdowns. Written to solidify lessons learned while building real software.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Article Categories">
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

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="h-9 w-full rounded-full border border-border bg-card pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
              aria-label="Search articles"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="mt-12 space-y-8">
          {filteredArticles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
              No articles found matching "{search}".
            </div>
          ) : (
            filteredArticles.map((article) => (
              <article
                key={article.slug}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-raised md:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-primary font-medium">
                    {article.category}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {article.publishedAt}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {article.readingTime}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-2xl text-foreground group-hover:text-primary transition-colors sm:text-3xl">
                  <Link to={`/writing/${article.slug}`}>{article.title}</Link>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {article.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border/80 bg-secondary/40 px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/writing/${article.slug}`}
                    className="inline-flex items-center gap-1 font-label text-xs font-semibold text-primary hover:underline"
                  >
                    Read Full Article
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </>
  )
}
