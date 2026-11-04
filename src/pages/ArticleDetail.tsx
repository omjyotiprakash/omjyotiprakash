import { useState } from 'react'
import { useParams, Link } from 'react-router'
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Check,
} from 'lucide-react'
import { articles } from '@/data/articles'
import { CodeBlock } from '@/components/CodeBlock'
import { ReadingProgress } from '@/components/ReadingProgress'
import { Meta } from '@/components/Meta'
import { toast } from 'sonner'

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [copiedLink, setCopiedLink] = useState(false)

  const article = articles.find((a) => a.slug === slug)
  const relatedArticles = articles
    .filter((a) => a.slug !== slug)
    .slice(0, 2)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      toast.success('Article link copied to clipboard')
      setTimeout(() => setCopiedLink(false), 2000)
    } catch {
      toast.error('Failed to copy link')
    }
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-content px-gutter py-24 text-center">
        <h1 className="font-display text-3xl text-foreground">Article Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested essay could not be found.
        </p>
        <Link
          to="/writing"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 font-label text-xs text-background"
        >
          <ArrowLeft className="size-4" />
          Back to Writing
        </Link>
      </div>
    )
  }

  // Parse markdown-like content blocks (headings, code blocks, paragraphs)
  const renderContent = (rawText: string) => {
    const lines = rawText.trim().split('\n')
    const blocks: React.ReactNode[] = []
    let inCode = false
    let codeBuffer: string[] = []
    let codeLang = 'javascript'
    let keyIdx = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith('```')) {
        if (!inCode) {
          inCode = true
          codeLang = line.replace('```', '').trim() || 'javascript'
          codeBuffer = []
        } else {
          inCode = false
          blocks.push(
            <CodeBlock
              key={`code-${keyIdx++}`}
              code={codeBuffer.join('\n')}
              language={codeLang}
            />
          )
        }
        continue
      }

      if (inCode) {
        codeBuffer.push(line)
        continue
      }

      if (line.startsWith('### ')) {
        blocks.push(
          <h3
            key={`h3-${keyIdx++}`}
            className="mt-8 font-display text-xl text-foreground"
          >
            {line.replace('### ', '')}
          </h3>
        )
      } else if (line.startsWith('## ')) {
        blocks.push(
          <h2
            key={`h2-${keyIdx++}`}
            className="mt-10 font-display text-2xl text-foreground border-b border-border pb-2"
          >
            {line.replace('## ', '')}
          </h2>
        )
      } else if (line.startsWith('- ')) {
        blocks.push(
          <li key={`li-${keyIdx++}`} className="ml-4 list-disc text-sm text-muted-foreground leading-relaxed">
            {line.replace('- ', '')}
          </li>
        )
      } else if (line.trim().startsWith('> ')) {
        blocks.push(
          <blockquote
            key={`quote-${keyIdx++}`}
            className="my-4 border-l-2 border-primary pl-4 font-display italic text-sm text-foreground/85"
          >
            {line.replace('> ', '')}
          </blockquote>
        )
      } else if (line.trim() === '---') {
        blocks.push(<hr key={`hr-${keyIdx++}`} className="my-8 border-border" />)
      } else if (line.trim() !== '') {
        blocks.push(
          <p key={`p-${keyIdx++}`} className="my-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {line}
          </p>
        )
      }
    }

    return blocks
  }

  return (
    <>
      <Meta
        title={`${article.title} — Om Jyoti Prakash`}
        description={article.description}
      />
      <ReadingProgress />

      <main className="mx-auto max-w-3xl px-gutter py-12 md:py-20">
        {/* Back Link */}
        <Link
          to="/writing"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="size-3.5" />
          Back to all articles
        </Link>

        {/* Article Meta Header */}
        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-primary font-medium">
              {article.category}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              {article.publishedAt}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {article.readingTime}
            </span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(2.2rem,1.8rem+2.8vw,3.75rem)] leading-[1.08] text-foreground">
            {article.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {article.description}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
            <div className="flex items-center gap-2">
              <span className="size-7 rounded-full bg-primary/10 text-primary font-display font-semibold flex items-center justify-center text-xs">
                OP
              </span>
              <span className="text-xs font-medium text-foreground">
                Om Jyoti Prakash
              </span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-label text-xs text-foreground transition-colors hover:bg-secondary"
            >
              {copiedLink ? (
                <>
                  <Check className="size-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="size-3.5" />
                  <span>Share link</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Article Body */}
        <div className="mt-8">
          {renderContent(article.content)}
        </div>

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-display text-xl text-foreground">
            Related Engineering Notes
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                to={`/writing/${rel.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <span className="font-mono text-[0.6875rem] text-primary">
                  {rel.category}
                </span>
                <h3 className="mt-2 font-display text-base text-foreground group-hover:text-primary transition-colors">
                  {rel.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {rel.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
