---
title: combineKeys()
sidebar_label: combineKeys()
---

Creates a stream that constructs a Map with the latest value of the inner stream
of each key.

```ts
export const combineKeys = <K, T>(
  keys$: Observable<Array<K> | Set<K>>,
  getInner$: (key: K) => Observable<T>,
): Observable<Map<K, T>>
```

#### Arguments

- `keys$`: Stream of the list of keys to subscribe to.
- `getInner$`: Function that returns the stream for each key.

#### Returns

A stream with a map containing the latest value from the stream of each key.

## See also

- [`partitionByKey()`](partitionByKey)
