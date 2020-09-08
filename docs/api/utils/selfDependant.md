---
title: selfDependant()
---

A utility for creating observables that have circular dependencies.

```ts
function selfDependant<T>(): [Observable<T>, () => MonoTypeOperatorFunction<T>];
```

#### Returns

`[1, 2]`:

1. The inner Subject as an Observable.

2. A [pipeable operator] that taps into the inner Subject.

### Example

```ts
import { merge, of, Subject } from 'rxjs'
import { delay, map, share, switchMapTo, withLatestFrom } from 'rxjs/operators'
import { selfDependant } from '@react-rxjs/utils'

const [_resettableCounter$, connectResettableCounter] = selfDependant<number>()

const clicks$ = new Subject()
const inc$ = clicks$.pipe(
  withLatestFrom(_resettableCounter$),
  map((_, x) => x + 1),
  share(),
)

const delayedZero$ = of(0).pipe(delay(10_000))
const reset$ = inc$.pipe(switchMapTo(delayedZero$))

const resettableCounter$ = merge(inc$, reset$, of(0)).pipe(
  connectResettableCounter(),
)
```
[pipeable operator]: https://rxjs.dev/guide/v6/pipeable-operators