---
title: useSubscribe()
---

A React hook that creates a subscription to the provided observable once the
component mounts and it unsubscribes when the component unmounts.

Arguments:

- `source$`: Source observable that the hook will subscribe to.

Important: This hook doesn't trigger any updates.
