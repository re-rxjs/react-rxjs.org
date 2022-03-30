---
title: shareLatest()
---

An RxJS [pipeable operator] which multicasts the source stream and replays the
latest emitted value.

It's a utility function kept for historical purposes. Since RxJS@^7.0.0 released, it's equivalent to:

```ts
import { share } from 'rxjs/operators';

function shareLatest<T>() {
  return share<T>({
    connector: () => new ReplaySubject(1)
  })
}
```

#### Returns

[`MonoTypeOperatorFunction<T>`]: An Observable that shares the latest emitted value from the
source Observable with all subscribers, and restarts the stream when it completes or errors.

### Example

```ts
import { filter, map } from "rxjs/operators"
import { shareLatest } from "@react-rxjs/core"

const activePlanetName$ = planet$.pipe(
  filter((planet) => planet.isActive),
  map((planet) => planet.name),
  shareLatest(),
)
```

## See also

- [`share`] (RxJS)

[`share`]: https://rxjs.dev/api/operators/share
[`monotypeoperatorfunction<t>`]: https://rxjs.dev/api/index/interface/MonoTypeOperatorFunction
[pipeable operator]: https://rxjs.dev/guide/v6/pipeable-operators
