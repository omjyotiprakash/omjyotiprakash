import { Link } from 'react-router'
import { ArrowUpRight, Home } from 'lucide-react'
import { BrandMark } from '@/components/Brand'
import { Meta } from '@/components/Meta'

const filedRoutes = [
  { href: '/', label: 'Home — Overview, headline, and featured work' },
  { href: '/about', label: 'About — Background, transition to full-stack, cinema' },
  { href: '/projects', label: 'Projects — 5 deep case studies and architecture specs' },
  { href: '/engineering', label: 'Engineering — Systems architecture and code pillars' },
  { href: '/writing', label: 'Writing — Technical journal and practical guides' },
  { href: '/lab', label: 'Lab — Interactive API explorer, JSON tools, JS playground' },
  { href: '/now', label: 'Now — Current explorations and reading list' },
  { href: '/experience', label: 'Experience — Education and verified internships' },
  { href: '/uses', label: 'Uses — Hardware, VS Code setup, and dev tooling' },
  { href: '/contact', label: 'Contact — Message form, email, and social links' },
]

export default function NotFound() {
  return (
    <>
      <Meta
        title="404 — Page Not Found · Om Jyoti Prakash"
        description="The requested page could not be located. Browse the directory of existing pages."
      />

      <main className="mx-auto max-w-content px-gutter py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              404 — Route Not Located
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,1.8rem+3vw,4rem)] leading-[1.04] text-foreground">
              This page does not exist.
            </h1>
            <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
              The address was either mistyped, moved, or has not been authored yet. Explore the verified directory of routes on the right to navigate back.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 font-label text-xs font-semibold text-primary-foreground transition-colors hover:bg-foreground"
              >
                <Home className="size-4" />
                Back to Home
              </Link>
              <Link
                to="/projects"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 font-label text-xs font-medium text-foreground transition-colors hover:bg-secondary"
              >
                View Projects
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <p className="font-label text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Active Website Directory
              </p>
              <BrandMark className="size-5 text-primary" />
            </div>
            <ul className="divide-y divide-border/60">
              {filedRoutes.map((route, i) => (
                <li key={route.href}>
                  <Link
                    to={route.href}
                    className="group flex items-center justify-between py-3 text-xs text-foreground transition-colors hover:text-primary"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[0.625rem] text-primary">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{route.label}</span>
                    </div>
                    <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
