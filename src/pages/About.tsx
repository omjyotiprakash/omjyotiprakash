import { Link } from 'react-router'
import {
  ArrowUpRight,
  Film,
  MapPin,
} from 'lucide-react'
import { site } from '@/data/site'
import { Meta } from '@/components/Meta'

export default function About() {
  return (
    <>
      <Meta
        title="About Om Jyoti Prakash — Software Engineer & Full-Stack Developer"
        description="Learn about Om Jyoti Prakash: educational background at Nalanda Institute of Technology, development journey, technical philosophy, and creative pursuits in cinema and storytelling."
      />

      <main className="mx-auto max-w-content px-gutter py-12 md:py-20">
        {/* Editorial Header */}
        <div className="border-b border-border pb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Profile · Background · Philosophy
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,1.8rem+3.5vw,4.5rem)] leading-[1.04] text-foreground">
            Om Jyoti Prakash
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Full-stack developer based in Odisha, India. Focused on building dependable web applications, thoughtful digital products, and practical AI integrations.
          </p>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="mt-12 grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Main Story Column */}
          <div className="space-y-12 text-foreground/90">
            {/* 1. The Journey & Education */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                The Foundation &amp; Development Journey
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                My journey into software engineering began during my Bachelor of Technology program in Computer Science and Engineering at{' '}
                <strong className="text-foreground">Nalanda Institute of Technology, Bhubaneswar</strong>. While academic courses laid down the mathematical and theoretical bedrock — data structures, object-oriented design in Java and C++, relational database normalization, and operating system scheduling — I quickly realized that theoretical knowledge only becomes truly valuable when translated into software that real people can use.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                I spent hours building outside the curriculum: taking ideas from a blank text editor, wrestling with asynchronous JavaScript closures, deciphering HTTP response headers, and learning how database queries behave under real network latency.
              </p>
            </section>

            {/* 2. Transition to Full-Stack Engineering */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                Transition to Practical Full-Stack Engineering
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                As I moved deeper into web technologies, I chose to specialize in the modern JavaScript and TypeScript ecosystem — specifically the <strong className="text-foreground">MERN stack (MongoDB, Express, React, Node.js)</strong>.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Rather than jumping between twelve different frameworks, I committed to mastering the fundamental cycle: building component-driven single-page applications with React, writing stateless REST APIs with Express, designing compound-indexed schemas with Mongoose and MongoDB Atlas, and securing endpoints with signed JSON Web Tokens and bcrypt.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Building applications like <strong className="text-foreground">QuickNote</strong> and the <strong className="text-foreground">Food Delivery Platform</strong> taught me what textbooks rarely mention: debugging CORS preflight failures on distributed free-tier hosts, preventing client-side price tampering through server reconciliation, and managing file uploads with Multer without memory leaks.
              </p>
            </section>

            {/* 3. Emerging Technologies & AI Integration */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground">
                Pragmatic AI &amp; Emerging Technologies
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                I am deeply fascinated by the potential of artificial intelligence, but my approach is grounded in pragmatism. I do not believe in wrapping an LLM API in a chat window and declaring it an "AI application."
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Instead, I focus on how intelligent models can be woven directly into user workflows — extracting structured, schema-validated JSON with tools like Zod, augmenting search indexing, classifying data, and assisting users with tasks while ensuring deterministic fallback algorithms protect the system when an external service is unavailable.
              </p>
            </section>

            {/* 4. Beyond the Code: Cinema & Storytelling */}
            <section className="space-y-4 rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
                <Film className="size-4" />
                <span>Beyond the Code</span>
              </div>
              <h2 className="font-display text-2xl text-foreground">
                Cinema, Storytelling &amp; Creative Thinking
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                When I am not writing code, you will almost certainly find me watching, studying, or discussing cinema. Great films — like those by Wong Kar-wai, Denis Villeneuve, Celine Song, or Christopher Nolan — are masterclasses in pacing, narrative architecture, and emotional economy.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                I find that the principles of cinematic storytelling translate directly to good software engineering:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">·</span>
                  <span><strong>Rhythm &amp; Timing:</strong> Just as a film editor cuts unnecessary footage, good software eliminates redundant layout shifts and latency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">·</span>
                  <span><strong>Narrative Clarity:</strong> A user navigating a product should never be confused about where they came from or what happens next.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">·</span>
                  <span><strong>Cinequirk:</strong> My project Cinequirk was born directly out of this passion: building a dedicated, database-backed platform to catalog, review, and curate film records with structured metadata.</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar Factsheet & Portrait */}
          <aside className="space-y-8">
            {/* Editorial Portrait Frame Placeholder */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-b from-secondary via-secondary/70 to-card flex flex-col items-center justify-center p-6 text-center border border-border/60">
                <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary font-display text-3xl font-bold">
                  OP
                </div>
                <div className="mt-4">
                  <p className="font-display text-lg text-foreground font-semibold">
                    Om Jyoti Prakash
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Software Engineer · Full-Stack Developer
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 font-mono text-[0.6875rem] text-muted-foreground">
                  <MapPin className="size-3 text-primary" />
                  <span>Odisha, India</span>
                </div>
                <p className="mt-4 text-[0.6875rem] text-muted-foreground/80 italic">
                  [Photograph placeholder · Replaceable with official portrait]
                </p>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
              <h3 className="font-label text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Engineering Factsheet
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Degree</span>
                  <p className="mt-0.5 font-medium text-foreground">{site.education.degree}</p>
                </div>

                <div>
                  <span className="text-muted-foreground">Alma Mater</span>
                  <p className="mt-0.5 font-medium text-foreground">{site.education.institution}</p>
                </div>

                <div>
                  <span className="text-muted-foreground">Internships</span>
                  <p className="mt-0.5 font-medium text-foreground">Be10x · OctaNet</p>
                </div>

                <div>
                  <span className="text-muted-foreground">Core Competencies</span>
                  <p className="mt-0.5 font-mono text-primary">
                    React · Node.js · Express · MongoDB · TypeScript · Tailwind · REST APIs
                  </p>
                </div>

                <div>
                  <span className="text-muted-foreground">Location</span>
                  <p className="mt-0.5 font-medium text-foreground">Bhubaneswar, Odisha, India</p>
                </div>

                <div>
                  <span className="text-muted-foreground">Availability</span>
                  <p className="mt-0.5 text-emerald-600 dark:text-emerald-400 font-medium">
                    Available for full-time junior/mid software engineering roles &amp; internships
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-foreground py-2.5 font-label text-xs font-medium text-background transition-colors hover:bg-primary"
                >
                  Get in touch
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}
