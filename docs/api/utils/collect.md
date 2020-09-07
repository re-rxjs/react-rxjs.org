---
title: collect(filter)
sidebar_label: collect()
---

A [pipeable operator] that collects all the [`GroupedObservable`]s emitted by
the source and emits a `Map` with the active inner observables.

```ts
function collect<K, V>(filter?: (grouped: GroupedObservable<K, V>) => Observable<boolean>): 
  OperatorFunction<GroupedObservable<K, V>, Map<K, GroupedObservable<K, V>>>
```

#### Arguments

- `filter?`: (Optional, default = undefined) A function that receives the inner 
  Observable and returns an Observable of boolean values, which indicates 
  whether the inner observable should be collected.

#### Returns

`OperatorFunction<GroupedObservable<K, V>, Map<K, GroupedObservable<K, V>>>`: **TODO**

## See also
* [`collectValues()`](collectValues)
* [`split(keySelector)`](split)

[pipeable operator]: https://rxjs.dev/guide/v6/pipeable-operators
[`GroupedObservable`]: https://rxjs-dev.firebaseapp.com/api/index/class/GroupedObservable