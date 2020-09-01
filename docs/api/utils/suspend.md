---
id: suspend
title: suspend()
sidebar_label: suspend()
---

A RxJS creation operator that prepends a `SUSPENSE` to the source observable.

### Example

```ts
const story$ = selectedStoryId$.pipe(
  switchMap(id => suspend(getStory$(id))
)
```