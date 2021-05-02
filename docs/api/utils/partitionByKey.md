---
title: partitionByKey()
sidebar_label: partitionByKey()
---

Groups the elements from the source stream by using a key selector, and maps
each of these groups by using a map function.

```ts
export function partitionByKey<T, K, R>(
  stream: Observable<T>,
  keySelector: (value: T) => K,
  streamSelector: (grouped: Observable<T>, key: K) => Observable<R>,
): [(key: K) => GroupedObservable<K, R>, Observable<K[]>]
```

#### Arguments

- `stream`: Input stream
- `keySelector`: Function that specifies the key for each element in `stream`
- `streamSelector`: Function to apply to each resulting group

#### Returns

`[1, 2]`:

1. A function that accepts a key and returns a stream for the group of that key.

2. A stream with the list of active keys

## See also

- [`combineKeys()`](combineKeys)
