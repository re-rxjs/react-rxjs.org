---
title: collect(filter)
sidebar_label: collect()
---

:::caution
This function is deprecated. [`partitionByKey`](partitionByKey) covers its intended use case.
:::

A [pipeable operator] that collects all the [`GroupedObservable`]s emitted by
the source and emits a `Map` with the active inner observables.

```ts
function collect<K, V>(
  filter?: (grouped: GroupedObservable<K, V>) => Observable<boolean>,
): (
  source$: Observable<GroupedObservable<K, V>>,
) => CollectedObservable<Map<K, GroupedObservable<K, V>>>
```

#### Arguments

- `filter?`: (Optional) A function that receives the inner
  Observable and returns an Observable of boolean values, which indicates
  whether the inner Observable should be collected. Default: `undefined`.

#### Returns

`CollectedObservable<Map<K, GroupedObservable<K, V>>>` - An Observable that:

- Emits a `Map` containing all the keys seen in the source grouped Observables
  so far, along with the grouped Observable for matches each key.
- Has a function `.get(key: K): Observable<V>` that returns the Observable
  that matches the key parameter.

## See also

- [`collectValues()`](collectValues)
- [`split(keySelector)`](split)

[pipeable operator]: https://rxjs.dev/guide/v6/pipeable-operators
[`groupedobservable`]: https://rxjs.dev/api/index/class/GroupedObservable
