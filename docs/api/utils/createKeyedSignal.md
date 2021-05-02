---
title: createKeyedSignal()
sidebar_label: createKeyedSignal()
---

Creates a Signal grouped by a key. Essentially splits the producer and consumer
of a Subject for each key.

```ts
export function createKeyedSignal<A extends unknown[], T>(
  keySelector?: (signal: T) => K,
  mapper?: (...args: A) => T,
): [(key: K) => GroupedObservable<K, T>, (...args: A) => void]
```

#### Arguments

- `keySelector?`: (Optional) A function that extracts the key from the emitted value.
  If omitted, it will use the first argument as the key.

- `mapper?`: (Optional) A function for mapping the arguments of the emitter function into
the value of the Observable.

  Defaults to `(v: Payload) => v`

#### Returns

`[1, 2]`:

1. A function that returns the observable for a given key

2. The emitter function

## See also

- [`createSignal()`](createSignal)
