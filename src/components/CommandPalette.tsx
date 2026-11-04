import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import {
  Search,
  Home,
  User,
  FolderGit2,
  Cpu,
  BookOpen,
  FlaskConical,
  Clock,
  Briefcase,
  Wrench,
  Mail,
  Terminal,
  SunMoon,
  ArrowRight,
  X,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/Icons'
import { projects } from '@/data/site'
import { toast } from 'sonner'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  onOpenTerminal: () => void
}

interface PaletteItem {
  id: string
  title: string
  category: 'Navigation' | 'Projects' | 'Actions' | 'Social'
  icon: React.ComponentType<{ className?: string }>
  shortcut?: string
  action: () => void
}

export function CommandPalette({ open, onClose, onOpenTerminal }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', !isDark)
    try {
      localStorage.setItem('theme', !isDark ? 'dark' : 'light')
    } catch {}
    toast.success(`Theme switched to ${!isDark ? 'Dark' : 'Light'} Mode`)
    onClose()
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('omjyotiprakash4@gmail.com')
      toast.success('Email copied: omjyotiprakash4@gmail.com')
      onClose()
    } catch {
      toast.error('Failed to copy email')
    }
  }

  const items: PaletteItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Home',
      category: 'Navigation',
      icon: Home,
      action: () => {
        navigate('/')
        onClose()
      },
    },
    {
      id: 'nav-about',
      title: 'About Om Jyoti Prakash',
      category: 'Navigation',
      icon: User,
      action: () => {
        navigate('/about')
        onClose()
      },
    },
    {
      id: 'nav-projects',
      title: 'Projects Showcase',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => {
        navigate('/projects')
        onClose()
      },
    },
    {
      id: 'nav-engineering',
      title: 'Engineering Architecture & Practice',
      category: 'Navigation',
      icon: Cpu,
      action: () => {
        navigate('/engineering')
        onClose()
      },
    },
    {
      id: 'nav-writing',
      title: 'Writing & Technical Journal',
      category: 'Navigation',
      icon: BookOpen,
      action: () => {
        navigate('/writing')
        onClose()
      },
    },
    {
      id: 'nav-lab',
      title: 'Lab & Interactive Experiments',
      category: 'Navigation',
      icon: FlaskConical,
      action: () => {
        navigate('/lab')
        onClose()
      },
    },
    {
      id: 'nav-now',
      title: 'Now — What I’m Building & Learning',
      category: 'Navigation',
      icon: Clock,
      action: () => {
        navigate('/now')
        onClose()
      },
    },
    {
      id: 'nav-experience',
      title: 'Experience & Education Timeline',
      category: 'Navigation',
      icon: Briefcase,
      action: () => {
        navigate('/experience')
        onClose()
      },
    },
    {
      id: 'nav-uses',
      title: 'Uses — Hardware, Tooling & Workflow',
      category: 'Navigation',
      icon: Wrench,
      action: () => {
        navigate('/uses')
        onClose()
      },
    },
    {
      id: 'nav-contact',
      title: 'Contact Om',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        navigate('/contact')
        onClose()
      },
    },

    // Projects deep-links
    ...projects.map((p) => ({
      id: `proj-${p.slug}`,
      title: `Case Study: ${p.title}`,
      category: 'Projects' as const,
      icon: FolderGit2,
      action: () => {
        navigate(`/projects/${p.slug}`)
        onClose()
      },
    })),

    // Quick Actions
    {
      id: 'act-terminal',
      title: 'Open Developer Terminal Emulator',
      category: 'Actions',
      icon: Terminal,
      shortcut: '`',
      action: () => {
        onClose()
        onOpenTerminal()
      },
    },
    {
      id: 'act-theme',
      title: 'Toggle Light / Dark Mode',
      category: 'Actions',
      icon: SunMoon,
      action: toggleTheme,
    },
    {
      id: 'act-email',
      title: 'Copy Email Address (omjyotiprakash4@gmail.com)',
      category: 'Actions',
      icon: Mail,
      action: copyEmail,
    },

    // Social Links
    {
      id: 'soc-github',
      title: 'GitHub Profile (@omjyotiprakash)',
      category: 'Social',
      icon: GithubIcon,
      action: () => {
        window.open('https://github.com/omjyotiprakash', '_blank', 'noreferrer')
        onClose()
      },
    },
    {
      id: 'soc-linkedin',
      title: 'LinkedIn Profile',
      category: 'Social',
      icon: LinkedinIcon,
      action: () => {
        window.open('https://linkedin.com/in/omjyotiprakash', '_blank', 'noreferrer')
        onClose()
      },
    },
  ]

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action()
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="command-palette-title"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 backdrop-blur-sm sm:pt-24"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="flex w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl transition-all">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
          <Search className="size-4 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            id="command-palette-title"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, page name, or project..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Command palette search"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Close command palette"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No matching pages or commands found for "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item, idx) => {
                const Icon = item.icon
                const isSelected = idx === selectedIndex
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={[
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors',
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-secondary',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={['size-4 shrink-0', isSelected ? 'text-primary-foreground' : 'text-muted-foreground'].join(' ')} />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          'text-[0.6875rem] uppercase tracking-wider',
                          isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground',
                        ].join(' ')}
                      >
                        {item.category}
                      </span>
                      {item.shortcut && (
                        <kbd
                          className={[
                            'rounded border px-1.5 py-0.5 font-mono text-[0.625rem]',
                            isSelected
                              ? 'border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground'
                              : 'border-border bg-secondary text-muted-foreground',
                          ].join(' ')}
                        >
                          {item.shortcut}
                        </kbd>
                      )}
                      <ArrowRight className={['size-3 opacity-60', isSelected ? 'opacity-100' : 'opacity-0'].join(' ')} />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-4 py-2 text-[0.6875rem] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono">↑</kbd>{' '}
              <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono">↵</kbd> to select
            </span>
          </div>
          <span>
            <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono">esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  )
}
