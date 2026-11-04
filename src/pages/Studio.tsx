import { ArrowUpRight, Check, X, Minus } from 'lucide-react'
import { Link } from 'react-router'
import { ContactForm } from '@/components/ContactForm'
import { site } from '@/data/site'

const letter = [
  {
    n: '01',
    heading: 'What you get',
    items: [
      'A working app, not a mockup: screens, API and database wired together.',
      'React and TypeScript on the front, Node and Express behind it, MongoDB or SQL underneath.',
      'Authentication done properly — hashed passwords, tokens, routes that check them.',
      'Type, colour and spacing in one token file, so a later change is one edit, not fifty.',
    ],
  },
  {
    n: '02',
    heading: 'How the work runs',
    items: [
      'You write down what the product has to do; I read it back before writing code.',
      'One feature at a time, on a link you can open on your phone as it moves.',
      'Git branches and pull requests if you have a repository — you see each change before it lands.',
      'The code is yours, with notes on how to run and deploy it.',
    ],
  },
]

const wontDo = [
  'Claim a skill or a project I have not actually built.',
  'Publish invented testimonials, prices or awards to fill a section.',
  'Screenshot someone else’s site and call that a design.',
  'Take on three projects at once — the second and third get a worse result.',
]

const questions = [
  {
    q: 'What are you looking for right now?',
    a: 'A full-time or internship role in full-stack or frontend engineering, at a product company, a startup, or an established organisation. Freelance builds of a page or a small app are welcome too. Contract work, remote or in Bhubaneswar, is fine.',
  },
  {
    q: 'How much experience do you have?',
    a: 'I graduated in computer science from Nalanda Institute of Technology, and interned with Be10x and OctaNet in Bhubaneswar — both under three months, both practical rather than observational. The five projects on the home page are where most of my experience comes from: each was built, run and broken at least once.',
  },
  {
    q: 'Which parts are you strongest at?',
    a: 'The React frontend and the Node/Express API behind it, with MongoDB for data and JWT for auth — that is the loop I have run most often. Java, Python and SQL I am solid on from coursework but have used less in production, and I would rather say that than overstate it.',
  },
  {
    q: 'Do you work with AI in the code you write?',
    a: 'Yes, as a tool and increasingly as a feature. I use AI-assisted editors daily, and I am working on what it takes to put a model inside an application so it does real work rather than sitting in a chat box. I will not call a wrapper around an API an AI product.',
  },
  {
    q: 'Can you start right away?',
    a: 'Yes — I am not currently in a role. Send a brief or a job description and I will answer with what I can do and how long it would take, including what I would need to learn first.',
  },
]

export default function Studio() {
  return (
    <main>
      <a
        href="#brief"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to the brief
      </a>
      {/* the letterhead */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-40 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--primary)_9%,transparent),transparent)]"
        />
        <div className="relative mx-auto max-w-content px-gutter pb-14 pt-12 md:pt-16 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-primary">
                For hiring managers and clients
              </p>
              <h1
                className="mt-4 max-w-[15ch] font-display font-medium text-foreground"
                style={{ fontSize: 'var(--hero-size)', lineHeight: 'var(--heading-line)' }}
              >
                Hire me to build the app.
              </h1>
              <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
                Full-stack or frontend; a finished product, or a page that needs to look like
                someone chose it. I work from {site.location}, and I would rather show the work than
                the adjectives.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#brief"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-label text-sm font-medium text-primary-foreground transition-colors duration-[var(--motion-fast)] hover:bg-foreground"
                >
                  Send a brief
                  <ArrowUpRight
                    className="size-4 transition-transform duration-[var(--motion-fast)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
                <Link
                  to="/#work"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-6 font-label text-sm font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-secondary"
                >
                  Back to the work
                </Link>
              </div>
            </div>

            <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-card">
              {[
                ['Education', site.degree],
                ['Institute', 'Nalanda Institute of Technology'],
                ['Stack', 'MERN — React, Node, MongoDB'],
                ['Looking for', 'Full-time / internship'],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={[
                    'p-4 md:p-5',
                    i % 2 === 0 ? 'border-r border-border' : '',
                    i < 2 ? 'border-b border-border' : '',
                  ].join(' ')}
                >
                  <dt className="font-label text-[0.5625rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[0.8125rem] leading-snug text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* the terms, as a letter — two columns, no cards */}
      <section aria-labelledby="terms-heading" className="border-b border-border bg-sunken">
        <div className="mx-auto max-w-content px-gutter py-section">
          <h2 id="terms-heading" className="sr-only">
            The terms of the work
          </h2>
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            {letter.map((block) => (
              <div key={block.heading}>
                <div className="flex items-baseline gap-3 border-t-2 border-foreground pt-4">
                  <span className="font-mono text-[0.6875rem] text-primary">{block.n}</span>
                  <h3 className="font-display text-[1.5rem] font-medium text-foreground">
                    {block.heading}
                  </h3>
                </div>
                <ul className="mt-5 space-y-3.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-foreground/85">
                      <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-border bg-background p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <X className="size-4" aria-hidden="true" />
              </span>
              <h3 className="font-display text-[1.25rem] font-medium text-foreground">
                What I will not do
              </h3>
            </div>
            <ul className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
              {wontDo.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <Minus className="mt-1.5 size-3.5 shrink-0 text-destructive" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* questions, as a definition list with the rules doing the work */}
      <section aria-labelledby="questions-heading" className="border-b border-border">
        <div className="mx-auto grid max-w-content gap-10 px-gutter py-section lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-primary">
              Asked and answered
            </p>
            <h2
              id="questions-heading"
              className="mt-3 max-w-[14ch] font-display font-medium text-foreground"
              style={{ fontSize: 'var(--display-size)', lineHeight: 'var(--heading-line)' }}
            >
              The five questions this page gets
            </h2>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              Answered plainly, gaps included — a brief that skips them costs more later.
            </p>
          </div>

          <dl className="divide-y divide-border border-t border-border">
            {questions.map((q, i) => (
              <div key={q.q} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 py-6">
                <dt className="col-start-2 font-display text-[1.1875rem] leading-snug text-foreground">
                  {q.q}
                </dt>
                <dd className="col-start-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {q.a}
                </dd>
                <span
                  aria-hidden="true"
                  className="col-start-1 row-start-1 row-span-2 pt-1 font-mono text-[0.625rem] text-primary"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* the brief */}
      <section id="brief" className="scroll-mt-24 bg-accent">
        <div className="mx-auto grid max-w-content gap-12 px-gutter py-section md:grid-cols-[0.92fr_1.08fr] md:gap-16">
          <div>
            <h2
              className="max-w-[15ch] font-display font-medium text-foreground"
              style={{ fontSize: 'var(--display-size)', lineHeight: 'var(--heading-line)' }}
            >
              Send the brief
            </h2>
            <p className="mt-5 max-w-[42ch] leading-relaxed text-muted-foreground">
              Tell me the product, the stack if you have one, and the one thing it has to do. A
              job description works just as well. That is enough to start.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              Or write directly to{' '}
              <a
                href={`mailto:${site.email}`}
                className="break-all font-medium text-primary underline underline-offset-4"
              >
                {site.email}
              </a>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
