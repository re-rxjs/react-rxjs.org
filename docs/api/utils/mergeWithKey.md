---
title: mergeWithKey()
---

Emits the values from all the streams of the provided object, in a result
which provides the key of the stream of that emission.

### Arguments

- `inputObject`: Object of streams

### Example

```ts
const inc$ = new Subject()
const dec$ = new Subject()
const resetTo$ = new Subject<number>()

const counter$ = mergeWithKey({
  inc$,
  dec$,
  resetTo$,
}).pipe(
  scan((acc, current) => {
    switch (current.type) {
      case "inc$":
        return acc + 1
      case "dec$":
        return acc - 1
      case "resetTo$":
        return current.payload
      default:
        return acc
    }
  }, 0),
  startWith(0),
)
```