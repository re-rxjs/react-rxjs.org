---
id: subscribe
title: <Subscribe />
---

A React Component that creates a subscription to the provided observable once
the component mounts, and unsubscribes when the component unmounts.

```tsx
const Subscribe: React.FC<{
    source$: Observable<any>;
    fallback?: JSX.Element;
}>
```

#### Properties

- `source$`: Source observable that the Component will subscribe to.
- `fallback`: Optional, defaults to `null`. The JSX Element to be rendered 
before the subscription is created.

:::note Important
This Component doesn't trigger any updates.
:::

## See also
* [`useSubscribe()`](useSubscribe)