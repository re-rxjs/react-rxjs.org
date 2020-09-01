---
id: switch-map-suspended
title: switchMapSuspended()
sidebar_label: switchMapSuspended()
---

Like `switchMap` but applying a `startWith(SUSPENSE)` to the inner observable.

### Example

```ts
const story$ = selectedStoryId$.pipe(switchMapSuspended(getStory$))
```