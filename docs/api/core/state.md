---
title: state(observable)
sidebar_label: state()
---

Creates a [`StateObservable`] from the source Observable.

```ts
function state<T>(
  observable: Observable<T>,
  defaultValue?: T,
): StateObservable<T>
```

#### Arguments

- `observable`: The source Observable
- `defaultValue`: (Optional) value to emit when the source hasn't emitted yet.

#### Returns

The `StateObservable` derived from the source observable.

The returned `StateObservable` emits the same values as the source Observable, with the following behavior:

1. It shares the subscription to all the subscribers.
2. It replays the last emitted value to new subscribers.
3. It doesn't propagate `complete`.
4. When all subscribers unsubscribe, it unsubscribes from the source and resets the latest value.

### Example

```tsx
import { timer, interval } from "rxjs/operators"
import { state } from "@react-rxjs/core"

const time$ = state(interval(1000))

time$.subscribe({
  next: (v) => console.log(v), // Logs 0, 1, 2, ...
})

timer(5000)
  .pipe(switchMap(() => time$))
  .subscribe({
    next: (v) => console.log(v), // Logs 5, 6, 7, ...
  })
```

## Factory Overload

Creates a factory of `StateObservable`, that caches the observables created for each key.

```ts
function state<A extends unknown[], T>(
  getObservable: (...args: A) => Observable<T>,
  defaultValue?: T | ((...args: A) => T),
): (...args: A) => StateObservable<T>
```

#### Arguments

- `getObservable`: Factory of Observables. The arguments of this function
  will be the ones used in the hook.
- `defaultValue`: (Optional) value to emit when the source hasn't emitted yet.

#### Returns

The factory function that returns the `StateObservable` for a given key.

### Example

```tsx
const getPrice$ = state((productId: number) =>
  getProductPriceFromSocket$(productId),
)

getPrice$("apples").subscribe({
  next: (v) => console.log(v),
})
```

## See also

- [`bind()`](./bind)
- [`useStateObservable()`](./useStateObservable)
- [`StateObservable`](./StateObservable)

[`stateobservable`]: ./StateObservable
