---
title: suspend(observable)
---

A RxJS creation operator that prepends a [`SUSPENSE`] to the source observable.

```ts
function suspend<T>(source$: Observable<T>) => Observable<T | typeof SUSPEND>
```

#### Arguments

**TODO**

#### Returns

**TODO**

### Example

```ts
import { switchMap } from 'rxjs/operators'
import { suspend } from '@react-rxjs/utils'

const story$ = selectedStoryId$.pipe(
  switchMap(id => suspend(getStory$(id))
)
```

## See also
* [`SUSPENSE`]
* [`suspended`]

[`SUSPENSE`]: ../core/suspense
[`suspended`]: suspended