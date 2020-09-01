---
id: bind
title: bind
sidebar_label: bind
---

Creates a hook and its respective shared stream from an observable or factory of observables.

---

```tsx
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

Accepts: An Observable.

Returns `[1, 2]`

1. A React Hook that yields the latest emitted value of the observable. If the
   Observable doesn't synchronously emit a value upon the first subscription, then
   the hook will leverage React Suspense while it's waiting for the first value.

2. A `sharedLatest` version of the observable. It can be used for composing other
   streams that depend on it. The shared subscription is closed as soon as there
   are no subscribers to that observable.

## Factory Observables overload

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

Accepts: A factory function that returns an Observable.

Returns `[1, 2]`

1. A React Hook function with the same parameters as the factory function. This hook
   will yield the latest update from the observable returned from the factory function.
   If the Observable doesn't synchronously emit a value upon the first subscription, then
   the hook will leverage React Suspense while it's waiting for the first value.

2. A `sharedLatest` version of the observable returned by the factory function. It
   can be used for composing other streams that depend on it. The shared subscription
   is closed as soon as there are no subscribers to that observable.

## Grace time

Both overloads accept an optional numeric parameter, `unsubscribeGraceTime`

```ts
const [useCounter, counter$] = bind(
  clicks$.pipe(
    scan((prev) => prev + 1, 0),
    startWith(0)
  ),
  1000
);
```

This sets the delay until the internal subscription can be closed, in
milliseconds. It defaults to 200.

It's meant to handle those cases where React quickly unmounts and remounts
components between re-renders.
