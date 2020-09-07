---
title: split(keySelector)
sidebar_label: split()
---

An RxJS operator that groups the items emitted by the source based on the
`keySelector` function, emitting one Observable for each group.

```ts
function split<T, K>(keySelector: (value: T) => K, streamSelector?: (grouped: Observable<T>, key: K) => Observable<R>): 
  OperatorFunction<T, GroupedObservable<K, T>>
```

#### Arguments

- `keySelector`: A function that receives an item and returns the key of that
  item's group.
- `streamSelector`: (Optional, default = identity). The function to apply to each group observable.

#### Returns

**TODO**

### Description

`split` will subscribe to each group observable and share the result to every
inner subscriber of that group. This inner observable can be mapped to another
observable through the `streamSelector` argument.

## See also
* [`collect(filter)`](collect)
* [`collectValues()`](collectValues)