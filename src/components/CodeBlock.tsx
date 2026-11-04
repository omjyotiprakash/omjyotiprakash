import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success('Code copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy code')
    }
  }

  const lines = code.trim().split('\n')

  return (
    <div className="group relative my-5 overflow-hidden rounded-xl border border-border bg-[#0d1117] text-[#e6edf3] shadow-raised">
      {/* Chrome header */}
      <div className="flex items-center justify-between border-b border-border/40 bg-[#161b22] px-4 py-2.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-red-500/70" />
          <span className="size-2.5 rounded-full bg-yellow-500/70" />
          <span className="size-2.5 rounded-full bg-green-500/70" />
          {filename && (
            <span className="ml-2 font-mono text-[0.75rem] text-[#c9d1d9]">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[#8b949e]">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-1 font-mono text-[0.6875rem] text-[#c9d1d9] transition-colors hover:border-[#8b949e] hover:text-white"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="size-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3 text-[#8b949e]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed">
        <pre className="flex">
          {showLineNumbers && (
            <div
              aria-hidden="true"
              className="mr-4 select-none text-right font-mono text-[0.75rem] text-[#484f58]"
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code className="flex-1 font-mono text-[#c9d1d9]">{code.trim()}</code>
        </pre>
      </div>
    </div>
  )
}
