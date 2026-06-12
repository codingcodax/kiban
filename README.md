# Kiban

A modern, full-stack application template built with Next.js, designed to provide a solid, secure, and scalable foundation for your projects.

## Features

- **Full-stack Architecture**: Integrated frontend and backend with Next.js App Router
- **Type-safe API**: End-to-end type safety using tRPC
- **Database Management**: Drizzle ORM for robust database interactions and migrations
- **Authentication**: Secure user management with Better Auth
- **Modern Styling**: Tailwind CSS v4 and shadcn/ui for beautiful, accessible components
- **Testing Suite**: Integrated Vitest for unit testing and Playwright for E2E testing
- **CI/CD Ready**: Optimized for deployment on Vercel

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team)
- **API**: [tRPC](https://trpc.io) for type-safe API calls
- **Styling**: [Tailwind CSS](https://tailwindcss.com) (v4) with [shadcn/ui](https://ui.shadcn.com) components
- **Authentication**: [Better Auth](https://www.better-auth.com)
- **Testing**: [Vitest](https://vitest.dev) & [Playwright](https://playwright.dev/)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 22+
- [Bun](https://bun.sh)
- [Docker](https://www.docker.com) (for local PostgreSQL)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd kiban
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Fill in your `POSTGRES_URL` and other required credentials.

4. Start the database service:

   ```bash
   ./start-database.sh
   ```

5. Set up the database schema:

   ```bash
   bun db:push
   ```

6. Start the development server:

   ```bash
   bun dev
   ```

## Development

### Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun check` - Lint and format code
- `bun fix` - Auto-fix linting issues
- `bun fix:unsafe` - Auto-fix unsafe code
- `bun typecheck` - Run TypeScript type checking
- `bun test:unit` - Run unit tests with Vitest
- `bun test:e2e` - Run end-to-end tests with Playwright
- `bun db:generate` - Generate Drizzle migrations
- `bun db:push` - Push schema changes to database
- `bun db:studio` - Open Drizzle Studio

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes (auth, tRPC)
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable UI components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── server/             # Server-side code (tRPC, DB, auth)
│   ├── api/            # tRPC routers and context
│   ├── auth/           # Better Auth configuration
│   └── db/             # Drizzle schema and connection
├── styles/             # Global CSS
└── trpc/               # tRPC client and server helpers
```

## Contributing

1. Follow the coding guidelines in `AGENTS.md`
2. Run `bun check` and `bun typecheck` before committing
3. Ensure tests pass with `bun test:unit` and `bun test:e2e`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
