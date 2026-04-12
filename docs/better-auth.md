# Authentication Patterns (Better Auth)

## OAuth Sign-In (Google)

```typescript
signIn.social(
  { provider: 'google', callbackURL: '/set-org' },
  { onRequest: () => setIsPending(true), onResponse: () => setIsPending(false) }
);
```

## Email/Password Sign-In

```typescript
await signIn.email(
  { email, password, callbackURL: '/set-org' },
  { onError: (error) => { /* handle */ } }
);
```

## Sign-Out

```typescript
signOut({ fetchOptions: { onSuccess: () => router.push('/') } });
```

## Session in tRPC Procedures

Use `publicProcedure` with `ctx.session` and `ctx.user`:

```typescript
export const getSession = publicProcedure.query(({ ctx }) => ({ session: ctx.session, user: ctx.user }));
```
