# React Component Patterns

## Simple Component

```typescript
export const Hero = () => (
  <section className='relative overflow-hidden py-20 sm:py-32'>
    {/* ... */}
  </section>
);
```

## Complex Component (Directory)

**When**: Component needs sub-components, context, or is feature-heavy.

```
src/components/dashboard/
├── dashboard.tsx        # Main component
├── dashboard-chart.tsx  # Sub-component
└── context.tsx          # Context (if needed)
```

**Import pattern** - Named imports from main component:

```typescript
import { Dashboard, DashboardChart } from '../dashboard/dashboard';
```

## Props Pattern

```typescript
type Props = { items: string[] };
export const ItemList = ({ items }: Props) => { /* ... */ };
```

## Props with Children

- Props + Children: `({ children, ... }: React.PropsWithChildren<Props>)`
- Children only: `({ children }: React.PropsWithChildren)`

```typescript
type NavItemProps = { href: string; icon?: Icon };
export const NavItem = ({ children, href, icon: Icon }: React.PropsWithChildren<NavItemProps>) => (
  <Button href={href}>{children}</Button>
);
```

## CVA (Class Variance Authority)

**When**: Multiple visual variants or sizes.

```typescript
const buttonVariants = cva("group/button inline-flex...", {
  variants: { variant: { default: 'bg-primary', secondary: 'bg-secondary' } },
  defaultVariants: { variant: 'default' },
});

export const Button = ({ className, variant = 'default', ... }: Props) => (
  <Comp className={cn(buttonVariants({ variant, size, className }))} />
);
```

## useId for Accessibility

```typescript
const useFormField = () => {
  const { id } = useId();
  return { id, formItemId: `${id}-form-item`, formDescriptionId: `${id}-form-item-description` };
};
```

## 'use client' Directive

**When**: Component uses hooks, event handlers, or browser APIs.

```typescript
'use client';
import { useState } from 'react';
```
