---
title: createSignal()
sidebar_label: createSignal()
---

Creates a Signal: it's like a subject, but with the consumer and the producer split.

```ts
export function createSignal<A extends unknown[], T>(
  mapper?: (...args: A) => T,
): [Observable<T>, (...args: A) => void]
```

#### Arguments

- `mapper?`: (Optional) A function for mapping the arguments of the emitter function into
the value of the Observable.

  Defaults to `(v: Payload) => v`

#### Returns

`[1, 2]`:

1. The observable for the signal

2. The emitter function

## See also

- [`createKeyedSignal()`](createKeyedSignal)
