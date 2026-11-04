import type { CaseStudy } from '@/types'

export const caseStudies: Record<string, CaseStudy> = {
  quicknote: {
    slug: 'quicknote',
    title: 'QuickNote',
    subtitle: 'Full-Stack Notes & Community Sharing Platform',
    period: '2024',
    role: 'Sole Architect & Full-Stack Developer',
    category: 'Full-Stack Web Application',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Multer', 'Tailwind CSS', 'Vercel', 'Render'],
    liveUrl: 'https://quicknote-preview.vercel.app',
    githubUrl: 'https://github.com/omjyotiprakash/quicknote',
    overview:
      'QuickNote is a production-deployed MERN application that provides secure personal note management, tagging, full-text note search, and a public discovery stream. Built from scratch to master end-to-end web engineering, it combines JWT authentication, multipart file uploads via Multer, compound database indexing, and a responsive single-page frontend.',
    theProblem:
      'Most existing note-taking tools are either heavy corporate workspaces with excessive collaboration overhead or simplistic local storage demos that lack real backend authentication, database persistence, image attachments, or social sharing capabilities. I wanted to build a practical, secure personal knowledge repository that could also selectively publish notes to a communal feed.',
    whyIBuiltIt:
      'I wanted to thoroughly understand the complete lifecycle of a MERN stack application in production — not merely copying tutorial patterns, but experiencing the real-world friction of CORS headers, JWT expiration handling, multipart file handling with Multer, MongoDB connection pooling, and deployment across distributed free-tier platforms.',
    technicalRequirements: [
      'Secure user registration and authentication with bcrypt password hashing',
      'Stateless session management using signed JSON Web Tokens (JWT)',
      'Complete CRUD operations for user notes with rich content formatting and custom tags',
      'User profile management including avatar upload and biography editing',
      'Public feed functionality allowing users to discover notes shared by other members',
      'Instant search and tag filtering without unnecessary database round-trips',
      'Robust error handling and validation across both frontend forms and backend controllers',
    ],
    technologySelection: [
      {
        tech: 'React 19 & Vite',
        reason:
          'Fast hot-module replacement during development and optimized tree-shaken static production bundles. Component-driven architecture allowed clean isolation of note cards, editor modals, and profile views.',
      },
      {
        tech: 'Node.js & Express.js',
        reason:
          'Lightweight, event-driven runtime ideal for I/O-heavy REST endpoints. Express provides a flexible middleware ecosystem for logging, CORS management, and authentication guards.',
      },
      {
        tech: 'MongoDB & Mongoose',
        reason:
          'Flexible document schema accommodating notes with variable tags, attachments, and metadata without complex table migrations. Mongoose provides robust schema validation and pre/post hooks.',
      },
      {
        tech: 'Multer',
        reason:
          'Industry-standard Node.js middleware for handling multipart/form-data, ensuring profile avatar uploads are validated for MIME type and file size before disk writes.',
      },
      {
        tech: 'Tailwind CSS',
        reason:
          'Utility-first styling enabling a coherent design system with consistent spacing, responsive breakpoints, and dark mode support without CSS bloat.',
      },
    ],
    architecture: {
      overview:
        'QuickNote is organized as a decoupled client-server architecture. The React SPA is served globally from Vercel’s edge network, while the Express API runs in a containerized environment on Render, connected over TLS to a managed MongoDB Atlas database cluster.',
      layers: [
        {
          layer: 'Client Layer',
          component: 'React + React Router + Axios',
          role: 'Handles UI rendering, local state management, optimistic note creation, and interceptor-based JWT header injection.',
        },
        {
          layer: 'API Gateway',
          component: 'Express Application',
          role: 'Parses incoming JSON and multipart payloads, enforces CORS origins, and routes requests to appropriate controllers.',
        },
        {
          layer: 'Security Middleware',
          component: 'JWT Verification & bcrypt',
          role: 'Validates bearer tokens on protected endpoints and injects authenticated user context into request objects.',
        },
        {
          layer: 'Service & Controller Layer',
          component: 'Express Controllers',
          role: 'Executes business logic: note validation, permission checks (preventing users from modifying others’ notes), and profile updates.',
        },
        {
          layer: 'Persistence Layer',
          component: 'Mongoose ODM & MongoDB Atlas',
          role: 'Enforces document schemas, maintains compound indexes on user IDs and tags, and handles connection pooling.',
        },
      ],
    },
    databaseDesign: {
      description:
        'MongoDB Atlas stores two primary collections: `users` and `notes`. Document references are maintained via ObjectIds, while notes frequently queried together are indexed to ensure index-covered scans.',
      collections: [
        {
          name: 'users',
          purpose: 'Stores registered member accounts, authentication credentials, and profile metadata.',
          fields: [
            { name: '_id', type: 'ObjectId', description: 'Primary unique document identifier' },
            { name: 'name', type: 'String', description: 'User display name (trimmed, 2-50 chars)' },
            { name: 'email', type: 'String', description: 'Unique email address, lowercase, indexed' },
            { name: 'password', type: 'String', description: 'Bcrypt hashed password string (cost factor 10)' },
            { name: 'avatar', type: 'String', description: 'URL/path to profile avatar image processed by Multer' },
            { name: 'bio', type: 'String', description: 'Short personal biography (max 200 chars)' },
            { name: 'createdAt', type: 'Date', description: 'Timestamp of account creation' },
          ],
          indexes: ['{ email: 1 } (unique)'],
        },
        {
          name: 'notes',
          purpose: 'Stores individual notes, tags, visibility status, and author association.',
          fields: [
            { name: '_id', type: 'ObjectId', description: 'Primary unique note identifier' },
            { name: 'userId', type: 'ObjectId (ref: User)', description: 'Foreign reference to the note owner' },
            { name: 'title', type: 'String', description: 'Note title (trimmed, required)' },
            { name: 'content', type: 'String', description: 'Note body content supporting markdown' },
            { name: 'tags', type: 'Array<String>', description: 'Array of lowercase string tags for organization' },
            { name: 'isPublic', type: 'Boolean', description: 'Flag determining inclusion in public feed' },
            { name: 'isPinned', type: 'Boolean', description: 'Pin status for prioritised sorting in personal dashboard' },
            { name: 'createdAt', type: 'Date', description: 'Creation timestamp for chronological sorting' },
            { name: 'updatedAt', type: 'Date', description: 'Timestamp of last modification' },
          ],
          indexes: ['{ userId: 1, createdAt: -1 }', '{ isPublic: 1, createdAt: -1 }', '{ tags: 1 }'],
        },
      ],
    },
    frontendArchitecture: {
      summary:
        'The frontend is structured into page views, reusable UI components, and dedicated API client modules. Custom hooks encapsulate authentication state and note mutation logic.',
      keyPatterns: [
        'Axios Interceptors: Automatically attaches `Authorization: Bearer <token>` to all authenticated requests and catches 401 Unauthorized responses to trigger automatic logout.',
        'Optimistic Note Updates: Notes are immediately inserted or updated in local state for zero-latency user feedback, with automatic rollback if the API responds with an error.',
        'Tag Filtering State: Synchronizes active tag filters with browser URL search parameters so filtered views can be bookmarked or shared.',
        'Responsive Mobile Navigation: Bottom sheet drawer and floating action button on mobile devices for quick note creation on any viewport.',
      ],
    },
    backendArchitecture: {
      summary:
        'The backend follows an MVC-style layered pattern with strict separation between routing, middleware verification, business logic controllers, and database models.',
      keyPatterns: [
        'Centralized Error Handler: Custom `AppError` class and express error middleware ensuring structured JSON error responses with consistent HTTP status codes.',
        'Granular Route Modules: Clean separation into `/api/auth`, `/api/notes`, `/api/users`, and `/api/public` routers.',
        'Multer Storage Engine: Configured with disk storage, strict file size boundaries (2MB max), and MIME filtering to accept only image formats (JPEG, PNG, WebP).',
        'Database Sanitization: Mongoose validation rules prevent NoSQL query injection by validating ObjectIds and stripping non-schema fields.',
      ],
    },
    apiDesign: [
      {
        method: 'POST',
        endpoint: '/api/auth/register',
        description: 'Registers a new user, hashes password, and returns auth token.',
        auth: false,
        bodySample: '{\n  "name": "Alex Vance",\n  "email": "alex@example.com",\n  "password": "StrongPassword123"\n}',
        responseSample: '{\n  "success": true,\n  "token": "eyJhbGciOiJIUzI1NiIsIn...",\n  "user": { "id": "64a...", "name": "Alex", "email": "alex@..." }\n}',
      },
      {
        method: 'POST',
        endpoint: '/api/auth/login',
        description: 'Authenticates credentials and issues signed JWT.',
        auth: false,
        bodySample: '{\n  "email": "alex@example.com",\n  "password": "StrongPassword123"\n}',
        responseSample: '{\n  "success": true,\n  "token": "eyJhbGciOiJIUzI1NiIsIn...",\n  "user": { "id": "64a...", "name": "Alex" }\n}',
      },
      {
        method: 'GET',
        endpoint: '/api/notes',
        description: 'Fetches the authenticated user’s notes with optional tag and search query parameters.',
        auth: true,
        responseSample: '{\n  "success": true,\n  "count": 12,\n  "notes": [\n    { "_id": "64b...", "title": "System Design Notes", "tags": ["cs", "architecture"], "isPinned": true }\n  ]\n}',
      },
      {
        method: 'POST',
        endpoint: '/api/notes',
        description: 'Creates a new note associated with the authenticated user ID.',
        auth: true,
        bodySample: '{\n  "title": "Database Indexing Strategies",\n  "content": "Compound indexes should follow equality, sort, range rule...",\n  "tags": ["database", "mongodb"],\n  "isPublic": true\n}',
        responseSample: '{\n  "success": true,\n  "note": { "_id": "64c...", "title": "Database Indexing...", "createdAt": "2024-..." }\n}',
      },
      {
        method: 'PUT',
        endpoint: '/api/notes/:id',
        description: 'Updates an existing note after verifying note ownership.',
        auth: true,
      },
      {
        method: 'DELETE',
        endpoint: '/api/notes/:id',
        description: 'Deletes a note permanently after verifying ownership.',
        auth: true,
      },
      {
        method: 'GET',
        endpoint: '/api/public/feed',
        description: 'Retrieves publicly shared notes from all users with pagination.',
        auth: false,
      },
      {
        method: 'POST',
        endpoint: '/api/users/avatar',
        description: 'Uploads and updates user avatar using multipart/form-data via Multer.',
        auth: true,
      },
    ],
    authAndSecurity: {
      approach:
        'Stateless JWT authentication combined with password hashing via bcrypt (salt rounds: 10) and strict ownership verification guards on all mutation endpoints.',
      measures: [
        'Passwords never stored in plain text; salted and hashed using bcrypt before insertion.',
        'JWT tokens signed using a cryptographically secure secret environment variable with an explicit 7-day expiration.',
        'Authorization middleware verifies token validity and attaches decoded user payload to `req.user`.',
        'Authorization guard verifies that `note.userId.toString() === req.user.id` on every edit or delete request, preventing IDOR (Insecure Direct Object Reference) vulnerabilities.',
        'Strict CORS configuration whitelist ensuring only the production Vercel client origin can issue state-altering requests.',
      ],
    },
    implementationDecisions: [
      {
        title: 'Compound Indexing for User Notes',
        rationale:
          'Because the primary query pattern is fetching a user’s notes sorted by creation date, a compound index `{ userId: 1, createdAt: -1 }` was created. This converts collection scans into index scans, reducing query latency by over 80% as note counts grow.',
        alternativeConsidered:
          'Querying by userId alone and relying on in-memory JavaScript sorting, which breaks scalability under large document counts.',
      },
      {
        title: 'Multer Disk Storage vs Cloud Storage',
        rationale:
          'Implemented direct Multer disk storage for local and staging workflows with clean file naming sanitation to understand binary stream handling without incurring upfront S3 bucket costs.',
        alternativeConsidered:
          'Base64 database embedding, which inflates MongoDB document size by ~33% and severely degrades collection query speeds.',
      },
      {
        title: 'Decoupled Client & Server Repositories',
        rationale:
          'Kept frontend and backend in independent pipelines allowing independent deployment triggers and isolating frontend bundle size concerns from Node runtime dependencies.',
        alternativeConsidered:
          'Monolithic Express server serving static React builds, which prevents utilizing Vercel’s global Edge network for UI delivery.',
      },
    ],
    challengesAndDebugging: [
      {
        issue: 'CORS Credentials & Preflight Failures on Free Hosting',
        symptom: 'Browser blocked Axios POST requests with "No Access-Control-Allow-Origin header is present" errors.',
        investigation:
          'Discovered that preflight OPTIONS requests sent by the browser before multipart and JSON requests were being intercepted by standard routing before the CORS middleware was evaluated.',
        resolution:
          'Explicitly configured `cors({ origin: allowedOrigins, credentials: true, methods: ["GET","POST","PUT","DELETE"] })` as the very first middleware in the Express application chain.',
      },
      {
        issue: 'Render Free-Tier Spin-Down Cold Starts',
        symptom: 'First API call after 15 minutes of inactivity took 45-60 seconds to respond, confusing users.',
        investigation:
          'Render spins down free web service instances to zero after inactivity. The client had no indication that a server wakeup was in progress.',
        resolution:
          'Added a client-side health-check ping on application mount with an elegant, non-intrusive "Waking up server..." status toast and retry handler.',
      },
      {
        issue: 'Mongoose ObjectId Casting Errors on Deleted Notes',
        symptom: 'Invalid or deleted note IDs caused Express to crash with an unhandled CastError exception.',
        investigation:
          'Directly passing `req.params.id` into `findById` triggered a CastError if the ID was not a valid 24-character hexadecimal string.',
        resolution:
          'Added ID validation middleware utilizing `mongoose.Types.ObjectId.isValid(req.params.id)` before database invocation, returning clean 400 Bad Request responses.',
      },
    ],
    performanceConsiderations: [
      'Selective field projection (`.select("-__v")`) on all queries to reduce network payload size.',
      'Tailwind CSS purge configuration eliminating 95% of unused utility styles in production.',
      'Client-side debouncing (300ms) on live search input to prevent rapid-fire query dispatch.',
      'Lazy loading for modal dialogs and profile uploaders to minimize initial JavaScript bundle size.',
    ],
    lessonsLearned: [
      'Authentication is more than token issuance; token lifecycle, expiration handling, and ownership validation require rigorous discipline.',
      'Database indexes must match query patterns directly: sorting without an index forces MongoDB to load all documents into RAM.',
      'Deployment environments reveal bugs that never appear on localhost, especially around network timeouts, environment variables, and CORS.',
    ],
    futureImprovements: [
      'Migrate avatar uploads to Cloudinary or AWS S3 presigned URLs for scalable object storage.',
      'Add end-to-end markdown preview with syntax highlighting inside note content.',
      'Implement real-time collaboration or WebSocket synchronization for concurrent multi-device edits.',
      'Integrate an AI summarizer endpoint to generate bulleted summaries of long notes.',
    ],
  },

  'food-delivery': {
    slug: 'food-delivery',
    title: 'Food Delivery Platform',
    subtitle: 'Multi-Surface Restaurant Ordering & Merchant Admin System',
    period: '2024',
    role: 'Full-Stack Developer & API Architect',
    category: 'Full-Stack Multi-App System',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://food-delivery-preview.vercel.app',
    githubUrl: 'https://github.com/omjyotiprakash/food-delivery-app',
    overview:
      'A full-stack multi-client commerce system comprising two independent frontends — a customer shopping portal and a merchant management dashboard — connected to a single Express REST API and MongoDB database. Designed to solve data consistency and order state tracking across multiple user surfaces.',
    theProblem:
      'In multi-actor applications like food delivery, client-side state manipulation presents serious business risks (e.g. users tampering with item prices before submitting an order, or menus showing items that the kitchen has marked out-of-stock). The system required strict server-authoritative validation and synchronized order states.',
    whyIBuiltIt:
      'To build a real-world multi-client architecture where one backend API serves different personas with distinct authorization privileges and data views, while maintaining strict financial and inventory integrity.',
    technicalRequirements: [
      'Customer portal: Browse food categories, filter dishes, manage shopping cart, and place orders',
      'Merchant admin: Add/edit menu items, toggle in-stock availability, and update order statuses',
      'Server-side cart recalculation ensuring submitted prices always match database values',
      'Order lifecycle state machine: Placed → Confirmed → Cooking → Dispatched → Delivered',
      'Persistent cart state stored locally with server-side validation during checkout',
    ],
    technologySelection: [
      {
        tech: 'Dual React Frontends',
        reason:
          'Separating the consumer portal from the merchant dashboard avoids shipping unnecessary administrative code and bundles to end consumers.',
      },
      {
        tech: 'Express.js Shared API',
        reason:
          'Centralizes menu catalog logic, pricing calculation, and order processing in one auditable backend repository.',
      },
      {
        tech: 'MongoDB Documents',
        reason:
          'Orders capture a snapshot of items, quantities, and prices at time of purchase, making non-relational document storage ideal for immutable order receipts.',
      },
    ],
    architecture: {
      overview:
        'Two distinct React applications query a single Express server. The server acts as the single source of truth for menu availability and calculates order totals server-side.',
      layers: [
        {
          layer: 'Customer Portal',
          component: 'React + Context API',
          role: 'Customer browsing, dietary filtering, cart management, and order tracking.',
        },
        {
          layer: 'Admin Dashboard',
          component: 'React + Admin Router',
          role: 'Restaurant operator dashboard for menu inventory and live order status management.',
        },
        {
          layer: 'API Gateway',
          component: 'Express REST Router',
          role: 'Validates order payloads, authenticates merchant credentials, and manages inventory states.',
        },
        {
          layer: 'Persistence',
          component: 'MongoDB Collections',
          role: 'Stores `foodItems`, `categories`, and immutable `orders` snapshots.',
        },
      ],
    },
    databaseDesign: {
      description:
        'Three primary collections: `foods`, `categories`, and `orders`. Orders store embedded copies of purchased items to preserve historical price accuracy even if menu prices change later.',
      collections: [
        {
          name: 'foods',
          purpose: 'Menu catalog items available for order.',
          fields: [
            { name: '_id', type: 'ObjectId', description: 'Unique food item ID' },
            { name: 'name', type: 'String', description: 'Item title (e.g., Paneer Butter Masala)' },
            { name: 'description', type: 'String', description: 'Ingredients & preparation details' },
            { name: 'price', type: 'Number', description: 'Unit price in INR' },
            { name: 'category', type: 'String', description: 'Category identifier (e.g., Rolls, Curries)' },
            { name: 'image', type: 'String', description: 'Image asset URL' },
            { name: 'isAvailable', type: 'Boolean', description: 'Kitchen stock toggle' },
          ],
        },
        {
          name: 'orders',
          purpose: 'Historical customer purchase orders.',
          fields: [
            { name: '_id', type: 'ObjectId', description: 'Unique order ID' },
            { name: 'customer', type: 'Object', description: 'Name, delivery address, phone number' },
            { name: 'items', type: 'Array<ItemSnapshot>', description: 'Array of { foodId, name, priceAtOrder, quantity }' },
            { name: 'subtotal', type: 'Number', description: 'Server-calculated sum' },
            { name: 'deliveryFee', type: 'Number', description: 'Distance/tier delivery charge' },
            { name: 'totalAmount', type: 'Number', description: 'Final verified amount' },
            { name: 'status', type: 'String', description: 'Current state: "Placed" | "Cooking" | "On the way" | "Delivered"' },
            { name: 'paymentStatus', type: 'String', description: '"Pending" | "Paid" | "Failed"' },
            { name: 'createdAt', type: 'Date', description: 'Order submission timestamp' },
          ],
        },
      ],
    },
    frontendArchitecture: {
      summary:
        'Cart state is managed via React Context with localStorage persistence. When users modify item counts, total calculations are rendered optimistically, but final billing is guaranteed by backend verification.',
      keyPatterns: [
        'Persistent Cart Hook: Syncs cart items to localStorage so refreshes do not empty the basket.',
        'Order Status Stepper: Visual progress timeline showing real-time progress of orders.',
        'Category Quick-Tabs: Smooth scroll and instant client-side filtering across meal categories.',
      ],
    },
    backendArchitecture: {
      summary:
        'Express backend strictly validates that any submitted cart item exists in the database and uses current database unit prices to compute final payable amounts.',
      keyPatterns: [
        'Price Reconciliation Middleware: Prevents price tampering by querying database prices directly.',
        'Status Machine Validation: Prohibits invalid status transitions (e.g., moving directly from "Placed" to "Delivered").',
      ],
    },
    apiDesign: [
      {
        method: 'GET',
        endpoint: '/api/food/list',
        description: 'Returns available food items filtered by category.',
        auth: false,
      },
      {
        method: 'POST',
        endpoint: '/api/order/place',
        description: 'Submits an order with items array; server queries database prices and creates order document.',
        auth: false,
      },
      {
        method: 'GET',
        endpoint: '/api/order/userorders',
        description: 'Returns order history for a customer.',
        auth: true,
      },
      {
        method: 'POST',
        endpoint: '/api/admin/food/add',
        description: 'Allows merchant admin to add new food items.',
        auth: true,
      },
      {
        method: 'POST',
        endpoint: '/api/admin/order/status',
        description: 'Updates order status (Placed → Cooking → Out for Delivery).',
        auth: true,
      },
    ],
    authAndSecurity: {
      approach:
        'Admin routes require verified admin credentials. Customer order submissions are sanitized against schema injections.',
      measures: [
        'Server-side price verification: Client-submitted totals are ignored; backend recomputes all subtotals.',
        'Address and phone validation using regex before database write.',
      ],
    },
    implementationDecisions: [
      {
        title: 'Embedding Item Snapshots in Order Documents',
        rationale:
          'Restaurant menu prices change over time. If orders simply referenced item ObjectIds, historical sales reports would distort past receipts whenever a dish price was updated.',
        alternativeConsidered:
          'Normalizing with foreign references, which causes past receipts to display current prices.',
      },
      {
        title: 'Shared Express Backend for Multiple Frontends',
        rationale:
          'Maintains a single source of truth for business logic while allowing frontend interfaces to evolve independently.',
        alternativeConsidered:
          'Building separate backends for customer and admin, which leads to duplicated logic and synchronization drift.',
      },
    ],
    challengesAndDebugging: [
      {
        issue: 'Cart State Drift Between Sessions',
        symptom: 'A customer who left items in cart returned days later after an item was deleted by the restaurant, causing checkout crash.',
        investigation:
          'Frontend cart stored cached item objects that no longer existed in MongoDB.',
        resolution:
          'Added a cart validation check before checkout: the API verifies all items exist and are marked `isAvailable: true`, returning warnings for any discontinued dishes.',
      },
    ],
    performanceConsiderations: [
      'Indexed `category` and `isAvailable` fields for instant menu filtering.',
      'Optimized image sizes with WebP compression for quick loading on mobile networks.',
    ],
    lessonsLearned: [
      'Never trust calculations coming from the client; the server must always be the final authority on money and quantities.',
      'Separating customer and operational views into distinct frontends creates cleaner architectures.',
    ],
    futureImprovements: [
      'Integrate Stripe / Razorpay webhook handlers for automated payment capture.',
      'Add WebSockets / Socket.io for live order status updates without client polling.',
    ],
  },

  cinequirk: {
    slug: 'cinequirk',
    title: 'Cinequirk',
    subtitle: 'Cinema & Television Metadata Discovery Engine',
    period: '2023',
    role: 'Full-Stack Developer',
    category: 'Full-Stack Media Application',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'CSS Modules'],
    liveUrl: 'https://cinequirk.vercel.app',
    githubUrl: 'https://github.com/omjyotiprakash/cinequirk',
    overview:
      'Cinequirk is a content management and discovery platform for cinema and television records. Built to replace static film blogs with a database-driven architecture, it allows storing, categorizing, querying, and reviewing film and television titles with structured metadata.',
    theProblem:
      'Many film enthusiast websites are static, requiring manual HTML edits whenever a new movie or review is published. They lack relational querying (filtering by director, genre, year, rating) and cannot easily support user interactions or watchlist tracking.',
    whyIBuiltIt:
      'Born out of my passion for cinema and storytelling combined with my drive to build full-stack web applications. I wanted to build a database model that could accurately reflect the richness of filmography — cast, crew, release dates, genres, and ratings.',
    technicalRequirements: [
      'Dynamic catalog querying with multi-criteria filtering (genre, release era, rating)',
      'Detailed title view with synopsis, director credits, cast, and runtime',
      'Administrative interface to add, edit, and archive title entries',
      'Search indexing across title names and director names',
      'Responsive film poster gallery with responsive typography',
    ],
    technologySelection: [
      {
        tech: 'React.js',
        reason:
          'Component hierarchy suited media cards, hero backdrops, and modal cast sheets.',
      },
      {
        tech: 'MongoDB',
        reason:
          'Film metadata frequently contains varying fields (e.g. episodic data for series vs runtime for feature films). Document models handle this variability gracefully.',
      },
      {
        tech: 'Node & Express',
        reason:
          'Provides clean RESTful endpoints for CRUD operations and query parameter parsing.',
      },
    ],
    architecture: {
      overview:
        'A single-page React app communicates with an Express API connected to MongoDB Atlas. Query parameters power server-side filtering, sorting, and pagination.',
      layers: [
        {
          layer: 'Client',
          component: 'React UI',
          role: 'Media gallery, search input, genre drawer, and title detail modal.',
        },
        {
          layer: 'API Server',
          component: 'Express Router',
          role: 'Processes filter parameters (e.g. `?genre=sci-fi&year=2023&sort=rating`) and queries MongoDB.',
        },
        {
          layer: 'Database',
          component: 'MongoDB Collection `titles`',
          role: 'Stores media records with text indexes on title and director fields.',
        },
      ],
    },
    databaseDesign: {
      description:
        'The `titles` collection models both feature films and episodic series with polymorphic schema fields.',
      collections: [
        {
          name: 'titles',
          purpose: 'Stores movie and TV show metadata records.',
          fields: [
            { name: '_id', type: 'ObjectId', description: 'Unique media identifier' },
            { name: 'title', type: 'String', description: 'Title name (e.g., Past Lives, Dune)' },
            { name: 'type', type: 'String', description: '"movie" | "series"' },
            { name: 'releaseYear', type: 'Number', description: 'Year of theatrical or OTT release' },
            { name: 'director', type: 'String', description: 'Primary director / creator' },
            { name: 'genres', type: 'Array<String>', description: 'List of genres (e.g., Drama, Sci-Fi)' },
            { name: 'synopsis', type: 'String', description: 'Editorial plot overview' },
            { name: 'rating', type: 'Number', description: 'Editorial rating (1 to 10 scale)' },
            { name: 'posterUrl', type: 'String', description: 'Poster image URL' },
            { name: 'runtimeMinutes', type: 'Number', description: 'Duration in minutes' },
          ],
          indexes: ['{ title: "text", director: "text" }', '{ genres: 1, releaseYear: -1 }'],
        },
      ],
    },
    frontendArchitecture: {
      summary:
        'React state handles active filters, search keywords, and modal views. Custom hook `useFetchTitles` coordinates fetching with abort controllers for request cancellation.',
      keyPatterns: [
        'Request Cancellation: Uses `AbortController` to cancel pending API requests when user types quickly in search.',
        'Fluid Media Grid: CSS Grid with `repeat(auto-fill, minmax(200px, 1fr))` for responsive poster layouts.',
      ],
    },
    backendArchitecture: {
      summary:
        'Express controllers dynamically construct MongoDB filter queries based on sanitized `req.query` arguments.',
      keyPatterns: [
        'Dynamic Filter Builder: Converts query parameters into MongoDB match stages cleanly without hardcoding.',
        'Text Search Integration: Utilizes MongoDB text index score for relevant search ranking.',
      ],
    },
    apiDesign: [
      {
        method: 'GET',
        endpoint: '/api/titles',
        description: 'Lists titles with query filters (`genre`, `year`, `search`, `limit`, `skip`).',
        auth: false,
      },
      {
        method: 'GET',
        endpoint: '/api/titles/:id',
        description: 'Returns complete metadata for a specific title.',
        auth: false,
      },
      {
        method: 'POST',
        endpoint: '/api/titles',
        description: 'Creates a new title entry in the catalog.',
        auth: true,
      },
      {
        method: 'PUT',
        endpoint: '/api/titles/:id',
        description: 'Updates existing title metadata.',
        auth: true,
      },
      {
        method: 'DELETE',
        endpoint: '/api/titles/:id',
        description: 'Deletes a title from the catalog.',
        auth: true,
      },
    ],
    authAndSecurity: {
      approach:
        'Admin modification routes are secured with basic bearer token validation.',
      measures: [
        'Sanitized input fields to prevent script injection in synopsis descriptions.',
        'Numeric bounds enforcement on ratings (1-10) and release years.',
      ],
    },
    implementationDecisions: [
      {
        title: 'Text Indexing vs Regex Search',
        rationale:
          'Using MongoDB text indexing (`$text: { $search: query }`) is drastically faster than running unanchored regular expressions (`$regex: /query/i`), which force full collection scans.',
        alternativeConsidered:
          'Case-insensitive regex search, which degraded performance as catalog grew.',
      },
    ],
    challengesAndDebugging: [
      {
        issue: 'Broken Image Links in Media Grid',
        symptom: 'Remote image URLs occasionally failed to load, leaving empty grey boxes in the grid.',
        investigation:
          'External CDN image links were intermittently unavailable or blocked by browser extensions.',
        resolution:
          'Implemented an `<ImageWithFallback>` React component that gracefully catches `onError` and renders a beautifully styled poster placeholder with the film title and director.',
      },
    ],
    performanceConsiderations: [
      'Image lazy loading using native `loading="lazy"` on all gallery cards.',
      'Pagination with limit/skip to prevent returning hundreds of documents on initial load.',
    ],
    lessonsLearned: [
      'Handling real-world media data requires resilient UI fallbacks for missing images, variable text lengths, and differing data shapes.',
      'Connecting personal creative passions (cinema) with software development produces higher quality, more thoughtful work.',
    ],
    futureImprovements: [
      'Add user watchlists and personal film rating profiles.',
      'Integrate TMDb (The Movie Database) API for automated poster and cast enrichment.',
    ],
  },

  eduquirk: {
    slug: 'eduquirk',
    title: 'EDUQUIRK',
    subtitle: 'Modular Learner Progression & Curriculum Interface Architecture',
    period: '2023',
    role: 'Product Designer & Frontend Architect',
    category: 'Product Concept & UI Architecture',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'State Machines'],
    githubUrl: 'https://github.com/omjyotiprakash/eduquirk',
    overview:
      'EDUQUIRK is an EdTech product concept and interactive interface that re-thinks online technical curriculum navigation. Instead of endless linear video lists, it models learning paths as dependency graphs with milestone checkpoints, practical challenges, and cognitive pacing.',
    theProblem:
      'Traditional online course platforms present flat, overwhelming lists of video links that induce cognitive overload and fail to convey prerequisite dependencies.',
    whyIBuiltIt:
      'Having navigated countless online programming tutorials, I observed that the primary reason learners drop out is lack of clear progression feedback and rigid linear structures. I wanted to design an interface that makes learning paths feel structured, modular, and achievable.',
    technicalRequirements: [
      'Hierarchical curriculum model (Course → Module → Lesson → Exercise)',
      'Prerequisite gating (subsequent modules unlock only after completing foundational steps)',
      'Visual progress visualization with completion percentage and milestone badges',
      'Distraction-free reading view with toggleable code sandbox previews',
    ],
    technologySelection: [
      {
        tech: 'TypeScript',
        reason:
          'Rigid typing for curriculum nodes, prerequisite IDs, and completion states prevented runtime invalid states.',
      },
      {
        tech: 'React Components',
        reason:
          'Allowed breaking complex visual hierarchy into reusable, testable UI nodes.',
      },
    ],
    architecture: {
      overview:
        'Client-side state architecture modeling curriculum modules as directed acyclic graph (DAG) nodes.',
      layers: [
        {
          layer: 'Graph Model',
          component: 'Curriculum Tree Definition',
          role: 'Declares modules, lesson IDs, and prerequisite dependencies.',
        },
        {
          layer: 'Progress Engine',
          component: 'State Machine Hook',
          role: 'Computes unlocked modules and completed milestones based on stored learner history.',
        },
        {
          layer: 'Presentation Layer',
          component: 'Modular Card UI',
          role: 'Renders accessible milestone cards, progress bars, and exercise launchpads.',
        },
      ],
    },
    databaseDesign: {
      description:
        'Conceptual document schema representing user course progress and curriculum structures.',
      collections: [
        {
          name: 'curricula',
          purpose: 'Stores structured modules, topics, and lessons.',
          fields: [
            { name: '_id', type: 'ObjectId', description: 'Curriculum identifier' },
            { name: 'title', type: 'String', description: 'Course name' },
            { name: 'modules', type: 'Array<Module>', description: 'Ordered modules with prerequisites' },
          ],
        },
      ],
    },
    frontendArchitecture: {
      summary:
        'Pure functional React architecture using declarative state transitions for module unlocking.',
      keyPatterns: [
        'Computed Progress Selectors: Calculates overall progress on the fly rather than storing redundant progress counters.',
        'Accessible Focus States: Full keyboard navigable module cards for seamless tab traversal.',
      ],
    },
    backendArchitecture: {
      summary:
        'Designed as a headless REST contract returning structured course graphs with minimal nested overhead.',
      keyPatterns: ['Normalized payload responses separating lesson content from progression metadata.'],
    },
    apiDesign: [
      {
        method: 'GET',
        endpoint: '/api/curriculum/:slug',
        description: 'Returns the full curriculum structure for a topic.',
        auth: false,
      },
      {
        method: 'POST',
        endpoint: '/api/progress/complete',
        description: 'Records lesson completion and returns newly unlocked nodes.',
        auth: true,
      },
    ],
    authAndSecurity: {
      approach: 'Client-side mock with verified token contract design.',
      measures: ['Deterministic validation preventing client spoofing of prerequisite requirements.'],
    },
    implementationDecisions: [
      {
        title: 'Modeling Prerequisites as Explicit ID Arrays',
        rationale:
          'Allows non-linear learning tracks (e.g. learning CSS Grid or Flexbox in either order before unlocking Layout Mastery).',
        alternativeConsidered:
          'Strict numerical sequence indexing, which forces learners into rigid one-size-fits-all pathways.',
      },
    ],
    challengesAndDebugging: [
      {
        issue: 'Circular Dependency Edge Cases in Curriculum Graphs',
        symptom: 'Accidentally assigning mutually dependent prerequisites caused infinite unlock locks.',
        investigation:
          'Identified that without graph validation, module A requiring module B which required module A rendered both permanently locked.',
        resolution:
          'Implemented a cycle-detection check (DFS graph traversal) in the data definition validator.',
      },
    ],
    performanceConsiderations: [
      'Pure memoized selectors to avoid re-rendering entire module trees on single checkbox toggles.',
    ],
    lessonsLearned: [
      'Good product design is deeply linked to data structures: modeling curricula as graphs made the UI intuitive and flexible.',
    ],
    futureImprovements: [
      'Build a live interactive browser code sandbox for inline exercise execution.',
      'Implement AI quiz generator tailored to the specific topics in each completed module.',
    ],
  },

  smartpark: {
    slug: 'smartpark',
    title: 'SmartPark',
    subtitle: 'Real-Time Parking Slot Allocation & Concurrency Simulator',
    period: '2023',
    role: 'Systems & Logic Developer',
    category: 'Simulation & Systems Logic',
    stack: ['TypeScript', 'React', 'Concurrency Logic', 'State Management'],
    githubUrl: 'https://github.com/omjyotiprakash/smartpark',
    overview:
      'SmartPark is an interactive software simulation investigating parking slot state transitions, hold timeouts, and concurrency conflict resolution. It demonstrates how finite physical resources are managed in real-time software systems without race conditions.',
    theProblem:
      'In high-demand reservation systems (parking facilities, event ticketing, ride booking), multiple users attempt to reserve the same resource simultaneously. Naive architectures lead to race conditions, double-bookings, or slots permanently locked by abandoned sessions.',
    whyIBuiltIt:
      'To build a practical, visual simulation of resource allocation algorithms, race conditions, and timeout expiration queues outside of abstract textbook theory.',
    technicalRequirements: [
      'Interactive visual slot grid showing real-time states (Available, Held, Occupied)',
      'Timed reservation locks with active countdown timers (e.g., 60-second checkout hold)',
      'Automatic state release upon hold expiration',
      'Simulated multi-vehicle booking requests to verify race condition avoidance',
      'Live metrics panel tracking occupancy rate, average hold duration, and turnover',
    ],
    technologySelection: [
      {
        tech: 'TypeScript',
        reason:
          'Strict discriminated union types (`type SlotState = "AVAILABLE" | "HELD" | "OCCUPIED"`) guarantee that invalid state transitions cannot compile.',
      },
      {
        tech: 'React & requestAnimationFrame / setInterval',
        reason:
          'High-precision timer management with predictable state updates.',
      },
    ],
    architecture: {
      overview:
        'A centralized state machine managing an array of slot objects with individual timers and status transitions.',
      layers: [
        {
          layer: 'Slot State Store',
          component: 'State Machine Reducer',
          role: 'Handles atomic actions: `HOLD_SLOT`, `CONFIRM_OCCUPANCY`, `RELEASE_SLOT`, `EXPIRE_HOLD`.',
        },
        {
          layer: 'Timer Engine',
          component: 'Clock Dispatcher',
          role: 'Monitors active hold countdowns and dispatches expiration events when hold periods end.',
        },
        {
          layer: 'Visualization Grid',
          component: 'Interactive React Canvas / Grid',
          role: 'Renders parking bays, status colors, remaining seconds, and action triggers.',
        },
      ],
    },
    databaseDesign: {
      description:
        'In-memory state schema representing parking slots and reservation sessions.',
      collections: [
        {
          name: 'parkingSlots',
          purpose: 'Represents physical parking spaces and their active status.',
          fields: [
            { name: 'id', type: 'String', description: 'Unique bay code (e.g., "A-01", "B-04")' },
            { name: 'zone', type: 'String', description: 'Zone tier ("Standard", "EV Charging", "Accessible")' },
            { name: 'status', type: 'Enum', description: '"AVAILABLE" | "HELD" | "OCCUPIED"' },
            { name: 'heldAt', type: 'Timestamp', description: 'Time reservation lock was placed' },
            { name: 'expiresAt', type: 'Timestamp', description: 'Time hold will automatically cancel' },
            { name: 'vehiclePlate', type: 'String', description: 'Simulated vehicle identifier' },
          ],
        },
      ],
    },
    frontendArchitecture: {
      summary:
        'Component grid with color-coded slots (Green: Available, Amber: Held with countdown, Slate: Occupied). Users can click slots to simulate reserving, occupying, or releasing them.',
      keyPatterns: [
        'Atomic Reducer Transitions: Prevents double-booking by verifying slot is AVAILABLE before setting to HELD.',
        'Visual Countdown Indicators: SVG circular progress bars displaying remaining hold seconds.',
      ],
    },
    backendArchitecture: {
      summary:
        'Simulated backend queue testing high-concurrency reservation attempts against the state engine.',
      keyPatterns: ['Optimistic locking pattern simulation.'],
    },
    apiDesign: [
      {
        method: 'POST',
        endpoint: '/api/slots/:id/hold',
        description: 'Attempts to acquire a temporary reservation hold on a slot.',
        auth: false,
      },
      {
        method: 'POST',
        endpoint: '/api/slots/:id/confirm',
        description: 'Transitions a held slot into occupied upon simulated payment.',
        auth: false,
      },
      {
        method: 'POST',
        endpoint: '/api/slots/:id/release',
        description: 'Releases an occupied slot back to available.',
        auth: false,
      },
    ],
    authAndSecurity: {
      approach: 'Idempotency and lock tokens preventing unauthorized release.',
      measures: ['Lock tokens: only the simulated user holding the lock can confirm occupancy.'],
    },
    implementationDecisions: [
      {
        title: 'Discriminated Unions for Slot State',
        rationale:
          'Guarantees that a slot in "AVAILABLE" status cannot have an `expiresAt` timestamp, and a slot in "HELD" status must have a valid expiration time.',
        alternativeConsidered:
          'Multiple loose boolean flags (`isHeld`, `isOccupied`), which frequently produce contradictory states (`isHeld: true, isOccupied: true`).',
      },
    ],
    challengesAndDebugging: [
      {
        issue: 'Timer Drift and Re-render Performance',
        symptom: 'Setting individual setInterval timers for 50 slots caused heavy CPU load and jerky animations.',
        investigation:
          'Dozens of independent timers were waking up JavaScript threads asynchronously and forcing multiple state updates per frame.',
        resolution:
          'Unified into a single centralized tick loop running once per second, calculating elapsed time against recorded epoch timestamps.',
      },
    ],
    performanceConsiderations: [
      'Single centralized tick loop instead of per-slot timers.',
      'Immutable state updates ensuring React only re-renders the specific slot whose state changed.',
    ],
    lessonsLearned: [
      'Handling concurrency and state timeouts requires clean mathematical models rather than ad-hoc flags.',
      'Simulations are one of the most effective ways to stress-test architectural decisions before committing to production infrastructure.',
    ],
    futureImprovements: [
      'Add simulated traffic surges to measure algorithmic throughput under peak loads.',
      'Implement dynamic surge pricing logic based on real-time occupancy percentages.',
    ],
  },
}
