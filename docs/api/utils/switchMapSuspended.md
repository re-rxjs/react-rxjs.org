---
title: switchMapSuspended()
---

Like [`switchMap`], but applying a [`startWith(SUSPENSE)`][`startWith`] to the inner Observable.

```ts
function switchMapSuspended<T, O extends ObservableInput<any>>(project: (value: T, index: number) => O): 
    OperatorFunction<T, ObservedValueOf<O> | typeof SUSPENSE>;
```

#### Arguments
* `project`: A function that, when applied to an item emitted by the source Observable, returns an Observable.

#### Returns

[`OperatorFunction<T, ObservedValueOf<O> | typeof SUSPENSE>`][OperatorFunction]: An Observable that emits the result 
of applying the projection function to each item emitted by the source Observable, and taking only the values from 
the most recently projected inner Observable, prepended with [`SUSPENSE`].

### Example

```ts
import { switchMapSuspended } from '@react-rxjs/utils'

const story$ = selectedStoryId$.pipe(switchMapSuspended(getStory$))
```

## See also
* [`SUSPENSE`]
* [`switchMap`], [`startWith`] (RxJS)

[`SUSPENSE`]: ../core/suspense
[`switchMap`]: https://rxjs.dev/api/operators/switchMap
[`startWith`]: https://rxjs.dev/api/operators/startWith
[OperatorFunction]: https://rxjs.dev/api/index/interface/OperatorFunction