import type { Project, SkillCategory, ExperienceItem } from '@/types'

export const site = {
  name: 'OM JYOTI PRAKASH',
  shortName: 'Om',
  title: 'Full-Stack Developer · Software Engineer · AI Integration Enthusiast',
  headline: 'I build software that makes complex things feel simple.',
  supporting:
    'I’m a full-stack developer interested in thoughtful digital products, scalable web applications, and intelligent experiences. I enjoy turning ideas into functional software and continuously improving how things are built.',
  location: 'Odisha, India',
  email: 'omjyotiprakash4@gmail.com',
  github: 'https://github.com/omjyotiprakash',
  linkedin: 'https://linkedin.com/in/omjyotiprakash',
  availability: 'Available for full-time engineering roles, internships & builds',
  degree: 'Bachelor of Technology in Computer Science and Engineering',
  college: 'Nalanda Institute of Technology, Bhubaneswar',
  education: {
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    institution: 'Nalanda Institute of Technology, Bhubaneswar',
    location: 'Bhubaneswar, Odisha',
    status: 'Graduated',
    focus: 'Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, Software Engineering',
  },
  philosophy: [
    {
      title: 'Simplicity as a Discipline',
      summary:
        'Complex software is often the result of premature abstraction. I prioritize clear data flow, readable logic, and straightforward architectural boundaries over cleverness.',
    },
    {
      title: 'Predictable State, Reliable Systems',
      summary:
        'Whether in a React component tree or an Express route handler, unpredictable state creates silent failures. Explicit validation and immutability yield confidence.',
    },
    {
      title: 'End-to-End Mental Model',
      summary:
        'Understanding how a button click transforms into a network request, passes through middleware, executes a database query, and returns creates better frontend and backend engineers alike.',
    },
    {
      title: 'Pragmatic AI Integration',
      summary:
        'AI is most valuable when integrated into the heart of application logic — augmenting user workflows, validating inputs, and accelerating decisions — not merely tacked on as a generic chat box.',
    },
    {
      title: 'Honest Craft & Continuous Learning',
      summary:
        'I build things end-to-end to truly understand where they break. I believe in documenting trade-offs, owning bugs, and improving every iteration.',
    },
  ],
} as const

