---
id: subscribe
title: <Subscribe />
---

A React Component that manages the subscription of its children's Observables.

It will subscribe to all the observables used by its children before they get
mounted, and will unsubscribe from all of them once it unmounts.

If given a fallback, it also acts as a Suspense boundary, rendering the fallback
element until the suspended element resolves.

```tsx
const Subscribe: React.FC<{
  source$?: Observable<any>
  fallback?: JSX.Element
}>
```

#### Properties

- `source$`: (Optional) Source Observable that the Component should subscribe to, before its children renders.
- `fallback`: (Optional) The JSX Element to be rendered before the
  subscription is created. Default: `null`.

:::note
This Component doesn't trigger any updates if any of its subscription emits.
:::

:::note Important
This Component first mounts itself rendering `null`, subscribes to `source$` and
then it renders its children.
:::

## See also

- [`<RemoveSubscribe />`](./RemoveSubscribe)
