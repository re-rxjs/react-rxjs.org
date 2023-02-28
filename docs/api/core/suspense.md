---
title: SUSPENSE
---

`SUSPENSE` is a special symbol that can be emitted from observables to let the React hook
know that there is a value on its way, and that we want to leverage React Suspense
while we are waiting for that value.

```ts
const SUSPENSE: unique symbol
```

### Example

```ts
import { concat, of } from "rxjs"
import { switchMap } from "rxjs/operators"
import { SUSPENSE } from "@react-rxjs/core"

const story$ = selectedStoryId$.pipe(
  switchMap((id) => concat(of(SUSPENSE), getStory$(id))),
)
```

## See also

- [`suspend()`](../../utils/suspend)
- [`suspended()`](../../utils/suspended)
- [`<Suspense />`](https://reactjs.org/docs/concurrent-mode-suspense.html) (React)
