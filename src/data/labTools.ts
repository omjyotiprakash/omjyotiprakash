export interface MockEndpoint {
  id: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  description: string
  category: string
  defaultHeaders: Record<string, string>
  defaultBody?: string
  responseStatus: number
  responseLatencyMs: number
  responseHeaders: Record<string, string>
  responseBody: any
}

export const mockEndpoints: MockEndpoint[] = [
  {
    id: 'get-notes',
    method: 'GET',
    path: '/api/notes?limit=3&sort=desc',
    description: 'Fetch authenticated user notes with pagination and sorting',
    category: 'QuickNote',
    defaultHeaders: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWEy...',
      Accept: 'application/json',
    },
    responseStatus: 200,
    responseLatencyMs: 142,
    responseHeaders: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Response-Time': '142ms',
      'Cache-Control': 'private, no-cache',
    },
    responseBody: {
      success: true,
      count: 3,
      total: 18,
      notes: [
        {
          _id: '64b1f8e21a9c8b001a4e1201',
          title: 'Database Compound Indexing Strategies',
          content: 'ESR rule: Equality fields first, then Sort fields, then Range fields.',
          tags: ['mongodb', 'performance', 'database'],
          isPublic: true,
          isPinned: true,
          createdAt: '2024-10-18T14:32:00.000Z',
        },
        {
          _id: '64b1f8e21a9c8b001a4e1202',
          title: 'React 19 Server Components Mental Model',
          content: 'Separating client interactivity from server data serialization boundaries.',
          tags: ['react', 'frontend', 'architecture'],
          isPublic: false,
          isPinned: false,
          createdAt: '2024-10-16T09:15:00.000Z',
        },
        {
          _id: '64b1f8e21a9c8b001a4e1203',
          title: 'Bcrypt Salt Rounds vs Request Throughput',
          content: 'Cost factor 10 takes ~80ms on 2.4GHz CPU, providing optimal defense without bottlenecking auth.',
          tags: ['security', 'auth', 'nodejs'],
          isPublic: true,
          isPinned: false,
          createdAt: '2024-10-14T18:45:00.000Z',
        },
      ],
    },
  },
  {
    id: 'post-note',
    method: 'POST',
    path: '/api/notes',
    description: 'Create a new note with tags and privacy status',
    category: 'QuickNote',
    defaultHeaders: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      'Content-Type': 'application/json',
    },
    defaultBody: JSON.stringify(
      {
        title: 'Designing Decoupled Micro-Frontends',
        content: 'Independent build pipelines guarantee zero cross-team bundle contamination.',
        tags: ['architecture', 'web'],
        isPublic: true,
      },
      null,
      2
    ),
    responseStatus: 201,
    responseLatencyMs: 188,
    responseHeaders: {
      'Content-Type': 'application/json; charset=utf-8',
      Location: '/api/notes/64c209f32b1d9c002b5f3404',
    },
    responseBody: {
      success: true,
      message: 'Note created successfully',
      note: {
        _id: '64c209f32b1d9c002b5f3404',
        userId: '64aa123b09f18e001c23a001',
        title: 'Designing Decoupled Micro-Frontends',
        content: 'Independent build pipelines guarantee zero cross-team bundle contamination.',
        tags: ['architecture', 'web'],
        isPublic: true,
        createdAt: '2024-11-04T17:00:00.000Z',
        updatedAt: '2024-11-04T17:00:00.000Z',
      },
    },
  },
  {
    id: 'get-food-list',
    method: 'GET',
    path: '/api/food/list?category=curries',
    description: 'Retrieve active menu dishes with stock availability',
    category: 'Food Delivery',
    defaultHeaders: {
      Accept: 'application/json',
    },
    responseStatus: 200,
    responseLatencyMs: 95,
    responseHeaders: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
    responseBody: {
      success: true,
      category: 'curries',
      itemsCount: 2,
      data: [
        {
          _id: '6501a11f9d3b1e001f4c7811',
          name: 'Paneer Butter Masala',
          price: 260,
          description: 'Cottage cheese cubes simmered in a rich tomato, butter and cashew gravy.',
          isAvailable: true,
          dietary: 'Vegetarian',
        },
        {
          _id: '6501a11f9d3b1e001f4c7812',
          name: 'Murgh Makhani (Butter Chicken)',
          price: 340,
          description: 'Tender tandoori chicken cooked in a slow-simmered aromatic makhani sauce.',
          isAvailable: true,
          dietary: 'Non-Vegetarian',
        },
      ],
    },
  },
  {
    id: 'health-check',
    method: 'GET',
    path: '/api/system/health',
    description: 'Service uptime, database connection state, and memory metrics',
    category: 'System Diagnostics',
    defaultHeaders: {
      Accept: 'application/json',
    },
    responseStatus: 200,
    responseLatencyMs: 38,
    responseHeaders: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Service-Region': 'ap-south-1',
    },
    responseBody: {
      status: 'healthy',
      timestamp: '2024-11-04T17:30:00.000Z',
      uptimeSeconds: 84210,
      environment: 'production',
      services: {
        database: { status: 'connected', latencyMs: 14, poolSize: 8 },
        memory: { heapUsedMB: 48.2, heapTotalMB: 64.5, rssMB: 92.1 },
      },
    },
  },
]

