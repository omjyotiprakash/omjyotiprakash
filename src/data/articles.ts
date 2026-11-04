import type { Article } from '@/types'

export const articles: Article[] = [
  {
    slug: 'building-auth-in-mern-without-shortcuts',
    title: 'Building Production Authentication in MERN Without Shortcuts',
    description:
      'A systematic breakdown of JWT lifecycles, httpOnly cookies vs Authorization headers, bcrypt salt costs, and ownership guard middleware in Node.js and React.',
    publishedAt: 'October 2024',
    readingTime: '7 min read',
    category: 'Full-stack development',
    tags: ['Node.js', 'Express', 'JWT', 'Security', 'React'],
    content: `
Authentication is one of the easiest things to build incorrectly in web applications. Most online tutorials demonstrate storing raw JWT tokens in browser localStorage, skipping token expiration handling, and leaving routes vulnerable to cross-site scripting (XSS) or insecure direct object references (IDOR).

When building **QuickNote**, I made a conscious choice to avoid these shortcuts and implement authentication that reflects real-world engineering standards.

---

### The Three Security Flaws of Naive MERN Auth

1. **LocalStorage Token Storage:** Placing JWTs in \`localStorage\` makes them accessible to any script executing on your domain. A single vulnerable NPM dependency or unsanitized user comment can exfiltrate session tokens.
2. **Missing Token Expiration Discipline:** Issuing tokens that never expire (or have 1-year lifespans) means a compromised token remains valid indefinitely.
3. **Implicit Ownership Assumptions:** Assuming that because an endpoint is protected by an auth middleware, any authenticated user is allowed to edit or delete any resource ID passed in the URL.

---

### Layer 1: Password Salting with Bcrypt

Passwords must never touch database storage in plain text. We utilize bcrypt with a work factor (salt rounds) of 10. This provides a balance between brute-force resistance and server request throughput:

\`\`\`javascript
// models/User.js
const bcrypt = require('bcryptjs');

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  // Cost factor 10 generates 2^10 hashing iterations
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
\`\`\`

---

### Layer 2: The Token Verification Middleware

Our Express auth middleware does not just check for token presence; it strictly verifies the signature, decodes the claims, and ensures the referenced user account still exists in the database:

\`\`\`javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  
  // Support both Bearer headers and secure cookies
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied: no authentication token provided.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'The token belongs to a user that no longer exists.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token.' 
    });
  }
};
\`\`\`

---

### Layer 3: Preventing IDOR (Insecure Direct Object References)

The most common logical flaw after setting up authentication is forgetting to verify whether the logged-in user actually owns the resource they are mutating:

\`\`\`javascript
// controllers/noteController.js
exports.deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  
  if (!note) {
    return res.status(404).json({ success: false, message: 'Note not found' });
  }

  // Critical ownership verification check:
  if (note.userId.toString() !== req.user.id.toString()) {
    return res.status(403).json({ 
      success: false, 
      message: 'Forbidden: You do not have permission to delete this note.' 
    });
  }

  await note.deleteOne();
  res.status(200).json({ success: true, message: 'Note removed' });
};
\`\`\`

---

### Summary Takeaways

- Treat user tokens as credentials: sign with strong secrets, set explicit expiration, and avoid storing sensitive personal data in the token payload.
- Always verify ownership on mutation endpoints (\`PUT\`, \`DELETE\`, \`PATCH\`).
- Handle cold starts and expired tokens gracefully on the frontend with Axios interceptors that redirect to sign-in without breaking UI state.
    `,
  },
  {
    slug: 'preventing-over-fetching-in-mongodb',
    title: 'Preventing Over-Fetching: Schema Design and Compound Indexing in MongoDB',
    description:
      'How to design Mongoose schemas that stay fast at scale, eliminate unindexed collection scans, and leverage projections to reduce network payload sizes.',
    publishedAt: 'September 2024',
    readingTime: '6 min read',
    category: 'MongoDB',
    tags: ['MongoDB', 'Mongoose', 'Database architecture', 'Performance'],
    content: `
When you start building with MongoDB and Mongoose, it is easy to assume that because queries work instantly on development datasets of 50 documents, they will behave equally well in production.

However, without intentional schema design and compound indexing, your database quickly devolves into performing expensive collection scans (\`COLLSCAN\`), loading unnecessary fields into server memory, and exhausting bandwidth.

---

### Rule 1: The Power of Explicit Projections

By default, calling \`Note.find({ userId })\` retrieves every single field of every matching document, including long markdown content, audit timestamps, and internal version keys (\`__v\`).

For list views and dashboard grids, you only need the title, tags, and updated timestamp. Leveraging Mongoose \`.select()\` dramatically reduces JSON serialization overhead:

\`\`\`javascript
// Inefficient: Fetches entire document payload
const notes = await Note.find({ userId: req.user.id });

// Optimized: Projections retrieve only necessary fields for dashboard cards
const notes = await Note.find({ userId: req.user.id })
  .select('title tags isPinned updatedAt isPublic')
  .sort({ updatedAt: -1 })
  .lean();
\`\`\`

Notice the \`.lean()\` call at the end. Calling \`.lean()\` instructs Mongoose to return plain JavaScript objects instead of heavy Mongoose Document instances with change-tracking overhead. When you are only reading data, \`.lean()\` can yield a 3x to 5x performance improvement.

---

### Rule 2: Compound Indexing and the ESR Rule

In **QuickNote**, the most frequent query is:
*"Fetch all public notes, or fetch all notes belonging to user X, sorted by most recent date."*

A naive index on \`userId\` alone is not enough: MongoDB can locate the user's notes using the index, but then must perform an in-memory sort (\`SORT\` stage) to order them by date. If the result set exceeds 32MB, MongoDB throws an error!

To solve this, follow the **ESR (Equality, Sort, Range)** indexing guideline:

\`\`\`javascript
// Equality first (userId), Sort next (createdAt: -1)
noteSchema.index({ userId: 1, createdAt: -1 });

// For public feed discovery queries
noteSchema.index({ isPublic: 1, createdAt: -1 });
\`\`\`

With this compound index in place, MongoDB traverses the index in the exact order requested, eliminating the in-memory sort stage entirely.

---

### Inspecting with .explain("executionStats")

Never guess whether your index is working. Verify it using MongoDB's explain plan:

\`\`\`javascript
const stats = await Note.find({ userId: someUserId })
  .sort({ createdAt: -1 })
  .explain("executionStats");

console.log('Stage:', stats.executionStats.executionStages.stage); 
// Should be: "IXSCAN" (Index Scan), NEVER "COLLSCAN" (Collection Scan)

console.log('Keys Examined:', stats.executionStats.totalKeysExamined);
console.log('Docs Returned:', stats.executionStats.nReturned);
\`\`\`

If \`totalKeysExamined\` closely matches \`nReturned\`, your index is optimal.

---

### Conclusion

Engineering discipline with databases starts before you hit high traffic. Applying lean queries, precise projections, and the ESR rule for compound indexes ensures your MERN backend remains snappy and cost-effective.
    `,
  },
  {
    slug: 'state-management-from-scratch-shopping-cart',
    title: 'State Management from Scratch: Modeling Shopping Carts Without Chaos',
    description:
      'Designing a dependable, client-persistent shopping cart in React that resists desynchronization, price tampering, and race conditions.',
    publishedAt: 'August 2024',
    readingTime: '8 min read',
    category: 'React',
    tags: ['React', 'TypeScript', 'State architecture', 'E-commerce'],
    content: `
Building an e-commerce or food delivery shopping cart looks deceptively simple: an array of items, an increment button, a decrement button, and a subtotal display.

In practice, shopping carts are a magnet for subtle edge-case bugs:
- What happens when a user refreshes the page mid-order?
- What happens if the customer modifies the HTML price attribute before submitting?
- What happens if two tabs modify the cart at the same time?
- What happens when an item currently in the cart goes out of stock in the restaurant kitchen?

During the development of the **Food Delivery Platform**, I designed a state machine and API reconciliation flow to address these challenges.

---

### The Golden Rule: The Client Proposes, The Server Decides

Never calculate final billing on the frontend and send the calculated total to the backend for payment. A malicious user can intercept the HTTP payload and modify \`totalAmount: 1\`.

Instead:
1. The client maintains cart items as an array of \`{ itemId, quantity }\`.
2. When the user proceeds to checkout, the client transmits only the item IDs and requested quantities.
3. The Express server queries the live database for each item ID, checks current availability, retrieves the authoritative unit price, and computes the subtotal, taxes, and delivery fees server-side.

\`\`\`typescript
// Server-side verification controller
export const calculateOrderTotal = async (items: { foodId: string; quantity: number }[]) => {
  let subtotal = 0;
  const verifiedItems = [];

  for (const item of items) {
    const food = await Food.findById(item.foodId);
    
    if (!food || !food.isAvailable) {
      throw new Error(\`Item "\${food ? food.name : 'Unknown'}" is currently unavailable.\`);
    }

    const itemTotal = food.price * item.quantity;
    subtotal += itemTotal;
    
    verifiedItems.push({
      foodId: food._id,
      name: food.name,
      priceAtOrder: food.price, // Freeze price snapshot
      quantity: item.quantity,
    });
  }

  const deliveryFee = subtotal > 500 ? 0 : 40;
  const grandTotal = subtotal + deliveryFee;

  return { subtotal, deliveryFee, grandTotal, verifiedItems };
};
\`\`\`

---

### Immutable State Transitions with React Reducer

Using multiple \`useState\` hooks for cart items, counts, and promo codes leads to tearing and inconsistent renders. A clean \`useReducer\` setup enforces predictable state transitions:

\`\`\`typescript
type CartAction =
  | { type: 'ADD_ITEM'; payload: FoodItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}
\`\`\`

---

### Syncing with LocalStorage Safely

To ensure cart survival across page reloads without causing hydration mismatches or JSON parse crashes:

\`\`\`typescript
export function useCartWithStorage() {
  const [cart, dispatch] = useReducer(cartReducer, null, () => {
    try {
      const stored = localStorage.getItem('app_cart_state');
      return stored ? JSON.parse(stored) : { items: [] };
    } catch {
      return { items: [] };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('app_cart_state', JSON.stringify(cart));
    } catch (err) {
      console.warn('Unable to persist cart state to localStorage', err);
    }
  }, [cart]);

  return [cart, dispatch] as const;
}
\`\`\`

---

### Key Takeaway

Treat client state as a transient UI cache and the backend database as the single source of financial truth. This mindset eliminates an entire class of security vulnerabilities and state synchronization defects.
    `,
  },
  {
    slug: 'practical-patterns-for-integrating-llms',
    title: 'Practical Patterns for Integrating LLMs into Web Applications',
    description:
      'Moving beyond open-ended chat prompts to build reliable, structured, schema-validated AI features in production software.',
    publishedAt: 'July 2024',
    readingTime: '7 min read',
    category: 'AI integration',
    tags: ['AI integration', 'Node.js', 'TypeScript', 'Product engineering'],
    content: `
Many developer portfolios and hackathon projects introduce "AI integration" by rendering a generic chat window on the bottom right of the screen.

While conversational chat has its place, it is rarely the most effective way for users to accomplish tasks. In software engineering, the real power of Large Language Models (LLMs) comes from treating them as **probabilistic processing engines that produce deterministic, structured data**.

---

### Pattern 1: Enforcing Strict JSON Schemas

If your application asks an LLM to generate tags for a note or extract ingredients from a recipe, you cannot rely on unstructured markdown strings. You need valid JSON that matches a TypeScript interface.

Instead of prompting *"Please return JSON and do not say anything else"*, modern APIs support structured outputs and JSON schema enforcement:

\`\`\`typescript
import { z } from 'zod';

// Define the exact schema your backend application expects
export const TagExtractionSchema = z.object({
  suggestedTags: z.array(z.string().toLowerCase().trim()).max(5),
  sentiment: z.enum(['positive', 'neutral', 'reflective', 'urgent']),
  estimatedReadTimeMinutes: z.number().int().positive(),
  oneSentenceSummary: z.string().max(140),
});

export type TagExtractionResult = z.infer<typeof TagExtractionSchema>;
\`\`\`

When the API returns a response, validate it immediately using your schema:

\`\`\`typescript
const rawResult = JSON.parse(apiResponseText);
const validated = TagExtractionSchema.safeParse(rawResult);

if (!validated.success) {
  // Graceful fallback to default heuristic instead of crashing UI
  console.error('LLM output schema mismatch:', validated.error);
  return fallbackExtraction(noteContent);
}

return validated.data;
\`\`\`

---

### Pattern 2: Graceful Degradation & Fallbacks

LLM APIs can experience rate limits, latency spikes, or temporary downtime. A well-engineered web application should **never completely break** simply because an external AI service is unreachable.

Always implement a two-tiered processing strategy:
1. Attempt the AI-enhanced analysis with a strict timeout (e.g., 3500ms).
2. If the request times out or returns an error, cleanly degrade to a deterministic rule-based algorithm (such as regular expressions or keyword frequency analysis) and notify the user with an unobtrusive notice.

---

### Pattern 3: Progressive Streaming for Perceived Performance

Waiting 4 seconds for an LLM to finish generating a paragraph feels slow. Streaming tokens via Server-Sent Events (SSE) or Fetch ReadableStreams displays the first words within 300ms, making the application feel instantaneous:

\`\`\`typescript
// Client-side consumption of streaming endpoint
const response = await fetch('/api/ai/summarize-stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ content: noteContent }),
});

const reader = response.body?.getReader();
const decoder = new TextDecoder();
let accumulated = '';

while (reader) {
  const { done, value } = await reader.read();
  if (done) break;
  accumulated += decoder.decode(value, { stream: true });
  setStreamingText(accumulated);
}
\`\`\`

---

### Conclusion

The future of software engineering is not replacing software with chatbots; it is embedding intelligence into the interfaces and workflows we already use. Prioritizing structured schemas, strict fallback handling, and progressive streaming turns AI from a gimmick into a dependable product feature.
    `,
  },
  {
    slug: 'the-discipline-of-web-performance',
    title: 'The Discipline of Web Performance: What 100ms Means for User Trust',
    description:
      'Why performance is a user experience feature: eliminating Cumulative Layout Shift (CLS), optimizing font rendering, and splitting JavaScript bundles.',
    publishedAt: 'June 2024',
    readingTime: '5 min read',
    category: 'Engineering lessons',
    tags: ['Performance', 'Frontend', 'Core Web Vitals', 'CSS'],
    content: `
Performance is rarely about micro-optimizing a \`for\` loop by 2 nanoseconds. It is about respecting the user’s device, battery, and data plan.

When a website stutters, shifts content while you are trying to tap a link, or blocks rendering for 3 seconds while downloading megabytes of unused vendor libraries, it communicates a lack of care.

---

### 1. Eliminating Cumulative Layout Shift (CLS)

Cumulative Layout Shift occurs when visible page elements move unexpectedly as images, web fonts, or dynamic ads load into the DOM.

The single most effective fix is providing explicit aspect ratios or width/height dimensions on media elements:

\`\`\`html
<!-- Bad: Causes layout reflow when image finishes downloading -->
<img src="/poster.webp" alt="Dune poster" />

<!-- Good: Reserves layout space immediately before bytes arrive -->
<div class="aspect-[2/3] w-full overflow-hidden rounded-lg bg-secondary">
  <img 
    src="/poster.webp" 
    alt="Dune poster" 
    loading="lazy" 
    class="h-full w-full object-cover" 
  />
</div>
\`\`\`

---

### 2. Font Loading Without Layout Flash

Web fonts downloaded from external services can trigger FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled Text) if not loaded properly.

By configuring \`display=swap\` and declaring matching fallback font stacks with adjusted metric overrides, the text renders immediately with systemic system fonts and smoothly swaps once the custom typeface arrives:

\`\`\`css
/* fonts.css */
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Inter:wght@400;500;600&display=swap");

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
\`\`\`

---

### 3. Route-Level Code Splitting

In Single Page Applications built with React, users should only download the JavaScript code required for the page they are currently viewing. Loading the admin dashboard or complex lab playground tools on the homepage wastes mobile bandwidth.

Using React Router with dynamic \`lazy()\` imports ensures each route lives in its own chunk:

\`\`\`typescript
// App.tsx
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const Home = lazy(() => import('@/pages/Home'));
const ProjectCaseStudy = lazy(() => import('@/pages/ProjectCaseStudy'));
const Lab = lazy(() => import('@/pages/Lab'));

export default function App() {
  return (
    <Suspense fallback={<RouteLoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        <Route path="/lab" element={<Lab />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

---

### Conclusion

Fast websites do not happen by accident; they are the result of deliberate constraints, continuous testing on real mobile hardware, and treating web performance as a core engineering discipline.
    `,
  },
]

