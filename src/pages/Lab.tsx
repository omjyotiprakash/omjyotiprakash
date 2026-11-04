import { useState } from 'react'
import {
  FlaskConical,
  Play,
  Copy,
  Send,
  Code2,
  FileJson,
  Eye,
  Palette,
  Database,
  RefreshCw,
} from 'lucide-react'
import {
  mockEndpoints,
  sampleJsonStrings,
  sampleMarkdown,
  safePlaygroundSnippets,
  type MockEndpoint,
} from '@/data/labTools'
import { Meta } from '@/components/Meta'
import { toast } from 'sonner'

export default function Lab() {
  const [activeTool, setActiveTool] = useState<
    'api' | 'json' | 'markdown' | 'playground' | 'palette' | 'db'
  >('api')

  /* ---------------- 1. API EXPLORER STATE ---------------- */
  const [selectedEndpoint, setSelectedEndpoint] = useState<MockEndpoint>(mockEndpoints[0])
  const [apiLoading, setApiLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState<any>(mockEndpoints[0].responseBody)
  const [apiStatus, setApiStatus] = useState<number>(mockEndpoints[0].responseStatus)
  const [apiLatency, setApiLatency] = useState<number>(mockEndpoints[0].responseLatencyMs)

  const handleSendApi = () => {
    setApiLoading(true)
    const simulatedDelay = selectedEndpoint.responseLatencyMs + Math.floor(Math.random() * 30 - 15)
    setTimeout(() => {
      setApiResponse(selectedEndpoint.responseBody)
      setApiStatus(selectedEndpoint.responseStatus)
      setApiLatency(simulatedDelay)
      setApiLoading(false)
      toast.success(`HTTP ${selectedEndpoint.method} executed (${simulatedDelay}ms)`)
    }, simulatedDelay)
  }

  /* ---------------- 2. JSON FORMATTER STATE ---------------- */
  const [jsonInput, setJsonInput] = useState(sampleJsonStrings.packageJson)
  const [jsonError, setJsonError] = useState<string | null>(null)
  const [jsonFormatted, setJsonFormatted] = useState(sampleJsonStrings.packageJson)

  const formatJson = (spaces = 2) => {
    try {
      const parsed = JSON.parse(jsonInput)
      const formatted = JSON.stringify(parsed, null, spaces)
      setJsonFormatted(formatted)
      setJsonError(null)
      toast.success('JSON formatted successfully')
    } catch (err: any) {
      setJsonError(err.message)
      toast.error('Invalid JSON syntax')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const minified = JSON.stringify(parsed)
      setJsonFormatted(minified)
      setJsonError(null)
      toast.success('JSON minified')
    } catch (err: any) {
      setJsonError(err.message)
      toast.error('Invalid JSON syntax')
    }
  }

  /* ---------------- 3. MARKDOWN PREVIEWER STATE ---------------- */
  const [markdownInput, setMarkdownInput] = useState(sampleMarkdown)

  /* ---------------- 4. JS PLAYGROUND STATE ---------------- */
  const [playgroundCode, setPlaygroundCode] = useState(safePlaygroundSnippets[0].code)
  const [playgroundOutput, setPlaygroundOutput] = useState<string>('Click "Run Code" to execute.')
  const [playgroundExecutionTime, setPlaygroundExecutionTime] = useState<number | null>(null)

  const runPlayground = () => {
    try {
      const startTime = performance.now()
      // Execute in isolated function context
      const runFn = new Function(playgroundCode)
      const result = runFn()
      const elapsed = performance.now() - startTime
      setPlaygroundOutput(JSON.stringify(result, null, 2))
      setPlaygroundExecutionTime(Math.round(elapsed * 100) / 100)
      toast.success('Execution successful')
    } catch (err: any) {
      setPlaygroundOutput(`Error: ${err.message}`)
      setPlaygroundExecutionTime(null)
      toast.error('Execution failed')
    }
  }

  /* ---------------- 5. OKLCH COLOR STUDIO STATE ---------------- */
  const [lightness, setLightness] = useState(0.55)
  const [chroma, setChroma] = useState(0.18)
  const [hue, setHue] = useState(260)

  const currentColorOklch = `oklch(${lightness} ${chroma} ${hue})`

  return (
    <>
      <Meta
        title="Lab & Experiments — Om Jyoti Prakash"
        description="Interactive software workbench: test simulated REST endpoints, format JSON payloads, preview markdown live, run JavaScript logic, and explore database relationships."
      />

      <main className="mx-auto max-w-content px-gutter py-12 md:py-20">
        {/* Header */}
        <div className="border-b border-border pb-10">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
            <FlaskConical className="size-4" />
            <span>Interactive Engineering Workbench</span>
          </div>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,1.8rem+3vw,4.25rem)] text-foreground">
            The Lab
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Functional tools and prototypes built to test software logic, inspect system payloads, and simulate real application behavior. Every experiment here is fully functional.
          </p>
        </div>

        {/* Experiment Navigation Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4" role="tablist">
          <button
            type="button"
            onClick={() => setActiveTool('api')}
            className={[
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-label text-xs transition-colors',
              activeTool === 'api'
                ? 'bg-foreground font-medium text-background'
                : 'border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground',
            ].join(' ')}
          >
            <Send className="size-3.5" />
            REST API Explorer
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('json')}
            className={[
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-label text-xs transition-colors',
              activeTool === 'json'
                ? 'bg-foreground font-medium text-background'
                : 'border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground',
            ].join(' ')}
          >
            <FileJson className="size-3.5" />
            JSON Formatter &amp; Validator
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('markdown')}
            className={[
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-label text-xs transition-colors',
              activeTool === 'markdown'
                ? 'bg-foreground font-medium text-background'
                : 'border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground',
            ].join(' ')}
          >
            <Eye className="size-3.5" />
            Live Markdown Preview
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('playground')}
            className={[
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-label text-xs transition-colors',
              activeTool === 'playground'
                ? 'bg-foreground font-medium text-background'
                : 'border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground',
            ].join(' ')}
          >
            <Code2 className="size-3.5" />
            JavaScript Logic Runner
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('palette')}
            className={[
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-label text-xs transition-colors',
              activeTool === 'palette'
                ? 'bg-foreground font-medium text-background'
                : 'border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground',
            ].join(' ')}
          >
            <Palette className="size-3.5" />
            OKLCH Color Studio
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('db')}
            className={[
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-label text-xs transition-colors',
              activeTool === 'db'
                ? 'bg-foreground font-medium text-background'
                : 'border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground',
            ].join(' ')}
          >
            <Database className="size-3.5" />
            Database Schema Visualizer
          </button>
        </div>

        {/* ---------------- 1. API EXPLORER ---------------- */}
        {activeTool === 'api' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="font-display text-xl text-foreground">
                    Interactive REST API Explorer
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Simulate real HTTP requests against endpoints from QuickNote, Food Delivery, and System Health.
                  </p>
                </div>

                {/* Preset Endpoint Selector */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">Endpoint:</span>
                  <select
                    value={selectedEndpoint.id}
                    onChange={(e) => {
                      const found = mockEndpoints.find((m) => m.id === e.target.value)
                      if (found) {
                        setSelectedEndpoint(found)
                        setApiResponse(found.responseBody)
                        setApiStatus(found.responseStatus)
                        setApiLatency(found.responseLatencyMs)
                      }
                    }}
                    className="h-9 rounded-lg border border-border bg-secondary/60 px-3 font-mono text-xs text-foreground outline-none focus:border-primary"
                  >
                    {mockEndpoints.map((ep) => (
                      <option key={ep.id} value={ep.id}>
                        [{ep.method}] {ep.path}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Request URL Bar */}
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
                <span
                  className={[
                    'flex h-10 w-20 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold',
                    selectedEndpoint.method === 'GET'
                      ? 'bg-blue-500/15 text-blue-500'
                      : 'bg-emerald-500/15 text-emerald-500',
                  ].join(' ')}
                >
                  {selectedEndpoint.method}
                </span>

                <div className="flex h-10 flex-1 items-center rounded-lg border border-border bg-secondary/30 px-3 font-mono text-xs text-foreground">
                  https://api.omjyotiprakash.dev{selectedEndpoint.path}
                </div>

                <button
                  type="button"
                  onClick={handleSendApi}
                  disabled={apiLoading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-label text-xs font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
                >
                  {apiLoading ? (
                    <>
                      <RefreshCw className="size-3.5 animate-spin" />
                      <span>Executing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-3.5" />
                      <span>Send Request</span>
                    </>
                  )}
                </button>
              </div>

              {/* Response Inspector */}
              <div className="mt-8 rounded-xl border border-border bg-[#0d1117] p-5 text-[#e6edf3]">
                <div className="flex items-center justify-between border-b border-[#30363d] pb-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#8b949e]">Status:</span>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-emerald-400 font-bold">
                      {apiStatus} {apiStatus === 200 ? 'OK' : 'Created'}
                    </span>
                    <span className="font-mono text-[#8b949e]">Latency:</span>
                    <span className="font-mono text-[#c9d1d9]">{apiLatency}ms</span>
                  </div>

                  <span className="font-mono text-[0.6875rem] text-[#8b949e]">
                    application/json
                  </span>
                </div>

                <div className="mt-4 max-h-96 overflow-y-auto font-mono text-xs leading-relaxed text-[#c9d1d9]">
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 2. JSON FORMATTER ---------------- */}
        {activeTool === 'json' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl text-foreground">
                    JSON Formatter &amp; Validator
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Paste raw JSON strings to validate syntax, format with custom indentation, or minify.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => formatJson(2)}
                    className="rounded-lg border border-border bg-secondary/60 px-3 py-1.5 font-label text-xs hover:bg-secondary"
                  >
                    Format (2 Spaces)
                  </button>
                  <button
                    type="button"
                    onClick={() => formatJson(4)}
                    className="rounded-lg border border-border bg-secondary/60 px-3 py-1.5 font-label text-xs hover:bg-secondary"
                  >
                    Format (4 Spaces)
                  </button>
                  <button
                    type="button"
                    onClick={minifyJson}
                    className="rounded-lg border border-border bg-secondary/60 px-3 py-1.5 font-label text-xs hover:bg-secondary"
                  >
                    Minify
                  </button>
                </div>
              </div>

              {jsonError && (
                <div className="mt-4 rounded-lg bg-rose-500/10 p-3 font-mono text-xs text-rose-500">
                  Syntax Error: {jsonError}
                </div>
              )}

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <label className="font-mono text-xs text-muted-foreground">Input Raw JSON</label>
                  <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    rows={14}
                    className="mt-2 w-full rounded-xl border border-border bg-secondary/20 p-4 font-mono text-xs text-foreground outline-none focus:border-primary"
                    placeholder="Paste JSON here..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-xs text-muted-foreground">Formatted Output</label>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(jsonFormatted)
                        toast.success('Copied formatted JSON')
                      }}
                      className="font-mono text-xs text-primary hover:underline"
                    >
                      Copy Output
                    </button>
                  </div>
                  <div className="mt-2 h-[260px] overflow-auto rounded-xl border border-border bg-[#0d1117] p-4 font-mono text-xs text-[#c9d1d9]">
                    <pre>{jsonFormatted}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 3. MARKDOWN PREVIEWER ---------------- */}
        {activeTool === 'markdown' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-xl text-foreground">
                Live Markdown Editor &amp; Renderer
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Type markdown in the left pane to see real-time typography rendering in the right pane.
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <label className="font-mono text-xs text-muted-foreground">Markdown Source</label>
                  <textarea
                    value={markdownInput}
                    onChange={(e) => setMarkdownInput(e.target.value)}
                    rows={14}
                    className="mt-2 w-full rounded-xl border border-border bg-secondary/20 p-4 font-mono text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-muted-foreground">Rendered HTML Output</label>
                  <div className="mt-2 h-[260px] overflow-auto rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-foreground">
                    <div className="space-y-3">
                      {markdownInput.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) {
                          return <h1 key={i} className="font-display text-xl text-foreground font-bold">{line.replace('# ', '')}</h1>
                        }
                        if (line.startsWith('## ')) {
                          return <h2 key={i} className="font-display text-base text-foreground font-semibold mt-3">{line.replace('## ', '')}</h2>
                        }
                        if (line.startsWith('- ')) {
                          return <li key={i} className="ml-4 list-disc text-muted-foreground">{line.replace('- ', '')}</li>
                        }
                        if (line.startsWith('> ')) {
                          return <blockquote key={i} className="border-l-2 border-primary pl-3 italic text-foreground/80 my-2">{line.replace('> ', '')}</blockquote>
                        }
                        if (line.trim() !== '') {
                          return <p key={i} className="text-muted-foreground">{line}</p>
                        }
                        return null
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 4. JS PLAYGROUND ---------------- */}
        {activeTool === 'playground' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl text-foreground">
                    JavaScript Logic Sandbox
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Run practical data transformation snippets safely in-browser with execution timing.
                  </p>
                </div>

                {/* Preset switcher */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">Snippet:</span>
                  <select
                    onChange={(e) => {
                      const snippet = safePlaygroundSnippets.find((s) => s.name === e.target.value)
                      if (snippet) setPlaygroundCode(snippet.code)
                    }}
                    className="h-9 rounded-lg border border-border bg-secondary/60 px-3 font-mono text-xs text-foreground outline-none"
                  >
                    {safePlaygroundSnippets.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-xs text-muted-foreground">Code (must return value)</label>
                    <button
                      type="button"
                      onClick={runPlayground}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1 font-label text-xs font-semibold text-primary-foreground hover:brightness-110"
                    >
                      <Play className="size-3" />
                      Run Code
                    </button>
                  </div>
                  <textarea
                    value={playgroundCode}
                    onChange={(e) => setPlaygroundCode(e.target.value)}
                    rows={12}
                    className="w-full rounded-xl border border-border bg-[#0d1117] p-4 font-mono text-xs text-[#c9d1d9] outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-xs text-muted-foreground">Evaluation Result</label>
                    {playgroundExecutionTime !== null && (
                      <span className="font-mono text-[0.6875rem] text-emerald-500">
                        ⚡ {playgroundExecutionTime} ms
                      </span>
                    )}
                  </div>
                  <div className="h-[235px] overflow-auto rounded-xl border border-border bg-[#0d1117] p-4 font-mono text-xs text-emerald-400">
                    <pre>{playgroundOutput}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 5. OKLCH COLOR STUDIO ---------------- */}
        {activeTool === 'palette' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-xl text-foreground">
                OKLCH Color Space Studio
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Experiment with perceptual lightness, chroma, and hue values used across this design system.
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
                <div className="space-y-6">
                  {/* Lightness Slider */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-foreground">
                      <span>Lightness (L): {lightness.toFixed(3)}</span>
                      <span className="text-muted-foreground">0.0 (Black) – 1.0 (White)</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="0.95"
                      step="0.01"
                      value={lightness}
                      onChange={(e) => setLightness(parseFloat(e.target.value))}
                      className="mt-2 w-full accent-primary"
                    />
                  </div>

                  {/* Chroma Slider */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-foreground">
                      <span>Chroma (C): {chroma.toFixed(3)}</span>
                      <span className="text-muted-foreground">0.0 (Neutral) – 0.35 (Vibrant)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="0.32"
                      step="0.01"
                      value={chroma}
                      onChange={(e) => setChroma(parseFloat(e.target.value))}
                      className="mt-2 w-full accent-primary"
                    />
                  </div>

                  {/* Hue Slider */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-foreground">
                      <span>Hue Angle (H): {hue}°</span>
                      <span className="text-muted-foreground">0° – 360°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="1"
                      value={hue}
                      onChange={(e) => setHue(parseInt(e.target.value))}
                      className="mt-2 w-full accent-primary"
                    />
                  </div>

                  <div className="rounded-lg border border-border bg-secondary/30 p-3 font-mono text-xs text-muted-foreground">
                    CSS Token Output: <code className="text-primary font-bold">{currentColorOklch}</code>
                  </div>
                </div>

                {/* Swatch & Preview */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-border p-6 text-center">
                  <div
                    className="size-32 rounded-2xl shadow-lg transition-colors border border-black/10"
                    style={{ backgroundColor: currentColorOklch }}
                  />
                  <p className="mt-4 font-mono text-xs font-semibold text-foreground">
                    {currentColorOklch}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(currentColorOklch)
                      toast.success('Copied OKLCH color string')
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-label text-xs text-foreground hover:bg-secondary"
                  >
                    <Copy className="size-3" />
                    Copy CSS Token
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 6. DB SCHEMA VISUALIZER ---------------- */}
        {activeTool === 'db' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-xl text-foreground">
                Entity-Relationship &amp; MERN Schema Visualizer
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Inspect MongoDB collection structures and foreign key references across QuickNote and Food Delivery.
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {/* User Collection */}
                <div className="rounded-xl border border-border bg-[#0d1117] p-4 text-[#e6edf3]">
                  <div className="border-b border-[#30363d] pb-2 font-mono text-xs font-bold text-emerald-400">
                    Collection: users
                  </div>
                  <ul className="mt-3 space-y-1.5 font-mono text-[0.75rem] text-[#c9d1d9]">
                    <li><strong className="text-primary">_id:</strong> ObjectId (PK)</li>
                    <li><strong>name:</strong> String</li>
                    <li><strong>email:</strong> String (Unique)</li>
                    <li><strong>password:</strong> String (bcrypt)</li>
                    <li><strong>avatar:</strong> String (Multer)</li>
                    <li><strong>createdAt:</strong> Date</li>
                  </ul>
                </div>

                {/* Note Collection */}
                <div className="rounded-xl border border-border bg-[#0d1117] p-4 text-[#e6edf3]">
                  <div className="border-b border-[#30363d] pb-2 font-mono text-xs font-bold text-emerald-400">
                    Collection: notes
                  </div>
                  <ul className="mt-3 space-y-1.5 font-mono text-[0.75rem] text-[#c9d1d9]">
                    <li><strong className="text-primary">_id:</strong> ObjectId (PK)</li>
                    <li><strong className="text-amber-400">userId:</strong> ObjectId (FK → users._id)</li>
                    <li><strong>title:</strong> String</li>
                    <li><strong>content:</strong> String</li>
                    <li><strong>tags:</strong> Array&lt;String&gt;</li>
                    <li><strong>isPublic:</strong> Boolean</li>
                    <li className="text-[#8b949e] border-t border-[#30363d] pt-1">
                      Index: &#123; userId: 1, createdAt: -1 &#125;
                    </li>
                  </ul>
                </div>

                {/* Orders Collection */}
                <div className="rounded-xl border border-border bg-[#0d1117] p-4 text-[#e6edf3]">
                  <div className="border-b border-[#30363d] pb-2 font-mono text-xs font-bold text-emerald-400">
                    Collection: orders
                  </div>
                  <ul className="mt-3 space-y-1.5 font-mono text-[0.75rem] text-[#c9d1d9]">
                    <li><strong className="text-primary">_id:</strong> ObjectId (PK)</li>
                    <li><strong>customer:</strong> Object (embedded)</li>
                    <li><strong>items:</strong> Array&lt;ItemSnapshot&gt;</li>
                    <li><strong>totalAmount:</strong> Number (verified)</li>
                    <li><strong>status:</strong> String</li>
                    <li><strong>paymentStatus:</strong> String</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
