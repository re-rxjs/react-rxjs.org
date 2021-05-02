---
title: contextBinder()
sidebar_label: contextBinder()
---

Returns a version of bind where its hook will have the first parameters bound
the results of the provided function (which can use hooks)

```ts
export function contextBinder<A extends unknown[], T>(
  ...args: Array<() => any>
): typeof bind
```

#### Arguments

- `...args`: A list of functions that its result will be bound to the first arguments
within `getObservable` of the `bind` function enhanced by this function.

#### Returns

An enhanced `bind` function where it will have its first arguments bound to the
return values of the input functions

### Example

```tsx
const MyContext = React.createContext<number>(0);

const myContextBind = contextBinder(
  () => useContext(MyContext)
);

const [useValue, value$] = myContextBind(
  (myContextValue, prefix: string) =>
    of(prefix + ' ' + myContextValue)
)

const Component = () => {
  const contextDisplay = useValue('Current context value:'))

  return <div>{contextDisplay}</div>
}
```
