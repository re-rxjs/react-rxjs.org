---
title: suspended()
---

The [pipeable] version of [`suspend`]. Prepends a [`SUSPENSE`] to the source Observable.

```ts
function suspended<T>(): OperatorFunction<T, T | typeof SUSPEND>
```

#### Returns

[`OperatorFunction<T, T | typeof SUSPEND>`][OperatorFunction]: An Observable that emits [`SUSPENSE`] 
as its first value, followed by the values from the source observable.

### Example

```ts
import { switchMap } from 'rxjs/operators'
import { suspended } from '@react-rxjs/utils'

const story$ = selectedStoryId$.pipe(
  switchMap((id) => getStory$(id).pipe(suspended())),
)
```

## See also
* [`suspend`]
* [`SUSPENSE`]
* [Pipeable Operators][pipeable] (RxJS)

[`suspend`]: suspend
[`SUSPENSE`]: ../core/suspense
[pipeable]: https://rxjs.dev/guide/v6/pipeable-operators
[OperatorFunction]: https://rxjs-dev.firebaseapp.com/api/index/interface/OperatorFunction