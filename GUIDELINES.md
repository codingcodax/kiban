# Development Guidelines

Human-focused development practices for the Kiban core team.

For AI agent technical rules, see `AGENTS.md`.

## Quick Reference

- Development workflow & environment setup
- Git branching strategy (GitHub Flow)
- Commit message conventions
- Pull request & review process
- Documentation practices

## Development Workflow

### Environment Setup

**Required tools:**

- Bun (see `mise.toml` for version)
- Docker (for PostgreSQL)
- mise (for tool version management)

**First-time setup:**

1. `bun install`
2. Copy `.env.example` to `.env` and configure credentials
3. `bun db:push` (applies schema to database)
4. `bun dev`

### Daily Development

**Starting work:**

```bash
bun dev     # Start Next.js
```

**Before committing:**

```bash
bun check      # Lint & format check
bun typecheck  # TypeScript validation
bun test:unit  # Run unit tests (if applicable)
bun test:e2e   # Run end-to-end tests (if applicable)
```

**Database changes:**

- Schema changes: Edit files in `src/server/db/schema/`, then `bun db:generate && bun db:push`
- View data: `bun db:studio` (opens Drizzle Studio)

### Deployment

- `main` branch auto-deploys to production via Vercel
- Preview deployments created for all PRs
- Check deployment status in PR checks before merging

## Git & Branching Strategy

We use **GitHub Flow** - a simple, branch-based workflow.

### Branch Structure

- **`main`** - Production branch, always deployable, auto-deploys to Vercel
- **Feature branches** - Short-lived branches for specific changes

### Workflow

1. **Create a branch** from `main`:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Make commits** following our commit conventions (see below)

3. **Push and open a PR**:

   ```bash
   git push -u origin feature/your-feature-name
   ```

   Open PR on GitHub when ready for review

4. **Merge when approved** - Use "Squash and merge" for clean history

### Branch Naming

Use descriptive names with prefixes:

- `feature/` - New features (e.g., `feature/receipt-numbering`)
- `fix/` - Bug fixes (e.g., `fix/auth-redirect`)
- `refactor/` - Code improvements (e.g., `refactor/api-structure`)
- `chore/` - Maintenance tasks (e.g., `chore/upgrade-deps`)
- `docs/` - Documentation only (e.g., `docs/api-guide`)

### Branch Lifecycle

- **Keep branches short-lived** - Aim for 1-3 days max
- **Delete after merge** - GitHub can auto-delete after PR merge
- **Sync with main regularly** - Rebase or merge main into long-running branches

## Commit Conventions

We use **Conventional Commits** with scopes for clear, searchable history.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- **feat** - New feature or capability
- **fix** - Bug fix
- **refactor** - Code change that neither fixes a bug nor adds a feature
- **chore** - Maintenance tasks (deps, config, tooling)
- **docs** - Documentation changes
- **test** - Adding or updating tests
- **perf** - Performance improvements
- **style** - Code style changes (formatting, missing semi-colons, etc.)

### Scopes

Use scopes to indicate what part of the codebase changed:

- `api` - tRPC procedures, server actions
- `db` - Database schema, migrations, queries
- `ui` - UI components, styles
- `auth` - Authentication logic
- `components` - React components (excluding UI components)
- `pages` - Page-related changes
- `deps` - Dependency updates
- `config` - Configuration files
- `lib` - Utility functions, helpers

**Examples:**

```bash
feat(api): add receipt number to sale creation endpoint
fix(ui): correct alignment in product table
chore(deps): upgrade lucide-react to latest
refactor(db): simplify sale transaction queries
docs(agents): update guidelines for database workflow
feat(components): add sales summary card component
fix(pages): resolve hydration error on dashboard page
```

**Best Practices:**

- **Keep commits focused** - One logical change per commit
- **Write in imperative mood** - "add feature" not "added feature"
- **Be specific** - "fix login redirect" not "fix bug"
- **Reference issues when relevant** - Add issue number in footer if applicable

## Pull Requests & Code Review

### Opening a PR

**Before opening:**

- All tests pass locally (`bun test:unit` and `bun test:e2e`)
- No lint errors (`bun check`)
- No type errors (`bun typecheck`)
- Tested in development environment

**PR Description:**

- Describe **what** changed and **why**
- Note any breaking changes or migration steps
- Add screenshots for UI changes

### Review Process

**Timing:**

- Reviews should happen within **1 business day**
- Mark PRs as "Ready for review" when complete
- Use draft PRs for work-in-progress feedback

**What reviewers look for:**

- Code follows guidelines in `AGENTS.md`
- Logic is clear and maintainable
- Tests cover new functionality
- No obvious security issues
- Database migrations are safe (no data loss)

**Approval requirements:**

- **1 approval** required before merge
- PR author merges their own PR after approval

### After Merge

- Monitor deployment in Vercel dashboard
- Verify changes in production
- Delete feature branch (auto-deleted by GitHub)

## Documentation

### When to Document

Document when:

- Making architectural decisions that affect multiple parts of the system
- Creating new APIs or changing existing contracts

Skip documentation for:

- Simple bug fixes
- Minor UI tweaks
- Dependency updates

### Where Documentation Lives

- `README.md` - Project overview, setup instructions
- `AGENTS.md` - Technical guidelines for AI agents
- `GUIDELINES.md` - This file - human development practices
- Code comments - Only for "why" not "what" (prefer self-documenting code)

### Keeping Docs Updated

- Update relevant docs in the same PR that changes behavior
- Mark outdated docs for removal rather than leaving stale information
- When in doubt, refer to the code as the source of truth
