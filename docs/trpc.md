# tRPC Patterns

## Protected Procedure

**When**: Requires authentication. Validates session, throws UNAUTHORIZED if not.

```typescript
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED' });
    return next({ ctx: { session: { ...ctx.session }, user: { ...ctx.user } } });
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
  .input(GetEmployeesQuery)
  .query(async ({ input, ctx }) => executeEmployeeQuery(ctx.db, input));
```

## Mutation Procedure

**When**: Creating, updating, or deleting data.

```typescript
export const create = protectedProcedure
  .input(CreateCustomer)
  .mutation(async ({ input, ctx }) => {
    const [newCustomer] = await ctx.db.insert(customer).values(input).returning();
    return newCustomer;
  });
```

## Input Validation with Zod

```typescript
export const CreateCustomer = z.object({
  name: requiredString('Name'),
  email: Email.optional().or(z.null()),
});

export const UpdateCustomer = z.object({
  id: EntityId,
  name: optionalString,
  email: Email.optional().or(z.null()),
});
```

## Query Schema with Pagination

```typescript
export const GetCustomersQuery = z.object({
  search: optionalString,
  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(100).default(10),
  sort: z.array(CustomerSortConfig).default([{ id: 'name', desc: false }]),
});
```

## Error Handling

**When**: Handling errors. Common codes: BAD_REQUEST, NOT_FOUND, FORBIDDEN, UNAUTHORIZED.

```typescript
throw new TRPCError({ code: 'NOT_FOUND', message: `Entity ${id} not found` });
```

## Database Transactions

**When**: Multiple operations that must succeed/fail together.

```typescript
await ctx.db.transaction(async (tx) => {
  await tx.update(inventory).set({ quantity: newQuantity }).where(...);
  await tx.insert(stockMovement).values({ ... });
});
```