export const projects: Project[] = [
  {
    slug: 'quicknote',
    title: 'QuickNote',
    tagline: 'Full-Stack Notes & Social Sharing Platform',
    category: 'Full-Stack',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Multer', 'Tailwind CSS'],
    featured: true,
    year: '2024',
    status: 'Deployed & Active',
    summary:
      'A full-stack notes management and social discovery platform built to master end-to-end MERN architecture — authentication, protected APIs, file uploads, and responsive UI.',
    problem:
      'Many note-taking apps are either overly bloated with collaborative enterprise tools or lack simple, secure personal note archiving combined with lightweight public sharing.',
    solution:
      'Built a decoupled MERN application featuring JWT authentication in secure httpOnly cookies, profile management with image upload through Multer, compound-indexed note search, and fine-grained public/private note privacy toggles.',
    highlights: [
      'JWT authentication with bcrypt password hashing and auth guard middleware',
      'Full CRUD note management with tag-based filtering and instant search',
      'User profile management with multipart image upload handled via Multer',
      'Public feed discovery to read notes published by other community members',
      'Deployed frontend on Vercel and backend on Render backed by MongoDB Atlas',
    ],
    architectureSummary:
      'React SPA on Vite communicating via Axios with an Express REST API. MongoDB Atlas stores User and Note documents with compound indexes for fast query resolution.',
    githubUrl: 'https://github.com/omjyotiprakash/quicknote',
    liveUrl: 'https://quicknote-preview.vercel.app',
    demoNote: 'Running on Render free tier (may experience standard cold-start wakeup on first API call).',
  },
  {
    slug: 'food-delivery',
    title: 'Food Delivery Platform',
    tagline: 'Multi-Client Restaurant Ordering & Admin System',
    category: 'Full-Stack',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Tailwind CSS'],
    featured: true,
    year: '2024',
    status: 'Built End-to-End',
    summary:
      'A multi-surface food ordering system featuring a customer shopping interface, a dedicated restaurant management dashboard, and a unified Express/MongoDB backend.',
    problem:
      'Managing inventory, live pricing, cart state, and order status across separate consumer and administrative interfaces frequently leads to state synchronization errors if not architected cleanly.',
    solution:
      'Designed a shared REST API contract serving two separate React frontends: one optimized for seamless browsing, cart calculations, and checkout; the other dedicated to menu updates, category management, and order tracking.',
    highlights: [
      'Two distinct frontend applications consuming one unified REST API',
      'Server-side cart recalculation to prevent client-side price tampering',
      'Menu categorization, real-time item availability toggles, and image asset links',
      'Structured order lifecycle management (Pending → Preparing → Out for Delivery → Completed)',
      'MongoDB aggregation pipelines for order totals and category filtering',
    ],
    architectureSummary:
      'Dual React applications (Customer Portal & Merchant Admin) wired into a single Express REST API with MongoDB persistence for menu items, carts, and order receipts.',
    githubUrl: 'https://github.com/omjyotiprakash/food-delivery-app',
    liveUrl: 'https://food-delivery-preview.vercel.app',
  },
  {
    slug: 'cinequirk',
    title: 'Cinequirk',
    tagline: 'OTT Cinema & Media Metadata Management Platform',
    category: 'Full-Stack',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    featured: true,
    year: '2023',
    status: 'Built End-to-End',
    summary:
      'A film and television metadata management system that replaces static hardcoded pages with dynamically queried, categorized MongoDB records and editorial reviews.',
    problem:
      'Film buffs and media collectors often find streaming platforms fragmented, lacking editorial curation, structured cast/crew metadata, and personalized tracking.',
    solution:
      'Constructed a dynamic media platform where titles, release metadata, genres, and editorial tags are queried through structured MongoDB schemas, featuring search, genre filters, and watchlist persistence.',
    highlights: [
      'Structured document modeling for titles, seasons, genres, and cast credits',
      'Search indexing across movie titles, directors, and synopsis tags',
      'Editorial review rating system with optimistic UI updates in React',
      'Responsive media poster grids with fluid image fallbacks',
    ],
    architectureSummary:
      'React frontend using Axios to fetch normalized media documents from an Express API. MongoDB collections model titles, reviews, and genre taxonomies.',
    githubUrl: 'https://github.com/omjyotiprakash/cinequirk',
    liveUrl: 'https://cinequirk.vercel.app',
  },
  {
    slug: 'eduquirk',
    title: 'EDUQUIRK',
    tagline: 'Modular Learner Progression & Curriculum Interface',
    category: 'Concepts & Architecture',
    stack: ['Product Design', 'React', 'TypeScript', 'State Machine Architecture'],
    featured: false,
    year: '2023',
    status: 'Concept & Interactive Prototype',
    summary:
      'An educational technology product concept and interactive interface exploring how complex technical course curricula can be broken into structured, non-linear learner pathways.',
    problem:
      'Traditional online course platforms present flat, overwhelming lists of video links that induce cognitive overload and fail to convey prerequisite dependencies.',
    solution:
      'Modeled a node-based curriculum interface where chapters and modules represent distinct states, guiding learners through structured milestones, quizzes, and practical exercises.',
    highlights: [
      'Visual breakdown of curriculum progression with prerequisite dependency tracking',
      'Modular lesson cards with estimated completion times and skill badges',
      'State-driven interactive prototype testing learner navigation flows',
      'Clean typography and distraction-free reading modes',
    ],
    architectureSummary:
      'Component-driven UI architecture modeling curriculum hierarchies as directional graphs, separating content state from learner completion records.',
    githubUrl: 'https://github.com/omjyotiprakash/eduquirk',
  },
  {
    slug: 'smartpark',
    title: 'SmartPark',
    tagline: 'Real-Time Parking Slot Allocation Simulator',
    category: 'Concepts & Architecture',
    stack: ['TypeScript', 'React', 'Concurrency Logic', 'State Management'],
    featured: false,
    year: '2023',
    status: 'Concept & Interactive Simulation',
    summary:
      'A simulator for municipal and campus parking systems, modeling slot reservations, hold expirations, and concurrency race conditions in software.',
    problem:
      'Physical parking allocation requires handling rapid state shifts (free, reserved, occupied, released) where race conditions and expired holds easily cause double-bookings.',
    solution:
      'Implemented an interactive state simulator with timed slot reservation locks, hold countdowns, and automated release policies to test allocation algorithms visually.',
    highlights: [
      'Visual parking grid with real-time slot state indicators (Available, Held, Occupied)',
      'Timed hold mechanics with automatic release upon timeout expiration',
      'Simulated multi-vehicle booking requests to test conflict resolution logic',
      'Analytical stats panel showing current capacity, occupancy rate, and turnover',
    ],
    architectureSummary:
      'State machine simulator running in TypeScript/React with timer queues and immutable state updates, modeling real-time resource contention.',
    githubUrl: 'https://github.com/omjyotiprakash/smartpark',
  },
]

