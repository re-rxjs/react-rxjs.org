---
title: switchMapSuspended()
---

Like [`switchMap`], but applying a [`startWith(SUSPENSE)`][`startWith`] to the inner observable.

```ts
function switchMapSuspended<T, O extends ObservableInput<any>>(project: (value: T, index: number) => O): 
    OperatorFunction<T, ObservedValueOf<O> | typeof SUSPENSE>;
```

#### Arguments
* `project`: A function that, when applied to an item emitted by the source Observable, returns an Observable.

#### Returns

[`OperatorFunction<T, ObservedValueOf<O> | typeof SUSPENSE>`][`OperatorFunction`]: An Observable that emits the result of applying the projection function to each item emitted by the source Observable, and taking only the values from the most recently projected inner Observable, prepended with [`SUSPENSE`].

### Example

```ts
import { switchMapSuspended } from '@react-rxjs/utils'

const story$ = selectedStoryId$.pipe(switchMapSuspended(getStory$))
```

## See also
* [`SUSPENSE`]
* [`switchMap`] (RxJS)
* [Pipeable Operators] (RxJS)

[`SUSPENSE`]: ../core/suspense
[`switchMap`]: https://rxjs-dev.firebaseapp.com/api/operators/switchMap
[`startWith`]: https://rxjs-dev.firebaseapp.com/api/operators/startWith
[Pipeable Operators]: https://rxjs.dev/guide/v6/pipeable-operators
[`OperatorFunction`]: https://rxjs-dev.firebaseapp.com/api/index/interface/OperatorFunction