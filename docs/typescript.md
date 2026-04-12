# TypeScript Conventions

## type vs interface

- Use `type` for most things
- Use `interface` only when extension is needed

```typescript
export type Email = z.infer<typeof Email>;
export interface CustomerQueryOptions extends BaseQueryOptions { filters?: CustomerFilters; }
```

## Import Patterns

```typescript
import type { RouterOutputs } from '~/trpc/react';  // Type-only imports
import { z } from 'zod';                              // Value imports
import { protectedProcedure } from '~/server/api/trpc';
```

## Zod Schema with JSDoc

```typescript
/**
 * Base customer schema for common customer fields
 */
export const BaseCustomer = z.object({ name: requiredString('Name'), email: Email.optional().or(z.null()) });
```

## Generic Utility Types

```typescript
export type ArrayElement<T extends unknown[] | null> = T extends (infer U)[] ? U : never;
export type SortOption<T extends string = string> = { id: T; desc: boolean };
```

## Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Types/Interfaces | PascalCase | `CustomerQueryOptions` |
| Variables/Functions | camelCase | `useDebounce`, `createRefund` |
| Schema constants | PascalCase | `BaseCustomer`, `CreateCustomer` |
| Enum values | SCREAMING_SNAKE_CASE | `'ACTIVE'`, `'PENDING'` |
| Generic type params | T, TData, TKey | `<TData>` |
