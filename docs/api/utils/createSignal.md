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


### Examples

Void signal (no payload):

```ts
const [buttonPresses$, pressButton] = createSignal();
// ...
<button onClick={() => pressButton()}>...</button>
```

Taking a payload. Note that without the type parameter you'll get a void
signal as above:

```ts
const [itemComplete$, doCompleteItem] = createSignal<number>();

// ...

<button onClick={() => doCompleteItem(id)}>...</button>
```

Mapping the emitter function's arguments to the resulting emission:

```ts
const mapper = (id: number, status: Status) => ({ id, status });
const [statusChange$, setStatus] = createSignal(mapper);
// statusChange$ is Observable<{id: number, status: Status}>
// setStatus is (id: number, status: Status) => void

// ...

<button onClick={() => setStatus(id, Status.Complete)}>...</button>
```

## See also

- [`createKeyedSignal()`](createKeyedSignal)
