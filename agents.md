# Project Development Guidelines

## Core Principles
- **Keep files small**: No file should exceed 150 lines. Split into multiple files if needed.
- **Single responsibility**: Each file should have one clear purpose.
- **Minimal dependencies**: Only install what's absolutely necessary.
- **Progressive enhancement**: Start with the simplest working solution.

## File Size Constraints
- Components: Max 100 lines per file
- API routes: Max 80 lines per file
- Utility functions: Max 50 lines per file
- Configuration files: Keep minimal, use comments sparingly

## Tech Stack Guidelines

### Bun Setup
- Use Bun's built-in features instead of additional packages where possible
- Leverage Bun's native TypeScript support (no separate build step)
- Use Bun's file-based routing for API endpoints

### React Components
- Prefer function components with hooks
- Extract complex logic into custom hooks
- One component per file
- Co-locate component-specific styles and types

### Better Auth Implementation
- Start with magic link only - no password complexity initially
- Use minimal configuration
- Store only essential user data
- Implement auth check as a simple middleware

### Database (Drizzle)
- Start with a single `schema.ts` file
- Only create tables for:
  - users (id, email, createdAt)
  - sessions (for Better Auth)
  - magic_links (for Better Auth)
- Add fields only when needed by actual features

### Styling Guidelines
- Use Tailwind classes directly in components
- Avoid creating custom CSS files
- Use shadcn/ui components as-is without heavy customization
- Don't create wrapper components unless adding significant functionality

### Docker Configuration
- Single-stage Dockerfile (no multi-stage build initially)
- Minimal docker-compose with just app + postgres
- Use standard ports (3000 for app, 5432 for postgres)

## Code Organization
/
├── src/
│   ├── components/     # Shared UI components
│   ├── pages/         # Page components
│   ├── api/           # API routes
│   ├── db/            # Database schema and config
│   ├── lib/           # Utility functions
│   └── auth/          # Auth configuration
├── public/            # Static assets
├── docker-compose.yml
├── Dockerfile
├── package.json
└── .env.example

## Implementation Rules

### When creating new files:
1. Start with the minimum viable implementation
2. Add features only when explicitly requested
3. Prefer inline functions over separate utility files unless reused 3+ times
4. Use TypeScript sparingly - only for complex types

### When adding dependencies:
1. Check if Bun has a built-in alternative
2. Check if the feature can be implemented in <20 lines
3. Prefer lighter alternatives (e.g., clsx over classnames)
4. Document why each dependency is necessary

### Component Creation:
```tsx
// ❌ Avoid
// Multiple responsibilities, too many abstractions
export const ComplexComponent = () => {
  // 200+ lines of code...
}

// ✅ Prefer
// Single purpose, minimal code
export const SimpleComponent = () => {
  return <div className="p-4">Content</div>
}
API Route Creation:
ts// ❌ Avoid
// Complex class-based handlers with lots of methods

// ✅ Prefer
// Simple function exports
export async function GET(req: Request) {
  // Direct implementation, <30 lines
}
Specific Instructions
Initial Setup Tasks:

Create minimal package.json with only essential dependencies
Set up basic file structure (don't create empty files)
Configure tools with minimal options
Create single example of each file type

What NOT to do:

Don't create "utility" files for single-use functions
Don't add error boundaries, providers, or wrappers unless needed
Don't implement features "for the future"
Don't create index.ts barrel exports
Don't add testing setup initially
Don't create abstract base components
Don't add state management beyond React's built-in hooks

Database Migrations:

Create one initial migration with all tables
Don't split into multiple migration files
Keep migration names simple: 001_initial.sql

Environment Variables:
Keep .env.example minimal:
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
AUTH_SECRET=your-secret-here
EMAIL_FROM=noreply@example.com
EMAIL_SERVER=smtp://...
APP_URL=http://localhost:3000
Response Format
When asked to implement something:

Acknowledge the specific requirement
Implement only what was asked
If a file would exceed size limits, suggest splitting
Mention any dependencies being added and why

Example Implementations
Minimal Auth Setup:
ts// auth/config.ts (30 lines max)
export const authConfig = {
  // Only essential config
}
Minimal Component:
tsx// components/Button.tsx
export const Button = ({ children, onClick }) => (
  <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
    {children}
  </button>
)
Remember: Every line of code is a liability. Less code = fewer bugs = easier maintenance.
