import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Home from '@/pages/Home'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Toaster } from '@/components/ui/sonner'

// Code-split pages for high performance and reduced initial bundle weight
const About = lazy(() => import('@/pages/About'))
const Projects = lazy(() => import('@/pages/Projects'))
const ProjectCaseStudy = lazy(() => import('@/pages/ProjectCaseStudy'))
const Engineering = lazy(() => import('@/pages/Engineering'))
const Writing = lazy(() => import('@/pages/Writing'))
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'))
const Lab = lazy(() => import('@/pages/Lab'))
const Now = lazy(() => import('@/pages/Now'))
const Experience = lazy(() => import('@/pages/Experience'))
const Uses = lazy(() => import('@/pages/Uses'))
const Contact = lazy(() => import('@/pages/Contact'))
const Studio = lazy(() => import('@/pages/Studio'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function RouteFallback() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-content items-center justify-center px-gutter py-24">
      <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
        <span className="size-2 animate-ping rounded-full bg-primary" />
        <span>Loading resource...</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[110rem] flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <div id="main-content" className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectCaseStudy />} />
            <Route path="engineering" element={<Engineering />} />
            <Route path="writing" element={<Writing />} />
            <Route path="writing/:slug" element={<ArticleDetail />} />
            <Route path="lab" element={<Lab />} />
            <Route path="now" element={<Now />} />
            <Route path="experience" element={<Experience />} />
            <Route path="uses" element={<Uses />} />
            <Route path="contact" element={<Contact />} />
            <Route path="studio" element={<Studio />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <SiteFooter />
      <Toaster position="bottom-right" />
    </div>
  )
}
