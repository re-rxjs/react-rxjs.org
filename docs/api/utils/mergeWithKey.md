---
title: mergeWithKey(inputObject)
sidebar_label: mergeWithKey()
---

Emits the values from all the streams of the provided object, in a result
which provides the key of the stream of that emission.

```ts
function mergeWithKey<
  O extends { [P in keyof any]: ObservableInput<any> },
  OT extends {
    [K in keyof O]: O[K] extends ObservableInput<infer V>
      ? { type: K; payload: V }
      : unknown
  }
>(inputObject: O, concurrent?: number, scheduler?: SchedulerLike): 
  Observable<OT[keyof O]>
```

#### Arguments

- `inputObject`: An object that contains multiple streams, indexed by key.
- `concurrent`: (Optional) Maximum number of input Observables being subscribed
to concurrently. Default: `Number.POSITIVE_INFINITY`
- `scheduler`: (Optional) The [`SchedulerLike`] to use for managing concurrency
of input Observables. Default: `null`.

#### Returns

`Observable<OT[keyof O]>`: An observable that emits a flux-like object that contains 2 properties:
- `type`: the key of the stream that has emitted.
- `payload`: the emitted value.

### Example

```ts
import { Subject } from "rxjs"
import { scan, startWith } from 'rxjs/operators'
import { mergeWithKey, createSignal } from '@react-rxjs/utils'

const [inc$, doInc] = createSignal();
const [dec$, doDec] = createSignal();
const [resetTo$, doResetTo] = createSignal<number>();

const counter$ = mergeWithKey({
  inc$,
  dec$,
  resetTo$,
}).pipe(
  scan((acc, current) => {
    switch (current.type) {
      case "inc$":
        return acc + 1
      case "dec$":
        return acc - 1
      case "resetTo$":
        return current.payload
      default:
        return acc
    }
  }, 0),
  startWith(0),
)
```
## See also
* [`merge`](https://rxjs.dev/api/index/function/merge) (RxJS)
* [Todo App Tutorial](../../tutorial/todos#creating-a-single-stream-for-all-the-user-events)

[`SchedulerLike`]: https://rxjs.dev/api/index/interface/SchedulerLike
