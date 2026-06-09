# Kiban

A Next.js 16 full-stack app template with type-safe APIs and authentication.

![Version](https://img.shields.io/badge/version-0.0.1-blue) ![Package Manager](https://img.shields.io/badge/package_manager-bun-f5f5f5)

## Technology Stack

- **Framework**: Next.js 16.1.7 (App Router)
- **API**: tRPC 11.x with superjson
- **Database**: PostgreSQL via Drizzle ORM 0.45.2
- **Auth**: Better Auth 1.6.x (Google OAuth + email/password)
- **State**: TanStack React Query 5.x
- **Styling**: Tailwind CSS 4.x with shadcn/ui
- **Validation**: Zod 4.x
- **Language**: TypeScript 5.9.3
- **Package Manager**: Bun

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Next.js App Router                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Pages     │  │ API Routes  │  │ Server Components   │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└────────────────────────────┬────────────────────────────────┘
                            │
               ┌────────────┴────────────┐
               │     tRPC (src/trpc/)     │
               └────────────┬─────────────┘
                            │
┌───────────────────────────┴────────────────────────────────┐
│                    API Layer (src/server/api/)             │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────┐
│                   Data Layer (src/server/db/)                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Auth Layer (src/server/auth/)                  │
└─────────────────────────────────────────────────────────────┘
```

## Getting Started

```bash
bun install
./start-database.sh
```

Configure `.env` with `POSTGRES_URL`, `BETTER_AUTH_SECRET`, and OAuth credentials.

```bash
bun run dev        # Start dev server (turbopack, port 3000)
bun run check      # Linting and type checks
bun run fix        # Auto-fix lint issues
bun run build      # Production build
```

Database commands:

```bash
bun run db:generate   # Generate migrations
bun run db:migrate    # Run migrations
bun run db:push       # Push schema to DB
bun run db:studio     # Open Drizzle Studio
```

## Project Structure

```
src/
├── app/              # Next.js pages (App Router)
├── components/       # React components (ui/ for shadcn)
├── server/
│   ├── api/          # tRPC routers and procedures
│   ├── auth/         # Better Auth configuration
│   └── db/           # Drizzle schema and connection
├── trpc/             # Client-side tRPC provider
├── lib/              # Utilities
└── hooks/            # Custom React hooks
```

Path alias: `~/` maps to `./src/`

## Key Features

- Google OAuth + email/password authentication via Better Auth
- Type-safe tRPC procedures with full type inference
- PostgreSQL with Drizzle ORM (schema-first approach)
- shadcn/ui components with dark mode support
- Server-first patterns with Next.js App Router

## Testing

Test infrastructure is not yet implemented. Recommended: Vitest for unit tests, Playwright for E2E.

## Contributing

1. Create a branch prefixed with `codingcodax/`
2. Follow patterns in `docs/` folder
3. Run `bun run check` before committing

## Documentation

| File | Purpose |
|------|---------|
| `docs/react.md` | Component patterns |
| `docs/trpc.md` | tRPC procedures |
| `docs/typescript.md` | TypeScript conventions |
| `docs/drizzle.md` | Drizzle ORM patterns |
| `docs/better-auth.md` | Auth patterns |

## License

Not specified.