export const sampleJsonStrings = {
  packageJson: `{
  "name": "quicknote-api",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.3.2",
    "multer": "^1.4.5-lts.1"
  }
}`,
  orderPayload: `{
  "customer": {
    "name": "Om Jyoti Prakash",
    "phone": "+91 98765 43210",
    "address": "Bhubaneswar, Odisha"
  },
  "items": [
    { "foodId": "6501a11f9d3b1e001f4c7811", "quantity": 2 },
    { "foodId": "6501a11f9d3b1e001f4c7812", "quantity": 1 }
  ],
  "paymentMethod": "UPI"
}`,
}

export const sampleMarkdown = `# QuickNote System Architecture

QuickNote is built with a decoupled MERN architecture:

- **Frontend:** React 19 + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express REST API
- **Persistence:** MongoDB Atlas with compound indexes
- **Security:** Signed JWT in cookies, bcrypt password hashing

## Database Schema Highlights

\`\`\`javascript
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  tags: [String],
  isPublic: { type: Boolean, default: false }
});
\`\`\`

> "Good architecture is the result of clear boundaries and continuous simplification."
`

export const safePlaygroundSnippets = [
  {
    name: 'Array GroupBy & Frequency',
    code: `// Group notes by tags
const notes = [
  { id: 1, title: 'Auth Guide', tags: ['auth', 'node'] },
  { id: 2, title: 'React Hooks', tags: ['react', 'frontend'] },
  { id: 3, title: 'Mongo Index', tags: ['database', 'node'] }
];

const tagCounts = notes.flatMap(n => n.tags).reduce((acc, tag) => {
  acc[tag] = (acc[tag] || 0) + 1;
  return acc;
}, {});

return tagCounts;`,
  },
  {
    name: 'Cart Subtotal & Tax Calculation',
    code: `// Server-side financial calculation logic
const items = [
  { name: 'Paneer Butter Masala', unitPrice: 260, qty: 2 },
  { name: 'Butter Naan', unitPrice: 40, qty: 4 },
  { name: 'Masala Chai', unitPrice: 30, qty: 2 }
];

const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
const gstTax = Math.round(subtotal * 0.05); // 5% GST
const deliveryFee = subtotal > 500 ? 0 : 40;
const grandTotal = subtotal + gstTax + deliveryFee;

return { subtotal, gstTax, deliveryFee, grandTotal };`,
  },
  {
    name: 'Compound Index Key Generator',
    code: `// Generate compound index keys for query planning
function generateIndexName(fields) {
  return fields.map(([key, dir]) => \`\${key}_\${dir}\`).join('__');
}

return {
  userNotesIndex: generateIndexName([['userId', 1], ['createdAt', -1]]),
  publicFeedIndex: generateIndexName([['isPublic', 1], ['createdAt', -1]])
};`,
  },
]
