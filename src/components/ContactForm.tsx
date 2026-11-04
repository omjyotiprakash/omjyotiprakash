import { useId, useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { site } from '@/data/site'

type Errors = { name?: string; email?: string; message?: string }

const field =
  'h-11 w-full rounded-md border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground'

/* No backend exists here, so the form says so. It validates, then hands the
   visitor a real mailto with everything they typed, and says what it did. */
export function ContactForm() {
  const id = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  function validate(): Errors {
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'A name, so I know who I am answering.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'An address I can reply to.'
    if (message.trim().length < 12) next.message = 'A sentence or two about the work.'
    return next
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      setSent(false)
      return
    }
    const body = `${message}\n\n— ${name} (${email})`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Hello from ${name}`,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-foreground/10 bg-background p-6 md:p-8">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-display text-xl text-foreground">
          Your mail app should be opening
        </h3>
        <p className="mt-2 max-w-[46ch] text-sm text-muted-foreground">
          This page has no server behind it, so nothing was sent from here — the message is
          handed to your own email app, addressed to {site.email}. If nothing opened, copy the
          address and write to me directly.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button asChild variant="outline" className="h-11">
            <a href={`mailto:${site.email}`}>Open email instead</a>
          </Button>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Edit the message
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-foreground/10 bg-background p-5 md:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <Label htmlFor={`${id}-name`} className="text-sm text-foreground">
            Your name
          </Label>
          <Input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={field}
            placeholder="Who is writing"
          />
          {errors.name && (
            <p id={`${id}-name-err`} className="mt-1.5 text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div className="sm:col-span-1">
          <Label htmlFor={`${id}-email`} className="text-sm text-foreground">
            Your email
          </Label>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
            className={field}
            placeholder="name@example.com"
          />
          {errors.email && (
            <p id={`${id}-email-err`} className="mt-1.5 text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor={`${id}-message`} className="text-sm text-foreground">
          What are you working on
        </Label>
        <Textarea
          id={`${id}-message`}
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-message-err` : `${id}-message-hint`}
          rows={5}
          className="mt-1 min-h-28 w-full rounded-md border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
            placeholder="A role, an app, or a page — one sentence is enough."
        />
        {errors.message ? (
          <p id={`${id}-message-err`} className="mt-1.5 text-xs text-destructive">
            {errors.message}
          </p>
        ) : (
          <p id={`${id}-message-hint`} className="mt-1.5 text-xs text-muted-foreground">
            This form opens your own mail app — no message is stored on this site.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" className="h-12 px-5">
          Send the note
          <ArrowRight aria-hidden="true" />
        </Button>
        <p className="text-xs text-muted-foreground">
          Replies come from {site.email}, usually within a day or two.
        </p>
      </div>
    </form>
  )
}
