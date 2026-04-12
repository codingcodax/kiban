# AGENTS.md

## Project Overview

Kiroku is a Next.js 16 (App Router) full-stack app using:

- **API**: tRPC 11.x with superjson
- **Database**: PostgreSQL via Drizzle ORM
- **Auth**: Better Auth with Google OAuth + email/password
- **State**: TanStack React Query
- **Styling**: Tailwind CSS 4.x with shadcn/ui components
- **Validation**: Zod 4.x
- **Package Manager**: Bun

## Setup Commands

- Install dependencies: `bun install`
- Start local database: `./start-database.sh` (requires Docker/Podman)
- Database URL configured via `POSTGRES_URL` in `.env`

## Development Workflow

- Start dev server: `bun run dev` (uses turbopack, port 3000)
- Run linting/checks: `bun run check`
- Auto-fix lint issues: `bun run fix`
- TypeScript check: `bun run typecheck`

## Code Style

### Global Conventions

- **Inline exports**: Always prefer `export const Foo` over separate `export { Foo }`
- **Arrow functions**: Always for components, callbacks, function expressions
- **No barrel files**: Avoid `index.ts` re-exports; use direct imports

### Linting & Formatting

- Biome via Ultracite for linting/formatting
- Prettier for Tailwind CSS classes
- `quoteStyle: "single"` (Biome), `singleQuote: false` (Prettier)

### Path Aliases

- `~/` maps to `./src/`

## Database

- Generate migrations: `bun run db:generate`
- Run migrations: `bun run db:migrate`
- Push schema to DB: `bun run db:push`
- Open DB studio: `bun run db:studio`
- Schema tables use `kiku_` prefix

## Build & Deployment

- Production build: `bun run build`
- Start production server: `bun run start`
- Skip env validation: `SKIP_ENV_VALIDATION=1` (for Docker)

## Additional Patterns

For detailed patterns, refer to:

| File | Purpose |
|------|---------|
| `@docs/react.md` | Component patterns (CVA, props, 'use client') |
| `@docs/trpc.md` | tRPC procedures (protected/public, query/mutation) |
| `@docs/typescript.md` | TypeScript conventions (naming, imports) |
| `@docs/drizzle.md` | Drizzle ORM patterns (soft delete, indexes, FK) |
| `@docs/better-auth.md` | Auth patterns (OAuth, email/password, sign-out) |
