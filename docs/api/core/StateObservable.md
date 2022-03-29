---
title: StateObservable
sidebar_label: StateObservable
---

Represents an Observable state. It has the following properties:

1. It's multicast: The subscription is shared with all the subscribers.
2. It replays the last emitted value to every new subscriber.
3. It doesn't propagate `complete`.
4. When all its subscribers unsubscribe, it cleans up everything, unsubscribing from the source and resetting the latest value.

```ts
interface StateObservable<T> extends Observable<T> {
  getRefCount: () => number
  getValue: (filter?: (value: T) => boolean) => T | StatePromise<T>
}
```

Inherits from rxjs' `Observable`.

## methods

### getRefCount()

Gets the current number of subscribers.

```ts
function getRefCount(this: StateObservable): number
```

#### Returns

The current number of subscribers this `StateObservable` has.

### getValue(filter)

```ts
function getValue(
  this: StateObservable,
  filter?: (value: T) => boolean,
): T | StatePromise<T>
```

#### Arguments

- `filter`: (Optional) A function that will exclude `value` as a possible value returned by this function. Defaults to `() => true` (every value is returned)

#### Returns

Either:

- The latest value, if this `StateObservable` has already emitted any.
- A promise that will resolve the first value, if this `StateObservable` hasn't emitted any yet.

:::note

- Calling this method will throw an error if this `StateObservable` doesn't have any subscription active.

- The promise returned by this method will reject if the observable completes without emitting any value, or if all subscribers unsubscribe before the observable emits something.

:::

## DefaultedStateObservable

A `StateObservable` that was provided with a default value.

```ts
interface DefaultedStateObservable<T> extends StateObservable<T> {
  getDefaultValue: () => T
  getValue: (filter?: (value: T) => boolean) => T
}
```

Inherits from `StateObservable` and rxjs' `Observable`.

### getDefaultValue()

Gets the default value set to this `DefaultedStateObservable`

```ts
function getDefaultValue(this: DefaultedStateObservable<T>): T
```

#### Returns

The default value of this `DefaultedStateObservable`

### getValue(filter)

```ts
function getValue(this: StateObservable, filter?: (value: T) => boolean): T
```

#### Arguments

- `filter`: (Optional) A function that will exclude `value` as a possible value returned by this function. Defaults to `() => true` (every value is returned). If the value is excluded, it will return the default value instead.

#### Returns

Either:

- The latest value, if this `DefaultedStateObservable` has already emitted any.
- The default value, if this `DefaultedStateObservable` hasn't emitted any yet.

:::note
The `getValue()` method of `DefaultedStateObservable` overrides the one from `StateObservable`.

This means it won't return a Promise and it won't throw errors as the original `StateObservable` does.
:::

## See also

- [`state()`](./state)
- [`useStateObservable()`](./useStateObservable)