export const skills: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    description: 'Building accessible, responsive, and performant user interfaces with modern toolchains.',
    skills: [
      { name: 'React.js', level: 'Core', notes: 'Hooks, Context, Custom Hooks, Performance memoization' },
      { name: 'TypeScript', level: 'Core', notes: 'Type safety, interfaces, utility types, generic components' },
      { name: 'JavaScript (ES6+)', level: 'Core', notes: 'Closures, async/await, event loop, array transformations' },
      { name: 'Tailwind CSS', level: 'Core', notes: 'Design token architecture, responsive design, custom variants' },
      { name: 'HTML5 & CSS3', level: 'Core', notes: 'Semantic markup, accessibility (ARIA), flexbox, grid, animations' },
      { name: 'Vite', level: 'Core', notes: 'Module bundling, fast HMR, asset optimization' },
      { name: 'React Router', level: 'Core', notes: 'Nested routing, loaders, protected route guards' },
      { name: 'Axios', level: 'Core', notes: 'Interceptors, request cancellation, auth header injection' },
    ],
  },
  {
    title: 'Backend Engineering',
    description: 'Designing RESTful APIs, business logic, authentication guards, and middleware.',
    skills: [
      { name: 'Node.js', level: 'Core', notes: 'Event-driven I/O, asynchronous processing, file streams' },
      { name: 'Express.js', level: 'Core', notes: 'Router architecture, custom middleware, error handling pipelines' },
      { name: 'REST API Design', level: 'Core', notes: 'Resource naming, status codes, payload contracts, idempotency' },
      { name: 'JWT & Auth', level: 'Core', notes: 'Token generation, verification, httpOnly cookie sessions, bcrypt' },
      { name: 'Multer', level: 'Core', notes: 'Multipart form-data handling, disk storage, image validation' },
      { name: 'Zod', level: 'Proficient', notes: 'Schema validation for request payloads and environment variables' },
    ],
  },
  {
    title: 'Database Architecture',
    description: 'Data modeling, schema validation, querying, and index optimization.',
    skills: [
      { name: 'MongoDB', level: 'Core', notes: 'Document databases, aggregation pipelines, replica sets' },
      { name: 'Mongoose', level: 'Core', notes: 'Schema definitions, validations, pre/post middleware, virtuals' },
      { name: 'SQL & MySQL', level: 'Proficient', notes: 'Relational schemas, joins, normalization, ACID properties' },
      { name: 'MongoDB Atlas', level: 'Core', notes: 'Cloud clustering, connection pooling, monitoring' },
    ],
  },
  {
    title: 'Languages & Systems',
    description: 'Foundational computer science languages from academic coursework and systems study.',
    skills: [
      { name: 'JavaScript & TypeScript', level: 'Core', notes: 'Primary daily programming environment' },
      { name: 'Java', level: 'Proficient', notes: 'Object-oriented programming, data structures, JVM basics' },
      { name: 'Python', level: 'Proficient', notes: 'Scripting, algorithmic problem solving, basic data handling' },
      { name: 'C / C++', level: 'Proficient', notes: 'Memory management, pointers, foundational CS coursework' },
    ],
  },
  {
    title: 'Tools & Workflows',
    description: 'Version control, development environments, and deployment platforms.',
    skills: [
      { name: 'Git & GitHub', level: 'Core', notes: 'Branching, PRs, semantic commits, code reviews' },
      { name: 'Postman', level: 'Core', notes: 'API testing, environment variables, collection documentation' },
      { name: 'Vercel', level: 'Core', notes: 'Frontend continuous deployment, edge headers, preview URLs' },
      { name: 'Render', level: 'Core', notes: 'Web service hosting, environment configuration, build logs' },
      { name: 'VS Code', level: 'Core', notes: 'Configured workflows, ESLint, Prettier, Vim bindings' },
    ],
  },
]

