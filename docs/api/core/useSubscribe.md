---
title: useSubscribe()
---

A React hook that creates a subscription to the provided observable once the
component mounts and it unsubscribes when the component unmounts.

Arguments:

- `source$`: Source observable that the hook will subscribe to.
- `unsubscribeGraceTime`: Amount of time in ms that the hook should wait before
  unsubscribing from the source observable after it unmounts (default = 200).

Important: This hook doesn't trigger any updates.