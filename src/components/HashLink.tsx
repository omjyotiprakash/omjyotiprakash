import type { ReactNode } from 'react'
import { useLocation } from 'react-router'

/* An in-page jump that works from any route: on the page it scrolls normally,
   from elsewhere it navigates to "/" with the hash and lets the browser land. */
export function HashLink({
  to,
  className,
  children,
  onNavigate,
}: {
  to: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
}) {
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  return (
    <a
      href={onHome ? to : `/${to}`}
      className={className}
      onClick={() => {
        onNavigate?.()
        if (onHome) {
          const id = to.replace('#', '')
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }}
    >
      {children}
    </a>
  )
}
