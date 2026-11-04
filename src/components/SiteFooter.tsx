import { Link } from 'react-router'
import { Mail, MapPin } from 'lucide-react'
import { BrandMark } from '@/components/Brand'
import { GithubIcon, LinkedinIcon } from '@/components/Icons'
import { site } from '@/data/site'
import { toast } from 'sonner'

export function SiteFooter() {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      toast.success('Email copied to clipboard')
    } catch {
      toast.error('Failed to copy email')
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-border bg-ink text-ink-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--ink-primary)_24%,transparent),transparent)]"
      />
      <div className="relative mx-auto max-w-content px-gutter pb-12 pt-section">
        {/* Top CTA Row */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-12">
          {/* Column 1: Headline & Email */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-foreground/5 px-3 py-1 font-mono text-[0.6875rem] text-ink-primary">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {site.availability}
            </div>

            <p className="mt-5 font-display text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.08] tracking-[-0.03em] text-ink-foreground">
              Let’s build software that makes complex things feel simple.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-primary px-5 font-label text-sm font-medium text-ink transition-all hover:brightness-110"
              >
                <Mail className="size-4" />
                <span>{site.email}</span>
              </button>

              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-border px-4 font-label text-sm text-ink-foreground/90 transition-colors hover:border-ink-primary hover:text-ink-primary"
              >
                <GithubIcon className="size-4" />
                <span>GitHub</span>
              </a>

              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-border px-4 font-label text-sm text-ink-foreground/90 transition-colors hover:border-ink-primary hover:text-ink-primary"
              >
                <LinkedinIcon className="size-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted">
              <MapPin className="size-3.5 text-ink-primary" />
              <span>Based in {site.location} · Open to remote roles &amp; relocation</span>
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <nav aria-label="Footer Navigation">
            <h2 className="font-label text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Directory
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-primary">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-primary">
                  About &amp; Journey
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-primary">
                  All Projects &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link to="/engineering" className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-primary">
                  Engineering Principles
                </Link>
              </li>
              <li>
                <Link to="/writing" className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-primary">
                  Technical Journal
                </Link>
              </li>
              <li>
                <Link to="/lab" className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-primary">
                  Lab &amp; Experiments
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3: Context & Meta */}
          <div>
            <h2 className="font-label text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Profile &amp; Setup
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/now" className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-primary">
                  Now — Current Focus
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-primary">
                  Experience &amp; Education
                </Link>
              </li>
              <li>
                <Link to="/uses" className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-primary">
                  Uses — Hardware &amp; Tooling
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-primary">
                  Contact Form
                </Link>
              </li>
            </ul>

            <div className="mt-6 rounded-lg border border-ink-border bg-ink-foreground/5 p-3 text-xs text-ink-muted">
              <p className="font-medium text-ink-foreground">{site.education.degree}</p>
              <p className="mt-0.5">{site.education.institution}</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Badges */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-border pt-6 text-xs text-ink-muted sm:flex-row">
          <div className="flex items-center gap-2.5">
            <BrandMark className="size-5 shrink-0 text-ink-primary" />
            <p>
              © {new Date().getFullYear()} {site.name}. Crafted with React 19, TypeScript, &amp; Tailwind CSS.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-ink-muted">
            <span>Press <kbd className="rounded border border-ink-border bg-ink px-1.5 py-0.5 font-mono text-[0.625rem]">⌘K</kbd> to search</span>
            <span>·</span>
            <span>Press <kbd className="rounded border border-ink-border bg-ink px-1.5 py-0.5 font-mono text-[0.625rem]">`</kbd> for terminal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
