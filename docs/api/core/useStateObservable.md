---
title: useStateObservable(observable)
sidebar_label: useStateObservable()
---

Gets the latest value from an observable returned by `state`.

```ts
function useStateObservable<T>(
  observable: StateObservable<T>,
): Exclude<T, typeof SUSPENSE>
```

#### Arguments

- `observable`: The `StateObservable` to get the value from.

#### Returns

The latest emitted value of the Observable.

If the Observable hasn't emitted a value yet, it will leverage React Suspense
while it's waiting for the first value.

### Examples

```tsx
import { scan } from "rxjs/operators"
import { state, useStateObservable } from "@react-rxjs/core"

const counter$ = state(clicks$.pipe(startWith(0)), 0)

function CounterDisplay() {
  const counter = useStateObservable(counter$)

  return <div>{counter}</div>
}
```

:::note
It's important to note that the `StateObservable` must be created outside the React Component, otherwise it could run into an infinite loop.

For observables that need an instance id, use the parametric overload of `state`. For observables that need other parameters as input, try to model these parameters as other StateObservables of your application and use RxJS Observable composition.
:::

#### With factory of observables

```tsx
const getStory$ = state((storyId: number) => getStoryWithUpdates$(storyId))

const Story: React.FC<{ id: number }> = ({ id }) => {
  const story = useStateObservable(getStory$(id))

  return (
    <article>
      <h1>{story.title}</h1>
      <p>{story.description}</p>
    </article>
  )
}
```

:::note
`useStateObservable` needs the observable passed as a parameter to already have a subscription active, otherwise it will throw a `Missing Subscribe` error.

You can use the `<Subscribe>{children}</Subscribe>` component to help manage your subscriptions.
:::

## See also

- [`state()`](./state)
- [`<Subscribe />`](./subscribe)
