---
title: collectValues()
---

A [pipeable operator] that collects all the [`GroupedObservable`]s emitted by
the source and emits a `Map` with the latest values of the inner observables.

```ts
function collectValues<K, V>(): OperatorFunction<GroupedObservable<K, V>, Map<K, V>>
```

#### Returns

`OperatorFunction<GroupedObservable<K, V>, Map<K, V>>`: **TODO**

### Example

```ts
import { Subject } from 'rxjs'
import { mapTo, scan, takeWhile } from 'rxjs/operators'
import { collectValues, split } from '@react-rxjs/utils'

const votesByKey$ = new Subject<{ key: string }>()
const counters$ = votesByKey$.pipe(
  split(
    (vote) => vote.key,
    (votes$) =>
      votes$.pipe(
        mapTo(1),
        scan((count) => count + 1),
        takeWhile((count) => count < 3),
      ),
  ),
  collectValues(),
)

counters$.subscribe((counters) => {
  console.log("counters$:")
  counters.forEach((value, key) => {
    console.log(`${key}: ${value}`)
  })
})

votesByKey$.next({ key: "foo" })
// > counters$:
// > foo: 1

votesByKey$.next({ key: "foo" })
// > counters$:
// > foo: 2

votesByKey$.next({ key: "bar" })
// > counters$:
// > foo: 2
// > bar: 1

votesByKey$.next({ key: "foo" })
// > counters$:
// > bar: 1

votesByKey$.next({ key: "bar" })
// > counters$:
// > bar: 2
//
votesByKey$.next({ key: "bar" })
// > counters$:
```

## See also
* [`collect(filter)`](collect)
* [`split(keySelector)`](split)

[pipeable operator]: https://rxjs.dev/guide/v6/pipeable-operators
[`GroupedObservable`]: https://rxjs-dev.firebaseapp.com/api/index/class/GroupedObservable