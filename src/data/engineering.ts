export interface EngineeringTopic {
  id: string
  title: string
  category: string
  summary: string
  keyTakeaways: string[]
  codeSnippet?: {
    language: string
    filename: string
    code: string
  }
  diagram?: {
    type: string
    nodes: string[]
  }
}

export const engineeringTopics: EngineeringTopic[] = [
  {
    id: 'frontend-architecture',
    title: 'Frontend Component Architecture & State Boundary Isolation',
    category: 'Frontend Engineering',
    summary:
      'Designing UI component hierarchies where state is kept as local as possible, side effects are encapsulated in custom hooks, and presentation remains pure and easily testable.',
    keyTakeaways: [
      'Colocate state with where it is consumed; avoid premature global state wrappers.',
      'Separate data-fetching hooks from presentational markup to allow clean visual iteration.',
      'Use discriminated unions in TypeScript to model mutually exclusive UI states (loading, success, error) rather than multiple disjoint booleans.',
      'Enforce accessible keyboard interactions (focus management, escape key handlers, ARIA live regions) from day one.',
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'hooks/useNotesQuery.ts',
      code: `import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

type QueryState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

export function useNotesQuery(tagFilter?: string) {
  const [state, setState] = useState<QueryState<Note[]>>({ status: 'loading' });

  const fetchNotes = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const url = tagFilter ? \`/api/notes?tag=\${encodeURIComponent(tagFilter)}\` : '/api/notes';
      const { data } = await axios.get(url);
      setState({ status: 'success', data: data.notes });
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to load notes. Please check connection.';
      setState({ status: 'error', message });
    }
  }, [tagFilter]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { state, refetch: fetchNotes };
}`,
    },
  },
  {
    id: 'backend-api-design',
    title: 'RESTful API Architecture & Layered Express Controllers',
    category: 'Backend Engineering',
    summary:
      'Structuring Express.js applications with strict separation of concerns: routes declare endpoints and middleware, controllers coordinate business logic, and services/models interact with databases.',
    keyTakeaways: [
      'Routes should remain declarative: only URL endpoints, HTTP methods, and middleware bindings.',
      'Controllers should validate request payloads (with tools like Zod) before delegating to database operations.',
      'Centralize error handling in custom error classes with explicit HTTP status codes.',
      'Always return uniform JSON responses: `{ success: boolean, data?: any, message?: string }`.',
    ],
    codeSnippet: {
      language: 'javascript',
      filename: 'controllers/notes.controller.js',
      code: `const Note = require('../models/Note');
const AppError = require('../utils/AppError');

exports.createNote = async (req, res, next) => {
  try {
    const { title, content, tags, isPublic } = req.body;

    if (!title || title.trim().length === 0) {
      return next(new AppError('Note title is required.', 400));
    }

    const note = await Note.create({
      userId: req.user.id,
      title: title.trim(),
      content: content || '',
      tags: Array.isArray(tags) ? tags.map(t => t.toLowerCase().trim()) : [],
      isPublic: Boolean(isPublic),
    });

    res.status(201).json({
      success: true,
      message: 'Note created successfully.',
      note,
    });
  } catch (error) {
    next(error);
  }
};`,
    },
  },
  {
    id: 'database-indexing',
    title: 'Database Design & Compound Indexing Strategy in MongoDB',
    category: 'Database Architecture',
    summary:
      'Designing document models and compound indexes to satisfy query patterns with index scans instead of full collection scans.',
    keyTakeaways: [
      'Follow the ESR Rule (Equality, Sort, Range) when defining multi-field compound indexes.',
      'Always index foreign key reference fields (such as `userId` or `orderId`) in child collections.',
      'Keep documents bounded: avoid unbounded arrays inside documents that can grow past the 16MB BSON limit.',
      'Use `.lean()` for read-only queries to bypass Mongoose hydration overhead.',
    ],
    codeSnippet: {
      language: 'javascript',
      filename: 'models/Note.js',
      code: `const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '' },
    tags: [{ type: String, trim: true, lowercase: true }],
    isPublic: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Compound index satisfying: Equality (userId) + Sort (createdAt: -1)
noteSchema.index({ userId: 1, createdAt: -1 });

// Compound index satisfying: Equality (isPublic) + Sort (createdAt: -1)
noteSchema.index({ isPublic: 1, createdAt: -1 });

module.exports = mongoose.model('Note', noteSchema);`,
    },
  },
  {
    id: 'auth-security',
    title: 'Authentication, Token Lifecycles & Defense in Depth',
    category: 'Security & Auth',
    summary:
      'Securing user authentication through cryptographic password hashing, signed JWT tokens, and strict resource ownership checks.',
    keyTakeaways: [
      'Passwords salted and hashed using bcrypt (cost factor 10) before touching the database.',
      'JWT tokens signed with cryptographically random secrets and explicit expirations (e.g. 7 days).',
      'Never trust client IDs: always verify that `resource.userId.equals(req.user._id)`.',
      'Implement CORS whitelists and security headers to prevent unauthorized cross-origin mutations.',
    ],
    codeSnippet: {
      language: 'javascript',
      filename: 'middleware/authGuard.js',
      code: `const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function authGuard(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
  }
};`,
    },
  },
  {
    id: 'performance-optimization',
    title: 'Web Performance & Core Web Vitals Optimization',
    category: 'Performance Engineering',
    summary:
      'Optimizing page speed and interaction responsiveness across modern mobile devices and slower cellular networks.',
    keyTakeaways: [
      'Code-split routes using React `lazy()` and dynamic imports to keep initial bundle size under 150KB gzip.',
      'Eliminate Cumulative Layout Shift (CLS) by giving media elements explicit aspect ratios and placeholders.',
      'Use modern image formats (WebP/AVIF) and responsive `srcset` resolutions.',
      'Debounce search inputs and rate-limit API calls to prevent unneeded backend load.',
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'lib/debounce.ts',
      code: `export function debounce<T extends (...args: any[]) => void>(
  func: T,
  waitMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<T>) {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, waitMs);
  };
}`,
    },
  },
  {
    id: 'ai-integration-patterns',
    title: 'Pragmatic AI Integration & Structured Schema Validation',
    category: 'AI Integration',
    summary:
      'Treating Large Language Models as schema-enforced transformation engines with deterministic fallbacks rather than open-ended chat widgets.',
    keyTakeaways: [
      'Use schema validation (Zod) to verify that AI-generated responses conform strictly to application contracts.',
      'Always have a fast, rule-based fallback algorithm if an external AI API times out or rate-limits.',
      'Stream tokens progressively via ReadableStreams to reduce perceived latency.',
      'Scope prompts strictly with clear system roles, few-shot examples, and boundary conditions.',
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'services/aiSummary.ts',
      code: `import { z } from 'zod';

const SummarySchema = z.object({
  title: z.string().max(80),
  keyPoints: z.array(z.string()).min(1).max(5),
  tags: z.array(z.string().toLowerCase()),
  readingMinutes: z.number().positive(),
});

export async function parseStructuredAIResponse(rawJsonString: string) {
  try {
    const parsed = JSON.parse(rawJsonString);
    const result = SummarySchema.safeParse(parsed);
    if (!result.success) {
      console.warn('Schema validation failed:', result.error);
      return null;
    }
    return result.data;
  } catch {
    return null;
  }
}`,
    },
  },
]

