export interface Project {
  slug: string
  title: string
  tagline: string
  category: 'Full-Stack' | 'Frontend' | 'Backend' | 'Concepts & Architecture'
  stack: string[]
  featured: boolean
  year: string
  status: string
  summary: string
  problem: string
  solution: string
  highlights: string[]
  architectureSummary: string
  githubUrl?: string
  liveUrl?: string
  demoNote?: string
}

export interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  period: string
  role: string
  category: string
  stack: string[]
  liveUrl?: string
  githubUrl?: string
  overview: string
  theProblem: string
  whyIBuiltIt: string
  technicalRequirements: string[]
  technologySelection: {
    tech: string
    reason: string
  }[]
  architecture: {
    overview: string
    layers: {
      layer: string
      component: string
      role: string
    }[]
  }
  databaseDesign: {
    description: string
    collections: {
      name: string
      purpose: string
      fields: { name: string; type: string; description: string }[]
      indexes?: string[]
    }[]
  }
  frontendArchitecture: {
    summary: string
    keyPatterns: string[]
  }
  backendArchitecture: {
    summary: string
    keyPatterns: string[]
  }
  apiDesign: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    endpoint: string
    description: string
    auth: boolean
    bodySample?: string
    responseSample?: string
  }[]
  authAndSecurity: {
    approach: string
    measures: string[]
  }
  implementationDecisions: {
    title: string
    rationale: string
    alternativeConsidered: string
  }[]
  challengesAndDebugging: {
    issue: string
    symptom: string
    investigation: string
    resolution: string
  }[]
  performanceConsiderations: string[]
  lessonsLearned: string[]
  futureImprovements: string[]
}

export interface Article {
  slug: string
  title: string
  description: string
  publishedAt: string
  readingTime: string
  category: string
  tags: string[]
  content: string
}

export interface ExperienceItem {
  period: string
  role: string
  organization: string
  location: string
  type: 'education' | 'internship' | 'project'
  summary: string
  responsibilities: string[]
  technologies: string[]
}

export interface SkillCategory {
  title: string
  description: string
  skills: {
    name: string
    level: 'Core' | 'Proficient' | 'Exploring'
    notes: string
  }[]
}
