import { useState } from 'react'
import {
  MapPin,
  Copy,
  Check,
  Send,
  ArrowUpRight,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/Icons'
import { site } from '@/data/site'
import { Meta } from '@/components/Meta'
import { toast } from 'sonner'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopiedEmail(true)
      toast.success('Email copied to clipboard: ' + site.email)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      toast.error('Failed to copy email address')
    }
  }

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!name.trim()) errors.name = 'Please enter your name.'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please provide a valid email address.'
    }
    if (!subject.trim()) errors.subject = 'Please enter a subject.'
    if (message.trim().length < 10) {
      errors.message = 'Please write at least 10 characters so I know how to help.'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate sending with network delay, then offer fallback mailto
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSent(true)
      toast.success('Message drafted! Opening email client...')

      // Generate mailto link
      const mailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      const mailtoUrl = `mailto:${site.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(mailBody)}`

      window.location.href = mailtoUrl
    }, 700)
  }

  return (
    <>
      <Meta
        title="Contact Om Jyoti Prakash — Software Engineer"
        description="Get in touch with Om Jyoti Prakash for full-time software engineering roles, internships, or select product development projects."
      />

      <main className="mx-auto max-w-content px-gutter py-12 md:py-20">
        {/* Header */}
        <div className="border-b border-border pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Initiate Conversation
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,1.8rem+3vw,4.25rem)] text-foreground">
            Get in Touch
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
            I am currently open to full-time junior and mid-level software engineering roles, internships, and selective product builds. Feel free to send a message or connect directly.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Left Column: Direct Info & Availability */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6">
              <h2 className="font-display text-xl text-foreground">
                Direct Contact &amp; Profiles
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <span className="text-muted-foreground font-mono text-xs">Direct Email:</span>
                  <div className="mt-1 flex items-center gap-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
                    >
                      {site.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex size-7 items-center justify-center rounded border border-border bg-secondary text-muted-foreground hover:text-foreground"
                      title="Copy email address"
                    >
                      {copiedEmail ? (
                        <Check className="size-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground font-mono text-xs">Physical Location:</span>
                  <p className="mt-1 flex items-center gap-1.5 font-medium text-foreground">
                    <MapPin className="size-4 text-primary" />
                    <span>{site.location} (Open to remote roles &amp; relocation)</span>
                  </p>
                </div>

                <div>
                  <span className="text-muted-foreground font-mono text-xs">Profiles:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <a
                      href={site.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-foreground hover:bg-secondary"
                    >
                      <GithubIcon className="size-3.5" />
                      <span>GitHub</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-foreground hover:bg-secondary"
                    >
                      <LinkedinIcon className="size-3.5" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Opportunities Scope Box */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground/90 space-y-2">
                <p className="font-semibold text-primary">
                  Opportunities Welcomed:
                </p>
                <ul className="space-y-1.5 text-muted-foreground">
                  <li>✔ Full-time Frontend, Backend, or Full-Stack Engineer roles</li>
                  <li>✔ Software Engineering internships with real production scope</li>
                  <li>✔ Architecture consulting or select freelance web builds</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-xl text-foreground">
              Send a Direct Message
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Fill out the form below; the message will also be handed to your default email client for your records.
            </p>

            {isSent ? (
              <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-4">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                  <Check className="size-6" />
                </div>
                <h3 className="font-display text-lg text-foreground font-semibold">
                  Thank You for Reaching Out
                </h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Your email client has been prepared with your message. If it didn't open automatically, write directly to <a href={`mailto:${site.email}`} className="text-primary underline">{site.email}</a>.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="inline-flex rounded-full border border-border px-4 py-1.5 font-label text-xs hover:bg-secondary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="font-mono text-xs text-muted-foreground">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="mt-1 h-11 w-full rounded-lg border border-border bg-secondary/30 px-3 text-xs text-foreground outline-none focus:border-primary"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-[0.6875rem] text-rose-500">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="font-mono text-xs text-muted-foreground">
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@company.com"
                      className="mt-1 h-11 w-full rounded-lg border border-border bg-secondary/30 px-3 text-xs text-foreground outline-none focus:border-primary"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-[0.6875rem] text-rose-500">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="font-mono text-xs text-muted-foreground">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Full-Stack Engineer Role / Project Discussion"
                    className="mt-1 h-11 w-full rounded-lg border border-border bg-secondary/30 px-3 text-xs text-foreground outline-none focus:border-primary"
                  />
                  {formErrors.subject && (
                    <p className="mt-1 text-[0.6875rem] text-rose-500">{formErrors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="font-mono text-xs text-muted-foreground">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about the role, team, project, or what you'd like to discuss..."
                    className="mt-1 w-full rounded-lg border border-border bg-secondary/30 p-3 text-xs text-foreground outline-none focus:border-primary leading-relaxed"
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-[0.6875rem] text-rose-500">{formErrors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground font-label text-xs font-semibold text-background transition-all hover:bg-primary disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="size-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
