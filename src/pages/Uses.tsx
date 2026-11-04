import { Laptop, Wrench, Code2, Cloud } from 'lucide-react'
import { Meta } from '@/components/Meta'

interface UsesCategory {
  title: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  items: {
    name: string
    description: string
    tag: string
  }[]
}

const categories: UsesCategory[] = [
  {
    title: 'Hardware & Workstation',
    icon: Laptop,
    description: 'The physical equipment I rely on for daily development, building, and learning.',
    items: [
      {
        name: 'Windows 11 Development Machine',
        description: 'Primary workstation configured with WSL2 (Ubuntu), PowerShell 7, and Node.js LTS for full-stack builds.',
        tag: 'Computer',
      },
      {
        name: 'High-Resolution External Display',
        description: 'Secondary 24-inch monitor for side-by-side terminal logs, MongoDB Compass inspection, and mobile dev previews.',
        tag: 'Display',
      },
      {
        name: 'Tactile Keyboard & Precision Mouse',
        description: 'Comfortable mechanical keyboard with tactile switches for high-volume coding sessions.',
        tag: 'Peripherals',
      },
      {
        name: 'Noise-Isolating Headphones',
        description: 'For deep-focus programming flow and listening to film scores while debugging.',
        tag: 'Audio',
      },
    ],
  },
  {
    title: 'Code Editor & Terminal',
    icon: Code2,
    description: 'My primary coding environment, extensions, and shell configurations.',
    items: [
      {
        name: 'Visual Studio Code',
        description: 'Clean, distraction-free setup with minimal status bar, customized hotkeys, and integrated terminal.',
        tag: 'Editor',
      },
      {
        name: 'Tokyo Night & GitHub Dark High Contrast Themes',
        description: 'High-contrast, eye-friendly color palettes that make syntax errors immediately obvious.',
        tag: 'Theme',
      },
      {
        name: 'JetBrains Mono & Inter',
        description: 'JetBrains Mono with font ligatures for code; Inter for documentation and UI typography.',
        tag: 'Typography',
      },
      {
        name: 'Core VS Code Extensions',
        description: 'Tailwind CSS IntelliSense, ESLint, Prettier, GitLens, Pretty TypeScript Errors, Error Lens.',
        tag: 'Extensions',
      },
      {
        name: 'PowerShell & Bash via Git',
        description: 'Fast terminal navigation with custom aliases for Git commits, branch rebasing, and NPM scripts.',
        tag: 'Shell',
      },
    ],
  },
  {
    title: 'Development & Database Tools',
    icon: Wrench,
    description: 'Applications used for inspecting network traffic, querying databases, and testing APIs.',
    items: [
      {
        name: 'Postman',
        description: 'For constructing, testing, and documenting RESTful HTTP requests before writing frontend integration code.',
        tag: 'API Testing',
      },
      {
        name: 'MongoDB Compass',
        description: 'GUI for inspecting Atlas clusters, verifying compound indexes, and analyzing explain plans.',
        tag: 'Database',
      },
      {
        name: 'Chrome DevTools',
        description: 'Network tab inspection for payload sizes and waterfall analysis; Performance tab for frame rate drops.',
        tag: 'Diagnostics',
      },
      {
        name: 'Git & GitHub Desktop / CLI',
        description: 'Version control with semantic commits, PR reviews, and branch hygiene.',
        tag: 'Version Control',
      },
    ],
  },
  {
    title: 'Cloud & Infrastructure Services',
    icon: Cloud,
    description: 'Where my code runs, databases are hosted, and domains are managed.',
    items: [
      {
        name: 'Vercel',
        description: 'Global Edge network hosting React and Vite frontends with automatic CI/CD deployment pipelines.',
        tag: 'Frontend Edge',
      },
      {
        name: 'Render',
        description: 'Containerized hosting for Express and Node.js REST API web services.',
        tag: 'Backend Runtime',
      },
      {
        name: 'MongoDB Atlas',
        description: 'Cloud document database clusters with automated backups, monitoring, and index management.',
        tag: 'Cloud DB',
      },
      {
        name: 'GitHub',
        description: 'Code repositories, issue tracking, project boards, and release tagging.',
        tag: 'Hosting & CI',
      },
    ],
  },
]

export default function Uses() {
  return (
    <>
      <Meta
        title="Uses — Om Jyoti Prakash's Developer Setup & Tools"
        description="Detailed inventory of hardware, VS Code setup, terminal configurations, database tools, and cloud services used by Om Jyoti Prakash."
      />

      <main className="mx-auto max-w-content px-gutter py-12 md:py-20">
        {/* Header */}
        <div className="border-b border-border pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Developer Setup &amp; Tools
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,1.8rem+3vw,4.25rem)] text-foreground">
            What I Use
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
            A comprehensive list of hardware, software, editor configuration, database tools, and cloud platforms I use daily to build and test software.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-12 space-y-14">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <section key={category.title} className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-border pb-3">
                  <Icon className="size-5 text-primary" />
                  <h2 className="font-display text-2xl text-foreground">
                    {category.title}
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground -mt-3">
                  {category.description}
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium text-sm text-foreground">
                            {item.name}
                          </h3>
                          <span className="shrink-0 rounded bg-secondary px-2 py-0.5 font-mono text-[0.625rem] text-primary">
                            {item.tag}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>
    </>
  )
}
