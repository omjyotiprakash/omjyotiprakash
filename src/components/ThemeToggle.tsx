import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark'

const KEY = 'ojp-theme'

/* The visitor's choice is theirs: it is stored, and it survives a reload. With
   nothing stored the site stays on the light scheme it was designed around —
   the OS setting colours the first paint only through index.css. */
function read(): Theme | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'dark' || v === 'light' ? v : null
  } catch {
    return null
  }
}

function apply(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(
    () => read() ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light'),
  )

  useEffect(() => {
    apply(theme)
  }, [theme])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* Private mode: the choice still holds for this visit. */
    }
  }

  const target = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${target} theme`}
      title={`Switch to ${target} theme`}
      className={cn(
        'group inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-[var(--motion-fast)] hover:border-foreground/30 hover:text-foreground',
        className,
      )}
    >
      <span className="relative inline-flex size-5 items-center justify-center">
        <Sun
          aria-hidden="true"
          className="absolute size-[1.05rem] scale-100 rotate-0 transition-[transform,opacity] duration-[var(--motion-fast)] group-hover:scale-110 [.dark_&]:scale-50 [.dark_&]:opacity-0"
        />
        <Moon
          aria-hidden="true"
          className="absolute size-[1.05rem] scale-50 opacity-0 transition-[transform,opacity] duration-[var(--motion-fast)] group-hover:scale-110 [.dark_&]:scale-100 [.dark_&]:opacity-100"
        />
      </span>
    </button>
  )
}
