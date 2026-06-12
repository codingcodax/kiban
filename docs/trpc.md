# tRPC Patterns

## Protected Procedure

**When**: Requires authentication. Validates session, throws UNAUTHORIZED if not.

```typescript
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" });
    return next({
      ctx: { session: { ...ctx.session }, user: { ...ctx.user } },
    });
  });
```

## Public Procedure

**When**: No authentication required.

```typescript
export const getSession = publicProcedure.query(({ ctx }) => ({
  session: ctx.session,
  user: ctx.user,
}));
```

## Query Procedure

**When**: Fetching data.

```typescript
export const getAll = protectedProcedure
  .input(ListQuesry)
  .query(async ({ input, ctx }) => {
    return ctx.db.query.user.findMany({
      limit: input.limit,
      offset: input.offset,
    });
  });
```

## Mutation Procedure

**When**: Creating, updating, or deleting data.

```typescript
export const create = protectedProcedure
  .input(CreateUser)
  .mutation(async ({ input, ctx }) => {
    const [newUser] = await ctx.db.insert(user).values(input).returning();
    return newUser;
  });
```

## Input Validation with Zod

```typescript
export const CreateUser = z.object({
  name: requiredString("Name"),
  email: Email.optional().or(z.null()),
});

export const UpdateUser = z.object({
  id: EntityId,
  name: optionalString,
  email: Email.optional().or(z.null()),
});
```

## Query Schema with Pagination

```typescript
export const ListQuesry = z.object({
  search: optionalString,
  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(100).default(10),
  sort: z.array(sortConfig).default([{ id: "name", desc: false }]),
});
```

## Error Handling

**When**: Handling errors. Common codes: BAD_REQUEST, NOT_FOUND, FORBIDDEN, UNAUTHORIZED.

```typescript
throw new TRPCError({ code: "NOT_FOUND", message: `Entity ${id} not found` });
```

## Database Transactions

**When**: Multiple operations that must succeed/fail together.

```typescript
await ctx.db.transaction(async (tx) => {
  await tx.update(user).set({ role: newRole }).where(eq(user.id, userId));
  await tx.insert(auditLog).values({ action: "role_change", userId });
});
```
