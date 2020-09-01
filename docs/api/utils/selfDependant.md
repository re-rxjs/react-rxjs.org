---
title: selfDependant()
---

A creation operator that helps creating observables that have circular
dependencies.

### Example

```ts
const [_resetableCounter$, connectResetableCounter] = selfDependant<number>()

const clicks$ = new Subject()
const inc$ = clicks$.pipe(
  withLatestFrom(_resetableCounter$),
  map((_, x) => x + 1),
  share(),
)

const delayedZero$ = of(0).pipe(delay(10_000))
const reset$ = inc$.pipe(switchMapTo(delayedZero$))

const resetableCounter$ = merge(inc$, reset$, of(0)).pipe(
  connectResetableCounter(),
)
```