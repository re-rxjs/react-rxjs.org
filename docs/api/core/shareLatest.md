---
title: shareLatest()
---

An RxJS [pipeable operator] which multicasts the source stream and replays the
latest emitted value.

```ts
function shareLatest<T>(): MonoTypeOperatorFunction<T>
```

#### Returns

[`MonoTypeOperatorFunction<T>`]: An Observable that shares the latest emitted value from the 
source Observable with all subscribers, and restarts the stream when it completes or errors.

### Description

The Observables returned from [`bind`] have been enhanced with this operator.

It's similar to RxJS's `shareReplay({ refCount: true, bufferSize: 1 })`, but
with one difference: If the source stream completes or errors, `shareReplay`
will repeat that event for every new subscriber. On the other hand, `shareLatest`
propagates the event to all the current subscribers, and restarts the source
subscription on the next outer subscription.

### Example

```ts
import { filter, map } from 'rxjs/operators'
import { shareLatest } from '@react-rxjs/core'

const activePlanetName$ = planet$.pipe(
  filter((planet) => planet.isActive),
  map((planet) => planet.name),
  shareLatest()
);
```

## See also
* [`bind`]
* [`shareReplay`] (RxJS)

[`bind`]: bind
[`shareReplay`]: https://rxjs.dev/api/operators/shareReplay
[`MonoTypeOperatorFunction<T>`]: https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction
[pipeable operator]: https://rxjs.dev/guide/v6/pipeable-operators
