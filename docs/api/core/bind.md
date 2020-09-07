---
title: bind(observable)
sidebar_label: bind()
---

Binds an observable to React, and returns a hook and shared stream representing the source observable.

```ts
function bind<T>(observable: Observable<T>): 
  [() => Exclude<T, typeof SUSPENSE>, Observable<T>];
```

#### Arguments

- `observable`: Source observable to be used by the hook.

#### Returns

`[1, 2]`:

1. A React Hook that yields the latest emitted value of the observable. If the
   Observable doesn't synchronously emit a value upon the first subscription, then
   the hook will leverage React Suspense while it's waiting for the first value.

2. A [`shareLatest`] version of the observable. It can be used for composing other
   streams that depend on it. The shared subscription is closed as soon as there
   are no subscribers to that observable.

### Example

```tsx
import { scan, startWith } from 'rxjs/operators'
import { bind } from '@react-rxjs/core'

const [useCounter, counter$] = bind(
  clicks$.pipe(
    scan((prev) => prev + 1, 0),
    startWith(0)
  )
);

function CounterDisplay() {
  const counter = useCounter();

  return <div>{counter}</div>;
}
```

## Factory Overload

Binds an observable factory function to React, and returns a hook and shared stream representing the created observables.

```ts
function bind<A extends unknown[], O>(getObservable: (...args: A) => Observable<O>): 
  [(...args: A) => Exclude<O, typeof SUSPENSE>, (...args: A) => Observable<O>];
```

#### Arguments

- `getObservable`: Factory of observables. The arguments of this function 
   will be the ones used in the hook.

#### Returns

`[1, 2]`:

1. A React hook with the same arguments as the factory function. This hook
   will yield the latest update from the observable returned from the factory function.
   If the Observable doesn't synchronously emit a value upon the first subscription, then
   the hook will leverage React Suspense while it's waiting for the first value.

2. A [`shareLatest`] version of the observable returned by the factory function. It
   can be used for composing other streams that depend on it. The shared subscription
   is closed as soon as there are no subscribers to that observable.


### Example

```tsx
const [useStory, getStory$] = bind((storyId: number) =>
  getStoryWithUpdates$(storyId)
);

const Story: React.FC<{ id: number }> = ({ id }) => {
  const story = useStory(id);

  return (
    <article>
      <h1>{story.title}</h1>
      <p>{story.description}</p>
    </article>
  );
};
```

## See also

* [`shareLatest()`]

[`shareLatest`]: shareLatest
[`shareLatest()`]: shareLatest
