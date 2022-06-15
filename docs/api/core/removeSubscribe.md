---
id: removeSubscribe
title: <RemoveSubscribe />
---

A React Component that prevents its children from using a parent [`<Subscribe>`](./Subscribe).

This is useful when you need a Root component to have a `<Subscribe>`, but you
don't want some of its children to leak subscriptions on it.

### Example

```tsx
const user$ = state(/* ... */)

function App() {
  const user = useStateObservable(user$)

  return (
    <Content>
      <Header>Application Example</Header>
      <RemoveSubscribe>
        {/* none of the routes will be able to use the top-level <Subscribe> */}
        <AppRoutes />
      </RemoveSubscribe>
    </Content>
  )
}

createRoot(rootElement).render(
  <Subscribe>
    <App />
  </Subscribe>,
)
```

:::note
This component only prevents its children from leaking subscriptions to
a parent `<Subscribe />`. If that `Subscribe` had a fallback, it will not
prevent the from using the Suspense boundary.
:::

## See also

- [`<Subscribe />`](./Subscribe)
