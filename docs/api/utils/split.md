---
title: split(keySelector)
sidebar_label: split()
---

A [pipeable operator] that groups the items emitted by the source based on the
`keySelector` function, emitting one Observable for each group.

```ts
function split<T, K>(keySelector: (value: T) => K, streamSelector?: (grouped: Observable<T>, key: K) => Observable<R>): 
  OperatorFunction<T, GroupedObservable<K, T>>
```

#### Arguments

- `keySelector`: A function that receives an item and returns the key of that item's group.
- `streamSelector`: (Optional, default = identity). The function to apply to each grouped Observable.

#### Returns

[`OperatorFunction<T, GroupedObservable<K, T>>`][OperatorFunction]: An Observable that emits a grouped Observable for each key
provided by the key selector function. The values from the source observable emitted in each grouped Observable 
are optional transformed by the stream selector function, if specified.

### Description

`split` will subscribe to each group observable and share the result to every
inner subscriber of that group. This inner observable can be mapped to another
observable through the `streamSelector` argument.

## See also
* [`collect(filter)`](collect)
* [`collectValues()`](collectValues)
* [`GroupedObservable`](https://rxjs-dev.firebaseapp.com/api/index/class/GroupedObservable) (RxJS)

[pipeable operator]: https://rxjs.dev/guide/v6/pipeable-operators
[OperatorFunction]: https://rxjs-dev.firebaseapp.com/api/index/interface/OperatorFunction