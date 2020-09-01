---
title: <Subscribe />
---

A React Component that creates a subscription to the provided observable once
the component mounts, and unsubscribes when the component unmounts.

Properties:

- `source$`: Source observable that the Component will subscribe to.
- `graceTime`: an optional property that describes the amount of time in ms
  that the Component should wait before unsubscribing from the source observable
  after it unmounts (default = 200).

Important: This Component doesn't trigger any updates.