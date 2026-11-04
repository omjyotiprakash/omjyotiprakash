import{n as e}from"./rolldown-runtime-WkwZ5CU-.js";import{$ as t,K as n,tt as r}from"./icons-B107cMif.js";import{r as i,t as a}from"./react-B3Oo-eG3.js";import{t as o}from"./CodeBlock-B3kiUvhV.js";import{s}from"./index-BMJORO4j.js";var c=e(r(),1),l=[{id:`frontend-architecture`,title:`Frontend Component Architecture & State Boundary Isolation`,category:`Frontend Engineering`,summary:`Designing UI component hierarchies where state is kept as local as possible, side effects are encapsulated in custom hooks, and presentation remains pure and easily testable.`,keyTakeaways:[`Colocate state with where it is consumed; avoid premature global state wrappers.`,`Separate data-fetching hooks from presentational markup to allow clean visual iteration.`,`Use discriminated unions in TypeScript to model mutually exclusive UI states (loading, success, error) rather than multiple disjoint booleans.`,`Enforce accessible keyboard interactions (focus management, escape key handlers, ARIA live regions) from day one.`],codeSnippet:{language:`typescript`,filename:`hooks/useNotesQuery.ts`,code:`import { useState, useEffect, useCallback } from 'react';
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
}`}},{id:`backend-api-design`,title:`RESTful API Architecture & Layered Express Controllers`,category:`Backend Engineering`,summary:`Structuring Express.js applications with strict separation of concerns: routes declare endpoints and middleware, controllers coordinate business logic, and services/models interact with databases.`,keyTakeaways:[`Routes should remain declarative: only URL endpoints, HTTP methods, and middleware bindings.`,`Controllers should validate request payloads (with tools like Zod) before delegating to database operations.`,`Centralize error handling in custom error classes with explicit HTTP status codes.`,"Always return uniform JSON responses: `{ success: boolean, data?: any, message?: string }`."],codeSnippet:{language:`javascript`,filename:`controllers/notes.controller.js`,code:`const Note = require('../models/Note');
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
};`}},{id:`database-indexing`,title:`Database Design & Compound Indexing Strategy in MongoDB`,category:`Database Architecture`,summary:`Designing document models and compound indexes to satisfy query patterns with index scans instead of full collection scans.`,keyTakeaways:[`Follow the ESR Rule (Equality, Sort, Range) when defining multi-field compound indexes.`,"Always index foreign key reference fields (such as `userId` or `orderId`) in child collections.",`Keep documents bounded: avoid unbounded arrays inside documents that can grow past the 16MB BSON limit.`,"Use `.lean()` for read-only queries to bypass Mongoose hydration overhead."],codeSnippet:{language:`javascript`,filename:`models/Note.js`,code:`const mongoose = require('mongoose');

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

module.exports = mongoose.model('Note', noteSchema);`}},{id:`auth-security`,title:`Authentication, Token Lifecycles & Defense in Depth`,category:`Security & Auth`,summary:`Securing user authentication through cryptographic password hashing, signed JWT tokens, and strict resource ownership checks.`,keyTakeaways:[`Passwords salted and hashed using bcrypt (cost factor 10) before touching the database.`,`JWT tokens signed with cryptographically random secrets and explicit expirations (e.g. 7 days).`,"Never trust client IDs: always verify that `resource.userId.equals(req.user._id)`.",`Implement CORS whitelists and security headers to prevent unauthorized cross-origin mutations.`],codeSnippet:{language:`javascript`,filename:`middleware/authGuard.js`,code:`const jwt = require('jsonwebtoken');
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
};`}},{id:`performance-optimization`,title:`Web Performance & Core Web Vitals Optimization`,category:`Performance Engineering`,summary:`Optimizing page speed and interaction responsiveness across modern mobile devices and slower cellular networks.`,keyTakeaways:["Code-split routes using React `lazy()` and dynamic imports to keep initial bundle size under 150KB gzip.",`Eliminate Cumulative Layout Shift (CLS) by giving media elements explicit aspect ratios and placeholders.`,"Use modern image formats (WebP/AVIF) and responsive `srcset` resolutions.",`Debounce search inputs and rate-limit API calls to prevent unneeded backend load.`],codeSnippet:{language:`typescript`,filename:`lib/debounce.ts`,code:`export function debounce<T extends (...args: any[]) => void>(
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
}`}},{id:`ai-integration-patterns`,title:`Pragmatic AI Integration & Structured Schema Validation`,category:`AI Integration`,summary:`Treating Large Language Models as schema-enforced transformation engines with deterministic fallbacks rather than open-ended chat widgets.`,keyTakeaways:[`Use schema validation (Zod) to verify that AI-generated responses conform strictly to application contracts.`,`Always have a fast, rule-based fallback algorithm if an external AI API times out or rate-limits.`,`Stream tokens progressively via ReadableStreams to reduce perceived latency.`,`Scope prompts strictly with clear system roles, few-shot examples, and boundary conditions.`],codeSnippet:{language:`typescript`,filename:`services/aiSummary.ts`,code:`import { z } from 'zod';

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
}`}}],u=a(),d=[`All`,`Frontend Engineering`,`Backend Engineering`,`Database Architecture`,`Security & Auth`,`Performance Engineering`,`AI Integration`];function f(){let[e,r]=(0,c.useState)(`All`),a=e===`All`?l:l.filter(t=>t.category===e);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s,{title:`Engineering Architecture & Principles — Om Jyoti Prakash`,description:`Technical breakdown of frontend state management, REST API architecture, MongoDB indexing strategies, JWT authentication pipelines, and pragmatic AI integration.`}),(0,u.jsxs)(`main`,{className:`mx-auto max-w-content px-gutter py-12 md:py-20`,children:[(0,u.jsxs)(`div`,{className:`border-b border-border pb-10`,children:[(0,u.jsx)(`p`,{className:`font-mono text-xs uppercase tracking-widest text-primary`,children:`Technical Methodology`}),(0,u.jsx)(`h1`,{className:`mt-3 font-display text-[clamp(2.4rem,1.8rem+3vw,4.25rem)] text-foreground`,children:`Engineering Practice & Architecture`}),(0,u.jsx)(`p`,{className:`mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed`,children:`How I approach technical problem-solving, architectural boundaries, and performance discipline across the full stack. Real code patterns, verified trade-offs, and systems thinking.`})]}),(0,u.jsx)(`div`,{className:`mt-8 flex flex-wrap items-center gap-1.5`,role:`tablist`,"aria-label":`Engineering Topics`,children:d.map(t=>(0,u.jsx)(`button`,{type:`button`,role:`tab`,"aria-selected":e===t,onClick:()=>r(t),className:[`rounded-full px-3.5 py-1.5 font-label text-xs transition-colors`,e===t?`bg-foreground font-medium text-background`:`border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground`].join(` `),children:t},t))}),(0,u.jsx)(`div`,{className:`mt-12 space-y-12`,children:a.map((e,t)=>(0,u.jsxs)(`article`,{className:`rounded-2xl border border-border bg-card p-6 shadow-sm transition-all md:p-8`,children:[(0,u.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4 text-xs text-muted-foreground`,children:[(0,u.jsx)(`span`,{className:`rounded-full bg-primary/10 px-3 py-0.5 font-mono text-primary font-medium`,children:e.category}),(0,u.jsxs)(`span`,{className:`font-mono text-[0.6875rem]`,children:[`Pillar 0`,t+1]})]}),(0,u.jsx)(`h2`,{className:`mt-4 font-display text-2xl text-foreground sm:text-3xl`,children:e.title}),(0,u.jsx)(`p`,{className:`mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base`,children:e.summary}),(0,u.jsxs)(`div`,{className:`mt-6 rounded-xl border border-border/80 bg-secondary/30 p-5`,children:[(0,u.jsx)(`p`,{className:`font-semibold text-xs text-foreground uppercase tracking-wider`,children:`Architectural Rules & Best Practices:`}),(0,u.jsx)(`ul`,{className:`mt-3 space-y-2 text-xs text-muted-foreground`,children:e.keyTakeaways.map((e,t)=>(0,u.jsxs)(`li`,{className:`flex items-start gap-2.5`,children:[(0,u.jsx)(n,{className:`size-4 shrink-0 text-primary mt-0.5`}),(0,u.jsx)(`span`,{className:`leading-relaxed`,children:e})]},t))})]}),e.codeSnippet&&(0,u.jsxs)(`div`,{className:`mt-6`,children:[(0,u.jsx)(`p`,{className:`font-mono text-xs text-muted-foreground mb-1`,children:`Implementation Pattern:`}),(0,u.jsx)(o,{code:e.codeSnippet.code,language:e.codeSnippet.language,filename:e.codeSnippet.filename})]})]},e.id))}),(0,u.jsxs)(`div`,{className:`mt-16 rounded-2xl border border-border bg-ink p-8 text-ink-foreground text-center`,children:[(0,u.jsx)(`p`,{className:`font-mono text-xs uppercase tracking-widest text-ink-primary`,children:`Hands-on Testing`}),(0,u.jsx)(`h2`,{className:`mt-2 font-display text-2xl text-ink-foreground`,children:`Test these patterns live in the Developer Lab`}),(0,u.jsx)(`p`,{className:`mx-auto mt-2 max-w-xl text-xs text-ink-muted leading-relaxed sm:text-sm`,children:`Launch the interactive REST API client to inspect real JSON outputs, simulate network latencies, format schemas, or run calculations in the JavaScript playground.`}),(0,u.jsx)(`div`,{className:`mt-6`,children:(0,u.jsxs)(i,{to:`/lab`,className:`inline-flex items-center gap-2 rounded-full bg-ink-primary px-6 py-2.5 font-label text-xs font-semibold text-ink transition-all hover:brightness-110`,children:[`Open Interactive Lab`,(0,u.jsx)(t,{className:`size-4`})]})})]})]})]})}export{f as default};