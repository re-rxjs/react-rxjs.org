---
title: suspend(observable)
sidebar_label: suspend()
---

A RxJS creation operator that prepends a [`SUSPENSE`] to the source Observable.

```ts
function suspend<T>(source$: Observable<T>) => Observable<T | typeof SUSPENSE>
```

#### Arguments
* `source$`: The source Observable.

#### Returns

`Observable<T | typeof SUSPENSE>`: An Observable that emits [`SUSPENSE`] 
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