export const experience: ExperienceItem[] = [
  {
    period: '2020 – 2024',
    role: 'B.Tech in Computer Science and Engineering',
    organization: 'Nalanda Institute of Technology',
    location: 'Bhubaneswar, Odisha',
    type: 'education',
    summary:
      'Completed a four-year engineering degree with a focus on computing fundamentals, algorithmic thinking, software engineering methodologies, and database systems.',
    responsibilities: [
      'Studied core computer science subjects: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Object-Oriented Software Design.',
      'Completed academic projects using Java, C++, MySQL, and web fundamentals.',
      'Developed strong problem-solving discipline through theoretical and lab coursework.',
    ],
    technologies: ['C++', 'Java', 'Python', 'SQL', 'MySQL', 'HTML/CSS', 'Data Structures', 'Algorithms'],
  },
  {
    period: '2024',
    role: 'Full-Stack Web Development Intern',
    organization: 'Be10x',
    location: 'Remote',
    type: 'internship',
    summary:
      'Practical engineering internship focusing on modern web development techniques, AI-assisted development workflows, and frontend component architecture.',
    responsibilities: [
      'Gained hands-on experience building interactive web applications with modern JavaScript and React.',
      'Explored how generative AI and modern tooling accelerate software scaffolding, refactoring, and documentation.',
      'Collaborated on small-scale product features and responsive interface implementation.',
    ],
    technologies: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'AI Tooling', 'Git', 'REST APIs'],
  },
  {
    period: '2023',
    role: 'Web Development Intern',
    organization: 'OctaNet Services',
    location: 'Remote',
    type: 'internship',
    summary:
      'Focused on frontend development tasks, responsive layout construction, and browser compatibility across diverse screen dimensions.',
    responsibilities: [
      'Implemented clean, semantic web layouts following UI/UX wireframes and specifications.',
      'Applied CSS Grid and Flexbox for mobile-responsive navigation menus and cards.',
      'Participated in code reviews and learned professional Git version control workflows.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Git', 'GitHub'],
  },
]

export const requestPath = [
  { layer: '01 · Client', component: 'React 19 + TypeScript + Vite', role: 'State management, accessible DOM, optimistic UI updates' },
  { layer: '02 · Transport', component: 'Axios + HTTP/2 + JSON', role: 'Request serialization, auth token header attachment, interceptors' },
  { layer: '03 · Gateway & Routing', component: 'Node.js + Express.js Router', role: 'CORS policy verification, JSON body parsing, route matching' },
  { layer: '04 · Security & Guard', component: 'JWT + bcrypt + Middleware', role: 'Signature verification, payload decoding, user authentication' },
  { layer: '05 · Persistence', component: 'Mongoose + MongoDB Atlas', role: 'Schema validation, compound indexing, document persistence' },
  { layer: '06 · Edge & Hosting', component: 'Vercel (UI) + Render (API)', role: 'Global CDN distribution, HTTPS termination, container execution' },
] as const

export const currentlyExploring = [
  {
    title: 'AI Agent Architectures & Tool Use',
    area: 'AI Integration',
    summary:
      'Investigating structured JSON extraction, function calling, and schema validation with LLM backends to build dependable AI features rather than open-ended chat.',
    status: 'Active Experimentation',
  },
  {
    title: 'MongoDB Query Performance & Compound Indexing',
    area: 'Database Architecture',
    summary:
      'Analyzing query execution plans with `.explain("executionStats")` to eliminate collection scans and design efficient compound indexes.',
    status: 'In-Depth Study',
  },
  {
    title: 'Modern TypeScript System Design Patterns',
    area: 'Frontend Engineering',
    summary:
      'Applying discriminated unions, template literal types, and type guards to build bulletproof frontend state machines and form validations.',
    status: 'Practical Application',
  },
  {
    title: 'Web Performance & Layout Stability (CLS / INP)',
    area: 'Performance Engineering',
    summary:
      'Optimizing rendering cycles, eliminating layout shifts, and splitting bundles to keep mobile page loads under 1.5 seconds on slow 4G.',
    status: 'Continuous Refinement',
  },
]

export const readingList = [
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Reliability, Scalability, and Maintainability in distributed data systems',
    status: 'Currently Reading',
  },
  {
    title: 'You Don’t Know JS Yet: Scope & Closures',
    author: 'Kyle Simpson',
    topic: 'Deep dive into JavaScript lexical scope, hoisting, and closures',
    status: 'Completed / Reference',
  },
  {
    title: 'Refactoring: Improving the Design of Existing Code',
    author: 'Martin Fowler',
    topic: 'Code smells, catalog of refactorings, and test-driven architecture',
    status: 'Study & Practice',
  },
]
