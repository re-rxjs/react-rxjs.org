---
title: suspended()
---

The pipeable version of `suspend`.

### Example

```ts
const story$ = selectedStoryId$.pipe(
  switchMap((id) => getStory$(id).pipe(suspended())),
)
```