import { useState, useRef, useEffect, type FormEvent } from 'react'
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react'
import { useNavigate } from 'react-router'
import { site, projects, skills, experience, currentlyExploring } from '@/data/site'

interface TerminalModalProps {
  open: boolean
  onClose: () => void
}

interface OutputEntry {
  type: 'command' | 'response' | 'error' | 'system'
  text?: string
  jsx?: React.ReactNode
}

export function TerminalModal({ open, onClose }: TerminalModalProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [fullscreen, setFullscreen] = useState(false)
  const [outputs, setOutputs] = useState<OutputEntry[]>([
    {
      type: 'system',
      text: 'Om Jyoti Prakash — Terminal Engine v1.0.4 [Odisha, India]\nType "help" for a list of available engineering commands.',
    },
  ])

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [outputs])

  if (!open) return null

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    setHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    const parts = trimmed.split(' ')
    const root = parts[0].toLowerCase()
    const arg = parts.slice(1).join(' ')

    const newOutputs: OutputEntry[] = [
      ...outputs,
      { type: 'command', text: trimmed },
    ]

    switch (root) {
      case 'help':
        newOutputs.push({
          type: 'response',
          jsx: (
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Available Commands:</p>
              <div className="grid grid-cols-[120px_1fr] gap-x-2 gap-y-1">
                <span className="font-mono text-primary">about</span>
                <span>Bio, educational background, and engineering focus</span>
                <span className="font-mono text-primary">projects</span>
                <span>List featured engineering projects</span>
                <span className="font-mono text-primary">project &lt;slug&gt;</span>
                <span>Navigate to specific project case study</span>
                <span className="font-mono text-primary">skills</span>
                <span>Display categorized technical competencies</span>
                <span className="font-mono text-primary">experience</span>
                <span>Education and verified internships</span>
                <span className="font-mono text-primary">lab</span>
                <span>Navigate to interactive developer workbench</span>
                <span className="font-mono text-primary">writing</span>
                <span>Engineering journal articles and guides</span>
                <span className="font-mono text-primary">now</span>
                <span>Current explorations, learning, and goals</span>
                <span className="font-mono text-primary">uses</span>
                <span>Hardware, VS Code config, and tooling setup</span>
                <span className="font-mono text-primary">contact</span>
                <span>Email and social profiles</span>
                <span className="font-mono text-primary">theme</span>
                <span>Toggle between light and dark modes</span>
                <span className="font-mono text-primary">whoami</span>
                <span>Display current session metadata</span>
                <span className="font-mono text-primary">clear</span>
                <span>Clear terminal console output</span>
                <span className="font-mono text-primary">exit</span>
                <span>Close this terminal emulator</span>
              </div>
            </div>
          ),
        })
        break

      case 'about':
        newOutputs.push({
          type: 'response',
          jsx: (
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-foreground">{site.name}</p>
              <p className="text-muted-foreground">{site.title}</p>
              <p className="text-foreground/90">{site.supporting}</p>
              <p className="text-muted-foreground">
                📍 {site.location} · {site.education.degree} ({site.education.institution})
              </p>
            </div>
          ),
        })
        break

      case 'projects':
        newOutputs.push({
          type: 'response',
          jsx: (
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-foreground">Featured Projects:</p>
              {projects.map((p, i) => (
                <div key={p.slug} className="flex items-start gap-2 border-l border-border pl-2">
                  <span className="font-mono text-primary">0{i + 1}</span>
                  <div>
                    <span className="font-semibold text-foreground">{p.title}</span> —{' '}
                    <span className="text-muted-foreground">{p.tagline}</span>
                    <div className="mt-0.5 font-mono text-[0.6875rem] text-primary">
                      {p.stack.join(' · ')}
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-[0.6875rem] text-muted-foreground">
                Tip: type <code className="text-primary">project quicknote</code> to open case study.
              </p>
            </div>
          ),
        })
        break

      case 'project': {
        const target = projects.find((p) => p.slug === arg.toLowerCase())
        if (target) {
          newOutputs.push({
            type: 'response',
            text: `Navigating to case study: ${target.title}...`,
          })
          setTimeout(() => {
            onClose()
            navigate(`/projects/${target.slug}`)
          }, 400)
        } else {
          newOutputs.push({
            type: 'error',
            text: `Project "${arg}" not found. Type "projects" to see available slugs: ${projects.map((p) => p.slug).join(', ')}`,
          })
        }
        break
      }

      case 'skills':
        newOutputs.push({
          type: 'response',
          jsx: (
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-foreground">Technical Competencies:</p>
              {skills.map((cat) => (
                <div key={cat.title}>
                  <span className="font-semibold text-primary">{cat.title}: </span>
                  <span className="text-muted-foreground">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          ),
        })
        break

      case 'experience':
        newOutputs.push({
          type: 'response',
          jsx: (
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-foreground">Verified Background:</p>
              {experience.map((exp, i) => (
                <div key={i} className="border-l border-primary/40 pl-2">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="font-semibold text-foreground">{exp.role}</span>
                    <span className="font-mono text-[0.6875rem]">{exp.period}</span>
                  </div>
                  <p className="text-muted-foreground">{exp.organization} · {exp.location}</p>
                </div>
              ))}
            </div>
          ),
        })
        break

      case 'lab':
        newOutputs.push({ type: 'response', text: 'Opening Lab / Developer Workbench...' })
        setTimeout(() => {
          onClose()
          navigate('/lab')
        }, 300)
        break

      case 'writing':
        newOutputs.push({ type: 'response', text: 'Opening Engineering Journal...' })
        setTimeout(() => {
          onClose()
          navigate('/writing')
        }, 300)
        break

      case 'now':
        newOutputs.push({
          type: 'response',
          jsx: (
            <div className="space-y-1.5 text-xs">
              <p className="font-semibold text-foreground">What Om is currently focused on:</p>
              {currentlyExploring.map((item) => (
                <div key={item.title}>
                  <span className="font-semibold text-primary">{item.title}: </span>
                  <span className="text-muted-foreground">{item.summary}</span>
                </div>
              ))}
            </div>
          ),
        })
        break

      case 'uses':
        newOutputs.push({ type: 'response', text: 'Opening Uses & Developer Tooling page...' })
        setTimeout(() => {
          onClose()
          navigate('/uses')
        }, 300)
        break

      case 'contact':
        newOutputs.push({
          type: 'response',
          jsx: (
            <div className="space-y-1 text-xs">
              <p className="font-semibold text-foreground">Get in Touch:</p>
              <p>Email: <a href={`mailto:${site.email}`} className="text-primary underline">{site.email}</a></p>
              <p>GitHub: <a href={site.github} target="_blank" rel="noreferrer" className="text-primary underline">{site.github}</a></p>
              <p>LinkedIn: <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-primary underline">{site.linkedin}</a></p>
            </div>
          ),
        })
        break

      case 'theme': {
        const isDark = document.documentElement.classList.contains('dark')
        const next = !isDark
        document.documentElement.classList.toggle('dark', next)
        try {
          localStorage.setItem('theme', next ? 'dark' : 'light')
        } catch {}
        newOutputs.push({
          type: 'response',
          text: `Theme switched to: ${next ? 'Dark' : 'Light'} Mode.`,
        })
        break
      }

      case 'whoami':
        newOutputs.push({
          type: 'response',
          text: `guest@portfolio [session: ${Math.random().toString(36).slice(2, 8)}] - Verified visitor to Om's digital HQ.`,
        })
        break

      case 'date':
        newOutputs.push({
          type: 'response',
          text: new Date().toString(),
        })
        break

      case 'clear':
        setOutputs([])
        return

      case 'exit':
      case 'quit':
        onClose()
        return

      default:
        newOutputs.push({
          type: 'error',
          text: `Command not recognized: "${trimmed}". Type "help" to see available commands.`,
        })
    }

    setOutputs(newOutputs)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleCommand(input)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex])
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={[
          'flex flex-col overflow-hidden rounded-xl border border-border bg-[#0c1017] text-[#e6edf3] shadow-2xl transition-all duration-200',
          fullscreen ? 'h-[95vh] w-[95vw]' : 'h-[32rem] w-full max-w-3xl',
        ].join(' ')}
      >
        {/* Terminal Titlebar */}
        <div className="flex h-10 items-center justify-between border-b border-border/40 bg-[#161b22] px-4">
          <div className="flex items-center gap-2">
            <TerminalIcon className="size-4 text-primary" aria-hidden="true" />
            <span id="terminal-title" className="font-mono text-xs font-medium text-[#c9d1d9]">
              om@engineer-hq: ~ (bash)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFullscreen(!fullscreen)}
              className="rounded p-1 text-[#8b949e] hover:bg-[#21262d] hover:text-[#c9d1d9]"
              aria-label={fullscreen ? 'Restore window size' : 'Maximize terminal'}
            >
              {fullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-[#8b949e] hover:bg-red-950/60 hover:text-red-400"
              aria-label="Close terminal"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Console Body */}
        <div
          className="flex-1 overflow-y-auto p-4 font-mono text-[0.8125rem] leading-relaxed selection:bg-primary/30"
          onClick={() => inputRef.current?.focus()}
        >
          {outputs.map((entry, idx) => (
            <div key={idx} className="mb-2">
              {entry.type === 'command' && (
                <div className="flex items-center gap-2 text-foreground/70">
                  <span className="text-emerald-400">om@engine:~$</span>
                  <span className="font-semibold text-white">{entry.text}</span>
                </div>
              )}
              {entry.type === 'system' && (
                <div className="whitespace-pre-line text-[#8b949e]">{entry.text}</div>
              )}
              {entry.type === 'response' && (
                <div>
                  {entry.text && <div className="whitespace-pre-line text-[#c9d1d9]">{entry.text}</div>}
                  {entry.jsx}
                </div>
              )}
              {entry.type === 'error' && (
                <div className="text-rose-400">{entry.text}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input prompt */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border/40 bg-[#161b22] px-4 py-2.5"
        >
          <span className="font-mono text-xs text-emerald-400" aria-hidden="true">
            om@engine:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent font-mono text-xs text-[#e6edf3] outline-none placeholder:text-[#484f58]"
            placeholder="Type 'help' for commands..."
            autoFocus
            aria-label="Terminal command input"
          />
          <button
            type="submit"
            className="rounded p-1 text-[#8b949e] hover:text-[#c9d1d9]"
            aria-label="Submit command"
          >
            <CornerDownLeft className="size-3.5" />
          </button>
        </form>
      </div>
    </div>
  )
}
