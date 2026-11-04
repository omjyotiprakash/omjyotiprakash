import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router'
import { ArrowUpRight, Menu, Search, Terminal as TerminalIcon } from 'lucide-react'
import { Brand } from '@/components/Brand'
import { Sheet, SheetClose, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/ThemeToggle'
import { CommandPalette } from '@/components/CommandPalette'
import { TerminalModal } from '@/components/TerminalModal'

const navLinks = [
  { to: '/', label: 'Work', exact: true },
  { to: '/about', label: 'About', exact: false },
  { to: '/projects', label: 'Projects', exact: false },
  { to: '/engineering', label: 'Engineering', exact: false },
  { to: '/writing', label: 'Writing', exact: false },
  { to: '/lab', label: 'Lab', exact: false },
  { to: '/now', label: 'Now', exact: false },
  { to: '/experience', label: 'Experience', exact: false },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const { pathname } = useLocation()

  // Listen for Ctrl+K / Cmd+K and backtick for terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((prev) => !prev)
      } else if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault()
        setTerminalOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isCurrent = (to: string, exact: boolean) => {
    if (exact) return pathname === to
    return pathname.startsWith(to)
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-3 px-gutter md:h-18">
          {/* Logo & Identity */}
          <Brand />

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex">
            {navLinks.map((l) => {
              const active = isCurrent(l.to, l.exact)
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'relative inline-flex h-9 items-center rounded-md px-2.5 font-label text-[0.8125rem] tracking-[0.01em] transition-colors',
                    active
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  ].join(' ')}
                >
                  {l.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-2 -bottom-[0.55rem] h-px bg-primary"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Action Tools: Command Palette, Terminal, Theme Toggle, Contact CTA */}
          <div className="flex items-center gap-2">
            {/* Search / Command palette trigger */}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-foreground"
              aria-label="Open command palette (Ctrl+K or Cmd+K)"
            >
              <Search className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[0.625rem] font-medium text-muted-foreground sm:inline">
                ⌘K
              </kbd>
            </button>

            {/* Terminal toggle trigger */}
            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-secondary/50 text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
              aria-label="Open developer terminal emulator"
              title="Open terminal (`)"
            >
              <TerminalIcon className="size-4 text-primary" aria-hidden="true" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="group hidden h-9 items-center gap-1.5 rounded-full bg-foreground px-4 font-label text-[0.8125rem] font-medium text-background transition-colors hover:bg-primary sm:inline-flex"
            >
              Contact
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Sheet */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="right"
            className="flex w-[85%] max-w-sm flex-col gap-0 border-l-border bg-background p-0"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Brand />
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
              <div className="space-y-1">
                {navLinks.map((l, i) => (
                  <SheetClose asChild key={l.to}>
                    <Link
                      to={l.to}
                      className="group flex min-h-12 items-center gap-3 rounded-lg px-3 transition-colors hover:bg-secondary"
                    >
                      <span className="font-mono text-[0.6875rem] text-primary">
                        0{i + 1}
                      </span>
                      <span className="font-display text-xl text-foreground">{l.label}</span>
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/uses"
                    className="group flex min-h-12 items-center gap-3 rounded-lg px-3 transition-colors hover:bg-secondary"
                  >
                    <span className="font-mono text-[0.6875rem] text-primary">09</span>
                    <span className="font-display text-xl text-foreground">Uses</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/contact"
                    className="group flex min-h-12 items-center gap-3 rounded-lg px-3 transition-colors hover:bg-secondary"
                  >
                    <span className="font-mono text-[0.6875rem] text-primary">10</span>
                    <span className="font-display text-xl text-foreground">Contact</span>
                  </Link>
                </SheetClose>
              </div>

              <div className="mt-auto border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    setTerminalOpen(true)
                  }}
                  className="flex w-full items-center gap-2 rounded-lg border border-border bg-secondary/50 p-2.5 text-xs text-foreground"
                >
                  <TerminalIcon className="size-4 text-primary" />
                  <span>Launch Developer Terminal</span>
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Global Modals */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />
      <TerminalModal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  )
}
