---
id: suspense
title: SUSPENSE
sidebar_label: SUSPENSE
---

`SUSPENSE` is a special symbol that can be emitted from observables to let the react hook
know that there is a value on its way, and that we want to leverage React Suspense
while we are waiting for that value.

---

```ts
const story$ = selectedStoryId$.pipe(
  switchMap((id) => concat(SUSPENSE, getStory$(id))),
)
```