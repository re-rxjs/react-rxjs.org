---
id: subscribe
title: <Subscribe />
---

A React Component that creates a subscription to the provided Observable once
the component mounts, and unsubscribes when the component unmounts.

It also acts as a Suspense boundary, rendering a fallback element until the
suspended element resolves.

```tsx
const Subscribe: React.FC<{
  source$: Observable<any>
  fallback?: JSX.Element
}>
```

#### Properties

- `source$`: Source Observable that the Component will subscribe to.
- `fallback`: (Optional) The JSX Element to be rendered before the
  subscription is created. Default: `null`.

:::note Important
This Component doesn't trigger any updates.
:::

## See also

- [`useSubscribe()`](useSubscribe)
