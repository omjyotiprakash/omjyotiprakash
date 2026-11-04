import { Link } from 'react-router'

/* The mark: a note card with folded corner and three ruled lines, in one ink
   blue, no container. A note — because that is what QuickNote is, and what the
   whole site is: things written down and shipped. Two paths, no drawing tools. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M4.6 4.6h13.2l5.6 5.6v13.2H4.6z" />
      <path d="M17.4 4.8V10h5.4" />
      <path d="M8.6 14.6h10.4M8.6 18.6h7" />
    </svg>
  )
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 text-foreground ${className ?? ''}`}
      aria-label="Om Jyoti Prakash — home"
    >
      <BrandMark className="size-6 shrink-0 text-primary transition-colors duration-[var(--motion-fast)] group-hover:text-foreground" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em]">
          Om Jyoti Prakash
        </span>
        <span className="mt-1 font-label text-[0.5625rem] uppercase tracking-[0.16em] text-muted-foreground">
          Full-stack developer
        </span>
      </span>
    </Link>
  )
}
