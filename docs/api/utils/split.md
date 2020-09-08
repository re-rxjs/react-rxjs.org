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
- `streamSelector`: (Optional) The function to apply to each grouped Observable. Default: identity.

#### Returns

[`OperatorFunction<T, GroupedObservable<K, T>>`][OperatorFunction]: An Observable that emits a grouped Observable for each key
provided by the key selector function. The values from the source Observable emitted in each grouped Observable 
are optional transformed by the stream selector function, if specified.

### Description

`split` will subscribe to each grouped Observable and share the result to every
inner subscriber of that group. This inner Observable can be mapped to another
Observable through the `streamSelector` argument.

## See also
* [`collect(filter)`](collect)
* [`collectValues()`](collectValues)
* [Todo App Tutorial](../../tutorial/todos#creating-a-stream-for-each-todo)

[pipeable operator]: https://rxjs.dev/guide/v6/pipeable-operators
[OperatorFunction]: https://rxjs.dev/api/index/interface/OperatorFunction