# Agent Guidelines for Kiban

This document outlines essential guidelines for AI agents working within the Kiban codebase. Adherence to these conventions ensures consistency, maintainability, and high code quality.

## Development Commands

- **Build**: `bun build`
- **Lint/Format**: `bun check` (checks), `bun fix` (auto-fixes), `bun fix:unsafe` (auto-fixes unsafe code)
- **Type Check**: `bun typecheck`
- **Run all tests**: `bun test`
- **Run unit tests**: `bun test:unit`
- **Run E2E tests**: `bun test:e2e`
- **Diagnose Biome**: `bun dlx ultracite doctor`

## TypeScript

- Utilize **TypeScript** strictly. Define clear interfaces and types for all data structures and function parameters/returns.
- Use explicit types for function parameters and return values when they enhance clarity.
- Prefer `unknown` over `any` when the type is genuinely unknown.
- Use const assertions (`as const`) for immutable values and literal types.
- Leverage TypeScript's type narrowing instead of type assertions.
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names.
- Use arrow functions for callbacks and short functions.
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops.
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access.
- Prefer template literals over string concatenation.
- Use destructuring for object and array assignments.
- Use `const` by default, `let` only when reassignment is needed, never `var`.
- Only create an abstraction if it's actually needed.
- Prefer clear function/variable names over inline comments.
- Avoid helper functions when a simple inline expression would suffice.
- Use `knip` to remove unused code if making large changes.
- The `gh` CLI is installed, use it.
- Don't use emojis.
- Don't unnecessarily add `try`/`catch`.
- Don't cast to `any`.

## React

- Use function components over class components.
- Call hooks at the top level only, never conditionally.
- Specify all dependencies in hook dependency arrays correctly.
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices).
- Nest children between opening and closing tags instead of passing as props.
- Don't define components inside other components.
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images.
  - Use proper heading hierarchy.
  - Add labels for form inputs.
  - Include keyboard event handlers alongside mouse events.
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles.
- Avoid massive JSX blocks and compose smaller components.
- Colocate code that changes together.
- Avoid `useEffect` unless absolutely needed.

## Tailwind

- Mostly use built-in values, occasionally allow dynamic values, rarely globals.
- Always use v4 + global CSS file format + shadcn/ui.

## Next

- Prefer App Router conventions.
- Use Server Components for async data fetching instead of async Client Components.
- Use Next.js `<Image>` component for images.
- Use App Router metadata API for head elements.
- Prefer fetching data in RSC (page can still be static).
- Use next/font + next/script when applicable.
- next/image above the fold should have `sync` / use `priority` sparingly.
- Be mindful of serialized prop size for RSC -> child components.

## General

- **Indentation**: Use **tabs** for indentation.
- **Quotes**: Use **single quotes** for strings and JSX attributes.
- **Imports**: Organize imports logically (e.g., external libraries, internal components, then utilities). Avoid `*` imports where possible. Prefer specific imports over namespace imports.
- **Naming Conventions**:
  - **Variables/Functions**: `camelCase`
  - **Components**: `PascalCase`
  - **Files**: `kebab-case` for components/pages, `camelCase` for utilities/hooks.
- **Error Handling**: Implement robust error handling using `try...catch` blocks for asynchronous operations and API calls. Provide meaningful error messages. Throw `Error` objects with descriptive messages, not strings or other values. Prefer early returns over nested conditionals.
- **Async & Promises**: Always `await` promises in async functions - don't forget to use the return value. Use `async/await` syntax instead of promise chains for better readability. Handle errors appropriately in async code with try-catch blocks. Don't use async functions as Promise executors.
- **Performance**: Avoid spread syntax in accumulators within loops. Use top-level regex literals instead of creating them in loops. Avoid barrel files (index files that re-export everything).
- **Security**: Add `rel="noopener"` when using `target="_blank"` on links. Avoid `dangerouslySetInnerHTML` unless absolutely necessary. Don't use `eval()` or assign directly to `document.cookie`. Validate and sanitize user input.
- **Framework Specifics**:
  - **tRPC**: Use tRPC procedures for all API interactions.
  - **Drizzle ORM**: Use Drizzle queries with relations for database operations.
  - **React Hook Form + Zod**: Use for form validation.
  - **Server Actions**: Use `next-safe-action` for form submissions.
- **Comments**: Add comments sparingly, focusing on _why_ complex logic exists, not _what_ it does. Prefer self-documenting code.
