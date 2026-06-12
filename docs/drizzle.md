# Drizzle ORM Patterns

## Primary Key Patterns

- Auto-incrementing integer: `integer('id').primaryKey().generatedByDefaultAsIdentity()`
- UUID: `uuid('id').primaryKey().defaultRandom()`

## Soft Delete

- Schema: `deletedAt: timestamp('deleted_at')`
- Query filter: `isNull(table.deletedAt)`
- Delete: `.set({ deletedAt: new Date() })`

## Type Inference

```typescript
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
```

## Index Creation

```typescript
export const product = createTable('product', { /* fields */ }, (table) => ({
  nameIdx: index('idx_product_name').on(table.name),
}));
```

## Foreign Key References

- Cascade delete: `{ onDelete: 'cascade' }`
- Set null: `{ onDelete: 'set null' }`

```typescript
organizationId: text('organization_id').notNull().references(() => organization.id, { onDelete: 'cascade' }),
```

## Many-to-Many Junction Tables

```typescript
export const roleToPermission = createTable('role_to_permission', {
  roleId: integer('role_id').notNull().references(() => role.id, { onDelete: 'cascade' }),
  permissionId: integer('permission_id').notNull().references(() => permission.id, { onDelete: 'cascade' }),
}, (t) => ({ primaryKey: [t.roleId, t.permissionId] }));
```

## Timestamp Defaults

```typescript
createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
```

## Insert with Returning

```typescript
const [newUser] = await ctx.db.insert(user).values({ name, email }).returning();
```

## Update with Partial Sets

```typescript
await db.update(user).set({ ...(name && { name }), ...(email && { email }) }).where(eq(user.id, id));
```
