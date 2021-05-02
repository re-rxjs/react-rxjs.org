---
title: bind(observable)
sidebar_label: bind()
---

Binds an Observable to React, and returns a hook and shared stream representing the source Observable.

```ts
function bind<T>(
  observable: Observable<T>,
  defaultValue?: T,
): [() => Exclude<T, typeof SUSPENSE>, Observable<T>]
```

#### Arguments

- `observable`: The source Observable to be used by the hook.
- `defaultValue`: (Optional) value to return when the source hasn't emitted yet.

#### Returns

`[1, 2]`:

1. A React Hook that yields the latest emitted value of the Observable. If the
   Observable doesn't synchronously emit a value, it will return the
   `defaultValue` if provided, otherwise it will leverage React Suspense
   while it's waiting for the first value.

2. The shared Observable that the hook uses: It also replays back the latest
   value emitted. It can be used for composing other streams that depend on it.

:::note
`bind` doesn't propagate completions from the source stream - the shared
subscription is closed as soon as there are no subscribers to that Observable.
:::

### Example

```tsx
import { scan, startWith } from "rxjs/operators"
import { bind } from "@react-rxjs/core"

const [useCounter, counter$] = bind(
  clicks$.pipe(
    scan((prev) => prev + 1, 0),
    startWith(0),
  ),
)

function CounterDisplay() {
  const counter = useCounter()

  return <div>{counter}</div>
}
```

## Factory Overload

Binds an Observable factory function to React, and returns a hook and shared stream representing the created Observables.

```ts
function bind<A extends unknown[], O>(
  getObservable: (...args: A) => Observable<O>,
  defaultValue?: (...args: A) => T | T,
): [(...args: A) => Exclude<O, typeof SUSPENSE>, (...args: A) => Observable<O>]
```

#### Arguments

- `getObservable`: Factory of Observables. The arguments of this function
  will be the ones used in the hook.

#### Returns

`[1, 2]`:

1. A React hook with the same arguments as the factory function. This hook
   will yield the latest update from the Observable returned from the factory function.
   If the Observable doesn't synchronously emit a value, it will return the
   `defaultValue` if provided, otherwise it will leverage React Suspense
   while it's waiting for the first value.

2. The factory function that returns the shared Observable that the hook uses
   for the specific arguments. It can be used for composing other streams that depend on it.

### Example

```tsx
const [useStory, getStory$] = bind((storyId: number) =>
  getStoryWithUpdates$(storyId),
)

const Story: React.FC<{ id: number }> = ({ id }) => {
  const story = useStory(id)

  return (
    <article>
      <h1>{story.title}</h1>
      <p>{story.description}</p>
    </article>
  )
}
```
