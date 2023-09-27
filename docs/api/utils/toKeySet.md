---
title: toKeySet()
sidebar_label: toKeySet()
---

Operator function that maps a stream of KeyChanges into a Set that contains the
active keys.

```ts
function toKeySet<K>(): OperatorFunction<KeyChanges<K>, Set<K>>
```

#### Returns

An [OperatorFunction] that will aggregate the key changes from the stream into
a Set with those keys.

### Example

```ts
// Call to service mocked for the example
const priceStream$ = from([
  {
    symbol: "AUDCHF",
    price: 1.32,
  },
  {
    symbol: "GOLD",
    price: 1.213,
  },
  {
    symbol: "CRYPTO",
    price: 2.45,
  },
  {
    symbol: "GOLD",
    price: 1.27,
  },
]).pipe(
  // Add delay to every new price.
  concatMap((value) => of(value).pipe(delay(100))),
)

const [lastPriceOfSymbol, symbolChange$] = partitionByKey(
  priceStream$,
  (x) => x.symbol,
)

const activeSymbols$ = toKeySet(symbolChange$).pipe(
  map((keySet) => Array.from(keySet)),
)

activeSymbols$.subscribe((keys) => console.log(keys))
// Will log:
// ['AUDCHF']
// ['AUDCHF', 'GOLD']
// ['AUDCHF', 'GOLD', 'CRYPTO']
```

## See also

- [`partitionByKey()`](partitionByKey)

[operatorfunction]: https://rxjs.dev/api/index/interface/OperatorFunction
