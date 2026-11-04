import {
  GraduationCap,
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
} from 'lucide-react'
import { experience } from '@/data/site'
import { Meta } from '@/components/Meta'

export default function Experience() {
  return (
    <>
      <Meta
        title="Experience & Education — Om Jyoti Prakash"
        description="Educational qualifications at Nalanda Institute of Technology, practical internships at Be10x and OctaNet, and verified engineering competencies of Om Jyoti Prakash."
      />

      <main className="mx-auto max-w-content px-gutter py-12 md:py-20">
        {/* Header */}
        <div className="border-b border-border pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Career &amp; Academic Timeline
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,1.8rem+3vw,4.25rem)] text-foreground">
            Experience &amp; Education
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
            A transparent and honest record of my academic qualifications in Computer Science and Engineering, practical development internships, and foundational project milestones.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="mt-12 max-w-3xl space-y-12">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 md:p-8"
            >
              {/* Type badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  {item.type === 'education' ? (
                    <GraduationCap className="size-4 text-primary" />
                  ) : (
                    <Briefcase className="size-4 text-primary" />
                  )}
                  <span className="font-mono uppercase tracking-wider font-semibold text-primary">
                    {item.type === 'education' ? 'Academic Education' : 'Practical Internship'}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[0.6875rem]">
                  <Calendar className="size-3" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Title & Organization */}
              <div className="mt-4">
                <h2 className="font-display text-2xl text-foreground">
                  {item.role}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{item.organization}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-xs">
                    <MapPin className="size-3 text-primary" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>

              {/* Responsibilities list */}
              <div className="mt-5 space-y-2">
                <p className="font-semibold text-xs text-foreground uppercase tracking-wider">
                  Key Scope &amp; Learnings:
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {item.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-3.5 shrink-0 text-primary mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border pt-4">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Academic Coursework & Core Disciplines */}
          <div className="rounded-2xl border border-border bg-secondary/30 p-6 md:p-8 space-y-4">
            <h3 className="font-display text-xl text-foreground">
              Core Computer Science Curriculum
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed sm:text-sm">
              Academic coursework completed at Nalanda Institute of Technology, Bhubaneswar providing rigorous computer science foundations:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 pt-2 text-xs text-muted-foreground">
              <div className="rounded-lg border border-border bg-card p-3">
                <strong className="text-foreground">Data Structures &amp; Algorithms:</strong> Arrays, Linked Lists, Stacks, Queues, Binary Trees, Graphs, Sorting &amp; Searching algorithms.
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <strong className="text-foreground">Database Management Systems (DBMS):</strong> Relational algebra, SQL, normalization (1NF to BCNF), indexing, and transaction management.
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <strong className="text-foreground">Operating Systems &amp; Networking:</strong> Process scheduling, concurrency, virtual memory, TCP/IP stack, HTTP/HTTPS, and routing protocols.
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <strong className="text-foreground">Object-Oriented Programming (OOP):</strong> Encapsulation, inheritance, polymorphism, and abstraction implemented in Java and C++.
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
