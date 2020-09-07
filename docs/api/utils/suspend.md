---
title: suspend(observable)
---

A RxJS creation operator that prepends a [`SUSPENSE`] to the source Observable.

```ts
function suspend<T>(source$: Observable<T>) => Observable<T | typeof SUSPEND>
```

#### Arguments
* `source$`: The source observable.

#### Returns

`Observable<T | typeof SUSPEND>`: An Observable that emits [`SUSPENSE`] 
as its first value, followed by the values from the source Observable.

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