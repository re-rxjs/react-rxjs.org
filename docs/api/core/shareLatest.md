---
id: share-latest
title: shareLatest
sidebar_label: shareLatest
---

A RxJS pipeable operator which multicasts the source stream and replays the
latest emitted value.

---

```ts
const activePlanetName$ = planet$.pipe(
  filter((planet) => planet.isActive),
  map((planet) => planet.name),
  shareLatest()
);
```

The enhanced observables returned from `bind` have been enhanced with this operator.

It's similar to RxJS's `shareReplay({ refCount: true, bufferSize: 1 })`, but
with one difference: If the source stream completes or errors, `shareReplay`
will repeat that event for every new subscriber. On the other hand, `shareLatest`
propagates the event to all the current subscribers, and restarts the source
subscription on the next outer subscription.
